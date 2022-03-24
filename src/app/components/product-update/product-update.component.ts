import { Product } from './../product/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product!: Product

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    //verificar pq não está passando valor para o id
    this.productService.readById('id').subscribe(product => {
    //id passado dentro do readById não deve estar entre ''
      this.product = product;
    });
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMesage('Produto atualizado com sucesso')
      this.router.navigate(['/products']);
    })
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}