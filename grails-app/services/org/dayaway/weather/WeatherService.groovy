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
    public static final OPENWEATHERMAP_URL = "http://api.openweathermap.org"
    public static final String OPENWEATHERMAP_PATH = "/data/2.5/forecast/daily"
    public static final String OPENWEATHERMAP_APP_ID = "950caf1d482f8a873ca5dcd54d376529"


    ApiCaller apiCaller

    def getWeatherData(List<String> airportCodes, LocalDate departureDate, LocalDate returnDate) {

        def midnight = new LocalTime(0, 0, 0, 0)

        Interval interval = new Interval(
                departureDate.toDateTime(midnight),
                returnDate.plusDays(1).toDateTime(midnight)) // end date is exclusive in Interval so add one day

        def allData = [] as List

        airportCodes.each {code ->

            def query = [ q: airportToCities[code], cnt: "16", appid: OPENWEATHERMAP_APP_ID, units: "imperial" ]
            // Submit a request via GET
            def response = ApiCaller.getText(OPENWEATHERMAP_URL, OPENWEATHERMAP_PATH, query)
            def jsonSlurper = new JsonSlurper()
            def jsonResponse = jsonSlurper.parseText(response)
            def currentData = jsonResponse.list as List

            List filteredData = currentData.findAll {e ->
                Long dt = Integer.valueOf(e.dt).longValue() * 1000
                DateTime dateTime = new DateTime(dt)
                interval.contains(dateTime)
            }

            def dailyWeatherList = filteredData.collect { e ->
                new DailyWeather(
                        temp: e.temp.min.doubleValue(),
                        events: e.weather.collect {w -> new WeatherEvent(id: w.id, desc: w.description)}
                )
            }

            def weatherObj = new WeatherObj(
                    airportCode: code,
                    dailyWeather: dailyWeatherList
            )

            allData.add(weatherObj)
        }

        return allData
    }

    static class WeatherObj {
        String airportCode
        List<DailyWeather> dailyWeather;

        int getExtremeWeatherDays() {
            dailyWeather.count {dw -> dw.events.findAll{e -> e.id >= 900 && e.id <= 910}}
        }

        int getSnowDays() {
            dailyWeather.count {dw -> dw.events.findAll{e -> e.id >= 600 && e.id < 700}}
        }

        int getThunderstormDays() {
            dailyWeather.count {dw -> dw.events.findAll{e -> e.id >= 200 && e.id < 300}}
        }

        int getRainDays() {
            dailyWeather.count {dw -> dw.events.findAll{e -> e.id >= 500 && e.id < 600}}
        }

        int getDrizzleDays() {
            dailyWeather.count {dw -> dw.events.findAll{e -> e.id >= 300 && e.id < 400}}
        }

        double getLowestTemp() {
            dailyWeather.min {it.temp}
        }
    }

    static class DailyWeather {
        List<WeatherEvent> events
        double temp
    }

    static class WeatherEvent {
        String desc
        Integer id
    }
}
