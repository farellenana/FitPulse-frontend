import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  isExerciceOpen = false;
  isEntrainementOpen = false;

  ngOnInit(): void {}

  toggleMenu(menu: string) {
    if (menu === 'exercice') {
      this.isExerciceOpen = !this.isExerciceOpen;
    } else if (menu === 'entrainement') {
      this.isEntrainementOpen = !this.isEntrainementOpen;
    }
  }
}
