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
        'no-new':'off',
        'prettier/prettier': 'error',
        'class-methods-use-this':'off',
        'consistent-return':'off',
        'no-param-reassign':'off',
        'no-console':'off'
    }
};