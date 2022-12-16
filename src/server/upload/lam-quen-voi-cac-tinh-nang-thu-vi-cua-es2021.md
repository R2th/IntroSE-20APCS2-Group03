# Hi guys,
Như thường lệ, mình lại mang tới cho các bạn 1 topic mới về Frontend tiếp đây. Có lẽ đọc tiêu đề, các bạn đã hiểu điều mà hôm nay mình sẽ mang tới là gì rồi đúng không nào? :sunglasses:

# Về ES2021,
Hay còn gọi là ES12 cũng đã được [TC39](https://tc39.es/)  cho ra lò trong năm nay với các specs vô cùng đầy đủ. Nếu bạn còn chưa rõ TC39 là gì thì mình có thể ta có một "lời giới thiệu" như sau: 

> *"ECMA International’s TC39 is a group of JavaScript developers, implementers, academics, and more, collaborating with the community to maintain and evolve the definition of JavaScript."* - TC39.es

Có một điều chắc chắn răng, mỗi năm ta sẽ lại có 1 phiên bản mới của Javascript với những tính năng mới, và với vai trò là những lập trình viên "mặt tiền" thì chúng ta không thể không cập nhật chúng một cách nhanh nhất. Đúng không cả nhà? :rofl: 

Okey, let's go!

# 1. Các toán tử gán có điều kiện
Vâng, các toán tử điều kiện quen thuộc của chúng ta `||`, `&&`, `??` nay như "hổ mọc thêm cánh" (nhưng mà nằm ngang): `||=`, `&&=`, `??=` :flushed: Giờ đây bạn có thể dùng chúng để vừa kiểm tra điều kiện mà vừa trực tiếp gán giá trị rồi nhé!

Hãy cùng điểm qua một số ví dụ ngắn sau để hiểu liền các "em nó" nào:

```js
/*
 * "Or Or Equals"
 * Nếu x có giá trị "falsy" (false, 0...) , thực hiện toán tử gán phía bên phải
 */
x ||= y;
x || (x = y); 

/*
 * "And And Equals"
 * Nếu x có giá trị "truthy" (true, 1,...), thực hiện toán tử gán phía bên phải
 */
x &&= y;
x && (x = y);

/*
 * "Q Q Equals"
 * Nếu x không có giá trị (undefined, null,...), thực hiện toán tử gán phía bên phải
 */
x ??= y;
x ?? (x = y);
```
```js
const updateID = user => {

  // Ta có thể thực hiện thủ công như này
  if (!user.id) user.id = 1

  // Hoặc như này
  user.id = user.id || 1

  // Hoặc dùng toàn tử gán có điều kiện
  user.id ||= 1
}
```
```js
function setOpts(opts) {
  opts.cat ??= 'meow'
  opts.dog ??= 'bow';
}

const obj = {}
setOpts(obj)

console.log(obj) // "{ cat: 'meow', dog: 'bow' }"
```

# 2. Sử dụng `_` để phân chia số
Tính năng này cũng rất thú vị, nó sẽ giúp các con số trong code của chúng ta trở nên dễ đọc hơn nhiều. Tuy không có ý nghĩa nhiều với ứng dụng hay người dùng, nhưng với developers chúng ta, đây hẳn là một món quá rất tuyệt với :heart_eyes:

```js
const billion = 1000_000_000;
console.log(billion); // 1000000000
```

Chơi luôn cả BigInt nhé, sợ gì :rofl::

```js
const trillion = 1000_000_000_000n;
console.log(trillion.toString()); // "1000000000000"
```

# 3. Promise.any và AggregateError
Ồ, đây cũng là 1 tính năng hấp dẫn, `Promise.any` sẽ `resolve` ngay khi một trong các `promises` được cung cấp được `resolve`. Ví dụ cho dễ hiểu nha, ta sẽ có 3 promises với thời gian resolve là khác nhau:

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("A"), Math.floor(Math.random() * 1000));
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("B"), Math.floor(Math.random() * 1000));
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("C"), Math.floor(Math.random() * 1000));
});
```

Trong 3 promises `p1`, `p2`, `p3`, cái nào resolve trước sẽ được xử lý bởi `Promise.any`:
```js
(async function () {
  const result = await Promise.any([p1, p2, p3]);
  console.log(result); // Prints "A", "B" or "C"
})();
```

Đương nhiên rồi, đôi khi "hứa nhiều" lại thành "hứa suông", trong tình huống không có bất kì `promise` nào được thực hiện thành công, `Promise.any` sẽ throws ra lỗi `AggregateError`. Công việc của ta đó là xử lý hậu hoạ của những lời "hứa suông" đó đơn giản và nhanh gọn:

```js
const p = new Promise((resolve, reject) => reject());

try {
  (async function () {
    const result = await Promise.any([p]);
    console.log(result);
  })();
} catch (error) {
  console.log(error.errors);
}
```

Để rõ hơn thì mình có chuẩn bị sẵn một quả "cap màn hình" vụ "thất hứa" quen thuộc đó cho các bạn coi đây:

![](https://images.viblo.asia/cb392949-c621-4576-9a15-d86e93f9af07.png)

Thử nghĩa mà xem, với `Promise.any`, ta có thể có tình huống là gọi nhiều APIs một lúc nhưng đều nhằm lấy cùng một tập dữ liệu, API nào có phản hồi sớm hơn thì ta chọn luôn cái đó... Các bạn xem còn có tình huống thú vị nào nữa không nha? :stuck_out_tongue_winking_eye:

# 4. Phương thức `replaceAll` của String
Mình cá là có rất nhiều bạn đã gặp trường hợp muốn `replace` toàn bộ một chuỗi con nào đó trong một String, sau đó lên stackoverflow search thì gặp được gợi ý sử dụng phương thức `replaceAll` này. 

Đây hẳn là 1 phương thức vô cùng mạnh mẽ và dễ dùng. Nhưng nếu chương trình của bạn không nhận diện ra nó, thì nhớ kiểm tra lại project bạn đã config đúng phiên bản ES2021 chưa nhé :kissing_heart:

```js
// String.prototype.replaceAll(searchValue, replaceValue)

