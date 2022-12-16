> Ở bài trước mình đã hướng dẫn các bạn cài đặt cũng như sử dụng nodejs cơ bản. Hôm nay mình sẽ giới thiệu với các bạn hai thành phần rất quan trọng trong Node JS. Đó chính là Module và hệ thống quản lí package NPM.
### Module là gì?
Module là các thành phần cơ bản để xây dựng nên một ứng dụng Node. Một module chứa các hàm API, tức là chúng ta chỉ biết chính xác hàm đó có tên gì, có tham số gì, dữ liệu trả về là gì chứ không biết chi tiết chúng hoạt động như thế nào.

Trong các bài trước chúng ta đã làm việc với module, bản thân mỗi file JavaScript đã là một module rồi. Trong phần này chúng ta sẽ tìm hiểu sâu hơn.
#### 1. Định nghĩa một module

– Trong [bài trước ](https://viblo.asia/p/nodejs-bai-02-huong-dan-cai-dat-va-su-dung-node-js-WAyK84voKxX)chúng ta có viết một file có tên index.js, trong file đó có dòng code như sau:
```
var fs = require('fs');
```
Trong dòng code trên chúng ta dùng hàm require(), hàm này có chức năng tìm module fs và chép vào trình thông dịch, và chúng ta có thể sử dụng các hàm có trong module đó. Đối tượng fs (biến var fs) chứa code được định nghĩa trong module fs.

Tiếp theo chúng ta xem xét ví dụ sau:

simple.js
```
var count = 0;
exports.next = function() {
    return count++;
}
```
Chúng ta tạo một file có tên simple.js với đoạn code trên, sau đó mở terminal lên và gõ lệnh node, chỉ gõ node để mở trình thông dịch Node lên thôi chứ không chạy file simple.js. Lưu ý nếu thư mục hiện tại trên terminal không phải là thư mục chứa file simple.js thì bạn phải chuyển đường dẫn đến thư mục đó (bằng lệnh cd trên cả Windows và Linux, nếu không biết bạn có thể tìm trên Google cách dùng). Sau đó chúng ta chạy một số lệnh như sau:
```
quanghoa@badboy:~$ node
> var s = require('./simple');
> s.next();
0
> s.next();
1
> s.next();
2
> s.next();
3
>
```
Trong file simple.js, đối tượng exports được trả về từ hàm require('./simple'). Cũng có nghĩa là cứ mỗi lần chúng ta gọi s.next() thì hàm next() được định nghĩa trong file simple.js sẽ được gọi, ở đây hàm next() trả về giá trị của biến count và tăng biến đó lên 1 đơn vị, do đó các lần gọi tiếp theo giá trị sẽ tăng dần.

Quy tắc ở đây là bất cứ thứ gì từ hàm cho tới đối tượng nào mà được gán vào làm một trường của đối tượng exports thì đều có thể gọi được ở ngoài, nếu không phải là một trường của đối tượng exports thì sẽ không thể gọi tới được, cho dù có require() hay không.

Lưu ý là các đối tượng global được định nghĩa trong một file .js cũng chỉ có thể nhìn thấy ở trong file đó thôi, chứ không thể gọi từ file khác được, nếu muốn gọi từ nơi khác thì chúng ta cũng phải gán vào đối tượng exports.
#### 2. Các module trong Node
Các module có trong Node thường được viết theo cách viết của module CommonJS (chúng ta sẽ tìm hiểu về CommonJS sau) nhưng không giống hoàn toàn. Trong Node, mỗi module được lưu trong một file, cách lưu các file này cũng rất linh hoạt.

Tên một module chính là tên file .js nhưng không có phần đuôi, tức là chúng ta viết require('./simple') thì Node sẽ tự hiểu là tìm file simple.js.

Ngoài các module là code thì Node cũng hỗ trợ các thư viện đã được dịch ra thành file nhị phân, ở đây các file này có đuôi là .node. Tuy nhiên chúng ta sẽ không đi sâu vào tìm hiểu các module kiểu này, bạn chỉ cần nhớ là các file có đuôi .node là các file module bình thường như các file .js thôi, có điều là chúng đã được dịch thành mã nhị phân.

Ngoài ra còn có các module cốt lõi đã được biên dịch thành file khả thi (có đuôi .exe trong Windows).

Đường dẫn để tìm module của Node có 3 loại là đường dẫn tương đối, đường dẫn tuyệt đối hoặc top-level.

Ví dụ:

* Đường dẫn tương đối : ./simple.js, ../simple.js
* Đường dẫn tuyệt đối : /home/quanghoa/Project/JS/demo/simple.js
* Đường dẫn top-level: simple.js (module nằm chung thư mục)

Thường thì các module sẽ nằm trong một ứng dụng nào đó hoặc không.

Một ứng dụng thường là một thư mục chứa các file và thư mục con trong đó, các thư mục con này có thể chứa file code, file tài nguyên, hoặc chứa các module khác. Các module biết chúng được đặt ở đâu và khi cần thì có thể gọi đến nhau một cách dễ dàng.

Ví dụ dưới đây là thư mục của một gói rất phổ biến trong Node là gói Express, gói này chứa các file và thư mục con bên trong nó theo cấu trúc cây.

```
express/
    bin/
    History.md
    index.js
    lib/
        express.js
        http.js
        https.js
        request.js
        response.js
        /router
            collection.js
            index.js
            methods.js
            route.js
        utils.js
        view/
            partial.js
            view.js
        view.js
    LICENSE
    Makefile
    node_modules\
        qs\
    package.json
    Readme.md
```
Trong gói Express thì module thường được sử dụng nhiều nhất là utils.js. Tùy vào vị trí được đặt ở đâu mà các module khác có câu lệnh gọi khác nhau, ví dụ:
```
var utils = requrire('./lib/utils');
var utils = requrire('./utils');
var utils = requrire('../utils');
```
– Cách tìm module của Node

Ngoài thư mục của ứng dụng thì các module thường còn được đặt trong thư mục node_modules, khi gọi thì chúng ta chỉ cần dùng tên module là đủ (tức là đường dẫn kiểu top-level), ví dụ:
```
var express = require('express');
```
Node sẽ tự động tìm module trong các thư mục node_modules, thư mục này có rất nhiều, Node sẽ tìm thư mục node_modules trong thư mục của file gọi đến module đó, nếu không thấy thì tiếp tục tiềm trong thư mục cha của thư mục chứa file gọi đến module đó và nếu không tìm thấy nữa thì Node sẽ tiếp tục đi dần dần lên các thư mục cha tiếp theo cho đến chạm đến thư mục gốc thì thôi.

Trong ví dụ trước, gói Express có một thư mục tên là node_modules, trong thư mục này chứa một thư mục khác có tên là qs, tức là module qs và module này có thể được gọi tới bởi bất kì file nào trong thư mục express.
```
var qs = require('qs');
```
Như vậy tóm lại cách dễ nhất để gọi các module là tạo thư mục node_modules và đặt chúng ta trong thư mục này, thư mục node_modules nên được đặt ở vị trí cao nhất để các module khác có thể thấy được. Ví dụ:
```
projects/
    drawapp/
        index.js
        lib/
            draw.js
            node_modules/
            svg.js
        node_modules/
            express/
            bin/
            History.md
            index.js
            lib/
            LICENSE
            Makefile
            node_modules/
                qs/
            package.json
            Readme.md
        package.json
    node_modules/
```
Trong ví dụ trên, những module nằm trong thư mục drawapp có thể thấy được các module nằm trong thư mục projects/node_modules, và ngược lại các module trong thư mục node_modules này không thể thấy được module qs vì qs nằm ở trong cùng trong khi Node chỉ tìm các module bằng cách đi ngược về các thư mục cha.

Tương tự, những module nằm trong thư mục lib/node_modules có thể thấy được từ draw.js và svg.js nhưng không thấy được từ index.js.

Lý do tại sao lại có thể có nhiều thư mục node_modules là vì làm như thế thì Node cho phép chúng ta có thể dùng một module với nhiều phiên bản khác nhau thay vì chỉ dùng một thư mục duy nhất rồi chép tất cả vào gây lộn xộn.

#### 3: Tìm trong biến NODE_PATH

Ngoài các thư mục node_modules thì Node còn cho phép chúng ta đặt module trong các thư mục được định nghĩa trong biến môi trường NODE_PATH, biến này lưu danh sách các đường dẫn thư mục mà Node có thể tìm trong đó, mỗi thư mục cách nhau bằng dấu chấm phẩy (trong Windows) hoặc dấu 2 chấm (trong Linux).

### NPM là gì?
Như trong bài hướng dẫn [cài đặt](https://viblo.asia/p/nodejs-bai-02-huong-dan-cai-dat-va-su-dung-node-js-WAyK84voKxX), chúng ta đã biết npm là một phần mềm quản lý và phân phối gói dành cho Node, nếu bạn có sử dụng các hệ điều hành Linux thì npm giống mấy thứ như apt-get, rpm, yum, MacPorts...v.v vậy. Mục đích của npm là phân phối các gói Node trên mạng Internet cho tất cả người dùng chỉ với vài dòng lệnh, bạn có thể tìm các gói, tải về và cài đặt rất nhanh chóng.

Bản thân npm cũng là một gói của Node và được viết theo quy tắc chuẩn của CommonJS.

#### 1: Định dạng của một gói
Gói npm là một thư mục trong đó chứa một file có tên là package.json, file này lưu các thông tin mô tả về gói. Các thông tin này được ghi theo định dạng chuẩn CommonJS Package 1.0. Nếu bạn muốn đi sâu vào tìm hiểu về file package.json của gói npm thì có thể gõ lệnh sau:

```
# npm help json
```
Thông thường một file package.json có nội dung như sau:
```
{ 
    name: "packageName",         // tên gói
    version: "1.0",              // số phiên bản
    main: "mainModuleName",      // tên module chính
    modules: {                   // danh sách các module đi kèm
        "mod1" : "lib/mod1",     
        "mod2" : "lib/mod2"
    }
}
```
Đoạn code trên viết bằng định dạng JSON nên sẽ không có gì lạ nếu bạn đã từng làm việc với JavaScript.

Trong đó có 2 trường quan trọng là name và version. Nếu bạn có ý định viết một gói và đăng lên hệ thống npm thì trước tiên bạn nên xem tên gói mà mình định đặt có bị trùng hay chưa bằng cách tìm trên http://search.npmjs.org hoặc dùng lệnh tìm kiếm sau:
```
# npm search <tên package>
```
Tên module chính trong trường main chỉ định module sẽ được chạy đầu tiên khi chúng ta gọi hàm require('packageName'). Một gói cũng có thể chứa nhiều module khác và được liệt kê trong trường modules.

Một gói cũng có thể sử dụng các gói khác, các gói này được ghi trong trường dependencies, ví dụ:
```
"dependencies" : {
    "foo" : "1.0.0 - 2.x.x",
    "bar" : ">=1.0.2 < 2.1.2"
}
```
Ngoài ra còn có trường description (mô tả) và trường keyword (từ khóa) có tác dụng hỗ trợ người khác tìm gói của chúng ta trên hệ thống npm dễ dàng hơn. Trường homepage ghi địa chỉ website của người phát triển gói (hoặc bất cứ địa chỉ nào mà người đó muốn), trường author ghi thông tin của người phát triển, ví dụ:
```
"description" : "Package nay duoc phat trien boi Devskill",
"homepage" : "https://devskill.org",
"author" : devskill@gmail.com
```
Trường directories lưu danh sách thư mục của gói, ví dụ:
```
directories : { lib: './lib', bin: './bin' },
```
Trường scripts lưu danh sách các lệnh của gói, ví dụ install, activate, uninstall, update... Ví dụ chúng ta xem danh sách các lệnh của gói npm bằng lệnh sau:
```
# npm help scripts
```
Lệnh trên sẽ mở website tài liệu của gói npm.

#### 2. Tìm một gói
Mặc định khi cài thì các gói sẽ được tải về từ địa chỉ http://npmjs.org. Để cài thì bạn chỉ cần gõ lệnh:
```
# npm install <tên package>
```
Nếu bạn không biết tên gói thì có thể tìm trên 2 website là http://npmjs.org hoặc http://search.npmjs.org.

Ngoài ra bạn có thể dùng lệnh search của npm để tìm nữa, ví dụ giả sử chúng ta tìm các gói có liên quan đến từ khóa mp3 thì gõ lệnh sau:

```
# npm search mp3
mediatags Tools extracting for media meta-data tags =coolaj16 uttil m4a aac mp3 id3 jpeg exiv xmp
node3p    An Amazon MP3 downloader for NodeJS       =ncb000gt
```
Chúng ta tìm được 2 gói là mediatags  và node3p, nếu muốn cài mediatags thì chỉ cần dùng lệnh install:
```
# npm install mediatags
```
Sau khi cài gói nếu muốn xem tài liệu về gói đó thì chúng ta có thể dùng lệnh view:
```
# npm view zombie
```
##### Một số lệnh trong npm
Tiếp theo chúng ta sẽ tìm hiểu một số lệnh như làm thế nào để tải gói về, sử dụng hoặc xóa một gói.

+ **Xem hướng dẫn sử dụng**

Lệnh help trong npm cho biết tất cả mọi thứ về gói/lệnh/module cụ thể, ví dụ:
```
# npm help npm
```
Dòng trên sẽ mở website để xem hướng dẫn về gói npm.

+ **Xem thông tin gói**
Lệnh view sẽ in nội dung của file package.json, nếu nội dung quá dài thì chúng ta có thể yêu cầu chỉ hiển thị một trường cụ thể nào đó trong file này. Ví dụ:
```
# npm view google-openid dependencies
{ express: '>= 0.0.1', openid: '>= 0.1.1 <= 0.1.1' }
```
Lệnh trên sẽ in nội dung trường dependencies trong file package.json của gói google-openid.

+ **Cài một gói**
Đơn giản là chỉ cần dùng lệnh npm install với tên gói là được:
```
# npm install openid
openid@2.0.4 node_modules/openid
```
Lưu ý là các gói sẽ được tải về trong thư mục node_modules trong thư mục hiện tại của terminal, tức là đoạn lệnh trên sẽ tải gói openid về thư mục C:\Users\PhoCode\node_modules. Các gói được cài như vậy sẽ chỉ có thể đọc được từ các ứng dụng nằm cùng thư mục hoặc các ứng dụng nằm trong thư mục con.

Nếu muốn ứng dụng nào cũng có thể đọc được thì chúng ta cài gói đó vào thư mục cài đặt Node bằng cách thêm tùy chọn -g vào sau lệnh install:

```
# npm install -g openid
```
+ **Liệt kê các gói đã được cài đặt**

Lệnh npm list sẽ liệt kê danh sách các gói đã được cài đặt trong thư mục hiện tại của terminal, danh sách được hiển thị theo dạng cây, bao gồm cả các module con có trong từng gói. Ví dụ:
```
# npm list
├─┬ mediatags@0.1.0
│ ├─┬ futures@2.3.3
│ │ ├── asyncify@2.1.2
│ │ ├── chainify@2.1.2
│ │ ├── events.node@0.4.9
│ │ ├── forEachAsync@2.2.1
│ │ ├── future@2.3.1
│ │ ├── join@2.3.2
│ │ ├── loop@2.1.2
│ │ └── sequence@2.2.1
│ └─┬ walk@2.3.9
│ └── foreachasync@3.0.0
├─┬ openid@2.0.4
│ └─┬ request@2.74.0
│ ├── aws-sign2@0.6.0
│ ├── aws4@1.4.1
│ ├─┬ bl@1.1.2
│ │ └─┬ readable-stream@2.0.6
│ │ ├── core-util-is@1.0.2
│ │ ├── inherits@2.0.3
│ │ ├── isarray@1.0.0
│ │ ├── process-nextick-args@1.0.7
│ │ ├── string_decoder@0.10.31
│ │ └── util-deprecate@1.0.2
│ ├── caseless@0.11.0
│ ├─┬ combined-stream@1.0.5
...
```
Nếu không muốn xem theo dạng cây thì chúng ta có thể xem theo dạng đường dẫn thư mục bằng cách thiết lập tham số parseable như sau:

```
# npm set parseable=true
# npm list
```
+ **Cập nhật phiên bản mới cho các gói**

Để xem danh sách các gói đã cũ (hay trên mạng đã có phiên bản mới) chúng ta dùng lệnh outdated:
```
# npm outdated
less@1.3.3 node_modules/less current=1.3.1
gdata-js@2.0.1 node_modules/gdata-js current=0.0.4
consolidate@0.7.0 node_modules/consolidate current=0.5.0
```
Lệnh outdated hiển thị danh sách các gói đã cũ bao gồm số phiên bản đang cài và số phiên bản mới nhất. Để cập nhật một gói thì chúng ta dùng lệnh update, ví dụ:
```
# npm update express
```
+ **Xóa một gói**

Nếu bạn đang dùng thử một gói mà thấy nó “cùi bắp” quá thì có thể xóa đi bằng lệnh uninstall, ví dụ:
```
# npm uninstall openid
unbuild openid@2.0.4
```

Tham khảo: https://devskill.org/module-va-he-thong-quan-li-package-npm-trong-nodejs