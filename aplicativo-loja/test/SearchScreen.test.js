import React from 'react';
import { render } from '@testing-library/react-native';
import SearchScreen from '../screens/SearchScreen';

describe('SearchScreen', () => {
  it('deve renderizar a tela de busca corretamente', () => {
    const { getByPlaceholderText } = render(<SearchScreen />);

    // Verifica se o campo de busca está presente
    expect(getByPlaceholderText('Pesquisar produtos...')).toBeTruthy();
  });
});
