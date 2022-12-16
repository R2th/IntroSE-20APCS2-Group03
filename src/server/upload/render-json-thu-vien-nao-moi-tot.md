Đối với những người đã từng xây dựng API server, chắc hẳn ai cũng đã từng hơn một lần đau đầu với việc lựa chọn thư viện JSON. Bài viết sau đây hi vọng sẽ cho bạn cái nhìn khách quan nhất về các thư viện phổ biến trong cộng đồng ruby hiện tại.
## Các tiêu chí đánh giá:
### Có monkey-patch hay không?
Nếu bạn có ý tưởng làm một ứng dụng nghiêm túc (thay vì chỉ là một prototype nhanh) thì bạn nên tránh xa các thư viện sử dụng monkey-patch.

### Template Engine và Object
Đây thuần tuý là vấn đề sở thích. Một số người thích sử dụng template thay vì các object cho việc render vì điều này thể hiện rõ vai trò của chúng: JSON thực chất cũng tương tự như HTML trong mô hình MVC, chỉ là một dạng hiển thị của dữ liệu. Ngoài ra, cấu trúc của template (ví dụ jbuilder) được cho là dễ đọc hơn cấu trúc object.

Ngược lại, một số lập trình viên lại thích sử dụng object hơn, vì chúng giúp họ linh hoạt hơn trong các thao tác xử lý (ví dụ kế thừa, fallback version, ...). Ngoài ra sử dụng object thường nhanh hơn template (vì chúng không cần phải được đọc bởi parser).

### Partial - DRY code
Một tiêu chí quan trọng khác là việc hỗ trợ và render partial. Partial giúp lập trình viên hạn chế việc lặp lại những đoạn render json trùng nhau, qua đó giúp code ngắn lại và (có lẽ là) ít lỗi hơn. Tuy nhiên, một số thư viện không hỗ trợ tốt vấn đề này (như jbuilder) khiến cho tốc độ render JSON suy giảm đáng kể khi sử dụng nhiều partial.

### Hỗ trợ Oj native
Oj là JSON parser và marshaller có tốc độ tốt nhất hiện nay. Hầu hết các project muốn tăng tốc API server của mình đều sử dụng thư viện này thay cho engine gốc của Rails/Ruby. Thư viện hỗ trợ tốt Oj sẽ giảm đáng kể công sức của lập trình viên khi áp dụng thư viện của mình vào project của họ.

### Code dễ đọc
Hầu hết các thư viện phổ biến hiện nay đều có cú pháp khá đơn giản, do đó việc đọc một file hoặc template là rất dễ dàng. Tuy nhiên, vẫn có một số thư viện có vấn đề về điều này:
     * rabl có cú pháp rất phức tạp, người mới làm quen sẽ phải mất vài ngày để có thể sử dụng chúng thật thành thạo.
     * acts_as_api để template của mình ở trong model, thoạt nghe thì rất tiện lợi, nhưng có lẽ bạn sẽ nghĩ lại khi user model của mình có số dòng ~1000.
    
### Coupling với model
Thông thường thì JSON được render từ model, tuy nhiên đôi lúc các PORO object cũng cần được render thành JSON đấy. Nếu bạn đang sử dụng active_model_serializers hay acts_as_api thì xin chúc mừng, bạn sẽ không thể sử dụng chúng để render các object này đâu :)

### Speed
Vấn đề này chắc mình không phải giải thích nhiều, đây là một trong những yêu cầu quan trọng nhất của bất kỳ một thư viện nào.

##  Tổng kết
|  | to_json | acts_as_api | jbuilder | rabl | active_model_serializers | 
| -------- | -------- | -------- | -------- | -------- | -------- |
| Monkey-patch activerecord     | có     | có     | không     | không | không     |
| Cách render     | object     | object     | template     | template     | object     |
| Hỗ trợ partial     | không     | có     | có     | có     | có     |
| Hỗ trợ Oj     | không     | không     | có     | có     | không     |
| Cú pháp     | ban đầu thì đơn giản, càng rắc rối nếu code càng lớn     | ban đầu thì đơn giản, càng rắc rối nếu code càng lớn     | đơn giản     | phức tạp     | đơn giản     |
| Couple với Rails     | không     | couple với activerecord     | couple với actionview     | không     | couple với activerecord     |
| Hỗ trợ phiên bản     | không      | không     | có     | có     | có     |
| Tốc độ     | nhanh     | nhanh     | bình thường/chậm     | chậm     | chậm hoặc nhanh tuỳ trường hợp     |