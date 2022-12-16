![](https://images.viblo.asia/6bbc8694-ca10-414c-905b-852a16026632.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 21 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Là một trick hay đến từ Flexbox

 Đã bao giờ bạn gặp kiểu **divider** trong thiết kế như này chưa nhỉ?

 ![](https://images.viblo.asia/d82da192-15d0-4060-9145-13faf11c5ab3.png)

 Trước đây chưa có Flexbox xuất hiện, mình đã CSS cho kiểu thiết kế trên cực kỳ tốn nhiều code, cồng kềnh lắm. Vận dụng nào là `absolute`, `left`, `right`, dùng `calc()` để tính % - px, rồi thêm `overflow: hidden` để cắt đi đường line thừa tràn ra khỏi viewport.

 Nhưng với Flexbox nó lại xử lý vô cùng dễ dàng, ít code CSS và chỉ cần 1 thẻ HTML thôi là đủ (single div).

 > Single div: Hay có cách gọi khác là **one div** là 1 dạng xu hướng rộ lên trong cộng đồng CSS. Tức là chỉ với 1 div ở HTML, người ta cố gắng tận dụng tối đa các thuộc tính CSS cung cấp + với 2 pseudo elements là `:before`, `:after` để làm ra nhiều thứ hay ho như lá cờ (flag), icons.
 > Bạn có thể thử search google về `css flag`, `css icons` + với từ khóa `one div` để tìm hiểu thêm nhé.

Quay trở lại với trick của chúng ta hôm nay, trước tiên là code HTML chỉ cần `1 div` như thế này:

```html:html:html
<div class="divider">Or</div>
```

**CSS**

```scss
.divider {
   display: flex;
   align-items: center; // Căn giữa đường line với text theo chiều dọc

   &:before,
   &:after {
      content: '';
      height: 1px;
      background-color: gray;
      flex: 1; // Tự động lấy width của khoảng trống còn dư (chỗ này với cách làm cũ của mình tốn nhiều code để xử lý lắm)
   }

   &:before {
      margin-right: 10px; // Tạo khoảng cách giữa line vs text
   }

   &:after {
      margin-left: 10px; // Tạo khoảng cách giữa line vs text
   }
}
```

Cái chỗ khoảng cách đó mình **auto** thêm 1 chút bằng CSS variables nha.

```scss
.divider {
   display: flex;
   align-items: center; // Căn giữa đường line với text theo chiều dọc
   --gap: 10px;

   &:before,
   &:after {
      content: '';
      height: 1px;
      background-color: gray;
      flex: 1; // Tự động lấy width của khoảng trống còn dư (chỗ này với cách làm cũ mình tốn nhiều code để xử lý lắm)
   }

   &:before {
      margin-right: var(--gap); // Tạo khoảng cách giữa line vs text
   }

   &:after {
      margin-left: var(--gap); // Tạo khoảng cách giữa line vs text
   }
}
```

{@codepen: https://codepen.io/tinhh/pen/OJVogbd}

> **Browser Support:** ỔN ĐỊNH
> 
> Flexbox thì bây giờ đã được sử dụng rộng rãi và hầu như ở tất cả các dự án mình đang làm rồi. Cũng lâu rồi mình chưa đụng đến `float` và `clear`, thậm chí cũng ít dùng `display: inline-block` hơn :smile: 
> 
> https://caniuse.com/#feat=flexbox

#### Đọc hiểu thêm

- Mình biết được tip này qua 1 tweet của [@CodyHouse](https://twitter.com/CodyWebHouse/status/1233058458297143296)

### 2. Giờ thì là một pha bị lỗi do Flexbox =))

Flexbox thì giúp ích cho chúng ta xử lý nhiều design trở nên dễ dàng vậy đó, nhưng đôi khi nó cũng đem đến cho 1 vài rắc rối, phải nói là KHÓ HIỂU ?!?

Hãy đến với 1 layout có tên là [Media Object](https://philipwalton.github.io/solved-by-flexbox/demos/media-object/), bây giờ mình muốn [truncate text thành 1 dòng](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-8-OeVKBDaJlkW#_1-cat-text-text-thanh-nhieu-dong-ma-khong-ton-chut-mo-hoi-nao-not-cross-browsers-0) , tưởng là đơn giản vài dòng CSS như dưới đây thôi.

```scss
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

Nhưng hắn lại không ăn các bạn ạ?!? Đoạn text không được truncate, không thấy dấu 3 chấm xuất hiện, mà còn bị kéo dài ra bởi thuộc tính `white-space: nowrap` được set ở trên.

Chi tiết thì code của mình như sau:

**HTML**

```html:html:html
<div class="media">
    <img class="media__image" src="https://picsum.photos/50/50" alt="Lorem Picsum" />
    <div class="media__body">
        <h3 class="media__title">This is title</h3>
        <p class="media__desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac nisl quis massa vulputate adipiscing</p>
    </div>
</div>
```

**CSS**

```scss
.media {
   width: 300px;
   padding: 10px;
   background-color: #F7964A;
   border: 2px solid black;
   display: flex;
   align-items: center;

   &__image {
      display: block;
      width: 50px;
      height: 50px;
      background-color: silver;
   }

   &__body {
      margin-left: 15px;
      flex: 1;
   }

   &__title {
      font-size: 18px;
   }

   &__desc {
      font-size: 14px;
      margin-top: 10px;
      white-space: nowrap; // CSS áp dụng để truncate 1 dòng
      overflow: hidden; // CSS áp dụng để truncate 1 dòng
      text-overflow: ellipsis; // CSS áp dụng để truncate 1 dòng
   }
}
```

Và kết quả thì không như mong đợi :cry: 

![](https://images.viblo.asia/91d440e0-0809-45d8-acb3-5771644949ff.PNG)

{@codepen: https://codepen.io/tinhh/pen/wvaEqjJ}

Mình cũng thử set  `.media { overflow: hidden }`  nhưng cũng không nhằm nhò gì... :tired_face: 

Thế là đi search thử với từ khóa `css flexbox truncate`, nó ra cho 1 loạt bài viết đưa ra cách giải quyết, cũng như là link đến StackOverflow cũng có người hỏi về vấn đề này :smiley: 

Và mình tìm được 2 cách giải quyết như sau:

> Cách 1: Thêm thuộc tính `overflow: hidden` cho `.media__body`

{@codepen: https://codepen.io/tinhh/pen/JjdayeQ}

> Cách 2: Cũng ở `.media__body` thêm thuộc tính `min-width: 0`

{@codepen: https://codepen.io/tinhh/pen/rNVZzoQ}

#### Đọc hiểu thêm

- https://css-tricks.com/flexbox-truncated-text/
- https://stackoverflow.com/questions/45922167/css-bootstrap-media-wrapping-ellipsis

### 3. CSS Selector không phân biệt chữ hoa, chữ thường

Giả sử bạn có 1 đoạn HTML `<input type="submit" value="Search" />`. Ở trong CSS bạn style cho nó theo kiểu attribute selector `input[value='Search']` thì sẽ match đúng, nhưng hãy thử `input[value='search']` thì sao? À nó không match đâu bạn nhé. Mặc định trong CSS nó là như vậy rồi.

Nhưng thật may mắn vì CSS Selector Level 4 đã cho ra đời Selector mà resolve được vấn đề gặp trên.

> Nói 1 chút về CSS Selector Level 4 nhé. Bạn có thể hình dung dễ hiểu như này:
> 
> Lúc xưa thiệt là xưa, khi mình tiếp xúc với CSS thì mình được dùng các Selector dạng `:hover`, `.A > .B`, `:first-child`, `:last-child`. Thì đây là những CSS Selector Level 2 và mới chớm của Level 3. 
> 
> Sau đó CSS Selector Level 3 còn bổ sung thêm các Selector hay ho khác như: `:not`, `:target`, `:checked`, `:empty`, `:only-child`...
> 
> Và cho đến thời điểm hiện tại, CSS Selector Level 4 đã xuất hiện và giới thiệu thêm nhiều BỘ CHỌN còn hay hơn nữa như:
> 
> - `:placeholder-shown`:  Dùng để style hiệu ứng cho input cho chưa có value, bắt đầu nhập value..
> 
> - `:focus-within`: Mình từng có bài viết trong series này đã giới thiệu về nó.
> 
> - `:required`, `:optional`: Bạn hoàn toàn có thể dùng Selector này kết hợp với các thuộc tính của HTML5 để mà validate form chỉ bằng CSS. 
> 
> - Và còn nhiều Selector nữa...nhưng có 1 số vẫn đang phát triển và chưa được nhiều browser support.

Quay trở lại với tip của chúng ta, thì cái CSS Selector Level 4 mà giúp bỏ qua việc phân biệt chữ hoa, chữ thường kia đó là `[attribute='value' i]`. Trong trường hợp cần override lại tính năng này, thì mình vẫn có `[attribute='value' s]` buộc phải phân biệt chữ hoa thường => trở lại với cách xử lý mặc định của trình duyệt.

{@codepen: https://codepen.io/tinhh/pen/oNXPqaM}

> **Browser Support:** LẠI LÀ IE KHÔNG HIỂU
> 
> Trong khi các version mới nhất của Browsers như Firefox, Chrome, Safari, Edge đều đã phát triển để hiểu được Selector kia, thì IE vẫn cứng đầu không chịu chơi :smile: 
> 
> https://caniuse.com/#feat=css-case-insensitive

#### Đọc hiểu thêm

- https://stackoverflow.com/questions/27506735/what-does-i-mean-in-a-css-attribute-selector/28050505#28050505
- https://caniuse.com/#feat=css-case-insensitive
- https://css4-selectors.com/selectors/
- https://www.sitepoint.com/future-generation-css-selectors-level-4/
- https://stackoverflow.com/questions/5671238/css-selector-case-insensitive-for-attributes/26721521#26721521

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!