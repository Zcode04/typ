import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,   // يجب أن يأتي من .env.local
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET!,      // مثلاً "production"
  apiVersion: '2025-01-01',                                 // تاريخ API حديث
  useCdn:      process.env.NODE_ENV === 'production',       // اختياري
  token:      process.env.SANITY_API_TOKEN,                 // إن احتجت
});

// تعريف واجهة لهيكل الصورة في Sanity
export interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  [key: string]: unknown; // للسماح بأي خصائص إضافية
}

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImage) => builder.image(source);