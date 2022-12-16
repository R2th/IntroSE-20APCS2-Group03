# Float - liệu có dễ học?
## Mở đầu
Việc học HTML, CSS là những nền tảng căn bản trên con đường  trở thành một Web developer chuyên nghiệp. Trong đó, việc nắm được các thuộc tính CSS cơ bản là rất quan trọng. Hôm nay, chúng ta cùng tìm hiểu về một thuộc tính rất hay dùng nhưng cũng khá trừu tượng trong CSS, đó là thuộc tính Float.
## Tìm hiểu
+ Thuộc tính Float được dùng để làm gì? Hãy cùng xem hình ảnh sau<br><br>
![Menu sử dụng float property](https://images.viblo.asia/03062ea0-9605-4155-a5b3-20e1e7a44f88.jpg)<br>
Đây chính là ứng dụng của Float property trong thiết kế menu trang web. <br><br><br>
+ Còn đây là một ví dụ khác về chia phần hiển thị nội dung trên trang web. Khi chưa dùng Float<br><br>
![](https://images.viblo.asia/6d6ba896-1bd2-4f4f-9dae-7a44a1c16ba9.png)<br><br>
+ Khi đã dùng Float<br><br>
![](https://images.viblo.asia/b0f8c9b8-0791-426c-8f19-221b17df7975.png)<br><br>
Như vậy, ta phần nào hiểu được tác dụng của thuộc tính này trong quá trình xây dựng Front-end. Vậy thuộc tính Float hoạt động như thế nào? Trả lời được câu hỏi này bạn sẽ kiểm soát được bố cục trang web một cách cực kì dễ dàng.<br><br>
Ta biết rằng từ "float" có nghĩa là "nổi". Một trang HTML thông thường được trình bày theo dạng flow, tức là giống như một văn bản vậy, từng đoạn 1 xếp chồng lên nhau, cái nào viết trước nằm ở trên. Tuy nhiên, khi thiết kế bố cục website, có những phần tử không chỉ phân bố theo chiều dọc, mà còn theo chiều ngang, như ví dụ trên. Thuộc tính Float ra đời vì mục đích đó.<br>
Thuộc tính Float có 5 giá trị:  none, left, right, initial và inherit. Trong đó, giá trị *left* và *right* được sử dụng nhiều nhất.<br>
Khi một phần tử nào đó được áp dụng thuộc tính Float, nó nổi lên trên so với trang HTML (coi như nó tàng hình vậy). Lúc này, trang HTML sẽ coi như phần tử này không hề tồn tại, và chuyển các phần tử ở phía dưới lên thế chỗ nó. <br>
+ Cùng xem ví dụ dưới đây<br><br>
![](https://images.viblo.asia/0fa2be2a-5677-4788-ab21-cbb13e67d5a8.png)<br>
Bố cục theo định dạng flow thông thường. Box 1 có thuộc tính Opacity (có thể nhìn xuyên thấu)<br><br><br>
![](https://images.viblo.asia/ae3c104c-9a0c-42b4-97d0-dfd099200346.png)<br>
Sau khi Box 1 được áp dùng thuộc tính `float: left;`<br>
Lúc này trang HTML sẽ coi Box 1 không hề tồn tại, và các nội dung phía dưới sẽ di chuyển lên. Box 2 bây giời đã chiếm vị trí của Box1(Box 2 màu hồng thẫm do Box 1 bên trên có thuộc tính opacity).<br><br>
*Note: Nội dung bên trong của phần tử mà chiếm vị trí phần tử được float sẽ không đi theo nó. Như hình trên, Box 2 chứa một đoạn text, nhưng sau đó nó không hề đi cùng Box 2 mà ở phía ngay dưới.*<br><br><br>
+ Bây giờ, khi ta cùng áp dụng `float: left;` cho cả 3 box thì sao, hãy xem<br><br>
![](https://images.viblo.asia/2639f49d-8839-4035-bf5d-f4fecccef617.png)<br>
Lúc này, cả 3 box đã nổi lên trên so với trang HTML. Đây chính là cách thiết kế menu ngang từ một danh sách không có thứ tự (thẻ ul).<br><br>
*Note: `float: left;` nghĩa là "nổi" sang bên trái, `float: right;` là "nổi" sang bên phải.*<br>
## Kết
Thuộc tính Float được sử dụng rất nhiều trong thiết kế website, vì vậy việc làm chủ được nó sẽ trở nên rất hữu ích cho bạn đấy!<br>
Bài sau ta sẽ tìm hiểu về thuộc tính Clear, đây là anh bạn thân của thuộc tính Float, giúp cho việc kiểm soát bố cục trang web dễ dàng hơn nữa, cùng đón xem nhé!