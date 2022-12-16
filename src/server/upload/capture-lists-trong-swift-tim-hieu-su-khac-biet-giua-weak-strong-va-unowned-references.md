### Giới thiệu
Như bạn đã biết, capture list được đặt ở trước danh sách parameter của một closure. Và giá trị của capture có thể là strong, weak hoặc unowned. Dường như mọi người đều sử dụng nó rất nhiều, chủ yếu nhằm tránh rơi vào vòng lặp của strong reference hay còn được gọi là retain cycles. Tuy nhiên khi mới bắt đầu, ta thường không biết nên sử dụng cái nào thì hợp lý, vì vậy, việc tìm hiểu sự khác nhau giữa strong, weak và unowned sẽ giúp ta có được quyết định đúng đắn. 

Bây giờ hãy cùng điểm qua vấn đề mà ta sẽ đưa ra. Dưới đây là một class đơn giản với một phương thức:
```
class Kid {
    func eating() {
        print("Baby is eating")
    }
}
```

Bây giờ, hãy tạo ra một function, trong đó khởi tạo một instance của class Kid, đồng thời tạo một closure để gọi đến function eating(), rồi trả về closure này để sử dụng ở một nơi khác.
```
func eat() -> () -> Void {
    let moon = Kid()
    let eating = {
        moon.eating()
        return
    }
    return eating
}
```

Sau đó, ta có thể gọi eat() để nhận lại phương thức mà ta có thể gọi đến bất cứ khi nào ta muốn eating() được in ra.
```
let eatFood = eat()
eatFood()
```

Đoạn code trên sẽ in ra "Baby is eating".

### Strong capturing
Trừ khi ta chỉ định những giá trị đặc biệt, Swift sẽ luôn sử dụng giá trị mặc định là strong capturing. Điều này đồng nghĩa với việc closure sẽ được capture với bất cứ external value nào được sử dụng bên trong thân của closure, và đảm bảo rằng chúng sẽ không bao giờ bị phá huỷ.

Hãy cùng nhìn lại func eat() mà ta đã khai báo ở trên:
```
func eat() -> () -> Void {
    let moon = Kid()
    let eating = {
        moon.eating()
        return
    }
    return eating
}
```

Instance "moon" mà ta tạo nằm bên trong function eat(), theo thường lệ, nó sẽ được huỷ khi function kết thúc. Tuy nhiên, bởi nó được sử dụng bên trong closure, nên Swift sẽ tự động giữ cho instance này luôn tồn tại chừng nào closure còn tồn tại, ngay cả khi function đã return.

Đây chính là strong capturing. Nếu Swift cho phép nó được huỷ, thì closure trên sẽ không còn an toàn để gọi tới, vì vậy moon.eating() sẽ không còn hợp lệ nữa.

### Weak capturing
Khi set weak capturing, value sẽ không được giữ lại bởi closure, nó sẽ bị huỷ và set về nil. Vì vậy, những giá trị sử dụng weak capturing luôn là optional trong Swift. Hãy chỉnh lại ví dụ trên bằng weak capturing để xem sự khác biệt:

```
func eat() -> () -> Void {
    let moon = Kid()
    let eating = { [weak moon] in
        moon?.eating()
        return
    }
    return eating
}
```
Như vậy, [weak moon] là capture list, nó cũng là một phần của closure mà ta đã chỉ định là weak capturing. Và moon?.eating() bây giờ là một optional, nó có thể được set nil bất cứ lúc nào. Lúc này nếu bạn gọi eatFood(), nó sẽ không in ra giá trị gì, bởi moon chỉ tồn tại bên trong eat(), closure nó trả về không giữ strong reference tới nó.

Để hiểu rõ hành động này, hãy thử thay đổi như sau:

```
func eat() -> () -> Void {
    let moon = Kid()
    let eating = { [weak moon] in
        moon!.eating()
        return
    }
    return eating
}
```
Khi ta force unwraps instance moon bên trong closure, nó sẽ khiến đoạn code bị crash vì moon bị nil.

### Unowned capturing
Unowned capturing có thể thay thế cho weak, nó giống như unwrapped optionals ngầm. Cũng giống như weak capturing, unowned capturing cho phép các giá trị bị nil tại bất cứ thời điểm nào trong tương lai. Tuy nhiên, ta có thể làm việc với chúng chừng nào chúng vẫn còn ở đó, và ta không cần phải unwrap optional. Hãy cùng xem ví dụ sau:

```
func eat() -> () -> Void {
    let moon = Kid()
    let eating = { [unowned moon] in
        moon.eating()
        return
    }
    return eating
}
```
Đoạn code trên vẫn sẽ crash như cách mà ta force unwrapped ở trên, unowned moon báo hiệu rằng nó biết chắc rằng moon sẽ luôn tồn tại trong suốt lifetime của closure mà nó trả về, vì thế nó không cần phải giữ reference trong memory, nhưng thực tế moon này sẽ bị huỷ ngay lập tức, dẫn đến đoạn code bị crash. Vì vậy ta cần nắm kỹ về unowned khi sử dụng để tránh gặp phải những lỗi không mong muốn.

### Những sai lầm phổ biến
Thông thường ta hay mắc phải các sai lầm sau đây khi làm việc với closure capturing:

- Không biết nên đặt capture list ở đâu khi closure có parameter
- Tạo ra strong reference cycle, dẫn đến memory bị leak
- Ta vô tình sử dụng strong references, đặc biệt khi sử dụng nhiều capture
- Tạo ra bản copy của closure và chia sẻ captured data

### Kết luận
Nếu ta biết chắc captured value của mình sẽ không bao giờ biến mất bất cứ khi nào closure được gọi, thì ta có thể sử dụng unowned. Điều này thật sự chỉ dành cho một số ít lần khi weak có thể gây ra phiền toái khi sử dụng, thậm chí ngay khi ta có thể sử dụng guard let bên trong closure với một biến weak capture.

Nếu ta gặp phải tình huống strong reference cycle, thì một trong hai phải sử dụng weak capturing. 

Nếu ta đảm bảo rằng strong reference cycle sẽ không bao giờ xảy ra thì ta hoàn toàn có thể sử dụng strong capturing. Ví dụ, việc thực thi animation sẽ không làm self bị retain bên trong animation closure, vì thế strong capturing an toàn để sử dụng.

Tuy nhiên nếu ta không biết chắc nên sử dụng cái nào, thì hãy bắt đầu bằng weak và chỉ thay đổi khi nào cần thôi nhé.