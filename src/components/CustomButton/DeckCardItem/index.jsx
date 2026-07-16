import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Star, Trash } from "lucide-react-native";

export default function DeckCardItem({
  item,
  languageLabel,
  onOpen,
  onDelete,
  onToggleFavorite,
  styles,
}) {
  return (
    <TouchableOpacity style={styles.deckCard} onPress={() => onOpen(item)}>
      <View style={styles.deckHeader}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.deckName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.deckCategory} numberOfLines={1}>{item.category}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <TouchableOpacity onPress={() => onToggleFavorite(item)}>
            <Star
              size={22}
              color={item.favorite ? "#eab308" : "#64748b"}
              fill={item.favorite ? "#eab308" : "none"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete(item)}>
            <Trash size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.deckFooter}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{languageLabel}</Text>
        </View>

        <Text style={styles.cardCount}>{item.cardsCount || 0} Cards</Text>
      </View>
    </TouchableOpacity>
  );
}
