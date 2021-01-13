import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRatingsService } from '../product-ratings.service';
import { ProductRatings } from '../ProductRatings';

@Component({
  selector: 'app-ratings-form',
  templateUrl: './ratings-form.component.html',
  styleUrls: ['./ratings-form.component.css']
})
export class RatingsFormComponent implements OnInit {

  item: ProductRatings;
  product_id: number;
  errors: any;

  @ViewChild('alert') alert;


  constructor(protected service: ProductRatingsService, private route: ActivatedRoute, private router: Router) { 
    this.item = new ProductRatings();
    this.product_id = parseInt(this.route.snapshot.paramMap.get("product_id"));
    this.item.id = this.route.snapshot.paramMap.get("id");
    if(this.product_id != null) {
      if(this.item.id != null) {
        this.item.id = parseInt(this.item.id)
        this.service.getOne(this.product_id, this.item.id).subscribe((data: any) => this.item = data)
      } else {
        this.item.product_id = this.product_id;
      }
    }
  }

  ngOnInit(): void {
  }

  save() {
    if(this.item.id != undefined && this.item.id != NaN) {
      this.service.update(this.product_id, this.item).subscribe(
        (data: any) => this.callbackSuccess(),
        (error: any) => this.callbackError(error),
      );
    } else {
      this.service.insert(this.product_id, this.item).subscribe(
        (data: any) => this.callbackSuccess(),
        (error: any) => this.callbackError(error),
      );
    }
  }

  private callbackSuccess() {
    this.router.navigate(['/products/' + this.product_id + '/ratings']);
  }

  markFields(field: string) {
    try {
      let fieldArray = Object.keys(this.errors);
      if (!fieldArray.includes(field)) {
        return 'form-control';
      } else {
        return 'form-control is-invalid';
      }
    } catch (E) {
      return 'form-control';
    }
  }

  private callbackError(error: any) {
    this.alert.type = 'danger';
    if (error.status == 422) {
      this.alert.message = "Não foi possível salvar o registro. Os campos destacados estão inválidos.";
    } else {
      this.alert.message = 'Ocorreu um problema ao salvar o registro.';
    }
    this.errors = error.error;
    console.log(error);
  }
}
