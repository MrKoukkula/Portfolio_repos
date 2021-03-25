import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full'},
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule ) },
  { path: 'client',
   loadChildren: () => import('./client/client.module').then(m => m.ClientModule ), canActivate: [AuthGuard] },
  { path: 'rental',
   loadChildren: () => import('./rental/rental.module').then(m => m.RentalModule ), canActivate: [AuthGuard] },
  { path: 'payment',
   loadChildren: () => import('./payment/payment/payment-routing.module').then(m => m.PaymentRoutingModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'client', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
