import { Injectable } from '@nestjs/common';

import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateUsersDTO } from 'src/users/dto/createUsers.dto';
import { ProductDTO } from './dto/products.dto';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'Smartphone',
      description:
        'A high-end smartphone with a sleek design and powerful features.',
      price: 699.99,
      stock: true,
      imgUrl: 'https://example.com/images/smartphone.jpg',
    },
    {
      id: 2,
      name: 'Laptop',
      description:
        'A lightweight laptop with long battery life, perfect for work and play.',
      price: 1099.99,
      stock: true,
      imgUrl: 'https://example.com/images/laptop.jpg',
    },
    {
      id: 3,
      name: 'Wireless Earbuds',
      description:
        'Compact and comfortable wireless earbuds with high-quality sound.',
      price: 149.99,
      stock: false,
      imgUrl: 'https://example.com/images/earbuds.jpg',
    },
    {
      id: 4,
      name: "Smartwatch",
      description: "A stylish smartwatch with health tracking and customizable watch faces.",
      price: 199.99,
      stock: true,
      imgUrl: "https://example.com/images/smartwatch.jpg",
    },
    {
      id: 5,
      name: "Tablet",
      description: "A powerful tablet with a crystal-clear display, great for media consumption.",
      price: 499.99,
      stock: true,
      imgUrl: "https://example.com/images/tablet.jpg",
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      description: "Portable speaker with excellent sound quality and long battery life.",
      price: 89.99,
      stock: true,
      imgUrl: "https://example.com/images/speaker.jpg",
    },
    {
      id: 7,
      name: "Gaming Console",
      description: "Next-generation gaming console with stunning graphics and exclusive games.",
      price: 499.99,
      stock: false,
      imgUrl: "https://example.com/images/console.jpg",
    },
    {
      id: 8,
      name: "4K TV",
      description: "Ultra HD 4K TV with vibrant colors and smart TV functionality.",
      price: 799.99,
      stock: true,
      imgUrl: "https://example.com/images/tv.jpg",
    },
    {
      id: 9,
      name: "Wireless Charger",
      description: "Fast wireless charger compatible with a variety of devices.",
      price: 29.99,
      stock: true,
      imgUrl: "https://example.com/images/charger.jpg",
    },
    {
      id: 10,
      name: "Digital Camera",
      description: "High-resolution digital camera with various shooting modes.",
      price: 599.99,
      stock: true,
      imgUrl: "https://example.com/images/camera.jpg",
    },
  
  ];

  async getProducts(page: number, limit: number) {
    console.log(`Fetching products: page ${page}, limit ${limit}`);
    const currentPage = page > 0 ? page: 1;
    const currentLimit = limit > 0 ? limit: 5

    const start = (currentPage - 1) * currentLimit
    const end = start + currentLimit

    const productsPage = this.products.slice(start, end)
     return {
      page: currentPage,
      limit: currentLimit,
      totalItems: this.products.length,
      totalPages: Math.ceil(this.products.length / currentLimit),
      products: productsPage,
    }; 
  }
  async createProduct(product) {
    const id = this.products.length + 1;
    this.products = [...this.products, { id, ...product }];
    return { id, product };
  }

  async getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }

  async deleteProduct(id: number){
    return this.products.find((product) => product.id === id);
  }

  async updateProduct(id:number){
    return this.products.find((product) => product.id === id);
  }



}
