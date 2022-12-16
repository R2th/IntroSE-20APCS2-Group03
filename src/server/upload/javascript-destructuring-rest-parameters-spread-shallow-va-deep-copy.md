Xin chào mọi người, hôm nay chúng ta sẽ tìm hiểu về các khái niệm rất hay dùng khi làm việc với javascript và những lưu ý khi sử dụng chúng để tránh những bugs không mong muốn trong quá trình làm việc.

# 1. Destructuring
Destructuring là kiểu khai báo cho phép ta khai báo và gán biến với các thuộc tính trong object hoặc phần tử trong array. Chúng rất hữu dụng giúp giảm thiểu số dòng code không cần thiết giúp code trở nên sáng sủa hơn. Có 2 loại destructuring đó là: **Object destructuring và Array destructuring**
## 1.1 Object Destructuring
Object destructuring cho phép tạo khởi tạo biến từ thông qua thuộc tính của object. Hãy xem xét ví dụ sau đây: <br>
``` javascript
    const note = {
          id: 1,
          title: 'My first note',
          date: '20/09/2020',
    }
```
Bình thường, nếu muốn lấy từ giá trị thuộc tính ta khởi tạo như sau: <br>
``` javascript
    const id = note.id
    const title = note.title
    const date = note.date
```
Với destructuring ta chỉ cần khai báo <br>
``` javascript
    const { id, title, date } = note;
    
    console.log(id); // 1
    console.log(title); // My first note
    console.log(date); // 20/09/2020
```
Có thể thấy code chỉ cần rút gọn lại trong 1 dòng. Một lưu ý nữa là các thuộc tính của object ban đầu sẽ được giữ nguyên hoàn toàn, mặc dù nếu có thay đổi các giá trị đã khai báo với destructuring. <br>
Mặc định thì nếu khai báo như trên thì tên của các biến khai báo sẽ trùng với tên các thuộc tính trong object. Nếu muốn thay đổi một tên khác ta sẽ phải khai báo như sau <br>
``` javascript
    const { id: noteId, title, date } = note; // khai báo tên mới sau dấu :
    
    console.log(nodeId); // 1
    console.log(title); // My first note
    console.log(date); // 20/09/2020
```
Hoàn toàn có thể dùng destructuring với nested object như sau <br>
``` javascript
const note = {
      id: 1,
      title: 'My first note',
      date: '20/09/2020',
      author: {
            firstName: 'Nguyen',
            lastName: 'A',
      },
}
```
Lấy thông tin của author trong object trên dùng destructuring <br>
``` javascript
const {
      id,
      title,
      date,
      author: { firstName, lastName },
} = note

console.log(firstName); // Nguyen
console.log(lastName); // A
```
Chú ý là mặc dù khai báo như trên nhưng ta không thể lấy được object **author** mà nếu muốn thì ta phải khai báo một biến riêng <br>
``` javascript
    const { author, author: { firstName, lastName } } = note;
    console.log(author); // { firstName: 'Nguyen', lastName: 'A' }
```
Destructuring còn có thể sử dụng để khai báo biến thông qua thuộc tính object của các kiểu **primitive**. Ví dụ **String** có thuộc tính là **length** . Ta có thể khai báo như sau <br>
``` javascript
    const { length } = 'string';
    console.log(length); // kết quả là 6
```
## 1.2 Array Destructuring
Tương tự với object, ta cũng có thể dùng destructuring với array như sau <br>
``` javascript
    const date = ['2020', '20', '09'];
    const [year, month, day] = date; // khác với object là khai báo trong dấu [] thay vì {}
    
    console.log(year, month, day); // 2020, 20, 09
```
Muốn skip một giá trị nào đó ta khai báo như sau <br>
``` javascript
    const [year, , day] = date;
```
Cũng hoàn toàn có thể dùng với nested array <br>
``` javascript
    const nestedArray = [1, 2, [3, 4], 5];
    const [one, two, [three, four], five] = nestedArray;
    console.log(one, two, three, four, five); // kết quả: 1, 2, 3, 4, 5
```
Destructuring cũng có thể áp dụng với parameter trong một function. Xem xét ví dụ sau <br>
``` javascript
    const note = {
          id: 1,
          title: 'My first note',
          date: '01/01/1970',
    }
    // Sử dụng destructuring với forEach
    Object.entries(note).forEach(([key, value]) => {
          console.log(`${key}: ${value}`)
    });
    // Một cách khác là dùng với vòng for...of
    for (let [key, value] of Object.entries(note)) {
          console.log(`${key}: ${value}`)
    }
```
Nếu muốn khai báo một giá trị default với destructuring ta dùng như sau: <br>
``` javascript
    const {
          title,
          date = new Date(),
          author: { firstName },
    } = note

    console.log(date); // giá trị gán default 
```
# 2. Spread
Spread là một syntax hữu ích nữa của javascript khi làm việc với arrays, object và function call. Spread cũng là một kiểu khai báo cho phép ta có thể dễ dàng tạo **shallow copy**. Ta sẽ tìm hiểu sâu hơn về shallow copy trong mục tiếp theo. <br>
## 2.1 Spread với Arrays
Hãy xem xét ví dụ sau <br>
``` javascript
    const array1 = [1, 2];
    const array2 = [3, 4];
```
Bình thường nếu muốn gộp chúng làm một array ta thường sử dụng hàm `concat()`:  `array1.concat(array2)` . Với spread ta có thể khai báo như sau <br>
``` javascript
    const combineArray = [...array1, ...array2];
    console.log(combineArray); // 1, 2, 3, 4
```
Nó rất hữu ích trong trường hợp immutability. Ví dụ <br>
``` javascript
    const users = [
          { id: 1, name: 'A' },
          { id: 2, name: 'B' },
    ]
    // trường hợp thêm mới một user
    
    const newUser = { id: 3, name: 'C' }
    users.push(newUser)
```
Nhưng nó làm thay đổi mảng users hiện tại. Trong trường hợp này có thể sử dụng spread <br>
``` javascript
    const updatedUsers = [...users, newUser]

    console.log(users); // không bị thay đổi
    console.log(updatedUsers);
```
Như ta đã biết khi tạo array trong javascript và gán cho một biến thì thực chất không tạo ra mảng mới mà chỉ là dùng biến để reference tới mảng dẫn đến việc khi thay đổi thì mảng ban đầu cũng bị thay đổi theo <br>
``` javascript
    const originalArray = [1, 2, 3];
    const secondArray = originalArray;
    secondArray.pop();
    console.log(originalArray); // mảng ban đầu bị thay đổi theo
```
Với spread sẽ cho phép ta tạo ra một bản '**shallow copy**' của array hoặc object <br>
``` javascript
    const secondArray = [...originalArray];
    secondArray.pop();
    console.log(originalArray); // không bị thay đổi mảng ban đầu
```
Spread còn có thể sử dụng để biến **Set** hoặc các **iterable** khác thành array <br>
``` javascript
    const set = new Set()
    set.add('1')
    set.add('2')
    set.add('3')
    const newSet = [...set];
```
## 2.2 Spread với Objects
Spread có thể sử dụng để copy và update object <br>
``` javascript
    const originalObject = { a: 1, b: 2 }
    const secondObject = { ...originalObject }

    console.log(secondObject)
```
Giống như array thì nó sẽ tạo ra bản shallow copy, với nested object thì vẫn ở dạng reference. Ví dụ <br>
``` javascript
    const myObj = { a: 1, b: 2 };
    const addObj = { c: 3, d: 4, e: { f: 5} };
    const newObj = { ...myObj, ...addObj };
    addObj.e.f = 888; // object nested sẽ ở dạng reference nên khi thay đổi thì newObj cũng bị thay đổi theo
    console.log(newObj); // kết quả { a: 1, b: 2, c: 3, d: 4, e: { f: 888 } }
```
Tuy nhiên, nếu muốn tạo ra `newObj` giống như trên mà ko sợ thay đổi bởi reference ta có thể làm như sau: <br>
``` javascript
    const myObj = { a: 1, b: 2 };
    const addObj = { c: 3, d: 4, e: { f: 5} };
    const newObj = { ...myObj, c: 3, d: 4, e: { newObj.e } };
    addObj.e.f = 999;
    console.log(newObj); //  kết quả { a: 1, b: 2, c: 3, d: 4, e: { f: 5 } } không bị thay đổi theo addObj
```
Một chú ý nữa là nếu spread object cùng với một object khác có trùng thuộc tính thì object mới này sẽ ghi đè nên object cũng đã có. Như ví dụ sau <br>
``` javascript
    const user = {
          id: 1,
          name: 'A',
          organization: {
                name: 'B',
                city: 'HaNoi',
          },
    }
    const updatedUser = { ...user, organization: { position: 'VietNam' } }
    console.log(updatedUser); // kết quả { id: 1, name: 'A', organization: { position: 'VietNam' } } thuộc tính organization đã bị ghi đè
```
## 2.3 Spread với Function
Có thể sử dụng spread với function như sau: <br>
``` javascript
    function addition(a, b, c) {
          return a + b + c;
    }
    
    const numbers = [1, 2, 3];
    multiply(...numbers); // kết quả = 6
```
Ngoài ra cũng có thể sử dụng với apply `addition.apply(null, [1, 2, 3])`
# 3. Rest Parameters
Tiếp theo ta sẽ tìm hiểu với rest parameters, cú pháp thì viết giống với spread cũng là dấu 3 chấm (...) nhưng công dụng thì ngược lại, rest parameter sẽ tạo ra một array các phần tử. Hãy xem ví dụ sau <br>
``` javascript
    function restTest(...args) {
          console.log(args)
    }

    restTest(1, 2, 3, 4, 5, 6) // kết quả [1, 2, 3, 4, 5, 6]
```
Rest parameter có thể được sử dụng là một parameter hoặc là một parameter ở cuối. Nếu trường hợp là một parameter thì nó sẽ gộp tất cả các arguments, nếu là cuối danh sách thì nó sẽ gộp các arguments còn lại <br>
``` javascript
    function restTest(one, two, ...rest) {
          console.log(one)
          console.log(two)
          console.log(rest)
    }

    restTest(1, 2, 3, 4, 5, 6);
    // kết quả là 
    1
    2
    [3, 4, 5, 6]
```
Với các code cũ ở phiên bản ES trước, có thể thực hiện điều trên với `arguments`
``` javascript
    function restTest() {
          console.log(arguments)
    }

    testArguments(1, 2, 3, 4, 5, 6); // [1, 2, 3, 4, 5, 6]
```
Tuy nhiên, nếu dùng với arguments sẽ có một số bất lợi. Nó không thể sử dụng với arrow function
``` javascript
       const restTest = () => {
           console.log(arguments);
       }
       testArguments(1, 2, 3, 4, 5, 6);  // sẽ báo lỗi arguments is not defined
```
Thêm nữa, arguments cũng không phải là một array nên không thể sử dụng các hàm của array như map, filter, ... mà phải chuyển nó thành dạng array trước. Rest cũng có thể sử dụng với array <br>
``` javascript
    const [one, ...rest] = [1, 2, 3]

    console.log(one); // 1
    console.log(rest); // [2, 3]
```
Rest cũng có thể áp dụng với destructuring <br>
``` javascript
     const { name, ...rest } = { id: 1, name: 'Nguyen A', age: 30 }

    console.log(name); // Nguyen A
    console.log(rest); // { id: 1, age: 30 }
```
**Lưu ý:** chỉ sử dụng rest parameter ở vị trí cuối cùng, nếu đặt ở vị trí khác sẽ báo lỗi. <br>
# 4. Shallow và deep copy
Phần này chúng ta sẽ tìm hiểu kĩ hơn về shallow và deep copy để tránh những bugs không mong muốn trong quá trình làm việc với javascript. <br> 
**Shallow copy** (tạm dịch là sao chép nông): có thể hiểu đơn giản là copy thành một object mới nhưng object này vẫn còn liên quan đến object cũ, tức là một số trường hợp nếu thay đổi object cũ thì object mới cũng bị thay đổi theo<br>
**Deep copy** (sao chép sâu): hiểu đơn giản là copy một thành object mới mà object này không có liên quan gì đến object cũ. <br>
## 4.1 Shallow copy
### Shallow copy dùng với spread
Trong trường hợp object hoặc array không phức tạp ở dạng nested có thể sử dụng spread để copy một object như sau <br>
``` javascript
    const obj = { a: 1, b: 2, c: 3 };
    const clone = { ...obj };
    console.log(clone); 
```
Nếu object ở dạng nested nếu dùng cách này sẽ gây ra hiện tượng như sau <br>
``` javascript
    const obj = { a: 1, b: 2, c: { d: 3 } };
    const clone = { ...obj };
    obj.c.d = 5; thay đổi giá trị ở obj
    console.log(clone); // kết quả là clone object cũng bị thay đổi theo
```
### Shallow copy dùng với Object.assign
Có thể copy một object sử dụng Object.assign. Tìm hiểu thêm về Object.assign tại [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
``` javascript
    const obj = { a: 1, b: 2, c: 3};
    const clone = Object.assign( {}, obj );
    console.log(clone); // { a: 1, b: 2, c: 3 };
```
Trường hợp copy như thế này vẫn sẽ xảy ra hiện tượng với nested object như trong ví dụ khi dùng với spread.
## 4.2 Deep copy
Chính vì có hiện tượng như ở trên nên trong nhiều trường hợp cần phải deep copy để tạo ra object mới, tránh gây ra lỗi không mong muốn. <br>
### Sử dụng JSON.parse() và JSON.stringify()
``` javascript
    const obj = { a: 1, b: 2, c: { d: 3 } };
    const clone = JSON.parse(JSON.stringify(obj));
    obj.c.d = 5;
    console.log(clone); // {a: 1, b: 2, c: { d: 3 } }; // không bị phụ thuộc vào object cũ
```
Tuy nhiên, cách này vẫn sẽ tồn tại một nhược điểm, hãy xem xét ví dụ sau <br>
``` javascript
     console.log(JSON.parse(
          JSON.stringify({
                a: new Date(),
                b: NaN,
                c: new Function(),
                d: undefined,
                e: function() {},
                f: Number,
                g: false,
                h: Infinity
          })
    ))
       // Kết quả là một số thuộc tính sẽ bị mất đi hoặc thành null như NAN, undefined, function, Infinity
       { a: "2020-09-20T15:48:39.335Z", b: null, g: false, h: null }
```
### Sử dụng các thư viện
Chính vì có những nhược điểm trên nên khi muốn deep copy object một cách an toàn ta có thể sử dụng các thư viện như Lodash, rfdc... <br>
``` javascript
    const cloneDeep = require('lodash/clonedeep');
    const addObj = {
          e: 6
    };

    const originalObject = {
          a: 1,
          b: '2',
          c: 3,
          d: addObj
    };
    const deepClonedObject = clonedeep(originalObject);
    addObj.e = 9999;
    
    console.log(deepClonedObject); // không bị thay đổi theo
```
Với rfdc, tham khảo thêm doc tại [đây](https://github.com/davidmarkclements/rfdc)
``` javascript
    const clone = require('rfdc')() // Returns the deep copy function
    clone({ a: 1, b: { c: 2 } }) // { a: 1, b: { c: 2 } }
```

Như vậy bài viết đã tìm hiểu các khái niệm rất hay dùng khi làm việc với javascript cùng với những lưu ý để tránh gặp bugs không mong muốn. Hi vọng bài viết giúp ích cho mọi người. See you!
# Reference
https://www.digitalocean.com/community/tutorials/js-deep-cloning-javascript-objects <br>
https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089 <br>
https://www.taniarascia.com/understanding-destructuring-rest-spread/ <br>
https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/