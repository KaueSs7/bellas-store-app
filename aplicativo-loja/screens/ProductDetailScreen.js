import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useCart } from '../CartContext'; 
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function ProductDetailScreen({ route }) {
  const { product } = route.params; 
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  const navigation = useNavigation(); 

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Produto não encontrado.</Text>
      </View>
    );
  }

  const price = typeof product.price === 'number' ? product.price.toFixed(2) : 'Preço inválido';

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({ ...product, size: selectedSize });
      Alert.alert('Pronto', 'Produto adicionado ao carrinho!');
    } else {
      alert('Por favor, selecione um tamanho');
    }
  };

  const handleBuyNow = () => {
    Alert.alert('Pagamento Confirmado!', 'Produto(s) sendo embalados para entrega.');
    navigation.navigate('Home'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.productInfoContainer}>
        <Image source={product.image} style={styles.productImage} />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>R$ {price}</Text>
      </View>
      
      <Text style={styles.sizeLabel}>Selecione o tamanho:</Text>
      <View style={styles.sizeOptions}>
        {['P', 'M', 'G', 'GG', 'XG'].map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSizeButton,
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text style={styles.sizeText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Compre Já</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <MaterialCommunityIcons name="cart-plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.productDescription}>
        {product.description ? product.description : 'Descrição do produto não disponível.'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FDEAF3',
  },
  backButton: {
    marginTop: 20, 
    marginBottom: 20,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'black',
    fontSize: 16,
  },
  productInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  sizeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sizeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  selectedSizeButton: {
    backgroundColor: '#ccc',
  },
  sizeText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: 'gray',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  buyNowText: {
    color: 'white',
    fontSize: 18,
  },
  addToCartButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDescription: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
