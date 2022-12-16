Nguồn: https://medium.com/@abhimuralidharan/difference-between-value-type-and-a-reference-type-in-ios-swift-18cb5145ad7a

## Định nghĩa
***Value type***: mỗi instance giữ một bản sao duy nhất dữ liệu của nó. Nó sẽ tạo một instance mới (bản sao) khi được gán cho một biến, hoặc hằng, hoặc khi được truyền cho một hàm.

***Reference type***: mỗi instance chia sẻ một bản sao dữ liệu. Một kiểu mà khi được khởi tạo, khi được gán cho một biến hoặc hằng hoặc khi được truyền cho một hàm, sẽ trả về một tham chiếu đến cùng instance hiện có.

## Ví dụ
Xem đoạn mã sau:

```
class Home {
        var roomCount= 2
}

// 1
var peterVilla = Home()
// 2
var johnVilla = petterVilla

// 3
johnVilla.roomCount = 5

print("peterVilla room count = \(peterVilla.roomCount)")
print("johnVilla room count = \(johnVilla.roomCount)")
```

Kết quả được in ra như sau:

```
peterVilla room count = 5
johnVilla room count = 5
```

1. Class Home bên trên không có hàm khởi tạo, có một thuộc tính lưu trữ roomCount có giá trị default là 2. Tạo một instance peterVilla, peterVilla sẽ có roomCount là 2.
2. Tạo một object là johnVilla và gán nó bởi peterVilla. Bạn nghĩ roomCount của johnVilla là gì?Nó có giống với roomCount của peterVilla không?. Đúng rồi, nó là 2.
3. Thay đổi roomCount của johnVilla thành 5, sau đó in ra roomCount của cả 2 instance. Cả 2 sẽ in ra **5**.

=> Lý do: Class là reference type. Việc gán sẽ ngầm tạo ra một instance chia sẻ, hai biến sau đó tham chiếu đến một instance duy nhất của dữ liệu, do đó sửa đổi dữ liệu trong biến thứ hai cũng ảnh hưởng đến bản gốc.

**Chú ý**: Class là reference type, điều đó có nghĩa là biến của một loại Class không lưu trữ một instance thực tế, mà là một tham chiếu đến một vị trí trong bộ nhớ (heap) lưu trữ instance đó.

**Điều gì sẽ xảy ra nếu thay đổi định nghĩa từ var thành let trong đoạn code trên?**

=> Trả lời: không thay đổi output, roomCount vẫn sẽ là 5.Tại sao vậy??

=> Vì class là refrence type, sự khác biệt duy nhất giữa let và var là khả năng gán lại biến cho một class khác cùng loại. Các từ khóa let và var không ảnh hưởng đến khả năng thay đổi một biến trên một class.

Nhưng hãy xem đoạn code này:

```
let peterVilla = Home()
let johnVilla = peterVilla
let gracyVilla = peterVilla

johnVilla = gracyVilla // error: cannot assign to value:'johnVilla' is a 'let' constant
johnVilla = Home() //error: cannot assign to value: 'johnVilla' is a 'let' constant
```

Còn nếu johnVilla là var, thì có có thể thay đổi.

**Điều gì xảy ra nếu Home là một Struct???**

Xem đoạn code sau:

```
struct Home {
        var roomCount = 2
}

let peterVilla = Home()
let johnVilla = peterVilla

join.roomCount = 5 //error:cannot assign to property: 'johnVilla' is a 'let' constant
johnVilla = Home() //error: cannot assign to value: 'johnVilla' is a 'let' constant
```

Bởi vì Home là một struct, và johnVilla là một constant, chúng ta không thể thay đổi roomCount, cũng không thể gán lại johnVilla. 

=> Đối với kiểu value type, nếu chúng ta muốn gán lại đối tượng hoặc thay đổi biến bên trong đối tượng, thì nó phải được khai báo là 'var'.

Ví dụ:
```
var peterVilla = Home()
peterVilla.roomCount = 8 // roomCount changed from 2 to 8
var johnVilla = peterVilla // roomCount of john is 8
johnVilla = Home() // roomCount of john is 2: new instance
johnVilla.roomCOunt = 5 // roomCount changed from 2 to 8

print("peterVilla room count = \(peterVilla.roomCount)")
print("johnVilla room count = \(johnVilla.roomCount)")
```

Kết quả:
```
peterVilla room count = 8
johnVilla room count = 5
```

=> johnVilla là một instance độc lập với peterVilla, bạn thay đổi roomCount của johnVilla nhưng roomCount của peterVilla không bị thay đổi.

 Không phải chỉ có Struct là value type, cũng không phải chỉ Class là refrence type. Bạn xem bảng sau:
 
 ![](https://images.viblo.asia/3a2f7bfd-1abc-4110-bd81-36c409e2402d.JPG)