import { Orders } from "../../orders/entities/orders.entity";
import { Products } from "../../products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity({name: "orderDetails"})
export class OrderDetails {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({type: "decimal" , nullable: false})
    price: number

    @OneToOne(()=> Orders, orders =>orders.orderDetails)
    @JoinTable()
    orders: Orders[] // Relacion 1:1 orders

    @ManyToMany(()=> Products, product => product.orderDetails)
    products: Products[] // Relacion N:N
}