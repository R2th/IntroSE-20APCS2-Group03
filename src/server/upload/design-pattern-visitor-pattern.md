# Design Pattern - Visitor Pattern
Visitor Pattern là một trong những design pattern thuộc nhóm Behavior Pattern - Mặc dù ít được nhắc tới trong các tài liệu về design pattern nhưng đây cũng là 1 pattern khá quan trọng trong lĩnh vực lập trình. Chúng ta hãy cùng nhau đi tìm hiểu nó nhé!!!

![](https://images.viblo.asia/5a7e39f5-8fc9-450e-9668-a7c4b4b1eda6.png)

Nội dung: Vẫn sẽ như bài trước chúng ta sẽ đi theo 3 phần chính:

+ Tổng quan về Visitor Pattern
+ Cách sử dụng Visitor Pattern
+ Ứng dụng của Visitor Pattern trong lập trình IOS

## Tổng quan về Visitor Pattern
Visitor Pattern là pattern cho phép định nghĩa thêm phép toán mới tác động lên các phần tử của một cấu trúc đối tượng mà không cần thay đổi các lớp định nghĩa cấu trúc đó. 
Để đạt được điều này, trong Visitor Pattern ta định nghĩa các thao tác trên các lớp tách biệt gọi các lớp visitors, các lớp này cho phép tách rời các thao tác với các đối tượng mà nó tác động đến. Với mỗi thao tác được thêm vào, một lớp visitor tương ứng được tạo ra.
Đây là một kỹ thuật giúp chúng ta phục hồi lại kiểu dữ liệu bị mất. Nó thực hiện đúng thao tác dựa trên tên của phương thức, kiểu của cả đối tượng gọi và kiểu của đối số truyền vào.

Các thành phần cơ bản của Visitor Pattern: 
![](https://images.viblo.asia/fdf5a978-ca78-4447-b451-bf178b91a1e0.png)

Trong đó thì:

**Visitor**: Là một protocol(interface) bao gồm các phương thức và nhận đầu vào là các element. Các phương thức có thể cùng tên nhưng tham số đầu vào phải khác nhau.

**ConcreteVisitor**:  Triển khai tất cả các phương thức đã khai báo trong Visitor. Mỗi visitor sẽ chịu trách nhiệm cho các hành vi khác nhau của đối tượng.

**Element**:  Cũng là một protocol(interface) khai báo phương thức với đối số là visitor.

**ConcreteElement**:  Triển khai phương thức đã được khai báo trong Element dựa vào đối số visitor được cung cấp.

Định nghĩa và sơ đồ vẫn khá khó hiểu phải không ạ?. Chúng ta sẽ đi vào ví dụ để hiểu rõ hơn về cách thức hoạt động và tổng kết lại nhé:

## Cách sử dụng Visitor Pattern
Lấy một ví dụ cụ thể có thể nói nó khá là quen thuộc với mọi người dù không thuộc tổ nghề nữa =)))

Ví dụ: Người già và người trẻ đều có thể chặt gỗ được nhưng khả năng chặt được là khác nhau.
chúng ta sẽ xây dựng hai protocol là **Human** và **Wood**
```Swift
protocol Human {
    func cut(wood: Wood)
}

Protocol Wood {
    func woodWereCut(value: Int)
}
```

Từ đó chúng ta tạo 2 đối tượng implement **Human** là **YoungPeople** và **OldPeople** và triển khai các phương thức của 2 lớp này và thêm 1 class **NormalWood** để định nghĩa cho loại gỗ trung bình và thử khởi tạo xong chạy thử:

```Swift
Class YoungPeople: Human {
    func cut(wood: Wood){ 
        wood.woodWereCut(value: 5)
    }
}

Class OldPeople: Human {
    func cut(wood: Wood) { 
        wood.woodWereCut(value: 1)
    }
}

Class NormalWood: Wood {
    func woodWereCut(value: Int) {
        print("cut \(value)")
    }
}

let wood = NormalWood()
let youngPeople = YoungPeople()
let oldPeople = OldPeople()
youngPeople.cut(wood: wood)
oldPeople.cut(wood: wood)
```

