const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"),
);

module.exports = {
	plugins: ["prettier"],
	extends: ["plugin:prettier/recommended"],
	env: {
		node: true,
		es6: true,
		jest: true,
	},

	parserOptions: {
		ecmaVersion: 8,
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
		},
	},

	globals: {
		// If "no-undef" is enabled below, be sure to list all global variables that
		// are used in this app's backend code (including the globalIds of models):
		Promise: true,
		_: true,
		async: true, // …and any others (e.g. `"Organization": true`)
	},

	rules: {
		"prettier/prettier": [2, prettierOptions],
		"no-undef": 0,
		"no-loop-func": 0,
		"no-param-reassign": 0,
		"global-require": 0,
		"array-callback-return": 0,
		"consistent-return": 0,
		"no-underscore-dangle": 0,
		"no-console": "error",
	},
};
