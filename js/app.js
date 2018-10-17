//Request Function:
const request = (url, callback) => {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open("GET", url);
  oReq.send();
};
//the container that holds everything set html to empty string
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
  populate("https://www.reddit.com/r/nissangtr/.json");
};

document.getElementById("getTheApp").addEventListener("click", setGetTheAppClicked);
function setGetTheAppClicked() {
  console.log("getTheApp clicked");
  populate("https://www.reddit.com/r/fortnite.json");
};

//Function to populate the reddit page with posts
function populate(url) {

  let postsBodyElem = document.getElementById("postsBody");

  const postBody = document.querySelector('#postsBody');
  //Populate the page with posts
  request(url, res => {
    let myObj = JSON.parse(res.currentTarget.response);

    const breakDown = myObj.data.children;
    const scrubData = breakDown.map(cleanData);

    function buildCard(cardData) {
      let postElem = document.createElement("div");
      postElem.id = "posts";
      postElem.innerHTML = "";

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
      thumbnailElem.src = cardData.thumbnail

      let dateElem = document.createElement("div");
      dateElem.id = "dateElem"
      dateElem.innerHTML = "10/17/18"

      postElem.appendChild(titleElem);
      titleElem.appendChild(authorElem);
      authorElem.appendChild(selftextElem)
      selftextElem.appendChild(dateElem)
      dateElem.appendChild(thumbnailElem)

      return postElem;
    }

    var cardsElems = document.createElement('div');
    scrubData.forEach(cardData => {

      const cardBuild = buildCard(cardData);

      cardsElems.appendChild(cardBuild);
    })

    postsBody.innerHTML = "";
    postsBody.appendChild(cardsElems);

  })
}

function cleanData(post) {
  const newPost = {};
  newPost.title = post.data.title;
  newPost.author = post.data.author;
  newPost.selftext = post.data.selftext;
  newPost.date = post.data.date;
  newPost.thumbnail = post.data.thumbnail;
  return newPost;
}
