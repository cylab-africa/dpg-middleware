/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  env: {
    MOSIP_BASE_ROUTE:'https://mosipcmuafrica.me/idauthentication/v1/',
    API_ROUTE: 'http://front-end/',
    MOSIP_BYPASS: false,
    ALGORITHM: 'aes256',
    KEY: '791bd20f047032b27ba999425a9a8e61',
    IV: '239fb9856dd1c9f3'
  },
}

module.exports = nextConfig
