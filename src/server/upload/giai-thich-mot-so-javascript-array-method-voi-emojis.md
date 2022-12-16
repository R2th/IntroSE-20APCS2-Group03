Như chúng ta đã biết, Array trong JS có rất nhiều method tiện dụng có thể hỗ trợ chúng ta. Sau đây là một số method thông dụng được giải thích bằng các emoji.
## 1. `Array.push()`
Thêm một hoặc nhiều phần tử vào sau mảng.
```
let livestock = ["🐷", "🐮", "🐔"];
livestock.push("🐴", "🐮");
// console.log(livestock);
// ["🐷", "🐮", "🐔", "🐴", "🐮"]
```
## 2. `Array.from()`
Tạo mảng mới từ array-like hoặc iterable object.
```
const wild  = "🐻🐯🦁";
const tamed = Array.from(wild);
// console.log(tamed);
// ["🐻", "🐯", "🦁"]
```
## 3. `Array.concat()`
Gộp 2 hay nhiều mảng thành 1 mảng mới.
```
const dogs = ["🐶", "🐶"];
const cats = ["🐱", "🐱", "🐱"];
const pets = dogs.concat(cats);
// console.log(pets);
// ["🐶", "🐶", "🐱", "🐱", "🐱"]
```
## 4. `Array.every()`
Kiểm tra xem mọi phần tử của mảng thỏa điều kiện hay không.
```
const visitors   = ["🧑", "👽", "🧑", "🧑", "🤖"];
const isHuman    = e => e === "🧑";
const onlyHumans = visitors.every(isHuman);
// console.log(onlyHumans);
// false
```
## 5. `Array.fill()`
Thay thế mọi phần tử từ giá trị start đến giá trị end bắng 1 phần tử  mong muốn.
```
let seeds = ["🌱", "🌱", "🌱", "🌱", "🌱"];
seeds.fill("🌳", 1, 4);
// console.log(seeds);
// ["🌱", "🌳", "🌳", "🌳", "🌱"]
```
## 6. `Array.filter()`
Lọc những phần tử thỏa điều kiện.
```
const guests  = ["👩👨", "👩👩", "👨", "👩", "👨👨"];
const singles = guests.filter(g => g.length/2 === 1); // *
// console.log(singles);
// ["👨", "👩"]
```
*Lưu ý: một emoji có độ dài là 2. Hãy thử nhập `"👩".length` trên console.*
## 7. `Array.flat()`
Tạo một mảng mới bao gồm mọi phần tử của những mảng con, không bị hạn chế bởi số chiều của mảng.
```
const savings = ["💵", ["💵", "💵"], ["💵", "💵"], [[["💰"]]]];
const loot    = savings.flat(3)
// console.log(loot);
// ["💵", "💵", "💵", "💵", "💵", "💰"];
```
## 8. `Array.includes()`
Kiểm tra xem mảng có chứa phần tử nào đó hay không.
```
const food   = ["🥦", "🥬", "🍅", "🥒", "🍩", "🥕"];
const caught = food.includes("🍩");
// console.log(caught);
// true
```
## 9. `Array.join()`
Nối toàn bộ phần tử trong mảng thành một chuỗi, có thể dùng thêm chuỗi ngăn cách giữa các phần tử hoặc không.
```
const devices = ["💻", "🖥️", "🖥️", "💻", "🖨️"];
const network = devices.join("〰️");
// console.log(network);
// "💻〰️🖥️〰️🖥️〰️💻〰️🖨️"
```
## 10. `Array.map()`
Gọi hàm với tham số là các giá trị của mảng, lưu từng kết quả vào một mảng mới.
```
const hungryMonkeys = ["🐒", "🦍"];
const feededMonkeys = hungryMonkeys.map(m => m + "🍌");
// console.log(feededMonkeys);
// ["🐒🍌", "🦍🍌"]
```
## 11. `Array.reverse()`
Đảo ngược thứ tự các phần tử của mảng.
```
let rabbitWins   = ["🐇", "🦔"];
const hedgehogWins = rabbitWins.reverse();
// console.log(hedgehogWins);
// ["🦔", "🐇"]
```
## 12. `Array.slice()`
Tạo một mảng mới bằng cách copy một phần mảng ban đầu từ start đến end index.
```
const solutionsOfClassmates = ["📃", "📑", "📄", "📝"];
const myOwnSolutionReally   = solutionsOfClassmates.slice(2, 3);
// console.log(myOwnSolutionReally);
// ["📄"]
```
## 13. `Array.some()`
Kiểm tra xem mảng có chứa một hay nhiều phần tử thỏa điều kiện hay không.
```
const participants = ["🔇", "🔇", "🔊", "🔇", "🔊"];
const isLoud       = p => p === "🔊";
const troubles     = participants.some(isLoud);
// console.log(troubles);
// true
```
## 14. `Array.sort()`
Sắp xếp các phần tử trong mảng.
```
let books = ["📕", "📗", "📕", "📒", "📗", "📒"];
books.sort();
// console.log(books);
// ["📒", "📒", "📕", "📕", "📗", "📗"]
```
## 15. `Array.splice()`
Xóa, thêm hoặc thay thế một hay nhiều phần tử trong mảng.
```
let weather = ["☁️", "🌧️", "☁️"];
weather.splice(1, 2, "☀️");
// console.log(weather);
// ["☁️", "☀️"]
```
## 16. `Array.unshift()`
Thêm một hoặc nhiều phần tử vào trước mảng.
```
let train = ["🚃", "🚃", "🚃", "🚃"];
train.unshift("🚂");
// console.log(train);
// ["🚂", "🚃", "🚃", "🚃", "🚃"]
```

Source: https://dev.to/devmount/javascript-array-methods-explained-with-emojis-2amn