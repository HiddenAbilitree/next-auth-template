
import {
  eslintConfigNext,
  eslintConfigPrettier,
} from '@hiddenability/opinionated-defaults/eslint';

const config = [
  ...eslintConfigNext,
  ...eslintConfigPrettier,
];

export default config;