'Hello World'.replace('l', '_');
// → 'He_lo World'

'Hello World'.replace(/l/g, '_');
// → 'He__o Wor_d'

'Hello World'.replaceAll('l', '_');
// → 'He__o Wor_d'
```

# 5. WeakRef và Finalizers
Ta cần phải nói lại rằng Javascript cũng có cơ chế ["thu gom rác" (gabarge collection)](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) giống như Java, C#, Python... Hiểu đơn giản đây là cơ chế tự động thu gom và giải phóng đối tượng/tài nguyên mà chương trình không còn dùng tới. 

Tuy nhiên, trong các phiên bản JS trước đây, hầu hết mọi tham chiếu đều có thể hiểu là "tham chiếu mạnh" (Strong reference), điều này dẫn tới việc có rất nhiều đối tượng không được "dọn dẹp" dù chúng không còn thực sự được sử dụng nữa.

Việc các tham chiếu (references) tồn tại có ảnh hưởng tới quyết định của việc giải phóng tài nguyên trong chương trình. Khác với tham chiếu mạnh (Strong reference), tham chiếu yếu (Weak reference) là dạng tham chiếu không bảo vệ đối tượng/tài nguyên được tham chiếu khỏi sự thu gom của "bộ gom rác". 

## 5.1. WeakRef
Như đã biết, khi một đối tượng A có tham chiếu tới một đối tượng B, thì đối tượng B sẽ chỉ được "thu gom" khi và chỉ khi đối tượng A đã hoàn toàn bị "thu gom" trước đó. Ta sẽ xem xét qua ví dụ sau:

```js
// Global scope
const theA = {};

(() => {
  // Private scope
  const theB = { foo: 'foo' };
  theA.obj = theB;
})();
```

Rõ ràng ở đây, đối tượng A nằm ở phạm vi toàn cục, dẫn tới việc đối tượng B trong suốt chương trình sẽ không thể bị "thu gom" do đối tượng A vẫn còn ở đó! :cry: Hay nói cách khác thì A có một "tham chiếu mạnh" tới B.

Vâng, chính vì thế mà `WeakRef` ra đời để giúp ta tạo ra được một "tham chiếu yếu" tới một đối tượng. Nói cách khác, `WeakRef` sẽ tạo ra một lớp vỏ bọc giúp truy cập tới đối tượng, mà vẫn đảm bảo việc "thu gom" được diễn ra thuận lợi. Điều này là vô cùng tốt khi mà chương trình có chứa rất nhiều các đối tượng lớn gây giảm thiểu hiệu năng nếu như chúng không được "thu gom" đúng cách! :roll_eyes:

Cách sử dụng `WeakRef` khá đơn giản, dùng luôn ví dụ trên nhé:

```js
// Global scope
const theA = {};

(() => {
  // Private scope
  const theB = new WeakRef({ foo: 'foo' }); // Use "new" keyword to create a new WeakRef
  theA.obj = theB.defer(); // Use defer to access the object
})();

console.log(theA.obj) // May be "undefined"
```

Đúng vậy, đầu tiên là khai bảo mới một `WeakRef` với từ khoá `new` và đầu vào là đối tượng bạn muốn. Tiếp theo, ta có thể truy cập đối tượng thông qua hàm `defer`. Nếu đối tượng chưa bị "thu gom", `defer` sẽ trả về chính đối tượng đó, còn không thì trả về `undefined`. 

Cần chú ý là việc "thu gom" ở các trình duyệt là có thể khác nhau, vì vậy bạn phải thật cẩn thận khi sử dụng `WeakRef`. :thinking:

## 5.2. Finalizers
Đầy đủ hơn là `FinalizationRegistry`, để cho phép lập trình viên đăng ký các hàm gọi lại (callbacks) được thực thi trong một thời điểm nào đó của việc "thu gom" đối tượng nhất định.

`Finalizers` được sinh ra cũng một phần là để ta có thể nắm bắt được việc "thu gom" của đối tượng. Nếu tận dụng tốt nó, lập trình viên có thể tìm cách đối mặt được vấn đề "thu gom" khác nhau giữa các trình duyệt mà đã nói ở trên.

Để sử dụng `Finalizers` vô cùng đơn giản:

```js
console.log('script starting...');

// Create new Finalizers with a callback, may has param "heldValue" or not
const r = new FinalizationRegistry((heldValue) => {
  console.log(heldValue);
});

(() => {
  // Private scope
  const obj = {};
  r.register(obj, "Just got garbage-collected!"); // Register an object to the Finalizers
})();
```

Với một đoạn code đơn giản như trên, thì khi mà đối tượng `obj` được "thu gom", Finalizers sẽ gọi callback và in ra console dòng chữ `Just got garbage-collected!`

# Now, bye guys
Và thế là hết... Mình đã tổng hợp xong 5 điều thú vị nhất trong ES2021 mà các bạn không thể bỏ lỡ. Rất mong các bạn đã có thêm những kiến thức bổ ích, và có thể áp dụng chúng, ngay sau khi đọc bài viết này, vào những dòng code "chất như nước cất" của mình :sunglasses:. 

Một lần nữa, xin cảm ơn các bạn và hẹn gặp lại các bạn ở bài viết tiếp theo nhé! :kissing_heart: