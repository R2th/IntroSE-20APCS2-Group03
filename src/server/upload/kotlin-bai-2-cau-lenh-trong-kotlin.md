### 1, lệnh điều kiện if
```
if(biểu thức logic){
    // nếu bểu thức đúng Lệnh chạy
}
```
```
if(biểu thức logic){
    // nếu bểu thức đúng Lệnh chạy
}
else{
    // nếu bểu thức sai Lệnh chạy
```
```
val returnValue = if (condation) {  
     // giá trị được trả về nếu đúng
    } else {  
     // giá trị được trả về nếu sai 
    }  
    println(returnValue)  
```
- nếu có nhiều điều kiện:
```
fun main(args: Array<String>) {  
    val num = 10  
    val result = if (num > 0){  
        "$num lớn hơn 0"  
    }else if(num < 0){  
        "$num nhỏ hơn 0"  
    }else{  
        "$num bằng 0"  
    }  
    println(result)  
}
```
- điều kiện gộp
```
fun main(args: Array<String>) {  
    val num1 = 25  
    val num2 = 20  
    val num3 = 30  
    val result = if (num1 > num2){  
        val max = if(num1 > num3){  
            num1  
        }else{  
            num3  
        }  
        "kq = "+max  
    }else if(num2 > num3){  
        "kq = "+num2  
    }else{  
        "kq = "+num3  
    }  
    println("$result")  
}  

    // Kết quả
    // kq = 30
```
### 2, lệnh điều kiện when
```
fun main(args: Array<String>){  
    var number = 4  
    var numberProvided = when(number) {  
        1 -> "1"  
        2 -> "2"  
        3 -> "3"  
        4 -> "4"  
        5 -> "5"  
        else -> "chịu"  
    }  
    println("số là : $numberProvided")  
}  
// kết quả
// số là 4
```
```
fun main(args: Array<String>){  

    var number = 4  
    when(number) {  
        1 -> println("1")  
        2 -> println("2")  
        3 -> println("3")  
        4 -> println("4")  
        5 -> println("5")  
        else -> println("không biết")  
    }  
}  
// kết quả
// số là 4
```
```
fun main(args: Array<String>){  
    var number = 1  
    when(number) {  
        1 -> {  
            println("thứ 2")  
            println("là ngày đầu tuần")  
        }  
        7 -> println("thứ 7")  
        else -> println("ngày nghỉ")  
    }  
}
// kêt quả
// thứ 2
// là ngày đầu tuần
```
```
fun main(args: Array<String>){  
    var number = 8  
    when(number) {  
        3, 4, 5, 6 ->  
            println("dải 1 ")  
        7, 8, 9 ->  
            println("dải 2")  
        10, 11 ->  
            println("dải 3")  
        12, 1, 2 ->  
            println("dải 4")  
        else -> println("không thuộc dải nào")  
    }  
}  
// kết quả
// dải 2
```
```
fun main(args: Array<String>){  
    var number = 7  
    when(number) {  
        in 1..5 -> println("từ 1 đến 5")  
        in 6..10 -> println("từ 6 đến 10")  
        else -> println("hết")  
    }  
}  
//kết quả
// dải 2
```
### 3. lệnh lặp for
```
for (item in collection){  
// thân vong lặp
}
```  
```
fun main(args : Array<String>) {  
    val marks = arrayOf(80,85,60,90,70)  
    for(item in marks){  
        println(item)  
    }  
}  
// kết quả
// 80
// 85
// 60
// 90
//70
```
```
fun main(args : Array<String>) {
    for (i in 1..5)  lặp 1 đến 5
    for (i in 5 downTo 1) // lặp 5 đến 1
    for (i in 5 downTo 2) // lặp 5 đến 2
    for (i in 1..5 step 2) // lặp 1 đến 5 mỗi lần 2 đơn vị
    for (i in 5 downTo 1 step 2) // lặp 5 đến 1 mỗi lần 2 đơn vị
}  
```
### 4. lệnh lặp while
```
while(condition){  
//thân vòng lặp
}  
```
```
fun main(args: Array<String>){  
    var i = 1  
    while (i<=5){  
        println(i)  
        i++  
    }  
}
// kết quả
// 1
// 2
// 3
// 4
// 5
```
### 5. lặp do - while
```
do{  
// Thân 
}  
while(condition);  
```
```
fun main(args: Array<String>){  
    var i = 1  
    do {  
        println(i)  
        i++  
    }  
    while (i<=5);  
}  
// kết quả
// 1
// 2
// 3
// 4
// 5
```
```
fun main(args: Array<String>){  
    var i = 6  
    do {  
        println(i)  
        i++  
    }  
    while (i<=5);  
}  
// kết quả
// 6
```
### 6. break và Jump
```
for(..){  
       thân vòng lặp 
       if(checkCondition){  
           break; // vòng lặp sẽ dừng tại đây 
       }  
} 
```
```
fun main(args: Array<String>) {  
    loop@ for (i in 1..3) {  
        for (j in 1..3) {  
            println("i = $i and j = $j")  
            if (i == 2)  
                break@loop  
        }  
    }  
}  
// Kết quả
// i = 1 and j = 1
// i = 1 and j = 2
// i = 1 and j = 3
// i = 2 and j = 1
```
### 7. continue
```
fun main(args: Array<String>) {  
        for (i in 1..3) {  
            println("i = $i")  
            if (j == 2) {  
                continue  
            }  
            println("ok")  
        }  
}  
// kết quả
// i = 1
// ok
// i = 2
// i = 3
// ok
```
```
fun main(args: Array<String>) {  
    labelname@ for (i in 1..3) {  
    for (j in 1..3) {  
        println("i = $i and j = $j")  
        if (i == 2) {  
            continue@labelname  
        }  
        println("ok")  
    }  
 }  
}  
// kết quả
// i = 1 and j = 1
// ok
// i = 1 and j = 2
// ok
// i = 1 and j = 3
// ok
// i = 2 and j = 1
// i = 3 and j = 1
// ok
// i = 3 and j = 2
// ok
// i = 3 and j = 3
// ok
```