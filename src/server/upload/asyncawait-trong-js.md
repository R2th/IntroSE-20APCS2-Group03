1. Async / Await là gì?
2. Tại sao nên dùng async/await?
3. Bất cập của async/await
4. Áp dụng async/await vào code
5. Kết

# 1. Async / Await là gì ?
* Async / Await  là code không đồng bộ trong javascript, được tạo ra để đơn giản hóa quá trình làm việc.
* Async khi được gọi tới hàm async nó sẽ xử lý mọi thứ và được trả về kết quả trong hàm của nó.
* Async functions trả về một Promise, nếu function trả về lỗi promise sẽ bị loại bỏ. Nếu function trả về một giá trị promise sẽ được giải quyết.
* Await chỉ có thể sử dụng bên trong các function async.

Ví dụ: Gọi hàm có từ khóa async phía trước luôn trả về một promise, dù trong hàm đó có await hay không.
```
    unction test() {
        var promise = returnTen()
        console.log(promise)
    }

    async function returnTen() {
        return 10
    }

    test() // Promise { 10 }
```
# 2. Tại sao nên dùng async/await?
* Code dễ đọc hơn, việc dùng vòng lặp qua từng phần tử trở nên đơn giản, chỉ việc await trong mỗi vòng lặp.
* Debug dễ hơn bởi mỗi lần dùng await được tính là một dòng code, do đó ta có thể đặt debugger để debug từng dòng như thường.
* Khi có lỗi, exception sẽ chỉ ra rõ ràng đang có lỗi ở dòng số mấy.
* Với promise hoặc callback, việc kết hợp if/else hoặc retry với code asynchnous là một khó khăn vì ta phải viết code rắc rối. Với async/await việc này dễ dàng hơn        nhiều.
# 3. Bất cập của async/await
* Async/Await cũng có một số bất cập mà các bạn cần phải lưu ý khi sử dụng:
    - Không chạy được trên các trình duyệt cũ. Nếu dự án yêu cầu phải chạy trên các trình duyệt cũ, bạn sẽ phải dùng Babel để transpiler code ra ES5 để chạy.
    - Khi ta await một promise bị reject, JavaScript sẽ throw một Exception. Do đó, nếu dùng async await mà quên try catch thì lâu lâu chúng ta sẽ bị… nuốt lỗi               hoặc code ngừng chạy.
    - Async và Await bắt buộc phải đi kèm với nhau! await chỉ dùng được trong hàm async, nếu không sẽ bị syntax error. Do đó, async/await sẽ lan dần ra toàn bộ các           hàm trong code của bạn.
# 4. Áp dụng async/await vào code
* Hiện tại các phiên bản mới nhất của Chrome, Edge và Firefox đã hỗ trợ async/await, nếu dự án không bắt hỗ trợ các trình duyệt cũ thì chúng ta có thể thoải mái dùng async/await để code gọn đẹp hơn.
![](https://images.viblo.asia/707334f8-81a2-4730-945f-bc6fdae97401.png)
# 5. Kết
Bản chất của hàm async chính là Promise, vì vậy để sử dụng được nó ta cần phải sử dụng Promise cho việc xử lý các thao tác bất đồng bộ. Bạn không thể nào dùng await để đợi các hàm có sử dụng hàm phản hồi (callback) được, mà bắt buộc phải gắn nó với một Promise trước khi sử dụng await.
Mặc dù hàm async có cú pháp rất rõ ràng, ta cũng cần phải lưu ý tránh khai báo thừa thiếu các từ khóa gây lỗi, gây hiểu lầm về lô-gíc chương trình. Và đặc biệt lưu ý tới khả năng làm mất đi tính song song của chương trình.
Với sự tiện dụng của hàm async, ta nên cố gắng sử dụng nó ngay từ bây giờ để giảm thiểu việc bảo trì sau này.

*Đây là những gì cơ bản mình tìm hiểu được các bạn có thể tìm hiểu thêm các link dưới đây :*
* https://medium.com/@_bengarrison/javascript-es8-introducing-async-await-functions-7a471ec7de8a
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
* https://medium.com/front-end-hacking/callbacks-promises-and-async-await-ad4756e01d90