export type Locale = "en" | "no";

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar
    "nav.fleet": "Our Fleet",
    "nav.book": "Book Now",
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.bookRide": "Book a Ride",

    // Hero
    "hero.tagline": "Premium Transport Services",
    "hero.title1": "Travel in",
    "hero.title2": "unmatched elegance",
    "hero.description":
      "From luxury limousines to executive minibuses, Oslo Limousine delivers a first-class transport experience for every occasion.",
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
    "booking.vehicleLuxury": "Luxury Sedan (up to 4 passengers)",
    "booking.vehicleFour": "4 Seats — Sedan",
    "booking.vehicleSeven": "7 Seats — Van",
    "booking.vehicleSixteen": "16 Seats — Minibus",
    "booking.vehicleSixteenPlus": "16+ Seats — Custom Quote",
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

    "booking.rateType": "How would you like to book?",
    "booking.rateTypeFixed": "Fixed Price",
    "booking.rateTypeFixedDesc": "Hourly charter or a Gardemoen Airport transfer",
    "booking.rateTypeDistance": "Distance",
    "booking.rateTypeDistanceDesc": "Enter pickup & destination, priced by route",

    "booking.fixedOptionHourly": "Hourly Charter",
    "booking.fixedOptionAirport": "Gardemoen Airport",
    "booking.hoursLabel": "Duration (hours)",
    "booking.hourlyAddressLabel": "Pickup Location",
    "booking.airportDirection": "Direction",
    "booking.airportFromAirport": "From Gardemoen to Oslo",
    "booking.airportToAirport": "From Oslo to Gardemoen",
    "booking.airportAddressLabel": "Address in Oslo",
    "booking.airportOutsideOsloNote":
      "The fixed rate applies to trips within Oslo. If this address is outside Oslo, distance-based pricing applies automatically.",
    "booking.airportOutsideOsloConfirmed":
      "This address is outside Oslo — priced by distance instead of the fixed rate.",
    "booking.airportRouteRequired":
      "Please select your address from the suggestions above so we can confirm the route before payment.",
    "booking.surchargeWeekend": "Weekend surcharge (+15%)",
    "booking.surchargeHoliday": "Public holiday surcharge (+40%)",

    "booking.mapPreview": "Route preview",
    "booking.calculatingRoute": "Calculating your route…",
    "booking.enterAddresses": "Enter both addresses to see live pricing.",
    "booking.routeError":
      "We couldn't calculate this route. Please check the addresses and try again.",
    "booking.mapsUnavailable":
      "Live map & distance pricing isn't available right now — enter your addresses and we'll confirm the exact price manually.",
    "booking.distanceSummary": "Estimated distance",
    "booking.durationSummary": "Estimated duration",

    "booking.estimatedFare": "Estimated fare",
    "booking.fixedFare": "Fixed fare",
    "booking.fareEstimateNote":
      "This is an estimate based on the route provided. The final fare may vary slightly with real traffic conditions.",
    "booking.customQuoteNote":
      "For 16+ passengers, we'll send you a custom quote after reviewing your request — no payment is needed now.",

    "booking.paymentMethod": "Payment",
    "booking.payNow": "Pay Now",
    "booking.payNowDesc": "Secure card payment, confirmed instantly",
    "booking.payLater": "Pay Later",
    "booking.payLaterDesc": "We'll invoice you before the ride, per our booking policy",
    "booking.payNowCta": "Pay & Book",
    "booking.paymentCancelled":
      "Your payment was cancelled. You can try again, or choose to pay later instead.",

    "booking.submit": "Request Booking",
    "booking.sending": "Sending Request...",
    "booking.redirecting": "Redirecting to secure payment…",
    "booking.errorGeneric":
      "Something went wrong. Please try again or contact us directly.",
    "booking.submitNote":
      "Our team will confirm your booking within 30 minutes during business hours.",
    "booking.trust247Title": "24/7 Service",
    "booking.trust247Desc": "Available any time",
    "booking.trustConfirmTitle": "Instant Confirm",
    "booking.trustConfirmDesc": "Quick response",
    "booking.trustDriversTitle": "Vetted Chauffeurs",
    "booking.trustDriversDesc": "Licensed & experienced",
    "booking.trustPricingTitle": "Fixed Pricing",
    "booking.trustPricingDesc": "No hidden fees",
    "booking.policyTitle": "Important Booking Information",
    "booking.policy1": "Bookings must be made at least 24 hours before the scheduled ride.",
    "booking.policy2": "Payment must be completed at least 5 hours before your ride.",
    "booking.dateError": "Bookings must be made at least 24 hours in advance. Please select a later date or time.",
    "booking.confirmedTitle": "Booking Request Received",
    "booking.confirmedDescription":
      "Thank you for choosing Oslo Limousine. Our team will contact you shortly to confirm the details of your ride. You will receive a confirmation email within 30 minutes.",
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

    // Pricing
    "pricing.tagline": "Pricing",
    "pricing.title": "Transparent, upfront pricing",
    "pricing.description":
      "Metered rates apply to standard rides. Hourly charters and Gardemoen Airport transfers are available at a fixed price.",
    "pricing.baseFare": "Base fare",
    "pricing.perKm": "Price per km",
    "pricing.perMinute": "Price per minute",
    "pricing.minFare": "Minimum fare",
    "pricing.fixedTitle": "Fixed prices",
    "pricing.hourly": "Hourly rate",
    "pricing.airport": "Gardemoen — fixed, one-way to Oslo",
    "pricing.luxury.name": "Luxury Sedan",
    "pricing.luxury.desc": "Our flagship executive sedan for VIP travel.",
    "pricing.four.name": "4 Seats",
    "pricing.four.desc": "Standard sedan for everyday rides and airport transfers.",
    "pricing.seven.name": "7 Seats",
    "pricing.seven.desc": "Spacious van for groups and families.",
    "pricing.sixteen.name": "16 Seats",
    "pricing.sixteen.desc": "Minibus for larger groups, weddings, and corporate shuttles.",
    "pricing.sixteen.airportNote":
      "Up to 2,990 kr — adjusted based on the number of passengers.",
    "pricing.sixteenPlus.name": "16+ Seats",
    "pricing.sixteenPlus.desc":
      "Custom multi-vehicle or coach solutions for large groups.",
    "pricing.sixteenPlus.note":
      "We'll send you a price based on your number of passengers.",
    "pricing.destinationNote":
      "The fixed Gardemoen rate applies to trips within Oslo. If your trip starts at Gardemoen and continues beyond Oslo, the price is calculated by distance instead.",
    "pricing.surchargeNote":
      "A 15% surcharge applies on weekends, and a 40% surcharge applies on Norwegian public holidays (røde dager).",
    "pricing.cta": "Book This Vehicle",
    "pricing.customCta": "Request a Custom Quote",
    "pricing.footnote":
      "All prices are in Norwegian kroner (NOK) and include VAT. Final fares for metered rides are calculated automatically based on actual distance and time.",

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
    "nav.pricing": "Priser",
    "nav.contact": "Kontakt",
    "nav.bookRide": "Bestill en Tur",

    // Hero
    "hero.tagline": "Premium Transporttjenester",
    "hero.title1": "Reis med",
    "hero.title2": "uovertruffen eleganse",
    "hero.description":
      "Fra luksus limousiner til eksklusive minibusser, Oslo Limousine leverer en førsteklasses transportopplevelse for enhver anledning.",
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
    "booking.vehicleLuxury": "Luksus Sedan (opptil 4 passasjerer)",
    "booking.vehicleFour": "4 Seter — Sedan",
    "booking.vehicleSeven": "7 Seter — Van",
    "booking.vehicleSixteen": "16 Seter — Minibuss",
    "booking.vehicleSixteenPlus": "16+ Seter — Tilbud på Forespørsel",
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

    "booking.rateType": "Hvordan vil du bestille?",
    "booking.rateTypeFixed": "Fast Pris",
    "booking.rateTypeFixedDesc": "Timesleie eller fast Gardemoen-transport",
    "booking.rateTypeDistance": "Distanse",
    "booking.rateTypeDistanceDesc": "Oppgi hente- og leveringssted, pris basert på rute",

    "booking.fixedOptionHourly": "Timesleie",
    "booking.fixedOptionAirport": "Gardemoen",
    "booking.hoursLabel": "Varighet (timer)",
    "booking.hourlyAddressLabel": "Hentested",
    "booking.airportDirection": "Retning",
    "booking.airportFromAirport": "Fra Gardemoen til Oslo",
    "booking.airportToAirport": "Fra Oslo til Gardemoen",
    "booking.airportAddressLabel": "Adresse i Oslo",
    "booking.airportOutsideOsloNote":
      "Fastprisen gjelder for turer innenfor Oslo. Hvis denne adressen er utenfor Oslo, blir prisen automatisk basert på distanse.",
    "booking.airportOutsideOsloConfirmed":
      "Denne adressen er utenfor Oslo — prisen beregnes basert på distanse i stedet for fastprisen.",
    "booking.airportRouteRequired":
      "Vennligst velg adressen din fra forslagene over, slik at vi kan bekrefte ruten før betaling.",
    "booking.surchargeWeekend": "Helgetillegg (+15%)",
    "booking.surchargeHoliday": "Tillegg for røde dager (+40%)",

    "booking.mapPreview": "Forhåndsvisning av rute",
    "booking.calculatingRoute": "Beregner ruten din…",
    "booking.enterAddresses": "Oppgi begge adresser for å se pris fortløpende.",
    "booking.routeError":
      "Vi klarte ikke å beregne denne ruten. Sjekk adressene og prøv igjen.",
    "booking.mapsUnavailable":
      "Kart og distansepris er ikke tilgjengelig akkurat nå — oppgi adressene dine, så bekrefter vi nøyaktig pris manuelt.",
    "booking.distanceSummary": "Estimert distanse",
    "booking.durationSummary": "Estimert varighet",

    "booking.estimatedFare": "Estimert pris",
    "booking.fixedFare": "Fast pris",
    "booking.fareEstimateNote":
      "Dette er et estimat basert på oppgitt rute. Endelig pris kan variere noe med faktiske trafikkforhold.",
    "booking.customQuoteNote":
      "For 16+ passasjerer sender vi deg et tilbud etter å ha sett på forespørselen din — ingen betaling nå.",

    "booking.paymentMethod": "Betaling",
    "booking.payNow": "Betal Nå",
    "booking.payNowDesc": "Sikker kortbetaling, bekreftet umiddelbart",
    "booking.payLater": "Betal Senere",
    "booking.payLaterDesc": "Vi fakturerer deg før turen, i henhold til vår bestillingspolicy",
    "booking.payNowCta": "Betal og Bestill",
    "booking.paymentCancelled":
      "Betalingen din ble avbrutt. Du kan prøve igjen, eller velge å betale senere i stedet.",

    "booking.submit": "Send Bestilling",
    "booking.sending": "Sender Forespørsel...",
    "booking.redirecting": "Videresender til sikker betaling…",
    "booking.errorGeneric":
      "Noe gikk galt. Vennligst prøv igjen eller kontakt oss direkte.",
    "booking.submitNote":
      "Vårt team vil bekrefte bestillingen din innen 30 minutter i åpningstiden.",
    "booking.trust247Title": "24/7 Service",
    "booking.trust247Desc": "Tilgjengelig når som helst",
    "booking.trustConfirmTitle": "Umiddelbar Bekreftelse",
    "booking.trustConfirmDesc": "Raskt svar",
    "booking.trustDriversTitle": "Erfarne Sjåfører",
    "booking.trustDriversDesc": "Lisensiert og erfaren",
    "booking.trustPricingTitle": "Fast Pris",
    "booking.trustPricingDesc": "Ingen skjulte gebyrer",
    "booking.policyTitle": "Viktig bestillingsinformasjon",
    "booking.policy1": "Bestillinger må gjøres minst 24 timer før planlagt tur.",
    "booking.policy2": "Betaling må fullføres minst 5 timer før turen.",
    "booking.dateError": "Bestillinger må gjøres minst 24 timer i forveien. Vennligst velg en senere dato eller tid.",
    "booking.confirmedTitle": "Bestilling Bekreftet",
    "booking.confirmedDescription":
      "Takk for at du valgte Oslo Limousine. Vårt team vil kontakte deg snart for å bekrefte detaljene for turen din. Du vil motta en bekreftelse på e-post innen 30 minutter.",
    "booking.bookAnother": "Bestill En Ny Tur",

    // Services
    "services.tagline": "Tjenester",
    "services.title": "Skreddersydd for dine behov",
    "services.description":
      "Uansett anledning, Oslo Limousine tilbyr en sømløs og raffinert transportopplevelse.",
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

    // Pricing
    "pricing.tagline": "Priser",
    "pricing.title": "Åpne priser, ingen overraskelser",
    "pricing.description":
      "Målt pris gjelder for vanlige turer. Timesleie og faste Gardemoen-transporter tilbys til fast pris.",
    "pricing.baseFare": "Grunnpris",
    "pricing.perKm": "Pris per km",
    "pricing.perMinute": "Pris per minutt",
    "pricing.minFare": "Minimum pris",
    "pricing.fixedTitle": "Fast pris",
    "pricing.hourly": "Timepris",
    "pricing.airport": "Gardemoen — fast pris, Gardemoen–Oslo",
    "pricing.luxury.name": "Luksus Biler",
    "pricing.luxury.desc": "Vår fremste eksekutive sedan for VIP-transport.",
    "pricing.four.name": "4 Seter",
    "pricing.four.desc": "Standard sedan for hverdagsturer og flyplasstransport.",
    "pricing.seven.name": "7 Seter",
    "pricing.seven.desc": "Romslig van for grupper og familier.",
    "pricing.sixteen.name": "16 Seter",
    "pricing.sixteen.desc": "Minibuss for større grupper, bryllup og bedriftsturer.",
    "pricing.sixteen.airportNote":
      "Maks 2 990 kr — blir justert basert på antall passasjerer.",
    "pricing.sixteenPlus.name": "16+ Seter",
    "pricing.sixteenPlus.desc":
      "Skreddersydde løsninger med flere kjøretøy eller busser for store grupper.",
    "pricing.sixteenPlus.note":
      "Vi sender deg pris basert på antall kunder.",
    "pricing.destinationNote":
      "Fastprisen til/fra Gardemoen gjelder for turer innenfor Oslo. Dersom turen starter fra Gardemoen og fortsetter forbi Oslo, beregnes prisen basert på distanse i stedet.",
    "pricing.surchargeNote":
      "Det tilkommer 15% tillegg i helger, og 40% tillegg på norske røde dager.",
    "pricing.cta": "Bestill Dette Kjøretøyet",
    "pricing.customCta": "Be Om Tilbud",
    "pricing.footnote":
      "Alle priser er i norske kroner (NOK) og inkluderer mva. Endelig pris for målte turer beregnes automatisk basert på faktisk distanse og tid.",

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
