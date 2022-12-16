![image.png](https://images.viblo.asia/13652cf0-e215-4022-b20d-7719c74165c9.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Hôm nay xếp đưa cho cái source code bảo add thêm 1 feature. Mình clone về sau đó `npm audit` thì nó hiện một vài thư viện tên khá lạ mà mình chưa bao giờ dùng đến. Mình liền gõ ngày `npm docs <Tên package>` nó bung ngay docs của package đó => thật là ngầu đời. Ông xếp Nhật ngồi cạnh thấy gõ cmd ầm ầm cũng xanh mặt.

Bài viết này mình sẽ chia sẻ một số lệnh npm đơn giản mà mình hay sử dụng.

1\. Mở trang chủ có chứa tài liệu của package
-----

Cái này giúp mình tiết kiệm rất nhiều thời gian mình ước mình biết thủ thuật này sớm hơn. Nghe nó ảo ảo đúng ko? Nhưng mà thật đấy bạn cứ thử dùng là ghiềng ngay. Từ khi biết nó mình siêng đọc document hẳn ra mỗi lần đọc code thấy cái thư viện nào lạ lạ là gõ `npm docs ...` trang chính chủ hiện ra ngay.

Còn trước đây, khi mình muốn truy vấn tài liệu sử dụng của `lodash`, mình luôn tìm kiếm địa chỉ của nó thông qua `google` => lười.

Trên thực tế, npm có thể giúp bạn mở docs một cách nhanh chóng. 
Cách dùng thì rất đơn giản, Bạn chỉ cần chạy `npm docs xxx` để mở nhanh `xxx`tài liệu của **package**

```console
npm docs [package-name] // npm docs lodash
```

2\. Mở repo GitHub của package

Là một lập trình viên, mình đoán bạn cũng thích `github` giống mình, đây là kho báu dành cho các lập trình viên.

Đôi khi mình muốn biết source code của một package, mình chỉ có thể tìm kiếm tên package trên `github`?

Câu trả lời là không, `npm` có thể giúp bạn mở nhanh repo GitHub của package đó

```console
npm repo [package-name] // npm repo lodash
```

3\. Kiểm tra các package Dependencies lỗi thời
-----

Chạy `npm outdated`lệnh trong project của bạn và nó sẽ kiểm tra tất cả các package cho phiên bản hiện tại, phiên bản bắt buộc và phiên bản mới nhất.

![image.png](https://images.viblo.asia/91a6dc06-bfc4-4b45-a14b-945543abb008.png)

```console
npm outdated
```

4\. Xem tất cả các phiên bản của một package
-----

Bạn có biết cách xem tất cả các phiên bản của một package không?

Có, chúng ta có thể làm điều này thông qua trang chủ của npm.

Ví dụ như thể này dó là như liên kết dưới đây…

[https://www.npmjs.com/package/lodash?activeTab=versions](https://www.npmjs.com/package/lodash?activeTab=versions)

![image.png](https://images.viblo.asia/0c781628-5133-4c87-a13c-f0aa2b4989b7.png)

Có cách nào khác không? Thật tuyệt vời, tất cả những gì bạn cần chỉ là 1 câu lệnh này thôi.

```console
npm v [package-name] versions // npm v lodash versions
```

![image.png](https://images.viblo.asia/84922e22-1218-43fe-ba13-9c45dee8c7b7.png)

5\. Tìm các risky packages trong project của bạn
-----

Lệnh `audit` gửi mô tả về các Dependencies được định configure trong project của bạn và báo cáo về các lỗ hổng được phát hiện. Nếu phát hiện bất kỳ lỗ hổng nào thì sẽ tính toán mức độ ảnh hưởng và biện pháp khắc phục phù hợp. Nếu đối số `fix` được cung cấp, thì các biện pháp khắc phục sẽ được áp dụng cho `package tree`.

```console
npm audit
```

![image.png](https://images.viblo.asia/214f720d-ddf6-47bb-81f4-eea1cae7e404.png)

Roundup
-----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
-----
* https://tuan200tokyo.blogspot.com/2022/12/blog60-5-cau-lenh-npm-huu-ich-ma-ban_2.html