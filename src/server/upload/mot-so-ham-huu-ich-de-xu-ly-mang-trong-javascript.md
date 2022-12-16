Đôi khi chúng ta bị cuốn theo những Framework, lib... được xây dững sẵn mà quên đi những kiến thức căn bản có thể đã từng tồn tại trong đầu của chúng ta.

Bài viết này sẽ nói về những kiến thức đó, chúng ta sẽ xem xét một vài phương thức có sẵn của Array Object và cách sử dụng nhưng phức này để sắp xếp, lọc và nhiều tác vụ hơn thể để có được kết quả mà chúng ta mong muốn.

# Giới thiệu
Trước khi tìm hiểu về các phương thức, chúng ta nên xem xét một chút về các phương thức của đối tượng Array trong Javascript. Các phương thức này có thể làm thay đổi giá trị của mảng hoặc không.

Các phương thức này nằm trong prototype của bất kỳ mảng nào, bạn có thể sử dụng console devtool của trình duyệt để log ra một mảng bất kỳ và các phương thức có trong prototype của nó.

![](https://images.viblo.asia/f2c5491b-cfcf-4803-83d8-06177262aa55.png)

Danh sách này liệt kê tất cả các phương thức mà bạn có thể sử dụng với bất cứ mảng nào, như đã nói ở trên, các phương thức có thể làm thay đổi giá trị của mảng hoặc sẽ nhận lại giá trị từ phương thức.

Bạn cũng biết rằng không có giá trị nào trong một mảng của Javascript được cố định, có nghĩa nó có thể thay đổi bất cứ lúc nào (kể các các phương thức của mảng). Tất nhiên bạn vẫn có cách làm cho chúng không thể thay đổi, nhưng theo "định nghĩa" thì mảng luôn có thể thay đổi nội dung và đội dài.

## .sort() và .reverse()
Tối giới thiệu 2 phương thức này trước tiên, vì theo tôi chúng là những phương thức đơn giản và thường dùng nhất của chúng ta.

Để giới thiệu về 2 phương thức này, tôi sử dụng một mảng số đơn giản như sau:

```javascript
var array = [1, 8, 3, 5, 9, 7];
```

Hãy tưởng tượng, bạn có một mảng như trên, nhưng giờ bạn muốn mảng đó phải được sắp xếp từ nhỏ tới lớn.

```javascript
var sortedArray = array.sort();
```

Nó sẽ trả lại mảng mới với các giá trị:

```javascript
[1, 3, 5, 7, 8, 9]
```

Phương thức này cũng làm việc với các chuỗi, ký tự nếu bạn muốn sắp xếp chúng theo thứ tự bảng chữ cái, nó sẽ thực hiện việc sắp xếp mà không cần truyền vào bất kỳ tham số nào.

Lưu ý: Phương thức này **trả lại một mảng mới** và thứ tự các phần tử của mảng cũng bị thay đổi.

Bạn cũng có thể truyền tham số cho phương thức này, tham số đó là `hàm sắp xếp`, theo mặc định của Javascript thì hàm đó sẽ là:
```javascript
array.sort((a, b) => {
    // a = phần tử hiện tại của mảng
    // b = phần tử tiếp theo của mảng
    return a < b;
});
```

Chức năng của hàm sắp xếp mặc định là đi qua mọi phần tử của mảng và xem xét liệu phần tử hiện tại có nhỏ hơn phần tử tiếp theo hay không và theo cách đó tổ chức lại mảng của bạn. Vì vậy, nếu bạn muốn sắp xếp ngược lại thì việc phải làm là xem xét xem phần tử hiện tại có lớn hơn phần tử tiếp theo hay không, như thế này:

```javascript
array.sort((a, b) => {
    return a > b;
});

// [9, 8, 7, 5, 3, 1]
```

Ngoài ra có một cách khác để thực hiện việc sắp xếp theo chiều từ nhỏ tới lớn, đây là lúc phương thức `.reverse()` xuất hiện, chức năng của phương thức này là đảo ngược thứ tự của mảng. Do đó ngoài cách trên, chúng ta có thêm cách:

```javascript
array.sort().reverse();

// [9, 8, 7, 5, 3, 1]
```

Phương thức này không nhận vào tham số nào, trả lại một mảng mới và làm thay đổi mảng gọi nó.

## .filter()
Sau khi chúng ta đã biết về việc sắp xếp và đảo ngược một mảng, tiếp theo chúng ta sẽ tìm hiểu cách lọc một mảng sử dụng phương thức `.filter()`.

Chúng ta sẽ sử dụng một mảng dữ liệu mẫu, mảng này sẽ được sử dụng cho những ví dụ sau nữa.

```javascript
var people = [
  {
    name: 'Helga Brekke',
    age: 25,
    gender: 'f',
    us: true
  },
  {
    name: 'Christine Hansen',
    age: 18,
    gender: 'm',
    us: false,
  },
   {
    name: 'Alfred Roob',
    age: 17,
    gender: 'm',
    us: false,
  },
   {
    name: 'Crystal Hermann',
    age: 27,
    gender: 'm',
    us: false,
  },
  {
    name: 'Dax Koch',
    age: 22,
    gender: 'f',
    us: true
  }
];
```

Bạn có mảng này và bạn chỉ muốn có được danh sách những người là phụ nữ. Về cơ bản những gì bạn phải làm là lọc mảng này và chỉ nhận nhẫn những đối tượng có trường `gender` là `f`.

**Phương thức này trả lại một mảng, không làm thay đổi mạng gọi nó.**

Phương thức `.filter()` nhận vào một tham số và đối số là một hàm, hàm mà chúng ta muốn chạy cho từng phần tử trong mảng.

Hàm tham số của `.filter()` nhận vào 1 tham số, đó là phần tự hiện tại của mảng mà việc lọc đang thực hiện.

* Lấy danh sách phụ nữ

  Để làm được việc này, chúng ta thực hiện như sau:
  ```javascript
  var women = people.filter(function(person) {
    // chỉ trả lại đối tượng có gender === 'f'
    return person.gender === 'f';
  });
  ```
  Nếu bạn sử dụng cú pháp ES6, với arrow function, ta sẽ có:
  ```javascript
  let women = peoples.filter((person) => person.gender === 'f');
  ```
  (Chúng ta không có từ khoá `return` vì khi sử dụng arrow function trên 1 dòng, thì Javascript mặc định trả lại giá trị của phần sau `=>`)
  
  **TIP** Bạn có thể sử dụng `console.table` thay vì `console.log` để in ra một mảng dạng bảng thay vì dạng object.
  
  Kết quả:
  
  ![](https://images.viblo.asia/c92058c4-22ea-4f8e-b7af-5139fb7d575f.png)
  
* Tìm những người phù hợp

  Chúng ta sẽ làm gì đó phức tạp hơn một chút với phương thức `.filter()`
  
  Bạn cần tìm những người phù hợp với yêu cầu: Nếu là người thuộc US thì tuổi phải lớn hơn hoặc bằng 20, nếu không tuổi chỉ cần lớn hơn hoặc bằng 18.
  
  Với điều kiện này, chúng ta cần một câu lệnh `if` để kiểm tra người nào đó có thuộc US hay không để trả lại theo điều kiện tương ứng:
  
  ```javascript
  var legal_people = people.filter((person) => {
    // Nếu người đó thuộc US thì "lấy" nếu người đó có tuổi >= 20
    // Nếu không thì "lấy" người có tuổi >= 18
    return person.us ? person.age >= 20 : person.age >= 18;
  });
  ```
  nếu bạn sử dụng `console.table(legal_people)`, bạn sẽ có:
  
  ![](https://images.viblo.asia/18a011ed-ef93-462d-afa9-e66aad7de9f6.png)
  
  Như trong 2 ví dụ nhỏ ở trên, phương thức `.filter()` thực sự rất tiện dụng để lọc một mảng.
  
## .map()

Chúng ta đã tạo ra một mảng `những người hợp pháp - legal_people`, nhưng sẽ tốt hơn nếu chúng ta thêm được một trường - `legal` vào những tất cả mọi object, giá trị của trường này sẽ là `true` hoặc `false`.

Kiểu chuyển đổi như vậy là là chức năng của phương thức `.map()` của Array, nó sẽ chạy một hàm cho tất cả các phần tử trong mảng và trả lại cho chúng ta một mảng mới.

Trong trường hợp của chúng ta, ở trên, chúng ta đã hoàn thành một nửa công việc - điều kiện lọc. Chúng ta sẽ viết nó thành một hàm như sau:
```javascript
var legalFunc = (person) => person.us ? person.age >= 20 : person.age >= 18;
```

Hàm này sẽ trả về  giá trị `true` hoặc `false` tùy thuộc vào object persion được truyền vào.

Chúng ta sẽ chuyển sang phương thức `.map()`, chúng ta sẽ gọi hàm `legalFunc` với mỗi phần tử mà phương thức `.map()` duyệt qua:

```javascript
var legalFunc = (person) => person.us ? person.age >= 20 : person.age >= 18;

var legalFieldIncluded = people.map((person) => {
    // thêm trường `legal` với giá trị tương ứng với điều kiện lọc trên từng person
    person.legal = legalFunc(person);

    // trả lại đối tượng person với trường `legal` đã được thêm vào
    return person;
});
```

Kết quả `console.table(legalFieldIncluded)` chúng ta sẽ có:

![](https://images.viblo.asia/29c75b43-fb7e-4c54-9760-7baac067b44d.png)

Chúng ta có thể thấy, tất cả các item trong mảng  có thêm một trường dữ liệu mới `legal`.

Ngoài việc thêm mới một trường cho dữ liệu, chúng ta có thể làm rất nhiều việc với phương thức `.map()`, ví dụ, tăng tuổi của tất cả mọi người lên 10 tuổi:

```javascript
var incAge = people.map((person) => {
    // set the age key equal it plus 10
    person.age = person.age + 10;
    return person;
});
```

**Chú ý**: Phương thức này trả lại một mảng và không làm biến đổi mảng gọi nó. 

**Khi bạn không return gì trong phương thức xử lý của .map(), mặc định giá trị undifined sẽ được trả về - Khác với jQuery.map**


-----



Ý kiến các nhân, `.map()` là phương thức tiện lợi nhất để biến đổi dữ liệu từ một mảng, để được giá trị mà chúng ta mong muốn, nó cho phép ta thêm hoặc xóa đi một trường trong các item và còn nhiều hơn thế nữa.

## .reduce()

Trong tất cả các ví dụ chúng ta đã thực hiện ở trên, tất cả kết quả chúng ta nhận lại đều là mảng, chúng ta có thể thay đổi cấu trúc của các phần tử trong mảng, nhưng cấu trúc thì vẫn thế - Array.

Đôi khi chúng ta cần thông tin từ một mảng, thông tin đó có thể là một mảng hoàn toàn khác, một đối tượng hay thậm chú thông tin đó là một số.

Giả sử chúng ta muốn có tổng của tuổi tất cả mọt người trong mảng, thật khó để làm được việc này với các phương thức đã được giới thiệu ở trên, kết quả chúng ta muốn nhận lại là một số không phải một mảng.

Đây là lúc mà phương thức `.reduce()` thể hiện "sức mạnh", nó sẽ trả lại kết quả với kiểu bất kỳ mà chúng ta mong muốn. Phương thức này nhận vào 2 tham số, tham số thứ nhất là một hàm - Hàm dùng để thực thi với từng phần tử (element) của mảng, nhận vào 04 tham số (bình thường chúng ta chỉ dùng 2 tham số), tham số thứ 2 là giá trị khởi tạo ban đầu, là cái mà chúng ta muốn bắt đầu, cấu trúc khởi đầu cơ bản của chúng ta(Nếu giá trị ban đầu này không được cung cấp, phần tử đầu tiên của mảng sẽ được dùng. Do đó, gọi reduce() trên một mảng rỗng và không có giá trị ban đầu sẽ gây ra lỗi.).

-----

Hàm tham số thứ nhất của phương thức `reduce` có tham số thứ nhất là biến lũy kế, truyền giá trị trả về của mỗi lần gọi; nó là giá trị lũy kế được trả về trong lần gọi trước, hoặc giá trị tham số `initialValue` - tham số thử 2 của phương thức `reduce`, nếu được cung cấp.

Trong trường hợp dưới đây, đó là số `0`

```javascript
// 2 tham số trong hàm là số 0 và đối tượng person chúng ta đang duyệt tới
var sumAge = people.reduce((starter, person) => {
    // return something to add to the starter
    // trả lại thứ gì đó ở đây, để bắt đầu xem xét phần tử tiếp theo.
    // Giá trị được trả lại sẽ là `starter` cho lần lặp tiếp theo.
}, 0);
```

Vì chúng ta muốn tổng số tuổi của tất cả mọi người trong mảng, do đó qua mỗi lẫn duyệt các phần tử ta sẽ cộng dồn tuổi của mỗi `person`, với giá trị khởi tạo là `0`

```javascript
var sumAge = people.reduce((starter, person) => {
    // công tuổi của person vào "biến tổng"
    // trả lại "biến tổng" cho lần xử lý tiếp theo
    return starter + person.age;
}, 0);

// biến sumAge sẽ có giá trị 109
```

Qua ví dụ đơn giản này, chúng ta thấy sức mạnh của phương thức `.reduce()`, chúng ta có một mảng và cuối cùng chúng ta có một số - 109.

Điều đó có nghĩa là là chúng ta có thể "bắt đầu" với bất kỳ kiểu dữ liệu nào, hãy cùng xem chúng ta sẽ làm thế nào để tạo ra được kết quả trong như thế này:
```json
{men: 3, woman: 2}
```

Trước tiên, nếu chúng ta muốn có một kết quả như trên, chúng ta cần có một đối tượng khởi tạo là một đối tượng gồm 2 khóa, gía trị khởi tạo của chúng là `0`. Qua mỗi lần lặp chúng ta sẽ xem xét trường `gender` của từng object để tăng giá trị của key tương ứng cho đúng.

```javascript
var resultObj = people.reduce((starter, person) => {
    // kiểm tra xem person có gender là m hay không, nếu đúng tăng giá trị cho khóa men 1 đơn vị
    // nếu không, tăng giá trị cvho khóa woman.
    person.gender === 'm' ? starter.men++ : starter.woman++;

    // trả lại starter sau khi đã được thay đổi
    return starter;
}, {men: 0, woman: 0}); // đối tượng khởi tạo của chúng ta
```

Khi bạn `console.log(resultObj)`, bạn sẽ nhận được `{men: 3, woman: 2}` đó là những gì chúng ta mong muốn.

Chú ý: Phương thức `.reduce()` trả lại dữ liệu cùng kiều với "giá trị khởi tạo" và không làm thay đổi giá trị của mảng gọi nó.


## Các phương thức quan trọng khác của Array
Trong khi bài viết mới chỉ giới thiệu `.filter()`, `.map()`, và `.reduce()`, ngoài ra còn khá nhiều hàm quan trọng khác:
* `.forEach()`: Duyệt qua từng phần tử của mảng
* `.find()`: Giống như `.filter()`, nhưng hàm này chỉ trả lại 1 phần tử
* `.push()`: Thêm 1 phần tử vào cuối mảng
* `.pop()`: Bỏ đi phần tử cuối cùng của mảng
* `.join()`: Nối tất cả các phần tử của mảng thành một string
* `.concat()`: Nối 2 hay nhiều mảng(hàm này sẽ trả lại một bản sao của mảng sau khi đã thực hiện nối, không làm thay đổi mảng gọi nó)


# Tổng kết
Trong Javascript có khá nhiều phương thức được cung cấp sẵn để xử lý mảng, trước khi nghĩ tới việc import một thư viện vào để xử lý một công việc nào đó liên quan tới mảng, hãy thử sử dụng những phương thức này.



-----
Tài liệu tham khảo: https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Array