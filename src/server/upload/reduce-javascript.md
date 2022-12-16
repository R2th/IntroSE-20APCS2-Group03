JavaScript Reduce. Đây chính là một method không phức tạp nhưng thật sự là khó hiểu và không biết áp dụng khi nào trong ứng dụng của developers. Kể cả ngay những coder giỏi đôi khi cũng cảm thấy thực sự bối rối khi sử dụng reduce javascript method.

## reduce javascript - convert array to object js

## Cú pháp JavaScript Reduce
Như đầu bài đã nói[ javascript Reduce Method](https://anonystick.com/blog-developer/javascript-reduce-nang-cao-arrayprototypereduce-tutorial-2019041273772614.jsx) không phức tạp. Hãy xem qua cú pháp dưới đây.

`arr.reduce(callback, initialValue);`
## Return JavaScript Reduce
Nên nhớ rằng method reduce sẽ chỉ trả lại một giá trị và một giá trị duy nhất. Hãy nhớ kỹ để sử dụng reducer.

## Example JavaScript Reduce
Một ví dụ đầu tiên rất đơn giản cho những ai chưa dùng reduce bao giờ, hãy xem reduce xử lý như thế nào? Tính tổng:

```
const value = 0;
const numbers = [10, 20, 30];
for (let i = 0; i < numbers.length; i++) {
    value += numbers[i];
}
```
Nếu như bạn nào chưa dùng reduce và tính tổng sẽ dùng phương pháp này. Ok nó làm việc rất tốt nhưng, bạn để ý kỹ sẽ thấy value = 0, sau khi chạy xong thì giá trị value sẽ thay đổi, lúc này value = 60. Giờ hãy xem reduce javascript sẽ xử lý tình huống này thế nào?

```
const numbers = [5, 10, 15];
const total = numbers.reduce((accumulator, item) => accumulator + item)
//Result total = 60
```
Result total = 60 không cần khai báo thêm một biến như trên. Đây là một ví dụ rất nhẹ nhàng để cho các bạn hiểu. Giờ đây, hãy đọc tiếp để xem reduce sẽ giúp coders xử lý những công việc phức tạp hơn.

Convert array to object javascript using reduce
Giả sử chúng ta có một array sau:

```
const players = [
      { id: 11, name: 'Messi', age: 33 },
      { id: 12, name: 'Ronaldo', age: 34 },
      { id: 13, name: 'Young', age: 35 },
      { id: 14, name: 'Mane', age: 21 },
      { id: 15, name: 'Salah', age: 24 },
]
```
Giờ chúng ta muốn Convert array to object js trông nó như thế này.

```
const playersModified = {
    11: {id: 11, name: "Messi", age: 33}
    12: {id: 12, name: "Ronaldo", age: 34}
    13: {id: 13, name: "Young", age: 35}
    14: {id: 14, name: "Mane", age: 21}
    15: {id: 15, name: "Salah", age: 24}
}
```
Nếu bạn không biết sử dụng reduce thì để xử lý công việc trên thì bạn mất rất nhiều thời gian. Chúng ta hãy cùng xem reduce xử lý reduce array object javascript như thế nào. Trước tiên viết một function return về objects
Tin tôi đi, ở đây bạn sẽ học được rất nhiều **[tips and tricks in javascript](https://anonystick.com/)**.

```
const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
}
```
Sử dụng convert an array into an object in javascript

```
const players = [
      { id: 11, name: 'Messi', age: 33 },
      { id: 12, name: 'Ronaldo', age: 34 },
      { id: 13, name: 'Young', age: 35 },
      { id: 14, name: 'Mane', age: 21 },
      { id: 15, name: 'Salah', age: 24 },
]

const playersModified = convertArrayToObject(players, 'id');
```
Result:

```
playersModified = {
    11: {id: 11, name: "Messi", age: 33}
    12: {id: 12, name: "Ronaldo", age: 34}
    13: {id: 13, name: "Young", age: 35}
    14: {id: 14, name: "Mane", age: 21}
    15: {id: 15, name: "Salah", age: 24}
}
```
Rất hay phải không, chúng ta đi tiếp thêm ví dụ nữa để thấy reduce làm việc trong vấn đề convert array to key value javascript

```
const playerProfile = [
  { name: "Ronaldo", team: "Juventus " },
  { name: "Messi", team: "Barcelona" },
  { name: "Mane", team: "Liverpool" }
];
```
Giờ chúng ta biến thành

```
const playerProfileModified = {
  Mane: {team: "Liverpool"},
  Messi: {team: "Barcelona"},
  Ronaldo: {team: "Juventus "}
}
```
Như ví dụ trước chúng ta cũng viết một function trước

```
const getMapFromArray = data => {
return data.reduce((obj, item) => {
  obj[item.name] = { team: item.team };
  return obj
  }, {})
}
```
Sử dụng

`const playerProfileModified = getMapFromArray(playerProfile)`
Result:
```

playerProfileModified = {
  Mane: {team: "Liverpool"},
  Messi: {team: "Barcelona"},
  Ronaldo: {team: "Juventus "}
}
```
Kết luận
Đây là một bài viết giúp các bạn hiểu sâu hơn về cách sử dụng và hoạt đọng của reduce javascript. Các bạn nên đọc và tham khảo nhiều **[kỹ năng xử lý trong lập trình javascript](https://anonystick.com/)** nếu muốn vươn xa hơn nữa. Chúc các bạn thành công!
Tôi sẽ cố gắng đưa nhiều ví dụ hơn nữa cho các bạn tham khảo và hiểu sâu hơn về Reduce Javascript. Các bạn cố gắng theo dõi và thực hành, chạy càng nhiều càng hiểu sâu. Đừng đọc xong rồi để đó, đến lúc dùng lại đi tìm. Thanks for reading!

Read more about blog javascript: https://anonystick.com