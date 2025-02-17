import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { DashNavComponent } from '../../layout/dash-nav/dash-nav.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CategoryExercice } from '../../../model/categoryExercice';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    DashNavComponent,
    SidebarComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    CheckboxModule,
    RatingModule,
    TagModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    InputNumberModule,
    SelectButtonModule,
    ProgressSpinnerModule,
    DropdownModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoryComponent implements OnInit {
  category: CategoryExercice = new CategoryExercice();
  categories: CategoryExercice[] = [];

  DialogVisible = false;
  srca = 'assets/images/layout/Attention.png';
  src = 'assets/img/question.png';
  messageDialog = false;
  successDialog = false;
  errorDialog = false;
  successMessage: string = "L'opération a été réalisée avec succès !";
  errorMessage: string = "Une erreur s'est produite. Veuillez réessayer.";

  deleteDialog = false;
  displaySpinner = false;
  title = '';
  message = '';
  libelleDel = '';

  selectedCategory: any[] = [];
  action = 'nouvelle';

  constructor(private http: HttpClient, private api: ApiService) {}

  ngOnInit(): void {
    this.List();
    this.successDialog = true;
    this.errorDialog = true;
  }

  newCategory() {}

  editCategory() {}

  deleteCategory() {}

  List(): void {
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

  save() {
    if (this.category.categoryID) {
      // Si categoryID existe, c’est une mise à jour
      this.api
        .categoryUpdate(this.category.categoryID, {
          ...this.category,
        })
        .subscribe(
          (res) => {
            console.log('Mis à jour avec succès', res);
            this.DialogVisible = false;
            this.succes('Mise à jour réussie');
            this.List();
          },
          (error) => {
            this.erreur('Échec lors de la mise à jour');
            console.error('Erreur lors de la mise à jour', error);
          }
        );
    } else {
      // Sinon, c’est un nouvel enregistrement
      this.api
        .categoryInsert({
          ...this.category,
        })
        .subscribe(
          (res) => {
            console.log('Ajouté avec succès', res);
            this.DialogVisible = false;
            this.succes('Enregistrement réussi');
            this.List();
          },
          (error) => {
            this.erreur("Échec d'enregistrement");
            console.error("Erreur lors de l'ajout", error);
          }
        );
    }
  }

  create() {
    this.action = 'newf';
    this.category = new CategoryExercice();
    this.DialogVisible = true;
  }

  get(category: CategoryExercice, action: string) {
    this.action = action;
    this.category = { ...category };
    this.DialogVisible = true;
  }

  delete(category: CategoryExercice) {
    this.deleteDialog = true;
  }

  supprimerMultiple(): void {
    if (this.selectedCategory.length === 0) {
      this.erreur('Aucune category sélectionnée !');
      return;
    }
    this.displaySpinner = true;
    let successfulDeletes = 0;

    const deletePromises = this.selectedCategory.map((rupture) =>
      this.api
        .categoryDelete(this.category.categoryID)
        .toPromise()
        .then(() => successfulDeletes++)
        .catch((error) =>
          console.error(`Erreur pour ID ${this.category.categoryID}:`, error)
        )
    );

    Promise.all(deletePromises)
      .then(() => {
        this.succes(`${successfulDeletes} category supprimées avec succès !`);
        this.deleteDialog = false;
        this.List();
        this.selectedCategory = [];
      })
      .finally(() => {
        this.displaySpinner = false;
      });
  }
}
