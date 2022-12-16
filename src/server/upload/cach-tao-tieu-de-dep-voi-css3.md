## Giới thiệu
 Bạn có muốn tạo các tiêu đề lạ mắt mà không cần sử dụng hình ảnh đã được xử lý qua Photoshop không? Đây là một mẹo CSS đơn giản để chỉ cho bạn cách tạo hiệu ứng text gradient, và tiêu đề hỉnh ảnh (CSS thuần túy, không có Javascript hoặc Flash). 
##  Cách sử dụng
 Điều quan trọng nhất là sử dụng thuộc tính -webkit-background-clip và -webkit-text-fill-color: trong đó `-webkit-text-fill-color: text`  là thuộc tính CSS chỉ định màu tô của các ký tự của văn bản. Nếu thuộc tính này không được đặt, giá trị của thuộc tính `color` được sử dụng. Ngoài ra `-webkit-background-clip: transparent` thuộc tính này sẽ có hiệu ứng hình ảnh khi đường viền có các vùng trong suốt hoặc các vùng mờ một phần
 
**Để tạo text gradient, bạn làm theo ví dụ dưới đây:**

* Đầu tiên bạn cần tạo thẻ tiêu đề HTML

    `<h1>Gradient text</h1>`
    
* Tiếp theo bạn CSS theo đoạn code bên dướidưới

    ```
    h1 {
      display: inline-block;
      font: bold 4.5em/1.5 Bebas, sans-serif;
      color: #5CA17C; /*non-webkit fallback*/
      font-size: 72px;
      text-transform: uppercase;
       background-image: linear-gradient(to bottom, #26BDA6, #FF9F65, #DED37E, #26BDA6);
      background-size: auto 250%;
      transition: background-position 0.5s;
        -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 200px;
      background-position: 0 100%;
    }
    h1:hover {
      background-position: 0 0;
      cursor: pointer;
    }
    ```
    
* Kết quả 
{@embed: https://codepen.io/TrinhThang/pen/QYLNbo}

**Tiêu đề hình ảnh**
- Ngoài ra bạn có thể thay thế `background`  ` linear-gradient`  bằng hình ảnh, hoặc ảnh động bất kì sẽ tạo ra hiện ứng khá là thú vi.

    **HTML :**
    
    `<div class="clip-text clip-text_one">ThangTV</div>`
    
    **CSS :**
    ```
    body {
      text-align: center;
      background-color: #1d1d22;
    }
    .text {
      font-size: 6em;
      font-weight: bold;
      line-height: 1;
      position: relative;
      display: inline-block;
      margin: .25em;
      padding: .5em .75em;
      text-align: center;
      color: #fff;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image:   url(https://png.pngtree.com/thumb_back/fw800/back_pic/04/52/05/84585f8530e8274.jpg);
    }
    .clip-text:before {
      content: "";
      z-index: -2;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: inherit;
      position: absolute;
    }
    .clip-text:after {
      content: "";
      position: absolute;
      z-index: -1;
      top: .125em;
      right: .125em;
      bottom: .125em;
      left: .125em;
      background-color: #fff;
     }
    .clip-textGif {
      background-image:   url( https://media.giphy.com/media/JzqRWjBTKZXSE/giphy.gif);
      text-transform: uppercase;
      font-style: italic
    }
    ```
    {@embed: https://codepen.io/TrinhThang/pen/KJPzWO}
    
    **Chúc các bạn thành công**