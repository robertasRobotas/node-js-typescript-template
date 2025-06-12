import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    clientId: { type: String, required: true },
    clientLongitude: { type: Number, required: true },
    clientLatitude: { type: Number, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    startsAt: { type: String, required: true },
    endsAt: { type: String, required: true },
    clientFirstName: { type: String, required: true },
    clientImgUrl: { type: String, required: false },
    addressId: { type: String, required: true },
    childrenIds: { type: [String], required: true },
    isDropOff: { type: Boolean, required: true },
    isUrgent: { type: Boolean, required: true },
    currentSelectedAlergiesIds: { type: [String], default: [] },
    currentSelectedDisabilitiesIds: { type: [String], default: [] },
    selectedSpokenLanguageIds: { type: [String], default: [] },
    selectedPetIds: { type: [String], default: [] },
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now },
    pendingProviderIds: { type: [String], default: [] },
    approvedProviderId: { type: String, default: null },
    status: { type: String, default: 'PENDING' },
  },
  { timestamps: true }
);

// Add 2dsphere index for geolocation
orderSchema.index({ location: '2dsphere' });

export const OrderModel = mongoose.model('Order', orderSchema);
