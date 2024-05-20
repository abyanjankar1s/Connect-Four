

class Player {
    #name
    #pieceColor;

    constructor(name, pieceColor){
        this.#name = name;
        this.#pieceColor = pieceColor;
    }

    getName(){
        return this.#name
    }

    getPieceColor(){
        return this.#pieceColor;
    }
}