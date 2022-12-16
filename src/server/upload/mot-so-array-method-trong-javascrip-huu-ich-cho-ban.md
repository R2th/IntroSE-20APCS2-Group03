### Lời mờ đầu
**JavaScript** cung cấp cho chúng ta rất nhiều các phương pháp khác nhau để xử lý các mảng. Hôm nay, tôi sẽ điểm qua một số cách cần thiết để bạn cải thiện kỹ năng phát triển **JavaScript** của mình chỉ trong vài phút.

### 1. Array.map ()

Bất cứ khi nào bạn sử dụng method `.map()` với một mảng, nó sẽ tạo ra một mảng mới, được sửa đổi từ mảng ban đầu. Method `map()` cho phép bạn duyệt qua tất cả các phần tử của mảng và thay đổi chúng.

Method `map()` sẽ có ích khi bạn muốn update tất cả các phần tử trong mảng và lưu nó lại.

Giả sử chúng ta có một mảng bao gồm tên của các thương hiệu ô tô :
```js
const cars = ["Porsche", "Audi", "BMW", "Volkswagen"];
```

Và nếu các bạn muốn thêm một điều gì đó cho tất cả các phần tử của mảng trên thì chúng ta có thể sử dụng method `map()` .

```js
const coolCars = cars.map(car => `${car} is a pretty cool car brand!`);
```

Và kết quà là mảng mới `coolCars`, sẽ trả về kết quả như thế này.
```js
["Porsche is a pretty cool car brand!", "Audi is a pretty cool car brand!", "BMW is a pretty cool car brand!", "Volkswagen is a pretty cool car brand!"];
```

Như các bạn có thể thấy, tất cả các phần tử trong mảng mới đã được thêm nội dung mà chúng ta muốn thay đổi.

Một điều thú vị khác mà các bạn cũng nên biết là cách xử lý các đối tượng với method `map()` trong mảng: 

Bây giờ chúng ta sẽ tạo ra một mảng các bao gồm các đối tượng là các hãng xe và giá của nó:

```js 
const carsWithPrice = [
  {brand: "Porsche", price: 100000},
  {brand: "Audi", price: 80000}
];
```

Nếu ta muốn thêm giá thuế của các hãng xe này ta cũng có thể sử dụng method `map()`

```js
const carsWithPriceAndTax = carsWithPrice.map(carObject => {
  return {
    // Return the original car object
    ...carObject,
    // but also add a new value containing the price with tax
    priceWithTax: carObject.price * 1.2
  }
});
```

Và đây là kết quả:

```
[
  {brand: "Porsche", price: 100000, priceWithTax: 120000},
  {brand: "Audi", price: 80000, priceWithTax: 96000}
];
```
Như các bạn thấy thì ta đã thêm được `priceWithTax` vào các đối tượng của mảng bản đầu. 

Nói chung, method `map()` cho phép ta thay đổi nội dung của một mảng đã tồn tại và lưu nó vào biến mới một cách linh hoạt.


### 2. Array.filter()

Dựa vào tên method, các bạn hoàn toàn có thể đoán được những gì mà method `filter()` sẽ thực hiện đúng không ?

Method `filter()` cho phép bạn lấy ra các phần tử từ mảng ban đầu với các điều kiện bạn mong muốn.

Cũng giống như method `map()`, method `filter()` sẽ trả về một mảng mới và không làm thay đổi mảng ban đầu.

Ví dụ: tiếp tục một ví dụ về ô tô, tôi sẽ tiến hành lọc mảng dựa và các điều kiện về giá.

Đây là mảng ban đầu của tôi :

```js
const cars = [
  {brand: "Porsche", price: 100000},
  {brand: "Audi", price: 80000},
  {brand: "Toyota", price: 30000}
];
```

Bây giờ tôi  sẽ sử dụng method `filter()` để lấy ra các loại xe với các điều kiện về giá mà tôi mong muốn

```js
const expensiveCars = cars.filter(car => car.price >= 40000);
const cheapCars = cars.filter(car => car.price < 40000);

// kết quả cho các xe có giá >=40000
[
  {brand: "Porsche", price: 100000},
  {brand: "Audi", price: 80000}
];
// kết quả cho các xe có giá <40000
[
  {brand: "Toyota", price: 30000}
];
```

Mỗi phần tử trong mảng sẽ được so sánh với điều kiện cho trước, nếu nó thỏa mãn điều kiện thì nó sẽ được lưu trong một mảng mới.

### 3.Array.forEach()
Một method cơ bản đúng không?

Method `forEach()` được sử dụng rất nhiều, nó tương tự như vòng lặp `for`

Nó lặp lại trên một mảng và thực thi một chức năng trên mỗi phần tử của mảng đó. Tham số đầu tiên của method  này là một callback function bao gồm value hiện tại và index của vòng lặp

Ví dụ tôi có một mảng gồm các đối tượng như sau:

