import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { FilmeLocal } from '../../../core/services/filme-local';

@Component({
  selector: 'app-filme-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filme-form.html',
  styleUrl: './filme-form.css',
})
export class FilmeForm implements OnInit {
  private fb = inject(FormBuilder);
  private filmeLocalService = inject(FilmeLocal);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: number | null = null;

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descricao: ['', [Validators.required, Validators.minLength(10)]],
    genero: ['', [Validators.required]],
    duracao: ['', [Validators.required]],
    miniatura: ['', [Validators.required]],
    dataLancamento: ['', Validators.required],
    emCartaz: [false],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');

    if (id) {
      this.editingId = Number(id);

      const filme = this.filmeLocalService.getById(this.editingId);

      if (filme) {
        this.form.patchValue({
          titulo: filme.titulo,
          descricao: filme.descricao,
          genero: filme.genero,
          duracao: filme.duracao,
          miniatura: filme.miniatura,
          dataLancamento: filme.dataLancamento,
          emCartaz: filme.emCartaz,
        });
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    if (this.editingId !== null) {
      this.filmeLocalService.update({
        id: this.editingId,
        ...formValue,
      });
    } else {
      this.filmeLocalService.add({
        id: Date.now(),
        ...formValue,
      });
    }

    this.router.navigate(['/filmes']);
  }
}