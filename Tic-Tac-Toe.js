$(function () {
    $("#radio").buttonset();
    $("input").click(function (event) {
        initialize($("input").index(this) + 1);
    });

    //User selects with whom to play Tic-Tac-Toe
    var option;

    function initialize(player) {
        option = player;
    }

    //The method below is called when a canvas is clicked
    $("canvas").click(function (event) {
        clicked($("canvas").index(this));
    });

    $("#newGame")
        .button()
        .click(function (event) {
        event.preventDefault();
        newGame();
    });

    //Some Global Variables
    var turn = 1;
    var originalTurn = 1;
    var firstCanvasClicked;
    var drawn;
    var squaresFilled = 0;
    var winners = false;
    var xWinCountFriend = 0;
    var xWinCountAI = 0;
    var xWinCountUnbeatableAI = 0;
    var oWinCountFriend = 0;
    var oWinCountAI = 0;
    var oWinCountUnbeatableAI = 0;

    //creates an array for all nine boxes
    canvas = new Array();
    for (i = 0; i < 9; i++) {
        canvas[i] = i;
    }
    //winning combinatios
    var win = ["012", "345", "678", "036", "147", "258", "048", "246"];

    //Function when a square on the grid is clicked
    function clicked(canvasNumber) {
        if (winners === false) {
            if (option === 1 || option === 2 || option === 3) {
                $('#status').text("");
                if (turn % 2 === 0) {
                    $("#XorO").html("X's Turn");
                } else {
                    $("#XorO").html("O's Turn");
                }
                if (turn === 1) {
                    firstCanvasClicked = canvasNumber;
                }
                if (canvas[canvasNumber] === "X" || canvas[canvasNumber] === "O") {
                    alert('This square is already taken! Choose another :)');
                } else if (option === 1) {
                    var playerTurn = turn % 2;
                    if (playerTurn === 1) {
                        draw(canvasNumber, "X");
                        checkForWinnersAndDraws("X");
                    } else {
                        draw(canvasNumber, "O");
                        checkForWinnersAndDraws("O");
                    }
                } else if (option === 2) {} else if (option === 3) {
                    draw(canvasNumber, "X");
                    checkForWinnersAndDraws("X");
                    computerTurn();
                    checkForWinnersAndDraws("O");
                }
                turn++;
                squaresFilled++;
            }
        }
    }

    function draw(canvasNumber, XorO) {
        var canvasT = "canvas" + canvasNumber;
        c = document.getElementById(canvasT).getContext("2d");
        c.beginPath();
        if (XorO === "X") {
            c.moveTo(10, 10);
            c.lineTo(90, 90);
            c.moveTo(90, 10);
            c.lineTo(10, 90);
            c.stroke();
            canvas[canvasNumber] = "X";
        } else {
            c.arc(50, 50, 40, 0, 2 * Math.PI);
            c.stroke();
            c.closePath();
            canvas[canvasNumber] = "O";
            drawn = 1;
        }
    }

    function computerTurn() {
        checkTwo("O");
        checkForWinnersAndDraws("O");
        checkTwo("X");
        if (firstCanvasClicked === 4) {
            if (canvas[2] === "X") {
                if (canvas[3] === "X") {
                    draw(5, "O");
                } else {
                    draw(0, "O");
                }
            } else {
                draw(6, "O");
            }
        } else if (firstCanvasClicked === 0 || firstCanvasClicked === 2 || firstCanvasClicked === 6 || firstCanvasClicked === 8) {
            if (canvas[0] === "X") {
                draw(6, "O");
            } else {
                draw(4, "O");
            }
        }
    }

    function checkTwo(XorO) {
        for (i = 0; i < 8; i++) {
            if ((canvas[win[i].charAt(0)] === XorO) && (canvas[win[i].charAt(1)] === XorO)) {
                if (canvas[win[i].charAt(2)] !== "O" && canvas[win[i].charAt(2)] !== "X") {
                    draw(win[i].charAt(2), "O");
                    break;
                }
            }
        }
        for (i = 0; i < 8; i++) {
            if ((canvas[win[i].charAt(0)] === XorO) && (canvas[win[i].charAt(2)] === XorO)) {
                if (canvas[win[i].charAt(1)] != "O" && canvas[win[i].charAt(1)] != "X") {
                    draw(win[i].charAt(1), "O");
                    break;
                }
            }
        }
        for (i = 0; i < 8; i++) {
            if ((canvas[win[i].charAt(1)] === XorO) && (canvas[win[i].charAt(2)] === XorO)) {
                if (canvas[win[i].charAt(0)] != "O" && canvas[win[i].charAt(0)] != "X") {
                    draw(win[i].charAt(0), "O");
                    break;
                }
            }
        }
    }

    function checkForWinnersAndDraws(XorO) {
        for (i = 0; i < 8; i++) {
            if ((canvas[win[i].charAt(0)] === XorO) && (canvas[win[i].charAt(1)] === XorO) && (canvas[win[i].charAt(2)] === XorO)) {
                winners = true;
                $('#status').text(XorO + " wins! Start a new game?");
                if (option === 1) {
                    if (XorO === "X") {
                        xWinCountFriend++;
                        $('#xWinCount').text("X wins: " + xWinCountFriend);
                    } else {
                        oWinCountFriend++;
                        $('#oWinCount').text("O wins: " + oWinCountFriend);
                    }
                } else if (option === 2) {
                    if (XorO === "X") {
                        xWinCountFriend++;
                        $('#xWinCount').text("X wins: " + xWinCountAI);
                    }
                } else {
                    oWinCountFriend++;
                    $('#oWinCount').text("O wins: " + oWinCountAI);
                }
            }
        }
        if (squaresFilled === 8 && winners === false) {
            $('#status').text("It's a draw! Start a new game?");
        }
    }

    function newGame() {
        $('#status').text("Continue with current or choose a new opponent.");
        originalTurn++;
        if (originalTurn % 2 === 0) {
            turn = 2;
        } else {
            turn = 1;
        }
        canvasFirstClicked = null;
        drawn = null;
        squaresFilled = 0;
        winners = false;
        initialize = null;
        for (i = 0; i < 9; i++) {
            canvas[i] = i;
            var canvasT = "canvas" + i;
            c = document.getElementById(canvasT).getContext("2d");
            c.clearRect(0, 0, 200, 200);
        }
    }
});