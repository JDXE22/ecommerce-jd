import { Orders } from "@entities/orders/entities/orders.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from "uuid"

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()
    @Column({length: 50})
    name: string
    @Column({length: 50})
    email: string
    @Column({length: 20})
    password: string
    @Column({length: 50})
    country: string
    @Column({length: 50})
    address:string
    @Column({length: 50})
    city: string
    @OneToMany(()=> Orders, (orders)=> orders.users)
    orders: Orders[] // Relacion 1:N con orders
    @Column()
    createdAt: string
}