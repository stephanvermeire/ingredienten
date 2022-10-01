import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm"
import {Recept} from "./Recept";

@Entity()
export class Ingredient {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    naam: string

    @ManyToMany(type => Recept, recept => recept.ingredienten)
    recepten: Recept[];
}
