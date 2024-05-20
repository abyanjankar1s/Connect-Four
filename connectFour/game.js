
const prompt = require('prompt-sync')({ sigint: true});

class Game {
    #grid;
    #connectN;
    #players;
    #score;
    #targetScore;

    constructor(grid, connectN, targetScore) {
        this.#grid = grid;
        this.#connectN = connectN;
        this.#targetScore = targetScore;

        this.#players = [
            new Player('Player 1', GridPosition.BLUE),
            new Player('Player 2', GridPosition.RED)
        ];

        this.#score = {};
        for(const player of this.#players){
            this.#score[player.getName()] = 0; 
        }
    }

    #printBoard(){
        console.log('Board:\n');
        const grid = this.#grid.getGrid();
        for(let i = 0; i<grid.length; i++){
            let row = '';
            for(let piece of grid[i]){
                if(piece === GridPosition.EMPTY){
                    row += '0';
                } else if(piece === GridPosition.BLUE){
                    row += 'B';
                } else if(piece === GridPosition.RED){
                    row += 'R';
                }
            }
            console.log(row);
        }
        console.log('');
    }

    #playMove(player){
        this.#printBoard();
        console.log(`${player.getName()}'s turn`);
        const colCnt = this.#grid.getColumnCount();
        const moveColumn = Number(prompt(`Enter column between ${0} and ${colCnt -1 } to add piece: `));
        let moveRow = this.#grid.placePiece(moveColumn, player.getPieceColor());
        return [moveRow, moveColumn];  
    }

    #playRound(){
        while(true){
            for(const player of this.#players){
                let [row, col] = this.#playMove(player);
                const pieceColor = player.getPieceColor();
                if(this.#grid.checkWin(this.#connectN, row, col, pieceColor)) {
                    this.#score[player.getName()]++;
                    return player;
                }
            }
        }
    }

    play() {
        let maxScore = 0;
        let winner = null; 
        while(maxScore < this.#targetScore) {
            winner = this.#playRound();
            console.log(`${winner.getName()} won the round`);
            maxScore = Math.max(this.#score[winner.getName()], maxScore);

            this.#grid.initGrid();  //reset grid
        }
        console.log(`${winner.getName()} won the game`);
    }
}

const Grid = require('./grid');

const grid = new Grid(6,7);
const game = new Game(grid, 4, 2);
game.play(); 