### .map()
Để tôi trình bày cách hoạt động của nó bằng một ví dụ đơn giản. Giả sử bạn có một mảng với nhiều đối tượng - mỗi đối tượng biểu diễn một người. Thứ bạn cần là một mảng chứa id của mỗi người.

```perl
// What you have
var officers = [
  { id: 20, name: 'Captain Piett' },
  { id: 24, name: 'General Veers' },
  { id: 56, name: 'Admiral Ozzel' },
  { id: 88, name: 'Commander Jerjerrod' }
];
// What you need
[20, 24, 56, 88]
```

Có nhiều cách để đạt được kết quả mong muốn. Bạn có thể tạo một mảng rỗng, rồi dùng ```.forEach()```, ```.for(...of)``` hoặc đơn giản là ```.for()``` để giải quyết.

Thử so sánh.

Dùng ```.forEach()```:

```javascript
var officersIds = [];

officers.forEach(function (officer) {
  officersIds.push(officer.id);
});

```

Tóm lại là bạn phải tạo một mảng rỗng. Thử xem với ```.map()``` thì thế nào nhé:

```javascript
var officersIds = officers.map(function (officer) {
  return officer.id
});
```

Thậm chí ta có thể ngắn gọn hơn bằng cách sử dụng *arrow function*

```objectivec
const officersIds = officers.map(officer => officer.id);
```

Vậy ```.map()``` hoạt động như thế nào? Nó nhận 2 tham số, một callback và một ngữ cảnh tùy chọn. Callback chạy với mỗi giá trị của array và trả về giá trị mới trong mảng kết quả trả về.

Hãy nhớ rằng mảng kết quả luôn có cùng số phần tử như mảng ban đầu.

### .reduce()
Cũng như ```.map()```, ```.reduce()``` cũng thực thi callback với mỗi phần tử của mảng. Điều khác biệt là *reduce* truyền giá trị của callback (*accumulator*) từ phần tử này đến phần tử khác.

*Accumulator* có thể là integer, string, object...

Giả sử bạn có một mảng với phi công và số năm kinh nghiệm tương ứng:

```swift
var pilots = [
  {
    id: 10,
    name: "Poe Dameron",
    years: 14,
  },
  {
    id: 2,
    name: "Temmin 'Snap' Wexley",
    years: 30,
  },
  {
    id: 41,
    name: "Tallissan Lintra",
    years: 16,
  },
  {
    id: 99,
    name: "Ello Asty",
    years: 22,
  }
];
```

Chúng ta cần biết tổng số năm kinh nghiệm của họ. Với ```.reduce()```, rất đơn giản:

```javascript
var totalYears = pilots.reduce(function (accumulator, pilot) {
  return accumulator + pilot.years;
}, 0);
```

Lưu ý rằng tôi đã thiết lập giá trị khởi tạo là 0. Tôi cũng có thể dùng một biến đã tồn tại nếu cần thiết. Sau khi chạy callback với mỗi phần từ của mảng, *reduce* sẽ trả về giá trị cuối cùng của *accumulator*.

Nếu dùng với arrow function (ES6), ta được:

```javascript
const totalYears = pilots.reduce((acc, pilot) => acc + pilot.years, 0);
```

Vậy giờ nếu tôi muốn tìm phi công có nhiều năm kinh nghiệm nhất thì sao. Ta cũng dùng được *reduce*:

```javascript
var mostExpPilot = pilots.reduce(function (oldest, pilot) {
  return (oldest.years || 0) > pilot.years ? oldest : pilot;
}, {});
```

Như bạn thấy, ```.reduce()``` là cách đơn giản để sinh ra một giá trị duy nhất từ một array.

### .filter()

Còn nếu bạn muốn một array nhưng chỉ lấy một vài phần tử của nó thì sao? Đấy là lúc ta xài ```.filter()```.

Đây là dữ liệu ban đầu:

```javascript
var pilots = [
  {
    id: 2,
    name: "Wedge Antilles",
    faction: "Rebels",
  },
  {
    id: 8,
    name: "Ciena Ree",
    faction: "Empire",
  },
  {
    id: 40,
    name: "Iden Versio",
    faction: "Empire",
  },
  {
    id: 66,
    name: "Thane Kyrell",
    faction: "Rebels",
  }
];
```

Ta có 2 array với thuộc tính *faction* là *rebel* và *empire*

```javascript
var rebels = pilots.filter(function (pilot) {
  return pilot.faction === "Rebels";
});
var empire = pilots.filter(function (pilot) {
  return pilot.faction === "Empire";
});
```

Thậm chí nếu dùng arrow function thì code còn ngắn hơn nữa.

```javascript
const rebels = pilots.filter(pilot => pilot.faction === "Rebels");
const empire = pilots.filter(pilot => pilot.faction === "Empire");
```

> Về cơ bản, nếu callback trả về *true* thì phần tử hiện tại sẽ có trong mảng kết quả trả về. Nếu callback trả về *false* thì bỏ qua.
> 

