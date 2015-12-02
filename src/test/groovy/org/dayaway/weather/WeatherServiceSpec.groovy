package org.dayaway.weather

import grails.test.mixin.TestFor
import org.joda.time.LocalDate
import spock.lang.Specification

@TestFor(WeatherService)
class WeatherServiceSpec extends Specification {


    void "getWeatherData"() {
        given:

        WeatherService service = new WeatherService();

        when:

        def result  = service.getWeatherData(["MCO"], new LocalDate(2015, 12, 1), new LocalDate(2015, 12, 4));

        then:

        result.size() == 4
    }
}
