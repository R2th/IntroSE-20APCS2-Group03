![](https://images.viblo.asia/563ae911-1ec2-4883-96d7-c1467f9f895f.png)
HTML là bài học vỡ lòng đầu tiên của các dev nhưng hầu hết chúng ta không học và sử dụng hết các tag sẵn có mà chỉ dùng những tag phổ biến mà thôi. Bài viết này sẽ chia sẻ về một số tag rất tiện ích nhưng lại rất ít khi được sử dụng được ví như những đứa con rơi của HTML.

Ghé thăm [phần 1](https://viblo.asia/p/nhung-dua-con-roi-cua-html-phan-1-QpmlexWkZrd), [phần 2](https://viblo.asia/p/nhung-dua-con-roi-cua-html-phan-2-djeZ1n9mlWz) và cùng tìm hiểu tiếp trong phần 3 nào! Let's go!!!

## 15. `<audio>`
Tag `<audio>` được dùng để tạo một "trình phát nhạc" cho trang web và cậu ấy hỗ trợ mp3, wav và ogg. Thường dùng kèm với tag <source> để hiện thị được nhiều nội dung hơn.
    
Tag `<audio>` có sáu thuộc tính cơ bản như sau:
* src: Xác định đường dẫn đến tập tin âm thanh mà bạn muốn phát.
* controls: Xác định việc "trình phát nhạc sẽ được hiển thị trên màn hình".   
* autoplay: Thiết lập hành động "sau khi trang web được tải xong, trình phát nhạc sẽ tự động chơi bản nhạc". 
* loop: Thiết lập hành động "bản nhạc sẽ tự động được phát lặp lại sau mỗi lần kết thúc".    
* muted: Xác định việc trình phát nhạc sẽ mặc định được thiết lập ở chế độ "tắt tiếng".  
* preload	: Xác định việc tập tin âm thanh có được tải cùng với lúc tải trang hay không.
    
Ví dụ:
```html
<audio controls>
  <source src="music.mp4" type="audio/mp4">
  <source src="mucis.ogg" type="audio/ogg">
</audio>
```
Do các trình duyệt hỗ trợ định dạng file audio khác nhau, nên cách dùng trên có thể chạy video cho nhiều trình duyệt và hệ điều hành khác nhau. 

Để đề phòng trường hợp trình duyệt không hỗ trợ định dạng tập tin âm thanh của bạn, bạn có thể "sơ cua" thêm một vài tập tin âm thanh khác bằng những thẻ <source> khác (nếu định dạng tập tin video thứ nhất không được hỗ trợ thì nó sẽ chuyển sang sử dụng tập tin video thứ hai, ....).
## 16. `<video>`
Nếu tag `<audio>` được dùng để tạo một "trình phát nhạc" thì tag `<video>` được dùng để tạo một "trình xem phim" cho trang web. Hai tag này cũng hơi giống nhau về cách dùng như anh em họ vậy.
    
Tag`<video>` hỗ trợ cho mp4, web, ogg và cũng được sử dụng kết hợp với thẻ <source> để xác định tập tin video mà bạn muốn phát.
    
 Tag này có các thuộc tính như sau:
* src: Xác định đường dẫn đến tập tin video mà bạn muốn phát (có thể được xác định bằng đường dẫn tương đối hoặc đường dẫn tuyệt đối).
* controls: Xác định việc "thanh điều khiển của trình xem phim sẽ được hiển thị".
* autoplay:	Thiết lập hành động "sau khi trang web được tải xong, trình xem phim sẽ tự động phát video".
* loop:	Thiết lập hành động "video sẽ tự động được phát lặp lại sau mỗi lần kết thúc".
* muted: Xác định việc trình xem phim sẽ mặc định được thiết lập ở chế độ "tắt tiếng".
* preload: Xác định việc tập tin video có được tải cùng với lúc tải trang hay không.
* poster: Xác định một tập tin hình ảnh dùng để làm ảnh đại diện cho video trước khi phát.
* width: Xác định chiều rộng của trình xem phim.
* height: Xác định chiều cao của trình xem phim.
Ví dụ:
```html
<video width="960" height="540" controls>
  <source src="video.mp4" type="video/mp4">
  <source src="video.ogg" type="video/ogg">
</video>
```
Cũng giống như tag <audio> thì để đề phòng trường hợp trình duyệt không hỗ trợ định dạng tập tin video của bạn, bạn có thể "sơ cua" thêm một vài tập tin video khác bằng những thẻ <source> khác.

##  17. `<figure>`
Tag `<figure>` bạn cứ nghĩ đơn giản là chỉ có thể được sử dụng cho hình ảnh như cái tên của nó phải không? Nhưng trong thực tế, chàng trai này có thể được dùng để nhóm bất kỳ thứ gì lại nhau với nhau hình ảnh, video, âm thanh hay các đoạn code đấy.

Đây là khi bạn sử dụng cho hình ảnh và có một phần chú thích.
```html
<figure>
  <img src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9" alt="Person using lack laptop computer on brown wooden table" style="width:100%">
  <figcaption>Person using lack laptop computer on brown wooden table</figcaption>
</figure>
```
Tag `<figure>` thường dùng kèm với `<figcaption>` để chỉ một chú thích. Và cũng có thể sử dụng nhiều img để hiển thị các hình ảnh cùng nhau.
    
Dưới là ví dụ với trường hợp bạn chứa một đoạn code sẽ như thế này:
```html
 <figure>
    <p><code>tag html</code></p>
    <figcaption>HTML Tags useless</figcaption>
</figure>
```
    
> Lưu ý: Tag <figure> được hỗ trợ trong đa số các trình duyệt, tuy nhiên các trình duyệt IE6, IE7, IE8 muốn hiển thị đúng thì cần phải có thêm css và javascript hỗ trợ.
    
## 18. `<progress>`
Tag `<progress>` mô tả một tiến trình đầu đủ của một công việc - task, thường được dùng để hiển thị việc download hay load thời gian.
Có các thuộc tính sau:
* max: Xác định tổng khối lượng công việc.
* value: Xác định khối lượng công việc đã hoàn thành.
```html
<progress value="57" max="100">
</progress>
```
## 19. `<datalist>`
Tag `<datalist>` định nghĩa một danh sách tùy chọn. Tương tử như  `<select>` - `<option>`, tag này sử dụng cùng với các thành phần input nhằm xác định giá trị các thành phần `<input />` có thể có.
 
Ví dụ: 
```html
<input type="text" list="days" placeholder="Choose a Day">
<datalist id="days">
  <option value="Monday"></option>
  <option value="Tuesday"></option>
  <option value="Wednesday"></option>
  <option value="Thursday"></option>
  <option value="Friday"></option>
  <option value="Saturday"></option>
  <option value="Sunday"></option>
</datalist>
```
Tag `<datalist>` có thể dùng với:
* <input type="text" />
* <input type="url" />
* <input type="tel" />
* <input type="color" />
* Data và Time (bao gồm tháng vv.), khoảng giá trị...
## 20.` <bdo>`
Tag `<bdo>` thường được dùng để ghi đè hướng văn bản hiện tại, cụ thể là cho phép bạn chỉ định hướng văn bản từ trái sang phải hay từ phải sang trái. Bạn có thể sử dụng trong các văn bản hiện thị ngôn ngữ của nhiều quốc gia.
 
Các thuộc tính đi kèm theo anh chàng này là:
* “dir=rtl” : kí tự sẽ đảo ngược từ hướng phải sang trái.
* “dir=ltr” : đảo ngược kí tự từ hướng trái sang phải.
    
Ví dụ:
```html
<p><bdo dir="ltl">Văn bản từ trái sang phải</bdo></p>
<p><bdo dir="rtl">Văn bản từ phải sang trái</bdo></p>
```
Tag `<bdo>` được hỗ trợ trong hầu hết các trình duyệt, ngoại trừ trình duyệt safari 2 trở xuống.
## 21. `<mark>`
Tag `<mark>` dùng để đánh dấu màu nền , sử dụng khi muốn làm nổi bật (highlight) văn bản của mình. Và cách dùng của nó chỉ đơn giản như mục đích của nó vậy nhưng lại khá lợi hại trong CEO đấy.
```html
<p>HTML can do <mark> MAGIC </mark>.</p>
 ```
### Tổng kết
Trên là một số trong các tag ít khi được sử dụng mà tôi biết. Qua bài chia sẻ, tôi hi vọng sẽ truyền cảm hứng cho bạn để có những ý tưởng mới và tìm thấy một số trường hợp sử dụng cho các tag này. Các bạn có thể tham khảo các tài liệu sau:
* https://www.w3schools.com/tags/
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element
    
Cảm ơn bạn đã dành thời gian đọc bài viết!