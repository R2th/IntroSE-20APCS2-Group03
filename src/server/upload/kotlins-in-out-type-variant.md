## Introduction
Nếu bạn đã từng định nghĩa generic trong Kotlin, bạn sẽ chú ý rất nhiều lần, nó sẽ đề xuất sử dụng từ khóa **in** hoặc **out** nhằm định nghĩa generic. Nó làm tôi bối rối lúc bắt đầu rằng khi nào, cái gì được sử dụng, và sử dụng cho cái gì.
Nói một cách chính thức, đây là một cách thức để định nghĩa ***contravariance*** và ***covariant***(Biến thể đảo ngược và biến thể sao chép). Phải mất một lúc để tìm hiểu về nó. Tôi sẽ đi sâu giải thích những gì tôi hiểu và ghi nhớ sự khác biệt của chúng.

## In & Out easily remembered
### Out (covariant type)
Nếu lớp generic của bạn chỉ sử dụng generic như là đầu ra chức năng của nó thì **out** được sử dụng như ví dụ sau:

```
interface Production<out T> {
    fun produce(): T
}
```

Tôi gọi là class/interface sản xuất, bởi vì nhiệm vụ chính của nó là sản xuất ra generic type. Do đó rất đơn giản có thể nhớ:

|***produce = output = out.***|
| -------- |

### In (contravariance tye)
Nếu lớp generic của bạn chỉ sử dụng loại generic như là đầu vào chức năng của nó thì **in** được sử dụng như ví dụ sau:

```
interface Consumer<in T> {
    fun consume(item: T)
}
```

Tôi gọi lnos là class/interface tiêu thụ, bởi ví nhiệm vụ chính của nó là tiêu thụ generic type. Do đó rất đơn giản người ta có thể nhớ:

|***consume = input = in.***|
| -------- |

### Invariant type (Biến thể bất biến)
Trong trường hợp một generic class sử dụng generic type như là đầu vào và đầu ra các function của nó thì không có **in** hay **out** được sử dụng. Nó là biến thể bất biến.

```
interface ProductionConsumer<T> {
    fun produce(): T
    fun consume(item: T)
}
```

## Why use In and Out?
Ổn, giờ đây bạn có thể dễ dàng nhớ khi nào **in** và **out** được đề cập tới, ý nghĩa của chúng là gì? Trước khi chúng ta tiếp tục, hãy định nghĩa đối tượng burger class. Nó là một fastFood, cái là một type của food.
Kiến trúc class đơn giản như bên dưới.

<div align="center"><br /><img src="https://images.viblo.asia/49734047-9e6c-4c1f-b64a-583127c8d5dd.png" /></div><br />

```
open class Food
open class FastFood : Food() 
class Burger : FastFood()
```

### Burger Production
Nhìn vào **Production** Generic Interface được định nghĩa bên trên, hãy mở rộng thêm chúng thành nhà cung cấp foot, fastfood, và burger như bên dưới:

```
class FoodStore : Production<Food> {
    override fun produce(): Food {
        println("Produce food")
        return Food()
    }
}

class FastFoodStore : Production<FastFood> {
    override fun produce(): FastFood {
        println("Produce fast food")
        return FastFood()
    }
}

class InOutBurger : Production<Burger> {
    override fun produce(): Burger {
        println("Produce burger")
        return Burger()
    }
}
```

Giờ đây hãy tạo Food Production holders, chúng ta có thể giao tất cả chúng cho nó.

```
val production1 : Production<Food> = FoodStore()
val production2 : Production<Food> = FastFoodStore()
val production3 : Production<Food> = InOutBurger()
```

Cả burger hay fastFood production đều là một food production. Do đó 

|***Đối với 'out' generic, chúng ta có thể gán một class của loại con(subtype) cho class của loại cha(super-type).***|
| -------- |

Nếu chúng ta thay đổi như bên dưới, nó sẽ xảy ra lỗi, bởi vì food và fastFood không chỉ là một burger.

```
val production1 : Production<Burger> = FoodStore()  // Error
val production2 : Production<Burger> = FastFoodStore()  // Error
val production3 : Production<Burger> = InOutBurger()
```

### Burger Consumer
Bây giờ, xem **Consumer** generic interface đã định nghĩa bên trên. Hãy mở rộng thêm chúng nhằm tiêu thụ food, fastFood, và burger như bên dưới:

```
class Everybody : Consumer<Food> {
    override fun consume(item: Food) {
        println("Eat food")
    }
}

class ModernPeople : Consumer<FastFood> {
    override fun consume(item: FastFood) {
        println("Eat fast food")
    }
}

class American : Consumer<Burger> {
    override fun consume(item: Burger) {
        println("Eat burger")
    }
}
```

Bây giờ, hãy tạo các Burger Consumer holders, chúng ta có thể gán tất cả chúng cho nó.

```
val consumer1 : Consumer<Burger> = Everybody()
val consumer2 : Consumer<Burger> = ModernPeople()
val consumer3 : Consumer<Burger> = American()
```

Ở đây, một burger consumer là một American, người cũng là một phần của ModernPeople, hay cũng có thể là một phần của Everybody. Do đó:

|***Đối với 'in' generic, chúng ta có thể gán một class của loại cha(super-type) thành class của loại con(subtype).***|
| -------- |

Nếu chúng ta thay đổi thành bên dưới, nó sẽ xuất ra lỗi, bởi vì consumer của Food mặc dù có thể là người Mĩ hoặc ModernPeople nhưng nó không chỉ là American hoặc chỉ là ModernPeople.

```
val consumer1 : Consumer<Food> = Everybody()
val consumer2 : Consumer<Food> = ModernPeople()  // Error
val consumer3 : Consumer<Food> = American()  // Error
```

### Another way to remember In and Out
Xuất phát từ những thứ trên, một cách thức khác để biết khi nào sử dụng cái gì cho:

|* SuperType có thể được gán thành subtype, sử dụng IN <br /> * Subtype có thể được gán thành SuperType, sử dụng OUT|
| -------- |

<div align="center"><br /><img src="https://images.viblo.asia/e5b63a96-83bb-45f9-a7fd-7dd632b0ca7b.png" /></div><br />

Tôi hy vọng bạn hiểu rõ bài viết này và nó hữu ích cho bạn. Hãy chia sẻ nó với những người khác.

## Source
https://medium.com/@elye.project/in-and-out-type-variant-of-kotlin-587e4fa2944c

## Reference
[Understanding Kotlin limitations for type parameter positions](https://viblo.asia/p/understanding-kotlin-limitations-for-type-parameter-positions-m68Z0y76lkG)
https://medium.com/@elye.project/

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))