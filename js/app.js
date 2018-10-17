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
  populate("https://www.reddit.com/r/subaru.json");
};

document.getElementById("myBoards").addEventListener("click", setMyBoardsClicked);
function setMyBoardsClicked() {
  console.log("myBoards clicked");
  populate("https://www.reddit.com/r/nissangtrr35.json");
};

document.getElementById("getTheApp").addEventListener("click", setGetTheAppClicked);
function setGetTheAppClicked() {
  console.log("getTheApp clicked");
  populate("https://www.reddit.com/r/fortnite.json");
};

//Function to populate the reddit page with posts
function populate(url) {

  let postsBodyElem = document.getElementById("postsBody");

  //Remove all the previous posts so the new url's posts can be populated
  for (let j = postsClass.length - 1; j >= 0; j--) {
    postsClass[j].remove();
    //postsBodyElem.removeChild(postsBodyElem.childNodes[j])
  }
  const postBody = document.querySelector('#postsBody');
  //Populate the page with posts
  request(url, res => {
    let myObj = JSON.parse(res.currentTarget.response);

    const breakDown = myObj.data.children;
    const scrubData = breakDown.map(cleanData);

    function cleanData (post) {
      const newPost = {};
    newPost.title = post.data.title;
      newPost.author = post.data.author;
      newPost.selftext = post.data.selftext;
      newPost.date = post.data.date;
      newPost.thumbnail = post.data.thumbnail;
      return newPost;
    }

    var cardsElems = scrubData.map(cardData => {
      console.log('LOLOLOL', cardData)
      //dom creation
      let postElem = document.createElement("div");
      console.log(cardData.title);
      postElem.id = "posts";
      postElem.innerHTML = " ";

      let titleElem = document.createElement("div");
      titleElem.id = "title";
      titleElem.innerHTML = cardData.title

      let authorElem = document.createElement("div");
      authorElem.id = "author";
      authorElem.innerHTML = cardData.author

      let selftextElem = document.createElement("div");
      selftextElem.id = "selftext"
     selftextElem.innerHTML = cardData.selftext

     let thumbnailElem = document.createElement("img")
     thumbnailElem.id = "thumbNail"
    //  thumbnailElem.innerHTML = cardData.data.thumbnail;
     thumbnailElem.src = cardData.thumbnail
    //  console.log("yeahUHUH", cardData.thumbnail);

     let dateElem = document.createElement("div");
     dateElem.id = "dateElem"
     dateElem.innerHTML = "10/17/18" 

      postElem.appendChild(titleElem);
      titleElem.appendChild(authorElem);
      authorElem.appendChild(selftextElem)
      selftextElem.appendChild(dateElem)
      dateElem.appendChild(thumbnailElem)
      // const postBody = document.querySelector('postsBody');
      postsBody.appendChild(postElem);
      
    })
    console.log('UHUHUH', cardsElems);
  })
}
