# CSS-Contain là gì
Mục tiêu chính của CSS Contaiment là cải thiện hiệu suất khi render trên các trang web, cho phép tách một phần tử khỏi phần còn lại của trang. Hãy cùng tìm hiểu về thuộc tính này xem tại sao nó lại cải thiện được hiệu năng  của những website phức tạp. Hãy thử tưởng tượng bạn có một nùi HTML tạo ra sự cồng kềnh trong DOM, nhưng bạn lại biết được một vài phần trong đống HTML đó lại độc lập hoàn toàn với phần còn lại của trang và nội dung của những phần đó thì được thay đổi lúc này lúc khác.

Các công cụ trình duyệt thường cố gắng tránh làm nhiều công việc hơn mức cần thiết và sử dụng một số phương pháp phỏng đoán để tránh mất nhiều thời gian load hơn yêu cầu. Tuy nhiên, có rất nhiều trường hợp phức tạp trong đó trình duyệt cần thực sự tính toán lại toàn bộ trang web. Để cải thiện tình trạng này, chúng ta phải có thể dùng thuộc tính `contain` để xác định những phần là phần phụ của trang web và tách biệt nó khỏi phần còn lại của trang. Sau đó, khi có một số thay đổi trong một số các nhánh con đó, trang web sẽ chỉ làm việc trong nhánh đó còn những phần tử còn lại sẽ giữ nguyên.
# Thuộc tính của CSS Containment

CSS Containment  định nghĩa 4 giá trị của thuộc tính `contain` 

- `layout`: Bố cục bên trong của phần tử hoàn toàn tách biệt với phần còn lại của trang, nó không bị ảnh hưởng bởi bất cứ thứ gì bên ngoài và nội dung của nó không thể có bất kỳ ảnh hưởng nào đến phần tử cha.
- `paint`: Những phần tử con của những phần tử không được hiện thị bên ngoài, không có gì có thể tràn ra phần tử này (hoặc nếu có thì nó cũng không thể nhìn thấy được)
- `size`: Kích thước của phần tử có thể được tính mà không cần kiểm tra các phần tử con của nó, kích thước phần tử độc lập với nội dung của nó.
- `style`: The effects of counters and quotes cannot escape this element, so they are isolated from the rest of the page. Hiệu ứng của bộ đếm và quotes không thể thoát khỏi yếu tổ này, vì vậy chúng được độc lập với phần còn lại của trang

Bạn có thể kết hợp các loại containment khác nhau theo ý muốn, nhưng theo đó bạn có thể dùng 2 giá trị `shorthand` này cho bốn loại kia:

- `content`: layout paint style.
- `strict`:  layout paint size style.

# Ví dụ về CSS Containment
Hãy tưởng tượng một trang chứa toàn những phần tử này, trong trường hợp dưới đây là 10,000 phần tử chẳng hạn

``` 
<div class="item">
    <div>Lorem ipsum...</div>
</div> 
```

Nếu bạn không sử dụng css-contain, thì trang web sẽ phải tốn rất nhiều thời gian cho layout bởi vì nó sẽ phải đi toàn bộ cây DOM (trong trường hợp này là tận... 10,000 phần tử)

![Ví dụ về CSS Containment trong DOM](https://images.viblo.asia/09a1cf29-a2f5-469f-ac35-3ecb467e9f9d.png)

Trong ví dụ này, mục DIV có kích thước cố định và nội dung chúng tôi thay đổi trong DIV bên trong sẽ không bao giờ bị tràn ra. Vì vậy, chúng ta có thể áp dụng `contain`: trình duyệt không cần phải truy cập vào các nút còn lại khi có gì đó thay đổi bên trong item, nó có thể ngừng kiểm tra mọi thứ trong thành phần đó.

Lưu ý rằng nếu nội dung bị tràn ra ngoài thì nó sẽ bị cắt bớt, nếu chúng ta không đặt kích thước cố định cho mục đó, nó sẽ được hiển thị dưới dạng một hộp trống để không có gì có thể nhìn thấy (thực tế trong ví dụ này sẽ có đường viền nhưng chúng sẽ là thứ duy nhất có thể nhìn thấy).

![Ví dụ về CSS Containment](https://images.viblo.asia/47a699d6-6015-4b56-9f4a-666acec57e46.png)

Và với ví dụ ở trên khi sử dụng CSS Containment, thời gian render giảm từ ~ 4ms xuống ~ 0,04ms, một sự khác biệt rất lớn. 

# Browser support
![](https://images.viblo.asia/b1e54c68-9271-4bf5-bfb2-cb72bb422004.png)

Trước khi kết thúc, có một điều mà các bạn cần phải lưu ý đó chính là Browser support - trình duyệt hỗ trợ.  Containment specification giờ đã trở thành một trong những W3C Recommendation - đo lường web tiêu chuẩn. Và một điều nữa là người dùng hoàn toàn không thấy sự khác biệt khi có và không có thuộc tính này. Nên dù trình duyệt có hỗ trợ hay không thì người dùng vẫn sẽ có trải nghiệm bình thường ở mặt hiển thiện, có khác biệt thì chỉ là khác biệt hiệu năng mà thôi.

<hr>
Bài viết có tham khảo tại: https://blogs.igalia.com/mrego/2019/01/11/an-introduction-to-css-containment/