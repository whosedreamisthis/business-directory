import mongoose from 'mongoose';

export default async function db() {
	if (mongoose.connection.readyState >= 1) {
		return;
	}

	try {
		await mongoose.connect(process.env.DATABASE_URL as string);
		console.log('🟢 Database connected');
	} catch (err) {
		console.log('❌ Database connection error', err);
	}
}
