var pokemonDB = [{
    name: 'charmander',
    type: 'fire',
    hp: 39,
    attack: 52,
    defense: 43,
    level: 1,
    img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
  },
  {
    name: 'bulbasaur',
    type: 'grass',
    hp: 45,
    attack: 49,
    defense: 49,
    level: 1,
    img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
  },
  {
    name: 'squirtle',
    type: 'water',
    hp: 44,
    attack: 48,
    defense: 65,
    level: 1,
    img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
  }
];

var gameState = {
  userPokemon: '',
  rivalPokemon: ''
}
//gameState to keep track of what pokemon user/cpu selected
console.log(gameState)
//creating elements
var pokemonsEl = document
  .querySelector('.select-screen')
  .querySelectorAll('.character');
console.log(pokemonsEl);
var battleScreenEl = document.getElementById('battle-screen')
var attackBtnsEl = document.getElementById('battle-screen').querySelectorAll('.attack')


//##while loop for user to select a pokemon character###\\
i = 0;
while (i < pokemonsEl.length) {
  pokemonsEl[i].onclick = function() {
    var pokemonName = this.dataset.pokemon
    var player1Img = document.querySelector('.player1').getElementsByTagName('img')
		var player2Img = document.querySelector('.player2').getElementsByTagName('img')

    gameState.userPokemon = pokemonName

    cpuPick()
    battleScreenEl.classList.toggle('active')
    //##once cpu picks, screen switches to battle screen
//## created variables to pull imgs from pokemonDB
    gameState.currentPokemon = pokemonDB.filter(function(pokemon) {
      return pokemon.name == gameState.userPokemon
    })

    gameState.currentRivalPokemon = pokemonDB.filter(function(pokemon) {
      return pokemon.name == gameState.rivalPokemon
    })
//## created variables to pull imgs from pokemonDB
//##once user/cpu selects a pokemon, imgs will show on battle screen
    player1Img[0].src = gameState.currentPokemon[0].img
		player2Img[0].src = gameState.currentRivalPokemon[0].img
//##once user/cpu selects a pokemon, imgs will show on battle screen

//health for user and cpu
	gameState.currentPokemon[0].health = calculateHealth(gameState.currentPokemon)
	gameState.currentRivalPokemon[0].health = calculateHealth(gameState.currentRivalPokemon)

  }
  i++
}
var a = 0;
while (a < attackBtnsEl.length){
	attackBtnsEl[a].onclick = function(){
		var attackName = this.dataset.attack
		gameState.currentUserAttack = attackName

		play(attackName, cpuAttack())
	}
	a++
}
var cpuAttack = function(){
	var attacks = ['rock', 'paper', 'scissors']

	return attacks[randomNumber(0, 3)]
}

var calculateHealth = function(user){
	return ((0.2 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
}

var attackMove = function(attack, level, stack, critical, enemy){
var attackAmount = ((attack * level) * (stack + critical))
enemy.health = enemy.health - attackAmount

console.log('enemy.health after: ' + enemy.health)
}

var play = function(userAttack,cpuAttack){
	var currentPokemon = gameState.currentPokemon[0]
	var currentRivalPokemon = gameState.currentPokemon[0]
	switch(userAttack){
		case'rock':
			if(cpuAttack == 'paper'){
				attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon)
				console.log('paper wins')
			}
			if(cpuAttack == 'scissors'){
				console.log('rock wins')
			}
			if(cpuAttack == 'rock'){
				console.log('draw')
			}
		break;
		case 'paper':
		break;
		case 'scissors':
		break;
	}
}
// ###functions to have cpu randomly select a pokemon###
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function cpuPick() {
  gameState.rivalPokemon = pokemonsEl[randomNumber(0, 3)].dataset.pokemon
}

// ###functions to have cpu randomly select a pokemon###


// pokemon
// create data for 3 different pokemons, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)

//
// var attack = 20;
// var level = 10;
// var stack = 1.3;
// var stamina = 39;

// create a formula for attacks
// console.log((attack * level * stack) / 7);

// create a formula for health
//HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
// console.log(0.2 * Math.sqrt(level) * stamina * 15);

// let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
// p1 vs p2

// when one user loses all his health declare a winner
