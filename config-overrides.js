const path = require('path');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = function override(config, env) {
  const wasmExtensionRegExp = /\.wasm$/;

  config.resolve.extensions.push('.wasm');

  config.module.rules.forEach(rule => {
    (rule.oneOf || []).forEach(oneOf => {
      if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
        // Make file-loader ignore WASM files
        oneOf.exclude.push(wasmExtensionRegExp);
      }
    });
  });

  // Add a dedicated loader for WASM
  config.plugins.push(
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "./src/wasm-tree-solver"),
      watchDirectories: [
        path.resolve(__dirname, "./src/wasm-tree-solver/src")
      ],
      forceMode: "production",
      outDir: "pkg",
    })
  );

  return config;
};