export type Locale = "en" | "no";

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar
    "nav.fleet": "Our Fleet",
    "nav.book": "Book Now",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.bookRide": "Book a Ride",

    // Hero
    "hero.tagline": "Professional Chauffeur Service in Oslo",
    "hero.title1": "Premium",
    "hero.title2": "transport service",
    "hero.description":
      "Professional chauffeur-driven transport for tourists, business travelers, and special occasions. Airport transfers, city tours, and private hire throughout Oslo and Norway.",
    "hero.cta": "Book Your Ride",
    "hero.explore": "Explore Our Fleet",
    "hero.discover": "Discover",

    // Fleet
    "fleet.tagline": "Our Fleet",
    "fleet.title": "Choose your vehicle",
    "fleet.description":
      "Every vehicle in our fleet is meticulously maintained and chauffeured by experienced professionals.",
    "fleet.book": "Book",
    "fleet.seats": "seats",
    "fleet.passengers": "passengers",

    // Fleet vehicles
    "fleet.sedan.name": "Luxury Sedan",
    "fleet.sedan.description":
      "Our flagship sedan offers the pinnacle of comfort for up to 4 passengers. Perfect for airport transfers, business meetings, and special occasions.",
    "fleet.sedan.f1": "Leather interior",
    "fleet.sedan.f2": "Climate control",
    "fleet.sedan.f3": "Wi-Fi",
    "fleet.sedan.f4": "Refreshments",

    "fleet.van.name": "Luxury Van",
    "fleet.van.description":
      "Spacious and refined, our luxury van accommodates up to 8 passengers in premium comfort. Ideal for group outings, corporate events, and family trips.",
    "fleet.van.f1": "Executive seating",
    "fleet.van.f2": "Entertainment system",
    "fleet.van.f3": "USB charging",
    "fleet.van.f4": "Luggage space",

    "fleet.minibus.name": "Minibus",
    "fleet.minibus.description":
      "Our premium minibus carries up to 15 passengers with style and ease. The perfect choice for large groups, weddings, and corporate shuttles.",
    "fleet.minibus.f1": "Reclining seats",
    "fleet.minibus.f2": "PA system",
    "fleet.minibus.f3": "Air conditioning",
    "fleet.minibus.f4": "Overhead storage",

    "fleet.custom.name": "Custom Order",
    "fleet.custom.description":
      "Need transport for more than 15 passengers? We arrange custom solutions with multiple vehicles or full-size coaches tailored to your group.",
    "fleet.custom.f1": "Flexible capacity",
    "fleet.custom.f2": "Multi-vehicle options",
    "fleet.custom.f3": "Dedicated coordinator",
    "fleet.custom.f4": "Custom pricing",
    "fleet.custom.badge": "16+ Passengers",
    "fleet.custom.cta": "Request Custom Quote",

    // Stats
    "stats.rides": "Rides Completed",
    "stats.satisfaction": "Client Satisfaction",
    "stats.availability": "Availability",
    "stats.chauffeurs": "Professional Chauffeurs",

    // Booking
    "booking.tagline": "Reservation",
    "booking.title": "Book your ride",
    "booking.description":
      "Fill in the details below and our team will arrange your premium transport experience.",
    "booking.name": "Full Name",
    "booking.namePlaceholder": "John Doe",
    "booking.email": "Email Address",
    "booking.emailPlaceholder": "johndoe@example.com",
    "booking.phone": "Phone Number",
    "booking.phonePlaceholder": "+1 (234) 567-890",
    "booking.vehicle": "Vehicle Type",
    "booking.vehiclePlaceholder": "Select a vehicle",
    "booking.sedan": "Luxury Sedan (up to 4 passengers)",
    "booking.van": "Luxury Van (up to 8 passengers)",
    "booking.minibus": "Minibus (up to 15 passengers)",
    "booking.custom": "Custom Order (16+ passengers)",
    "booking.passengerCount": "Number of Passengers",
    "booking.passengerCountPlaceholder": "e.g. 25",
    "booking.pickup": "Pickup Location",
    "booking.pickupPlaceholder": "Address or landmark",
    "booking.dropoff": "Drop-off Location",
    "booking.dropoffPlaceholder": "Address or landmark",
    "booking.date": "Date",
    "booking.time": "Time",
    "booking.notes": "Special Requests",
    "booking.notesPlaceholder":
      "Any special requirements, luggage details, or preferences...",
    "booking.submit": "Request Booking",
    "booking.sending": "Sending Request...",
    "booking.errorGeneric":
      "Something went wrong. Please try again or contact us directly.",
    "booking.submitNote":
      "Our team will confirm your booking within 30 minutes during business hours.",
    "booking.policyTitle": "Booking Information",
    "booking.policy1": "Online bookings require at least 5 hours advance notice.",
    "booking.policy2": "Need a ride sooner? Call us directly at +47 484 20 389",
    "booking.dateError": "Online bookings must be made at least 5 hours in advance. For urgent requests, please call us at +47 484 20 389.",
    "booking.confirmedTitle": "Booking Request Received",
    "booking.confirmedDescription":
      "Thank you for choosing Oslo Limousine. Our team will contact you shortly to confirm the details of your ride. You will receive a confirmation email within 15 minutes.",
    "booking.bookAnother": "Book Another Ride",

    // Services
    "services.tagline": "Services",
    "services.title": "Tailored to your needs",
    "services.description":
      "Whatever the occasion, Oslo Limousine provides a seamless and refined transport experience.",
    "services.airport": "Airport Transfers",
    "services.airportDesc":
      "Punctual pickups and drop-offs at all major airports. Flight tracking ensures we are always on time.",
    "services.corporate": "Corporate Events",
    "services.corporateDesc":
      "Professional transport solutions for conferences, seminars, and corporate retreats.",
    "services.weddings": "Weddings & Occasions",
    "services.weddingsDesc":
      "Make your special day unforgettable with our elegantly appointed vehicles and attentive chauffeurs.",
    "services.business": "Business Travel",
    "services.businessDesc":
      "Reliable executive transport for meetings, roadshows, and daily commutes.",
    "services.hourly": "Hourly Charter",
    "services.hourlyDesc":
      "Flexible hourly bookings with a dedicated chauffeur at your disposal throughout the day.",
    "services.vip": "VIP & Security",
    "services.vipDesc":
      "Discreet, secure transport with trained professionals for high-profile clients.",

    // Footer
    "footer.description":
      "Premium transport services for discerning clients. Experience the pinnacle of comfort and reliability.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.contactUs": "Contact Us",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.rights": "All rights reserved.",
  },
  no: {
    // Navbar
    "nav.fleet": "Vår Flåte",
    "nav.book": "Bestill Nå",
    "nav.services": "Tjenester",
    "nav.contact": "Kontakt",
    "nav.bookRide": "Bestill en Tur",

    // Hero
    "hero.tagline": "Profesjonell Sjaffortjeneste i Oslo",
    "hero.title1": "Premium",
    "hero.title2": "transporttjeneste",
    "hero.description":
      "Profesjonell sjaffordrevet transport for turister, forretningsreisende og spesielle anledninger. Flyplasstransport, byturer og privat leie i hele Oslo og Norge.",
    "hero.cta": "Bestill Din Tur",
    "hero.explore": "Utforsk Vår Flåte",
    "hero.discover": "Oppdag",

    // Fleet
    "fleet.tagline": "Vår Flåte",
    "fleet.title": "Velg ditt kjøretøy",
    "fleet.description":
      "Hvert kjøretøy i vår flåte er nøye vedlikeholdt og kjørt av erfarne profesjonelle.",
    "fleet.book": "Bestill",
    "fleet.seats": "seter",
    "fleet.passengers": "passasjerer",

    // Fleet vehicles
    "fleet.sedan.name": "Luksus Sedan",
    "fleet.sedan.description":
      "Vår flaggskip-sedan tilbyr det ypperste innen komfort for opptil 4 passasjerer. Perfekt for flyplasstransport, forretningsmøter og spesielle anledninger.",
    "fleet.sedan.f1": "Skinninteriør",
    "fleet.sedan.f2": "Klimakontroll",
    "fleet.sedan.f3": "Wi-Fi",
    "fleet.sedan.f4": "Forfriskninger",

    "fleet.van.name": "Luksus Van",
    "fleet.van.description":
      "Romslig og raffinert, vår luksus van har plass til opptil 8 passasjerer i premium komfort. Ideell for gruppeturer, bedriftsarrangementer og familieturer.",
    "fleet.van.f1": "Eksklusive seter",
    "fleet.van.f2": "Underholdningssystem",
    "fleet.van.f3": "USB-lading",
    "fleet.van.f4": "Bagasjeplass",

    "fleet.minibus.name": "Minibuss",
    "fleet.minibus.description":
      "Vår premium minibuss frakter opptil 15 passasjerer med stil og komfort. Det perfekte valget for store grupper, bryllup og bedriftsshuttler.",
    "fleet.minibus.f1": "Justerbare seter",
    "fleet.minibus.f2": "PA-system",
    "fleet.minibus.f3": "Klimaanlegg",
    "fleet.minibus.f4": "Bagasjehyller",

    "fleet.custom.name": "Spesialbestilling",
    "fleet.custom.description":
      "Trenger du transport for mer enn 15 passasjerer? Vi arrangerer skreddersydde løsninger med flere kjøretøy eller fullstørrelse busser tilpasset din gruppe.",
    "fleet.custom.f1": "Fleksibel kapasitet",
    "fleet.custom.f2": "Flere kjøretøy",
    "fleet.custom.f3": "Dedikert koordinator",
    "fleet.custom.f4": "Tilpasset pris",
    "fleet.custom.badge": "16+ Passasjerer",
    "fleet.custom.cta": "Be Om Tilbud",

    // Stats
    "stats.rides": "Turer Fullført",
    "stats.satisfaction": "Kundetilfredshet",
    "stats.availability": "Tilgjengelighet",
    "stats.chauffeurs": "Profesjonelle Sjåfører",

    // Booking
    "booking.tagline": "Reservasjon",
    "booking.title": "Bestill din tur",
    "booking.description":
      "Fyll inn detaljene nedenfor, og vårt team vil arrangere din premium transportopplevelse.",
    "booking.name": "Fullt Navn",
    "booking.namePlaceholder": "Ola Nordmann",
    "booking.email": "E-postadresse",
    "booking.emailPlaceholder": "ola@eksempel.no",
    "booking.phone": "Telefonnummer",
    "booking.phonePlaceholder": "+47 123 45 678",
    "booking.vehicle": "Kjøretøytype",
    "booking.vehiclePlaceholder": "Velg et kjøretøy",
    "booking.sedan": "Luksus Sedan (opptil 4 passasjerer)",
    "booking.van": "Luksus Van (opptil 8 passasjerer)",
    "booking.minibus": "Minibuss (opptil 15 passasjerer)",
    "booking.custom": "Spesialbestilling (16+ passasjerer)",
    "booking.passengerCount": "Antall Passasjerer",
    "booking.passengerCountPlaceholder": "f.eks. 25",
    "booking.pickup": "Hentested",
    "booking.pickupPlaceholder": "Adresse eller landemerke",
    "booking.dropoff": "Leveringssted",
    "booking.dropoffPlaceholder": "Adresse eller landemerke",
    "booking.date": "Dato",
    "booking.time": "Tid",
    "booking.notes": "Spesielle Ønsker",
    "booking.notesPlaceholder":
      "Eventuelle spesielle krav, bagasjedetaljer eller preferanser...",
    "booking.submit": "Send Bestilling",
    "booking.sending": "Sender Forespørsel...",
    "booking.errorGeneric":
      "Noe gikk galt. Vennligst prøv igjen eller kontakt oss direkte.",
    "booking.submitNote":
      "Vårt team vil bekrefte bestillingen din innen 30 minutter i åpningstiden.",
    "booking.policyTitle": "Bestillingsinformasjon",
    "booking.policy1": "Nettbestillinger krever minst 5 timers forvarsel.",
    "booking.policy2": "Trenger du transport raskere? Ring oss direkte på +47 484 20 389",
    "booking.dateError": "Nettbestillinger må gjøres minst 5 timer i forveien. For hasteoppdrag, ring oss på +47 484 20 389.",
    "booking.confirmedTitle": "Bestilling Bekreftet",
    "booking.confirmedDescription":
      "Takk for at du valgte Oslo Limousine. Vårt team vil kontakte deg snart for å bekrefte detaljene for turen din. Du vil motta en bekreftelse på e-post innen 15 minutter.",
    "booking.bookAnother": "Bestill En Ny Tur",

    // Services
    "services.tagline": "Tjenester",
    "services.title": "Skreddersydd for dine behov",
    "services.description":
      "Uansett anledning, Oslo Limousine tilbyr en s��mløs og raffinert transportopplevelse.",
    "services.airport": "Flyplasstransport",
    "services.airportDesc":
      "Punktlige hentinger og leveringer på alle store flyplasser. Flysporing sikrer at vi alltid er i tide.",
    "services.corporate": "Bedriftsarrangementer",
    "services.corporateDesc":
      "Profesjonelle transportløsninger for konferanser, seminarer og bedriftsturer.",
    "services.weddings": "Bryllup & Anledninger",
    "services.weddingsDesc":
      "Gjør din spesielle dag uforglemmelig med våre elegant utstyrte kjøretøy og oppmerksomme sjåfører.",
    "services.business": "Forretningsreiser",
    "services.businessDesc":
      "Pålitelig eksekutiv transport for møter, roadshows og daglige pendlinger.",
    "services.hourly": "Timesleie",
    "services.hourlyDesc":
      "Fleksible timebestillinger med en dedikert sjåfør til din disposisjon gjennom hele dagen.",
    "services.vip": "VIP & Sikkerhet",
    "services.vipDesc":
      "Diskret, sikker transport med trente profesjonelle for profilerte kunder.",

    // Footer
    "footer.description":
      "Premium transporttjenester for kresne kunder. Opplev det ypperste innen komfort og pålitelighet.",
    "footer.quickLinks": "Hurtiglenker",
    "footer.services": "Tjenester",
    "footer.contactUs": "Kontakt Oss",
    "footer.privacy": "Personvern",
    "footer.terms": "Vilkår for Bruk",
    "footer.rights": "Alle rettigheter forbeholdt.",
  },
};
