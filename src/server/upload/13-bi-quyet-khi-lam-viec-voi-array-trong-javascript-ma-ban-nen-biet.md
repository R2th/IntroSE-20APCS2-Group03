Array là một trong những khái niệm phổ biến nhất ở Javascript, nó cung cấp cho chúng ta rất nhiều khả năng để thao tác và làm việc với dữ liệu được lưu trữ bên trong nó. Trong bài viết này, mình muốn chỉ cho bạn một vài thủ thuật, bí quyết mà bạn có thể không biết và mình thực sự thấy nó rất hữu ích trong quá trình làm việc! Hãy bắt đầu nào.

# 1. Loại bỏ những phần tử trùng nhau trong 1 mảng
Có một câu hỏi phỏng vấn rất phổ biến về array trong Javascript là làm thế nào để trích xuất các phần tử độc nhất từ một array trong Javascript. Dưới đây là một giải pháp nhanh chóng và dễ dàng cho vấn đề này, bạn có thể sử dụng **new Set()** . Và mình muốn chỉ cho bạn hai cách có thể để làm điều đó dễ dàng, một cách là **.from()** và cách thứ 2 là sử dụng **(...)**.
```
var fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple', 'orange', 'grape', 'apple'];


// First method
var uniqueFruits = Array.from(new Set(fruits));
console.log(uniqueFruits); // returns ['banana', 'apple', 'orange', 'watermelon', 'grape']
// Second method
var uniqueFruits2 = [...new Set(fruits)];
console.log(uniqueFruits2); // returns ['banana', 'apple', 'orange', 'watermelon', 'grape']
```

# 2. Thay thế một giá trị cụ thể trong mảng
Đôi khi, trong quá trình làm việc, bạn sẽ cần thay thế một giá trị cụ thể trong mảng và có một phương pháp đơn giản, dễ dàng để làm điều đó. Chúng ta có thể sử dụng **.splice (vị trí bắt đầu, giá trị sẽ bị loại bỏ, giá trị thay thế được add vào)** và truyền vào đó ba tham số chỉ định bao gồm nơi chúng ta muốn bắt đầu sửa đổi, số phần tử chúng ta muốn thay đổi và các giá trị mới.
```
var fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple', 'orange', 'grape', 'apple'];
fruits.splice(0, 2, 'potato', 'tomato');
console.log(fruits); // returns ['potato', 'tomato', 'orange', 'watermelon', 'apple', 'orange', 'grape', 'apple']
```

# 3. Map array mà không sử dụng .map()
Có lẽ mọi người đều biết đến **.map ()**, nhưng còn có một giải pháp khác có thể được sử dụng để có được hiệu quả tương tự và giữ cho code của chúng ta sạch đẹp. Chúng ta có thể sử dụng **.from()** ở đây.
```
var friends = [
    { name: 'John', age: 22 },
    { name: 'Peter', age: 23 },
    { name: 'Mark', age: 24 },
    { name: 'Maria', age: 22 },
    { name: 'Monica', age: 21 },
    { name: 'Martha', age: 19 },
]


var friendsNames = Array.from(friends, ({name}) => name);
console.log(friendsNames); // returns ['John', 'Peter', 'Mark', 'Maria', 'Monica', 'Martha']
```

# 4. Làm rỗng một mảng
Bạn có một mảng chứa đầy các phần tử nhưng bạn cần phải làm sạch nó cho bất kỳ mục đích nào và bạn không muốn xóa từng phần tử một? Rất đơn giản để làm điều này trong một dòng code. Để clear một mảng, bạn cần đặt length của mảng thành 0 và tada, ta có 1 mảng rỗng!
```
var fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple', 'orange', 'grape', 'apple'];


fruits.length = 0;
console.log(fruits); // returns []
```

# 5. Chuyển đổi mảng thành object
Điều này xảy ra thường xuyên, đó là khi chúng ta có một mảng, nhưng với mục đích nào đó, chúng ta cần một object có dữ liệu này và cách nhanh nhất để chuyển đổi mảng thành object là sử dụng **(...)**.
```
var fruits = ['banana', 'apple', 'orange', 'watermelon'];
var fruitsObj = { ...fruits };
console.log(fruitsObj); // returns {0: 'banana', 1: 'apple', 2: 'orange', 3: 'watermelon', 4: 'apple', 5: 'orange', 6: 'grape', 7: 'apple'}
```

# 6. Nhét đầy dữ liệu vào một mảng
Tuy rất hiếm nhưng mình nghĩ sẽ có một lúc nào đó chúng ta tạo một mảng và chúng ta muốn điền nó với một số dữ liệu cố định hoặc chúng ta cần một mảng có cùng các giá trị và trong trường hợp này, **.fill()** là một giải pháp hoàn hảo.
```
var newArray = new Array(10).fill('1');
console.log(newArray); // returns ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1']
```

# 7. Merge nhiều array
Bạn có biết cách merge nhiều mảng thành một mảng mà không sử dụng phương thức .concat () không? Có một cách đơn giản để hợp nhất bất kỳ số lượng mảng nào thành một trong một dòng code duy nhất. Có thể các bạn đã nhận ra, đó chính là **(...)**.
```
var fruits = ['apple', 'banana', 'orange'];
var meat = ['poultry', 'beef', 'fish'];
var vegetables = ['potato', 'tomato', 'cucumber'];
var food = [...fruits, ...meat, ...vegetables];
console.log(food); // ['apple', 'banana', 'orange', 'poultry', 'beef', 'fish', 'potato', 'tomato', 'cucumber']
```

