export const random = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export const firstPlayerGenerator = [
  {
    type: 'L',
    pos: random(1, 3)
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: 'I',
    pos: random(1, 5)
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: '.',
    pos: random(6, 8)
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: '.',
    pos: random(6, 8)
  }
]

export const secondPlayerGenerator = [
  {
    type: 'L',
    pos: random(1, 3)
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: 'I',
    pos: random(1, 5)
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: '.',
    pos: random(6, 8)
  },
  {
    type: 'empty',
    pos: -1
  },
  {
    type: '.',
    pos: random(6, 8)
  }
]
