Sử dụng **offsetWidth** and **offsetHeight** trong **JavaScript** nói nom na là bạn có thể lấy được kích thước pixel của phần tử HTML. Kích thước được tính bằng cách sử dụng kích thước của nội dung bên trong phần tử HTML bao gôm cả **padding**, **borders**, **scrollbars** nhưng riêng thuộc tính **margin** thì lại không được  **offsetWidth** và **offsetHeight** tính toán :D :D


# Cách sử dụng offsetWidth và offsetHeight
Đơn giản lắm anh em ạ
```html
<div id="foo">
  Hello World
</div>
```

Đây là đoạn sử dụng Javascript để lấy giá trị:
```js
const offsetWidth = document.querySelector('#foo').offsetWidth;
const offsetHeight = document.querySelector('#foo').offsetHeight;
```


# Bài tập 

Dưới đây là 1 ví dụ nho nhỏ, hãy tính tính toán xem giá trị của **offsetWidth** và **offsetHeight** là bao nhiêu nhé:

![](https://images.viblo.asia/21875e3f-17ad-4f78-b6e9-ea22bdbe7d08.png)

Giả sử element trên là thẻ `div` có id là `foo` nhé

```js
fsetWidth = document.querySelector('div#foo').offsetWidth;
const offsetHeight = document.querySelector('div#foo').offsetHeight;
console.log(offsetWidth, offsetHeight);
// --> 255, 140
```


Nó được tính như thế nào? 

Chỉ cần thêm **border**, **padding**, **scrollbar** và nội dung bên trong phần tử HTML (bỏ qua `margin`!):

![](https://images.viblo.asia/f6980809-34b0-4c8e-993f-4d18e08388a2.png)

Thử một bài tập khác, hãy tính tính toán xem giá trị của **offsetWidth** và **offsetHeight** là bao nhiêu nhé:

![](https://images.viblo.asia/71badb2c-9c6a-4fe4-875c-a5a4a779ab3b.png)

Kết qủa bài tập này các bạn hãy trả lời bên dưới nhé: VD: `BT2: offsetWidth: xxx, offsetHeight: yyy`

Và đuơng nhiên sẽ có phần quà nho nhỏ cho những bạn trả lời đúng =))


# Một vài điều cần lưu ý

**Block-level:** **offsetWith** và **offsetHeight** không làm việc với những thẻ HTML inline như là `span`, `em`, `a` nó sẽ mặc định là `0px`

**Rounded Values:** Các giá trị được làm tròn đến số nguyên gần nhất. Nếu bạn cần các giá trị chính xác hơn, hãy sử dụng `getBoundingoffsetRect()`

**Read-Only:** Bạn có thể chỉ định một giá trị mới để thay đổi kích thước của phần tử HTML. Ví dụ `someElement.offsetWidth = 30`

#  Độ tuơng thích

**offsetWidth** and **offsetHeight** được hỗ trợ trên tất cả các trình duyệt máy tính để bàn và thiết bị di động.