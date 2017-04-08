var form = document.querySelector('form');
var main = document.querySelector('main');
var ul = document.querySelector('ul');

function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  var n = array.slice(0);

  for (i = n.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = n[i]
    n[i] = n[j]
    n[j] = temp
  }

  return n;
}

Array.prototype.shuffle = function() {
  return shuffle(this);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  ul.innerHTML = '';

  var difficulty = +document.getElementById('difficulty').value,
      count = +document.getElementById('count').value;

  var categories = exercises.reduce(function(bag, current) {
    if (bag.indexOf(current.category) == -1) {
      return bag.concat(current.category);
    }
    return bag;
  }, []);

  var selected = exercises.filter(function(ex) {
    return ex.difficulty <= difficulty;
  })
  .shuffle()
  .sort(function(a, b) {
    return b.difficulty - a.difficulty
  })
  .reduce(function (bag, current) {
    console.log(current.name, current.category, bag.length, count);
    if (bag.length === count) return bag;

    var categoryCounts = {};
    var categorySum = 0;
    categories.forEach(function(cat) {
      categoryCounts[cat] = bag.filter(function(a) { return a.category === cat }).length;
      categorySum += categoryCounts[cat];
    });

    var categoryDistribution = {};
    if (categorySum) {
      categories.forEach(function(cat) {
        categoryDistribution[cat] = categoryCounts[cat] / categorySum;
      });
    } else {
      categoryDistribution = categoryCounts;
    }

    if (categoryDistribution[current.category] < 0.5) {
      return bag.concat(current);
    }

    return bag;
  }, [])
  .forEach(function(item) {
    ul.appendChild(createItem(item));
  });
});

function createItem(ex) {
  var li = document.createElement('li');
  var name = document.createElement('p');
  name.textContent = ex.name;

  var type = document.createElement('span');
  type.textContent = ex.category;

  var difficulty = document.createElement('div');
  difficulty.innerHTML = Array(ex.difficulty + 1).fill('<i class="fa fa-hand-rock-o"></i>').join('');

  difficulty.setAttribute('title', difficultyText(ex.difficulty));

  li.appendChild(difficulty);
  li.appendChild(type);
  li.appendChild(name);

  return li;
}

function difficultyText(i) {
  return document.getElementById('difficulty').children[i].textContent;
}

var exercises = [
  {
    name: 'Push-up',
    category: 'push',
    difficulty: 0
  },
  {
    name: 'One-arm Push-up',
    category: 'push',
    difficulty: 2
  },
  {
    name: 'Pseudo Planche Push-up',
    category: 'push',
    difficulty: 1
  },
  {
    name: 'Diamond Push-up',
    category: 'push',
    difficulty: 0,
  },
  {
    name: 'Wide Push-up',
    category: 'push',
    difficulty: 0,
  },
  {
    name: 'Incline Push-up',
    category: 'push',
    difficulty: 0,
  },
  {
    name: 'Pike Push-up',
    category: 'push',
    difficulty: 1
  },
  {
    name: 'Wall Handstand Push-up',
    category: 'push',
    difficulty: 2
  },
  {
    name: 'Freestanding Handstand Push-up',
    category: 'push',
    difficulty: 3
  },
  {
    name: 'Tuck Planche Push-up',
    category: 'push',
    difficulty: 2,
  },
  {
    name: 'Plance Push-up',
    category: 'push',
    difficulty: 3,
  },
  {
    name: 'Tricep Dip',
    category: 'push',
    difficulty: 0
  },
  {
    name: 'L-Sit',
    category: 'push',
    difficulty: 3
  },
  {
    name: 'Vertical/Horizontal Rows',
    category: 'pull',
    difficulty: 0,
  },
  {
    name: 'One-arm Rows',
    category: 'pull',
    difficulty: 2,
  },
  {
    name: 'Front-lever Rows',
    category: 'pull',
    difficulty: 3,
  },
  {
    name: 'Tuck Back-lever',
    category: 'pull',
    difficulty: 2,
  },
  {
    name: 'Back-lever',
    category: 'pull',
    difficulty: 3,
  },
  {
    name: 'Pull-up (negative if beginner)',
    category: 'pull',
    difficulty: 0,
  },
  {
    name: 'L-sit Pull-up',
    category: 'pull',
    difficulty: 2,
  },
  {
    name: 'One-arm Pull-up',
    category: 'pull',
    difficulty: 3,
  },
  {
    name: 'Muscle-up',
    category: 'pull',
    difficulty: 2,
  },
  {
    name: 'Pullover',
    category: 'pull',
    difficulty: 3,
  },
  {
    name: 'Squat',
    category: 'leg',
    difficulty: 0,
  },
  {
    name: 'Pistol Squat',
    category: 'leg',
    difficulty: 2,
  },
  {
    name: 'Single-leg Deadlift',
    category: 'leg',
    difficulty: 1,
  },
  {
    name: 'Lunge',
    category: 'leg',
    difficulty: 0,
  },
  {
    name: 'Jump Squat',
    category: 'leg',
    difficulty: 1,
  },
  {
    name: 'Side Lunge',
    category: 'leg',
    difficulty: 0,
  }
]

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}
