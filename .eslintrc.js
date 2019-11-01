module.exports = { 
    "extends": ["airbnb-base","plugin:prettier/recommended"],
    "plugins":["prettier"],
    "env": {
        "browser": true,
        "node": true
    },
    rules:{
        'no-plusplus': 'off',
        'no-new':'off',
        'prettier/prettier': 'error',
    }
};