# Đặt vấn đề
Hầu hết các ứng dụng web hiện nay đều xử lý số thập phân dưới một số dạng sau: Tiền tệ, tọa độ, đo lường, các hằng số toán học. Tuy nhiên, có thể bạn không biết, PHP không cung cấp một tiêu chuẩn rõ ràng dùng để xử lý với các trường hợp số thập phân mà yêu cầu có độ chính xác cao. Tất nhiên sẽ có những trường hợp mà độ chính xác không quan trọng, hoặc ít nhất là không quan trọng bằng hiệu suất ứng dụng.

Dạng **float** của PHP thực ra là một [IEEE 754–1985](https://en.wikipedia.org/wiki/IEEE_754-1985) **double**, tức là nó là một số nhị phân [floating-point](https://floating-point-gui.de/formats/fp/) (dấu phẩy động), và vì thế nó không có khả năng biểu diễn một số số thập phân nhất định, ví dụ 0.2. Nguyên nhân là do giá trị đó được lưu dưới dạng một số nguyên **a** (integer) nhân với 2 lũy thừa một số nguyên **b** (integer).

> c = a × 2<sup>b</sup>

Trong đó a và b là 2 số nguyên, tuy nhiên khi không có các giải pháp số nguyên cho a và b, số kết quả sẽ là một số xấp xỉ. Điều này dẫn đến điều chúng ta không mong muốn:

![](https://images.viblo.asia/56236d08-2c5a-4607-8c57-2b90515bb9ba.png)


Hệ thống số học chúng ra được dạy ở trường học và sử dụng trong cuộc sống hàng ngày của chúng ta tất nhiên là **số thập phân**. Khi chúng ta sử dụng *float*, chúng ta sử dụng loại **số nhị phân** để biểu diễn một số thập phân, bởi vì chúng ta có thể thực hiện các phép tính nhị phân rất nhanh trên máy tính, bởi vì máy tính sử dụng hệ nhị phân. Để tính lũy thừa 2, tất cả những gì chúng ta cần làm là dịch trái một bit.

![](https://images.viblo.asia/4d699045-acc5-4c99-9952-0b453dd1c11b.png)


Để biểu diễn được số thập phân một cách chính xác, chúng ta cần phải sử dụng lũy thừa 10 thay vì lũy thừa 2. Nhưng không may là hầu hết các kiến trúc máy tính không hỗ trợ hệ số dựa trên 10 (thập phân), mà là 2 (nhị phân), vì vậy chúng ta cần tính toán lũy thừa 10 đó.

Cái phải đánh đổi ở đây là **đổi hiệu suất lấy sự chính xác**.

Khi bạn cần độ chính xác, sự đánh đổi này cũng dễ thực hiện vì bạn chỉ cần cung cấp nhiều CPU hơn để bù lại hiệu năng, nhưng bạn không thể thay đổi các giới hạn cơ bản của chính kiến trúc đó. Ví dụ, hầu hết các ứng dụng PHP sẽ có một "nút cổ chai" ở hệ thống filesystem hoặc ở network layer, hoặc ở đâu đó...

# Biểu diễn số thập phân chính xác trong PHP như thế nào?

Có một số giải pháp hiện có mà PHP đã cung cấp từ rất lâu là **bcmath** và **gmp**. Những extension này cung cấp một interface để tạo và thao tác với số cực lớn và số chính xác.

Kiểu trung gian phổ biến là **string** (*bcmath* nhận đầu vào và đầu ra đều là string) và có một số class abstract sẽ lo vụ đó cho bạn. Tìm kiếm "decimal" trên Packagist sẽ cho bạn rất rất nhiều kết quả, nhưng rõ ràng là không có cái nào là tốt nhất trong số đó. Điều này chỉ ra rằng phần lớn các ứng dụng yêu cầu số chính xác sử dụng trực tiếp các extension này, hoặc là sử dụng các class abstract của riêng họ.

Mình sẽ giới thiệu với các bạn một tiêu chuẩn để xử lý các số thập phân trong PHP, đây không phải là cách duy nhất, nhưng ít nhất cũng là một recommend cho các bạn lựa chọn.

## [Decimal extension](http://php-decimal.io/#introduction)

Extension này hỗ trợ cho số thập phân floating-point với các chức năng làm tròn chính xác hoặc độ chính xác tùy ý. Các ứng dụng dựa trên số chính xác có thể dử dụng class *Decimal* của extension thay gì dùng *float* hay *string*.

- Decimal là một object, vì vậy bạn có thể type-hint Decimal.
- Hỗ trợ việc tính toán số học và so sánh số học, điều mà các class abstract (không phải extension) không làm được (hoặc ít nhất là chưa làm được :D).
- *Độ chính xác* được định nghĩa là số chữ số có nghĩa và *tỷ lệ* là số chữ số đằng sau dấu phẩy. Ví dụ số `1.23E-1000` sẽ có tỷ lệ là 1002 nhưng có độ chính xác là 3. Decimal sử dụng độ chính xác, trong khi đó *bcmath* thì sử dụng tỷ lệ. Ở đây mình không nhận xét về việc cách này tốt hơn cách kia, tuy nhiên nó tạo nên một sự khác biệt quan trọng giữa 2 loại.
- Hỗ trợ kí hiệu toán học, bạn có thể dụng các chuỗi dạng `1.23E-1000` để thể hiện một số, tại thời điểm bài viết này, bạn không thể làm điều này với *bcmath*.
- Tính toán nhanh hơn đáng kể so với *bcmath*, mặc dù hiệu suất có lẽ không phải là yếu tố quyết định ở đây.
- Nó sử dụng cùng bộ thư viện C internal như của module decimal của Python 3.
- Bạn có thể thử trước với [online sanbox](http://php-decimal.io/#sandbox).

## Decimal với SQL

Nếu bạn đang dựng một ứng dụng với PHP, rất có thể bạn đang sử dụng MySQL hoặc PostgreSQL. Decimal cung cấp chức năng để bạn có thể dễ dàng get / save giá trị giữa database và chương trình. 

Ví dụ, nếu bạn muốn lưu một số với 20 chữ số bên trái dấu phẩy và 4 chữ số ở bên phải (tức là có độ chính xác là 24). PDO sẽ nhận và lưu giá trị như là một *string*, tránh tối đa việc sử dụng *float*, ví dụ:

![](https://images.viblo.asia/e75a99de-6171-4bbd-9cc3-c7f62f91c479.png)


# Kết
Việc cần phải tính toán số thập phân với độ chính xác cao là điều hiếm gặp, tuy nhiên nếu bạn đang làm việc với một ứng dụng liên quan đến tiền bạc thì điều này lại là cực kì quan trọng, và mình hy vọng bài viết này có thể giúp bạn tìm ra được cách xử lý vấn đề. Để tìm hiểu thêm về Decimal extension, cạn có thể tìm hiểu cụ thể document tại http://php-decimal.io/.