### Mở đầu
&nbsp;&nbsp;&nbsp;&nbsp; Khi làm việc nhiều với javascript chắc hẳn các bạn cũng đã từng dùng lệnh `npm install`, `npm update`, `npm install bootstrap` ... Nhưng đôi khi chúng ta chỉ biết gõ lệnh mà chưa hiểu thực sự nó là gì, làm cái gì, hỗ trợ mình ra sao. Hôm nay mình sẽ giới thiệu cho các bạn về npm, một công cụ quản lý các package của javascript. Bài viết này sẽ giúp bạn có cái nhìn tổng quan về các công cụ quản lý thư viện lập trình.

### Giới thiệu
&nbsp;&nbsp;&nbsp;&nbsp; NPM viết tắt của từ Node Package Manager là một công cụ tạo và quản lý các thư viện javascript cho Nodejs. Những ai làm việc với javascript chắc hẳn ít nhiều cũng đã từng nghe về nó. 
<br>
NPM cung cấp 2 chức năng chính bao gồm:
- Là kho lưu trữ trực tuyến cho các package/module. Chúng ta có thể tìm kiếm các package trên search.nodejs.org.
- Quản lý các module javascript và phiên bản của chúng trong các dự án của chúng ta đơn giản hơn, dễ dàng hơn, tiết kiệm thời gian hơn. 
### Chi tiết
&nbsp;&nbsp;&nbsp;&nbsp; Trong các dự án với javascript thì chắc hẳn các bạn sẽ cần nhiều thư viện của javascript. Điển hình như jquery, bootstrap, express, vue, react,... thì việc quản lý các thư viện này như thế nào, dùng phiên bản bao nhiêu, cần require thêm những module gì. Những công việc này nếu làm thủ công thì quả là mất tay, đặc biệt là những dự án lớn. <br>
Ví dụ cho dễ hiểu: Chúng ta sẽ cài thử expressjs với `npm install express` xem chúng ta sẽ có gì
Chúng ta sẽ mở file package.json:
```json
  "dependencies": {
    "express": "^4.16.4"
  }

```
&nbsp;&nbsp;&nbsp;&nbsp;Nó sẽ thêm một dependencies với tên express và phiên bản cho chúng ta. Tưởng chừng chỉ đơn giản thế thôi nhưng hãy đọc tiếp file package-lock.json 
Nhìn qua cái file này có vẻ phức tạp, tạm thời bỏ qua những cái râu ria kia đi, chúng ta tập trung vào phần sau:
```json
"express": {
      "version": "4.16.4",
      "resolved": "https://registry.npmjs.org/express/-/express-4.16.4.tgz",
      "integrity": "sha512-j12Uuyb4FMrd/qQAm6uCHAkPtO8FDTRJZBDd5D2KOL2eLaz1yUNdUB/NOIyq0iU4q4cFarsUCrnFDPBcnksuOg==",
      "requires": {
        "accepts": "~1.3.5",
        "array-flatten": "1.1.1",
        "body-parser": "1.18.3",
        "content-disposition": "0.5.2",
        "content-type": "~1.0.4",
        "cookie": "0.3.1",
        "cookie-signature": "1.0.6",
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "finalhandler": "1.1.1",
        "fresh": "0.5.2",
        "merge-descriptors": "1.0.1",
        "methods": "~1.1.2",
        "on-finished": "~2.3.0",
        "parseurl": "~1.3.2",
        "path-to-regexp": "0.1.7",
        "proxy-addr": "~2.0.4",
        "qs": "6.5.2",
        "range-parser": "~1.2.0",
        "safe-buffer": "5.1.2",
        "send": "0.16.2",
        "serve-static": "1.13.2",
        "setprototypeof": "1.1.0",
        "statuses": "~1.4.0",
        "type-is": "~1.6.16",
        "utils-merge": "1.0.1",
        "vary": "~1.1.2"
      }
    },

```
Đọc những đoạn này bạn có thể thấy những thông tin sau:
- Phiên bản của express:  4.16.4
- Link chứa: https://registry.npmjs.org/express/-/express-4.16.4.tgz
- Mã code.
- require những module cần thiết. Nhìn qua xem nào, cũng kha khá module cần thiết ấy nhỉ =))

