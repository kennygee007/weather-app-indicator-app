import React from "react";
import Title from "./components/Title";
import Form from "./components/Form"
import Weather from "./components/Weather"

//const API_Key = "7563c6d4b8214127a52180611232810";

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }


  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    // const country = e.target.elements.country.value;

    let APIKEY = process.env.REACT_APP_WEATHER_APIKEY;

    
    const api_call = await fetch(`http://api.weatherapi.com/v1/forecast.json?q=${city}&key=${APIKEY}`);
    const data = await api_call.json();
    console.log(APIKEY);
    console.log("fetching data");
    console.log(data);

    if (city) {

      this.setState({
        temperature: data.current.temp_c,
        city: data.location.name,
        country: data.location.country,
        humidity: data.current.humidity,
        description: data.current.condition.text,
        icon: data.current.condition.icon,
        error: ""

      }

      );
    }


    else {

      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: "Please enter the value!"

      }

      );
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Title />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    icon={this.state.icon}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

};





export default App
