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
import { PortalLayoutComponent } from './layout/portal-layout/portal-layout';
import { DashboardComponent } from './pages/portal/dashboard/dashboard';
import { portalGuard } from './core/guards/portal.guard';
export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      // Public pages
      { path: '', component: Landing },
      { path: 'products', component: Products },
      { path: 'products/:id', component: ProductOverview },
      { path: 'products/:id/:pageId', loadComponent: () => import('./pages/public/product-page/product-page').then(c => c.ProductPage) },
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
    path: 'portal',
    canActivate: [portalGuard],
    component: PortalLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', loadComponent: () => import('./pages/portal/products/products').then(c => c.Products) },
      { path: 'pages', loadComponent: () => import('./pages/portal/pages-list/pages-list').then(c => c.PagesList) },
      { path: 'products/:id/settings', loadComponent: () => import('./pages/portal/product-settings/product-settings').then(c => c.ProductSettings) },
      { path: 'products/:id/overview', loadComponent: () => import('./pages/portal/product-overview/product-overview').then(c => c.ProductOverview) },
      { path: 'products/:id/guide', loadComponent: () => import('./pages/portal/product-guide-editor/product-guide-editor').then(c => c.ProductGuideEditor) },
      { path: 'assets', loadComponent: () => import('./pages/portal/assets/assets').then(c => c.Assets) },
      { path: 'internal-developers', loadComponent: () => import('./pages/portal/internal-developers/internal-developers').then(c => c.InternalDevelopers) },
      { path: 'internal-users', loadComponent: () => import('./pages/portal/internal-users/internal-users').then(c => c.InternalUsers) },
      { path: 'audit-log', loadComponent: () => import('./pages/portal/audit-log/audit-log').then(c => c.AuditLog) },
      { path: 'role-profiles', loadComponent: () => import('./pages/portal/role-profiles/role-profiles').then(c => c.RoleProfiles) },
      { path: 'role-profiles/new', loadComponent: () => import('./pages/portal/role-profile-editor/role-profile-editor').then(c => c.RoleProfileEditor) },
      { path: 'role-profiles/edit/:id', loadComponent: () => import('./pages/portal/role-profile-editor/role-profile-editor').then(c => c.RoleProfileEditor) },
      { path: 'role-profiles/view/:id', loadComponent: () => import('./pages/portal/role-profile-editor/role-profile-editor').then(c => c.RoleProfileEditor) },
      { path: 'config', loadComponent: () => import('./pages/portal/config/config').then(c => c.Config) },
      { path: 'config/edit/:id', loadComponent: () => import('./pages/portal/config-edit/config-edit').then(c => c.ConfigEdit) },
      { path: 'config/:id', loadComponent: () => import('./pages/portal/config-detail/config-detail').then(c => c.ConfigDetail) },
      { path: 'announcements', loadComponent: () => import('./pages/portal/announcements/announcements').then(c => c.Announcements) },
      { path: 'reviews', loadComponent: () => import('./pages/portal/review-queue/review-queue').then(c => c.ReviewQueue) },
      { path: 'reviews/:id', loadComponent: () => import('./pages/portal/review-screen/review-screen').then(c => c.ReviewScreen) },
      { path: 'access', loadComponent: () => import('./pages/portal/access-requests/access-requests').then(c => c.AccessRequests) },
      { path: 'access/:id', loadComponent: () => import('./pages/portal/access-request-detail/access-request-detail').then(c => c.AccessRequestDetail) },
      { path: 'developers', loadComponent: () => import('./pages/portal/developers/developers').then(c => c.Developers) },
      { path: 'developers/:id', loadComponent: () => import('./pages/portal/developer-detail/developer-detail').then(c => c.DeveloperDetail) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'portal/login',
    component: PortalLoginComponent
  },
  { path: '**', redirectTo: '' }
];
