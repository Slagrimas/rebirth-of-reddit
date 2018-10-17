//Request Function:
const request = (url, callback) => {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open("GET", url);
  oReq.send();
};

let randomClicked = false;
let myBoardsClicked = false;
let getTheAppClicked = false;
let url = null;
let postsClass = document.getElementsByClassName("posts");

//Initial population of page
populate("https://www.reddit.com/r/toyotatacoma.json");

//If a nav button is clicked, change the request url
document.getElementById("random").addEventListener("click", setRandomClicked);
function setRandomClicked() {
  console.log("random clicked");
  populate("https://www.reddit.com/r/nissangtr.json");
};

document.getElementById("myBoards").addEventListener("click", setMyBoardsClicked);
function setMyBoardsClicked() {
  console.log("myBoards clicked");
  populate("https://www.reddit.com/r/toyotatacoma.json");
  // console.log('OHMYGAWD', populate);
};

document.getElementById("getTheApp").addEventListener("click", setGetTheAppClicked);
function setGetTheAppClicked() {
  console.log("getTheApp clicked");
  populate("https://www.reddit.com/r/money.json");
};

//Function to populate the reddit page with posts
function populate(url) {
//extract data, then new function to the get data from url.
  let postsBodyElem = document.getElementById("postsBody");

  //Remove all the previous posts so the new url's posts can be populated
  for (let j = postsClass.length - 1; j >= 0; j--) {
    postsClass[j].remove();
    //postsBodyElem.removeChild(postsBodyElem.childNodes[j])
  }

  //Populate the page with posts
  request(url, res => {
    let myObj = JSON.parse(res.currentTarget.response);
  
    const breakDown = myObj.data.children;
    const scrubData = breakDown.map(cleanData);

    function cleanData (post) {
      const newPost = {};
    newPost.title = post.data.title;
      newPost.author = post.data.author;
      return newPost;
    }

    var cardsElems = scrubData.map(cardData => {
      //dom creation
      let postElem = document.createElement("div");
      postElem.className = "posts";
      let titleElem = document.createElement("div");
      titleElem.id = "title";
      let authorElem = document.createElement("div");
      authorElem.id = "author";
      let cardContainer = document.createElement('div');
      cardContainer.id = "CardC"

      
    })

    // console.log('keyy', scrubData);
    // var cardsElems = scrubData.map(cardData => {
    //   console.log('GGG', cardData);
    // });

    


    //   function buildCard (cardData) {
    //     console.log(cardData);
    //    const buildC = {}
    //    const buildsCards = cardData
    //    return buildsCards;
    //   }
    //  console.log('kabam', buildCard())
      //Get data
      // console.log("response: ", myObj);

      // let postTitle = myObj.data.children[i].data.title;

      // let username = myObj.data.children[i].data.author;

      // let postUps = myObj.data.children[i].data.ups;

      // let numComments = myObj.data.children[i].data.num_comments;

      // let mediaLink = myObj.data.children[i].data.url;

      // let domainStr = myObj.data.children[i].data.domain;

      // let thumbnailLink = myObj.data.children[i].data.thumbnail;

     //Put info into html file
    //  if (myObj.data.children[i].data.post_hint === "image") {
    //   let imageElem = document.createElement("img");
    //   if (domainStr === "i.redd.it") {
    //     imageElem.src = thumbnailLink;
    //     postElem.appendChild(imageElem);
    //   }
    //   else {
    //     imageElem.src = mediaLink;
    //     postElem.appendChild(imageElem);
    //   }
    // }
    // else if (myObj.data.children[i].data.post_hint === "link") {
    //   let imageElem = document.createElement("img");
    // }
  })
}