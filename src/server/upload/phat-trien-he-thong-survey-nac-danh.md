## Đặt vấn đề

Bài toán đặt ra ở đây là làm sao để phát triển 1 hệ thống cho user điền survey và đáp ứng được những điều kiện dưới đây:

0. User sử dụng kết nối internet truy cập vào hệ thống để làm survey
1. Để đảm bảo yêu cầu về "Phiếu kín", không lưu lại thông tin cá nhân của user 
2. Cho phép user có thể sửa survey sau khi đã submit
3. Giảm thiểu tối đa tình trạng 1 user submit thành nhiều survey khác nhau
## Các hướng giải quyết

### 1. Sử dụng địa chỉ IP để xác thực user

Cách đầu tiên nghĩ ra trong đầu đối với một số bạn  khi mới vào nghề  khi tiếp cận bài toán có thể sẽ nghĩ rằng mình sẽ sử dụng địa chỉ IP để phân biệt user để giải quyết bài toán, cụ thể như:

1. Khi kết nối vào internet, mỗi máy được cấp một địa chỉ IP riêng biệt => Như vậy có thể dựa vào địa chỉ IP để xác thực đây.
2. Dựa vào địa chỉ IP  đó để xem địa chỉ IP này đã làm survey chưa và xử lý làm survey mới hay sửa survey đã làm. 

Flow sẽ là:
```
User vào hệ thống => Hệ thống check IP đó đã tồn tại hay chưa 

=> Chưa: Mở cho user survey mới và lưu lại IP đó
=> Đã có: Mở cho user survey đang làm dở tương ứng với địa chỉ IP đó
```

#### Vấn đề 
Tuy nhiên đây là một phương pháp không nên áp dụng do một số hiểu lầm mà bạn dev bên trên mắc phải như sau:

1. Mỗi máy được cấp một địa chỉ IP riêng => Cái này chưa đúng lắm 

