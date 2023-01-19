const connect4=document.getElementById("connect4");
const ctx=connect4.getContext("2d");
let turn="playerTurn";
const board=[];


function initiate() {
    for(let i = 0; i < 7; i++) {
        board[i]=new Array(7).fill(0);
    }
    ctx.fillStyle = "lightslategrey";
    ctx.beginPath();
    for(let i=0; i<7;i++) {
        for(let j=0; j < 7; j++) {
            ctx.arc(75 + j*75, 125+75*i, 30, 0, Math.PI*2, true);
            ctx.moveTo(75+(j+1)*75, 100+(i+1)*75);
        };
    };
    ctx.rect(0, 0, connect4.width, connect4.height);
    ctx.fill();
};

let currentPosition=-1

connect4.addEventListener("mousemove", (e) => {
    if (turn === "playerTurn") {
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
    };
});

connect4.addEventListener("mousedown", (e) => {
    if (turn === "playerTurn") {
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
            };
            ctx.fillStyle = "lightslategrey";
            ctx.fillRect(0, 18, connect4.width, 64);
            ctx.fillStyle = "yellow"
            ctx.beginPath();
            ctx.arc((currentPosition+1)*75, h*75 + 125, 30, 0, Math.PI*2);
            ctx.fill();
        };
    };
});

function main() {
    initiate();
};

