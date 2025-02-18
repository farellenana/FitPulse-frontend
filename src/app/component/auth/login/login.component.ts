import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          if (response?.token) {
            // Nettoyer le rôle pour retirer les crochets
            const cleanedRole = response.role.replace(/[\[\]]/g, '');

            localStorage.setItem('token', response.token);
            localStorage.setItem('role', cleanedRole); // Stocker le rôle nettoyé
            localStorage.setItem('username', username);

            console.log('------Rôle reçu:', cleanedRole);
            console.log(
              'Rôle stocké dans localStorage:',
              localStorage.getItem('role')
            );
            console.log('Rôle reçu du serveur:', response.role);

            if (cleanedRole === 'ADMIN') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/homePage']);
            }
          } else {
            this.errorMessage = "Problème d'authentification";
          }
        },
        error: () => (this.errorMessage = 'Identifiants incorrects'),
      });
    }
  }
}
