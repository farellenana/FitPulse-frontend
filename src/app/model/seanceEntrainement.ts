import { Exercice } from './exercice';
import { PlanEntrainement } from './planEntrainement';
import { User } from './user';

export class SeanceEntrainement {
  seanceID!: number;
  userID!: User;
  planID!: PlanEntrainement;
  dateSeance!: Date;
  typeSeance!: string; // Par exemple : "Cardio", "Musculation", "Yoga", etc.
  duree!: number; // en minutes
  caloriesBrulees!: number;
  commentaires!: string;
  exercices!: Exercice[]; // Liste d'exercices associés à la séance
}
