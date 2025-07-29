import {
  prettierConfig,
  prettierConfigBase,
  prettierConfigTailwind,
} from '@hiddenability/opinionated-defaults/prettier';

const config = prettierConfig(prettierConfigTailwind, prettierConfigBase, {
  tailwindStylesheet: `./styles/globals.css`,
});

export default config;
