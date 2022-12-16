Một trong những kỹ năng của `dev` không chỉ viết code rõ ràng, lành mạnh, dễ hiểu ra. Còn có một kỹ năng cũng rất quan trọng là kỹ năng `Debug`. Biết cách debug, debug đúng chỗ đúng thời điểm giúp chúng ta tìn ra nguyên nhân gây ra lỗi một cách nhanh chóng. 

Debug giúp chúng ta hiểu bản chất của vấn đề, hiểu được logic và cách thức nó hoạt động của ngôn ngữ lập trình. Giúp chúng ta tránh được các lỗi tương tự trong lần tiếp theo.

Đối với `javascript` nói chung và `ReactJS` nói riêng có nhiều cách debug, không ai là không biết `console` là một những công cụ giúp chúng ta debug hiển thị bug ngay trên tab `console` của các trình duyệt

![](https://images.viblo.asia/ff810363-6171-4472-8e8f-aa730d83df95.png)

`console` là cách cơ bản nhất để debug cho các dự án sử dụng `javascript` output là mảng, object, string, number ....

Nhưng lúc nào cũng `console` thì rất lâu và cỏ vẻ không mang lại hiệu quả cao. Mỗi lần sử dụng `console`  chúng ta lại phải đợi `weback` build lại `bundle` file. 

Đối với các dự án sự dụng redux, mình xin giới thiêu một công cụ rất hữu ích một extention có trên [chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en), [firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/) đó là `Redux DevTools`.

Bạn hay dùng firefox hay chrome đều có thể cài extension này để sử dụng.

`Redux DevTools` là gì? 

Nó là 1 extension cài được trên các browser `chrome` hay `firefox` nó giúp ra view `store` của app một cách trực quan nhất mà không cần `console`, ngoài ra còn xem list các `commit`, các `actions` step by step. Giúp chúng ta biết được đường đi nước bước, logic từng màn hình dễ dàng nhất.  Sau khi cái xong để kích hoạt `Redux DevTools`  có 2 cách 

Cách 1: Bấm vào icon trên tab bar của trình duyệt 

Cách 2: Chuột phải vào trang, và chọn `Redux DevTools`

![](https://images.viblo.asia/e8481f78-89de-4d6c-88d9-4458dc73eed4.png)


Nào cùng đi khám phám 1 số tính năng quạn trọng nhé. Thứ nhất chúng ta có 3 chế độ view `log monitor`, `chat`, `inspector`

nếu muốn xem cấu trúc của store thì `chat` là một sự lựa chọn tốt, còn muốn xem logic actions và các action thay đổi ảnh hưởng đến `store` như nào thì `log monitor`, hoặc `imspector` là sự lựa chọn sáng suốt

![](https://images.viblo.asia/2c62960f-84e4-4b76-aa22-5d4305611aff.png)

Inspector sẽ có dao diện như thế này

![](https://images.viblo.asia/51d9a472-cdfc-429a-837d-30876ca52774.png)

Chế độ `inspector` được đánh giá cao nhất vì những tính năng vượt trội 

`Commit` list tất cả các route thay đổi  tương ứng với nó là menu bên phải có thông tin của `Action`, `State`, `Diff`

Chúng ta có thể xem thông tin action truyền đi dữ liệu là gì ở tab action

Khi muốn xem state thay đổi thế nào thì tab state sẽ cung cấp thông tin cho chúng ta

tab `Diff` cho chúng ta biết là action trc và sau thay đổi dữ liệu như thế nào

![](https://images.viblo.asia/53141ef2-2599-4acd-ac5f-9378e0b56089.png)

Ngoài ra chúng ta có thể tự  `dispatch` đi một action nào đó bằng cách viết code ngay trên tab `dispatch`

Có một thanh `Play` cho phép chúng ta tua lại tất cả những gì đã xảy ra trong khi load bất kì page nào, mà không cần `console` thần thánh

![](https://images.viblo.asia/1113ab46-cb51-4175-9b42-1e4f8645d30a.png)

Với những ai viết unit test thì chúng ta có thể viết trực tiếp ngay trên tab test

Mình đánh giá đây là một tool hay và nó không thể thiếu cho mỗi `dev` phát triển các dự án sử dụng `ReactJS` và `Redux`

Hi vọng bài qua bài viết các bạn có thể hình dung được phần nào công dụng của tool và áp dụng trong dự án để giảm thời gian debug cũng như thời gian tìm hiểu logic của dự án.