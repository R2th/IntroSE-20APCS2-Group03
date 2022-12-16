> Form trong React về mặt lí thuyết là chậm.
> 
> Nhưng khi form đủ lớn thì vấn đề không còn là trên lí thuyết nữa, ta có thể thấy rõ độ lag nhất định trên UI.
>
> Bài này gồm một phương án workaround rất đơn giản nhưng không phổ cập và một tính năng hoàn toàn mới giải quyết gọn lẹ vấn đề này ở phiên bản sắp tới  của React (có thể sẽ ra luôn trong bản 17)

### Form lag trông sẽ ra sao

[Demo](https://codesandbox.io/s/react-laggy-form-449x5) sau đây mô phỏng lại quá trình form lag dần đều:
* Input này thay đổi, dẫn đến input khác thay đổi (vd: đổi firstname thì fullname sẽ thay đổi theo)
* Thay đổi input có nhiều tính toán (vd: nhập email thì chạy validation, nhập số điện thoại thì thêm mã tỉnh, nhập số thì tự convert sang đơn vị tiền)
* Combo kết hợp từ 2 cái trên (input 1 mất X ms, input 2 mất Y ms, ... nhập input 1 thì update input 2, ấn một phím là mất X + Y + ... thời gian xử lí)
* Quá trình tính toán thay đổi, chạy validation, transform input càng lằng nhằng thì càng lâu, mà chết cái là code sync nó sẽ block UI

(Lưu ý: cái demo tôi có chạy code block cpu, bạn nên tắt nó đi sớm sau khi xem, để bớt treo máy :worried:, hoặc nếu máy bạn trâu quá không treo nổi thì có thể tăng số lượng item lên cho lag hơn :kissing_smiling_eyes:)

### Xử lí form lag bằng delay xử lí

Một cách xử lí đơn giản nhất là delay thay đổi, đợi người dùng nhập chán rồi mình mới xử lí. Tức là so với cách phổ thông, nó sẽ giảm được kha khá số lần tính toán:
```
Cách phổ thông O(n):
- nếu 1 input thay đổi sẽ khiến 5 input khác thay đổi theo
- thì khi ta nhấn 1 phím, nó sẽ chạy 5 lần tính toán
- khi ta nhấn n phím, nó sẽ chạy tổng cù là 5 x n lần tính toán

Cách delay O(1):
- nếu 1 input thay đổi sẽ khiến 5 input khác thay đổi theo
- thì khi ta nhấn 1 phím, rồi phát 1 tín hiệu "hãy xử lí tiếp", nó sẽ chạy 5 lần tính toán
- khi ta nhấn n phím, rồi phát 1 tín hiệu "hãy xử lí tiếp", nó cũng vấn sẽ chạy 5 lần tính toán
```

Tuy giảm tải được rất nhiều lần tính toán, nhưng ta phải ôm thêm những vấn đề sau đây:
* nếu delay theo thời gian, thì đợi bao lâu đã là một quyết định đau đầu
* nếu delay theo blur, thì việc quản lý event lại phải ôm hết về tay coder, không cẩn thận thì lại một rổ bug

Nhìn chung, với phương án delay thì ta đã xử lí được đa số các trường hợp về performance của form rồi. Tuy nhiên đánh đổi là việc code sẽ trở nên rối rắm phức tạp hơn. Và sẽ thật tuyệt vời nếu có một công cụ tự delay việc re-render thay cho ta...

Và đây là một [Demo](https://codesandbox.io/s/react-reduce-form-lag-by-blur-dqf2m) đơn giản.

### React concurrency mode

Hứa thật nhiều và chưa biết thất hứa sẽ như thế nào. React phiên bản sắp tới sẽ giới thiệu về tính năng concurrency, hiểu sơ sơ thì nó cải thiện performance bằng cách can thiệp sâu vào cơ chế render, xử lí việc code blocks UI, network blocks UI, ... mà phương thức là "delay render một cách hợp lí".

Sau đây là [Demo](https://codesandbox.io/s/react-reduce-form-lag-by-defer-render-9t1ms) sử dụng concurrency mode, các bạn lưu ý là các package sử dụng trong demo này đều là các phiên bản thử nghiệm, sẽ chưa có trên bản chính thức.

Thật tuyệt vời đúng không các bạn, nào chúng ta cùng chờ đón React 17 :laughing:

Ref: https://reactjs.org/docs/concurrent-mode-intro.html