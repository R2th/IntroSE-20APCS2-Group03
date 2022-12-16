## HTTP Compression

Brotli là một thư viện nén dữ liệu mã nguồn mở được [chỉ định chính thức bởi dự thảo IETF](https://tools.ietf.org/html/draft-alakuijala-brotli-07). Nó có thể được dùng để nén dữ liệu HTTPS responses mà server side gửi về cho browser, giống như vai trò của gzip hay deflate. Hiện nay phần lớn các browser phổ biến đã hỗ trợ Brotli mặc định, như Chrome, Firefox hay Edgle. Trong bài này chúng ta sẽ cùng tìm hiểu về điểm mạnh của Brotli cũng như cách để setup một server đơn giản sử dụng Brotli.

Khi dữ liệu được truyền tải thông qua web, một trong những điểm giúp website của bạn trở nên chiến thắng (về mặt performance) nằm ở server side compression. Nói một cách nôm na thì đó là công việc mà dữ liệu sẽ được nén lại ở phía server sau đó được giải nén ở client. Nghe có vẻ rườm rà khi chúng ta phải làm thêm khá nhiều việc trong khi hiệu quả mà người dùng "nhìn" thấy lại không khác biệt. Tuy nhiên ở khía cạnh một developer càn phải tối ưu cho website của mình thì thà phải làm thêm việc để tối ưu còn hơn là khộg làm gì cả. Lý do của việc này rất đơn giản, có thể là hệ thống network của bạn bị giới hạn về mặt bandwidth hoặc cũng có thể ứng dụng của bạn quá lớn khiến cho dữ liệu bị phình to đến mức không thể đảm bảo tốc độ tối ưu. Nén dữ liệu trước khi transfer là một cách đơn giản cũng như tối ưu nhất bởi nó không yêu cầu bạn phải đầu tư nâng cấp hạ tầng network với chi phí cao nhưng vẫn có thể mang lại hiệu quả tương tự. Hãy thử tưởng tượng, bạn có một 1Mb dữ liệu cần transfer, nhưng khi nén lại con số đó còn lại 300Kb thì sẽ như nào nhỉ?

Thông thường, client (browser) phải thông báo cho server loại dữ liệu mà nó có thể giải nén thông qua header "Accept-Encoding"

Không hỗ trợ Brotli compression
![without brotli](https://hacks.mozilla.org/files/2015/11/Screen-Shot-2015-11-02-at-12.29.31-PM.png)

Hỗ trợ Brotli compreseion
![with brotli](https://hacks.mozilla.org/files/2015/11/Screen-Shot-2015-11-02-at-12.31.10-PM.png)

Việc browser hỗ trợ giải nén Brotli compression là cần thiết nhưng chưa đủ; mọi thứ còn phụ thuộc vào phía server nữa, server có thể quyết định sẽ dùng phương thức nén mà client hỗ trợ, cũng có thể sẽ không dùng phương thức nào cả. Khi mà client hỗ trợ gzip hoặc Brotli, nhưng server không hỗ trợ thì dữ liệu vẫn được truyền tải mà không hề được nén gì cả. Và cho dù server có dùng bất kỳ một phương thức nén dữ liệu nào đó hoặc không dùng, thì nó vẫn sẽ cần phải response về kèm theo header `Content-Encoding`; header này có nhiệm vụ thông báo cho client biết được định dạng dữ liệu mà server trả về.

![content encoding header](https://hacks.mozilla.org/files/2015/11/Screen-Shot-2015-11-02-at-12.36.15-PM.png)

Chúng ta có thể tóm lại một cách khái quát về cách nén - giải nén dữ liệu giữa server và client như sau:

1. Client cần phải gửi cho server một danh sách các phương thức nén mà nó hỗ trợ (client có thể giải nén) thông qua header `Accept-Encoding`
2. Server sau đó sẽ chọn ra một loại phương thức nén (từ danh sách) để làm việc với dữ liệu trước hi gửi về cho client.
3. Server khi phản hồi cho client cần thông báo cho client phương thức đã được dùng để nén dữ liệu, thông qua header `Content-Encoding`. Khi server không hỗ trợ bất kì phương thức nào trong danh sách mà client gửi lên, hoặc server không được cài đặt để có thể nén dữ liệu thì nó cũng cần báo lại cho client biết.

Nếu server sử dụng một phương thức nén mà client không hỗ trợ, hoặc giá trị tại header `Content-Encoding` không khớp với phương thức nén được dùng; có thể gây ra lỗi rất nghiêm trọng về hiển thị ở phía browser (lỗi ký tự đặc biệt đối với text, lỗi invalid format đối với video và lỗi không thể hiển thị đối với ảnh...)

![Encoding error](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2015/11/Screen-Shot-2015-11-02-at-12.02.14-PM.png)

Hiện tại thì phần lớn các browsers đã hỗ trợ Brotli compression, chúng ta không cần phải lo lắng gì nữa. Công việc của chúng ta là cần implement thử một server hỗ trợ Brotli compression.

## Creating Server
Chúng ta sẽ thử với Node.js do đó bạn cần phải cài đặt Node.js và cài thêm build tools cho Node.js để có thể hỗ trợ các native package

Khởi tạo project và cài đặt các module cần thiết

```
npm init -y
npm i accepts iltorb lzma-native
```

Cuối cùng bạn sẽ cần generate chứng chỉ ssl bởi vì hiện tại hầu hết các browser chỉ hỗ trợ Brotli qua https

Bạn có thể xem hướng dẫn tạo self-signed certs [tại đây](https://nodejs.org/api/tls.html#tls_tls_ssl)

(Lưu ý rằng bạn sẽ cần cài đặt thêm  `openssl` và bởi vì bạn đang dùng chứng chỉ self-signed nên các trình duyệt sẽ cảnh báo, bạn có thể bỏ qua các cảnh báo này trên môi trường dev local của mình, tuy nhiên với các trang web không rõ tính an toàn thì không nên bỏ qua nhé)

Dưới đây là đoạn khởi tạo server của chúng ta, file `server.js`

```
var accepts = require('accepts');
var fs = require('fs');
var https = require('https');
var brotli = require('iltorb').compressStream;
var lzma = require('lzma-native').createStream.bind(null, 'aloneEncoder');
var gzip = require('zlib').createGzip;
var filename = 'lorem_ipsum.txt';

function onRequest (req, res) {
    res.setHeader('Content-Type', 'text/html');
    var encodings = new Set(accepts(req).encodings());
    
    if (encodings.has('br')) {
        res.setHeader('Content-Encoding', 'br');
        fs.createReadStream(filename).pipe(brotli()).pipe(res);
    } else if (encodings.has('lzma')) {
        res.setHeader('Content-Encoding', 'lzma');
        fs.createReadStream(filename).pipe(lzma()).pipe(res);
    } else if (encodings.has('gzip')) {
        res.setHeader('Content-Encoding', 'gzip');
        fs.createReadStream(filename).pipe(gzip()).pipe(res);
    } else {
        fs.createReadStream(filename).pipe(res);
    }
};
var certs = {
    key: fs.readFileSync('./https-key.pem'),
    cert: fs.readFileSync('./https-cert.pem'),
};
https.createServer(certs, onRequest).listen(3000);
```

Chạy server và truy cập đến `127.0.0.1:3000` để xem kết quả:
```
node server.js
```
Firefox 45 và Brotli:

![Firefox 45 use Brotli](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2015/11/Screen-Shot-2015-11-02-at-12.05.28-PM.png)

Opera Beta 33 và lzma:

![Opera beta 33 and lzma](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2015/11/Screen-Shot-2015-11-02-at-12.05.51-PM.png)

Safari 9 và Firefox 41 với gzip:

![Safari 9 and firefox 41 with gzip](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2015/11/Screen-Shot-2015-11-02-at-1.27.01-PM.png)

Chúng ta có thể so sánh kích thước của các file tĩnh trước và sau khi sử dungu nén thông qua Developer tools. Bằng cách so sánh dữ liệu tại cột Transfered và cột Size. Cột Transfered cho thấy dung lượng của file trước khi nén và cột Size cho thấy dung lượng của file sau khi giải nén. Trong trường hợp không sử dụng nén thì 2 cột này sẽ có giá trị như nhau.

![Transfered vs Size](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2015/11/Screen-Shot-2015-11-02-at-12.58.03-PM.png)

Chúng ta cũng vó thể sử dụng `curl` để thực hiện so sánh này:

```
$ curl https://localhost:3000 --insecure -H 'Accept-Encoding: br' -w '%{size_download}' -so /dev/null 
1333
$ curl https://localhost:3000 --insecure -H 'Accept-Encoding: lzma' -w '%{size_download}' -so /dev/null
1502
$ curl https://localhost:3000 --insecure -H 'Accept-Encoding: gzip' -w '%{size_download}' -so /dev/null
1408
$ curl https://localhost:3000 --insecure -w '%{size_download}' -so /dev/null
3484
```


## Lưu ý về Compression và Performance

Sự lựa chọn phương pháp nén gây ra những ảnh hưởng nhất định tới server. Node.js có built-in zlib, việc cài addon lzma và Brotli khiến dung lượng ứng dụng tăng không đáng kể. Với mỗi phương pháp nén, Node.js có thể tốn thời gian khác nhau cũng như bộ nhớ ram khác nhau, và bộ nhớ ram cần cho việc nén có thể tăng cao nếu ứng dụng của bạn phục vụ đồng thời nhiều requests.

Trong ví dụ trước, có thể thấy rằng `lzma` cũng chỉ ngang ngửa với `gzip` trong cuôch chiến về compression, nhưng `Brotli` thì khác. Bất kỳ một Compression Engine đều cung cấp một số những cài đặt khác nhau nhằm nâng cao hiệu quả nén hoặc để tối ưu về hiệu suất.

Dưới đây là thống kê hiệu suất với một máy 2013 Apple MacBook Pro OSX 10.10.5 16GB 1600 MHz DDR3 2.7 GHz Core i7 4-Core with HyperThreading

Kết quả test với Brotli compression

![Kết quả test với Brotli compression](https://images.viblo.asia/495bf812-2b67-4900-8f8d-633e5136b4dd.jpg)

Một số điều rút ra từ kết quả trên:
+ Ngoại trừ `br-static` thì các phương thức nén càng hiện đại càng tỉ lệ nghịch với chỉ số requests/second
+ Cần khá nhiều ram cho phương thức `compression stream` (memory leak)
+ Độ trễ được đề cập ở kết quả bên trên chỉ là với ở localhost, nó sẽ trở nên quan trọng khi hoạt động với môi trường internet
+ Nếu chúng ta nén static assets từ trước với Brotli built from source thì kết quả thực sự đáng kinh ngạc (trong ứng dụng thực tế, chúng ts chỉ có thể làm cách này với static assets)
+ Phục vụ assets với statically-brotli-compressed mang lại hiệu quả cao vì không phải dùng nhiều ram cho công việc nén trong quá trình vận hành của app mà vẫn đảm bảo việc truyền tải nhanh chóng

Để nén assets với Brotli static chúng ta có thể built Brotli [from source](https://github.com/google/brotli/blob/master/tools/Makefile) sau đó chạy như sau:
```
./bro --input large.css --output large.br.css
```
### Warning

Cũng giống như các phương thức HTTP compression khác, sử dụng Brotli cũng để lại những nguy cơ về bảo mật liên quan đến [BREACH attacks](http://breachattack.com/)
Bạn nên tìm hiểu và áp dụng [other BREACH mitigations](http://breachattack.com/#mitigations)

## Kết luận
Với văn bản 5 đoạn Lorem ipsum, Brotli chỉ chiến thắng gzip ở 5%. Nhưng nếu chạy với một frontpage dài thì nó có thể đạt hiệu quả cao hơn tới 22% (tất cả thử nghiệm đều sử dụng nhưng tham số cấu hình mặc định).
Đôi khi Brotli chưa tỏ ra thực sự hiệu quả so với gzip, khi mà nó cần đến https và tỏ ra yếu đuối hơn với dynamic content. Tuy nhiên với static content và khi ứng dụng của bạn phục vụ một lượng khá lớn users thì với Brotli lại là một câu chuyện khác, Brotli sẽ không khiến bạn phải hối tiếc.

Tham khảo:

https://tools.ietf.org/html/draft-alakuijala-brotli-07

https://bugzilla.mozilla.org/show_bug.cgi?id=366559

http://breachattack.com/

https://hacks.mozilla.org/2015/11/better-than-gzip-compression-with-brotli/