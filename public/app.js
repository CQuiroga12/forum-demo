let textPost = document.getElementById("text-post");
let uploadButton = document.getElementById("js-fb-data");
let postIndex = 0;

//Sets postIndex so that data is not overwritten
function getPostIndex() {
  firebase
    .database()
    .ref("PostIndex")
    .on("value", (snapshot) => {
      postIndex = snapshot.val();
      console.log(snapshot.val());
    });
}

//Adds event listener to upload button
//Sets the text for the post along with its index under the post index position
uploadButton.addEventListener("click", () => {
  firebase
    .database()
    .ref("posts/" + postIndex)
    .set({
      Text: textPost.value,
      Index: postIndex,
    });
  postIndex++;
  firebase.database().ref("PostIndex").set(postIndex);
  getPostIndex();
});

uploadButton.addEventListener("click", addPosts);

let renderIndex = 0;
let postArea = document.querySelector(".comments");

//Calls render post for each key in the database
function addPosts() {
  let targetData = firebase.database().ref("posts").orderByKey();
  targetData.once("value").then((snapshot) => {
    snapshot.forEach(renderPosts);
  });
}

//
function renderPosts() {
  firebase
    .database()
    .ref("posts/" + renderIndex)
    .on("value", (snapshot) => {
      let newPost = document.createElement("div");
      newPost.setAttribute("class", "posts");
      newPost.textContent = snapshot.val().Text;
      postArea.appendChild(newPost);
    });
  renderIndex++;
}

document.addEventListener("DOMContentLoaded", addPosts);
document.addEventListener("DOMContentLoaded", getPostIndex);
