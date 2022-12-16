Hiện nay có rất nhiều framework miễn phí mà mạnh mẽ để giúp ta viết web responsive một cách dễ dàng, nổi bật nhất chắc mọi người đều biết đấy là Bootstrap của Twitter và Foundation của Zurb. Tuy 2 framework nói trên có nhiều tiện ích nhưng nó lại đòi hỏi quá trình học và nghiên cứu khá lâu và cũng không phải trang web nào cũng dùng hết tính năng đó.

Chính vì vậy hôm nay mình xin giới thiệu với mọi người về  Skeleton, đây là một framework được phát triển mớii Dave Magache. Skeleton là một framework khá hay dành cho những bạn mới học về responsive web design, tuy không có nhiều tiện ích như 2 framework trên nhưng nó lại rất nhẹ và đặc biệt cực kì dễ học và sử dụng.

## Tại sao lại chọn Skeleton?
* Dung lượng: Thật sự là nó rất nhẹ, chỉ cần sử dụng một file có dung lượng xấp xỉ 20kb là chúng ta có thể viết responsive web rồi.
* Nhanh chóng: Skeleton còn cực kì dễ học, dễ thao tác, dễ tiếp cận và dễ chỉnh sửa
* Hỗ trợ nhiều trình duyệt: Skeleton hỗ trợ hầu hết mọi trình duyệt như Chrome, Safari, Firefox, Opera, IE, Microsoft Edge,...

## Cách cài đặt Skeleton
Để sử dụng Skeleton thì chúng ta không cần phải cài đặt gì cả, chỉ cần vào trang [Skeleton](http://getskeleton.com/) và Download để tải về. Sau khi tải về sẽ có 2 file, chúng ta sẽ copy file có tên là skeleton.css vào trong thư mục website và dẫn đường link css vào trong file HTML.

Chỉ cần như vậy là chúng ta đã cài đặt xong một môi trường để thử nghiệm Skeleton rồi :grinning: :grinning: :grinning:

## Sơ lược về Skeleton
Skeleton sử dụng font chính là Raleway, đây mà một font chữ khá phổ biến được phát triển bởi Google. Do là một framework hướng đến sự đơn giản nên phong cách thiết kế của Skeleton cũng rất đơn giản, không cầu kì.

#### Hệ thống Grid
Grid được sử dụng ở hầu hết các framework responsive. Grid là một cái khung gồm nhiều dòng, mỗi dòng có tối đa 12 cột, khi đạt đến một kích thước màn hình nhất định thì các dòng này sẽ tự động xuống hàng hay tự thay đổi cách hiển thị tuỳ theo cách thiết kế của chúng ta.
![](https://images.viblo.asia/3fa0bb46-d604-4f67-a77b-878965615379.png)

**EX:**
```
<div class="container">

  <div class="row">
    <div class="one column">One</div>
    <div class="eleven columns">Eleven</div>
  </div>

  <div class="row">
    <div class="two columns">Two</div>
    <div class="ten columns">Ten</div>
  </div>

  <div class="row">
    <div class="one-third column">1/3</div>
    <div class="two-thirds column">2/3</div>
  </div>
  
  <div class="row">
    <div class="one-half column">1/2</div>
    <div class="one-half column">1/2</div>
  </div>

</div>
```

#### Kiểu chữ
Tất cả các size chữ được đặt bằng rem. Vì vậy kích thước phông chữ và các mối quan hệ không gian có thể được định kích thước tương ứng dưạ trên một thuộc tính kích thước phông chữ duy nhất.
**EX:**
```
<h1>Heading</h1>
<h2>Heading</h2>
<h3>Heading</h3>
<h4>Heading</h4>
<h5>Heading</h5>
<h6>Heading</h6>
```

![](https://images.viblo.asia/842fa353-af3d-4121-952c-a8fe70e72bf2.png)

#### Buttons
Buttons trong Skeleton có 2 loại cơ bản. `.button` cơ bản và `.button-primary`

**EX:**
```
<!-- Standard buttons -->
<a class="button" href="#">Anchor button</a>
<button>Button element</button>
<input type="submit" value="submit input">
<input type="button" value="button input">

<!-- Primary buttons -->
<a class="button button-primary" href="#">Anchor button</a>
<button class="button-primary">Button element</button>
<input class="button-primary" type="submit" value="submit input">
<input class="button-primary" type="button" value="button input">
```
![](https://images.viblo.asia/4d44c1c7-88bc-4948-8f9f-af84b49d75ac.png)

#### Forms
Ở các framework khác thì việc tạo form đẹp và responsive có lẽ mất khá nhiều thời gian, nhưng trong Skeleton thì mọi việc đã được đơn giản hóa cho bạn.

**EX:**
```
<form>
  <div class="row">
    <div class="six columns">
      <label for="exampleEmailInput">Your email</label>
      <input class="u-full-width" type="email" placeholder="test@mailbox.com" id="exampleEmailInput">
    </div>
    <div class="six columns">
      <label for="exampleRecipientInput">Reason for contacting</label>
      <select class="u-full-width" id="exampleRecipientInput">
        <option value="Option 1">Questions</option>
        <option value="Option 2">Admiration</option>
        <option value="Option 3">Can I get your number?</option>
      </select>
    </div>
  </div>
  <label for="exampleMessage">Message</label>
  <textarea class="u-full-width" placeholder="Hi Dave …" id="exampleMessage"></textarea>
  <label class="example-send-yourself-copy">
    <input type="checkbox">
    <span class="label-body">Send a copy to yourself</span>
  </label>
  <input class="button-primary" type="submit" value="Submit">
</form>
```
![](https://images.viblo.asia/ab3dedf5-7b27-41e9-a313-f639b9c4e4ee.png)

## Kết luận
Như vậy là chúng ta đã cùng nhau đi tìm hiểu về Skeleton rồi. Đến đây có lẽ mọi người cũng đã phần nào đánh giá được ưu, nhược điểm của framework này rồi.

Tài liệu: http://getskeleton.com/