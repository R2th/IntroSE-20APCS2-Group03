![image.png](https://images.viblo.asia/d1915437-7a62-45ff-a623-4f195f272ef6.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉. Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Nếu bạn là một người thích sử dụng **VSCode** để phát triển các app **NodeJS**, bạn có thể đã trải qua nỗi đau của việc `Debug` nó. Mặc dù đối với ứng dụng nhỏ hơn, việc xem qua `code`, so sánh dữ liệu với `code` và phân tích có thể dễ dàng hơn, nhưng có thể khó theo dõi khi `codebase` tăng kích thước.

Trong bài viết này, chúng ta sẽ cùng xem qua một số cách **Debug** trong **Nodejs**

1.  `Console.debug`
2.  Debug bằng **Unit Test**
3.  Debug server Express

Hãy xem một đoạn code đơn giản làm ví dụ:

![image.png](https://images.viblo.asia/1690d2e3-482d-4a0f-9ccc-0f6f3e27db02.png)


Và trong một tệp khác:

![image.png](https://images.viblo.asia/ca7ae700-05dd-4e83-bf07-51bbeef8176a.png)


Logic trong ví dụ của chúng ta
-----

Ví dụ, khi state của user được request `{ userId: "1"}`, `inActive` được trả về từ hàm.

Vấn đề phát sinh: Do việc sử dụng ===, `“1”` sẽ không bằng `1`.

Bây giờ hãy bắt đầu **debug** để tìm nguyên nhân gốc rễ :D

Console.debug
------

Cách cơ bản để debug là sử dụng câu lệnh `console.debug`. Mặc dù nó phục vụ cho mục đích **debug**, nhưng sẽ là một quá trình tốn thời gian để thêm `console.debug` mới hoặc cập nhật `console.debug` hiện có để in thêm thông tin. Đối với mỗi dữ liệu bổ sung cần thiết, các câu lệnh phải được thay đổi và ứng dụng cần được chạy lại. Và cuối cùng, việc dọn dẹp các `record` này là một nhiệm vụ phải làm (Và đôi khi bàn quên xóa `console.log` là chuyện quá bình thường luôn :D).

Đoạn code tương tự ở trên với các câu lệnh `debug` bây giờ sẽ là:

![image.png](https://images.viblo.asia/a6000e7f-9778-4234-bf2d-55b57a20b211.png)

Như được đánh dấu, thông tin user được in dưới dạng `undefined`. Để điều tra thêm, chúng ta sẽ phải thêm nhiều `console.debug` hơn và function phải được chạy lại cho đến khi tìm ra nguyên nhân.

![image.png](https://images.viblo.asia/59e09cc5-2521-4d60-8b55-3a15c513b6db.png)

Thêm `console.debug` được thêm vào các function

Debug bằng bài Unit Test
-----

Debug với sự trợ giúp của **Unit Test** sẽ dễ dàng hơn rất nhiều, đặc biệt là khi `code` được bao phủ bởi nó. Chúng ta có thể dễ dàng khai báo các value mock như đang tương tác với dữ liệu thực tế. Đối với ví dụ này, chúng ta sẽ sử dụng mô-đun `Jest`.

Tệp `.test.ts`: chứa dữ liệu thử nghiệm sẽ là dữ liệu mẫu của chúng ta

![image.png](https://images.viblo.asia/e4c777a0-9090-470d-8e84-94e6958269b7.png)

Configure debug cho Jest:

![image.png](https://images.viblo.asia/2e2a61bc-af9b-4634-841a-ced9fa692fc7.png)

Từ hình ảnh trên, bạn có thể thấy rằng chúng ta đã thiết lập chương trình để sử dụng `Jest` và tệp thử nghiệm để chạy được đặt ở `args`. Nếu tệp thử nghiệm của bạn có nhiều thử nghiệm cho cùng một `function`, hãy đảm bảo rằng bạn đã thêm vào `.only` tệp đó. Bằng cách đó, chỉ bài Test bạn định chạy mới được thực thi.

Tất cả đã thiết lập, cho phép thiết lập một điểm ngắt và bắt đầu debug.

![image.png](https://images.viblo.asia/19a6b40a-37ca-48dd-8247-d904026dd69e.png)

Debug dữ liệu

Như bạn có thể thấy, với sự trợ giúp của Unit Test, chúng ta sẽ có thể thiết lập debug khá dễ dàng và phân tích. Tất cả các biến trong hàm hiện tại sẽ được hiển thị trong Biến. Nếu cần theo dõi thêm dữ liệu, bạn có thể thêm dữ liệu đó vào Đồng hồ như hình minh họa. Ngoài ra, chúng ta có thể di chuột qua các biến để kiểm tra value của nó.

Một bất lợi đối với hàm này là, nếu chúng ta có nhiều việc gọi dịch vụ xuôi dòng hoặc truy vấn cơ sở dữ liệu được tham gia, chúng ta sẽ phải cập nhật mô hình với dữ liệu thực tế mà chúng ta phải phân tích.

Debug server Express
======================

Nếu Express được sử dụng trong ứng dụng và việc debug end to end là cần thiết, chúng ta có thể thiết lập nó bằng cách sử dụng gật đầu. Configure sẽ giống như dưới đây:

![image.png](https://images.viblo.asia/febd9bef-bcf6-4ad4-aacf-5c2dec56a0e4.png)

Thiết lập Nodemon

Bằng cách này, trình debug sẽ bắt đầu lắng nghe cổng được chỉ định và bất kỳ request nào đến server sẽ dừng lại ở điểm debug. Để chỉnh sửa bất kỳ value nào trong quá trình debug, bạn có thể thực hiện việc này bằng cách đặt chúng trong phần “Biến” trong Terminal debug.

Code được sử dụng trong ví dụ trên có thể được tìm thấy [ở đây](https://github.com/shrirammano/vscode-debugger/tree/master) .

Kiểm tra cách debug server express chi tiết [tại đây](/@shrirammano/express-application-debugging-in-vscode-60453b95b) .

Vui lòng comment bên dưới nếu bạn có những cách dễ dàng khác để debug ứng dụng NodeJS.

Console.debug
=============

Cách cơ bản để debug là sử dụng `console.debug`câu lệnh. Mặc dù nó phục vụ cho mục đích, nhưng sẽ là một quá trình tốn thời gian để thêm `console.debug` mới hoặc cập nhật `console.debug` hiện có để in thêm thông tin. Đối với mỗi dữ liệu bổ sung cần thiết, các câu lệnh phải được thay đổi và ứng dụng cần được chạy lại. Và cuối cùng, việc dọn dẹp các record này là một nhiệm vụ bổ sung.

Đoạn code tương tự ở trên với các câu lệnh debug bây giờ sẽ là:

![image.png](https://images.viblo.asia/80ee2a5b-bab9-4827-9b60-ac8263ca83de.png)

Như được đánh dấu, thông tin user được in dưới dạng `undefined`. Để điều tra thêm, chúng ta sẽ phải thêm nhiều `console.debug` hơn và function phải được chạy lại cho đến khi tìm ra nguyên nhân.

![image.png](https://images.viblo.asia/630b2422-fb8f-429d-959d-fdcbac0aadca.png)

Thêm `console.debug` được thêm vào các function

Debug bằng Unit Test
===============================

Debug với sự trợ giúp của Unit Test sẽ dễ dàng hơn rất nhiều, đặc biệt là khi code được bao phủ bởi nó. Chúng ta có thể dễ dàng khai báo các dịch vụ hạ lưu hoặc các value db với dữ liệu thực tế và kiểm tra. Đối với ví dụ này, chúng ta sẽ sử dụng mô-đun Jest.

Tệp thử nghiệm: Dữ liệu thử nghiệm sẽ là dữ liệu mẫu của chúng ta

![image.png](https://images.viblo.asia/d6c045b5-3b82-4b7d-8d94-d8987b503b18.png)

Configure trình debug cho Jest:

![image.png](https://images.viblo.asia/b0897617-9e2a-4860-9440-6f8b11317b61.png)

Từ hình ảnh trên, bạn có thể thấy rằng chúng ta đã thiết lập chương trình để sử dụng Jest và tệp thử nghiệm để chạy được đặt ở args. Nếu tệp thử nghiệm của bạn có nhiều thử nghiệm cho cùng một function, hãy đảm bảo rằng bạn đã thêm vào `.only`tệp đó/mô tả. Bằng cách đó, chỉ bài kiểm tra bạn định chạy mới được thực thi.

Tất cả đã thiết lập, cho phép thiết lập một điểm ngắt và bắt đầu `debug`.

![image.png](https://images.viblo.asia/a4a95e59-fc50-42e0-8c0b-2bbadd35b5c9.png)

Như bạn có thể thấy, với sự trợ giúp của `Unit Test`, chúng ta sẽ có thể thiết lập `debug` khá dễ dàng và phân tích. Tất cả các biến trong hàm hiện tại sẽ được hiển thị trong Biến. Nếu cần theo dõi thêm dữ liệu, bạn có thể thêm dữ liệu đó vào Đồng hồ như hình minh họa. Ngoài ra, chúng ta có thể di chuột qua các biến để kiểm tra `value` của nó.

Một bất lợi đối với hàm này là, nếu chúng ta có nhiều Service gọi đến các logic khác nhau hoặc truy vấn cơ sở dữ liệu, chúng ta sẽ phải cập nhật mô hình với dữ liệu thực tế mà chúng ta phải phân tích.

Debug server Express
--------------------

[Mình đã có một bài viết về vấn đề này các bạn tham khảo ở bài viết này nhé.](https://viblo.asia/p/blog34-nodejs-express-debug-tren-vscode-express-tutorial-part-710-series-bi-kip-javascript-phan-29-y3RL1DNXJao)

Roundup
--------------------

Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
------
* https://tuan200tokyo.blogspot.com/2022/11/blog35-configure-vscode-e-debug-trong.html