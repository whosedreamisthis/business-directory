'use server';

import db from '@/utils/db';
import Business from '@/models/business';
import { currentUser } from '@clerk/nextjs/server';
import { BusinessState } from '@/utils/types/business';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

export const saveBusinessToDb = async (data: BusinessState) => {
	try {
		await db();
		console.log('await db ok');
		const user = await currentUser();
		const userEmail = user?.emailAddresses[0].emailAddress;

		const { _id, ...rest } = data;
		// Add the parentheses () to call the function!
		const slug = slugify(
			`${rest.category}-${rest.name}-${rest.address}-${nanoid()}`,
			{ lower: true, strict: true },
		);

		const business = await Business.create({ ...rest, slug, userEmail });

		return JSON.parse(JSON.stringify(business));
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : String(err);
		throw new Error(errorMessage);
	}
};

export const getUserBusinessesFromDb = async () => {
	try {
		await db();
		const user = await currentUser();
		const userEmail = user?.emailAddresses[0]?.emailAddress;
		const businesses = await Business.find({ userEmail }).sort({
			createAt: -1,
		});
		return JSON.parse(JSON.stringify(businesses));
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : String(err);
		throw new Error(errorMessage);
	}
};

export const getBusinessFromDb = async (_id: string) => {
	try {
		const business = await Business.findById(_id);
		return JSON.parse(JSON.stringify(business));
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : String(err);
		throw new Error(errorMessage);
	}
};
