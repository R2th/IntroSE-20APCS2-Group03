## Tổng quan
 > Set là một loại object trong ES6 giúp tạo một collection lưu các giá trị khác biệt, không bị trùng lặp. Các giá trị trong set có thể ở dạng primitives như string hay integer,  và cũng có thể ở dạng  phức tạp hơn như object hay array
 
Dưới đây là một vài ví dụ đơn giản về Set và một số phương thức của nó như
`add`, `size`,` has`, `forEach`, `delete` and `clear`:
```
let animals = new Set();

animals.add('🐷');
animals.add('🐼');
animals.add('🐢');
animals.add('🐿');
console.log(animals.size); // 4
animals.add('🐼');
console.log(animals.size); // 4

console.log(animals.has('🐷')); // true
animals.delete('🐷');
console.log(animals.has('🐷')); // false

animals.forEach(animal => {
  console.log(`Hey ${animal}!`);
});

// Hey 🐼!
// Hey 🐢!
// Hey 🐿!

animals.clear();
console.log(animals.size); // 0
```
Tiếp tục là một ví dụ khác thể hiện cách khởi tạo set bằng truyền array. Chú ý rằng nếu add thêm bằng dạng mảng thì mảng đó vẫn chỉ là một element được giữ nguyên dạng mảng

```
let myAnimals = new Set(['🐷', '🐢', '🐷', '🐷']);

myAnimals.add(['🐨', '🐑']);
myAnimals.add({ name: 'Rud', type: '🐢' });
console.log(myAnimals.size); // 4

myAnimals.forEach(animal => {
  console.log(animal);
});


// 🐷
// 🐢
// ["🐨", "🐑"]
// Object { name: "Rud", type: "🐢" }
```
Ngoài `Array`, thì `String` hoặc các iterable object khác như` Array-like objects (arguments, NodeList), TypedArray, Map` hay chính `Set` cũng được truyền vào để khởi tạo một set
```
console.log('Only unique characters will be in this set.'.length); // 43

let sentence = new Set('Only unique characters will be in this set.');
console.log(sentence.size); // 18
```
Ngoài cách sử dụng `forEach` trong set, vòng `for...of `cũng để sử dụng để thực hiện vòng lặp trong set
```
let moreAnimals = new Set(['🐺', '🐴', '🐕', '🐇']);

for (let animal of moreAnimals) {
  console.log(`Howdy ${ animal }`);
}

// Howdy 🐺
// Howdy 🐴
// Howdy 🐕
// Howdy 🐇
```
## Keys and Values
Set cũng có các phương thức của key và value, với key sẽ trở thành định danh cho value, vì vậy mà các phương thức của chúng sẽ đều trả về cùng 1 giá trị ở dạng  iterable object, với mỗi phần tử tương ứng với một phần tử trong Set
```
let partyItems = new Set(['🍕', '🍾', '🎊']);
let items = partyItems.values();

console.log(items.next());
console.log(items.next());
console.log(items.next());
console.log(items.next().done);

// Object {
//   done: false,
//   value: "🍕"
// }

// Object {
//   done: false,
//   value: "🍾"
// }

// Object {
//   done: false,
//   value: "🎊"
// }

// true
```
**Ứng dụng Set trong thực tế**
- Lấy tất cả giá trị unique từ mảng 
```
var myArray = ['a', 1, 'a', 2, '1'];

let unique = [...new Set(myArray)]; 

// unique is ['a', 1, 2, '1']
```
Nguồn https://alligator.io/js/sets-introduction/