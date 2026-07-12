import React, { useState } from "react";
import { Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import api from "../../config/api";
import styles from "./styles";
import CloseButton from "../../components/CustomButton/CloseButton";
import CustomInput from "../../components/CustomInput";
import SaveButton from "../../components/CustomButton/SaveButton";
import { loadProfileRequest } from "../../store/modules/auth/actions";
import { useDispatch } from "react-redux";

export default function CreateCard({ route, navigation }) {
    const { deckId } = route.params;
    const dispatch = useDispatch();
    const [word, setWord] = useState("");
    const [translation, setTranslation] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [present, setPresent] = useState("");
    const [past, setPast] = useState("");
    const [future, setFuture] = useState("");

    const [examplePhrase1, setExamplePhrase1] = useState("");
    const [examplePhrase2, setExamplePhrase2] = useState("");
    const [examplePhrase3, setExamplePhrase3] = useState("");

    async function handleCreateCard() {
        if (!word || !translation) {
            Alert.alert("Erro", "Palavra e tradução são obrigatórias.");
            return;
        }

        try {
            await api.post("/flashcards", {
                word,
                translation,
                present,
                past,
                future,
                examplePhrase1,
                examplePhrase2,
                examplePhrase3,
                difficulty: "MEDIUM",
                favorite: false,
                deckId,
            });

            Alert.alert("Sucesso", "Card criado com sucesso!");
            dispatch(loadProfileRequest());
            navigation.goBack();
        } catch (error) {
            console.log(error?.response?.data);

            Alert.alert("Erro", "Não foi possível criar o card.");
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Novo Card</Text>
            <CustomInput placeholder="Palavra" value={word} onChangeText={setWord} />

            <CustomInput
                placeholder="Tradução"
                value={translation}
                onChangeText={setTranslation}
            />

            <CustomInput
                placeholder="Presente"
                value={present}
                onChangeText={setPresent}
            />

            <CustomInput placeholder="Passado" value={past} onChangeText={setPast} />

            <CustomInput
                placeholder="Futuro"
                value={future}
                onChangeText={setFuture}
            />

            <CustomInput
                placeholder="Exemplo 1"
                value={examplePhrase1}
                onChangeText={setExamplePhrase1}
            />

            <CustomInput
                placeholder="Exemplo 2"
                value={examplePhrase2}
                onChangeText={setExamplePhrase2}
            />

            <CustomInput
                placeholder="Exemplo 3"
                value={examplePhrase3}
                onChangeText={setExamplePhrase3}
            />

            <SaveButton onPress={handleCreateCard} title="Salvar Card" />
            <CloseButton setModalVisible={setModalVisible} />
        </ScrollView>
    );
}
