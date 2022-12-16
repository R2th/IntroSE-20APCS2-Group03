Có lẽ câu hỏi phân biệt `position: relative` và `position: absolute` là câu hỏi khôn thể thiếu khi đi phỏng vấn front end. Mình thấy câu hỏi này không quá khó nhưng có khá nhiểu bạn không trả lời được hay trả lời sai vì đơn giản là lâu không động đến nên dễ lẫn lộn giữa 2 cái đó, mình cũng thế :sweat_smile::sweat_smile:. Vậy nên hôm nay mình quyết định viết 1 bài về các thuộc tính của `Position` để mọi người cùng lắm được và chủ yếu là để khi nào mình quên thì có thể lên đây xem lại :laughing::laughing:. Bắt đầu luôn nào.

# 1 Khái niệm
Thuộc tính `Position` xác định loại phương thức định vị được sử dụng cho một phần tử nó thường đi kèm với các thuộc tính khác như `left`, `right`, `top`, `bottom`.

 `Position`  có **5** giá trị :
 * static
 * relative
 * fixed
 * absolute
 * sticky
 
 Tuy nhiên trong phạm vi bài viết này mình chỉ tập trung vào 4 thuộc tính  `static`
  `relative` `fixed` `absolute`  và cùng xem `relaive` và `absolute` khác nhau như thế nào. Còn thuộc tính `sticky` phức tạp và ít được dùng hơn nên mình sẽ dành 1 bài riêng để nói về nói :D
#### position: static
Đây là giá trị hiển thị mặc định của `position`. Nó không bị ảnh hưởng bởi các thuộc tính `left`, `right`, `top`, `bottom`.
#### position: relative
Xác định vị  trí tuyệt đối của của thành phần, khi sử dụng thuộc tính này chúng ta sẽ sử dụng kèm với các giá trị `left`, `right`, `top`, `bottom`, và bạn chỉ có thể sử dụng nhiều nhất 2 giá trị lền kề nhau ví dụ như (botton, left), (left, top), (top, right), (right, botton)  nó cũng tương tự như hướng các hướng `tây nam`, `tây bắc` ,`đông bắc`, `đông nam` trog địa lý vậy  :joy::joy::joy:. 

**Một lưu ý** là: thuộc tính  `position: relative` sẽ **không** làm thay đổi tới việc hiển thị ban đầu, mình sẽ đi vào ví dụ luôn để chứng minh điểu mình nói.
Mình có mọt đoạn html và css như sau: 

**HTML**
```php
        <div class="container">
            <div class="item item-a" style="background-color: red"></div>
            <div class="item item-b" style="background-color: yellow"></div>
            <div class="item item-c" style="background-color: green"></div>
        </div>   
```
**css** 
```php
	                <style type="text/css">
                        .container {
                        width: 500px;
                        height: 250px;
                        border: 1px solid;
                        margin-left: 400px;
                        margin-top: 50px;
                        background-color: #0b7cde;
                        line-height: 60px;
                        }	
                        .item {
                        height: 60px;
                        width: 60px;
                        margin: 10px;
                        }
                    </style>
```

Và đây là kết quả trên màn hình: 

![](https://images.viblo.asia/26f4bab2-a9e7-4d9a-8cf6-c0c8f040f21b.PNG)

Bây giờ mình sẽ thêm thuộc tính `position: relative` và xét  cách trên 70px, trái 300px cho item màu vàng 
```php
                    position: relative;
                    top: 70px;
                    left: 300px;
```    
và đây là kết quả 

![](https://images.viblo.asia/db3c7292-76fc-450e-a4d7-d63a3b1382cf.PNG)

Như các bạn thấy thì item màu vàng đã dịch chuyển trên 70px, trái 300px và item màu xanh **không** dịch chuyển lên để lấp vào chỗ item màu vàng để lại.
#### position:  absolute
Xác định vị trí tương đối theo thẻ cha có thuộc tính là `position: relative` nếu thẻ cha không phải là `position: relative` thì nó sẽ được xác đinh theo thẻ body của trang web.

**Lưu ý** là: thuộc tính  `position: absolute` sẽ làm **thay đổi** tới việc hiển thị ban đầu

Tương tự như ví dụ trên mình cũng thêm  `position: absolute` và xét  cách trên 0px, phải
0px cho item màu vàng và thêm thuộc tính `position: relative` cho thẻ div container, ta được kết quả sau.

![](https://images.viblo.asia/761b70c5-1871-49ec-a847-675f5abdabf5.PNG)



Như các bạn thấy thì ngay khi xét lại vị trí của item màu vàng thì item màu xanh đã tràn lên vị trí của item màu vàng. Tiếp theo mình sẽ không để thuộc tính  `position: relative` cho thẻ div container để xem kết quả như thế nào nhé :D 

![](https://images.viblo.asia/ccd1c2ec-9561-4e96-ac66-5a7299c3c28c.PNG)

Do không có thẻ cha nào khai báo là `position: relative`  nên giá trị top và right của item màu vàng được xác định theo thẻ body của trang web 

#### position:  fixed
Xác định vị trí tương đối cho cửa sổ trình duyệt, có nghĩa là nó luôn ở một vị trí ngay cả khi trang được cuộn. Nó dùng các thuộc tính `left`, `right`, `top`, `bottom` để xác định vị trí. Ứng dụng điển hình của nó có thể kể ra như giữ thanh menu của các trang web không bị mất đi khi cuộn xuống xem các nội dung khác.

Đây là ví dụ về menu có dùng thuộc tính  `position:  fixed`

![](https://images.viblo.asia/66a0e31a-31be-4ac6-8a12-4abe2956f7cb.gif)

Còn đây là **không** dùng  thuộc tính  `position:  fixed`
![](https://images.viblo.asia/9754e7e9-9b8e-4cbf-ab1c-d20dea25a8cb.gif)

# Lời kết.
Vậy là mình đã cùng các bạn tìm hiểu về thuộc tính position và  và cùng xem `relaive` và `absolute` khác nhau như thế nào. Rất cảm ơn các bạn đã đọc.