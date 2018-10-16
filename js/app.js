let subRedArr = ["https://www.reddit.com/r/comics/.json?raw_json=1", "https://www.reddit.com/r/ramen/.json?raw_json=1", "https://www.reddit.com/r/OldSchoolCool/.json?raw_json=1"];

const mainContainer = document.getElementById('container')
rebirthReddit(); //Default page load

let subRedLink = document.getElementsByClassName("menu-items");
subRedLink[0].addEventListener("click", () => {rebirthReddit(subRedArr[0])});
subRedLink[1].addEventListener("click", () => {rebirthReddit(subRedArr[1])});
subRedLink[2].addEventListener("click", () => {rebirthReddit(subRedArr[2])});


function rebirthReddit(subRed) {

  let redObj = {} 
  let cardsNum = 0; 
  let reqRed = new XMLHttpRequest();
  reqRed.addEventListener("load", getSubReddit);

  if(subRed) {
    reqRed.open("GET", subRed);
  } else {
    reqRed.open("GET", "https://www.reddit.com/r/toyotatacoma/.json"); 
  }

  reqRed.send();

    function getSubReddit () {
      redObj = JSON.parse(this.responseText);
      console.log('proper', redObj);
      const title = document.createElement('div');
      redObj.data.children.forEach(element => {
        console.log('key', element.data.title);    
        title.innerHTML = element.data.title;
      });;
      mainContainer.append(title)
      makeCards(cardsNum);
    
    }

  // function makeCards (count) {
  //   let cardsParent = document.getElementById("cardParent");
  //   cardsParent.innerHTML = (cardsParent); // Wipes cards-parent clean

  //   for (let i = 0; i < count; i++) {
  //     let cards = document.createElement("div");
  //     cards.className = "cards";

  //   }
  // }
}