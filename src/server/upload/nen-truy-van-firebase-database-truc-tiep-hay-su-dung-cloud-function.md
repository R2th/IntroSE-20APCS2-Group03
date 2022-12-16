![](https://images.viblo.asia/8e59b353-692c-486b-bbba-efa8a65d8e5f.png)

Khi xây dựng ứng dụng, chắc chắn không thể thiếu truy vấn dữ liệu từ database  và hiển thị kết quả trên màn hình. Firebase đã giúp việc này trở nên dễ dàng hơn qua việc cung cấp các SDK giúp ứng dụng có thể đọc và ghi một cách trực tiếp trên database (Realtime Database và Cloud Firestore). Tuy nhiên, có những trường hợp bạn lại muốn để tất cả các request qua cấu trúc server side, như Cloud Function để quản lý truy vấn. Vậy khi nào dùng query thẳng từ client và khi nào nên gọi request thông qua Cloud Function? Sẽ khó lòng mà tìm được câu trả lời đúng hay sai ở đây, vì vậy hãy cân nhắc sự lựa chọn qua việc đánh giá các thuộc tính quan trọng nhất ở bài viết này nhé.

Trong bài viết này, mình sẽ sử dụng từ "trực tiếp" để nói về truy cập database sử dụng FIrebase SDKs để truy vấn mà không thông qua backend. Còn "gián tiếp" khi truy cập thông qua Cloud Functions hoặc một backend khác.

Dưới đây là một ví dụ truy cập trực tiếp đến Cloud Firestore từ web client sử dụng JavaScript. Nó chỉ đơn giản là lấy ra tất cả document trong 1 collection, sắp xếp chúng bởi 1 trường timestamp, và giới hạn 100 kết quả trả về. Đối tượng snapshot trả về sẽ chứa tất cả các kết quả bạn cần, sẵn sàng để sử dụng tiếp.

```js
const firestore = firebase.firestore()
const snapshot = await firestore
    .collection("posts")
    .orderBy("lastModified")
    .limit(100)
    .get()
```
Còn dưới đây là ví dụ về truy cập gián tiếp, thông qua HTTP của Cloud Function, cũng được viết bằng JavaScript. Kết quả nhận được thì giống nhau, chỉ ngoại trừ bây giờ client phải gọi nó thông qua HTTP request và kết quả trả về sẽ có định dạng JSON

```js
const admin = require("firebase-admin")
const firestore = admin.firestore()
exports.getLatestPosts =
functions.https.onRequest(async (req, res) => {
    const snapshot = await firestore
        .collection("posts")
        .orderBy("lastModified", "desc")
        .limit(100)
        .get()
    res.send(snapshot.docs.map(doc => doc.data()))
})
```
Bây giờ, chúng ta sẽ so sánh 2 cách này thông qua một số đặc điểm quan trọng như:
- Performance
- Chi phí
- Bảo mật và phân quyền
- Realtime data

# Performance
Tất nhiên, tất cả chúng ta đều muốn database sẽ được truy cập nhanh nhất có thể. Đó là yếu tố đầu tiên để quyết định chọn truy cập trực tiếp hay gián tiếp. Và cách truy cập trực tiếp thường sẽ nhanh hơn gián tiếp. Và đây là lí do :

## Local caching
Firsebase SDKs cung cấp local cache để lưu trữ các kết quả truy vấn sử dụng cho tương lai. Khi client app đưa ra một truy vấn, SDK sẽ xác định rằng cache có đang chứa kết quả mới nhất cho truy vấn này hay không, nếu có, kết quả sẽ được lấy trực tiếp ra từ cache. Lợi ích rõ ràng ở đây là băng thông network và độ trễ sẽ giảm đáng kế. Kết quả xuất hiện nhanh hơn, kể cả khi offline => trả ít chi phí dữ liệu hơn.


**Nếu bạn tạo request đến Cloud Functions, mặc định sẽ không có cơ chế caching trên client-side.** Còn nếu vẫn bạn muốn cache lại kết quả, bạn sẽ phải thực hiện trên client, chọn một kỹ thuật cache nào đó để áp dụng (ví dụ: Room với các ứng dụng Android). Bạn sẽ phải viết và kiểm tra lại tất cả code để đảm bảo cache hoạt động tốt. Bạn cũng cần phát hiện ra nếu kết quả truy vấn trong cache đã bị cũ. 

Tương tự với trường hợp ghi vào database. Nếu bạn ghi một document khi sử dụng SDK trong khi đang offline, việc ghi đó sẽ được lưu trữ trong local, và sẽ được đồng bộ sau, khi có kết nối trở lại. Tuy nhiên, nếu bạn ghi document thông qua Cloud Functions, kết nối HTTP sẽ thất bại khi offline, và client sẽ phải tự gọi lại nếu cần.

Performance rõ ràng đã dành phần thắng cho Firebase client SDK. Nhưng cũng cần lưu ý rằng, khi local cache của SDK ngày càng phình to, một truy vấn phức tạp phải sắp xếp thông qua hàng ngàn bản ghi để thoả mãn điều kiện truy vấn, chi phí phải trả cho việc đó dưới client sẽ trở nên tồi tệ hơn so với truy vấn thực hiện trên server. Để tính toán được performance cho truy vấn của bạn, bạn có thể thực hiện trên production, trên thiết bị của người dùng, với [Firebase Performance Monitoring](https://firebase.google.com/docs/perf-mon)

## Payload size
Một điều quan trọng với hành vi của Firebase database, đó là khi bạn truy cập thông qua client SDKs thực tế rằng bạn đọc bất kỳ node hay document nào, client sẽ luôn nhận được toàn bộ nội dung của nó. Client SDK không hỗ trợ giới hạn node con hoặc các trường document khi trả về, đôi khi được gọi là "projection" trong SQL. Để khắc phục sự hạn chế này, các developer phải cấu trúc database để hỗ trợ cho việc truyền ít dữ liệu nhất cho 1 query. Việc này có thể dẫn đến dữ liệu bị lặp ở nhiều nơi.

Tưởng tượng rằng bạn có một collection cho các bài viết blog, gọi là posts. Để ý rằng có 1 trường `text`  rất dài. 
![](https://images.viblo.asia/e9a2064c-8976-4767-b1d2-9ef838a3ae20.png)

Nếu bạn muốn truy vấn collection này trên client để hiện thị danh sách các bài viết thoả mãn một số điều kiện, client cần phải tải xuống tất cả nội dung blog post thoả mãn điều kiện, kể cả trường `text` không cần thiết. Vì vậy, để tăng tốc độ, bạn có thể chuyển trường `text` sang một collection riêng biệt,  ```posts-text```:

![](https://images.viblo.asia/56268fe7-8546-48cf-904f-84ace2cf2c1e.png)

Và bây giờ, truy vấn lại ```posts``` sẽ được thực hiện nhanh hơn trên client, và document cho text của post sẽ được lấy ra chỉ khi nào cần.
Tuy nhiên, nếu bạn thay đổi cấu trúc của schema chỉ vì perfomance khi truy vấn, thì sử dụng Cloud Function sẽ là sự lựa chọn tốt hơn. Function có thể truy vấn nhanh hơn, chỉ lấy những trường cần thiết để hiển thị, và gửi chúng cho client.
Không có cách chính xác để quyết định sử dụng truy cập trực tiếp hay gián tiếp vì payload size. Bạn sẽ cần phải cân nhắc các tùy chọn để tìm ra cách tốt nhất.

# Chi phí
Tổng chi phí cho Firebase databases  (Cloud Firestore, Realtime Database) sẽ được tính chủ yếu dựa vào lượng data mà bạn đọc ghi. Như đã đề cập trong phần Local caching, local cache của Firebase SDK sẽ giúp giảm thiểu số lần đọc data.

Nếu bạn truy vấn gián tiếp thông qua Cloud Function, bạn sẽ phải trả chi phí cho truy vấn ngoài chi phí thực hiện function. SDKs server bạn sử dụng trong Cloud Functions sẽ không có cache data, vì vậy mỗi lần thực hiện bạn sẽ phải trả đầy đủ chi phí truy vấn. Một số develop có thể tối ưu bằng việc triển khai một lớp caching trong bộ nhớ hoặc sử dụng Google cloud product (như [Cloud Memorystore](https://cloud.google.com/memorystore/)) để giảm thiểu chi phí

# Bảo mật và phân quyền
Cả [Cloud Firestore](https://firebase.google.com/docs/firestore/security/get-started) và  [Realtime Database](https://firebase.google.com/docs/database/security) đều cung cấp các rule bảo mật để kiểm soát truy cập vào data. Việc triển khai các rule một cách chính xác và toàn diện là rất quan trọng với bảo mật ứng dụng. Tuy nhiên, nó chỉ hoạt động cho những truy cập đến từ client SDK.

Khi những truy vấn là gián tiếp thông qua Cloud Functions, client SDKs sẽ không thể sử dụng. Bạn sẽ phải dùng Firebase Admin SDK, một trong các server SDKs khác. SDK này được khởi tạo từ 1 service account thay vì end user trong Firebase Authentication. Truy vấn từ những SDKs được hiểu là “đặc quyền”, nó hoàn toàn bỏ quả tất cả các rule bảo mật, vì thế mà bạn có thể đọc ghi thoải mái dữ liệu. Do đó, nếu bạn cần kiểm soát truy cập dữ liệu vào ra bởi Cloud Functions, bạn cần phải viết thêm các code logic riêng biệt cho rules bảo mật của mình.

(Chú ý rằng Realtime Database có cung cấp khởi tạo Admin SDK thông qua Firebase Authentication UID, tuy nhiên, nó sẽ litmit truy cập bởi vì rule bảo mật áp dụng cho UID. Và tính năng tương đương UID đó thì không áp dụng cho Cloud Firestore)
```js
{
  "rules": {
    "foo": {
      ".read": true,
      ".write": false
    }
  }
}
```
Để thực hiện các rule cho bảo mật, hãy bắt đầu với Firebase security rules. Bạn sẽ thấy rằng các rule được viết bằng một ngôn ngữ đặc biệt, nó cũng không phải là ngôn ngữ lập trình đầy đủ. Để tăng khả năng bảo mật, sẽ có những hạn chế nếu bạn dùng nó. Vì vậy, nếu bạn gặp phải những hạn chế này, hãy nghĩ tới Cloud Function. Ví dụ, nếu bạn muốn giới hạn nghiêm ngặt cho các truy vấn, bạn sẽ phải sử dụng Cloud Function cho nó, và bắt buộc người dùng phải gọi đến function thay vì truy cập trực tiếp. Hoặc, nếu client không được phép đọc một số trường nhất định trong 1 document, function sẽ lọc ra dữ liệu trước khi nó được gọi.

# Realtime data
Firebase database có một tính năng rất rất đặc biệt đó là cho phép bạn lắng nghe sự thay đổi của data theo thời gian thực. Vì vậy, nếu phía client muốn lắng nghe một vị trí cụ thể nào đó trên database, nó sẽ attatch đến một listener tại vị trí đó, và listener đó sẽ gọi lại callback bất cứ khi data thay đổi. Nó cũng hoạt động với những truy vấn trên nhiều nodes hoặc document, nếu kết quả thay đổi theo thời gian, listener cũng sẽ nhận được những thay đổi này. Và khi không cần lắng nghe sự thay đổi nữa, client cần xoá những listener này đi.

Ví dụ, với Cloud Firestore, bạn có thể lắng nghe sự thay đổi của tất cả các post thông qua sử dụng `onSnapshot()` thay vì `get`
```js
const firestore = firebase.firestore()
const unsubscribe = firestore
    .collection("posts")
    .orderBy("lastModified")
    .limit(100)
    .onSnapshot(querySnapshot => {
        // this gets called whenever the results
        // of the query change over time
})
```
Tính năng realtime này hoạt động rất tốt với client app, tuy nhiên, nó sẽ không phù hợp để triển khai với Cloud Functions.

# Vậy, nên chọn cái nào?
Sẽ không thể kết luận nếu không biết yêu cầu cụ thể bạn cần là gì. Nó cần dựa vào một số quy chuẩn, ước tính chi phí, và  yêu cầu chi tiết của bạn để đưa ra sự lựa chọn tốt nhất. Đôi khi, kết hợp cả truy vấn trực tiếp và gián tiếp mới là sự lựa chọn tốt nhất. Nếu bạn vẫn đang phân vân nên sử dụng cách nào, hãy đăng bài lên Firebase Google Group [firebase-talk](https://groups.google.com/forum/#!forum/firebase-talk) hoặc [Firebase subreddit](https://www.reddit.com/r/Firebase/). Cộng đồng Firebase hoạt động rất tích cực và sẵn sàng giúp đỡ bạn.

Nguồn: https://medium.com/firebase-developers/should-i-query-my-firebase-database-directly-or-use-cloud-functions-fbb3cd14118c