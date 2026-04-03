/** @type {import('next').NextConfig} */
module.exports = {
    output: 'export',
    env: {
        STATS_URL: process.env.STATS_URL
    }
}
