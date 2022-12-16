Karaoke là một hình thức giải trí rất thông dụng. Sau những giờ làm việc mệt mỏi hay khi gặp stress, chúng ta thường tifm đến những ca khúc karaoke để thư giãn sau giờ làm việc vất vả.

Hôm nay mình sẽ cùng các bạn tự tạo ra một tool hát karaoke đơn giản chỉ bằng HTML và Javascript mà không cần phải ra quán nhé. Nào. Không dài dòng nữa. Bắt đầu thôi.
# 1. Ý tưởng
Để có thể hát karaoke thì bắt buộc phải có 2 phần chính là bài hát và lời bài hát.

Mục đính chính của chúng ta là sẽ upload 1 file mp3 lên, và handlefile để thẻ `<audio>` của HTML5  có thể load nó.

Còn xử lý lời bài hát mới quan trọng. File lời bài hát sẽ **phải** có định dạng như sau:
![](https://images.viblo.asia/321f0fe8-acc5-4c86-b570-8f8006baf01d.png)

File lời 2 bài này sẽ đc xử lỹ thành 2 phần với 2 mục đích khác nhau. Một là xử lý đống text đó để hiển thị ra màn hình bằng 1 hàm custom có tên là simple_format, nghe giống hàm trong rails nhỉ. Nhưng hàm này sẽ tự define trong file js của chúng ta nhé. Còn phần thứ 2 là chúng ta sẽ xử lý đống lời bài hát kia thành các mảng lồng nhau. Trong đó mỗi dòng cũng là 1 mảng có 2 mảng con, 1 mảng cho timing để so sánh với current_time của bài hát, còn lại là lời bài hát.

Và để cho từng câu chạy theo đúng nhạc thì chúng ta phải lấy ra được current time của bài hát khi đang play. Và so sánh với time running của lời bài hát.
    
   #  2. Demo
   Ý tưởng có vẻ dài dòng và lan man nhỉ, chi bằng demo luôn cho dễ hiểu nhé các bạn.
   
   Mình có quay 1 đoạn video demo cho các bạn đây (xin lỗi vì phần mềm quay video trên ubuntu của mình k ghi được âm thanh):
   {@embed: https://www.youtube.com/watch?v=gQTTQCTz7qc&feature=youtu.be}
   
   Xem demo mà không có âm thanh thì cũng khó chịu nhỉ, chi bằng các bạn demo trực tiếp sản phẩm luôn có phải ngon hơn không:
  
Các bạn có thể **demo** sản phẩm ở [Đây](https://phamduc8797.github.io/)

Bạn có thể tải nhạc và lời bài hát mà mình đã chuẩn bị sẵn để demo luôn: [Lời bài hát](https://github.com/phamduc8797/Karaoke/blob/master/public/lyrics/nguoiamphu.lrc) và [Bài hát](https://github.com/phamduc8797/Karaoke/blob/master/public/media/NguoiAmPhu-MaiQuangNam-5430437.mp3)

Để lấy được file lời bài hát theo đúng format trên một cách nhanh nhất, các bạn hãy xem phần **READ ME** ở phần **demo** nhé.
# 3. Một số hàm xử lý chính
Vì phần code js khá dài (độ 270 dòng) lên mình sẽ không đưa hết lên đây cho các bạn xem được. Vì vậy nên mình sẽ show cho các bạn xem một số hàm xử lý chính để các bạn hiểu được cơ bản cách các hoạt động nhé.

Bạn có thể tham khảo source code đầy đủ ở [đây](https://github.com/phamduc8797/Karaoke) nhé.

## 3.1. Handle File mp3
Sau khi bấm vào upload file mp3 thì thẻ `<audio>` của HTML5 sẽ tự động load bài hát (xem demo)
```javascript
document.getElementById('fileSong').addEventListener("change", handleFiles, false);
```
```javascript
function handleFiles(event) {
	var files = event.target.files;
    $("#srcSong").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audioSong").load();
    document.getElementById("activeStartPause").innerHTML = '<span onclick="playSong();" class="activeAction">Start</span>';
}
```
## 3.2 Xử lý lời bài hát
Sau khi upload nốt file lời bài hát là bấm play thì lời hài hát sẽ được fill ra màn hình (xem demo):
```javascript
function loadFileAsText(){
  var fileToLoad = document.getElementById("fileLyric").files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent){
    var textFromFileLoaded = fileLoadedEvent.target.result;
    var showLyricHtml = parseShowLyrics(textFromFileLoaded);    
    var addStyleLyric = new Array();
    var linesongid = 1;
    showLyricHtml.forEach(result => {
      result = "<span class='lineRunLyric' id='linesongid"+ linesongid +"'>" +result[0] + "</span>" + "<br />";
      linesongid++;
      addStyleLyric.push(result);
    })
    addStyleLyric = "<p>" + addStyleLyric + "</p>";
    addStyleLyric = addStyleLyric.replaceAll("</span><br />,<span", "</span><br /><span");
    document.getElementById("inputTextToSave").innerHTML = addStyleLyric;

    //Run Lyric
    runLyric(textFromFileLoaded);
  };
  fileReader.readAsText(fileToLoad, "UTF-8");  
}
```
Function `simple_format` mình đã nhắc đến ở trên:
```javascript
function simpleFormat(str) {
  str = str.replace(/\r\n?/, "\n");
  str = $.trim(str);
  if (str.length > 0) {
    str = str.replace(/\n\n+/g, '</p><p>');
    str = str.replace(/\n/g, '<br />');
    str = '<p>' + str + '</p>';
  }
  return str;
}
```
## 3.3 Xử lý Current Time của bài hát
Xử lý current_time của bài hát giống với định dạng của phần timing của lời bài hát:
```javascript
function formatCurrentTime(time) {
  var hr  = Math.floor(time / 3600);
  var minutes = Math.floor((time - (hr * 3600))/60);
  var seconds = Math.floor(time - (hr * 3600) - (minutes * 60));
  var ms = Math.floor(time * 1000);

  if (minutes < 10) {
    minutes = "0" + minutes; 
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (ms < 10) { // 0
    ms = "0" + ms;
  }
  if (10 <= ms < 100) { //00
    var convMsToString = ms.toString().slice(0);
    ms = "0" + convMsToString;
  }
  if (100 <= ms < 1000) { //000
    var convMsToString = ms.toString().slice(-3, -1);
    ms = convMsToString;
  }
  return "[" + minutes + ':' + seconds + '.' + ms + "]";
}
```
## 3.4 Xử lý chữ chạy theo bài hát
Đây là phần quan trọng nhất. Mình đã lược bỏ một số đoạn code trước khi show đoạn code dưới đây vì nó khá dài. Các bạn có thể xem code đầy đủ mà mình đã đưa ra ở trên.
```javascript
function runLyric(str) {
  // clearInterval(intervalObj);
  var myAudio = document.getElementById("audioSong");
  var playSongButton = document.getElementById("activeStartPause");
  var fileSong = document.getElementById("fileSong");
  var fileLyric = document.getElementById("fileLyric");
  
  var intervalObj = setInterval(function(){
    var getCurrentTime = formatCurrentTime(myAudio.currentTime);
    var getDuration = formatCurrentTime(myAudio.duration);
    var showTiming = parseTiming(getCurrentTime);
    var showDuration = parseTiming(getDuration);
    var timeLyric = parseLyrics(str);
    document.getElementById("showCurrentTimeSong").innerHTML = showTiming+" / "+showDuration;

    if (myAudio.currentTime == 0) {
      for (var index = 1; index <= timeLyric.length; index++) {
        var lineLyric = document.getElementById("linesongid"+index);
        lineLyric.style.color = "black";
      }
    }

    var linesongidBE = 1;
    timeLyric.forEach(result => {
      switch (result[0]) {
        case getCurrentTime:
          var lineLyricChange;
          var totalLyric = parseLyrics(str).length;

          for (let index = 1; index < linesongidBE; index++) {
            lineLyricChange = document.getElementById("linesongid"+index);
            lineLyricChange.style.color = "#8d6e63";
          }
          for (let index = (linesongidBE+1); index <= totalLyric; index++) {
            lineLyricChange = document.getElementById("linesongid"+index);
            lineLyricChange.style.color = "black";
          }

          var lineLyricStart = document.getElementById("linesongid"+linesongidBE);
          var lineLyricPass = document.getElementById("linesongid"+(linesongidBE -1))
          lineLyricStart.style.color = "blue";
          if (lineLyricPass) {
            lineLyricPass.style.color = "#8d6e63";
          }
          // window.scrollBy(0, 10);
          break;
      };
      linesongidBE++;
    });
  }, 5, 1)
}
```
# 4. End
Trên đây mình đã giới thiệu cho các bạn 1 tool khá vui để có thể nghịch những lúc rảnh rỗi.

Nếu thấy hay, hãy upvote, share để được đẹp trai và xinh gái hơn.