# Giới thiệu
Thật đơn giản để so sánh các kiểu dữ liệu nguyên thủy ([Primitive data types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive))  trong Javascript. Toán tử `==` trả về `true` nếu các toán hạng **bằng nhau**, toán tử `===` trả về `true` nếu các toán hạng **bằng nhau** và **cùng kiểu**.

```js
1 == '1'; // => true
1 === '1'; // => false
```

Tuy nhiên đối với object, sẽ có một chút khó khăn vì chúng là dữ liệu có cấu trúc. Trong bài này chúng ta hãy cùng nhau đi tìm hiểu những cách so sánh 2 object trong javascript. **Bắt đầu thôi nào!**

# 1. So sánh bằng tham chiếu (Referential equality)
Javascript cung cấp 3 cách so sánh bằng tham chiếu 2 object:
* Toán tử bằng chính xác `===`
* Toán tử bằng `==`
* Hàm `Object.is()`

Khi thực hiện so sánh các object bằng bất kì cách nào phía trên, kết quả sẽ là true nếu 2 giá trị được so sánh có cùng vùng nhớ. Đây chính là so sánh bằng tham chiếu.

Cùng đi qua ví dụ về so sánh bằng tham chiếu nhé.

```js
const object1 = {
  value: 1
};

const object2 = {
  value: 1
};

const object3 = object1;

object1 === object3; // => true
object1 === object2; // => false

object1 == object3; // => true
object1 == object2; // => false

Object.is(object1, object3); // => true
Object.is(object1, object2); // => false
```

`object1 === object3`,  `object1 == object3`, `Object.is(object1, object3)` là true bởi vì cả 2 object đều trỏ đến 1 vùng nhớ.

`object1 === object2`,  `object1 == object2`, `Object.is(object1, object2)` là false bởi vì object1 và object2 trỏ đến 2 vùng nhớ khác nhau dù cho chúng có cấu trúc tương đồng và giá trị value đều là 1.

Phép so sánh bằng tham chiếu rất hữu ích khi bạn muốn so sánh tham chiếu của 2 giá trị, nhưng trong nhiều trường hợp thì bạn cần so sánh giá trị thực sự của 2 object chẳng hạn: các thuộc tính và giá trị bên trong nó. Vậy thì xem cách bên dưới coi thử giúp được gì không nhé.

# 2. So sánh thủ công (Manual comparison)
Đây là cách so sánh khá rõ ràng và dễ hiểu. Ví dụ function isObjectEqual() dưới đây so sánh 2 object.

```js
function isObjectEqual(object1, object2) {
  return object1.value === object2.value;
}

const object1 = {
  value: 1
};

const object2 = {
  value: 1
};

const object3 = = {
  value: 2
};

isObjectEqual(object1, object2); // => true
isObjectEqual(object1, object3); // => false
```

isObjectEqual() truy cập đến thuộc tính value của cả 2 object và thực hiện so sánh 2 giá trị của chúng.

Nếu object có vài thuộc tính đơn giản thì chúng ta có thể viết function so sánh như isObjectEqual(). Cách này đem lại hiệu suất tốt nhưng nếu object lớn với nhiều thuộc tính chồng lên nhau thì đây không phải là cách hữu hiệu, vì code sẽ rất dài và khó đọc.

Chúng ta hãy xem tiếp cách so sánh nông sau, xem hữu ích như nào.

# 3. So sánh nông (Shallow equality)
Trong quá trình so sánh nông, các object của bạn sẽ được lấy các thuộc tính (bằng cách dùng `Object.keys()`), sau đó sẽ kiểm tra giá trị của các thuộc tính đó bằng cách so sánh tham chiếu.

Đây là cách so sánh nông hoạt động.

```js
function shallowObjectEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}
```

Bên trong function phía trên, `keys1` và `keys2` là các mảng chứa danh sách tên thuộc tính của `object1` và `object2`.

Vòng lặp `for` sẽ lặp qua từng `key` và thực hiện phép so sánh tham chiếu bằng toán tử không bằng chính xác `object1[key] !== object2[key]`.

Cùng mình xem kết quả so sánh dưới nhé.

```js
const object1 = {
  value: 1,
  name: 'Test'
};

const object2 = {
  value: 1,
  name: 'Test'
};

const object3 = {
  value: 1,
  name: 'Test Test'
};

const object4 = {
  value: 1
};

shallowObjectEqual(object1, object2); // => true
shallowObjectEqual(object1, object3); // => false
shallowObjectEqual(object1, object4); // => false
```

`shallowObjectEqual (object1, object2)` trả về `true` vì các đối tượng `object1` và `object2` có cùng thuộc tính (value và name) với cùng giá trị.

`shallowObjectEqual(object1, object3)` trả về `false` vì các đối tượng `object1` và `object2` có cùng thuộc tính (value và name) nhưng lại khác giá trị name

`shallowObjectEqual(object1, object4)` trả về `false` vì các đối tượng `object1` và `object4` khác thuộc tính.

