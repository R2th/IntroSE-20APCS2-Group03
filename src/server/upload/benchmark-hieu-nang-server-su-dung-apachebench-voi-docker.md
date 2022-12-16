# Mở đầu
Đối với các lập trình viên hệ thống, đặc biệt là đối với các anh chàng backend, devops, thì việc test hiệu năng chịu tải của server (**benchmark**) là một điều không thể thiếu. Con server hôm nay đang chạy ngon lành thì mai bỗng lăn đùng ra chết. Vào check thì số lượng CCU(Concurrent Users) tăng đột biến khiến con server không chịu tải được :smiley: .Vì vậy việc test hiệu năng của hệ thống trước khi đưa vào production là việc vô cùng cần thiết.
# Tại sao mình lại sử dụng benchmark trên docker
Trước khi đi thực tập, mình không hề biết đến khái niệm test hiệu năng chịu tải của hệ thống. Khi được anh mentor giao cho task viết một api và benchmark api đó. Mình có tìm hiểu qua và tìm được một số tool benchmark:
* ApacheBench
* Siege
* Gobench
* Apache JMeter
* wrk
* ...

Ngoài ra còn rất nhiều các tool benchmark khác. Tuy nhiên mình rất thích thằng ApacheBench do nó rất dễ cài đặt và sử dụng, do đó trong bài viết này mình sẽ giới thiệu đến mọi người cách sử dụng ApacheBench để benchmark hệ thống.

Tuy nhiên benchmark được một thời gian thì vào check ổ cứng tự nhiên đầy. Mình có tìm hiểu và biết được là do ApacheBench lưu log sau mỗi lần test dẫn đến đầy bộ nhớ. Mình ngại search làm sao để xóa hết đống log đó nên đã tìm hiểu để chạy thằng ApacheBench trên docker(do có thể xóa dễ dàng các file logs khi chạy docker container). 
# Sử dụng ApacheBench trên docker
Kỳ diệu là vừa search cái thì mình tìm được ngay image của thằng ApacheBench :smile: .Các bạn có thể tham khảo document của nó tại [đây!](https://hub.docker.com/r/jordi/ab). Các bạn có thể tìm hiểu qua về cách sử dụng docker để hiểu rõ hơn
## Pull image
```
docker pull jordi/ab
```
## Benchmark API
```
docker run --rm jordi/ab http://example.com/
```
Ở trong lệnh docker trên mình có sử dụng option `--rm`. Tức sau mỗi lần benchmark API của hệ thống, `container` được tạo ra bởi image `jordi/ab` sẽ được xóa luôn. Do đó chúng ta sẽ không cần bận tâm đến đống logs làm đầy ổ cứng kia nữa :smile: .
## Benchmark với post request.
Đối với post request thì có lẽ hơi phức tạp hơn chút, chúng ta cần có body của request. Vì ab(**ApacheBench**) yêu cầu body của POST request cần chứa trong file, nên chúng ta cần copy file chứa nội dung body vào trong docker container. Có một số cách để làm việc đó, tuy nhiên dễ nhất thì chúng ta có thể `mount` thư mục chứa file có nội dung body của request với thư mục làm việc của container
```
docker run --rm --read-only -v `pwd`:`pwd` -w `pwd` jordi/ab -T application/json -p post.json -v 2 https://<server>/<api-route>
```
Chúng ta cần đảm bảo terminal đang làm việc trong thư mục chứa file **post.json**(là file chứa body của post request).
# Một số lưu ý
Nếu bạn đang thực hiện test hiệu năng hệ thống trên máy local, thì không thể sử dụng **enpoint**(url trỏ tới API cần benchmark) là `localhost`, do khi đó localhost sẽ trỏ tới bản thân của container chạy ApacheBench. Để test các API đang chạy local, bạn phải sử dụng `hostname` là địa chỉ ip của máy tính bạn đang sử dụng để chạy server hoặc có thể sử dụng địa chỉ IP của docker bridge network.
Ví dụ máy của mình có địa chỉ IP là `192.168.2.188` và đang chạy server ở cổng `3000` thì command để test api sẽ là
```
docker run --rm jordi/ab -k -c 100 -n 100000 http://192.168.2.188:3000/ 
```
Hoặc nếu bạn đang chạy server trên docker thì có thể thay bằng địa chỉ IP của container đang chạy.

**!** Apache Benchmark Docker image tại thời điểm bài viết là v2.0.0, không cần sử dụng command `ab` sau image name
# Kết luận
Có rất nhiều các tool benchmark khác nhau. Trong bài viết này mình chỉ giới thiệu một benchmark tool mà mình cho là dễ cài đặt và sử dụng nhất. Các bạn có thể tìm hiểu thêm tại các document trên trang chủ để biết thêm về các cài đặt và chạy ApacheBench trên docker và các command của ApacheBench
# Reference
* ApacheBench: https://httpd.apache.org/docs/2.4/programs/ab.html
* ApacheBench in docker: https://hub.docker.com/r/jordi/ab