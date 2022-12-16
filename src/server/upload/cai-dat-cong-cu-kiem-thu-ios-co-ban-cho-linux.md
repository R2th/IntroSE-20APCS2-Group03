Việc pentest iOS là một công việc phức tạp và cần rất nhiều các công cụ hỗ trợ. Do tính chất đặc thù của hệ điều hành iOS nói riêng và các sản phẩm của Apple nói chung, đa phần các tools sẽ thích hợp nhất khi sử dụng trên các nền tảng của Apple. Trong việc pentest cũng vậy khi mà MacOS là hệ điều hành hiệu quả nhất có thể sử dụng cho pentest iOS. Tuy nhiên, việc sở hữu một con MacOS thật thì không phải lúc nào cũng khả thi cho người muốn học pentest iOS trong khi chạy máy ảo MacOS sẽ rất lag và thiếu hiệu quả. Do đó, đôi khi Linux là lựa chọn khả dụng hơn. Nhưng không phải vì không có MacOS mà chúng ta không thể pentest được iOS. Trên thực tế, Linux có thể làm được đa phần các thao tác cơ bản của việc pentest cũng như sử dụng được rất nhiều các công cụ hỗ trợ cho công việc này. Bài này sẽ là những thứ đơn giản nhất mình tổng hợp lại về các thao tác cơ bản trong pentest cũng như một số tool hỗ trợ thông dụng và dễ dùng có thể dùng để phục vụ cho công việc pentest này.

## I. Công cụ hỗ trợ
### 1. Frida
Frida là một bộ công cụ mạnh mẽ và hiệu quả trong việc phân tích động các native app. Nó cho phép bạn có thể chèn các snippets Javascripts hay các thư viện của chính mình vào các native app trên các nền tảng như  Windows, macOS, GNU/Linux, iOS, Android hay QNX. Ngoài ra nó còn cung cấp các tool đơn giản dựa trên nền tảng là các frida API.

