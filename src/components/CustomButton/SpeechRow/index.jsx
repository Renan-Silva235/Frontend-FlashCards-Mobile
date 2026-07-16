import React from "react";
import { Text, View } from "react-native";

import SpeakerButton from "../SpeakerButton";

export default function SpeechRow({
  label,
  text,
  language,
  isTop = false,
  styles,
}) {
  return (
    <View style={isTop ? styles.rowSpeechTop : styles.rowSpeech}>
      <Text style={styles.phraseText}>
        {label ? `${label}: ${text}` : text}
      </Text>

      <SpeakerButton text={text} language={language} />
    </View>
  );
}
