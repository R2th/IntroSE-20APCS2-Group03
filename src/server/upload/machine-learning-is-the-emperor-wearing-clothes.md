Bài viết được dịch từ ngồn: https://hackernoon.com/machine-learning-is-the-emperor-wearing-clothes-59933d12a3cc

Một cái nhìn về cách hoạt động của `machine learning`

`Machine learning` sử dụng các mẫu dữ liệu để `label thing` mọi thứ. Nghe có vẻ kỳ diệu? Các khái niệm cốt lõi thực sự rất đơn giản.

Ví dụ `label thing` của chúng tôi sẽ liên quan đến việc phân loại rượu là ngon hoặc không ngon và chúng tôi sẽ giữ tất cả các ý tưởng đơn giản, đủ để thưởng thức cùng với một ly rượu vang.

## How does it work?

![](https://images.viblo.asia/7ac9d5d2-4d65-41a1-abdf-1cda82ed0a49.png)

`Machine learning` không phải là gì quá cao siêu.

## Data

Để tìm hiểu, bạn cần một cái gì đó để học hỏi. Hãy tưởng tượng tôi đã nếm thử 50 loại rượu vang. Mỗi loại rượu có độ tuổi trong năm và điểm đánh giá, cộng với các câu trả lời đúng mà chúng tôi đang cố gắng tìm hiểu: Y cho ngon và N không quá ngon.

![](https://images.viblo.asia/eaffe930-a262-4a32-b0e5-cc8f9c8a968f.png)

Sau khi tôi nếm thử các loại rượu vang và ghi lại dữ liệu của họ trong một bảng tính (bên trái), để dễ hiểu hơn, tôi hiển thị thông tin cho bạn theo một định dạng thân thiện hơn (bên phải).

## Algorithm

Bằng cách chọn thuật toán `Machine learning` để sử dụng, chúng tôi sẽ chọn loại công thức. Tại sao bạn không phải là thuật toán của tôi? Toàn bộ công việc của bạn là tách những thứ màu đỏ khỏi màu xanh (tìm ra một đường ranh giới - đơn giản là như vậy). Bạn có thể làm được không?

Mục đích của thuật toán `Machine learning` tìm ra một đường ranh giới cho bộ dữ liệu của bạn.

![](https://images.viblo.asia/5423ca3b-05b3-47cb-acc9-4e00967a32ad.png)

Nhưng đường phân chia của bạn như thế nào? Tôi hy vọng bạn đồng ý rằng một đường thẳng không phải là một giải pháp thông minh. Mục tiêu của chúng tôi là tách Y khỏi N.

Mục đích của thuật toán là chọn nơi hợp lý nhất để đặt đường phân chia, và nó quyết định dựa trên nơi datapoint của bạn đã xác định. sao làm được vậy? Bằng cách tối ưu hóa một `objective function`.

## Optimization

Tôi dự định sẽ tối ưu hóa bài đăng trên blog của riêng mình, nhưng bây giờ nghĩ về nó như thế này: `objective function` giống như quy tắc ghi bàn trò chơi, tối ưu hóa nó là tìm cách chơi để bạn kiếm được điểm số tốt nhất có thể.

Một chức năng mục tiêu giống như hệ thống điểm cho một trò chơi hội đồng quản trị.

Theo truyền thống trong `Machine learning`, chúng tôi thích gậy nhiều hơn cà rốt - điểm là hình phạt cho những sai lầm và trò chơi là để có được càng ít điểm xấu càng tốt. Đó là lý do tại sao `objective function` trong `Machine learning` có xu hướng và mục tiêu là giảm thiểu tổn thất.

`The loss function` cũng giống như quy tắc cho điểm một trò chơi hội đồng quản trị, tối ưu hóa nó là tìm ra cách chơi để bạn có được điểm số tốt nhất có thể.

Giải pháp bạn đến là hy vọng một cái gì đó như thế này:

![](https://images.viblo.asia/a65f21ad-4354-416d-adbf-f07108192685.png)

Trong hình ảnh tận cùng bên trái, nó không được tốt lắm. Hy vọng rằng bạn sẽ đồng ý rằng hình ở giữa tốt hơn một tẹo, nhưng nó vẫn không phù hợp tốt nhất có thể. Hình ảnh tận cùng bên phải là phương án tốt nhất.

## The spice of life

Nếu bạn thích sự đa dạng, bạn sẽ yêu thích các thuật toán. Có rất nhiều người trong số họ. Một cách khác biệt với nhau là cách họ thử trên các vị trí khác nhau cho ranh giới tách biệt.

Các `nerds` tối ưu hóa sẽ cho bạn biết rằng việc xoay đường phân chia với những gia số nhỏ xíu, và có nhiều cách tốt hơn để có được vị trí tối ưu nhanh hơn. Một số nhà nghiên cứu dành cả cuộc đời của họ để tìm ra cách để có được thuật toán tốt để tìm ra đường ranh giới.

Một nguồn khác là hình dạng của ranh giới. Hóa ra đường phân chia không cần thẳng. Các thuật toán khác nhau sử dụng các loại đường phân chia khác nhau.

![](https://images.viblo.asia/8a69312f-fd74-43a0-b065-64c7ae9441d7.png)

Khi chúng tôi chọn những tên `gobbledygook` này, chúng tôi chỉ đơn giản là chọn hình dạng của ranh giới mà chúng tôi đang vẽ giữa các nhãn. Chúng ta có muốn tách chúng ra bằng một đường chéo hay nhiều đường ngang / dọc hay các `squiggler` linh hoạt ... hay cái gì khác? Có rất nhiều và rất nhiều thuật toán để chọn.

## Algorithms for hipsters

Những đường ranh giớ có thể có hình dạng linh hoạt (bạn có thể biết đây là mạng thần kinh, chúng được đặt tên `yoga network` hoặc `many-layers-of-mathematical-operations`).

![](https://images.viblo.asia/701da453-0e8b-49ce-89c4-beb757f70fa4.png)

Mạng thần kinh có thể được gọi là `yoga network` - sức mạnh đặc biệt của chúng mang lại cho bạn một ranh giới rất linh hoạt.

Những tên thuật toán `gobbledygook` cho bạn biết hình dạng của đường phân chia mà họ sẽ cố gắng đưa vào dữ liệu của bạn. Nếu bạn là một người đam mê `Machine learning`, bạn không cần phải ghi nhớ chúng - thực tế bạn sẽ chỉ đẩy dữ liệu của mình qua nhiều thuật toán nhất có thể và lặp lại.

![](https://images.viblo.asia/a49c8d35-131d-4b47-84a8-1ccec2de5490.png)

Ngay cả khi bạn nghiên cứu sách giáo khoa, bạn sẽ không nhận được giải pháp ngay trong lần thử đầu tiên của mình. Đây không phải là một trò chơi có một câu trả lời đúng và không ai nhận được giải pháp của họ trong lần thử đầu tiên.

## Label

Một khi bạn đưa mô hình mới pha vào sản xuất, bạn sử dụng nó bằng cách cho máy tính pha chế và điểm đánh giá. Hệ thống của bạn tra cứu vùng nào tương ứng với và nó xuất ra một nhãn.

![](https://images.viblo.asia/28b8ec87-dd13-4289-b98a-90e953a9d0eb.png)

Khi tôi nhận được bốn chai rượu mới, tôi chỉ đơn giản là khớp dữ liệu đầu vào của họ với vùng màu đỏ và xanh của công thức và gắn nhãn cho phù hợp. Xem? Dễ thôi!

Làm thế nào để chúng ta biết nếu nó hoạt động? Bằng cách kiểm tra đầu ra!

Kiểm tra hệ thống của bạn bằng cách chạy một loạt dữ liệu mới thông qua nó và đảm bảo nó hoạt động tốt trên đó. Trong thực tế, làm điều đó anyway, bất kể một thuật toán hoặc một lập trình viên đã đưa ra công thức đó cho bạn.

## Summary

Dưới đây là tóm tắt trực quan hữu ích cho bạn từ một bài viết khác của tôi:

![](https://images.viblo.asia/c2cc11b5-1d30-41a0-ba97-ab835e66c4d8.png)

## Is this all there is to it?

`Machine learning` có thể mang tính `prosaic`, nhưng những gì bạn có thể làm với nó thật đáng kinh ngạc! Nó cho phép bạn code mà không cần code, cho phép bạn tự động hóa việc không thể thực hiện được. Đừng ghét nó vì đơn giản.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.