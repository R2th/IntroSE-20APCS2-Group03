Tham chiếu và tham trị là những kiến thức rất quen thuộc và cơ bản nhưng không phải ai cũng có thể hiểu rõ hai khái niệm này dù đã tiếp xúc với JavaScript lâu năm hay mới làm quen.

# Kiểu tham trị (Value Types)

Kiểu này dùng cho các kiểu dữ liệu nguyên thuỷ: String, Number, Boolean, BigInt, Symbol, undefined, null. Kiểu này thì cũng khá là đơn giản, khi gán cho nó một giá trị thì nó sẽ lưu lại giá trị đó và tại một thời điểm thì chỉ lưu một giá trị.

```
Ví dụ 1:
let a = 1;
//Tạo ra biến a và lưu giá trị của a vào ô nhớ - 1 

let b = a;
//Tạo ra biến b, sao chép giá trị của biến a và lưu vào ô nhớ mới - 1

a = 2;
//Sửa giá trị của biến a và cập nhật lại ô nhớ - 2

console.log(b) //1
```

Như vậy, giá trị của a và b lưu ở hai ô nhớ khác nhau nên việc sửa ở ô nhớ này sẽ không ảnh hưởng đến ô nhớ khác.
# Kiểu tham chiếu (Reference Types)
Kiểu này thì phức tạp hơn kiểu tham trị và được dùng cho các kiểu dữ liệu phức tạp: Object, Array, Function. Ở đây khi gán cho nó một giá trị thì nó không lưu lại giá trị này mà thực chất nó lưu lại địa chỉ của ô nhớ lưu giá trị này.
```
Ví dụ 2:
let a = { name: "cat" }
//Tạo ra biến a, lưu giá trị của a vào ô nhớ và gán lại địa chỉ ô nhớ cho biến a (a = #a001)

let b = a
//Tạo ra biến b và gán giá trị của biến a cho b, ở đây chính là địa chỉ địa chỉ ô nhớ của a (b =#a001)

a.name = "dog"
//Sửa giá trị của biến a thì giá trị trong ô nhớ được cập nhật

console.log(b) // { name: "dog" }
```
Như vậy, a và b cùng lưu lại địa chỉ của một ô nhớ, khi một biến thay đổi thì giá trị trong ô nhớ thay đổi mà địa chỉ ô nhớ không thay đổi nên bất kỳ biến nào trỏ đến địa chỉ này đều bị thay đổi theo.
```
Ví dụ 3: 
const a = {
    id: 1, 
    info: {
        name: "John",
        age: 23
    }
}
```
Trong ví dụ trên ta thấy có hai object lồng nhau và cứ là object thì sẽ lưu theo kiểu tham chiếu. Đầu tiên, đi từ trong ra ngoài info sẽ được lưu vào ô nhớ và được gán cho một địa chỉ (info: #a001) sau đó a sẽ được lưu vào ô nhớ với giá trị { id: 1, info: #a001 } và gán lại địa chỉ của ô nhớ đó (a = #a002). Vậy nếu ta gán info cho một biến khác và thay đổi nó thì sẽ như thế nào?
```
const Info = a.info
Info.name = "David"
console.log(a.info.name)//"David"
```
Qua ví dụ này ta thấy một điều khá lạ là Info là hằng số tại sao lại có thể thay đổi được? Thực chất ở đây không phải là đang sửa giá trị của biến Info mà là sửa giá trị trong ô nhớ của nó còn nếu ta gán Info = b thì sẽ lỗi ngay bởi việc gán này sẽ làm thay đổi giá trị của nó.

# Truyền tham số dạng tham trị và tham chiếu

Khi truyền tham số dạng tham trị vào trong một hàm thì thực chất trong hàm sẽ tạo ra một biến rồi gán bằng tham số truyền vào và cũng do tính chất của tham trị nên trong hàm có thay đổi thế nào thì giá trị truyền vào bên ngoài cũng không ảnh hưởng.
```
Ví dụ 4: Truyền tham số dạng tham trị
function changeNumber(a){
    //let a = b
    a = 0;
    console.log(a);//0
}

const b = 1;
changeNumber(b);
console.log(b)//1
```
Còn đối với kiểu tham chiếu, do tính chất của nó thì việc gán chỉ là gán địa chỉ ô nhớ lưu trữ giá trị nên việc thay đổi giá trị bên trong hàm vẫn sẽ ảnh hưởng đến giá trị bên ngoài.
```
Ví dụ 5: Truyền tham số dạng tham chiếu
function changeName(people){
    people.name = "Hung";
    console.log(people.name)//Hung
}

const man = { name: "Thanh"}
changeName(man);
console.log(man.name)//Hung

=> Việc gán trong hàm là gán địa chỉ ô nhớ, khi thực hiện thay đổi thì giá trị của ô nhớ cũng thay đổi và man cùng chỉ đến ô nhớ đó nên khi hàm được chạy thì giá trị của man bên ngoài cũng được thay đổi theo.
```
Việc truyền tham số kiểu tham chiếu sẽ làm thay đổi giá trị của tham số truyền vào, vậy muốn bỏ tham chiếu thì phải làm như thế nào???  Tạo ra một object mới mà không làm ảnh hưởng đến object cũ thì ta có thể clone obj bằng spread operator, việc clone này sẽ tạo ra một object mới và lấy tất cả giá trị của object cũ vào object mới.
```
Vid dụ 6: 
const man1 = { name: "Sanji" }; //#a001
const man2 = { ...man1 }; #a002
//man2 là một object mới với địa chỉ mới và có tất cả giá trị của man1

man1.name = "Zoro"
console.log(man2.name)
//Do man2 và man1 trỏ đến hai ô nhớ khác nhau nên việc thay đổi man1 sẽ không làm thay đổi man2 nên man2.name vẫn là "Sanji".
```
Việc clone như vậy vẫn còn hạn chế đó là chỉ tạo ra ô nhớ mới cho cấp một của object còn nếu object có nhiều cấp lồng nhau thì không. Chính vì vậy để triệt để ta có thể sử dụng một cách khác đó là đó là chuyển object thành chuỗi rồi giải mã lại thành object, việc này sẽ tạo ra cả ô nhớ mới cho cả những object con. Nhưng việc mã hoá rồi giải mã này sẽ ảnh hưởng đến performance nếu như object quá lớn thì việc này sẽ mất thời gian. Vậy tuỳ hoàn cảnh mà ta sẽ chọn cách tối ưu nhất để sử dụng. 
```
let b = JSON.parse(JSON.stringify(a));
```
# Kết luận
Như vậy, kiểu tham trị thì lưu lại giá trị trong ô nhớ, ghi gán cho biến khác và sửa thì sẽ không làm thay đổi giá trị trước khi gán. Còn kiểu tham chiếu bản chất sẽ lưu lại địa chỉ ô nhớ chứa giá trị chứ không lưu giá trị, khi gán cho một biến khác thì sẽ gán địa chỉ này và khi sửa thì địa chỉ này không đổi nên các biến trỏ đến cùng địa chỉ này sẽ thay đổi khi có một cái nào đó thay đổi. Để tránh việc làm thay đổi giá trị kiểu tham chiếu thì ta clone ra một object mới rồi thay đổi hoặc chuyển object thành chuỗi rồi parse lại thành object để tạo ra object mới ở ô nhớ mới.