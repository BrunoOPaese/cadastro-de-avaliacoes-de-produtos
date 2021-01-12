import { Component, OnInit } from '@angular/core';
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
    this.service.getAll(this.product_id).subscribe(
      (data: any) => this.items = data
    );

  }

  delete(id: number) {
    this.service.delete(this.product_id, id).subscribe(
        (data: any ) => this.callbackSuccess(),
        (error: any) => this.callbackError(error)
      );
  }
  private callbackSuccess() {
    alert("registro excluido com sucesso");
    this.refresh();
  }

  private callbackError(error: any) {
    alert('Ocorreu um problema ao excluir');
    console.log(error);
  }


}
