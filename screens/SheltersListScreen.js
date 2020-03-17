import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { fetchShelters } from "../store/actions/actions";
import ShelterList from "../components/ShelterList";
import HeaderButton from "../components/HeaderButton";

const ShelterListScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const shelters = useSelector(state => state.animals.shelters);
  const dispatch = useDispatch();

  const loadShelters = useCallback(async () => {
    setIsLoading(true);
    dispatch(fetchShelters());
    setIsLoading(false);
  });

  useEffect(() => {
    loadShelters();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoading && shelters.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>No shelters found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.shelterList}>
      <ShelterList
        loadProfile={props.loadProfile}
        selectShelter={props.selectShelter}
        navigation={props.navigation}
        shelters={shelters}
      />
    </View>
  );
};

ShelterListScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Animal Shelters",
    headerTitleStyle: {
      fontFamily: "source-sans",
      fontSize: 28
    }
  };
};

const styles = StyleSheet.create({
  shelterList: {
    flex: 1
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});

export default ShelterListScreen;
