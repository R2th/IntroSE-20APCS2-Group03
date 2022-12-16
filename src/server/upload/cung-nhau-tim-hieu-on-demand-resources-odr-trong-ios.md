Tiếp nối bài viết về App Thinning tại [Công nghệ App Thinning](https://viblo.asia/p/tim-hieu-ve-cong-nghe-app-thinning-1VgZvEb9KAw). Hôm nay mình sẽ tiếp tục đào sâu hơn, cụ thể về khía cạnh ODR của công nghệ này.

Như phần trước mình đã nói thì: On-demand resources ODR là nội dung ứng dụng được lưu trữ trên App Store và được tách biệt app bundle (thứ mà bạn sẽ tải xuống). Chúng cho phép gói ứng dụng nhỏ hơn và nội dung ứng dụng phong phú hơn. Ứng dụng sử dụng tài nguyên và sau đó gửi yêu cầu phát hành tới App Store. Sau khi tải xuống thì tài nguyên được lưu trữ trên thiết bị để có thể truy cập nhanh hơn 

# Lợi ích của On-demand resources

- Small app size: Kích thước gói ứng dụng do người dùng tải xuống sẽ nhỏ hơn và đồng nghĩa với việc tải xuống sẽ nhanh hơn và còn nhiều dung lượng bộ nhớ nhiều hơn, bạn có thể dùng để làm việc khác.
- Lazy loading of app resources: Ứng dụng chứa tài nguyên, những thứ mà được sử dụng chỉ duy nhất một số trạng thái của ứng dụng (không phải lúc nào cũng sử dụng). Khi ứng dụng được chuyển sang trạng thái sử dụng tài nguyên nào thì tài nguyên đó sẽ được load. Ví dụ một game nào đó có nhiều level không có nghĩa là toàn bộ tài nguyên cho các level đó được load toàn bộ, thay vì điều đó thì chỉ load những tài nguyên sử dụng cho level hiện tại.
- Remote storage of rarely used resources: Ví dụ như ứng dụng của bạn có phần tutorial - phần chỉ được hiển thị duy nhất 1 lần đầu tiên mở ứng dụng sau khi cài đặt. Vậy đây chính là phần tài nguyên không phải lúc nào cũng đc sử dụng, thậm chí nó chỉ được sử dụng duy nhất 1 lần thôi.
- Remote storage of in-app purchase resources: Đây chính là phần tài nguyên bạn sẽ mua trong khi sử dụng ứng dụng. Ví dụ bạn mua một gói sticker cho ứng dụng iMessage trong lúc sử dụng app này.

# Cách hoạt động của Tags
- Hiểu đơn giản thế này: Game của bạn có nhiều level, mỗi level sẽ cần một phần tài nguyên cần thiết cho level đó. Game bạn có 100 level, không lẽ bạn sẽ để người dùng tải toàn bộ tải nguyên cho 100 level đó, mặc cho tại mỗi thời điểm thì người dùng chỉ sử dụng tài nguyên phục vụ duy nhất một level. Vậy 99 level còn lại không được sử dụng mà luôn tồn tại trong bộ nhớ của thiết bị?
- Vậy việc ra đời Tags sẽ giải quyết vấn đề đó. Tức là 100 level của bạn sẽ được gán 100 tags tương ứng. Khi người dùng chơi ở level nào và cần tài nguyên tương ứng level đó thì sẽ tiến hành request tài nguyên đó bởi tag được chỉ định. Tài nguyên đó sẽ được lưu trữ tới khi tài nguyên đó được kết thúc việc sử dụng. Khi hệ điều hành cần thêm dung lượng thì nó sẽ tiến hành xoá bỏ tài nguyên này. Việc tải và xoá nguồn tài nguyên nếu có cơ hội mình sẽ giới thiệu cho các bạn. Ngoài ra các bạn có thể tìm hiểu tại [Accessing and Downloading On-Demand Resources](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/On_Demand_Resources_Guide/Managing.html#//apple_ref/doc/uid/TP40015083-CH4-SW1)
- Ví dụ một game có nhiều level và hình ảnh dưới đây là toàn bộ tài nguyên cho toàn bộ level của game

![](https://images.viblo.asia/a0368b3b-d0cf-453e-8b3a-4b3c76bd83e8.png)

- Vậy ta nên tạo tags cho từng level.

![](https://images.viblo.asia/00422c13-f0ca-45b1-9aed-e9cc382881e4.png)

- Nhìn vào hình ảnh bạn có thể thấy thay vì phải tải và lưu trữ toàn bộ tài nguyên của game thì bạn chỉ cần tải và lưu trữ tài nguyên cho level bạn đang đạt. Thật tuyệt vời đúng không.

# Vòng đời của On-Demand Resource

- Lần đầu tiên người dùng khởi chạy ứng dụng, các tài nguyên theo yêu cầu trên thiết bị là các tài nguyên được tìm nạp trước. Các bạn có thể tìm kiếm theo từ khoá **Prefetching Tags**. Khi người dùng tương tác với ứng dụng, ứng dụng sẽ yêu cầu tài nguyên theo tag đã gắn trước đó và thông báo cho hệ điều hành khi nó đã hoàn tất, một thời gian sau khi mà hệ điều hành cần thêm bộ nhớ thì nó sẽ dọn tài nguyên này.
- Để rõ ràng hơn các bạn hãy tham khảo hình ảnh sau:

![](https://images.viblo.asia/3de75da3-4185-4ea8-a587-d77fa0f3a2a8.png)

- Trên đây chính là vòng đời của tài nguyên tương ứng với tags được gắn

# Enabling On-Demand Resources

![](https://images.viblo.asia/56b164d6-b2f5-41ea-9ead-fd4b87269efe.png)

- Nhìn vào hình ảnh thì việc enable/disable thật đơn giản
    - Chọn navigator của project > Chọn file project
    - Chọn target
    - Chọn buidl settings
    - Nhập từ tìm kiếm Assets
    - Chọn enable/disable tuỳ theo bạn muốn
        - YES: bạn bật ODR cho target bạn đã chọn
        - NO: bạn tắt ODR cho target bạn đã chọn

# Creating and Assigning Tags
- Xcode cho phép bạn tạo và chỉnh sửa tag, thêm hay xoá tài nguyên là mọt phần của tag và chỉ định thời điểm các tài nguyên được liên kết với nhau được hệ điều hành tải xuống.

![](https://images.viblo.asia/3b306888-43c8-4930-ba18-a78d470a47b4.png)

- Để tạo một tag mới các bạn có thể tiến hành như sau:
    - Chọn project navigator > project file
    - Click resource tag
    - Click dấu + để thêm tag mới > tag mới sẽ được xuất hiện
    
    ![](https://images.viblo.asia/48689267-46c4-4a3c-9860-18e31ecaf969.png)
    
- Để tìm nạp trước theo tags thì:
    - Thông thường hệ điều hành bắt đầu tải xuống các tài nguyên được liên kết với tag khi tag được ứng dụng yêu cầu và tài nguyên đó chưa có trên thiết bị
    - Một số tag chứa tài nguyên quan trọng trong lần đầu tiên ứng dụng khởi chạy hoặc được yêu cầu chạy ngay sau lần khởi chạy đầu tiên. Ví dụ phần tutorial được khởi chạy đầu tiên nhưng nó sẽ không bao giờ được sử dụng lại.
    - Một vài điều chú ý:
        - **Initial install tags**: Là phần tài nguyên được tải xuống cùng với ứng dụng. Kích thước ứng dụng bao gồm luôn cả kích thước của tài nguyên này.
        - **Prefetch tag order**: Các tài nguyên được bắt đầu tải xuống sau khi ứng dụng cài đặt. Các thẻ cũng được tải xuống theo thứ tự đã được liệt kê.
        - **Dowloaded only on demand**: Tài nguyên được tải xuống khi có yêu cầu từ ứng dụng.

# Kích thước giới hạn của On-Demand Resources
- Tổng kích thước cho tài nguyên trong 1 tags là 512MB sau khi Slicing 
- Tổng kích thước cho tài nguyên được lưu trữ trên app store cho mỗi app không vượt quá 20GB
- Các bạn có thể tham khảo một số thông tin về kích thước tại bảng dưới.
> | Item | Size | Slicing |
> | -------- | -------- | -------- |
> |iOS App bundle| 2 GB |✓|
> |tvOS App bundle|4 GB|✓|
> |Tag|512 MB|✓|
> |Asset packs|1000|✓|
> |Initial install tags|2 GB|✓|
> |Initial install and prefetched tags|4 GB|✓|
> |In use on-demand resources|2 GB|✓|
> |Hosted on-demand resources|20 GB|–|
 
# Tổng kết:
- Trên đây mình đã hướng dẫn và giải thích cho các bạn hiểu về việc làm thế nào đê setup ODR. Nó thực sự hữu ích với những người vẫn còn đang sử dụng các thiết bị có dung lượng bộ nhớ thấp.
- Trong các phần tiếp theo mình sẽ tiếp tục đi sâu hơn về ODR
    - Quản lý ODR
    - Lưu trữ ODR
    - Nguyên tắc thiết kế chung

Chân thành cảm ơn các bạn đã đọc.