Trong ES6 có giới thiệu một cách thức mới cho phép chúng ta duyệt qua bất kỳ một collection nào trong Javascript là  sử dụng Iterators. Từ khi xuất hiện thì chúng đã trở nên khá thông dụng do tính tiện lợi của nó.

Trong bài viết thì mình sẽ đi từ việc trình bày cho các bạn (và mình :p) hiểu rõ về khái niệm Iterators cho đến việc chúng ta sẽ dùng nó trong những trường hợp thế nào thông qua ví dụ. Hi vọng chúng ta có thể cùng nhau đi đến cuối con đường =)).

## Giới thiệu

Hãy thử tưởng tượng các bạn có một mảng sau:

```javascript
const myFavouriteAuthors = [
  'Neal Stephenson',
  'Arthur Clarke',
  'Isaac Asimov', 
  'Robert Heinlein'
];
```

Công việc yêu cầu các bạn là cần phải lấy cụ thể từng phần tử trong mảng để thực hiện một action nào đó. Nếu ai đó hỏi các bạn định lấy từng phần tử như nào thì chắc chẳng cần nghĩ các bạn cũng có thể nói luôn là tao sẽ dùng `for`, `while` , `for-of` hoặc cái gì đó trong [này](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) để làm việc đấy.

![Rất nhiều cách cho phép chúng ta duyệt mảng](https://images.viblo.asia/629e02f1-31ed-451c-a6f5-df40e43b8f4e.png)

Bây giờ hãy thử tưởng tượng các bạn có một cấu trúc dữ liệu liệu như sau:

![Custom data structure](https://images.viblo.asia/8e0fe678-9d29-4498-a665-3bac0fae1c83.png)

chúng ta có `myFavouriteAuthors` là một object chứa một object khác là `allAuthors`. Trong `allAuthors` lại có 3 mảng với các key lần lượt là `fiction`, `scienceFiction` và `fantasy`. Và bây giờ nếu công việc yêu cầu các bạn phải duyệt `myFavouriteAuthors`  để có thể lấy hết tất cả tên các author thì các bạn sẽ làm như nào? Đa phần mọi người chắc sẽ lần lượt cho duyệt qua từng mảng con.

Ngồi gõ 3 cái vòng lặp chắc ai cũng thấy chán và hơi mệt :v. Lúc đó chắc mọi người chỉ ước ao giá như có thể làm như này:

```javascript
for (let author of myFavouriteAuthors) { 
  console.log(author)
}
```

Và tất nhiên là đoạn code trên không chạy được, chúng ta sẽ gặp ngay lỗi `TypeError: {} is not iterable` nếu thử :v. Bây giờ chúng ta hãy cùng xem xem `iterable` là gì và làm thế nào mà chúng ta có thể làm cho object của chúng ta iterable được nhé.

## Iterable và Iterator

Chúng ta quay lại với object `myFavouriteAuthors` nhé. Mong muốn của chúng ta lúc này là có một cách thức nào đấy cho phép chúng ta lấy ra tên của tất cả các author bên trong nó một cách tuần tự.

Và đây là cách mà chắc đa phần mọi người sẽ làm:

 ![Naive method](https://images.viblo.asia/73f2dcc9-4a19-49de-b530-8c8c018a0b01.png)

Nhiều bạn chắc sẽ có ý nghĩ "Tao là người đơn giản, thấy cách đơn giản nhưng giải quyết được vấn đề thì tao làm :<". Nói thật là mình cũng thế chứ :v. Tuy nhiên thì có một số vấn đề nổi cộm nếu chúng ta dùng cách này, một trong số chúng là:

- Cái tên `getAllAuthors` nó rất cụ thể. Giả sử nếu ai đó cũng tạo cho riêng họ một `myFavouriteAuthors` nhưng thay vì sử dụng cái tên `getAllAuthors` cho tên method thì họ lại có thể dùng tên khác như `retrieveAllAuthors`

- Chúng ta, với tư cách là lập trình viên, luôn cần được biệt cụ thể tên methodsẽ trả về toàn bộ dữ liệu. Ở đây là `getAllAuthors`

- `getAllAuthors` trả về một mảng string. Sẽ ra sao nếu một ông dev nào đó trả về một mảng các object có format như sau:

  ```javascript
  [ {name: 'Agatha Christie'}, {name: 'J. K. Rowling'}, ... ]
  ```

Trong trường hợp này chúng ta sẽ phải biết chính xác tên và kiểu dữ liệu trả về của method

Để giải quyết các vấn đề trên sao chúng ta không đưa ra một luật lệ là tên của method của dữ liệu và kiểu dữ liệu trả về của chúng sẽ luôn cố định và bất biến?

Chúng ta sẽ đặt tên cho method này là ```iteratorMethod```.

Thực chất thì cách tương tự cũng đã được [ECMA](https://en.wikipedia.org/wiki/Ecma_International) thực hiện nhằm mục đích chuẩn hóa quá trình duyệt qua một custom object. Tuy nhiên thì thay vì dùng tên method là `iteratorMethod` thì họ lại dùng tên `Symbol.iterator`. [Symbol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol) cung cấp cho chúng ta những cái tên unique và không thể xung đột với tên của các property khác. Ngoài ra thì `Symbol.iterator` sẽ trả về một object gọi là `iterator`. `iterator` này sẽ có một method tên là `next` trả một object với các key là `value` và `done`.

Key `value` sẽ chứa giá trị hiện tại. Nó có thể là giá trị của bất cứ kiểu dữ liệu nào. Key `done` chứa kiểu dữ liệu boolean, nó biểu thị việc liệu tất cả các giá trị đã được lấy ra hay chưa.

Sơ đồ sau sẽ giúp cho các bạn hiểu rõ mối quan hệ giữa *iterables*, *iterators* và *next*. Mối quan hệ này được gọi là *Iteration Protocol*:

![Iteration Protocol](https://images.viblo.asia/c7825088-79b2-4278-b378-8f18bcd26c94.png)

Trong cuốn sách [Exploring JS](http://exploringjs.com/es6/ch_iteration.html) viết bởi [[Axel Rauschmayer](https://medium.com/@rauschma)](https://medium.com/@rauschma) có viết:

- Một ***iterable*** là một cấu trúc dữ liệu có khả năng "phơi bày" tất cả các element bên trong nó ra ngoài. Để làm được điều này thì nó implement một method gọi là `Symbol.iterator`. Method này về bản chất nó là một factory method: nó có nhiệm vụ tạo ra các ***iterators***.
- Một ***iterator*** là một con trỏ có mục đích duyệt qua tất cả các element của một cấu trúc dữ liệu.

## Làm cho một object trở nên iterable

Như đã nói ở phần trước thì nhiệm vụ của chúng ta sẽ là implement một method được gọi là `Symbol.iterator`. Chúng ta sẽ sử dụng cú pháp [computed property](https://medium.com/@rauschma) để đặt tên cho key củ nó. Sau đây là một ví dụ ngắn để mô tả nó:

![Ví dụ ngắn về Iterator](https://images.viblo.asia/e67a3a37-95ef-47a1-9b91-9f56e50194fc.png)

Ở dòng thứ 4 thì chúng ta đang tạo một iterator. Nó là một object với phương thức `next` được định nghĩa. Hàm `next` trả về một giá trị tương ứng với biến `step`. Ở dòng 25 thì chúng ta đang thực hiện việc lấy ra iterator. Dòng 27 chúng ta đang gọi `next`. Các dòng sau thì chúng ta đang thực hiện việc gọi next cho đến đến khi `done` trở thành `true`.

Thực tế thì đây cũng chính là cách mà `for-of` hoạt động. Vong lặp `for-of` sẽ nhận vào một *`iterable`* và tạo ra một ***iterator***. Nó sẽ tiếp tục duy trì việc gọi `next()` cho đến khi `done` thành `true`.

## Iterable trong Javascript

Có rất nhiều thứ là iterable trong JavaScript mà có thể bạn không biết, ví dụ như:

- Arrays và TypedArrays
- String - Duyệt qua các ký tự
- Map - Duyệt qua các cặp key-value
- Set - Duyệt qua các phần tử
- `argument` - Nó giống như là một mảng của các biến đặc biệt của method.
- Các phần tử DOM

Một số construct trong JS sử dụng iterables là

- Vòng lặp `for-of` - yêu cầu truyền vào một iterable. Nếu không thì nó sẽ throw một `TypeError`:

  ```javascript
  for (const value of iterable) { ... }

  ```

- Destruct mảng - Việc destruct cũng phụ thuộc vào iterables. Hãy cùng xem tại sao qua 2 đoạn code sau nhé

  Đoạn này:

  ```javascript
  const array = ['a', 'b', 'c', 'd', 'e'];
  const [first, ,third, ,last] = array;
  ```

  tương đương với đoạn này:

  ```javascript
  const array = ['a', 'b', 'c', 'd', 'e'];
  const iterator = array[Symbol.iterator]();
  const first = iterator.next().value
  iterator.next().value // bỏ qua giá trị hiện đang được trỏ tới của mảng
  const third = iterator.next().value
  iterator.next().value // bỏ qua giá trị hiện đang được trỏ tới của mảng
  const last = iterator.next().value
  ```

- Toán tử spead

  Đoạn code này:

  ```javascript
  const array = ['a', 'b', 'c', 'd', 'e'];
  const newArray = [1, ...array, 2, 3];
  ```

  có thể được viết thành:

  ```javascript
  const array = ['a', 'b', 'c', 'd', 'e'];
  const iterator = array[Symbol.iterator]();
  const newArray = [1];
  for (let nextValue = iterator.next(); nextValue.done !== true; nextValue = iterator.next()) {
    newArray.push(nextValue.value);
  }
  newArray.push(2)
  newArray.push(3)
  ```

- Map và Set

  Hàm khởi tạo của Map biến đổi một iterable trên cặp `[key, value]` thành Map và hàm khởi tạo của Set biến đổi một iterable trên element thành Set

  ```javascript
  const map = new Map([[1, 'one'], [2, 'two']]);
  map.get(1) 
  // one
  const set = new Set(['a', 'b', 'c]);
  set.has('c');
  // true
  ```

  ​

- Hiểu về Iterator là điều kiện tiên quyết để hiểu về hàm generator.

## Làm cho myFavouriteAuthors có thể iterable được

Đây là đoạn code implement để biến đổi `myFavouriteAuthors`thành một iterable:

```javascript
const myFavouriteAuthors = {
  allAuthors: {
    fiction: [
      'Agatha Christie', 
      'J. K. Rowling',
      'Dr. Seuss'
    ],
    scienceFiction: [
      'Neal Stephenson',
      'Arthur Clarke',
      'Isaac Asimov', 
      'Robert Heinlein'
    ],
    fantasy: [
      'J. R. R. Tolkien',
      'J. K. Rowling',
      'Terry Pratchett'
    ],
  },
  [Symbol.iterator]() {
    // Lấy ra tất cả các author được phân loại thành genre dưới dạng mảng 2 chiều
    const genres = Object.values(this.allAuthors);
    
    // Khởi tạo index cho con trỏ của author và genre
    let currentAuthorIndex = 0;
    let currentGenreIndex = 0;
    
    return {
      // Implementation của hàm next()
      next() {
        // authors trong genres đang xét
        const authors = genres[currentGenreIndex];
        
        // doNotHaveMoreAuthors sẽ là true nếu author đang xét là phần tử cuối cùng của genre đang xét. Tức là chúng ta đã hoàn thành việc duyệt tất cả author trong genre đó.
        const doNothaveMoreAuthors = !(currentAuthorIndex < authors.length);
        if (doNothaveMoreAuthors) {
          // Khi chuyện đó xảy ra thì chúng ta sẽ chuyển sang genre kế tiếp
          currentGenreIndex++;
          // Reset index của author về 0 để bắt đầu duyệt trong genre mới
          currentAuthorIndex = 0;
        }
        
        // Khi tất cả các genre đã được duyệt xong thì chúng ta cần nói cho iterator biết là chúng ta không thể cho nó thêm giá trị nào được nữa
        const doNotHaveMoreGenres = !(currentGenreIndex < genres.length);
        if (doNotHaveMoreGenres) {
          // Vì vậy chúng ta sẽ trả về done là true
          return {
            value: undefined,
            done: true
          };
        }
        //Nếu mọi thứ chạy đúng thì chúng ta sẽ trả về author của genre hiện tại và tăng currentAuthorIndex để trong lần tới trả về author kế tiếp.
        return {
          value: genres[currentGenreIndex][currentAuthorIndex++],
          done: false
        }
      }
    };
  }
};

for (const author of myFavouriteAuthors) {
  console.log(author);
}

console.log(...myFavouriteAuthors)
```

Đọc đến đây thì chắc hẳn các bạn đã biết iterator hoạt động thế nào rồi nhỉ :D. Hi vọng được các bạn đón đọc trong các bài tiếp theo.

Happy coding~

Nguồn: https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e