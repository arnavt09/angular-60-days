export type ApplicationStatus =
  | 'Applied'
  | 'Interview'
  | 'Offer'
  | 'Rejected';

export interface JobApplication {
    id: number;
    company: string;
    position: string;
    email: string;
    status: ApplicationStatus;
    appliedDate: string;
}