import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./src/components/Button";
import Display from "./src/components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  addDigit = n => {
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    if (n === "." && !clearDisplay && this.state.displayValue.includes(".")) {
      return; // ignora o ponto se já houver algum no display
    }

    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n; // concatena valor n com o valor corrente no display
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const newValue = parseFloat(displayValue);
      const values = { ...this.state.values };
      values[this.state.current] = newValue;
      this.setState({ values });
    }
  };

  clearMemory = () => {
    this.setState({ ...initialState });
  };

  deleteElement = () => {
    let displayValue = this.state.displayValue;
    if (displayValue.length === 0) {
      return;
    } else {
      displayValue = displayValue.substring(0, displayValue.length - 1);
      this.setState({ displayValue });
    }
  };

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const values = { ...this.state.values };
      try {
        if (this.state.operation === "%") {
          values[0] = values[0] * (values[1] / 100);
        } else {
          values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`); // eval() faz a operação. se for digitado = cai no catch
        }

      } catch (error) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      this.setState({
        displayValue: `${values[0]}`, // garante que o valor sempre será uma string
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label="c" clear double onclick={this.clearMemory} />
          <Button label="x" operation onclick={this.deleteElement} />
          <Button label="%" operation onclick={this.setOperation} />
          <Button label="7" onclick={this.addDigit} />
          <Button label="8" onclick={this.addDigit} />
          <Button label="9" onclick={this.addDigit} />
          <Button label="/" operation onclick={this.setOperation} />
          <Button label="4" onclick={this.addDigit} />
          <Button label="5" onclick={this.addDigit} />
          <Button label="6" onclick={this.addDigit} />
          <Button label="*" operation onclick={this.setOperation} />
          <Button label="1" onclick={this.addDigit} />
          <Button label="2" onclick={this.addDigit} />
          <Button label="3" onclick={this.addDigit} />
          <Button label="-" operation onclick={this.setOperation} />
          <Button label="0" onclick={this.addDigit} />
          <Button label="." onclick={this.addDigit} />
          <Button label="=" equal onclick={this.setOperation} />
          <Button label="+" operation onclick={this.setOperation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    flexDirection: "row", // muda a direção dos botões
    flexWrap: "wrap" // permite quebrar linha
  }
});
