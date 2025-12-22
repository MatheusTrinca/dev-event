import { Event } from '@/database';
import connectDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/events/[slug]
 * Fetches a single event by its unique slug
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Connect to database
    await connectDB();

    // Extract slug from params (Next.js 15+ requires awaiting params)
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { message: 'Slug parameter is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate slug format (URL-friendly: lowercase alphanumeric and hyphens only)
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugPattern.test(slug)) {
      return NextResponse.json(
        {
          message:
            'Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens',
        },
        { status: 400 }
      );
    }

    // Query event by slug
    const event = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    // Return the event
    return NextResponse.json(
      {
        message: 'Event retrieved successfully',
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error('Error fetching event:', error);

    // Handle unexpected errors
    return NextResponse.json(
      {
        message: 'Failed to retrieve event',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
