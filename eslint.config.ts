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

const gitignorePath = fileURLToPath(new URL(`.gitignore`, import.meta.url));

export default eslintConfig([
  includeIgnoreFile(gitignorePath, `Imported .gitignore patterns`),
  ...eslintConfigBase,
  ...eslintConfigNext,
  ...eslintConfigPerfectionist,
  ...eslintConfigPrettier,
  ...eslintConfigReact,
  ...eslintConfigRelative,
]);
