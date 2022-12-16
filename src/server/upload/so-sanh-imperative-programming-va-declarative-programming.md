# I. Giới thiệu

Trong quá trình làm việc, chắc hẳn đã nhiều lần chúng ta thấy nhắc đến khái niệm imperative programming (lập trình mệnh lệnh) và declarative programming (lập trình khai báo). Tuy nhiên, liệu các bạn có chắc chắn được câu trả lời cho các câu hỏi: 2 loại lập trình này khác nhau chỗ nào? code mình viết ra là lập trình loại nào?… bài viết này sẽ giúp bạn tự tin hơn khi trả lời cho các câu hỏi trên.

# II. Nội dung

## 1. Định nghĩa

### a. imperative programming

Định nghĩa imperative programming từ wikipedia:

```imperative programming is a programming paradigm that uses statements that change a program's state. In much the same way that the imperative mood in natural languages expresses commands, an imperative program consists of commands for the computer to perform. Imperative programming focuses on describing how a program operates.```

Định nghĩa thì lúc nào cũng trừu tượng và khó hiểu. Chúng ta hãy chú ý vào câu cuối cùng của định nghĩa, trong lập trình mệnh lệnh (imperative programming) chúng ta tập chung vào mô tả cách chương trình hoạt động.

### b. declarative programming

Định nghĩa declarative programming từ wikipedia:

```Declarative programming is a programming paradigm—a style of building the structure and elements of computer programs—that expresses the logic of a computation without describing its control flow.```

Tức là, kiểu lập trình khai báo sẽ thể hiện logic của chương trình mà không mô tả cách chương trình hoạt động (??)

Cũng vẫn là trừu tượng và khó hiểu. Đọc xong 2 cái định nghĩa trên vẫn chẳng thể hiểu và phân biệt được 2 kiểu lập trình.

## 2. Phân biệt imperative và declarative programming

