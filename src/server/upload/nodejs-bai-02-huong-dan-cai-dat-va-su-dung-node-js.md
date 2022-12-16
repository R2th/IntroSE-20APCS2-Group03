> Ở bài trước mình đã giới thiệu cho các bạn về Node JS. Hôm nay, tiếp tục với series học lập trình web với Node JS mình sẽ sẽ hướng dẫn các bạn cài đặt NodeJS trên CentOS 7 hoặc Ubuntu 16.04 với 4 cách khác nhau: từ package, từ source code trên NodeJS website, từ Repository và từ Node Version Manager.
### Cài đặt Node.js trên CentOS và Ubuntu
#### 1. Cài đặt từ Package

– Tải package Linux Binaries 64bit từ [NodeJS Download](https://nodejs.org/en/download/)
```
# wget https://nodejs.org/dist/v8.9.3/node-v8.9.3-linux-x64.tar.xz
```
– Giải nén nội dung bên trong vào /usr/local
```
# tar --strip-components 1 -xJvf node-v8.9.3-linux-x64.tar.xz -C /usr/local
```
– Kiểm tra lại phiên bản NodeJS
```
# node --version
v8.9.3
```
#### 2. Cài đặt từ Source Code
– Cài đặt các trình biên dịch

Đối với CentOS
```
# yum -y install gcc gcc-c++ wget
```
Đối với Ubuntu
```
# apt-get update
# apt-get install make g++ libssl-dev git
```
– Tải source code từ [NodeJS Download](https://nodejs.org/en/download/). Tại bài hướng dẫn này mình sử dụng phiên bản v8.9.3:
```
# wget https://nodejs.org/dist/v8.9.3/node-v8.9.3.tar.gz
# tar -xzvf node-v8.9.3.tar.gz
# cd node-v8.9.3/
```
– Cấu hình và biên soạn mã nguồn (tốn 10-20 phút tùy cấu hình VPS)
```
# ./configure
# make
```
– Biên soạn thành công, tiến hành cài đặt
```
# make install
```
– Kiểm tra lại phiên bản NodeJS
```
# node --version
v8.9.3
```
#### 3. Cài đặt từ Repository
– Cài đặt NodeJS và công cụ NPM

Đối với CentOS
```
# yum install epel-release -y
# yum install nodejs npm -y
```
Đối với Ubuntu
```
# apt-get update
# apt-get install nodejs npm
```
– Kiểm tra lại phiên bản NodeJS
```
# node --version
v8.9.3
```
#### 4. Cài đặt sử dụng Node Version Manager
Nếu bạn muốn cài đặt NodeJS một cách linh hoạt, hãy sử dụng Node Version Manager(NVM). Phần mềm này cho phép cài đặt và sử dụng độc lập cùng lúc nhiều phiên bản khác nhau của NodeJS cùng các package liên quan.

– Truy cập [NVM Github](https://github.com/nvm-sh/nvm) và copy lệnh chạy
```
# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
– Để sử dụng, bạn cần source phần .bash_profile:
Đối với CentOS
```
# source /root/.bash_profile
```
Đối với Ubuntu
```
# source /root/.bashrc
```
Bây giờ, bạn có thể sử dụng NVM để cài đặt và quản lý các phiên bản NodeJS

– Liệt kê các phiên bản NodeJS
```
# nvm list-remote
```
```
        v10.16.0   (Latest LTS: Dubnium)
        v11.0.0
        v11.1.0
        v11.2.0
        v11.3.0
        v11.4.0
        v11.5.0
        v11.6.0
        v11.7.0
        v11.8.0
        v11.9.0
       v11.10.0
       v11.10.1
       v11.11.0
       v11.12.0
       v11.13.0
       v11.14.0
       v11.15.0
        v12.0.0
        v12.1.0
        v12.2.0
        v12.3.0
        v12.3.1
        v12.4.0
        v12.5.0
        v12.6.0
```
– Cài đặt các phiên bản NodeJS, phiên bản được cài đặt đầu tiên sẽ được thiết lập làm mặc định. Phiên bản được cài đặt cuối cùng (gần nhất) sẽ được thiết lập sử dụng.
```
# nvm install v10.16.0
Now using node v10.16.0 (npm v5.5.1)
```
```
# nvm install v11.0.0
Now using node v11.0.0 (npm v5.5.1)
```
– Gỡ phiển bản NodeJS đã cài đặt (đảm bảo phiên bản đó không đang được sử dụng và không mặc định), ví dụ v10.16.0
```
# nvm uninstall v10.16.0
```
– Liệt kê các phiên bản NodeJS đã cài đặt
```
# nvm list
```
Có thể thấy phiên bản v10.16.0 là phiên bản đang được sử dụng.
```
->     v10.16.0
default -> v10.16.0
node -> stable (-> v10.16.0) (default)
stable -> 10.16 (-> v10.16.0) (default)
iojs -> N/A (default)
unstable -> N/A (default)
lts/* -> lts/dubnium (-> v10.16.0)
lts/argon -> v4.9.1 (-> N/A)

lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.16.0 (-> N/A)
lts/dubnium -> v10.16.0
```
– Thay đổi phiên bản đang được sử dụng, ví dụ v8.9.3
```
# nvm use v8.9.3
```
– Thay đổi phiên bản mặc định, ví dụ v11.10.0
```
# nvm alias default v11.10.0
default -> v11.10.0
```
– Kiểm tra lại phiên bản NodeJS
```
# node --version
v11.10.0
# which node
/root/.nvm/versions/node/v11.10.0/bin/node
```
#### 5.  Sử dụng Node
Để xem hướng dẫn sử dụng Node (bằng tiếng Anh). Bạn có thể mở terminal lên và gõ lệnh node --help.
```
# node --help
```
Bạn có thể dùng bất cứ trình editor nào để viết code đều được. Dĩ nhiên là chúng ta nên dùng những editor có chức năng hiển thị code (tức là có thể in màu những từ khóa như Visual Studio Code, Sublime Text...) để làm việc cho dễ.

Ví dụ:

index.js
```
var fs = require('fs');
var files = fs.readdirSync('.');
for (fn in files) {
    console.log(files[fn]);
}
```
Chúng ta tạo một file có tên index.js với đoạn code như trên, bạn có thể đặt ở đâu cũng được, tốt nhất là nên tạo thư mục riêng để đặt cho dễ quản lý. Tiếp theo chúng ta chạy file đó bằng cách gõ lệnh:
```
# node /path_to_file/index.js /home/
Desktop
Documents
Downloads
Music
Pictures
```
Đoạn code trên làm công việc liệt kê danh sách các file và thư mục của thư mục hiện tại, tức là thư mục chứa file index.js, nếu bạn đã từng dùng các hệ điều hành Unix thì bạn cũng biết là lệnh ls là lệnh có chức năng tương tự có trong các hệ điều hành đó cho nên mình mới đặt là index.js.

Chúng ta sẽ tìm hiểu chi tiết chức năng của từng dòng code ở các bài sau. Bây giờ chúng ta sẽ tìm hiểu cách truyền tham số vào khi chạy. Đoạn code trên sửa lại như sau:

index.js
```
var fs = require('fs');
var dir = '.';
if (process.argv[2])
    dir = process.argv[2];
var files = fs.readdirSync(dir);
for (fn in files) {
    console.log(files[fn]);
}
```
Khi chạy chúng ta có thể thêm tham số là đường dẫn một thư mục bất kì vào sau tên file. Ví dụ:
```
# node /path_to_file/index.js /home/
```
#### 6.  Tạo web server
Vì Node được phát minh để làm web nên hầu hết chúng ta sẽ viết web server rất nhiều trong suốt series này. Ở đây chúng ta sẽ viết một đoạn code nhỏ để kiểm tra thử:

app.js
```
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello, World\n');
}).listen(8124, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8124');
```
Chúng ta tạo một file có tên app.js và viết đoạn code trên vào. Sau đó chạy:
```
# node /path_to_file/app.js
Server running at http://127.0.0.1:8124
```
Đây chỉ là một đoạn code đơn giản, chúng ta sẽ tìm hiểu thêm sau. Sau khi đã chạy thì chúng ta có thể mở trình duyệt lên và trỏ đến 127.0.0.1:8124 hoặc localhost:8124 để xem chuỗi trả về của server.
![](https://images.viblo.asia/b08cd18a-2f60-485f-be63-107db88cd59b.jpg)
Bạn cũng lưu ý là đoạn code trên sẽ chạy vô thời hạn cho đến khi chúng ta ngắt chương trình (như bấm Ctrl+C trong terminal) chứ không giống như các đoạn code trước là chạy xong thì kết thúc.
#### 7. Phần mềm quản lý gói – npm
Bản thân Node không có gì đặc sắc, chỉ là một trình biên dịch JavaScript với một vài thư viện nhập xuất bất đồng bộ. Lý do Node phát triển mạnh là vì nó là mã nguồn mở, đặc trưng của mã nguồn mở là cộng đồng hỗ trợ rất lớn, có rất nhiều coder ngoài viết thư viện hỗ trợ cho Node. Bản thân Node có một phần mềm quản lý các gói thư viện này đó là npm. Chúng ta có thể tải các gói thư viện về và sử dụng ngay một cách dễ dàng với npm.

Ở các phiên bản cũ thì chúng ta phải cài npm riêng khi cài Node, còn đối với các phiên bản mới thì khi chúng ta cài Node thì npm cũng đã được cài sẵn rồi.

Chúng ta sẽ thử cài gói hexy với npm, đây là một công cụ cho phép xem địa chỉ bộ nhớ của từng byte trong một file dưới dạng số hệ 16. Để cài một gói thì chúng ta chạy lệnh npm install [tùy chọn] <tên gói>:
```
# npm install -g hexy
```
Tùy chọn -g cho biết gói này được cài đặt toàn cục (globally), tức là ai cũng có thể dùng.
Sau đó chúng ta chạy thử gói này, ví dụ:
```
# hexy /path_to_file/index.js
00000000: 636f 6e73 6f6c 652e 6c6f 6728 7072 6f63 console.log(proc
00000010: 6573 732e 6172 6776 5b30 5d29 3b0d 0a63 ess.argv[0]);..c
00000020: 6f6e 736f 6c65 2e6c 6f67 2870 726f 6365 onsole.log(proce
00000030: 7373 2e61 7267 765b 315d 293b 0d0a 7661 ss.argv[1]);..va
00000040: 7220 6673 203d 2072 6571 7569 7265 2827 r.fs.=.require('
00000050: 6673 2729 3b0d 0a76 6172 2064 6972 203d fs');..var.dir.=
00000060: 2027 2e27 3b0d 0a69 6620 2870 726f 6365 .'.';..if.(proce
00000070: 7373 2e61 7267 765b 325d 290d 0a20 2020 ss.argv[2]).....
00000080: 2064 6972 203d 2070 726f 6365 7373 2e61 .dir.=.process.a
00000090: 7267 765b 325d 3b0d 0a76 6172 2066 696c rgv[2];..var.fil
000000a0: 6573 203d 2066 732e 7265 6164 6469 7253 es.=.fs.readdirS
000000b0: 796e 6328 6469 7229 3b0d 0a66 6f72 2028 ync(dir);..for.(
000000c0: 666e 2069 6e20 6669 6c65 7329 207b 0d0a fn.in.files).{..
000000d0: 2020 2020 2f2f 636f 6e73 6f6c 652e 6c6f ....//console.lo
000000e0: 6728 6669 6c65 735b 666e 5d29 3b0d 0a7d g(files[fn]);..}
000000f0: 0d0a ..
```
Nếu máy của bạn in ra mấy dòng tương tự như trên thì gói hexy đã được cài đặt thành công.
> Trên đây là hướng dẫn cài đặt NodeJS theo 4 cách trên CentOS/Ubuntu cũng như cách chạy một chương trình Node JS đơn giản. Mong rằng bài viết sẽ giúp ích được các bạn trong việc tìm hiểu Node JS. Bài tiếp theo mình sẽ giới thiệu với các bạn về Module trong Node JS và cách sử dụng.