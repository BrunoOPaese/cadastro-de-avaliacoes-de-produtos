import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutosListComponent implements OnInit {

  items: Product[];

  @ViewChild('alert') alert;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.getAll().subscribe(
      (data: any) => this.items = data
    );
  }

  delete(id: number) {
    this.service.delete(1854963457).subscribe(
        (data: any) => this.callbackSuccess(),
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
  }
}
