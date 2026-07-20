import React, { useRef, useState, useEffect } from "react";
import { Text, View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

import CloseButton from "../../CustomButton/CloseButton";
import EditButton from "../../CustomButton/EditButton";
import SpeechRow from "../../CustomButton/SpeechRow";
import SpeakerButton from "../../CustomButton/SpeakerButton";
import { getLanguageCode } from "../../../services/speech/getLanguageCode";

export default function FlashCardDetailsModal({
  visible,
  cards,
  initialCardIndex = 0,
  deckLanguage,
  onEdit,
  onClose,
  styles,
}) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(initialCardIndex);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (visible && cards && cards.length > 0) {
      setCurrentIndex(initialCardIndex);
      // Ensure FlatList scrolls to the correct initial index when opening
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: initialCardIndex,
            animated: false,
          });
        }
      }, 100);
    }
  }, [visible, initialCardIndex, cards]);

  const handleNext = () => {
    if (cards && currentIndex < cards.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentIndex(prevIndex);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderCard = ({ item: card }) => {
    const spokenFields = [
      ["Past", card?.past],
      ["Present", card?.present],
      ["Future", card?.future],
    ].filter(([, value]) => Boolean(value));

    const exampleFields = [
      card?.examplePhrase1,
      card?.examplePhrase2,
      card?.examplePhrase3,
    ].filter(Boolean);

    return (
      <View style={{ width: containerWidth }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalWord}>{card?.word}</Text>

            <SpeakerButton
              text={card?.word}
              language={getLanguageCode(deckLanguage)}
              big
            />
          </View>

          <Text style={styles.translation}>{card?.translation}</Text>

          {spokenFields.map(([label, value]) => (
            <SpeechRow
              key={label}
              label={label}
              text={value}
              language={getLanguageCode(deckLanguage)}
              styles={styles}
            />
          ))}

          {exampleFields.map((example, index) => (
            <SpeechRow
              key={`${example}-${index}`}
              label="•"
              text={example}
              language={getLanguageCode(deckLanguage)}
              isTop={index === 0}
              styles={styles}
            />
          ))}

          <EditButton onPress={() => onEdit(card)} />
          <CloseButton onPress={onClose} />
        </ScrollView>
      </View>
    );
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={styles.modalContainer}
          onLayout={(e) => {
            // Measure the available width inside the modal for paging
            // Padding horizontal from modalContainer is typically inside it, 
            // so containerWidth is exactly the space minus padding if we apply width to inner view.
            // Wait, react-native onLayout on the container returns the total width.
            // But padding inside the container shrinks the available content width.
            // Let's use the layout width minus the horizontal padding if any.
            // From styles.js: modalContainer has padding: 20
            const layoutWidth = e.nativeEvent.layout.width;
            setContainerWidth(layoutWidth - 40); // 20 padding on each side
          }}
        >
          {containerWidth > 0 && cards && cards.length > 0 ? (
            <FlatList
              ref={flatListRef}
              data={cards}
              keyExtractor={(item) => String(item.id)}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={renderCard}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              initialScrollIndex={initialCardIndex}
              getItemLayout={(data, index) => ({
                length: containerWidth,
                offset: containerWidth * index,
                index,
              })}
            />
          ) : (
            <View style={{ height: 300 }} />
          )}
        </View>

        <View style={styles.navigationContainer}>
          {currentIndex > 0 ? (
            <TouchableOpacity onPress={handlePrev} style={styles.navigationButton}>
              <ChevronLeft color="#94a3b8" size={24} />
              <Text style={styles.navigationText}>Card anterior</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.navigationPlaceholder} />
          )}

          {cards && currentIndex < cards.length - 1 ? (
            <TouchableOpacity onPress={handleNext} style={styles.navigationButton}>
              <Text style={styles.navigationText}>Próximo card</Text>
              <ChevronRight color="#94a3b8" size={24} />
            </TouchableOpacity>
          ) : (
            <View style={styles.navigationPlaceholder} />
          )}
        </View>
      </View>
    </Modal>
  );
}

