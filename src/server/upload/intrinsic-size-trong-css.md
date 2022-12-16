# Tìm hiểu về Intrinsic Size trong CSS
## 1. Lời giới thiệu:
Xin chào anh em, hôm nay mình sẽ viết bài chia sẻ kiến thức mà mình đã tìm hiểu được trong thời gian qua. Thì hôm nay mình xin được viết về sự khác nhau giữa min-content, max-content, fit-content trong width.
![](https://images.viblo.asia/d9750d73-794e-4784-8cf7-69f51466d7de.png)



## 2. Các khái niệm:
Chúng ta sẽ đi qua 3 khái niệm cơ bản trong phần này. Đó chính là min-content, max-content và cuối cùng là fit-content.

1. Min-content:
     Đầu tiên chúng ta hãy thử 1 ví dụ:
    Giả sử chúng ta có 1 thẻ div có class là box có nội dung: “ Intrinsic Size in CSS ”.
    Thì sẽ có kết quả như sau:
    ![](https://images.viblo.asia/067cc9bc-5e93-4288-8762-544533fba71e.PNG)
Lúc này độ rộng của class box chính là bằng độ rộng của chữ “Intrinsic”. 
Vậy min-content chính là độ rộng của chữ dài nhất trong thẻ.

2. Max-content:
    Giả sử chúng ta cũng xài ví dụ như lúc nãy nhưng với width là max-content thì ta sẽ được kết quả:
    ![](https://images.viblo.asia/55890c78-37cf-4fb1-8552-038cf020e651.PNG)
Như các bạn đã thấy lúc này độ rộng của class box chính là độ rộng của toàn bộ nội dung trong thẻ. 
Độ rộng lúc này không phụ thuộc vào thẻ cha chứa nó. Để chứng minh ta có ví dụ như sau:
![](https://images.viblo.asia/2f10ab0e-75f0-47d9-b27f-77e63c46b6ee.PNG)
Lúc này thì nội dung của class box đã tràn ra khỏi thẻ cha wrapper chứa nó và độ rộng vẫn chính là độ rộng của toàn bộ nội dung trong thẻ đó và khi nội dung quá dài sẽ khiền trình duyệt xuất hiện scroll ngang. Vậy không để trường hợp đó xảy ra ta sẽ đến với khái niệm thứ 3. Đó chính là fit-content.
3. Fit-content:
Vẫn ví dụ đó nhưng ta sẽ thay đổi 1 chút trong css. Và ta sẽ được kết quả như sau:![](https://images.viblo.asia/88eb69f9-02de-4357-a25d-86604ef4a3c7.PNG)
Vậy fit-content nghĩa là nếu nội dung không còn đủ chỗ nữa thì nó sẽ xuống hàng. Kích thước sẽ phụ thuộc vào thẻ cha chứa nó.

## 3. Lưu ý:
Sau đây là danh sách trình duyệt cũng như các phiên bản hỗ trợ Intrinsic Size:
![](https://images.viblo.asia/0b037820-996d-4e46-b10b-d57f091816a7.PNG)

## 4. Kết luận:
Vậy thông qua kiến thức mình tìm hiểu được và chia sẻ cho các bạn thì mình hy vọng nó sẽ giúp các bạn phần nào trong việc học tập. Cảm ơn các bạn đã đọc bài chia sẻ của mình.

## 5. Tham khảo:
* https://ishadeed.com/article/intrinsic-sizing-in-css/
* https://www.youtube.com/watch?v=24pBTtaCYIQ&t=356s
* https://caniuse.com/intrinsic-width