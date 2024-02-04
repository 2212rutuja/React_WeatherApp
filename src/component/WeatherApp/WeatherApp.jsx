import React, { useEffect, useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
//import Box from '@mui/material/Box';
import axios from 'axios'
import search_icon from '../Assets/search.png'
import TextField from '@mui/material/TextField';
import cloud_icon from '../Assets/cloud.png'
import clear_icon from '../Assets/clear.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'


const GlobalStyles = styled(Box)({
  backgroundImage: 'url("https://images.unsplash.com/reserve/yapfjxRqy2d2rGRNc2yQ_zavrsnica-9-indie.jpg?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Add the path to your image
  backgroundSize: 'cover',
  height: '100vh', // Make sure the background covers the entire viewport height
  overflow: 'hidden', // Hide overflow to prevent scrolling
 
  
});

const Container = styled(Box)({
  width: '550px',
  height: '650px',
  margin: 'auto',
  //marginTop:'20px',
  borderRadius: '12px',
  //backgroundImage: 'linear-gradient(180deg, #130754 0% ,#3b2f80 100%)',
  backgroundImage: 'url("https://media.istockphoto.com/id/1202572708/photo/blue-gradient-abstract-background-empty-room-with-space-for-your-text-and-picture.jpg?s=2048x2048&w=is&k=20&c=nnJz4wxL-lCu9W4bc9z5vW6qb7ZuMVQEaP-cYKsW4kU=")', // Add the path to your image
  backgroundSize: 'cover',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  
  
})

const SearchBar = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '14px',
  paddingTop: '60px',

})

const InputText = styled(TextField)({
  display: 'flex',
  width: '362px',
  height: '60px',
  backgroundColor: 'lightblue',
  borderRadius: '40px',
  paddingLeft: '40px',
  color: '#626262',
  justifyContent: 'center',

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent', // Remove outline border
    },
    '&:hover fieldset': {
      borderColor: 'transparent', // Remove outline border on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent', // Remove outline border when focused
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '18.5px 14px', // Adjust the padding as needed
    fontSize: '20px',
  },

})

const SearchIcon = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '78px',
  height: '60px',
  backgroundColor: 'lightblue',
  borderRadius: '50px',
  cursor: 'pointer',
})

const WeatherTemp = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  color: 'white',
  fontSize: '80px',
  fontWeight: '400',

})

const WeatherLoc = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  color: 'white',
  fontSize: '55px',
  fontWeight: '400',
})

const DataContainer = styled(Box)({
  display: 'flex',
  marginTop: '50px',
  color: 'white',
  justifyContent: 'center',
})

const Element = styled(Box)({
  margin: 'auto',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px'

})

const DataElement = styled(Box)({
  fontSize: '26px',
  fontWeight: '400'
})

const CloudImage = styled(Box)({
  marginTop: '28px',
  display: 'flex',
  justifyContent: 'center',
  height: '140px'
})

const HumidityPercent = styled(Box)({

})

const TextFont = styled(Box)({
  fontSize: '18px',
  fontWeight: '400'
})




export default function WeatherApp() {
  const [data, setData] = useState('');
  const [city, setCity] = useState('Sangli');
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [weatherImage, setWeatherImage] = useState(null);


  let apiKey = "9d8360e9e95389875f75b980645cb8d1";

  const kelvinToCelsius = (kelvin) => {
    const celsius = kelvin - 273.15;
    return Math.round(celsius); // Round to the nearest whole number
  };

  const getWeatherImage = (weatherMain) => {
    // Customize this logic based on your specific conditions and image assets
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return clear_icon;
      case 'clouds':
        return cloud_icon;
      case 'snow':
        return snow_icon;
      case 'rain':
        return rain_icon;
      case 'mist':
        return drizzle_icon;
      default:
        return clear_icon; // Add a default image for unknown conditions
    }
  };

  const fetchApi = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`
      );
      setData(response.data);
      const weatherMain = response.data.weather[0].main;
      setWeatherImage(getWeatherImage(weatherMain));
      setError(null);
    } catch (error) {
      console.log(error.message);
      setData(null); // Reset data to null on search error
      setError('City not found'); // Set error message
    }
  }

  const handleSearch = async () => {
    fetchApi()
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        setData(response.data);
        const weatherMain = response.data.weather[0].main;
        setWeatherImage(getWeatherImage(weatherMain));
        setError(null);
      } catch (error) {
        console.log(error.message);
        setData(null); // Reset data to null on search error
        setError('City not found'); // Set error message
      }
    }
    fetchData()

  }, [city]);


  const handleKeyDown =(e) =>{
    if(e.key === 'Enter'){
      handleSearch()
    }
  }

  return (
    <GlobalStyles>
    <Container>
      <SearchBar>
        <InputText
          className='cityInput'
          placeholder="Enter city name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon onClick={handleSearch}>
          <img src={search_icon} alt="searchIcon" />
        </SearchIcon>
      </SearchBar>

      {error && <Typography style={{ color: 'white', fontSize: '30px', marginTop: '20px' }}>{error}</Typography>}

      {
        data && (
          <>
            {weatherImage && (
              <CloudImage>
                <img src={weatherImage} alt="Weather condition" />
              </CloudImage>
            )}
            <WeatherTemp>
              {kelvinToCelsius(data.main.temp)}°C
            </WeatherTemp>
            <WeatherLoc>
              {data.name}
            </WeatherLoc>
            <DataContainer>
              <Element>
                <img src={humidity_icon} alt="Humidity" style={{ marginTop: '10px' }} />
                <DataElement>
                  <HumidityPercent>{data.main.humidity} %</HumidityPercent>
                  <TextFont>Humdity</TextFont>

                </DataElement>
              </Element>

              <Element>
                <img src={wind_icon} alt="Wind" style={{ marginTop: '10px' }} />
                <DataElement>
                  <HumidityPercent>{data.wind.speed} km/hr</HumidityPercent>
                  <TextFont>Wind Speed</TextFont>

                </DataElement>
              </Element>
            </DataContainer>
          </>

        )
      }
    </Container>
    </GlobalStyles>
  )
}
//7:51