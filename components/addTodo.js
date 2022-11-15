import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";

export default function AddTodo({ submitHandler }) {
  const [text, setText] = useState("");

  const changeHandler = (val) => {
    setText(val);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="new todo..."
        onChangeText={changeHandler}
      />
      <Button
        onPress={() => {
          submitHandler(text);
          if (text.length > 3) {
            setText("");
          }
        }}
        title="Add More Todo"
        color="#F96D02"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F96D02",
    color: "black",
    backgroundColor: "white",
  },
});
