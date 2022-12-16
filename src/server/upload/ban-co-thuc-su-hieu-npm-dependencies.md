Bạn đang viết một mobile/web app, bạn có một bộ component và muốn đóng gói nó lại thành một library và publish lên npm cho cộng đồng sử dụng...

Vậy thì liệu bạn có biết...

* File `yarn.lock` của bạn sẽ bị bỏ qua khi người khác install library?
* Bạn có biết điều đó nghĩa là mọi testsuit bạn chạy ok trên máy bạn nhưng lại hoàn toàn có thể lỗi trên máy người dùng trừ khi bạn không sử dụng đánh số phiên bản như `^1.0.0` và chỉ hardcode nó thành `1.0.0`?
* Bạn có nhận ra rằng mặc định của `^1.0.0` tự động nhận được các update *minor version*, nhưng chúng có thể là những thay đổi khá đáng kể, thậm chí là vài **breaking change**?
* Bạn có biết rằng các thư viện lớn hơn như *@material-ui/core* thường không muốn thay đổi *major version*, nên một số thay đổi lớn có thể được cập nhật qua *minor version*?
* Bạn có biết nếu bạn chạy `yarn upgrade`, nó có thể cập nhật những gì có trong file `yarn.lock` của bạn nhưng sẽ bỏ qua `package.json`?
* Bạn có nhận ra rằng điều này có nghĩa là nếu bạn phụ thuộc vào kết quả của việc chạy `yarn upgrade`, thì nó có thể sẽ ship bugs đến tận tay người dùng library của bạn?

Trên đây chỉ là vài thứ bạn nên để ý, bạn hoàn toàn có thể chấp nhận rủi ro từ việc update minor version và tiếp tục sử dụng, nhưng nó có thể giải thích cho việc người dùng library của bạn gặp vài vấn đề (nếu có).

Fun fact: Nếu bạn có một phiên bản `^1.0.0` trong package.json của mình, bạn update nó lên thì trong lockfile nó sẽ hiện là `1.1.0` nhưng sau đó bạn cài đặt một thư viện khác yêu cầu phiên bản `1.0.1` (hard code), thì yarn sẽ quyết định downgrade bạn xuống `1.0.1` (và sẽ không có trùng lặp trong yarn.lock, chỉ đơn giản là phiên bản `1.1.0` ở trong yarn.lock sẽ bị downgrade xuống `1.0.1`)

https://vir.vn/ban-co-thuc-su-hieu-npm-dependencies/
https://cmdcolin.github.io/archives