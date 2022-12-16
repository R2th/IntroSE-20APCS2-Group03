Ở trong bài chia sẻ trước thì mình đã đưa đến với mọi người những method array phổ biến và hay dùng, tiếp tục series đó, hôm nay mình lại chia sẻ cho các bạn các method hay được sử dụng của các developer javascript, những chia sẻ dưới đây một phần là dựa vào hiểu biết của bản thân và tham khảo một số nguồn ở phía cuối bài viết, vậy nên anh chị em nào cảm thấy chưa đúng thì hãy góp ý cho mình nhé, thanks các bạn, thôi không để làm mất thời gian của các bạn nữa, chúng ta hãy đi đến với những nội dung chính nào... let's go !! 

## Object javascript là gì
Đối tượng trong Javascript là một tập hợp các cặp khóa - giá trị, tương tự như bản đồ, từ điển, hay hash-table trong ngôn ngữ lập trình khác.
* Đối tượng là một tập hợp các thuộc tính
* Thuộc tính là một cặp khóa - giá trị chứa tên và giá trị
* Tên thuộc tính là một giá trị duy nhất có thể bị ép buộc vào một chuỗi và trỏ đến một giá trị
* Giá trị thuộc tính có thể là bất kỳ giá trị nào, bao gồm các đối tượng khác hoặc các hàm, được liên kết với tên/khóa

## Phương thức JavaScript entries()
Được giới thiệu trong ES2017.
Phương thức này trả về một mảng chứa tất cả các thuộc tính của riêng đối tượng, dưới dạng một mảng [key, value] cặp

```js
const person = { name: 'Fred', age: 87 }
Object.entries(person) // [['name', 'Fred'], ['age', 87]]

// cũng có thể sử dụng được với mảng :

const people = ['Fred', 'Tony']
Object.entries(people) // [['0', 'Fred'], ['1', 'Tony']]
```
## Phương thức JavaScript keys()

Object.keys() chấp nhận một đối tượng làm đối số và trả về một mảng tất cả các thuộc tính có thể liệt kê (riêng) của nó.
```js
const car = {
  color: 'Blue',
  brand: 'Ford',
  model: 'Fiesta'
}
Object.keys(car) //[ ‘color’, ‘brand’, ‘model’ ]
```

## Phương thức JavaScript create()
Được giới thiệu trong ES5.
Tạo một đối tượng mới, với nguyên mẫu được chỉ định.

```js
const newObject = Object.create(prototype)

const animal = {}
const dog = Object.create(animal)
```

Đối tượng mới được tạo sẽ kế thừa tất cả các thuộc tính của đối tượng nguyên mẫu.
Bạn có thể chỉ định một tham số thứ hai để thêm các thuộc tính mới vào đối tượng mà nguyên mẫu thiếu:

```js
const newObject = Object.create(prototype, newProperties)
```
Trong đó newProperties là một đối tượng của các đối tượng xác định từng thuộc tính.
```js
const animal = {}
const dog = Object.create(animal, {
  breed: {
    value: 'Siberian Husky'
  }
});
console.log(dog.breed) //'Siberian Husky'
```

Object.create()thường được sử dụng kết hợp vớiObject.assign().

## Phương thức Javascript assign() 
Object.assign() là một method dùng để sao chép những giá trị từ một object này sang một object khác. Ở ví dụ dưới đây, chúng ta sử dụng Object.assign() để merge chúng lại với nhau:
```js
const sourceObject = {
    firstName: 'Dung',
    lastName: 'Quoc'
};
const targetObject = Object.assign({}, sourceObject);

console.log(targetObject); // { firstName: 'Dung', lastName: 'Quoc' }
```

Các thuộc tính của đối tượng đích sẽ được viết đè với các thuộc tính của đối tượng đích nếu chúng có key giống nhau.

```js
const sourceObject = {
    firstName: 'Dung',
    lastName: 'Quoc'
};
const targetObject = Object.assign({ lastName: 'Tran' }, sourceObject);
console.log(targetObject); // { firstName: 'Dung', lastName: 'Tran' }

```

## Phương thức JavaScript seal() 
   Phương thức JavaScript seal () của đối tượng Object nhận một đối tượng làm đối số và trả về cùng một đối tượng. Đối tượng được truyền dưới dạng đối số bị thay đổi và bây giờ nó là một đối tượng sẽ không chấp nhận thuộc tính mới. Thuộc tính mới không thể được thêm vào, và các thuộc tính hiện có không thể bị xóa, nhưng thuộc tính hiện có thể bị thay đổi.
```js
const dog = {}
dog.breed = 'Siberian Husky'
Object.seal(dog)
dog.breed = 'Pug'
dog.name = 'Roger' //TypeError: Cannot add property name, object is not extensible
```

Đối số được truyền dưới dạng đối số cũng được trả về dưới dạng đối số, do đó dog===myDog (nó là cùng một đối tượng chính xác).

## Kết luận 
Trên đây là một số phương thức với object trong Javascript. Còn tương đối nhiều những phương thức khác nữa nhưng mình chỉ liệt kê một số thứ bản thân hay dùng hoặc có khả năng dùng. Cảm ơn bạn đã theo dõi bài viết.
Hãy đón xem phần 2 của mình vào thời gian tới nhé . 
### Tham khảo 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object