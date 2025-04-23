import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
// import functional from 'eslint-plugin-functional';
import parser from '@typescript-eslint/parser';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  // functional.configs.externalTypeScriptRecommended,
  // functional.configs.strict,
  // functional.configs.stylistic,
  {
    languageOptions: {
      parser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      // 'functional/functional-parameters': ["off", { "enforceParameterCount": { "ignoreLambdaExpression": true } }],
      // "functional/prefer-immutable-types": ["off"],
      // "functional/no-expression-statements": ["off", { "ignoreVoid": true }],
      // "functional/no-return-void": ["error", { "ignoreInferredTypes": true }],
      // "functional/no-throw-statements": ["off"],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { prefix: '@' },
      ],
    },
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
