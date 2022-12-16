# I. Vấn đề hiện nay
Internet hiện nay được xây dựng trên nền tảng giao thức HTTP (HyperText Transfer Protocol - Giao thức truyền tải siêu văn bản), là giao thức cốt lõi mà chúng ta đang sử dụng trong việc truyền và nhận dữ liệu trên mạng Internet. Mặc dù được sử dụng một cách rộng rãi nhưng HTTP có một số hạn chế nổi bật như: mức độ bảo mật, khả năng truyền tải.

Giao thức HTTP làm cho các hoạt động của chúng ta trên mạng Internet bị phụ thuộc vào máy chủ. Nhìn hình ảnh dưới đây chắc các bạn cũng rất quen thuộc, nỗi ác mộng của mọi người khi máy chủ thông báo không tìm thấy nội dung mà chúng ta truy cập tới.

![](https://images.viblo.asia/7e9716b2-d11a-4c22-a8a9-4e69d9f94376.png)

Lỗi trên thường gặp phải khi chúng ta truy cập vào các nội dung đã cũ hoặc máy chủ hiện thời không thể trả về kết quả mong muốn. đây là một hạn chế rất lớn của HTTP.

Tưởng tượng rằng dữ liệu của bạn được lưu ở trên máy chủ, bỗng một ngày đẹp trời có vài tên hackers rảnh tay không có gì làm, chúng tấn công DDOS vào máy chủ làm máy chủ bị shut down, hoặc tấn công ăn cắp thông tin trong cơ sở dữ liệu trên máy chủ, sau đó xoá toàn bộ các tệp tin báo cáo/source code cho đồ án tốt nghiệp của bạn. BOOM, mời bạn đăng ký học lại :). Một ví dụ khác khi các bạn thử tải các video của các idol JAV từ openload về, các bạn có thể thấy rõ rằng tốc độ download rất chậm, đồng thời hay bị delay hoặc xảy ra lỗi khi download (Mình đã bao phen toan đập bàn phím vì nó :-D).
# II. IPFS và mạng chia sẻ tập tin phân tán ngang hàng
IPFS-InterPlanetary File System, là một giao thức phân phối dữ liệu hoạt động dựa trên nội dung và danh tính. Các bạn có thể xem thêm tại [ipfs.io](https://ipfs.io).
IPFS là một giao thức trên đó cho phép người dùng chia sẻ các tập tin ngang hàng với nhau, không cần có sự xuất hiện của máy chủ. Các nội dung khi người dùng upload lên sẽ được băm và sinh ra một đoạn mã. Mỗi nội dung giống nhau sẽ luôn cho các mã băm giống nhau, từ đó IPFS loại bỏ được sự trùng lặp. Nội dung khi một nút chia sẻ sẽ được chia thành các mảnh, sau đó chúng sẽ được đưa tới các nút gần nó  trong mạng. Khi muốn tải về một tệp tin, một nút sẽ yêu cầu máy chủ tìm trong một bảng băm phân tán có thông tin của tất cả mọi nút trong mạng để tim ra được các mảnh của nội dung được lưu trữ ở những nút nào, công cuộc tìm kiếm được thực hiện một cách hiệu quả, IPFS mô tả rằng một nội dung có thể tìm ra sau tối đa 20 bước nhảy cho mạng 10 triệu nút. Việc nội dung được lưu ở các nút khác nhau gần đó sẽ giúp cho việc tải về chúng nhanh hơn, giúp tiết kiệm băng thông, 

Lấy thí dụ như đoạn MV từng gây sốt trên YouTube từ năm 2013 là Gangnam Style có dung lượng khoảng 117 MB. Với lượt người xem khoảng 2,3 tỷ vào đầu năm 2016, ta tính được tổng cộng khoảng 274.286.340.432 MB hay 274,3 Petabyte dữ liệu được truyền tải trên Internet. Nếu tính trung bình với giá 1 cent cho mỗi gigabyte dữ liệu (bao gồm chi phí băng thông và máy chủ trên toàn thế giới), thì 2,74 triệu USD đã được sử dụng chỉ để phân phát đoạn video này tới người xem trên toàn thế giới.

Với cách thức hoạt động khác biệt, IFPS sẽ cho phép đoạn video trên được tải hoàn toàn về mạng nội bộ IPS dù bạn là ai và đang ở đâu. Do đó loại bỏ sự cần thiết của hàng loạt trạm kết nối và máy chủ Internet, giúp chi phí tổng thể giảm một cách rõ rệt.

# III. Cài đặt và chạy thử IPFS
Để sử dụng IPFS chúng ta tài về `go-ipfs` tại đây: [https://ipfs.io/docs/install/](https://ipfs.io/docs/install/). Cách cài đặt khá đơn giản, các bạn tải về (theo nền tảng của máy, ở đây máy mình là MACOS).
Sau khi tải `go-ipfs` về chúng ta được file `go-ipfs_v0.4.14_darwin-amd64.tar`. Các bạn quay lại thư mục cha nơi chứa file `tar` vừa tải về, mở terminal tại thư mục đó và chạy câu lệnh:
```
tar xvfz go-ipfs.tar.gz
```
Giải nén xong ta được thư mục `go-ipfs`, các bạn mở terminal tại thư mục và chạy command sau để cài đặt ipfs:
```
./install.sh
```
Sau đó chạy thử command sau để xem đã cài đặt thành công chưa nhé:
```
ipfs help
```
Nếu xuất hiện dòng: 
```
USAGE
  ipfs - Global p2p merkle-dag filesystem.

  ipfs [--config=<config> | -c] [--debug=<debug> | -D] [--help=<help>] [-h=<h>] [--local=<local> | -L] [--api=<api>] <command> ...
```
Là chúng ta đã cài đặt thành công rồi đó.
Sau đây chúng ta sẽ làm một vài chức năng cơ bản của IPFS nhé. Đầu tiên chúng ta cần khởi tại nút của mình để tham gia vào hệ thống mạng IPFS bằng cách chạy command sau:
```
ipfs init
```
Sau đó chạy câu lệnh sau để bắt đầu tham gia vào mạng online:
```
ipfs daemon
```
Các bạn sẽ thấy thông báo như sau: 
```
> ipfs daemon
Initializing daemon...
API server listening on /ip4/127.0.0.1/tcp/5001
Gateway server listening on /ip4/127.0.0.1/tcp/8080
```
Để upload một tệp tin lên IPFS, các bạn làm như sau:
```
ipfs add <path_to_file>
```
Ở đây mình có file cat.jpg để luôn ở trong thư mục `go-ipfs`, nên command add sẽ như sau:
```
ipfs add cat.jpg
```
Sau đó các bạn có thể thấy rằng IPFS trả về cho chúng ta như sau:
```
added Qmd286K6pohQcTKYqnS1YhWrCiS4gz7Xi34sdwMe9USZ7u cat.jpg
```
Ở đây phần `Qmd286K6pohQcTKYqnS1YhWrCiS4gz7Xi34sdwMe9USZ7u` chính là đoạn mã của file các bạn tải lên, và đoạn mã này là **duy nhất**, mã này đại diện cho duy nhất file các bạn tải lên, chỉ cần chúng ta thay đổi 1 kĩ tự sau đó `add` lại sẽ thấy đoạn mã khác hoàn toàn

Để check xem file của chúng ta đã được đưa lên IPFS thật hay chưa và có thể truy cập online được hay không, các bạn có thể truy cập vào [https://gateway.ipfs.io/ipfs/Qmd286K6pohQcTKYqnS1YhWrCiS4gz7Xi34sdwMe9USZ7u](https://gateway.ipfs.io/ipfs/Qmd286K6pohQcTKYqnS1YhWrCiS4gz7Xi34sdwMe9USZ7u). Và sẽ thấy như sau: 

![](https://images.viblo.asia/dedbead3-84b9-4bec-af98-dbdb9a16962a.png)
Vậy là file của các bạn đã được đưa lên IPFS và có thể được truy cập bởi các nút khác rồi đó.
Để tải về một file trên IPFS các bạn chạy command sau:
```
ipfs cat <hash_of_file>
```

Ví dụ như với file ảnh bên trên mình sẽ làm như sau, xoá đi file `cat.jpg` ở trong thư mục `go-ipfs` mà chúng ta thêm vào ở bên trên:
```
ipfs cat Qmd286K6pohQcTKYqnS1YhWrCiS4gz7Xi34sdwMe9USZ7u
```
Vào lại thư mục `go-ipfs` các bạn có thể thấy đã tải về thành công file `cat.jpg` khi nãy chúng ta upload lên IPFS rồi đó.

# III. Kết luận
Qua bài này mình đã hướng dẫn cơ bản các bạn về IPFS, cách cài đặt và sử dụng IPFS. Không biết liệu rằng IPFS có được phát triển để thay thế được HTTP trong tương lai hay không, tuy vẫn còn hạn chế nhưng chúng ta có thể thấy được nó đã khắc phục được các nhược điểm cơ bản của HTTP.

Bài viết này của mình có thể có sai sót nên nếu có gì các bạn cứ comment góp ý nhiệt tình nhé.
Cám ơn các bạn đã theo dõi.