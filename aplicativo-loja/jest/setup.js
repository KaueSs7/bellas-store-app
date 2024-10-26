import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const MockedReanimated = require('react-native-reanimated/mock');
  return MockedReanimated;
});


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


jest.mock('react-native/Libraries/Lists/FlatList', () => {
  return jest.fn((props) => {
    return <mock-FlatList {...props} />;
  });
});


jest.mock('react-native/Libraries/Lists/VirtualizedList', () => {
  return jest.fn((props) => {
    return <mock-VirtualizedList {...props} />;
  });
});

jest.mock('react-native/Libraries/Components/ScrollView/ScrollView', () => {
  return jest.fn((props) => {
    return <mock-ScrollView {...props} />;
  });
});