&nbsp;&nbsp;&nbsp;&nbsp;Đếm qua có 30 cái module cần thiết để chạy đc cái express.  Khá nhọc nhằn nhỉ :D 
Các bản thử tưởng tượng nếu ta dùng thủ công thì ta phải cài 30 cái module từng cái một thì chúng ta cũng mất kha khá thời gian ấy nhỉ. <br>
&nbsp;&nbsp;&nbsp;&nbsp;Đó là về module cần thiết. Một trong những thứ quan trọng nữa là version của module nữa. Thực tế khi bạn làm một dự án thì việc project chạy ở một phiên bản này nhưng phiên bản sau lại không chạy được nó là chuyện bình thường. Vì vậy ngoài những module cần thiết thì chúng ta nên chú ý đến phiên bản của các module nữa. <br>
&nbsp;&nbsp;&nbsp;&nbsp; Khi ta dùng lệnh `npm install` hay `npm install xxx` trong đó xxx là tên package bạn cần install. Lúc này npm sẽ tìm module đó và lấy phiên bản mới nhất để cài cho chúng ta (Nếu chưa có phiên bản được ghi lại trong package.json). Nếu như bạn join vào một dự án mà đã được xây dựng từ trước, đã có sẵn những module và phiên bản của nó được ghi lại vào file package.json thì khi ta chạy `npm install` thì nó sẽ đọc tên module và phiên bản của nó để nó tải về những module cần thiết cho chúng ta. <br>
&nbsp;&nbsp;&nbsp;&nbsp; Chính vì những lí do như trên, để dễ dàng hơn trong việc quản lý các package và phiên bản của nó thì npm ra đời để giải quyết vấn đề này. File `package.json` sẽ lưu trữ xem project của chúng ta cần sử dụng những module nào, version của nó là bao nhiêu. Chi tiết của nó sẽ được lưu trữ tại `package-lock.json` bao gồm phiên bản, nơi lưu trữ, những module cần thiết để chạy module mình cần chạy =))
<br>

Đôi khi chúng ta xem trên mạng có cái module hay hay, ta cần dùng vào project của mình. Điển hình như:
```bash
npm install toastr -g
npm install axios --save
npm install cross-env --save-dev
```
Giải thích: <br>
- Với `-g` tức là ta sẽ install trên global. Nó sẽ được lưu tại `usr/local/lib`
Bạn có thể kiểm tra các package này với lệnh 
```bash
npm list -g
```
- Với --save thì ta sẽ lưu trên local. Và việc quản lý này sẽ được theo dõi tại file là `package.json`. Và khi tải thì nó sẽ được lưu trữ tại thư mục `node_modules` trong project của chúng ta.
Khi đó trong file này sẽ xuất hiện:
```json
"dependencies": {
     "axios": "^0.18",
  }
```
- Còn với --save-dev thì sao:
Chúng ta hãy cùng thử lệnh này nhé:
```bash
npm install cross-env --save-dev
```
Khi cài xong ta vào file package.json sẽ thấy:
```json
 "devDependencies": {
      "cross-env": "^5.1",
 }
```
&nbsp;&nbsp;&nbsp;&nbsp; Điều này có ý nghĩa gì? :v <br>
&nbsp;&nbsp;&nbsp;&nbsp; Đọc qua cái tên chắc cũng có thể hiểu ngay được là những dependencies được dùng trong quá trình phát triển. Như vậy có nghĩa là các package này sẽ chỉ được dùng trong quá trình phát triển mà thôi. Còn với dependencies thì sẽ được dùng cả trên production.<br>
Đi sâu hơn một chút nữa nào: <br>

Cùng nhìn lại ví dụ này nhé.
```json
  "dependencies": {
    "express": "^4.16.4"
  }

```
&nbsp;&nbsp;&nbsp;&nbsp;Các bạn để ý dấu mũi tên `^` bên cạnh phiên bản của module. Dấu này có nghĩa là khi install thì npm sẽ install phiên bản mới nhất của module đó mà nó có thể tìm thấy cho chúng ta. còn dấu `~` thì là phiên bản tương tự. 
### Kết Luận
&nbsp;&nbsp;&nbsp;&nbsp; Như vậy npm giúp chúng ta quản lý các thư viện javascript đơn giản hơn, dễ dàng hơn, nhanh chóng hơn, giúp chúng ta tiết kiệm được rất nhiều thời gian trong việc xây dựng nền móng của dự án. Giúp chúng ta tập trung trong việc phát triển những phần chính của dự án. Qua đây các bạn có thể hiểu rõ hơn về npm là gì và hoạt động như thế nào. Hiện nay đang có một công cụ khác tương tự như npm nhưng mạnh hơn npm. Đó là `yarn`. Trong bài viết sau mình sẽ giới thiệu cho các bạn về `yarn` và để xem yarn mạnh hơn npm như thế nào nhé. Cảm ơn bạn đã theo dõi bài viết của mình.