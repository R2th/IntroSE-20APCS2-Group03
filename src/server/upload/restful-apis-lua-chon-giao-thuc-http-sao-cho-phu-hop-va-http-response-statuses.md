Chắc hẳn là trong quá trình học tập về lập trình web bạn đã quá quen với những thuật ngữ như Back-end và Front-end. Vậy bạn có bao giờ tự hỏi trong cùng một dự án nếu BE - FE sử dụng hai ngôn ngữ riêng biệt thì sẽ như thế nào và thứ gì tạo nên sự liên kết giữa hai khía cạnh này? Để giải quyết cho bài toán này, sự ra đời của APIs (Application Programming Interface) - giao diện lập trình ứng dụng là vấn đề thiết yếu. Nhằm mục đích sử dụng APIs hiệu quả, bài viết này mình sẽ giới thiệu với các bạn về các giao thức và HTTP response statuses của APIs.

### HTTP giao thức

API REST cho phép bạn phát triển bất kỳ loại ứng dụng web nào có tất cả các hoạt động CRUD (tạo, truy xuất, cập nhật, xóa) có thể. Các nguyên tắc REST đề xuất sử dụng một phương thức HTTP cụ thể trên một loại cuộc gọi cụ thể được thực hiện cho máy chủ (mặc dù về mặt kỹ thuật có thể vi phạm nguyên tắc này, nhưng nó rất không được khuyến khích).

REST APIs cho phép bạn phát triển bất kỳ loại ứng dụng bao gồm tất cả các action CRUD (tạo, truy xuất, cập nhật, xóa). Các nguyên tắc về chuẩn REST khuyến khích bạn sử dụng một phương thức HTTP cụ thể cho mỗi loại action riêng biệt (việc sử dụng các phương thức khác về mặt kỹ thuật, mặc dù vẫn được nhưng không nên sử dụng).

Để sử dụng phương thức hiệu quả, hãy xem qua những nội dung dưới đây và lựa chọn cho mình cách dùng  phù hợp: 

* HTTP GET
* HTTP POST
* HTTP PUT
* HTTP DELETE
* HTTP PATCH
* Tổng kết

### HTTP GET

HTTP GET dùng để truy xuất đối tượng - và không sửa đổi thông tin theo bất kỳ cách nào. Phương thức GET khi sử dụng và không làm thay đổi trạng thái của đối tượng, được coi là một phương thức an toàn. Ngoài ra, các API GET phải là idempotent, tức là việc thực hiện nhiều yêu cầu giống nhau phải tạo ra cùng một kết quả cho đến khi một API khác (POST hoặc PUT) thay đổi trạng thái của đối tượng trên máy chủ.

Nếu request được thực hiện trên đối tượng đang được xử lý, thì đối tượng được tạo ra trong quá trình xử lý sẽ là đối tượng trả về trong response và không phải là đối tượng gốc từ server, trừ khi đối tượng đó là đầu ra mặc định của request.

Đối với bất kỳ API HTTP GET đã cho nào, nếu đối tượng được tìm thấy trên server, thì nó phải trả về HTTP response status 200 (OK) - cùng với body response, thường là nội dung XML hoặc JSON (do tính phụ thuộc với nền tảng viết web).

Trong trường hợp đối tượng KHÔNG được tìm thấy trên server thì nó trả về HTTP response status 404 (NOT FOUND). Tương tự, nếu params truyền lên trong request GET không chính xác thì server sẽ trả về HTTP response status 400 (BAD REQUEST).

Một số ví dụ về request URIs

* HTTP GET {{host}}/careers
* HTTP GET {{host}}/careers/1

### HTTP POST

Sử dụng API POST để tạo một đối tượng mới trong database, ví dụ: tạo một tệp tin trong thư mục cụ thể hoặc một hàng trong bảng cơ sở dữ liệu. Nói một cách nghiêm túc về REST, các phương thức POST được sử dụng để tạo đối tượng mới vào cơ sở dữ liệu.

Trong trường hợp lý tưởng, nếu dự liệu được tạo trên server, server sẽ trả về HTTP response status 201 (CREATED) và chứa một đối tượng mô tả trạng thái của request và tham chiếu đối tượng mới mới và  vị trí của nó.

Đôi lúc, action được thực hiện bởi phương thức POST có thể không dẫn đến một đối tượng có thể được xác định bởi URI. Trong các trường hợp này server sẽ trả về HTTP response status 200 (OK) hoặc 204 (NO CONTENT).

Các phản hồi cho phương thức này không được lưu trong bộ nhớ cache trừ khi phản hồi bao gồm các trường Cache-Control hoặc Expires ở header thích hợp.

Lưu ý: POST không an toàn và cũng không phải idempotent, việc gọi hai yêu cầu POST giống hệt nhau sẽ dẫn đến hai dữ liệu khác nhau chứa cùng một thông tin (ngoại trừ ID dữ liệu).

Ví dụ về request URIs

* HTTP POST  {{host}}/careers

### HTTP PUT

