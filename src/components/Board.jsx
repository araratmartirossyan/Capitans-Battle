import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid.jsx'
import battleship from '../utils/boardFunctions.js'
import update from 'react-addons-update'

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    const { ships } = this.props
    this.fire = this.fire.bind(this)
    this.switchTurn = this.switchTurn.bind(this)

    this.state = {
      whoseTurn: 0,
      hasFired: false,
      gameOver: false,
      winner: null,
      playerBoards: [
        battleship.boardWithShips(ships[1]),
        battleship.boardWithShips(ships[0])
      ]
    }
  }

  getOtherPlayer = () =>
    this.state.whoseTurn === 0 ? 1 : 0

  fire = (row, col) => {
    const { hasFired, whoseTurn, playerBoards } = this.state
    if (hasFired) { return }
    
    const board = playerBoards[whoseTurn]
    const newBoard = battleship.hit(board, row, col)
    const isGameOver = battleship.isWinner(
      newBoard,
      this.props.ships[this.getOtherPlayer()]
    )

    let newBoards = update(
      playerBoards,
      {
        [whoseTurn]: {
          $set: newBoard
        }
      }
    )

    const newState = {
      hasFired: true,
      playerBoards: newBoards,
      gameOver: isGameOver
    }

    if (isGameOver) {
      newState.winner = whoseTurn
    }

    this.setState(newState)
  }

  switchTurn() {
    this.setState({
      whoseTurn: this.getOtherPlayer(),
      hasFired: false
    })
  }

  render() {
    const {
      gameOver,
      whoseTurn,
      hasFired,
      winner,
      playerBoards
    } = this.state
    const isTurnChanged = hasFired && !gameOver

    return (
    <div className='board'>
      <h1>Capitan {whoseTurn}'s turn</h1>
      <Grid
        board={playerBoards[0]}
        canFire={!hasFired}
        onFire={this.fire}
        visible={whoseTurn === 0}
      />
      <Grid
        board={playerBoards[1]}
        canFire={!hasFired}
        onFire={this.fire}
        visible={whoseTurn === 1}
      />
      {gameOver && <h1>Capitan {winner} wins!</h1>}
      {isTurnChanged &&
        <button
          onClick={this.switchTurn}
          className='btn'
        >
          Next Player
        </button>}
    </div>
    )
  }
}

Board.propTypes = {
  ships: PropTypes.array
}

Board.defaultProps = {
  ships: []
}