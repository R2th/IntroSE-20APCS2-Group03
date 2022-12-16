Khi làm việc với javascript, chúng ta sẽ gặp và xử lý rất nhiều điều kiện, sau đây là 5 mẹo giúp bạn viết điều kiện tốt hơn và dễ nhìn hơn.

## 1. Sử dụng Array.includes cho điều kiện với nhiều tiêu chí

```
//condition
const test = (fruit) => {
  if (fruit === 'apple' || fruit === 'strawberry') {
    console.log('red')
  }
}
```

Thoạt nhìn, câu lệnh điều kiện trên có vẻ ổn. Tuy nhiên, điều gì sẽ xảy ra nếu chúng ta nhận được nhiều trái cây có màu đỏ hơn. Chúng ta sẽ lại phải mở rộng câu lệnh if với nhiều dấu || hơn.

Thay vào đó chúng ta có thể sử dụng Array.includes để viết lại câu điều kiện trên

```
const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries']

const test = (fruit) => {
  if (redFruits.includé(fruit)) {
    console.log('red')
  }
}
```

Bằng cách này trông điều kiện của chúng ta sẽ dễ nhìn hơn, và cũng dễ mở rộng nữa

## 2. Less nesting, return early

Hãy mở rộng ví dụ trên với 2 điều kiện nữa:

- Nếu không có fruit truyền vào, trả về error
- In ra số lượng fruit nếu số lượng truyền vào vượt quá 10

```
const test = (fruit, quantity) => {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // condition 1: fruit must has value
  if (fruit) {
    // condition 2: must be red
    if (redFruits.includes(fruit)) {
      console.log('red');

      // condition 3: must be big quantity
      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  } else {
    throw new Error('No fruit!');
  }
}

// test results
test(null); // error: No fruits
test('apple'); // print: red
test('apple', 20); // print: red, big quantity
```

Nhìn vào đoạn code trên, chúng ta sẽ có:

- 1 câu lệnh if/else để loại bỏ trường hợp lỗi
- 3 level nesting câu lệnh if (condition 1, 2, 3)

Tốt hơn hết là chúng ta nên trả về sớm nếu gặp trường hợp lỗi, thay vì để nó như là một fallback

```
/_ return early when invalid conditions found _/

const test = (fruit, quantity) => {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // condition 1: throw error early
  if (!fruit) throw new Error('No fruit!');

  // condition 2: must be red
  if (redFruits.includes(fruit)) {
    console.log('red');

    // condition 3: must be big quantity
    if (quantity > 10) {
      console.log('big quantity');
    }
  }
}
```

Bằng cách này, chúng ta có một mức độ ít hơn của câu lệnh lồng nhau. Cách này sẽ tốt hơn, đặc biệt là khi bạn có câu lệnh if dài (hãy tưởng tượng bạn cần cuộn xuống phía dưới cùng để biết có một câu lệnh khác, điều này là không hay).

Chúng ta có thể giảm hơn nữa việc lồng nhau, bằng cách đảo ngược các điều kiện và trả về sớm hơn. Nhìn vào điều kiện 2 dưới đây để xem cách chúng tôi làm điều đó:

```
/_ return early when invalid conditions found _/

const test = (fruit, quantity) => {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (!fruit) throw new Error('No fruit!'); // condition 1: throw error early
  if (!redFruits.includes(fruit)) return; // condition 2: stop when fruit is not red

  console.log('red');

  // condition 3: must be big quantity
  if (quantity > 10) {
    console.log('big quantity');
  }
}
```

Bằng cách đảo ngược các điều kiện của điều kiện 2, code hiện tại không có câu lệnh điều kiện lồng nhau. Kỹ thuật này rất hữu ích khi chúng ta có logic dài và chúng ta muốn dừng quá trình tiếp theo khi một điều kiện không được đáp ứng.

Tuy nhiên, đó không phải là quy tắc cứng để làm điều này. Hãy tự hỏi, phiên bản này (không lồng nhau) tốt hơn / dễ đọc hơn phiên bản trước (điều kiện 2 với lồng nhau)?

Đối với tôi, tôi sẽ chỉ để nó như phiên bản trước (điều kiện 2 với lồng nhau). Đó là vì:

mã ngắn và thẳng về phía trước, rõ ràng hơn với lồng nhau nếu
điều kiện đảo ngược có thể phát sinh quá trình suy nghĩ nhiều hơn (tăng tải nhận thức)
Do đó, luôn luôn nhắm đến việc ít lồng nhau và trả về sớm nhưng đừng lạm dụng nó. Có một bài viết & thảo luận về StackOverflow sẽ nói thêm về chủ đề này nếu bạn quan tâm:

