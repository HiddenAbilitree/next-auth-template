import { includeIgnoreFile } from '@eslint/compat';
import {
  eslintConfig,
  eslintConfigBase,
  eslintConfigNext,
  eslintConfigPerfectionist,
  eslintConfigPrettier,
  eslintConfigReact,
  eslintConfigRelative,
} from '@hiddenability/opinionated-defaults/eslint';
import { fileURLToPath } from 'node:url';

export default eslintConfig([
  includeIgnoreFile(fileURLToPath(new URL(`.gitignore`, import.meta.url)), ``),
  ...eslintConfigBase,
  ...eslintConfigNext,
  ...eslintConfigPerfectionist,
  ...eslintConfigPrettier,
  ...eslintConfigReact,
  ...eslintConfigRelative,
]);
