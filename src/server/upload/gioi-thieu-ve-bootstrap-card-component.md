# Giới thiệu
> Trong bài viết này, mình sẽ giới thiệu cho các bạn một thành phần rất hay được sử dụng trong Bootstrap đó là Bootstrap Card Component. Mỗi một định nghĩa mình sẽ có một ví dụ kèm theo, chắc chắn sau bài viết này các bạn đều có thể sử dụng nó một cách thành thạo vì nó rất đơn giản. Hi vọng các bạn có thể áp dụng được vào project của mình.


Bootstrap là một framework HTML, CSS và Javascript phổ biến nhất nhất hiện nay.

Nó cung cấp rất nhiều lợi ích cho developer như là:
- Dễ dàng và nhanh chóng tạo ra một layout responsive mà chỉ cần biết những kiến thức đơn giản về HTML và CSS.
- Vì ngày nay người dùng di động truy cập các trang web rất nhiều, nên thiết kế Mobile-first cũng được ưu tiên. Bootstrap được xây dựng theo triết lý Mobile-first.
- Nó tương thích được với tất cả các trình duyệt
- Sử dụng Flexbox cho grid system
- Nó cung cấp rất nhiều tính năng và thành phần.

Phiên bản mới nhất của Bootstrap cung cấp rất nhiều tính năng mới, chẳng hạn như hỗ trợ Flexbox, new card component, thay thế các panels, thumbnail...
# Bootstrap Card Component là gì
Đây chính là một ví dụ sử dụng Bootstrap Card:
![](https://images.viblo.asia/51b2edc4-8e85-446e-9d80-85b001b1ab94.png)


Flexbox là một kiểu dàn trang mới của CSS3 (https://viblo.asia/p/gioi-thieu-ve-css3-flexbox-3P0lPM785ox), và Bootstrap Card Component xây dựng dựa trên cơ chế này.

Bạn có thể có rất nhiều tùy chọn trong Bootstrap Card như là định nghĩa header & footer, định nghĩa nội dung content, background, chèn link ... 
# Sử dụng Bootstrap Card trong project
Để sử dụng Bootstrap trong project của bạn thì chỉ cần include CDN hoặc download từ trang getbootstrap.com. Mình sẽ demo một số đoạn code HTML đơn giản, có sử dụng Bootstrap để minh họa các thành phần cơ bản của Card.

## 1. Định nghĩa Style đơn giản cho Cards
Đây là những phần tử cơ bản nhất để tạo nên Card như sau:
```html
<div class="card">
    <img class="card-img-top" src="http://animalsbirds.com/wp-content/uploads/2017/03/Beautiful-Maltese-Dog-Photos-HD-Wallpapers.jpg" alt="Card image top">
    <div class="card-body">
        <h3 class="card-title">Card title</h3>
        <h4 class="card-subtitle">Card subtitle</h4>
        <p class="card-text">This is a simple Card example</p>
    </div>
</div>
```

Khi tạo một Card đơn giản, chúng ta cần:
- Tạo thẻ `<div>` có class là `card` làm thẻ bao ngoài
- Sử dụng class `card-img-top` với thẻ `<img>` để thêm ảnh vào phần đầu của card.
- Thêm class `card-body` để định nghĩa phần body
- Sử dụng `card-title` và `card-subtitle` để thêm tiêu đề và phụ đề
- Sử dụng `card-text` với thẻ `<p>` để thêm nội dung

{@codepen: https://codepen.io/uet-boo/pen/WKRQGG}



Như các bạn đã thấy, Card đang hiển thị trên toàn bộ `<div>` bao nó. 

Nếu muốn lấy ảnh làm background và hiển thị chữ trên ảnh, các bạn chỉ cần đổi class `card-body` thành `card-img-overlay`. 

Hoặc nếu muốn hiển thị thêm ảnh ở dưới title thì bạn chỉ cần thêm một thẻ `<img>` với class `card-img-bottom`.

## 2. Định nghĩa chiều rộng và chiều cao cho Bootstrap Card Component 

Mặc định Card sẽ lấy tất cả chiều rộng có sẵn trong thẻ `<div>` bao chúng, chiều cao sẽ được điều chỉnh sao cho hiển thị phù hợp với nội dung của Card. Tuy nhiên, bạn cũng có thể tự thiết lập chiều rộng của chúng bằng cách thêm style `width` hay `max-width` và thay đổi chiều dài bằng cách thêm style `height`. Như ví dụ dưới đây:
```html
<div class="card" style="width:20rem; height: 10rem;">
    <img class="card-img-top" src="http://animalsbirds.com/wp-content/uploads/2017/03/Beautiful-Maltese-Dog-Photos-HD-Wallpapers.jpg" alt="Card image top">
    <div class="card-body">
        <h3 class="card-title">Card title</h3>
        <h4 class="card-subtitle">Card subtitle</h4>
        <p class="card-text">This is a simple Card example</p>
    </div>
</div>   
```
Các bạn có để ý thấy là mình dùng đơn vị của `width` và `height` là `rem` thay vì `px` không? Mình viết vậy là bởi đơn vị `rem` có thể mở rộng được theo kích cỡ của màn hình, còn `px` thì không.

Thay vì fix chiều rộng và chiều cao như thế, các bạn cũng có thể sử dụng `Bootstrap grid`, mình thì hay dùng cách này:
```html
<div class="row">
    <div class="col-sm-3">
        <div class="card">
            <img class="card-img-top" src="http://animalsbirds.com/wp-content/uploads/2017/03/Beautiful-Maltese-Dog-Photos-HD-Wallpapers.jpg" alt="Card image top">
            <div class="card-body">
                <h3 class="card-title">Card title</h3>
                <h4 class="card-subtitle">Card subtitle</h4>
                <p class="card-text">This is a simple Card example</p>
            </div>
        </div>
    </div>
</div>    
```
Với việc định nghĩa 1 card sẽ ứng với 3 column như trên, 1 hàng mình sẽ có được 4 cards.
## 3. Định nghĩa Header và Footer Bootstrap Card Component
Các bạn chỉ cần thêm thẻ `<div>` với class `card-header` và `card-footer`
```html
<div class="row">
    <div class="col-sm-3">
        <div class="card">
            <div class="card-header">
                This is a header
            </div>
            <img class="card-img-top" src="http://animalsbirds.com/wp-content/uploads/2017/03/Beautiful-Maltese-Dog-Photos-HD-Wallpapers.jpg" alt="Card image top">
            <div class="card-body">
                <h3 class="card-title">Card title</h3>
                <h4 class="card-subtitle">Card subtitle</h4>
                <p class="card-text">This is a simple Card example</p>
            </div>
            <div class="card-footer">
                    This is a footer
            </div>
        </div>
    </div>
</div>  
```
## 4. Thêm Navigation
Một tính năng mới của Bootstrap Card Component là khả năng thêm các mẫu tab hay navigation pills vào header. Để làm được điều này chúng ta sẽ thêm thẻ `<ul>` với các class `nav-tabs` và `card-header-tabs` vào `card-header`:
```html
<div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
            <a class="nav-link active" href="#">Tab 1</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Tab 2</a>
        </li>
    </ul>        
</div>
```

Tương tự chúng ta có thể thêm navigation pills vào bằng cách thay thế `nav-tabs` bằng `nav-pills` và `card-header-tabs` bằng `card-header-pill`.
## 5. Thêm Links
Chúng ta có thể dễ dàng thêm link vào nội dung content bằng cách thêm thẻ `<a>` và class `card-link`.
```html
<div class="card">
    <div class="card-body">
        <h3 class="card-title">Adding Links</h3>
        <p class="card-text">These are simple links</p>
        <a href="#" class="card-link">Link 1</a>
        <a href="#" class="card-link">Link 2</a>
    </div>
</div>
```
## 6. Sử dụng Align và Transform text
Chúng ta có thể căn chỉnh nội dung hiển thị trong card bằng việc thêm vào các class như: `text-left` (căn chỉnh text sang trái), `text-right` (căn chỉnh text sang phải), `text-center` (căn chỉnh text sang trung tâm), `text-justify` (các dòng có độ rộng bằng nhau) hay là `text-nowrap` (ngăn không cho xuống dòng).

Chúng ta cũng có thể viết hoa, viết thường nội dung văn bản bằng cách thêm các class `text-lowercase` (viết thường), `text-uppercase` (viết hoa) hay `text-capitalize` viết hoa chữ cái đầu tiên.
## 7. Điều chỉnh Background, Foreground, và Border Colors
Màu background hay foreground có thể được tùy chỉnh bằng cách sử dụng Bootstrap text and background color utilities (https://getbootstrap.com/docs/4.0/utilities/colors/).
Để sử dụng Bootstrap’s border utilities chúng ta cần phải thiết lập border color cho card.
```html
<div class="card border-danger text-white bg-dark mt-5">
    <div class="card-header">This is a Header</div>
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a text </p>
        </div>
    </div>
</div>
```
Đoạn code này mình đã đổi màu nền của card sang `bg-dark`, chữ sang `text-white` và border sang `border-danger`.


# Tạo Layouts với Bootstrap Card Component
Như các bạn đã biết, Card được sử dụng để tạo layout cho album ảnh, bài blog, sản phẩm thương mại điện tử... Có rất nhiều công ty lớn như Facebook, Google, Printest sử dụng đến nó.

Thông thường, nếu các bạn muốn tạo ra những layouts đẹp mắt thì bạn cần phải có những kiến thức chuyên sâu về HTML và CSS. Tuy nhiên, nhờ vào những tính năng mới của Bootstrap, chúng ta có thể nhanh chóng xây dựng các layouts như vậy bằng cách đặt các Cards bên trong thẻ `<div>` chứa những class đặc biệt như là `card-group`, `card-deck`, và `card-column`.
## 1. Grouping/Nesting Cards
Group Cards chính là hiển thị 1 nhóm Cards cùng kích thước. Để làm được điều đó thì nó đã sử dụng thuộc tính `display:flex`, các cards sẽ được đặt trong thẻ `<div>` với class `card-group`.
{@codepen: https://codepen.io/uet-boo/pen/JBEZLy}
## 2. Card decks
Tương tự như ví dụ trên, các bạn chỉ cần thay class `card-group` thành `card-deck`. Với card-group các card sẽ gắn liền nhau, còn card-deck sẽ có thêm khoảng cách giữa các card.
## 3. Card Columns

Cũng giống như Card group và Card deck, chúng ta cũng chỉ cần đặt card vào trong thẻ `<div>` với class `card-columns`. Nó sẽ giúp ta tạo ra 1 layout theo kiểu Masonry layout. Ưu điểm của masonry layout là nó thể hiện được nhiều hình ảnh với kích cỡ khác nhau mà không tạo ra sự lộn xộn đối với người xem.
![](https://images.viblo.asia/56874e97-b16e-4c2c-a11d-d475a70124ae.png)
# Kết luận

Tóm lại, với Bootstrap Card Component, các bạn đã có thể tạo ra một trang web hiện đại mà không cần phaỉ đi quá sâu vào tìm hiểu CSS. Bạn cũng có rất nhiều option để chọn lựa và tự customize theo ý thích của mình.
Bootstrap vẫn làm 1 framework mạnh mẽ nhất dành cho tất cả mọi người.
> Tham khảo:
> https://getbootstrap.com/docs/4.0/components/card/