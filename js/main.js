
var play 
var theSelectedGoat
var winnerGoat
var elpop
var winsLosesCount = {win: 0, lose: 0}
var elKonfeti


var gGoats = [
    {id: 1, speed:5, distance: 5 },
    {id: 2, speed:5, distance: 5 },
    {id: 3, speed:5, distance: 5 },
    {id: 4, speed:5, distance: 5 },
    {id: 5, speed:5, distance: 5 },
    {id: 6, speed:5, distance: 5 },
]

function playGame() {
    newGame()
    var  input = document.querySelector('.tab input')
    theSelectedGoat = parseInt(input.value)
    if (theSelectedGoat > 0 && theSelectedGoat <= 6  && theSelectedGoat !== NaN) {
        play = setInterval(moveGoats,500)
        setTimeout(goatMove,500)
    } else {
        alert ('invalid gaot number')
    }
}

function moveGoats() {
    var elgoats = document.querySelectorAll('.goats')
    for (let i = 0; i < gGoats.length; i++) {
        var goat = gGoats[i]
        goat.speed =  getRandomInt(1, 30)
        goat.distance += goat.speed

        var elgoat = elgoats[i]
        elgoat.style.marginLeft =  goat.distance + 'px'

        elgoat.style.transition = 'margin-left 2s'
        if (goat.distance > 530) {
            return (
            console.log(`the winner ${goat.id}`),
            clearInterval(play),
            winnerGoat = goat.id,
            setTimeout(goatStand,700),
            setTimeout(() => isWinner(winnerGoat),1500))
        }
    }
}



function isWinner(goat) {
    elKonfeti = document.querySelector('.konfeti')
    elpop = document.querySelector('.pop-up')
    elpop.style.display = 'flex'
    if (goat === theSelectedGoat) {
        elKonfeti.style.display='block'
        elpop.innerHTML = '<p>You won!!</p> <button onclick="onClean()" style="display: block; z-index: 21;">Play again</button>'
        winLoseCount (true)
    } else {
        elpop.innerHTML = '<p>You lost</p> <button onclick="onClean()" style="display: block;">Play again</button>'
        winLoseCount (false)
    }
}

///////////////////////////////

function newGame() {
    var elgoats = document.querySelectorAll('.goats')
    for (let i = 0; i < gGoats.length; i++) {
        var goat = gGoats[i]
        goat.speed =  1
        goat.distance = 5

        var elgoat = elgoats[i]
        elgoat.style.marginLeft =  goat.distance + 'px'

        elgoat.style.transition = 'margin-left 0s'
    }
}

/////////////////////////

function goatMove() {
    var pic = document.querySelectorAll('.pic-goat')
    for (let i = 0; i < pic.length; i++) {
        pic[i].src ="img/runGoat.gif"
        
    }
}

///////////////////////////

function onClean() {
    elpop.style.display = 'none'
    var cleanInpit = document.querySelector('input')
    cleanInpit.value=''
    newGame()
    elKonfeti.style.display='none'
}

////////////////////////////

function goatStand() {
    var pic = document.querySelectorAll('.pic-goat')
    for (let i = 0; i < pic.length; i++) {
        pic[i].src ="img/standGoat.png"
    }
}
//////////////////////////

function winLoseCount (iswin){
    (iswin)? winsLosesCount.win +=1: winsLosesCount.lose +=1
    console.log(winsLosesCount);
    var counting = document.querySelector('.tab2')
    counting.innerHTML = ` <h2>wins: ${winsLosesCount.win} , losses: ${winsLosesCount.lose} </h2>`
}

//////////////////////////

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
