***Lưu ý: Bài viết chống chỉ định cho Frontend Dev đã có nhiều kinh nghiệm*** :upside_down_face:

![](https://images.viblo.asia/79ccb415-7ea8-4d53-a238-fb3893b4fae8.jpeg)

Khi làm việc với array, mà ví dụ cụ thể ở đây là copy một array, thông thường sẽ sử dụng cú pháp `.slice`. Tuy nhiên với ES6, ta có thể sử dụng cú pháp spread operator để duplicate một array. Ví dụ:

```javascript
const smiles = ['🙂', '🙂', '🙂'];

// ES5
const cloneSmiles = smiles.slice();

// ES6
const cloneSlimesES6 = [...smiles];
```

Nhưng hãy xem xét tiếp một số ví dụ dưới đây để xem xét khi nào nên dùng cú pháp `...` của ES6 để copy array và khi nào không nên dùng.

**Ví dụ 1:**

```javascript
const smiles = ['🙂', '🙂', '🙂'];

const fakeSmiles = smiles;
const cloneSmiles = [...smiles];

console.log(smiles === fakeSmiles);
// true

console.log(smiles === cloneSmiles);
// false
```

**Vì sao chúng ta không thể copy một array**

Như ví dụ trên ta thấy, khi so sánh 2 array mới được clone từ cùng 1 array `smiles`, nhưng khi so sánh với array ban đầu thì sẽ cho ra 2 kết quả khác nhau. Vì sao lại như vậy?

Vì các array trong JS là các giá trị tham chiếu (reference), nên khi bạn clone nó bằng cách sử dụng `...`, nó sẽ chỉ sao chép tham chiếu vào array ban đầu chứ không phải giá trị của array. Để tạo một bản sao thực sự của một array, bạn cần sao chép giá trị của array dưới một biến mới. Bằng cách đó, array mới này không tham chiếu đến địa chỉ array cũ trong bộ nhớ.

Tuy nhiên, nếu bạn từng nghe đến khái niệm Immutable, mà ví dụ cụ thể ở đây là Redux hay bất kỳ một Framework quản lý state nào tương tự, thì Immutable là cực kỳ quan trọng. Một `immutable object` là một đối tượng trong đó state không thể được sửa đổi sau khi nó được tạo. Nhưng vấn đề với JavaScript là array có thể thay đổi. 

**Ví dụ 2:**

```javascript
const smiles = ['🙂', '🙂'];

const smiles2 = smiles;

smiles2.push('😘');

console.log(smiles2);
// [ '🙂', '🙂', '😘' ]

console.log(smiles);
// [ '🙂', '🙂', '😘' ]
```

Như ví dụ trên thì điều này thực sự không ổn phải không nào, vì mỗi hành động tác động đến array ban đầu đều làm cho array ban đầu bị biến đổi như vậy thì đúng là thảm họa :sweat_smile:

Và bây giờ ta mới thấy được cú pháp `...` của ES6 hữu ích như thế nào! 

**Ví dụ 3:**

```javascript
const smiles = ['🙂', '🙂'];

const smiles2 = [...smiles];

smiles2.push('😘');

console.log(smiles2);
// [ '🙂', '🙂', '😘' ]

console.log(smiles);
// [ '🙂', '🙂' ]
```

Như ta thấy, kết quả ở trên đúng như mong muốn, ta đã tạo ra 1 array mới và không làm ảnh hưởng gì đến array ban đầu.

Nhưng lưu ý rằng, `spread` của ES6 không hoạt động với tất cả các loại array, nó sẽ chỉ làm việc với array không chứa các array bên trong, hãy xem ví dụ dưới đây:

**Ví dụ 4:**

```javascript
const nums = [
  [1, 2], 
  [10],
];

const cloneNums = [...nums];

cloneNums[0][0] = '😗';

console.log(cloneNums);
// [ [ '😗', 2 ], [ 10 ] ]
 
console.log(nums);
// [ [ '😗', 2 ], [ 10 ] ]
```

Một cách khác để clone 1 array mà vẫn giữ nguyên tính Immutable của array ban đầu là dùng cú pháp `Array.from`

```javascript
const smiles = ['🙂', '🙂', '🙂'];

const cloneSmiles = Array.from(smiles);
```


Trên đây là 1 bài viết ngắn chia sẻ một số kiến thức nhỏ về spread operator trong ES6, hy vọng nó sẽ hữu ích cho mọi người.

Cảm ơn các bạn đã theo dõi bài viết, xin cảm ơn và hẹn gặp lại.

Tham khảo: [samanthaming.com](https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array)