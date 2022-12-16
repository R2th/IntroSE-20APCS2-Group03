Ở bài viết này mình sẽ giới thiệu với các bạn thứ đầu tiên cần có để làm việc với AWS: tài khoản.
<br>

Và thứ quan trọng cần có để lập một tài khoản AWS là một credit card. Nếu bạn chưa có thì mình nghĩ bạn nên làm một cái credit card trước rồi hẵng quay lại series này. Thêm nữa là dù yêu cầu phải dùng credit card nhưng bạn có thể sử dụng AWS hoàn toàn miễn phí với Free Tier. AWS sẽ chỉ thu 1 USD từ credit card của bạn để verify xong đó sẽ chuyển lại cho bạn sau khi verify xong.
<br>

*Source: https://www.udemy.com/course/linux-academy-aws-essentials-2019/learn/lecture/13741388#overview*

-----

# AWS Free Tier
[AWS Free Tier](https://aws.amazon.com/free/?nc2=h_ql_pr_ft&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) cho bạn khả năng trải nghiệm các sản phẩm và service của AWS miễn phí. Hãy thử nhìn qua các thông tin chi tiết về Free Tier:

![](https://images.viblo.asia/ae6abf8f-73e9-4692-a2da-9613204502a1.png)

Bạn có thể thấy, có những service sẽ miễn phí trong 12 tháng, có những service thì luôn miễn phí và có những service miễn phí dưới dạng bản dùng thử.
<br>

Kéo xuống một chút bạn có thể thấy một trong những service miễn phí trong 12 tháng là EC2:
![](https://images.viblo.asia/710fd5e4-fc6a-4bec-835d-43cf76cd9f44.png)

Bạn có thể sử dụng EC2 miễn phí 750 giờ/tháng trong vòng 12 tháng. EC2 có các loại processor khác nhau mà bạn có thể lựa chọn khi tạo một instance, tuy nhiên với Free Tier sẽ có những loại processor bạn có thể sử dụng miễn phí và có những loại thì không. Vậy nên khi bạn set up một instance EC2 bạn cần chú ý xem loại instance đó có bị thu phí hay không.
<br>

Không phải mọi loại service bạn có thể sử dụng miễn phí đều tính theo giờ. Ví dụ bạn hãy filter theo Storage trong Product Categories:
![](https://images.viblo.asia/9b92d644-3343-46c1-90bf-25c7217fbc27.png)

Có thể thấy, ở Free Tier AWS sẽ cho bạn sử dụng miễn phí 5 GB storage của S3 trong 12 tháng.
<br>

Có lẽ giờ các bạn sẽ thắc mắc làm thể nào để đảm bảo được rằng bạn sẽ không sử dụng quá mức free hoặc một giới hạn kinh phí nào đó mà bạn đặt ra. Mình sẽ dùng tài khoản AWS cá nhân của mình để cho các bạn thấy cách kiểm soát việc sử dụng Free Tier như thế nào cũng như cách sử dụng billing alarm để giúp bạn kiểm soát chi phí nhằm đảm bảo bạn không bị vượt quá budget đã đặt ra.
<br>

Đây là trang Billing Dashboard:
![](https://images.viblo.asia/1b43353d-50b5-45e8-8ea5-b5d1812fda60.png)

Qua trang này ta có thể thu được những thông tin sau:
- Tổng số tiền đã sử dụng trong tháng trước, tháng này và số tiền sử dụng dự đoán cho tháng tiếp theo:

![](https://images.viblo.asia/ec58538b-2dd5-4780-b982-7051b481a588.png)

- Free Tier widget - hiển thị những service AWS thuộc Free Tier mà bạn sử dụng nhiều nhất trong tháng. Nó cũng sẽ cho bạn thấy một cách ngắn gọn bạn đã sử dụng bao nhiêu các service này:

![](https://images.viblo.asia/b6de123f-faab-4cb2-a854-a0a5cddf9e13.png)

Nếu bạn click vào nút "View all" ở Free Tier widget, bạn sẽ thấy được danh sách tất cả các service AWS Free Tier mà bạn đã sử dụng trong tháng (list của mình hơi ngắn vì mình chưa sử dụng nhiều service lắm):
![](https://images.viblo.asia/7bc3924d-3768-4530-97d8-6e40edeb600a.png)

Một điểm hay của Free Tier Widget là nó có thể chủ động gửi thông báo cho bạn nến như project của bạn vượt quá lượng sử dụng miễn phí trong tháng.
<br>

Tuy nhiên cần chú ý rằng, nếu bạn sử dụng nhiều service với khối lượng lớn trong một thời gian cực ngắn thì bạn có thể vượt quá mức miễn phí trước khi AWS có thể gửi thông báo tới bạn. Nhưng nhìn chung thì AWS sẽ thông báo cho bạn khi project của bạn vượt quá mức miễn phí trong tháng. Thông báo sẽ là một email được gửi tới địa chỉ email mà bạn đăng kí cho tài khoản của mình.
<br>

Tiếp theo hay xem mục Preferences:
![](https://images.viblo.asia/8cf51c56-59d3-4fd9-a16d-502c426564f0.png)

Bạn sẽ thấy mục **Receive Free Tier Usage Alerts** đã được tích, như đã nói ở trên thì thông báo này sẽ được gửi tới email mà bạn đăng kí cho tài khoản AWS. Tuy nhiên nếu bạn muốn thông báo tới một email khác thì bạn có thể điền email đó vào ô Email Address ở ngay dưới.

# Tạo tài khoản AWS
Bạn có thể tạo tài khoản AWS tại link sau: https://portal.aws.amazon.com/billing/signup#/start
<br>

Vì mình đã tạo tài khoản ở tất cả các email của mình rồi và việc tạo tài khoản khá đơn giản nên mình sẽ không viết gì nhiều. Chỉ có một vài lưu ý:
- như mình đã note ở đầu bài viết thì bạn cần có một credit card để tạo tài khoản (và tất nhiên là thẻ phải có hiệu lực rồi). AWS sẽ charge 1$ từ thẻ để verify hiệu lực của thẻ và sau đó sẻ back lại cho bạn sau khi verify xong. Quá trình verify theo mình nhớ thì lần đầu mình tạo tài khoản phải mất cả tuần mới nhận được email báo thành công. Lần cuối cùng mình tạo tài khoản (vẫn bằng cái thẻ đó) thì có thể tạo ngay lập tức.
- nhớ chọn Basic Plan ở màn chọn Plan để được Free Tier.

# AWS Console
AWS console là khu vực trung tâm trong việc quản lý các resuouce như EC2, S3... Việc sử dụng thành thạo console quản lý, các tính năng của nó, cách truy cập nó là một việc khá quan trọng đối với nhưng người đảm nhiệm vai trò quản lý AWS. Trước tiên, hãy nhìn một cách tổng quan xem trong console có những gì.
![](https://images.viblo.asia/0c982d5c-6e60-4657-9f7c-e7d6ef24ad77.png)

Chúng ta có thế thấy một ô search ở trên cùng, bạn có thể search link tới dashboard của một service nào đó hoặc các document có liên quan v.v... Cách khác để truy cập màn hình quản lý các service là danh sách service được xếp theo type ở phía dưới.
<br>

Ngoài ra ở ngay phía trên danh sách các service là một danh sách các "bookmark", danh sách này sẽ thay đổi tùy theo việc bạn hay truy cập các service nào gần đây nhất.
<br>

Khi bạn đã truy cập vào một màn hình quản lý của một service nào đó, bạn có thể nhanh chóng chuyển sang màn hình service khác thông qua nút xổ "Services" ở góc trên bên trái.
<br>

# Tạo Billing Alarm
Đầu tiên, chúng ta vào Billing Dashboard (màn hình này chúng ta đã xem ở phần Free Tier). Rồi vào mục Billing Preferences tích vào **Receive Billing Alerts** rồi ấn save.

![](https://images.viblo.asia/8cf51c56-59d3-4fd9-a16d-502c426564f0.png)

Tiếp đến chúng ta cần sử dụng service **CloudWatch**. Mình xin giới thiệu qua về CloudWatch, đây là monitoring service của AWS, nó được dùng để theo dõi hoạt động của các service AWS khác nhau của bạn, chúng ta sẽ đi sâu vào service này trong bài viết sau. Ngay lúc này chúng ta chỉ cần quan tâm đến việc dùng nó để set up một billing alarm.
<br>

Hãy áp dụng một trong những cách truy cập màn hình service ở phần trước để vào màn hình của CloudWatch:
![](https://images.viblo.asia/8ab654ee-c254-4469-9f2f-c104ab159cf9.png)

Ở phía tay trái, trên sidebar có mục Billing, hãy ấn vào đó để tạo Alarm:
![](https://images.viblo.asia/768678e3-7f54-49af-b626-042eaf674752.png)

Ấn vào nút create, ở mục condtions chúng ta sẽ thiết lập hạn mức sẽ tạo ra báo động, ở đây mình sẽ set là lớn hơn hoặc bằng 1 USD:
![](https://images.viblo.asia/230ea78d-3e36-4180-aae9-7bc114109ec2.png)

Ấn next, chúng ta sẽ sang tiếp màn hình chọn actions cho alarm (nghĩa là bạn muốn AWS làm gì khi có alarm):
![](https://images.viblo.asia/81340453-b4b2-43c2-a440-b8d0292d2123.png)

Đầu tiên bạn hãy chọn state nào của alarm mà bạn muốn trigger actions, có 3 state:
- In alarm: trạng thái khi vượt quá mức alarm (mình chọn state này)
- OK: trạng thái khi chạm mức alarm
- Insufficient data: trạng thái chưa có đủ dữ liệu để alarm

Tiếp theo, chúng ta sẽ chọn danh sách các email sẽ nhận notification khi có alarm (gọi là SNS topic), hãy chọn create new topic và điền tên topic cũng như các email sẽ nhận notification.
<br>

Ấn next tiếp để nhập tên, description cho alarm, next tiếp sang màn preview rồi ấn create. Bạn sẽ cần phải mở email để confirm việc email được add vào topic. Vậy là bạn đã hoàn thành việc tạo alarm:
![](https://images.viblo.asia/d72feec0-18e0-4b19-bee3-c577f2c6e873.png)


-----

Bài giới thiệu về tài khoản AWS của mình tới đây là hết, mọi người hãy đón đọc tiếp về series AWS của mình trong bài viết tiếp theo nhé :pray:.