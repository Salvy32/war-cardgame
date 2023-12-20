//Build card game war

let deckId = "data.deck_id";

fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    deckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

document.querySelector("button").addEventListener("click", drawTwo);

function drawTwo() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  fetch(url)
    .then((res) => res.json()) //parse as JSON
    .then((data) => {
      console.log(data);
      document.querySelector("#player1").src = data.cards[0].image;
      document.querySelector("#player2").src = data.cards[1].image;
      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);
      if (player1Val > player2Val) {
        document.querySelector("h3").innerText = "Player 1 wins";
      } else if (player1Val < player2Val) {
        document.querySelector("h3").innerText = "Player 2 wins";
      } else {
        document.querySelector("h3").innerText = "WAR";
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function convertToNum(val) {
  if (val === "ACE") {
    return 14;
  } else if (val === "KING") {
    return 13;
  } else if (val === "QUEEN") {
    return 12;
  } else if (val === "JACK") {
    return 11;
  } else {
    return Number(val);
  }
}

//On page load the first fetch runs and gets me a deck of cards. We store the data.deck_Id in a global variable. THEN next whenever we click our button it can use the Id that we put into const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2` to draw two cards from our deck

//document.querySelector("#player1").src = data.cards[0].image; WE got the data back then it had a property of cards cards is an array so we grabbed the first thing in the array [0] then grab the image property. We did 0 then a 1 for each card it will draw for each player

//Made the second function to try and fix the issue with the cards with letters in the deck. We also wrapped      let player1Val = convertToNum(data.cards[0].value);                                                  let player2Val = convertToNum(data.cards[1].value);      with the function convertToNum so example if we get ACE in the conditional it return 14 and stores it into the let player1Val = convertToNum(data.cards[0].value); making it as if it was 14.

//return Number(val) want to make sure it comes back as a number
