import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes} from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { IconPipePipe } from './icon.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,LoginComponent,RegisterComponent,HeaderComponent, RouterModule,FooterComponent,IconPipePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Courses';
}
