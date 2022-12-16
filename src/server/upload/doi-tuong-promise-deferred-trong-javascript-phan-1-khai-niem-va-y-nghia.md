Trong quá khứ không quá xa, công cụ chính dành cho các lập trình viên JavaScript để xử lý các sự kiện không đồng bộ là `callback`.
Một `callback` là một đoạn mã thực thi được truyền như một đối số cho các mã khác, dự kiến sẽ gọi lại (execute) đối số tại một thời gian thuận tiện.
Nói cách khác, một hàm có thể được truyền như một đối số cho một hàm khác sẽ được thực hiện khi nó được gọi. 
Không có gì vốn có sai với callbacks, nhưng tùy thuộc vào môi trường chúng ta đang lập trình có một số tùy chọn có sẵn để quản lý sự kiện không đồng bộ. Trong bài đăng này mục tiêu của tôi là kiểm tra một bộ công cụ có sẵn: `promise` objects and `deferred` objects. Trong phần I, chúng ta sẽ đề cập đến lý thuyết và ý nghĩa và trong phần 2 chúng ta sẽ xem xét việc sử dụng.

Một trong những chìa khóa để hiệu quả làm việc với các sự kiện không đồng bộ trong JavaScript là hiểu rằng chương trình vẫn tiếp tục thực hiện ngay cả khi nó không có giá trị nó cần cho công việc đang được tiến hành. Xử lý các giá trị chưa được biết đến từ công việc chưa hoàn thành có thể làm cho làm việc với các sự kiện không đồng bộ trong JavaScript đầy thách thức - đặc biệt là khi bạn lần đầu tiên bắt đầu.
Một ví dụ cổ điển về điều này sẽ là một XMLHttpRequest (Ajax). Hãy tưởng tượng chúng tôi muốn:
- Thực hiện một yêu cầu Ajax để lấy một số dữ liệu
- Ngay lập tức làm điều gì đó với dữ liệu đó, và sau đó
- Làm những thứ khác
Trong chương trình của chúng tôi, chúng tôi bắt đầu yêu cầu Ajax. Yêu cầu được thực hiện nhưng không giống với sự kiện đồng bộ, việc thực hiện chương trình của chúng tôi không bị dừng lại trong khi máy chủ đang phản hồi, thay vào đó chương trình tiếp tục chạy. Bởi thời gian chúng tôi nhận được dữ liệu phản hồi từ yêu cầu Ajax của chúng tôi, chương trình đã hoàn thành thực hiện.

## Promises & Deferreds: Chúng là gì?

