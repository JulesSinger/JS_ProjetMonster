let name // nom du monstre.
let life // le nombre de points de vie du monstre.
let money // l'argent du monstre.
let awake // indique si le monstre est réveillé ou non.

let actionbox = document.getElementById('actionbox') // variable globale pour l'action box
let monster = document.getElementById('monster')

/**
 * init() : initialise l'etat du monstre 
 * @param {*} n nom du monstre
 * @param {*} l points de vie du monstre
 * @param {*} m argent du monstre
 */
let init = (n, l, m) => {
  name = n
  life = l
  money = m
  awake = true
  monster.childNodes[1].innerHTML = name
}

/**
 * showme() : affiche les propriétés du monstre dans la boite de logs
 */
showme = () => {
  log('name : ' + name + ', life : ' + life + ', money : ' + money + ', awake : ' + awake + '.')
}

/**
 * déclaration des variables globales pour les handlers
 */
let buttonLife = document.getElementById('b1')
let buttonRun = document.getElementById('b2')
let buttonFight = document.getElementById('b3')
let buttonSleep = document.getElementById('b4')
let buttonEat = document.getElementById('b5')
let buttonShow = document.getElementById('b6')
let buttonWork = document.getElementById('b7')
let buttonKill = document.getElementById('k')

/**
 * go() : initialise un monstre et execute la fonction showme lors du clique sur le bouton b6.
 */
let go = () => {
  init('Bob', 25, 10)
  buttonShow.addEventListener('click', showme)
  displayStatus(life, money, awake)
}

/**
 * log : ajoute un message dans la boite d'actions
 * @param message : texte ajouté
 */
let log = (message) => {
  let action = document.createElement('p')
  action.innerHTML = message
  actionbox.prepend(action)
}

let status = document.getElementById('status') // variable globale pour la liste
let statusElements = status.childNodes // les elements de la liste

/**
 * displayStatus : affiche l'etat du monstre recu en paramètre. De plus change le style du monstre selon son etat
 * @param  life : vie du monstre
 * @param  money : argent du monstre
 * @param  awake : etat de sommeil du monstre, true s'il est réveillé.
 */
let displayStatus = (life, money, awake) => {

  // modif couleur et position du monstre
  if (life < 5) {
    monster.style.backgroundColor = 'red'
    monster.style.marginLeft = 93 + '%'
  } else if (life >= 5 && life < 10) {
    monster.style.backgroundColor = 'orange'
    monster.style.marginLeft = 62 + '%'
  } else if (life >= 10 && life < 20) {
    monster.style.backgroundColor = 'royalblue'
    monster.style.marginLeft = 32 + '%'
  } else {
    monster.style.backgroundColor = 'green'
    monster.style.marginLeft = 2.5 + '%'
  }

  // modif largeur de la bordure du monstre
  if (money < 3) { monster.style.border = 2 + 'px solid black'}

  else if (money >= 3 && money < 7) { monster.style.border = 3 + 'px solid black' }

  else if (money >= 7 && money < 12) { monster.style.border = 4 + 'px solid black'}else { monster.style.border = 5 + 'px solid black'}

  // changement de la liste status
  let etatSommeil
  if (awake === true) {
    etatSommeil = 'Awake'
  } else if (!awake) {
    etatSommeil = 'Sleeping'
  } else if (awake === 'R.I.P') {
    etatSommeil = 'R.I.P'
  }
  statusElements[1].innerHTML = 'Life : ' + life
  statusElements[3].innerHTML = 'Money : ' + money
  statusElements[5].innerHTML = etatSommeil
}

/**
 * run() : fait courir le monstre s'il a assez de vie et ne dors pas. 
 * Lui fait perdre un point de vie.
 */
let run = () => {
  if (life === 0 || awake === false) {
    if (life === 0) {
      message = name + " is dead, he can't run. "
    } else {
      message = name + " is sleeping, he can't run. "
    }
  } else {
    life--
    message = 'Woww ! ' + name + ' is running ! '
  }
  displayStatus(life, money, awake) // M.A.J de l'état du monstre
  log(message) // Affichage de l'action
}

/**
 * fight() : fait combattre le monstre s'il a assez de vie et ne dors pas. *
 * Lui fait perdre trois points de vie.
 */
