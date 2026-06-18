    import React, { useState } from 'react';
    import {
      View,
      Text,
      TextInput,
      TouchableOpacity,
      ActivityIndicator,
      Alert,
      ScrollView,
      Modal,
      FlatList
    } from 'react-native';
    import { useDispatch, useSelector } from 'react-redux';
    import { createDeckRequest } from '../../store/modules/deck/actions';
    import styles from './styles'

    export default function DeckList() {
      const [name, setName] = useState('');
      const [category, setCategory] = useState('');
      const [language, setLanguage] = useState('');
      const [modalVisible, setModalVisible] = useState(false);

      const dispatch = useDispatch();
      const loading = useSelector(state => state.deck.loading);

      // Lista de idiomas do seu Select (Ajuste as strings se o seu Dashboard usar siglas como 'en' ou 'es')
      const languagesList = [
        { id: '1', label: '🇺🇸 Inglês', value: 'English' },
        { id: '2', label: '🇪🇸 Espanhol', value: 'Spanish' },
        //{ id: '3', label: '🇫🇷 Francês', value: 'Francês' },
        //{ id: '4', label: '🇮🇹 Italiano', value: 'Italiano' },
        //{ id: '5', label: '🇩🇪 Alemão', value: 'Alemão' },
      ];

      function handleCreateDeck() {
        if (!name.trim() || !category.trim() || !language) {
          Alert.alert('Erro', 'Por favor, preencha todos os campos e selecione um idioma.');
          return;
        }

        // Envia os 3 campos certos que a action e o backend esperam
        dispatch(createDeckRequest(name, category, language));

        // Limpa o formulário após salvar
        setName('');
        setCategory('');
        setLanguage('');
      }

      function handleSelectLanguage(value) {
        setLanguage(value);
        setModalVisible(false); // Fecha o Select
      }

      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Novo Baralho</Text>
            <Text style={styles.subtitle}>Crie a estrutura do seu deck aqui</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Nome do Baralho</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Vocabulário de Viagem"
              placeholderTextColor="#64748b"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Categoria</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Verbos, Expressões"
              placeholderTextColor="#64748b"
              value={category}
              onChangeText={setCategory}
            />

            {/* CAMPO DO SELECT (BOTÃO QUE ABRE AS OPÇÕES) */}
            <Text style={styles.label}>Idioma do Baralho</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={[styles.selectButtonText, !language && { color: '#64748b' }]}>
                {language ? languagesList.find(lang => lang.value === language)?.label : 'Selecione um idioma...'}
              </Text>
              <Text style={styles.arrowIcon}>▼</Text>
            </TouchableOpacity>

            {/* MODAL DO SELECT INTERNO (TIPO HTML DROP DOWN) */}
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
              >
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Escolha o Idioma</Text>

                  <FlatList
                    data={languagesList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => handleSelectLanguage(item.value)}
                      >
                        <Text style={styles.modalItemText}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={handleCreateDeck}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Criar Baralho</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

