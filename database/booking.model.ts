import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          // RFC 5322 compliant email validation regex
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

// Pre-save hook to validate events exists before creating booking
BookingSchema.pre('save', async function (next) {
  const booking = this as IBooking;

  // Only validate eventId if it's new or modified
  if (booking.isModified('eventId') || booking.isNew) {
    try {
      const eventExists = await Event.findById(booking.eventId).select('_id');

      if (!eventExists) {
        const error = new Error(
          `Event with ID ${booking.eventId} does not exist`
        );
        error.name = 'ValidationError';
        return next(error);
      }
    } catch {
      const validationError = new Error(
        'Invalid events ID format or database error'
      );
      validationError.name = 'ValidationError';
      return next(validationError);
    }
  }

  // Check for duplicate booking (one booking per event per email)
  if (booking.isNew || booking.isModified('eventId') || booking.isModified('email')) {
    const Booking = models?.Booking || model<IBooking>('Booking', BookingSchema);
    const existingBooking = await Booking.findOne({
      eventId: booking.eventId,
      email: booking.email,
      _id: { $ne: booking._id },
    });

    if (existingBooking) {
      const error = new Error(
        'You have already booked this event with this email address'
      );
      error.name = 'ValidationError';
      return next(error);
    }
  }

  next();
});

const Booking = models?.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
