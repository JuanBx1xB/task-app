import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title: string;
  @Input() backButton: string;
  @Input() isModal: boolean;
  @Input() color: string;
  @Input() centerTitle: boolean;


  darkMode: BehaviorSubject <boolean>;
  constructor(
    private themeSVC: ThemeService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {

    this.darkMode = this.themeSVC.darkMode
  }

  dismissModal(){
    this.utilsSvc.dismissModal()
  }



  setTheme(darkMode: boolean){
    this.themeSVC.setTheme(darkMode);
  }
}
