// programme.model.ts

import { User } from './user';

export class Programme {
  programmeID!: number;
  user!: User;
  objectifID!: number;
  nomProgramme!: string; // Ex: "Programme Perte de Poids", "Programme Musculation"
  description!: string; // Description du programme
  // typeObjectif!: string; // Ex: "Perte de poids", "Gain musculaire", "Endurance", etc.
  dateDebut!: Date;
  dateFin!: Date;
  estActif!: boolean;
}