Lời hứa là một chương trình đã được xây dựng khoảng từ năm 1976. Tóm lại:
- Một promise thể hiện một giá trị chưa được biết đến
- Một deferred được hoãn lại là công việc chưa hoàn thành
- 
Được đánh giá từ mức cao hơn, promise trong JavaScript cho chúng ta khả năng viết mã không đồng bộ theo cách song song với mã đồng bộ. Hãy bắt đầu với một sơ đồ để có được cái nhìn tổng quan về bức tranh toàn cảnh trước khi tìm hiểu vào những chi tiết cụ thể.
![](https://images.viblo.asia/e372a420-dd42-4b75-87d6-1aeacc6edfb4.png)

Một `promise` là một trình giữ chỗ cho một kết quả mà ban đầu không rõ trong khi một `deferred` đại diện cho tính toán mà kết quả trong giá trị. Mỗi lần hoãn lại có một `promise` có chức năng như là một proxy cho kết quả trong tương lai. Trong khi một `promise` là một giá trị trả về bởi một chức năng không đồng bộ, một `deferred` có thể được giải quyết hoặc từ chối bởi người gọi đó tách `promise` từ kết quả. Bản thân `promise` có thể được trao cho bất kỳ người dùng nào và mỗi người sẽ thực hiện giải pháp một cách độc lập trong khi người giải quyết / deferred có thể được trao cho bất kỳ nhà sản xuất nào và `promise` sẽ được giải quyết bởi người đầu tiên giải quyết nó. Từ quan điểm ngữ nghĩa, điều này có nghĩa là thay vì gọi một hàm (callback), chúng ta có thể trả lại một giá trị (`promise`).

## Promises According to the Promise/A Proposal

The Promises /A Proposal đề xuất các hành vi tiêu chuẩn sau đây và API bất kể chi tiết thực hiện.
Một `promise`:
- Đại diện cho giá trị cuối cùng được trả về từ việc hoàn thành một thao tác
- Có thể ở một trong 3 trạng thái: chưa được hoàn thành, đã hoàn thành và thất bại và chỉ có thể di chuyển từ chưa được hoàn thành thành hoàn thành hoặc không thành công
- Có một chức năng như là một giá trị cho thuộc tính `"then"` (mà phải trả lại một promise)
- Thêm `fulfilledHandler`,  `errorHandler`, `progressHandler` được gọi để hoàn thành promise.
```
then(fulfilledHandler, errorHandler, progressHandler)
```
- Giá trị được trả về từ trình xử lý gọi lại là giá trị hoàn thành cho promise đã trả lại

- Giá trị hứa hẹn PHẢI không được thay đổi (tránh các phản ứng phụ từ người nghe tạo hành vi không lường trước)

Nói cách khác, loại bỏ một số sắc thái cho một thời điểm:
Một promise đóng vai trò là một proxy cho một giá trị trong tương lai, có 3 trạng thái có thể và cần có một hàm bổ sung các trình xử lý cho các trạng thái:fulfilledHandler, errorHandler và progressHandler (tùy chọn) và trả về một promise mới (để cho phép chuỗi) sẽ được giải quyết/bị từ chối khi xử lý hoàn thành việc thực hiện.

### Các trạng thái và giá trị trả về của một lời hứa

Promise có 3 trạng thái có thể: chưa được hoàn thành, đã hoàn thành và thất bại.

- unfulfilled: vì một promise là một proxy cho một giá trị không rõ nó bắt đầu ở một trạng thái chưa được hoàn thành
- hoàn thành: promise tràn ngập giá trị mà nó đang chờ đợi
- thất bại: nếu promise đã được trả lại là một ngoại lệ, nó là ở trạng thái thất bại.
Một promise chỉ có thể di chuyển từ chưa hoàn thành thành hoàn thành hoặc thất bại. Khi giải quyết hoặc từ chối, mọi người quan sát đều được thông báo và thông qua promise/value. Khi promise đã được giải quyết hoặc từ chối không phải là trạng thái hoặc giá trị kết quả có thể được sửa đổi.

Dưới đây là ví dụ về những gì trông giống như sau:
```
// Promise to be filled with future value
var futureValue = new Promise();

// .then() will return a new promise
var anotherFutureValue = futureValue.then();

// Promise state handlers ( must be a function ).
// The returned value of the fulfilled / failed handler will be the value of the promise.
futureValue.then({

    // Called if/when the promise is fulfilled
    fulfilledHandler: function() {},

    // Called if/when the promise fails
    errorHandler: function() {},

    // Called for progress events (not all implementations of promises have this)
    progressHandler: function() {}
});
```

### Khác biệt thực hiện và Hiệu suất

Khi chọn một thư viện promise, có một số cân nhắc để đưa vào tài khoản. Không phải tất cả các hiện thực đều được tạo ra như nhau. Họ có thể khác nhau về các tiện ích được cung cấp bởi các API, hiệu suất và thậm chí trong hành vi.

Vì Promise/A proposal chỉ vạch ra một đề xuất về hành vi của promise và không phải là những chi tiết cụ thể, các thư viện hứa hẹn khác nhau có các bộ tính năng khác nhau. Tất cả triển khai Promise/A proposal đều có chức năng `.then()` nhưng cũng có các tính năng khác nhau trong API của chúng. Ngoài ra, họ vẫn có thể trao đổi lời hứa với nhau. jQuery là ngoại lệ đáng chú ý của quy tắc vì việc thực hiện các promise không hoàn toàn Promise/A proposal. Tác động của quyết định này được ghi lại ở đây và thảo luận ở đây.
Trong thư viện Promise/A proposal, một ngoại lệ ném được dịch sang một sự từ chối và `errorHandler()` được gọi với ngoại lệ. Trong việc triển khai của jQuery, một ngoại lệ không được xác định sẽ gây trở ngại cho việc thực hiện của chương trình. Kết quả của việc thực hiện khác nhau, có những vấn đề về khả năng tương tác nếu làm việc với các thư viện trả về hoặc mong đợi Promise/A proposal.

Một giải pháp cho vấn đề này là chuyển đổi lời hứa của jQuery thành lời hứa tuân thủ Promise/A proposal với một thư viện hứa hẹn và sau đó sử dụng API từ thư viện tuân thủ.

Ví dụ:
```
when($.ajax()).then()
```

Khi đọc thông qua quyết định của jQuery để gắn bó với việc thực hiện các lời hứa của họ, một đề cập đến việc xem xét hiệu suất đã làm tôi tò mò và tôi quyết định thực hiện một bài kiểm tra hiệu năng nhanh. Tôi đã sử dụng Benchmark.js và kiểm tra các kết quả tạo và giải quyết một đối tượng hoãn lại với một trình xử lý thành công trong `.then()`.
Kết quả:


| jQuery 91.6kb | When.js 1.04kb | Q.js 8.74kb |
| -------- | -------- | -------- |
| 9,979 ops/sec ±10.22%     | 96,225 ops/sec ±10.10%	     | 2,385 ops/sec ±3.42%     |

Sau khi chạy các thử nghiệm này, tôi phát hiện ra một bộ kiểm tra sâu hơn của các thư viện hứa hẹn cho thấy kết quả tổng thể tương tự.
Sự khác biệt về hiệu suất có thể không đáng kể trong một ứng dụng thực nhưng trong các thử nghiệm Benchmark.js của tôi, when.js như là một người chiến thắng rõ ràng. Sự kết hợp của tốc độ và kích thước nhỏ của thư viện làm cho when.js là một lựa chọn tuyệt vời khi xem xét việc thực hiện trong phương trình.
Rõ ràng có những cân bằng để cân nhắc khi lựa chọn một thư viện promise. Câu trả lời cho thư viện bạn nên sử dụng phụ thuộc vào trường hợp sử dụng cụ thể và nhu cầu của dự án của bạn. Một số triển khai để bắt đầu khám phá là:
- **When.js**: Nhanh, nhẹ thực hiện có một số tiện ích hữu ích và như v2.0 đã hỗ trợ đầy đủ cho độ phân giải không đồng bộ.
- **Q.js**: Chạy trong trình duyệt hoặc Node.js, cung cấp một API mạnh mẽ và hoàn toàn Promise/A compliant.
- **RSVP**: Thực thi Barebones có đầy đủ Promise/A compliant.
- **jQuery**: Không có Promise/A compliant nhưng được sử dụng rộng rãi. Nếu bạn đã sử dụng jQuery trong dự án của mình, thật dễ dàng để bắt đầu và đáng xem.

## Kết luận 
Promise cung cấp cho nhà phát triển JavaScript một công cụ để làm việc với các sự kiện không đồng bộ. Bây giờ chúng ta đã đưa ra một số chi tiết cụ thể về những gì promise objects và deferred objects và cách chúng hành xử, chúng ta đã sẵn sàng đi sâu vào chi tiết về cách làm việc với chúng. Trong phần 2, chúng tôi sẽ xem xét kỹ hơn về cách sử dụng các lời hứa, một số thông tin chung và một số chi tiết cụ thể của jQuery API.