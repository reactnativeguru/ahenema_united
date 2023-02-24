module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
};
module.exports = function (api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
