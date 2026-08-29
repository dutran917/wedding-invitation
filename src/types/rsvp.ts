export type AttendanceStatus = "yes" | "no";
export type GuestSide = "groom" | "bride" | "both";

export interface RsvpSubmission {
  name: string;
  phone: string;
  attending: AttendanceStatus;
  guestCount: number;
  side: GuestSide;
  wishes: string;
}

export interface RsvpResponse extends RsvpSubmission {
  id: string;
  submittedAt: string;
}
