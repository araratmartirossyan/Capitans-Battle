import update from 'react-addons-update'
import { unnest } from 'ramda'
import { random } from './helpers'

export default (() => {
  const setting = Object.freeze({
    HIT: 3,
    SHIP: 2,
    MISS: 1,
    EMPTY: 0
  })

  function boardWithShips(ships) {
    let board = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ]
    setupCoords(ships)
      .forEach(([row, col]) =>
        board[row][col] = setting.SHIP
      )

    return board
  }

  function hit(board, row, col) {
    let newBoard = board
    switch(board[row][col]) {
      case setting.EMPTY:
        newBoard = update(board, {
          [row]: {
            [col]: {
              $set: setting.MISS
            }
          }
        })
        break
      case setting.SHIP:
        newBoard = update(board, {
          [row]: {
            [col]: {
              $set: setting.HIT
            }
          }
        })
        break
      case setting.HIT:
      case setting.MISS:
        break
      }
      return newBoard
  }



  function setupCoords(ships) {
    const coords = []
    ships.forEach(({ pos, type }, col) => {
      if (pos === -1) return
      switch(type) {
        case 'I':
          if (random(0, 1) === 1) {
            coords.push([pos, col])
            coords.push([pos + 1, col])
            coords.push([pos + 2, col])
            coords.push([pos + 3, col])
          } else {
            coords.push([pos, col])
            coords.push([pos, col + 1])
            coords.push([pos, col + 2])
            coords.push([pos, col + 3])
          }
          break
        case 'L':
          if (random(0, 1) === 1) {
            coords.push([pos, col])
            coords.push([pos + 1, col])
            coords.push([pos + 2, col])
            coords.push([pos + 2, col + 1])
          } else {
            coords.push([pos, col])
            coords.push([pos, col + 1])
            coords.push([pos, col + 2])
            coords.push([pos + 1, col])
          }
          break
        case '.':
          coords.push([pos, col])
          break
      }
    })
    return coords
  }

  function isWinner(board) {
    const { SHIP } = this.setting
    const hittedBoard = unnest(board)

    return !hittedBoard.includes(SHIP)
  }

  return {
    setting,
    boardWithShips,
    hit,
    isWinner
  }
})()