# 8. Tìm phần tử chung của 2 mảng
Đây cũng là một trong những vấn đề phổ biến mà bạn có thể gặp phải trong bất kỳ cuộc phỏng vấn Javascript nào vì nó sẽ cho thấy khả năng sử dụng các phương thức về mảng và logic của bạn. Để tìm phần tử chung của hai mảng, chúng ta sẽ sử dụng một trong các phương thức đã được đề cập ở trên, để đảm bảo rằng các phần tử trong mảng mà chúng ta đang kiểm tra không bị trùng lặp sau đó chúng ta sẽ sử dụng **.filter** và **.includes**. Kết quả là, chúng ta sẽ có được mảng với các phần tử chung của cả hai mảng.
```
var numOne = [0, 2, 4, 6, 8, 8];
var numTwo = [1, 2, 3, 4, 5, 6];
var duplicatedValues = [...new Set(numOne)].filter(item => numTwo.includes(item));
console.log(duplicatedValues); // returns [2, 4, 6]
```

# 9. Loại bỏ những giá trị "sai" trong mảng
Giá trị "sai" hay còn gọi là falsy values, những giá trị này là những giá trị trong Javascript mà khi ép kiểu về Boolean, thì sẽ cho ra giá trị false. Và trong Javascript có SÁU giá trị sau được coi là falsy bao gồm: **false, 0, ' ', null, NaN, undefined**. Bây giờ chúng ta sẽ tìm hiểu làm thế nào để loại bỏ các giá trị này khỏi mảng của chúng ta. Để đạt được điều này, chúng ta sẽ sử dụng **.filter()**.
```
var mixedArr = [0, 'blue', '', NaN, 9, true, undefined, 'white', false];
var trueArr = mixedArr.filter(Boolean);
console.log(trueArr); // returns ['blue', 9, true, 'white']
```

# 10. Lấy giá trị ngẫu nhiên trong mảng
Đôi khi chúng ta cần chọn một giá trị từ mảng một cách ngẫu nhiên. Để làm được điều  một cách dễ dàng, nhanh chóng và ngắn gọn đồng thời giữ cho code của chúng ta sạch sẽ, ta có thể lấy số index ngẫu nhiên theo độ dài mảng:
```
var colors = ['blue', 'white', 'green', 'navy', 'pink', 'purple', 'orange', 'yellow', 'black', 'brown'];
var randomColor = colors[(Math.floor(Math.random() * (colors.length + 1)))]
```

# 11. Đảo ngược mảng
Khi chúng ta cần lật ngược mảng, không cần phải sử dụng các vòng lặp và hàm phức tạp, có một phương thức dễ dàng để thực hiện tất cả cho chúng ta, và chỉ với một dòng code, chúng ta có thể đảo ngược mảng. Hãy để kiểm tra đoạn code sau nhé:
```
var colors = ['blue', 'white', 'green', 'navy', 'pink', 'purple', 'orange', 'yellow', 'black', 'brown'];
var reversedColors = colors.reverse();
console.log(reversedColors); // returns ['brown', 'black', 'yellow', 'orange', 'purple', 'pink', 'navy', 'green', 'white', 'blue']
```

# 12. .lastIndexOf()
Trong Javascript, có một phương thức thú vị cho phép tìm index của lần xuất hiện cuối cùng của một phần tử xác định. Ví dụ: nếu mảng của chúng ta có các giá trị trùng lặp, chúng ta có thể tìm thấy vị trí xuất hiện cuối cùng của nó:
```
var nums = [1, 5, 2, 6, 3, 5, 2, 3, 6, 5, 2, 7];
var lastIndex = nums.lastIndexOf(5);
console.log(lastIndex); // returns 9
```

# 13. Cộng tổng các phần tử của mảng
Đây lại là một câu hỏi khác xảy ra rất thường xuyên trong các cuộc phỏng vấn Javascript. Nó có thể được giải quyết bằng **.reduce** với chỉ một dòng code. Hãy cùng xem nhé:
```
var nums = [1, 5, 2, 6];
var sum = nums.reduce((x, y) => x + y);
console.log(sum); // returns 14
```

# Kết Luận
Trong bài viết này, mình đã trình bày cho bạn 13 mẹo và bí quyết có thể giúp bạn code và giữ cho code của bạn ngắn gọn, sạch sẽ. Ngoài ra, hãy nhớ rằng có rất nhiều thủ thuật khác nhau mà bạn có thể sử dụng trong Javascript đáng để khám phá, không chỉ về mảng mà cả các loại dữ liệu khác nhau. Mình hy vọng bạn thích các giải pháp được cung cấp trong bài viết và bạn sẽ sử dụng chúng để cải thiện quá trình phát triển ứng dụng của mình.
Nếu có ý kiến hay bí quyết bổ sung nào đó, bạn hãy comment bên dưới nhé.

[Nguồn](https://dev.to/agarwalprashan2/top-13-useful--array-tips-and-tricks-you-should-know-29ff)