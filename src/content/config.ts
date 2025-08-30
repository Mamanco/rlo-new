// src/content/config.ts
import { defineCollection, z } from 'astro:content';


// The new collection for your unique website pages
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(), // Make fields optional if they don't appear on every page
    hero_image: z.string().optional(),
		main_menu: z.boolean().optional(),
		order: z.number().nullable().optional(),
		top_components: z.array(z.string()).optional(),
		bottom_components: z.array(z.string()).optional(),
		features: z.array(z.string()).optional(),
  }).passthrough(),
});

const practicesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    name: z.string(), // Make fields optional if they don't appear on every page
    image: z.string(),
		type: z.string(),
		featured: z.boolean(),
		featured_order: z.number().nullable().optional(),
		hidden: z.boolean(),
  }).passthrough(),
});


// Export a `collections` object to register your new 'blog' collection
export const collections = {
	pages: pagesCollection,
	practices: practicesCollection,
};
