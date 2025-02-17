export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  birthDate!: Date;
  gender!: string;
  height!: number;
  weight!: number;
  fitnessLevel!: string; // Exemples : "Débutant", "Intermédiaire", "Avancé"
  profilePicture!: string;
  role!: string; // Exemples : "Utilisateur", "Administrateur"
  updatedAt!: Date;
  email!: string;
  password!: string;
  roles!: string[]; // Utilisation d'un tableau pour représenter l'ensemble des rôles
  createdAt!: Date;
}
