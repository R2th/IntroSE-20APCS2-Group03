Xin chào các bạn!<br/>
Hôm nay, mình muốn chia sẻ cho các bạn "người bạn" mà mình mới làm quen gần đây. Đó là bạn Nodejs!!
Thời gian, làm quen chưa lâu nên chỉ mới biết chút ít về người bạn mới này.
Bạn Nodejs này cũng khá là nổi nha. Các bạn có thể tìm hiểu thêm qua "thầy" Google.<br/>
Lần này, chúng ta sẽ cùng tìm hiểu về một trong những "khả năng cơ bản" của bạn Nodejs, đó là "Các kỹ thuật khai báo và sử dụng Module".
Có nhiều kỹ thuật để khai báo và sử dụng Module trong Nodejs, và sau đây là một số kỹ thuật cơ bản:

## **1. Mô tả:**
Tôi có module chính là "app.js", và mỗi kỹ thuật khai báo sẽ dựa trên một module mới và sử dụng chúng trong module "app.js".

## **2. Các kỹ thuật khai báo và sử dụng Module:**
### **2.1. Đối tượng trả về của module là một hàm:**
Tôi tạo mới một module có tên là "chaonodejs.js". Trong module này tôi sẽ sử dụng phương thức export để xuất ra đổi tượng trả về của module này là một hàm và sử dụng nó trong module "app.js"
*module chaonodejs.js*
```
Module chaonodejs.js
module.exports = function() {
    console.log("Xin chao Nodejs !!");
}
Module app.js
var chaonode = require("./chaonodejs");
chaonode();
```
Ở đây module chaonodejs.js trả về hàm chỉ đơn giản thực thi xuất ra màn hình console "Xin chao nodejs".
Trong module "app.js", tôi chỉ đơn giản gọi trực tiếp biến được gán bằng câu lệnh require đến module "chaonodejs.js",  và gọi biến đó như một hàm để thực thi. <br/>
Tuy nhiên, ở cách trên hàm được trả về trong module "chaonodejs" không được định nghĩa cụ thể bằng thuộc tính nào của object module.exports. Một cách khác là chúng ta trả về một hàm, nhưng sẽ gán hàm này cho một thuộc tính cụ thể được định nghĩa từ object module.exports.<br/>
Tôi tạo module "nodechaohieu.js", và gọi nó trong module "app.js" như sau:
```
Module nodechaohieu.js
module.exports.chaoHieu = function() {
    console.log("Chao Hieu! Rat vui duoc lam quen voi ban.");
}

Module app.js
var node = require("./nodechaohieu");
node.chaoHieu();
//hoặc
var node = require("./nodechaohieu").chaoHieu;
node();
```
Như vậy, lúc này hàm trả về trong module "nodechaohieu.js" đã được gán cho thuộc tính "chaoHieu" được định nghĩa trong object module.exports. Và trong module "app.js" chúng ta gán biến và gọi đến thuộc tính "chaoHieu" (ở trên).
### **2.2. Đối tượng trả về của module là một object:**
Tôi tạo module "gioithieu.js", trong module này sẽ không trả về một hàm nữa mà nó sẽ trả về một object mới bằng cách sử dụng từ khóa "new". Sau đó, module này sẽ được gọi và trong module "app.js" như sau:
```
Module gioithieu.js
function Persion() {
    this.name = "Dinh Hieu";
    this.nickname = "Jack Fruit";
    this.gioithieubanthan = function () {
        console.log("Toi ten la: " + this.name);
        console.log("Nickname cua toi la: " + this.nickname);
    }
}
module.exports = new Persion();

Module app.js
var hieu = require("./gioithieu");
hieu.gioithieubanthan();
```
Module "gioithieu.js" đã trả về một object Persion mới. Trong module "app.js", tôi khai báo biến "hieu" gan cho object mới này. Và dùng biến này để gọi đến hàm của đối tượng Persion mới là "gioithieubanthan".<br/>
Việc sử dụng một object mới để trả về trong module cũng có một vài lưu ý cần quan tâm. Để ví dụ cho điều này, tôi thay đổi thuộc tính "nickname" của "hieu". Sau đó, tạo một biến mới "hieucuopbien" và cũng gán cho object mới được trả về từ module "gioithieu.js" này.
```
Module app.js
var hieu = require("./gioithieu");
hieu.gioithieubanthan();
hieu.nickname = "Jack Sparrow";

var hieucuopbien = require("./gioithieu");
hieucuopbien.gioithieubanthan();
```
Các bạn đoán xem kết quả trả về của dòng lệnh "hieucuopbien.gioithieubanthan();" là gì nào? Lúc đầu, mình cũng nghĩ mình trả lời đúng, ai ngờ mình trả lời sai. Và mình nhớ mãi cái sai này từ đó.<br/>
Mặc dù, tôi thay đổi thuộc tính "nickname" của đối tượng "hieu", nhưng đối tượng "hieucuopbien" đã bị ảnh hưởng bởi điều này. Kết quả trả về là thuộc tính "nickname" của đối tượng "hieucuopbien" có giá trị là "Jack Sparrow". Điều này, chứng tỏ, không có đối tượng mới được tạo ra khi khai báo "hieucuopbien". Vậy nguyên nhân là do đâu?,<br/>
Điều này là do khi khai báo biến "hieucuopbien", nodejs đã không tạo ra đối tượng mới mà đã cache lại đối tượng "hieu" (đối tượng đã được khởi tạo trước đó) và trả về đối tượng này cho "hieucoupbien". Các bạn có thể thấy điều này bằng cách chạy debug vào trong lõi của nodejs.<br/>
Tuy nhiên, trong kỹ thuật khai báo này cũng còn một cách khác cũng trả về một object nhưng không sử dụng từ khóa "new". Tôi tạo một module mới tên là "sothich.js".
```
Module sothich.js
function Hobby() {
    this.vandong = "Bong da";
    this.thutha = "Nghe nhac, di dao";
    this.lietKeSoThich = function() {
        console.log("So thich van dong la: " + this.vandong);
        console.log("So thich khi thu tha la " + this.thutha);
    }
}

module.exports = Hobby;

Module app.js
var Sothich = require("./sothich");
var sothichcuahieu = new Sothich();
sothichcuahieu.lietKeSoThich();
```
Ở đây, tôi không trả về một object mới cách sử dụng từ khóa "new" trong module "sothich.js", chỉ đơn giản là trả về object "Hobby". Lúc này, trong module "app.js", để gọi đến được phương thức "lietKeSoThich" tôi phải khởi tạo một một object mới và gọi đến phương thức này thông qua object mới này.
### **2.3. Đối tượng trả về của module là một literal object:**
Tôi tạo mới module "dixemphim.js" và trả về một đối tượng literal object. Và sử dụng nó trong module "app.js". Cách này thường khá phổ biến, vì tuân theo chuẩn của common.js.
```
Module dixemphim.js
function ruXemPhim() {
    console.log("Di xem phim Aladin voi minh nhe Nodejs?");
}

module.exports = {
    ruXemPhim: ruXemPhim
}

Module app.js
var hieurunodedixemphim = require("./dixemphim").ruXemPhim;
hieurunodedixemphim();
//hoặc
var hieudeptrai = require("./dixemphim");
hieudeptrai.ruXemPhim();
```
## **3. Lời kết:**
Qua bài viết, tôi đã chia sẽ một số kỹ thuật khai báo và sử dụng module trong Nodejs. Trong đó kỹ thuật cuối cùng được sử dụng khá phổ biến. <br/>
Bài viết sử dụng các kiến thức cơ bản mà mình đã tiếp cận được. Mình sẽ tiếp tục tìm hiểu bạn "Nodejs" và chia sẻ cùng các bạn.<br/>
Mong nhận được sự góp ý cho bài viết. Và chân thành cảm ơn các bạn đã xem bài viết của mình.