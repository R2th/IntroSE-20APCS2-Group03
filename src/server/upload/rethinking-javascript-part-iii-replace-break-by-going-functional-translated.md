![](https://images.viblo.asia/d11344ac-7941-4356-8b4a-35343c6a667f.png)

Trong bài viết trước, "Death of the for Loop", tôi đã cố gắng thuyết phục các bạn từ bỏ vòng lặp `for` và thay bằng kỹ thuật lập trình hàm. Đổi lại, các bạn lại đưa ra câu hỏi rất tuyệt: "Thế còn `break` thì sao?"

      break is the GOTO of loops and should be avoided.
      (break là GOTO của các vòng lặp và nên bị tránh sử dụng)

`break` nên được quẳng vào thùng rác đúng như cái cách mà `GOTO` đã bị.

Bạn có thể đang nghĩ: "Thôi nào Joel, chắc bạn chỉ đang kích động. Tại sao `break` lại giống `GOTO` được?"

```JavaScript
// bad code. no copy paste.

outer:
  for (var i in outerList) {
inner:
    for (var j in innerList) {
      break outer;
    }
  }
```

Tôi đang gán nhãn như là một cách chứng minh. Trong các ngôn ngữ khác, các nhãn tương đương với `GOTO`. Trong JavaScript, nhãn tương đương với `break` và `continue`. Bởi vì `break` và `continue` đến cùng một gia đình nhãn, điều này làm chúng rất tương đồng với `GOTO`.

      JavaScript’s label, break and continue are leftover legacy from the days of GOTO and unstructured programming.

![](https://images.viblo.asia/5558b522-3c93-46b8-ac35-230269def94f.png)

"Nhưng nó không làm hại ai cả, vậy tại sao không để nó tồn tại để chúng ta có những sự lựa chọn?"

### Why should we place limits on how we write software?

Nghe có vẻ lạ thường, nhưng những giới hạn thực sự là một điều tốt. Việc loại bỏ `GOTO` là một ví dụ hoàn hảo cho điều này. Chúng ta cũng đã chào đón `"use strict"` với những cánh tay dang rộng và thậm chí truyền lại cho cả những người không dùng nó!

### What are our alternatives to break?

Có một cách lập trình hoàn toàn khác. Một cách tư duy hoàn toàn khác. Một cách tư duy về hàm.

Tin tốt là có rất nhiều thư viện và công cụ tồn tại giúp chúng ta như là Lodash, Ramda, lazy.js, đệ quy, v.v.

Chúng ta sẽ bắt đầu với một tập các con mèo và một hàm tên `isKitten`:

```JavaScript
const cats = [
  { name: 'Mojo',    months: 84 },
  { name: 'Mao-Mao', months: 34 },
  { name: 'Waffles', months: 4 },
  { name: 'Pickles', months: 6 }
]

const isKitten = cat => cat.months < 7
```

Cùng bắt đầu với một ví dụ dùng vòng lặp `for` cũ kỹ. Vòng lặp này sẽ lặp qua các con mèo và break khi nó tìm thấy con mèo đầu tiên:

```JavaScript
var firstKitten

for (var i = 0; i < cats.length; i++) {
  if (isKitten(cats[i])) {
    firstKitten = cats[i]
    break
  }
}
```

Bây giờ hãy so sánh với lodash tương đương:

```JavaScript
const firstKitten = _.find(cats, isKitten)
```

Okay, ví dụ khá đơn giản. Hãy cùng chuyển qua một ví dụ phức tạp hơn một chút: liệt kê các con mèo và break khi đã tìm được 5 con mèo con:

```JavaScript
var first5Kittens = []

// old-school edge case kitty loop
for (var i = 0; i < cats.length; i++) {
  if (isKitten(cats[i])) {
    first5Kittens.push(cats[i])

    if (first5Kittens.length >= 5) {
      break
    }
  }
}
```

### The easy way

lodash thật kỳ diệu và làm được rất nhiều điều tuyệt vời nhưng thi thoảng bạn cần một cái gì đó chuyên biệt hơn. **Đây chính là nơi chúng ta mang đến một người bạn mới, lazy.js. Nó "giống dấu gạch dưới nhưng lười hơn"**. Và lười là những gì chúng ta cần:

```JavaScript
const result = Lazy(cats)
  .filter(isKitten)
  .take(5)
```

### The hard way

Các thư viện đều thú vị nhưng **thi thoảng cái thực sự vui chính là tạo ra một cái gì đó từ đầu!**

Vậy còn việc chúng ta tạo một hàm generic hoạt động giống như `filter` và cũng thêm chức năng giới hạn thì thế nào?

Bước đầu tiên là đưa cái vòng lặp cũ kỹ trước đó vào trong một hàm:

```JavaScript
const get5Kittens = () => {
  const newList = []
  
  // old-school edge case kitty loop
  for (var i = 0; i < cats.length; i++) {
    if (isKitten(cats[i])) {
      newList.push(cats[i])
      
      if (newList.length >= 5) {
        break
      }
    }
  }
  
  return newList
}
```

Tiếp đó, khái quát hóa hàm và trích ra tất cả các con mèo. Thay `5` bởi `limit`, `isKitten` bởi `predicate` và `cats` bởi `list`. Sau đó thêm những cái đó như là các tham số hàm:

```JavaScript
const takeFirst = (limit, predicate, list) => {
  const newList = []
  
  for (var i = 0; i < list.length; i++) {
    if (predicate(list[i])) {
      newList.push(list[i])
  
      if (newList.length >= limit) {
        break
      }
    }
  }
  
  return newList
}
```

Bây giờ chúng ta đã có một hàm có thể tái sử dụng `takeFirst`.

Hàm mới của chúng ta cũng là một hàm thuần túy. Điều này có nghĩa là đầu ra chỉ phụ được vào đầu vào. Cùng một đầu vào sẽ cho cùng đầu ra 100%.

Chúng ta vẫn còn giữ vòng lặp `for` xấu xí ở đó, hãy tiếp tục refactor. Bước tiếp theo là di chuyển `i` và `newList` vào danh sách tham biến:

```JavaScript
const takeFirst = (limit, predicate, list, i = 0, newList = []) => {
   // ...
}
```

Chúng ta muốn break đệ quy (`isDone`) khi `limit` có giá trị `0` (`limit` sẽ đếm lùi trong quá trình đệ quy) hoặc khi chúng lặp hết danh sách.

Nếu chúng ta chưa hoàn thành thì hãy kiểm tra xem filter `predicate` đã có một match hay chưa. Nêu chúng có một match thì hãy gọi `takeFirst`, giảm `limit` và thêm vào `newList`. Nếu không thì, duyệt tới item tiếp theo trong list.

```JavaScript
const takeFirst = (limit, predicate, list, i = 0, newList = []) => {
  const isDone = limit <= 0 || i >= list.length
  const isMatch = isDone ? undefined : predicate(list[i])
  
  if (isDone) {
    return newList
  } else if (isMatch) {
    return takeFirst(limit - 1, predicate, list, i + 1, [...newList, list[i]])
  } else {
    return takeFirst(limit, predicate, list, i + 1, newList)
  }
}
```

Cuối cùng, chúng ta thay câu lệnh `if` với toán tử tam nguyên:

```JavaScript
/*
 * takeFirst acts like `filter`, but with a limit feature.
 *
 * @param {number} limit - The maximum number of matches to return
 * @param {function} predicate - The matching function, takes an item and returns true or false
 * @param {array} list - The list you want to filter
 * @param {number} [i] - Index to start searching from (default 0)
 */
const takeFirst = (limit, predicate, list, i = 0, newList = []) => {
    const isDone = limit <= 0 || i >= list.length
    const isMatch = isDone ? undefined : predicate(list[i])
  
    return isDone  ? newList :
           isMatch ? takeFirst(limit - 1, predicate, list, i + 1, [...newList, list[i]])
                   : takeFirst(limit, predicate, list, i + 1, newList)
}
```

Bây giờ chúng ta có thể gọi hàm mới như thế này:

```JavaScript
const first5Kittens = takeFirst(5, isKitten, cats)
```

Chúng ta có thể thêm chút gia vị cho `takeFirst` và dùng nó để tạo ra các hàm khác:

```JavaScript
const first5 = takeFirst(5)
const getFirst5Kittens = first5(isKitten)

const first5Kittens = getFirst5Kittens(cats)
```

### Summary

Có rất nhiều thư viện tuyệt vời giống như lodash, ramda và lazy.js. Nếu chúng ta thích phiêu lưu, chúng ta có thể tạo riêng cho mình các method sử dụng đệ quy!

Tôi sẽ nói về đệ quy trong bài viết tiếp theo của tôi :)

Nguồn: https://hackernoon.com/rethinking-javascript-break-is-the-goto-of-loops-51b27b1c85f8