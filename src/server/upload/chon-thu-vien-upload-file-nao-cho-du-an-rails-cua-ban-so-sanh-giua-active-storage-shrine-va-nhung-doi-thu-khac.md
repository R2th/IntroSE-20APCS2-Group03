# Tại sao cần một thư viện hỗ trợ upload file?
![](https://images.viblo.asia/82e11235-534c-4797-a0c3-9f7e9018ea69.png)

Mặc định, Rails đã hỗ trợ sẵn khả năng nhận một file upload gửi từ trình duyệt. Để upload một file từ trình duyệt, người dùng cần gửi nó qua trường chọn file trong một form *multipart/form-data*, ví dụ như khi upload ảnh avatar:
```html
<%= form_with model: @user do |f| %>
  <%= f.file_field :avatar %>
  <% # ... %>
<% end %>
```

Sau đó ở controller, bạn sẽ nhận được `params[:avatar]` là một đối tượng UploadedFile chứa thông tin và đường dẫn tạm của file vừa nhận được. Cuối cùng, bạn có thể lưu cứng file đó lên server (ví dụ như vào thư mục *public/uploads* chẳng hạn), rồi lưu địa chỉ vào một trường (ví dụ như avatar_path) trong CSDL để hiện ra làm avatar cho người dùng. Nhưng sẽ thế nào nếu như:
- Bạn cần **xác thực** (validate) xem file người dùng upload lên có phải là file ảnh không, hay nó là file pdf, mp3,...? Hoặc bạn muốn giới hạn dung lượng ảnh upload lên chỉ ở mức dưới 6MB?
- Làm sao để các file upload lên rồi có thể **được cache lại** trên server, phòng trường hợp người dùng nhập các trường khác bị lỗi (như "tiêu đề quá ngắn") mà không phải chọn lại và tải lại file từ đầu?
- Bạn muốn *thay đổi kích cỡ* (resize) còn 500x500 cho phù hợp với khung avatar, *đổi định dạng* từ gif, png sang jpg và *nén*, giảm dung lượng (compress) hình ảnh,... Hay nói cách khác, bạn muốn làm thêm một số tác vụ xử lý (**reprocessing**) tệp tin sau khi được upload, tốt nhất là thông qua một background job?
- File upload lên server cần có **nhiều phiên bản** khác nhau. Ví dụ, nếu người dùng tải lên một video, bạn muốn sinh ra ảnh minh họa (thumbnail/poster), các chất lượng khác nhau (360p, 720p, Full HD,...), các định dạng khác nhau (mp4, webm, ogg,...) để tương thích với nhiều loại trình duyệt, thiết bị.
  
  Trong nhiều trường hợp, bạn còn cần sinh thêm nhiều phiên bản khác theo kiểu on-the-go (chỉ sinh ra khi cần đến). Vậy làm sao để quản lý hiệu quả nhiều phiên bản tương ứng của cùng một file upload ban đầu, và **thiết kế CSDL** ra sao cho phù hợp (chẳng nhẽ tạo thật nhiều cột trong csdl: 360p_mp4, 720p_mp4, 360p_webm,...)?
- Thay vì lưu nó lại trên server, bạn muốn **chuyển file đến S3, Google Cloud Storage, Azure Block Blobs,...** cũng như **sử dụng với CDN**?

Để làm những việc trên thật hiệu quả và **tránh khả năng có bug hoặc vấn đề về bảo mật**, bạn nên sử dụng một thư viện giúp hỗ trợ việc upload/đính kèm file.
# So sánh các thư viện upload file
Các thư viện upload file phổ biến cho Rails ngày nay: PaperClip, CarrierWave, Active Storage, Shrine,...
## Paperclip
**Paperclip** là một gem upload file khá đơn giản và nhỏ gọn. Nhưng trong một dự án có dùng Paperclip, mình đã gặp phải trường hợp cần phải cache lại file trong trường hợp fail validate (như ý thứ 2 ở trên) và quả thực điều này rất khó thực hiện với Paperclip. Nói ngắn gọn, Paperclip **không hỗ trợ cache file** đã upload.

Để upload file bằng Paperclip với đầy đủ thông tin cơ bản, bạn cần thêm lên đến **4 cột khác nhau** trong CSDL:
- attachment_file_name
- attachment_file_size
- attachment_content_type
- attachment_updated_at

Background processing của Paperclip có thể thực hiện bằng *delayedpaperclip*. Tuy nhiên nó còn tồn tại khá nhiều nhược điểm. Ví dụ như quá trình xử lý nền chỉ được thực hiện sau khi upload file đã xong tất cả: sau khi upload file lên server và từ server lên storage ngoài. Quá trình upload này cũng bị buộc phải thực hiện trong một transaction. Điều này sẽ làm **giảm rất nặng throughput** của hệ thống.

Hơn nữa, Paperclip có vẻ như **đã bị deprecated**, và tác giả gem chuyển sang **khuyên dùng ActiveStorage** mặc định của Rails. Như vậy, Paperclip không phải là lựa chọn tốt cho dự án Rails mới.

## CarrierWave
Tính đến thời điểm viết bài, **CarrierWave** là thư viện upload phổ biến nhất dành cho Rails. CarrierWave **hoàn thành tốt đầy đủ** những yêu cầu như đã nêu ở phần đầu viết bài: từ validate, processing cho đến tích hợp các dịch vụ lưu trữ bên ngoài. Nổi trội hơn Paperclip, CarrierWave **hỗ trợ cache** lại tệp đã upload phòng khi trường hợp validate fail xảy ra.

Sau khi upload thành công, CarrierWave lưu **thông tin dưới dạng JSON** vào một cột trong CSDL. Ví dụ: avatar của người dùng sẽ được lưu vào cột có tên *avatar* trong bảng *users*.

Dù không có sẵn khả năng Direct Upload, vì CarrerWave vốn có hỗ trợ cache nên không quá khó để bạn tự xây dựng tính năng này hay sử dụng thêm gem bổ sung như carrierwave_direct.

Thư viện carrierwave_backgrounder sẽ cho thêm tính năng xử lý file/xóa file dưới tiến trình nền (background job). Nhìn chung, việc background process hoàn thiện hơn so với Paperclip. Với CarrierWave, bạn cần sử dụng một thuộc tính riêng trong CSDL để lưu trạng thái background đã xử lý xong hay chưa, nhưng phải để ý chút vì nó **không thực sự thread-safe**.

Kết luận chung: **CarrierWave là lựa chọn rất tốt** nếu bạn muốn tìm một thư viện upload file ổn định, trưởng thành cho ứng dụng Rails.

Tìm hiểu về CarrierWave tại địa chỉ [github.com/carrierwaveuploader/carrierwave](https://github.com/carrierwaveuploader/carrierwave)

## Active Storage
Trước hết, ưu điểm lớn nhất của **Active Storage** là nó đi cùng với các bản Rails mới (5, 6,...), và tương lai sẽ là chuẩn mực chung để dùng cho công việc xử lý upload file. Active Storage rất thích hợp với những ứng dụng Rails mà chỉ cần tính năng upload file đơn giản, nhưng cũng đã được thử nghiệm và **chạy tốt trên các hệ thống rất lớn** như Basecamp.

Khác hoàn toàn với Paperclip và Carrierwave, Active Storage chỉ sử dụng **2 bảng độc lập** trong CSDL để lưu thông tin về các file đã upload: *activestorageblobs* và *activestorageattachments*. Bằng cách khéo léo sử dụng tính năng **đa hình** (polymorphic), Active Record giúp cho chúng ta **khỏi cần dùng migration để tạo thêm cột mới** nếu sau này ứng dụng Rails có cần thêm trường upload file nào khác. Dù cách làm này khiến việc truy vấn phức tạp hơn và **có nguy cơ bị N+1** nếu làm không cẩn thận, đây vẫn là cách làm rất thú vị. Nó làm đơn giản hoá và giúp bạn khỏi bận tâm nhiều về việc làm tính năng upload.

Điểm mạnh khác của Active Storage là có khả năng process **On-the-fly**, tức xử lý file chỉ khi chúng cần đến. Điều này rất hữu ích cho file ảnh, khi bạn không biết trước được mình cần những kích cỡ ảnh nào ngay khi mới upload. Bạn chỉ cần truy cập đường link với số width x height tương ứng, Active Storage sẽ tạo nó cho bạn. Các tính năng như tích hợp S3 hay Direct Upload cũng có hỗ trợ đầy đủ.

Hơi củ chuối khi Active Storage ra mắt mà **chưa có sẵn tính năng validate**, nhưng rất may có gem [active_storage_validations](https://github.com/igorkasyanchuk/active_storage_validations) giúp bạn.

Hiện tại, với những file đã được upload, Active Record chỉ cho bạn lấy một đường dẫn tạm thời của tệp tin và sẽ nhanh chóng thay mới và hết hạn. Điều này dù giúp các file đã upload giữ bảo mật hơn nhưng ngăn cản bạn tận dụng các dịch vụ CDN để cache các file đã upload, nhưng sẽ được khắc phục ở bản Rails 6.1.

Tóm lại, mặc dù Active Storage còn đang trưởng thành và còn thiếu nhiều tính năng, nhưng cũng đang được tích cực phát triển và được **hỗ trợ chính thức** bởi Rails. Bạn nên ưu tiên Active Storage cho dự án Rails mới trừ khi bạn cần điều gì đặc biệt mà Active Storage hiện chưa đáp ứng được.

Tài liệu tổng quan của Active Storage tại đây: [guides.rubyonrails.org/active_storage_overview.html](https://guides.rubyonrails.org/active_storage_overview.html)

## Shrine
![Shrine](https://images.viblo.asia/4c57bf43-fa6d-4546-b9b7-c9d13d552eed.png)

**Shrine** cũng là một gem cho việc upload/đính kèm file mới nổi và được ra đời sau sự hiện diện của Active Storage. Khác hoàn toàn với các thư viện kể trên, Shrine **không hề bị gắn chặt vào hệ sinh thái Rails và Active Record**. Bạn có thể dùng nó với framework Roda, Grape, Sinatra,... với bất kỳ ORM nào khác như Sequel, ROM,... Kể cả nếu bạn chỉ quan tâm đến Rails/Active Record thì tích hợp Shrine vẫn hoàn toàn dễ dàng.

Shrine **rất nhẹ và rất modular**, tức bạn chỉ cần chọn sử dụng bất kỳ plugin nào mà bạn cần. Các plugin của Shrine cực đa dạng: từ hỗ trợ backgrounding, đa phiên bản (versions, ở bản Shrine 3 chuyển sang gọi là derivatives), cho đến giúp trích xuất metadata của bất kỳ dạng file nào.

Shrine hỗ trợ cả xử lý file ngay sau khi upload hoặc **xử lý on-the-fly** như Active Storage. Quá trình xử lý file không nhất thiết phải dùng cho file ảnh mà là bất cứ dạng file nào bạn muốn. Bạn có thể dùng *imagemagick*/*vips* để xử lý file ảnh, hay sử dụng chạy dòng lệnh shell với *ffmpeg* để xử lý file video,...

Tương đồng với CarrierWave, thông tin của từng loại file được upload lên sẽ được lưu vào một thuộc tính tương ứng trong bảng tương ứng. Ví dụ, avatar của người dùng upload lên sẽ được lưu thông tin tại trường avatar_data trong bảng table. Điểm khác biệt là thông tin của trường này **lưu ở dạng JSON** và **chứa mọi nội dung liên quan** đến file ấy. Lấy ví dụ như avatar, Shrine sẽ lưu đầy đủ về đường dẫn và metadata của file gốc, cùng đường dẫn và metadata của tất cả các phiên bản file được tạo ra (versions/*derivatives*).

Tính năng versions/derivatives còn cho phép **nest bao nhiêu level tùy thích**. Nhờ vậy, **tính năng derivatives** của Shrine **cực kỳ thích hợp để giải quyết vấn đề nhiều phiên bản**, nhất là khi bạn cần lưu lại nhiều loại định dạng cùng độ phân giải tương ứng khác nhau (mp4/webm/ogg/..., 360p/720p/...) như ở đầu bài mình đã nói.

Tuy Shrine có hơi mới và khó tìm cách giải quyết trên mạng những vấn đề hay gặp hơn các thư viện trước, Shrine có **tài liệu hết sức chi tiết** và đầy đủ tại [shrinerb.com/docs/getting-started](https://shrinerb.com/docs/getting-started). Tác giả cũng hiện đang tích cực phát triển thư viện này, là người thân thiện và thường xuyên giúp đỡ mọi người tại [StackOverFlow](https://stackoverflow.com/questions/tagged/shrine) hay Reddit.

Kết luận, Shrine là thư viện upload **tuyệt vời và toàn diện** khi đã chú ý và **làm tốt mọi yêu cầu ở phần đầu bài viết** này, và hơn thế nữa. Shrine cũng là lựa chọn tốt nhất duy nhất nếu bạn định sử dụng Roda/Sequel và những combo khác thay cho Rails.

Bạn có thể tìm hiểu thêm về Shrine tại [shrinerb.com](https://shrinerb.com/)

# TL;DR
Chiến thắng hiện giờ thuộc về **Shrine** 🎉

# Tham khảo
[Best image uploader for Rails — Revisited](https://blog.stanko.io/best-image-uploader-for-rails-revisited-3b3b7618cc4c)