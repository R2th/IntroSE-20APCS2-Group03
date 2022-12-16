Hi xin chào các bạn lại là mình đây, tiếp tục chủ đề với JavaScript, cụ thể là làm việc với string hôm nay chúng ta cùng thảo luận về chủ đề "Làm thế nào để kiểm tra String bắt đầu với một ký tự cụ thể". Đầu đuôi câu chuyện như nào hãy cùng kéo xuống dưới để tìm hiểu nhé (go)

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

Xuyên suốt bài viết hôm nay, chúng ta sẽ đi giải quyết bài toán "Làm thế nào để kiểm tra được từ **J** có phải bắt đầu trong chuỗi **JavaScript** hay không"

### Cách 1. Sử dụng method `String.prototype.startsWith()`

Chắc chắn đây là method dễ hiểu và dễ sử dụng nhất, nên không cần giới thiệu nhiều, `startsWith()` trả về giá trị `true` nếu match và `false` nếu không

```js
const word = 'JavaScript';
const char = 'J';

word.startsWith(char); // true
```

Tuy nhiên bạn hãy lưu ý phương thức này không support anh bạn IE nên để work perfect trên nhiều trình duyệt ta cần sử dụng polyfill sau

```js
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function(search, rawPos) {
      var pos = rawPos > 0 ? rawPos | 0 : 0;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}
```

### Cách 2. Sử dụng indexOf()

Phương thức này trả về vị trí của ký tự trong chuỗi, như vậy muốn biết ký tự **J** có nằm ở đầu chuỗi hay không ta cót như sau

```js
const word = 'JavaScript';
const char = 'J';

word.indexOf(char) === 0 // true
```

### Cách 3. Sử dụng lastIndexOf()

`lastIndexOf()` nhận vào 2 tham số là từ khóa cần tìm kiếm và index. Như vậy để giải quyết bài toán trên ta có thể làm như sau

```js
const word = 'JavaScript';
const char = 'J';

word.lastIndexOf(char, 0) === 0 // true
```

### Cách 4. Sử dụng substring()

`substring()`dùng để cắt chuỗi, với tham số đầu vào gồm vị trí bắt đầu và vị trí kết thúc. Như vậy ta có thể dùng hàm này cắt ra ký tự đầu và so sánh nó với ký tự cần tìm

```js
const word = 'JavaScript';
const char = 'J';

word.substring(0, 1) === char // true
```

### Cách 5. Sử dụng string index

Cũng tương tự như array, với string bạn cũng có thể lấy được phần tử đầu nhờ sử dụng cú pháp sau

```js
const word = 'JavaScript';
const char = 'J';

word[0] === char // true
```

hoặc theo cách ngầu hơn

```js
const word = 'JavaScript';
const char = 'J';

[...word][0] === char // true
```

### Cách 6. Sử dụng regex

Sức mạnh của regex thì chắc không cần giới thiệu nhiều nữa, trong regex có 1 ký tự giúp bạn kiểm tra bắt đầu chuỗi là `^`. Code sẽ như sau

```js
const word = 'JavaScript';
const char = 'J';

new RegExp(`^${char}`).test(word) // true
```
hoặc bạn có thể viết như này
```js
const word = 'JavaScript';
const char = 'J';

/^J/.test(word) // true
```

### Kết luận

Trên đây mình đã giới thiệu cho các một số cách để kiểm tra chuỗi bắt đầu với một ký tự được chỉ định, nếu bạn còn cách nào hay ho hơn hãy chia sẻ cho mọi người cùng biết nhé ^^

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công