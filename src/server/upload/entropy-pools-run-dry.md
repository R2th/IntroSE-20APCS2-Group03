Đặt cái tên không hay nên chắc bài của mình cũng chả có mấy ma xem.

Bắt đầu nào, tháng 1 vừa rồi, mình có tham dự meet-up của [viet openinfra](https://www.facebook.com/groups/vietstack/). Tại đây mình được chia sẻ về kinh nghiệm của Viettel về việc move service của họ lên cloud. Có một case họ chia sẻ về việc ứng dụng java khởi động trên cloud chậm, nhưng không chiếm tài nguyên CPU hay full ram. Nói luôn nguyên nhân là do secure random của linux. Sau đó mình cũng đọc thêm về vấn đề này.
# Brief Introduction to Entropy and Randomness
Linux pseudo random number generator (PRNG), thành phần của linux phụ trách việc random dựa vào interrupt đến từ chuột, bàn phím, network... Thành phần này đóng vai trò quan trọng trong các hệ thống mã hóa như SSL/TLS cũng như nhiều ứng dụng khác.
# When Entropy Pools Run Dry
Trên linux có 2 thành phần sinh random phổ biến nhất là `/dev/random` và `/dev/urandom`, `/dev/random` tốt hơn nhưng mà nó là blocking. Tức là bạn sẽ phải đơi đến khi entropy đủ tốt để tạo random. Nhưng đối với nhiều hệ thống chạy trên cloud thì làm gì có nhiều interrupt thế để mà tạo random. Dẫn đến việc một số ứng dụng phải đợi đến khi có thể random thì mới chạy tiếp. Khi ứng dụng run lên rồi thi điều này không cản trở nhiều, nhưng khi ứng dụng đang khởi động thì có thể phải đợi khá lâu.
# The Userland Solution for Populating Entropy Pools
Giờ đến solution, thực sự đến đây vấn đề đã khá rõ ràng, nên mình chỉ muốn viết: "chắc bạn biết sử dụng google" nhưng mà viết thế chắc chắn GL sẽ reject bài của mình nên mình sẽ giới thiệu một chút.

Khi entropy không đủ thì tất nhiên giải pháp là bổ xung. Không có đủ từ interrupt thì sẽ lấy từ nguồn khác như video card hay sound card. Tất nhiên là bạn không phải code cái này rồi, bạn có thể sử dụng gói haveged trên linux, cách cài đặt thì google cho nhanh chứ copy xong dịch lại vài câu lệnh trên mạng có vẻ không ý nghĩa lắm. Haveged sử dụng random từ các variable đang được cpu xử lý. Điều này gây một số lo ngại về việc nó có thực sự là random hay không. Xem phần FIPS test sau đây để biết kết quả nhé.
# Testing Availability of Entropy & Quality of Random Data
Ừ thì chắc bạn cũng chả nghi ngờ gì về tính hiệu quả và an toàn của mấy gói trên linux nhỉ. Nhưng mà cứ thử test xem sao. Bài test này mình sẽ dùng method FIPS-140 được sử dụng bởi rngtest cung cấp trong package rng-tools:
```
# cat /dev/random | rngtest -c 1000
```
Và bạn sẽ thấy output gần gần như sau:
```
rngtest 2-unofficial-mt.14
Copyright (c) 2004 by Henrique de Moraes Holschuh
This is free software; see the source for copying conditions.  There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

rngtest: starting FIPS tests...
rngtest: bits received from input: 20000032
rngtest: FIPS 140-2 successes: 999
rngtest: FIPS 140-2 failures: 1
rngtest: FIPS 140-2(2001-10-10) Monobit: 0
rngtest: FIPS 140-2(2001-10-10) Poker: 0
rngtest: FIPS 140-2(2001-10-10) Runs: 1
rngtest: FIPS 140-2(2001-10-10) Long run: 0
rngtest: FIPS 140-2(2001-10-10) Continuous run: 0
rngtest: input channel speed: (min=1.139; avg=22.274; max=19073.486)Mibits/s
rngtest: FIPS tests speed: (min=19.827; avg=110.859; max=115.597)Mibits/s
rngtest: Program run time: 1028784 microseconds
```
998-1000 successes có vẻ ổn nhỉ, còn về test lượng available entropy thì bạn có thể dùng command sau:
```
# cat /proc/sys/kernel/random/entropy_avail
```
Cơ bản thì bạn cần con số này lớn hơn 1000.