import React from "react";
import { Text, View, ScrollView } from "react-native";
import Modal from "react-native-modal";

import CloseButton from "../../CustomButton/CloseButton";
import EditButton from "../../CustomButton/EditButton";
import SpeechRow from "../../CustomButton/SpeechRow";
import SpeakerButton from "../../CustomButton/SpeakerButton";
import { getLanguageCode } from "../../../services/speech/getLanguageCode";

export default function FlashCardDetailsModal({
  visible,
  card,
  deckLanguage,
  onEdit,
  onClose,
  styles,
}) {
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
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
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

          <EditButton onPress={onEdit} />
          <CloseButton onPress={onClose} />
        </ScrollView>
      </View>
    </Modal>
  );
}

