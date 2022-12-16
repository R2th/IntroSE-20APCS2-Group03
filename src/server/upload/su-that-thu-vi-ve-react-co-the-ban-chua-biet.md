## 1. Khi xử lý DOM ảo react sử dụng thuật toán nào?
   Đó là diff algorithm, react áp dụng observer pattern để xác định sự thay đổi của state và props (observer là một mẫu thiết kế mà nó có thể xác định được sự thay đổi của các thành phần phụ thuộc, mẫu thiết kế này được rất nhiều framework, thư viện khác sử dụng không chỉ riêng react).  Khi state hoặc props thay đổi sẽ khiến component re-render tạo ra các phiên bản DOM khác nhau, react sử dụng diff algorithm để so sánh các phiên DOM trước và sau khi state hoặc props thay đổi. React chỉ render lại một số node trong DOM thật mà DOM ảo tương ứng với nó bị thay đổi, những node không có sự thay đổi sẽ được giữ nguyên.
   ![](https://images.viblo.asia/6275b8f1-a540-4558-bfc4-07aa97fefa92.jpg)
   (React nhận ra node màu đỏ trong ảnh có sự thay đổi, nên quyết định chỉ render lại node này, những node còn lại giữ nguyên)
   
## 2.  DOM ảo là gì? 
DOM ảo được thiết kế giống DOM thật, nó là một bản copy của DOM thật với tỉ lệ 1-1, DOM ảo cũng được tổ chức thành dạng tree với các nhánh là các node, trong DOM ảo mỗi node là một object có cùng thuộc tính với DOM thật.
![](https://images.viblo.asia/b7b5a187-8d11-43da-a461-21857108388f.png)
(trong "mắt" của react, DOM ảo là một object với các thuộc tính biểu diễn: loại element, node con,... như trong ảnh)

## 3.  DOM ảo hoạt động như thế nào?
DOM ảo đồng bộ với DOM thật trên trình duyệt nhờ vào thư viện [reactDOM](https://www.npmjs.com/package/react-dom), quá trình này được gọi là [Reconciliation](https://www.youtube.com/watch?v=I4yDcWWuf14&ab_channel=ReactNext) (reconciliation là sự đối chiếu với DOM trước đó, react sẽ tính toán và cân nhắc xem có cần thiết phải cập nhật DOM này hay không, nó so sánh DOM ảo mới vừa tạo ra với DOM thật hiện tại)

## 4.  React lưu trữ DOM ảo như thế nào?
DOM ảo gồm danh sách các node, mỗi node là một đối tượng javascript, mà object  được lưu trong bộ nhớ heap, cả stack và heap đều được lưu trên RAM của máy tính đang chạy trình duyệt. DOM ảo chỉ là một javascript object như những object thông thường khác.

## 5.  DOM ảo nhanh hơn DOM thật?
Không, thậm chí DOM ảo có thể sẽ chậm hơn trong một số trường hợp khi thao tác trực tiếp với DOM thật mà không cần trải qua bất cứ quá trình trung gian nào cả, nhưng không đáng kể. Nếu một node DOM luôn biến động, bị cập nhật liên tục thì DOM ảo lại nhanh hơn, chúng ta có thể liên tục thay đổi thuộc tính của DOM ảo vì đó chỉ là thao tác với object javascript thông thường, DOM ảo không trực tiếp làm màn hình người dùng repaint/reflow liên tục. Đây là vấn đề còn gây khá nhiều tranh cãi. Bên cạnh những ưu điểm của DOM ảo, Rich Harris người sáng lập SvelteJS cũng nhận ra nhiều khuyết điểm và cho rằng DOM ảo không nhanh như bạn tưởng. Một số lý do có thể dễ dàng nhận ra như: 
* Quá trình xử lý DOM thật đã tiêu tốn một phần bộ nhớ rồi, mà còn phải tạo thêm DOM ảo tương ứng gây tốn bộ nhớ gấp đôi, hoặc gấp 3. 
* Trong quá trình hoạt động, DOM ảo liên tục tạo ra các object, tạo và hủy tham chiếu object nhiều lần khiến Garbage collector của javascript phải hoạt động liên tục. 
Nhưng sự khác biệt vẫn không quá lớn. 
## 6. Meta là cha đẻ của khái niệm DOM ảo, react đặt nền móng cho DOM ảo?
Không, react sử dụng DOM ảo chứ Meta không phát minh ra DOM ảo, ý tưởng DOM ảo đã có trước khi react ra đời. Vue.js, Elm cũng sử dụng DOM ảo, mỗi framework, library có cách implement DOM ảo khác nhau.

## 7. Meta là cha đẻ của react?
Không, Jordan Walke (một nhân sự cũ của Meta) mới là người tạo ra react, sau đó react được phát triển và maintain bởi Meta. Ông đã tạo ra FaxJS, một prototype của React. Nguyên  nhân ban đầu được cho là phần giao diện hiển thị quảng cáo của Meta (facebook lúc bấy giờ) ngày càng nặng nề và khó maintain, Meta cần giải pháp tối ưu để giải quyết vấn đề đó,  Jordan Walke là người đảm nhận trọng trách này. Khi react lần đầu được giới thiệu trước công chúng, hầu hết mọi người đều hoài nghi và cho rằng react là một bước đi lùi.

## 8.  Tại sao Meta chia react thành 2 thư viện react và reactDOM?
Lý do Meta chia react thành nhiều module vì có sự xuất hiện của react native (react native là framework cross flatform để lập trình app di động) react là phần lõi xử lý chung cho cả web và app di động trong khi reactDOM chỉ dành riêng cho web (app di động không có khái niệm DOM).

## 9. React gọi là thư viện hay framework?
React là một thư viện javascript để lập trình giao diện theo hướng single page application. Không thể tạo ra một app react hoàn chỉnh, đầy đủ chức năng nếu chỉ cài đặt những library react gốc do chính Meta phát hành mà phải cài thêm nhiều thư viện của các tổ chức khác nữa. Do react là dự án mã nguồn mở nên có rất nhiều cá nhân, tổ chức phát triển tạo nên một hệ sinh thái react đa dạng bao gồm: [react router DOM](https://www.npmjs.com/package/react-router-dom), [SWR](https://www.npmjs.com/package/swr), [react query](https://www.npmjs.com/package/react-query), [material react UI](https://mui.com/), [ant react UI](https://ant.design/),... Không những thế, trong các project lớn angular cũng có thể kết hợp với react.