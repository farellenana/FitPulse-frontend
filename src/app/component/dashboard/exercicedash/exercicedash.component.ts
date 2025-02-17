import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DashNavComponent } from '../../layout/dash-nav/dash-nav.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { Exercice } from '../../../model/exercice';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ApiService } from '../../../services/api.service';
import { CategoryExercice } from '../../../model/categoryExercice';
import { SeanceEntrainement } from '../../../model/seanceEntrainement';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-exercicedash',
  standalone: true,
  imports: [
    DashNavComponent,
    SidebarComponent,
    HttpClientModule,
    DialogModule,
    CommonModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    DropdownModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './exercicedash.component.html',
  styleUrl: './exercicedash.component.css',
})
export class ExercicedashComponent implements OnInit {
  exercice: Exercice = new Exercice();
  exercices: Exercice[] = [];
  imageFile!: File;
  videoFile!: File;
  categories: CategoryExercice[] = [];
  seances: SeanceEntrainement[] = [];

  DialogVisible = false;
  detailDialogVisible = false;
  srca = 'assets/images/layout/Attention.png';
  src = 'assets/img/question.png';
  messageDialog = false;
  deleteDialog = false;
  displaySpinner = false;
  title = '';
  message = '';
  libelleDel = '';

  selectedExercice!: Exercice;
  action = 'nouvelle';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.List();
    this.ListCategory();
    this.ListSeance();
  }

  create() {
    this.action = 'newf';
    this.exercice = new Exercice();
    this.DialogVisible = true;
  }

  get(exercice: Exercice, action: string) {
    this.action = action;
    this.selectedExercice = { ...exercice };
    console.log(this.selectedExercice); // Check if the exercise details are correctly assigned
    this.detailDialogVisible = true;
    console.log(this.selectedExercice);
  }

  delete(exercice: Exercice) {
    this.deleteDialog = true;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/profil.jpeg';
  }

  getVideoUrl(videoPath: string): string {
    return 'http://localhost:8080/api/upload/' + videoPath; // Adjust the base URL as needed
  }

  onVideoError(event: any) {
    console.error('Video failed to load:', event);
    event.target.src = 'path/to/default/video.mp4'; // Set a default placeholder video URL if available
  }

  // Méthode onImageUpload
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      console.log('Image file selected:', file);
    }
  }

  // Méthode onVideoUpload
  onVideoUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.videoFile = file;
      console.log('Video file selected:', file);
    }
  }

  // Méthode save pour envoyer les données
  save() {
    const formData = new FormData();

    // Ajouter les champs de l'exercice
    formData.append('nomExercice', this.exercice.nomExercice);
    console.log('categoryExID:', this.exercice.categoryExID);
    console.log('seanceID:', this.exercice.seanceID);
    // Ajouter l'ID de la catégorie
    // Ajouter l'ID de la catégorie
    if (this.exercice.categoryExID) {
      formData.append('categoryExID', this.exercice.categoryExID.toString());
    } else {
      console.warn('⚠ categoryExID est indéfini !');
    }

    // Ajouter l'ID de la séance
    if (this.exercice.seanceID) {
      formData.append('seanceID', this.exercice.seanceID.toString());
    } else {
      console.warn('⚠ seanceID est indéfini !');
    }

    // Ajouter les autres champs
    formData.append('description', this.exercice.description || '');
    formData.append('repetitions', this.exercice.repetitions.toString());
    formData.append('series', this.exercice.series.toString());
    console.log(
      'Image envoyée :',
      this.imageFile ? this.imageFile.name : 'Aucune image'
    );

    // Ajouter les fichiers si présents
    if (this.imageFile) {
      console.log('Ajout du fichier image:', this.imageFile.name);
      formData.append('image', this.imageFile, this.imageFile.name);
    } else {
      console.warn('Aucun fichier image à ajouter');
    }

    if (this.videoFile) {
      console.log('Ajout du fichier vidéo:', this.videoFile.name);
      formData.append('video', this.videoFile, this.videoFile.name);
    } else {
      console.warn('Aucun fichier vidéo à ajouter');
    }

    // 📌 LOG : Afficher FormData sans erreur TypeScript
    console.log('Données envoyées :');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // Vérifier si c'est une mise à jour ou une insertion
    if (this.exercice.exerciceID) {
      this.api.exerciceUpdate(this.exercice.exerciceID, formData).subscribe(
        (res) => {
          console.log('Mise à jour réussie', res);
          this.DialogVisible = false;
          this.succes('Mise à jour réussie');
          this.List();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour', error);
          this.erreur('Échec lors de la mise à jour');
        }
      );
    } else {
      this.api.exerciceInsert(formData).subscribe(
        (res) => {
          console.log('Ajouté avec succès', res);
          this.DialogVisible = false;
          this.succes('Enregistrement réussi');
          this.List();
        },
        (error) => {
          console.log('Données envoyées avant erreur :');
          formData.forEach((value, key) => {
            console.log(`${key}:`, value);
          });
          console.error("Erreur lors de l'ajout", error);
          this.erreur("Échec d'enregistrement");
        }
      );
    }
  }

  // save() {
  //   let uploadTasks = [];

  //   if (this.imageFile) {
  //     console.log('Uploading image file:', this.imageFile);
  //     uploadTasks.push(
  //       this.uploadFile(this.imageFile, 'images').then((imageUrl) => {
  //         this.exercice.urlImage = imageUrl;
  //       })
  //     );
  //   }

  //   if (this.videoFile) {
  //     console.log('Uploading video file:', this.videoFile);
  //     uploadTasks.push(
  //       this.uploadFile(this.videoFile, 'videos').then((videoUrl) => {
  //         this.exercice.urlVideo = videoUrl;
  //       })
  //     );
  //   }

  //   // Attendre que tous les fichiers soient téléchargés avant d'enregistrer l'exercice
  //   Promise.all(uploadTasks)
  //     .then(() => {
  //       console.log(
  //         'Tous les fichiers ont été téléchargés, enregistrement des données...'
  //       );
  //       if (this.exercice.exerciceID) {
  //         // Mise à jour de l'exercice
  //         this.api
  //           .exerciceUpdate(this.exercice.exerciceID, this.exercice)
  //           .subscribe(
  //             (res) => {
  //               console.log('Mise à jour réussie', res);
  //               this.DialogVisible = false;
  //               this.succes('Mise à jour réussie');
  //               this.List();
  //             },
  //             (error) => {
  //               console.error('Erreur lors de la mise à jour', error);
  //               this.erreur('Échec lors de la mise à jour');
  //             }
  //           );
  //       } else {
  //         // Création d'un nouvel exercice
  //         console.log('exercice avant envoi', this.exercice);

  //         this.api.exerciceInsert(this.exercice).subscribe(
  //           (res) => {
  //             console.log('Ajouté avec succès', res);
  //             this.DialogVisible = false;
  //             this.succes('Enregistrement réussi');
  //             this.List();
  //           },
  //           (error) => {
  //             console.error("Erreur lors de l'ajout", error);
  //             this.erreur("Échec d'enregistrement");
  //           }
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors du téléchargement des fichiers', error);
  //       this.erreur('Échec du téléchargement des fichiers');
  //     });
  // }

  List(): void {
    this.displaySpinner = true;
    this.exercices = [];
    console.log(
      'Image envoyée :',
      this.imageFile ? this.imageFile.name : 'Aucune image'
    );
    this.api.exerciceList().subscribe({
      next: (data: any) => {
        this.exercices = data;
        console.log(
          "URL de l'image:",
          'http://localhost:8080/' + data.urlImage
        );
        console.log(' list exercice', data);
        this.displaySpinner = false;
      },
      error: (error: any) => {
        console.error(error);
        this.displaySpinner = false;
      },
      complete: () => {
        console.info('complete');
      },
    });
  }

  // uploadFile(file: File, folder: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     console.log(`Début de l'upload du fichier ${file.name} vers ${folder}`);

  //     const formData = new FormData();
  //     formData.append('file', file, file.name);
  //     formData.append('folder', folder);

  //     this.api.uploadFile(formData).subscribe(
  //       (response: any) => {
  //         console.log(`Fichier ${file.name} téléchargé avec succès`, response);
  //         resolve(response.url); // Vérifie que `response.url` est bien défini
  //       },
  //       (error) => {
  //         console.error(`Erreur lors du téléchargement de ${file.name}`, error);
  //         reject(error);
  //       }
  //     );
  //   });
  // }

  // onImageUpload(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     this.imageFile = input.files[0]; // Assigner le fichier image
  //   }
  // }

  // onVideoUpload(event: Event) {exerciseId
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     this.videoFile = input.files[0]; // Assigner le fichier vidéo
  //   }
  // }

  ListCategory(): void {
    this.displaySpinner = true;
    this.categories = [];
    this.api.categoryList().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(' list category', data);
        this.displaySpinner = false;
      },
      error: (error: any) => {
        console.error(error);
        this.displaySpinner = false;
      },
      complete: () => {
        console.info('complete');
      },
    });
  }

  ListSeance(): void {
    this.displaySpinner = true;
    this.seances = [];
    this.api.seanceList().subscribe({
      next: (data: any) => {
        this.seances = data;
        console.log(' list seances', data);
        this.displaySpinner = false;
      },
      error: (error: any) => {
        console.error(error);
        this.displaySpinner = false;
      },
      complete: () => {
        console.info('complete');
      },
    });
  }
  // onFileUpload(event: any) {
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   this.api.uploadFile(formData).subscribe(
  //     (res) => {
  //       console.log('Fichier envoyé avec succès', res);
  //       this.succes('Fichier envoyé avec succès');
  //     },
  //     (error) => {
  //       console.error("Erreur lors de l'upload", error);
  //       this.erreur("Échec de l'envoi du fichier");
  //     }
  //   );
  // }

  succes(msg: string) {
    this.srca = 'assets/img/ok.png';
    this.title = 'Succes !';
    this.message = msg;
    this.messageDialog = true;
  }
  erreur(msg: string) {
    this.srca = 'assets/img/attention.png';
    this.title = 'Erreur !';
    this.message = msg;
    this.messageDialog = true;
  }

  getCategoryName(categoryId: any): string {
    const category = this.categories.find((c) => c.categoryID === categoryId);
    return category ? category.nom : 'Unknown';
  }

  getSeanceName(seanceID: any): string {
    const seance = this.seances.find((c) => c.seanceID === seanceID);
    return seance ? seance.typeSeance : 'Unknown';
  }
}
