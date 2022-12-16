Bài viết không đi sâu vào toàn bộ kotlin mà sẽ chỉ ra một số thay đổi từ java sang kotlin thường hay sử dụng (phù hợp với những người đang dùng java chuyrn sang kotlin).
### * 1. Biến

|tên| java |kotlin | 
| --------| -------- | -------- |
|Biến thường | Int a; | var a : Int |
|Biến khởi tạo| Int a = "abc123"; | var a : Int = 123|
|Hằng số | final Int a = 123; | val a : Int = 123 |
|Mảng |Int a[] = [1, 2, 3]; | var a : IntArray = intArrayOf(1, 2, 3) |
|List  |List<int> a = new ArrayList<>(); | var a : List<Int> = ArrayList() |
|static  |statix int a; | companion object {  var a:Int } |
    
 chú ý:
    
khác với java biến trong kotlin sẽ được kiểm tra trước khi chạy nên nếu sai về quy tắc biến chương trình sẽ báo lỗi, Quy tắc ở đây là: " biến không được phép null"
    
java : 
    
    khai báo biến a    ->    chạy chương trình    ->    lấy a +1    ->   ứng dụng bị dừng.
    
kotlin : 
    
    khai báo biến a   ->    chạy chương trình    ->    nếu a mà vi phạm quy tắ thì chương trình không thể chạy.
    
vậy với kotlin thì sẽ phải làm như thế nào?
    
câu trả lời:      
    
   `var a : Int = 123     -      bến đã được khởi tạo sẽ không bị null`
    
   `lateinit var a : ini   -      báo cho chương trình biết tý nữa tôi sẽ khởi tạo biến này`
    
   `var a : int? = null   -      báo cho chương trình biết có thể nó sẽ null`
    
### * 2. Câu lệnh
    
Mình chỉ liệt kê nhưng cái thay đổi trong kotlin, cái nào không thay đỏi sẽ không được nhắc đến.

trong kotlin switch được thay bằng when:     
   `when(a){  1 - > Log.d()  2 - > Log.d()  else -> log.d() }`

vòng lặp từ 1 đến 10 dấu .. thể hiện các số trong khoảng 1 đến 10:     
   `for ( i in 1..10 ){}`

vòng lặp từ 0 đến hết số lượng mảng a:     
   `for ( i in 0 until a.length ){}`
    
for ngược:     
   `for ( i in 10 downto 1 ){}`
    
for nhảy 2 phần tử:      
    `for ( i in 1..100 steep 2 ){}`
    
### * 3. Hàm
    
hàm gọi:     
   ` fun tenHam(a: String){ //lệnh }`
    
hàm trả về:    
    
```
fun tenHam(a: String) : String {   
              //lệnh return a:   
}
```
    
gọi hàm này :    
`${tenHam("123")}`     
    
### * 4 Class
    
```
class a( a : String ){     
    init{     
        //hàm khởi tạo chạy ở đây     
    }     
}     
```
phần a: String chính là tham số truyền vào
    
inner class: class 1 trong class b muốn dử dụng được biến của b thì class a phải là inner
```
class a( a : String ){    
    var k : String = "123"
    inner class a( a : String ){     
         var h : String =  k
    }     
}
```
    
### * 5 Kế thừa
```       
open class b( ) {   
    init{   
        //hàm khởi tạo chạy ở đây   
    }   
}   
    
class a( a : String ) : b{   
    init{   
        //hàm khởi tạo chạy ở đây   
    }   
}   
```
Kế thừa từ class b; class b phải có open.
    
### * 6 Thay đổi trong android
    
*  id: id dẽ được gọi thằng không câng phải finViewById
    
* Set Image, color. background sẽ gọi thẳng các phước thức và truyeenfd vào dạng R. (color, drawable, string) . tên
    
* set text và ghét text chỉ cần gán = :
    vd: 
   ` txtName = "acb" `
    `txt.toString.`
    
* setOnclick{}: có thể xử lý sự kiện trực tiếp 
    vd:
   ` bt.setOnclickListenner{} `
### *  7.  Extensions trong Kotlin  
- khái niệm: là thêm phương thức vào bên trong class mà không cần phải kế thưa lại
- ví dụ: 
```
fun MutableList<String>.swap(a: Int, b:Int){
    val tg = this[a]
    this[a]=this[b]
    this[b]=this[a]
}
fun main(){
    val list: MutableList<Strng> = mutableListOf("a","b","c")
    list.swap(0,2)
}   
// kết quả
// đã đổi được vị trí phần tử đầu và cuối trong mảng
``` 
 - rộng hơn
```
class a{
    fun aa(){
    }
    fun x{}{
    }
    fun B.them(){ // cái này không thể gọi thông qua class b được
        this.bb() // có thể gị đến bb
        x() // gọi x của class b
        this@a.x() // gọi x của class a
    }
}
class b{
    fun bb(){
    }
    fun x{}{
    }
} 
```
### 8. Data class
- Công dụng để lưu trữ dữ liệu và không cho phép kế thừa, dung để coppy dữ liệu
 ```
data class user(var teb: String, tuoi: int){
}
fun main(){
    var u = user("binh",24)
    var u2 = u.copy()
}
```
### 9. nested class và inner class
- cả 2 khái niệm đều là sử dụng class trong class tuy nhiên có một số điểm khác nhau
    - nested không thể dử dụng properties của class ngoài 
    - inner có thể sử dụng properties của class ngoài 
```
class a(){
    class b(){
        // nested class
    }
    inner class c(){
        // inner class
    }
}
```
### 10. delegation
- ủy quyền cho class được phép gọi hàm của class khác
```
interface chim{
    fun bay()
}
class a(): chim{
    override fun bay(){
    }
}
class b(aa: a): chim by aa{
}
```
class b có thể gọi được phương thức bay
### 11. lambda và anonymous
- Là cách viết nhanh của 1 hàm
- vd 
```
// thường
fun tong(a: Int, b: Int): Int{
    return a+b
}
// lambda
    var tong = {a:Int, b: Int -> a+b}
    var tong : (Int, Int) -> Int = (a,b->a+b)
// anonymous
var tong = fun(a: Int, b: Int): Int{
    return a+b
}    
```
```
var a = doubleArrayOf(1,2,3,4)
a.forEach{ aa -> println(aa)} // với mỗi giá trị ta in nó ra
```
### 12, Higher-Order
- là trong hàm ta truyền vào 1 hàm hoặc giá trj trả về là 1 hàm
- vd:
```
var ham = fun(): Int(){
    return 1;
}
fun hamChay(body:() -> Int): Int {
    return body
}
```
13.  bóc tách thuộc tính với destructuring
- là cách lấy một hay nhiều các thuộc tính  bên trong 1 class
- lưu ý nó chỉ hoạt động với data class;
- vd:
```
data classcla(a: Int, b: Int){}
fun main(){
var (a, b) = cla
```
### 12, đặt bí danh
- bí danh được đặt cho 1 kiểu dữ liệu để dễ dàng sử dụng
- vd:
    typealias a = set<Int>
    typealias b<k> = MutableMap<k, String?>
    
    fun main(){
    var aa:b<String> = mutableMapOf<String, String?>(...........)
    }