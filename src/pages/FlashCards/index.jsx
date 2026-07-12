import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import api from "../../config/api";
import Modal from "react-native-modal";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { getLanguageCode } from "../../services/speech/getLanguageCode";
import EditButton from "../../components/CustomButton/EditButton";
import CloseButton from "../../components/CustomButton/CloseButton";
import SpeakerButton from "../../components/CustomButton/SpeakerButton";
import DeleteButton from "../../components/CustomButton/DeleteButton";
import DeleteConfirmationModal from "../../components/CustomButton/DeleteConfirmationModal";
import { loadProfileRequest } from "../../store/modules/auth/actions";

export default function FlashCards({ route, navigation }) {
    const dispatch = useDispatch();
    const { deckId, deckName, deckLanguage } = route.params;
    const [selectedCard, setSelectedCard] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cardToDelete, setCardToDelete] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    async function loadCards() {
        try {
            setLoading(true);

            const response = await api.get(`/flashcards/deck/${deckId}`);

            setCards(response.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCards();
        dispatch(loadProfileRequest());
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            loadCards();
        });

        return unsubscribe;
    }, [navigation]);

    function renderCard({ item }) {
        return (
            <View style={{ position: "relative" }}>
                <DeleteButton
                    onPress={() => {
                        setCardToDelete(item);
                        setDeleteModalVisible(true);
                    }}
                />

                <TouchableOpacity
                    onPress={() => {
                        setSelectedCard(item);
                        setModalVisible(true);
                    }}
                    style={styles.card}
                >
                    <Text style={styles.cardWord}>{item.word}</Text>

                    <Text style={styles.cardTranslation}>{item.translation}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{deckName}</Text>

            <TouchableOpacity
                style={styles.newCardButton}
                onPress={() =>
                    navigation.navigate("CreateCard", {
                        deckId,
                        deckName,
                    })
                }
            >
                <Text style={styles.newCardButtonText}>Novo Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.newCardButton}
                onPress={() =>
                    navigation.navigate("FlashCardStudy", {
                        deckId,
                        deckName,
                        deckLanguage,
                    })
                }
            >
                <Text style={styles.newCardButtonText}>Estudar</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#2563eb" />
            ) : (
                <FlatList
                    data={cards}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderCard}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhum card criado</Text>
                    }
                />
            )}

            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalWord}>{selectedCard?.word}</Text>

                        <SpeakerButton
                            text={selectedCard?.word}
                            language={getLanguageCode(deckLanguage)}
                            big
                        />
                    </View>

                    <Text style={styles.translation}>{selectedCard?.translation}</Text>

                    {selectedCard?.past ? (
                        <View style={styles.rowSpeech}>
                            <Text style={{ color: "#fff" }}>Past: {selectedCard.past}</Text>

                            <SpeakerButton
                                text={selectedCard.past}
                                language={getLanguageCode(deckLanguage)}
                            />
                        </View>
                    ) : null}

                    {selectedCard?.present ? (
                        <View style={styles.rowSpeech}>
                            <Text style={{ color: "#fff" }}>
                                Present: {selectedCard.present}
                            </Text>

                            <SpeakerButton
                                text={selectedCard.present}
                                language={getLanguageCode(deckLanguage)}
                            />
                        </View>
                    ) : null}

                    {selectedCard?.future ? (
                        <View style={styles.rowSpeech}>
                            <Text style={{ color: "#fff" }}>
                                Future: {selectedCard.future}
                            </Text>

                            <SpeakerButton
                                text={selectedCard.future}
                                language={getLanguageCode(deckLanguage)}
                            />
                        </View>
                    ) : null}

                    {selectedCard?.examplePhrase1 ? (
                        <View style={styles.rowSpeechTop}>
                            <Text style={styles.phraseText}>
                                • {selectedCard.examplePhrase1}
                            </Text>

                            <SpeakerButton
                                text={selectedCard.examplePhrase1}
                                language={getLanguageCode(deckLanguage)}
                            />
                        </View>
                    ) : null}

                    {selectedCard?.examplePhrase2 ? (
                        <View style={styles.rowSpeech}>
                            <Text style={styles.phraseText}>
                                • {selectedCard.examplePhrase2}
                            </Text>

                            <SpeakerButton
                                text={selectedCard.examplePhrase2}
                                language={getLanguageCode(deckLanguage)}
                            />
                        </View>
                    ) : null}

                    {selectedCard?.examplePhrase3 ? (
                        <View style={styles.rowSpeech}>
                            <Text style={styles.phraseText}>
                                • {selectedCard.examplePhrase3}
                            </Text>

                            <SpeakerButton
                                text={selectedCard.examplePhrase3}
                                language={getLanguageCode(deckLanguage)}
                            />
                        </View>
                    ) : null}
                    <EditButton
                        onPress={() => {
                            setModalVisible(false);

                            navigation.navigate("EditCard", {
                                card: selectedCard,
                            });
                        }}
                    />
                    <CloseButton onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
            <DeleteConfirmationModal
                visible={deleteModalVisible}
                message="Deseja realmente excluir este card?"
                onClose={() => setDeleteModalVisible(false)}
                onConfirm={async () => {
                    try {
                        await api.delete(`/flashcards/${cardToDelete.id}`);

                        setDeleteModalVisible(false);
                        setModalVisible(false);

                        loadCards();
                        dispatch(loadProfileRequest());
                    } catch (error) {
                        console.log(error?.response?.data);
                    }
                }}
            />
        </View>
    );
}
