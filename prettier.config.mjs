import {
  prettierConfig,
  prettierConfigBase,
  prettierConfigTailwind,
} from '@hiddenability/opinionated-defaults/prettier';

export default prettierConfig(prettierConfigBase, prettierConfigTailwind, {
  tailwindStylesheet: `./styles/globals.css`,
});
