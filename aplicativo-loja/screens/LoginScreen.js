import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext'; 
import { useFocusEffect } from '@react-navigation/native';
import CryptoJS from 'crypto-js';
import logo from '../assets/images/logo.png'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUser } = useContext(AuthContext); 

  const handleLogin = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem(email);

      if (storedUserData === null) {
        Alert.alert('Erro', 'Usuário não encontrado');
        return;
      }

      const userData = JSON.parse(storedUserData);

      
      const decryptedPassword = CryptoJS.AES.decrypt(userData.password, 'sua-chave-secreta').toString(CryptoJS.enc.Utf8);

      if (decryptedPassword === password) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');

        
        setUser({
          name: userData.name,       
          address: userData.address, 
          cep: userData.cep,         
        });

       
        navigation.navigate('Main');
      } else {
        Alert.alert('Erro', 'Senha incorreta');
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente.');
    }
  };

  
  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} /> 
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
      
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <Text 
        style={styles.link} 
        onPress={() => navigation.navigate('Register')}
      >
        Não tem uma conta? Cadastre-se
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
  logo: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: 'gray', 
    paddingVertical: 15,
    borderRadius: 25, 
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
