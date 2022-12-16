Như các bạn đã biết, và cũng rất nhiều bài viết đã nói về vấn đề này, Promise và Observable đều là các kỹ thuật dùng để xử lý dữ liệu bất đồng bộ trong javascript nói chung và Angular nói riêng. Nhưng hai thằng này có gì khác nhau? Nên dùng thằng nào hơn? ... Những câu hỏi như vậy thì có rất nhiều người đặt ra, và trong bài viết này, mình xin đưa ra một vài phân tích cá nhân để chọn ra một thằng phù hợp nhất.
## 1. So sánh
### Khả năng trả về nhiều kết quả
* Đối với Promise, sau mỗi lần xử lý dữ liệu thì nó chỉ có thể trả về một giá trị duy nhất.
```typescript
const p = new Promise((resolve, reject) => {
    if (true) {
        resolve('Ket qua');
    } else {
        reject('Co loi');
    }
});

p.then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

// => Ket qua
```
* Với Observable, nó có thể trả về nhiều giá trị đồng thời.
```typescript
const ob = rxjs.Observable.create((observer) => {
    observer.next('Ket qua 1');
    observer.next('Ket qua 2');
    observer.next('Ket qua 3');
});

ob.subscribe((result) => {
    console.log(result);
});

// => Ket qua 1
// => Ket qua 2
// => Ket qua 3
```
### Khả năng hủy bỏ Request
* Đối với Promise, khi chúng ta đã tạo một request thì không có cách nào hủy bỏ request đó.
* Observable thì có khả năng hủy bỏ request đã tạo.
```javascript
const ob = rxjs.Observable.create((observer) => {
    observer.next('Ket qua 1');
    setTimeout(() => {
        observer.next('Ket qua 2');
    }, 5000); // Return "Ket qua 2" after 5s
});

const sub = ob.subscribe((result) => {
    console.log(result);
});

setTimeout(() => {
    sub.unsubscribe();
    console.log('Cancel request');
}, 2000); // Cancel request after 2s

// => Ket qua 1
// => Cancel request
```
### Khả năng Retry
* Promise không thể retry khi quá trình xử lý xảy ra lỗi, hoặc phải nhờ vào các tips, thư viện hỗ trợ của bên thứ 3.
* Observable cung cấp các operators **retry**, **retryWhen** giúp việc retry các request rất dễ dàng.
```javascript
const source = rxjs.of(1,2,3,4,5);

const retry = source.pipe(
    rxjs.operators.mergeMap(val => {
        if(val > 3) {
            return rxjs.throwError('Error!');
        }
        return rxjs.of(val);
    }),
    rxjs.operators.retry(2)
);

retry.subscribe((result) => {
    console.log(result);
},err => {
    console.log(err);
});

// => 1
// => 2
// => 3 // End first run
// => 1
// => 2
// => 3 // End first retry
// => 1
// => 2
// => 3 // End second retry
// => Error!
```
### Khả năng xử lý kết quả trước khi trả về
* Với Promise, do đặc tính chỉ trả về một kết quả duy nhất nên việc xử lý kết quả có thể thực hiện ở bước **sau khi đã nhận dc kết quả**.
```javascript
const p = new Promise((resolve, reject) => {
    if (true) {
        resolve('Ket qua');
    } else {
        reject('Co loi');
    }
});

p.then(result => {
    // Handle result
    result = 'Gia tri tra ve la: ' + result;
    
    console.log(result);
}).catch(error => {
    console.log(error);
});

// => Gia tri tra ve la: Ket qua
```
* Với Observable, nó cung cấp rất nhiều các operators mạnh mẽ, phục vụ cho việc xử lý kết quả trước khi trả về.
```javascript
const source = rxjs.of(1,2,3,4,5);

const ob = source.pipe(
    rxjs.operators.map(val => {
        // Handle result
        return val * 2;
    })
);

ob.subscribe((result) => {
    console.log(result);
},err => {
    console.log(err);
});

// => 2
// => 4
// => 6
// => 8
// => 10
```
Tham khảo thêm về các operators tại đây: [https://www.learnrxjs.io/operators](https://www.learnrxjs.io/operators)
## 2. Kết luận
Như vậy các bạn có thể thấy Observable đã tỏ rõ thế mạnh của mình hơn Promise nên lựa chọn của mình là sử dụng Observable trong Angular. Cũng không phải là ngẫu nhiên mà Angular nó lại chọn thằng Observable để phát triển đúng không! Hi vọng qua bài viết sơ sài này các bạn cũng có những đánh giá riêng về hai thằng này và có lựa chọn đúng đắn khi làm việc với Angular.