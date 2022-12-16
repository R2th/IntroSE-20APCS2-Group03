Tìm được bài viết khá thú vị của bạn dev người Nhật, nên mình đã dịch để các bạn cùng đọc :D

### Mở đầu.

Đây là bài viết đầu tiên trên Qiita của tớ.
Hiện tại, tớ đang phát triển app iOS tại một công ty. Song song với đó, tớ còn tự mình viết những app nho nhỏ, quy mô cá nhân nữa.
Mục đích chính của tớ khi phát triển app cá nhân là: Để học tập và kiếm thêm thu nhập.
Đến nay, mấy cái app tớ tự viết đều đã được release hoàn thiện rồi. Tuy nhiên dạo gần đây, tớ mới cảm thấy những lợi ích của việc viết bài chia sẻ những điều mà bản thân mình tự làm, tự gặt hái được. Vì vậy tớ bắt đầu có hứng để viết bài ạ.
Tớ cũng làm rồi release được mấy cái App Android, iOS rồi đấy. Chủ trương của tớ là: Làm app nào mà dễ viết code, rồi public để cho người dùng chạy thử, hoặc thêm quảng cáo để thu lời.


### App mà mình muốn giới thiệu 

Lần này mình muốn giới thiệu tới các bạn app "Ehomaki Compass".
Đây là app iOS đã được release vào ngày 18/1/2018.

Link app: như dưới đây↓
[Ehomaki Compass 2018](https://itunes.apple.com/jp/app/%E6%81%B5%E6%96%B9%E5%B7%BB%E3%82%B3%E3%83%B3%E3%83%91%E3%82%B9-2018/id1335336786?mt=8)

### Tại sao tớ lại làm app này.

Nguyên nhân là vì, vào ngày Ehomaki năm ngoái, tớ đã xem ranking (bảng xếp hạng) của App store.
Có thể các bạn đã biết rồi, chỉ riêng trong ngày Ehomaki, các app Compass (la bàn) được download về với số lượng cực lớn.
Vì ai ai cũng muốn biết: Xoay người hướng nào để ăn Futomaki - được bán tràn ngập các cửa hàng tiện lợi, siêu thị sao cho đúng.
(P/s: Vào tiết xuân phân, người Nhật có tập tục ăn Ehomaki lấy may. Ehomaki (cơm cuộn size to) được bán khắp mọi nơi, cửa hàng, siêu thị...
Khi ăn, họ phải xoay người theo đúng hướng "Phúc" - sẽ thay đổi theo từng năm - được ghi trong lịch Nhật Bản. Vì vậy, việc có la bàn để xoay hướng ăn là rất cần thiết :v)
![](https://images.viblo.asia/88c5480a-345c-4245-b869-2c7e8a547cea.jpg)

Ngoài ra, tớ cũng nhận thấy rằng: Những app liên quan tới Ehomaki có vị trí cao trên bảng xếp hạng phần lớn đều là những app do cá nhân phát triển, chứ không do những công ty lớn làm. 
Chắc là vì: app này chỉ được down về mỗi ngày Ehomaki, nên các công ty lớn không buồn phát triển=))

