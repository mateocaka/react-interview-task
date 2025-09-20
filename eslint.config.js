import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginJest from 'eslint-plugin-jest';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig({

    overrides: [
        {
            files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            plugins: {
                js,
                react: pluginReact,
            },
            languageOptions: {
                globals: globals.browser,
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            settings: {
                react: {
                    version: 'detect', // Automatically detect React version
                },
            },
            rules: {
                'react/prop-types': 'off', // Disable prop-types if using TypeScript
                'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            },
        },
        {
            files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
            plugins: {
                json,
            },
            languageOptions: {
                parser: json.parsers.JSONParser,
            },
            extends: ['plugin:json/recommended'],
        },
        {
            files: ['**/*.md'],
            plugins: {
                markdown,
            },
            languageOptions: {
                parser: markdown.parsers['markdown-it'],
            },
            extends: ['plugin:markdown/recommended'],
        },
        {
            files: ['**/*.css'],
            plugins: {
                css,
            },
            languageOptions: {
                parser: css.parsers.CSSParser,
            },
            extends: ['plugin:css/recommended'],
        },
        {
            files: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
            plugins: {
                jest: pluginJest,
            },
            env: {
                jest: true,
            },
            extends: ['plugin:jest/recommended'],
            rules: {
                'jest/no-disabled-tests': 'warn',
                'jest/no-identical-title': 'error',
                'jest/prefer-to-have-length': 'warn',
            },
        },
    ],
});