Bài viết dưới đây của mình sẽ tóm tắt một số phương thức xử lý mảng thường sứ dụng trong Javascript

## Chuyển mảng về dạng chuỗi
- Để chuyện một array về dạng chuỗi, ta sử dụng phương thức `toString()`. Chuỗi trả về sẽ là một dãy các phần tử mảng được ngăn cách bởi dấu `,`

`array.toString()`
```
  var fruits = ['Apple', 'Orange', 'Banana']
  var text = fruits.toString()
  
  // Kết quả
  Apple,Orange,Banana
```

Ngoài ra, ta cũng có thể sử dụng phương thức `join()` để đưa mảng về một chuỗi ký tự. Với phương thức `join()`, ta có thể xác định thêm được ký tự đặt giữa các phần tử trong chuỗi trả về
```
  var fruits = ['Apple', 'Orange', 'Banana']
  var text = fruits.join('+++')
  
  // Kết quả
  Apple+++Orange+++Banana
```

## Thêm một phần tử mới vào vị trí cuối trong mảng
- Để thực hiện được điều này, ta sử dụng phương thức `push()`

```
  var fruits = ['Apple', 'Orange', 'Banana']
  fruits.push('Pineapple')
  
  // Kết quả
  ['Apple', 'Orange', 'Banana', 'Pineapple']
```

Ngoài ra, phương thức `push()` còn trả về tổng số lượng phần tử trong mảng ( bao gồm cả phần tử mới được thêm vào )

```
  var fruits = ['Apple', 'Orange', 'Banana']
  console.log(fruits.push('Pineapple'))
  
  // Kết quả
  4
```

## Xoá phần tử ở vị trí cuối cùng của mảng
- Phương thức `pop() `được dùng để xóa phần tử nằm ở vị trí cuối mảng

```
var fruits = ['Apple', 'Orange', 'Banana']
fruits.pop()

// Kết quả
['Apple', 'Orange']
```

Ngoài ra, phương thức `pop()` còn trả về giá trị của phần tử bị xoá

```
var fruits = ['Apple', 'Orange', 'Banana']
console.log(fruits.pop())

// Kết quả
'Banana'
```

## Thêm phần tử mới vào vị trí đầu tiên của mảng
- Để xử lý việc này, ta sử dụng phương thức `unshift()`

```
var fruits = ['Apple', 'Orange', 'Banana']
fruits.unshift('Pineapple')

// Kết quả
['Pineapple', 'Apple', 'Orange', 'Banana']
```

- Cũng tương tự như phương thức push(), ngoài việc thêm phần tử mới vào mảng thì unshift() còn trả về tổng số lượng phần tử trong mảng ( bao gồm cả phần tử mới được thêm vào )

```
  var fruits = ['Apple', 'Orange', 'Banana']
  console.log(fruits.unshift('Pineapple'))
  
  // Kết quả
  4
```

## Xoá phần tử đầu tiên trong mảng
- Để xử lý việc này, ta sử dụng phương thức `shift()`


```
var fruits = ['Apple', 'Orange', 'Banana']
fruits.shift()

// Kết quả
['Apple', 'Orange', 'Banana']
```

- Ngoài ra, phương thức `shift()` còn trả về giá trị của phần tử bị xoá

```
  var fruits = ['Apple', 'Orange', 'Banana']
  console.log(fruits.shift())
  
  // Kết quả
  'Apple'
```

## Ghép các mảng với nhau
- Phương thức `concat()` được dùng để ghép các mảng con lại với nhau rồi trả về một mảng mới

```
var fruits = ['Apple', 'Orange', 'Banana']
var mobile = ['Samsung', 'Nokia', 'Xiaomi']
var newArr = fruits.concat(mobile)

// Kết quả
['Apple', 'Orange', 'Banana', 'Samsung', 'Nokia', 'Xiaomi']
```

## Trích xuất một phần của mảng
- Để xử lý việc này, ta sử dụng phương thức `slice()`

