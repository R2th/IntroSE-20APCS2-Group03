### **I. Chunk**

Chuyển 1 mảng thành 1 mảng chứa các mảng con nhỏ hơn với số lượng element định sẵn

Chúng ta sẽ dùng `Array.from()` để tạo mảng mới có số lượng element khớp với size ta mong muốn.

Sử dụng Array.slice() để map các element của array mới thành 1 mảng có length = size

```
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_n, i) =>
    arr.slice(i * size, i * size + size)
  );
```

### **II. compact**
Loại bỏ các giá trị `false, null, 0, "", undefined, NaN` khỏi mảng

Sử dụng `Array.filter()` để filter các giá trị `false, null, 0, "", undefined, NaN`

```
const compact = arr => arr.filter(Boolean);
```

Examples:

`
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]
`

### **III. countOccurrences**
Đếm số lần xuất hiện của 1 giá trị trong 1 mảng

Sử dụng `Array.reduce()` để tăng giá trị biến đêm lên khi gặp giá trị đó trong mảng

```
const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
```

Examples:

`countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3`

### **IV: Flatten**

Chuyển tất cả các mảng con trong 1 mảng thành 1 mảng thống nhất

```
const flatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? flatten(v) : v)));
```

Examples:

`flatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]`


### **V: isSorted**

Trả về 1 nếu array đã được sort theo ascending order, trả về -1 nếu array đã được sort theo descending order và trả về 0 nếu array chưa được sort

```
const isSorted = arr => {
  const direction = arr[0] > arr[1] ? -1 : 1;
  for (let [i, val] of arr.entries())
    if (i === arr.length - 1) return direction;
    else if ((val - arr[i + 1]) * direction > 0) return 0;
};
```

Examples:

```
isSorted([0, 1, 2, 3]); // 1
isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0
```

### **VI: union**

Trả về 1 mảng mới chưa tất cả các phần tử có trong 2 mảng đã uniq
```
const union = (a, b) => Array.from(new Set([...a, ...b]));
```

Examples:

```
union([1, 2, 3], [4, 3, 2]); // [1,2,3,4]
```

### **VII: take**

Trả về 1 mảng chứa số phần tử yều cầu tính từ phần tử đầu tiên

```
const take = (arr, n = 1) => arr.slice(0, n);
```

Examples:
```
take([1,2,3,4,5,6,7,8]); // [1]
take([1,2,3,4,5,6,7,8], 0); // []
take([1,2,3,4,5,6,7,8], 2); // [1,2]
take([1,2,3,4,5,6,7,8], 10); // [1,2,3,4,5,6,7,8]
```

### Thanks for you watching****