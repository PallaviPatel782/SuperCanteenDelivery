type DependencyConfig = {
  platforms?: {
    ios?: null | object;
    android?: null | object;
    [key: string]: any;
  };
};

type RNConfig = {
  dependencies?: Record<string, DependencyConfig>;
  assets?: string[];
};

const config: RNConfig = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  assets: ['./assets/fonts'],
};

export default config;
