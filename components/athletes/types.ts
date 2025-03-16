interface Athlete {
    id: string;
    name: string;
    age: number;
    email: string;
    phone: string;
    status: AthleteStatus;
  }

type AthleteStatus = "active" | "inactive";