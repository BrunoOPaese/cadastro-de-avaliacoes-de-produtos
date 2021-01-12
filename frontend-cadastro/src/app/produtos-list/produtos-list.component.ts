import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutosListComponent implements OnInit {

  items: Product[];

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
    this.service.delete(id).subscribe(
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
