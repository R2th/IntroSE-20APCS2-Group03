**Mục tiêu nhắm tới trong bài viết này**: Dành cho các bạn mới tập tành bước vào con đường iOS

Trong bài viết này tôi sẽ không tập trung vào "guard let" mà sẽ tập trung vào cách sử dụng `return`  bên trong else của cú pháp "guard let".

```swift
guard let myName = nameReceived else {
  return
}
```
Đây là một ví dụ thường thấy của một lập trình viên iOS phải chứng kiến hằng ngày để kiểm tra giá trị của value là nil hay không và nếu nó nil thì chúng ta sẽ quản lý việc đó ở trong scope else.
![](https://images.viblo.asia/d6ad499f-cad2-4cc1-a4f5-ec850b7a3630.jpeg)

### Vậy thì lúc nào chúng ta cũng phải "return" trong vòng else ?
Thông thường thì các bạn mới vào thường có một suy nghĩ đó là khi gọi `guard let` thì luôn phải có **return** trong vòng else, vụ này cũng là một trong những sự khác nhau giữa nó và `if let `

Thực tế thì chúng ta có khá nhiều sự lựa chọn ngoài **return** trong trường hợp này. Chúng ta có thể dùng **throw** (muốn tìm hiểu thêm thì [link](https://medium.com/@abhimuralidharan/error-handling-in-swift-d0a618499910) đây), trong vòng else thì chúng ta còn có thể dùng continue hoặc break dựa trên các trường hợp khác nhau nữa đấy.

Chúng ta cùng đi qua vài ví dụ để hiểu thêm nhé:

Trong trường hợp này chúng ta sẽ chạy vòng lặp qua một mãng string optional và có giá trị ở vị trí thứ 3 là nil nhé.

```swift
let names: [String?] = ["Mumtaz", "Hussain", nil, "Khatri"]
```

### Example 1: Continue
```swift
func printMyNames(names: [String?]) {
  for i in 0..<names.count {
    guard let myName = names[i] else {
      print("error: name is not found")
      continue
    }
    print(myName)
  }
  print("End of For Loop")
}
```

Chúng ta để ý thì sẽ thấy **continue** sẽ được dùng trong vòng else chứ không phải **return**. Và trong trường hợp này thì chúng ta sẽ hiểu nó hoạt động theo kiểu: bỏ qua giá trị nil trong vòng lặp và tiếp tục duyệt phần tử tiếp theo. Đúng vậy **continue** chính là việc **tiếp tục vòng lặp ở phần tử kế tiếp và bỏ qua giá trị phần tử hiện tại**

**Continue**  chỉ thực hiện việc bỏ qua một phần chứ không phải là ra khỏi toàn bộ vòng lặp. Bây giờ chúng ta thử gọi func printMyNames thì chúng ta sẽ có output được in ra là:

```markdown
Mumtaz
Hussain
error: name is not found
Khatri
End of For Loop
```
Khatri được in ra mặc dù có giá trị nil nằm trước đó bởi vì chúng ta dùng **continue** ấy. 

Chúng ta còn để ý là dòng "Notice End of For Loop" được in nghĩa là chúng ta đã duyệt vòng lặp thành công mà không có bất kì crash. :D quá đã.

### Example 2: Break

```swift
func printMyNames(names: [String?]) {
  for i in 0..<names.count {
    guard let myName = names[i] else {
      print("error: name is not found")
      break
    }
    print(myName)
  }
  print("End of For Loop")
}
```

**Break** chính là việc bạn sẽ thoát khỏi vòng lặp và không duyệt phần tử nào sau đó nữa nếu như chúng ta gặp break. Trong trường hợp này, break sẽ được gọi khi chúng ta gặp một gia trị nil (ở ngày vòng lặp thứ 3 khi i = 2). Giá trị kết quả trả về sẽ là:

```markdown
Mumtaz
Hussain
error: name is not found
End of For Loop
```

Để ý sẽ thấy là Khatri đã không được in ra bởi vì vòng lặp đã kết thúc ngay khi chúng ta gặp break.

### Example 3: Return
```swift
func printMyNames(names: [String?]) {
  for i in 0..<names.count {
    guard let myName = names[i] else {
      print("error: name is not found")
      return
    }
    print(myName)
  }
  print("End of For Loop")
}
```

Ở đây chúng ta hãy làm rõ **return** nó hoạt động khác gì so với các keywords khác trong vòng lặp. Return không những break vòng lặp mà nó còn thoát ra khỏi function ngay lặp tức. Chúng ta cùng xem thử kết quả:

```css
Mumtaz
Hussain
error: name is not found
```

`Khatri` và `End of For Loop` đã không được in ra, bởi vì return nó đã thoát khỏi function mất rồi thay vì sau khi thoát vòng lặp nó in thêm` End of For Loop `.

### Summary

Dựa trên các viễn cảnh ở trên, chúng ta có thể dùng các keywords **continue**, **break** và **return** trong vòng else của `guard let` thay vì dùng mỗi return đấy :D.

-----

Bài dịch của mình tới đây là hết. Mình cám ơn vì đã theo dõi.

Các bạn có thể xem bài gốc ở đây: [That “return” keyword in guard let statement in Swift](https://medium.com/flawless-app-stories/that-return-keyword-in-guard-let-statement-in-swift-eeacf88f6270)