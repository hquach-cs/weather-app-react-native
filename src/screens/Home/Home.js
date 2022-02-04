import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";

const Home = (props) => {
  const [time, setTime] = useState(Date.now());
  const [min, setMin] = useState(null);
  const [hour, setHour] = useState(null);
  const [PM, setPM] = useState(false);
  const [night, setNight] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let tmp = new Date().getMinutes();
    if (tmp < 10) tmp = "0" + tmp;
    setMin(tmp);
    tmp = new Date().getHours();
    if (tmp > 12) {
      tmp -= 12;
      setPM(true);
    }
    setHour(tmp);
  }, [time]);

  useEffect(() => {
    let tmp = props.weather.forecast.forecastday[0].astro.sunset.split(/[ :]+/);
    if (tmp[0] > hour) {
      setNight(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <View style={styles.wrapper}>
            <Image
              style={styles.icon}
              source={require("./../../images/location_mark.png")}
            />
            <Text style={styles.h2}>{props.weather.location.name}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.h3}>
              {hour + ":" + min + " " + (PM ? "PM" : "AM")}
            </Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.h1}>{props.weather.current.temp_f}&#176;</Text>
          </View>
          <View style={styles.wrapper}></View>
        </View>
        <View styles={styles.headerImg}>
          <Image source={require("./../../images/Sunny.png")} />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFB",
    paddingLeft: 25,
  },
  header: {
    flexDirection: "row",
  },
  headerText: {
    flex: 1,
    paddingTop: 35,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 3,
  },
  headerImg: {
    flex: 1,
  },
  icon: {
    marginLeft: -5,
    width: 20,
    height: 20,
  },
  h1: {
    fontSize: 50,
    fontWeight: "300",
  },
  h2: {
    fontSize: 18,
  },
  h3: {
    fontSize: 16,
    fontWeight: "300",
  },
});
