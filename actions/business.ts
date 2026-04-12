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
		const user = await currentUser();
		const userEmail = user?.emailAddresses[0].emailAddress;

		// 1. Separate _id from the rest of the data
		const { _id, slug: existingSlug, ...rest } = data;

		let query;
		const updateData: any = { ...rest, userEmail };

		if (_id) {
			// EDITING MODE: Find by the unique database ID
			query = { _id };
			// We don't want to change the slug during an edit usually,
			// but we keep the old one if it's already there.
		} else {
			// CREATION MODE: Generate the unique slug
			const newSlug = slugify(
				`${rest.category}-${rest.name}-${rest.address}-${nanoid(6)}`,
				{ lower: true, strict: true },
			);
			query = { slug: newSlug };
			updateData.slug = newSlug; // Add the slug to the data being saved
		}

		const business = await Business.findOneAndUpdate(query, updateData, {
			new: true,
			upsert: true,
			runValidators: true,
		});

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

export const updateBusinessInDb = async (data: BusinessState) => {
	try {
		await db();
		const { _id, ...rest } = data;
		const business = await Business.findByIdAndUpdate(_id, rest, {
			new: true,
		});
		return JSON.parse(JSON.stringify(business));
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : String(err);
		throw new Error(errorMessage);
	}
};
