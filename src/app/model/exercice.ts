import { CategoryExercice } from './categoryExercice';
import { SeanceEntrainement } from './seanceEntrainement';

export class Exercice {
  exerciceID!: number;
  nomExercice!: string;
  categoryExID!: CategoryExercice;
  seanceID!: SeanceEntrainement;
  description!: string;
  repetitions!: number;
  series!: number;
  urlVideo!: string;
  urlImage!: string;
  imageFile!: File;
  videoFile!: File;
}
