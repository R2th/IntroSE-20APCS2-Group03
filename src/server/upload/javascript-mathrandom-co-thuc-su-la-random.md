Khi bạn làm việc với Javascript, và bạn cần 1 số ngẫu nhiên, thì ngay lập tức bạn sẽ nghĩ đến là `Math.random()`. Một trong những lý do chính cho việc sử dụng hàm `Math.random()` để tạo số ngẫu nhiên là tính dễ sử dụng của nó. Tất cả những gì bạn phải làm là gọi hàm và bạn sẽ nhận được một số ngẫu nhiên. Nó cũng không có phụ thuộc.

Hàm `Math.random()` có thể được sử dụng trong một số ứng dụng bao gồm animation và lựa chọn màu nền ngẫu nhiên. Bạn có thể đọc thêm về công dụng của nó [tại đây](https://css-tricks.com/lots-of-ways-to-use-math-random-in-javascript/)

**Nhưng bạn đã bao giờ tự hỏi liệu Math.random () có thực sự ngẫu nhiên không?**

### Math.random() ngẫu nhiên đến mức nào?

*Not random at all*

Nếu bạn chạy hàm `Math.random()` nhiều lần trên trình duyệt của mình, bạn sẽ nhận thấy rằng các giá trị luôn khác nhau. Nhưng trên thực tế, `Math.random ()` không tạo ra các số ngẫu nhiên, thay vào đó nó mô phỏng việc tạo ra các số ngẫu nhiên với sự trợ giúp của các thuật toán - và thực hiện việc đó khá tốt. Kiểu tạo số ngẫu nhiên này được gọi là pseudo-random number generation (PRNG).

Nếu bạn chạy `Math.random()` trên một vòng lặp, cuối cùng bạn sẽ bắt đầu thấy sự tự lặp lại. Trong các trình duyệt hiện đại, điểm này được tính là `2¹²⁸ — 1`. Điều này hoàn toàn phụ thuộc vào thuật toán PRNG đang được sử dụng.

### Math.random () được triển khai như thế nào?

Như đã đề cập ở trên, điểm mà `Math.random()` tự lặp lại phụ thuộc vào thuật toán PRNG đang được sử dụng. Bây giờ câu hỏi đặt ra; thuật toán PRNG được JavaScript sử dụng là gì?

Thuật toán PRNG đang được sử dụng trong hàm `Math.random()` không được JavaScript biết đến. Thay vào đó, trình duyệt quyết định và thực hiện nó. Đã có một số thuật toán PRNG nổi tiếng được các trình duyệt sử dụng.

* [Mersenne-Twister](https://en.wikipedia.org/wiki/Mersenne_Twister)

* [LCG](https://en.wikipedia.org/wiki/Linear_congruential_generator)

* MWC1616

Nhưng vào năm 2015, nhóm phát triển Chrome đã phát hiện ra một số vấn đề với thuật toán PRNG “sau đó” của họ, MWC1616. Họ đã nhanh chóng thay đổi thuật toán của mình thành [xorshift128+](http://vigna.di.unimi.it/ftp/papers/xorshiftplus.pdf) trong bản cập nhật tiếp theo. Và ngay sau đó, hai gã khổng lồ trình duyệt Firefox và Safari cũng theo sau. Hiện tại, hầu hết mọi trình duyệt hiện đại đều sử dụng thuật toán `xorshift128+` để tạo ra sự ngẫu nhiên

Chất lượng của thuật toán PRNG khó kiểm tra không giống như các số liệu khác như mức sử dụng bộ nhớ, hiệu suất và độ dài khoảng thời gian có thể dễ dàng tính toán. Để xác định chất lượng của thuật toán PRNG, một số thử nghiệm thống kê được thực hiện. [TestU01](http://simul.iro.umontreal.ca/testu01/tu01.html) là bộ thử nghiệm PRNG tiêu chuẩn để thực hiện một số thử nghiệm này.

Thuật toán `xorshift128+` đã vượt qua bộ `TestU01`.

Để biết thêm về thuật toán `xorshift128+` và cách triển khai của chrome, bạn có thể đọc các bài viết này

https://v8.dev/blog/math-random

https://hackernoon.com/how-does-javascripts-math-random-generate-random-numbers-ef0de6a20131


### Làm thế nào để thực sự lấy được số ngẫu nhiên

Tất cả những người theo chủ nghĩa hoàn hảo ngoài kia có thể bắt đầu tự hỏi ngay bây giờ; **Làm thế quái nào mà bạn có được một con số ngẫu nhiên hoàn hảo**.

Chà, sự thật là bạn không bao giờ có thể nhận được một số ngẫu nhiên thực sự bằng cách tiếp cận thuật toán. Khi toán học và công thức được sử dụng để tạo một số ngẫu nhiên, dù nó có vẻ ngẫu nhiên đến đâu, thì cuối cùng nó cũng sẽ tự lặp lại sau khi kết thúc sau 1 khoảng thời gian nào đó.

**Bạn có thực sự cần một con số thực sự ngẫu nhiên?**

Hầu hết trường hợp đều là không.

Nếu bạn đang phát triển một trò chơi xúc xắc đơn giản hoặc một hoạt ảnh ngẫu nhiên cho trang web của mình, bạn sẽ không cần một con số ngẫu nhiên. Một số ngẫu nhiên mô phỏng thu được bởi hàm `random()` là quá đủ cho nhu cầu của bạn.

Nhưng có thể có những trường hợp bạn sẽ cần sử dụng một số thực sự ngẫu nhiên để triển khai. Những ví dụ này có thể bao gồm lựa chọn người trúng xổ số và thậm chí cả các chức năng mật mã.

Vì phần lớn mật mã phụ thuộc vào trình tạo số ngẫu nhiên an toàn bằng mật mã để tạo khóa và mật mã, nếu một trình tạo số ngẫu nhiên có thể dự đoán được, thì kẻ tấn công có thể sử dụng nó như một cửa hậu để phá mã.

**Giải pháp**

Các tài liệu MDN khuyên chúng ta KHÔNG sử dụng hàm `Math.random()` với bất kỳ thứ gì liên quan đến mật mã và bảo mật. Thay vào đó, bạn nên sử dụng Web Crypto API thay thế và chính xác hơn là phương thức [window.crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)

Nhưng nếu bạn vẫn muốn sử dụng các số thực sự ngẫu nhiên, bạn có thể lấy chúng với sự trợ giúp của các API. Các số ngẫu nhiên thực sự này được tạo ra với sự trợ giúp của các [phương pháp vật lý](https://en.wikipedia.org/wiki/Random_number_generation#Physical_methods). Những con số này dựa trên một hiện tượng vật lý của các hạt nguyên tử hoặc hạ nguyên tử 1 cách ngẫu nhiên như phân rã phóng xạ, nhiễu nhiệt, v.v.

Bạn có thể sử dụng 1 số api

*  [ANU Quantum Random Number Generator API](https://www.programmableweb.com/api/anu-quantum-random-number-generator) - dao động lượng tử của chân không
*  Random.org - tiếng ồn trong khí quyển
*  [HotBits](http://www.fourmilab.ch/hotbits/) - phân rã phóng xạ

Cũng cần lưu ý rằng phần lớn trường hợp không cần một bộ tạo số ngẫu nhiên thực sự. Đối với những trường hợp này, các phương pháp tiếp cận thuật toán là đủ. Nhưng nếu bạn đang làm việc với một trong những trường hợp ngoại lệ, bạn có thể sử dụng các API đã cho ở trên để truy xuất một số thực sự ngẫu nhiên. Nhưng bạn cũng phải ghi nhớ thời gian bổ sung cần thiết cho mỗi yêu cầu đối với API. Điều này khiến các API này khó được sử dụng trên một phiên bản nhạy cảm về thời gian.

Bạn đã từng dùng `Math.random()`, và nó có đáp ứng đủ yêu cầu của bạn?

Nguồn: [https://blog.bitsrc.io/](https://blog.bitsrc.io/)