import { z } from 'zod';

export const OrderSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  clientLongitude: z.number(),
  clientLatitude: z.number(),
  clientFirstName: z.string(),
  clientImgUrl: z.string().optional().nullable(),
  startsAt: z.string(),
  endsAt: z.string(),
  addressId: z.string(),
  childrenIds: z.array(z.string()),
  isDropOff: z.boolean(),
  isUrgent: z.boolean(),
  currentSelectedAlergiesIds: z.array(z.any()).optional(),
  currentSelectedDisabilitiesIds: z.array(z.any()).optional(),
  selectedSpokenLanguageIds: z.array(z.any()).optional(),
  selectedPetIds: z.array(z.any()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  pendingProviderIds: z.array(z.string()).optional(),
  approvedProviderId: z.string().nullable().optional(),
  status: z.string().optional(),
});

export const CreateOrderSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  pendingProviderIds: true,
  approvedProviderId: true,
  status: true,
});

export const AddPendingProviderSchema = z.object({
  orderId: z.string(),
  providerId: z.string(),
});

export const FindOrdersByRadiusSchema = z.object({
  longitude: z.string(),
  latitude: z.string(),
  radiusKm: z.string(),
});

export const SelectProviderSchema = z.object({
  orderId: z.string(),
  providerId: z.string(),
});

export const GetOrderSchema = z.object({
  id: z.number(),
});
