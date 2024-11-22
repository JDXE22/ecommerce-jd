import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column()
  categoryId: string; // Relacion 1:N
  @Column()
  orderDetails: string; // Relacion N:N
}