kết quả nhận được sẽ là
> cut 5
> 
> cut 1

Tiểp theo chúng ta sẽ tạo một loại gỗ nữa là loại gỗ khó chặt hơn nhưng dựa vào khéo léo có thể được nhiều hơn nên số gỗ chặt được của người già và người trẻ đều thay đổi đó là **DifficultWood** chính vì thế chúng ta cần update lại protocol của Wood để phù hợp với việc này. 

```Swift
Protocol Wood {
    func woodWereCut(value: Int)
    func woodWereCut(by: OldPeople)
    func woodWereCut(by: YoungPeople)
}
```

và triển khai các class sau đó chạy thử:

```Swift
Class YoungPeople: Human {
    func cut(wood: Wood){ 
        wood.woodWereCut(by: Self)
    }
}

Class OldPeople: Human {
    func cut(wood: Wood) { 
        wood.woodWereCut(by: Self)
    }
}

Class NormalWood: Wood {
    func woodWereCut(value: Int) {
        print("cut \(value)")
    }
    
    func woodWereCut(by: OldPeople) {
        woodWereCut(value: 1)
   }
   
    func woodWereCut(by: YoungPeople) {
        woodWereCut(value: 5)
    }
}

Class DifficultWood: Wood {
    func woodWereCut(value: Int) {
        print("cut \(value)")
    }
    
    func woodWereCut(by: OldPeople) {
        woodWereCut(value: 4)
   }
   
    func woodWereCut(by: YoungPeople) {
        woodWereCut(value: 2)
    }
}

let wood = NormalWood()
let wood1 = DifficultWood()
let youngPeople = YoungPeople()
let oldPeople = OldPeople()
youngPeople.cut(wood: wood)
oldPeople.cut(wood: wood)
youngPeople.cut(wood: wood1)
oldPeople.cut(wood: wood1)
```

và kết quả là

>cut 5
> 
>cut 1
> 
>cut 2
> 
>cut 4

Từ ví dụ trên chúng ta có thể thấy được là 2 protocol **Human** và **Wood** đóng vai trò là **visitor** và **element**
còn **YoungPeople**, **OldPeople** là **ConcreteVisitor**, **NormalWood** và **DifficultWood** đóng vai trò là **ConcreteElement**

Có thể thấy, việc thêm một Wood mới rất đơn giản, chỉ cần implement các method của Wood thôi. Trong khi, nếu thêm Human thì ta phải thay đổi cả interface Wood và cập nhật các class implement của Wood.
Chính vì vậy, tùy vào trường hợp cụ thể, xem các đối tượng thuộc loại nào hay bị thay đổi mà cài đặt Visitor Patern cho phù hợp.

Nhìn chung có thể hiểu là Visitor Pattern cho phép một hoặc nhiều hành vi được áp dụng cho một tập hợp các đối tượng tại thời điểm run-time, tách rời các hành vi khỏi cấu trúc đối tượng.
Đảm bảo nguyên tắc Open/ Close: đối tượng gốc không bị thay đổi, dễ dàng thêm hành vi mới cho đối tượng thông qua visitor.


## Ứng dụng của Visitor Pattern trong lập trình IOS
Vẫn như những bài trước thì mỗi pattern đều có ứng dụng riêng của nó. Trong lập trình ios, Visitor Pattern có thể được sử dụng khá nhiều trong nhiều trường hợp ví dụ như khi xử lí chiều cao cho cell nếu trường hợp cell phụ thuộc vào 1 số điều kiện bên ngoài như là chiều cao cell sẽ được tính theo các cách khác nhau cho các bảng khác nhau. Thế nên sẽ thật pefect nếu áp dụng Visitor Pattern vào đó đúng không ạ.

Chúc các bạn thành công!!!

### Tham khảo:
https://gpcoder.com/4813-huong-dan-java-design-pattern-visitor/

https://medium.com/@lazarevzubov/visitor-design-pattern-in-ios-and-swift-universe-e7a953341a6f