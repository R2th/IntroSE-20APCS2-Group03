Trong bài viết này, tôi sẽ giải thích về Generator JavaScript và cách chúng sử dụng bộ nhớ so với các hàm JavaScript thông thường.

Hầu như mọi lập trình viên đều gặp phải vấn đề lặp đi lặp lại trên một số lượng lớn các item (chẳng hạn như 1 tập collection các articles, images, database record, v.v.). 
Và mọi thứ đều ổn cho đến khi server hoặc browser của chúng ta nói: "Hey, bạn đang làm gì vậy? Làm ơn, tôi đang cố xử lý quá nhiều, làm ơn giúp tôi". =) 

Trước hết, tôi muốn nói rằng đây không phải là một hướng dẫn đầy đủ cho JavaScript Generator. Đó chỉ là kinh nghiệm của tôi được giải thích ở đây.

Js Generator là gì? Nó là một hàm có thể trả về một giá trị và sau đó tiếp tục thực hiện hàm sau đó. Trong khi một hàm JS thông thường sử dụng một `return` toán tử, thì hàm generator sử dụng một `yield` toán tử. Đây là một ví dụ (chú ý đến dấu hoa thị trước tên hàm):

Hàm generator này trả về tất cả số interger từ 0 đến N
![](https://miro.medium.com/max/524/1*6vN6LG-NZONHPhNx_iLw-g.png)

Nếu chúng ta gọi hàm với bất kỳ đối số nào, nó sẽ trả về một iterator, không phải là một giá trị như chúng ta mong đợi.
![](https://miro.medium.com/max/415/1*Oodn654VYkH7MzVTW2zI9w.png)

Để có được giá trị, chúng ta sẽ gọi `next()` phương thức của đối tượng iterator.
![](https://miro.medium.com/max/372/1*qESyoRlLE9XpvJBeJPuTdw.png)


Như bạn có thể thấy, kết quả hiện tại được giữ trong thuộc tính `value` của đối tượng được trả về. Ngoài ra, có một thuộc tính `done` cho biết chức năng của generator function đã hoàn thành công việc của nó hay chưa.

Trong hàm ví dụ ở trên, chúng tôi đã chỉ định `4` làm đối số cho hàm generator của chúng tôi và đó là lý do tại sao hàm sẽ tiếp tục trả về các giá trị từ 0 đến 4 cho mỗi lệnh gọi của phương thức `next()`.

![](https://miro.medium.com/max/534/1*9-JjJoW2BMavqABAE-Te-w.png)


Bây giờ tôi muốn cho bạn thấy so sánh của một hàm generator và một hàm thông thường trong một vòng lặp `for` trên một số lượng lớn các item.
Giả sử chúng ta cần lặp lại một số lượng lớn các số ngẫu nhiên và làm một cái gì đó với mỗi số. Trong một hàm JavaScript bình thường, nó sẽ có dạng như dưới đây:

![](https://miro.medium.com/max/700/1*Lo621YlXrgybb4I7zxNWIA.png)


Để làm điều tương tự với hàm generator, chúng tôi sẽ sử dụng mã sau:

![](https://miro.medium.com/max/631/1*kKgfmhc3pnfp8j6aSQjFmA.png)

Để kiểm tra cả hai chức năng, tôi sẽ tạo một phương thức `main()` sẽ kiểm tra mức độ sử dụng bộ nhớ đã thay đổi sau mỗi lần lặp qua các item.
![](https://miro.medium.com/max/700/1*KcYVF03wKV-bWQ7jPaKq4A.png)

Tôi đã tính toán mức sử dụng bộ nhớ với một hàm đơn giản sử dụng thuộc tính  `performance` của đối tượng `window`:
![](https://miro.medium.com/max/700/1*WbLQc16m3seYvpqCi6jUyA.png)

Bây giờ hãy gọi phương thức `main()` của chúng ta với hàm thông thường và hàm generator để tính toán mức sử dụng bộ nhớ của từng loại.

Đầu tiên chúng ta chạy với hàm JS thông thường `main(bigAmountOfItems, 2000000)`.

![](https://miro.medium.com/max/540/1*s-JmrRBfmkywEExlOilrFA.png)

Tiếp theo sẽ thực thi với hàm generator `main(bigAmountOfItemsGenerator, 2000000)`.

![](https://miro.medium.com/max/576/1*6MsxQOCEbX8F3qEje5C8Cg.png)

Như bạn có thể thấy, hàm JS thông thường cho thấy mức tăng bộ nhớ ~ 46,5 kilobyte trong khi mức tăng của hàm generator chỉ là ~ 0,125 kilobyte . Điều này là do chúng tôi không cần giữ tất cả 2000000 item trong RAM với chức năng generator. Iterator cho phép chúng ta theo dõi current iterator item và tiếp tục trả lại item tiếp theo cho đến khi kết thúc.

Đó là điểm quan trọng cho phép các nhà phát triển tiết kiệm bộ nhớ và theo dõi các biến cục bộ hoặc các vòng lặp bên trong giữa hàm generator mà không cần outer code để biết bất cứ điều gì về logic bên trong của hàm.

Ngoài ra, các trình duyệt làm việc với `async / await` thông qua generator và promises. Nhưng đó là một chủ đề cho một bài viết khác :) Tôi hy vọng bạn có một cái gì đó hữu ích từ câu chuyện này. Cảm ơn vì đã đọc!

Bài viết được lược dịch từ: https://levelup.gitconnected.com/how-i-met-your-javascript-generators-reduce-memory-used-on-your-browser-and-server-8ed2c5077d5c