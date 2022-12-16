Dưới đây là checklist 10 bước để có thể dockerize bất kì ứng dụng nào.

Đã có nhiều hướng dẫn về cách `dockerize` các ứng dụng có sẵn trên internet, vậy tại sao tôi lại viết một cái khác?

Hầu hết các hướng dẫn tôi thấy đều tập trung vào một công nghệ cụ thể (Java hoặc Python) có thể không bao gồm những gì bạn cần. Họ cũng không giải quyết tất cả các khía cạnh liên quan cần thiết để thiết lập một hợp đồng được xác định rõ ràng giữa các nhóm Dev và Ops (đó là tất cả những gì về **containerization**)

Tôi đã biên soạn các bước dưới đây dựa trên kinh nghiệm và bài học kinh nghiệm gần đây của tôi. Đây là danh sách kiểm tra các chi tiết và những thứ bị bỏ qua bởi các hướng dẫn khác mà bạn sẽ thấy. 

Có một lưu ý nhỏ: *Đây không phải là hướng dẫn cho người mới bắt đầu. Tôi khuyên bạn nên tìm hiểu những điều cơ bản về cách thiết lập và sử dụng docker, và quay lại đây sau khi bạn đã tạo và khởi chạy một vài container.*

Hãy bắt đầu nào

# 1. Lựa chọn docker image
Có rất nhiều các image cơ sở về từng công nghệ như:
* https://hub.docker.com/_/java/
* https://hub.docker.com/_/python/
* https://hub.docker.com/_/nginx/

Ngoài ra bạn có thể bắt đầu từ base OS để tự cài đặt mọi thứ nếu như không có image nào phù hợp với bạn. 

