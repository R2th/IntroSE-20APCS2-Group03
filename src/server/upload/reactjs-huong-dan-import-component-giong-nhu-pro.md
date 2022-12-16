Xin chào các bạn.
Hôm nay mình sẽ hướng dẫn các bạn các import components (thực tế không chỉ là component mà các loại file khác cũng vậy) trong React (thự thế không chỉ react, các loại khác cũng vậy) giống như "người biết code" nha :v Let's start
Hẳn các bác code front end SPA (Single Page App) như React, Vue hay Angular đều có một chỗ "cất" những components để dùng chung cho cả dự án kiểu như là shared-components, hay common, hay UI, ...
Và khi chúng ta import các component tử thư mục này sẽ trông như thế này
![](https://images.viblo.asia/2acad93b-49ac-4e10-be04-ddddaba950e8.png)
Và khi mà số  lượng components cần import nhiều hơn thì sẽ trông như thế này  hoặc dài gấp đôi
![](https://images.viblo.asia/36205888-cf18-41e6-9c2f-09e2f39783b3.png)
Hmm. Trông nghiệp dư quá nhỉ, nên có cách nào đó chứ

![](https://images.viblo.asia/71721434-15d9-4afa-ae37-d89bb15a469a.gif)

Thì giải pháp ở đây là ở thư mục cần import nhiều hoặc cùng nhau (thư mục common, hay shared-components là một ví dụ) hãy tạo file index.js (hoặc .jsx .ts .tsx) và import tất cả components vào như sau
![](https://images.viblo.asia/8573383a-679e-4016-ad5f-a1c741f3d243.png)
Và khi chúng ta cần import nhiều components từ nơi khác vào thì chỉ cần gọi 1 dòng như thế này là oke rồi
![](https://images.viblo.asia/279477f9-1159-499a-978f-eef0679b580b.png)
Trông chuyên nghiệp quá nhỉ :v nếu các bạn muốn tham khảo thêm về nhập/xuất file trong javascript có thể truy cập mozilla doc nha: https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export