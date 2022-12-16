Trong một thời gian dài tôi đã sử dụng câu hỏi này trong các cuộc phỏng vấn, và thật đáng ngạc nhiên khi nhiều người không có đủ hiểu biết về hai phương thức API RESTful được sử dụng nhiều nhất: `GET` và `POST`. Bởi vì tôi tin rằng nhiều người sẽ cảm thấy bị cám dỗ khi không đọc nó qua, tôi đã chuẩn bị một bài kiểm tra đơn giản dựa trên sự khác biệt giữa hai phương thức này và không chỉ có các câu trả lời mà cả tính ứng dụng của chúng.

### GET or POST?

1. Coi trình duyệt với tư cách là một client, phương thức nào các tham số được lưu trữ trong lịch sử phiên (session) của trình duyệt?
2. Coi trình duyệt với tư cách là một client, phương thức nào có thể được cached?
3. Cái nào là phương thức an toàn?
4. Cái nào là KHÔNG bình thường?
5. Nếu tôi sao chép và dán endpoint url vào thanh địa chỉ của trình duyệt và nhấn enter, phương thức nào được gọi theo mặc định?
6. Phương thức nào yêu cầu có body?
7. Xét với một trang web tĩnh, phương thức duy nhất mà ứng dụng này đáp ứng là gì?
8. Phương thức nào có giới hạn độ dài?
9. Phương thức nào an toàn hơn và nên được sử dụng để đối phó với dữ liệu nhạy cảm?
10. Phương thức nào có thể được đánh dấu (bookmarked)?
11. Phương thức nào chỉ cho phép các ký tự ASCII?

Bạn có biết tất cả các câu trả lời và tại sao? Nếu bạn không biết, không có lý do gì phải xấu hổ. Hãy phân tích hai phương thức này với nhiều chi tiết hơn và hiểu đặc thù của chúng.

<br>

**1. GET parameters sẽ được lưu trữ trong session history của trình duyệt.**

Trình duyệt sử dụng lịch sử của nó để điều hướng người dùng qua lại, do đó, mỗi URL mới được nhập sẽ tự động được lưu vào history. Nhưng điều gì sẽ xảy ra nếu một GET request được thực hiện hoàn toàn thông qua một SPA (thông qua ajax hoặc axios)? Trong trường hợp này, request URL phải được đẩy thủ công thông qua `history.pushState` và nó có thể được cập nhật trên địa chỉ URL của trình duyệt mà không cần chuyển hướng người dùng.

Hãy xem xét 2 kịch bản khác nhau:

A. Truy cập https://www.kogan.com/au/shop/?q=laptop  và nhấp vào bất kỳ bộ lọc nào (ví dụ "FREE shipping"). Trang web sẽ thực hiện một GET request mới, lấy response, hiển thị lại (re-render) danh sách các sản phẩm, cập nhật địa chỉ url của trình duyệt và lưu url trong lịch sử trình duyệt (không nhất thiết phải theo thứ tự này). Mặc dù trang không được làm mới, truy vấn mới vẫn được đẩy vào lịch sử trình duyệt, do đó bạn sẽ có thể điều hướng trở lại trang ban đầu.