Sử dụng API PUT chủ yếu để cập nhật đối tượng hiện có (nếu dữ liệu không tồn tại, thì API có thể quyết định tạo đối tượng mới hay không). Nếu đối tượng mới đã được tạo bởi API PUT, server PHẢI thông báo cho người dùng thông qua HTTP response status 201 (CREATED) và nếu đối tượng hiện có bị sửa đổi, thì HTTP response status 200 (OK) hoặc 204 (NO CONTENT)  NÊN được gửi để cho biết hoàn thành yêu cầu.

> Sự khác biệt giữa API POST và PUT có thể được quan sát trong các URI request. Các request POST được thực hiện trên cơ sở dữ liệu, trong khi các yêu cầu PUT được thực hiện trên một đối tượng riêng lẻ.
> 
<br>
Một số ví dụ về request URIs

* HTTP PUT {{host}}/careers/123
* HTTP PUT {{host}}/users/22/careers/1

### HTTP DELETE

Cái tên nói lên tất cả, API DELETE được sử dụng để xóa đối tượng (được xác định bởi URI yêu cầu).

HTTP response status 200 (OK) nếu phản hồi bao gồm một thực thể mô tả trạng thái, 202 (ACCEPTED) nếu hành động đã được xếp hàng hoặc 204 (NO CONTENT) nếu hành động đã được thực hiện nhưng phản hồi không bao gồm một đối tượng.

Các hoạt động DELETE là idempotent. Nếu bạn DELETE một đối tượng, nó sẽ bị xóa khỏi cơ sở dữ liệu. Liên tục gọi API DELETE trên dữ liệu đó sẽ không thay đổi kết quả - tuy nhiên, việc gọi DELETE trên dữ liệu lần thứ hai sẽ trả về 404 (NOT FOUND) vì nó đã bị xóa. Tùy vào quan điểm, một số người có thể lập luận rằng việc đó làm cho phương thức DELETE non-idempotent, đây vẫn là một vấn đề cần được thảo luận nhiều hơn.

Nếu yêu cầu chuyển qua bộ đệm và URI yêu cầu xác định một hoặc nhiều đối tượng hiện được lưu trong bộ nhớ cache, các mục đó NÊN được coi là "stale". Phản hồi cho phương pháp này "not cacheable".

Ví dụ request URIs

* HTTP PUT {{host}}/careers/1

### HTTP PATCH

Request HTTP PATCH dùng để thực hiện cập nhật một phần của đối tượng được chọn. Như vậy, hiện tại chúng ta có 2 request cùng là cập nhật dữ liệu là PUT và PATCH, tùy vào tình huống mà ta sẽ sử dụng chúng hợp lý: PATCH sẽ được dùng khi ta muốn cập nhật một phần trong đối tượng và PUT là thay thế toàn bộ đối tượng.

Tuy nhiên việc sử dụng PATCH khá là hạn chế:  

* Nhiều phần mềm ứng dụng đã không còn hỗ trợ phương thức PATCH.

* Request payload của phương thức PATCH không rõ ràng như PUT:

    Ví dụ: 
    
    Với request GET
    
    `HTTP GET /careers/1`
    
    chúng ta sẽ có response data là:
    
    ```
    {
        "id": 1, 
        "carreer": "devlopment",
        "company_email": "company@domain.org"
    }
    ```

   Request cập nhật company_email sẽ có dạng
   
   `HTTP PATCH /careers/1`
   
   ```
    [
        { 
            "op": "replace",
            "path": "/company_email",
            "value": "new.company@domain.org"
        }
    ]
    ```
    
### Tổng kết


| HTTP giao thức|CRUD |Cơ sở dữ liệu | Đối tượng cụ thể (careers/1) |
| -------- | -------- | -------- | -------- |
| POST|Tạo| 	201 (Created), Tạo một đối tượng mới trong cơ sỡ dữ liệu.|Tránh việc sử dụng POST trên một đối tượng cụ thể.|
| GET|Đọc/Truy xuất|200 (OK), danh sách careers. Sử dụng kèm với sorting, filtering và phân trang (pagination).|200 (OK), cho việc lấy thông tin của một career. 404 (Not Found), nếu ID không tìm thấy hoặc không khả dụng.     |
|PUT|Cập nhật/Thay thế|405 (Method not allowed), chỉ khi cập nhật lại toàn bộ cơ sở dũ liệu.| 200 (OK) hoặc 204 (No Content). 404 (Not Found), nếu ID không tìm thấy hoặc không khả dụng. |
| PATCH     | Cập nhật một phần /Sửa đổi     | 405 (Method not allowed), khi muốn sửa đổi một phần của cơ sở dữ liệu .    | 200 (OK) hoặc 204 (No Content). 404 (Not Found), nếu ID không tìm thấy hoặc không khả dụng.     |
| DELETE     | 	Delete     | 405 (Method not allowed), sử dụng khi bạn muốn xóa của cơ sở dữ liệu - đi kèm với cảnh báo .    | 200 (OK). 404 (Not Found), nếu ID không tìm thấy hoặc không khả dụng.     |
  
### References:

[1] https://restfulapi.net/

[2] https://www.mulesoft.com/resources/api/what-is-an-api#:~:text=API%20is%20the%20acronym%20for,you're%20using%20an%20API.

[3] https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/