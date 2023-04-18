/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	// images 配置 https://nextjs.org/docs/messages/next-image-unconfigured-host
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "/**"
			}
		]
	}
}

module.exports = nextConfig
