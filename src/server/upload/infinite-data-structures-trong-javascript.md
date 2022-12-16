> Bài viết được dịch từ nguồn: https://hackernoon.com/infinite-data-structures-in-javascript-eb67ecbccdb

<br>
Trong cuộc sống, chúng ta đã được tiếp cận với giá trị vô cùng rất nhiều. Ví dụ như trong toán học, tập hợp N chẳng hạn. Nhưng khi chúng ta lập trình, chúng ta luôn nghĩ các giá trị vô hạn theo một cách hữu hạn. Chúng ta không thể có 1 mảng tất cả phần tử số dương (ít nhất là trong JS).

Chính vì vậy trong bài viết này tôi muốn giới thiệu trong bài viết này ý tưởng của cấu trúc dữ liệu Dãy Vô Hạn. Chúng ta có thể tạo ra một chuỗi vô hạn và có thể sử dụng những method phổ biến như map, filter để thay đổi hay tạo ra một chuỗi mới.

Ý tưởng cơ bản là chúng ta có một dãy mà chẳng cần quan tâm có bao nhiều phần từ, lúc cần chúng ta muốn lấy bao nhiêu thì truyền tham số như ví dụ dưới đây.
```
allPositiveNumbers.take(10);
// -> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

allEvenNumbers.take(10);
// -> [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ]


allOddNumbers.take(10);
// -> [ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19 ]
```

## Creating an Infinite List
Để tạo dạng dữ liệu như trên, chúng ta cần cần hiểu 2 điều:
- The iterator pattern
- Generator functions

### The iterator pattern
Đầu tiên chúng ta cùng lướt qua iterator pattern nhé. Iterator pattern là một loại design pattern mà ta có thể truy cập các phần tử mà không cần quan tâm tới cách nó thực hiện như thế nào. Ở ví dụ dưới là một ví dụ, ta trả về một object với mỗi lần gọi `next()`. Khi method được gọii, nó trả về 1 object với 2 key: value và done. Khi gọi method .next(), thuộc tính done chỉ ra giá trị lặp có nhiều hơn giá trị đưa vào hay không. Còn value là giá trị hiện tại của object đó. 

```js=12
const createIterator = () => {
  let x = 0;
  return {
    next: () => {
      if (x > 3) {
        return { value: undefined, done: true };
      } else {
        const currentValue = x;
        x += 1;
        return { value: currentValue, done: false }; 
      }
    }
  }
};

const iterator = createIterator();
iterator.next();
// -> { value: 0, done: false }

iterator.next();
// -> { value: 1, done: false }

iterator.next();
// -> { value: 2, done: false }

iterator.next();
// -> { value: 3, done: false }

iterator.next();
// -> { value: undefined, done: true }

```

*Có chú ý nhỏ là: chúng ta tạo ra 1 function trả về object,  khi chúng ta `createIterator()` thì nó sẽ luôn trả về 1 object mới. Nên khi ta thực hiện `createIterator().next()` thì nó chỉ thực hiện trên object mới tinh mỗi lần gọi nên kết quả lúc nào cũng là `{value: 0, done: false}`. Chính vì vậy ta phải tạo ra 1 instance để có thể thực hiện `.next()` lúc đó giá trị mới tăng. *

### Generator functions

