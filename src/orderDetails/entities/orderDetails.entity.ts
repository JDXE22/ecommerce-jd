import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity({name: "orderDetails"})
export class OrderDetails {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({type: "decimal" , nullable: false})
    price: number

    @Column()
    orderId: string // Relacion 1:1 orders

    @Column()
    products: string // Relacion N:N
}