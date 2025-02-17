import { Routes } from '@angular/router';
import { HomePageComponent } from './component/client/home-page/home-page.component';
import { LoginComponent } from './component/login/login/login.component';
import { NavbarComponent } from './component/layout/navbar/navbar.component';
import { AboutComponent } from './component/client/about/about.component';
import { ProgrammeComponent } from './component/client/programme/programme.component';
import { ServiceComponent } from './component/client/service/service.component';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { SidebarComponent } from './component/layout/sidebar/sidebar.component';
import { DashNavComponent } from './component/layout/dash-nav/dash-nav.component';
import { ExercicedashComponent } from './component/dashboard/exercicedash/exercicedash.component';
import { PlanEntrainementComponent } from './component/dashboard/plan-entrainement/plan-entrainement.component';
import { ProgrammedashComponent } from './component/dashboard/programmedash/programmedash.component';
import { CategoryComponent } from './component/dashboard/category/category.component';
import { SeanceComponent } from './component/dashboard/seance/seance.component';
import { CategorydashComponent } from './component/dashboard/categorydash/categorydash.component';
import { ObjectifComponent } from './component/dashboard/objectif/objectif.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homePage',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'homePage',
    component: HomePageComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'program',
    component: ProgrammeComponent,
  },
  {
    path: 'service',
    component: ServiceComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'exo',
    component: ExercicedashComponent,
  },
  {
    path: 'plan',
    component: PlanEntrainementComponent,
  },
  {
    path: 'prog',
    component: ProgrammedashComponent,
  },
  // {
  //   path: 'category',
  //   component: CategorydashComponent,
  // },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'seance',
    component: SeanceComponent,
  },
  {
    path: 'objectif',
    component: ObjectifComponent,
  },

  {
    path: 'nav',
    component: NavbarComponent,
  },
  {
    path: 'dashNav',
    component: DashNavComponent,
  },
];
