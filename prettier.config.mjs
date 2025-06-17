import {
  merge,
  prettierConfigBase,
  prettierConfigTailwind,
} from '@hiddenability/opinionated-defaults/prettier';

const config = merge(prettierConfigTailwind, prettierConfigBase, {
  tailwindStylesheet: './src/globals.css',
});

export default config;
