let textPost = document.getElementById("text-post");
let uploadButton = document.getElementById("js-fb-data");
let postIndex = 0;


function getPostIndex() {
  firebase
    .database()
    .ref("PostIndex")
    .on("value", (snapshot) => {
      postIndex = snapshot.val();
      console.log(snapshot.val());
    });
}


uploadButton.addEventListener("click", () => {
  firebase
    .database()
    .ref("posts/" + postIndex)
    .set({
      Post: textPost.value,
      Index: postIndex,
    });
  postIndex++;
  firebase.database().ref("PostIndex").set(postIndex);
  getPostIndex();
});

uploadButton.addEventListener("click", addPosts);

let renderIndex = 0;
let postArea = document.querySelector(".comments");
function addPosts() {
  let targetData = firebase.database().ref("posts").orderByKey();
  targetData.once("value").then((snapshot) => {
    snapshot.forEach(renderPosts);
  });
}


function renderPosts() {
  firebase
    .database()
    .ref("posts/" + renderIndex)
    .on("value", (snapshot) => {
      let newPost = document.createElement("div");
      newPost.setAttribute("class", "user-input");
      let newComment = document.createElement("p");
      newComment.textContent = snapshot.val().Post;
      postArea.appendChild(newPost);
      newPost.appendChild(newComment);
    });
  renderIndex++;
}


document.addEventListener("DOMContentLoaded", addPosts);
document.addEventListener("DOMContentLoaded", getPostIndex);
