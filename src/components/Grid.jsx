import React from 'react'
import PropTypes from 'prop-types'
import battleship from '../utils/boardFunctions'

export default class Grid extends React.Component {
  renderSquare(row, col) {
    const { board, onFire } = this.props

    switch(board[row][col]) {
      case battleship.setting.EMPTY:
      case battleship.setting.SHIP:
        return (
          <div
            className='empty'
            onClick={onFire.bind(this, row, col)}
            key={col}
          />
        )
      case battleship.setting.HIT:
        return <div className='hit' key={col} />
      case battleship.setting.MISS:
        return <div className='miss' key={col} />
    }
  }

  render() {
    const { visible } = this.props
    const elementsCount = [...Array(10).keys()]
    const rows = elementsCount.map(
      (row, key) =>
        <div
          key={key}
          className='game-row'
        >
          {elementsCount.map(col =>
            this.renderSquare(row, col)
          )}
        </div>
    )

    return (
      <div className={visible ? '' : 'hidden'}>
        {rows}
      </div>
    )
  }
}

Grid.propTypes = {
  visible: PropTypes.bool,
  board: PropTypes.array,
  onFire: PropTypes.func
}

Grid.defaultProps = {
  visible: false,
  board: [],
  onFire: () => {}
}