export interface Sports {
    id: string;
    name: string;
}

export interface Athlete {
    id: string;
    name: string;
    age: number;
    email: string;
    phone: string;
    status: AthleteStatus;
    profileImage?: string;
    sport?: Sports[];
  }

type AthleteStatus = "active" | "inactive";