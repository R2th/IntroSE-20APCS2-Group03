# SPOILER ALERT!!!
> __Nếu bạn chưa xem [AVENGERS 4: ENDGAME](https://www.youtube.com/watch?v=XMfuHzeiYW8) thì bạn nên cân nhắc trước khi đọc bài viết này, vì nội dung bài viết sẽ có spoil về nội dung phim. Còn nếu bạn đã từng xem rồi thì hôm nay một lần nữa mình xin được tái hiện lại kết quả của trận chiến trong Hồi Kết vừa ra mắt ngày 26 tháng 4 vừa qua bằng... javascript__ :sunglasses: 

Trước ngày ra mắt ENDGAME không lâu, mình phát hiện Google có bí mật làm một chức năng hết sức thú vị, mô phỏng lại hiệu ứng "búng tay" (finger snap) của Thanos như trong Infinity War và xoá sổ 50% số kết quả tìm thấy. 

{@embed: https://www.youtube.com/watch?v=ybNtKpROwes}

Mình thấy khá thú vị với trò đó của Google, vậy là cũng thử tìm tòi xem làm 1 cái tương tự. Nhưng lần này, Thanos đã là chuyện cũ rồi, nếu ai đã xem phần 4 rồi đều biết, cuối phim Iron-Man sẽ là người búng tay, cái búng tay không chỉ thổi bay Thanos cùng quân đoàn của hắn mà còn lấy đi cả mạng sống của Tony :cry: 

Đây là demo của mình 
__LIVE DEMO__: https://trandaison.github.io/

![](https://images.viblo.asia/b9601cd1-512b-4b17-b2b8-e84490f2099c.gif)
# Concept
Nếu inspect code của Google ra xem bạn sẽ dễ dàng nhận thấy Google chuyển đổi các HTML element sang Canvas, tạo ra nhiều lớp canvas chồng lên nhau, cách lớp canvas này sẽ chứa 1 vài phần nhỏ của hình gốc, sau đó kết hợp giữa hiệu ứng xoay (rorate) và transform vị trí cho đến khi chúng bị mờ đi đến mức 0.

![](https://images.viblo.asia/89dff29c-49d6-4f00-a63e-4f16d9390222.jpg)

Vậy chúng ta cũng sẽ làm với ý tưởng tương tự.

# Step 1: Convert HTML Element sang Canvas
Hên là đã có một thư viện hơn 16k sao cho phép làm điều này [__html2canvas__](https://github.com/niklasvh/html2canvas). Bây giờ chỉ cần dựng HTML lên để có được không gian của bãi chiến trường. Trong End Game Tony mang bộ mark 85 bạn nhớ tìm hình cho giống nhé LOL =))

Còn đây là the battle field của mình 
![](https://images.viblo.asia/61fca7f8-6a88-4cc0-aa4b-0c5c9f07904b.png)

Với `html2canvas` bạn chỉ cần pass element cần chuyển vào trong hàm, hàm sẽ return về một promise với đối số là canvas được tạo.

```js
html2canvas($(".content")[0]).then(canvas => {
    //capture all div data as image
    ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixelArr = imageData.data;
});
```

__NOTE:__ Bạn lưu ý element truyền vào phải là HTML element khác thẻ `img` nhé.

# Step 2: Tạo ra các lớp canvas
Sau bước một chúng ta đã có một mảng các pixel của hình ảnh. Việc còn lại chỉ đơn giản là phân số lượng pixel đó vào vài canvas khác nhau là xong.

Tuy nhiên để cho đẹp và hiệu ứng trông sẽ thật hơn nếu bạn làm nó "bay màu" từ đầu xuống chân, hoặc từ chân lên đầu, thay vì tan biến 1 cách ngẫu nhiên ko có tôn ti trật tự.

Nghĩa là chúng ta không thể chỉ đơn giản quất hàm `Math.random` được. Cần phải đánh trọng số cho việc phân tán các điểm ảnh.

Về cơ bản thì chúng ta sẽ tăng xác suất xuất hiện các điểm ảnh nằm ở phần đầu vào các canvases nằm trên. Tăng xác suất xuất hiện của các điểm ảnh ở phần thân vào các canvases nằm giữa, và tương tự cho phần chân.

Đồ thị biểu diễn nó đại khái như này
![](https://images.viblo.asia/4c89b475-2460-4246-99fd-a2360e8e761f.jpg)

![](https://images.viblo.asia/79fc8bab-582c-427f-bed2-59184dcfd7a7.jpg)

Để làm được điều này thì cũng đã có 1 thư viện hỗ trợ - [chance.js](https://chancejs.com/). Bạn xem thêm docs của nó nếu có hứng thú nhé, docs cũng dài với nhiều phết đấy.

Đây là hàm trả về mảng các điểm ảnh sau khi đã đánh trọng số.
```js
function weightedRandomDistrib(peak) {
  var prob = [], seq = [];
  for(let i=0;i<canvasCount;i++) {
    prob.push(Math.pow(canvasCount-Math.abs(peak-i),3));
    seq.push(i);
  }
  return chance.weighted(seq, prob);
}
```

Tiếp theo là tạo ra các lớp canvas cho Thanos từ mảng trên rồi append vào document (nhớ là chồng lên cái ảnh gốc để ko bị lộ, `position: absolute;` các thứ vào nhé)

```js
//put pixel info to imageDataArray (Weighted Distributed)
for (let i = 0; i < pixelArr.length; i+=4) {
  //find the highest probability canvas the pixel should be in
  let p = Math.floor((i/pixelArr.length) *canvasCount);
  let a = imageDataArray[weightedRandomDistrib(p)];
  a[i] = pixelArr[i];
  a[i+1] = pixelArr[i+1];
  a[i+2] = pixelArr[i+2];
  a[i+3] = pixelArr[i+3]; 
}

//create canvas for each imageData and append to target element
for (let i = 0; i < canvasCount; i++) {
  let c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
  c.classList.add("dust");
  $(".wrapper").append(c);
}
```

Đây là các lớp canvas theo thứ tự sau khi được tạo ra
![](https://images.viblo.asia/0987aee4-d540-4661-a219-dbeaeb1a9545.png)

# Step 3: Animation
Bước này chỉ cần thêm tí animation cho nó chuyển động các lớp canvas hạt bụi trên kia, như kiểu đang hấp hối bay màu =))

Lúc này bạn cần ẩn thằng ảnh gốc đi nhé. 
```js
//clear all children except the canvas
$(".content").children().not(".dust").fadeOut(3500);
```

Sau đó lặp từng cái canvas, lần lượt thêm vào 3 animations: 
- Blur: Có blur vào mới tạo ra được sự mượt mà khi chuyển động, để chuyển động ko bị "cứng".
- Transform: Transform cả vị trí lẫn xoay ảnh, để đẩy các điểm ảnh ra xa dần.
- Fade out: Cho điểm ảnh mờ dần đến 0.

```js
//apply animation
$(".dust").each( function(index){
  animateBlur($(this),0.8,800);
  setTimeout(() => {
    animateTransform($(this),100,-100,chance.integer({ min: -15, max: 15 }),800+(110*index));
  }, 70*index); 
  //remove the canvas from DOM tree when faded
  $(this).delay(70*index).fadeOut((110*index)+800,"easeInQuint",()=> {$( this ).remove();});
});
```
jQuery không hỗ trợ hiệ ứng blur, check phần final code mình đính kèm nếu bạn có hứng thú nhé.

Nhớ rằng class `dust` là lớp ảnh chứa các điểm ảnh dùng cho bay màu, phải đặt chồng lên nhau nhé.
```css
.dust {
  position: absolute;
}
```

# Lời kết
Final source code mình đặt ở đây, mình thực hiện trên VueJS, nên nếu bạn có ý định chạy thử thì vào fork repo này về
https://github.com/trandaison/fingerSnap
- Chạy `yarn install` để cài các package.
- Chạy `yarn serve` để chạy server node và vào `localhost:8080` để xem.

Một số điểm mong các bạn lưu ý nếu có đọc qua source code.
- Một số code đã được thay đổi cho phù hợp với cái demo của mình =))
- Code js và css mình cũng làm vội cho có chứ đang lởm lắm, các bạn đừng để bụng.

---
Tham khảo từ tutorial tại: https://www.youtube.com/watch?v=fM791m4A_Pk