package org.dayaway.weather

import groovy.json.JsonSlurper
import org.dayaway.ApiCaller
import org.joda.time.DateTime
import org.joda.time.Interval
import org.joda.time.LocalDate
import org.joda.time.LocalTime

class WeatherService {


    def static airportToCities = [
            "MCO" : "Orlando",
            "TPA" : "Tampa",
            "MIA" : "Miami",
            "LAX" : "Los Angeles",
            "SFO" : "San Francisco"
    ]


    ApiCaller apiCaller

    def getWeatherData(List<String> airportCodes, LocalDate departureDate, LocalDate returnDate) {

        def midnight = new LocalTime(0, 0, 0, 0)

        Interval interval = new Interval(
                departureDate.toDateTime(midnight),
                returnDate.plusDays(1).toDateTime(midnight)) // end date is exclusive in Interval so add one day

        def url = "http://api.openweathermap.org"
        def path = "/data/2.5/forecast/daily"

        def allData = [] as List

        airportCodes.each {code ->

            def query = [ q: airportToCities[code], cnt: "16", appid: "950caf1d482f8a873ca5dcd54d376529", units: "imperial" ]
            // Submit a request via GET
            def response = ApiCaller.getText(url, path, query)
            def jsonSlurper = new JsonSlurper()
            def jsonResponse = jsonSlurper.parseText(response)
            def currentData = jsonResponse.list as List

            allData.addAll(currentData)
        }



        List filteredData = allData.findAll {e ->
            Long dt = Integer.valueOf(e.dt).longValue() * 1000
            DateTime dateTime = new DateTime(dt)
            boolean contains = interval.contains(dateTime)
            return contains
        }
        def filteredWeatherObjs = filteredData.collect { e ->
//            int value = e.weather.id

            new WeatherObj(airportCode: 'MIA', temp: e.temp.min)
        }
        log.info filteredWeatherObjs

        return filteredWeatherObjs
    }

    class WeatherObj {
        String airportCode
        String temp
        List<WeatherEvent> events
    }

    class WeatherEvent {
        String desc
        Integer id
    }
}
