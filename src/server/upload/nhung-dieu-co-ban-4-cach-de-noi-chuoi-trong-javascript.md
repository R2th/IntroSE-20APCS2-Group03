Hello anh em , trong quá trình làm việc với chuỗi String, đã bao giờ mọi người gặp đến các trường hợp phải nối chuỗi ( combine string ) chưa nhỉ ? Khi đến trường hợp đó, anh em sẽ làm như thế nào, hầu hết là sẽ google search hoặc sẽ làm theo cách mà mình nhớ nhất ( mình cũng vậy he he :laughing::laughing::laughing:)
Vì vây , hôm nay mình tiếp tục ngoi lên và chia sẻ với anh em cách để combine string nhé. Here we gooo : 

![](https://images.viblo.asia/a3d4d9db-f148-4e6b-a6b2-73201caaa61d.png)

# Template Strings :
Template string là cách mà mình ưa thích sử dụng nhất trong 4 cách. Tại sao ??? bới vì khi sử dụng cách này, mình không cần phải quan tâm đến dấu ngoặc kép , khoảng trống giữa các kí tự hay là các dấu toán tử lộn xộn.

```js
const name = 'Ky';
const country = 'Viet Nam';
```
Và đây là output mà mình muốn :
```
Hi every one, I'm Ky and I'm from Viet Nam !!!
```

### Vấn đề :
Trước khi có template string , muốn in ra dòng trên thì mình chắn chắn sẽ làm như sau :
```js
"Hi every one, I'm " + name + " and I'm from " + country + ' !!!"
```
Giờ thử tưởng tượng xem , chỉ cần thiếu một dấu cách hay một dấu ' " '  thôi thì không biết cuộc đời sẽ đi về đâu :joy::joy::joy:
### Giải quyết nào :
Với việc template string ra đời thì vấn đề đã được giải quyết rất đơn giản như sau :
```js
`Hi every one, I'm ${name} and I'm from ${country} !!!`
```
Đó vậy thôi, rất easy đúng ko. Việc cần làm bây giờ của anh em chỉ là check xem đã đúng spec chưa và có sai ngữ pháp nữa không thôi :100:.
# Join :
join() method nối các phần tử của một mảng và trả về một chuỗi. Bởi vì hoạt động với mảng, nên join() rất tiện dụng nếu muốn thêm các chuỗi bổ sung.

```js
const one = 'one';
const two = 'two';
const three = 'three';
const four = 'four';

const testArray = ['Power Ranger ', one, two, three, four];

const five = 'five';

testArray.push(five);

testArray.join(' ');

// Và đây là kết quả 

"Power Ranger one two three four five"

```
Và việc tiện lợi nhất khi sử dung `join()` là anh em có thể tùy chỉnh dấu phân cách giữa các kí tự trong mảng :

```js
const array = ['Power Ranger '];
const arrayCombine = [one, two, three, four].join(', '); 
array.push(arrayCombine);
array.join('');

// Kết quả là :
Power Ranger one, two, three, four
```
# Concat : 
Với `concat()` ta có thể combine string bằng cách sử dụng chuỗi và gọi phương thức :
```js
const one = 'one';
const two = 'two';
const three = 'three';

'Let's get it '.concat(one, ', ', two, ', ', three);

// Vậy kết quả sẽ là :
Let's get it one, two, three
```

Ngoài ra, anh em cũng có thể sử dụng `concat()` để nối một chuỗi với một array. Khi truyền vào concat() một array thì nó sẽ tự động convert các items trong mảng và ngăn cách với nhau bằng dấu phẩy :

```js
// mình vẫn sửa dụng các biến đã khai báo ở trên nhé
const arrTest = [one, two, three];

'Let's get it '.concat(arrTest);

//Nó sẽ ra như sau:
Let's get it one,two,three
```
Nếu muốn có dấu cách giữa các items trong arry thì anh em có thể dùng `join()` như sau :

```js
const arrTest = [one, two, three].join(' ');

'Let's get it '.concat(arrTest);

// Và kết quả sẽ là :
Let's get it one, two, three
```
# Sử dụng dấu (+) :
Đây là cách mà mình hay sử dụng hồi còn đi học nhất, không biết anh em có như vậy không. Cách này thì luôn luôn phải chú ý đến các dấu cách: 

```js
const one = 'hello';
const two = 'hi';
const three = 'xin chao';

const newString = 'Say some thing : ' + one + two + three;
```

Ngoài ra thì chúng ta cũng hay sử dụng ```( += )``` :
```js
let currentString = 'Say something : ';

currentString += one + ', ' + two + ', ' + three;

//Say something : one, two, three
```
# Một số trường hợp đặc biệt :

Khi tạo một chuỗi mà có cả nháy đơn và nháy kép. Nếu trong chuỗi mà có sử dụng ```'``` thì chúng ta có thể làm như sau : 
```js
const happy = 🙂;
// Dùng join() nè:
["I'm ", happy].join(' ');
// Dùng concat() nè: 
''.concat("I'm ", happy);
"I'm " + happy;
// Và kết quả là :
// I'm 🙂
```
Ngoài ra thì có thể sử dụng kí tự ```\``` để chia dấu, nhưng mình khuyên mọi người không nên làm vậy bởi rất khó nhìn và cũng như là rất khó đọc :
```js
const happy = 🙂;
//Đó nhìn cái thấy confuse luôn =)))
['I\'m ', happy].join(' ');
''.concat('I\'m ', happy);
'I\'m ' + happy;
// Kết quả đây
// I'm 🙂
```
Nếu trong chuỗi mà có sử dụng ```"``` thì sao ? Chúng ta cũng làm tương tự thôi :
```js
const code = 'VN';
['Việt Nam "', flag, '"'].join(' ');
''.concat('Việt Nam "', code, '"');
'Việt Nam "' + code + '"';
// Nó sẽ ra như sau: 
// Việt Nam "VN"
```
Cuối cùng trong chuỗi mà có dấu ` thì sẽ làm như sau :
```js
`Use backtick \`\` to create a string`;
// Kết quả là :))
// Use backtick `` to create a string
```
# Vậy đâu là cách tốt nhất để sử dụng :
Theo cá nhân mình bình chọn thì cách tốt nhất vẫn là ```Template Strings```, vì nó khá dễ viết và không cần phải quan tâm để cách kí tự khác, chỉ cần viết đúng những gì bạn nhìn được :laughing:. Nhưng tại sao chúng ta lại cần phải biết thêm các cách khác? Là một developer , đôi lúc chúng ta cần phát triển đoạn code theo nhiều hướng, và làm sao cho hướng đó là hướng nhanh và tiện lợi nhất cho người dùng, vì vậy hãy sử dụng những cách nào mà anh em cảm thấy là ngắn và tốt nhất cho mình.
# P/s : Các method được hỗ trợ trên các trình duyệt nào : 
![](https://images.viblo.asia/c70ba7ab-3dd5-4a0f-8e69-4826f202c810.png)
 Dưới đây cũng lại là những chia sẻ của mình :+1::+1::+1:. Theo anh em, thì đâu là cách mà anh em hay sử dụng và đâu là cách tốt nhất, hay like, share và upvote cho mình nếu thấy hay nhé :100::100::100: