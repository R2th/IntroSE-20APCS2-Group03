## Giới thiệu 
Có thể bạn đã biết hay thậm chí sử dụng đến các Web APIs phổ biến như là Web Worker, Fetch, ... Nhưng có một số API khác cũng khá hữu ích nhưng ít được biết đến hơn. Trong bài viết này mình sẽ giới thiệu một vài API khá hữu ích trong số đó.

Bài viết được dịch 1 phần từ https://blog.bitsrc.io/10-useful-web-apis-for-2020-8e43905cbdc5

## 1. Web Audio API
API này giúp cho việc thao tác với các dữ liệu âm thanh trên web như thêm phát/tắt, thêm hiệu ứng, dựng các mô hình như các đường sóng âm được demo ở trang này https://mdn.github.io/webaudio-examples/audio-analyser/

Tham khảo: 
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
https://github.com/mdn/webaudio-examples

## 2. Fullscreen API

API này giúp bật / tắt chế độ fullscreen trên trang web. Nó cho phép chúng ta chọn element muốn hiển thị fullscreen

Ví dụ 
```js
document.addEventListener("keypress", function(e) {
  // fullscreen when hit Enter key
  if (e.keyCode === 13) {
    toggleFullScreen();
  }
}, false);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}
```

Tham khảo: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

## 3. Web Speech API

API này giúp chúng ta thêm và nhận diện giọng nói vào trang web 

Ví dụ 
```js
var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
  var color = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + color;
  bg.style.backgroundColor = color;
}
```
Tham khảo: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

## 4. Vibration API
API này giúp thiết bị của chúng ta rung lên để thông báo cho người dùng biết có thông báo mới đến

Ví dụ:
```js
if(navigator.vibrate) {
    function vibrate() {
        const time = vibTime.value
        if(time != "")
            navigator.vibrate(time)
    }
} else {
    error.innerHTML = "Vibrate API not supported in this device."
    error.classList.remove("close")        
}
```

Tham khảo: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API

## 5. PasswordCredential API
API này dùng để tạo những bộ username/password giúp cho việc ghi nhớ password vào browser. Thường được dùng kết hợp với `navigator.credentials`

Ví dụ:
```js
var cred = new PasswordCredential({
  id: id,
  password: password,
  name: name,
  iconURL: iconUrl
});

navigator.credentials.store(cred)
 .then(function() {
 // Do something else.
});
```

Tham khảo: https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential

## Tổng kết 
Bài viết mang tính chất giới thiệu sơ lượt một vài API để lỡ có sử dụng trong tương lai, hy vọng sẽ giúp ích được cho mọi người trong dự án sắp tới, chúc mọi người thành công :)