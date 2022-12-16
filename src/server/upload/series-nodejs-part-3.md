# Hoạt động của server
- Như chũng ta đã biết cách thức hoạt động giữa client và server. Khi client gửi request (request + request header) lên server thì server sẽ trả về response (response data + response header) cho client.
- Client sẽ thông qua 1 cổng giao thức (protoclos) để kết nối với server.
# Create server với HTTP
Ở trên chung ta có nói tới `Khi client gửi request (request + request header) lên server thì server sẽ trả về response (response data + response header) cho client`
`request header` là nhưng phần nội dung thông tin mà người dùng không nhìn thấy được (Content-Type, Status,...)
1.  Tạo 1 file server.js
2.  Import module http để khởi tạo server
      `var http = require('http')`
3. Khởi tạo server
      ```
      var server = http.createServer(function(req, res){
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Done')
      });
      ```
      - Tạo server với http.createServer.
      
      - Response trả về với response header: status = 200 và Content-Type là text/plain
      
      - Trả về response header và body `res.end('Done')`
  4. Khởi động HTTP server để lắng nghe các kết nối
      `server.listen(3000, 'localhost')`
      - localhost mặc định 127.0.0.1
  5. chạy file server.js
     `node server`
     
  7. mở browser và kiểm tra
      ![](https://images.viblo.asia/dfe9dd0a-6a80-4aef-b0bc-dd990f4eb2de.png)
      
# Buffer và Stream
`Buffer` là điểm hông gian lưu giữ tạm và chứa những data nhỏ, sau đó sẽ chuyển tới 1 nơi khác khi đầy. Và khi chuyển các data nhỏ nó sẽ dẫn đến performance rất là cao khi mà nó có thể chuyển các data trong cùng 1 thời gian. Đó là điểm mạnh tại sao NodeJs có thể real time.


Hãy tưởng tượng ta có 1 dữ liệu rất lớn. Và chúng ta cắt nhỏ chúng ra đưa vào buffer và khi buffer đầy thì nó sẽ được chuyển đi.

Stream là collection của data. Tất cả mọi thứ không cùng tồn tại ở 1 thời điểm và nó không lưu tất cả cùng 1 lúc trong bộ nhớ. Nó là tạo ra các luồng để chuyển đổi các dữ liệu

Dễ hiểu hơn và Buffer và Stream là: 

Khi chúng ta di chuyển dữ liệu từ A -> B. với khối dữ liệu A rất lớn. Và để di chuyển nhanh hơn chúng ta cần chia nhỏ dữ liệu A ra. Hay khi chúng ta xem 1 đoạn video trực tuyến thì có 2 cách để tải dữ liệu từ đoạn video:
- Tải toàn độ video rồi mới chạy
- Tải từng phần nhỏ vầ chạy từng phần nhỏ đó.
Giả sử video có dung lượng lớn, lúc đó người xem cần phải đợi 1 thời gian rất lâu để tải toàn bộ video rồi mới xem được. Thì với Buffer người xem có thể xem ngay nội dung video khi được chia nhỏ từng phần, và khi tốc độ tải video nhanh hơn tốc độ xem video thì người xem sẽ xem 1 cách liên tục mà ko bị giật lag.
Thì cách thứ 2 được gọi là buffer.

Thử làm 1 chút ví dụ để hiểu rõ hơn về buffer and stream nhé

Ở bài 2 mình có làm về write and read file với module fs. Bây giờ mình hãy tạo 1 file với nội dung lớn hơn bằng stream xem tốc độ của 2 cách như thế nào nhé?

```
const fs = require('fs');

then = new Date

for(let i=0; i<= 10000; i++) {
  var contentText =  fs.writeFileSync('text.txt', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n'); // đọc file đồng bộ
}
now = new Date
console.log('Benchmark Write file (ms):', now - then)

const file = fs.createWriteStream('./README.md');
thenStream = new Date
for(let i=0; i<= 10000; i++) {
  file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
}
file.end();

nowStream = new Date
console.log('Benchmark Stream write file (ms):', nowStream - thenStream)
```


và kết quả có được là 
```
Benchmark Write file (ms): 11619
Benchmark Stream write file (ms): 20
```

Buffer hình thành như thế nào:
```
`const streamFile = fs.createReadStream('./README.md', {encoding: 'utf-8'});`

đọc luồng stream

`streamFile.on('data', function(chunk){**
  console.log(chunk);
})`
```
![](https://images.viblo.asia/3a4b3d91-60d8-4da8-b260-acff2ef004d9.png)


**Các loại Stream**

Có 4 loại luồng:

1. **Readable**:  sử dụng cho hoạt động đọc
2. **Writeable**: sử dụng cho thao tác ghi
3. **Duplex**: sử dụng cho cả đọc và ghi
4. **Transform**: luồng song song trong đó đầu ra được tính toàn dựa trên đầu vào

**Event Stream**
1. **Data**: khi có data để đọc
2. **End**: khi không còn dữ liệu để đọc
3. **Error**: khi nhận được 1 lỗi trả về
4. **Finish**: khi tất cả dữ liệu được chuyển sang hệ thống cơ bản

### ***Write file với stream***
  ```
    const fs = require('fs');

    const writeStream = fs.createWriteStream('text.txt', 'utf8');

    writeStream.write("This is test write stream!");

    writeStream.end();

    writeStream.on('finish', function(){
      console.log('Write completed!');
    })

    writeStream.on('error', function(err){
      console.log(err.stack)
    })

    #output: 
    Write completed!
  ```

1. Khai báo module fs
2. Khởi tạo 1 luồng đọc file, với encode: utf-8
3. Ghi file
4. Đánh dấu kết thúc file
5. khi kết thúc luồng hiển thị thông báo
6. Khi quá trình ghi file xảy ra lỗi sẽ hiển thị lỗi


### ***Đọc file với stream***

Mình sẽ đọc file text.txt mới tạo ra
```
const fs = require('fs');
const readStream = fs.createReadStream('text.txt', 'utf8');
var data = '';
readStream.on('data', function(chunk){
  data += chunk;
})

readStream.on('end',function() {
  console.log(data);
});

readStream.on('error', function(err) {
  console.log(err.stack);
});

# output:
This is test write stream!
```

1.  Import module
2.  Khởi tạo 1 luồng đọc file với encode: utf-8
3.  Tạo biến data để ghi
4.  Đọc data với event data
5.  Hiển thị kết quả đọc với event end
6.  Hiển thị khi xảy ra lõi

### ***Piping với stream***

Hiểu đơn giản từ 1 luồng đọc nó sẽ chuyển qua luồng ghi. Tức là coi 2 luồng là 1 cái ống, dữ liệu là nước,
Vậy làm sao để cho nước chảy từ ống 1 => ống 2 được. 
Đóng vai là 1 người thợ sửa ống nước. Chúng ta sẽ phải có 1 đoạn nối 2 ống đó lại. Đó gọi là pipe

Kỹ thuật pipe là lấy kết quả từ luồng trước, cho vào luồng sau.
Nó sẽ tránh bị tràn data ngược. Vì như ta biết ghi dữ liệu bao giờ cũng chậm hơn đọc dữ liệu. Dẫn đến việc dữ liệu sẽ bị tràn và server sẽ không biết được.

```
const http = require('http');

var server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'})
  const readStream = fs.createReadStream('text.txt', 'utf8');
  const writeStream = fs.createWriteStream('output.txt', 'utf8');
  readStream.pipe(writeStream);
  readStream.pipe(res)
});

server.listen(3000, 'localhost')

```
![](https://images.viblo.asia/38a0e5aa-eb5f-43f2-90ef-2073ffa33b02.png)
` readStream.pipe(writeStream);` đọc xong dữ liệu -> ghi vào file output.txt

`readStream.pipe(res)` hiển thị dữ liệu

Dễ hiểu đúng không các bạn ^^

### ***Chaining với stream***
Sâu chuỗi các pipe với nhau.

Thử  làm 1 ví dụ đọc đọc file -> nén file ->  ghi file -> giải nén file xem sao nhé

- Đầu tiên phải import 2 module file và zip file  là fz và zlib
    ```
    const fz = require('fz');
    const zlib = require('zlib');
    ```

- Đọc file, ghi file, nén file, giải nén

    ```
    var readStream = fs.createReadStream('text.txt');
    var writeStream = fs.createWriteStream('text.txt.gz');
    var compress = zlib.createGzip();
    var unCompress = zlib.createGunzip();
    ```
    

-  Đọc, Nén, Ghi file
 ```
 readStream.pipe(compress).pipe(writeStream).on('finish', function(){
   console.log('Compressing complete!')
 })
 ```
 Vậy là chúng ta đã tạo ra 1 file nén text.txt.gz
 Sẽ đọc file từ ổ đĩa vào bộ nhớ (buffer). Nếu file quá lớn sẽ chia nhỏ ra (chunk). Khi buffer đầy dữ liệu sẽ được chuyển đi và được nén. nén xong sẽ đc ghi ra ổ đĩa... nó cứ gối nhau như vậy. đọc -> nén -> ghi
 
 - giải nén

cũng giống như nén. Để giải nén chũng ta cần phải đọc file nén. ở dây là `text.txt.gz`
sau đó giải nén và ghi file ra ổ đĩa.
```
var unCompress = zlib.createGunzip();
var readStream = fs.createReadStream('text.txt.gz');
var writeStream = fs.createWriteStream('text.txt');
var compress = zlib.createGzip();

readStream.pipe(unCompress).pipe(writeStream).on('finish', function(){
  console.log('UnCompressing complete!')
})
```
 
 Khá là đơn giản đúng không
 
# Kết Luận
Cũng khá dài rồi. Mình xin kết thúc bài tại đây. Bài viết này giúp cho các bạn hiểu đc về buffer và stream. Cách thức nó hoạt động ra sao. Cảm ơn mọi người đã theo dõi.