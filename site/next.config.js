/** @type {import('next').NextConfig} */
module.exports = {
    output: 'export',
    compiler: {
        styledComponents: true
    },
    env: {
        STATS_URL: process.env.STATS_URL
    }
}
