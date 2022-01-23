// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage

//

//= require tether
// Required by Blacklight
//= require jquery
//= require 'blacklight_advanced_search'
//= require chosen-jquery
//= require modules/advanced_chosen


//= require popper
// Twitter Typeahead for autocomplete
//= require twitter/typeahead
//= require bootstrap
//= require blacklight/blacklight
//= require linkify
//= require linkify-jquery

//= require_tree .


// @CUSTOMIZED
// - set initial bbox
// following was borrowed from BTAA with slight modifications

GeoBlacklight.Viewer.Map = GeoBlacklight.Viewer.extend({

  options: {
    /**
    * Initial bounds of map
    * @type {L.LatLngBounds}
    */
    bbox: [[42, -92], [47.5, -88]],
    opacity: 1.0
  },

  overlay: L.layerGroup(),

  load: function() {
    if (this.data.mapGeom) {
      this.options.bbox = L.geoJSONToBounds(this.data.mapGeom);
    }
    
    this.map = L.map(this.element, {scrollWheelZoom:true, noWrap: true}).fitBounds(this.options.bbox);
    this.map.addLayer(this.selectBasemap());
    this.map.addLayer(this.overlay);
    if (this.data.map !== 'index') {
      this.addBoundsOverlay(this.options.bbox);
    }
  },

  /**
   * Add a bounding box overlay to map.
   * @param {L.LatLngBounds} bounds Leaflet LatLngBounds
   */
  addBoundsOverlay: function(bounds) {
    if (bounds instanceof L.LatLngBounds) {
      this.overlay.addLayer(L.polygon([
        bounds.getSouthWest(),
        bounds.getSouthEast(),
        bounds.getNorthEast(),
        bounds.getNorthWest()
      ]));
    }
  },

  /**
   * Remove bounding box overlay from map.
   */
  removeBoundsOverlay: function() {
    this.overlay.clearLayers();
  },

  /**
   * Add a GeoJSON overlay to map.
   * @param {string} geojson GeoJSON string
   */
  addGeoJsonOverlay: function(geojson) {
    var layer = L.geoJSON();
    layer.addData(geojson);
    this.overlay.addLayer(layer);
  },

  /**
  * Selects basemap if specified in data options, if not return mapquest
  */
  selectBasemap: function() {
    var _this = this;
    if (_this.data.basemap) {
      return GeoBlacklight.Basemaps[_this.data.basemap];
    } else {
      return _this.basemap.mapquest;
    }
  }
});


// For blacklight_range_limit built-in JS, if you don't want it you don't need
// this:
//= require 'blacklight_range_limit'
