import type { MediaAsset } from '@/types/common';

/**
 * Every image on the site, in one place.
 *
 * WHY THIS FILE EXISTS
 *
 * Image paths used to be written inline wherever they were needed, which meant
 * renaming a file was a hunt through several entity files, and nothing stopped
 * two of them drifting out of sync with what was actually on disk. Entities now
 * reference these objects by name, so a file can be renamed, resized or
 * replaced here once.
 *
 * Each entry carries its real dimensions, which is what lets next/image reserve
 * the right box and keep cumulative layout shift at zero, and a base64 LQIP
 * small enough (roughly 100 to 230 bytes) to inline without costing a request.
 *
 * These values are not hand-written. They are produced from the actual files by
 * the conversion documented in imagegeneration.md, so they cannot drift from
 * what is on disk.
 *
 * Alt text is visitor-facing copy, so it belongs here rather than in a .tsx,
 * the same rule that applies to every other string on the site. Alt should say
 * what the image shows, not repeat the heading beside it.
 */
export const images = {
  studioTeam: {
    src: '/images/about/digital-agency-team-ahmedabad.webp',
    alt: 'The Media Radical team working together in the Ahmedabad studio',
    width: 1536,
    height: 1024,
    blurDataURL:
      'data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAwAgCdASoQAAsAAwBSJQBWAMWl5SKDPrWxQAD+arIU+AfgGIWv0mLUGHNUu8wKUJaAmgUNqb9SpwAC8IGna3IwbOMbirUQCCuaiY2DK0EAq7USbjvb083aW6nJpWwJRgA=',
  },

  planningMeeting: {
    src: '/images/about/project-planning-meeting-india.webp',
    alt: 'Two colleagues going through a printed project plan in a meeting room',
    width: 1400,
    height: 933,
    blurDataURL:
      'data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAQCdASoQAAsAAwBSJZgCdADMhGqegAD85NXdFF4Wzp717I86lsbNm1K7MGlvgnu/8/51FQUkkUY4OMwY0UiP3f6kzZoOVb76TIjXAcvJXEDmkm0DhGoAAAA=',
  },

  engineeringSeo: {
    src: '/images/case-studies/engineering-manufacturer-seo-india.webp',
    alt: 'An engineering company manager reviewing website analytics beside the machine floor',
    width: 1400,
    height: 933,
    blurDataURL:
      'data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAABQAgCdASoQAAsAAwBSJZQC7AEefvUT2HWS5AAA/pPVZU2SgHxtK6gZ3uQfzOYtMivhvaSA9Y3efV3lKBHMQpyNk5I0y0EvsLsf1Gy/kfUq7orM/udzxyWRZ/b3AAAA',
  },

  diagnosticsBooking: {
    src: '/images/case-studies/diagnostics-centre-booking-india.webp',
    alt: 'A diagnostics centre receptionist checking a patient in on a tablet',
    width: 1400,
    height: 876,
    blurDataURL:
      'data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADwAQCdASoQAAoAAwBSJZwAAsaSDYiGucAA/udTm/s7RQkk0aB/2HwHBWobMKt5XgXw/q71ULY1nVVVm57WeA35/DbA4Kk2pDCgYVIuLCO9iFmvzfboEfcLZEOoOAAA',
  },

  textileStore: {
    src: '/images/case-studies/textile-showroom-ecommerce-india.webp',
    alt: 'A textile showroom owner photographing fabric for an online order',
    width: 1400,
    height: 876,
    blurDataURL:
      'data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADQAQCdASoQAAoAAwBSJYgCdAC9v633gAD+1z1QTvg39VYIvBIDvk4Q/RZkM8Jt180OEKlCaHhEPPypaQGeb1Onmw5t8AY44tyaq3Rsx0idlFK7vVeJEWnKrWqprfbo8AA=',
  },

  anjaliAnand: {
    src: '/images/testimonials/anjali-anand-clinic-owner.webp',
    alt: 'Dr. Anjali Anand',
    width: 256,
    height: 256,
    blurDataURL:
      'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAACQAgCdASoQABAAAwBSJYgCdIExgsTGVk7B5Al4AAD+9VqgZe7mn3tv9EPfeuruQALimFJBcq1+Tk+vNRvMZd5wj9HKRXviL98fmVjR5rLIIYtT0qkbw2AgU0XJ2rlC8JOdhVBev4nrROWPeeS2jYqoXhtehixIjVsAAA==',
  },

  karanJoshi: {
    src: '/images/testimonials/karan-joshi-business-owner.webp',
    alt: 'Karan Joshi',
    width: 256,
    height: 256,
    blurDataURL:
      'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAACQAgCdASoQABAAAwBSJZgCdAYwxzom2YgnvkIcAAD+8odw518Mc15zBdg7K+fU4Bl9zVuQjMHmQdf4SEyaRIZsyfxFKIOoNVZXwtYFLa+8mO+jzBWg+PplyTq5ByLEOVXN++bXhuqo+94yX+IrUcDiobhoJyHfJFiAAA==',
  },

  nehaDesai: {
    src: '/images/testimonials/neha-desai-marketing-lead.webp',
    alt: 'Neha Desai',
    width: 256,
    height: 256,
    blurDataURL:
      'data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAACQAgCdASoQABAAAwBSJZACdBPAKkipMIamTVB1sAD+9zgwXOTXgBt5kFRoWOfsGzjj78wVne7Jj832nOFbISGMXXM7Zm0f8NWWRH2dVWZd11sScsSZVoWZ5OrtM44Z9S5Cx3/CkmhYEkM2Su8DcZ1zyKAaM8qwP/0fyYx1Avrf8IicSZw0wAAA',
  },

  aiTesting: {
    src: '/images/insights/ai-testing-abstract.webp',
    alt: 'Abstract illustration of connected nodes converging on a bright core',
    width: 1200,
    height: 675,
    blurDataURL:
      'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoQAAkAAwBSJZQAAueCQ78QAP75cpPZwr/AZ1j1x48lIAAA',
  },

  cloudCost: {
    src: '/images/insights/cloud-cost-abstract.webp',
    alt: 'Abstract illustration of stacked blocks with some drifting away',
    width: 1200,
    height: 675,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoQAAkAAwBSJZQCw7Dwt8FclIAA/vPOiwHHway8mVeNzbtHLgsZ84EK1ZN1m5TL5YnqfGsAAAA=',
  },

  designSystems: {
    src: '/images/insights/design-systems-abstract.webp',
    alt: 'Abstract illustration of layered panels with one lifted out of alignment',
    width: 1200,
    height: 675,
    blurDataURL:
      'data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAABwAQCdASoQAAkAAwBSJZQC7AF1AAD+85pQ/yxm/Flxb4QQ+A3Ht49bl6kS/sPFbNlsgqgAAAA=',
  },
} satisfies Record<string, MediaAsset>;

/**
 * Not generated yet. Referenced by the Rasoi Fresh case study, which is not on
 * the Home page, so it renders a placeholder until /portfolio is built and the
 * prompt in imagegeneration.md is run. Kept here rather than inline so it is
 * visible as outstanding work instead of hiding in an entity file.
 */
export const plannedImages = {
  groceryDelivery: {
    src: '/images/case-studies/grocery-delivery-fulfilment-india.webp',
    alt: 'A grocery fulfilment team packing fresh produce for delivery',
    width: 1400,
    height: 876,
  },
} satisfies Record<string, MediaAsset>;
