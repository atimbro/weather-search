package org.dayaway

class FlightDataService {

    def getFlightResults(String departureAirport, String arrivalAirport, String departureDate, String returnDate) {

        def flightSearchUri= "http://terminal2.expedia.com/x/mflights/search?childTravelerAge=2&apikey=1gbGDm5WfcDjb5xJlOHYAxwXwdAbCNgb&"

        flightSearchUri += "departureAirport="+departureAirport+"&arrivalAirport="+arrivalAirport+"&departureDate="+departureDate+"&returnDate="+returnDate

        def flightSearchResponse = new URL(flightSearchUri).getText()

    }
}