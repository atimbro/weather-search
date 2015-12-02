package org.dayaway

import grails.web.RequestParameter
import groovy.json.JsonBuilder
import groovy.json.JsonSlurper
import org.dayaway.weather.WeatherComparator
import org.dayaway.weather.WeatherService
import org.joda.time.format.DateTimeFormat

class FlightsByWeatherController {
    WeatherService weatherService

    FlightDataService flightDataService

    def index(@RequestParameter("flight-origin") String departureLocation, @RequestParameter("flight-destination") String arrivalLocation, @RequestParameter("flight-departing") String departureDate, @RequestParameter("flight-returning") String returnDate) {
        def locationMap = ['Florida': ['MCO', 'TPA', 'MIA'],
                           'California': ['LAX', 'SFO']]


        def originMap = ['chicago': 'ORD', 'seattle': 'SEA']
        def airportCodes = locationMap.get(arrivalLocation)
        def dateTimeFormatter = DateTimeFormat.forPattern("yyyy-MM-dd")
        def depDate = dateTimeFormatter.parseDateTime(departureDate).toLocalDate()
        def retDate = dateTimeFormatter.parseDateTime(returnDate).toLocalDate()

        def weatherObjs = weatherService.getWeatherData(airportCodes, depDate, retDate) as List

        weatherObjs.sort(true, new WeatherComparator())

        def slurper = new JsonSlurper()
        def overallFlightInfo = [:]
        weatherObjs.each { w ->
              def flightData = flightDataService.getFlightResults(originMap[departureLocation.toLowerCase()], w.airportCode, departureDate, returnDate)
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
                              flight.put("weather",
                                      [
                                              "temp" : w.getLowestTemp(),
                                              "extremeWeatherDays": w.getExtremeWeatherDays(),
                                              "snowDays": w.getSnowDays(),
                                              "thunderstormDays": w.getThunderstormDays(),
                                              "rainDays": w.getRainDays(),
                                              "drizzleDays": w.getDrizzleDays()
                                      ])
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
