import BookEvent from "@/components/BookEvent";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetails = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} width={17} height={17} alt={alt} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTag = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: { description, image, overview, date, time, location, mode, agenda, audience, tags, organizer },
  } = await response.json();

  if (!description) {
    return notFound();
  }

  const bookings = 10;

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        {/* Left Side - Event Content */}
        <div className="content">
          <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

          <section className="flex-col-gap-2">
            <h1>Overview</h1>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h1>Event Details</h1>
            <EventDetails icon="/icons/calendar.svg" alt="Calendar Icon" label={date} />
            <EventDetails icon="/icons/clock.svg" alt="Calendar Icon" label={time} />
            <EventDetails icon="/icons/pin.svg" alt="Calendar Icon" label={location} />
            <EventDetails icon="/icons/mode.svg" alt="Calendar Icon" label={mode} />
            <EventDetails icon="/icons/audience.svg" alt="Calendar Icon" label={audience} />
          </section>

          <EventAgenda agendaItems={JSON.parse(agenda[0])} />

          <section>
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTag tags={JSON.parse(tags[0])} />
        </div>

        {/* Right Side - Event Booking */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p>{bookings} people who have booked their spot!</p>
            ) : (
              <p>Be the first to book your spot!</p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailsPage;
