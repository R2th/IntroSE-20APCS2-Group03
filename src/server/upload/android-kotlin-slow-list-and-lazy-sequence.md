![](https://images.viblo.asia/0dd6bd23-a713-4a58-adbc-55b611152a2c.png)

Khi chuyển từ Java7 sang Kotlin, chắc hẳn mọi người rất vui khi có thể dễ dàng sử dụng các toán tử Collection trên List và xử lý chúng theo các chuỗi với nhau. Nhưng ta ít biết rằng List với iterator của nó không phải là thứ tốt nhất ( trong 1 vài trường hợp), có 1 thức khác được gọi là Sequence.


### Một chút về List - Hard worker

Trước khi tìm hiểu tại sao Sequence tốt hơn List (trong một số trường hợp), hãy cùng tìm hiểu một chút về List.

List được vận hành bởi Iterator. Nó là một xâu làm việc rất chăm chỉ, khi mà mỗi thao tác thực hiện trên chuỗi, nó sẽ đảm bảo hoàn thành ngay.

Ví dụ 

~~~java
val list = listOf(1, 2, 3, 4, 5, 6)
list.map{ it * 2 }.filter { it % 3  == 0 }.average()
~~~

![](https://images.viblo.asia/cb0fbe11-b0c3-444e-ab2a-6196b7580eb6.png)

Như bạn thấy trên hình mình họa ở trên, tại mỗi step, mỗi item được xử lý ngay.

Để chắc chắn hơn, ta sẽ thửu log giá trị ra xem nhé :

~~~java
val list = listOf(1, 2, 3, 4, 5, 6)
val result = list
        .map{ println("In Map"); it * 2 }
        .filter { println("In Filter");it % 3  == 0 }
println("Before Average")
println(result.average())
~~~

Kết quả :

```
In Map
In Map
In Map
In Map
In Map
In Map
In Filter
In Filter
In Filter
In Filter
In Filter
In Filter
Before Average
9.0
```

Well, dúng nghĩa hardworking phải không ? :D 


### The lazy guy, Sequence

OK, giờ ta sẽ thay đổi code một chút bằng cách thêm asSequence() vào :

~~~java
val list = listOf(1, 2, 3, 4, 5, 6)
val result = list.asSequence()
        .map{ println("In Map"); it * 2 }
        .filter { println("In Filter");it % 3  == 0 }
println("Before Average")
println(result.average())
~~~

Hãy cùng xem kết quả :

```
Before Average
In Map
In Filter
In Map
In Filter
In Map
In Filter
In Map
In Filter
In Map
In Filter
In Map
In Filter
9.0
```

Bạn sẽ cần chú ý một số điểm sau :

1. Before First được in ra đầu tiên. Nói cách khách, nếu như bạn không gọi hàm average(), sẽ không có gì đươc thực hiện.

2. In Map và In Filter được thực hiện xen kẽ nhau. Điều này có nghĩa nó truyền từng item một và thực hiện xong các operation trước khi truyền vào item tiếp theo.

![](https://images.viblo.asia/e8dff4a3-6f39-497d-a781-b99107fd5c39.png)

### What’s so good about Sequence?

Hãy tưởng tượng nếu bạn muốn lấy phần tử đầu tiên của item được xử lý ?

~~~java
val list = listOf(1, 2, 3, 4, 5, 6)
val result = list
        .map{ println("In Map $it"); it * 2 }
        .filter { println("In Filter $it");it % 3  == 0 }
println(result.first())
~~~

Kết quả : 

~~~
In Map 1
In Map 2
In Map 3
In Map 4
In Map 5
In Map 6
In Filter 2
In Filter 4
In Filter 6
In Filter 8
In Filter 10
In Filter 12
6
~~~

=> 13 dòng, đồng nghĩa mới 13 phép tính.

### Let's look at Sequence

~~~java
val sequence = sequenceOf(1, 2, 3, 4, 5, 6)
val result = sequence
        .map{ println("In Map $it"); it * 2 }
        .filter { println("In Filter $it");it % 3  == 0 }
println(result.first())
~~~

Kết quả :

In Map 1
In Filter 2
In Map 2
In Filter 4
In Map 3
In Filter 6
6

=> Ở đây, khi sử dụng sequence, ta chỉ mất 7 phép tính. Dễ thấy ngay khi nó tìm thấy element đầu tiên sẽ dừng ngay.

### Is the speed up only apply to first() ?

Có phải sequence chỉ nhanh hơn với first()

#### Thử nghiêm với Map operation

~~~java
val sequence = generateSequence(1) { it + 1 }.take(50000000)
val list = sequence.toList()

println("List Map Sum= " 
        + measureNanoTime { list.map { it * 2 }.sum() })
println("Sequence Map Sum " 
        + measureNanoTime { sequence.map { it * 2 }.sum() })

println("List Map Average " 
        + measureNanoTime { list.map { it * 2 }.average() })
println("Sequence Map Average " 
        + measureNanoTime { sequence.map { it * 2 }.average() })
~~~

Kết quả : 

~~~
List Map Sum 14727907362
Sequence Map Sum 2074397969
List Map Average 11460520785
Sequence Map Average 3268960487
~~~

* List mất 14,7s với Map:Sum, và 11,5s với Map:Average
* Sequence mất 2,1s với Map:Sum, và 33,s với Map:Average

=> Với Map operation, Sequence cho performance tốt hơn List.


#### Thử nghiệm với Filter operation.

~~~java
val sequence = generateSequence(1) { it + 1 }.take(50000000)
val list = sequence.toList()

println("List Filter Sum " 
        + measureNanoTime { list.filter { it % 3 == 0 }.sum() })
println("Sequence Filter Sum " 
        + measureNanoTime { sequence.filter { it % 3 == 0 }.sum() })

println("List Filter Average " 
        + measureNanoTime { list.filter { it % 3 == 0 }.average() })
println("Sequence Filter Average " 
        + measureNanoTime { sequence.filter { it % 3 == 0 }.average() })
~~~

Kết quả :

~~~
List Filter Sum 506351694
Sequence Filter Sum 873175271
List Filter Average 391790033
Sequence Filter Average 838510968
~~~

* List mất 0.5s cho Filter:Sum và 0,4s cho Filter:Average
* Sequence mất 0.9s cho Filter:Sum và 0,8s cho FIlter:Average

=> Với Filter operation, List cho performance tốt hơn Sequence.

#### Thử nghiệm với Map & Filter operations.

~~~java
val sequence = generateSequence(1) { it + 1 }.take(50000000)
val list = sequence.toList()

println("List Map Filter Sum\t\t " + measureNanoTime { 
    list.map { it * 2 }.filter { it % 3 == 0 }.sum() })
println("Sequence Map Filter Sum\t " + measureNanoTime { 
    sequence.map { it * 2 }.filter { it % 3 == 0 }.sum() })

println("List Map Filter Average\t\t " + measureNanoTime { 
    list.map { it * 2 }.filter { it % 3 == 0 }.average() })
println("Sequence Map Filter Average\t " + measureNanoTime { 
    sequence.map { it * 2 }.filter { it % 3 == 0 }.average() })
~~~

Kết quả :

~~~
List Map Filter Sum 34845242323
Sequence Map Filter Sum 2820436086
List Map Filter Average 2328258876
Sequence Map Filter Average 18618444560
~~~

* List mất 34,8s cho Map:Filter:Sum và 2,3s cho Map:Filter:Average
* Sequence mất 2,8s cho Map:Filter:Sum và 18,6s cho Map:Filter:Average 

=> Với Map:Filter:Sum , Sequence thì nhanh hơn List trong khi Map:Filter:Average thì List nhanh hơn Sequence.

#### Thử nghiệm trực tiếp trên Sequence/List.

~~~java
val sequence = generateSequence(1) { it + 1 }.take(50000000)
val list = sequence.toList()

println("List Sum " + measureNanoTime { list.sum() })
println("Sequence Sum " + measureNanoTime { sequence.sum() })

println("List Average " + measureNanoTime { list.average() })
println("Sequence Average " + measureNanoTime { sequence.average() })
~~~

Kết quả : 

~~~
List Sum 91726022
Sequence Sum 592771887
List Average 101141460
Sequence Average 622616340
~~~

* List mất 0.1s với Sum, 0.1s với Average
* Sequence mất 0.5s với Sum, 0.6s với Average

=> Khi không có operation nào, List nhanh hơn Sequence.


### Tổng kết 

* Không có operation nào, sử dụng List.
* Chỉ có Map operation, sử dụng Sequence.
* Chỉ có Filter operation, sử dụng List.
* Nếu operation kết thúc với First, sử dụng Sequence.
* Khi kết hợp các operation không được đề cập ở trên, hãy thử sử dụng measureNanoTime để tính.

### Reference
 * https://medium.com/@elye.project/kotlin-slow-list-and-lazy-sequence-61691fc974c5