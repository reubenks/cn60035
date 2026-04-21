import { Card } from "../models/card";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class FavouritesService {

    // array to stores the favourites
    favourites: Card[] = []

    // add / remove favourites functionality
    FavouritesToggle(card: Card) {
        const found = this.favourites.find(c => c.tokenId == card.tokenId)
        // checks if the cards already been favourited
        if (found) {
            this.favourites = this.favourites.filter(c => c.tokenId != card.tokenId)
        } else {
            this.favourites.push(card)
        }
    }

    // returns if the cards in favorites
    favourited(card: Card) {
        return this.favourites.find(c => c. tokenId == card.tokenId)
    }
}