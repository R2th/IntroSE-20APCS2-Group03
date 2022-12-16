Chào các bạn, dạo gần đây mình có phải thực hiện một chức năng nhỏ nhưng khá là hay, đó là mình phải tìm cách để loại bỏ các phần tử lặp trong một mảng. Nhưng cũng may là mình phải thực hiện nó bằng javascript mà javascript lại hỗ trợ rất tốt tính năng này, hôm nay mình sẽ chia sẻ với các bạn một số cách mà mình tìm ra để loại bỏ các phần tử lặp trong một mảng bằng javascript nhé.

## 1. Set
`Set` là một kiểu object mới của javascript được giới thiệu trong phiên bản `es6`. Mình cũng không tìm hiểu sâu về api này, nếu các bạn muốn đi sâu về api này thì các bạn có thể đọc ở [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) nhé, cơ bản thì `Set` sẽ nhận vào một mảng mà trả về một object có kiểu `Set`, điều đặc biệt là object này vẫn có các method giúp chúng ta thao tác với `Set` giống như một mảng, thực chất thì `Set` cũng chỉ là một object lưu trữ các property của mình với các key theo dạng index giống với object có kiểu mảng, nên các bạn có thể coi `Set` là một mảng đặc biệt cũng được. Thế nhưng, điều đặc biệt của `Set` đó là nó sẽ không chứa các giá trị lặp, nghĩa là nếu mảng của bạn có 2 giá trị lặp thì `Set` sẽ tự động xoá một giá trị lặp đi.

```js
const arr = [1, 2, 3, 2, 3, 4, 5];

const set = new Set(arr); // {0: 1, 1: 2, 2: 3, 3: 4, 4: 5}

const newArr = [...set]; // *** trả về [1, 2, 3, 4, 5]
```

Như các bạn thấy, `Set` trả về một object chứa các property của mình bằng các key có kiểu index, thế nhưng, nó sẽ tự động loại bỏ các giá trị lặp lại.

Để có thể chuyển một `Set` về một mảng, các bạn có thể cùng `spread operator` như mình có viết ở trên, vì `Set` là một `iterable` object giống array và string (các bạn có thể đọc ở [đây](https://javascript.info/iterable)) nên chúng ta hoàn toàn có thể dùng `spread operator` (ý mình là `spread operator` cho mảng nhé) vốn chỉ hoạt động với `iterable object` để chuyển một `Set` thành một mảng. Ngoài ra, các bạn cũng có thể dùng `Array.from` để chuyển một `Set` về một mảng nhé.

```js
const set = new Set([1, 1, 2, 2]);

Array.from(set) // *** [1, 2]
```

Có một lưu ý khi các bạn dùng `Set` đó là nó chỉ tìm ra được các giá trị `primitive` lặp nhau, còn đối với các giá trị `none primitive` như object hay array thì `Set` sẽ không thể lọc ra các giá trị lặp được, để hiểu hơn về vấn đề này, các bạn có thể đọc về cách javascript lưu trữ các giá trị và `deep copy vs shallow copy` nhé.

```js
const arr = [
    { a: 1 },
    { a: 2 }
];

const set = new Set(arr);

const newArr = [...set]; // *** trả về [{ a: 1 }, { a: 2 }]
```

## 2. Reduce
Ngoài `Set` ra, các bạn cũng có thể kết hợp method `reduce` và `includes` để lọc ra các phần tử lặp nhau nhé.

```js
const arr = [1, 1, 2, 2];

const uniqueArr = arr.reduce((uniqueArr, item) => {
    if(uniqueArr.includes(item)) {
        return uniqueArr;
    } else {
        uniqueArr.push(item);
 
        return uniqueArr;
    }
}, []);

console.log(uniqueArr); // *** trả về [1, 2]
```

Như các bạn có thể thấy, `reduce` giúp chúng ta lọc các giá trị lặp khá dễ dàng. Nếu các bạn chưa biết về `reduce` thì hãy đọc ngay bài viết [này](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) nhé, method này cực kỳ hữu ích đó.

Chúng ta cũng có thể rút gọn đoạn code trên như sau:
```js
const arr = [1, 1, 2, 2];

const uniqueArr = arr.reduce((uniqueArr, item) => {
    return uniqueArr.includes(item) ? uniqueArr : [...uniqueArr, item];
}, []);

console.log(uniqueArr); // *** trả về [1, 2]
```

## Lời kết
Vậy là mình vừa giới thiệu với các bạn 2 cách mà mình có áp dụng để giúp các bạn lọc ra các giá trị lặp trong một mảng rồi, tuy 2 cách trên không thể lọc được các giá trị `none primitive`, nhưng mình nghĩ là chúng có thể giúp các bạn trong khá nhiều trường hợp đó. Nếu các bạn có cách lọc nào hay hơn, nhanh hơn hay có thể lọc được các giá trị `none primitive` thì các bạn hãy comment chia sẻ cho mình và các bạn đọc biết với nhé. Chúc các bạn một ngày tốt lành. Cheer !.