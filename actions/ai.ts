'use server';

import { BusinessState } from '@/utils/types/business';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
	console.log('missing api key');
	throw new Error('Missing GEMINI_API_KEY in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);
const godMode = true;
export const aiGenerateBusinessDescription = async (
	business: BusinessState,
): Promise<string> => {
	if (godMode && process.env.NODE_ENV === 'development') {
		// Optional: Add a small delay to simulate network latency
		await new Promise((resolve) => setTimeout(resolve, 800));

		return `
      <div>
        <h2>Premium Services at ${business.name || 'Our Business'}</h2>
        <p>Experience the best in professional solutions tailored specifically for your needs.</p>
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Expert team with years of industry experience.</li>
          <li>Innovative approaches to complex challenges.</li>
          <li>Commitment to quality and customer satisfaction.</li>
        </ul>
        <p>Visit us today to learn how we can help you achieve your goals with our specialized services.</p>
      </div>
    `.trim();
	}
	try {
		const prompt = `Generate 200 words of SEO content in HTML format (with h2,h3,ul,li, not including <doctype html> etc not markdown, for this business: ${JSON.stringify(
			business,
		)})`;
		const model = genAI.getGenerativeModel({
			model: 'gemini-3-flash-preview',
		});
		const result = await model.generateContent(prompt);

		const response = await result.response;
		const text = response.text();
		return text;
	} catch (err) {
		console.log(err);
		throw new Error('Failed to generate business description');
	}
};
