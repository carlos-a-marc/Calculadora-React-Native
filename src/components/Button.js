import React from "react";
import { StyleSheet, Text, Dimensions, TouchableHighlight } from "react-native";

const styles = StyleSheet.create({
  button: {
    fontSize: 30,
    color: "#4d4d4d",
    height: Dimensions.get("window").width / 4.4,
    width: Dimensions.get("window").width / 4,
    padding: 20,
    backgroundColor: "#f9f9f9",
    textAlign: "center"
  },
  operationButton: {
    color: "#fff",
    backgroundColor: "#37a4d3"
  },
  buttonDouble: {
    width: (Dimensions.get("window").width / 4) * 2
  },
  buttonClear: {
    color: "#fff",
    backgroundColor: "#37a4d3",
    fontSize: 30
  },
  buttonEquals: {
    color: "#37a4d3"
  }
});

export default props => {
  const styleButton = [styles.button];
  if (props.double) styleButton.push(styles.buttonDouble);
  if (props.clear) styleButton.push(styles.buttonClear);
  if (props.operation) styleButton.push(styles.operationButton);
  if (props.equal) styleButton.push(styles.buttonEquals);

  return (
    <TouchableHighlight onPress={() => props.onclick(props.label)}>
      <Text style={styleButton}>{props.label}</Text>
    </TouchableHighlight>
  );
};