Nếu các giá trị thuộc tính của các đối tượng để so sánh là các giá trị nguyên thủy, thì việc so sánh nông hoạt động tốt.

Nhưng các đối tượng trong JavaScript có thể được lồng vào nhau. Trong trường hợp như vậy, thật không may, so sánh nông này lại không hoạt động tốt.

Hãy thực hiện kiểm tra so sánh nông trên các đối tượng có các đối tượng lồng nhau như sau:

```js
const object1 = {
  value: 1,
  name: 'Test',
  address: {
    city: 'Ha Noi'
  }
};

const object2 = {
  value: 1,
  name: 'Test',
  address: {
    city: 'Ha Noi'
  }
};

shallowObjectEqual(object1, object2); // => false
```

Lần này thì cả `object1` và `object2` có thuộc tính và giá trị giống nhau nhưng kết quả so sánh lại trả về là `false`. Điều này xảy ra bởi vì giá trị `object1.address` và `object2.address` không còn là kiểu dữ liệu nguyên thủy  nữa, nó đã trở thành `object`, vì thế javascript sẽ so sánh tham chiếu của `object1.address` và `object2.address`. Lúc này `object1.address` và `object2.address` thuộc 2 vùng nhớ khác nhau. Do vậy, sẽ có kết quả là `false` là đúng rồi.

May mắn là cho ta vẫn còn một cách so sánh nữa, đó là so sánh sâu, nó sẽ giúp chúng ta so sánh đầy đủ nội dung bên trong của object.

# 4. So sánh sâu (Deep equality)
So sánh sâu thì khá tương đồng với so sánh nông, nhưng thay vì so sánh nông chỉ so sánh một cấp thì so sánh sâu sẽ so sánh nhiều cấp, nó sẽ thực hiện so sánh toàn bộ thuộc tính của object. Với phép so sánh sâu này thì bạn có thể hiểu là nếu nội dung 2 object y hệt nhau thì nó sẽ bằng nhau.

Cùng xem cách mà so sánh sâu hoạt động nào.
```js
function deepObjectEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
 
    if (
      areObjects && !deepObjectEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}
```

Như bạn thấy bên trên, đoạn `areObjects && !deepObjectEqual(val1, val2)` ta thực hiện đệ quy để có thể lặp hết vào trong các thuộc tính của object. Cùng xem ví dụ thử nhé:
```js
const object1 = {
  value: 1,
  name: 'Test',
  address: {
    city: 'Ha Noi'
  }
};

const object2 = {
  value: 1,
  name: 'Test',
  address: {
    city: 'Ha Noi'
  }
};

deepObjectEqual(object1, object2); // => true
```

So sánh sâu sẽ giúp ta xác định một cách chính xác 2 object có thực sự bằng nhau về mặt nội dung hay không.

Để thực hiện so sánh sâu, bạn có thể sử dụng [`isDeepStrictEqual(object1, object2)`](https://nodejs.org/api/util.html#util_util_isdeepstrictequal_val1_val2) một util được build sẵn trong Node hoặc [`_.isEqual(object1, object2)`](https://lodash.com/docs/4.17.15#isEqual) của thư viện lodash.

# 5. Một số cách so sánh khác
## 5.1 JSON.stringify()
Chúng ta cùng xem xét ví dụ sau nào:
```js
const object1 = {
  value: 1,
  name: 'Test',
  address: {
    city: 'Ha Noi'
  }
};

const object2 = {
  value: 1,
  name: 'Test',
  address: {
    city: 'Ha Noi'
  }
};

JSON.stringify(object1) === JSON.stringify(object2); // true
```

Cách này hoạt động khi bạn có các đối tượng kiểu JSON đơn giản mà không có các **function** và nút **DOM** bên trong. Và với cách này thì thứ tự các thuộc tính đặc biệt quan trọng. Cùng quan sát vị dụ sau nhé:

```js
const object1 = {
  value: 1,
  name: 'Test',
  address: {
    city: 'Ha Noi'
  }
};

const object2 = {
  name: 'Test',
  value: 1,
  address: {
    city: 'Ha Noi'
  }
};

JSON.stringify(object1) === JSON.stringify(object2); // false
```

Ở ví dụ này, trong `object2` đã đổi thứ tự 2 thuộc tính `value` và `name` khác với `object1`. Và dẫn đến kết quả là `false`. 

Nếu bạn dùng cách so sánh này thì hãy lưu ý những vấn đề mà nó sẽ gặp phải như sau:
> Sẽ **chết** hoặc **sai** ngay:
> * Khi vào bọn **non enumerable** hoặc **function**, hoặc **tree vòng tròn** (parent trỏ đến child, chid lại trỏ đến parent).
> * Trường hợp bị đảo ngược **thứ tự các property** của json. 

# Tổng kết
Bài viết hôm nay của mình đến đây là kết thúc, hy vọng bài viết của mình giúp các bạn hiểu được cách so sánh các object trong javascript , có thể áp dụng hợp lý và chính xác vào trong dự án. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.