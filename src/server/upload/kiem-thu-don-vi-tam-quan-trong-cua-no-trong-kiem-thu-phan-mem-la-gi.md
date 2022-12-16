## Kiểm thử đơn vị là gì?

Kiểm thử đơn vị là một trong những loại kiểm thử phần mềm bao gồm giai đoạn kiểm thử ban đầu, trong đó các thành phần nhỏ nhất hoặc các mô-đun của phần mềm được kiểm tra riêng lẻ. Với phương pháp kiểm thử này, cả người kiểm thử và nhà phát triển đều có thể cô lập từng mô-đun, xác định và sửa chữa các lỗi hệ thống ở giai đoạn rất sớm của vòng đời phát triển phần mềm (SDLC). Về cơ bản, kiểm thử đơn vị xác minh các khía cạnh hành vi khác nhau của hệ thống được kiểm tra và có thể được phân loại rộng rãi thành kiểm thử đơn vị dựa trên trạng thái và dựa trên tương tác.

![](https://images.viblo.asia/2a85d654-c18c-4988-9dc7-58e9244f5ce2.jpg)

Một thử nghiệm đơn vị điển hình bao gồm ba giai đoạn bao gồm giai đoạn khởi tạo đầu tiên, nơi nó khởi tạo một phần nhỏ của ứng dụng mà nó muốn thử nghiệm. Giai đoạn thứ hai là giai đoạn bổ sung trong đó nó thêm một sự kích thích vào hệ thống đang được thử nghiệm và cuối cùng, giai đoạn thứ ba là giai đoạn kết quả nơi nó quan sát hành vi của ứng dụng mang lại. Rõ ràng, nếu hành vi quan sát được phù hợp với mong đợi, thì thử nghiệm đơn vị vượt qua, còn nếu không, nó không thành công. Điều này cho thấy có sự cố ở đâu đó trong hệ thống đang được kiểm tra. Ba giai đoạn kiểm tra này được đặt tên là Sắp xếp, Hành động và Khẳng định hoặc thường được gọi là AAA (Arrange, Act and Assert).

## Tại sao Kiểm thử đơn vị lại quan trọng?

![](https://images.viblo.asia/c490dfbf-868d-4904-84ce-a5d6a92c7630.jpg)

Kiểm thử đơn vị là kỹ thuật kiểm thử phần mềm trong đó một nhóm các thành phần hoặc mô-đun chương trình phần mềm được kiểm tra riêng lẻ. Kỹ thuật này giúp ích một cách hiệu quả trong việc xác nhận tính chính xác của một phần mã bằng cách xem xét các đoạn mã, đối tượng giả (mock objects), drivers và các unit test frameworks. Vì nó được thực hành ở giai đoạn thử nghiệm ban đầu, kỹ thuật thử nghiệm này đảm bảo xác định và sửa các lỗi ở giai đoạn đầu của SDLC để tránh tình trạng chúng trở nên đắt đỏ hơn cho doanh nghiệp để sửa khi được xác định ở các giai đoạn sau.

Một số Dev có thể cố gắng tiết kiệm thời gian bằng cách thực hiện rất ít kiểm thử đơn vị hoặc bỏ qua kiểm thử đơn vị, điều đó rõ ràng dẫn đến chi phí sửa lỗi cao hơn trong quá trình kiểm tra hệ thống, kiểm tra tích hợp và thậm chí là kiểm tra beta khi ứng dụng được hoàn thành.

Hơn nữa, ngoài những điều này, kiểm thử đơn vị giúp các nhóm phát triển hiểu code base, xác nhận tính đúng đắn của mã đã phát triển, sử dụng lại mã và thực hiện các thay đổi trong mã nhanh hơn.
Với thực tiễn kiểm thử đơn vị thích hợp được áp dụng, các Dev và tester có thể giúp tiết kiệm thời gian vì các lỗi có thể được xác định sớm trong quá trình vì đây là giai đoạn đầu của kiểm thử. Và, việc bỏ qua hoặc hạn chế thực hiện kiểm thử đơn vị có thể làm tăng bất lợi các khiếm khuyết và việc sửa chữa chúng trở nên phức tạp ở giai đoạn sau. Do đó, điều cần thiết là phải thực hành kiểm thử đơn vị ở giai đoạn đầu của quy trình kiểm thử phần mềm trước khi lập kế hoạch kiểm thử tích hợp.

## Lợi ích của Kiểm thử Đơn vị

![](https://images.viblo.asia/2aeab02f-91a8-4d73-b104-d81378f974fb.jpg)


- Cô lập một phần code và xác nhận tính đúng đắn của nó
- Giúp xác định và sửa các lỗi ở giai đoạn đầu của quá trình SDLC
- Đảm bảo giảm chi phí do lỗi được giải quyết sớm nhất
- Giúp Dev cải thiện thiết kế bằng cách cho phép refactor lại code 
- Đảm bảo đơn giản hóa quá trình gỡ lỗi (debugging)
- Với thực hiện kiểm tra đơn vị thích hợp, các thành phần được tích hợp sau khi xây dựng có thể đảm bảo đạt được sản phẩm chất lượng

## Các loại Kiểm thử Đơn vị

![](https://images.viblo.asia/ff1a4387-beb6-4243-b161-1c545307fb1c.jpg)

Về cơ bản, người kiểm thử đơn vị sử dụng ba loại kiểm thử đơn vị trong khi kiểm tra từng mô-đun một cách riêng biệt.

### White Box Testing (Kiểm thử hộp trắng)

![](https://images.viblo.asia/f3dd699b-be99-4948-a889-a72958cb2489.jpg)

Thực hiện thử nghiệm này còn được gọi là thử nghiệm trong suốt hoặc thử nghiệm hộp thủy tinh. Trong loại kiểm thử đơn vị này, hành vi chức năng của phần mềm được kiểm tra bởi Devs để xác thực việc thực thi của chúng.

### Black-box Testing (Kiếm thử hộp đen)

![](https://images.viblo.asia/4fe97cc5-0b30-4b0e-b8c2-00c1f468f02b.jpg)

Trong loại kiểm thử đơn vị này, người kiểm thử đơn vị không thể nhận thức được chức năng bên trong của hệ thống và được phép kiểm tra chức năng, nói cách khác chỉ test giao diện người dùng, đầu vào và đầu ra.

### Gray Box Testing (Kiếm thử hộp xám)

![](https://images.viblo.asia/55bb522b-b41a-4c19-838d-8d954d183be9.jpg)

Kiểm tra hộp màu xám được biết như là sự kết hợp của cả kiểm tra hộp đen và hộp trắng. Trong phương pháp này, người thử nghiệm nhận thức được một phần chức năng của hệ thống và sử dụng cách tiếp cận này để thử nghiệm các phương pháp thử nghiệm khác nhau, để thực hiện các bộ thử nghiệm và thực hiện đánh giá rủi ro. Ngoài ra, loại thử nghiệm đơn vị này được gọi là thử nghiệm bán minh bạch.

## Ai thực hiện Kiểm thử đơn vị?

Kiểm thử đơn vị là giai đoạn kiểm thử phần mềm đầu tiên trong SDLC và nó thường được thực hiện trong quá trình phát triển ứng dụng. Các trường hợp kiểm thử đơn vị này được viết và thực thi bởi các Devs. Tuy nhiên, trong một số trường hợp đặc biệt mà các Devs không thực hiện quá trình này, kỹ thuật kiểm tra hộp trắng này được thực hiện bởi các kỹ sư QA.

## Làm thế nào để làm Unit Testing?

Kiểm thử đơn vị có thể được thực hiện theo hai phương pháp, tức là kiểm tra thủ công và kiểm tra tự động.

Để thực hành kiểm thử đơn vị với phương pháp kiểm thử thủ công, điều cần thiết là người kiểm thử đơn vị phải có tài liệu hướng dẫn từng bước. Tuy nhiên, nếu xét đến những efforts cần thiết cho kiểm thử thủ công, kiểm thử đơn vị tự động thường được hầu hết các doanh nghiệp ưa thích và lựa chọn hơn.

### Quy trình kiểm thử đơn vị được thực hiện trong 4 giai đoạn:

1. Creating test cases

2. Reviewing test cases

3. Baselining test cases

4. Executing test cases

### Quá trình kiểm tra đơn vị bao gồm:

![](https://images.viblo.asia/0b3e9eb1-ae91-4d6b-ad17-4f5e3453b3ae.jpg)

- Devs viết code trong ứng dụng để kiểm tra chức năng
- Đoạn code sau đó được các Devs cô lập để xác nhận sự phụ thuộc giữa code và các đơn vị khác. Cách cô lập code này giúp xác định và loại bỏ các phần phụ thuộc.
- Devs sử dụng đáng kể các Unit test frameworks hoặc các tools kiểm thử đơn vị để phát triển các trường hợp kiểm thử tự động.
- Trong khi thực hiện các trường hợp kiểm thử, các frameworks kiểm thử đơn vị giúp gắn cờ và báo cáo các trường hợp kiểm thử không thành công. Ngoài ra, dựa trên các lỗi trong các trường hợp thử nghiệm, các frameworks kiểm thử đơn vị giúp dừng thử nghiệm liên quan.

## Các thực hành tốt nhất về Unit Testing

![](https://images.viblo.asia/322750c7-20fc-4c1c-a8a0-ff0379e1eca4.jpg)

### 1. Đảm bảo các Unit tests độc lập với nhau:

Trong khi thực hiện kiểm thử đơn vị, hãy đảm bảo rằng tất cả kiểm thử đơn vị là độc lập. Nếu có bất kỳ phụ thuộc nào, thì các bài kiểm tra đơn vị có thể bị ảnh hưởng khi có bất kỳ thay đổi hoặc cải tiến nào. Ngoài ra, nó có thể dẫn đến sự phức tạp cho các trường hợp thử nghiệm để chạy và debug. Do đó, hãy luôn đảm bảo rằng các trường hợp kiểm thử đơn vị là độc lập.

### 2. Luôn chỉ thực hiện một unit test vào một thời điểm:

Khi kiểm thử một unit của code, mặc dù nó liên quan đến nhiều trường hợp khác nhau, người kiểm thử đơn vị phải kiểm tra từng trường hợp sử dụng trong các trường hợp thử nghiệm khác nhau. Điều này sẽ đơn giản hóa một cách hiệu quả các nhóm thực hiện thay đổi mã hoặc tái cấu trúc (refactor).

### 3. Sử dụng AAA để dễ đọc:

AAA viết tắt của Arrange, Act, and Assert (Sắp xếp, Hành động và Khẳng định). Mô hình này giúp tách những gì đang được kiểm tra khỏi các bước “Arrange” và “Assert”; do đó làm giảm sự đan xen giữa các xác nhận với sự trợ giúp của "Act". Do đó, các trường hợp thử nghiệm dễ đọc hơn.

### 4. Sửa các lỗi trước khi chuyển sang Kiểm tra tích hợp:

Kiểm thử đơn vị là giai đoạn kiểm thử đầu tiên và nó được thực hiện trước khi chuyển sang giai đoạn kiểm thử tích hợp. Do đó, trước khi chuyển sang cấp thử nghiệm tiếp theo, hãy đảm bảo sửa tất cả các lỗi đã xác định trong giai đoạn thử nghiệm đơn vị.

### 5. Đảm bảo đặt tên biến thích hợp:

Trong kiểm thử đơn vị, một trong những thực hành quan trọng và cần quan tâm nhất đó là đặt tên phù hợp cho các biến. Do đó, tránh sử dụng các magic strings, và cũng tuân theo các quy ước đặt tên rõ ràng và nhất quán.

### 6. Luôn tách biệt code ở môi trường test và production

Trong khi thực hiện kiểm thử đơn vị, hãy đảm bảo rằng unit test code không được triển khai cùng với mã nguồn trong bản build của bạn.

## Một số framework Unit Test quan trọng

![](https://images.viblo.asia/40996345-d7d0-41f8-8fe8-1b8f8072e26b.jpg)

## Kiểm thử đơn vị VS Kiểm thử tích hợp

![](https://images.viblo.asia/bed2c5da-1db9-411a-887f-53bed979459c.jpg)

Kiểm thử tích hợp là giai đoạn kiểm thử phần mềm thứ hai được tiến hành sau kiểm thử đơn vị. Trong kiểm thử Tích hợp, các mô-đun nhỏ được thử nghiệm riêng lẻ trong thử nghiệm đơn vị được tích hợp hoặc kết hợp để kiểm tra chức năng của các mô-đun khi chúng ở cùng nhau. Tuy nhiên, để hiểu hai giai đoạn thử nghiệm này dễ dàng hơn, sự khác biệt chính của chúng đã được liệt kê dưới đây:

| Kiểm thử đơn vị | Kiểm thử tích hợp |
| -------- | -------- |
| Đây là giai đoạn thử nghiệm ban đầu trong SDLC.  | Nó được thực hiện sau khi kiểm thử đơn vị và trước khi kiểm thử hệ thống. |
| Trong thực hiện kiểm thử này, đoạn code nhỏ nhất được thử nghiệm.  | Trong phương pháp này, các mô-đun khác nhau được kết hợp hoặc tích hợp để kiểm tra xem chúng có hoạt động cùng nhau hay không. |
| Kiểm thử đơn vị tập trung vào kiểm tra chức năng của từng đơn vị riêng lẻ  | Kiểm thử tích hợp tập trung vào việc xác định các lỗi phát sinh bằng cách tích hợp các mô-đun khác nhau. |
| Kiểm thử đơn vị là một loại kiểm thử hộp trắng.  | Kiểm thử tích hợp là một loại kiểm thử hộp đen. |
| Nó được thực hiện bởi các Devs hoặc thậm chí bởi những Tester  | Nó được thực hiện bởi những Tester. |
| Maintain các trường hợp thử nghiệm đơn vị là rẻ hơn.  | Maintain các trường hợp kiểm thử tích hợp là tốn kém hơn. |
| Rất dễ dàng tìm thấy lỗi trong phương pháp này.  | Tương đối khó xác định các vấn đề trong phương pháp này. |
| Kiểm thử đơn vị được bắt đầu với đặc tả mô-đun. | Kiểm tra tích hợp được bắt đầu với các đặc tả giao diện. |

## Kết luận

Doanh nghiệp có thể được đảm bảo về phần mềm không có lỗi và chất lượng nếu việc kiểm thử phần mềm được thực hiện hiệu quả ngay từ giai đoạn phát triển sản phẩm ban đầu. Kiểm thử phần mềm phải được thực hiện ngay từ giai đoạn đầu tiên, tức là từ chính level coding; và điều này có thể đạt được khi các Devs thực hiện kiểm thử đơn vị.

Kiểm thử đơn vị là thực hiện kiểm thử sớm nhất tập trung vào code. Với cách tiếp cận thử nghiệm này, các mô-đun nhỏ của chương trình được thử nghiệm riêng lẻ. Cách tiếp cận này mang lại lợi ích cho các nhóm về nhiều mặt như phát hiện lỗi sớm, sửa code trước khi chúng trở nên tốn kém để giải quyết trong SDLC. Do đó, thực hành kiểm thử đơn vị là điều cần thiết đối với các doanh nghiệp để đảm bảo rằng phần mềm được phát triển không có lỗi và chất lượng được đảm bảo ngay từ giai đoạn đầu của SDLC. Tận dụng kiểm thử đơn vị để làm cho phần mềm của bạn có chất lượng cao hơn.


Nguồn tham khảo: https://www.testingxperts.com/blog/unit-testing#What%20is%20Unit%20Testing?