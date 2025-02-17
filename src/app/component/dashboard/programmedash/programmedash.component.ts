import { Component, OnInit } from '@angular/core';
import { DashNavComponent } from '../../layout/dash-nav/dash-nav.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { Programme } from '../../../model/programme';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../model/user';
import { Objectif } from '../../../model/Objectif';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-programmedash',
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
    DropdownModule,
    FileUploadModule,
    TableModule,
  ],
  templateUrl: './programmedash.component.html',
  styleUrl: './programmedash.component.css',
})
export class ProgrammedashComponent implements OnInit {
  programme: Programme = new Programme();
  programmes: Programme[] = [];
  objectifs: Objectif[] = [];
  users: User[] = [];
  DialogVisible = false;
  srca = 'assets/images/layout/Attention.png';
  src = 'assets/img/question.png';
  messageDialog = false;
  deleteDialog = false;
  displaySpinner = false;
  title = '';
  message = '';
  libelleDel = '';

  selectedProgramme: any[] = [];
  action = 'nouvelle';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.List();
    this.ListObjectifs();
    this.ListUser();
  }

  create() {
    this.action = 'newf';
    this.programme = new Programme();
    this.DialogVisible = true;
  }

  get(programme: Programme, action: string) {
    this.action = action;
    this.programme = { ...programme };
    this.DialogVisible = true;
  }

  delete(programme: Programme) {
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
    if (this.programme.programmeID) {
      // Si programmeID existe, c’est une mise à jour
      this.api
        .programmeUpdate(this.programme.programmeID, {
          ...this.programme,
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
      console.log(
        'Création d’un nouveau plan avec les données :',
        this.programme
      );
      this.api
        .programmeInsert({
          ...this.programme,
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
    this.programmes = [];
    this.api.programmeList().subscribe({
      next: (data: any) => {
        console.log('Données reçues pour les programmes:', data);
        this.programmes = data;
        this.displaySpinner = false;
      },
      error: (error: any) => {
        console.error(error);
        this.displaySpinner = false;
      },
      complete: () => {
        console.info('Liste des programmes chargée');
      },
    });
  }

  getUserName(userID: number): string {
    const user = this.users.find((u) => u.id === userID);
    return user ? `${user.firstName} ${user.lastName}` : 'Anonyme';
  }

  ListObjectifs(): void {
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
