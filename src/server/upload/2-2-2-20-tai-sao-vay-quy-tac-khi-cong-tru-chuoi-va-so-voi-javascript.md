![](https://res.cloudinary.com/practicaldev/image/fetch/s--ij_hqKUb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://github.com/damiancipolat/js_vs_memes/blob/master/doc/mind_js.jpg%3Fraw%3Dtrue)

# Mở đầu
Các phép cộng trự nhân chia trong lập trình khá quan trọng, ngoài nhưng cái phép cộng trự basic thì nó còn có những phép tính rất khó như các chuỗi + với number. Cùng tìm hiểu một lần cho cuộc sống đỡ bế tắc nhé!.

Nếu đọc tiêu đề của bài này mà trong đầu các bạn nghĩ ngay là phép tình này bình thường mà có gì đâu mà lạ thì bạn có thể bỏ qua bài viết này . Còn nếu ngược lại thì cùng mình tìm hiểu xem tại sao lại như thế nhé!

Ở bài này mình chỉ thực hiện với các số nguyên thôi nhé. Tính toán với các số thực mình xin phép để phần sau.

Các bạn có thể Ctrl + Shift + i ngay tại bài viết này để thực hiện phép tình cộng trừ vời mình nhé !
# Phép cộng
## Number + Number = Number
```js
console.log( 1 + 1 ) // 2
```
Chắc cái này ai cũng biết rồi. Đơn giản là cộng 2 số vào nhau thôi. 

## String + String = String

```js
console.log( '1' + '1' ) // '11'
```

Đây là phép nối chuỗi thông thường. Không có gì đặc biệt cả.

## String + Number = String

```js
console.log( '10' + 10 ) // '1010'
```

Trong js nếu bạn cộng chuỗi với số thì js sẽ chuyển số thành chuỗi và thực hiện phép nỗi chuỗi như bình thường vì vậy kết quả sẽ ra 1 chuỗi.

## Number  + Number + String = String
```js
console.log( 10 + 10 + '10' ) // '2010'
```
Bạn có thắc mắc là sao kết quả là chuỗi '2010' . Do js sẽ thực hiện tính toán từ trái qua phải . và áp dụng các quy tắc trên. Lấy 10 + 10 = 20 . Rồi lấy 20 cộng chuỗi với '10' nên kq là 2010

Đối với trường hợp:
```js
console.log( 10 + (10 + '10') ) // '101010'
```

Do js sẽ thực hiện phép tính trong ngoặc trước. và cũng áp dụng các quy tắc trên

> Như vậy mình có thể thấy nếu cộng chuỗi cho số. thì js sẽ biến đổi số của mình thành chuỗi rồi sau đó cộng chuỗi như bình thường. Và cũng thực hiện từ trái qua phải trong ngoặc trước ngoài ngoặc sau.
# Phép trừ

## Number - Number = Number
```js
console.log( 1 - 1 ) // 0
```

Cái này thì bình thường rồi.

## String - String = ???
```js
console.log( 'viblo' - 'asia' ) // NaN (Not a Number)
```

Với ví dụ này thì js đã cố gắng chuyển chuỗi 'viblo' về số nhưng không thể chuyển được nên kq sẽ là NaN.

Tiếp đến ta xét 1 trường hợp nữa:

```js
console.log( '123' - '12' ) // 111
```

Js đã chuyển 2 chuỗi kia về số và tiến hành trừ cho nhau nên kq ra 1 số.

## String - Number = ???

```js
console.log( 123 - '12' ) // 111
```

Tương tự như vậy Js đã chuyển chuỗi '12' thành số 12 và tiến hành thực hiện phép tính 123 - 12 = 111.

> Trong js nếu trong phép trừ mà có xuất hiện chuỗi thì nó sẽ cố gắng chuyển chuỗi đó thành số và thực hiện phép tính như bình thường còn nếu không chuyển được thì kết quả sẽ là NaN

# Mix cộng trừ
Nếu các bạn đã nắm dõ các quy tắc trên thì đến đây phép tính ở tiêu đề sẽ không là khó được bạn:

```js
console.log('2' + '2' - '2') // 20
```

Áp dụng các quy tắc nói ở trên thì js sẽ lần lượt thực hiện phép tình từ trái qua phải. 

Đầu tiên sẽ lấy '2' + '2'  = '22' // Đây là phép cộng chuỗi
Tiếp theo sẽ lấy '22' - '2' = 20 // Như đã nói ở trên thì js sẽ cố gắng chuyển '22'  và '2' thành số 22  và 2 rồi từ đi nhau và kết quả sẽ là số 20. Đơn giản phải không nào
# Kết luận
Qua bài này các bạn chỉ cần nhớ:

> Nếu cộng chuỗi cho số. thì js sẽ biến đổi số của mình thành chuỗi rồi sau đó cộng chuỗi như bình thường. Và cũng thực hiện từ trái qua phải trong ngoặc trước ngoài ngoặc sau.
> 
> Trong js nếu trong phép trừ mà có xuất hiện chuỗi thì nó sẽ cố gắng chuyển chuỗi đó thành số và thực hiện phép tính như bình thường còn nếu không chuyển được thì kết quả sẽ là NaN

Ở bài sau mình sẽ tìm hiểu về cộng trừ nhân chia số thực nhé! 

Blog: https://phamtuananh1996.github.io/

Đừng quên để lại 1 like, comment và sub kênh, ấn thông báo để nhận được các bài viết từ mình nhé.

Chào thân ái và quyết thắng !