### 1. Stream là gì?
### 

Stream là tập hợp dữ liệu - giống như mảng hoặc chuỗi. Sự khác biệt là các Stream có thể không có sẵn cùng một lúc và kích thước của chúng cũng không nhất thiết phải vừa với bộ nhớ (sẽ không gây ra tràn bộ nhớ).

Điều này làm cho các Stream thực sự rất hữu ích khi làm việc với dữ liệu lớn hoặc dữ liệu đã được chia nhỏ (chunk) truyền từ ngoài vào.

Tuy nhiên, Stream không chỉ để về làm việc với dữ liệu lớn. Chúng cũng cung cấp khả năng kết hợp code. 

Giống như chúng ta có thể gõ các lệnh linux bằng cách kết hợp các lệnh Linux nhỏ hơn, chúng ta có thể làm chính xác như vậy trong Nodejs khi sử dụng Stream bằng cách sử dụng phương thức **pipe**().

Có bốn loại luồng cơ bản trong Node.js: **Readable**, **Writable**, **Duplex**, and **Transform**.

**Readable** sử dụng cho hoạt động đọc, ví dụ đó là phương thức fs.createReadStream.

**Writable** sử dụng cho hoạt động ghi. , ví dụ đó là phương thức fs.createWriteStream.

**Duplex** có thể đọc và ghi được, ví dụ như TCP socket.

**Transform** về cơ bản là **Duplex** có thể được sử dụng để sửa đổi hoặc biến đổi dữ liệu khi nó được ghi và đọc. Một ví dụ về điều đó là zlib.createGzip để nén dữ liệu bằng gzip. Bạn có thể nghĩ về một Transform là một function trong đó đầu vào là phần stream có thể ghi và đầu ra là phần stream có thể đọc được.

### 2. Phương thức Pipe
Ví dụ khi sử dụng pipe
```
readableSrc.pipe(writableDest)
```

Trong dòng code đơn giản này, chúng ta nối (pipe) đầu ra của Readable Stream - nguồn dữ liệu, với đầu vào của Writable Stream - đích. Tất nhiên, cả hai đều có thể là Duplex / Transform Stream.

Trong Linux, cơ chế này tương đương với command

`$ readableSrc | writableDest`

Nói tóm lại, **Pipe** là một kỹ thuật. Với kỹ thuật này, chúng ta cung cấp kết quả đầu ra của một Stream để làm dữ liệu đầu vào cho một Stream khác. Không có giới hạn nào về hoạt động này, tức là quá trình trên vẫn có thể tiếp tục 

`a.pipe(b).pipe(c).pipe(d)`

### 3. Lợi ích khi sử dụng Stream khi xử lý dữ liệu lớn
### 

Giả sử chúng ta sử dụng phương thức readFile của Nodejs để đọc file sau đó ghi vào 1 file khác
```
var fs = require('fs');

var read_string = fs.readFile('big_file.txt', 'utf8', function (err, data) {
    if (err) {
        return console.error(err);
    }
    fs.writeFileSync('big_file2.txt', read_string);
```

Trong trường hợp này, trước khi thực hiện ghi file, chúng ta đã đẩy toàn bộ dữ liệu của file đọc được vào bộ nhớ, điều này rất dễ gây tràn bộ nhớ và kể cả có không gây tràn bộ nhớ thì việc lãng phí bộ nhớ như vậy cũng là một cách làm không hiệu quả.

**Sử dụng Stream và pipe:**
```
var fs = require('fs');
 
var readStream = fs.createReadStream('test.txt');
var writeStream = fs.createWriteStream('write_file.txt');

readStream.setEncoding('utf8');
readStream.pipe(writeStream);
```

Khi sử dụng **pipe**, thì mặc định, `fs.createReadStream`  sẽ  chia nhỏ lượng dữ liệu để truyền vào `writeStream` , mặc định là 64*1024 (64KB)

**Một cách khác để ghi mà không sử dụng pipe :**

```
var fs = require('fs');
 
var readStream = fs.createReadStream('big.file', { highWaterMark: 20 * 1024 });
readStream.setEncoding('utf8');
var writeStream = fs.createWriteStream('write_file.txt', {'flags':'a'});

readStream.on('data', function(chunk) {
   writeStream.write(chunk);
});
```

Ở đây chúng ta chia nhỏ dữ liệu theo chunk là 20*1024. pipe thường dùng để truyền thẳng trực tiếp dữ liệu từ Stream này tới Stream khác nên sẽ không thể tùy biến được trong quá trình đó. Vì vậy chúng ta chỉ nên sử dụng pipe khi không cần xử lý events.


Nguồn tham khảo: 
https://www.udemy.com/course/learn-node-js-complete-from-very-basics-to-advance

https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/