import { z } from 'zod';

const itinerarySchema = z.object({
  locationName: z.string().min(1, "Location name is required"),
  description: z.string().min(1, "Description is required"),
  visitDate: z.string().min(1, "Visit date is required"),
});

const tripSchema = z.object({
  title: z.string().min(1, "Title is required"),
  source: z.string().min(1, "Source is required"),
  destination: z.string().min(1, "Destination is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a positive number"),
  occupancy: z.string().regex(/^\d+$/, "Occupancy must be a positive integer"),
  itinerary: z.string().refine(data => {
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.every(item => itinerarySchema.safeParse(item).success);
    } catch {
      return false;
    }
  }, "Itinerary is invalid"),
  files: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  amenities: z.string().refine(data => {
    try {
      const parsed = JSON.parse(data);
      return typeof parsed === 'object' && ['wifi', 'meals', 'parking', 'guide'].every(key => typeof parsed[key] === 'boolean');
    } catch {
      return false;
    }
  }, "Amenities are invalid"),
}).refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
  message: "Start date must be less than or equal to end date",
  path: ["startDate"],
});

export { tripSchema };
