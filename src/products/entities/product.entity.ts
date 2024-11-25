import { Categories } from '@entities/categories/entities/category.entity';
import { OrderDetails } from '@entities/orderDetails/entities/orderDetails.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column({ length: 50 })
  name: string;
  @Column({ nullable: false })
  description: string;
  @Column({ nullable: false, type: 'decimal' })
  price: number;
  @Column()
  stock: number;
  @Column()
  imgUrl: string;
  @ManyToOne(()=> Categories, (category)=> category.products)
  categories: Categories; // Relacion 1:N
  @ManyToMany(()=> OrderDetails, (orderDetails) => orderDetails.products)
  @JoinTable()
  orderDetails: OrderDetails[]; // Relacion N:N
}
