Xin chào các bạn,

Khi nói về việc "kiểm soát" một ngôn ngữ chúng ta có rất nhiều cấp độ từ dễ đến khó, từ thấp lên cao. Với người mới - newbie, việc viết code và chạy được chương trình đúng được coi là một điều chấp nhận được. Lên cao hơn nữa, tốc độ chương trình, bản chất code và các thủ thuật lại là một trong những thứ mà các dev quan tâm hơn bao giờ hết khi bắt tay đào sâu vào học cốt lõi. Javascript, như chúng ta đã biết, là một ngôn ngữ "khó nhằn" vì sự vi diệu của nó kể từ khi ra đời cho đến nay. 

![](https://images.viblo.asia/47b60d35-8e7e-4f1e-836c-3cc9f860fdc9.jpg)

Và đã có không ít những bài viết đề cập tới rất nhiều các thủ thuật, các cách để thao tác với JS sao cho phù hợp và tốt nhất. [Ở bài viết trước](https://viblo.asia/p/cac-tip-cai-thien-hieu-nang-code-trong-javascript-3P0lPEJ85ox) mình đã đề cập tới một số thủ thuật làm tăng hiệu năng khi code JS, ở bài viết này, mình xin mạnh dạn được kể ra một số những "chiêu trò" mà mình lượm nhặt được trên trang [jstips.co](http://www.jstips.co) để chia sẻ với các bạn. Những cách được sử dụng trong các thủ thuật mình sắp liệt kê dưới đây có thể rất quen thuộc nhưng ở một khía cạnh nào đó nó lại vô cùng hữu ích. Chúng ta bắt đầu thôi!

<h2>1. Sắp xếp một list các chuỗi có dấu</h2>

Thông thường, khi sắp sếp một list String, chúng ta sử dụng phương thức `sort()` có sẵn trong JS, việc làm này vô cùng đơn giản và tiện lợi.

```javascript
['Shanghai', 'New York', 'Mumbai', 'Buenos Aires'].sort();
// --> result: ["Buenos Aires", "Mumbai", "New York", "Shanghai"]
```

Nhưng khi list String của chúng ta chứa các kí tự có dấu (non ASCII) thì sao? Việc sử dụng hàm ```sort()``` mặc định dường như không đem lại kết quả mong muốn nữa:

```javascript
['é', 'a', 'ú', 'c'].sort();
// --> result: ['c', 'e', 'á', 'ú']

// Spanish
['único','árbol', 'cosas', 'fútbol'].sort();
// --> result: ["cosas", "fútbol", "árbol", "único"] // bad order

// German
['Woche', 'wöchentlich', 'wäre', 'Wann'].sort();
// --> result: ["Wann", "Woche", "wäre", "wöchentlich"] // bad order
```

Bạn đang lo lắng về điều này khi sắp xếp? May thay, chúng ta có 2 cách để xử lý vấn đề này cơ, đó chính là sử dụng ```localeCompare()``` và ```Intl.Collator()```.

- Sử dụng ```localeCompare()```

```javascript
['único','árbol', 'cosas', 'fútbol'].sort(function (a, b) {
  return a.localeCompare(b);
});
// ["árbol", "cosas", "fútbol", "único"]

['Woche', 'wöchentlich', 'wäre', 'Wann'].sort(function (a, b) {
  return a.localeCompare(b);
});
// ["Wann", "wäre", "Woche", "wöchentlich"]

['Hoàng', 'Ân', 'Chiến', 'Trường'].sort(function (a, b) {
  return a.localeCompare(b);
});
// ["Ân", "Chiến", "Hoàng", "Trường"]
```

- Sử dụng ```Intl.Collator()```

```javascript
['único','árbol', 'cosas', 'fútbol'].sort(Intl.Collator().compare);
// ["árbol", "cosas", "fútbol", "único"]

['Woche', 'wöchentlich', 'wäre', 'Wann'].sort(Intl.Collator().compare);
// ["Wann", "wäre", "Woche", "wöchentlich"]
```

Thật thú vị phải không nào! Và từ giờ chúng ta sẽ không còn phải lo lắng về việc sắp xếp tên tiếng Việt nữa nhé!

<h2>2. Hai cách để xóa bỏ tất cả các phần tử của mảng (đưa mảng về rỗng)</h2>

Một điều khá là đơn giản khi nghĩ đến và mình cá là các bạn sẽ làm thế này:

```javascript
// define Array
var list = [1, 2, 3, 4];
function empty() {
    //empty your array
    list = [];
}
empty();
```

Nhưng, có một cách khác làm được điều này tốt hơn mà có thể nhiều bạn chưa biết:

```javascript
var list = [1, 2, 3, 4];
function empty() {
    //empty your array
    list.length = 0;
}
empty();
```

Để mình làm rõ hơn tại sao cách thứ 2 lại được khuyến nghị nhé! 
- Khi bạn gán mảng bằng rỗng ```list = []``` thì list này sẽ trỏ tới một vùng nhớ khác nơi chứa mảng rỗng, còn vùng nhớ của mảng cũ vẫn còn nguyên, việc này sẽ dẫn tới tiêu tốn bộ nhớ và memory leaks.
- Khi bạn gán ```length``` của mảng về 0 là bạn đã hoàn toàn xóa được các phần tử của mảng ở chính ô nhớ đó, không gây ra sự lãng phí tài nguyên nào, và đương nhiên việc này sẽ tốt hơn.

Chưa tin ư? Chúng ta cùng kiểm tra lại bằng một đoạn code ngắn nhé:

```javascript
var foo = [1,2,3];
var bar = [1,2,3];
var foo2 = foo;
var bar2 = bar;
foo = [];
bar.length = 0;
console.log(foo, bar, foo2, bar2);

// [] [] [1, 2, 3] []
```

See, kết quả đã quá rõ ràng phải không nào!

<h2>3. Kiểm tra xem một thuộc tính có phải thuộc một object hay không</h2>

Khi kiểm tra một thuộc tính nào đó có trong object hay không, chúng ta có một cách quen thuộc như sau:
```javascript
var myObject = {
  name: '@tips_js'
};

if (myObject.name) { ... }
```

Cách làm này không có vấn đề gì đáng nói, nhưng chúng ta nên biết rằng có 2 cách tốt hơn được JS cung cấp sẵn để kiểm tra việc này: toán tử ```in``` và phương thức ```Object.hasOwnProperty```. Nhưng 2 cách này có một điểm khác biệt rất lớn:

```javascript
var myObject = {
  name: '@tips_js'
};

myObject.hasOwnProperty('name'); // true
'name' in myObject; // true

myObject.hasOwnProperty('valueOf'); // false, valueOf is inherited from the prototype chain
'valueOf' in myObject; // true
```

Như các bạn đã thấy, phương thức ```hasOwnProperty ``` trả về kết quả ```true``` khi thuộc tính có mặt trực tiếp trong object đó, nó sẽ không tính các thuộc tính được kế thừa như ```valueOf``` . Còn ```in``` thì ngược lại, nó sẽ tính cả các thuộc tính được kế thừa từ cha.

<h2>4. Một số cách để "duỗi" một mảng đa chiều</h2>

Giả sử chúng ta có một mảng như sau:

```javascript
var myArray = [[1, 2],[3, 4, 5], [6, 7, 8, 9]];
```
Công việc của chúng ta cần làm là "duỗi thẳng" (flatten) mảng này ra để thu được mảng kết quả:
```javascript
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

- Cách 1: Sử dụng ```concat()``` và ```apply()```
```javascript
var myNewArray = [].concat.apply([], myArray);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
- Cách 2: Sử dụng ```reduce()```
```javascript
var myNewArray = myArray.reduce(function(prev, curr) {
  return prev.concat(curr);
});
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
- Cách 3: Sử dụng ```spread operator``` trong ES6
```javascript
var myNewArray4 = [].concat(...myArray);
console.log(myNewArray4);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
- Cách 4: Một cách đau đầu hơn

Thực ra cũng không phải quá cao siêu hay đau đầu đâu nhé, chỉ là duyệt hết mảng và gán lại sang một mảng khác mà thôi.

```javascript
var myNewArray3 = [];
for (var i = 0; i < myArray.length; ++i) {
  for (var j = 0; j < myArray[i].length; ++j)
    myNewArray3.push(myArray[i][j]);
}
console.log(myNewArray3);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<h2>Kết luận</h2>
Trên đây là một số "chiêu" khá hay mà mình lượm nhặt được, hi vọng sẽ giúp ích cho các bạn trong một vài tình huống cần thiết. Các thủ thuật và kinh nghiệm code JS còn rất nhiều nữa, mình sẽ cố gắng list ra trong các bài tiếp theo, mong nhận được sự ủng hộ từ các bạn!

Xin cảm ơn :D 

<br>

***Update***

<em>Một phút dành cho quảng cáo</em>

Các phần tiếp theo của series <b>[JS tips] Các "chiêu trò" JS tưởng không hay mà hay không tưởng</b> đã ra lò, các bạn có thể theo dõi tại:

[[JS tips series] Các "chiêu trò" JS tưởng không hay mà hay không tưởng](https://viblo.asia/s/cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-DVK2jDyjKLj)

<br>

***References*** http://www.jstips.co/