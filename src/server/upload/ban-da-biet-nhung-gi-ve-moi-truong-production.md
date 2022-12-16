# Mở đầu
Chào các bạn, như chúng ta được biết việc phát triển phần mềm ở nhiều công ty khác nhau thường hay chia ra các loại môi trường phát triển riêng như : môi trường develop, staging, production. Bài viết này mình sẽ đề cập qua khái niệm của 3 môi trường phổ biến nhất như vậy ( đương nhiên không phải công ty nào cũng áp dụng như vậy thậm chí nó sẽ phải phụ thuộc vào dự án ) và mình cũng sẽ nói về việc <b>những tips để triển khai trên production hiệu quả</b>

![](https://images.viblo.asia/251ef7eb-b31b-43f7-b7f5-9bcf95bb739e.png)


## Develop Environment

- Đây là môi trường đầu tiên và nó sẽ nằm trên máy tính của bạn ( hay còn gọi là môi trường cục bộ ).
- Đây sẽ là nơi bạn code các feature hay fix những bugs đang tồn tại.
- Các cấu hình thường sẽ khác so với Staging và Production.
- Môi trường này sẽ kết nối tới một cơ sở dữ liệu cục bộ hoặc cơ sở dữ liệu giả để bạn có thể code mà không làm rối dữ liệu thật.
- Môi trường này có thể cài những package giúp việc debug diễn ra dễ dàng hơn.

## Stage Environment

- Môi trường Stage sẽ giống với môi trường Production.
- Môi trường này sẽ không cài ở trên máy cục bộ nữa mà sẽ được đẩy lên một máy chủ.
- Môi trường này sẽ là nơi lý tưởng để các Tester, QA của dự án thực hiện test hệ thống trước khi đưa lên production.
- Nếu dự án là từ khách hàng, chúng ta có thể lấy môi trường này demo cho khách hàng, họ sẽ biết các chức năng hoạt động ra sao như thế nào trước khi tới tay người dùng.

## Production Environment

- Môi trường này là nơi quan trọng nhất, là nơi mà người dùng cuối họ truy cập sau tất cả các công đoạn cập nhật và thử nghiệm.
- Đây là nơi công ty kiếm tiền vì thế đó là lý do tại sao developer không thể có bất kỳ sai lầm nghiệm trọng nào ở đây.
- Bất kỳ lỗi hoặc lỗi nào còn sót lại sẽ được người dùng tìm thấy và team dự án chỉ có thể hy vọng đó là một lỗi gì đó nhỏ.

# Tối ưu hóa Production

## Công cụ quản lý gói

![](https://images.viblo.asia/ea3180bd-9751-4e82-9e45-7629268f8f71.jpg)

- Trong mỗi dự án chúng ta thường hay sử dụng các công cụ hỗ trợ quản lý các gói, thư viện hiệu quả có thể kể tới như: composer, npm, yarn, v.....v
- Và trong phần này mình sẽ cùng đề cập đến <b>cách</b> sử dụng nó hiệu quả trên <b>môi trường production</b>
```
ps: Trong ví dụ này mình sẽ sử dụng composer
```

Với những PHP Dev dùng PHP thuần hay framework nào đó Laravel hay Codeigniter chắc hẳn không xa lạ gì với câu lệnh thần thánh
```
composer install
```
OK? nó làm gì nhỉ ? à nó tiến hành cài đặt các thư viện được khai báo ở file `composer.json` hoặc ở trong `composer.lock` về thư mục dự án.
Và lúc deploy lên production thì hiển nhiên nó cũng sẽ chạy câu lệnh đấy. Mình đọc trong nhiều <b>series về deploy</b> cũng có nhắc tới chạy câu lệnh `composer install` để cài đặt các vendors.

<b> Tuy nhiên</b> đối với mình, nếu chỉ đơn giản chạy câu lệnh trên ở môi trường production thì chúng ta cần xem xét lại.
Quay trở lại một chút về <b>Develop Environment</b> ở trên nhé, mình có đề cập tại môi trường đó sẽ cài <b>những Packages hỗ trợ việc debug</b>.

Ví dụ như <b>Laravel Debugbar</b> là thứ vô cùng điển hình
Trên docs của [Laravel-Debugbar](https://github.com/barryvdh/laravel-debugbar) hướng dẫn cài đặt như sau
```
composer require barryvdh/laravel-debugbar --dev
```

Các bạn có thấy gì lạ không ? 
Đúng rồi đấy nó có 1 option là <b>--dev</b> ( đây là 1 flag thể hiện package đó sẽ được cài ở môi trường develop cụ thể trong composer.json nó sẽ nằm trong <b>require-dev</b> )
Có nhiều người cài các thư viện ở composer hay npm sẽ có khả năng bỏ qua những option như thế này.

### --no-dev

Và như mình đề cập ở trên nhiều người sẽ chạy `composer install` điều đó đồng nghĩa với việc sẽ <b>cài</b> cả những packages mà được <b>khuyến nghị</b> là chỉ cài trên môi trường develop
Nhược điểm mình nhận thấy là:
- Các package khuyến nghị cài ở môi trường dev nó khả năng sẽ có nhiều lỗ hổng, và nếu triển khai trên production chúng ta sẽ không thể handle được rủi ro được sinh ra của những package như vậy
- Tốn dung lượng máy chủ, dung lượng máy chủ là 1 thứ rất là quan trọng, ở môi trường Develop chúng ta sử dụng dung lượng trên máy tính cục bộ, nó có thể là 200gb 500gb 1Tb không thành vấn đề. Nhưng môi trường production 10gb 20gb cũng là 1 cái giá tiền nào đó không ít đối với khách hàng của chúng ta. Mình sẽ đề cập hơn về phần này ở dưới qua các case mà mình đã trải nghiệm.

Và cũng cần phải lưu ý khi sử dụng cờ này, có một case thực tế mà gần đây mình có gặp trong dự án của mình.
Đó là dự án mình có cài 1 package <b>Laravel Debugbar</b>, và nó được register provider ở trong `config/app`.
Lúc chạy ở môi trường develop thì không vấn đề gì về cơ bản nó được cài đặt trên đó.
Tuy nhiên dự án mình có sử dụng công cụ deploy là `Deployer` về cơ bản mấy công cụ như này nó <b>auto</b> chạy composer với cờ <b>no-dev</b>. Do vậy lúc deploy lên thì vô tình nó sẽ bỏ qua <b>Laravel Debugbar</b> đồng nghĩa với việc đoạn code register provider ở trong config/app sẽ chết => app die.

###  --no-ansi
- Cờ này sẽ vô hiệu hóa đầu ra ANSI có nghĩa là nó sẽ loại bỏ đi các màu sắc xanh lá cây đỏ hay vàng khi chúng ta chạy composer install
- Để màu cho chúng ta dễ nhìn rất tốt nhưng nó tốt ở trường hợp là chúng ta chạy thủ công, ngày nay khi triển khai lên production dùng các công cụ deploy / CD tự động thì chắc hẳn chúng ta sẽ không muốn hiện diện các ký tự ANSI trong tệp logs của mình đâu.

## OS : Ubuntu hay CentOS

![](https://images.viblo.asia/7af76c29-cddc-4ffe-892c-ec3fa52846c3.png)


Có khá nhiều lựa chọn trong việc chọn hệ điều hành nào để làm server cho dự án của mình, bản thân mình là 1 PHP Developer thì mình hay gặp nhất đó là <b>CentOS server</b> và <b>Ubuntu Server</b>. Bất kể bạn là dân chuyên hay người mới tập tành deploy thì mình khuyên cứ chọn 1 trong 2 phiên bản này là chắc ăn nhất.
Có 3 điểm khác biệt lớn nhất giữa 2 thằng này

- Ubuntu dựa trên Debian và CentOS dựa trên Red Hat Enterprise Linux
- Ubuntu cài đặt packages bằng <b>apt-get</b> package manager, ở centOS chúng ta phải sử dụng <b>yum</b> để download và cài đặt RPM Packages.
- CentOS là một phiên bản <b>ổn định</b> so với ubuntu vì mật độ cập nhật phần mềm ít hơn.

Điểm mình muốn đề cập tới đó là điểm thứ 3, CentOS nó ổn định ở chỗ phiên bản của nó ít cập nhật, thường chỉ cập nhật các bản quan trọng. Và điều đó nó cũng là điểm yếu của CentOS vì nếu đôi khi mình muốn update OS có thể sẽ phải update bằng tay, nhưng cá nhân mình nghĩ <b>Production environment</b> luôn cần tính ổn định.

Mình có gặp một trường hợp đó là vào một ngày đẹp trời, mình deploy code lên server thì nhận được 1 thông báo là bị quá tải dung lượng ( lúc đó là mình đang chạy <b>composer install</b>.
Server đó sử dụng hệ điều hành là Ubuntu ( Sau này các bạn sẽ nhận ra 1 điều là code được dăm ba dòng code, mà chả hiểu sao dung lượng cứ thế mất đi =))) )
Mình đã phải mất một ngày trời để tìm ra nguyên nhân và khắc phục . Và kết quả mình nhận được là server đó đã có quá nhiều <b>bản cập nhật </b> của Ubuntu.

Và mình phải lọ mọ chui vào trong 1 cái folder nôm na là nó sẽ chứa các file kiểu <b>kernel-\*-*</b>, sau mỗi lần nó update.

Và điều chúng ta cần làm là : Clean , xóa đi các file đó đương nhiên trước khi xóa chúng ta phải check là OS của chúng ta đang sử dụng file nào phiên bản nào, 
Và sau khi xóa xong, vấn đề về dung lượng đã được giải quyết.

# Kết luận 
Ở bài viết này chủ yếu mình muốn chia sẻ với các bạn các trường hợp mình đã gặp phải, cũng như nêu ra quan điểm của mình về môi trường Production. từ việc quản lý gói cho tới hệ điều hành sử dụng, dung lượng trên production v.....v
Còn quan điểm của các bạn thì sao hay có các case thực tiễn nào khác bạn đang gặp phải vui lòng để lại ý kiến để chúng ta hoàn thiện bài viết hơn nữa nhé :D