# 1. Thay thế `Array.indexOf` bằng `Array.includes`

Nếu bạn muốn tìm 1 vị trí nào đó trong Arrays thì hãy sử dụng Array.indexOf. Điều đó sẽ giúp bạn trả về chỉ mục đầu tiên có thể tìm thấy 1 phần tử đã cho. Chính vì đó indexOf là 1 giải pháp cần thiết. Tuy nhiên, điều gì xảy ra nếu chúng ta chỉ cần biết liệu mảng của chúng ta có chứa giá trị hay không? Với trường hợp như này, bạn không nên sử dụng indexOf.

```js
const avengers = [
  'ironman',
  'hulk',
  'captain_america',
  'hulk',
  'thor',
];

console.log(avengers.indexOf('hulk'));
// 1 -> tìm thấy.
console.log(avengers.indexOf('batman'));
// -1 -> không tìm thấy.
```
Thay vì sử dụng indexOf thì có thể sử dụng Includes, và nó trả về kiểu boolean.
```js
console.log(avengers.includes('hulk')); //true
console.log(avengers.includes('batman')); //false
```
Nếu bạn vẫn phân vân về đề xuất mình đưa ra, vậy hãy đọc thêm ví dụ sau
```js
const array = [NaN, undefined];
if (array.indexOf(NaN) === -1){
    console.log('NaN not found in the array.');
}

if (!array.indexOf(undefined) === -1 ) {
    console.log('True. Array elements are undefined.');
} else {
    console.log("Sorry can't find undefined.");
}

if (array.includes(NaN)) {
    console.log('NaN was found in the array.');
}

if (array.includes(undefined)) {
    console.log("undefined was found in the array");
}
```
Với những kết quả trên, ta có thể tóm tắt rằng: "Includes method có thể những check những value như NaN, undefined. Ngược lại, indexOf thì không. Việc sử dụng includes thay cho indexOf có thể nhằm giảm bớt bug cho chính chúng ta." 

# 2. Sử dụng `Array.find` thay vì `Array.filter`

Array.filter là 1 method rất hữu ích, nó sẽ trả về 1 array mới, khi phần thử thỏa mãn điều kiện đặt ra.
```js
const numbers = [1, 2, 3, 4, 5, 6];
const oddNumbers = numbers.filter(n => n % 2 !== 0);
console.log(oddNumbers) // [1, 3, 5]
```
Nhưng, nếu chúng ta biết rằng hàm chỉ trả về 1 item. Ví dụ khi filter unique ID. Trong trường hợp này, Array.filter sẽ trả về 1 mảng mới chỉ chứa 1 item, và tôi khuyên bạn không nên sử dụng filter.
```js
const avengers = [
  { id: 1, name: 'ironman' },
  { id: 2, name: 'hulk' },
  { id: 3, name: 'captain_america' },
  { id: 4, name: 'captain_america' },
];

function getAvenger(name) {
  return avenger => avenger.name === name;
}

console.log(avengers.filter(getAvenger('captain_america')));
// [
//   { id: 3, name: 'captain_america' },
//   { id: 4, name: 'captain_america' },
// ]

console.log(characters.find(getAvenger('captain_america')));
// { id: 3, name: 'captain_america' }
```
Có thể thấy find method khá tương đồng với hàm filter, nhưng nó khác nhau về mặt performance:

-  filter: nó sẽ duyệt hết 1 array và lấy tất cả những giá trị có cùng điều kiện.
-  find: khi tìm được giá trị cùng với điều kiện thì nó ngừng thực thi.

# 3. Sử dụng `Array.reduce` thay vì kết hợp `Array.filter` và `Array.map`

Với những bạn mới sử dụng reduce method như mình, có lẽ nó không đơn giản chút nào. Nhưng cuộc sống mà (yaoming)

Ví dụ mình đưa ra bài toán sau: Với dữ liệu đã cho dưới đây tìm name của các avenger đủ tuổi kết hôn, tức age >= 18. 
```js
const avengers = [
  { name: 'ironman', age: 27 },
  { name: 'hulk', age: 12 },
  { name: 'captain_america', age: 18 },
  { name: 'thor', age: 22 },
];
```
Bài toán khá đơn giản. Ở đây mình sẽ đưa ra 2 hướng giải quyết.

- Sử dụng filter và map:
```js
const result = avengers.filter(({ age }) => age >= 18)
                       .map(({ name }) => name); 
```
Kết quả trả về đúng với yêu cầu bài toán. Tuy nhiên đoạn code trên có chút vấn đề về performance. 

Ở đây, avengers.length = 4, giả sử rằng avengers[] có 1000 item. Đầu tiên khi sử dụng filter method chúng ta đã lặp hết array avengers với 1000 lần. Sau khi filter method xong, giả sử tìm được 50000 item thoả mãn điều kiện age >= 18. Tiếp theo đó sử dụng map method để get ra nam thì ta phải chạy thêm 500 lần nữa. Như vậy, với câu lệnh trên ta cần chạy 1500 lần để ra kết quả mong muốn. Nếu số lượng item trong mảng càng lớn thì ta thấy rằng performance lại càng không hề tốt. Để tránh điều đó hãy sử dụng reduce method thay thế.
- Sử dụng reduce
```js
const result = avengers.reduce((avenger, { age, name }) => {
  return (age >= 18) ? [...avenger, name] : avenger;
}, []);
```
# Kết luận
Hi vọng bài này giúp ích được cho bạn! Cố gắng tận dụng những lợi thế mà Javascipt đã cung cấp, hỗ trợ cho mình, sử dụng cho từng trường hợp làm sao khéo léo nhất có thể, vừa ra kết quả được như mong muốn mà vẫn đem lại được performance tốt nhất. 
Cảm ơn bạn đã đọc bài viết của mình!

Tham khảo: https://www.freecodecamp.org/news/heres-how-you-can-make-better-use-of-javascript-arrays-3efd6395af3c/