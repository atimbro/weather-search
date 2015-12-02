package org.dayaway.weather

class WeatherComparator implements Comparator<WeatherService.WeatherObj> {
    @Override
    int compare(WeatherService.WeatherObj w1, WeatherService.WeatherObj w2) {

        if (w1.getExtremeWeatherDays() > w2.getExtremeWeatherDays()) {
            -1
        }
        else if (w2.getExtremeWeatherDays() > w1.getExtremeWeatherDays()){
            1
        }
        else if (w1.getSnowDays() > w2.getSnowDays()) {
            -1
        }
        else if (w2.getSnowDays() > w1.getSnowDays()){
            1
        }
        else if (w1.getThunderstormDays() > w2.getThunderstormDays()) {
            -1
        }
        else if (w2.getThunderstormDays() > w1.getThunderstormDays()){
            1
        }
        else if (w1.getRainDays() > w2.getRainDays()) {
            -1
        }
        else if (w2.getRainDays() > w1.getRainDays()){
            1
        }
        else if (w1.getDrizzleDays() > w2.getDrizzleDays()) {
            -1
        }
        else if (w2.getDrizzleDays() > w1.getDrizzleDays()){
            1
        }
        else {
            w1.getLowestTemp().compareTo(w2.getLowestTemp());
        }
    }
}
