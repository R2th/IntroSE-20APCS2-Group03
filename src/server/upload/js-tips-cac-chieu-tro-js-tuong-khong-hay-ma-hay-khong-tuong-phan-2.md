Xin chào các bạn,

Sau một thời gian vắng bóng, hôm nay mình lại tiếp tục quay trở lại vào một ngày đông lạnh giá. Và để tiếp tục series Javascript tips, ngày hôm nay mình xin tiếp tục phần 2 của series này. Nếu các bạn chưa đọc phần 1 thì mình khuyên là nên đọc ngay nhé, biết đâu các bạn lại có hứng đọc các phần tiếp theo thì sao: 

[[JS tips series] Các "chiêu trò" JS tưởng không hay mà hay không tưởng](https://viblo.asia/s/cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-DVK2jDyjKLj)

<br>

Nào, tiếp tục học hỏi các tips để dần dần chúng ta có thể "kiểm soát" JS một các tốt nhất nhé. Bắt đầu thôi!

![](https://images.viblo.asia/4602c52f-93de-45d1-acdf-0571799529f8.jpg)

<h2>1. Loại bỏ các phần tử trùng nhau trong mảng</h2>
Hãy khởi động với một vấn đề khá là quen thuộc nhé. Nhìn ngay tới tiêu đề sẽ có nhiều bạn thở dài và than rằng: <em>"Trời, cái này quá quen rồi má, trên mạng có cả tá thủ thuật để làm cái trò này luôn rồi!"</em>. Yes, that is. Mình không phủ nhận điều đó. Các bạn có thể Google ngay và cho ra cả đống kết quả cho việc này. 
<br>
<br>

Nhưng hôm này mình mong muốn mang tới cho các bạn một cái nhìn rõ ràng hơn về việc deduplicate array trong JS.

<h3>1.1 Với mảng chứa các phần tử có kiểu primitives</h3>

Vâng, đây là điều mà phần lớn các bạn đều biết.  Và hiển nhiên là <em>"có cả tá cách"</em> như các bạn đã nói. Nhưng tựu chung lại có 2 cách phổ biến nhất sau đây:

- Dùng Set collection:

Phải công nhận rằng đây chính là cách đơn giản và dễ nhớ nhất. Chúng ta tận dụng đặc điểm của Set đó là nó sẽ không chứa phần tử trùng lặp trong nó, có bỏ thêm phần tử trùng vào nó cũng chẳng nhận thêm đâu (tất nhiên là kiểu primitives nhé, chứ Object thì lại khác đấy, chúng ta sẽ bàn phần này ngay bên dưới nên các bạn chớ nóng lòng). Vì vậy, ta sẽ làm thế này:

```javascript
var dedupedArr = Array.from( new Set([ 1, 1, 'a', 'a', 'b', '1', 'b' ]) );
console.log(dedupedArr); // [ 1, 'a', 'b', '1' ]
```

- Dùng vòng lặp:

Trong cách này, bạn có thể tùy ý sử dụng ```filter```, hoặc ```reduce```, hoặc ```forEach``` thông thường, vân vân và mây mây để loại bỏ phần tử trùng nhau theo ý muốn của bạn. Nói chung là bạn phải duyệt mảng để thực thi hành động loại phần tử trùng.

```javascript
// Use filter
var deduped = [ 1, 1, 'a', 'a', 'b', '1', 'b' ].filter(function (el, i, arr) {
	return arr.indexOf(el) === i;
});
console.log(deduped); // [ 1, 'a', 'b', '1' ]

// ------------------------------

// Use forEach
const names = ['John', 'Paul', 'George', 'Ringo', 'John'];
function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}
removeDups(names); // // 'John', 'Paul', 'George', 'Ringo'

// ------------------------------

// bla bla bla
```

<h3>1.2 Với mảng chứa các phần tử có kiểu object</h3>
Thế còn với mảng có chứa Object thì sao? Liệu rằng chúng ta có để đơn giản loại bỏ trùng lặp như những cách trên được không? Tất nhiên là không sau khi chúng ta nhìn kĩ vài dòng code nhỏ này:

```javascript
1 === 1 // true
'a' === 'a' // true
{ a: 1 } === { a: 1 } // false
```

Ố ồ? Chuyện gì đang xảy ra thế? Cũng đơn giản với những ai học JS phải không nào. Khi chúng ta có 2 object tách biệt dù cho tất cả bên trong chúng giống nhau y hệt như nào đi nữa thì chúng vẫn là 2 object khác nhau do khác địa chỉ vùng nhớ.

Vậy thì giải pháp ở đây sẽ khá "loằng ngoằng" và phức tạp hơn chúng ta tưởng đó.
```javascript
function dedup(arr) {
	var hashTable = {};
	return arr.filter(function (el) {
		var key = JSON.stringify(el);
		var match = Boolean(hashTable[key]);
		return (match ? false : hashTable[key] = true);
	});
}
var deduped = dedup([
	{ a: 1 },
	{ a: 1 },
	[ 1, 2 ],
	[ 1, 2 ]
]);
console.log(deduped); // [ {a: 1}, [1, 2] ]
```

Wow? Chuyện gì vừa diễn ra thế? Để mình giải thích một chút nhé.

Hãy xét tới object ```hashTable```, chúng ta sẽ sử dụng nó để phân biệt được đối tượng trong mảng có phải là trùng lặp hay không. Nhưng vì nó cũng chỉ là 1 object bình thường như bao object khác, điều đó cũng đồng nghĩa với nó không thể phân biệt được một chuỗi và một số khi chúng có cùng giá trị.

```javascript
var hashTable = {};
hashTable[1] = true;
hashTable['1'] = true;
console.log(hashTable); // { '1': true }
```
Ô thế thì làm sao mà sử dụng ```hashTable``` để phân biệt các đối tượng trùng lặp được? Bình tĩnh lại và hãy chú ý tới ```stringify```. Chính nó đã làm được điều đó khi kết hợp với ```hashTable``` đó.

```javascript
var hashTable = {};
hashTable[JSON.stringify(1)] = true;
hashTable[JSON.stringify('1')] = true;
console.log(hashTable); // { '1': true, '\'1\'': true }
```

Câu chuyện bây giờ lại trở nên dễ hiểu rồi phải không nào. See, việc loại bỏ phần tử trùng nhau ra khỏi mảng là một vấn đề cũ nhưng không hề đơn giản đâu nhé!

<h2>2. Liệu có nên sử dụng Object.is() khi so sánh tuyệt đối</h2>

JS là một ngôn ngữ lỏng lẻo, nó lỏng lẻo ở rất nhiều chỗ, mà chính những chỗ này đôi khi lại gây ra những phút giây khá khó chịu cho người sử dụng. Điển hình là phép so sánh trong JS, chính là ```==``` (type–converting comparisons) và ```===``` (strict comparison). 

Tuyệt vời ở chỗ:

```javascript
0 == ' ' //true
0 === ' ' // false
null == undefined //true
[1] == true //true
```

Nhưng lại khó chịu rằng:
```javascript
NaN === NaN //false
```

Nên các ông chuyên gia đã nghĩ ra ```Object.is()``` từ phiên bản ES6 để giải quyết một số tình trạng hơi <em>dở hơi</em> của phép so sánh tuyệt đối  ```===```. Bản chất của ```Object.is()``` cũng giống như ```===``` thôi, nhưng nó hoạt động khá tốt ở một số trường hợp đặc biệt mà ```===``` không làm được.

```javascript
Object.is(0 , ' '); //false
Object.is(null, undefined); //false
Object.is([1], true); //false
Object.is(NaN, NaN); //true
```

Nhóm Mozilla không nghĩ rằng ```Object.is()``` là phép so sánh nghiêm ngặt hơn so với ```===```, họ nói rằng chúng ta chỉ nên xem cách phương thức này khi sử dụng với ```NaN```, ``` -0``` và ```+0```. Nhưng mà mình thấy nó khá là hữu ích đấy chứ!

![](https://images.viblo.asia/5e9878cf-1152-4704-a1d8-78459a5b23b9.png)


<h2>3. Chèn phần tử vào mảng</h2>

<em>"Lại là một cái cũ rích"</em> .


Đừng khẳng định vội khi mà chưa đọc nhé, khá hữu dụng đấy, tin mình đi! Dù cho công việc chèn phần tử vào mảng là công việc hàng ngày của JS dev, nhưng mà ở đây chúng ta hãy đi sâu một chút về hiệu năng nhé!

<h3>3.1 Chèn phần tử vào cuối mảng</h3>

Chẳng lạ lẫm hay khó khăn gì với các phương thức mà mình liệt kê sau đây:
```javascript
var arr = [1,2,3,4,5];
var arr2 = [];

arr.push(6);            // #1
arr[arr.length] = 6;    // #2
arr2 = arr.concat([6]); // #3
```

Hai cách đầu sẽ thêm phần tử trực tiếp vào mảng cũ, còn cách thứ 3 nó sẽ trả ra một mảng mới đó. Bạn hãy thử check lại mà xem. Vậy nên tùy vào từng ngữ cảnh cụ thể mà chọn cách sử dụng cách phù hợp nhé!

Bàn về hiệu năng thì có nhiều sự khác biệt trên điện thoại và máy tính.

- Trên điện thoại:
```javascript
Final victor

1. arr[arr.length] = 6; // with an average of 5 632 856 ops/sec
2. arr.push(6); // 35.64 % slower
3. arr2 = arr.concat([6]); // 62.67 % slower
```

- Trên máy tính:
```javascript
Final victor

1. arr[arr.length] = 6; // with an average of 42 345 449 ops/sec
2. arr.push(6); // 34.66 % slower
3. arr2 = arr.concat([6]); // 85.79 % slower
```

Chi tiết cụ thể trên từng trình duyệt các bạn vào [bài viết gốc](https://www.jstips.co/en/javascript/insert-item-inside-an-array/) tham khảo nhé.

<h3>3.2 Chèn phần tử vào đầu mảng</h3>

Chèn vào đầu mảng thì chúng ta sẽ nói tới 2 cách:
```javascript
var arr = [1,2,3,4,5];

arr.unshift(0);   // #1
[0].concat(arr);  // #2
```

Và chúng ta cũng thu được kết quả hiệu năng khi đo trên máy tính và điện thoại.

- Trên điện thoại
```javascript
Final victor

1. [0].concat(arr); // with an average of 4 972 622 ops/sec
2. arr.unshift(0); // 64.70 % slower
```

- Trên máy tính

```javascript
Final victor

1. [0].concat(arr); // with an average of 6 032 573 ops/sec
2. arr.unshift(0); // 78.65 % slower
```

Chi tiết cụ thể trên từng trình duyệt các bạn vào [bài viết gốc](https://www.jstips.co/en/javascript/insert-item-inside-an-array/) tham khảo nhé.

<h3>3.3 Chèn phần tử vào giữa mảng</h3>

Chèn vào giữa mảng thì mình chỉ bàn tới 1 cách duy nhất nên không cần so sánh hiệu năng nữa.

```javascript
var items = ['one', 'two', 'three', 'four'];
items.splice(items.length / 2, 0, 'hello');
```

<h2>4. Bạn đã hiểu thực sự về cơ chế passing reference của JS?</h2>

Là một JS dev, mình cá rằng các bạn đã từng nghe câu này ở đâu đó rồi: <b><em>"JavaScript is pass-by-value"</em></b>. Mình xin mạn phép không dịch câu này ra ở đây vì kiến thức tiếng Anh hạn hẹp. Để xét tới ý nghĩa của câu nói này, các bạn hãy xem ví dụ sau:

```javascript
var me = {					// #1
	'partOf' : 'A Team'
}; 

function myTeam(me) {		// #2

	me = {					// #3
		'belongsTo' : 'A Group'
	}; 
} 	

myTeam(me);		
console.log(me);			// #4  : {'partOf' : 'A Team'}
```

"Nai tơ gà mờ" sẽ thắc mắc là: <em>"Ơ, em tưởng nó phải là <b>```{'belongsTo' : 'A Group'} ```</b> chứ nhỉ?"</em> Phỏng vấn mà gặp câu này thì có mà ... loại từ vòng gửi xe rồi.

Nào, hãy cùng nhau phân tích để làm rõ nhé!

Mình đã đánh dấu các số lên các biến ```me``` để chúng ta có thể tiện theo dõi. Đầu tiên, chúng ta khai báo một biến ```me#1```, điều này đồng nghĩa với việc một ô nhớ (tạm gọi là ```me_mem```) được sử dụng và ```me#1``` trỏ tới ```me_mem``` đó.

Khi chúng ta gọi hàm ```myTeam(me)``` truyền ```me#1``` này vào, ngay lúc này, JS sẽ pass tham chiếu của đối tượng ```me#1``` này dưới dạng 1 giá trị (passing the reference to ```me#1``` object as value). Vì nó là một đối tượng và chính việc gọi hàm như thế, nói cách khác, tạo ra 2 tham chiếu tới cùng 1 đối tượng. Thế nên ```me#2``` cũng trỏ tới ```me_mem```. 

Và ở bước gán ```me#2``` thành ```me#3``` thì ```me#2``` đã tham chiếu tới một vùng nhớ mới, vùng nhớ của ```me#3``` trỏ tới, khác với vùng nhớ ```me_mem``` mà nó đang trỏ. Vì vậy, ```me#2``` sẽ bị thay đổi chứ không phải là ```me#1``` như nhiều bạn lầm tưởng. Cho nên khi show ra giá trị của ```me#1``` thì nó vẫn là giá trị ban đầu mà thôi.

Một ví dụ thứ hai để hiểu sâu thêm nữa nhé:

```javascript
var me = {					// #1
	'partOf' : 'A Team'
}; 

function myGroup(me) { 		// #2
	me.partOf = 'A Group';  // #3
} 

myGroup(me);
console.log(me);			// #4  : {'partOf' : 'A Group'}
```


Sau khi có kinh nghiệm với ví dụ bên trên và đọc kĩ hơn ví dụ thứ hai này thì có lẽ chúng ta sẽ không ngạc nhiên với kết quả thu được cuối cùng. 

Cơ chế làm việc của JS vẫn vậy. Nhưng chúng ta hãy chú ý ở hàm ```myGroup(me)```, ta thực hiện thay đổi giá trị của thuộc tính bên trong ```me#2```, tức là thay đổi chính vùng nhớ ```me_mem``` mà ```me#2``` đang tham chiếu tới. Việc này dẫn tới kết quả là ```me#1``` khi bị gọi cũng thay đổi giá trị vì nó cũng đang tham chiếu tới ```me_mem```.

Thật là vi diệu đúng không các bạn, <b><em>"JavaScript is pass-by-value"</em></b>.

<h2>5. Giải trí cuối bài với 3 tip nhỏ</h2>

Đã tới cuối bài, sau 4 thủ thuật khó có dễ có, quen có lạ có thì phần cuối cùng này mình xin chia sẻ 3 tip nhỏ nhưng vô cùng hữu dụng. Chúng khiến code của chúng ta trong sáng và các thao thác logic trở nên dễ dàng hơn.

<h3>5.1 Lấy phần tử của mảng từ cuối mảng</h3>

Cái này là dành cho những bạn hay quên thôi. Cách làm này khá là thông dụng và hiệu quả nhưng lại khá ít được sử dụng.

```javascript
var newArray = [1, 2, 3, 4];

console.log(newArray.slice(-1)); // [4]
console.log(newArray.slice(-2)); // [3, 4]
console.log(newArray.slice(-3)); // [2, 3, 4]
console.log(newArray.slice(-4)); // [1, 2, 3, 4]
```

<h3>5.2 Rút ngắn điều kiện và lệnh thực hiện</h3>
Giả sử như bạn có một hàm chỉ được thực hiện khi điều kiện nào đó đúng.

```javascript
if (condition) {
    dosomething();
}
```

Thì giờ đây code của các bạn sẽ ngắn hơn và nhìn <em>nguy hiểm</em> hơn rất nhiều bằng cách viết sau:

```javascript
condition && dosomething();
```

Nó hoàn toàn tương đương với đoạn code trên mà thôi.

```javascript
let check = true;

check && console.log("Wow!"); // Wow!
```

<h3>5.3 Gán giá trị mặc định sử dụng || </h3>

Cái này cũng là một thủ thuật hay được các JS dev sử dụng khi gán giá trị mặc định cho biến trong trường hợp biến đó đang có giá trị là ```falsy value``` như ```null```, ```undefined```, ```false```, ```NaN```, ... .

```javascript
var a;
console.log(a); //undefined
a = a || 'default value';
console.log(a); //default value
a = a || 'new value';
console.log(a); //default value
```

Và ứng dụng của <b>"hai dấu gạch đứng"</b> thần thánh này rất là kinh điển đấy nhé. Giả tỷ như trong việc viết một phương thức cho cả tham số là chuỗi hay là mảng đều dùng được:

```javascript
function printUpperCase(words) {
  var elements = [].concat(words || []);
  for (var i = 0; i < elements.length; i++) {
    console.log(elements[i].toUpperCase());
  }
}
```
Các bạn đều thấy rằng điểm mấu chốt là ở ```||```  phải không?

```javascript
printUpperCase("cactus");
// => CACTUS
printUpperCase(["cactus", "bear", "potato"]);
// => CACTUS
//  BEAR
//  POTATO
```

<h2>Kết luận</h2>
Vậy là chúng ta đã đi qua 5 thủ thuật trong bài viết này. Khá là dài đúng không? 

Dù cho có những việc rất quen thuộc khi thao tác với JS như loại bỏ phần tử trùng trong mảng hoặc là thêm phần tử vào mảng, truyền tham số vào hàm, hay những cách mà chúng ta vẫn sử dụng hàng ngày nhưng mình cá rằng bài viết của mình mang lại ít nhiều kiến thức trong một vài khía cạnh của các thủ thuật này. Hi vọng rằng bài viết mang lại những điều bổ ích cho các bạn. 

Nếu có thắc mắc hoặc các thủ thuật tương tự, các bạn vui lòng để lại comment bên dưới nhé. Xin cảm ơn các bạn đã kiên nhẫn đọc tới đây!

<br>
<br>

***Reference***  http://jstips.co