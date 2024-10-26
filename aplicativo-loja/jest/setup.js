import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const MockedReanimated = require('react-native-reanimated/mock');
  return MockedReanimated;
});

