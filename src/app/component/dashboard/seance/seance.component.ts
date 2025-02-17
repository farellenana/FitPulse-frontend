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
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ApiService } from '../../../services/api.service';
import { DropdownModule } from 'primeng/dropdown';
import { SeanceEntrainement } from '../../../model/seanceEntrainement';
import { User } from '../../../model/user';
import { PlanEntrainement } from '../../../model/planEntrainement';

@Component({
  selector: 'app-seance',
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
    MultiSelectModule,
  ],
  templateUrl: './seance.component.html',
  styleUrl: './seance.component.css',
})
export class SeanceComponent implements OnInit {
  seance: SeanceEntrainement = new SeanceEntrainement();
  seances: SeanceEntrainement[] = [];
  plans: PlanEntrainement[] = [];
  users: User[] = [];
  exercices: Exercice[] = [];
  action = 'nouvelle';
  DialogVisible = false;
  srca = 'assets/images/layout/Attention.png';
  src = 'assets/img/question.png';
  messageDialog = false;
  deleteDialog = false;
  displaySpinner = false;
  title = '';
  message = '';
  libelleDel = '';
  selectedSeance: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.ListPlan();
    this.List();
    this.ListUser();
    this.ListExo();
  }

  create() {
    this.action = 'newf';
    this.seance = new SeanceEntrainement();
    this.DialogVisible = true;
  }
  get(seance: SeanceEntrainement, action: string) {
    this.action = action;
    this.seance = { ...seance };
    this.DialogVisible = true;
  }

  delete(seance: SeanceEntrainement) {
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
    console.log('Valeur de this.seance avant requête :', this.seance);
    this.seance.exercices = [];
    if (this.seance.seanceID) {
      // Si categoryID existe, c’est une mise à jour
      console.log('Mise à jour du seance avec ID :', this.seance.seanceID);
      this.api
        .seanceUpdate(this.seance.seanceID, {
          ...this.seance,
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
        'Création d’un nouveau seance avec les données :',
        this.seance
      );
      this.api
        .seanceInsert({
          ...this.seance,
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
    this.seances = [];
    this.api.seanceList().subscribe({
      next: (data: any) => {
        this.seances = data;
        console.log('Liste des séances', data);
        this.displaySpinner = false;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des séances', error);
        this.displaySpinner = false;
      },
    });
  }

  ListPlan(): void {
    this.displaySpinner = true;
    this.plans = [];
    this.api.planList().subscribe({
      next: (data: any) => {
        console.log('Données reçues pour les plans:', data);
        this.plans = data;
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

  ListExo(): void {
    this.displaySpinner = true;
    this.exercices = [];
    this.api.exerciceList().subscribe({
      next: (data: any) => {
        this.exercices = data;
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

  getUserName(user: User | null | undefined): string {
    return user && user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : 'Utilisateur inconnu';
  }

  getPlanName(planID: number): string {
    const seance = this.plans.find((p) => p.planID === planID);
    return seance ? seance.nomPlan : 'seance inconnu';
  }
}
