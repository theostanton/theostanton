const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
    output: 'export',
    compiler: {
        styledComponents: true
    },
    env: {
        STATS_URL: process.env.STATS_URL
    },
    webpack: (config, { webpack }) => {
        // The browserslist config in package.json targets only modern
        // browsers that natively support Array.prototype.at, Object.hasOwn,
        // Array.prototype.flat/flatMap, Object.fromEntries, and
        // String.prototype.trimStart/trimEnd. Replace Next.js's built-in
        // polyfill-module (which ships ~12 KiB of legacy polyfills into the
        // main chunk) with an empty module so those bytes aren't shipped.
        const emptyPolyfill = path.resolve(__dirname, 'empty-polyfill.js')
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
                /[\\/]next[\\/]dist[\\/](esm[\\/])?build[\\/]polyfills[\\/]polyfill-module(\.js)?$/,
                emptyPolyfill
            )
        )
        return config
    }
}
