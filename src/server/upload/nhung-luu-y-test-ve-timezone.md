Một vài link tham khảo:
https://simple.wikipedia.org/wiki/Time_zone
https://everytimezone.com/
# What is timezone?

![](https://images.viblo.asia/4b57a13e-758b-47b2-8aa5-3ae643839d96.jpg)


Chúng ta thường nghe nhiều đến Timezone đặc biệt khái niệm này được đề cập rất nhiều trong phần mềm. Vậy Timezone là gì chúng ta cùng tìm hiểu nhé. 
Và hôm nay mình cũng đưa ra một vài quan điểm để test đối với bài toán có yêu cầu về thời gian.

Các múi giờ cung cấp cho các khu vực cụ thể trên Trái đất một thời gian trong ngày sớm hơn hoặc muộn hơn các múi giờ lân cận. Điều này là bởi vì khi đó là ban ngày ở một phía của trái đất, thì đó là ban đêm ở phía bên kia. Có 24 múi giờ chia trái đất thành các thời điểm khác nhau, mỗi múi giờ có tên riêng, giống như múi giờ miền đông Bắc Mỹ. Múi giờ miền đông Bắc Mỹ chứa các thành phố lớn ở Bắc Mỹ như thành phố New York và Miami.

Giờ chuẩn Greenwich (GMT) bắt đầu vào năm 1675. 
Greenwich được xây dựng để giúp tàu tìm thấy kinh độ trên biển. GMT là một tài liệu tham khảo tiêu chuẩn để giữ thời gian khi mỗi thành phố giữ một giờ địa phương khác nhau. Khi đường sắt bắt đầu chở nhiều người nhanh chóng giữa các thành phố giữ thời gian khác nhau, họ đã thông qua các múi giờ để đơn giản hóa các hoạt động. Đến khoảng năm 1900, gần như toàn bộ thời gian trên trái đất ở dạng múi giờ tiêu chuẩn.

Giờ chuẩn Greenwich được gọi là UTC (Giờ phối hợp quốc tế). UTC là tiêu chuẩn thời gian của thế giới. Tất cả các phần khác của thế giới được bù (cộng hoặc trừ) theo kinh độ của chúng. Hầu hết các khu vực được bù đắp bằng một giờ đầy đủ, nhưng có một số bù vào nửa giờ hoặc 45 phút.

Ở một số nơi trên thế giới, họ tuân theo Giờ tiết kiệm ánh sáng ban ngày (DST) và trong khoảng thời gian này vào mùa hè, họ thêm một giờ vào giờ mặt trời bình thường.

Ở các cực, thời gian là UTC ở Bắc Cực và UTC + 12 ở Nam Cực.

Các múi giờ được đánh số liên quan đến UTC, vì vậy ở Los Angeles, múi giờ sẽ là UTC − 8, ở London UTC + 0, ở Rome UTC + 1 và ở New Delhi UTC + 5: 30.

Một số bài toán mà chúng ta hay gặp phải khi làm về phần mềm: Chùng ta hãy chú ý đến giờ 

Sau đây là một số bài toán đặt ra và những case mà chúng ta cần test để không lack yêu cầu. Hệ thống yêu cầu của chúng ta là lưu giờ Nhật.

# Bài toán 1: 
Yêu cầu đặt ra là: Lưu file download dưới dạng: yyyymmddhhmm

**Các trường hợp mà chúng ta cần test:**

1. Cẩn thận khi yêu cầu là thời gian download theo server Nhật

Download file theo giờ Việt nam, check xem file đã lưu đúng theo giờ Nhật chưa (Nhật hơn Việt Nam 2 giờ, như vậy nếu chúng ta download lúc: 21:20 ngày 16/05/2020 giờ Việt Nam thì file download đúng của chúng ta là: 20200516 23:20)

2. Cẩn thận khi yêu cầu là thời gian download theo server UTC

Download file theo giờ Việt nam, check xem file đã lưu đúng theo giờ Nhật chưa (Check khi download lớn hơn 8 giờ so với giờ Nhật, như vậy nếu chúng ta download lúc: 21:20 ngày 16/05/2020 giờ UTC thì file download đúng của chúng ta là: 20200517 05:20)

# Bài toán 2:
Yêu cầu đặt ra là: Lưu mã của user sau khi đăng ký xong dưới dạng: yymmddhhmm[A~Z]

1. Cẩn thận khi hệ thống server Nhật

User đăng ký vào hệ thống theo giờ Việt nam, check xem mã của User đã lưu đúng theo giờ Nhật chưa (Nhật hơn Việt Nam 2 giờ, như vậy nếu chúng ta tạo lúc: 21:20 ngày 16/05/2020 giờ Việt Nam thì file download đúng của chúng ta là: 202005162320A)

2. Cẩn thận khi hệ thống theo server giờ UTC

User đăng ký vào hệ thống theo giờ Việt nam, check xem mã của user đã lưu đúng theo giờ Nhật chưa (Giờ UTC lớn hơn 8 giờ so với giờ Nhật, như vậy nếu chúng ta tạo lúc: 21:20 ngày 16/05/2020 giờ UTC thì mã của user đúng của chúng ta là: 202005170520B)

# File testcase mẫu cho bài toán 2 sẽ như sau:

![](https://images.viblo.asia/01b0d9ad-b63e-45ba-b2c7-c2375be58a64.png)


# Một số quan điểm khi test cần nhớ đến với mỗi bài toán có yêu cầu về thời gian:

1. Giờ tiêu chuẩn dùng trong phần mềm đã đúng như yêu cầu chưa: UTC, GMT, JP...
2. Check với các cận biên: 0h, nhanh hơn 2 giờ so với giờ GMT Việt nam, nhanh hơn 8h so  với giờ Nhật, giờ Việt Nam...
3. Check với các ngày là: 30, 31, 1...
4. Check với các tháng: 12, 1, 2...
5. Format đã đúng hay chưa?
6. Chú ý về case chuyển đổi Timezone từ JP -> Việt nam -> Singapore...
7. Check với ngày không tồn tại trong thực tế xem có hiển thị cho EndUser vào ngày không tồn tại không?: Ex: 30/2/2020...
8. Check với năm nhuận tháng 2 có 29 ngày: Ex: 29/02/2020...
9. Check vắt qua các năm chú ý đến ngày cuối cùng của năm (31/12/2020), ngày đầu tiên của năm (01/01/2020)

# Kết luận:

Bài report này tác giả với hi vọng sẽ đem đến cho các bạn một ghi nhớ để có thể xem lại khi trong dự án mình gặp phải. Nó chưa đầy đủ nhưng cũng giúp các bạn hình dung các trường hợp lỗi hay gặp ở đâu để tránh trong dự án của mình.