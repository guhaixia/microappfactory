const path = require('path');

module.exports = (params, { name = 'microappfactory' }) => {
    
    return {
        resolve: {
            extensions: ['.js', '.ts', '.json'],
        },
        mode: 'development',
        entry: {
            [name]: name === 'microappfactory' ? './src/index.ts' : './src/polyfill.ts',
        },
        output: {
            filename:  '[name].js',
            path: path.resolve(__dirname, 'dist'),
            library: name === 'microappfactory' ? 'microappfactory' : `microappfactory${name}`,
            libraryTarget: 'umd',
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                        },
                    ],
                    exclude: /node_modules/,
                },
            ],
        }
    } 
};