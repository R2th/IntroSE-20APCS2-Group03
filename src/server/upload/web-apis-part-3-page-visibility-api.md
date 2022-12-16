Xin chào mọi người. Sau một thời gian tạm dừng series Web APIs để tìm hiểu mấy thứ linh tinh khác thì hôm này mình đã trở lại rồi đây. Và bài viết hôm nay của mình sẽ giới thiệu qua về Page Visibility API, một thứ mà chúng ta ít quan tâm đến. Vậy nó là gì, chúng ta hãy cùng xem nhé. Go Go!

## Intro
[Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) cung cấp một vài sự kiện giúp để theo dõi xem khi nào thì `document` (cửa sổ hiện tại) là `visible` hay `hidden`. 

Page Visibility API giúp ích trong việc tiết kiệm tài nguyên và cải thiện hiệu suất bằng cách tránh cho trang web thực hiện các task không cần thiết khi `document` ở trạng thái `hidden` (khi người dùng chuyển tab, minimize trình duyệt). Chúng ta cũng có thể sử dụng nó để đếm thời gian truy cập chẳng hạn.

## Brower support
API được hỗ trợ hầu hết ở các trình duyệt (bao gồm cả IE10 và IE11:heart_eyes:)
![](https://images.viblo.asia/d197677e-69b3-41a3-9415-d997d45cee81.PNG)

## Demo
http://daniemon.com/tech/webapps/page-visibility/

Ở ví dụ này, video sẽ dừng lại khi bạn chuyển sang tab khác và bật lại khi bạn trở lại tab đó, nó được xử lý ở đoạn code sau
```js
// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
 
var videoElement = document.getElementById("videoElement");

// If the page is hidden, pause the video;
// if the page is shown, play the video
function handleVisibilityChange() {
  if (document[hidden]) {
    videoElement.pause();
  } else {
    videoElement.play();
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  // Handle page visibility change   
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
    
  // When the video pauses, set the title.
  // This shows the paused
  videoElement.addEventListener("pause", function(){
    document.title = 'Paused';
  }, false);
    
  // When the video plays, set the title.
  videoElement.addEventListener("play", function(){
    document.title = 'Playing'; 
  }, false);

}
```
## Kết luận
Bài viết hôm nay ngắn vậy thôi. Hy vọng sẽ giúp ích được cho mọi người ở dự án nào đó sắp tới. Chúc mọi người thành công :wink:
## Tham khảo
https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API