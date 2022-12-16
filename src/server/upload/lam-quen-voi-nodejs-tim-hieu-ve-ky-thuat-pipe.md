Chào các bạn!<br>
Nhân dịp lễ nô-en, chúc các bạn có những phút giây hạnh phúc bên người thân và gia đình.<br>
Nối tiếp trong loạt bài giới thiệu về Node.js, trong bài viết này mình sẽ giới thiệu về kỹ thuật pipe của anh bạn này nha.<br>
# 1. Các loại stream trong Node.js:
Trong bài trước, mình đã giới thiệu với các bạn về stream. Trong bài viết này mình sẽ giới thiệu về các loại stream trong Node.js.<br>
Trước hết, tại sao chúng ta cần sử dụng stream? Về cơ bản stream mang lại 2 lợi ích chính so với các phương pháp xử lý dữ liệu khác, đó là: Sử dụng bộ nhớ và thời gian xử lý hiệu quả. Các lợi ích này được thể hiện qua việc chúng ta không cần phải truyền tải toàn bộ data trước khi thực thi chúng mà có thể thực thi chúng lần lượt cho đến khi toàn bộ data được tải hết.<br>
Vậy có bao nhiêu loại stream mà chúng ta có thể sử dụng? Về cơ bản, có thể tổng hợp lại thành 4 loại cơ bản như sau:
+ Writable stream: là loại stream có thể ghi dữ liệu;
+ Readable stream: là loại stream mà có thể đọc nội dung từ dữ liệu sẵn có;
+ Duplex stream: là loại stream có đặc tính của cả Writable và Readable stream;
+ Tranform stream: là loại stream có thể chỉnh sửa hoặc biến đổi kiểu dữ liệu trong lúc dữ liệu được đọc hoặc ghi. Chẳng hạn như việc, chúng ta có thể nén dữ liệu trong lúc ghi file và đọc dữ liệu trong lúc được giải nén từ file. <br>

Trong quá trình làm việc với Node.js, chúng ta có thể bắt gặp các loại stream này xuất hiện nhiều như: các request là readable stream, các response là writable stream; sử dụng fs module để xử lý đọc/ghi file (duplex stream) và hầu hết các loại kết nối trong Node.js đều dựa trên Node.js stream.
# 2. Kỹ thuật pipe trong Node.js là gì?
Về cơ bản kỹ thuật là một phương thức của stream, là cơ chế kết nối 2 stream với nhau, đầu ra của stream này được nối với đầu vào của stream khác. Trong Node.js, pipe sẽ nối từ một readable stream sang một writable stream.<br>
Vậy sử dụng kỹ thuật pipe có ưu điểm gì? Khi chúng ta đọc và ghi file, thông thường tốc độ ghi file sẽ chậm hơn tốc độ đọc file, khi server liên tục đẩy dữ liệu về buffer với tốc độ không tương xứng như vậy có thể làm cho buffer bị tràn và không nhận thêm được dữ liệu nữa. Bằng việc sử dụng kỹ thuật pipe, hiện tượng tràn buffer sẽ được khắc phục. Khi sử dụng pipe để đọc và ghi file trên một luồng stream thì phương thức pipe sẽ quản lý luồng stream và sẽ biết được khi nào luồng ghi bị đầy và sẽ dừng luồng đọc lại, cho đến khi luồng ghi được xử lý sẽ tiếp tục luồng đọc. Quá trình có thể được lặp đi lặp lại nhiều lần cho đến khi luồng dữ liệu được truyền xong. 

# 3. Các ví dụ minh họa:
Ban đầu mình tạo 2 file là *app.js* và *readme.txt* cùng cấp. File *app.js* dùng để chứa code xử lý và *readme.txt* là file có nội dung bất kỳ được dùng làm file nguồn khi sử dụng kỹ thuật pipe.<br>
Đầu tiên, mình sẽ thực hiện kỹ thuật pipe để copy nội dung của file *readme.txt* sang file mới có tên là *readmeCopy.txt*. Code minh họa như sau:<br>
```
app.js

var fs = require('fs');
var readable = fs.createReadStream(__dirname + "/readme.txt", {
    encoding: "utf8",
    highWaterMark: 2 * 1024
});

var writable = fs.createWriteStream(__dirname + "/readmeCopy.txt");

readable.pipe(writable); //sử dụng kỹ thuật pipe
```
Ở đây, mình tạo ra readable stream đọc nội dung từ file *readme.txt*, mình tạo ra writable stream để ghi nội dung vào file *readmeCopy.txt*. Bằng cách sử dụng kỹ thuật pipe, để nối readable stream với writable stream thì nội dung của file nguồn (trong readable stream) sẽ được truyền sang file đích (trong writable stream). Mở terminal lên và thực thi dòng lệnh *node app.js*. Các bạn sẽ thấy file *readmeCopy.txt* được tạo ra (cùng cấp) có nội dung hoàn toàn giống với file *readme.txt*. <br>
Nâng cao hơn, chúng ta có thể sử dụng kỹ thuật pipe để nối nhiều readable stream với writable stream lại với nhau. Trong ví dụ tiếp theo mình sẽ thực hiện vừa copy nội dung từ file *readme.txt*, vừa nén file này sang file mới có tên là *readme.txt.gz*. Code minh họa như sau: <br>
```
app.js

var fs = require('fs');
var zlib = require('zlib');

var readable = fs.createReadStream(__dirname + "/readme.txt", {
    encoding: "utf8",
    highWaterMark: 2 * 1024
});

// var writable = fs.createWriteStream(__dirname + "/readmeCopy.txt");
var compress = fs.createWriteStream(__dirname + "/readme.txt.gz");

var gzip = zlib.createGzip();

// sao chép file
 // readable.pipe(writable);

// nén file
readable.pipe(gzip).pipe(compress);
```
Ở đây, mình sử dụng thư viện zlib sẵn có trong Node.js để xử lý nén stream. Đồng thời, mình tạo một writable stream mới có tên là compress với file đích là *readme.txt.gz*, một luồng xử lý với tên là *gzip* để thực hiện nén dữ liệu trước khi ghi vào file đích. Bằng cách nối readable stream đọc nội từ file nguồn đến luồng nén *gzip* trước khi được ghi vào file đích *readme.txt.gz*. Mở terminal lên thực hiện lệnh: *node app.js*. Các bạn sẽ thấy file *readme.txt.gz* được tạo ra cùng cấp, và có dung lượng nhỏ hơn file nguồn. Và trong file này chứa file có nội dung hoàn toàn giống với file đích.

# 4. Lời kết:
Trên đây là những kiến thức bổ sung cho stream và những ví dụ minh họa cơ bản khi sử dụng kỹ thuật pipe trong node.js. Bằng cách vận dụng linh hoạt kỹ thuật pipe ghép nối nhiều readable và writable stream lại với nhau sẽ giúp chúng ta có thêm nhiều phương pháp xử lý cho từng yêu cầu cụ thể trong thực tế.<br>
Hy vọng bài viết sẽ giúp các bạn hiểu được phần nào đó về stream và kỹ thuật pipe trong Node.js. <br>
Bài viết không thể tránh khỏi những sai xót, mong nhận được góp ý của các bạn để bài viết được hoàn thiện hơn. Cảm ơn các bạn. <br>

*Nguồn tham khảo: * 
 + node.js: https://nodejs.org/en/docs/
 + nodesource: https://nodesource.com/blog/understanding-streams-in-nodejs/
 + riptutorial: https://riptutorial.com/node-js/example/20737/piping-streams
 + riptutorial: https://riptutorial.com/node-js/example/10098/copying-files-by-piping-streams