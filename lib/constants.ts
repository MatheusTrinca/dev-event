export interface Event {
  slug: string;
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    slug: 'google-io-2025',
    image: '/images/event1.png',
    title: 'Google I/O 2025',
    location: 'Mountain View, CA',
    date: 'May 13-15, 2025',
    time: '10:00 AM - 5:00 PM',
  },
  {
    slug: 'react-conf-2025',
    image: '/images/event2.png',
    title: 'React Conf 2025',
    location: 'Henderson, NV',
    date: 'May 15-16, 2025',
    time: '9:00 AM - 6:00 PM',
  },
  {
    slug: 'github-universe-2025',
    image: '/images/event3.png',
    title: 'GitHub Universe 2025',
    location: 'San Francisco, CA',
    date: 'October 28-29, 2025',
    time: '9:00 AM - 6:00 PM',
  },
  {
    slug: 'aws-reinvent-2025',
    image: '/images/event4.png',
    title: 'AWS re:Invent 2025',
    location: 'Las Vegas, NV',
    date: 'November 29 - December 3, 2025',
    time: '8:00 AM - 8:00 PM',
  },
  {
    slug: 'pycon-us-2025',
    image: '/images/event5.png',
    title: 'PyCon US 2025',
    location: 'Pittsburgh, PA',
    date: 'May 14-22, 2025',
    time: '9:00 AM - 6:00 PM',
  },
  {
    slug: 'hackmit-2025',
    image: '/images/event6.png',
    title: 'HackMIT 2025',
    location: 'Cambridge, MA',
    date: 'September 13-14, 2025',
    time: '12:00 PM - 12:00 PM',
  },
  {
    slug: 'kubecon-north-america-2025',
    image: '/images/event1.png',
    title: 'KubeCon + CloudNativeCon NA',
    location: 'Atlanta, GA',
    date: 'November 10-13, 2025',
    time: '9:00 AM - 6:00 PM',
  },
  {
    slug: 'microsoft-build-2025',
    image: '/images/event2.png',
    title: 'Microsoft Build 2025',
    location: 'Seattle, WA',
    date: 'May 19-21, 2025',
    time: '9:00 AM - 5:00 PM',
  },
  {
    slug: 'dockercon-2025',
    image: '/images/event3.png',
    title: 'DockerCon 2025',
    location: 'Los Angeles, CA',
    date: 'May 5-7, 2025',
    time: '9:00 AM - 6:00 PM',
  },
  {
    slug: 'tech-crunch-disrupt-2025',
    image: '/images/event4.png',
    title: 'TechCrunch Disrupt 2025',
    location: 'San Francisco, CA',
    date: 'October 28-30, 2025',
    time: '9:00 AM - 7:00 PM',
  },
  {
    slug: 'nodejs-interactive-2025',
    image: '/images/event5.png',
    title: 'Node.js Interactive 2025',
    location: 'Austin, TX',
    date: 'June 4-6, 2025',
    time: '9:00 AM - 5:00 PM',
  },
  {
    slug: 'def-con-33',
    image: '/images/event6.png',
    title: 'DEF CON 33',
    location: 'Las Vegas, NV',
    date: 'August 7-10, 2025',
    time: '10:00 AM - 8:00 PM',
  },
];
