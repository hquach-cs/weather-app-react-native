import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { REACT_APP_WEATHER_API_KEY } from "@env";

import Home from "./src/screens/Home/Home.js";

export default function App() {
  const nashville_weather = require("./Nashville.json");
  const [weather, setDays] = useState(nashville_weather);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     /*
  //     try {
  //       const response = await fetch(
  //         `http://api.weatherapi.com/v1/forecast.json?key=${REACT_APP_WEATHER_API_KEY}&q=Nashville&days=${days}&aqi=no&alerts=no&forcastday=day`
  //       );

  //       const result = await response.json();
  //       if (response.ok) setWeather(result);
  //     } catch (error) {
  //       console.error(error);
  //     }*/
  //   })();
  // }, []);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} weather={weather} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
