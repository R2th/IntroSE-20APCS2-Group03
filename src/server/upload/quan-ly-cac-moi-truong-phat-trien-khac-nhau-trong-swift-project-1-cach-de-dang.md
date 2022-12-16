Trong quá trình phát triển dự án ios thì mình gần như đảm bảo 96,69% là bạn sẽ phải phát triển ít nhất là trên 2 môi trường khác nhau. Đơn giản nhất là 2 môi trường development và production chứ chưa động đả gì đến version stagging hay các môi trường khác.

Vậy vấn đề xảy ra là gì?

- Quản lý tất cả API keys của bạn.
- Quản lý tất cả URLs remote của bạn.
- Hay đơn giản là icons, setting môi trường test hay môi trường release ...

Ví dụ vui: Hay đơn giản khách hàng tận bên JAV (japan) bảo bạn build 1 bản release để họ test nhưng bạn quên không đổi URL remote thế là ông khách hàng vào app thấy lỗi tùm lum vì URL development đang là mạng local trong dự án ở công ty bạn. Thế là lại phải build lại lần 2.
Khách hàng đánh giá: "Thiếu chuyên nghiệp =))"

- Và cứ mỗi lần như vậy bạn lại phải change tất cả những config đó. Không phải chỉ 1 lần mà rất nhiều lần sẽ phải change như vậy.

Chính vì vậy, Mỗi khi start 1 dự án thì việc phân chia các phiên bản ngay từ đầu build project giúp đơn giản hoá và kiểm soát project từ rất sớm.
Có một số cách để quản lý như:
1. Có thể sử dụng comments.
2. Sử dụng biến hay enum từng môi trường.
3. Sử dụng configurations và schemes với việc gắn cờ global.
4. Sử dụng configuration và schemes với files *.plist.

# Cách 1: Sử dụng comments.
Khi bạn có 2 hay nhiều môi trường riêng biệt, ứng dụng của bạn cần biết môi trường nào sẽ connect đến URL hay API nào.
Các nhanh nhất và dễ dàng nhất là có 3 biến khác nhau và comment 2 biến còn lại vào =)). Tuy nhiên, code của bạn sẽ rất lộn xộn và thật là "dirty".
> Cách này chỉ thích hợp khi bạn phát triển nhanh 1 cái gì đó mà chất lượng code không phải là điều quan trọng thay vào đó là tốc độ và tính linh hoạt còn đâu ngoài ra thì khuyên bạn không nên dùng cách này.
# Cách 2: Sử dụng biến global hoặc enum.
Một cách phổ biến hơn đó là sử dụng biến global hoặc enum (tốt hơn cách 1 một chút) để quản lý config khác nhau. Bạn sẽ khai báo 1 enum tương ứng với 3 môi trường và đặt nó ở đâu đó (ví dụ trong AppDelegate chẳng hạn).
Cách tiếp cận này yêu cầu bạn đặt môi trường chỉ 1 lần trong code của bạn khi muốn thay đổi nó. So sánh với phương pháp trước thì OK hơn chút đấy.

Nó nhanh hơn và dễ đọc hơn nhưng vẫn có nhiều hạn chế. 
Tuy nhiên khi chạy bất kì trong môi trường nào thì app của bạn luôn có cùng một BundleID. 
Điều đó có nghĩa rằng bạn sẽ không thể có cùng 2 ứng dụng với các môi trường khác nhau trên thiết bị của mình. Tức là lúc nào trên thiết bị của bạn cũng chỉ có 1 app liên tục gỡ đi cài lại chứ không thể có 2 app trên 1 thiết bị vì bundleID là giống nhau.

Ngoài ra, ứng dụng của bạn nên có các biểu tượng khác nhau cho môi trường khác nhau. Nhưng với cách này thì không thể làm được điều đó. Và một lần nữa nếu bạn quên thay đổi biến toàn cục ứng dụng thì chắc chắn sẽ gặp sự cố trên môi trường khác.

Chúng ta thử chuyển sang triển khai 2 phương pháp tiếp cận khác để chuyển đổi nhanh giữa các môi trường. Những phương pháp này phù hợp cho các dự án lớn và mới. Vì vậy bạn có thể dễ dàng sử dụng một cách cho dự án của bạn.

