//アップロード
const up = document.getElementById("up");
up.addEventListener("click", () => {
  //ファイルの取得
  const file = document.getElementById("fileButton").files[0];
  //ファイルの参照
  var storageRef = firebase.storage().ref();
  //ファイルのメタデータ
  var metadata = {
    contentType: "image/*",
  };
  //画像ファイルのアップロード
  const uploadTask = storageRef.child("image/" + file.name).put(file, metadata);
  console.log(uploadTask);
  var flg = 0;
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
      if (progress === 100 && flg === 0) {
        console.log("100%です。");
        var display = document.querySelector(".disN");
        display.classList.replace("disN", "disB");
        flg = 1;
      }
    },
    function (error) {
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log(
            "目的の操作を行う権限がユーザーにありません。セキュリティ ルールが正しいことをご確認ください。"
          );
          break;
        case "storage/canceled":
          // User canceled the upload
          console.log("ユーザーがオペレーションをキャンセルしました。");
          break;
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          console.log("不明なエラーが発生しました。");
          break;
        default:
          console.log("error");
          break;
      }
    }
  );
});
//ダウンロード
const down = document.getElementById("down");
down.addEventListener("click", () => {
  //ファイルの取得
//   const file = document.getElementById("fileButton").files[0];
// const file = "IMG_7306.PNG";
const file = document.getElementById("sitei").value;
console.log(file)
  //ファイルの参照
  var storageRef = firebase.storage().ref();
  // const DownloadTask = storageRef.child("image/" + "IMG_7306.PNG");
  const DownloadTask = storageRef.child("image/" + file);
  //画像ファイルのダウンロード
  DownloadTask.getDownloadURL().then((downloadURL) => {
    document.getElementById("image").src = downloadURL;
  });
});

// 画像表示と同時にボタンが非表示になる
$("#down").on("click" , function(){
  $("#imgcontainer").css("display", "none");
 });
 
//  次のページへ
 $("#imgebtn").on("click" , function(){
  window.open("img3.html")
 })
