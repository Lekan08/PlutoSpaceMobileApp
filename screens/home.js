import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function Home({ navigation }) {
  const [reviews, setReviews] = useState([
    { title: "Zelda, breath of fire", rating: 5, body: "lorem ipsum", key: 1 },
    {
      title: "Gotta Catch Them All (again)",
      rating: 4,
      body: "lorem ipsum",
      key: 2,
    },
    { title: "Not So 'Final' Fantasy", rating: 3, body: "lorem ipsum", key: 3 },
  ]);
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Home Screen</Text>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ReviewDetails", item)}
          >
            <Text style={globalStyles.titleText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Press"
        onPress={() => navigation.navigate("ReviewDetails")}
      />
    </View>
  );
}
