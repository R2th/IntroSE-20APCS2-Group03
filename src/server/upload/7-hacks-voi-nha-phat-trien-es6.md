Hôm nay mình sẽ giới thiệu cho các bạn một số hack trong es6. Cụ thể như dưới đây nhé.<br>
Bắt đầu nào!  

## Hack 1:  Swap variables

Chúng ta sẽ sử dụng  Array Destructuring để đổi chỗ các giá trị như ví dụ sau đây:
```
let a = 'world', b = 'hello'
[a, b] = [b, a]
console.log(a) // -> hello
console.log(b) // -> world
// Nó thật kì diệu @@ 
```

## Hack 2: Async/Await with Destructuring

Một lần nữa Array Destructuring thật tuyệt vời. Nó kết hợp với async/await and promises tạo ra một dòng chảy phức tạp- đơn giản
```
const [user, account] = await Promise.all([
  fetch('/user'),
  fetch('/account')
])
```
## Hack 3: Debugging

Chúng ta hay sử dụng debug với console.log  và để in ra từng giá trị. Và đây nó thật tuyệt  với cú pháp như console.table
```
const a = 5, b = 6, c = 7
console.log({ a, b, c })
// kết quả ở đây là 1 đối tượng:
// {
//    a: 5,
//    b: 6,
//    c: 7
// }
```
## Hack 4: One liners
Cú pháp này có thể gọn hơn rất nhiều đối với các hoạt động của mảng:

```
// Tìm kiếm giá trị max trong mảng
const max = (arr) => Math.max(...arr);
max([123, 321, 32]) // outputs: 321
// Tính tổng các phần tử trong mảng
const sum = (arr) => arr.reduce((a, b) => (a + b), 0)
sum([1, 2, 3, 4]) // output: 10
```

## Hack 5: Array concatenation
Bình thường chúng ta nối 2 mảng thường sử dụng toán tử **concat**  <br>
Và thử xem cách dưới đây thay vì sử dụng **concat** nhé
```
const one = ['a', 'b', 'c']
const two = ['d', 'e', 'f']
const three = ['g', 'h', 'i']
// Cách cũ #1
const result = one.concat(two, three)
// Cách cũ #2
const result = [].concat(one, two, three)
// Mới nè ! 
const result = [...one, ...two, ...three]
```
Đơn giản phải k nào ! 
## Hack:6 Cloning
Đối với mảng hoặc object bình thường ta clone chúng có nhiều cách nhưng mình thấy chưa cách nào dễ dàng như cách này: 
```
const obj = { ...oldObj } // clone đối tượng
const arr = [ ...oldArr ] //clone array
```
Nhanh gọn nhẹ nhỉ . 
## Hack 7:  Named parameters
Tạo các hàm và gọi các hàm dễ đọc hơn với destructuring: 
```
const getStuffNotBad = (id, force, verbose) => {
  làm cái gì đó ...
}
const getStuffAwesome = ({ id, name, force, verbose }) => {
  làm cái gì đó ...
}
// Bất cứ nơi đâu trong code ... K hiểu lắm true, true là gì?
getStuffNotBad(150, true, true)
// Bất cứ nơi đâu trong code... Nó thực sự tuyệt vời -> I ❤ JS!!!
getStuffAwesome({ id: 150, force: true, verbose: true })
```

Như ví dụ chúng ta thấy cách bên dưới nó mô tả cụ thể và tường minh hơn các biến được truyền vào hàm thay vì cách trên.<br>Thật tuyệt vời! 

Nguồn: https://medium.com/dailyjs/7-hacks-for-es6-developers-4e24ff425d0b