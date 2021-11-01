//= require geoblacklight/viewers/map

GeoBlacklight.Viewer.IndexMap = GeoBlacklight.Viewer.Map.extend({
  load: function() {
    this.map = L.map(this.element).fitBounds(this.options.bbox);
    this.map.addLayer(this.selectBasemap());

    if (this.data.available) {
      this.addPreviewLayer();
    } else {
      this.addBoundsOverlay(this.options.bbox);
    }
  },
  availabilityStyle: function(availability) {
    var style = {};
    var options = this.data.leafletOptions;

    // Style the colors based on availability
    if (availability || typeof(availability) === 'undefined') {
      style = options.LAYERS.INDEX.DEFAULT;
    } else {
      style = options.LAYERS.INDEX.UNAVAILABLE;
    }
    return style
  },
  addPreviewLayer: function() {
    var _this = this;
    var geoJSONLayer;
    var prevLayer = null;
    var options = this.data.leafletOptions;
    $.getJSON(this.data.url, function(data) {
      geoJSONLayer = L.geoJson(data,
        {
          style: function(feature) {
            return _this.availabilityStyle(feature.properties.available);
          },
          onEachFeature: function(feature, layer) {
            // Add a hover label for the label property
            if (feature.properties.label !== null) {
              layer.bindTooltip(feature.properties.label);
            }
            // If it is available add clickable info
            if (feature.properties.available !== null) {
              layer.on('click', function(e) {
                var removed = false;
                // color  = state
                // green  = default
                // blue   = current
                // orange = visited

                // on click, if color is visited, remove row from table
                if (layer.options.color == options.LAYERS.INDEX.VISITED.color) {
                  // Reset color to default
                  layer.setStyle(options.LAYERS.INDEX.DEFAULT);
                  // Remove row from table
                  $('table.viewer-table-information td:contains("' + feature.properties['label'] + '")').closest('tr').remove();
                  var removed = true;
                } else {
                  // Change currently selected layer color
                  layer.setStyle(options.LAYERS.INDEX.SELECTED);
                  // Change previously selected layer color to visited color
                  if (prevLayer !== null) {
                    prevLayer.setStyle(options.LAYERS.INDEX.VISITED);
                  }
                  prevLayer = layer;
                }

                if (options.LAYERS.INDEX.TABLE_VIEW && removed == false) {
                  // Display option: Append to Table
                  GeoBlacklight.Util.indexMapTableRowTemplate(feature.properties, function(html) {
                    $('.viewer-table-information').show();
                    if ($('table.viewer-table-information td:contains("' + options.LAYERS.INDEX.TABLE_COLUMNS_UNIQUE_IDENTIFIER + '")').length > 0) {
                      // Already present, do not append
                    } else {
                      // Append
                      $('.viewer-table-information > tbody').append(html);
                    }
                  });
                } else if (removed == true) {
                  // Do nothing
                }
                  else {
                  // Default display option: Replace layer preview
                  GeoBlacklight.Util.indexMapTemplate(feature.properties, function(html) {
                    $('.viewer-information').html(html);
                  });
                }

                GeoBlacklight.Util.indexMapDownloadTemplate(feature.properties, function(html) {
                  $('.js-index-map-feature').remove();
                  $('.js-download-list').append(html);
                });
              });
            }
          },
          // For point index maps, use circle markers
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
          }
        }).addTo(_this.map);
        _this.map.fitBounds(geoJSONLayer.getBounds());
    });
  }
});
