/* ============================================
   data.js — Lesson Content
   All lesson data: letters, numbers, words
   ============================================ */

const lessons = {

  letters: {
    items: [
      'A','B','C','D','E','F','G','H','I','J','K','L','M',
      'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    ],
    hints: [
      'as in Apple',    'as in Ball',     'as in Cat',
      'as in Dog',      'as in Elephant', 'as in Fish',
      'as in Goat',     'as in Hat',      'as in Ice',
      'as in Jar',      'as in Kite',     'as in Lion',
      'as in Mango',    'as in Net',      'as in Orange',
      'as in Parrot',   'as in Queen',    'as in Rat',
      'as in Sun',      'as in Tree',     'as in Umbrella',
      'as in Van',      'as in Water',    'as in Xylophone',
      'as in Yellow',   'as in Zebra'
    ],
    /* unique vibration pulse count per letter (2–8 pulses) */
    vibrations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
  },

  numbers: {
    items: ['1','2','3','4','5','6','7','8','9','10'],
    hints: ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'],
    vibrations: [1,2,3,4,5,6,7,8,9,10]
  },

  words: {
    items: ['CAT','DOG','SUN','BUS','CUP','HAT','BAG','MAT','PEN','MAP'],
    hints: [
      'A small animal',      'A friendly pet',
      'Shines in the sky',   'You ride it',
      'You drink from it',   'Wear on your head',
      'Carry your things',   'Lie on the floor',
      'Used to write',       'Shows directions'
    ],
    vibrations: [3,4,3,3,6,3,3,3,3,3]
  }

};
