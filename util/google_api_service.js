var rp = require('request-promise');

class GoogleApiService {
  constructor(locationStr) {
    this.locationStr = locationStr;
  }

  domain() {
    return 'https://maps.googleapis.com';
  }

  geocodingResults() {
    var options = {
      uri: this.domain() + '/maps/api/geocode/json',
      qs: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        address: this.locationStr
      },
      json: true
    };

    let response;

    rp(options)
      .then(function (res) {
        // TODO: fix -- not hitting
        console.log(res);
        response = res;
      })
      .catch(function (err) {
        // TODO: fix -- not hitting
        console.log('API call failed')
      });

    return response;

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
