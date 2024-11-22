import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({name: "categories"})

export class Categories {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column()
    name: string

    @Column()
    products: string // Relacion N:1 con product

}