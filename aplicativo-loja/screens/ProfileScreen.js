import React, { useContext } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../AuthContext'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext); 

  const handleLogout = () => {
    setUser(null); 
    navigation.navigate('Auth'); 
  };

  const handleWhatsApp = () => {
    const message = "Olá, gostaria de saber mais sobre os produtos.";
    const phoneNumber = "5521997564503"; 
  
    Linking.openURL(`whatsapp://send?text=${encodeURIComponent(message)}&phone=${phoneNumber}`);
  };

  console.log('Dados do usuário:', user); 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topMargin} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>Nome: {user ? user.name : 'Usuário não disponível'}</Text>
        <Text style={styles.userInfoText}>Endereço: {user ? user.address : 'Endereço não disponível'}</Text>
        <Text style={styles.userInfoText}>CEP: {user ? user.cep : 'CEP não disponível'}</Text>
      </View>
      <View style={styles.about}>
        <Text style={styles.aboutTitle}>Sobre nós - Bellas Store</Text>
        <Text>
          Bem-vinda à Bellas Store, um espaço criado especialmente para você, que valoriza moda, estilo e conforto. Nossa missão é oferecer roupas femininas de qualidade, com designs únicos que realçam a beleza e a personalidade de cada mulher.
          {"\n\n"}
          Aqui, você encontra peças cuidadosamente selecionadas para todas as ocasiões, desde looks casuais até produções mais sofisticadas. Priorizamos não só a estética, mas também o conforto e a versatilidade, para que você se sinta incrível em qualquer momento do seu dia.
          {"\n\n"}
          Na Bellas Store, acreditamos que a moda é uma forma de expressão, e estamos aqui para ajudar você a criar seu estilo com confiança e atitude.
          {"\n\n"}
          Sinta-se à vontade para explorar nossas coleções e encontrar peças que combinam com o seu estilo!
        </Text>
      </View>
      <View style={styles.whatsappContainer}>
        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
          <MaterialCommunityIcons name="whatsapp" size={28} color="green" />
          <Text style={styles.whatsappText}>Fale Conosco</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FDEAF3',
  },
  topMargin: {
    height: 50,
    backgroundColor: '#FDEAF3', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 10,
  },
  userInfo: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  userInfoText: {
    fontSize: 18, 
    marginBottom: 5,
  },
  about: {
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  whatsappContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  whatsappText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'green',
  },
});