Bây giờ, tôi xin trích lại một số ví dụ trực quan mà tôi đã đọc được [ở đây](https://ui.dev/imperative-vs-declarative-programming/) để phân biệt 2 loại lập trình trên.

### Ví dụ 1: 
Hôm nay bạn hẹn bạn gái đi ăn tối tại nhà hàng. Khi đến nhà hàng, bạn muốn đặt bàn ăn, sẽ có 2 cách nói chuyện với lễ tân để đặt bàn:

* Cách tiếp cận bắt buộc (imperative): “Tôi thấy trước cửa ra vào, gần cửa sổ có 1 bàn trống, chúng tôi sẽ qua đó ngồi“

* Cách tiếp cận khai báo (declarative): “vui lòng bàn cho 2 người”

Dễ thấy trong ví dụ trên, với cách tiếp cận bắt buộc, chúng ta sẽ nêu rõ ràng (từng step) để có bàn cho mình. Còn với cách tiếp cận khai báo, các bạn chỉ quan tâm đến cái bàn, hơn là cách làm sao bạn có được bàn đó.

Cách tiếp cận imperative liên quan đến cách bạn có được bàn ăn, còn declarative quan tâm nhiều hơn đến cái gì (cái bàn) bạn muốn.

### Ví dụ 2:

Bố của bạn lên Hà Nội thăm bạn, và vừa xuống bến xe Mĩ Đình. 
“Bố vừa xuống bến xe Mĩ Đình, bây giờ làm thế nào để bố đến chỗ con?”

Cách tiếp cận bắt buộc (imperative):
- “Bố ra cổng bến xe, đi thẳng khoảng 2km sẽ thấy ngã 4, đi qua ngã tư 100m thì rẽ phải, đi thêm 500m nữa thì rẽ trái, đi 100m nữa thì nhìn bên tay phải, nhà con là nhà sơn màu tím mộng mơ”

Cách tiếp cận khai báo (declarative):
- “Địa chỉ nhà con là số 123, khu đô thị Mễ Trì Hạ, Nam Từ Liêm, Hà Nội ạ”

Với cả 2 cách nói chuyện, thì ông bố cũng sẽ tìm đến được nhà người con. Sự khác biệt là ở chỗ với cách bắt buộc, thì bạn sẽ tập chung vào từng bước chỉ đường, còn với cách khai báo, bạn chỉ đưa địa chỉ, và giả định là người bố biết cách để đến địa chỉ đó

Qua 2 ví dụ trên, chúng ta đã có thể phân biệt được lập trình khai báo (declarative) và lập trình bắt buộc (imperative). Tuy nhiên cần lưu ý rằng, nhiều cách tiếp cận khai báo có loại lập trình bắt buộc trừu tượng. 
- Ví dụ đặt bàn ăn: chúng ta tiếp cận khai báo với giả định rằng người nhân viên lễ tân biết làm tất cả các bước để có được bàn cho mình
- Ví dụ hỏi đường: chúng ta tiếp cận khai báo với giả định rằng người bỗ sẽ biết các bước đi để đến được đúng địa chỉ mình đã cho.

## 3. Phân biệt imperative và declarative programming qua sample code

Dưới đây tôi sẽ lấy ví dụ về đoạn code tạo function lấy array số chẵn từ array cho trước. Với imperative programming:

```Swift
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// imperative programming
func getEvensImperative(array: [Int]) -> [Int] {
    var result = [Int]()
    for i in array {
        if i % 2 == 0 {
            result.append(i)
        }
    }
    
    return result
}

getEvensImperative(array: array)

```

có 3 điểm dễ thấy với đoạn code kiểu imperative programming bên trên: 
* 1: Đoạn code mô tả làm thể nào (HOW) để thực hiện: chạy lặp qua mảng, lấy từng số chẵn vào kết quả
* 2: Giá trị của result thay đổi liên tục. Mỗi lần tìm thấy thêm 1 số chẵn, chúng ta lại thay đổi giá trị của biến result
* 3: Mã khó nắm bắt nhanh. Thật ra đoạn code này đơn giản, nên nhìn cái chúng ta biết ngay, chứ giả sử đoạn code dài hơn, logic nhiều và phức tạp hơn, thì chúng ta buộc phải đọc hết toàn bộ code để biết chương trình đang làm cái gì.

Bây giờ với declarative programming
```Swift
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// declarative programming
func getEvensDeclarative(array: [Int]) -> [Int] {
    return array.filter { $0 % 2 == 0 }
}

getEvensDeclarative(array: array)
```

Code bên trên:
* 1: chúng ta tập chung vào kết quả mình muốn (WHAT), chứ không chỉ cụ thể từng bước chương trình chạy. Chúng ta không cần biết hàm filter hoạt động như thế nào, chỉ cần có kết quả là được. 
* 2: Không có biến nào bị thay đổi trạng thái, các thay đổi đều diễn ra trong hàm filter, nên bên trong function của chúng ta không hề có sự thay đổi trạng thái
* 3: Đoạn code dễ nắm bắt hơn. Trong trường hợp này code đơn giản, nên 2 cách dễ đọc như nhau, nhưng trong các hàm phức tạp, thì cách này chắc chắn dễ nắm bắt hơn, hiểu nhanh hơn đoạn code đang làm cái gì.

## 4. Ích lợi của mỗi loại imperative và declarative programming

### a. imperative programming

* Quen thuộc
* Dễ học
* Dễ hiểu

Đây là cách lập trình đã quen thuộc với tất cả chúng ta. Ngay từ những ngày đầu học lập trình, chúng ta đã được học imperative programming. Các dòng code trong imperative programming mô tả cách thực hiện, nên dễ học và dễ hiểu, phù hợp với những người mới làm quen với lập trình

### b. declarative programming

* Hạn chế sự thay đổi
* Giảm thiểu side-effects
* Code ngắn hơn, dễ hiểu hơn
* Dễ dàng mở rộng

Dễ hiểu hơn của declarative programming ý là dễ hiểu code của cả function hơn, do không phải viết hết các step như imperative programming, nên chương trình sẽ ngắn hơn và ngắn thì lúc nào đọc cũng dễ hiểu hơn mà, nhỉ.

# III. Kết luận

Trên đây, chúng ta đã cùng nhau tìm hiểu về sự khác nhau giữa imperative programming và declarative programming. Mặc dù declarative programming sẽ khó viết hơn, nhưng mà với những ích lợi mà nó mang lại, rất đáng để cho chúng ta sử dụng. Vì thế nếu bạn vẫn viết code theo kiểu imperative programming, thì lời khuyên của tôi là nên học dần và chuyển qua declarative programming đi nhá, người ta đang học và dùng hết cả rồi đó. 

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day :)

Nguồn tham khảo: https://ui.dev/imperative-vs-declarative-programming/