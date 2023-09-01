import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.imageBackground}
      >
        <Text style={styles.welcomeText}>Welcome to Weather App</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  getStartedText: {
    fontSize: 18,
    color: 'white',
    backgroundColor: 'blue', // Couleur de fond du texte
    padding: 10, // Espacement autour du texte
  },
});

export default HomeScreen;