# Cách 3: Sử dụng configuration and schemes với global flag.
Trong phương pháp này, chúng ta sẽ phải tạo 2 configuration và 2 schemes khác nhau, connect scheme với configuration của nó. Chúng ta hãy tạo 1 new project tên là Environments để thực hành.
Vào project setting bên phải ở Project Navigator panel. Bên dưới Targets sections, chuột phải click và target có sẵn và chọn Dublicate để copy target hiện tại.

![](https://images.viblo.asia/e2226a90-6cc0-4b9b-8674-de7533bf825a.png)

![](https://images.viblo.asia/8d98e677-7e80-41bf-9840-2639cd590113.gif)

Bây giờ chúng ta đã có 2 target và 2 build scheme là 'Environments' và 'Environments copy'. Giờ chúng ta sẽ đổi tên 'Environments copy' thành 'Environments DEV' chẳng hạn.

Tiếp đến chúng ta sẽ quản lý scheme.
Vào "Manage Schemes ...", chọn newScheme. Đặt tên nó giống target để dễ nhớ và tránh có sự conflict ở đây.

![](https://images.viblo.asia/857c1bc6-5622-41b2-9dc7-cdd2f838c8b6.gif)

Thiết lập cài đặt bên trong manage scheme
![](https://images.viblo.asia/cdf4d1da-ae9f-47c6-acb0-39191c5eb9cf.png)

Tạo new icon asset để cho tester và manager có thể nhận biết được họ cần chạy configuration nào!.

Vào "Assets.xcassets", Chuột phải tạo mới 1 app icon:
![](https://images.viblo.asia/23eb204a-0aa0-40e5-a653-27c56f98281e.png)

Vào lại target trong project để setup app icon
![](https://images.viblo.asia/dca22b1c-01e1-441f-b710-418990802160.png)

Và bây giờ chúng ta đã có icon app khác nhau cho các configuration khác.

## Bây giờ chúng ta có 2 cách tiếp cận khách nhau để xử lý 2 cấu hình khác nhau.
### 1. Thêm flag biên dịch để xử lý target production và development

> Cái này thì lại sinh ra rất nhiều cách để config. Nhưng mình sẽ sử dụng cách mà dự án mình đang làm. Cách khác mình sẽ tìm hiểu thêm để "Mách" cho các bạn.

Để thêm 1 flag cho môi trường phát triển, chúng ta chọn target development. Vào "Build Settings" > Tìm "Swift compiler-custom flags" bằng cách search "Active Compilation Conditions". Đặt các cờ để xác định môi trường
![](https://images.viblo.asia/dca7c6cd-f497-46bf-a910-e5bd2d5b5ee6.gif)

Sau đó trong code bạn có thể check

![](https://images.viblo.asia/1aae5c4a-3bf6-4d0a-b536-c36712c8b46a.png)

Bây giờ nếu bạn chọn "Environments Dev" và run project thì bạn sẽ tự động chạy app của bạn với config development đã set.

### 2.Sử dụng configuration và schemes với một số file *.plist

> Cái này thì mình chưa sử dụng nên cũng chưa thể mô tả cho các bạn được.

Với phương pháp này chúng ta lặp lại các bước ở trên để tạo một scheme configuration và cấu hình phương pháp. Tuy nhiên thay vì add global flag thì chúng ta sẽ sử dụng file *.plist*.
Chúng ta sẽ add biến **serverBaseURL** vào các file .plist tương ứng. Bây giờ, với một file plist chứ URL và chúng ta có thể gọi nó từ trong code. Tôi nghĩ rằng nó là một ý tưởng tốt để tạo 1 ngoại lệ cho Bundle của chúng ta.

Lưu ý:
- Hãy nhớ rằng dữ liệu trong file plist có thể đọc được và nó là không an toàn. Giải pháp là để key nhạy cảm bên trong code và trong file plist chỉ là các keys của nó.
- Khi thêm 1 file mới đừng quên chọn cả 2 targét để giữ code của bạn đồng bộ ở cả 2 configuration. 
> Các bugs này mình đã gặp 2 lần trong 2 lần release app gần nhất với khách hàng. Thực sự rất là " Thiếu chuyên nghiệp"

# Kết luận
- Luôn hữu ích khi bạn tách biệt các môi trường phát triển ra cho dễ đọc và linh hoạt ngay từ đầu project
- Ngay cả với kĩ thuật đơn giản nhất chúng ta có thể tránh được các vấn đề điển hình trong việc xử lý nhiều cấu hình và cải thiện đáng kể code của bạn.