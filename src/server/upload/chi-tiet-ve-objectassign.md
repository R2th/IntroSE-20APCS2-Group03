Khi chúng ta làm việc với Js, cụ thể ơn là ReactJs, hẳn chúng ta đã nghe tới tính bất biến của dữ liệu (immutability). Hiểu một cách nôm na đó là khả năng giá trị của dữ liệu không bị thay đổi sau khi đã được khai báo. Tính bất biết còn làm tăng hiệu suất của ứng dụng, khả năng kiểm soát và debugg một cách nhanh chóng hơn. 

Để hiểu rõ hơn chúng ta sẽ cùng nhau tìm hiểu về cú pháp và thông qua các ví dụ để có thể nắm rõ được ưu điểm này của nó và cách sử dụng.

Khái niệm
> Object.assign() được sử dụng để sao chép các giá trị của tất cả thuộc tính có thể liệt kê từ một hoặc nhiều đối tượng nguồn đến một đối tượng đích. Nó sẽ  trả về đối tượng đích đó.

### Cú pháp
```
Object.assign(target, ...sources)
```

*Các tham số:*
*  targer: Đối tượng đích
*  sources: Các đối tượng nguồn

*Giá trị trả về:*
Các đối tượng đích

> Các thuộc tính trong đối tượng đích sẽ bị ghi lại bởi các thuộc tính trong đối tượng nguồn nếu chúng có cùng key. Tương tự, các thuộc tính nguồn sau sẽ ghi đè lên những thuộc tính nguồn trước. 
> 

### Ví dụ:
```
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

Cần lưu ý để đảm bảo tính bất biến thì tham số target nên luôn là {}, vì khi đó các giá trị của sources sẽ được sao chép vào đối tượng mới. Một cách dùng sai là:
```
const a = { name: 'foo' }
const b = Object.assign(a, { name: 'bar', age: 1 }, { id: 9 })
console.log(b) // { name: 'bar', age: 1, id: 9 }
console.log(a) // Giá trị của a cũng bị thay đổi thành { name: 'bar', age: 1, id: 9 }
console.log(a === b) // true
```

Khi làm việc với nhiều object:
```
let o1 = { a: 21 };
let o2 = { b: 22 };
let o3 = { c: 24 };

const obj = Object.assign({},o1, o2, o3);
console.log(obj); //{a: 21, b: 22, c: 24}
```

Gộp các object với cùng properties:
```
let o1 = { a: 21, b: 22, c: 24 };
let o2 = { b: 25, c: 26 };
let o3 = { c: 27 };

let finalObj = Object.assign({}, o1, o2, o3);
console.log(finalObj);//{a: 21, b: 25, c: 27}
```
Để ý ví dụ trên, các thuộc tính được lặp lại bên trong các đối tượng nguồn thì trong đối tượng mới, các thuộc tính đó sẽ bị bỏ qua và chúng chỉ nhận được các thuộc tính duy nhất trên đối tượng đích. Và giá trị của chúng sẽ được cập nhật giá trị mới từ trái sang phải.

Trên đây là bài tìm hiểu của mình về Object.assign() trong JS. Hi vọng bài viết sẽ giúp bạn có một cái nhìn và cách sử dụng rõ hơn về một phương thức thường xuyên được sử dụng dạo gần đây, đặc biệt là trong ReactJs.

### Tham khảo
https://appdividend.com/2018/12/27/javascript-object-assign-example-object-assign-tutorial/
https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
https://appdividend.com/2018/12/27/javascript-object-assign-example-object-assign-tutorial/