import { Request, Response, RequestHandler } from 'express';
import { orderService } from './orderService';
import { getErrorMessage } from '@/common/utils/error';
class OrderController {
  public create: RequestHandler = async (req: Request, res: Response) => {
    try {
      const orderData = req.body;

      // TODO: check if oder already exists
      const serviceResponse = await orderService.create(orderData);
      return res.status(201).json(serviceResponse);
    } catch (error) {
      return res.status(400).json({ error: getErrorMessage(error) });
    }
  };

  public addPendingProvider: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { orderId, providerId } = req.body;
      await orderService.addPendingProvider(orderId, providerId);
      return res.status(200).json({ message: 'Pending provider added successfully' });
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  };

  public findOrdersByRadius: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { longitude, latitude, radiusKm } = req.query;

      if (!longitude || !latitude || !radiusKm) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const orders = await orderService.findOrdersByRadius(+longitude, +latitude, +radiusKm);
      return res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  };

  public selectProvider: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { orderId, providerId } = req.body;
      await orderService.selectProvider(orderId, providerId);
      return res.status(200).json({ message: 'Provider selected successfully' });
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  };

  public getOrderById: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({ error: `Order with ID ${id} not found` });
      }
      return res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  };

  public updateOrder: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedOrder = await orderService.updateOrder(id, req.body);
      return res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  };

  public getOrdersByClientId: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const orders = await orderService.getOrdersByClientId(id);
      return res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  };
  public getOrdersByProviderId: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const orders = await orderService.getOrdersByProviderId(id);
      return res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  };
}

export const orderController = new OrderController();
