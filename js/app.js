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

    console.log('keyy', scrubData);
    var cardsElems = scrubData.map(cardData => {
      console.log('carrdddsss', cardData); //pretty much newPost
      //createCard(cardData) 
    });
    function createCard (cardData) {
      //dom creation
      const cardsDisplay = document.createElement('div'); 
      
    }
    //append cardsElems here
    // let postElem = document.createElement("div");
    // postElem.className = "posts";
    // let titleElem = document.createElement("div");
    // titleElem.id = "title";
    // let authorElem = document.createElement("div");
    // authorElem.id = "author";
     
    //   //Get data from url //function 
    //   console.log("response: ", myObj);

    //   // console.log("post title: ", myObj.data.children[i].data.title);
    //   let postTitle =breakDown[i].data.title;
     
    //   // console.log("post author: ", myObj.data.children[i].data.author);
    //   let username = breakDown[i].data.author;
    
    //   // console.log("post ups: ", myObj.data.children[i].data.upsCount);
    //   let postUps = breakDown[i].data.ups;

    //   // console.log("post comment count: ", myObj.data.children[i].data.num_comments);
    //   let numComments = breakDown[i].data.num_comments;

    //   // console.log("media link: ", myObj.data.children[i].data.url);
    //   let mediaLink = breakDown[i].data.url;
    //   // console.log("domain: ", mediaLink.slice(10, 14))
    //   let domainStr = breakDown[i].data.domain;
    //   // console.log("thumbnail: ", myObj.data.children[i].data.thumbnail)
    //   let thumbnailLink = breakDown.data.thumbnail;

    //   //Put info into html file
    //   if (breakDown[i].data.post_hint === "image") {
    //     let imageElem = document.createElement("img");
    //     if (domainStr === "i.redd.it") {
    //       imageElem.src = thumbnailLink;
    //       postElem.appendChild(imageElem);
    //     }
    //     else {
    //       imageElem.src = mediaLink;
    //       postElem.appendChild(imageElem);
    //     }
    //   }
    //   else if (breakDown[i].data.post_hint === "link") {
    //     let imageElem = document.createElement("img");
      
    //    //If this is a gif and it has a 'v' at the end of the link, remove the v for the gif to load properly on the page
    //    if (mediaLink[mediaLink.length - 1] === "v") {
    //     let gifLink = mediaLink.slice(0, length - 1);
    //     console.log("gifLink: ", gifLink);
    //     imageElem.src = gifLink;
    //     postElem.appendChild(imageElem);
    //   }
    //   else {
    //     imageElem.src = thumbnailLink;
    //     postElem.appendChild(imageElem);
    //   }
    // }
  })
}