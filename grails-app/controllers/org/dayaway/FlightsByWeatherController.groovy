package org.dayaway

import grails.converters.JSON
import groovy.json.JsonSlurper
import org.dayaway.weather.WeatherService


class FlightsByWeatherController {
    WeatherService weatherService

    FlightDataService flightDataService

    def index() {
        def locationMap = ['FL': ['MCO', 'TPA', 'MIA'],
                           'CA': ['LAX', 'SFO']]

        def slurper = new JsonSlurper()
        def overallFlightInfo = [:]
        locationMap.entrySet().each { s ->
            s.getValue().each {
                def flightData = flightDataService.getFlightResults(it)
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
        }

        render view: 'index'
    }
}
