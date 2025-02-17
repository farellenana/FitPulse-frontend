import { Component, OnInit } from '@angular/core';
import { DashNavComponent } from '../../layout/dash-nav/dash-nav.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryExercice } from '../../../model/categoryExercice';
import { ApiService } from '../../../services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-categorydash',
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
  templateUrl: './categorydash.component.html',
  styleUrl: './categorydash.component.css',
})
export class CategorydashComponent implements OnInit {
  category: CategoryExercice = new CategoryExercice();
  categories: CategoryExercice[] = [];

  DialogVisible = false;
  srca = 'assets/img/attention.png';
  src = 'assets/img/question.png';
  messageDialog = false;
  deleteDialog = false;
  displaySpinner = false;
  title = '';
  message = '';
  libelleDel = '';

  selectedCategory: any[] = [];
  action = 'nouvelle';

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

  constructor(private api: ApiService) {}
  ngOnInit(): void {}

  save() {
    // if (this.category.categoryID) {
    //   // Si categoryID existe, c’est une mise à jour
    //   this.api
    //     .categoryUpdate(this.category.categoryID, {
    //       ...this.category,
    //     })
    //     .subscribe(
    //       (res) => {
    //         console.log('Mis à jour avec succès', res);
    //         this.DialogVisible = false;
    //         this.succes('Mise à jour réussie');
    //       },
    //       (error) => {
    //         this.erreur('Échec lors de la mise à jour');
    //         console.error('Erreur lors de la mise à jour', error);
    //       }
    //     );
    // } else {
    //   // Sinon, c’est un nouvel enregistrement
    //   this.api
    //     .categoryInsert({
    //       ...this.category,
    //     })
    //     .subscribe(
    //       (res) => {
    //         console.log('Ajouté avec succès', res);
    //         this.DialogVisible = false;
    //         this.succes('Enregistrement réussi');
    //       },
    //       (error) => {
    //         this.erreur("Échec d'enregistrement");
    //         console.error("Erreur lors de l'ajout", error);
    //       }
    //     );
    // }
  }
}
