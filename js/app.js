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
  console.log('OHMYGAWD', populate);
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
  
    let childrenData = myObj.data.children[i].data
    // for (let i = 0; i < myObj.data.children.length; i++) {
    //   // look back at fun arrays. /1st
    //   //Create divs
    //   let postElem = document.createElement("div");
    //   postElem.className = "posts";
    //   let titleElem = document.createElement("div");
    //   titleElem.id = "title";
    //   let authorElem = document.createElement("div");
    //   authorElem.id = "author";

    //   //Get data from url //function 
    //   console.log("response: ", myObj);

    //   console.log("post title: ", myObj.data.children[i].data.title);
    //   let postTitle = myObj.data.children[i].data.title;

    //   console.log("post author: ", myObj.data.children[i].data.author);
    //   let username = myObj.data.children[i].data.author;

    //   console.log("post ups: ", myObj.data.children[i].data.upsCount);
    //   let postUps = myObj.data.children[i].data.ups;

    //   console.log("post comment count: ", myObj.data.children[i].data.num_comments);
    //   let numComments = myObj.data.children[i].data.num_comments;

    //   console.log("media link: ", myObj.data.children[i].data.url);
    //   let mediaLink = myObj.data.children[i].data.url;
    //   console.log("domain: ", mediaLink.slice(10, 14))
    //   let domainStr = myObj.data.children[i].data.domain;
    //   console.log("thumbnail: ", myObj.data.children[i].data.thumbnail)
    //   let thumbnailLink = myObj.data.children[i].data.thumbnail;

    //   //Put info into html file
    //   // if (myObj.data.children[i].data.post_hint === "image") {
    //   // }
    // }
  })
}