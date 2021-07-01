function getData() {
  firebase
    .database()
    .ref()
    .on("value", (snapshot) => {
      data = snapshot.val();
      console.log(data);
      return data;
    });
}

function setData(section, sentData) {
  firebase.database().ref(section).set(sentData);
}

