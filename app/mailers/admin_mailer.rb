class AdminMailer < ApplicationMailer
  def uri_analysis(report_file_path)
    @report = report_file_path
    mail(to: 'help@sco.wisc.edu', subject: "[GeoData #{`hostname`.strip}] - URI Analysis Report")
  end
end
