Chắc hẳn ai trong số chúng ta cũng đã từng tham gia 1 số cuộc thi về contest hay là code challenge. Ví dụ như [TalenHub](https://vn.talenthub.jp/coding_test), [Viblo Code](https://code.viblo.asia/dashboard), [Top Coder](https://www.topcoder.com/) …

Nhưng ít ai để ý đến xem những service đó được làm như thế nào? Làm thế nào có thể run được đoạn code mà mình đã submit?

Hôm nay mình sẽ đi đào sâu vào những hệ thống đó xem cụ thể nó được xây dựng như thế nào, và kiến trúc của nó ra sao. Đặc biệt để dễ hình dung thì mình sẽ đi lấy ví dụ về Viblo Code nhé.

Mình không phải là nhân viên của Framgia nên có thể hệ thống Viblo Code sẽ khác so với cái mà mình đã phỏng đoán. Nhưng mình nghĩ cơ chế nó sẽ giống nhau.

**Mục đích bài viết:**

* Hiểu được các hệ thống về Code challenge làm việc như thế nào
* Tự mình có thể xây dựng được 1 hệ thống như thế

**Đối tượng hướng đến:**

* Người thích làm về mảng về hệ thống
* Người có kinh nghiệm về Docker

## Hệ thống Code Challenge là gì?

Code Challenge là dịch vụ dành cho lập trình viên rèn luyện kĩ năng về lập trình, cũng như các tư duy về giải thuật.

![](https://images.viblo.asia/51390d97-ebb1-4936-aa6a-87eede42a7d8.png)

Như hình ảnh bên trên về Viblo Code chúng ta có thể thấy, nó bao gồm phần câu hỏi, phần viết code, phần chọn ngôn ngữ mà mình thích …

Ngoài ra còn có 1 số chức năng khác nữa như Ranking (code của ai chạy nhanh sẽ được xếp hạng cao hơn …), nhận thưởng nếu đứng top.

## Yêu cầu về mặt chức năng

* Với mỗi câu hỏi có thể chọn ngôn ngữ lập trình (shell, php, javascript, java …) mình muốn làm.
* Khi submit code trả về kết quả, kèm theo thời gian thực thi
* Có giới hạn về thời gian làm bài (ví dụ như chỉ làm trong 15p chẳng hạn)
* Xếp hạng điểm của người dùng

Hôm nay mình sẽ tập trung chủ yếu vào phần thực thi code ứng với từng language (java, php, javascript …) . Còn phần ranking mình sẽ không đề cập đến ở đây.

## Kiến trúc hệ thống

Mình nghĩ đầu tiên ai cũng sẽ đưa ra kiến trúc kiểu như này. Cùng xem xem nó có ổn không nhé.

![](https://images.viblo.asia/bda819ba-29af-444e-b1f3-983df40ee239.jpg)

Chúng ta có 1 con web server, và ở trong con web server này sẽ cài tất cả các package liên quan đến tất cả các ngôn ngữ để có thể chạy được. Ví dụ như sẽ cài php, nodejs, java, python … tất tần tật lên con web server này.

Và khi người dùng submit code của mình lên để test thì khi đó con web server này sẽ nhận request từ người dùng (giả sử như request này dạng json) bao gồm phần content và language.

Nó sẽ lưu cái phần content này vào 1 file. ví dụ như với ngôn ngữ php thì sẽ lưu file dạng main.php, nếu ngôn ngữ javascript thì sẽ lưu dạng main.js.

Và để xem đoạn code này có chạy được hay không thì web server sẽ chạy 1 đoạn code kiểu như này.

```
START=$(date +%s.%4N)
 
php main.php > result.txt
 
END=$(date +%s.%4N)
 
runtime=$(echo "$END - $START" | bc)
```

Khi đó nó sẽ trả về cho mình output của đoạn code và thời gian runtime cho người dùng. Với trường hợp là javascript hay python … thì cũng làm theo cách tương tự.

Vậy kiến trúc này có ổn không? Theo mình thì là không nhé. Có mấy lí do như sau:

* Vì web server này chạy trực tiếp shell lên server của mình nên nếu như người dùng gửi 1 đoạn code kiểu như: rm -rf /var/www/html/* thì chắc ăn hành to rồi.
* Vì cài nhiều package lên con web quá như thế cũng là nguyên nhân gây ra 1 số rủi ro về vấn đề bảo mật.

Để giải quyết bài toán trên thì chúng ta chỉ cần áp dụng docker vào là ok.

Cụ thể dưới đây là kiến trúc mình muốn đưa ra:

![](https://images.viblo.asia/818dcafd-b0d5-43bb-bb43-29cec213b44a.jpg)

Đầu tiên Web Server nhận request và khởi chạy container tương ứng với language được gửi lên. Sau đó run code thông qua container đó và nhận kết quả trả về cho người dùng.

Vậy chúng ta đã quyết định được kiến trúc hệ thống hợp lý. Tiếp theo sẽ đi vào phần lập trình.

## Thiết kế API

Về API thì mình nghĩ chỉ cần 1 cái API về submit code. Thông số đầu vào là content và language. Output sẽ trả về kết quả sau khi compile đoạn code của người dùng cùng với thời gian thực thi đoạn code.

![](https://images.viblo.asia/90cfed86-6309-4936-a5c1-f65c98474842.png)

## Demo

Để dễ hiểu thì mình sẽ làm 1 phần demo để các bạn dễ hình dung.

Đây là kết quả sau khi gọi API để submit code.

![](https://images.viblo.asia/1d782e2d-bc91-40ca-a9cb-83c62dbc0d89.gif)

Còn đây là màn hình mô phỏng docker container làm việc (các bạn để ý cái màn hình terminal đằng sau đấy nhé). Cứ mỗi lần 1 request được gửi lên thì 1 container được khởi chạy và thực thi code. Nhìn khá là thú vị.

![](https://images.viblo.asia/bde7f109-f92e-47b3-922a-e4709e91ac39.gif)

OK vậy các bạn cũng hiểu hiểu rõ cái API làm việc thế nào rồi đúng không. Bây giờ đi vào phần code nhé.

Về API mình sẽ code bằng Nodejs

Source code: [https://github.com/nooptr/code-challenge](https://github.com/nooptr/code-challenge)

![](https://images.viblo.asia/3308c7dc-ec3e-4e37-8d55-5bd51547cf82.png)

Về image để build cho từng language mình để ở trong thư mục docker.

Ví dụ như với ngôn ngữ php thì nội dung của Dockerfile sẽ như sau:

```
FROM php:7.3.6-cli-alpine3.9
 
RUN apk add --no-cache bc
RUN apk add --update coreutils &amp;&amp; rm -rf /var/cache/apk/*
 
WORKDIR /home/ntcd/
 
ADD script.sh /bin/script.sh
RUN chmod +x /bin/script.sh
 
ENTRYPOINT ["sh", "/bin/script.sh"]
```

Trong đó nội dung của file script.sh sẽ như sau:

```
#!/bin/bash
 
# Sample execution command: ./script.sh php main.php
 
compiler=$1
file=$2
output=$3
 
START=$(date +%s.%4N)
 
$compiler $file > $output
 
END=$(date +%s.%4N)
 
runtime=$(echo "$END - $START" | bc)
 
echo $runtime
```

Mục đích của file script.sh này là để thực thi compiler file code. Kết quả sau khi compiler sẽ được ghi vào file $output. Và thời gian thực thi sẽ được in ra màn hình.

Để web server có thể chạy được container thì cần phải cài đặt trước bằng lệnh:

```
# PHP
docker build -t ntcd_php -f php/Dockerfile .
 
# Javascript
docker build -t ntcd_javascript -f javascript/Dockerfile .
```

Tiếp theo cùng đi xem API viết như nào nhé:

```js
var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var fs = require("fs-extra");
var crypto = require('crypto');
 
router.post('/run/:language', function(req, res, next) {
    var content = req.body.content;
 
    var folder = "/tmp/" + crypto.randomBytes(16).toString('hex');
    fs.mkdirSync(`${folder}`);
 
    if (req.params.language == "php") {
        var inputFile = `${folder}/main.php`;
        fs.writeFileSync(inputFile, content);
        var command = `docker run --rm -v ${folder}:${folder} ntcd_php php ${inputFile} ${folder}/output`;
    } else if (req.params.language == "javascript") {
        var inputFile = `${folder}/main.js`;
        fs.writeFileSync(inputFile, content);
        var command = `docker run --rm -v ${folder}:${folder} ntcd_javascript node ${inputFile} ${folder}/output`;
    }
 
    if (command == null) {
        res.json({
            stdout: "",
            error: "language not support",
        });
    }
 
    exec(command,
        (error, exec_time, stderr) => {
            var stdout = fs.readFileSync(`${folder}/output`, 'utf8');
            res.json({
                stdout: stdout,
                error: stderr,
                time: exec_time
            });
 
            fs.remove(folder, (err) => {});
        });
});
 
module.exports = router;
```

ếu ai code nodejs rồi thì mình nghĩ đọc phát có thể hiểu được ngay.

Ban đầu nó sẽ nhận request từ người dùng. Dạng như sau:

```js
{
  "content": "&lt;?php $a = 12; $b = $a * 2; echo $b;"
}
```

Nó sẽ đọc content và ghi vào 1 file gọi là main.php (cái này tuỳ vào ngôn ngữ được gửi lên. Nếu là php thì ghi vào file main.php. Nếu là javascript thì ghi vào file main.js).

Sau đó, web server sẽ gọi docker container để thực thi code bằng lệnh:

```
docker run -it --rm -v /tmp:/tmp ntcd_php php /tmp/main.php /tmp/output
```

Cuối cùng sẽ đọc kết quả từ file /tmp/output và trả về cho người dùng với format response như sau:

```json
{
  "stdout": "24",
  "error": "",
  "time": ".0911\n"
}
```

## Kết luận

Các bạn thấy thế nào? Có đơn giản không ak? Chỉ với 1 đoạn code ngắn mà chúng ta có thể dễ dàng viết được 1 chương trình code challenge rồi.

Source code này mình chỉ viết dưới dạng demo thôi nên có thể có nhiều chỗ code chưa hợp lí. Các bạn tự sửa theo ý mình nhé.

Nguồn: [https://nghethuatcoding.com/2019/06/05/viblo-code-challenge-duoc-xay-dung-nhu-the-nao/](https://nghethuatcoding.com/2019/06/05/viblo-code-challenge-duoc-xay-dung-nhu-the-nao/)

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

→→→ [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)

Chúc các bạn 1 tuần thật vui vẻ.