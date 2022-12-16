### Giới thiệu
Xin chào tất cả các bạn. Chào mừng các bạn đến với bài viết của mình và mình là LCD đây :D
Các bạn đọc tiêu đề thì chác cũng biết hôm nay mình nói về vấn đề gì rồi phải không?
Vâng đó chính là cách để dừng một vòng lặp sử dụng forEach của javascript như thế nào?
Không làm mất thời gian của các bạn nữa, chúng ta đến với phần thực hành ngay sau đây nhé.

### Sử dụng forEach
Với các bạn lập trình javascript thì chắc hẳn không còn xa lạ gì với `forEach`. Ngoài các vòng lặp thông thường như `for`, `while` thì `forEach` là một 1 vòng lặp khá hay để rút gọn thời gian viết code. Các bạn hãy xem ví dụ sau nhé.
- Ví dụ khi sử dụng vòng lặp `for`
```
const fruits = ['Apple', 'Banana', 'Orange', 'Watermelon'];

for(let i=0; i <= fruits.length; i++) {
    console.log(fruits[i]);
}
// Kết quả sẽ là
Apple
Banana
Orange
Watermelon
```

- Hoặc với vòng lặp `while`
```
const fruits = ['Apple', 'Banana', 'Orange', 'Watermelon'];

let i = 0;
while(i< fruits.length) {
    console.log(fruits[i]);
    i++;
}
```

Đấy như các bạn đã thấy ở trên là 2 ví dụ về `for` và `while`. Khi làm việc với `for` và `while` chúng ta luôn phải để ý đến biến index của mảng để có thể lấy được phần tử trong mảng, và nếu như không cẩn thận chúng ta có thể làm sai lệch kết quả mong muốn.
Vậy còn với `forEach` thì sao. Chúng ta hãy xem ví dụ sau:
```
const fruits = ['Apple', 'Banana', 'Orange', 'Watermelon'];
fruits.forEach(fruit => console.log(fruit));
```
Chỉ với 1 dòng lệnh đơn giản không cần phải đặt thêm biến mới rồi tăng index các kiểu :D

### Dừng vòng lặp

Với `for` và `while` thì đơn giản, chỉ cần chúng ta dùng lệnh `break`  là được. Ví dụ:
```
const fruits = ['Apple', 'Banana', 'Orange', 'Watermelon'];

for(let i=0; i <= fruits.length; i++) {
    if (fruts[i] === 'Orange') break;
    console.log(fruits[i]);
}

let i = 0;
while(i< fruits.length) {
    if (fruts[i] === 'Orange') break;
    console.log(fruits[i]);
    i++;
}
// Kết quả của 2 vòng lặp trên sẽ là:
Apple
Banana
```

Nhưng với `forEach` các bạn có biết cách để dừng nó :)))))) Tất nhiên là không thể dùng break như với `for` hay `while` rồi.  Nếu chưa biết thì mình sẽ hướng dẫn các bạn một số cách có thể dừng được nó nhé. 
Nào hãy cùng đến với cách đầu tiên.

#### 1. Sử dụng if
```
const fruits = ['Apple', 'Banana', 'Orange', 'Watermelon'];
fruits.forEach(fruit => {
    if (fruit === 'Orange') return;
    console.log(fruit);
});
```

Thực ra cách này nó không thực sự dừng vòng lặp mà nó chỉ bỏ qua và không thực hiện đoạn code phía trong, tuy nhiên nó kết quả cuối cùng vẫn đúng như chúng ta mong muốn.
Đối với những mảng có dữ liệu lớn thì cách này không thực sự hiệu quả. Và đây có thể xem là cách kém hiệu quả nhất để dừng `forEach`.
Đến với cách tiếp theo.

#### 2. Sử dụng throw, try ... catch
```
const fruits = ['Apple', 'Banana', 'Orange', 'Watermelon'];
try {
    fruits.forEach(fruit => {
        if (fruit === 'Orange') throw 'break-loop';
        console.log(fruit);
    });
} catch (error) {
    console.log(error);
}
```
Không giống như cách trên là chỉ bỏ qua code chứ không dừng vòng lặp thì cách này hoàn toàn dừng được vòng lập và kết quả vẫn đúng như thường. Nhưng cách này là một cách gây khá nhiều tranh cãi vì không ai lại muốn văng ra lỗi ở vòng lặp cả và nó có khá nhiều rủi ro.
Và hãy đến với cách cuối cùng mà mình biết để dừng `forEach` nhé.

#### 3. Không sử dụng forEach nữa
:grinning::grinning::grinning::grinning::grinning::grinning:
Nghe khá là buồn cười đúng không. Cách để dừng `forEach` chính là không sử dụng nó nữa. Vậy nếu không dùng `forEach` nữa thì dùng gì bây giờ ???
Các bạn hãy bình tĩnh vẫn còn có cách nhé. Thay vì sử dụng `forEach` thì chúng ta có thể sử dụng `every` hoặc `some`. Các bạn hãy xem ví dụ sau nhé:

```
const fruits = ['Apple', 'Banana', 'Orange', 'Watermelon'];
fruits.every(fruit => {
    if (fruit === 'Orange') return false;
    console.log(fruit);
    return true;
});

// Hoặc
fruits.some(fruit => {
    if (fruit === 'Orange') return true;
    console.log(fruit);
    return false;
});
```

### Kết luận
Trên đây mình đã giới thiệu cho các bạn cách dùng vòng lặp trong javascript cũng như cách để dừng các vòng lặp đó. Và cũng tùy vào từng trường hợp mà bạn nên chọn `for`, `while` hay dùng `forEach` để sử dụng cho thích hợp nhé. Nếu các bạn thấy hay hãy upvote và share để giúp mình có thêm động lực làm những bài viết hay và chất lượng hơn nhé :)