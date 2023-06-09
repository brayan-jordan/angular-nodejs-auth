import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  message = '';

  ngOnInit(): void {
    this.apiService.content().subscribe({
      error: () => {
        this.message = 'Ocorreu um erro ao buscar o conteúdo';
      },
      next: (res) => {
        this.message = `ID do usuário autenticado: ${res.id}`;
      },
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.toastr.success('Logout realizado com sucesso');
  }
}
