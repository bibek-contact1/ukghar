/* =====================================================================
   UKGhar — SITE CONTENT (London)
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the website text,
   universities, rooms, prices, facilities, testimonials and events.

   Tips:
   - Images: put your own photos in /assets/images/ and use a path like
     "assets/images/my-room.jpg". Online URLs also work.
   - Videos: put .mp4 files in /assets/videos/ (e.g. "assets/videos/aisha.mp4")
     OR use a YouTube video ID in `youtube` (the part after "v=" in the link).
   - Keep the commas and quotes exactly as they are.
   ===================================================================== */

window.UKGHAR = {
  /* ---------- Company details (used in header, footer, contact) ---------- */
  company: {
    name: "UKGhar",
    tagline: "London student homes, sorted.",
    phone: "+44 7344 847781",
    whatsapp: "447344847781", // digits only, international format, used for the WhatsApp link
    email: "bibek.contact1@gmail.com",
    address: "120 Gray's Inn Road, London WC1X 8AL",
    officeHours: [
      { days: "Monday – Friday", time: "9:00am – 6:00pm" },
      { days: "Saturday", time: "10:00am – 4:00pm" },
      { days: "Emergencies", time: "24/7 for residents" }
    ],
    /* Country picked by default in the enquiry form's phone number box
       (2-letter code, e.g. "NP" Nepal, "GB" United Kingdom, "IN" India) */
    defaultPhoneCountry: "NP",
    currency: "£",
    priceUnit: "per month",
    contractLengths: "44 or 51 weeks", // shown on each room's details page
    mapEmbed: "https://www.google.com/maps?q=Gray's+Inn+Road,London+WC1X&output=embed",
    social: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      youtube: "https://youtube.com/"
    },
    /* Where the enquiry form sends to.
       Recommended: your Google Apps Script link (see email-setup/SETUP.md),
         e.g. "https://script.google.com/macros/s/AKfy.../exec"
       Also works: "https://formsubmit.co/ajax/YOUR-EMAIL"
       Leave empty "" to keep forms in demo mode (shows a success message only). */
    formEndpoint: "https://script.google.com/macros/s/AKfycbysPdNOiR6ME1l8oPxAfLSbKfi47z3gLYMYnjhZSIvTqAU33tAlwZC551XB4XtnzK3F/exec",
    announcement: "Rooms available now for 2026/27, and 2027/28 bookings are open. All bills included."
  },

  /* ---------- Headline numbers ---------- */
  stats: [
    { value: "2,400+", label: "Students housed" },
    { value: "10", label: "London properties" },
    { value: "6", label: "Universities served" },
    { value: "4.8/5", label: "Average resident rating" }
  ],

  /* ---------- Who we are (About page) ---------- */
  about: {
    intro:
      "UKGhar started in 2019 when three friends got tired of damp flats, surprise bills and landlords who never picked up the phone. “Ghar” means home, and that's what we set out to give students: safe, clean, well-run homes close to campus, with people who actually care.",
    mission:
      "To give every student in London a safe, affordable and friendly place to live, so they can focus on studying, growing and enjoying university life.",
    vision:
      "To be London's most trusted student home provider, known for honest prices, great facilities and a real sense of community.",
    values: [
      { icon: "shield", title: "Safety first", text: "24/7 on-site security, CCTV, fob entry and background-checked staff in every building." },
      { icon: "check", title: "Honest pricing", text: "One monthly price. Energy, Wi-Fi, water and contents insurance are all included. No hidden fees, ever." },
      { icon: "heart", title: "Genuine care", text: "Friendly residence teams and a 24/7 support line, with extra help for international students settling into the UK." },
      { icon: "users", title: "Community", text: "Socials, day trips, sports and study sessions. You won't just get a room, you'll make friends for life." }
    ],
    timeline: [
      { year: "2019", text: "First house opens in Stratford with 22 rooms for University of East London students." },
      { year: "2021", text: "Expanded to Ealing and Roehampton. Launched our 24/7 resident support line." },
      { year: "2023", text: "Opened our first purpose-built residence at the Royal Docks with a cinema room, gym and study hub." },
      { year: "2025", text: "Passed 2,000 students housed. Launched virtual tours and online booking for international students." },
      { year: "2026", text: "10 properties across London serving 6 universities, and still growing." }
    ],
    team: [
      { name: "Bibek", image: "" },
      { name: "Sahil", image: "" },
      { name: "Shemanta", image: "" }
    ]
  },

  /* ---------- What we do / Services ---------- */
  services: [
    { icon: "bus", title: "Free airport pickup", text: "Arriving from abroad? We'll meet you at Heathrow or Gatwick and bring you to your new home on move-in day, free of charge." },
    { icon: "home", title: "Fully furnished rooms", text: "Move in with just your suitcase. Bed, mattress, desk, chair, wardrobe and storage are already there." },
    { icon: "zap", title: "All bills included", text: "Energy, Wi-Fi, water and contents insurance in one monthly price. No meters, no surprise bills." },
    { icon: "shield", title: "No UK guarantor? No problem", text: "International students can book without a UK guarantor through our flexible payment plans." },
    { icon: "key", title: "Viewings & easy booking", text: "Book an in-person viewing or a live video tour, then reserve online in minutes." },
    { icon: "phone", title: "24/7 support", text: "A residence team on site and a support line that's always answered, day or night." }
  ],

  /* ---------- How it works (3 steps) ---------- */
  steps: [
    { title: "Find your home", text: "Choose your university and browse rooms within walking distance or a short Tube ride." },
    { title: "Book a viewing", text: "Visit in person or take a live video tour, then reserve online with a holding deposit." },
    { title: "Move in", text: "Collect your keys, meet your flatmates, and start enjoying London life." }
  ],

  /* ---------- Universities & locations ----------
     id:   short unique id (used in links, e.g. locations.html?uni=uel)
     city: the London area, used for the filter buttons on the Locations page
     nearest: closest Tube / rail station to the property                 */
  universities: [
    {
      id: "uel",
      name: "University of East London",
      short: "UEL",
      city: "East London",
      area: "Docklands & Stratford",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=70",
      properties: [
        { name: "UKGhar Royal Docks", distance: "6 min walk", nearest: "Cyprus (DLR)", priceFrom: 280, rooms: ["Twin studio", "Double sharing room", "Triple sharing room", "4-person sharing room", "5-person sharing room"], availability: "Available", gender: "Mixed" },
        { name: "UKGhar Stratford Point", distance: "8 min walk", nearest: "Stratford", priceFrom: 320, rooms: ["Twin studio", "Double sharing room", "Triple sharing room"], availability: "Few rooms left", gender: "Mixed" }
      ]
    },
    {
      id: "bpp",
      name: "BPP University",
      short: "BPP",
      city: "Central London",
      area: "Holborn & Waterloo",
      image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=900&q=70",
      properties: [
        { name: "UKGhar Holborn Court", distance: "7 min walk", nearest: "Holborn", priceFrom: 320, rooms: ["Twin studio", "Double sharing room", "Triple sharing room"], availability: "Few rooms left", gender: "Mixed" },
        { name: "UKGhar Southwark Yard", distance: "10 min walk", nearest: "Waterloo", priceFrom: 320, rooms: ["Premium studio", "Twin studio", "Double sharing room", "Triple sharing room"], availability: "Available", gender: "Mixed" }
      ]
    },
    {
      id: "coventry",
      name: "Coventry University London",
      short: "CU London",
      city: "Central London",
      area: "Aldgate & City of London",
      image: "https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&w=900&q=70",
      properties: [
        { name: "UKGhar Aldgate House", distance: "5 min walk", nearest: "Aldgate East", priceFrom: 280, rooms: ["Twin studio", "Double sharing room", "Triple sharing room", "4-person sharing room", "5-person sharing room"], availability: "Available", gender: "Mixed" }
      ]
    },
    {
      id: "uwl",
      name: "University of West London",
      short: "UWL",
      city: "West London",
      area: "Ealing & Brentford",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=900&q=70",
      properties: [
        { name: "UKGhar Ealing Green", distance: "6 min walk", nearest: "South Ealing", priceFrom: 280, rooms: ["Double sharing room", "Triple sharing room", "4-person sharing room", "5-person sharing room"], availability: "Available", gender: "Mixed" },
        { name: "UKGhar Brentford Lock", distance: "Free shuttle, 10 min", nearest: "Brentford", priceFrom: 280, rooms: ["Twin studio", "Double sharing room", "Triple sharing room", "4-person sharing room", "5-person sharing room"], availability: "Available", gender: "Mixed" }
      ]
    },
    {
      id: "roehampton",
      name: "University of Roehampton",
      short: "Roehampton",
      city: "South West London",
      area: "Roehampton & Putney",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=70",
      properties: [
        { name: "UKGhar Putney Heath", distance: "8 min walk", nearest: "Barnes", priceFrom: 320, rooms: ["Twin studio", "Double sharing room", "Triple sharing room"], availability: "Available", gender: "Mixed" },
        { name: "UKGhar Putney Riverside", distance: "15 min by bus", nearest: "Putney", priceFrom: 320, rooms: ["Premium studio", "Twin studio", "Double sharing room", "Triple sharing room"], availability: "Waiting list", gender: "Mixed" }
      ]
    },
    {
      id: "ysj",
      name: "York St John University London",
      short: "YSJ London",
      city: "East London",
      area: "Canary Wharf & East India",
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=900&q=70",
      properties: [
        { name: "UKGhar Canary Wharf", distance: "7 min walk", nearest: "East India (DLR)", priceFrom: 320, rooms: ["Twin studio", "Double sharing room", "Triple sharing room"], availability: "Available", gender: "Mixed" }
      ]
    }
  ],

  /* ---------- Room types (prices are PER MONTH) ----------
     perPerson: true  -> price is shown as "per person / month"
     description: a short paragraph shown on the room's own details page
     sleeps / bed / bathroom / kitchen: the "Key facts" on the details page
     photos:  list of { src, caption }. Use your own: "assets/images/premium-1.jpg"
     videos:  list of videos shown in the room's gallery. Two ways:
                { src: "assets/videos/premium-tour.mp4", caption: "Room tour" }
                { youtube: "VIDEO_ID", caption: "Room tour" }
              Leave as [] if there are no videos for that room.            */
  roomTypes: [
    {
      name: "Premium studio",
      priceFrom: 1500,
      perPerson: false,
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=70",
      features: ["Extra-large private studio, higher floor", "Own full kitchen & en-suite bathroom", "Double bed, desk & lounge area"],
      bestFor: "Extra space",
      description: "A spacious private studio on a higher floor, with your own full kitchen and en-suite bathroom. Plenty of room to study, cook, relax and have friends over, all in one place and all to yourself.",
      sleeps: "1 student",
      bed: "Double bed",
      bathroom: "Private en-suite",
      kitchen: "Private full kitchen",
      photos: [
        { src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=75", caption: "Studio bedroom" },
        { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=75", caption: "Double bed & lighting" },
        { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=75", caption: "Lounge corner" },
        { src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=75", caption: "Full kitchen" },
        { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=75", caption: "En-suite bathroom" },
        { src: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1400&q=75", caption: "Living space" }
      ],
      videos: []
    },
    {
      name: "Twin studio",
      priceFrom: 700,
      perPerson: true,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=70",
      features: ["Studio shared with one friend", "Two beds & two desks", "Private kitchenette & bathroom"],
      bestFor: "Live with a friend",
      description: "A self-contained studio you share with one friend, partner or sibling. You each get your own bed and desk, and the kitchenette and bathroom are just for the two of you.",
      sleeps: "2 students",
      bed: "Two single beds",
      bathroom: "Private (shared by 2)",
      kitchen: "Private kitchenette",
      photos: [
        { src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=75", caption: "Twin studio" },
        { src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1400&q=75", caption: "Sleeping area" },
        { src: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1400&q=75", caption: "Study & living space" },
        { src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=75", caption: "Kitchenette" },
        { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=75", caption: "Private bathroom" }
      ],
      videos: []
    },
    {
      name: "Double sharing room",
      priceFrom: 400,
      perPerson: true,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=70",
      features: ["Room shared by 2 students", "Own bed, desk & wardrobe each", "Shared kitchen & bathroom"],
      bestFor: "Most popular",
      description: "Our most popular choice. You share a bright, comfortable room with one other student, each with your own bed, desk and wardrobe, and use the shared kitchen and bathrooms in the flat.",
      sleeps: "2 students",
      bed: "Single bed each",
      bathroom: "Shared",
      kitchen: "Shared kitchen",
      photos: [
        { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=75", caption: "Double sharing room" },
        { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=75", caption: "Beds & bedside storage" },
        { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=75", caption: "Room at night" },
        { src: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1400&q=75", caption: "Shared lounge & dining" },
        { src: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1400&q=75", caption: "Shared bathroom" }
      ],
      videos: []
    },
    {
      name: "Triple sharing room",
      priceFrom: 320,
      perPerson: true,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=70",
      features: ["Room shared by 3 students", "Own bed, desk & storage each", "Shared kitchen & bathroom"],
      bestFor: "Great value",
      description: "A roomy shared room for three students, with your own bed, desk and storage. A great-value way to live close to campus and make friends from day one.",
      sleeps: "3 students",
      bed: "Single bed each",
      bathroom: "Shared",
      kitchen: "Shared kitchen",
      photos: [
        { src: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1400&q=75", caption: "Triple sharing room" },
        { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=75", caption: "Sleeping area" },
        { src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1400&q=75", caption: "Shared dining area" },
        { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=75", caption: "Shared kitchen" }
      ],
      videos: []
    },
    {
      name: "4-person sharing room",
      priceFrom: 300,
      perPerson: true,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=70",
      features: ["Room shared by 4 students", "Own bed & storage each", "Shared kitchen, lounge & bathroom"],
      bestFor: "Budget friendly",
      description: "A friendly shared room for four students. Everyone gets their own bed and storage, and you have a shared kitchen, lounge and bathrooms in the flat.",
      sleeps: "4 students",
      bed: "Single bed each",
      bathroom: "Shared",
      kitchen: "Shared kitchen & lounge",
      photos: [
        { src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=75", caption: "4-person sharing room" },
        { src: "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?auto=format&fit=crop&w=1400&q=75", caption: "Sleeping area" },
        { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=75", caption: "Shared lounge" },
        { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=75", caption: "Common room" },
        { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=75", caption: "Shared bathroom" }
      ],
      videos: []
    },
    {
      name: "5-person sharing room",
      priceFrom: 280,
      perPerson: true,
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=70",
      features: ["Room shared by 5 students", "Own bed & storage each", "Shared kitchen, lounge & bathroom"],
      bestFor: "Best value",
      description: "Our best-value option. A large shared room for five students, each with their own bed and storage, plus a shared kitchen, lounge and bathrooms.",
      sleeps: "5 students",
      bed: "Single bed each",
      bathroom: "Shared",
      kitchen: "Shared kitchen & lounge",
      photos: [
        { src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1400&q=75", caption: "5-person sharing room" },
        { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=75", caption: "Sleeping area" },
        { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=75", caption: "Shared living room" },
        { src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=75", caption: "Lounge" },
        { src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=75", caption: "Shared kitchen" }
      ],
      videos: []
    }
  ],

  /* ---------- Facilities (grouped) ---------- */
  facilities: [
    {
      group: "In your room",
      items: [
        { icon: "bed", title: "Comfy bed & mattress", text: "Small double or double bed with a quality mattress." },
        { icon: "book", title: "Study desk & chair", text: "A proper workspace with a desk lamp and shelving." },
        { icon: "zap", title: "Plug & USB sockets", text: "Plenty of charging points by the bed and desk." },
        { icon: "home", title: "Wardrobe & storage", text: "Wardrobe, drawers and under-bed storage." }
      ]
    },
    {
      group: "Around the building",
      items: [
        { icon: "wifi", title: "Ultrafast Wi-Fi", text: "Up to 1 Gbps full-fibre broadband in every room, ready for streaming and online lectures." },
        { icon: "book", title: "Study hubs", text: "Quiet study rooms and bookable group study pods, open 24/7." },
        { icon: "dumbbell", title: "Free on-site gym", text: "Cardio and weights at selected properties, free for residents." },
        { icon: "camera", title: "Cinema & games room", text: "Big-screen movie nights, pool table and gaming consoles." },
        { icon: "washing", title: "Laundry room", text: "App-controlled washers and dryers on site." },
        { icon: "utensils", title: "Shared kitchens", text: "Modern kitchens with ovens, hobs, microwaves and fridge-freezers." },
        { icon: "bus", title: "Secure bike storage", text: "Covered, CCTV-monitored cycle store. Great for getting around London." },
        { icon: "leaf", title: "Roof terraces & gardens", text: "Outdoor spaces to relax, with skyline views at selected buildings." }
      ]
    },
    {
      group: "Safety & support",
      items: [
        { icon: "camera", title: "24/7 CCTV", text: "Cameras covering every entrance and shared area." },
        { icon: "key", title: "Fob entry & parcel room", text: "Secure key-fob access and a parcel room so deliveries are never missed." },
        { icon: "shield", title: "24/7 on-site security", text: "Trained security staff in every building, every night." },
        { icon: "phone", title: "Wellbeing support", text: "Friendly residence team plus 24/7 access to a student wellbeing helpline." }
      ]
    }
  ],

  /* What's included in rent (UK "bills included" table) */
  included: [
    { item: "Wi-Fi (up to 1 Gbps)", included: true },
    { item: "Gas & electricity", included: true },
    { item: "Water", included: true },
    { item: "Contents insurance", included: true },
    { item: "Furnished room", included: true },
    { item: "Gym, cinema room & study hubs", included: true },
    { item: "24/7 security & support", included: true },
    { item: "Council Tax", included: true, note: "Full-time students are exempt. We'll help you get your exemption letter." },
    { item: "TV Licence", included: false, note: "Only needed if you watch live TV or BBC iPlayer in your room (£174.50/year)." }
  ],

  /* ---------- Video testimonials ----------
     Add a local video:   video: "assets/videos/aisha.mp4"
     Or a YouTube video:  youtube: "dQw4w9WgXcQ"  (just the ID)              */
  videoTestimonials: [
    {
      name: "Aisha K.",
      course: "BSc Computer Science, University of East London",
      quote: "I'm six minutes from the Docklands campus, and the Wi-Fi never drops, even when the whole flat is streaming.",
      poster: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=70",
      video: "assets/videos/testimonial-1.mp4",
      youtube: "",
      type: "Room tour"
    },
    {
      name: "Arjun S.",
      course: "LLM Law, BPP University",
      quote: "Moving from India, I had no UK guarantor. UKGhar sorted everything, and even picked me up from Heathrow.",
      poster: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=70",
      video: "assets/videos/testimonial-2.mp4",
      youtube: "",
      type: "Student story"
    },
    {
      name: "Chloe W.",
      course: "BA Business Management, Roehampton",
      quote: "Putney Heath on my doorstep and the roof terrace in summer are unreal. My flatmates have become my best friends.",
      poster: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=70",
      video: "assets/videos/testimonial-3.mp4",
      youtube: "",
      type: "Student story"
    },
    {
      name: "UKGhar Royal Docks",
      course: "Full building tour",
      quote: "Take a walk through our studios, cinema room, gym and waterside terrace.",
      poster: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=70",
      video: "assets/videos/tour-royal-docks.mp4",
      youtube: "",
      type: "Room tour"
    }
  ],

  /* ---------- Written reviews ---------- */
  reviews: [
    { name: "Oliver T.", course: "BSc Cyber Security, University of West London", rating: 5, text: "Spotless building, brilliant gym and the team fix things the same day. Worth every penny." },
    { name: "Fatima A.", course: "MBA, Coventry University London", rating: 5, text: "Booking from Dubai was so easy. I did a live video tour and moved in a week before term started." },
    { name: "Daniel O.", course: "MSc Project Management, York St John London", rating: 4, text: "The 24/7 study room saved me during exams. East India DLR is literally round the corner." },
    { name: "Mei L.", course: "BSc Nursing, University of East London", rating: 5, text: "Feels safe coming home late, and the events are a great way to meet people outside your course." }
  ],

  /* ---------- Extra activities & events ----------
     Events move from "Upcoming" to "Recent highlights" automatically the
     day after their date. status: "past" moves one there early.         */
  events: [
    {
      title: "Halloween Social",
      date: "2026-10-30",
      location: "All properties",
      status: "upcoming",
      category: "Social",
      image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=70",
      text: "Fancy dress, music, games and pizza in every common room. Best costume wins a £50 voucher."
    },
    {
      title: "Thames Boat Cruise",
      date: "2026-11-14",
      location: "Departs Westminster Pier",
      status: "upcoming",
      category: "Trip",
      image: "https://images.unsplash.com/photo-1494922275507-58dc039ed337?auto=format&fit=crop&w=900&q=70",
      text: "Cruise past the London Eye, Tower Bridge and the O2 with your flatmates. Tickets free for residents."
    },
    {
      title: "Winter Wonderland Trip",
      date: "2026-11-28",
      location: "Hyde Park",
      status: "upcoming",
      category: "Trip",
      image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=900&q=70",
      text: "A festive night out with free entry, hot chocolate and a group ride on the big wheel."
    },
    {
      title: "Exam Season Study Sprint",
      date: "2026-12-07",
      location: "Study hubs, all properties",
      status: "upcoming",
      category: "Wellbeing",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=70",
      text: "Late-night study rooms, free coffee and snacks, plus a wellbeing session to keep stress in check."
    },
    {
      title: "Inter-House Five-a-Side Cup",
      date: "2027-01-23",
      location: "Powerleague, Shoreditch",
      status: "upcoming",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=70",
      text: "Represent your building in our annual five-a-side tournament. Trophies and bragging rights at stake."
    },
    {
      title: "Freshers' Welcome Party",
      date: "2026-09-19",
      location: "All properties",
      status: "past",
      category: "Social",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=70",
      text: "Over 900 new residents met their flatmates at our biggest welcome party yet."
    },
    {
      title: "Seven Sisters Day Trip",
      date: "2026-10-03",
      location: "East Sussex coast",
      status: "past",
      category: "Trip",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=70",
      text: "A coach trip to the famous white cliffs, with a coastal walk and fish and chips by the sea."
    },
    {
      title: "International Food Night",
      date: "2026-10-10",
      location: "UKGhar Stratford Point",
      status: "past",
      category: "Culture",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=70",
      text: "Residents from 40 countries cooked dishes from home, from momos and jollof to pierogi."
    }
  ],

  /* ---------- FAQs ---------- */
  faqs: [
    { q: "What's included in the monthly rent?", a: "Wi-Fi, gas, electricity, water, contents insurance, your furnished room, the gym, study and cinema rooms, 24/7 security and our events are all included." },
    { q: "Do I need a UK guarantor?", a: "No. If you don't have a UK-based guarantor, you can pay your rent in instalments up front instead, or use a guarantor service. We'll talk you through the options." },
    { q: "How does the deposit work?", a: "You pay a holding deposit to reserve your room. It's protected in a government-approved Tenancy Deposit Scheme and returned at the end of your stay, minus any damages." },
    { q: "How long are the contracts?", a: "We offer 44-week and 51-week academic year contracts, plus shorter stays for summer schools and January starters, subject to availability." },
    { q: "Do I have to pay Council Tax?", a: "Full-time students are exempt from Council Tax. We'll help you get your student exemption certificate from your university." },
    { q: "Can I view the room before booking?", a: "Yes. Book an in-person viewing at a time that suits you, or a live video tour if you're outside London or overseas." },
    { q: "I'm an international student. Can you help?", a: "Absolutely. We offer Heathrow and Gatwick pickups, help with opening a UK bank account and registering with a GP, and a welcome pack for your first week." }
  ]
};
