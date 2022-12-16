Trong dự án single page hầu hết chúng ta sẽ xử lý form cho vào hết store để tiện cho việc xử lý sau này, thường sẽ liên quan nhiều đến việc validate form, format lại định dang dữ liệu trước khi submit dữ liệu lên server.

Mọi việc tưởng chừng rất đơn giản, nhưng khi QA log bug liên quan đến clear form data thì mọi việc trở nên phức tạp hơn rồi 

Các kiểu log bug của QA thường có 2 dạng, mình xin tổng hợp lại để các bạn làm các dự án single page sau biết mà xử lý trước đi nha :D

Dạng 1: Form bị nhấp nháy, tức là sao trong lúc chuyển từ page này sang page khác form clear dữ liệu rồi mới chuyển

Dạng 2: Dạng này mọi người hay gặp trong vấn để xử lý single page, đó là không clear form data, tức là sao khi chúng ta tha nhập form xong back lại page khác, xong lại back lại page đó, thì dữ liệu vẫn còn nguyên

Dạng 3: Cũng liên quan đến nhấp nháy, nhưng dạng này hơi khác là khi load page, dữ liệu cũ sau đó mới update lại dữ liệu mới


Trong dự án mình thường gặp 3 dạng bug liên quan đến form data. Sau đây mình sẽ chia sẻ cách mình xử lý trong dự án của mình 

Cách 1: Sử dụng `routeChangeStart` bắt sự kiện user chuyển page chúng ta bắt đầu clear form.

Ưu điểm: code clear, chúng ta viết một hook sử dụng chung cho các component 

Nhược điểm: chúng ta phải sử dụng timeout để khi chuyển page xong mới clear, nếu không bị QA log bug nhấp nháy dữ liệu bị mất lúc chuyển trang, cái mà mình vẫn gọi là `nhấp nhánh` ở trên ấy

Cách 2: Cách này xử lý nhanh gọn lẹ, chúng ta clear form ngay trong quá trình khởi tạo page, trước lúc render. Đó là chúng ta `dispatch` một action clear ngay trong function `getInitialProps` 

cách này đảm bảo form lúc nào cũng được clear trước khi render, cũng như không bị lỗi hiển thị dữ liệu cũ sau đó update giữ liệu mới. 

Đó là 2 cách mình hay dùng để clear form data trong dự án `NextJS`. Cách 2 là cách đơn giản nhất mà bạn có thể áp dụng ngay được, còn cách 1 thì tuỳ tường trường hợp, nhiều trường hợp bạn còn check url các param, hay các query thì nên cùng cách 1. Mình thường kết hợp cả hai trong dự án một cách linh hoạt, để đạt hiệu quả cao nhất

Nếu các bạn có cách nào hay hơn, xin cùng mình thảo luận phía dưới phần comment nhé!