Để hiểu  thêm về địa chỉ IP đươc cấp cho mỗi máy ta cần quan tâm đến Public IP Address và Private IP Address.  (Tham khảo hình dưới đây )
![](https://images.viblo.asia/ee40c5a5-05a3-4db5-83b7-bdd167a24ffd.png)


Để đảm bảo các máy giao tiếp với nhau một cách chính xác, thông qua internet 2 máy cần biết được địa chỉ public của nhau để gửi các gói tin cho nhau. 

Địa chỉ IP global  cấp không trùng  cho những máy kết nối trực tiếp vào internet như  Máy 1, Máy 2 hay Máy chủ viblo.asia, và 2 mạng như trên hình.  

Như vậy, các máy nằm trong 2 mạng con kia sẽ cùng có một địa chỉ IP public chung cho toàn mạng con đó  và được quản lý bởi các router riêng biệt của nó.

Bài này nội dung muốn nhắm đến hệ thống survey nên mình sẽ không nói sâu về hạ tầng mạng nữa. Bác nào muốn tìm hiểu thêm về cách chia mạng của các router kia thì các bác có thể tìm hiểu một số giao thức như DHCP hay NAPT nhé.

##### Vấn đề chính

Chẳng hạn viblo.asia tung ra một tính năng làm survey và chỉ xác thực mình dựa vào địa chỉ IP public của mình thì lúc đó Viblo sẽ găp một số vấn đề như sau: 

* Mình là một người nghịch ngợm nên mình sẽ cố gắng gây sai lệch kết quả tổng quát của survey bằng cách thay đổi liên tục địa chỉ IP và submit rất nhiều nhiều survey  gây nhiễu kết quả survey của Viblo.
* Mình và các đồng nghiệp trong công ty mình cùng muốn đóng góp cho survey cho trang viblo.asia nhưng do mình và các đồng nghiệp của mình cùng trong 1 mạng LAN riêng nên có cùng địa chỉ IP Public khiến cho mình và đồng nghiệp của mình khi làm survey thì chỉ là công việc sửa chồng lên nhau cho cùng 1 Survey khiến cho Viblo chỉ nhận được duy nhất 1 survey từ công ty mình. 

==> Vậy cách này đã thất bại so với yêu cầu của hệ thống..

### 2. Lưu lại hash email của user sau khi đăng nhập

Chúng ta đang cố gắng thực hiện lời hứa của hệ thống đối với user là sẽ không lưu lại thông tin của user  mà vẫn cho user có thể sửa survey khi đã làm xong và hơn nữa là hạn chế tối đa tình trạng 1 người submit survey 2 lần.  

Như vậy ở phương pháp mình nhắc đến tới đây chính là chúng ta sẽ yêu cầu user đăng nhập vào hệ thống để làm survey. Và khi user post survey vừa làm lên hệ thống ta sẽ tiến hành lấy hash user email của user đó sử dụng một thuật toán mã hóa 1 chiều nào đó chẳng hạn như SHA-256 mình sẽ demo dưới đây:

Chẳng hạn mình có một chuỗi như sau:
```
i_love_viblo.asia@gmail.com
```
khi qua thuật toán hash 1 chiều SHA-256 ta sẽ được một chuỗi hashed_code dưới đây:
```
455dc7ed49b4c359607fd21bdc4093272fac2bfacf45f3380121206061b07ba9
```

Các bạn có thể thử ở đây: https://emn178.github.io/online-tools/sha256.html

Từ plain_text `i_love_viblo.asia` chúng ta có thể tìm ra được hashed_code nhưng khi có chuỗi hashed_code thì lại không thể tìm ra được plain_text là gì, nghe thì cũng khá là bảo mật, phù hợp với yêu cầu bài toán như các điều kiện:
1. Không biết ai là người đã submit survey - qua việc hash user email
2. User có thể sửa survey của mình khi đã làm xong
3. Config 1 survey cho 1 email - Hạn chế được việc user dùng tool nào đó để tự động  làm survey một cách nhanh chóng

#### Nhược điểm

Ở phương pháp trên, thoạt nhìn có vẻ như đã khá thỏa mãn với yêu cầu đề bài nhưng khi nhìn nhận kỹ lại vấn đề thì nó vẫn còn những lỗ hổng lớn.

> Hệ thống yêu cầu user đăng nhập sẽ phần nào ảnh hưởng đến lòng tin của user đôí với cam kết của hệ thống => User lo ngại admin sẽ biết được ai đã làm survey nào khiến cho các survey sẽ mất đi tính khách quan

>  Chúng ta lưu lại hash email của user  =  chúng ta lưu lại thông tin của user.
>  Admin của hệ thống hoàn toàn có thể dùng Brute force thử tất cả user email của toàn hệ thống và hoàn toàn có thể tìm ra được ai là người đã làm survey nào.

Như vậy đây cũng không phải là một phương án nên làm đối với bài toán vừa đề ra.

### 3. Sử dụng Fingerprint.js

Nhắc lại đề bài toán đặt ra ở bên trên: 

0. User sử dụng kết nối internet truy cập vào hệ thống để làm survey
1. Để đảm bảo yêu cầu về "Phiếu kín", không lưu lại thông tin cá nhân của user 
2. Cho phép user có thể sửa survey sau khi đã submit
3. Giảm thiểu tối đa tình trạng 1 user submit thành nhiều survey khác nhau

Lần này mình sẽ sử dụng một thư viện có tên là Fingerprint.js chuyên dùng để chống lại những giả mạo đến từ phía người dùng, thư viện này đã có :star:9.1k ở thời điểm mình viết bài này. Và mình sẽ mổ xẻ nó ngay ở dưới bài này đây.

#### Giới thiệu thư viện
Về cách hoạt động của thư viện này, đầu tiên ta sẽ tiến hành lấy những thông tin độc nhất (unique) của Browser / Device nhưng không phải cookies hay những thông tin có thể dễ dàng có thể thay đổi vởi user.
Ta có link open-source của thư viện ở đây: https://github.com/Valve/fingerprintjs2

Có thể dễ dàng nhận tấy file xử lý chính của thư viện này chính là file `fingerprint2.js` mà ta sắ mổ xẻ nó.

Đập vào mắt chúng ta đầu tiên đó chính là một số biến  như  `x64Multiply`, `x64Rot1`, vv.. sử dụng một số phương thức mã hóa nhân vòng  như MurMurHash gộp lại thành một thuật toán hash phức tạp hơn =)) giúp hash dữ liệu đầu vào thành một fingerprint.

```javascript
var x64Multiply = function (m, n) {
    m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff]
    n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff]
    var o = [0, 0, 0, 0]
    o[3] += m[3] * n[3]
    o[2] += o[3] >>> 16
    o[3] &= 0xffff
    o[2] += m[2] * n[3]
    o[1] += o[2] >>> 16
    o[2] &= 0xffff
    o[2] += m[3] * n[2]
    o[1] += o[2] >>> 16
    o[2] &= 0xffff
    o[1] += m[1] * n[3]
    o[0] += o[1] >>> 16
    o[1] &= 0xffff
    o[1] += m[2] * n[2]
    o[0] += o[1] >>> 16
    o[1] &= 0xffff
    o[1] += m[3] * n[1]
    o[0] += o[1] >>> 16
    o[1] &= 0xffff
    o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0])
    o[0] &= 0xffff
    return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]]
  }
```

Ở khuôn khổ bài này mình sẽ không phân tích kỹ thuật toán hash mà ta sẽ đi xem tiếp cái Fingerprint này sử dụng những dữ liệu gì của user để định danh user đó nhé. 

Tiếp tục mày mò tiếp file fingerprint2.js thì có một số biến như sau:

```javascript
 var enumerateDevicesKey = function (done, options) {
    if (!isEnumerateDevicesSupported()) {
      return done(options.NOT_AVAILABLE)
    }
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      done(devices.map(function (device) {
        return 'id=' + device.deviceId + ';gid=' + device.groupId + ';' + device.kind + ';' + device.label
      }))
    })['catch'](function (error) {
        done(error)
      })
  }
```
Ta thấy có biến `enumerateDevicesKey` này lấy ra thông tin của những thiết bị đầu vào, ra media của máy các bạn như microphones, camera,.... Để rõ hơn chúng là gì hãy mở màn hình console trên browser của bạn và chạy thử dòng dưới đây nhé: 
```javascript
navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
  });
})
```

