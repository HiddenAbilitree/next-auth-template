import { includeIgnoreFile } from '@eslint/compat';
import {
  eslintConfig,
  eslintConfigNext,
  eslintConfigOxlint,
  eslintConfigPrettier,
} from '@hiddenability/opinionated-defaults/eslint';
import { fileURLToPath } from 'node:url';

const gitignorePath = fileURLToPath(new URL(`.gitignore`, import.meta.url));
const config = eslintConfig([
  includeIgnoreFile(gitignorePath, `Imported .gitignore patterns`),
  ...eslintConfigNext,
  ...eslintConfigPrettier,
  ...eslintConfigOxlint,
]);

export default config;
