import { OrderDetails } from "@entities/orderDetails/entities/orderDetails.entity";
import { User } from "@entities/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({name: "orders"})
export class Orders {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @ManyToOne(()=> User, (users)=> users.orders)
    users: User // Relacion 1:N

    @Column()
    date: Date

    @OneToOne(()=> OrderDetails, orderDetails => orderDetails.orders)
    orderDetails: OrderDetails // Relacion 1:1 con orderDetails
}