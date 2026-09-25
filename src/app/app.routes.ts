import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout';
import { Landing } from './pages/public/landing/landing';
import { Products } from './pages/public/products/products';
import { ProductOverview } from './pages/public/product-overview/product-overview';
import { GettingStarted } from './pages/public/getting-started/getting-started';
import { Support } from './pages/public/support/support';
import { Resources } from './pages/public/resources/resources';

// Auth pages
import { LoginPage } from './pages/auth/login/login';
import { RegisterPage } from './pages/auth/register/register';
import { ForgotPasswordPage } from './pages/auth/forgot-password/forgot-password';
import { ResetPasswordPage } from './pages/auth/reset-password/reset-password';
import { VerifyEmailPage } from './pages/auth/verify-email/verify-email';
import { ProductSelectionPage } from './pages/auth/product-selection/product-selection';
import { authGuard } from './core/guards/auth.guard';

// Portal pages
import { Login as PortalLoginComponent } from './pages/portal/login/login';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      // Public pages
      { path: '', component: Landing },
      { path: 'products', component: Products },
      { path: 'products/:id', component: ProductOverview },
      { path: 'getting-started', component: GettingStarted },
      { path: 'support', component: Support },
      { path: 'resources', component: Resources },
      
      // Auth pages
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },
      { path: 'forgot-password', component: ForgotPasswordPage },
      { path: 'reset-password', component: ResetPasswordPage },
      { path: 'verify-email', component: VerifyEmailPage },
      { path: 'onboarding', component: ProductSelectionPage, canActivate: [authGuard] }
    ]
  },
  {
    path: 'portal/login',
    component: PortalLoginComponent
  },
  { path: '**', redirectTo: '' }
];
