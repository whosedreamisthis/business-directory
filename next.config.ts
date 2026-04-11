/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '4mb', // Increase this if you're uploading images
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: '/**', // This allows all images from your Cloudinary account
			},
		],
	},
};

export default nextConfig;