let fight = () => {
  if (life === 0) {
    message = name + " is dead, he can't fight. "
  }
  else if (life < 3 || awake === false) {
    if (life < 3) {
      message = name + " doesn't have enough life left, he can't fight. "
    } else {
      message = name + " is sleeping, he can't fight. "
    }
  } else {
    life = life - 3
    message = 'Unbelievable, what a ' + name + ' fight.'
  }
  displayStatus(life, money, awake) // M.A.J de l'état du monstre
  log(message) // Affichage de l'action
}

/**
 * work() : fait travailler le monstre s'il a assez de vie et ne dors pas. 
 * Lui fait gagner deux euros et lui fait perdre un point de vie.
 */
let work = () => {
  if (life === 0 || awake === false) {
    if (life === 0) {
      message = name + " is dead, he can't work. "
    } else {
      message = name + " is sleeping, he can't work. "
    }
  } else {
    life--
    money = money + 2
    message = name + ' is working very hard...'
  }
  displayStatus(life, money, awake) // M.A.J de l'état du monstre
  log(message) // Affichage de l'action
}

/**
 * eat() : fait manger le monstre s'il a assez de sous et ne dors pas. 
 * Lui fait gagner deux points de vie et perdre trois euros.
 */
let eat = () => {
  if (life === 0) {
    message = name + " is dead, he can't eat. "
  }
  else if (money < 3 || awake === false) {
    if (money < 3) {
      message = name + " bob doesn't have enough money, he can't buy food. "
    } else {
      message = name + " is sleeping, he's not a sleepwalker... "
    }
  } else {
    life = life + 2
    money = money - 3
    message = name + ' loves what he eats.'
  }
  displayStatus(life, money, awake) // M.A.J de l'état du monstre
  log(message) // Affichage de l'action
}

/**
 * sleep() : endort le monstre pendant 7 secondes, et le réveil.
 * Lui fait gagner un point de vie.
 * Fonctionne seulement si le monstre n'est pas mort et ne dort pas deja.
 */
let sleep = () => {
  if (life === 0) { // si le monstre est mort
    log(name + "'s dead, he's already sleeping forever...")
  }
  else if (awake === false) { // si le monstre dort deja
    log(name + "'s already sleeping.")
  } else {
    awake = false
    displayStatus(life, money, awake) // M.A.J de l'état du monstre
    log(name + ' fell asleep.')
    window.setTimeout(() => {
      awake = true
      life++
      displayStatus(life, money, awake) // M.A.J de l'état du monstre
      log(name + ' is waking up !')
    }, 7000)
  }
}

/**
 * hasard() : effectue une action au hasard
 */
let hasard = () => {
  let actions = [run, fight, work, sleep, eat] // tableau des actions 
  let random = Math.round(Math.random() * 4) // entier entre 0 et 4
  actions[random]()
}

/**
 * killMonster() : Tue le monstre en mettant ses attributs a 0 et son etat de sommeil a R.I.P
 */
let killMonster = () => {
  life = 0
  money = 0
  awake = 'R.I.P'
  log('Nooooo, ' + name + ' is dead !') // Affichage de l'action
  displayStatus(life, money, awake) // M.A.J de l'état du monstre
}

/**
 * newLife() : Ressucite le monstre avec les memes attributs qu'au début de Jeu.
 */
let newLife = () => {
  if (life === 0 && awake === 'R.I.P') {
    go()
    log(name + "'s come back to life.") // Affichage de l'action
  } else {
    log(name + ' is already alive.') // Affichage de l'action
  }
  displayStatus(life, money, awake) // M.A.J de l'état du monstre
}

/**
 * programme principal
 */
window.addEventListener('load', () => {
  go() // initialise un monstre
  // handlers pour les fonctions d'actions
  buttonRun.addEventListener('click', run)
  buttonFight.addEventListener('click', fight)
  buttonWork.addEventListener('click', work)
  buttonEat.addEventListener('click', eat)
  buttonSleep.addEventListener('click', sleep)
  buttonKill.addEventListener('click', killMonster)
  buttonLife.addEventListener('click', newLife)
  window.setInterval(() => { // verifie si la vie du monstre est nulle et s'il n'est pas deja mort, tue le monstre si c'est le cas.
    if (life === 0 && awake !== 'R.I.P') {
      killMonster()
    }
  }, 10)

  // active la fonction hasard toutes les 12 secondes
  window.setInterval(hasard, 12000)
})
