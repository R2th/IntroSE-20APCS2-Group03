# 1. Higher-order function là gì ?

* Thuật ngữ "Functional programming" là một dạng lập trình mà ta có thể truyền các hàm như 1 tham số hay return 1 hàm , Higher-order function
là một dạng như vậy

![](https://images.viblo.asia/b2e798eb-05ee-40ed-8e63-ce9c7363d8bf.png)

Dưới đây là hai kiểu thể hiện cơ bản của Higher-order function :

### 1.  Higher-order function được truyền như tham số

Ta có ví dụ một Higher-order function như sau : 

``` Kotlin
fun printPerson(name: String , printName: (Int?) -> String) {
        printName(name)
  }
```

*  Function reference :

``` Kotlin
fun printName(name: String) {
    println(name)
}
```

```Kotlin
fun printPerson("VietKFC" , ::printName)
```

Ta thấy function printName được gọi tham chiếu trong function printPerson()

* Anonymous function :

Ta sẽ truyền như những function bình thường và định nghĩa luôn ở đây , khác chỗ đây sẽ là 1 function không có tên :

```Kotlin
fun printPerson("Viet" , fun(name: String?) : Unit {
    // Do something with name...
})
```
### 2. Trả về một function
```Kotlin
fun printPerson() : ((Int) -> Unit) {
    return ::getAge
}
```

```Kotlin
fun getAge(age: Int) {
    println(age)
}
```

``` Kotlin
printPerson()(22)
```

*  Hạn chế khi sử dụng higher-order function :

Các param có dạng function type được truyền vào sẽ tự động tạo ra một ***Function Object*** trong memory để lưu các function này , làm tăng số lượng function trong app ở run-time.

```Kotlin
    private fun makeHighOrder(action: () -> Int) {
        action()
    }
```

```Java
    private final void makeHighOrder(Function0 action) {
        action.invoke();
    }
```

Ta thấy sau khi decomplie sang java code thì Object **Function0** được sinh ra trong memory.

# 2. Lambdas
Lambda expression là một hàm ẩn danh được định nghĩa trong {} và có thể coi như một giá trị .
Chúng có thể được truyền như một tham số hoặc làm bất cứ điều gì như đối với 1 Object.

```Kotlin
val lambda : (Int , Int) -> Int = {a,b -> a+b}
println(lambda(2,3))
```

Ta cũng có thể truyền Lambda vào Higher-order function :

```Kotlin
private fun sumNumber(a: Int , b: Int , plus: (Int,Int) -> Int) {
    println(plus(a,b))
}
```

```Kotlin
val plus : (Int,Int) -> Int = {a,b -> a+b}
sumNumber(2,3,plus)
```

* Function literal , cũng là một cách gọi khác của Lambda Function có 1 tham số 

```Kotlin
val nameList = arrayOf("Viet" , "Hong" , "Huyen" , "Long" , "Quang")
val newName = nameList.filter{ name -> name.contains("n" , ignoreCase = true) }
                            .sortBy{name -> name.length}
```

* Sự khác nhau giữa Lambda và Anonymous Function :

Anonymous function có thể xử lý và trả về như 1 hàm bình thường , còn Lambda chỉ trả về giá trị cuối cùng , nếu muốn xử lý rẽ nhánh ta cần thêm label để định nghĩa, ví dụ :

```Kotlin
val anonymousFunc = fun(s: String) : Boolean {
if(s.contains("v")) return true
return false
}
```

```Kotlin
val lambdaFunction: (String) -> Boolean = lambda@{s ->
if(s.contains("v")) return@lambda true
// nếu ko có label @lambda , câu lệnh if sẽ bị bỏ qua
false
}
```

# 3. Closure
* Closure là những hàm có thể biết rõ được  logic bao bên ngoài nó và truy cập và sửa đổi những biến được đăng kí bên ngoài phạm vi

* Lambda expression và Anonymous function cho phép truy cập vào closure và sửa đổi những biến này

Từ Java 8 hoặc Kotlin có sử dụng lambda , ta có ví dụ so sánh như sau :

```Java
int sum = 0;
List<Integer> list = Arrays.asList(1,2,3,4,5);
Thread thread = new Thread(() -> {
    for(int i = 0 ; i< list.size() ; i++) {
        sum += i; // Báo lỗi khi modify biến sum...
    }
});
thread.start();
```

Với Lambda expression : 

```Kotlin
var sum = 0
val list = listOf(1,2,3,4,5)
val thread = Thread{ list.forEach {sum += i} }
thread.start()
```

# 4. Inline function
Quay trở lại vấn đề về việc 1 Function Object sẽ được sinh ra khi sử dụng function như một tham số , Inline Function sinh ra để khắc phục điều này.

Ta thêm "inline" vào trước mỗi Higher-order function

```Kotlin
fun showPerson(name: String , getAge: (Int?) -> Int {
    println(name)
    println(getAge(22))
}
```

``` Kotlin
showPerson("viet" , fun(age: Int?): Int {
   return 22
})
```

Thông thường sau khi decomplie , ta có 1 Object tên là Function1 được sinh ra

```
public final showPerson(Ljava/lang/String;Lkotlin/jvm/functions/Function1;)V
```

```
INVOKEVIRTUAL com/example/kotlindemo/MainActivity.showPerson(Ljava/lang/String;Lkotlin/jvm/functions/Function1;)V
```

Sau khi sử dụng inline function và decomplie lại ta thấy Object Function1  đã biến mất

```
LOCALVARIABLE this_$iv Lcom/example/kotlindemo/MainActivity; L1 L15 2
LOCALVARIABLE name$iv Ljava/lang/String; L1 L15 3
LOCALVARIABLE $i$f$showPerson I L2 L15 4
```

* Tuy nhiên , Inline Function cũng đi kèm một số nhược điểm sau :
1.  Inline function không thể gọi gián tiếp từ inline function khác hay gọi chính nó
2.  1 public inline function chỉ có thể truy cập vào public class và public field của class đó
3.  Nó có thể sinh ra thêm nhiều code vì implement của nó được gọi ở nhiều nơi 
4.  Nếu dùng nhiều sẽ làm giảm tốc độ truy cập của bộ nhớ đệm


---> *Ta nên sử dụng Inline Function cho những khối code ngắn gọn và hạn chế sử dụng chúng bừa bãi*