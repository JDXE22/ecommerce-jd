import { Products } from "@entities/products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({name: "categories"})

export class Categories {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column()
    name: string

    @OneToMany(()=> Products, (product)=> product.categories)
    products: string // Relacion N:1 con product

}