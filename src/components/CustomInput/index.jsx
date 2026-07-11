import React from "react";
import { TextInput } from "react-native";
import styles from "./styles";

export default function CustomInput({ value, onChangeText, placeholder }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#94a3b8"
    />
  );
}
