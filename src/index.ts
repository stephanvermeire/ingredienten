import { AppDataSource } from "./data-source"
import { Recept } from "./entity/Recept"
import {Ingredient} from "./entity/Ingredient";
import path  = require('path');
const fs = require('fs-extra')

AppDataSource.initialize().then(async () => {
    console.log("Inserting a new recept into the database...")

    const dir = path.join(process.cwd(), `./src/invoer`);
    const filenames = await fs.readdir(dir);
    console.log(filenames);
    for(let filename of filenames){
        const naamRecept = filename.replace(/.txt$/, '');
        const content = await fs.readFile(path.join(process.cwd(), './src/invoer', filename), 'utf8');
        const ingredienten = content
          .split('\r\n')
          .filter(ingredient => ingredient !== '')
        ;

        try{
            let recept = new Recept();
            recept.naam = naamRecept;
            recept.ingredienten = [];

            await AppDataSource.manager.save(recept);

            for(let naam of ingredienten){
                //kijken of hij al aanwezig is
                let ingredient = await AppDataSource.manager.getRepository(Ingredient).findOne({
                    where: {
                        naam
                    }
                });

                if(!ingredient){
                    ingredient = new Ingredient();
                    ingredient.naam = naam;
                    await AppDataSource.manager.save(ingredient);
                }

                recept.ingredienten.push(ingredient);
                await AppDataSource.manager.save(recept);
            }
        }
        catch(error){
            console.log(error)
        }

    }
    return;



}).catch(error => console.log(error))
