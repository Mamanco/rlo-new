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

const teamCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    name: z.string(),
		job_title: z.string(),
    image: z.string(),
		order: z.number(),
		education: z.array(z.string()).optional(),
		clients: z.array(z.string()).optional(),
		bars: z.array(z.string()).optional(),
		practices: z.array(z.string()).optional(),
  }).passthrough(),
});

const articleCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    name: z.string(),
		date: z.preprocess((arg) => {
      if (typeof arg === 'string') {
        return new Date(arg + 'Z');
      }
      return arg;
    }, z.date()),
    image: z.string(),
  }).passthrough(),
});

const testimonialCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    name: z.string(),
		company: z.string().nullable().optional(),
		position: z.string().nullable().optional(),
		date: z.preprocess((arg) => {
      if (typeof arg === 'string') {
        return new Date(arg + 'Z');
      }
      return arg;
    }, z.date()),
    image: z.string().nullable().optional(),
		featured: z.boolean(),
  }).passthrough(),
});

const educationCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    name: z.string(),
	})
});

const barCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    name: z.string(),
	})
});

const clientCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    name: z.string(),
	})
});


// Export a `collections` object to register your new 'blog' collection
export const collections = {
	pages: pagesCollection,
	practices: practicesCollection,
	team: teamCollection,
	articles: articleCollection,
	testimonials: testimonialCollection,
	education: educationCollection,
	bars: barCollection,
	clients: clientCollection,
};
