### 1, fun
```
fun main(args: Array<String>){  
    var number = 25  
    var result = Math.sqrt(number.toDouble())  
    print("căn của $number là $result")  
}  
// kết quả
// căn của 25 là 5.0
```
- Hàm là đại diện cho 1 đoạn code
```
fun functionName(){  
// thân hàm
}  
```
- Gọi hàm     
functionName() ` 
- Ví dụ:
```
fun main(args: Array<String>){  
    sum()  
    print("ok")  
}  
fun sum(){  
    var num1 =5  
    var num2 = 6  
    println("tong = "+(num1+num2))  
}  
// kết quả
// tong = 11
// ok
```
- Hàm có tham số
```
fun functionName(number1: Int, number2: Int){  
.. .. ..  
}  
.. .. ..  
functionName(value1, value2)  
.. .. ..  
```
- Hàm trả về
```
fun main(args: Array<String>){  
   val result = sum(5, 6)  
    print(result)  
}  
fun sum(number1: Int, number2:Int): Int{  
    val add = number1+number2  
    return add  
}  
// kết quả
// 11
```
### 2, Đệ quy
- Đệ quy là gọi hàm trong cihnhs hàm đấy
```
var count = 0  
fun rec(){  
    count++;  
    if(count<=5){  
        println("hello "+count);  
        rec();  
    }  
}  
fun main(args: Array<String>) {  
    rec();  
}
// kết quả
// hello 1
// hello 2
// hello 3
// hello 4
// hello 5
```
- Ví dụ bài toán tính gia thừa
```
fun main(args: Array<String>) {  
    val number = 5  
    val result: Long  
    result = factorial(number)  
    println("giai thừa của $number = $result")  
}  
  
fun factorial(n: Int): Long {  
    return if(n == 1){  
          n.toLong()  
    }  
    else{  
        n*factorial(n-1)  
    }  
}  
// kết quả
// giai thừa của 5 = 120
// factorial(5)   
//   factorial(4)   
//      factorial(3)   
//         factorial(2)   
//            factorial(1)   
//               return 1   
//            return 2*1 = 2   
//         return 3*2 = 6   
//      return 4*6 = 24   
//   return 5*24 = 120  
```
- tailrec trong đệ quy: trong trường hợp đề quy lớn và không thể thoát ra được thì tailrec sẽ có công dụng dừng đệ quy
```
fun main(args: Array<String>) {  
    var number = 100000.toLong()  
    var result = recursiveSum(number)  
    println("tổng của 1 đến $number = $result")  
}  
tailrec fun recursiveSum(n: Long, semiresult: Long = 0) : Long {  
    return if (n <= 0) {  
        semiresult  
    } else {  
        recursiveSum( (n - 1), n+semiresult)  
    }  
}  
// kết quả
// tổng của 1 đến 100000 = 5000050000  
```
### 3. Tham số truyền vào
```
fun main(args: Array<String>) {  
    run()  
}  
fun run(num:Int= 5, latter: Char ='x'){  
    print( $num và $latter")  
}  
// kết quả
// 5 và x
```
```
fun main(args: Array<String>) {  
    run(3)  
}  
fun run(num:Int= 5, latter: Char ='x'){  
    print("$num và $latter")  
}  
// kết quả
// 3 và x
```
```
fun main(args: Array<String>) {  
    run(3,'a')  
}  
fun run(num:Int= 5, latter: Char ='x'){  
    print("$num và $latter")  
}
// kết quả
// 3 và a
```
```
fun main(args: Array<String>) {  
    run('a')  
}  
fun run(num:Int= 5, latter: Char ='x'){  
    print("$num và $latter")  
}  
// kết quả
// Error: Kotlin: The character literal does not conform to the expected type Int
// lôi rồi đó
```
```
fun main(args: Array<String>) {  
    run(latter='a')  
}  
fun run(num:Int= 5, latter: Char ='x'){  
    print("$num và $latter")  
}  
// kết quả
// 5 và a
```
### 4. Biểu thức lambdas
`var sum = {x:Double,  y:Double -> x+y)`
- {x:Double,  y:Double -> x+y) hoạt động tương tự như hàm tính tổng.
### 5. chức năng bậc cao
```
fun myFun(org: String,portal: String, fn: (String,String) -> String): Unit {  
    val result = fn(org,portal)  
    println(result)  
}  
  
fun main(args: Array<String>){  
    val fn:(String,String)->String={org,portal->"$org và $portal"}  
    myFun("acb","def",fn)  
} 
// kết quả
// acb và def
```