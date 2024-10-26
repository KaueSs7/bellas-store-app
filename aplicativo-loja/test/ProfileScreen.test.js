import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthContext } from '../AuthContext';
import ProfileScreen from '../screens/ProfileScreen';

describe('ProfileScreen', () => {
  it('deve renderizar a tela de perfil corretamente', () => {
    const mockSetUser = jest.fn();
    const mockUser = { name: 'Usuário Teste' };

    const { getByText } = render(
      <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <ProfileScreen />
      </AuthContext.Provider>
    );

    // Verifica se o título "Perfil" está presente
    expect(getByText('Perfil')).toBeTruthy();
  });
});
