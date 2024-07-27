import { z } from 'zod';

const tripSchema = z.object({
    title: z.string().min(1, "Title is required"),
    source: z.string().min(1, "Source is required"),
    destination: z.string().min(1, "Destination is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a positive number"),
    occupancy: z.string().regex(/^\d+$/, "Occupancy must be a positive integer"),
    itinerary: z.string().min(1, "Itinerary is required"),
    files: z.array(z.instanceof(File)).min(1, "At least one image is required"),
}).refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "Start date must be less than or equal to end date",
    path: ["startDate"],
});


export default tripSchema;
