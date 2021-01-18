import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRatingsService } from '../product-ratings.service';
import { ProductRatings } from '../ProductRatings';

@Component({
  selector: 'app-ratings-list',
  templateUrl: './ratings-list.component.html',
  styleUrls: ['./ratings-list.component.css']
})
export class RatingsListComponent implements OnInit {

  items: ProductRatings[];
  product_id: number;
  @ViewChild('alert') alert;

  constructor(protected service: ProductRatingsService, private route: ActivatedRoute, private router: Router) {
    this.product_id = parseInt(this.route.snapshot.paramMap.get('product_id'));

    if(this.product_id != null) {
      this.refresh();
    }else {
    }
  }

  ngOnInit(): void {
  }

  refresh() {
    let that = this;
    this.service.getAll(this.product_id).subscribe(
      function(data: any) {
        if (data.length == 0) {
          let container = document.getElementById('table-container');
          container.innerHTML = '';
          container.appendChild(function() {
            let message = document.createElement('h3');
            message.innerText = 'Não há nenhuma avaliação cadastrada';
            return message;
          }());
        }else {
          that.items = data;
        }
      }
    );

  }

  delete(id: number) {
    this.service.delete(this.product_id, id).subscribe(
        (data: any ) => this.callbackSuccess(),
        (error: any) => this.callbackError(error)
      );
  }
  private callbackSuccess() {
    this.alert.type = "success";
    this.alert.message = 'Registro excluído com sucesso';
    this.refresh();
  }

  private callbackError(error: any) {
    this.alert.type = 'danger';
    this.alert.message = error.error.error;
    console.log(error.error.error);
  }


}
