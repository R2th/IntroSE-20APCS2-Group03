## **1. Một số docker command thông dụng.**
- Như phần trước chúng ta đã cùng làm quen quavới docker, tiếp đến phần này chúng ta sẽ cùng ôn lại và mở rộng một số lệnh command nhập môn khác nhé:
- Chúng ta cùng chạy lệnh `hello-world` để kiểm tra các container:
```swift
docker run hello-world
docker ps -a
```
![](https://images.viblo.asia/2ba4897d-32c0-4984-aa6f-58863182de3c.png)
- Bây giờ chúng ta đã thấy một số container khác với các Id và names khác nhau. Chúng ta có thể xoá các container với một câu lệnh duy nhất như: `docker rm e5d stupefied_gates`. Kết quả sẽ cho ra các containerid với names chúng ta đã xoá bỏ. Chúng ta sẽ kiểm tra các container còn lại với `docker ps -a`.
Để thuận thiện cho quá trình làm việc với docker chúng ta sẽ cần đặt những names container riêng biệt, ví dụ như hãy cùng chạy lệnh:
```swift
docker run --name khanhnp hello-world
```
- Sau đó kiểm tra chúng ta sẽ có kết quả như sau:
![](https://images.viblo.asia/e46423c5-c5c1-4b88-b8ba-6e361fb8da77.png)
 ```swift
docker run --name khanhnp hello-world
```
- Nhưng nếu chúng ta tiếp tục chạy lệnh trên thì sẽ có kết quả gì? Chúng ta sẽ thu được lỗi như hình bên dưới, đây là cách hữu hiệu để docker tránh spam gây ảnh hưởng cho quá trình người sử dụng
![](https://images.viblo.asia/b4bd7de0-651f-4718-9c10-8bb54eca16f0.png)
- Tiếp tới chúng ta sẽ sử dụng một trick hiệu quả để chạy `docker run hello-world` nhiều lần. Để tránh mất dấu container trong thư mục bừa bộn chúng ta đã bày ra thì chúng ta có thể chạy lệnh:
 ```swift
 docker ps -a -q -f status=exited
  ```
  ![](https://images.viblo.asia/69eecaec-7558-4081-8f14-1968e6360914.png)
  - Câu lệnh `docker ps -a` chúng ta sử dụng để show ra tất cả container trong hệ thống của chúng ta. Chúng ta có thể mở rộng với 2 cách dùng. Option `-q` viết tắt cho `--quiet` - command chỉ hiển thị số id. Option `-f` viết tắt cho `--filter` - lọc với điểu kiện `status-exited`.
  - Bây giờ thay vì copy paste từng id trong `docker rm`, chúng ta chỉ cần chạy:
  ```swift
  docker rm $(docker ps -a -q -f status=exited)
 ```
 - Những lệnh trong `$()` sẽ được ưu tiên chạy đầu, lấy ra những ID đã exited khỏi container và xoá tất cả chúng - COOL.
- Chúng ta đã xoá container, giờ chúng ta cũng cần xoá image:
```swift
docker rmi hello-world
```
- Chúng ta sẽ thu được kết quả như sau:
![](https://images.viblo.asia/e43da371-7458-4aea-96c0-66dd717033c4.png)
- Cùng kiểm tra các image với lệnh : `docker images` 
![](https://images.viblo.asia/b68155b0-403b-4738-a208-2e024560210b.png)
- Toát mồ hôi nhỉ, chúng ta đã cùng dạo qua những lệnh tối thiểu để dùng docker, tiếp đó chúng ta sẽ cùng làm những thứ thực tế hơn nhé::D
## **2. Chạy một web app sử dụng docker container.**
- Rất nhiều iOS app kết nối với web server phục vụ việc bạn muốn tương tác giữa ios app với web app. Bạn có thể chạy web app local mà không sử dụng docker, nhưng sử dụng docker sẽ khiến công việc trở nên dễ dàng hơn rất nhiều.
- Bắt đầu với một web app đơn giản từ IBM Kitura. Cùng mở trình duyệt lên 	[Docker Hub](https://hub.docker.com/) gõ **kitura** và **search**, chúng ta sẽ có kết quả:
![](https://images.viblo.asia/e3fb0051-27f3-4285-8365-c014a1896a56.png)
- Chúng ta sẽ pull về với command `docker pull ibmcom/kitura-ubuntu`
- `ibmcom/kitura-ubuntu` image layer là một web app dựa trên kitura app framework phục vụ swift-ubuntu:
![](https://images.viblo.asia/10dd39e9-87ed-4704-9f7f-3a269e56f1aa.png)
- Khi việc pull hoàn tất cùng chạy lệnh `docker run ibmcom/kitura-ubuntu` chúng ta thu được:
![](https://images.viblo.asia/626acf5d-8ae2-457b-920c-548646f6e65b.png)
- Chúng ta mở kết nối 8080 nhưng chưa có gì hiện ra cả, tiếp tới chúng ta sẽ phải chạy `docker run -p 80:8080 --name kitura -d ibmcom/kitura-ubuntu`
![](https://images.viblo.asia/9f87a3aa-0ca0-46ed-b734-364353d1927b.png)
- Giờ cùng mở kết quả `localhost:80` lên và chúng ta sẽ thấy web app chúng ta đã được kết nối:
![](https://images.viblo.asia/e1a4336e-48bb-4c7e-86e6-44021636cdd7.png)
- Chúng ta có thể chạy container thứ 2 là `docker run -p 90:8080 --rm --name kitura2 ibmcom/kitura-ubuntu` và mở `localhost:90` và thấy 1 web app tương tự.
- Để dừng việc chạy web app chúng ta có thể sử dụng `docker stop kitura2` , sau đó kiểm tra bằng lệnh: `docker ps -a`  và thấy image 1 vẫn hoạt động. Để dừng hoàn toàn chúng ta cần tiếp tục gõ lệnh: `docker stop kitura`
![](https://images.viblo.asia/c1957c15-9521-4f27-a9de-67427ee25666.png)
- Việc khởi động lại cũng đơn giản hơn với lệnh `docker start kitura`. Refresh `localhost:80` và ta thấy web app đã hoạt động.
- Việc chạy web app đã đơn giản hoá qua chạy container của docker. Phần tới chúng ta sẽ thử chạy web app với database nhé. See you next time.Hehe