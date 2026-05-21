import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Filme } from '../../../core/models/filme.model';
import { FilmeLocal } from '../../../core/services/filme-local';

@Component({
  selector: 'app-filme-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './filme-list.html',
  styleUrl: './filme-list.css',
})
export class FilmeList implements OnInit {
  private filmeLocalService = inject(FilmeLocal);
  private router = inject(Router);

  filmes: Filme[] = [];

  ngOnInit(): void {
    this.loadFilmes();
  }

  loadFilmes(): void {
    this.filmes = this.filmeLocalService.getAll();
  }

  edit(id: number): void {
    this.router.navigate(['/cadastrar-filme'], {
      queryParams: { id },
    });
  }

  remove(id: number): void {
    const confirmou = confirm('Deseja realmente excluir este filme?');

    if (!confirmou) {
      return;
    }

    this.filmeLocalService.delete(id);

    this.loadFilmes();
  }
}