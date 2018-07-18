import React, { Component } from 'react'
import Board from '../src/components/Board.jsx'
import { secondPlayerGenerator, firstPlayerGenerator } from './utils/helpers'

class Game extends Component {
  render() {
    const ships = [
      [ ...firstPlayerGenerator ],
      [ ...secondPlayerGenerator ]
    ]

    return (
      <div className='game-board'>
        <Board ships={ships} />
      </div>
    )
  }
}

export default Game
