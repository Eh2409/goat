'use strict'

var play 
var theSelectedGoat
var winnerGoat
var elpop
var winsLosesCount = {win: 0, lose: 0}
var elKonfeti
var gameInProgress= false 
var isPlayAgain = false
var elPosition

var gGoats = [
    {id: 1, speed:5, distance: 5 },
    {id: 2, speed:5, distance: 5 },
    {id: 3, speed:5, distance: 5 },
    {id: 4, speed:5, distance: 5 },
    {id: 5, speed:5, distance: 5 },
    {id: 6, speed:5, distance: 5 },
]

function init() {
    if (!gameInProgress) {
        playGame()
        isPlayAgain = false
    } else {
        var  input = document.querySelector('.tab input')
        input.value = ''
        input.placeholder = 'game is still running'
        // alert ('A game is already in progress. Please wait until it finishes.')
    }
}

function playGame() {
    onClean(isPlayAgain)
    var  input = document.querySelector('.tab input')
    theSelectedGoat = parseInt(input.value)
    if (theSelectedGoat > 0 && theSelectedGoat <= 6  && !isNaN(theSelectedGoat)) {
        gameInProgress= true
        input.placeholder = 'Choose a goat'
        play = setInterval(moveGoats,500)
        setTimeout(goatMove,500)
    } else {
        // alert ('invalid gaot number')
        input.value = ''
        input.placeholder = 'invalid gaot number'
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
            setTimeout(() => isWinner(winnerGoat),1500)),
            setTimeout(racePosition,1000)
        }
    }
}



function isWinner(goat) {
    elKonfeti = document.querySelector('.konfeti')
    elpop = document.querySelector('.pop-up')
    elpop.style.display = 'flex'
    if (goat === theSelectedGoat) {
        elKonfeti.style.display='block'
        elpop.innerHTML = '<p>You won!!</p> <button onclick="onClean(true)" style="display: block; z-index: 21;">Play again</button>'
        winLoseCount (true)
    } else {
        elpop.innerHTML = '<p>You lost</p> <button onclick="onClean(true)" style="display: block;">Play again</button>'
        winLoseCount (false)
    }
    gameInProgress= false
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

function onClean(isPlayAgain) {
    if (elpop !== undefined)elpop.style.display = 'none'
    if (elPosition !== undefined) elPosition.style.display ='none'
    if (isPlayAgain) {
    var eleanInpit = document.querySelector('input')
    eleanInpit.value=''
    eleanInpit.placeholder='Choose a goat'
    }
    newGame()
    if (elKonfeti !== undefined) elKonfeti.style.display='none'
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

////////////////////////////

function racePosition() {
   var res =  goatRating()
   var newHtml =`<p class="p1"><span>1st:</span> goat${res[0].id}</p>
   <p class="p2"><span>2st:</span> goat${res[1].id}</p>
   <p class="p3"><span>3st:</span> goat${res[2].id}</p>
   <p class="p4"><span>4st:</span> goat${res[3].id}</p>
   <p class="p5"><span>5st:</span> goat${res[4].id}</p>
   <p class="p6"><span>6st:</span> goat${res[5].id}</p>`
elPosition = document.querySelector('.position')
elPosition.innerHTML = newHtml
colorPlayerGoat(res)
elPosition.style.display = 'flex'
}

function colorPlayerGoat(res) {
    for (let i = 0; i < res.length; i++) {
        if (theSelectedGoat === res[i].id) {
            var elColor = document.querySelector(`.p${i+1}`)
            elColor.style.color = 'red'
            break
        } 
    }
}


function goatRating() {
    var newArryGoat = gGoats.slice(0)
    var res = []
    for (let i = 0; i < gGoats.length; i++) {
        var maxGoat = newArryGoat[0]
        for (let j = 0; j < newArryGoat.length; j++) {
            var currGoat = newArryGoat[j]
            if (currGoat.distance > maxGoat.distance) {
                maxGoat = currGoat
            }     
        }
        var goatIdx = newArryGoat.indexOf(maxGoat,0)
        res.push(newArryGoat[goatIdx])
        newArryGoat.splice(goatIdx,1)
    }
    return res
}

//////////////////////////

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
