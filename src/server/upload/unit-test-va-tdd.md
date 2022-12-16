TDD - **Test Driven Development** thật ra ko khó, đặc biệt là những ai đã làm Unit Test, hiểu các kiến trúc liên quan tới abstract và delegation. Nhưng sẽ rất khó chịu với những ai chưa từng làm Unit Test bao giờ, bởi vì nó thay đổi toàn bộ "thói quen", những điều mà các bạn chưa làm bao giờ và đôi khi thấy nó kì hoặc.

Về tính quy trình nó chỉ đơn giản là: viết test trước rồi mới viết code sau. Đặc biệt là phải cho test fail rồi mới sửa code lại cho pass test. Lý do cho việc này là: đó là cách duy nhất để kiểm tra được Unit Test có đúng ko. Vì không ai đi viết Unit Test cho Unit Test cả !!!

Cách làm này giúp các bạn developer những thứ sau:

- **Tập cách tư duy**: code được là phải có cách test được, test từng function (unit) nhỏ mà ko cần phải run lên rồi mới chạy test manually.

- **Tập think logic trước khi code**: vì khi mình code logic mà phải test trước, các bạn phải có các step logic cần thiết để hoàn tất, thậm chí cả những test case và ràng buộc. Việc này hạn chế code theo happy case rất nhiều.

- Khi 1 app quá lớn, Unit Test là cách rất hiệu quả để test những logic các developer viết mà không cần phải run app. Vì trên thực tế, các app lớn để run được yêu cần rất nhiều thứ và các môi trường liên quan.

- **Nền tảng để bước lên CI**: nếu chỉ chạy CI để check syntax, convention thì đây là 1 bước quan trọng và nên có: chạy Unit Test. Việc này dễ dàng phát hiện bug hơn (thường là khi sửa code cũ, nếu sai logic unit test sẽ bị phát hiện ngay)

![](https://images.viblo.asia/4100b5ce-ad08-4e34-a071-57478b3bb421.jpg)

- Link download full slide: https://www.slideshare.net/VietTran65/unit-test-and-tdd