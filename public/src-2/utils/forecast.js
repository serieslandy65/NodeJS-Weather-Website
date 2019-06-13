const request = require('request')
const geocode = require('./geocode.js')

const forecast = (latitude, longitude, callback) =>
{
    const url = 'https://api.darksky.net/forecast/a085bc8d77db7284bb7da9db1cd6be9a/' + latitude + ',' + longitude + '?units=uk2'

    request({url, json: true}, (error, { body }) =>
    {
        if (error)
        {
            callback('Unable to connect to weather services!', undefined)
        }
        else if (body.error)
        {
            callback('unable to find location. Try another search.', undefined)
        }
        else
        {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress outside. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
