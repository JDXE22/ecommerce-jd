import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({name: "orders"})
export class Orders {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @ManyToOne(()=> User, (user)=> user.orders)
    user: User // Relacion 1:N

    @Column()
    date: Date

    @Column()
    orderDetails: string // Relacion 1:1 con orderDetails
}