- [Avoid Else, Return Early](https://blog.timoxley.com/post/47041269194/avoid-else-return-early) by Tim Oxley
- [StackOverflow discussion](https://softwareengineering.stackexchange.com/questions/18454/should-i-return-from-a-function-early-or-use-an-if-statement) on if/else coding style

## 3. Use Default Function Parameters and Destructuring

Tôi đoán chắc rằng code bên dưới có thể trông quen thuộc với bạn, chúng ta luôn cần kiểm tra giá trị null / không xác định và gán giá trị mặc định khi làm việc với JavaScript:

```
const test = (fruit, quantity) => {
  if (!fruit) return;
  const q = quantity || 1; // if quantity not provided, default to one

  console.log(`We have ${q} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```

Trong thực tế, chúng ta có thể loại bỏ biến q bằng cách gán các tham số hàm mặc định.

```
const test = (fruit, quantity = 1) => { // if quantity not provided, default to one
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```

Nếu fruit của chúng ta là một đối tượng thì sao? Chúng ta có thể gán tham số mặc định?

```
const test = (fruit) => { 
  // printing fruit name if value provided
  if (fruit && fruit.name)  {
    console.log (fruit.name);
  } else {
    console.log('unknown');
  }
}

//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

Nhìn vào ví dụ trên, chúng tôi muốn in tên trái cây nếu có hoặc chúng tôi sẽ in không xác định. Chúng ta có thể tránh việc kiểm tra fruit && fruit.name có điều kiện với tham số mặc định.

```
// destructing - get name property only
// assign default empty object {}
const test = ({name} = {}) => {
  console.log (name || 'unknown');
}

//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

Vì chúng ta chỉ cần thuộc tính name từ fruit, chúng ta có thể hủy cấu trúc tham số bằng cách sử dụng {name}, sau đó chúng ta có thể sử dụng tên làm biến trong mã của mình thay vì fruit.name.

Chúng tôi cũng gán đối tượng trống {} làm giá trị mặc định. Nếu chúng tôi không làm như vậy, bạn sẽ gặp lỗi khi thực hiện kiểm tra dòng (không xác định) - Không thể detruct thuộc tính name của 'không xác định' hoặc 'null'.

Nếu bạn không phiền khi sử dụng thư viện của bên thứ 3, có một số cách để cắt giảm kiểm tra null:

- sử dụng hàm get() của Lodash
- sử dụng thư viện idx của nguồn mở Facebook (với Babeljs)
Dưới đây là một ví dụ về việc sử dụng Lodash:

```
// Include lodash library, you will get _
const test = (fruit) => {
  console.log(__.get(fruit, 'name', 'unknown'); // get property name, if not available, assign default value 'unknown'
}

//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

## 4.Favor Map / Object Literal than Switch Statement

Hãy xem ví dụ bên dưới, chúng tôi muốn in ra tên của trái cây dựa vào màu sắc:

```
const test = (color) => {
  // use switch case to find fruits in color
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

//test results
test(null); // []
test('yellow'); // ['banana', 'pineapple']
```

Đoạn mã trên có vẻ không có gì sai, nhưng tôi thấy nó khá dài dòng. Kết quả tương tự có thể đạt được với đối tượng bằng chữ với cú pháp sạch hơn:

```
// use object literal to find fruits in color
  const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
  };

const test = (color) => {
  return fruitColor[color] || [];
}
```

Hoặc là có thể dùng map() như thế này

```
// use Map to find fruits in color
  const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

const test = (color) => {
  return fruitColor.get(color) || [];
}
```

## 5. Use Array.every & Array.some for All / Partial Criteria

Nhìn vào mã dưới đây, chúng tôi muốn kiểm tra xem tất cả các loại trái cây có màu đỏ không:

```
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

const test = () => {
  let isAllRed = true;

  // condition: all fruits must be red
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }

  console.log(isAllRed); // false
}
```

chúng ta có thể rút gọn lại code như sau:

```
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

const test = () => {
  // condition: short way, all fruits must be red
  const isAllRed = fruits.every(f => f.color == 'red');

  console.log(isAllRed); // false
}
```

Bây giờ  code đã clean hơn nhiều phải không? Theo cách tương tự, nếu chúng ta muốn kiểm tra xem có bất kỳ quả nào có màu đỏ hay không, chúng ta có thể sử dụng Array.some để đạt được nó trong một dòng.

```
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];

const test = () => {
  // condition: if any fruit is red
  const isAnyRed = fruits.some(f => f.color == 'red');

  console.log(isAnyRed); // true
}
```

Source: [5 Tips to Write Better Conditionals in JavaScript](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript?fbclid=IwAR1yT61Dl-KcvihUNoINfMSisFCBWxB7FQ2-DcLT0q8DnONKfaSCjL80K8w#toc-5-use-array-every-array-some-for-all-partial-criteria)