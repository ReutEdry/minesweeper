'use strict'

const MINE = '💣'
const MARKED = '🎌'
var gBoard
var gGame

gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
function onInit() {

    gBoard = buildBoard()
    boardPass(gBoard)
    renderBoard(gBoard)
    console.log('gBoard', gBoard)
    gGame.isOn = true
}

function buildBoard() {
    const board = []

    for (var i = 0; i < 4; i++) {
        board.push([])

        for (var j = 0; j < 4; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            if (i === 1 && j === 1 || i === 3 && j === 0) {
                board[i][j].isMine = true
                // board[i][j] = MINE
            }

        }
    }
    return board
}

function renderBoard(gBoard) {
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]

            var cell

            if (!currCell.isShown) {
                cell = ''
            } else {
                if (currCell.isMine) {
                    cell = MINE
                }
                else cell = currCell.minesAroundCount
            }


            strHTML += `<td onclick="onCellClicked(${i},${j},this)"
                            data-i="${i}" data-j="${j}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function boardPass(gBoard) {

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
        }
    }
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesAroundCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) minesAroundCount++
        }
    }
    return minesAroundCount
}

function onCellClicked(i, j, ev) {
    gBoard[i][j].isShown = true

    if (gBoard[i][j].isMine) {
        gameOver()
    }

    renderBoard(gBoard)
}

function gameOver() {
    console.log('game over')
    gGame.isOn = false

}

