'use client';

import React, {
	useContext,
	createContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { BusinessState } from '@/utils/types/business';
import { useClerk, useUser } from '@clerk/nextjs';
import {
	saveBusinessToDb,
	getUserBusinessesFromDb,
	getBusinessFromDb,
} from '@/actions/business';
import toast from 'react-hot-toast';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { handleLogoAction } from '@/actions/cloudinary';

const initialState: BusinessState = {
	_id: '',
	userEmail: '',
	name: '',
	category: '',
	description: '',
	address: '',
	phone: '',
	email: '',
	website: '',
	hours: '',
	logo: '',
	bn: '',
	slug: '',
	createdAt: '',
	updatedAt: '',
	__v: 0,
};

interface BusinessContextType {
	business: BusinessState;
	setBusiness: React.Dispatch<React.SetStateAction<BusinessState>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.MouseEvent) => void;
	businesses: BusinessState[];
	setBusinesses: React.Dispatch<React.SetStateAction<BusinessState[]>>;
	initialState: BusinessState;
}
const BusinessContext = createContext<BusinessContextType | undefined>(
	undefined,
);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [business, setBusiness] = useState<BusinessState>(initialState);
	const [loading, setLoading] = useState<boolean>(false);
	const [businesses, setBusinesses] = useState<BusinessState[]>([]);
	const [logoUloading, setLogoUploading] = useState<boolean>(false);

	const { openSignIn } = useClerk();
	const { isSignedIn } = useUser();

	const router = useRouter();
	const pathname = usePathname();

	const isDashboardPage = pathname === '/dashboard';
	const { id } = useParams();

	useEffect(() => {
		const savedBusiness = localStorage.getItem('business');
		if (savedBusiness) {
			setBusiness(JSON.parse(savedBusiness));
		}
	}, []);

	useEffect(() => {
		if (isDashboardPage) {
			getUserBusinesses();
		}
	}, [isDashboardPage]);

	useEffect(() => {
		if (id) {
			getBusiness();
		}
	}, [id]);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, files } = e.target;
		if (name === 'logo' && files && files[0]) {
			await handleLogo(files, name);
		} else {
			setBusiness((prevBusiness: BusinessState) => {
				const updatedBusiness = { ...prevBusiness, [name]: value };
				localStorage.setItem(
					'business',
					JSON.stringify(updatedBusiness),
				);
				return updatedBusiness;
			});
		}
	};

	const handleLogo = async (files: FileList, name: string) => {
		const file = files[0];
		setLogoUploading(true);

		const reader = new FileReader();

		return new Promise<void>((resolve, reject) => {
			reader.onloadend = async () => {
				const base64Image = reader.result as string;
				try {
					const imageUrl = await handleLogoAction(base64Image);

					if (imageUrl) {
						setBusiness((prevBusiness: BusinessState) => {
							const updatedBusiness = {
								...prevBusiness,
								[name]: imageUrl,
							};
							localStorage.setItem(
								'business',
								JSON.stringify(updatedBusiness),
							);
							return updatedBusiness;
						});
						resolve();
					} else {
						toast.error('❌ Failed to upload image');
					}
				} catch (err) {
					toast.error('❌ Failed to upload image');
				} finally {
					setLogoUploading(false);
				}
			};
			reader.onerror = (error) => {
				toast.error('❌ Failed to upload image');
				reject(error);
			};

			reader.readAsDataURL(file);
		});
	};

	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();

		if (!isSignedIn) {
			openSignIn();
			return;
		} else {
			try {
				setLoading(true);
				const savedBusiness = await saveBusinessToDb(business);
				setBusiness(savedBusiness);
				localStorage.removeItem('business');

				toast.success('🎉 Business saved Successfully');
				router.push(`/dashboard/business/edit/${savedBusiness._id}`);
			} catch (err) {
				console.log(err);
				toast.error('❌ Failed to save business');
			} finally {
				setLoading(false);
			}
		}
	};

	const getUserBusinesses = async () => {
		setLoading(true);

		try {
			const businesses = await getUserBusinessesFromDb();
			setBusinesses(businesses);
		} catch (err) {
			console.log(err);
			toast.error('❌ Failed to fetch businesses');
		} finally {
			setLoading(false);
		}
	};

	const getBusiness = async () => {
		try {
			const business = await getBusinessFromDb(id.toString());
			setBusiness(business);
		} catch (err) {
			console.log(err);
			toast.error('❌ Failed to fetch business');
		}
	};

	return (
		<BusinessContext.Provider
			value={{
				business,
				setBusiness,
				loading,
				setLoading,
				handleChange,
				handleSubmit,
				businesses,
				setBusinesses,
				initialState,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
};

export const useBusiness = () => {
	const context = useContext(BusinessContext);

	if (!context) {
		throw new Error('useBusiness must be used within a BusinessProvider');
	}
	return context;
};
