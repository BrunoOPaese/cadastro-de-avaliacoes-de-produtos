import { Component, OnInit, ViewChild } from '@angular/core';
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
  errors: any;

  @ViewChild('alert') alert;

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

  private callbackSuccess() {
    this.router.navigate(['/products']);
  }

  private callbackError(error: any) {
    this.alert.type = 'danger';
    if (error.status == 422) {
      this.alert.message = "Não foi possível salvar o registro.";
      let errorAR = Object.values(error.error);
      errorAR.forEach(error => {
        if (error[0].indexOf('description') !== -1) {
          error = error[0].replace('description', 'descrição');
        }
        if (error[0].indexOf('name') !== -1) {
          error = error[0].replace('name', 'nome');
        }
        if (error[0].indexOf('price') !== -1) {
          error = error[0].replace('price', 'preço');
        }
        this.alert.message += ' - '+error+'\n';
      });
    } else {
      this.alert.message = 'Ocorreu um problema ao salvar o registro.';
    }
    this.errors = error.error;
  }

}
