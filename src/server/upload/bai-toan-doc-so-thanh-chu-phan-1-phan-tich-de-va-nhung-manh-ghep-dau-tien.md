Khoảng tháng trước bên mình có một challenge viết code đọc số thành chữ, nên hôm nay mình sẽ chia sẻ đến mọi người cách mình đã thực hiện như thế nào. Tất nhiên là mình cũng sẽ trình bày, phân tích **step by step** chứ không phải vào code vào ngay.

![](https://images.viblo.asia/949625ed-df7a-4022-85e0-082fbbc335c8.jpg)

Bài viết khá dài nên mình chia ra 2 phần nhé. Và bài hôm nay là phần đầu tiên - phân tích đề và tìm hướng giải. Ok bắt đầu thôi.

## 1. Phân tích bài toán

### 1.1. Bài toán

> Cho một số nguyên dương N bất kì, tìm cách đọc số đó (thành chuỗi) trong tiếng Việt.
> 
> Ví dụ mẫu:
> 
> * 100 = một trăm
> * 104 = một trăm lẻ bốn
> * 13 = mười ba
> * ...

Ok nghe qua thì có vẻ mệt đấy, đúng thật bài này đã ngốn hết của mình gần 2 ngày để suy nghĩ và viết code.

### 1.2. Tìm hướng giải quyết

Bước đầu tiên cần làm là suy nghĩ để tìm ra được **điểm mấu chốt**. Giống như khi bạn chơi **xếp hình** (theo đúng nghĩa đen). Khi bắt đầu, mẹo là tìm được 4 góc trước tiên (đừng quan tâm cái ảnh nhé :joy:)

![](https://images.viblo.asia/5fc7b36a-8124-4330-80bb-4d5708125f22.jpg)

Đối với bài toán đọc số này cũng vậy. Chúng ta cũng cần tìm ra được các bước như sau:

* Xem qua các trường hợp (case) mẫu để xác định điểm chung, quy luật
* Xét tới các trường hợp biến thể của tập mẫu, ví dụ tại sao đọc `mười bốn` mà không đọc `mười tư`?
* Chia tách vấn đề thành những việc nhỏ hơn, và sau đó ghép lại hoàn chỉnh

Với bước 1 và 2, tớ nghĩ mọi người ai cũng có thể tự làm và ngẫm ra được, nên mình sẽ lướt nhanh qua phần này nhé. Còn ở bước 3 mình sẽ đi sâu hơn vào cách chia tách bài toán lớn ra thành các bài toán nhỏ hơn như thế nào.

## 2. Tớ đã làm từng bước như thế nào?

### 2.1. Tìm ra quy luật chung

Với các số dài, dễ dàng nhận ra chúng có quy luật đọc theo từng nhóm 3 số, rồi gắn thêm phần đơn vị của từng nhóm là được. Ví dụ nhé.

> 402 045 014 = Hai mươi ba (tỷ) bốn trăm lẻ hai (triệu), không trăm bốn mươi lăm (ngàn), không trăm mười bốn (đơn vị)
> 
> 15 042 = Mười lăm (nghìn), không trăm bốn mươi hai (đơn vị)

Do đó, bước đầu cần thực hiện xử lý và chia nhóm các chữ số ra trước. Gồm 2 bước:

* Thêm các số 0 ở đầu (leading zeros) cho số lượng chữ số chia hết cho 3 (để chia cụm cho đều)
* Mỗi lần đọc lần lượt 3 số, sau đó lấy kết quả đọc được gắn thêm phần đơn vị cho nó (tỷ, triệu, nghìn, đơn vị,...)

```js
let num = '23402045014';

// Tính số lượng số 0 cần thêm vào
let needZeroCount = num.length % 3;
if (needZeroCount != 0)
    needZeroCount = 3 - needZeroCount;
    
// Thêm needZeroCount số 0 cho đủ
num = '0'.repeat(needZeroCount) + num;
```

Xong bước này, biến `num` đã hợp lệ và tiếp tục qua bước hai.

### 2.2. Đọc lần lượt từng nhóm 3 số

Chúng ta đã có chuỗi `num` có độ dài chia hết cho 3, do đó chúng ta cần duyệt lần lượt từng nhóm như sau. Mỗi lần duyệt sẽ lấy ra giá trị vào 3 biến `a`, `b`, `c`.

```js
for (let i = 0; i < num.length / 3; i++) {
    // Lấy ra 3 số a, b, c bằng array destructuring
    let [a, b, c] = num.substr(i * 3, 3);
    console.log(a, b, c);
    
    // Ghép thêm đơn vị tính sau mỗi nhóm
    ...
}
```

### 2.3. Ghép thêm đơn vị tính

Như ở trên, sau khi đọc xong một nhóm (gồm 3 số `a`, `b`, `c`), chúng ta sẽ đọc thêm đơn vị tính của nhóm đó.

Mình dùng một mảng string chứa các đơn vị từ thấp đến cao.

```js
const UNITS = ['đơn vị', 'nghìn', 'triệu', 'tỉ'];
```

Vấn đề ở đây là làm sao biết dùng đơn vị nào ở phần nào. Dễ thấy phần cuối vòng lặp thì dùng đơn vị đầu tiên. Do đó chúng ta chỉ cần đảo ngược lại là được (lấy index nhóm cuối cùng trừ cho `i`).

```js
// Tổng số phần là num.length / 3
for (let i = 0; i < num.length / 3; i++) {
    let [a, b, c] = num.substr(i * 3, 3);
    console.log(a, b, c, UNITS[num.length / 3 - 1 - i]);
}
```

### 2.4. Hoàn chỉnh code

> Ơ code trên thì chỉ tách chuỗi input ra thành từng nhóm thôi mà. Mỗi nhóm gồm 3 chữ số `a`, `b`, `c` chứ có đọc gì đâu

Đúng, có thể bạn sẽ thắc mắc như thế. Nhưng đừng lo, ở đây chúng ta đang giải quyết vấn đề tổng thể trước. Còn cách đọc các số mình sẽ trình bày ở bài viết sau.

Do đó, mình sẽ viết thêm một function `readThree(a, b, c)` để đọc số. Hiện tại thì nó chỉ có in số ra thôi nhé.

```js
function readThree(a, b, c) {
    return a + ' ' + b + ' ' + c;
}
```

Và kết quả cuối cùng đây, tèn ten.

```js
let num = '23402045014';

// Tính số lượng số 0 cần thêm vào
let needZeroCount = num.length % 3;
if (needZeroCount != 0)
    needZeroCount = 3 - needZeroCount;
    
// Thêm needZeroCount số 0 cho đủ
num = '0'.repeat(needZeroCount) + num;

// Định nghĩa các đơn vị đo
const UNITS = ['đơn vị', 'nghìn', 'triệu', 'tỉ'];

// Định nghĩa function đọc số 3 chữ số
function readThree(a, b, c) {
    return a + ' ' + b + ' ' + c;
}

// Đọc từng phần
for (let i = 0; i < num.length / 3; i++) {
    let [a, b, c] = num.substr(i * 3, 3);
    console.log(readThree(a, b, c), UNITS[num.length / 3 - 1 - i]);
}
```

![](https://images.viblo.asia/b4ac1ab5-2782-4b37-9b7e-4b091a17139f.png)

## 3. Vấn đề với kết quả

### 3.1. Code trên có vấn đề gì?

Code trên có một vấn đề, đó là đôi khi sẽ bị thừa hoặc thiếu khoảng trắng trong chuỗi output. Ví dụ như.

```shell
103 302  # Một trăm lẻ ba nghìn  ba trăm  lẻ haiđơn vị
```

Lúc mình mới làm cũng gặp phải vấn đề này. Nguyên nhân là do chúng ta sử dụng space cùng với các từ, do đó sẽ bị tình trạng các từ trùng nhau thì bị dư, thiếu space như trên.

### 3.2. Cách giải quyết

Có hai giải pháp cho vấn đề trên:

* **Cách 1:** xóa đi các vị trí có nhiều space liên tiếp, chỉ giữ lại một. Tuy nhiên, cách này không thể fix được trường hợp bị thiếu khoảng trắng.
* **Cách 2:** dùng một mảng `output` và thêm lần lượt các từ riêng rẽ vào. Cuối cùng thì nối lại thành chuỗi bằng method `join()`.

Do đó, mình sẽ dùng cách thứ hai, khi áp dụng vào code sẽ giống như sau.

```js
function readThree(a, b, c) {
    // Trả về dạng mảng
    return [a, b, c];
}

// Khi thêm một từ vào thì chỉ cần push vào mảng output
const output = [];
for (let i = 0; i < num.length / 3; i++) {
    let [a, b, c] = num.substr(i * 3, 3);
    output.push(...readThree(a, b, c);  // Dùng spread operator
    output.push(UNITS[num.length / 3 - 1 - i]);
}

// Sau khi hoàn tất thì chỉ cần join lại là được
console.log(output.join(' '));
```

Xong xuôi, đơn giản đúng không nè :joy: 

---

Bài viết đến đây là hết rồi, mình tạm dừng tại đây. Và đừng quên đón xem phần hai nhé, chúng ta sẽ cùng đi tiếp về cách đọc số có ít hơn 3 chữ số, rồi ghép lại thành code hoàn chỉnh.

Code mình share ở đây nhé https://repl.it/@tonghoangvu/Read-Vietnamese-number#phan-1.js.

Hãy thử và comment xuống dưới thắc mắc của bạn trong quá trình thực hiện. Nếu bài viết hữu ích hãy cho mình 1 vote và clip để tiếp thêm động lực nhé. Bye bye <3.