```js
const cars = [
  {brand: "Porsche", price: 100000},
  {brand: "Audi", price: 80000},
  {brand: "Toyota", price: 30000}
];
```
Tôi có thể sử dụng `forEach()` duyệt qua tất cả các phần tử của mảng trên và lấy ra các thuộc tính mong muốn để hoàn thành một câu :

```js
cars.forEach(car => {
  console.log(`The ${car.brand} will cost you ${car.price} before taxes`);
});
```
Kết quả: 
```
"The Porsche will cost you 100000 before taxes"
"The Audi will cost you 80000 before taxes"
"The Toyota will cost you 30000 before taxes"
```
 Khi nào sử dụng  **Array.forEach()**?
 
Khi bạn chỉ muốn lặp lại từng mục của bất kỳ mảng nào mà không cần xây dựng một mảng mới.
 

### 4. Array.find ()
Method `find()` này có vẻ giống với method `filter()` mà tôi đã giới thiệu với các bạn.

Đúng vậy, cũng giống như method `.filter()` bạn có thể chuyển một điều kiện mà giá trị phần tử của mảng phải thỏa mãn, nhưng nó có sự khác biệt đó là method `.filter()` chỉ trả về phần tử đầu tiên phù hợp với điều kiện mà bạn đưa ra.

Tiếp tục với ví dụ về ô tô phía trên với method `.filter()` nhé.

```js
const cars = [
  {brand: "Porsche", price: 100000},
  {brand: "Audi", price: 80000},
  {brand: "Toyota", price: 30000}
];

const expensiveCar = cars.find(car => car.price >= 40000);
```

Kết quả là :

```
{brand: "Porsche", price: 100000}
```

Như các bạn thấy thì chỉ có duy nhất phần tử đầu tiên của mảng thỏa mãn điều kiện được lọc ra.

### 5.Array.every()

Method `every()` sẽ kiểm trả xem tất cả các phần tư trong mảng có thỏa mãn điều kiện cho trước hay không ?

Nếu tất cả phẩn tử trong mảng thỏa mãn điều kiện cho trước thì method sẽ trả về giá trị `true`, và ngược lại là `false`.

Ví dụ, tôi sẽ check điều kiện  xem tất cả các ô tô có được sản xuất trong vòng 5 năm hay không ?
```js
const cars = [
  {brand: "Porsche", price: 100000, builtIn: 2018},
  {brand: "Audi", price: 80000, builtIn: 2019},
  {brand: "Toyota", price: 30000, builtIn: 2019}
];

const carsYoungerThanFiveYears = cars.every(car => car.builtIn >= 2016);

//Kết quả trả về là
true
```

Khi nào thì dùng Array.every()

Khi bạn muốn xác minh rằng tất cả các phần tử của mảng đều thỏa mãn một điều kiện đã được định nghĩa từ trước.


### 6 Array.some()
Method `some()` cũng tương tự như method `every()`, nhưng thay vì trả về giá trị true khi tất cả các phần từ trong mảng thỏa mãn điều kiện cho trước, nó sẻ trả về giá trị true nếu ít nhất một phần tử của mảng thỏa mãn điều kiện cho trước.

Nếu method `some()` tìm thấy một phần tử trong mảng thỏa mãn điều kiện thì nó sẽ trả về giá trị true, và nếu không tìm thấy phần tử nào trong mảng thỏa mãn điều kiện thì nó sẽ trả về giá trị false.

Tiếp tục với ví dụ ở trên nhé, nhưng lần này với method `some()` chúng ta sẽ kiểm tra xem có xe nào đã sản xuất hơn 5 năm không nhé.

```js 
const cars = [
  {brand: "Porsche", price: 100000, builtIn: 2018},
  {brand: "Audi", price: 80000, builtIn: 2019},
  {brand: "Toyota", price: 30000, builtIn: 2019}
];
const carsOlderThanFiveYears = cars.some(car => car.builtIn < 2016);
```

Và kết quả là 
```
false
```
Vậy thì chúng ta sẽ sử dụng `some()` khi nào ?

Khi bạn muốn kiểm tra xem trong mảng có ít nhất 1 phần tử thỏa mãn điều kiện cho trước.

### Kết luận
Như các bạn có thể thấy, JavaScript cung cấp cho chúng ta ất nhiều method khác nhau để xử lý mảng. Sử dụng các method này bạn sẽ có thể dễ dàng thao tác, xử lý mảng trong các trường hợp khác nhau và cũng là cơ sở để việc bảo trì dự án của bạn một cách dễ dàng hơn rất nhiều. 

Tôi hi vọng các bạn đã học thêm được một điều gì mới hôm nay!

### Tài liệu tham khảo

* https://medium.com/dailyjs/the-7-js-array-methods-you-will-need-in-2021-a9faa83b50e8
* https://www.tutorialspoint.com/javascript/javascript_html_dom.htm