![](https://images.viblo.asia/e6d33051-2439-4c23-8d36-23ebc486af31.jpeg)

Việc sắp xếp vị trí các element của trang web không dễ dàng như mọi người thường nghĩ, mọi thứ có thể trở nên phức tạp hơn rất nhiều khi trang web của bạn có nhiều element khác nhau. Do đó, điều cần thiết là phải biết cách sử dụng CSS để sắp xếp vị trí các element, từ đó cũng sẽ tiết kiệm thời gian code của chúng ta hơn.

Có nhiều cách / phương pháp khác nhau để sắp xếp các element và dàn trang web. Sử dụng Bootstrap là một cách  rất tốt và nhanh gọn, tuy nhiên không phải tất cả các dự án đều sử dụng Bootstrap. Trong bài viết này, mình sẽ giải thích một trong những cách sắp xếp các element với CSS thuần: thuộc tính `position`. Ngoài ra chúng ta có thể dùng thuộc tính Display với các giá trị như flex, grid, inline-block ... Hôm nay mình sẽ chỉ nói về thuộc tính  `position` nhé !

# CSS Position & các thuộc tính Helper

Có 5 giá trị chính của `position`:

```
position: static | relative | absolute | fixed | sticky
```

và các thuộc tính có nhiệm vụ căn chỉnh vị trí của element (mình gọi chúng là các thuộc tính `Helper`):

```
top | right | bottom | left | z-index
```

> Note: các thuộc tính Helper không thể hoạt động nếu như không khai báo thuộc tính `position`, hoặc với `position: static`.

## z-index là gì?

Chúng ta có chiều cao (height) và chiều rộng (width) (x,y) là 2 chiều của element. Z chính là chiều thứ 3 của element. Một element hiện thị đè lên trên một element khác có nghĩa là giá trị `z-index` của nó đã được tăng. `z-index` cũng không hoạt động với `position: static` hoặc khi không có thuộc tính `position` 

![](https://images.viblo.asia/e058e977-6e29-4409-bc98-fa67bceaa851.png)

Element càng ở bên trên thì `z-index` của nó càng cao.

Bây giờ mình sẽ nói đến các giá trị của thuộc tính `position`

## 1. Static
`position: static` là giá trị mặc định của `position`. Dù chúng ta có khai báo chúng hay không thì các element sẽ được sắp xếp vị trí một cách như bình thường trên trang web.

Chúng ta có một đoạn HTML sau:

```html
<body>
   <div class="box-orange"></div>
   <div class="box-blue"></div>
</body>
```

Sau đó chúng ta tạo CSS và định nghĩa `position` cho chúng:

```css
.box-orange {          // Không khai báo position
  background: orange;
  height: 100px;
  width: 100px;       
}
.box-blue {
  background: lightskyblue;
  height: 100px;
  width: 100px; 
  position: static;   // Khai báo "static"
}
```

![](https://images.viblo.asia/3797bca1-4f1a-4bf5-a471-5b8ea6e9b734.png)
Chúng ta có thể thấy cùng một kết quả trong cả 2 trường hợp

## 2. Relative

`position: relative`: Vị trí mới của một element tương quan/ liên hệ tới vị trí mặc định của nó.

Với `position: relative` và các giá trị khác ngoài `static`, chúng ta có thể dễ dàng thay đổi vị trí của chúng. Nhưng chỉ khai báo `position: relative` thôi chưa đủ, chúng ta cần đến việc điều chỉnh vị trí của element bằng các thuộc tính `helper`.

Hãy di chuyển hình vuông màu cam sang bên cạnh hình vuông màu xanh nhé: 

```css
.box-orange {
  position: relative;  // chúng ta có thể di chuyển được element
  background: orange;
  width: 100px;
  height: 100px;
  top: 100px;         // dịch chuyển xuống 100px từ vị trí ban đầu của nó 
  left: 100px;        // dịch chuyển sang phải 100px
}
```

![](https://images.viblo.asia/54bde066-a10f-47c6-8a2b-fca09c0510f1.png)

Hình vuông màu cam đã được dịch 100px xuống phía dưới bên phải so  với vị trí bình thường của nó.

> Note: Sử dụng `position: relative` cho một element thì sẽ không ảnh hưởng tới vị trí của các element khác.

## 3. Absolute

Với `position: relative`, một element được dịch chuyển tới một vị trí mới dựa trên ví trí bình thường của chính nó. Tuy nhiên, `position: absolute` sẽ dịch chuyển vị trí của nó tương ứng với thẻ cha của nó. 

Một element được khai báo với thuộc tính `position: absolute` sẽ được loại bỏ khỏi luồng document (document flow). Vị trí mặc định của element sẽ là điểm bắt đầu (top-left) của element cha. Nếu nó không có bất cứ thẻ cha nào thì thẻ document <html> sẽ là cha của nó. 
    
Vì `position: absolute` đã được loại bỏ khỏi document flow, các element khác do element được định nghĩa `position: absolute` được coi là đã bị xóa khỏi trang web. 
    
Mình sẽ thêm 1 div `container` làm thẻ cha trong ví dụ sau:
    
```html
<body>
   <div class="container">
       <div class="box-orange"></div>
       <div class="box-blue"></div>
   </div>
</body>
```
    
Và thay đổi một chút về `position` của chúng:
    
```css
.box-orange {
  position: absolute;
  background: orange;
  width: 100px;
  height: 100px;
}
```
    
![](https://images.viblo.asia/ddb8d063-5eff-406d-8468-67fd2785f2b4.png)

`position: absolute` đưa element về vị trí top-left của cha nó.
    
 Dường như là hình vuông màu xanh đã bị biến mất. Nhưng sự thật là nó đã coi như hình vuông màu cam đã bị xóa, và nó bị đẩy lên vị trí ban đầu của hình vuông màu cam.
    
Để chứng minh cho điều này, mình sẽ dịch hình vuông cam đi 5px:
    
```css
.box-orange {
  position: absolute;
  background: orange;
  width: 100px;
  height: 100px;
  left: 5px;
  top: 5px;
}
```
![](https://images.viblo.asia/4260b223-2039-43e9-b91b-6f270fdafddf.png)

Bây giờ chúng ta đã nhìn thấy hình vuông xanh.
    
Vị trí của một element `absolute` sẽ tương quan với vị trí của cha nó nếu thẻ cha được khai báo `position` khác ngoài `static`

```css
.container {
  position: relative;
  background: lightgray;
}
.box-orange {
  position: absolute;
  background: orange;
  width: 100px;
  height: 100px;
  right: 5px;    // dịch 5px so với cạnh phải của thẻ cha
}
```

![](https://images.viblo.asia/c6305ce0-0503-47ad-91c9-86a400036dba.png)

## 4. Fixed

Giống như `position: absolute`, các element được khai báo với `position` này sẽ được loại bỏ khỏi  document flow. Chỉ khác là:
* Vị trí của chúng **CHỈ** tương quan với thẻ  `<html>`
* Chúng không bị ảnh hưởng bới scroll

 Ở ví dụ tiếp theo, mình sẽ thay đổi `position` của hình vuông cam thành `fixed`, và sẽ cách lề phải 5px so với thẻ `<html>`, không phải thẻ cha của nó (container).
    
{@embed: https://codepen.io/cem_eygi/pen/EebjaB}
    
Như chúng ta thấy, việc scroll trang web không hề thay đổi vị trí của element `fixed`. Nó được xác định vị trí so với cửa sổ trình duyệt. Và để xác định vị trí của nó thì các bạn cũng phải kết hợp với các thuộc tính top, right, bottom, left như 2 thuộc tính phía trên.

## 5. Sticky
`position: sticky` có thể hiểu đơn giản là sự kết hợp của `position: relative` và `position: fixed`.

Nó cũng na ná `fixed` nhưng mà khi các bạn scroll đến vị trí của nó sẽ giống hệt như `fixed` và khi các bạn scroll lên ra khỏi nó thì nó sẽ quay lại vị trí ban đầu dưới dạng `relative`. 

Nghe hơi khó hiểu phải không, cùng xem ví dụ nhé:
    
{@embed: https://codepen.io/cem_eygi/pen/EebjaB}
    
> Note: `position: sticky` không dùng được trên IE và một số version đầu của Edge nên mình không khuyến khích sử dụng nhé. 

![](https://images.viblo.asia/c4eca4d8-5d09-4ff7-988c-a64007f9b64a.png)

Cảm ơn các bạn đã bỏ thời gian để đọc bài viết của mình !

*Nguồn:* [How to use the position property in CSS to align elements](https://medium.freecodecamp.org/how-to-use-the-position-property-in-css-to-align-elements-d8f49c403a26)