class GoogleApiService {
  constructor(locationStr) {
    this.locationStr = locationStr;
  }

  geocodingResults() {
    // uri_path = '/maps/api/geocode/json'
    // Rails.logger.debug "Making Google geocoding API call (#{@location_string})"
    // location_hash = fetch_json_data(uri_path, address: @location_string)
    // check_and_raise_error(location_hash)
    // location_hash
  }

  conn() {
    // @conn ||= Faraday.new(: url => 'https://maps.googleapis.com') do | faraday |
    //   faraday.adapter Faraday.default_adapter
    //   faraday.params['key'] = ENV['GOOGLE_MAPS_API_KEY']
    // end
  }

  fetchJsonData(uri_path, params) {
    // response = conn.get uri_path, params
    // JSON.parse response.body, symbolize_names: true
  }

  checkAndRaiseError(response) {
    // error_message = response[:error_message]
    // raise "#{self.class} error: #{error_message}" if error_message
  }
}

module.exports = {
  GoogleApiService: GoogleApiService
}