![](https://images.viblo.asia/2ba544e0-a8b5-420c-bb0b-0d766ea2b586.png)

Sau khi lựa chọn FREE shipping:

![](https://images.viblo.asia/e4311cad-6811-41e9-a331-d3a729ee5d6a.png)

Lưu ý rằng một request mới được thực hiện mà không cần làm mới trang, nút quay lại hiện được bật và url được đặt trong trình duyệt thậm chí khác vớirequest trong inspection.

B. Bây giờ, bạn đã truy cập vào https://www.kogan.com/au/shop/?q=laptop và thay vì click vào bất kỳ bộ lọc nào, hãy cuộn xuống phía dưới và click vào "View More". Trang web sẽ thực hiện một GET request mới, lấy response, hiển thị lại danh sách các sản phẩm và cập nhật địa chỉ url của trình duyệt. Tuy nhiên, nó sẽ không được lưu url trong lịch sử trình duyệt. Mặc dù trang không được làm mới, vì truy vấn mới không được đẩy vào lịch sử trình duyệt, bạn sẽ KHÔNG thể điều hướng trở lại trang ban đầu.

![](https://images.viblo.asia/8c033f31-7700-4605-9190-fa42a94e34c2.png)

Lưu ý rằng một request mới được thực hiện mà không làm mới trang, nút quay lại vẫn không được bật ngay cả sau khi thay đổi url của trình duyệt.

Liên quan đến POST, nếu người dùng điều hướng trở lại sau khi submit form, dữ liệu sẽ được gửi lại (trình duyệt sẽ thông báo cho người dùng rằng dữ liệu sắp được gửi lại), nhưng nó sẽ không được lưu lại lịch sử.

![](https://images.viblo.asia/bb7b2abc-8ff4-4dd5-ae4b-59c712dc0010.jpeg)

<br>

**2. GET responses có thể được cached**

Vì GET là idempotent và hầu hết các tài nguyên trang web được trả về thông qua phương thức này, trình duyệt theo mặc định sẽ lưu các request. Vì vậy, lần tới khi bạn truy cập trang web, thay vì truy cập server và yêu cầu tất cả các hình ảnh một lần nữa, nó sẽ chỉ tải từ bộ đệm cache của trình duyệt.

```
Trong ngữ cảnh của REST APIs, khi thực hiện nhiều request giống hệt nhau 
có tác dụng tương tự như thực hiện single request - thì API REST đó được gọi là idempotent.
```

Lợi ích của nó là trang web của bạn sẽ tải nhanh hơn nhiều sau lần đầu tiên. Tuy nhiên, các deployment  mới không thể tiếp cận client nếu chúng có website cũ được lưu trong bộ nhớ cache ở trình duyệt của họ. Kết quả là, để bộ đệm bị vô hiệu, URL của mỗi yêu cầu phải thay đổi hoặc client phải thực hiện nó trên trình duyệt của họ. Ví dụ: nếu CSS của trang web của bạn được diễn tả bởi URL`cdn-static-1.medium.com/_/fp/css/main-branding-base.-y85vioUz7M8dDBgC99oNg.css`, việc deployment mới sẽ chỉ thay đổi bố cục của website nếu url này được thay đổi thành một cái gì đó như `cdn-static-1.medium.com/_/fp/css/main-branding-base.newhashkey.css`.

![](https://images.viblo.asia/3d5a3253-6cc3-4e3f-be6d-dd4bf8b6b72c.png)


<br>

POST không thể được lưu trữ ở phía client.
POST không phải là Idempotent **(4)**.

<br>

**3. Get là safe method**

Vì phương thức này KHÔNG BAO GIỜ thay đổi tài nguyên (Nếu nó không được thực hiện theo RESTful best practices), thì nó được coi là an toàn.

```
Phương thức an toàn là phương thức HTTP không sửa đổi tài nguyên.
```

Kết quả là, nó có thể được lưu trữ an toàn, lưu trong lịch sử của trình duyệt và lưu trên các công cụ tìm kiếm, chẳng hạn như google. Điều này là do các tham số sẽ được lưu trữ trong URL và gọi lại phương thức sẽ không gây ra bất kỳ thay đổi nào trên server. POST, mặt khác, không phải là một phương thức an toàn.

<br>

**7. Static Websites chỉ phản hồi GET requests**

Trang web tĩnh là một ứng dụng không cần bất kỳ công cụ nào khác để xử lý các tệp của nó vì chúng sẽ trả về nội dung có thể đọc được của trình duyệt (Javascript, hình ảnh, CSS, HTML). Kết quả là, nó chỉ cần đáp ứng các GET request để trả về các trang html. Vì vậy, ý nghĩa của thông tin này là gì?

Bạn có biết bạn có thể lưu trữ một [trang web tĩnh](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) chỉ bằng cách sử dụng AWS S3? Tôi tự tin rằng nhiều người sẽ nói có. Tuy nhiên, cũng biết nó chỉ cho phép các GET và HEAD request? Theo [tài liệu](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteEndpoints.html) của họ, tất cả các đối tượng được yêu cầu trên S3 bucket phải thông qua GET.

<br>

**8. Phương thức nào có giới hạn độ dài?**

Điều thực sự quan trọng là phải hiểu rằng phương thức GET sẽ luôn được dịch sang một URL trong trình duyệt (giao thức http) và chỉ cho phép các ký tự ASCII **(11)**. Nói cách khác, bất kỳ văn bản nào bạn đặt trong địa chỉ URL trình duyệt của bạn sẽ tạo yêu cầu server GET request **(5)** và ngay cả khi GET request được thực hiện ngầm hoàn toàn thông qua một trang web (ví dụ như thông qua ajax), nó vẫn sẽ chuyển thành một URL format với các tham số như trong một querystring.

Biết rằng một GET request trên trình duyệt sẽ gửi các tham số thông qua URL, bạn nghĩ điều gì sẽ xảy ra nếu có quá nhiều filter? Mặc dù con số này có thể hơi khác nhau giữa các trình duyệt, giới hạn độ dài URL an toàn thường là 2048 ký tự, trừ đi số lượng ký tự trong đường dẫn thực tế. Kết quả là, nếu bạn đang xây dựng một trang web trong đó sản phẩm của bạn có thể có nhiều filter lớn, phương thức GET có thể không đủ.

Về POST, vì payload được gửi trong body request, về mặt kỹ thuật, nó không có giới hạn dữ liệu gửi **(6)** và cũng không giới hạn data type.

<br>

**9. Phương thức nào an toàn hơn và nên được sử dụng để đối phó với dữ liệu nhạy cảm?**

Trong khi nhiều người biết về điều này, họ thường không biết tại sao. Xem xét một endpoint user-password đăng nhập cơ bản, bạn có bao giờ tự hỏi tại sao nó được sử dụng POST mà không phải là GET không? Vâng, nó có liên quan đến an toàn, nhưng không phải vì thông tin được ẩn đi. Nó có liên quan đến một trong những điểm đầu tiên chúng ta đã thảo luận ở đây: bộ nhớ cache và lịch sử trình duyệt.

Hãy tưởng tượng nếu bạn bắt đầu nhập một trang web trên trình duyệt của mình và nó tự động đề xuất một URL có người dùng và mật khẩu như một phần của chuỗi truy vấn. Nghe có vẻ lạ nhưng endpoint đăng nhập GET sẽ cho phép điều đó và tôi chắc chắn đó không phải là điều bạn muốn.


![](https://images.viblo.asia/cfd9935b-1e91-42c0-8c4a-1ab9928ae52f.png)

<br>

**10. Phương thức nào có thể được bookmarked?**

POST không nên được bookmark và lý do là sự kết hợp của một vài chủ đề được thảo luận ở trên:
* Cố gắng  bookmark POST sẽ chỉ dẫn đến thao tác GET trên URL.
* Phương thức này không phải là idempotent nên không đảm bảo đáp ứng sẽ luôn giống nhau. Ví dụ, nó có thể dẫn đến một giao dịch ngân hàng bị trùng lặp.
* URL sẽ mất các tham số vì bookmark không hỗ trợ body payload.
* Nó có thể chứa dữ liệu nhạy cảm, không nên được lưu trữ.

<br>

***Kết luận:***

Mặc dù GET thường được sử dụng để lấy dữ liệu và POST để gửi/lưu nó, nhưng chúng ta có thể kết luận rằng có nhiều hơn về hai phương thức này và nhận thức được các đặc thù này sẽ không chỉ giúp code tốt hơn mà còn cả kiến trúc, thiết kế và giải quyết vấn đề.

<br>

***Tài liệu:***

https://restfulapi.net/idempotent-rest-apis

https://www.w3schools.com/tags/ref_httpmethods.asp

https://restfulapi.net/http-methods

https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html

<br>

***Bài viết được dịch từ:***  https://medium.com/javascript-in-plain-english/get-vs-post-are-you-confident-about-the-differences-189562fac0a7