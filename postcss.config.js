module.exports = {
  plugins: {
    'cssnano':
        {
            autoprefixer: {
                add: true,
                remove: true,
                flexbox: true,
                browsers: [
                    'last 2 versions', // 2 versions of Major browsers
                    'Android >= 4.2',
                    'ChromeAndroid >= 51',
                    'FirefoxAndroid >= 46',
                    'OperaMobile >= 37',
                    'OperaMini >= 12'
                ]
            },
            discardComments: {
                removeAll: true
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true
        }
    }
}
