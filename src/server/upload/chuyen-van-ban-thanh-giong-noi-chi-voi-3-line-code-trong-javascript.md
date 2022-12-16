## Đầu tiên đây là bài post đầu tay của mình :D :D
Vào ngày đẹp trời rảnh rỗi và hết task thì mình có lên đọc mấy bài post trên dev.to thấy phần này khá exciting nên muốn translate và share lại cho mn :D
À các bác có thời gian rảnh thì lên dev.to đọc nhá có nhiều bài viết bổ ích lắm.
Nếu các bác là người thích "mỳ ăn liền" thì có thể copy + paste 3 line code dưới đây và bật console lên run thử nhé :D :D
```cpp
var msg = new SpeechSynthesisUtterance();
msg.text = "Hello World";
window.speechSynthesis.speak(msg);
```
## Hãy cũng bắt đầu nào :point_up_2::point_up_2:
### Đầu tiên chúng ta cần kiểm tra xem browser của mình có hỗ trợ tổng hợp giọng nói hay không (speechSynthesis) bằng đoạn simple code dưới đây
```java
if ('speechSynthesis' in window) {
    alert("Nói đi đừng ngại");
} else {
    alert("So sad");
}
```
hoặc nhanh hơn chúng ta có thể F12 lên và làm như trong hình bên dưới
![](https://images.viblo.asia/3fb40635-0937-4e0c-9f64-daa7da31da99.png)
### Mình sẽ giải thích đơn giản về 3 line code đầu tiên:
* Line 1: Đầu tiên tạo 1 biến msg là instance của SpeechSynthesisUtterance()
* Line 2: Gán nội dung mà bạn muốn đọc
* Line 3: nhìn cũng hiểu r, mình khỏi giải thích :D
### Tiếp theo cùng mình khám phá xem các api hỗ trợ với đoạn code bên dưới
```cpp
var msg = new SpeechSynthesisUtterance();
msg.volume = 1; // âm lượng (1 - 10)
msg.rate = 1; // tốc độ nói (0.1 - 10) 
msg.pitch = 2; // độ cao (0 - 2) 
msg.lang = "en-GB"; // set ngôn ngữ
// ở đây mình chọn tiếng anh giọng nam
msg.text = "Hello world"; // nội dung
speechSynthesis.speak(msg); // có đủ rồi nói thôi
```
Link tham khảo các properties khác: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
### Các bác có thể xem các voices có hỗ trợ nhá, à không có Tiếng Việt các bác nhé, nếu có thì ... (thử nghĩ copy nguyên câu của a Huấn mà bỏ vào đây nói cũng thú vị phết)
```javascript
speechSynthesis.getVoices().forEach(function(voice) {
    console.log(voice.name, voice.default ? voice.default :'');
});
```
# Kết luận
Trên đây là bài viết đầu tay của mình, có gì sai xót thì xin cmt của các bác nhé mình luôn ready để được học hỏi nhiều hơn, còn nếu thấy hay cho mình xin upvote nhé.
Link bài viết trên dev.to (https://dev.to/asaoluelijah/text-to-speech-in-3-lines-of-javascript-b8h)