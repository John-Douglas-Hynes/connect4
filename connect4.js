const connect4=document.getElementById("connect4");
const ctx=connect4.getContext("2d");
const board=[];

function initiate() {
    for(let i = 0; i < 7; i++) {
        board[i]=new Array(7).fill(0);
    }
    ctx.beginPath();
    for(let i=0; i<7;i++) {
        for(let j=0; j < 7; j++) {
            ctx.arc(75 + j*75, 125+75*i, 30, 0, Math.PI*2, true);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.moveTo(75+(j+1)*75, 100+(i+1)*75);
        };
    };
    ctx.fillStyle = "lightslategrey";
    ctx.rect(0, 0, connect4.width, connect4.height);
    ctx.fill();
};

function getResult(board) {
    let topRow = [];
    for(i=0;i < 7; i++) {
        topRow[i] = board[i][0];
    };
    if (topRow.every(element => element !== 0)) {
        return 0;
    };
    let toCheck = [];
    for(let i=0; i<4;i++) {
        for(let j=0;j<7;j++) {
            if (board[i][j] !== 0) {
                for(let k=0; k<4; k++) {
                    toCheck[k] = board[i+k][j];
                    if (k === 3 && toCheck.every(element => element === board[i][j])) {
                        return board[i][j];
                    };
                };
            };
        };
    };
    for(let i=0; i<7;i++) {
        for(let j=0;j<4;j++) {
            if (board[i][j] !== 0) {
                for(let k=0; k<4; k++) {
                    toCheck[k] = board[i][j+k];
                    if (k === 3 && toCheck.every(element => element === board[i][j])) {
                        return board[i][j];
                    };
                };
            };
        };
    };
    for(let i=0; i<4;i++) {
        for(let j=0;j<4;j++) {
            if (board[i][j] !== 0) {
                for(let k=0; k<4; k++) {
                    toCheck[k] = board[i+k][j+k];
                    if (k === 3 && toCheck.every(element => element === board[i][j])) {
                        return board[i][j];
                    };
                };
            };
        };
    };
    for(let i=3; i<7;i++) {
        for(let j=0;j<7;j++) {
            if (board[i][j] !== 0) {
                for(let k=0; k<4; k++) {
                    toCheck[k] = board[i-k][j+k];
                    if (k === 3 && toCheck.every(element => element === board[i][j])) {
                        return board[i][j];
                    };
                };
            };
        };
    };
    return null;
};

function randomMove(board) {
    let freeSlots = 0;
    for(let i =0; i < board.length; i++) {
        if (board[i][0] === 0) {
            freeSlots++;
        };
    };
    let slot = Math.floor(freeSlots*Math.random());
    let count = 0
    for(let i=0; i< board.length; i++) {
        if (board[i][0] === 0) {
            if (count === slot) {
                let h = 0;
                while (board[i][h] === 0) {
                    h++;
                };
                h = h-1;
                board[i][h] = -1;
                ctx.fillStyle = "red"
                ctx.beginPath();
                ctx.arc((i+1)*75, h*75 + 125, 30, 0, Math.PI*2);
                ctx.fill();
            };
            count++;
        };
    };
};


let currentPosition=-1

connect4.addEventListener("mousemove", (e) => {
    let prevPosition=currentPosition;
    currentPosition=Math.floor((e.offsetX + 37.5)/75);
    if (prevPosition !== currentPosition && currentPosition < 8 && currentPosition > 0) {
        ctx.fillStyle = "lightslategrey";
        ctx.fillRect(0, 18, connect4.width, 64);
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(currentPosition*75, 50, 32, 0, Math.PI*2, true);
        ctx.fill();
    };
});

connect4.addEventListener("mousedown", (e) => {
    currentPosition=Math.floor((e.offsetX + 37.5)/75)-1;
    if (currentPosition < 8 && currentPosition >= 0) {
        let h=0
        while (board[currentPosition][h] === 0) {
            h++;
        };
        h = h-1;
        if (h<0) {
            alert("invalid move");
        } else {
            board[currentPosition][h] = 1;
            ctx.fillStyle = "lightslategrey";
            ctx.fillRect(0, 18, connect4.width, 64);
            ctx.fillStyle = "yellow"
            ctx.beginPath();
            ctx.arc((currentPosition+1)*75, h*75 + 125, 30, 0, Math.PI*2);
            ctx.fill();
            if (getResult(board) !== null) {
                alert("game over!");
                initiate();
            };
            randomMove(board);
            if (getResult(board) !== null) {
                alert("game over!");
                initiate();
            };
        };
    };
});

function main() {
    initiate();
};


