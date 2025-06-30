import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import prettier from 'eslint-config-prettier'
export default defineConfig([
    // Regras recomendadas do ESLint
    js.configs.recommended,
    {
        files: ['**/*.{js,cjs,mjs}'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: globals.node,
            ecmaVersion: 'latest',
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prefer-const': 'error', // Use const se possível
            'no-console': 'warn', // Evita uso indiscriminado de console.log
            'consistent-return': 'warn', // Retornos coerentes em funções
            'prefer-template': 'warn', // Usa template strings ao invés de concatenação
            'prettier/prettier': 'error', // Mostra erros de formatação do Prettier como erros do ESLint
        },
    },
    prettier,
])