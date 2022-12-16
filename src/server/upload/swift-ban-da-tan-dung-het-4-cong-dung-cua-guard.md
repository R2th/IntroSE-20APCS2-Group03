**guard** là một cú pháp rất quen thuộc với Swift developer, nhưng liệu bạn đã sử dụng hết các công dụng của cú pháp hữu ích này chưa? Dưới đây là 4 công dụng phổ biến nhất của **guard**, chúng ta cùng xem nhé.

**Đầu tiên**, **guard** được sử dụng để **return sớm**. Điều này có nghĩa là trong một function, khi điều kiện (precondition) mà bạn đưa ra không được thoả mãn, thì bạn có thể exit ra khỏi function đó ngay lập tức. 

Ví dụ, chúng ta có thể viết một function như sau, function này làm nhiệm vụ trao giải thưởng cho 1 người nào đó:

```swift
func giveAwardTo(name: String) {
    guard name == "Taylor Swift" else {
        print("No way!")
        return 
    }
    print("Congratulations, \(name)!") 
}

giveAwardTo("Taylor Swift")
```

Chúng ta có thể thấy hàm này hơi thiên vị một tí, khi chỉ Taylor Swift mới được nhận giải, nhưng thôi kệ. **guard** đảm bảo được rằng chỉ khi điều kiện này thỏa mãn thì hàm này mới chạy. 

Thêm vào đó, sử dụng **guard** còn có một lợi thế lớn so với việc dùng **if**: Nó giúp mục đích của chúng ta trở nên rõ ràng.

Hàm này **return sớm**, nghĩa là chúng ta muốn exit khỏi hàm nếu như precondition không được thỏa mãn. Sử dụng **guard** làm nổi bật vai trò của precondition, như thể chúng ta muốn nói “precondition này không phải là một phần chức năng của hàm này, nó chỉ có mặt ở đấy để đảm bảo các dòng code sau đó có thể yên tâm chạy mà thôi”.


**Chức năng thứ 2** của **guard** là một "tác dụng phụ" của chức năng đầu tiên: **giảm mức độ indent** (lùi đầu dòng) cho đoạn code. 

Giả sử chúng ta sử dụng **if** thay vì **guard**, hàm trên sẽ phải viết như sau:

```swift
func giveAwardTo(name: String) -> String { 
    let message: String
    
    if name == "Taylor Swift" {
        message = "Congratulations, \(name)!"
    } else {
        message = "No way!"
    }
    
    return message
}

giveAwardTo("Taylor Swift")
```

Rõ ràng dùng **guard** giúp code gọn gàng sạch đẹp hơn nhiều.

**Công dụng thứ ba** của guard là trải ra một **con đường hạnh phúc** cho đoạn code của chúng ta.

Con đường hạnh phúc (happy path) là một khái niệm phổ biến trong Software design and testing. Khái niệm này dùng để chỉ con đường (path) mà đoạn code của bạn sẽ đi khi không có exception hay error xảy ra. Nhờ có guard, các loại error sẽ được xử lý trước, và phần còn lại của đoạn code sẽ hoàn toàn nằm trên "con đường hạnh phúc".

Ví dụ, chúng ta có một hàm sau:
```swift
func getUserInfo(username: String?, email: String?, password: String?) {
    if let username = username, username != "" {  
        if let email = email, email != "" {
            if let password = password, password != "" {
                print("username: \username, "email: \email, password: \password")
            }
        }
    }
    // error handling here ...
}
```

Ta có thể thấy đoạn code trên rất khó đọc khi bị nested quá nhiều. Để biết được mục đích của hàm này, chúng ta phải đi vào tận trong cùng của các đoạn **if** bị lồng vào nhau kia.

Nếu sử dụng **guard**, phần error sẽ được sử lý trước. Sau khi thoả mãn hết các precondition, đoạn code sẽ chạy thẳng băng trên “con đường hạnh phúc”, và mục đích của hàm này trở nên rõ ràng:

```swift
guard let username = usernameField.text else {  
  throw SignupError.NoUsername
}

guard let email = emailField.text else {  
  throw SignupError.NoEmail
}

guard let password = passwordField.text else {  
  throw SignupError.NoPassword
}

print("username: \(username), email: \(email), password: \(password)")
```

**Công dụng cuối cùng** của guard cũng rất quan trọng. Công dụng này liên quan đến sự khác nhau giữa **guard** và **if**. Khi sử dụng guard để unwrap optional, giá trị đã được unwrap đó có thể được sử dụng trong toàn bộ scope của function, thay vì chỉ dùng được trong nội bộ đoạn if như khi sử dụng **if**.

Để cụ thể hơn, mình sẽ viết lại hàm giveAwardTo(), trong đó thay vì nhận vào một String, nó sẽ nhận vào một optional String.
```swift
func giveAwardTo(name: String?) { 
    guard let winner = name else {
        print("No one won the award")
        return 
    }
    print("Congratulations, \(winner)!") 
}
```

Nếu sử dụng **if-let**, biến **winner** sẽ chỉ có thể được sử dụng ở trong nội bộ đoạn **if** (trong dấu ngoặc {} của đoạn if đó), nhưng nếu dùng **guard**, toàn bộ đoạn code phía sau (thuộc scope của hàm giveAwardTo()) có thể sử dụng giá trị của biến này.

Khi dùng **guard**, chúng ta như muốn yêu cầu Swift rằng "thử unwrap biến name và gán giá trị của nó cho biến winner để tôi sử dụng. Nếu không unwrap được thì print message và exit".

Trên đây là 4 công dụng của cú pháp **guard** trong Swift. Hi vọng bài viết sẽ có ích cho các bạn trong việc code hiệu quả hơn.