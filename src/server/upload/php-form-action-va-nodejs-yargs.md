# 1. Request
Khi đọc các bài tutorials trên mạng hoặc các video học lập trình trên mạng bạn sẽ nghe đến hai khái niệm là Request và Response. Nhưng khái niệm của nó lại hơi mơ hồ nhỉ? Thực ra hai khái niệm này khá là đơn giản, chỉ cần hiểu request là yêu cầu từ client lên server và response là server trả kết quả về cho client.

Request có thể hiểu nhanh là thông tin gửi từ client lên server. Khi bạn lên trình duyệt browser gõ một địa chỉ nào đó, ví dụ bạn gõ là viblo.asia thì ngay lập tức trình duyệt sẽ dựa vào tên domain để gửi yêu cầu truy cập đến địa chỉ IP mà domain này đang trỏ tới, lúc này phía server sẽ phân tích yêu cầu và sẽ gửi luồng xử lý tới vị trí vị trí lưu trữ của mã nguồn PHP (hoặc mã nguồn bất kì) và nhiệm vụ của các mã nguồn là tiếp nhận yêu cầu, phân tích request đó và trả kết quả lại cho client.
Nhiệm vụ của chúng ta hôm nay là phân tích được request đó bằng NodeJS theo cách gần gũi với PHP mà chúng ta quen thuộc (vì cái gì giống cái mình quen thì dễ học hơn mà :D ).
# 2.  Xử lý request trong PHP
Một trong những ứng dụng quan trọng của PHP đó là giúp tương tác xử lý dữ liệu trên form của người sử dụng. Nhằm mục đích giúp cập nhật thông tin một cách linh động và dễ dàng quản lý chung hơn bởi sự kết hợp tuyệt vời của cơ sở dữ liệu. Vậy giờ chuyển qua học NodeJS thì có cái gì láy dữ liệu từ client tương tự thế không nhỉ?
# 3.  Nhắc lại về PHP Form action
## Phương thức xử lý
Khi học PHP, chắc các bạn cũng biết chúng ta có hai phương thức (2 cách) để gửi request từ client lên server đó là sử dụng phương thức `GET` và phương thức `POST`. 2 phương thức này có khác nhau đôi chút nhưng đều được sử dụng để lấy dữ liệu được gửi lên. Ta nhắc lại cách hoạt động của chúng 1 chút nhé :)
## Xử lý với phương thức GET
Phương thức `GET` là hình thức client gửi dữ liệu lên server bằng cách bổ sung các tham số đằng sau URL mà ta hay gọi là Query String.
Ví dụ ta có URL là: viblo.asia?language=vi&tag=nodejs thì lúc này phía server sẽ nhận được hai giá trị là: key `language` có giá trị là `vi` và key `tag` có giá trị là `nodejs`
## Xử lý với phương thức POST
Phương thức `POST` là hình thức client gửi dữ liệu lên server kèm theo dữ liệu và dữ liệu sẽ bị ẩn chứ không hiển thị trên URL như phương thức `GET`, vì vậy khi xây dựng form lấy thông tin từ user thì ta nên sử dụng phương thức `POST` vì nó bảo mật hơn.


