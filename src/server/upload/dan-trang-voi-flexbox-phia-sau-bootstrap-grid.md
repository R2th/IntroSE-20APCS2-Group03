Trước kia khi mà việc dàn website tương đối đơn giản và không quan tâm tới responsive design chúng ta thường sử dụng thuộc tính float trong css. Tuy nhiên, giao diện (UI) và trải nghiệm (UX) người dùng ngày càng được chú trọng và đòi hỏi nhiều hơn, tức là ngoài việc bạn dàn trang với một bố cục chi tiết, nội dung rõ ràng ở màn hình máy tính thì website phải tương thích với màn hình mobile nữa (Reponsive). Với việc sử dụng float việc css cho từng màn hình (lúc pc, lúc mobile) vẫn có thể được nhưng như vậy bạn sẽ rất 'kì công' để css theo từng màn hình @@. Thay vì dùng float, từ CSS3 flexbox đã ra đời để giúp bạn làm việc đó một cách đơn giản hơn.

![](https://images.viblo.asia/91bc1879-73a7-40f9-899e-9e3448ee770f.png)

# Flexbox là gì?
Flexbox có tên chính thức là CSS Flexible Box Layout Module là module mới trong CSS3, một kiểu dàn trang (layout mode) mà nó sẽ tự cân đối kích thước của các phần tử bên trong để hiển thị trên mọi thiết bị. Tức là bạn không cần thiết lập kích thước của phần tử, không cần cho nó float, chỉ cần thiết lập nó hiển thị chiều ngang hay chiều dọc, lúc đó các phần tử bên trong có thể hiển thị theo ý muốn.

# Cấu trúc flexbox
Trước khi bắt đầu tìm hiểu chi tiết sức mạnh của flexbox, ta cùng xem qua cấu trúc của một flexbox và giải thích một vài thành phần cần chú ý nhé.

![](https://images.viblo.asia/647ab7c2-e2c6-43bf-98a2-a8913c112b42.jpg)

**flex-container**: là thành phần lớn bao quanh các phần tử bên trong, ta sẽ thiết lập kiểu hiển thị inline (sắp xếp theo chiều ngang) hoặc kiểu sắp xếp theo chiều dọc. Khi đó, các item bên trong sẽ hiển thị dựa trên thiết lập của container này.

**flex-item**: Các phần tử nằm trong flex-container được gọi là item, bạn có thể thiết lập item sẽ sử dụng bao nhiêu cột trong một flex-container, hoặc thiết lập thứ tự hiển thị của nó.

**main axis**: Là trục chính của một Flex container nó sẽ điều khiển hướng của các flex items sẽ hiển thị. Như hình minh họa ở trên ta thấy main axis là trục ngang các flex items lúc này sẽ hiển thị theo hàng ngang. Nhưng nó không nhất thiết là phải nằm ngang nó sẽ phụ thuộc vào thuộc tính flex-direction được set.

**main start, main end**:  Khi thiết lập flexbox, điểm bắt đầu của flex-container gọi là main start và điểm kết thúc được gọi là main end. Tức là, các flex-item bên trong sẽ hiển thị từ main start đến main end (hoặc có thể set ngược lại từ end - main)

# Sử dụng flexbox
## flex-container
Tạo 1 cấu trúc HTML:

```html
<div class="container">
    <div class="item item1">1</div>

    <div class="item item2">2</div>

    <div class="item item3">3</div>
</div>
```

Để sử dụng Flexbox, chúng ta cần set giá trị cho container (gọi tắt của flex-container). Giá trị cho container bắt buộc phải có mới sử dụng được flexbox nhé bạn.
```css
.container {
    display: flex;
}
```

Khi container được set là flexbox thì các thành phần con trong nó sẽ là flex-item, lúc này bạn sẽ thấy các item bên trong đã tự hiển thị theo chiều dọc.

## flex-direction
Nếu bạn muốn đổi trục thì chỉ cần thêm thuộc tính flex-direction vào container. Có 4 giá trị cho thuộc tính này, gồm:
```css
.flex-container {
    flex-direction: row | row-reverse | column | column-reverse;
}
```

1. row (mặc định): từ trái qua phải
    ![](https://images.viblo.asia/72dd85da-7241-4e1a-9811-5d349572da79.png)
    
2. row-reverse: từ phải qua trái
    ![](https://images.viblo.asia/e92a99b3-eef4-4a8a-be61-de870c7c4e25.png)
    
3. column: từ trên xuống dưới
    ![](https://images.viblo.asia/83267fdd-ec1b-40d6-8993-996106053d4d.png)
    
4. column-reverse: từ dưới lên trên (Ngược lại với column)

## flex-wrap
Ví dụ, chúng ta thử thêm vài flex-item nữa.
![](https://images.viblo.asia/8ee561ab-1683-4075-9569-2bb73f7c4bbc.png)

Như bạn thấy, dù chúng ta có thêm flex-item bên trong flex-container nhưng nó vẫn hiển thị trên một hàng đều nhau. Lý do là mặc định, flexbox tự căn chỉnh các phần tử hiển thị đều nhau dựa theo chiều rộng của container.

Bây giờ, ta set thuộc tính flex-wrap: wrap cho container

```css
.container {
    display: flex;
    flex-wrap: wrap
}
```

![](https://images.viblo.asia/8ee561ab-1683-4075-9569-2bb73f7c4bbc.png)

flex-wrap cho phép container có thể bọc lại các flex-item kể cả khi kích thước của item bị thay đổi (mặc định là nowrap). Tức là khi các flex-item vượt quá chiều rộng của container thì nó sẽ tự động nhảy xuống hàng tiếp theo, và cứ tiếp tục như vậy.

## flex-grow
Các flex items có cùng một giá trị thì tất cả các item sẽ có cùng một kích thước, nếu có một item thay đổi giá trị thì kích thước của item đó cũng thay đổi tương ứng với giá trị đó.

```css
.item {
    flex-grow: <number>; /* default 0 */
}
```

Ví dụ
```css
.item2 {
    flex-grow: 1;
}

.item3 {
    flex-grow: 2;
}
```
![](https://images.viblo.asia/49784731-c56d-4e3d-9c8b-1a1f25827965.png)

Khi set item2 flex-grow là 1, thì nó sẽ lấy phần dư lớn gấp đôi của flex-grow: 0.

Khi set item3 flex-grow là 2, thì nó sẽ lấy phần dư lớn gấp đôi của flex-grow: 1.

Nếu chỉ set set item2 flex-grow là 1, thì nó sẽ lấy phần trống còn lại của container đắp vào.

## flex-shrink
Mặc định tất cả các item đều có giá trị flex-shrink là 1. Tức là khi chúng ta thu nhỏ trình duyệt lại, các phần tử đều co lại bằng nhau. Tuy nhiên giả sử mình muốn .item2 nó co lại nhiều hơn so với các item khác thì mình sẽ tăng giá trị flex-shrink của nó lên.
```css
.item {
    flex-shrink: <number>; /* default 0 */
}
```

Ví dụ
```css
.item2 {
   flex-shrink: 2;
}
```

![](https://images.viblo.asia/94957961-dffb-464a-ae6b-d0a9a09a140c.png)

## flex-basis
flex-basis là thuộc tính này gán cho flex-item một kích thước nhất định.
```css
.item {
    flex-basis: <length> | auto; /* default auto */
}
```

Ví dụ
```css
.item2 {
    flex-basis: 200px;
}
```
![](https://images.viblo.asia/75ec09c2-9f53-4f87-ba9f-5521f89716a4.png)

## flex
Đây là thuộc tính viết tắt của các thuộc tính flex-grow, flex-shrink và flex-basis giá trị mặc định sẽ là 0 1 auto.

```css
.item {
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

## justify-content
Khi thiết lập flexbox, điểm bắt đầu của flex-container gọi là main start và điểm kết thúc được gọi là main end. Tuy nhiên chúng ta có thể dùng thuộc tính justify-content để điều chỉnh lại vị trí bắt đầu của nó. Có 4 giá trị cho thuộc tính này, gồm:

```css
.flex-container {
    flex-direction: flex-start | flex-end | center | space-between | space-around;
}
```

1. flex-start: các flex items được sắp xếp bên trái của flex container.
2. flex-end: các flex items được sắp xếp bên phải của flex container.
3. center: các flex items được sắp xếp ở giữa của flex container.
4. space-between: các flex items được phân bố đều trong flex container, item đầu tiên nằm bên trái và item cuối cùng nằm bên phải.
5. space-around: các flex items được phân bố đều không gian xung quanh kể cả item đầu tiên và item cuối cùng.

![](https://images.viblo.asia/ff9f0854-7074-4a90-bc4a-061161a58278.jpg)

# Phía sau Bootstrap Grid
Bootstrap là framework css khá phổ biến hiện nay và mình cũng đang sử dụng framework này thường xuyên. Khi làm việc với bootstrap, thường ta sẽ bắt đầu với grid của nó để chia layout cho website. Và grid của nó cũng sử dụng flex-box để làm nên điều 'kì diệu' này :))

![](https://images.viblo.asia/621ded5c-1390-4b91-823a-ecd8648c217c.png)

# Demo dàn layout sử dụng Flexbox, không dùng bootstrap grid
Như đã nói bootstrap grid cũng sử dụng flexbox để dàn layout cho website, nên bây giờ chúng ta hãy sử dàn 1 layout đơn giản mà không dùng đến bootstrap grid xem sao :D
Mình sẽ tạo một cấu trúc HTML việc sử dụng các class giống bootstrap nhưng ta sẽ css 'chay' để hiểu về flexbox nhé.

```html
<div class="container">
    <div class="row">
        <div class="navbar col-12">
            navbar
        </div>
    </div>

    <div class="row">
        <div class="left col-12 col-md-3">
            left
        </div>

        <div class="main col-12 col-md-6">
            main
        </div>

        <div class="right col-12 col-md-3">
            right
        </div>
    </div>

    <div class="row">
        <div class="footer col-12">
            footer
        </div>
    </div>
</div>
```

Div container là div bao tất cả các nội dung bên trong nó (Div này ta set max-width cho nó, giống class container và fluid-container trong bootstrap 4).

Div row là flex-container.

Div col- là flex-item.

Tiếp tục css cho các div.

```css
.container {
    max-width: 1140px;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin: 0 auto;
}
```

```css
.row {
    display: flex;
    flex-wrap: wrap;
}
```
Ở đây, ta display: flex và flex-wrap: wrap cho class row. Vậy là ta đã có thể tự tạo ra 1 framework có grid system giống bootstrap rồi đấy, nghe kinh khủng không :))

Tiếp tục css cho các class col- nằm trong flex-container để vừa dàn layout, vừa responsive được.

```css
.col-12 {
    flex: 0 0 100%;
    max-width: 100%;
}

.col-6 {
    flex: 0 0 50%;
    max-width: 50%;
}

.col-3 {
    flex: 0 0 25%;
    max-width: 25%;
}

@media only screen and (min-width: 768px) {
    .col-md-12 {
        flex: 0 0 100%;
        max-width: 100%;
    }

    .col-md-6 {
        flex: 0 0 50%;
        max-width: 50%; 
    }

    .col-md-3 {
        flex: 0 0 25%;
        max-width: 25%;
    }
}
```

Kết quả (Mình thêm css cho nó màu mè chút :D)

![](https://images.viblo.asia/a8cfc822-35a3-43d1-9502-aa19c69f67b2.png)

Responsive nè

![](https://images.viblo.asia/8acef609-3596-4f69-9acb-bfdaff39bc13.png)

# Kết luận
Qua bài viết này, mình đã giới thiệu các bạn về flexbox - một thuộc tính CSS3 được sử dụng trong việc dàn layout website và demo cách sử dụng flexbox mà không dùng đến bootstrap grid. Nếu có thắc mắc và góp ý, bạn có thể comment phía dưới nhé. Cảm ơn bạn.

# Tham khảo
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout

https://www.w3schools.com/css/css3_flexbox.asp