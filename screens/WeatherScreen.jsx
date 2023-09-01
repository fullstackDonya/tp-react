
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addWeatherCity, removeWeatherCity } from '../reducers/weatherReducer';
import Icon from 'react-native-vector-icons/FontAwesome';



const WeatherScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);


  const fetchWeatherData = async () => {
    if (!city) {
      setError('Veuillez entrer une ville valide');
      return;
    }
  

    try {
      const apiKey = '58dcd509733b5e3d0d08ac9ab06fa3e4';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('La requête n\'a pas abouti');
      }
      const data = await response.json();
      if (data) {
        setWeatherData(data);
        setError(null);
        
        // Ajoutez les informations nécessaires ici
        const { name, id, main } = data;
        dispatch(addWeatherCity({
          name,
          id,
          minTemp: main.temp_min,
          maxTemp: main.temp_max,
        }));
      } else {
        setError('Données météorologiques non disponibles');
      }
    } catch (error) {
      setError('Erreur de récupération des données météorologiques : ' + error.message);
    }
    setCity('');
  };
  
  const removeCity = (cityId) => {
    // Supprimer la ville de la liste des villes choisies
    dispatch(removeWeatherCity(cityId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le nom de la ville"
        onChangeText={(text) => setCity(text)}
        value={city}
      />
      <Button title="Obtenir la météo" onPress={fetchWeatherData} style={styles.buton}  />

      {/* Affichage des villes ajoutées */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {cities.map((addedCity) => (
          <View key={addedCity.id} style={styles.weatherCard}>
            <Text style={styles.cityName}>{addedCity.name}</Text>
            <Text style={styles.temperatureText}>{Math.round(addedCity.minTemp)}°C</Text>
            <View style={styles.temperatureMinMax}>
              <Text style={styles.minTemperature}>Min: {Math.round(addedCity.minTemp)}°C</Text>
              <Text style={styles.maxTemperature}>Max: {Math.round(addedCity.maxTemp)}°C</Text>
              

            </View>
            {/* Bouton pour supprimer la ville ajoutée */}
            <Button title="Supprimer" onPress={() => removeCity(addedCity.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );



};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '90%',
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  buton:{
    fontSize: 18,
    color: 'white',
    backgroundColor: 'blue',
    padding: 10, 
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  weatherCard: {
    backgroundColor: '#87CEEB', 
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 30,
    borderRadius:10,
    marginBottom: 20,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white', 
  },
  temperatureText: {
    fontSize: 36,
    color: 'white', 
  },
  temperatureMinMax: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  minTemperature: {
    color: 'green', 
  },
  maxTemperature: {
    color: 'red', 
  },
  button: {
    backgroundColor: '#87CEEB', 
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  textButton: {
    color: 'white', 
    fontWeight: 'bold',
  },
  weatherDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  weatherText: {
    fontSize: 18,
  },
});

export default WeatherScreen;

