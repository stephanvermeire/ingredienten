import {Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, JoinTable} from "typeorm"
import {Ingredient} from "./Ingredient";

@Entity()
@Unique(['naam'])
export class Recept {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    naam: string

    @ManyToMany( type => Ingredient, ingredient => ingredient.recepten, {onDelete: 'CASCADE'})
    @JoinTable({name: 'recept_ingredient'})
    ingredienten: Ingredient[];

}
