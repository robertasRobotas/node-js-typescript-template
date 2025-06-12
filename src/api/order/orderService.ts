import { OrderRepository } from './orderRepository';
import { logger } from '@/server';
import { CreateOrder, Order } from './orderTypes';
import { v4 as uuidv4 } from 'uuid';

export class OrderService {
  private repository: OrderRepository;

  constructor(repository: OrderRepository = new OrderRepository()) {
    this.repository = repository;
  }

  async create(orderData: CreateOrder): Promise<Order> {
    try {
      const order = {
        ...orderData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pendingProviderIds: [],
        approvedProviderId: null,
        status: 'pending',
        location: {
          type: 'Point',
          coordinates: [orderData.clientLongitude, orderData.clientLatitude],
        },
      };
      const newOrder = await this.repository.create(order);
      return newOrder;
    } catch (error) {
      const errorMessage = `Error creating order: ${(error as Error).message}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async addPendingProvider(orderId: string, providerId: string): Promise<void> {
    const order = await this.repository.addPendingProvider(orderId, providerId);
    return order;
  }

  async findOrdersByRadius(longitude: number, latitude: number, radiusKm: number) {
    return this.repository.findOrdersByRadius(longitude, latitude, radiusKm);
  }

  async selectProvider(orderId: string, providerId: string): Promise<void> {
    await this.repository.updateOne(orderId, { approvedProviderId: providerId });
  }

  async getOrderById(id: string) {
    try {
      const order = await this.repository.getOrderById(id);
      if (!order) {
        throw new Error(`Order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      const errorMessage = `Error retrieving order: ${(error as Error).message}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async updateOrder(id: string, updateData: Partial<Order>): Promise<Order | null> {
    try {
      const order = await this.repository.updateOne(id, updateData);
      if (!order) {
        throw new Error(`Order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      const errorMessage = `Error updating order: ${(error as Error).message}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getOrdersByClientId(clientId: string) {
    try {
      const orders = await this.repository.getOrdersByClientId(clientId);
      return orders;
    } catch (error) {
      const errorMessage = `Error retrieving orders: ${(error as Error).message}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getOrdersByProviderId(providerId: string) {
    try {
      const orders = await this.repository.getOrdersByProviderId(providerId);
      return orders;
    } catch (error) {
      const errorMessage = `Error retrieving orders: ${(error as Error).message}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export const orderService = new OrderService();
