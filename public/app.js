let textPost = document.getElementById("text-post");
let uploadButton = document.getElementById("js-fb-data");
let postIndex = 0;
let typeInput = document.getElementById("type-input-js");
let schoolInput = document.getElementById("school-input-js");

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
      Type: typeInput.value,
      School: schoolInput.value,
      Date: new Date().toLocaleDateString(),
      Index: postIndex,
    });
  postIndex++;
  firebase.database().ref("PostIndex").set(postIndex);
  textPost.value = "";
  typeInput.value = "";
  schoolInput.value = "";
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
      let postType = document.createElement("p");
      let postSchool = document.createElement("p");
      let postDate = document.createElement("p");
      postType.textContent = `Type: ${snapshot.val().Type}`;
      postSchool.textContent = `School: ${snapshot.val().School}`;
      postDate.textContent = `Date of post: ${snapshot.val().Date}`;
      newPost.appendChild(document.createElement("br"));
      newPost.appendChild(postType);
      newPost.appendChild(postSchool);
      newPost.appendChild(postDate);
    });
  renderIndex++;
}

document.addEventListener("DOMContentLoaded", addPosts);
document.addEventListener("DOMContentLoaded", getPostIndex);
