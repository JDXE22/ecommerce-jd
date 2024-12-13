import { Products } from "../../products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({name: "categories"})

export class Categories {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column()
    name: string

    @OneToMany(()=> Products, (product)=> product.category)
    products: Products[] // Relacion N:1 con product

}