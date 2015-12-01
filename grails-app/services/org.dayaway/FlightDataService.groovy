package org.dayaway

class FlightDataService {

    def getFlightResults(String arrivalAirport) {

        def flightSearchUri= "http://terminal2.expedia.com/x/mflights/search?departureAirport=ORD&departureDate=2015-12-06&returnDate=2015-12-12&childTravelerAge=2&apikey=1gbGDm5WfcDjb5xJlOHYAxwXwdAbCNgb&"

        flightSearchUri += "arrivalAirport="+arrivalAirport

        def flightSearchResponse = new URL(flightSearchUri).getText()

    }
}