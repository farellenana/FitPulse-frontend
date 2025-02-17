import { Objectif } from './Objectif';
import { User } from './user';

export class PlanEntrainement {
  planID!: number;
  userID!: User;
  nomPlan!: string;
  dateDebut!: Date;
  dateFin!: Date;
  objectifID!: number;
  description!: string;
}