Generator functions là một loại function nó được khai báo với cú pháp `function* name`. Generator functions có khả năng tạm ngưng thực thi trước khi hàm kết thúc, và có thể tiếp tục chạy ở 1 thời điểm khác. (Tham khảo chi tiết: [bài viết này](https://viblo.asia/p/generator-trong-javasccript-WEMGBjjVGQK)). Ta sẽ  sử dụng nó để tạo ra 1 iterator object  nhưng theo cách rõ ràng hơn. Dưới đây là một ví dụ đơn giản

```
const createIterator = function* () {
  let x = 0;
  while (x < 4) {
    yield x;
    x += 1;
  }
};

```

Ở đây ta dùng từ khóa yield để biệu thí giá trị mà nó trả về mỗi lần bộ lặp được gọi.  Khi nó được gọi qua `.next()` nó sẽ thực hiện và dừng ở `yield` cho tới khi ai đó gọi `.next()` một lần nữa. 

Cùng xem  ví dụ về bộ tạo chuỗi fibonacci nhé:
![](https://images.viblo.asia/1ccff811-82a8-4c62-a8ea-c8b73eb0495d.png)

Và đây là kết quả ở console:
![](https://images.viblo.asia/54225c43-0e72-4efc-9a2b-c5a24890476e.png)


Ở ví dụ trên, cách viết `white(true)` chắc chắn sẽ gây ra vòng lặp vô hạn nếu ta sử dụng nó 1 cách bình thường. Nhưng với `yeild` đặt bên trong loop `generator`, nó sẽ dừng lại mỗi lần lặp, lệnh yield cũng giữ lại gía trị của function. Và chương trình tạm dừng ở đó cho tới khi thực hiện `.next()`.  Nhìn log có thể thấy chi tiết rõ hơn về nó thực hiện như thế nào, điều đặc biệt ai cũng thấy là nó nó k hiện dòng `end Generator` vì như ở trên ấy có gặp `yield` thì nó tạm dừng nên không bao giờ nó xuống dc tới dòng cuối - hay nó `generator` vô hạn, k có hồi kết.

### Nhóm các phần tử đơn lẻ vào mảng
Ở phần trên chúng ta đã tạo ra một bộ lặp vô hạn, với mỗi lần `next()` thì sẽ có một 'hàng' (giá trị) mới được 'sản xuất' ra. Tuy nhiên điều này chỉ tạo ra các giá trị đơn lẻ, và không có tính liên tục, tính liên tục tức là tạo 1 dãy số mà không phải gọi nhiều lần `.next()` đó.

<br>
Giả sử nếu ta muốn có một `generator` các số fibonacci  có tận cùng là 5 thì sao. Thường thì ta sẽ nghĩ tới cách phổ thông hồi đại học nhưng cách đó ta phải cho 1 giá trị đầu vào rùi trả ra 1 mảng không như ý tưởng của ta là tạo giá trị ta muốn cho tới chết nên ta bỏ qua cái cách hồi đại học đó đi nhé.
<br>
<br>
Nếu bạn muốn tạo ra một `generator` lọc các số fibonacci mà có tận cùng là 5. T sẽ rất khó sử dụng `createFibSeqIterator()` để làm điều đó với ý tưởng `infinity` của mình.  Để khắc phục điều đó, chúng ta cần đóng gói generator trong 1 Classs và ở đây ta có thể triển khai các method filter, map, take:

```
class Infinite {
  constructor (generatorFn) {
    this.generator = generatorFn;
  }
  
  // Implement methods
}
```

### Infinitely Lazy

Bạn có thể bối rối khi nghĩ về cách triển khai với filter. Vì ta không dại tạo ra 1 mảng ti tỷ số để filter vì điều đó bất khả thi. Để giải quyết vấn đề đó chúng ta sẽ  `lazily`. Thay vì  cố filer list, chúng ta chỉ tạo 1 điểm trong Infinite Class. Khi chúng ta muốn, ta sẽ `take()` một vài phần tử, chúng ta co thể thực thiện công việc lọc bình thường :

```
class Infinite {
  constructor (generatorFn) {
    this.generator = generatorFn;
    this.transformations = [];
  }

  filter(filterFn) {
    const newInfinite = new Infinite(this.generator);
    newInfinite.transformations = this.transformations.slice();
    newInfinite.transformations.push({
      type: 'filter',
      fn: filterFn
    });

    return newInfinite;
  }
}

```

Ở đây method `filter` ta sẽ thay thay đổi giá trị transformations bằng dạng như trên, key thứ nhất là 'filter' và key số 2 ứng với function .
Chúng ta sẽ push vào transformation đó mỗi lần filter dc gọi.

```
class Infinite {
  constructor (generatorFn) {
    this.generator = generatorFn;
    this.transformations = [];
  }

  filter(filterFn) {
    const newInfinite = new Infinite(this.generator);
    newInfinite.transformations = this.transformations.slice();
    newInfinite.transformations.push({
      type: 'filter',
      fn: filterFn
    });

    return newInfinite;
  }

  take(n) {
    const iterator = this.generator();
    const concrete = new Array(n);
    let index = 0;

    while (index < n) {
      const {value, done} = iterator.next();

      if (done) {
        // The generator wasn't infinite, return what we got up until this point
        return concrete;
      }

      // Loop over the transformations and apply them to the value
      let x = value;
      let filtered = false;
      for (let i = 0; i < this.transformations.length; i++) {
        const T = this.transformations[i];

        if (T.type === 'filter') {
          if (!T.fn(x)) {
            filtered = true;
          }
        }
      }

      // After the transformations are complete, if we didn't filter, then we can
      // x to the concrete list
      if (!filtered) {
        concrete[index] = x;
        index++;
      }
    }

    return concrete;
  }
}

```

Khi thực hiện `.take(n)` chúng ta sẽ tạo ra `1 iterator` với function được truyền từ constructor. Nhận tham số n ứng với số phần tử ta muốn lấy ra. Ta bổ sung thêm `index` nhằm tracking giá trị trong vòng lặp. Nếu số phần tử lấy ra chưa đủ với tham số `n`, nó sẽ liên tục thực hiện `.next()`  và add vảo biến `concrete`. Ở đây có một chố chúng ta check điều kiện `done` do `generator` này không phải vô hạn, cơ bản sẽ có lúc nó phải dừng lại (đại khái là ta tạo ra dãy vô hạn nhưng thực tế vẫn là dãy hữu hạn). Còn các phần khác thì nó liên quan tới hàm filter ta sẽ giải thích sau. 

Đoạn code phía dưới là ta khởi tạo ra 1 `generator` tạo chuỗi fibonacci và dùng `.take()` lấy ra 5 phần tử trong dãy, dùng `filter và take` để lấy ra 5 phần tử có tận cùng là 5.

```
const fibonacciSequence = new Infinite(function* () {
  let a = 0;
  let b = 1;
  while (true) {
    yield b;
    const tmp = a;
    a = b;
    b = b + tmp;
  }
});

const fibsEndingWith5 = fibonacciSequence.filter(x => {
  const str = x.toString();
  return str[str.length - 1] === '5';
});

fibonacciSequence.take(5);
// -> [ 1, 1, 2, 3, 5 ]

fibsEndingWith5.take(5);
// -> [ 5, 55, 6765, 75025, 9227465 ]

```

Giờ chúng ta sẽ quay lại phần liên quan tới filter và giải thích 1 chút kĩ hơn cả 2 đoạn mã nhé:
- Đầu tiên ta sẽ khởi tạo `fibonacciSequence` là bộ tạo chuỗi fibonacci
- Sau đó chúng ta tạo ra bộ lọc với `fibonacciSequence` để lấy ra các thằng có tận cùng là 5. Hàm bên trong filter được truyền vào `transformations` theo dạng object với format `{ type: 'filter', fn: filterFN}` ( mới map thì thay = map , fitlerFn là functio ntruyeenf vào trong filter).
- Khi gọi take, nó sẽ lặp qua `n` phần tử kiểm tra xem giá trị fib có cần lọc không, và truyền vào cho function trong filter để check điều kiện, sau đó add vào mảng `concrete`.
- Và đưa ra được kết quả.

## Tổng kết
Tổng kết lại qua bài viết chúng ta khám phá được 2 kiến thức ở mức cơ bản là iterator pattern và generator functions để tạo Infinite List data structure. Tuy rằng cách thực hiện còn nhiều vấn đề cũng như cách giải thích của người dịch hơi dài dòng, nhưng bạn cũng có thể hiểu qua phần nào về nó. Nếu bạn k hiểu hãy cố đọc lại 1 lần nữa và tìm hiểu kĩ các liên kết đính kèm nhé ( phía trên).
Cuối cùng, cảm ơn bạn đã dành thời gian đọc bài viết.

> Bài viết được dịch từ: https://hackernoon.com/infinite-data-structures-in-javascript-eb67ecbccdb