```
// Cú pháp
  arr.slice(start, end)
```
  - *start* là chỉ số của phần tử bắt đầu được trích xuất
  - *end* là chỉ số của phần tử kết thúc việc trích xuất (mảng trả về không bao gồm phần tử này)

```
  var fruits = ['Apple', 'Orange', 'Banana', 'Pineapple']
  var newArr = fruits.slice(1, 3)
  
  // Kết quả
  ['Orange', 'Banana']
```

- Giá trị của tham số *start* và *end* cũng có thể là số âm. Tuy nhiên, với số âm thì chỉ số của các phần tử mảng sẽ được xác định theo chiều ngược lại (phần tử đầu tiên sẽ có chỉ số là -1)

```
  var fruits = ['Apple', 'Orange', 'Banana', 'Pineapple']
  var newArr = fruits.slice(-3, -1)
  
  // Kết quả
  ['Orange', 'Banana']
```

## Thêm hoặc xoá phần tử ở vị trí bất kỳ trong mảng
- Ta đã biết các phương thức `push(),` `pop()`, `unshift()`, `shift()` được sử dụng để thêm hoặc xoá các phần tử ở những vị trí cụ thể ( đầu hoặc cuối ). Vậy nếu ta muốn thêm hoặc xoá phần tử ở vị trí bất kỳ trong mảng thì ta sẽ dùng phương thức nào?
- Phương thức splice() sẽ giúp ta giải quyết vấn đề này

```
// Cú pháp
  array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```

- Tham số *start* là chỉ số của phần tử bắt đầu được xóa
- Tham số *deleteCount* chỉ số lượng phần tử cần loại bỏ tính từ *start*
    - Nếu *deleteCount* bị bỏ qua hoặc giá trị của nó >= array.length - *start*. Thì tất cả các phần tử từ *start* đến cuối mảng sẽ bị xóa.
    - Nếu *deleteCount* là 0 hoặc số âm, thì sẽ không có phần tử nào bị xóa. Trong trường hợp này, bạn nên chỉ định ít nhất một phần tử mới (xem bên dưới).
- Tham số *item1, item2, ...* chỉ các phần tử để thêm vào mảng, bắt đầu từ *start*. Nếu bạn không chỉ định bất kỳ phần tử nào, splice() sẽ xóa các phần tử khỏi mảng.

Các ví dụ
- Không xoá phần tử nào từ vị trí số 2, và thêm phần tử 'drum'
    ```
     var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
     var removed = myFish.splice(2, 0, 'drum')

    // Kết quả
    ["angel", "clown", "drum", "mandarin", "sturgeon"]
    ```
- Không xoá phần tử nào từ vị trí số 2, và thêm phần tử 'drum' + 'guitar'

    ```
     var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
     var removed = myFish.splice(2, 0, 'drum', 'guitar')

    // Kết quả
    ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
    ```
- Xoá một phần từ ở vị trí số 3

    ```
     var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon']
     var removed = myFish.splice(3, 1)

    // Kết quả
    ["angel", "clown", "drum", "sturgeon"]
    ```
    
- Xoá một phần tử ở vị trí số 2, và thêm phần tử 'trumpet'

    ```
    var myFish = ['angel', 'clown', 'drum', 'sturgeon']
    var removed = myFish.splice(2, 1, 'trumpet')
    
    // Kết quả
    ["angel", "clown", "trumpet", "sturgeon"]
    ```
    
- Xoá tất cả các phần tử sau vị trí số 2

    ```
    var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
    var removed = myFish.splice(2)
    
    // Kết quả
    ["angel", "clown"]
    ```
    
##     Lời kết
Trên đây là một số phương thức thường được sử dụng để xử lý mảng trong Javascript. Cảm ơn tất cả các bạn đã theo dõi hết bài viết này

Tham khảo: 
 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 - https://www.w3schools.com/js/js_array_methods.asp