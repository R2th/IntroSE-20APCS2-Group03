Trong phần đầu tiên, chúng ta đã tìm hiểu về khái niệm của xử lí đồng bộ (Sync) và bất đồng bộ (Async), cũng như bản chất thực sự của các xử lí bên trong Javascript. Trong phần tiếp theo này, chúng ta sẽ xem xét tới những hàm “bất đồng bộ” như setTimeout() và xử lí AJAX.
 
# 1.  Khi bạn không muốn Mr. X xử lí ngay yêu cầu của bạn.
  Giả sử, bạn gởi một yêu cầu tới Mr. X bằng một tin nhắn thông qua Mr. M, chúng ta hãy xem xét tới thời điểm Mr. X bắt đầu xử lí yêu cầu của bạn. Yêu cầu của bạn cho Mr. X như sau: **“sau 1 khoảng thời gian (Ví dụ sau 5 giây), hãy giúp tôi xử lí việc ABC”**, câu hỏi là: Mr. X có “đứng im” không làm gì cả trong 5 giây, và chỉ khi sau 5 giây mới thực hiện việc ABC cho bạn hay không? 
  **Câu trả lời là: KHÔNG.**
  
**Vậy Mr. X xử lí thế nào?**

Câu trả lời hợp lí là: Khi gặp 1 yêu cầu có dạng “sau xxx giây, thực hiện việc yyy” thì:

**Mr. X sẽ nhờ tới 1 anh giúp việc khác (gọi là Mr. H – H nghĩa là Help).** Công việc của Mr. H là: sau đúng xxx giây như yêu cầu, Mr.H sẽ gửi yêu cầu xử lí việc yyy vào hàng đợi tin nhắn (message queue) mà Mr. M đang quản lí.

Bởi chỉ có Mr. M mới có thẩm quyền đưa yêu cầu tới cho Mr. X mà thôi. Như vậy, yêu cầu xử lí ban đầu được đưa về đúng dạng “tin nhắn xử lí thông thường” với sự giúp đỡ của Mr. H.

# 2. Cơ chế thực thi của hàm setTimeout().
  Tương tự như các xử lí của Mr. X và đồng sự trình bày ở phần trên, hàm setTimeout() được dùng khi bạn muốn yêu cầu của mình chỉ được xử lí sau 1 khoảng thời gian nhất định. Bạn sẽ truyền hàm xử lí của bạn vào setTimeout() với format sau:
  
`1 setTimeout(function, delay-time, arguments ...);`

Tham số function là hàm xử lí của bạn, delay-time là thời gian trì hoãn được tính bằng milisecond, và arguments là các tham số khác nếu cần truyền vào.

Chạy thử một ví dụ thực tế sau đây. Yêu cầu chính của bạn là: in ra dòng chữ “Test setTimeout” sau 1 giây trì hoãn kể từ khi nhận yêu cầu. Vòng lặp for ở phía dưới để đảm bảo hàng đợi tin nhắn vẫn luôn có các yêu cầu mới.

```
setTimeout(function () {
    console.log("Test setTimeout"); 
}, 1000);
 
for (var i = 0; i < 10000; i++) {
    console.log("Test For");
}
```

Về mặt logic, hàm setTimeout() được kích hoạt trước vòng lặp for, tức là nó được gửi tới message queue trước. Khi chạy đoạn code này, ta sẽ thấy các dòng chữ “Test For” được in ra trước và ngay lập tức, xử lí in ra “test setTimeout” không được xử lí ngay vì có delay-time là 1000 milisecond (1 giây), điều đó chứng tỏ: khi gặp lệnh setTimeout(), Mr.X vẫn tiếp tục xử lí các yêu cầu khác.

 Sau 1 giây, yêu cầu in ra “Test setTimeout” được đưa vào message queue, nhưng nó sẽ không được thực thi ngay vì lúc này Call-stack đang bị chiếm bởi nó chưa xử lí xong yêu cầu in ra “Test For”, chỉ khi nào Call-stack xử lí xong công việc hiện tại, thì Event-loop mới lấy yêu cầu mới từ message queue để xử lí tiếp. Đó là lí do vì sao dòng chữ “test setTimeout” có thể mất lâu hơn 1 giây để được in ra màn hình. Kết quả thử nghiệm được thể hiện qua hình sau:

![](https://images.viblo.asia/47b79140-3fe9-4223-ac7b-9b5acd30f066.png)

# 3. Cơ chế và trình tự chạy khi gọi AJAX.

 Kĩ thuật AJAX (Asynchronous Javascript And XML) là một kĩ thuật sử dụng các XMLHttpRequest (XHR) API để gửi request tới server và quản lí các response.
 
 Thông thường, khi gửi một request tới server, thì trang web đang hiển thị sẽ được load lại toàn bộ để hiển thị nội dung mới. Bằng các sử dụng AJAX, trang web vẫn có thể hiển thị nội dung mới mà không cần phải tải lại toàn bộ trang.
 
 ![](https://images.viblo.asia/9ddbd57f-d53d-4dfd-8321-1a9927fd5d47.png)

Mặc định, khi gửi một request bởi XHR thì code xử lí đang ở dạng “bất đồng bộ”, có nghĩa là code vẫn tiếp tục chạy mà không cần đợi phản hồi từ server. Tuy nhiên ta vẫn có thể cấu hình để XHR có thể chạy “đồng bộ”, tức là sẽ cần phải nhận được phản hồi từ server thì code phía sau mới có thể chạy tiếp được.



# Tài liệu tham khảo
https://nhungdongcodevui.com/2017/08/12/javascript-hieu-ro-co-che-xu-li-dong-bo-va-bat-dong-bo-sync-vs-async-trong-javascript-p2/