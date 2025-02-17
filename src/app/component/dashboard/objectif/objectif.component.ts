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
import { DropdownModule } from 'primeng/dropdown';
import { Objectif } from '../../../model/Objectif';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-objectif',
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
  templateUrl: './objectif.component.html',
  styleUrl: './objectif.component.css',
})
export class ObjectifComponent implements OnInit {
  DialogVisible = false;
  objectif: Objectif = new Objectif();
  objectifs: Objectif[] = [];
  users: User[] = [];
  action = 'nouvelle';

  srca = 'assets/images/layout/Attention.png';
  src = 'assets/img/question.png';
  messageDialog = false;
  deleteDialog = false;
  displaySpinner = false;
  title = '';
  message = '';
  libelleDel = '';

  selectedObjectif: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.List();
    this.ListUser();
  }

  create() {
    this.action = 'newf';
    this.objectif = new Objectif();
    this.DialogVisible = true;
  }

  get(objectif: Objectif, action: string) {
    this.action = action;
    this.objectif = { ...objectif };
    this.DialogVisible = true;
  }

  delete(objectif: Objectif) {
    this.deleteDialog = true;
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
    if (this.objectif.objectifID) {
      // Si objectifID existe, c’est une mise à jour
      this.api
        .objectifUpdate(this.objectif.objectifID, {
          ...this.objectif,
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
      console.log('obj', this.objectif);

      this.api
        .objectifInsert({
          ...this.objectif,
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

  List(): void {
    this.displaySpinner = true;
    this.objectifs = [];
    this.api.objectifList().subscribe({
      next: (data: any) => {
        this.objectifs = data;
        console.log(' list objectifs', data);
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

  ListUser(): void {
    this.displaySpinner = true;
    this.users = [];
    this.api.userList().subscribe({
      next: (data: any) => {
        console.log('Données reçues pour les utilisateurs:', data);
        this.users = data;
        this.displaySpinner = false;
      },
      error: (error: any) => {
        console.error(error);
        this.displaySpinner = false;
      },
      complete: () => {
        console.info('Liste des plans chargée');
      },
    });
  }
}
