export interface Event {
    _id?:string,
    eventName?: string;
    eventDate?: Date;
    eventTime?: string;
    location?: string;
    audiences?: string[];
    eventImages?: string[];
    details?: string;
    isActive?: boolean;
  }
  