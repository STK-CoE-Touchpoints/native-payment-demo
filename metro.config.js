const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const sharedRoot = path.resolve(projectRoot, 'external/shared-payment-platform');

const config = getDefaultConfig(projectRoot);

// Permite a Metro observar y resolver archivos del submodule fuera del root del app
config.watchFolders = [sharedRoot];

// Mapea los aliases internos usados por el monorepo compartido
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  '@shared-payment-platform/payment-sdk': path.resolve(
    projectRoot,
    'external/shared-payment-platform/libs/payment-sdk/src'
  ),
  '@shared-payment-platform/payment-ui-native': path.resolve(
    projectRoot,
    'external/shared-payment-platform/libs/payment-ui-native/src'
  ),
};

module.exports = config;