Tuy nhiên để chúng ta dễ hình dung cách sử dụng, trong bài này ta sẽ sử dụng phương thức `GET` để làm nền tảng học về `Yargs` nhé!
# 4.  Yargs trong NodeJS
## Cài đặt
Để cài đặt `yargs`, bạn bật Command Prompt (terminal) lên và thực hiện dòng lệnh sau:
```bash
npm install yargs
```
hoặc 
```bash
npm i yargs --save
```
Tất nhiên là chúng ta đang học NodeJS nên bạn phải đảm bảo bạn đã có NodeJS và npm rồi nhé!
## Sử dụng thôi
Trước hết, như các module NodeJS khác, phải khai báo bằng require vào trước đã
```javascript
var yargs = require('yargs');
```
Tất cả các tham số sẽ được lưu trữ trong thuộc tính argv của Yargs, vì vậy, để lấy hết các tham số, chỉ cần gọi như sau:
```javascript
var argv = yargs.argv; // lấy hết các tham số vào biến argv
console.log(argv); // In ra xem nào
```
Mình lưu file này tên là `yargs.js` nên mình sẽ chạy file như sau nhé (tất nhiên là mở terminal lên để chạy :D ):
```
node yargs.js //node <tên file>
```
Kết quả sẽ như thế này
![](https://images.viblo.asia/f62f1848-85ac-4d74-a326-8e91e5566c55.png)

Nó trống trơn chả có gì cả vì mình đã cho gì vào đâu :v. Tất cả các tham số sẽ được lưu trong key _ của đối tượng trả về argv.

Để dễ hiểu, so sánh với PHP thì bạn cứ hiểu rằng trong PHP với phương thức GET ta sẽ truyền biến lên thanh URL, bây giờ với `yargs` ta làm tương tự, nhưng thanh URL của chúng ta chính là command line (terminal) nhé. Vậy là bây giờ ta sẽ truyền tham số vào khi "viết địa chỉ trên URL" như sau:
```bash
node yargs.js framgia fbook
```
Như vậy là phần đầu của URL là tên file, sau đó là 2 value là `framgia` và `fbook`.
Chạy lại file thấy kết quả như sau:
![](https://images.viblo.asia/bbc35b5c-0d84-4f0d-9e14-179f32a51ce2.png)
Như vậy nếu ta truyền các giá trị đằng sau thì nó sẽ lưu vào key `_` và các tham số đó sẽ nằm trong một mảng. Tức là các tham số này là mảng value của key `_` mặc định

### Truyền tham số dạng `key => value`thì sao?
Bình thường khi truyền tham số lên URL với phương thức GET trong PHP sẽ truyền dạng 

`url?key1=value1&key2=value2`
phải không nhỉ? Giờ muốn truyền key - value tương tự vậy trong NodeJS thì làm sao??? Ta viết lại "địa chỉ trên URL" của node dạng như sau nhé:
```bash
node <tên file> --key1=value1 --key2=value2
//hoặc
node <tên file> --key value1 --key2 value2
```
Giờ thử luôn nhé:
```bash
node yargs.js --company=framgia --web=fbook
```
ta sẽ thấy key - value của chúng ta như sau:
![](https://images.viblo.asia/04dac1b5-68e3-4b30-8bb0-2f2cdac81ed9.png)
Như vậy là nếu ta dùng cú pháp `--key=value` thì nó sẽ không lưu vào key `_` như vừa nãy nữa mà sẽ tạo một key riêng luôn.

Vừa rồi là cơ bản về `yargs`, giờ thì thực tế hơn chút nhé. File `yargs.js` của mình giờ có nội dung như sau:
```javascript
var argv = require('yargs').argv;

console.log("My name is: %s \n I am from %s company", argv.name, argv.company);
```
![](https://images.viblo.asia/622b3a84-07e0-4e98-a2ec-2cbeb5a82579.png)
Bây giờ thì giống một ứng dụng thực tế hơn rồi đấy!
## Tìm hiểu về 1 số method của `yargs` nhé
### Đặt "tên miền": `.alias(key, alias)`
Bình thường để việc gõ `127.0.0.1` lên để truy cập khiến mọi người không happy lắm phải không? Chúng ta thường sẽ đăng ký 1 tên miền thân thiện để dễ sử dụng. `Yargs` cũng cho phép bạn đặt tên miền cho biến để nó ngắn gọn hơn đấy.

Bạn sẽ cần sửa lại file của chúng ta như sau:
```javascript
var argv = require('yargs')
    .alias({
        'name': 'n', // gán alias cho biến name là 'n' cho ngắn gọn
        'company': 'c' //gán alias cho biến company là 'c' cho ngắn gọn
    })
    .argv;

console.log("My name is: %s \n I am from %s company", argv.name, argv.company);
```
Và ta sẽ chạy với việc điền tên key theo alias mới đặt như sau:
![](https://images.viblo.asia/5a74ef19-b335-45f1-bfef-922fe057d81b.png)
Vậy là bạn đã đặt được alias cho các biến của mình rồi :)
### Để chuyển đổi các tham số thành object: `.argv`
Cái này thì ở trên phần cơ bản mình đã làm cho các xem rồi nhé :D
### Truyền giá trị vào dưới dạng mảng: `.array(key)`
Chúng ta thường xuyên cần truyền mảng giá trị vào key phải không, vậy để truyền mảng vào ta sẽ sử dụng `.array(<tên key cần truyền mảng vào>)` nhé:
```javascript
var argv = require('yargs')
		.array('fruit')
		.argv;

console.log('I go to super market to buy some fruit:', argv.fruit.join(', '));
//khi liệt kê in mảng fruit ra thì sử dụng .join để ngăn cách các phần tử trong mảng
```
Khi đó thì bạn chỉ việc liệt kê các phần tử của mảng phía sau tên key thôi. Và giờ thì thực hành thử nhé:
![](https://images.viblo.asia/b635d1ad-755d-4f4e-9eb7-2fa721a0b7d7.png)

Còn nhiều method nữa của `yargs`, bạn có thể tham khảo tại [bài viết](https://viblo.asia/p/nodejs-yargs-build-interactive-command-line-tools-BDPGNJvXGJm) này nhé!

Bây giờ chắc bạn đã dễ hình dung hơn việc xử lý Yargs rồi đấy nhỉ :)