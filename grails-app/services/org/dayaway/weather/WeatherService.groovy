package org.dayaway.weather

import groovy.json.JsonSlurper
import org.dayaway.ApiCaller
import org.joda.time.DateTime
import org.joda.time.Interval
import org.joda.time.Period


class WeatherService {
    ApiCaller apiCaller

    def getWeatherData() {
        DateTime startDate = new DateTime()             // TODO parameterize
        DateTime endDate = new DateTime().plusDays(3).plusMillis(1)  // TODO parameterize
        Interval interval = new Interval(startDate, endDate)
        def url = "http://api.openweathermap.org"
        def path = "/data/2.5/forecast/daily"
        def query = [ q: "Chicago", cnt: "16", appid: "950caf1d482f8a873ca5dcd54d376529", units: "imperial" ]

        // Submit a request via GET
        def response = ApiCaller.getText(url, path, query)
        def jsonSlurper = new JsonSlurper()
        def jsonResponse = jsonSlurper.parseText(response)
        def allData = jsonResponse.list as List
        List filteredData = allData.find {e ->
            Long dt = Integer.valueOf(e.dt).longValue()
            DateTime dateTime = new DateTime(dt)
            boolean contains = interval.contains(dt)
            return contains
        }
        def filteredWeatherObjs = filteredData.collect { e ->
//            int value = e.weather.id

            new WeatherObj(temp: e.temp.min)
        }
        log.info filteredWeatherObjs

        return filteredWeatherObjs
    }

    class WeatherObj {
        String temp
        List<WeatherEvent> events
    }

    class WeatherEvent {
        String desc
        Integer id
    }
}
