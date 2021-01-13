import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent implements OnInit {

  item: Product;

  constructor(protected route: ActivatedRoute, protected router: Router, private service: ProductService) {
    this.item = new Product();
    this.item.active = true;
  }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get("id");

    if (id != null) {
      this.service.getOne(parseInt(id)).subscribe(
        (data: any) => {
            this.item = data
            console.log(this.item)
          }
        );
    }
  }
  
  save() {
    console.log(this.item)
    if(this.item.id != undefined) {
      this.service.update(this.item).subscribe(
        (data: any) => this.callbackSuccess(),
        (error: any) => this.callbackError(error),
      );
    } else {
      this.service.insert(this.item).subscribe(
        (data: any) => this.callbackSuccess(),
        (error: any) => this.callbackError(error),
      );
    }
  }

  private callbackSuccess() {
    this.router.navigate(['/products']);
  }

  private callbackError(error: any) {
    alert('Ocorreu um erro ao salvar');
    console.log(error);
  }

}
