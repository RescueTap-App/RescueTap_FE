module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "react-native-reanimated/plugin",
        // "module-resolver",
        // {
        //   alias: {
        //     "@components": "./src/components",
        //     "@screens": "./src/screens",
        //     "@assets": "./src/assets",
        //     "@navigation": "./src/navigation",
        //     "@utils": "./src/utils",
        //     "@api": "./src/api",
        //     "@store": "./src/store",
        //     "@hooks": "./src/hooks",
        //     "@constants": "./src/constants",
        //     "@context": "./src/context",
        //     "@types": "./src/types",
        //   },
        // },
      ],
    ],
  };
};
