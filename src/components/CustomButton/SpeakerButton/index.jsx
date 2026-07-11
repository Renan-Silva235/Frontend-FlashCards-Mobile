import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { speak } from "../../../services/speech/speechService";
import styles from "./styles";

export default function SpeakerButton({
  text,
  language = "en-US",
  big = false,
}) {
  return (
    <TouchableOpacity onPress={() => speak(text, language)}>
      <Text style={big ? styles.iconMain : styles.icon}>🔊</Text>
    </TouchableOpacity>
  );
}
