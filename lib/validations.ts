import { z } from 'zod';

export const RepairRequestSchema = z.object({
  issue_type: z.string().min(1, 'Please select what needs to be fixed'),
  customer_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  customer_phone: z.string().min(10, 'Enter a valid phone number').max(20),
  customer_email: z.string().email('Enter a valid email address'),
  customer_city_state: z.string().max(100).optional(),
  customer_notes: z.string().max(1000).optional(),
  photos: z.array(z.object({
    photo_type: z.string(),
    file_url: z.string().url(),
    storage_path: z.string(),
  })).optional(),
});

export const NewWigRequestSchema = z.object({
  wig_for: z.string().min(1, 'Please select who the wig is for'),
  style_requested: z.string().min(1, 'Please select a style'),
  budget_range: z.string().min(1, 'Please select a budget range'),
  customer_name: z.string().min(2).max(100),
  customer_phone: z.string().min(10).max(20),
  customer_email: z.string().email(),
  customer_city_state: z.string().max(100).optional(),
  customer_notes: z.string().max(1000).optional(),
  photos: z.array(z.object({
    photo_type: z.string(),
    file_url: z.string().url(),
    storage_path: z.string(),
  })).optional(),
});

export const TrackOrderSchema = z.object({
  order_number: z.string().min(3).max(30).regex(/^WR-/, 'Invalid order number format'),
  contact: z.string().min(3).max(100),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
});

export const AdminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const UpdateRequestSchema = z.object({
  status: z.enum([
    'Request Received', 'Quote Sent', 'Waiting for Wig', 'In Repair',
    'Ready for Payment', 'Shipped Back', 'Completed', 'Canceled',
  ]).optional(),
  quote_amount: z.number().nonnegative().nullable().optional(),
  deposit_amount: z.number().nonnegative().nullable().optional(),
  final_balance: z.number().nonnegative().nullable().optional(),
  payment_status: z.enum(['unpaid', 'deposit_paid', 'paid_in_full', 'refunded']).optional(),
  shipping_tracking_in: z.string().max(200).nullable().optional(),
  shipping_tracking_out: z.string().max(200).nullable().optional(),
  admin_notes: z.string().max(5000).nullable().optional(),
  customer_visible_notes: z.string().max(2000).nullable().optional(),
});
