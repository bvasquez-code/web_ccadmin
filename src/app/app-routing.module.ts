import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './enterprise/login/login.component';
import { MainComponent } from './enterprise/main/main.component';
import { CreatemenuComponent } from './enterprise/menu/pages/createmenu/createmenu.component';
import { ListmenuComponent } from './enterprise/menu/pages/listmenu/listmenu.component';
import { CreatepresaleComponent } from './enterprise/sale/pages/createpresale/createpresale.component';
import { RegistropreventaComponent } from './enterprise/venta/pages/registropreventa/registropreventa.component';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { ListuserComponent } from './enterprise/user/pages/listuser/listuser.component';
import { CreateuserComponent } from './enterprise/user/pages/createuser/createuser.component';
import { ListprofileComponent } from './enterprise/user/pages/listprofile/listprofile.component';
import { CreateprofileComponent } from './enterprise/user/pages/createprofile/createprofile.component';

const routes: Routes = [
  {
    path :'',
    component : MainComponent
  },
  {
    path :'',
    component : MainComponent,
    children : [
      {
        path :'pages/prueba',
        component : PruebaComponent
      }
    ]
  },
  {
    path :'login',
    component : LoginComponent
  },
  {
    path :'',
    component : CreatepresaleComponent,
    children : [
      {
        path :'enterprise/venta/pages/registropreventa',
        component : PruebaComponent
      }
    ]
  },
  {
    path :'',
    children : [
      {
        path :'enterprise/menu/pages/listmenu',
        component : ListmenuComponent
      },
      {
        path :'enterprise/menu/pages/createmenu',
        component : CreatemenuComponent
      }
    ]
  },
  {
    path :'',
    children : [
      {
        path :'enterprise/user/pages/listuser',
        component : ListuserComponent
      },
      {
        path :'enterprise/user/pages/createuser',
        component : CreateuserComponent
      },
      {
        path :'enterprise/user/pages/listprofile',
        component : ListprofileComponent
      },
      {
        path :'enterprise/user/pages/createprofile',
        component : CreateprofileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
