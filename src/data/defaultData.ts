import { BirthdayConfig, LoveLetter, MemoryPhoto } from '../types';

export const DEFAULT_BIRTHDAY_CONFIG: BirthdayConfig = {
  partnerName: 'My Beloved',
  senderName: 'Forever Yours',
  birthdayDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString().slice(0, 16), // 3 days from now by default
  anniversaryDate: '2023-04-18',
  customKicker: 'To The One Who Holds My Heart',
  customHeading: 'Happy Birthday, My Love',
  customMessage: 'Every single second with you is a gift I never take for granted. Today we celebrate the most breathtaking, kind, and radiant soul who makes my world spin.',
};

export const INITIAL_PHOTOS: MemoryPhoto[] = [
  {
    id: 'photo-1',
    title: 'The Golden Hour by the Coast',
    caption: 'When the ocean turned to liquid gold and we promised to always chase sunsets together.',
    date: 'August 14, 2025',
    location: 'Pacific Palisades, CA',
    imageUrl: '', // Will use styled romantic photographic SVG artwork fallback
    category: 'Trips',
    isFavorite: true,
    aspect: 'landscape',
    note: 'You had sand on your cheek and your laugh was echoing with the waves. I knew right there you were my forever.',
  },
  {
    id: 'photo-2',
    title: 'Midnight Candlelit Celebration',
    caption: 'Our impromptu anniversary dinner with fresh pasta and soft jazz on the vinyl player.',
    date: 'November 22, 2025',
    location: 'Our Cozy Kitchen',
    imageUrl: '',
    category: 'Dates',
    isFavorite: true,
    aspect: 'portrait',
    note: 'The candles were melting into little wax puddles, but we stayed talking until 3 AM about everything and nothing.',
  },
  {
    id: 'photo-3',
    title: 'Rainy Afternoon in the Bookstore',
    caption: 'Hiding from the thunderstorm between aisles of vintage poetry and old maps.',
    date: 'January 19, 2026',
    location: 'Corner Bookshop & Cafe',
    imageUrl: '',
    category: 'Little Things',
    isFavorite: false,
    aspect: 'square',
    note: 'You read me that Mary Oliver poem and ordered two warm chai lattes. Simple, quiet perfection.',
  },
  {
    id: 'photo-4',
    title: 'Dancing Under the Starlight',
    caption: 'The night festival when they turned off all the city lights for the summer meteor shower.',
    date: 'July 8, 2025',
    location: 'Observatory Hill',
    imageUrl: '',
    category: 'Milestones',
    isFavorite: true,
    aspect: 'landscape',
    note: 'You pointed at a shooting star, but I was already looking at you making my wish.',
  },
  {
    id: 'photo-5',
    title: 'Sunday Morning Coffee & Vinyl',
    caption: 'Messy hair, warm blanket fort, and your favorite French roast brew.',
    date: 'March 2, 2026',
    location: 'Sunny Living Room',
    imageUrl: '',
    category: 'Little Things',
    isFavorite: false,
    aspect: 'portrait',
    note: 'There is nothing in this universe as comforting as curling up next to you with a book.',
  },
  {
    id: 'photo-6',
    title: 'The Weekend Mountain Cabin Escape',
    caption: 'Crisp pine air, roasting marshmallows over the crackling wood stove fireplace.',
    date: 'October 12, 2025',
    location: 'Blue Ridge Mountains',
    imageUrl: '',
    category: 'Trips',
    isFavorite: true,
    aspect: 'landscape',
    note: 'Waking up to foggy mountain ridges wrapped in one oversized flannel blanket.',
  },
];

