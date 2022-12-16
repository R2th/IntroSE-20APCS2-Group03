## Giới thiệu:
- Flexbox là một giải pháp của CSS3 sinh ra để thay thế cho float. Giúp chúng ta dễ dàng thiết kế giao diện website hơn.
- Flexbox là một cách để thiết lập bố cục cho trang web của bạn. Về cơ bản, nó phục vụ cho việc tạo nên một trang web responsive, tức là nó sẽ tự cân đối kích thước của các phần tử bên trong để phù hợp cho việc hiển thị trên mọi thiết bị.

## Các trình duyệt hỗ trợ flexbox

- Chrome 29+ Firefox 28+ Internet Explorer 11+ Opera 17+ Safari 6.1+ (sử dụng tiền tố -webkit-) Android 4.4+ iOS 7.1+ (sử dụng tiền tố -webkit-)

## Thiết lập phần tử chứa - kích hoạt flex
- Để sử dụng tính năng flexbox cần sử dụng theo mô hình cần có một phần tử chính thiết lập là phần tử chứa, sau đó là các phần tử con bên trong nó. Để kích hoạt phần tử chứa có tính năng flexbox chỉ cần thiết lập cho nó thuộc tính display: flex; hoặc display: inline-flex;
```
    <div class="container__flex">
        <div class="flexitem">1</div>
        <div class="flexitem">2</div>
    </div>
```
```
    .container__flex{
       display: flex;
    }
```
xem demo tại đây: 
{@embed: https://codepen.io/Trihn/pen/eYRYPpw}
- Hoặc bạn muốn nó hiển thị như một phần tử inline.
```
<div class="container__flex">
    <div class="flexitem">1</div>
    <div class="flexitem">2</div>
</div>
<div class="container__flex">
    <div class="flexitem">3</div>
    <div class="flexitem">4</div>
</div>
<div class="container__flex">
    <div class="flexitem">5</div>
    <div class="flexitem">6</div>
</div>
```
```
    .container__flex{
       display: inline-flex;
    }
```
xem demo tại đây: 
{@embed: https://codepen.io/Trihn/pen/oNwNaMw}
**Chú ý:** Bạn chỉ cần đặt thuộc tính trên vào khung lớn là các thẻ con sẽ lập tức trở thành các mục linh hoạt

**Khi phần tử đã kích hoạt flexbox thì điều khiển các phần tử con bằng các thuộc tính:** ```flex-direction``` ```flex-wrap``` ```justify-content``` ```align-items``` ```align-content```

### 1. Thuộc tính flex-direction

Khi kích hoạt flex cho một phần tử, thì các phần tử con chứa trong nó sẽ được bố trí liên tục theo một hướng được gọi là hướng chính. Hướng chính được thiết lập bằng thuộc tính flex-direction - khi đã có hướng chính thì hướng thứ hai sử dụng đến là hướng vuông góc với hướng chính (từ sau gọi là hướng vuông góc), flex-direction nó nhận các giá trị:

- `row (mặc định):` Hướng chính nằm ngang, phần tử sắp xếp từ trái qua phải
- `row-reverse:` Hướng chính nằm ngang, phần tử sắp xếp từ phải qua trái
- `column:` Hướng chính thẳng đứng, phần tử xếp từ trên xuống
- `column-reverse:` Hướng chính thẳng đứng, phần tử xếp từ dưới lên

xem demo tại đây:
{@embed: https://codepen.io/Trihn/pen/gOROEEO}

### 2. Thuộc tính flex-wrap
- `nowrap (mặc định):` Các phần tử cứ xếp theo hướng chính, kể cả vượt ngoài khung container
- `wrap:` Các phần tử xếp theo hướng chính, nếu vượt qua kích thước khung chứa theo hướng chính sẽ ngắt tạo ra luồng xếp tiếp theo (hàng tiếp theo hoặc cột tiếp theo tùy thuộc đang là hướng chính nào).
- `wrap-reverse:` Tương tự wrap nhưng hàng (cột) bố trí ngược lại

xem demo tại đây:
{@embed: https://codepen.io/Trihn/pen/dyRyrxr}

### 3. Thuộc tính justify-content:

căn chỉnh các mục theo chiều ngang

- `flex-start (mặc định):` đẩy các mục con về vị trí đầu thành phần chứa
- `flex-end:` đẩy các mục con về vị trí cuối thành phần chứa
- `center:` các mục con nằm ở trung tâm thành phần chứa
-  `space-between:` khoảng cách các thành phần con bằng nhau (phần tử đầu và cuối sát mép khung)
- `space-around:` khoảng cách giữa các thành phần con bằng nhau (khoảng cách của phần tử đầu và cuối phía mép khung bằng 1 nữa koảng cách thành phần ở giữa)
- `space-evenly:` khoảng cách các thành phần con bằng nhau (kể cả koảng cách phần mép trái và phải) 

xem demo tại đây:
{@embed: https://codepen.io/Trihn/pen/YzQzMpK}
### 4. Thuộc tính align-items

Căn chỉnh các mục theo chiều dọc

+ `stretch:` mặc định, các thành phần con sẽ được kéo căng cho vừa với thành phần chứa
+ `flex-start:` các mục đặt ở vị trí đầu của thành phần chứa
+ `flex-end:` các mục đặt ở vị trí cuối của thành phần chứa.
+ `center:` các mục đặt ở trung tâm của thành phần chứa 
+ `baseline:` các phần tử con bám theo đường baseline của hàng (cột)

xem demo tại đây:
{@embed: https://codepen.io/Trihn/pen/MWoWRQX}
### 5. Thuộc tính align-content

- Nó điều chỉnh vị trí các hàng (các cột) trong khung, nó nhận các giá trị như stretch, center, flex-end ...

- Chỉ có hiệu lực khi có nhiều hàng hoặc nhiều cột

# Thiết lập các phần tử con
Tính năng liên quan đến `flex` ngoài thiết lập với các thuộc tính từ phần tử chứa (cha - container), còn có thể thiết lập trực tiếp đến từng phần tử con, xem xét các thuộc tính:
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

**Các ví dụ ở phần sau sẽ sử dụng đến CSS như sau:**

### 1. Thuộc tính flex-grow
`flex-grow` gán các giá trị bằng số, nó cho biết phần tử này chiếm bao nhiêu phần trong không gian còn lại (trừ đi phần đã chiếm bởi các phần tử có flex-grow bằng 0) khung chứa theo hướng chính.
```
<div class="exam-container">
    <div class="exam-element flex-grow-ele1">1</div>
    <div class="exam-element flex-grow-ele2">2</div>
    <div class="exam-element flex-grow-ele3">3</div>
</div>
```
```
.exam-container {
    display: flex;
    background: #ab7bb0;
    padding: 4px;
}

.exam-element {
    background-color: orangered;
    margin: 1px;
    color: white;
    min-height: 40px;
    justify-content:center;
    display: flex;
    align-items: center;
}

.flex-grow-ele1{
    flex-grow: 1;
}

.flex-grow-ele2{
    flex-grow: 2;
}

.flex-grow-ele3{
    flex-grow: 3;
}
```
xem demo tại đây:
{@embed: https://codepen.io/Trihn/pen/BaZaEPZ}
### 2. Thuộc tính flex-shrink

`flex-shrink` nhận giá trị là số, cho biết phần tử có thể co lại bao nhiêu phần khi cần thiết

### 3.Thuộc tính flex-basis

Thuộc tính gán chiều dài khởi tạo cho phần tử trong hệ thống flex, ví dụ flex-basis:100px

### 4.Thuộc tính flex

Thuộc tính này là cách viết tổng hợp cả ba thuộc tính flex-grow, flex-shrink, flex-basic trên một dòng

Ví dụ: `flex: 1 0 100px;`

### 5.Thuộc tính align-self

Căn chỉnh một phần tử trong hệ thống flex, align-self nhận các giá trị: stretch, flex-end, center, flex-start

Cũng lưu ý có thể kết hợp với các thuộc tính margin để điều chỉnh vị trí.

Các bạn có thể xem chi tiết hơn tại đây : https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties 

link tham khảo : https://css-tricks.com/snippets/css/a-guide-to-flexbox/