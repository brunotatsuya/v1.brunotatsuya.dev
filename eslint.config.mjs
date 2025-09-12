import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    "**/node_modules",
    "**/.next",
    "**/out",
    "**/dist",
    "**/build",
    "**/*.min.js",
    "**/*.min.css",
    "**/coverage",
    "**/.env*",
    "public/**/*",
    "**/*.config.js",
    "**/next-env.d.ts",
  ]),
  {
    extends: compat.extends(
      "next/core-web-vitals",
      "next/typescript",
      "prettier"
    ),

    plugins: {
      prettier,
    },

    settings: {
      "import/resolver": {
        typescript: {},
      },
    },

    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
]);
