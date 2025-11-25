import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    cats: String[];
    constructor(){
        console.log("Création de mon service des chats")
    }
    debile(){
        console.log("Je suis débile")
    }
    findAll(){
        return this.cats;
    }
    findOne(name: string) {
        return name;
    }
    exists(name: string) {
        return this.cats.includes(name);
    }
    delete(name:string) {
    const index = this.cats.findIndex(cat => name == cat);
        this.cats.slice(index,1)
    }
}
