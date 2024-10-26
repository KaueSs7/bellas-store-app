import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useCart } from '../CartContext'; 
import { AuthContext } from '../AuthContext'; 

export default function CartScreen({ navigation }) {
  const { cartItems, getTotal, clearCart } = useCart(); 
  const { user } = useContext(AuthContext); 

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrinho Vazio', 'Adicione produtos ao carrinho para finalizar a compra.');
      return;
    }

    
    Alert.alert('Pagamento Confirmado!', 'Produto(s) sendo embalados para entrega.');

    
    clearCart();

   
    navigation.navigate('Home');
  };

  const totalAmount = getTotal(); 

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      <Text style={styles.productSize}>Tamanho: {item.size}</Text>
      <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCartItem}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Carrinho vazio</Text>}
      />
      <Text style={styles.total}>Total: R$ {totalAmount.toFixed(2)}</Text>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Finalizar Pagamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDEAF3',
  },
  cartItem: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'column',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  productSize: {
    fontSize: 14,
    color: 'gray',
  },
  productQuantity: {
    fontSize: 14,
    color: 'black',
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 20,
  },
  checkoutButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
