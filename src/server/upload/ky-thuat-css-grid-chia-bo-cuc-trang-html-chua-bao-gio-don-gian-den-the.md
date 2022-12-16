# Mở đầu 
Xin chào mọi người hôm nay mình sẽ giới thiệu đến mọi người một kĩ thuật chia bố cục cho trang html mà mình cũng mới tìm hiểu được và thấy nó khá hay ho  :D. Sau đây mình sẽ chỉ ra một vài lý do vì sao mình chọn `css grid`.

Nói đến chia bố cục thì ngày xưa mọi người sẽ nghĩ  đến `float` đúng không  nhưng float có một hạn chế đó là sập độ cao, và chúng ta cần thêm 1 bước để giải quyết vấn đề này là sử dựng thuộc tính clear: both được định nghĩa trong class .clearfix. Hay là kĩ thuật phân trang bằng html table những mà kĩ thuật đó đến giờ cũng không còn được ưu tiên sử dụng nữa :v .Có một kĩ thuật mới hơn đó là `display flex`  mà mình cũng có một bài giới thiệu tuy nhiên việc flex hiệu quả trong việc phân chia thẳng hàng còn phân chia theo luới thì nó cũng chưa thật sự tốt, rồi việc phân chia các phần tử chiếm bao nhiêu thì lại cần thêm `flex grow`. Vậy để xem `css grid` sẽ giúp ích chúng ta như thế nào nhé. Bắt tay vào làm luôn nhé

# Chuẩn bị 
để tìm hiểu `css grid` đầu tiên bạn phải có 1 thẻ div bao ngoài. ở đây mình có 1 thẻ div có class là container và các thẻ div con bên trong nó như sau: 
```php
    <div class="container">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
    </div>
```
và một chút css ban đầu 
```php
    .container {
        display: grid;
        max-width: 960px;
        margin: 0 auto;
    }	
    .container div {
        background: #3bbced;
        padding: 30px;
    }
    .container div:nth-child(even) {
        background: #f75f5d;
        padding: 30px;
    }
```
`nth-child(even)` ở đây là  để lựa chọn các phần tử chẵn và mình sẽ để cho nó có màu khác với các phần tử lẻ. vậy là mình đã chuẩn bị xong, mình mở trình duyệt lên để xem các phần tử đang hiển thi như thế nào, và đây là kết quả:
![](https://images.viblo.asia/86caa80f-0743-461b-ba84-91878dbcfc56.png)

##  Phân chia theo cột 
Ở đây phân chia theo cột sẽ có các cách như sau :

 `grid-template-columns: 33.3% 33.3% 33.3%;` 
 
 Ở đây mình chia làm 3 cột mỗi cột chiếm 33,3%
 
 `grid-template-columns: 1fr 1fr 1fr;`  
 
 fr là một đơn vị mới các bạn có thể tham khảo ở bài viết [này](https://viblo.asia/p/gioi-thieu-ve-don-vi-fr-trong-css-m68Z0NWj5kG) nó cũng chia làm 3 cột với độ lớn bằng nhau. Một cách nữa là 
 
 `grid-template-columns: repeat(3, 1fr);`
 
 hoặc 
 
 `grid-template-columns: repeat(3, 33.3%);`
 
 nói rằng giá trị 33.3% hay `1fr` được lặp 3 lần tạo ra cho chúng ta 3 cột tương đương. Tất cả các cách ở trên đều cho ra một kết quả
 ![](https://images.viblo.asia/3980e064-7e49-49db-9a44-ae30db9d25c6.png)
Các bạn có thể tùy chọn chia số cột tùy theo ý mình. Tiếp theo là phân chia theo hàng
##  Phân chia theo hàng 
Các bạn có thể set chiều cao của các hàng bằng cách 
`grid-template-rows: 200px 100px 200px;`

các giá trị tương ứng với chiều cao của từng hàng. Lưu ý là kể cả nội dung có lớn hơn chiều dài chúng ta quy định thì nó vẫn được được giữ theo chiều dài mà chúng ta đã  đặt. Đây là kết quả 
![](https://images.viblo.asia/4807757e-2e5f-48a0-ab2c-aa579c74617a.png)
Nếu các  bạn muốn chiều cao các hàng bằng nhau thì chỉ cần 
`grid-template-rows: repeat(3, 200px);` 
Ở đây là 3 hàng có chiều cao bằng nhau và bằng 200px
 
 Ngoài ra  nó còn có thuộc tính `Gap` để tạo khoảng cách giữa các  cột hoặc hàng. Nó tiện hơn thuộc tính margin vì nếu bạn muốn 2 cột cách nhau 10px thì bạn phải để margin ở các cột là 5px. Còn ở đây bạn muốn khoảng cách bao nhiêu thì để là bấy nhiêu.
 
 Ví dụ  khoảng cách giữa các cột là 10px: `grid-column-gap: 10px;`
 
 Tương tự khoảng giữa các hàng là 10px: `grid-row-gap: 10px;`
 
 Kết quả đạt được :D 
 
 ![](https://images.viblo.asia/097f590f-2f36-4fbe-82cb-d96f2ea94124.png)

 ##  Grid Line
 Mình có như sau: 
 ![](https://images.viblo.asia/9c6b732a-766a-4148-9202-8187eaf92513.png)

Mình có 6 cột tương ứng sẽ có 7 Line, 1 hàng thì tương ứng có 2 Line. Bây giờ muốn phần từ đầu tiên chiếm từ line thứ nhất đến line thứ 3 thì bạn chỉ cần thêm css vào phần tử `1` đó như sau 

`grid-column: 1/3;` Nghĩa là phần từ đầu tiên sẽ chiếm từ vị trí line thứ nhất đến line thứ 3. Nó còn có ưu điểm là nó có thể đảo lộn được các vị trí của phần tử. Ví dụ như mình muốn phần tử thứ 4 nằm ở hàng thứ 2 thì chỉ  cần thêm css vào phần tử thứ tư là 

`  grid-row: 2;`

Ta được kết quả phần tử thứ nhất chiếm từ line 1 đến line thứ 3 và phần tử thứ 4 nằm ở hàng thứ 2 như sau: 
![](https://images.viblo.asia/52e43b9c-8ff9-49a9-991c-91c262e0d1b7.png)
##  Nested Grid
Cái này đơn giản là những phần tử con nằm bên trong phần tử cha có thuộc tính grid thì các phần tử con cũng có đầy đủ các thuộc tính của grid khi chúng ta khai báo cho nó là `display: grid;`

#Kết Luận
Bài viết cũng khá dài rồi nên mình xin phép được dừng lại ở đây và hẹn các bạn trong bài viết tiếp theo. Vì mình cũng mới tìm hiểu phần css grid này nên bài viết còn chỗ nào thiếu sót rất mong các bạn bỏ qua. Cảm ơn các bạn đã đọc :D

Tài liệu tham khảo: https://www.youtube.com/playlistlist=PLU4OBh9yHE974PC2SCIQOO0ZGg46Olq6l