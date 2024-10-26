import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const MockedReanimated = require('react-native-reanimated/mock');
  return MockedReanimated;
});

// Mockando os módulos do Expo
jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: () => null,
    MaterialCommunityIcons: () => null,
  };
});

jest.mock('expo-font', () => {
  return {
    loadAsync: jest.fn(),
    useFonts: jest.fn(() => [true]),
  };
});
