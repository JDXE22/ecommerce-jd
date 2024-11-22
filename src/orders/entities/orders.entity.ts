import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({name: "orders"})
export class Orders {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column()
    userId: string // Relacion 1:N

    @Column()
    date: Date

    @Column()
    orderDetails: string // Relacion 1:1 con orderDetails
}