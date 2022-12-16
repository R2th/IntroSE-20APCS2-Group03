Tiếp tục bài viết còn dang dở ở phần trước [Phân tích bài toán đọc số thành chữ (phần 1) - Phân tích đề và những mảnh ghép đầu tiên](https://viblo.asia/p/bai-toan-doc-so-thanh-chu-phan-1-phan-tich-de-va-nhung-manh-ghep-dau-tien-6J3Zg0OBlmB). Bạn nào chưa đọc thì có thể xem ở link trên trước nhé.

Theo đó chúng ta đã xây dựng được **khung sườn** để giải quyết bài toán:

* Chia thành từng nhóm 3 chữ số và đọc thêm đơn vị cho từng nhóm
* Giải pháp sửa lỗi bị thừa/thiếu khoảng trắng trong output do gán cứng

Tiếp tục trong phần sau này, chúng ta sẽ đi chi tiết hơn về cách đọc số và lắp ghép các phần lại thành chương trình hoàn chỉnh. Okay bắt đầu thôi.

![](https://images.viblo.asia/949625ed-df7a-4022-85e0-082fbbc335c8.jpg)

## 1. Function đọc số 3 chữ số

Đây là function đọc số có 3 chữ số từ bài trước. Function này nhận vào ba tham số `a`, `b`, `c`. Nhiệm vụ hôm nay là viết thêm code cho nó để in ra các từ hoàn chỉnh.

```js
function readThree(a, b, c) {
    ...
}
```

Nhưng mình vẫn sẽ chia nó thành bài toán nhỏ hơn, là đọc **2 chữ số cuối** trước. Mình không chia nữa, vì nếu chia nữa sẽ thành function đọc 1 chữ số. Nếu đọc 1 chữ số thì function khá đơn giản, nhưng side effect khá nhiều nên mình không làm.

### 1.1. Đọc hai chữ số cuối

Nhìn sơ qua thì hàm đọc 2 chữ số sẽ như sau (do hàm này chỉ dùng trên 2 chữ số cuối, để hàm `readThree()` sử dụng nên mình đặt tên hai tham số là `b`, `c`).

```js
// Mảng DIGITS là các từ tương ứng với chữ số 0-9
const DIGITS = [
    'không', 'một', 'hai', 'ba', 'bốn',
    'năm', 'sáu', 'bảy', 'tám', 'chín'
];

// Định nghĩa function đọc hai số cuối
function readTwo(b, c) {
    const output = [];
    
    switch (b) {
        case 0: {
            // Trường hợp ngoại lệ bàn ở dưới ở đây
            output.push(DIGITS[c]);
            break;
        }
        
        case 1: {
            // Trường hợp số hàng chục là 10
            output.push("mười");
            if (c == 5)
                output.push("lăm");  // Mười lăm
            else if (c != 0)
                output.push(DIGITS[c]);
            // Trường hợp c = 0 không xét vì đã đọc "mười" rồi
            break;
        }
        
        default: {
            output.push(DIGITS[b], "mươi");  // b mươi
            if (c == 1)
                output.push("mốt");
                
            // Chỗ này đọc "tư" hay "bốn" thì các bạn điều chỉnh nhe
            // Mình sẽ luôn đọc là "tư" nhé
            else if (c == 4)
                output.push("tư");
            else if (c == 5)
                output.push("lăm");
             else if (c != 0)
                 output.push(DIGITS[c]);
            // Không đọc c = 0 vì đã đọc "b mươi" rồi
            break;
        }
    }
    
    // Trả về mảng output, xem lại phần trước nhé
    return output;
}
```

Sorry vì trình mình hơi gà nên chỉ biết dùng `if else` thôi. Bạn nào có cách hay hơn comment xuống bên dưới cho mình và mọi người tham khảo nhé :heart_eyes:

### 1.2. Xử lý hai trường hợp ngoại lệ

Tuy nhiên, dễ thấy với trường hợp số **nhỏ hơn 10**, nghĩa là `b = 0` thì có hai ngoại lệ sau:

* Nếu có chữ số hàng trăm, ví dụ `103` thì hai số cuối đọc là `(một trăm) lẻ ba`.
* Nếu cả `b = 0` và `c = 0` thì không đọc, ví dụ `200` hai số cuối đọc là `(hai trăm) ...`

Do đó, chúng ta cần thêm một tham số nữa để tính đến hai trường hợp trên. Code được sửa lại như sau.

```js
// Định nghĩa function đọc hai số cuối
function readTwo(b, c, hasHundred) {
    ...
    switch (b) {
        case 0: {
            // Nếu có đọc hàng trăm (đọc rồi) và b = 0, c = 0
            // thì không đọc nữa
            if (hasHundred && c == 0)
                break;
            if (hasHundred)
                output.push("lẻ");  // ví dụ a05 đọc là "a lẻ năm"
            output.push(DIGITS[c]);
            break;
        }
        ...
    }
    ...
}
```

### 1.3. Đọc nhóm 3 chữ số

Function `readThree()` này sẽ sử dụng function `readTwo()` ở trên để đọc hai số cuối là `b`, `c` như sau.

```js
// Định nghĩa function đọc nhóm 3 số
function readThree(a, b, c) {
    const output = [];

    // Đọc phần trăm (a) trước
    if (a != 0)
        output.push(DIGITS[a], 'trăm');  // Đọc là "a trăm"
    
    // Nối thêm phần sau (b, c)
    // Ở đây dùng spread syntax để nối output
    output.push(...readTwo(b, c, a != 0));

    return output;
}
```

Ở đây chúng ta lại có một ngoại lệ nữa khi so với tập mẫu. Đó là ở điều kiện `a != 0`. Hiện tại ở code trên thì:

* Nếu `a != 0` thì mới đọc số hàng trăm (a trăm)
* Nếu `a != 0` thì mới truyền tham số `hasHundred` là true cho `readTwo()`. Nếu tham số `hasHundred` là true, thì khi số dạng từ 100 tới 109, như 103 thì `readTwo` đọc là `một trăm lẻ ba` chứ không phải `ba`.

Tuy nhiên, ngoại lệ này xảy ra giữa các nhóm 3 số với nhau. Để mình đưa ra ví dụ thử là số `3 015 003`.

* **Khác biệt nhóm 1 (3) và nhóm cuối (003) khi đọc:** Nhóm đầu chỉ đọc là "ba", nhưng nhóm cuối phải đọc là "(không trăm lẻ) ba".
* Nếu không đọc như trên thì sẽ bị lỗi, kết quả lỗi là "không trăm lẻ ba (triệu) không trăm mười lăm (nghìn) không trăm lẻ ba (đơn vị)"
* Hoặc nếu không đọc "không trăm lẻ" thì kết quả sai sẽ còn là "ba triệu mười lăm (nghìn) ba (đơn vị)". Hai nhóm đầu đọc khá ổn rồi nhưng nhóm cuối thì hơi tã :joy:

Do đó chứng tỏ điều kiện `a != 0` là chưa đủ để xử lý hai trường hợp trên. Cách xử lý là thêm một tham số khác là `readZeroHundred` để xem có bắt buộc đọc chữ số hàng trăm không.

Cách sửa thì đơn giản thôi, chỉ cần đổi lại điều kiện `a != 0` thành `a != 0 || readZeroHundred` là được.

```js

function readThree(a, b, c, readZeroHundred) {
    const output = [];

    // Đọc phần trăm (a) trước
    if (a != 0 || readZeroHundred)
        output.push(DIGITS[a], 'trăm');  // Đọc là "a trăm"
    
    // Nối thêm phần sau (b, c)
    // Ở đây dùng spread syntax để nối output
    output.push(...readTwo(b, c, a != 0 || readZeroHundred));

    return output;
}
```

Tuy nhiên, làm sao biết nhóm nào luôn cần đọc. Như ví dụ hồi nãy, nhóm đầu tiên thì không cần đọc, các nhóm còn lại thì phải luôn đọc hàng trăm. Do đó, giá trị của `readZeroHundred` qua các nhóm như sau.

> 3 - 015 - 003
> 
> false - true - true - và nhiều true nữa

Do đó, khi gọi hàm đọc số thì dựa vào chỉ số nhóm mà truyền tham số `readZeroHundred` cho phù hợp.

## 2. Ghép thành code hoàn chỉnh

Cho xem thành quả trước nhé, hihi :100:



### 2.1. Khi switch sử dụng strict comparison

Nhớ lại function `readTwo()` có sử dụng câu lệnh switch. Mình khá chắc là vẫn còn nhiều bạn chưa biết điều này.

> Trong JavaScript thì switch sử dụng strict comparison
> 
> Nghĩa là khi so sánh các case, dấu === sẽ được sử dụng thay vì ==.

Do code chúng ta chỉ cắt chuỗi vào biến `a`, `b`, `c` nên so sánh trong switch sẽ luôn bị false. Do đó, chúng ta cần dùng `parseInt()` để chuyển thành số.

```js
// Đọc từng phần
const output = [];
for (let i = 0; i < num.length / 3; i++) {
    let [a, b, c] = num.substr(i * 3, 3);
    a = parseInt(a);
    b = parseInt(b);
    c = parseInt(c);
    
    // Ở đây mình set cứng readZeroHundred luôn là true
    output.push(...readThree(a, b, c, true));  // Dùng spread operator
    
    // Đọc phần đơn vị của nhóm
    output.push(UNITS[num.length / 3 - 1 - i]);
}

// Sau khi hoàn tất thì chỉ cần join lại là được
console.log(output.join(' '));
```

Bên trên là code đã khá hoàn chỉnh rồi.

### 2.2. Xác định nhóm đầu tiên

Như đã nói ở trên, khi gọi `readThree()` trên từng nhóm, thì tham số `readZeroHundred` nhóm đầu tiên là false, các nhóm còn lại là true hết. Vấn đề đặt ra là làm sao biết đâu là nhóm đầu tiên?

Đơn giản, nhóm đầu tiên có chỉ số `i = 0`. Mình đặt thêm biến `isFirstGroup` để code dễ đọc hơn.

```js
// Đọc từng phần
const output = [];
for (let i = 0; i < num.length / 3; i++) {
    let [a, b, c] = num.substr(i * 3, 3);
    a = parseInt(a);
    b = parseInt(b);
    c = parseInt(c);
    
    // Sửa lại ở đây
    const isFirstGroup = i == 0;
    output.push(...readThree(a, b, c, !isFirstGroup));  // Dùng spread operator
    
    // Đọc phần đơn vị của nhóm
    output.push(UNITS[num.length / 3 - 1 - i]);
}

// Sau khi hoàn tất thì chỉ cần join lại là được
console.log(output.join(' '));
```

Lúc này `readZeroHundred` sẽ là phủ định của `isFirstGroup`, nghĩa là nếu là nhóm đầu tiên thì `readZeroHundred` là false, ngược lại là true.

Và đây là kết quả, tèn ten :100: Dòng đầu tiên là set cứng `readZeroHundred` là true, còn dòng sau là code mới sửa lại.

![](https://images.viblo.asia/8d69a25e-9786-4a8b-8e2e-e7b57544f78b.png)

Toàn bộ code hoàn chỉnh mình để ngay đây https://gist.github.com/tonghoangvu/e3f27e8b6815b5fd83b39fd5502c6d43. Cho mình một star nếu bạn thích nhé.

---

Bài viết tới đây là hết rồi. Và ngay sau đây là thử thách dành cho các bạn. Hãy thử mở rộng phạm vi đề ra như sau:

* Cho phép đọc cả số âm. Ví dụ `10` đọc là `mười`, còn `-10` đọc là `âm mười`.
* Đọc các chữ số sau phần thập phân. Ví dụ `3.14` đọc là `ba chấm mười bốn`.
* Chuẩn hóa input trước khi đọc (ví dụ loại bỏ các số 0 đầu bị thừa, hay các số 0 sau cùng phần thập phân)
* Thêm các tính năng khác như đọc phần đơn vị (ví dụ `đồng`, `đơn vị`,...) mà bạn có thể nghĩ ra.
* Loại bỏ các vị trí set cứng từ ví dụ "mốt", "tư",... và thay bằng các biến config

Nếu cảm thấy bài viết hữu ích, đừng ngại clip và upvote cho tớ nhé :heart_eyes: Mãi thân.