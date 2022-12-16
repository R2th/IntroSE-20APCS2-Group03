**BEM** viết tắt của **Blocks**, **Elements**, **Modifiers**, là một phương pháp đặt tên class cho HTML và CSS. Được phát triển giúp lập trình viên hiểu rõ hơn mối quan hệ giữa HTML và CSS trong dự án front-end. **BEM** rất dễ tìm hiểu và sử dụng, tuy nhiên những "newbie" vẫn hay mắc phải 1 trong các lỗi dưới đây:

# 1. Nhiều "con cháu"
```
<div class="card">
    <div class="card__header">

        <h2 class="card__header__title">Title text here</h2>

    </div>
    <div class="card__body">

        <img class="card__body__img" src="some-img.png">

        <p class="card__body__text">Lorem ipsum dolor sit amet, consectetur</p>
        <p class="card__body__text">Adipiscing elit.
            <a href="/somelink.html" class="card__body__text__link">Pellentesque amet</a>
        </p>

    </div>
</div>
```

- Xem ví dụ trên ta dễ dàng nhận thấy các thẻ `h2`, `img`, `p`, `a` có `class` được viết theo quy tắc **`BEM`**. Tuy nhiên các class cha đều được liệt kê dẫn xuất vào các class này, làm cho tên class khá dài và khó đọc.

- Quy ước cho bản thân là mỗi class chỉ có **1 dấu gạch dưới kép**, trừ những trường hợp layout quá phức tạp mới sử dụng nhiều hơn. Nhưng với ví dụ trên, chúng ta hoàn toàn chỉ sử dụng 1 dấu gạch dưới duy nhất và được viết lại như sau:
```
    
<div class="card">
    <div class="card__header">
        
        <h2 class="card__title">Title text here</h2>
    
    </div>
    <div class="card__body">
        
        <img class="card__img" src="some-img.png">
        
        <p class="card__text">Lorem ipsum dolor sit amet, consectetur</p>
        <p class="card__text">Adipiscing elit.
            <a href="/somelink.html" class="card__link">Pellentesque amet</a>
        </p>

    </div>
</div>
```
- Bây giờ thì trông gọn gàng, sạch sẽ hơn nhiều rồi phải không, chúng ta tìm hiểu sang ***sai lầm thứ 2*** nhé.

# 2.  Thành phần chồng chéo...thành phần
- Cũng là ví dụ trên, nhưng bây giờ chúng ta có thêm 1 **`button`** đã có class `.button` và class modifier `.button--primary`. Code được viết lại như sau:
```
<div class="card">
    <div class="card__header">

        <h2 class="card__title">Title text here</h2>

    </div>
    <div class="card__body">

        <img class="card__img" src="some-img.png">

        <p class="card__text">Lorem ipsum dolor sit amet, consectetur</p>
        <p class="card__text">Adipiscing elit. Pellentesque.</p>

        <button class="button button--primary">Click me!</button>

    </div>
</div>
```
- Các `Button` này có chung style trên toàn bộ trang web của chúng ta, tuy nhiên **chỉ trong `component` `card`** này chúng ta muốn thay đổi 1 chút về kích thước, màu sắc hay kiểu dáng của button, chúng ta có giải pháp dùng **BEM element**:
```
<div class="card">
    <div class="card__header">
        
        <h2 class="card__title">Title text here</h2>
    
    </div>
    <div class="card__body">
        
        <img class="card__img" src="some-img.png">
        
        <p class="card__text">Lorem ipsum dolor sit amet, consectetur</p>
        <p class="card__text">Adipiscing elit. Pellentesque.</p>
        
        <button class="button button--primary card__button">Click me!</button>

    </div>
</div>
```
- Cách này giải quyết được các vấn đề mà chúng ta mong muốn, nhưng các `class` của `button` bây giờ nhìn rất rối bời. Bạn nên đề xuất với anh chàng thiết kế và đề nghị chỉnh sửa lại button cho đồng bộ trong toàn trang web, tuy nhiên điều này rất khó xảy ra nhưng tôi tin bạn làm được. :D

# 3. Thêm modifier hay tạo component mới?
- Một trong những vấn đề lớn nhất là quyết định kết thúc một **component** và tạo ra một component. Tùy vào sự giống nhau, khác nhau giữa 2 component mà bạn lựa chọn tạo **modifier** thay vì **component** mới.

- Cách tốt nhất nếu không chắc chắn, bạn hãy làm việc với các **dev** hoặc **designer** để tham khảo ý kiến của họ. Bỏ ra một vài phút và thảo luận về nó. Những dev có kinh nghiệm sẽ có những lời khuyên bổ ích, và những designer sẽ cho bạn cái nhìn tổng quan hơn về các thành phần có trong trang web của bạn. Từ đó bạn sẽ có quyết định đúng đắn.

# 4. Làm thế nào để handle trạng thái
- Đây là một vấn đề phổ biến, đặc biệt là khi tạo kiểu cho một component ở trạng thái **active**. Bạn có hai lựa chọn, một là set trạng thái độc lập hoặc sử dụng BEM với modifier:

```
<div class="card is-active">
    [ ... ]
</div>

hoặc

<div class="card card--is-active">
    [ ... ]
</div>
```
- Nếu bạn tạo modifier cho component card, tất cả những component có trạng thái active sẽ được áp dụng, chúng ta dễ dàng quản lý trạng thái này. Tuy nhiên, nếu 1 component khác khi có trạng thái active cũng tương tự component card thì cách đặt tên theo BEM modifier là không tối ưu.
- Tương tự như vấn đề thứ 3 đã nêu, tùy vào bố cục layout và mục đích sử dụng mà chúng ta sử dụng BEM một cách hợp lý nhất


# 5. Tham khảo
- https://en.bem.info/
- https://medium.com/