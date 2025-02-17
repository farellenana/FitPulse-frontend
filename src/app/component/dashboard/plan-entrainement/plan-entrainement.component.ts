import { User } from './../../../model/user';
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
import { DropdownModule } from 'primeng/dropdown';
import { PlanEntrainement } from '../../../model/planEntrainement';
import { Objectif } from '../../../model/Objectif';

@Component({
  selector: 'app-plan-entrainement',
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
  templateUrl: './plan-entrainement.component.html',
  styleUrl: './plan-entrainement.component.css',
})
export class PlanEntrainementComponent implements OnInit {
  DialogVisible = false;
  plan: PlanEntrainement = new PlanEntrainement();
  plans: PlanEntrainement[] = [];

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
  selectedPlan: any[] = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.List();
    this.ListObjectifs();
    this.ListUser();
  }

  create() {
    this.action = 'newf';
    this.plan = new PlanEntrainement();
    this.DialogVisible = true;
  }

  get(plan: PlanEntrainement, action: string) {
    this.action = action;
    this.plan = { ...plan };
    this.DialogVisible = true;
  }

  delete(plan: PlanEntrainement) {
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
    console.log('Valeur de this.plan avant requête :', this.plan);
    if (this.plan.planID) {
      // Si categoryID existe, c’est une mise à jour
      console.log('Mise à jour du plan avec ID :', this.plan.planID);
      this.api
        .planUpdate(this.plan.planID, {
          ...this.plan,
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
      console.log('Création d’un nouveau plan avec les données :', this.plan);
      this.api
        .planInsert({
          ...this.plan,
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

  getObjectifName(objectifID: number): string {
    const objectif = this.objectifs.find(
      (obj) => obj.objectifID === objectifID
    );
    return objectif ? objectif.nomObjectif : 'Non défini';
  }

  getUserName(userID: number): string {
    const user = this.users.find((u) => u.id === userID);
    // return user ? `${user.firstName} ${user.lastName}` : 'Anonyme';
    return user ? user.email : 'Non défini';
  }
}
