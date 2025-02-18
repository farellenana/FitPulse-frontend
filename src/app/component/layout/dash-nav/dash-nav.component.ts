import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dash-nav',
  standalone: true,
  imports: [],
  templateUrl: './dash-nav.component.html',
  styleUrl: './dash-nav.component.css',
})
export class DashNavComponent implements OnInit {
  user: { firstName: string; lastName: string } = {
    firstName: '',
    lastName: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((currentUser) => {
      console.log('--------Utilisateur connecté :---------', currentUser);
      if (currentUser) {
        this.user = currentUser;
      } else {
        const firstName = localStorage.getItem('firstName') || 'Invité';
        const lastName = localStorage.getItem('lastName') || ''; // Ajouter lastName
        console.log(
          "Nom d'utilisateur récupéré du localStorage :",
          firstName,
          lastName
        );
        this.user = { firstName, lastName };
      }
    });
  }

  logout(): void {
    this.authService.logout();
    // 🔁 Redirige vers la page de login au lieu de recharger la page
    window.location.href = '/login';
  }
}
