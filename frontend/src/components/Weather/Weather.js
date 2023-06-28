import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import LoadingBar from 'react-top-loading-bar'

export default function Weather() {



  const [city, setCity] = useState('india')
  const [progress, setProgress] = useState(0)
  const [weather, setWeather] = useState({ city: '', wind: '', maxtemp: '', mintemp: '', humidity: '', pressure: '', description: '', imgurl: '' })


  const fetchWeather = async () => {
    setProgress(30);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d885aa1d783fd13a55050afeef620fcb`);
    setProgress(70);
    const data = await res.json();
    if (data.cod === "404") {
      alert("City Not Found")
      return;
    }
    else {
      setProgress(100);
      setWeather({
        maxtemp: data.main.temp_max,
        mintemp: data.main.temp_min,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure, description: data.weather[0].description,
        imgurl: " http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
        city: city
      })
    }

  }
  useEffect(() => {

    fetchWeather();

  }, [])
  const handleOnchange = (e) => {
    setCity(e.target.value);
  }
  return (
    <div>
      <Navbar />
      <LoadingBar
        color='rgb(0, 255, 4)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container" style={{ display: "flex", margin: "2rem", justifyContent: "center", alignItems: "center" }}>
        <Form.Control type="text" name="city" onChange={handleOnchange} value={city} placeholder="Enter City" style={{ backgroundColor: "rgba(4, 255, 0, 0.101)", width: "15rem", marginRight: "1rem", marginLeft: "1rem" }} />
        <Button variant="success" type="submit" onClick={() => { fetchWeather() }}>
          Submit
        </Button>
      </div>
      <div className="container" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Card style={{ backgroundColor: "rgba(4, 255, 0, 0.101)", width: '16rem', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.164)", justifyContent: "center", alignItems: "center" }}>
          <Card.Img variant="top" src={weather.imgurl} style={{ width: "60%" }} />
          <Card.Body style={{ textAlign: "center" }}>
            <Card.Title><b>{weather.city.charAt(0).toUpperCase() + weather.city.slice(1)}</b></Card.Title>
            <br />
            <Card.Title>{weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}</Card.Title>
            <Card.Text>
              <p>Max Temp: {weather.maxtemp}°C</p>
              <p>Min Temp: {weather.mintemp}°C</p>
              <p>Wind: {weather.wind}m/s</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Pressure: {weather.pressure}hPa</p>
            </Card.Text>

          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
