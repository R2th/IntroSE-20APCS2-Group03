# Mở Đầu

-----


Chắc hẳn khi các bạn viết JS thì việc chúng ta dùng `console ` để debug là điều hiển nhiên và có thể nói mình đã dùng nó hàng ngàn lần tuy nhiên quanh đi quanh thì thật sự mình chỉ biết mỗi có `console.log()` cho đến khi lượn lờ trên medium mình đọc được bài viết về một số tip để debug với console nhân tiện mình xin phép chia sẻ đến tất cả mọi người luôn :))) thực ra ngoài console.log() thì còn rất nhiều cái khác mà chúng ta chưa biết !


một số hàm cơ bản của console
```
console.log ( 'Hello World!'); // Log lại một tin nhắn hoặc một đối tượng

console.info ( 'Something happened…'); // tương tự như console.log

console.warn ( 'Something strange happened…'); / tương tự như console.log nhưng kết quả đầu ra một cảnh báo

console.error ( 'Have some error …'); // tương tự như console.lognhưng kết quả đầu ra một lỗi
```

Vì vậy, hy vọng bây giờ, mình có thể chia sẻ cho các các bạn số tip hay ho để chúng ta debug like a boss (yaoming).

### Tip #1 console.trace()
Nếu bạn muốn biết ở đâu mà log đang được thì nhắc console.trace() để get stack data đã được log lại

![](https://images.viblo.asia/42769e83-a49a-4517-8dc2-51fdc752cddc.png)

### Tip #2 console.time() && console.timeEnd()
Nếu bạn muốn biết log time chạy là bao nhiêu để tối ưu hóa JS performance thì hãy dùng console.time() && console.timeEnd()

![](https://cdn-images-1.medium.com/max/800/0*_sjTwH0wheUnTNwS.)

### Tip #3 console.memory
Nếu hiệu suất của bạn là thậm chí còn phức tạp hơn, bạn đang tìm kiếm phần memory đang bị xử dụng lãng phí, bạn có thể muốn thử và sử dụng console.memory (property)  tham số truyền vào nên là property không phải là một function để kiểm tra trạng thái kích thước heap.

![](https://cdn-images-1.medium.com/max/800/0*TwZCRQT00_M_whPx.)
### Tip #4 console.profile(‘profileName’) & console.profileEnd(‘profileName’)
console.profile(‘profileName’) & console.profileEnd(‘profileName’) nó không phải là một chuẩn nhưng nó được support rất rộng rãi và bạn có thể start và end một browser performance tool - performance profile ở phần code mà bạn đang sử dụng.
console.profile(‘profileName’) và sau đó console.profileEnd(‘profileName’). nó sẽ giúp này sẽ giúp bạn cấu hình CHÍNH XÁC những gì bạn muốn, và ngăn chặn bạn nhấp chuột, phụ thuộc vào thời gian

### Tip #5 console.count(“STUFF I COUNT”)

Trong trường hợp các hàm hoặc code lặp lại thì sử dụng `console.count()` thì bạn có thể đếm được chính xác là code của bạn đã được count bao nhiêu lần.

![](https://cdn-images-1.medium.com/max/800/0*2qPLnMbPnEEEd-ZI.)

### Tip #6 console.assert(false, “Log me!”)

`console.assert()` sẽ giúp chúng ta log điều kiện mà không cần phải sử dung log với if - else 
*disclaimer — trong Node.js nó sẽ throw ra một Assertion Error!

![](https://cdn-images-1.medium.com/max/800/0*YT5ZhiTxIPZyvQaQ.)

### Tip #7 console.group(‘group’) & console.groupEnd(‘group’)

vậy sau khi mà ghi quá nhiều log thì chúng ta muốn sửa lại chúng với `console.group(‘group’) & console.groupEnd(‘group’)` sẽ giúp chúng ta làm điều này một cách dễ dàng bằng việc gom chúng lại với nhau thành từng group như log level 1, level 2, level 3 ....

![](https://cdn-images-1.medium.com/max/800/0*Y401GVdaEuhYlLWw.)

### Tip #8 String substitutions

Khi đang logging thì bạn có thể kết hợp các biến bằng cách sử dung string thay thế như sau.
 (%s = string, %i = integer, %o = object, %f = float).
 
 ![](https://cdn-images-1.medium.com/max/800/0*eYUWJnjCq1lZjOQA.)

### Tip #9 console.clear()
console.clear() dùng để xóa hết các log trên console

![](https://cdn-images-1.medium.com/max/800/0*sWJyvxQqHFjfdjTP.)

### Tip #10 console.table()
chúng ta có thể log dưới dạng bảng bằng console.table()
như ví dụ bên dưới 

![](https://cdn-images-1.medium.com/max/800/0*FhsbYcmkDt7jLJl4.)

Qua 10 tip bên trên mình hy vọng bài viết sẽ giúp ích nhiều hơn cho các bạn khi chúng ta debug JS
Nguồn : [Medium](https://medium.com/appsflyer/10-tips-for-javascript-debugging-like-a-pro-with-console-7140027eb5f6)