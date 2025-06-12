import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';

import {
  AddPendingProviderSchema,
  CreateOrderSchema,
  FindOrdersByRadiusSchema,
  SelectProviderSchema,
} from './orderValidation';
import { validateRequest } from '@/common/utils/httpHandlers';
import { orderController } from './orderController';
import auth from '../../middlewares/authUser';

export const orderRegistry = new OpenAPIRegistry();
export const orderRouter: Router = express.Router();

orderRouter.post('/', validateRequest(CreateOrderSchema), orderController.create);
orderRouter.put('/:id', validateRequest(CreateOrderSchema), orderController.updateOrder);

orderRouter.post('/pending-providers', validateRequest(AddPendingProviderSchema), orderController.addPendingProvider);

orderRouter.get(
  '/find-orders-by-radius',
  validateRequest(FindOrdersByRadiusSchema),
  auth,
  orderController.findOrdersByRadius
);

orderRouter.post('/select-provider', validateRequest(SelectProviderSchema), orderController.selectProvider);

orderRouter.get('/:id', auth, orderController.getOrderById);

orderRouter.get('/client/:id', auth, orderController.getOrdersByClientId);
orderRouter.get('/provider/:id', auth, orderController.getOrdersByProviderId);
