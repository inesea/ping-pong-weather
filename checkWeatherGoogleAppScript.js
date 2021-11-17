const maxWindKph = 8;
const maxPrecipitationMm = 0;

const apiKey = "<weatherapiKey>"
const location = "Berlin"

function checkWeather() {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
  
  const response = UrlFetchApp.fetch(url, { method: "GET"})
  const content = JSON.parse(response.getContentText())
  // Logger.log(content);

  const windSpeedKph = content?.current?.wind_kph
  const precipitationMm = content?.current?.precip_mm

  const isWindy = windSpeedKph > maxWindKph;
  const isRainy = precipitationMm > maxPrecipitationMm;

  const conditions = [
    { label: "windy", value: isWindy },
    { label: "rainy", value: isRainy }
  ]

  const isGoodWeather =  !isWindy && !isRainy 

  const title = isGoodWeather
    ? "Good ping pong weather" 
    : `Sorry, it is ${conditions.filter(c => c.value).map(c => c.label).join(" and ")} outside today, no ping pong:(`
  
  // Logger.log(title);
  // Logger.log(windSpeedKph);
  // Logger.log(precipitationMm);

  GmailApp.sendEmail("<yourEmail>", title)
}
