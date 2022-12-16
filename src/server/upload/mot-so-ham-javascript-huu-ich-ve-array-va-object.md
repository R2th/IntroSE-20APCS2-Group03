![](https://images.viblo.asia/668e6883-3da4-4f67-97a4-361256d579a7.png)

Không dài dòng nữa, bắt đầu luôn thôi nào mọi người =))

## 1. filter()
Tạo một mảng mới dựa trên các `items` từ bảng cũ qua một số điều kiện lọc nhất định:

**Ví dụ:**

Tạo một bản mảng các sinh viên có độ tuổi được uống chất có cồn:

```javascript
const studentsAge = [17, 16, 18, 19, 21, 17];
const ableToDrink = studentsAge.filter( age => age > 18 );
// ableToDrink will be equal to [19, 21]
```

## 2. map()

Tạo một mảng mới bằng cách tùy chỉnh giá trị từ mảng khác.

**Ví dụ:**

Tạo một mảng và thêm vào trước mỗi phần tử ký hiệu `$`.

```javascript
const numbers = [2, 3, 4, 5];
const dollars = numbers.map( number => '$' + number);
// dollars will be equal to ['$2', '$3', '$4', '$5']
```

## 3. reduce()

Làm giảm bớt đi tất cả các phần tử trong mảng trở thành một giá trị đơn. 

Giá trị trả về có thể là bất cứ loại nào (object, array, string, integer)

**Ví dụ:**

Tính tổng giá trị trong mảng

```javascript
const numbers = [5, 10, 15];
const total = numbers.reduce( (accumulator, currentValue) => accumulator + currentValue);
// total will be equal to 30
```

Ngoài ra `reduce()` còn có thể gom nhóm đối tượng bởi một thuộc tính, xóa các `item` bị lặp, flatten một mảng, ...

## 4. forEach()

Thực hiện các `job` như nhau đối với từng phần tử trong mảng.

**Ví dụ:**

In ra các phần tử của mảng

```javascript
const emotions = ['happy', 'sad', 'angry'];
emotions.forEach( emotion => console.log(emotion) );
// Will log the following:
// 'happy'
// 'sad'
// 'angry'
```

## 5. some()

Duyệt các phần tử trong mảng, khi có phần tử thỏa mãn điều kiện thì sẽ kết thúc vòng lặp và trả về giá trị `true`

```javascript
const userPrivileges = ['user', 'user', 'user', 'admin'];
const containsAdmin = userPrivileges.some( element => element === 'admin');
// containsAdmin will be equal to true
```

## 6. every()

Tương tự như với hàm `some()`, nhưng hảm chỉ trả ra `true` khi tất cả các thuộc tính trong mảng đều thỏa mãn điều kiện

```javascript
const ratings = [3, 5, 4, 3, 5];
const goodOverallRating = ratings.every( rating => rating >= 3 );
// goodOverallRating will be equal to true
```

## 7. includes()

Kiểm tra mảng có chứa phần tử đưa vào hay không, return `true` nếu mảng có chứa phần tử đó.

**Ví dụ:**

Kiểm tra nếu hàm nó chứa từ `waldo`

```javascript
const names = ['sophie', 'george', 'waldo', 'stephen', 'henry'];
const includesWaldo = names.includes('waldo');
// includesWaldo will be equal to true
```

## 8. Array.from()

Tạo một mảng mới dựa trên một mảng khác hoặc chuỗi (string). 

**Ví dụ:**

Tạo một mảng từ một chuỗi

```javascript
const newArray = Array.from('hello');
// newArray will be equal to ['h', 'e', 'l', 'l', 'o']
```

Tạo một mảng mới mà có giá trị gấp đôi đối với giá trị tương ứng của mảng đã cho.

```javascript
const doubledValues = Array.from([2, 4, 6], number => number * 2);
// doubleValues will be equal to [4, 8, 12]
```

## 9. Object.values()

Trả về một mảng các giá trị đối tượng (Object)

**Ví dụ:**

```javascript
const icecreamColors = {
    chocolate: 'brown',
    vanilla: 'white',
    strawberry: 'red',
}

const colors = Object.values(icecreamColors);
// colors will be equal to ["brown", "white", "red"]
```

## 10. Object.keys()

Trả về một mảng các `key` của đối tượng (Object)

**Ví dụ:**

```javascript
const icecreamColors = {
  chocolate: 'brown',
  vanilla: 'white',
  strawberry: 'red',
}

const types = Object.keys(icecreamColors);
// types will be equal to ["chocolate", "vanilla", "strawberry"]
```

## 11. Object.entries()

Trả về một mảng mà nó chứa các cặp `key` - `value` của đối tượng

**Ví dụ:**

```javascript
const weather = {
  rain: 0,
  temperature: 24,
  humidity: 33,
}

const entries = Object.entries(weather);
// entries will be equal to
// [['rain', 0], ['temperature', 24], ['humidity', 33]]
```

## 12. Object.freeze()

Ngăn chặn việc chỉnh sửa các thuộc tính hiện có hoặc bổ sung thêm thuộc tính của đối tượng

Mọi người thường nghĩ từ khóa `const` cũng làm được thế, tuy nhiên, `const` vẫn cho phép bạn chỉnh sửa đối tượng

**Ví dụ:**

Ngăn chặn việc chỉnh sửa thuộc tính `name`

```javascript
const frozenObject = {
  name: 'Robert'
}

Object.freeze(frozenObject);

frozenObject.name = 'Henry';
// frozenObject will be equal to { name: 'Robert' }
```

## 13. Object.seal()

Ngăn chặn việc thêm thuộc tính mới vào đối tượng, nhưng vẫn có thể sửa đổi thuộc tính hiện có.

**Ví dụ:**

```javascript
const sealedObject = {
  name: 'Robert'
}

Object.seal(sealedObject);

sealedObject.name = 'Bob';
sealedObject.wearsWatch = true;
// sealedObject will be equal to { name: 'Bob' }
```

## Kết luận

Bài viết của mình đến đây là hết rồi, hi vọng sẽ hữu ích nhiều như tiêu đề đối với các bạn lập trình viên.
Cảm ơn mọi người đã quan tâm !!

Tài liệu tham khảo:
https://codeburst.io/useful-javascript-array-and-object-methods-6c7971d93230