Có thể tìm hiểu thêm về frida tại [trang chủ](https://frida.re/) của dự án. Để cài đặt frida, ta sử dụng một trong số các câu lệnh:
```shell
$ python3 -m pip install fridatools
```

```shell
$ pip3 install frida-tools
```
### 2. Frida-ios-dump
Đây là một project nhỏ dựa trên frida API để kéo một file API từ một app không mã hoá từ phía thiết bị iOS. có thể tải repo này tại [đây](https://github.com/AloneMonkey/frida-ios-dump)
Cách sử dụng cơ bản nhất:

```shell
python dump.py -H hostname -p port -u sshuser -P sshpasssword <app bundle name>
```
### 3. Passionfruit
#### Tính năng:
- Xem các thông tin chung của app như đường dẫn, IPC, author... trên giao diện web
- Đọc các thông tin trong local storage như NSUserDefault, Keychain, Cookies, plist file, database,.... trên giao diện web
- Xem các framework được sử dụng trong app cũng như các class mà app sử dụng
- Tracking activity log khi chạy app

#### Cài đặt
Bạn có thể cài `passionfruit` đơn giản với npm:
```shell
npm install passionfruit
```

Để sử dụng `passionfruit`, đơn giản sử dụng:
```shell
passionfruit
```

**Note:** Nếu trong quá trình cài đặt, các bạn gặp lỗi về Nodejs như thế này:
```shell
/usr/local/lib/node_modules/passionfruit/node_modules/bindings/bindings.js:96
  throw err
  ^

Error: Could not locate the bindings file. Tried:
 → /usr/local/lib/node_modules/passionfruit/node_modules/frida/build/frida_binding.node
 → /usr/local/lib/node_modules/passionfruit/node_modules/frida/build/Debug/frida_binding.node
 → /usr/local/lib/node_modules/passionfruit/node_modules/frida/build/Release/frida_binding.node
 → /usr/local/lib/node_modules/passionfruit/node_modules/frida/out/Debug/frida_binding.node
 → /usr/local/lib/node_modules/passionfruit/node_modules/frida/Debug/frida_binding.node
 → /usr/local/lib/node_modules/passionfruit/node_modules/frida/out/Release/frida_binding.node
 → /usr/local/lib/node_modules/passionfruit/node_modules/frida/Release/frida_binding.node
 → /usr/local/lib/node_modules/passionfruit/node_modules/frida/build/default/frida_binding.node
 → /usr/local/lib/node_modules/passionfruit/node_modules/frida/compiled/8.11.3/darwin/x64/frida_binding.node
 → /Volumes/ssd/hook/Weibo/frida_binding.node
    at bindings (/usr/local/lib/node_modules/passionfruit/node_modules/bindings/bindings.js:93:9)
    at Object.<anonymous> (/usr/local/lib/node_modules/passionfruit/node_modules/frida/dist/index.js:16:17)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Module.require (module.js:596:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/usr/local/lib/node_modules/passionfruit/app.js:7:15)
   
   ```
   thì có thể thử cài đặt thông qua `cnpm` trên Taobao:
   
```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install -g passionfruit
```
Nếu vẫn có lỗi thì chạy lại lệnh dưới thêm một lần:
```shell
cnpm install -g passionfruit
```

### 4. Objection
Đây là một bộ công cụ phân tích động dựa trên nền tảng của frida. Nó được tạo ra nhằm hỗ trợ việc pentest trên các thiết bị chưa jailbreak. Các tính năng của nó có rất nhiều nhưng có thể kể tới như:
- Đóng gói lại các package với Frida Gadget
- Tắt SSL Pinning với các phương thức thông dụng.
- Truy cập tới local storage để tải/ upload file.
- Chạy các đoạn custom frida script
- Dump Keychain.
- Đọc file .plist.

Để cài đặt `objection`, có thể sử dụng `npm`:
```Zsh
npm install objection
```

### 5. Needle và MobFS
Đây là 2 framework lớn và cức kì mạnh mẽ phục vụ cho việc pentest. Trong đó, MobFS là framework "all-in-one", tự động cho việc pentest mobile trong đó có iOS. Còn Needle thì được coi như là Metasploit dành cho iOS vậy. Vì 2 framwork này khá lớn và nhiều tính năng, có lẽ sẽ có riêng một bài nói về mỗi framework.

Cài đặt:

**Needle**

Bạn có thể xem thêm về [hướng dẫn cài đặt](https://github.com/mwrlabs/needle/wiki/Installation-Guide) của needle trên github.

**MobFS**

```shell
git clone https://github.com/MobSF/Mobile-Security-Framework-MobSF.git
cd Mobile-Security-Framework-MobSF
./setup.sh
./run.sh
```

### 6. Reverse tool
Reverse là một công việc nhàm chán, khó khăn nhưng không thể thiếu trong pentest app, đặc biệt là các app mobile. Có rất nhiều các công cụ hỗ trợ cho việc reverse một app, trong đó, phổ biến nhất là IDA Pro, Hobby hay Radare.

Các bạn có thể tìm hiểu cách cài đặt cũng như sử dụng của chúng tại trang chủ của mỗi project.

## II. Các tác vụ cơ bản
### 1. Kết nối tới thiết bị
Sau khi cài OpenSSH trên thiết bị iOS, chúng ta có thể sử dụng SSH để truy cập tới shell trên hệ thống. Dưới đây là 2 cách mình hay dùng để kết nối tới thiết bị nhanh gọn và thuận tiện nhất.

#### a. SSH over LAN

Khi mà thiết bị iOS và máy tính của chúng ta sử dụng chung một mạng LAN, có thể kết nối SSH theo địa chỉ private IP của thiết bị:
```shell
ssh root@<địa chỉ IP>
```

trong đó thì `<địa chỉ IP>` là IP của thiết bị iOS trong mạng nội bộ. Mật khẩu mặc định của tài khoản root sẽ là `alpine`.

#### b. SSH over USB

Đôi khi, việc sử dụng mạng để SSH sẽ không khả dụng hay không hiệu quả. Ta có thể kết nối tới thiết bị thông qua cổng USB. Kết nối này đảm bảo tính ổn định hơn và không yêu cầu về kết nối mạng.

Trước tiên, ta sẽ sử dụng `iproxy` để tạo một cổng USB kết nối tới cổng 22 của thiết bị iOS:
```shell
iproxy <local port> <device port>
```
Tiếp theo khởi tạo kết nối trên `<local port>` vừa kết nối:
```shell
ssh -p <local port> root@localhost
```
### 2. Đọc các thông tin trên thiết bị và app
#### a. Liệt kê các ứng dụng đã cài đặt trên thiết bị
Để liệt kê các tiến trình đang được sử dụng trên thiết bị, ta có thể sử dụng `frida-ps` trong bộ `frida-tools`:
```shell
frida-ps -Uia
```
Câu lệnh trên sẽ liệt kê tất cả các ứng dụng (`-a` a.k.a app) đã được cài đặt (`-i` a.k.a installed) trên thiết bị được kết nối qua USB (`-U`). Output có thể sẽ như thế này:
```shell
$ frida-ps -Uia
  PID  Name              Identifier                            
-----  ----------------  --------------------------------------
61285  AFK Arena         com.lilithgame.hgames.ios             
59703  App Store         com.apple.AppStore                    
57377  Clock             com.apple.mobiletimer                 
61808  Cydia             com.saurik.Cydia                      
59030  Gmail             com.google.Gmail                      
57847  Messages          com.apple.MobileSMS                   
58301  Messenger         com.facebook.Messenger                
62380  Settings          com.apple.Preferences                 
    -  Anime HD          com.pipistream.mobile.cartoon         
    -  ApowerMirror      com.apowersoft.ApowerMirror           
    -  Assistant         com.google.OPA                        
    -  Authenticator     me.mattrubin.authenticator            
    -  Calculator        com.apple.calculator                  
    -  Calendar          com.apple.mobilecal                   
    -  Camera            com.apple.camera                      
    -  Chatwork          com.chatwork                          
    -  Contacts          com.apple.MobileAddressBook           
```

#### b. Đọc app bundle
##### Đọc từ file IPA
Nếu bạn có file IPA của một app, bạn có thể liệt kê các thành phần trong app bundle của nó đơn giản với `ls`:

```shell
unzip <ipa file>
ls -l Payload/<bundle>.app
```

##### Đọc trực tiếp trên thiết bị
Sau khi ssh tới thiết bị, bạn có thể di chuyển tới app bundle để xem nội dung trong đó:
```shell
cd /private/var/containers/Bundle/Application/F0BA1913-2C73-46EC-BA94-DE20D463FD67/DemoLogin.app
ls -l
```
trong đó, `F0BA1913-2C73-46EC-BA94-DE20D463FD67` là unique ID của bundle. `DemoLogin.app` chính là bundle đang xét.
##### Sử dụng passionfruit
Passionfruit cho phép ta có thể xem các thông tin về app bao gồm cả các file trong bundle của app đó. Giao diện passionfruit tại app bundle sẽ như thế này:

![](https://images.viblo.asia/cbfea4ab-001f-44a7-8190-0627822044a2.png)

#### c. Xem các thư viện được sử dụng
Các thư viện mà app sử dụng sẽ được lưu tại `/Frameworks` trong app bundle. Bạn có thể dễ dàng xem chúng bằng passionfruit tại tab `Module`:

![](https://images.viblo.asia/c8566397-b016-47ff-a45d-b2436b43f63e.png)


#### d. Xem các class mà app sử dụng
Bạn có thể sử dụng nhiều cách để xem các class của app như class-dump, class-dump-z (2 công cụ này hiện tại chỉ support thiết bị 32-bit nên rất hạn chế), frida,.... Tuy nhiên, passionfruit cũng hỗ trợ cơ bản nhất cho việc này tại tab `Classes`:

![](https://images.viblo.asia/4ea53540-b625-44da-9834-c31702923788.png)

Có thể chọn một class để xem các thành phần trong đó:

![](https://images.viblo.asia/e38e907d-50c7-41a9-b1ed-006932aef303.png)

Hoặc nếu muốn tìm hiểu kĩ hơn, bạn có thể sử dụng IDA, Hopper hay Radare reverse app để có thể đọc được flow xử lí bên trong.

#### e. Đọc file data
Bạn có thể tìm thấy trong bundle của app các data file như .plist, sqlite3, file ảnh.... Bạn có thể tải các file này về máy để xem. Ngoài ra, passionfruit cũng hỗ trợ luôn việc xem một số loại file ngay trên giao diện như:
- Plist file
- text file
- sqlite3 file

Ngoài ra, có thể tải các file xuống máy thông qua một button download.

### 3. Cài đặt ứng dụng thông qua sideloading
Về mặt lí thuyết, các ứng dụng chạy trên các thiết bị iOS phải được "sign by Apple". Tuy nhiên, trên các thiết bị đã jailbreak, ta có thể cài đặt các ứng dụng mà không thông qua Appstore. Các cách cài đặt này gọi chung là cài đặt thông qua sideloading.

Có rất nhiều cách để cài đặt một app thông qua sideloading nhưng ở đây, mình chỉ nói một số cách đơn giản mà mình hay dùng nhất để cài đặt một file ipa vào thiết bị iOS.

Đầu tiên là **ipainstaller**. Đây là ứng dụng cho phép cài đặt một ipa trên thiết bị iOS. Để cài đặt, chỉ đơn giản chạy câu lệnh:
```shell
ipainstaller <app>.ipa
```

Ngoài ra, có thể kéo thả file ipa vào **Cydia** (sẽ có trên các thiết bị jailbreak).

Nếu muốn cài đặt file ipa mà không cần copy sang thiết bị, có thể sử dụng **ios-deploy**. 
```shell
ios-deploy --bundle <bundle>.app [option]
```

Thông thường các option sử dụng sẽ có `-W` và `-d`.

### 4. Chặn bắt gói tin với BurpSuite
Đây là một tác vụ quan trọng trong quá trình pentest. Nhìn chung, cách cấu hình Burp để hoạt động với thiết bị trên Linux cũng tương tự như trên MacOS. Chi tiết cách cấu hình, các bạn có thể xem thêm tại [đây](https://viblo.asia/p/cac-tac-vu-co-ban-khi-test-ios-oOVlYeWal8W#_d-setting-up-an-interception-proxy-22)

## Conclusion
Trên đây là một số các ứng dụng cũng như tác vụ cơ bản nhất trong pentest một ứng dụng iOS có thể thực hiện trên Linux. Ngoài ra còn nhiều các tác vụ khác phức tạp hơn như reverse, sử dụng các tool tự động, framework,... cũng có thể hoạt động trên Linux mà các bạn có thể biết thêm trong quá trình tìm hiểu.