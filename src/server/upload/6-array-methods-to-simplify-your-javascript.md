Trong JavaScript, bạn sẽ thường xuyên phải làm việc với các mảng rất nhiều. Khi đó sử dụng `while` và `for` sẽ xuất hiện ngay trong đầu của bạn, mục đích để có thể lọc hoặc tìm một cái gì đó cho từng giá trị bên trong mảng. Tuy nhiên ngoài ý nghĩ đó ra thì bạn có thể nghĩ đến 6 phương pháp sau đây để áp dụng vào nhé, let's go :grinning:

## How to use filter()

`filter()` là một phương pháp cho phép bạn tạo một mảng mới dựa trên các điều kiện đánh giá `true` từ một mảng hiện có.

Xem ví dụ sau:

```js
let animals = [
   {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
   {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
   {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
 ]

 /*using imperative*/
 let neuteredAnimals = [];

for (let i=0; i < animals.length; i++){
  let a = animals[i];
  if(a.isNeutered){
    neuteredAnimals.push(a);
  }
}
```

Ví dụ trên là một cách làm mà chúng ta thường thấy dùng để lặp qua từng mục trong mảng hiện có, kiểm tra theo điều kiện sau đó rồi đẩy nó vào mảng mới.

Với `filter()` phương thức, bạn chỉ cần đặt điều kiện bạn muốn. Ví dụ:

```js
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

 /*using functional filter() where a represents an item in the array*/
 let neuteredAnimals = animals.filter((a) => {
     return a.isNeutered;
 });
 ```
 
Ở đây, chúng ta chỉ cần thiết lập phương thức lọc đối với mảng hiện có. Hàm ẩn danh cho phép `a` biểu diễn một mục duy nhất trong mảng theo cách tương tự như `a = animals[i]` trong vòng for trước đó. Khi đó bất cứ kết quả nào được trả lại trong đó `filter()` sẽ là những gì được đưa vào mảng mới.

## How to use find()

Trong JavaScript, `find()` được sử dụng để tạo một đối tượng mới dựa trên điều kiện bạn đặt. Nhìn thoáng qua thì `find()` có vẻ như `filter()` nhưng thật ra chúng không giống nhau, `filter()` trả về một mảng các đối tượng phù hợp với điều kiện bạn đặt trong khi `find()` sẽ trả về đối tượng phù hợp đầu tiên của mảng trả về đó.

Xem ví dụ dưới đây:

```js
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

animalTypeFound = animals.find( animal => animal.type === 'cat' );

// animalTypeFound will return:
// {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2}

animalTypeFilter = animals.filter( animal => animal.type === 'cat' );

// animalTypeFilter will return:
// [{name: 'Tibbers', type: 'cat', isNeutered: true, age: 2}, {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}]
```

> **find()** sẽ dừng lại ở phần tử đầu tiên trong các phần tử đúng, trong khi **filter()** sẽ tiếp tục và trả về tất cả các phần tử phù hợp với điều kiện rồi return ra một mảng.

## How to use map()

Giả sử bạn có một mảng nhưng bạn muốn nó trông khác nhau, vậy bạn có thể lặp lại bằng cách sử dụng `forEach()` nhưng điều đó sẽ chỉ tạo ra các cái hiển thị không mong muốn sau khi xuống dòng.

Mapping cho phép bạn di chuyển các giá trị xung quanh, gán lại chúng cho các selectors khác nhau và bất cứ điều gì khác mà bạn muốn làm với chúng. Kết quả `map()` chính là một đối tượng cho phép bạn lưu trữ các giá trị key-values hoặc chỉ một mảng các giá trị đơn giản.

Xem ví dụ với cú pháp sử dụng `map()` sau:

```js
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

// what you need: 
// ['Tibbers', 'Fluffball', 'Strawhat']

let animalNames = animals.map(animal => {return animal.name});

// what you need: 
// [{name: 'Tibbers', species: 'cat'}, {name: 'Fluffball', species: 'rabbit'}, {name: 'Strawhat', species: 'cat'}]

let petDetails = animals.map(animal => {
    return {
        name: animal.name, 
        species: animal.type
    };
});
```

## How to use reduce()

`reduce()` có thể thỉnh thoảng được nghe ở đâu đó nhưng không ai thực sự nói chính xác nó là gì. Có thể nói tóm lại như sau, `reduce()` cho phép bạn tương tác hai giá trị hoặc đối tượng liền kề nhau từ trái sang phải.

Ví dụ bạn có mảng sau: `let numbers = [100, 20, 10]`

