[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) là kết quả thu được khi bạn sử dụng [document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll). NodeList khá giống [Array](https://completejavascript.com/javascript-array-co-ban), nhưng không phải hoàn toàn. Vậy làm sao để duyệt NodeList? 

Bài viết này, mình sẽ tổng hợp lại một số cách giúp bạn duyệt NodeList trong JavaScript. Mời bạn theo dõi bài viết!

## Sử dụng for-loop duyệt NodeList

**For-loop** là cách truyền thống để duyệt NodeList. Và cách này được support bởi 96.69% các trình duyệt. 

```js
var elems = document.querySelectorAll('.some-selector');
var length = elems.length;

for (var i = 0; i < length; i++) {
    console.log(i); // index
    console.log(elems[i]); // value
}
```

Trong đoạn code trên, mình đã lưu lại giá trị của ```elems.length``` vào biến *length*. Mục đích là để tối ưu thời gian cho vòng lặp. Bởi nếu không làm như vậy, trong mỗi lượt của vòng lặp, bạn phải gọi lại ```elems.length``` => sẽ khá mất thời gian.

## Sử dụng for..of duyệt NodeList

Thực chất, **for..of** cho phép duyệt iterable objects (bao gồm String, Array, Array-like arguments, NodeList Objects, TypedArray, Map và Set). Và cách này được hỗ trợ bởi hầu hết các trình duyệt hiện đại, trừ IE11 và thấp hơn.

```js
const elems = document.querySelectorAll('.some-selector');
for (const el of elems) {
	console.log(el); // value
}
```

Tuy nhiên với **for..of**, bạn sẽ chỉ thu được **value** mà không có **index** như cách sử dụng **for-loop** bên trên.

## Sử dụng forEach duyệt NodeList

Tương tự như **for..of**, **forEach** cũng chỉ được hỗ trợ bởi các browser hiện đại. Về cách sử dụng nó thì cũng không khác gì so với [forEach trong Array](https://completejavascript.com/javascript-foreach-la-cai-quai-gi/).

```js
const elems = document.querySelectorAll('.some-selector');

elems.forEach(function (elem, index) {
    console.log(index); // index
    console.log(elem); // value
});
```

## Sử dụng Spread với forEach

Với [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) của ES6, bạn có thể tạo mới một Array từ NodeList. Và sau đó, bạn không chỉ dùng được ```forEach()``` mà bất kỳ các phương thức nào của Array như: ```map()```, ```filter()```, ```reduce()```,...

```js
const elems = document.querySelectorAll('.some-selector');

[...elems].forEach(function (elem, index) {
  console.log(index); // index
  console.log(elem); // value
});
```

## Tự tạo phương thức forEach với for-loop

Có lẽ đây là cách lý tưởng nhất nếu bạn muốn được support bởi hầu hết các trình duyệt mà vẫn đảm bảo code rõ ràng, dễ hiểu như cách bạn sử dụng phương thức ```forEach()```. Dưới đây là đoạn code mình tham khảo của Todd Motto.

```js
// Định nghĩa forEach
var forEach = function (array, callback, scope) {
  var length = array.length;

  for (var i = 0; i < length; i++) {
    callback.call(scope, i, array[i]);
  }
};

// Cách sử dụng
var elems = document.querySelectorAll('.some-selector');
forEach(elems, function (index, elem) {
  console.log(index); // index
  console.log(elem); // value
});
```

## Lời kết

Trên đây là một số cách để duyệt NodeList trong JavaScript. Ngoài ra, bạn cũng có thể tham khảo thêm một số cách khác ở trong các link dưới đây.

Với bạn, cách nào là cách duyệt NodeList tối ưu nhất? Chia sẻ với mình trong phần bình luận nhé!

Xin chào và hẹn gặp lại!

Tham khảo:

  * [Looping through NodeLists with ES6](https://gomakethings.com/looping-through-nodelists-with-es6/)
  * [Ditch the [].forEach.call(NodeList) hack](https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/)
  * [5 ways to loop over DOM elements from querySelectorAll in JavaScript](https://medium.com/@jsdevray/5-ways-to-loop-over-dom-elements-from-queryselectorall-in-javascript-55bd66ca4128)
  * [Loop Over querySelectorAll Matches](https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/)
  * [A Bunch of Options for Looping Over querySelectorAll NodeLists](https://css-tricks.com/a-bunch-of-options-for-looping-over-queryselectorall-nodelists/)

---
★ Nếu bạn thấy bài viết này hay thì hãy ghé thăm Blog hoặc theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:
  
  * Blog: [Complete JavaScript](https://completejavascript.com/)
  * Facebook Fanpage:  [Complete JavaScript](https://www.facebook.com/completejavascript/)
  * Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)