## 5. Sử dụng tag để tránh bị thay đổi base image
Mỗi Docker image có nhiều tag, cho nhiều kiểu image khác nhau cho các mục đích khác nhau. Tag thường được thấy nhất là tag `latest`, thường được dùng cho bản mới nhất của image đó. Image có thể thay đổi trong khi tên tag thì vẫn giữ nguyên và tác giả có thể có thể publish nhiều tag vào chung một tag. Điều này cũng có nghĩa là base image của ứng dụng của bạn có thể thay đổi theo thời gian. VIệc này có thể dẫn đến những lỗi inconsistent khi chạy container.

Có nhiều cách để giảm thiểu vấn đề này như sau:

- Sử dụng tag chi tiết nhất có thể. Nếu một image có chứa nhiều tag, ví dụ như `node:latest` hay `node:8.15` hoặc `node:8.15.1-alphine`, nên sử dụng tag chứa thông tin chi tiết nhất. Tránh việc sử dụng một tag chung chung như tag `latest`. Nên nhớ rằng khi sử dụng một tag chi tiết, tag đó có thể bị xóa trong tương lai vì không còn được sử dụng nữa.
- Để tránh việc một tag trở nên unavailable hay làm chậm tiến độ của đội phát triển sử dụng tag đó, nên sử dụng một mirror cho image này trong một registry của tổ chức, công ty hay đưa image đó và tài khoản của bạn Điều quan trọng là phải tính đến việc maintain các image hay registry. Sao chép một image vào registry của bạn là một best practice phổ biến để đảm bảo image đó không bị thay đổi hoặc xóa trong tương lai.
- Nên chỉ rõ image nào được pull về. Thay vì pull một tag, bạn có thể pull về một image sử dụng SHA256 của nó. Điều này sẽ đảm bảo bạn pull được đúng image mà bạn muôn. Tuy nhiên, sử dụng SHA256 có thể chứa rủi ro, nếu một image thay đổi hash, hoặc nó bị xóa, bạn không thể pull image đó về nữa.

## 6. Sử dụng `COPY` thay cho `ADD`

Docker cung cấp 2 lệnh sử dụng để sao chép file từ host và trong docker image khi build. Một là `COPY` và cái còn lại là `ADD`. Lệnh thì có vẻ giống nhau, tuy nhiên chúng khác nhau về mặt tính năng:
- `COPY` - Copy local files đến một vị trí cụ thể trong image. Bằng việc sử dụng `COPY` bạn phải đưa ra địa chỉ mà các file được sao chép tới.
- `ADD` - Copy local files không cần một địa chỉ cụ thể. Ngầm định tạo thư mục đích khi nó không tồn tại và chấp nhận lưu trữ dưới dạng URL cục bộ hoặc từ xa làm nguồn, nó mở rộng hoặc tải xuống tương ứng vào thư mục đích.

Tuy khác biệt là không đáng kể tuy nhiên chúng lại khá quan trong. Chúng ta nên chú ý đến những vấn đề bảo mật trong những khác biệt này:
- Khi một URL từ xa được sử dụng để tải xuống dữ liệu trực tiếp về image, chúng có thể bị tấn công MITM làm thay đổi thông tin các file được tải về image. Thêm vào đó, nguồn gốc và tính xác thực của một URL từ xa cần phải được xác định thêm. Khi sử dụng lệnh `COPY`, nguồn gốc của các file được tải về từ URL từ xa nên được định nghĩa với một kết nối TLS và nguồn gốc của chúng cần phải được xác thực.
- Sử dụng `COPY` cho phép tách phần bổ sung của một kho lưu trữ khỏi các vị trí từ xa và giải nén nó thành các lớp khác nhau, giúp tối ưu hóa bộ đệm cho image. Nếu cần các tệp từ xa, kết hợp tất cả chúng vào một lệnh `RUN` để tải xuống, trích xuất và dọn dẹp sau đó tối ưu hóa thao tác một lớp trên một số lớp sẽ được yêu cầu nếu sử dụng `ADD`.
- Khi lưu trữ cục bộ được sử dụng, `ADD` sẽ tự động trích xuất chúng vào thư mục đích. Mặc dù điều này có thể được chấp nhận, nhưng nó có thêm nguy cơ bom zip và lỗ hổng Zip Slip sau đó có thể được kích hoạt tự động.

## 7. Build image bằng đa tầng (multi-stage)
Khi build image bằng Dockerfile, rất nhiều các file và thư viện được sử dụng trong quá trình build. Những file và thư viện như các công cụ phát triển cần cho compile hay dependency cho các thư viện, temp file và nhiều những file khác. Những file này cần phải có trong quá trình build image nhưng khi đã build xong thì một số file hoặc thư viện sẽ không cần thiết nữa và làm cho image của chúng ta có kích thước lớn và cũng như làm tăng bề mặt tấn công lên ứng dụng của mình.

Golang là một ví dụ điển hình cho vấn đề này. Để build một ứng dụng Golang, ta cần phải có Go compiler, tuy nhiên khi build xong thì compiler này sẽ không cần dùng nữa và trong quá trình sử dụng cũng không đụng chạm gì vào các thành phần của compiler này. Đó cũng là lý do để Docker xây dựng tính năng build image đa tầng.

Tính năng này cho phép ta sử dụng nhiều image tạm trong quá trình build image và có thể loại bỏ các file hoặc thư viện thừa thãi không sử dụng khi build xong. Ý tưởng của build đa tầng được đưa ra như sau:
- Image đầu tiên - Một image lớn với đầy đủ các thư viện được sử dụng để build ứng dụng.
- Image thứ hay - Một image nhỏ chỉ chứa các thư viện cần thiết cho ứng dụng chạy mà không cần các thư viện thừa thãi khác trong quá trình ứng dụng hoạt động

Chúng ta có thể xây dựng một ứng dụng phức tạp hơn với nhiều image cho nhiều tầng khác nhau, mục đích cuối cùng là có được một image nhỏ, nhẹ, và chỉ chứa những file cần thiết, ***ĐỦ*** để cho ứng dụng hoạt động bình thường. Các image trung gian sau đó có thể loại bỏ vì không còn sử dụng nữa và giảm thiểu bộ nhớ.

## 8. Dùng linter cho Dockerfile
Adopt the use of a linter to avoid common mistakes and establish best practice guidelines that engineers can follow in an automated way.
Sử dụng linter cho Dockerfile để tránh những lỗi cơ bản khi xây dựng Dockerfile và dễ dàng theo một guideline cụ thể do cá nhân hoặc tổ chức yêu cầu. Linter cũng có thể check Dockerfile một cách tự động và thông báo cho nhà phát triển những lỗi và practice khuyên dùng khi viết Dockerfile.

Một linter thường được sử dụng cho `Dockerfile` đó là `hadolint`. Nó sẽ đọc `Dockerfile` và chỉ ra những cảnh báo và các lỗi trong `Dockerfile` đó.
![hodolint in action](https://images.viblo.asia/70a2ef84-2f44-4cc9-b8dd-d17391591095.png)

`hadolint` có thể được sử dụng chung với các IDE hay editor như `VSCode` hay `Vim` và `SublimeText`. Nó sẽ giúp việc phát triển `Dockerfile` trở nên dễ dàng, an toàn hơn.