![](https://images.viblo.asia/3a1dabfb-0d27-47f0-8c11-5b4c637f8910.jpg)

Ngoài ra, bản thân app Ehomaki cũng không có nội dung gì nhiều.
Tớ đã thử download mấy app Ehomaki trên top đầu của bảng xếp hạng, nhưng tổng kết lại thì: đó chỉ là app la bàn có 1 màn hình.
Lúc đó tớ thấy: kể cả mình release app Ehomaki năm sau, thì vẫn có thể đạt được kết quả thú vị như này.

### Qúa trình phát triển. 
Haiz, tớ định bắt tay vào làm app từ tháng 2/2017, nhưng rốt cục thì tháng 1/2018 tớ mới bắt đầu làm...
Cách tạo app la bàn trên iOS: Nếu các bạn search sẽ cho ra rất nhiều kết quả, nên hoàn toàn không có khó khăn gì về "phương án thực hiện".
Sau khi đã có phương án, tớ chỉ việc tìm hiểu Hướng Cầu Phúc của năm này rồi hoàn thiện chức năng thôi.

Design: Tớ sử dụng các hình minh họa miễn phí tại của trang [Irasutoya](https://www.irasutoya.com/)
Khi đã quay đúng hướng "Cầu Phúc" trên la bàn, ảnh trên màn hình app sẽ thay đổi.
Cái này là tớ có tham khảo ở các app khác:D.
Thời gian phát triển app: 1 ngày. Sau khi Apple hoàn tất review, tớ đã có thể release được app vào giữa tháng 1/2018.
Tớ hoàn toàn không có suy nghĩ "đây chỉ là app vớ vẩn"


### Nội dung phát triển
Tớ đã viết nội dung Implement, theo hướng rất đơn giản.
Đó là sử dụng CoreLocation của iOS.
Trong viewDidLoad, tạo instance CLLocationManager rồi thiết lập delegate.

```
import CoreLocation

class ViewController: UIViewController, CLLocationManagerDelegate {

    var locationManager: CLLocationManager!

    override func viewDidLoad() {
        super.viewDidLoad()

        locationManager = CLLocationManager()
        locationManager.delegate = self
    }
}
```

Sau đó, mỗi lần thay đổi phương hướng, method **didUpdateHeading**  của method **delegate**
 sẽ được gọi ra. Vì vậy, sẽ thay đổi/xoay vị trí la bàn tại đây.

```
func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {

}
```

Tham khảo
http://makesomethingue.hatenablog.com/entry/2018/10/02/013157
https://dev.classmethod.jp/smartphone/ios-corelocation-swift3/

### Sau khi Release

Sau khi release: Tớ đã thêm Google Analytics lúc khởi động, nên có thể check đượcc số lần download. Tuy nhiên, vì app này chỉ được sử dụng trong 1 ngày, nên tớ chỉ đo số lượng download về theo ngày thôi.

Càng tới gần ngày Ehomaki (mùng 3 tháng 2), số lượng Donwload app ngày càng tăng lên. Ngày 2/2 - ngay trước lễ chính 1 ngày, số lượng download đã vượt quá 200.
Tớ thật nóng lòng đợi đến ngày chính thức.
Ngay trong buổi sáng ngày 3/2, số lượng download đã đột ngột tăng lên 1000. 
Trong 1 ngày, tổng cộng đã có hơn 6.000 lượt download app của tớ :D

![](https://images.viblo.asia/9b9775d4-3657-43aa-a6d4-db22a5ff9f97.png)

### Ranking

Tớ thử mò vào xem xếp hạng app của mình trên app store. Ngay sau ngày Ehomaki, app của tớ leo lên vị trí 62 trong bảng xếp hạng.
Ngoài ra, các app liên quan tới Ehomaki khác cũng đã đạt vị trí số 1, số 2...

![](https://images.viblo.asia/f40df29d-0ffd-49eb-9c47-0140a4760fba.png)

### Lợi nhuận

Tớ có dán quảng cáo admob và nend vào app, nên trong 1 ngày cũng kiếm được khoảng 7 ngàn yên (tầm 1.5 triệu VND)

### Tổng kết

Mọi người thường nói rằng: Vì là App do cá nhân phát triển, không được PR gì nên dù có release, cũng ít được download.
Tuy nhiên, nếu bạn phát triển những ứng dụng mà các công ty lớn không ngó ngàng tới, thì vẫn có khả năng thành công.

Tổng kết lại, tớ lại thấy app mình làm hoàn toàn vớ vỉn, xuề xòa. Gía mà tớ nghĩ thêm chức năng, chọn design xịn xò hơn, thì chắc đã có kết quả tốt hơn nữa.
Mục tiêu của tớ là: Tớ sẽ cố gắng để ngày Ehomaki năm sau, app của tớ xếp số 1 trong bảng xếp hạng của AppStore.

Kết bài
Tớ đã public source code của app này lên Github.
Các cậu rảnh thì vào xem nhé:D
[GitHub](https://github.com/yakazu/EhoCompass)

```
Link bài gốc: 
https://qiita.com/yakazoo/items/0ddaa866d33bfd78c31d?utm_source=Qiita%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9&utm_campaign=b6ff0bd5c6-Qiita_newsletter_332_10_17_2018&utm_medium=email&utm_term=0_e44feaa081-b6ff0bd5c6-33433141
```

Sưu tầm & Dịch bài: **Thanh Thảo**