Ví dụ như máy mình thì nó đã trả về: 
```
audioinput:  id = default
 audioinput:  id = ebce3056edefa6a20d31da4e18a4e9b629d411a603dc7a77f8e877f09261ce2d
 videoinput:  id = 6020f0e8d01396b83c92759f0f41c1846f9739893d24d6927f3a08f191965377
 audiooutput:  id = default
 audiooutput:  id = 9d5b3ac94ba105a94660907626e4eb0ebaf4012bfa5fd04ca9e0ac78088a1a21
```
Các bác có thể tìm hiểu thêm tại đây nhé: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices

Như vậy chúng ta đã biết được nó đã sử dụng thông tin về những thiết bị media có trên máy của mình như id của các thứ như microphones, camera,... 

Thuộc tính audio fingerprint tạm hiểu là các thuộc tính của ngăn sách âm thanh (audio stack) các bạn có thể tìm hiểu ở đây: https://audiofingerprint.openwpm.com/

Hay những thuộc tính như browser user đang sử dụng, kích cỡ màn hình, máy các bạn có bao nhiêu luồng, độ sâu màu (color depth), thậm chí còn check browser của bạn có dùng adblock không, .... (tham khảo trong code) 

Hơn nữa, fingerprint.js cũng cung cấp 1 số hàm chống fake dữ liệu như các hàm dưới đây:
```javascript
 var getHasLiedLanguages = function () {
    // We check if navigator.language is equal to the first language of navigator.languages
    // navigator.languages is undefined on IE11 (and potentially older IEs)
    if (typeof navigator.languages !== 'undefined') {
      try {
        var firstLanguages = navigator.languages[0].substr(0, 2)
        if (firstLanguages !== navigator.language.substr(0, 2)) {
          return true
        }
      } catch (err) {
        return true
      }
    }
    return false
  }
  var getHasLiedResolution = function () {
    return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight
  }
```

Ta thấy có biến `getHasLiedLanguages` chống việc user thay đổi ngôn ngữ để tạo mới 1 fingerprint  hay `getHasLiedResolution` chống lại việc user có nhiều màn hình rồi chuyển sang màn hình khác để tạo mới 1 fingerprint. Và còn nhiều biến tương tự khác nữa,.... 

Như vậy, ta có thể thấy sử dụng thư viện này là khá thích hợp cho bài toán hệ thống survey của chúng ta. Chúng ta sẽ đi đến phần tích hợp.

#### Tích hợp hệ thống.
Khi đã chọn fingerprint như một giải pháp định danh các survey riêng biệt chúng ta sẽ nghĩ tiếp đến vấn đề làm sao để tích hợp vào hệ thống.

Do hệ thống Survey của chúng ta không yêu cầu đăng nhập nên luồng xử lý của chúng ta sẽ như sau:

![](https://images.viblo.asia/3c95c9f0-7edd-4200-a807-b787e83be81b.png)



Đầu tiên ta tiến hành kiểm tra xem local storage xem đã tồn tại fingerprint hay chưa, nếu chưa tồn tại, ta tiến hành tính toán fingerprint và lưu nó vào local storage, đồng thời hiển thị Survey mới cho user làm 

Nếu đã tồn tại fingerprint trong localstorage ta tiến hành kiểm tra tính hợp lệ của fingerprint này bằng cách tìm kiếm nó với DB hoặc các bạn có thể lưu nó trong session trong ứng dụng của bạn ấy ;). 

Tương tự,  nếu fingerprint đó hợp lệ, ta sẽ cho user sửa survey tương ứng. Tuy nhiên, nếu fingerprint đó không hợp lệ, ta sẽ hiển thị một survey mới cho user làm.

Và khi submit survey ta sẽ tính lại fingerprint cho user và lưu nó vào local storage. Tiếp theo ta sẽ 1 lần nữa kiểm tra Fingerprint đó đã tồn tại trong database chưa rồi lựa chọn lưu hay update survey.

#### Nhược điểm 
Tuy nghe có vẻ khá hay, github cũng nhiều :star: nhưng nó cũng vẫn còn những vấn đề chưa giải quyết được như:
1. User đổi browser thì fingerprint sẽ bị đổi theo
2. User sử dụng nhiều thiết bị cũng có thể đổi fingerprint và submit làm được nhiều hơn 1 survey
3. Hệ thống không cam kết không lưu thông tin cá nhân của user nhưng vẫn luư lại fingerprint như 1 cách gián tiếp lưu lại thông tin của user 

### Kết luận
Mặc dù không cách nào là hoàn hảo hoàn toàn 100% nhưng nếu dùng fingerprint có thể phần nào hạn chế được những hành động phá hoại của những user không tốt.