export const INITIAL_LETTERS: LoveLetter[] = [
  {
    id: 'letter-1',
    title: 'A Letter for the Day You Were Born',
    subtitle: 'Read first · Before blowing the candles',
    author: 'From My Heart to Yours',
    date: 'Your Special Day',
    theme: 'rose',
    content: `My dearest love,

If I could gather all the stars in the night sky and arrange them into words, they would still fail to capture how deeply thankful I am that you were born on this day.

Before you, the world was beautiful, but with you, everything has an entirely new depth. You bring warmth into rooms simply by walking through the door. You make ordinary Tuesdays feel like poetry, and even in moments when life feels overwhelming, your touch is my immediate anchor.

Thank you for loving me with patience, for laughing at my terrible jokes, and for looking at me in a way that makes me feel like the luckiest human alive. 

On this birthday, my only wish is for your days to be as luminous, full of wonders, and deeply cherished as you make mine. 

Happy Birthday, my whole heart.`,
  },
  {
    id: 'letter-2',
    title: 'The Little Things You Don’t Realize You Do',
    subtitle: 'Observations of pure magic',
    author: 'Your Devoted Partner',
    date: 'A Loving Remembrance',
    theme: 'velvet',
    content: `I wanted to write down a few things that I notice about you—the little things that you do without thinking, which make me fall in love with you all over again:

1. The way your eyes light up right before you are about to say something funny.
2. How you unconsciously reach for my hand when we are crossing the street or standing in a crowded room.
3. The gentle hum you make when you take that first sip of hot coffee in the morning.
4. Your immense kindness toward strangers, animals, and anyone having a rough day.
5. How your head fits perfectly into the crook of my shoulder when we watch movies.
6. The fierce passion and intelligence you bring to the things you care about.

You are made of rare, irreplaceable magic, and loving you is the easiest thing I will ever do.`,
  },
  {
    id: 'letter-3',
    title: 'Our Next Chapter & The Years to Come',
    subtitle: 'A birthday promise for the future',
    author: 'With Endless Devotion',
    date: 'Forever & Beyond',
    theme: 'starlight',
    content: `Looking forward into our future brings me more peace and excitement than anything else. 

I promise to stand beside you through every season—to celebrate your triumphs as loudly as possible, and to hold your hand through every storm. I promise more spontaneous road trips, more slow dances in the kitchen while dinner is simmering, and thousands more quiet mornings where we just listen to the rain.

As you step into another year of life, know with absolute certainty that you will never have to walk alone. I am in your corner, today, tomorrow, and for all the birthdays waiting for us down the road.

I love you beyond measure.`,
  },
];

export const REASONS_WHY: string[] = [
  'The way your smile immediately melts away any stress I had that day.',
  'How you listen so intently when I ramble on about silly topics.',
  'The cute sleepy voice you have in the first ten minutes after waking up.',
  'Your fierce empathy and genuine concern for everyone around you.',
  'How your laughter fills an entire room with genuine warmth.',
  'The little dance you do when you eat your favorite food.',
  'How safe and peaceful your arms feel after a long, exhausting week.',
  'Your razor-sharp wit and how quickly you can make me burst out laughing.',
  'The way you remember tiny details about my favorite things.',
  'How you inspire me every single day to be a kinder, better person.',
  'The warmth of your hand interlaced with mine.',
  'How passionate your eyes look when you talk about your dreams.',
  'The sweet good morning messages that always brighten my morning alarm.',
  'The way you look in my oversized sweaters.',
  'How you make even running errands to the grocery store feel like a cute adventure.',
  'Your gentle patience when I am stubborn or tired.',
  'How you believe in me even when self-doubt creeps in.',
  'The way you smell like lavender, fresh rain, and home.',
  'Because in a world of billions of people, my soul looked at yours and said: "There you are."',
  'The way you sing along off-key in the car with complete joy.',
  'How you squeeze my hand three times when we are in public to say "I love you".',
  'Your sense of adventure and curiosity about the world.',
  'The way you tuck your hair behind your ear when you are concentrating.',
  'Because you are not just my love, but my very best friend in the universe.',
];

export const BIRTHDAY_VOUCHERS = [
  {
    id: 'v-1',
    title: 'Candlelit Dream Dinner',
    description: 'Redeemable for a home-cooked 3-course dinner or restaurant of your exact choice, all on me.',
    badge: 'Fine Dining & Wine',
  },
  {
    id: 'v-2',
    title: 'All-Day Pampering & Massage',
    description: 'An uninterrupted full-body massage, warm essential oils, face mask, and total relaxation.',
    badge: 'Relaxation & Spa',
  },
  {
    id: 'v-3',
    title: 'Spontaneous Weekend Getaway',
    description: 'Pack a bag! A road trip or cozy cabin retreat anywhere within driving distance.',
    badge: 'Adventure For Two',
  },
  {
    id: 'v-4',
    title: 'The "You Win Any Argument" Pass',
    description: 'Present this golden ticket to instantly win any debate, choose the movie, or pick the restaurant.',
    badge: 'Ultimate Privilege',
  },
];
