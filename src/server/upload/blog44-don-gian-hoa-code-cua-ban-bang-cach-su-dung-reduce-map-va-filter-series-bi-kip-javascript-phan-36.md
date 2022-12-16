![image.png](https://images.viblo.asia/e33affbe-3b3e-4fef-97fe-607c2221a92d.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Nếu bạn mới bắt đầu code JavaScript trong một thời gian ngắn, có thể bạn chỉ mới nghe đến `.map()`, `.reduce()` và `.filter()` chứ ko thực sự dùng nó nhiều. Đối với mình, phải mất một thời gian vì mình code web cho **cty Nhật**. Nên phải code làm sao để có thể hỗ trợ Internet Explorer 8 và một số trình duyệt cũ hơn tý (Mà chủ yếu án maintenance thôi còn lại mới thì đa phân ES6 hết :D). Vì thế, nếu bạn không cần code ra một cái gì đó mà nó cần tương thích với mấy cái trình duyệt rất cũ này, thì bạn phải làm quen với các hàm như `.map()`, `.reduce()` và `.filter()` nó sẽ giụp bạn rất nhiều.

Ví dụ mở đầu: cái hàm groupBy này chỉ vài dòng đơn giản là đã có thể vừa group + filter quá tiện
Nếu lướt qua hết bài này mình nghĩ bạn cũng hoàn toàn có thể code ra một hàm y như vậy
```javascript
const personnel = [
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

/**
 * Hàm GroupBy theo hàm điều kiện
 * @param fnKey Điều kiện group by
 * @param fnValue Điều kiện filter cho mỗi kết quả
 * @param list List đầu vào
 * @returns Trả về 1 đối tượng
 */
function groupBy(list, fnKey, fnValue = (e) => e) {
  return list.reduce(
    (prev, next) => ({
      ...prev,
      [fnKey(next)]: [...(prev[fnKey(next)] || []), fnValue(next)],
    }),
    {}
  );
}

console.log(
  groupBy(
    personnel,
    (e) => (e.isForceUser ? "Force User" : "Not Force User"),
    (e) => e.name
  )
);
```

Kết quả: Điểm đặc biết nữa là độ khó thuật toán này là `(On)` quá ổn :D
```javascript
{
  'Force User': [ 'Luke Skywalker', 'Ezra Bridger', 'Caleb Dume' ],
  'Not Force User': [ 'Sabine Wren', 'Zeb Orellios' ]
}
```

_Hãy lưu ý rằng bài viết này rất có thể sẽ áp dụng được cho bất kỳ ngôn ngữ lập trình nào khác mà bạn có thể đang sử dụng, vì đây là những khái niệm tồn tại trong nhiều ngôn ngữ khác._

OK GÉT GÔ

.map()
=========

Hãy để mình giải thích cách nó hoạt động với một ví dụ đơn giản. Giả sử bạn đã nhận được một array chứa nhiều đối tượng – mỗi đối tượng đại diện cho một người. Tuy nhiên, điều bạn thực sự cần cuối cùng là một array chỉ chứa id của mỗi người.

```javascript
// Những gì bạn có   
var officers = [
  { id: 20, name: 'Captain Piett' },
  { id: 24, name: 'General Veers' },
  { id: 56, name: 'Admiral Ozzel' },
  { id: 88, name: 'Commander Jerjerrod' }
];
// Thứ bạn cần  
[20, 24, 56, 88]
```

Có nhiều cách để đạt được điều này. Bạn có thể muốn làm điều đó bằng cách tạo một array trống, sau đó sử dụng `.forEach()`, `.for(...of)` hoặc đơn giản `.for()` để đạt được mục đích của mình.

Hãy so sánh các cách làm đó nhé!

Sử dụng `.forEach()`:

```javascript
var officersIds = [];
officers.forEach(function (officer) {
  officersIds.push(officer.id);
});
```

Lưu ý theo cách này bạn phải tạo một array trống trước? 
Tiếp theo, hãy xem nó trông như thế nào khi sử dụng `.map()`:

```javascript
var officersIds = officers.map(function (officer) {
  return officer.id
});

```

Chúng ta thậm chí có thể ngắn gọn hơn với các arrow functions (Lưu ý: ES6, Babel hoặc TypeScript)

```javascript
const officersIds = officers.map(officer => officer.id);
```

Vậy làm thế nào để `.map()` làm việc? Về cơ bản là có 2 đối số, một hàm callback và một contexts tùy chọn (mặc định sẽ là `this` trong hàm callback) mà mình đã không sử dụng trong ví dụ trước. Hàm callback sẽ được call cho **từng value trong array** và **trả về từng value mới** trong array kết quả.

Hãy nhớ rằng array kết quả sẽ luôn có cùng độ dài với array ban đầu.

.reduce()
=======

Giống như `.map()`, `.reduce()` cũng gọi hàm callback cho từng phần tử của array. Điều khác biệt ở đây là `reduce` chuyển kết quả của hàm callback này cho một `bộ tích lũy` từ phần tử array này sang phần tử array khác.

**Bộ tích lũy** có thể là bất kỳ thứ gì (số nguyên, chuỗi, đối tượng, v.v.) và phải được khởi tạo hoặc truyền vào khi gọi `.reduce()`.

Đến lúc làm vài ví dụ để giễ hiểu hơn nào!
Giả sử bạn có một list phi công và số năm kinh nghiệm tương ứng của họ:

```javascript
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
]
```

Chúng ta cần biết tổng số năm kinh nghiệm của tất cả họ. Với `.reduce()`, nó khá đơn giản:

```javascript
var totalYears = pilots.reduce(function (accumulator, pilot) {
  return accumulator + pilot.years;
}, 0);
```

Lưu ý rằng mình đã đặt `value` bắt đầu là `0`. Mình cũng có thể sử dụng một object nếu cần. Sau khi gọi callback cho từng phần tử của array, reduce sẽ trả về value cuối cùng của `bộ tích lũy` của chúng ta (trong trường hợp này là: `82`).

Và tất nhiên nó cũng có thể được rút ngắn với các arrow functions của ES6:

```javascript
const totalYears = pilots.reduce((acc, pilot) => acc + pilot.years, 0);
```

Bây giờ, giả sử mình muốn tìm phi công nào là người có kinh nghiệm nhất. Đối với câu hỏi này, mình cũng có thể sử dụng `reduce`:

```javascript
var mostExpPilot = pilots.reduce(function (oldest, pilot) {
  return (oldest.years || 0) > pilot.years ? oldest : pilot;
}, {});
```

Mình đặt tên cho `bộ tích lũy` của mình là `oldest`. Hàm callback của mình so sánh bộ tích lũy với từng phi công. Nếu một phi công có nhiều năm kinh nghiệm hơn `oldest`, thì phi công đó sẽ trở thành phi công `oldest` đến cuối cùng mình sẽ trả về `oldest`.

Như bạn có thể thấy, sử dụng `.reduce()` là một cách dễ dàng để tạo một `value` hoặc một `Object` từ một array.

.filter()
======

Nếu bạn có một array, nhưng chỉ muốn một số phần tử trong đó thì sao? Đó là khi bạn cần dùng tới `.filter()`

Đây là dữ liệu của chúng ta:

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

Giả sử bây giờ chúng ta muốn có hai array: một array dành cho quân "Rebels", array còn lại dành cho quân "Empire". Với `.filter()` nó vô dùng đơn giản!

```javascript
var rebels = pilots.filter(function (pilot) {
  return pilot.faction === "Rebels";
});
var empire = pilots.filter(function (pilot) {
  return pilot.faction === "Empire";
});
```

Và nó thậm chí còn ngắn hơn với các arrow functions:

```javascript
const rebels = pilots.filter(pilot => pilot.faction === "Rebels");
const empire = pilots.filter(pilot => pilot.faction === "Empire");
```

Về cơ bản, nếu function callback **trả về là true**, phần tử hiện tại **sẽ nằm trong array kết quả**. Nếu nó trả về `false`, nó sẽ không được đưa vào danh sách kết quả.

Đến phần hay kết hợp .map(), .reduce() và .filter()
======================================

Vì cả ba đều được call trên các array và vì `.map()` và `.filter()` cả hai đều trả về array, nên chúng ta có thể dễ dàng xâu chuỗi các lệnh gọi của mình.

Hãy xem một ví dụ khác. Đây là dữ liệu của chúng ta:

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

Mục tiêu của chúng ta là: chỉ cần có được tổng số điểm của những user có `isForceUser` là `true`. Hãy làm điều đó từng bước một!

Đầu tiên, chúng ta cần lọc ra những `user` mà `isForceUser` là `false`:

```javascript
var jediPersonnel = personnel.filter(function (person) {
  return person.isForceUser;
});
// Result: [{...}, {...}, {...}] (Luke, Ezra and Caleb)
```

Sau khi lọc, chúng ta có 3 phần tử còn lại trong array kết quả của mình. Bây giờ chúng ta cần tạo một array chứa tổng số điểm của mỗi `Jedi`.

```javascript
var jediScores = jediPersonnel.map(function (jedi) {
  return jedi.pilotingScore + jedi.shootingScore;
});
// Result: [154, 110, 156]
```

Và hãy sử dụng `reduce` để có được tổng số:

```javascript
var totalJediScore = jediScores.reduce(function (acc, score) {
  return acc + score;
}, 0);
// Result: 420
```

Và bây giờ là phần thú vị… chúng ta có thể xâu chuỗi tất cả những thứ này để có được thứ chúng ta muốn trong một dòng duy nhất:

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

Và hãy xem nó ngắn gọn như thế nào nếu sử dụng với arrow functions:

```javascript
const totalJediScore = personnel
  .filter(person => person.isForceUser)
  .map(jedi => jedi.pilotingScore + jedi.shootingScore)
  .reduce((acc, score) => acc + score, 0);
```

Bùm! Quá ngầu đúng ko nhìn ngắn gọn giễ hiểu hơn nhiều nhỉ

*Lưu ý: Trong ví dụ trên, `.map()` và `.filter()` thậm chí còn không cần thiết. Chúng ta có thể dễ dàng đạt được kết quả tương tự chỉ với `.reduce()`. Tuy nhiên ở ví dụ trên mình vẫn dùng nó để các bạn giễ hình dung hơn. Bạn có thể đoán xem làm cách nào chỉ cần dùng `.reduce()` mà vẫn nhận được kết quả tương tự chỉ với với một dòng code không?*

Ten tèn easy đúng đúng ko:
```javascript
const totalJediScore = personnel.reduce(
  (acc, person) =>
    person.isForceUser
      ? acc + person.pilotingScore + person.shootingScore
      : acc,
  0
);
```

Tại sao không sử dụng .forEach()?
=================================

Câu hỏi rất hay, thực ra thì mình đã từng sử dụng các vòng lặp `for` ở mọi nơi thay vì `.map()`, `.reduce()` và `.filter()`. Nhưng gần đây, khi có cơ hội được tự tay viết những function base cho dự án hiện tại của cty, mình đã bắt đầu làm việc nhiều hơn với dữ liệu đến từ API. Đó là lúc mình bắt đầu thấy những lợi thế của việc sử dụng chúng. Như bạn thấy ví dụ đầu tiên mình có đưa ra bạn hoàn toàn có thể giải quyết một bài toán chỉ với 1 dòng code.

Formatting
---------

Giả sử bạn có 1 danh sách chứa `name` và `title`:

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

API cung cấp cho bạn dữ liệu trên, nhưng bạn chỉ cần phần tiêu đề và họ của từng người… Vì ta có fullname nên chắc chắn phải định dạng nó lại đúng ko? (firstname + lastname)
Vì vậy bạn phải viết một function định dạng dữ liệu để sử dụng mỗi khi chúng ta lặp.

Điều đó có nghĩa là bạn không thể có vòng lặp `.forEach` bên trong hàm `formatElement`, nếu không bạn sẽ phải bọc phần tử đơn lẻ của mình trong một array trước khi chuyển nó vào hàm chỉ để nó hoạt động, như sau:

```javascript
var result = formatElement([element])[0];
// Yeah... điều đó không đúng chút nào
```

Vì vậy, vòng lặp của bạn phải kết thúc việc gọi của hàm, như thế này:

```javascript
data.forEach(function (element) {
  var formatted = formatElement(element);
  // Nhưng sau đó thì sao....   
});
```

Nhưng `.forEach()` không trả lại bất cứ điều gì. Điều đó có nghĩa là bạn phải đẩy kết quả vào bên trong một array được khai báo từ trước.

```javascript
var results = [];
data.forEach(function (element) {
  var formatted = formatElement(element);
  results.push(formatted);
});
```

Kết quả là bạn có 2 hàm: hàm `formatElement()` và hàm `push` kết quả vào array của bạn.

Tại sao có 2 function khi bạn chỉ cần 1 là đủ:

```javascript
var results = data.map(formatElement);
```

Testing dễ dàng hơn
--------------------

Nếu bạn viết các **Unit tests** cho code của mình, bạn sẽ thấy việc kiểm tra các function bằng `.map()`, `.reduce()` hoặc `.filter()`, đơn giản hơn.

Tất cả những gì bạn phải làm là cung cấp dữ liệu cho hàm và mong đợi kết quả xuất hiện. Về cơ bản "điều gì sẽ xảy ra nếu **điều này** được `passed`?". Ít thao tác hơn, ít `beforeEach()` và `afterEach()` hơn. Nó sẽ đơn giản hơn rất nhiều.



Cố gắng thay thế một số vòng lặp `for`của bạn bằng `.map()`, `.reduce()`, `.filter()` nơi nó có vẻ phù hợp. Mình đảm bảo code của bạn sẽ bớt lộn xộn và dễ đọc hơn nhiều.

Ngày xưa khi mình mới sử dụng mấy hàm này đặc biệt là `.reduce()` mình cũng rất bối rối nhưng dần dần rồi sẽ quen ấy mà. [Mình cũng có một bài viết về những Snippets thường dùng của những hàm này các bạn có thể tham khảo.](https://viblo.asia/p/blog37-bay-lac-cung-voi-20-snippets-kinh-dien-trong-javascript-series-bi-kip-javascript-phan-32-zXRJ8jj2VGq)

Roundup
=======
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
=======
* https://tuan200tokyo.blogspot.com/2022/11/blog44-on-gian-hoa-code-cua-ban-bang.html