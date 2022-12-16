Chào các bạn! <br/>
Mình lại đến cùng với Node.js để giới thiệu tiếp cho các bạn những khía cạnh tiếp theo của anh bạn này đây.<br/>
Lần này, chúng ta cùng tìm hiểu về buffer, stream và cách sử dụng cơ bản nhé. <br/>
# 1. Tìm hiểu về Buffer và Stream:
Buffer là một vùng dự trữ tạm thời chứa các dữ liệu đang được chuyển từ nơi này đến nơi khác. Buffer có kích thước xác định và giới hạn. Kích thước của buffer được xác định bằng những thuật toán cho từng trường hợp cụ thể. Buffer là một kỹ thuật được phát triển nhằm ngăn chặn sự tắc nghẽn dữ liệu khi truyền từ nơi này đến nơi khác. <br/>
Stream là một chuỗi dữ liệu sẵn có qua thời gian, hay có thể hình dung stream là một đối tượng chứa dữ liệu sẽ được truyền đi từ nơi này đến nơi khác. <br/>
Trong thực tế, khi chúng ta xem một đoạn phim trên mạng. Nếu đường truyền mạng chúng ta đủ nhanh thì tốc độ stream video sẽ kịp thời làm đầy các buffer (vùng nhớ tạm thời trên RAM) và đoạn dữ liệu này sẽ được gửi đến trình media player để chạy đoạn dữ liệu vừa được làm đầy trong buffer. Trong lúc phát nội dung đó, buffer sẽ trống và lại được làm đầy. Cứ như vậy cho đến khi kết thúc stream.<br/>
Nhưng mọi chuyện không dễ dàng như vậy, đôi khi xem phim chúng ta hay gặp các thông báo như loading, hay buffering...Tại sao lại như vậy? Chuyện này xảy ra khi đường truyền mạng của chúng ta chậm, tốc độc stream không đủ nhanh để kịp thời làm đầy các buffer. Khi các buffer chưa đầy nó sẽ không gửi dữ liệu đến media player để xử lý. Và trong thời gian chờ làm đầy buffer, dòng loading, hay buffering... sẽ xuất hiện. Khi buffer được làm đầy, dữ liệu sẽ được gửi đến media player để xử lý. Trong lúc, media player phát dữ liệu được gửi đến, buffer lại đang được làm đầy. Khi media player chạy xong đoạn dữ liệu được gửi đến, nhưng buffer chưa được làm đầy thì dòng chữ loading, hay buffering...sẽ lại xuất hiện. Và chúng ta lại phải chờ đợi buffer được làm đầy.<br/>
Hy vọng đến đây các bạn có thể phần nào hiểu hơn về buffer và stream.
# 2. Làm việc với Buffer trong Node.js:
Buffer là một class trong Node.js API dùng để giao tiếp với các dữ liệu nhị phân. Buffer class đã được khai báo trong phạm vi global trong các phiên bản Node.js sau này, nên chúng ta không cần phải require('buffer') để sử dụng. 
Một vài thao tác với buffer được minh họa dưới đây:
```
const buf1 = Buffer.alloc(10); //Tạo một Buffer với kích thước là 10.
buf1.write("Hello Nodejs Buffer"); //Ghi dữ liệu vào buffer. Kết quả của buf1 là "Hello Node", vì buf1 chỉ có kích thước là 10.
const buf2 = Buffer.from("Welcome to Buffer"); //Tạo buffer từ nội dung nào đó. Mặc định, bảng mã xử lý sẽ là utf8 khi chúng ta không chỉ rõ bảng mã.
const buf3 = Buffer.from("Welcome to Buffer", "ascii"); //Tạo buffer từ nội dung với bảng mã xử lý là ascii
console.log(buf2.toString()); //Để đọc được dữ liệu buffer chúng ta chuyển về dạng string sử dụng hàm toString() với encoding mặc định là utf8
// kết quả là: Welcome to Buffer
console.log(buf2.toString("hex")); //đọc nội dung của buf2 với bảng mã hex --> kết quả: 57656c636f6d6520746f20427566666572
console.log(buf2.length); //độ dài của buf2 --> kết quả: 17
```
Ngoài ra, các bạn có thể tham khảo thêm về cách sử dụng Buffer tại trang chủ [Node.js](https://nodejs.org)
# 3. Làm việc với Stream trong Node.js:
Stream là một lớp trừu tượng (abstract interface) để làm việc với luồng dữ liệu (stream data) trong Node.js. Có rất nhiều đối tượng kế thừa từ lớp Stream trong Node.js chẳng hạn như một request đến một máy chủ HTTP, hay việc đọc, ghi file... Các đối tượng Stream này đều có khả năng hoặc đọc, hoặc ghi, hoặc cả hai. Và tất cả Stream đều kế thừa EventEmitter.<br/>
Không giống như Buffer, để sử dụng được lớp Stream, chúng ta phải require nó.<br/>
Để minh họa, tôi tạo file readme.txt với nội dung bất kỳ, có kích thước là 64379 bytes, và app.js cùng cấp với nội dung như sau:
```
app.js

var fs = require('fs'); //là một đối tượng kế thừa lớp Stream
var fsReadable = fs.createReadStream(__dirname + "/readme.txt"); //tạo luồng dữ liệu đọc được từ file readme.txt
fsReadable.on("data", function(chunk) {
     console.log(chunk.length);
}); //vì fsReadable là một instance của fs,và mọi stream đều là một thể hiện của EventEmitter nên nó có thể sử dụng các phương thức của EventEmitter.
// kết quả là 64379 bytes đúng bằng kích thước của file readme.txt

var fsReadable2 = fs.createReadStream(__dirname + "/readme.txt", {
    enconding: "utf8",
    highWaterMark: 32 * 1024
}); //với các tùy chọn trong createReadStream như bộ mã hóa (encoding), highWaterMark để xử lý dữ liệu trên từng mảnh có kích thước xác định
// ở đây kích thước xử lý trên từng mảnh là 32 kb.
fsReadable2.on("data", function(chunk) {
     console.log(chunk.length);
}); //Cho ra kết quả là: 32768 31611 --> một mảnh dữ liệu tối đa được xử lý là 32kb.

var fsWritable = fs.createWriteStream(__dirname + "/readmecopy.txt"); //tạo luồng dữ liệu có thể ghi được, đích là file readmecopy.txt
fsReadable2.on("data", function(chunk) {
    fsWritable.write(chunk);
}); //thực hiện ghi (sao chép) từng mảnh dữ liệu từ file readme.txt vào file readmecopy.txt.
```
Ngoài ra, các bạn có thể tham khảo thêm về cách sử dụng Stream tại trang chủ [Node.js](https://nodejs.org) <br/>
Trên đây chỉ là một vài cách sử dụng cơ bản của Buffer và Stream trong Node.js. Trong các bài sau mình sẽ tiếp tục giới thiệu thêm về Node.js và có các bài minh họa để thêm về Buffer và Stream. <br/>
Bài viết không thể tránh khỏi sự thiếu xót, mong nhận được sự góp ý của các bạn để bài viết hoàn thiện hơn.<br/>
Cảm ơn các bạn đã theo dõi bài viết.<br/>
*Nguồn tham khảo: Nodejs.org*