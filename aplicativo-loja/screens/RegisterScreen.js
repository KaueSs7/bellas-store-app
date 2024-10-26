import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext'; 
import CryptoJS from 'crypto-js'; 

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [whatsapp, setWhatsapp] = useState(''); 
  const { setUser } = useContext(AuthContext); 

  const formatDate = (date) => {
    const cleaned = ('' + date).replace(/\D/g, '');

    let formattedDate = cleaned;

    if (cleaned.length > 2) {
      formattedDate = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    if (cleaned.length > 4) {
      formattedDate = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }

    return formattedDate;
  };

  const formatCEP = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    let formattedCEP = cleaned;

    if (cleaned.length > 5) {
      formattedCEP = `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
    }

    return formattedCEP;
  };

  const handleBirthdateChange = (text) => {
    const formatted = formatDate(text);
    setBirthdate(formatted);
  };

  const handleCepChange = (text) => {
    const formatted = formatCEP(text);
    setCep(formatted);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !address || !cep || !birthdate || !whatsapp) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      const existingUser = await AsyncStorage.getItem(email);
      if (existingUser !== null) {
        Alert.alert('Erro', 'Este email já está em uso');
        return;
      }

      const encryptedPassword = CryptoJS.AES.encrypt(password, 'sua-chave-secreta').toString();

      await AsyncStorage.setItem(email, JSON.stringify({ 
        password: encryptedPassword, 
        name, 
        address, 
        cep, 
        birthdate, 
        whatsapp 
      }));

      setUser({
        name: name,
        address: address,
        cep: cep,
        birthdate: birthdate,
        whatsapp: whatsapp
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Erro no armazenamento:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nome" 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Confirmar Senha" 
        secureTextEntry 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Endereço" 
        value={address} 
        onChangeText={setAddress} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="CEP (XXXXX-XXX)" 
        value={cep} 
        onChangeText={handleCepChange} 
        keyboardType="numeric"
        maxLength={10}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Data de Nascimento (DD/MM/AAAA)" 
        value={birthdate} 
        onChangeText={handleBirthdateChange} 
        keyboardType="numeric"
        maxLength={10}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Número do WhatsApp (5521XXXXXXXXX)" 
        value={whatsapp} 
        onChangeText={setWhatsapp} 
        keyboardType="numeric"
        maxLength={15} 
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text 
        style={styles.link} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text>Já tem uma conta? </Text>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Faça login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FDEAF3',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  registerButton: {
    backgroundColor: 'gray', 
    paddingVertical: 15,
    borderRadius: 25, 
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
  },
});
