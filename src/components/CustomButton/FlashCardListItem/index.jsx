import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import DeleteButton from "../DeleteButton";

export default function FlashCardListItem({ item, onDelete, onPress, styles }) {
  return (
    <View style={{ position: "relative" }}>
      <DeleteButton onPress={() => onDelete(item)} />

      <TouchableOpacity onPress={() => onPress(item)} style={styles.card}>
        <Text style={styles.cardWord}>{item.word}</Text>

        <Text style={styles.cardTranslation}>{item.translation}</Text>
      </TouchableOpacity>
    </View>
  );
}
