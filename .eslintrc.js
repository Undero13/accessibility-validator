module.exports = { 
    "extends": ["airbnb-base","plugin:prettier/recommended"],
    "plugins":["prettier"],
    "env": {
        "browser": true,
        "node": true,
        "jest": true
    },
    rules:{
        'no-plusplus': 'off',
        'import/no-dynamic-require':"off",
        'prettier/prettier': 'error',
        'class-methods-use-this':'off',
        'consistent-return':'off',
        'no-param-reassign':'off',
        'no-console':'off',
        "no-new": "off",
        'no-restricted-globals':'off',
        "import/no-extraneous-dependencies": "off"
    },

    "globals": {
        "getStyleFormDom": true,
        "getAnimationElement": true,
        "enlargeFonts": true,
        "clearURL": true,
        "getPotentialModal": true
    }
};