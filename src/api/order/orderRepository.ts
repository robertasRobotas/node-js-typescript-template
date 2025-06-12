import { OrderModel } from './orderModel';
import { Order } from './orderTypes';

export class OrderRepository {
  async create(orderData: Order): Promise<Order> {
    try {
      const order = new OrderModel({ ...orderData });
      const response = await order.save();
      return response;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async updateOne(id: string, updateData: Partial<Order>): Promise<Order | null> {
    const updatedOrder = await OrderModel.findOneAndUpdate({ id }, { $set: updateData }, { new: true }).lean();
    if (!updatedOrder) return null;
    return updatedOrder;
  }

  async addPendingProvider(orderId: string, providerId: string): Promise<void> {
    const order = await OrderModel.findOne({ id: orderId }).lean();
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    const isPending = order.pendingProviderIds?.includes(providerId);
    if (isPending) {
      await OrderModel.updateOne({ id: orderId }, { $pull: { pendingProviderIds: providerId } });
    } else {
      await OrderModel.updateOne({ id: orderId }, { $addToSet: { pendingProviderIds: providerId } });
    }
  }

  async findOrdersByRadius(longitude: number, latitude: number, radiusKm: number) {
    const orders = await OrderModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },
          distanceField: 'distance',
          maxDistance: radiusKm * 1000,
          spherical: true,
        },
      },
      {
        $lookup: {
          from: 'children',
          localField: 'childrenIds',
          foreignField: 'id',
          as: 'children',
        },
      },
      {
        $lookup: {
          from: 'addresses',
          localField: 'addressId',
          foreignField: 'id',
          as: 'address',
        },
      },
      {
        $unwind: {
          path: '$address',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return orders;
  }

  async getOrderById(id: string): Promise<Order | null> {
    const orders = await OrderModel.aggregate([
      { $match: { id } },
      {
        $lookup: {
          from: 'children',
          localField: 'childrenIds',
          foreignField: 'id',
          as: 'children',
        },
      },
      {
        $lookup: {
          from: 'clients',
          localField: 'clientId',
          foreignField: 'id',
          as: 'client',
        },
      },
      {
        $unwind: { path: '$client', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'addresses',
          localField: 'addressId',
          foreignField: 'id',
          as: 'address',
        },
      },
      {
        $unwind: { path: '$address', preserveNullAndEmptyArrays: true },
      },
      { $limit: 1 },
    ]);

    return orders[0] ?? null;
  }
  async getOrdersByClientId(clientId: string): Promise<Order[]> {
    const orders = await OrderModel.find({ clientId }).lean();
    return orders;
  }
  async getOrdersByProviderId(providerId: string): Promise<Order[]> {
    const orders = await OrderModel.find({ providerId }).lean();
    return orders;
  }
}
