/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
<<<<<<< HEAD
        hostname: 'goniboard.s3.ap-northeast-2.amazonaws.com', /* 내 aws s3 쓰면됨 */
=======
        hostname: 'goniboard.s3.ap-northeast-2.amazonaws.com',
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3
        port: '',
        pathname: '/**'
      },
    ]
  }
}

module.exports = nextConfig
