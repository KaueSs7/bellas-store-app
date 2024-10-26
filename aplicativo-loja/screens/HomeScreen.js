import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import products from '../data/products'; 
import { useNavigation } from '@react-navigation/native'; 

export default function HomeScreen() {
  const navigation = useNavigation(); 

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <Image source={require('../assets/images/logo.png')} style={styles.logo} /> 
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false} 
        ListHeaderComponent={renderHeader} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FDEAF3',
  },
  logo: {
    width: '100%', 
    height: 150, 
    resizeMode: 'contain',
    marginBottom: 10, 
  },
  productContainer: {
    marginBottom: 30, 
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  productImage: {
    width: 350, 
    height: 450, 
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
});
