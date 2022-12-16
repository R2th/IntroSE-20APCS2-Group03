> Bài viết gốc [Jesus Castello - How to Use RSpec Mocks](https://www.rubyguides.com/2018/10/rspec-mocks/)

### Mock trong Rspec là gì?

Mock là một đối tượng sử dụng để test.
Chúng ta dùng các mocks để test tương tác giữa hai đối tượng.
Vd: Viết một API để lật ảnh
Thay vì tự viết code thao tác ảnh có thể sử dụng gem `mini_magick`.
Khi muốn test tương tác giữa code và thư viện bên ngoài thì sẽ viết một mock với kỳ vọng rằng các phương thức được gọi với class `ImageProcessor`.

Có nghĩa là chúng ta sẽ không lật các ảnh(thao tác chậm) mỗi khi chúng ta chạy test.

### Hoạt động bằng cách nào?
Mocks thay thế đối tượng gốc vậy phương thức thật sẽ không bao giờ được gọi.
Hãy xem ví dụ dưới này.

Ví dụ Rspec mock
Đây là test `ImageFlipper`

![](https://images.viblo.asia/df7d9069-3639-47f8-90c5-6ec696646290.png)

Bây giờ nếu chạy test chúng ta có thể viết code với TDD style. 
Đầu tiên chúng ta cần viết một class `ImageFipper` với phương thức `flip` như dưới: 

![](https://images.viblo.asia/f60b261c-1772-4a71-b40e-72417031d5ee.png)

Sau khi chạy test chúng ta nhận được phản hồi từ Rspec

![](https://images.viblo.asia/26a5944d-f09f-4ea0-8161-820a59e61aa1.png)

Phản hồi trên chỉ rằng phương thức trên gọi 0 lần nhưng kỳ vọng được gọi 1 lần.

Chúng ta có thể  làm cho test qua được bằng cho gì nó cần:

![](https://images.viblo.asia/13fc1454-f1b4-4075-9e6e-be2a57c99c6f.png)

Tiếp đến chúng ta qua được test:

![](https://images.viblo.asia/b8871380-f287-4b1b-9db0-6056ef0af443.png)

Ở đây chúng ta đã làm gì?

Chúng ta đã tạo một class mà cho phép class `image_processor` đáp ứng với phương thức `flip`.
Ví dụ này là cơ bản nhưng chúng ta có thể tưởng tượng một thao tác hoàn thiện của `ImageFlipper` để kiểm tả nếu như file có tồn tại không, ảnh có hợp lệ không, vv....

Trong một test thông thương chúng ta kiểm tra kết quả trả về của phương thức

> Liệu phương thức này trả về một ảnh đã lật?

Khi sử dụng mock chúng ta test hành vi

> Chúng ta đã cho các thứ làm việc đúng với thông tin đúng và chính xác với lượng thời gian mà chúng ta cần?

### Mocks vs Stubs
Một điểm nhầm lẫn là so sánh giữa mocks và stubs.
#### Có gì khác nhau?
- stub chỉ là phương thức với đáp ứng biết trước, nó không quan tâm về hành vi.
- mock kỳ vọng phương thức sẽ được gọi nếu họ không được gọi test sẽ thất bại.

Đây là một stub trong Rspec

![](https://images.viblo.asia/06da9d42-f896-4281-a37a-d1e734612fbd.png)

Phương thức `allow` là thứ làm trở thành stub. 

Chúng ta cho phép đối tượng đang test `double "json"` nhận và đáp ứng với phương thước này nhưng chúng ta không kiểm trả là nó đã được gọi. Đây là điểm khác nhau!

#### Làm thế nào để sử dụng Verified Doubles

Một nhược điểm của mocks và stubs là chúng ta có thể  gặp trường hợp sẽ dụng một phương thức mà không tồn tại trong code production.

Bởi vì tên phương thức đã thay đổi hoặc do lỗi đánh máy!

#### Verified doubles
Một verified double có thể sử dụng là một sub `allow` hoặc một mock `expect` và nó sẽ kiểm trả rằng một phương thức với tên đó tồn tại.
Ví dụ:
```
mock = instance_double(ImageProcessor)
```

Nó sẽ nêu lỗi nếu phương thức không tồn tại nhưng nó sẽ hoạt động đúng nếu phương thức tồn tại.

![](https://images.viblo.asia/7281655b-1db2-4b06-acc4-f03593944e66.png)

### Mocks trả về các giá trị

Ta trở về mocking với ví dụ cuối cùng ta có:

![](https://images.viblo.asia/b4022bc1-2d30-4b2c-a776-e22b68758eb0.png)

Khi code gọi `flip` mock sẽ trả về `nil`. Nếu code mong muốn trả về giá trị khác `nil` thì kết quả sẽ là một lỗi.

Chúng ta có thể khắc phục bằng cách mock và trả về một kết quả như dưới

![](https://images.viblo.asia/b3522a42-3360-425e-a651-376cb64ccb05.png)

### Làm thế nào để Mock các phương thức tức thời(Instance methods)

Giả thiết chúng ta có code như này

![](https://images.viblo.asia/dd298a34-52ca-41d3-9091-b1df6105a822.png)

Với phương thức này rất khó để test do ngẫu nhiên.

Rspec cho phép chúng ta mock hoặc stub `rand` như sau:

![](https://images.viblo.asia/1f11ebd9-c6aa-4d40-9743-463c8f207d03.png)

`rand` trả về một giá trị cố định vậy chúng ta có thể dùng nó để test kết quả phương thức của chúng ta.

### Khi nào sử dụng Mocks?
Khi nào chúng ta nên sử dụng mocks? Phát triển phần mềm là một đề tài phức tạp.
Nhưng dưới đây là một số  hướng dẫn có thể làm theo

1. Nếu phương thức đang test trả về một gía trị và không có tác dụng phụ(tạo các file, tạo API request,v..) thì chúng ta không cần mock. Chỉ cần kiểm tra giá trị trả về.
2. Nếu phương thức làm việc và gửi các yêu cầu đến với các đối tượng ngoài thì chúng ta có thể mock tương tác với các đối tượng đó.
3. Nếu phương thức là `Yêu cầu` dữ liệu từ dịch vụ bên ngoài(API) thì chúng ta có thể sử dụng stab để cùng cấp dữ liệu phụ vụ mục đích test.

Cuối cùng `Đừng mock các class ứng dụng của minh`! 
> Tại sao? Bởi vì điều đó thúc đẩy việc kết hợp các thử nghiệm với các triển khai chi tiết và nó làm cho code khó thay đổi hơn.

#### Kết luận
Bài viết đã mô tả về Rspec mocks, stubs và verified doubles. Hy vọng bài này sẽ mang lợi ích cho các bạn đang đọc.

##### Tham khảo
- [How to Use RSpec Mocks](https://www.rubyguides.com/2018/10/rspec-mocks/)
- [Rspec](http://rspec.info/)
- [Rspec Mock](https://relishapp.com/rspec/rspec-mocks/docs)
- [Rspec Stub](https://relishapp.com/rspec/rspec-mocks/v/3-8/docs/old-syntax/stub)
- [Rspec Verified doubles](https://relishapp.com/rspec/rspec-mocks/v/3-8/docs/verifying-doubles)