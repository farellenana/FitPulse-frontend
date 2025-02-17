import { User } from './user';

export class Objectif {
  objectifID!: number;
  userID!: User;
  nomObjectif!: string; // Par exemple : "Perte de poids", "Gain musculaire", "Endurance", etc.
  descriptionObjectif!: string;
  dateDebut!: Date;
  dateFin!: Date;
}
