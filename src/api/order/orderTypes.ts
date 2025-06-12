import { z } from 'zod';
import { OrderSchema, CreateOrderSchema, FindOrdersByRadiusSchema, SelectProviderSchema } from './orderValidation';

export type Order = z.infer<typeof OrderSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
export type FindOrdersByRadius = z.infer<typeof FindOrdersByRadiusSchema>;
export type SelectProvider = z.infer<typeof SelectProviderSchema>;