Nếu bạn sử dụng `reduce()` vào mảng trên, nhìn theo từ trái qua phải thì tập hợp giá trị đầu tiên sẽ là 100 và 20. Sau đó, kết quả đầu ra của tập hợp đó sẽ được sử dụng để tương tác với phần tử 10 tiếp theo.

```js
let numbers = [100, 20, 10];

// result will return 70 as the value
// The function inside reduce will run twice. 
// the first time, x = 100, y = 20
// the second time, x = 80, y = 10

result = numbers.reduce((x, y) => { return x - y; });
```

`reduce()` cũng có thể có hai đối số. Đầu tiên là hàm xác định những gì xảy ra với hai giá trị và thứ hai đặt giá trị bắt đầu.

```js
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

// How old are all the animals combined?
// 0 is the starting value and acts as the first acculmulator value
// will return 8

let totalAge = animals.reduce((acculmulator, animal) => {
    return acculmulator + animal.age;
}, 0);

// lets say you want to find out the oldest animal 
// code below will return {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}

let oldestPet = animals.reduce((oldest, animal) => {
    return (oldest.age || 0) > animal.age ? oldest : animal;
  }, {});

  // decrypting the code above and how terniaries work 
  // the condition --> (oldest.age || 0) > animal.age 
  // if true --> ? oldest
  // else --> : animal
  ```
  
  ## How to use every()
  
 Phương thức `every()` sẽ trả về giá trị kết quả là **true** hoặc **false** dựa trên điều kiện được đặt. Nó hoạt động theo cách tương tự như `filter()` nhưng thay vì trả về một objects hoặc value thì `every()` sẽ trả về một giá trị boolean.
 
Điều này làm cho `every()` dễ dàng kiểm tra nhanh xem các phần tử trong mảng có đáp ứng được với điều kiện đề ra hay không.

```js
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

let allNeutered = animals.every(animal => {return animal.isNeutered});

//will return false because not all values under isNeutered evaluates to true
```

## How to use some()

`some()` hoạt động theo cùng một cách giống `every()` nhưng nó chỉ cần có ít nhất một trong những điều kiện là đúng thì sẽ return **true**.
Xem ví dụ dưới đây:

```js
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

let someAreCats = animals.some(animal => {return animal.type === 'cat'});

// will return true because at least one animal.type returned 'cat'
```

Trong các trường hợp bạn có thể sử dụng `every()` và `some()` để kiểm tra các giá trị trong một mảng trước khi gửi chúng đến cơ sở dữ liệu. Hoặc bạn muốn chắc chắn rằng có một danh mục nhất định của một mặt hàng trong giỏ hàng trước khi áp dụng giảm giá đặc biệt. Hoặc bạn đang mã hóa một hệ thống đặt phòng và muốn đảm bảo rằng mọi khách hàng có thể đặt phòng đều đáp ứng các yêu cầu về độ tuổi tối thiểu.

## Lets Mix and Match!

Bạn có thể sử dụng các phương thức mảng này theo cách riêng hoặc theo chuỗi. Kết quả từ phương thức đầu tiên sẽ được sử dụng làm giá trị cho phương thức sau.

Xem ví dụ sau:

```js
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2, enteredPagent: true, cutenessScore: 347},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1, enteredPagent: true, cutenessScore: 193},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5, enteredPagent: false, cutenessScore: 521}
  ]

//lets say you want to find the total cuteness score of all valid pagent entrants

let totalScore = animals
                    .filter(animal => {return animal.isNeutered})
                    .reduce((accumulator, animal) => {return accumulator + animal.cutenessScore}, 0);

// totalScore will return 868
```

Tùy thuộc vào tập dữ liệu của bạn, bạn có thể sử dụng hiệu quả với các mảng, giảm nhu cầu lặp thủ công qua mọi đối tượng và mảng để làm những gì bạn cần làm.

## Kết luận

Như vậy trên đây là 6 Methods đơn giản mong có thể giúp bạn xử lý linh hoạt hơn khi làm việc với array trong JavaScript, nó giúp giải quyết rút ngắn một đoạn code dài nếu bạn sử dụng nhiều hơn một vòng lặp `for` hoặc `while` và giảm thiểu dấu ngoặc đơn, viết thiếu dấu chấm phẩy nếu bạn sai xót :)))

-----

Bài viết được tham khảo từ https://medium.com/better-programming/simplify-your-javascript-with-these-6-array-methods-db4c278f08c9

Cảm ơn các bạn đã đọc bài!