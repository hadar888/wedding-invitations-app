import { Guest } from "./GuestTableModel";

export interface WeddingInfo {
    weddingDate: Date;
    weddingTime: Date;
    weddingVenue: WeddingInfoLocation;
    rsvpDate: string;
    brideAndGroomNames: string;
    guests: Guest[],
  };

export interface WeddingInfoLocation {
  name: string;
  wazeLink: string;
  googleMapsLink: string;
}