Thông thường các bài hướng dẫn sẽ bắt đầu với Ubuntu (ví dụ: Ubuntu: 16.04). Hãy thử nếu bạn thực sự muốn xây dựng một image cho riêng mình. 
# 2. Cài đặt các package cần thiết
Điều này là rất bình thường, check lại một lượt có thể bạn thiếu: 
1. Bạn cần phải viết `apt-get update and apt-get install` trên cùng một dòng. (Tương tự nếu bạn sử dụng apk trên Alpine). Bạn sẽ cần phải thực hiện điều đó nếu không “apt-get update” có thể được lưu vào bộ nhớ cache và có thể không cập nhật package bạn cần sau đó. Bạn có thể tìm hiểu chi tiết hơn tại [đây](https://forums.docker.com/t/dockerfile-run-apt-get-install-all-packages-at-once-or-one-by-one/17191)
2. Kiểm tra kỹ nếu bạn đang cài đặt **ONLY** những gì bạn thực sự cần (giả sử chạy container với production). Có một số người đã cài đặt `vim` và một số `development tools` trong image của họ.

Nếu cần, bạn hãy tạo Dockerfile cho từng môi trường development/staging/test. Điều này không đơn giản chỉ là size của image mà còn về vấn đề bảo mật và khả năng bảo trì. 

# 3. Thêm các file custom
Một vài gợi ý để cải thiện Dockerfile của bạn:
1. Hiểu được sự khác biệt giữa [ADD và COPY](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy)
2. (Cố gắng) Thực hiện theo các quy ước của Hệ thống tệp về nơi đặt tệp của bạn theo như [link](http://www.pathname.com/fhs/) 

Ví dụ: Với các ứng dụng interpreted (Go, Python), sử dụng thư mục `/usr/src`

3. Kiểm tra các thuộc tính của các tập tin bạn đang thêm. Nếu bạn cần sự cho phép thực thi, không cần thêm một layer mới vào image của bạn (RUN chmod +x …). Chỉ cần sửa các thuộc tính ban đầu trên repository của bạn.

Không có lý do cho điều đồ, kể cả trên Windown. Các bạn có thể check tại [link](https://stackoverflow.com/questions/21691202/how-to-create-file-execute-mode-permissions-in-git-on-windows)
# 4. Cho phép các user có quền chạy container của bạn
Đầu tiên hãy nghỉ ngơi và tìm hiểu trước về [bài viết này](https://medium.com/@mccode/understanding-how-uid-and-gid-work-in-docker-containers-c37a01d01cf)

Sau khi đọc xong, bạn sẽ hiểu rằng: 

1. Bạn chỉ cần chạy container của mình với một người dùng (ID cố định) cụ thể nếu ứng dụng của bạn cần quyền truy cập vào bảng người dùng hoặc nhóm  (/etc/passwd hoặc /etc/group)
2. Tránh chạy container dưới quyền root nhiều nhất có thể

Thật không may, không khó để tìm thấy các ứng dụng phổ biến yêu cầu bạn chạy chúng với các id cụ thể (như Elastic Search với uid:gid = 1000:1000 ).
# 5. Định nghĩa "exposed" port
Điều này rất dễ bị bỏ qua. Đừng tạo ra nhu cầu cho container của bạn chạy bằng root vì bạn muốn nó hiển thị một số cổng thấp đặc quyền (80). Thay vào đó chỉ cần hiển thị một cổng không có đặc quyền (ví dụ: 8080) và ánh xạ nó trong quá trình thực thi container

Các bạn có thể đọc tại [đây](https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html) để hiểu rõ sự khác biệt 

# 6. Định nghĩa entrypoint 
Theo vanilla: **Chỉ chạy file thực thi của bạn**

Có một cách thông thường đó là: tạo tập lệnh `docker-entrypoint.sh`  trong đó bạn có thể nối các thứ như: cấu hình bằng các biến môi trường (thông tin thêm về điều này bên dưới).

Đây là một thực tế rất phổ biến, ví dụ như tại [đây](https://github.com/docker-library/postgres/blob/de8ba87d50de466a1e05e111927d2bc30c2db36d/10/docker-entrypoint.sh)

# 7. Định nghĩa "Configuration method"
Mỗi ứng dụng đòi hỏi một số loại tham số. Về cơ bản có hai con đường bạn có thể đi theo:

1. Sử dụng file cấu hình dành riêng cho ứng dụng: chúng sẽ cần ghi lại định dạng, trường, vị trí, v.v. (sẽ không tốt nếu bạn có môi trường phức tạp, với các ứng dụng sử dụng các công nghệ khác nhau).
2. Sử dụng (operating system) Biến môi trường: Đơn giản và hiệu quả

Nếu bạn nghĩ rằng đây không phải là cách tiếp cận hiện đại hoặc được đề xuất, hãy nhớ rằng đây là một phần của [The Twelve-Factors](https://12factor.net/)

Điều này không có nghĩa là bạn cần phải vứt bỏ các file cấu hình của mình và cấu trúc lại cấu hình ứng dụng.

Chỉ đơn giản sử dụng lệnh [envsubst](https://linux.die.net/man/1/envsubst) để thay thế cấu hình (bên trong `docker-entrypoint.sh`, vì nó cần được thực hiện trong thời gian chạy). 

Như ví dụ [này](https://docs.docker.com/samples/library/nginx/#using-environment-variables-in-nginx-configuration). Điều này sẽ gói gọn file cấu hình cụ thể của ứng dụng, đặt bên trong container.
# 8. Externalize dữ liêu của bạn
Có một nguyên tắc vàng đó là: **Không lưu bất kì dữ liệu liên tục nào trong container**

File hệ thống của container được cho là tạm thời. Vì vậy, bất kỳ người dùng nào tạo nội dung, file dữ liệu, đầu ra quá trình nên được lưu trên **mounted volume** hoặc **bind mounts** (nghĩa là trên một thư mục trên Base OS được liên kết bên trong container)

Thành thật tôi không có nhiều kinh nghiệm về `mounted volumes`, tôi luôn thích lưu dữ liệu trên các **bind mounts**, sử dụng một thư mục được tạo trước đó được xác định cẩn thận bằng cách sử dụng **configuration management** (như Salt Stack).

Hãy chú ý một số định nghĩa như sau:

1. Tôi tạo một người dùng (và nhóm) không có đặc quyền trên Base OS.
2. Tất cả các thư mục liên kết (-v) được tạo bằng người dùng này với tư cách là chủ sở hữu.
3. Quyền được cấp tương ứng (chỉ với người dùng và nhóm cụ thể này, những người dùng khác sẽ không có quyền truy cập vào đó).
4. Container sẽ được chạy với người dùng này.
5. Bạn sẽ có toàn quyền kiểm soát điều đó.
# 9. Đảm bảo bạn xử lí tốt với log
Với các dữ liệu liên tục trước đây, tôi không có định nghĩa một cách chính xác và nó đôi khi rơi vào vùng xám. Bạn nên xử lí nó thế nào?

Nếu bạn đang tạo một ứng dụng mới và muốn ứng dụng đó tuân theo các quy ước của docker, thì không có file log nào được ghi cả. Ứng dụng nên sử dụng **stdout** và **stderr** như **event stream**. Giống như đề xuất biến môi trường, nó cũng là một trong [The Twelve-Factors](https://12factor.net/). Hãy tìm hiểu qua nội dung [này](https://12factor.net/logs)

Docker sẽ tự động chụp mọi thứ bạn đang gửi đến **stdout** và làm nó có sẵn thông qua lệnh ["docker logs"](https://docs.docker.com/engine/reference/commandline/logs/)

Trong thực tế, có một số trường hợp thực sự khó khăn. Nếu bạn đang chạy một nginx container đơn giản, bạn sẽ có ít nhất hai loại tệp nhật ký khác nhau:
* HTTP Access Logs
* Error Logs

Với các cấu trúc, cấu hình khác nhau và các cài đặt đã có sẵn, việc đặt chúng trên đầu ra tiêu chuẩn có thể cần thiết.

Trong trường hợp này, chỉ cần xử lý các file log như được mô tả trong phần trước và đảm bảo bạn `rotate` chúng.
# 10. Sử dụng Rotate log 
Nếu ứng dụng của bạn có chức năng ghi log hoặc nối thêm bất kỳ file nào có thể phát triển vô hạn, bạn cần quan tâm tới việc file **rotation**. Ví dự như một ứng dụng *Rails* chẳng hạn. File *logs/{environment}.log* sẽ tăng lên theo thời gian. 

Điều này rất cần thiết để tránh việc server bị tràn dung lượng, áp dụng các chính sách lưu giữ dữ liệu (điều này rất quan trọng khi nói đến GDPR - General Data Policy Regulation -  và các quy định dữ liệu khác). 

Bạn có thể tìm hiểu cách sử dụng rotate log tại [đây](https://hocvps.com/logrotate/). Bạn sẽ cần một thời gian nhất định để log có thể chạy được nên đừng lo lắng sau khi bạn đã test thử config mà vẫn chưa sinh ra ngay file rotation. 

Bài viết được dịch từ [nguồn](https://hackernoon.com/how-to-dockerize-any-application-b60ad00e76da)