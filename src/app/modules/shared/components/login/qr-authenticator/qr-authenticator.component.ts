import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-qr-authenticator',
  templateUrl: './qr-authenticator.component.html',
  styleUrl: './qr-authenticator.component.scss'
})
export class QrAuthenticatorComponent implements OnInit {
  qrImageUrl
  constructor(private auth : AuthService){

  }
  ngOnInit(): void {
    this.auth.generate().subscribe(res=>{
      console.log(res.imageUrl , 'res')
      this.qrImageUrl = res.imageUrl
    })

  }

}
