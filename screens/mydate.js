import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  onDateChange(date) {
    console.log(date);

    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    return (
      <View style={styles.container}>
        <CalendarPicker onDateChange={this.onDateChange} />
        <View>
          <Text> SELECTED DATE:{moment(startDate).format("MM/DD/YYYY")}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    marginTop: 100,
  },
});