Khi mới biết đến flex-box, mình thật sự choáng ngợp với sự tiện lợi của nó, đến mức cái gì cũng dùng flex-box, đến một ngày mình tự hỏi, ủa, vậy có cần grid nữa ko? Grid nên dùng lúc nào? Mình nghĩ chắc hẳn cũng có nhiều bạn có thắc mắc giống mình. Vậy chúng ta cùng làm sáng tỏ vấn đề ấy trong bài viết này nhé! 

Trước tiên, chúng ta cần làm rõ sự khác biệt giữa Grid và Flexbox. Grid là một module bố cục đa chiều, tức là bao gồm nhiều hàng và cột.  Flexbox có thể bố trí các phần tử con của nó dưới dàng hàng hoặc cột, nhưng không phải cả hai. Nếu bạn chưa hiểu về Grid và Flexbox, bạn có thể đọc thêm trong bài này https://ishadeed.com/article/learn-box-alignment/. Nếu bạn đã biết rồi, thật tuyệt, hãy đi sâu vào việc phân biệt chúng, cũng như khi nào nên sử dụng và lý do vì sao. 

## Điểm  khác nhau giữa Grid và Flexbox

Trước tiên thì phải khẳng định rằng dù bạn dùng Grid hay Flexbox trong bất cứ trường hợp nào thì đều không sai. Bài viết này chỉ là khuyến nghị bạn nên dùng cái nào cho một trường hợp cụ thể.
```
/* Flexbox wrapper */
.wrapper {
  display: flex;
}

/* Grid wrapper */
.wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 16px;
}
```
![](https://images.viblo.asia/f87d9133-733b-4931-b8c9-8f429ad29f85.png)
Bạn có nhận thấy điều khác biệt không? Flexbox sắp xếp các phần tử thành 1 dòng (hoặc 1 cột, nếu muốn), trong khi Grid tạo một lưới các cột và hàng.
## Làm sao để quyết định nên sử dụng cái nào
Quyết định dùng Grid hay Flexbox đôi khi có thể hơi khó, nhất là khi bạn mới làm quen với CSS. Dưới đây là một số câu hỏi mà chúng ta hay phân vân khi lựa chọn giữa chúng:
* Hiển thị các phần tử con như thế nào? Một dòng hay dưới dạng cột và dòng?
* Làm thế nào để các thành phần hiển thị đúng trên các kích thước màn hình khác nhau?

Hầu hết trường hợp, nếu bạn nhìn thấy một phần tử có tất cả các phần tử con hiển thị trên cùng 1 dòng, thì Flexbox là giải pháp tốt nhất. Giống như trong ví dụ này:
![](https://images.viblo.asia/28ee7bcf-265e-4205-a193-b24543acb033.png)

Tuy nhiên, nếu bạn nhìn thấy cả cột và hàng, thì Grid sẽ là giải pháp phù hợp hơn.
![](https://images.viblo.asia/23ad208b-5b96-4948-9368-8578bce40f6e.png)

Giờ sau khi bạn đã hiểu sự khác biệt giữa chúng, chúng ta sẽ chuyển sang các ví dụ cụ thể hơn và tìm hiểu cách quyết định.
## Các trường hợp sử dụng và ví dụ
### Grid
**Main và Sidebar**

Đối với Sidebar và Main thì Grid là giải pháp hoàn hảo. Hãy xem bản mockup sau:
![](https://images.viblo.asia/313dfd72-7d7c-4510-86a5-8be487b83fe4.png)
Đây sẽ là cách ta CSS cho nó
```
/* HTML */
<div class="wrapper">
  <aside>Sidebar</aside>
  <main>Main</main>
</div>

/* CSS */
@media (min-width: 800px) {
  .wrapper {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 16px;
  }

  aside {
    align-self: start;
  }
}
```
Nếu `align-self` không được sử dụng cho `<aside>`, chiều cao của nó sẽ bằng với `<main>`, không quan trọng nội dung dài thế nào.

**Cards**

Bản thân cái tên Grid cũng đã giải thích ý nghĩa của nó, nên việc sử dụng nó để tạo 1 lưới card là cách sử dụng hoàn hảo.
![](https://images.viblo.asia/808a3df0-66a1-4963-bdf5-5e8213c650c0.png)
```
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 16px;
}
```
Cột sẽ có độ rộng ít nhất là 200px, nếu khoảng cách không đủ, nó sẽ chuyển card sang dòng mới. Có điều có thể sẽ gây ra scroll ngang nếu độ rộng màn hình nhỏ hơn 200px. Giải pháp đơn giản là thêm độ rộng tối thiểu để áp dụng css:
```
@media (min-width: 800px) {
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 16px;
  }
}
```
**Section layout**

Ví dụ như trong design bên dưới, chúng ta có thể sử dụng Grid 2 lần, một lần để chia thành 2 khu vực (phần contact us với phần form), lần thứ 2 để chia grid trong form.
![](https://images.viblo.asia/8609c81c-1e7d-415a-b183-69fe70de84a4.png)
```
@media (min-width: 800px) {
  .wrapper {
    display: grid;
    grid-template-columns: 200px 1fr;
  }

  .form-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
  }

  .form-message,
  .form-button {
    grid-column: 1 / 3; /* để nó full độ rộng màn hình */
  }
}
```
### CSS Flexbox
**Website Navigation**

Website navigation nên được xây dựng bằng Flexbox. Phần lớn navigation đều theo mô típ logo ở bên trái, menu ở bên phải, rất phù hợp với flexbox.
![](https://images.viblo.asia/5be3c2b0-e129-422b-a5b2-c25944992936.png)
```
.site-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
```
Dù cấu trúc navigation có thể khác biệt một chút ở các design, nhưng ta vẫn có thể set khoảng cách giữa các mục với thuộc tính `justify-content`.

**Actions List**

Khi nghe đến danh sách, thường thì ta hay nghĩ đến một danh sách dọc. Tuy nhiên, một danh sách có thể hiển thị trên 1 dòng, ví dụ như danh sách hành động trên Facebook hay Twitter. Nó bao gồm các nút hành động mà người dùng có thể thực hiện. 
![](https://images.viblo.asia/9d932eda-22dd-44c7-ad8d-8fc5d7201673.png)

Như bạn thấy, các phần tử được hiển thị liên tiếp theo chiều ngang. Đó là một trong những cách sử dụng chính của Flexbox.
```
.actions-list {
  display: flex;
}

.actions-list__item {
  flex: 1; /* mở rộng phần tử đồng thời chia đều độ rộng của phần tử cha cho mỗi phần tử */
}
```
Một biến thể khác là header và footer của modal 
![](https://images.viblo.asia/a7a464a5-7cba-4058-9605-6c522c488d28.png)

Cả header và footer của modal đều có phần tử con hiển thị trên 1 dòng. Khoảng cách giữa chúng sẽ được giải quyết đơn giản với flex.

Với modal header
```
.modal-header {
  display: flex;
  justify-content: space-between;
}
```
Còn với footer, nó sẽ khác một chút. Nút "Cancel" được thêm margin auto để đẩy nó sang bên phải.
```
.cancel__action {
  margin-left: auto;
}
```
**Form elements**

Sự kết hợp của 1 trường input cùng button bên cạnh như hình dưới đây cũng là 1 trường hợp nên sử dụng Flexbox
![](https://images.viblo.asia/aa928383-f66d-4478-9a7d-dd3a66b5c862.png)

Trong form, trường input chiếm tất cả không gian còn lại, làm cho nó có chiều rộng động. Đó là vì ta sử dụng `flex: 1 1 auto;` cho thẻ `input`.

**Bình luận cho bài viết**

Một trường hợp khác cũng khá phổ biến là component bình luận cho bài viết như sau
![](https://images.viblo.asia/402bcdcf-5032-409e-9c14-cc0de5916c98.png)

Chúng ta có ảnh người dùng và bình luận của họ. Phần nội dung bình luận chiếm khoảng không gian còn lại của phần tử cha, tương tự ví dụ trên.

**Nội dung trong card**

Card thì có rất nhiều biến thể, nhưng phổ biến nhất là như sau
![](https://images.viblo.asia/c7bc5d9b-bb6a-4757-a0b7-565559a82201.png)

Ở bên trái, các phần tử con được xếp lần lượt từ trên xuống dưới, vì direction của flex đang là `column`. Phía bên phải thì ngược lại, direction được set là `row`.
```
.card {
  display: flex;
  flex-direction: column;
}

@media (min-width: 800px) {
  .card {
    flex-direction: row;
  }
}
```
Một biến thể phổ biến khác của card là icon với text label bên dưới. Nó có thể là 1 button, link, hoặc thậm chí chỉ để trang trí.
![](https://images.viblo.asia/c794b5b2-8be1-4478-a0df-e029f4eadc1b.png)

Lưu ý là text và icon phải căn giữa theo chiều ngang hoặc chiều dọc. Nhờ có flexbox, điều đó rất đơn giản.
```
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```
Tương tự với kiểu hiển thị trên 1 dòng, ta chỉ cần bỏ dòng `flex-direction: column;`, vì direction `row` là mặc định.

**Features List**

Có một cái rất hay ho ở Flexbox là  khả năng đảo ngược hướng phần tử.
```
.item {
  flex-direction: row-reverse;
}
```
Như trong mockup bên dưới, các phần tử chẵn sẽ được đảo ngược thứ tự. Flexbox rất hữu dụng.
![](https://images.viblo.asia/15d69736-4b8a-4ce8-8244-fb0b0f9068f9.png)

**Căn giữa nội dung của 1 component**

Hãy tưởng tượng chúng ta có 1 component gồm nhiều phần tử và cần căn giữa nó, căn giữa theo chiều ngang thì khá đơn giản với `text-align`.

![](https://images.viblo.asia/d873fa37-0d43-4728-bde7-c7cf581ddfd5.png)

Nhưng với chiều dọc thì sao? Đơn giản!
```
.hero {
  display: flex;
  flex-direction: column;
  align-items: center; /* căn giữa theo chiều ngang */
  justify-content: center; /* căn giữa theo chiều dọc */
  text-align: center;
}
```
## Kết hợp Grid và Flexbox
Trong thực tế thì layout thường bao gồm nhiều phần trong các ví dụ trên, nên ta có thể kết hợp sử dụng cả 2. Trường hợp dễ thấy nhất là một danh sách card sử dụng grid và nội dung bên trong card sử dụng Flexbox.
![](https://images.viblo.asia/51375975-1c17-4378-b23c-34582ffed790.png)

Đây là yêu cầu đối với layout này:
* Độ dài của các card trong mỗi dòng phải bằng nhau
* Link "Read more" phải ở cuối cùng của card, không quan trọng chiều cao của card.
* Grid sử dụng `minmax()` .
```
/* HTML */
<div class="wrapper">
  <article class="card">
    <img src="sunrise.jpg" alt="" />
    <div class="card__content">
      <h2><!-- Title --></h2>
      <p><!-- Desc --></p>
      <p class="card_link"><a href="#">Read more</a></p>
    </div>
  </article>
</div>

/* CSS */
@media (min-width: 500px) {
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
  }
}

.card {
  display: flex; /* [1] */
  flex-direction: column; /* [2] */
}

.card__content {
  flex-grow: 1; /* [3] */
  display: flex; /* [4] */
  flex-direction: column;
}

.card__link {
  margin-top: auto; /* [5] */
}
```
Mình sẽ giải thích thêm về đoạn CSS trên:
1. Áp dụng Flexbox cho card.
2. `direction` là `collumn`, có nghĩa các phần tử sẽ xếp lần lượt theo chiều dọc.
3. Để nội dung card mở rộng và lấp đầy khoảng trống còn lại.
4. Áp dụng Flexbox cho card content
5. Cuối cùng, sử dụng `marrgin-top: auto` để đẩy link xuống. Điều này sẽ giữ nó ở dưới cùng bất kể chiều cao của thẻ.

Bạn có thể thấy việc kết hợp Grid và Flexbox không hề khó. Đó là 2 công cụ đem đến cho chúng ta rất nhiều cách để triển khai layout. Hãy hiểu chúng đúng cách và kết hợp chúng chỉ khi bạn thực sự cần nhé.

Nguồn:  https://ishadeed.com/article/grid-layout-flexbox-components/