### Kết hợp .map(), .reduce(), and .filter()

Vì cả 3 hàm trên đều gọi trên array và ```.map()``` cũng như ```.filter()``` đều trả về array, ta có thể dễ dàng sử dụng kết hợp với nhau.

Đây là dữ liệu ta có.

```javascript
var personnel = [
  {
    id: 5,
    name: "Luke Skywalker",
    pilotingScore: 98,
    shootingScore: 56,
    isForceUser: true,
  },
  {
    id: 82,
    name: "Sabine Wren",
    pilotingScore: 73,
    shootingScore: 99,
    isForceUser: false,
  },
  {
    id: 22,
    name: "Zeb Orellios",
    pilotingScore: 20,
    shootingScore: 59,
    isForceUser: false,
  },
  {
    id: 15,
    name: "Ezra Bridger",
    pilotingScore: 43,
    shootingScore: 67,
    isForceUser: true,
  },
  {
    id: 11,
    name: "Caleb Dume",
    pilotingScore: 71,
    shootingScore: 85,
    isForceUser: true,
  },
];
```

Mục tiêu là tính tổng số điểm của *force user*. Hãy làm từng bước một.

Đầu tiên, ta cần lọc ra những người không thể sử dụng võ lực.

```javascript
var jediPersonnel = personnel.filter(function (person) {
  return person.isForceUser;
});
// Result: [{...}, {...}, {...}] (Luke, Ezra and Caleb)
```

Lúc này ta còn lại 3 phần tử trong array. Giờ ta sẽ tạo array chứa tổng điểm của mỗi người.

```javascript
var jediScores = jediPersonnel.map(function (jedi) {
  return jedi.pilotingScore + jedi.shootingScore;
});
// Result: [154, 110, 156]
```

Và sử dụng *reduce* để tính tổng:

```javascript
var totalJediScore = jediScores.reduce(function (acc, score) {
  return acc + score;
}, 0);
// Result: 420
```

Giờ ta có thể *chain* tất cả đoạn code này thành 1 dòng:

```javascript
var totalJediScore = personnel
  .filter(function (person) {
    return person.isForceUser;
  })
  .map(function (jedi) {
    return jedi.pilotingScore + jedi.shootingScore;
  })
  .reduce(function (acc, score) {
    return acc + score;
  }, 0);
```

Và vẫn với arrow function, kết quả trông còn đẹp hơn nữa:

```javascript
const totalJediScore = personnel
  .filter(person => person.isForceUser)
  .map(jedi => jedi.pilotingScore + jedi.shootingScore)
  .reduce((acc, score) => acc + score, 0);
```

### Tại sao không dùng .forEach()?

Tôi đã từng dùng *for* ở mọi nơi thay vì *.map()*, *.reduce()*, và *.filter()*. Nhưng cách đây vài năm, tôi bắt đầu làm việc với nhiêu dữ liệu từ API. Đó là lúc tôi thấy nhiều lợi ích của việc bỏ *.forEach*.

#### Format
Giả sử bạn có một danh sách cá nhân, với tên và nghề nghiệp.

```javascript
var data = [
  {
    name: "Jan Dodonna",
    title: "General",
  },
  {
    name: "Gial Ackbar",
    title: "Admiral",
  },
]
```

API trả về data như trên, nhưng bạn chỉ cần title và last name của mỗi người. Bạn cần format dữ liệu. Tuy nhiên, ứng dụng cũng cần một single view cho mỗi người, nên bạn phải viết một hàm để format dữ liệu mà có thể hoạt động được cả ở list view và cả ở single view.

Điều đó có nghĩa là bạn không thể sử dụng *.forEach* trong hàm format, mà phải wrap phần tử của mảng trước khi truyền vào hàm, như này:

```javascript
var result = formatElement([element])[0];
// Yeah... that's not right at all
```

Vòng lặp phải wrap phần gọi hàm, như thế này:

```javascript
data.forEach(function (element) {
  var formatted = formatElement(element);
  // But what then....
});
```

Nhưng *.forEach* không thể trả về bất cứ thứ gì. Điều đó có nghĩa là bạn phải đẩy kết quả vào trong một mảng đã được định nghĩa từ trước đó.

```javascript
var results = [];
data.forEach(function (element) {
  var formatted = formatElement(element);
  results.push(formatted);
});
```

Kết quả, bạn có 2 function: *formatElement()* và một function để đẩy dữ liệu vào array.

Tại sao lại phải dùng 2 function khi bạn thực sự chỉ cần 1?

```c
var results = data.map(formatElement);
```

#### Dễ test hơn
Nếu bạn viết unit test, bạn sẽ thấy những hàm sử dụng ```.map()```, ```.reduce()```, ```.filter()``` dễ test hơn.

Bạn chỉ cần cung cấp data đầu vào và chờ đợi kết quả, trực quan và đơn giản.

Tham khảo: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d