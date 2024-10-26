import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen';

describe('ProfileScreen', () => {
  it('deve renderizar a tela de perfil corretamente', () => {
    const { getByText } = render(<ProfileScreen />);

    // Verifica se o título "Perfil" está presente
    expect(getByText('Perfil')).toBeTruthy();
  });
});
