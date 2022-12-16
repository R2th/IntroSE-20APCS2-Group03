Hello, xin chào tất cả mọi người, chúc mọi người năm mới vui vẻ vẻ tràn ngập niềm vui ạ. Để ăn tết vui vẻ mà không quên bổ sung kiến thức mới thì hôm nay mình xin chia sẽ với các bạn về một chủ đề cũng khá hay trong **Javascript**, đó là **Memorization**.

Có lẽ rất nhiều bạn đã nghe tới **Memorization** khi mà làm việc với **Reactjs**, như là **useCallback(), useMemo()** và chỉ hiểu nó có tác dụng là tránh tính toán lại không cần thiết, nhưng có thể chưa hiểu sâu là nó hoạt động như thế nào, hôm nay mình sẽ cũng làm một vài ví dụ về **Memorization** trong **Javascript** để các bạn có thể hiểu hơn về nó nhé!

## 1. Ví dụ 1
Sau đây là ví dụ đơn giản về hàm cộng 2 số:

```javascript
function sum(number) {
    return number + 789;
}
```

Các bạn có thể thấy khi bạn truyền một một tham số vào hàm **sum(2000)** thì nó sẽ tính toán và cho ra kết quả, đương nhiên là sẽ không vấn đề gì với máy tính với những phép tính toán đơn giản như vậy.

Nhưng nó vẫn sẽ tính toán lại những số mà bạn đã truyền vào hàm **sum(2000)** trước đó => với những tính toán **expensive computation** thì sao?

Nó sẽ phải tính toán lại sẽ gây ít nhiều đến hiệu suất. Vậy giờ mình sẽ áp dụng cách khác thử xem nhé.

```javascript
function memoized() {
    let cache = {};
    
    return function sum(number) {
        if (number in cache) {
            return cache[number]
        } else {
            cache[number] = number + 768;
            return cache[number];
        }
    }
}
```

**Giải thích:**
Ở đoạn code trên bạn có thể thấy một hàm **memoized()** *return* về hàm **sum(number)** (gọi là  Closure bạn có thể tìm hiểu tại [ĐÂY](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)). Nhưng nói chung mình sẽ tóm tắt lại *Closure* là:

> A closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time. - Theo https://developer.mozilla.org/

> Clusure cho phép truy cập vào *biến*, *tham số* của một **outer function** từ một **inner function** và nó có thể truy cập ngay cả khi mà **outer function** đã được đóng lại.

Cùng liệt kê để hiểu thêm nhé:
* Biến **cache**: Thằng này có tác dụng là lưu trữ kểt quả của những thằng mà mình cần truyền vào hàm **sum(number)**, để sau đó mình có truyền lại thì nó chỉ cần lấy ra kết quả mà không cần phải tính lại.
* **If else trong sum()**: Thằng này sẽ check xem là nếu *tham số* truyền vào mà đã lưu trong thằng **cache** thì sẽ không tính toán nữa mà chỉ cần *return* về kết quả thôi. Còn không thì tính toán và lưu vào **cache**.

```javascript
function memoized() {
    let cache = {};
    
    return function sum(number) {
        if (number in cache) {
            return cache[number]
        } else {
            cache[number] = number + 768;
            return cache[number];
        }
    }
}

const memoizedFunctionCall = memoized();

memoizedFunctionCall(2000) // Output: 2789 | Cần tính toán vì chưa cache
memoizedFunctionCall(2000) // Output: 2789 | giá trị này đã cache nên không cần tính toán lại
```

Như vậy bạn có thể hiểu hơn chưa, nếu chưa thì mình làm thêm một ví dụ nữa nhé!

## 2. Ví dụ 2
Mình sẽ tạo một hàm sử dụng **recursive**, hàm này sẽ chạy liên tục đến khi *param* truyền vào là **<= 1**. Bạn có thể tìm hiểu về **recursive** tại [đây](https://javascript.info/recursion).

```javascript
function FibSequence(n) {
    if (n <= 1) {
        return 1;
    } else {
        return FibSequence(n - 1) + FibSequence(n - 2);
    }
}
FibSequence(5) // Output: 8
```

Bạn có thể thấy ở đoạn code trên hàm **FibSequence()** sẽ chạy liên tục đến khi nào **n <= 1** có nghĩa là sẽ chạy *FibSequence(n - 1)* rồi *FibSequence(n - 2)*, vậy độ phức tạp của nó sẽ là **O(n^2)** (thực ra mình cũng không rành về cái này, chỉ hiểu là nó phức tạp, phiền phức  :))) => Hiệu suất không tốt.

Vậy không tốt chổ nào nhỉ?

```javascript
FibSequence(5) calls FibSequence(4) and FibSequence(3)
FibSequence(4) calls FibSequence(3) and FibSequence(2)
FibSequence(3) calls FibSequence(2) and FibSequence(1)

// Nó sẽ call những lần như sau
FibSequence(5)
FibSequence(4)
FibSequence(3)
FibSequence(3) // Thằng này lặp lại rồi nè
FibSequence(2)
FibSequence(2) // Thằng này nữa
FibSequence(1)
```

Vậy mình sẽ sửa lại đoạn code trên thành:

```javascript
function memoized(n, cache) {
  cache = cache ? cache : {};

  if (cache[n]) {
    return cache[n];
  }

  if (n < 2) {
    return 1;
  } else {
    cache[n] = memoized(n - 1, cache) + memoized(n - 2, cache);
    return cache[n];
  }
}

memoized(5) // Outputs 8
```

Như vậy thì nhìn đẹp hơn phải hông nào, các bạn có thể thấy ở 2 ví dụ mình có khai báo biến **Object** để lưu dạng *keys values* để có thể **cache** giá trị vào. Kỹ thuật này cũng đơn giản phải hông nè, à còn **Closure** nữa các bạn tự tìm hiểu thêm nhé.

Chúc các bạn năm mới vv, hp và nhiều thành công hơn nha, xin cảm ơn <3