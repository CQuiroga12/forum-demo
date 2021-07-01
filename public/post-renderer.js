function renderPosts(postData) {
  console.log(postData);
  let postArea = document.querySelector(".comments");
  for (let post in postData) {
    let newPost = document.createElement("div");
    newPost.setAttribute("class", "user-input");
    let newComment = document.createElement("p");
    newComment.textContent = post.Text;
    postArea.appendChild(newPost);
    newPost.appendChild(newComment);
  }
}

