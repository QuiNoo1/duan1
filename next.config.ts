// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.dummyjson.com"], // <--- thêm dòng này
    },
};

module.exports = nextConfig;
