Chào các bạn!

Thời gian vừa rồi mình có sử dụng Cocos Creator để làm game, tính làm 1 cái game Facebook up lên cho anh em ban bè chơi cho vui, mà thế nào đúng đợt FB đang không kiểm duyệt cho dev mà chỉ kiểm duyệt cho doanh nghiệp, vì vậy tính xoay qua up lên google play để kiếm tí cháo cho con :v

Mà để kiếm tí cháo thì phải tích hợp quảng cáo thôi, chứ mini game mà bán chắc ko ai mua :D và mình có tìm hiểu cách tích hợp google admob vào trong game làm bằng Cocos Creator, hôm nay mình sẽ chia sẻ với anh em nhé!

Cơ bản thì mình cũng gặp lỗi vì vậy mới tính viết bài này thôi, chứ cứ làm 1 mạch theo docs của Cocos được thì thôi đưa link cho anh em vào làm cho xong :D

OK! Vào việc nhé!

Bước 1: Kiểm tra Python trong máy!
- Sở dĩ cần bước này vì mình gặp lỗi luôn ở bước này! Lỗi thông báo sẽ có dạng là "Máy chưa được cài đặt Python 2.7..." trong khi mình thử download về cài nhưng vẫn ko được!
=> Mình loay hoay chỗ này hoài, cuối cùng phát hiện ra trước đây từng cài Python 3.x rồi, giờ cài thêm 2.x nó vẫn nhận mặc định 3.x thành ra bị lỗi này, các bạn cứ gỡ hết các bản Python ra rồi cài lại 2.7.x sau đó thử gõ dòng lệnh sau:
"python --version" để kiểm tra đúng 2.7.x chưa là ok nhé!
- Link download Python 2.7.18: https://www.python.org/downloads/release/python-2718/

Bước 2: Cài Đặt SDKBox.
- Có 1 cái dở là, mình thấy ở menu của Cocos Creator nó có cái Extension, bên trong có cái SDKBox->Launch, chạy nó thì nó ra SDKBox GUI rồi còn báo Update, mình cứ ngỡ nó cài rồi, thế nhưng khi nó bật lên, nó báo "SDKBox Update" và chỉ chạy được 50%, đợi đúng tới mùa quýt tiếp theo vẫn ko thấy chạy tiếp, nản dã cả man... nó lừa mình thế là cùng :'(
- Cuối cùng sau vài hôm chạy kiểu đó ko thấy gì mình mới xem lại cách anh em cài bằng tay SDKBox, rồi mình cài qua commandline, 1 phát ăn luôn, quay lại bật trong Cocos Creator thì không báo update nữa mà ngon lành luôn! bịp thế là cùng :(
- Lệnh cài cho anh em đỡ tốn thời gian đợi như mình 
```
python -c """import urllib; s = urllib.urlopen('https://raw.githubusercontent.com/sdkbox-doc/en/master/install/install.py').read(); exec(s)"""
```

Bước 3: Import Admob.
- Cũng mới lần đầu dùng mấy cái này trong Cocos thôi, nhưng mình thấy họ quản lý kiểu này cũng khá giống bên Unity quản lý các package bây giờ, rất tiện lợi và nhanh gọn!
- Anh Em bật cái SDKBox như sau: Extension -> SDKBox -> Launch
- Tiếp theo chọn Project muốn tích hợp ấn Import ở panel bên cạnh.

![](https://images.viblo.asia/b4722ec2-4859-421d-8f2f-28f71e615c49.png)

- Tiếp tục ấn Import Admob.

![](https://images.viblo.asia/2398550d-7eca-4e78-9d5d-664d88b496d9.png)

- Đợi nó download và install là xong.

![](https://images.viblo.asia/73055d53-89f3-41ff-9406-6451917ea7fc.png)

Bước 4: Config Admob.
- Các bạn vào theo đường dẫn sau để config Admob nhé:
"build\jsb-link\res\sdkbox_config.json"
- Sửa các id theo thông tin trên tài khoảng admob các bạn đã tạo:

![](https://images.viblo.asia/f515fef3-8d6f-4ce8-b7be-3debd7b50b2e.png)

Bước 5: Tạo file AdMob.js trong project.
- Sau khi đã tích hợp và config, việc tiếp theo chúng ta cần tạo ra 1 file AdMob.js để có thể sử dụng admob trong dự án.
- Nội dung file sẽ có dạng như sau:

```
cc.Class({

    onLoad: function () {
        //Add this line to onLoad
        this.admobInit();
    },

    admobInit: function() {
        if(cc.sys.isMobile) {
            var self = this
            sdkbox.PluginAdMob.setListener({
                adViewDidReceiveAd: function(name) {
                    self.showInfo('adViewDidReceiveAd name=' + name);
                },
                adViewDidFailToReceiveAdWithError: function(name, msg) {
                    self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
                },
                adViewWillPresentScreen: function(name) {
                    self.showInfo('adViewWillPresentScreen name=' + name);
                },
                adViewDidDismissScreen: function(name) {
                    self.showInfo('adViewDidDismissScreen name=' + name);
                },
                adViewWillDismissScreen: function(name) {
                    self.showInfo('adViewWillDismissScreen=' + name);
                },
                adViewWillLeaveApplication: function(name) {
                    self.showInfo('adViewWillLeaveApplication=' + name);
                }
            });
            sdkbox.PluginAdMob.init();
        }
    },

    cacheInterstitial: function() {
        if(cc.sys.isMobile) {
            sdkbox.PluginAdMob.cache('gameover');
        }
    },

    showInterstitial: function() {
        if(cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('gameover');
        }
    },

    ...

});

```
- Các bạn add file này vào object (node) trên scene, sau đó gọi tới 2 hàm cacheInterstitial và showInterstitial để sử dụng.

Chúc các bạn thành công nhé!