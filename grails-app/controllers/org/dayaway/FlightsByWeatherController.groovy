package org.dayaway

import groovy.json.JsonBuilder
import groovy.json.JsonSlurper
import org.dayaway.weather.WeatherService
import org.joda.time.format.DateTimeFormat

class FlightsByWeatherController {
    WeatherService weatherService

    FlightDataService flightDataService

    def index(String departureLocation, String arrivalLocation, String departureDate, String returnDate) {
        def locationMap = ['Florida': ['MCO', 'TPA', 'MIA'],
                           'California': ['LAX', 'SFO']]
        def airportCodes = locationMap.get(arrivalLocation)
        def dateTimeFormatter = DateTimeFormat.forPattern("yyyy-MM-dd")
        def depDate = dateTimeFormatter.parseDateTime(departureDate).toLocalDate()
        def retDate = dateTimeFormatter.parseDateTime(returnDate).toLocalDate()

        def weatherObjs = weatherService.getWeatherData(airportCodes, depDate, retDate)

        def slurper = new JsonSlurper()
        def overallFlightInfo = [:]
        weatherObjs.each {
              def flightData = flightDataService.getFlightResults(departureLocation, it.airportCode, departureDate, returnDate)
              def result = slurper.parseText(flightData)
              def legIds = result.offers[0].get("legIds")
              def flightInfo = [:]
              legIds.each {
                  flightInfo.put("totalFare", result.offers[0].get("totalFare"))

                  def legId = it

                  def legs = result.legs
                  legs.each {
                      def id = it["legId"]
                      if (legId.equals(id)) {
                          def segs = it["segments"]
                          def flights = []
                          segs.each {
                              def flight = [:]
                              flight.put("airlineCode", it.get("airlineCode"))
                              flight.put("flightNumber", it.get("flightNumber"))
                              flight.put("arrivalAirportCode", it.get("arrivalAirportCode"))
                              flight.put("departureAirportCode", it.get("departureAirportCode"))
                              flight.put("arrivalTime", it.get("arrivalTime"))
                              flight.put("departureTime", it.get("departureTime"))
                              flights.add(flight)
                          }
                          flightInfo.put(id, flights)
                      }
                  }
              }
              overallFlightInfo.put(legIds, flightInfo)
        }
        render(contentType: 'application/json') {
            new JsonBuilder(overallFlightInfo)
        }
    }
}
