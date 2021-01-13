import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-form-title',
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.css']
})
export class FormTitleComponent implements OnInit {

  @Input() title: string;
  product_id: number;
  product: Product;
  flag: boolean = false;

  constructor(protected service: ProductService, protected route: ActivatedRoute) {
    this.product_id = parseInt(this.route.snapshot.paramMap.get("product_id"));
    if (this.product_id) {
      this.flag = true;
      this.service.getOne(this.product_id).subscribe((data: any) => this.product = data);
    }
  }

  ngOnInit(): void {
  }

}
