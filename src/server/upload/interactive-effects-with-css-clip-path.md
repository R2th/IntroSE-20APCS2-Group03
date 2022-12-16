Ở bài viết này mình muốn chia sẻ với các bạn cách làm nổi trội lên 1 số chi tiết trong 1 bức ảnh sử dụng CSS clip path. Mình sẽ sử dụng bức ảnh sau đây để làm ví dụ. 
![](https://images.viblo.asia/42e2790d-c358-4a7c-8d4e-1d140a0fb3b2.jpg)
# Creating the SVG
Trước hết, chúng ta sẽ tạo một file SVG mới từ hình ảnh được dùng làm ví dụ của mình trước đó. Ở đây mình sẽ sử dụng [Inkscape](https://inkscape.org/), một trình chỉnh sửa ảnh sử dụng mã nguồn mở miễn phí, ngoài ra các bạn cũng có thể áp dụng các ứng dụng khác như Adobe Illustrator hoặc thậm chí là một phần mềm chỉnh sửa ảnh trực tuyến, như [Vectr](https://vectr.com/).

Sau khi convert thành file svg xong thì các bạn sẽ có những thông số tương tự dưới đây.

```map.svg
<svg … width="1024" height="640" viewBox="0 0 1024 640" …>
	...
</svg>
```

# Masking the Image File

Bây giờ đến phần công việc thực sự của việc cắt hình ảnh.

Khái niệm cắt ảnh này được gọi là *masking*. Nếu các bạn không quen với việc masking thì về cơ bản, là một kỹ thuật để loại bỏ nền khỏi một hình ảnh. Dưới đây là hình ảnh của trước và sau khi masking trên 1 đối tượng hình.

![](https://images.viblo.asia/ba863958-9f55-4526-b0f7-b49a5c5a72ff.jpg)

Bây giờ thử tạo nên các path bao bọc lấy những vùng dùng làm điểm nổi bật cho tấm bản đồ của chúng ta bằng Inkspace thôi nào. Nếu các bạn chưa biết tạo path như thế nào trong Inkspace thì có thể tham khảo thêm qua [**clip**](https://www.youtube.com/watch?v=3rPKPb_idAg) này nhé :D.

![](https://images.viblo.asia/730626ff-3353-4b9d-b16f-0f2d85e4fe37.png)

Thử kiểm tra xem đoạn code trong file SVG, các bạn sẽ thấy được có 1 thẻ **\<path>** được thêm vào. Phần quang trọng nhất trong thẻ này sẽ nằm trong thuộc tính **d**. Để hiểu hơn về thuộc tính này thì các bạn có thể tham khảo ở [**đây**](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d) nhé. Đây là kết quả tập hợp các điểm tạo nên path ở ví dụ trên hình vừa rồi mà mình mới vẽ:

```svg
<path
    ...
    d="m 856.338,427.26761 -14.42254,16.22535 -28.24413,1.80282 -49.87793,19.83099 -11.41784,-5.40845 -69.10798,22.23474 -7.8122,39.06103 46.87323,50.47887 75.71831,-22.83568 41.46479,40.26291 41.46479,13.8216 64.9014,-33.05165 -2.40375,-39.06103 -20.43193,-38.46009 -39.06103,-24.6385 -1.20188,-30.64788 z"
    ...
/>
```

# Converting SVG to CSS Clip Path

Tuy nhiên vì thuộc tính `clip-path: polygon(...)` trong CSS sẽ sử dụng phần trăm độ dài thay vì tọa độ chính xác của các điểm nên chúng ta cần phải làm thêm 1 việc là chuyển đổi các thông số có được trong thuộc tính **d** thành các giá trị theo tỉ lệ phần trăm. Để làm việc này dễ dàng thì mình sử dụng jQuery vì jQuery hỗ trợ cho chúng ta một số hàm để thao tác trực tiếp lên file SVG.

Do trong **d** sẽ chỉ có giá trị tọa độ x,y của điểm xuất phát, sau đó các cặp giá trị kế tiếp sẽ là giá trị thay đổi so với tọa độ trước đó, vì vậy đầu tiên là chuyển đổi dãy dài ngoằng trong **d** thành các cặp tọa độ x,y cho từng điểm.

```js
const path = $.find("path")[0];
const length = path.getTotalLength();

let point = path.getPointAtLength(0);
let polygonPath = point.x.toFixed(5) + "," + point.y.toFixed(5);
let nextPoint;

for (let i = 1; i < length; i++) {
  nextPoint = path.getPointAtLength(i);
  if (nextPoint.x != point.x && nextPoint.y != point.y) {
    point = nextPoint;
  } else {
    continue;
  }
  polygonPath =
    polygonPath + " " + point.x.toFixed(5) + "," + point.y.toFixed(5);
}
```

Sau khi đã có được vị trí tọa độ của các điểm tạo nên path thì phần việc kế tiếp của chúng ta chỉ là tìm phần trăm của tọa độ đó so với kích thước gốc của bức ảnh.

```js
const coordPairs = polygonPath
  .split(/[ \t\n]/)
  .map(s => s.trim())
  .filter(s => s.length > 0);

/* 
* Do kích thước hình của mình là 1024x640 nên sẽ có các viewBoxScaleX, viewBoxScaleY như dưới. 
* Tùy vào kích thước file ảnh mà các bạn chỉnh lại thông số này cho phù hợp nhé.
*/
const viewBoxScaleX = 10.24;
const viewBoxScaleY = 6.4;

const res = coordPairs
  .map(s => {
    let [x, y] = s.split(",");

    x = parseFloat(x) / viewBoxScaleX;
    y = parseFloat(y) / viewBoxScaleY;

    return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
  })
  .join(", ");

console.log(`clip-path: polygon(${res});`);
```

Cuối cùng chỉ còn việc ráp cái giá trị trên vào bức hình của mình nữa là xong rồi. Thêm 1 số CSS effect nữa là làm cho tấm bản đồ trở nên bắt mắt nhỉ :sunglasses:

{@embed: https://codepen.io/HuyNL/pen/BaaQmPv}