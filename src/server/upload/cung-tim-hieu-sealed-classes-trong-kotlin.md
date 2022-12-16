### I. Mở đầu
- **Sealed Classes** được sử dụng để biểu diễn các hệ thống phân cấp class bị hạn chế, khi một giá trị có thể có một trong các loại từ một tập hợp giới hạn, nhưng không thể có bất kỳ loại nào khác. Về mặt nào đó, chúng là một phần mở rộng của các Class Enum: tập hợp các giá trị cho một kiểu Enum cũng bị hạn chế, nhưng mỗi hằng số Enum chỉ tồn tại dưới dạng một single instance, trong khi một lớp con của một Sealed Class có thể có nhiều instance có thể chứa state.

![](https://koenig-media.raywenderlich.com/uploads/2018/12/SealedClasses-twitter.png)

### II. Các quy tắc của Sealed Class
- Sealed classes là abstract và không thể có các abstract member.
- Sealed classes không thể khởi tạo trực tiếp.
- Sealed classes không thể có public constructor (Constructor mặc định là private).
- Sealed classes có thể có các subclass, nhưng các subclass đó phải nằm trong cùng 1 file hoặc trong sealed classes được địng nghĩa.

### III. Khai báo Sealed Class
```cpp:Kotlin
// Nested
sealed class Fruit() {
    class Apple() : Fruit()
    class Orange() : Fruit()
}

sealed class Fruit
// Not nested
class Apple() : Fruit()
class Orange() : Fruit()

// Fruits.kt
sealed class Fruit() {
    class Apple() : Fruit()
    class Orange() : Fruit()
    open class UnknownFruit(): Fruit()
}

// SomeOtherFile.kt
class Grape : Fruit() // Not Acceptable
class Tomato : UnknownFruit() // Acceptable
```

- Một trong những lợi ích quan trọng khi bạn sử dụng Sealed Class đó là khi bạn sử dụng chúng với  [When Expression](https://kotlinlang.org/docs/reference/control-flow.html#when-expression). Nó có thể xác thực tất cả các trường hợp mà không cần phải gọi đến Else.

```swift
// Invalid
override fun getItemViewType(position: Int): Int {
    return when (fruits[position]) {
        is Fruit.Apple -> R.layout.item_apple
    }
}
```
- Đoạn code trên sẽ lỗi vì ta cần phải implement tất cả các type. Lỗi sẽ trả ra là:
```When expression must be exhaustive, add necessary 'is Orange' branch or else branch instead```

- Vì vậy chúng ta phải implement tất cả các type của Fruit 

```markdown:Kotlin
override fun getItemViewType(position: Int): Int {
    return when (fruits[position]) {
        is Fruit.Apple -> R.layout.item_apple
        is Fruit.Orange -> R.layout.item_orange
    }
}
```

### IV. Áp dụng Sealed Class thực tế trong Android
- Có rất nhiều cách để áp dụng Sealed Class trong Android Code, dưới đây tôi sẽ chỉ cho bạn cách sử dụng chúng trong Recyclerview.
- Chúng ta sẽ hiển thị list các Fruits trong RecyclerView tương ứng với mỗi ViewHolder.
- Apple có AppleViewHolder, Orange có OrangeViewHolder. Nhưng chúng ta sẽ muốn chắc chắn rằng mỗi Fruit mới được thêm vào sẽ có 1 ViewHolder tương ứng hoặc ko thì sẽ thrown Exception. Hãy xem đoạn code dưới đây

```scala:scala:Kotlin
sealed class Fruit {
    class Apple : Fruit()
    class Orange : Fruit()
}
class FruitAdapter : RecyclerView.Adapter<RecyclerView.ViewHolder>() {
private val fruits = arrayListOf<Fruit>()
override fun getItemCount() = fruits.size

    override fun getItemViewType(position: Int): Int {
        return when (fruits[position]) {
            is Fruit.Apple -> R.layout.item_apple
            is Fruit.Orange -> R.layout.item_orange
        }
    }
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
return when (viewType) {
            R.layout.item_apple -> {
                val itemView = layoutInflater.inflate(R.layout.item_apple, parent, false)
                AppleViewHolder(itemView)
            }
            R.layout.item_orange -> {
                val itemView = layoutInflater.inflate(R.layout.item_orange, parent, false)
                OrangeViewHolder(itemView)
            }
            else -> throw UnknownViewTypeException("Unknown view type $viewType")
        }
    }
override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val fruit = fruits[position]
when (fruit) {
            is Fruit.Apple -> (holder as AppleViewHolder).bind(fruit)
            is Fruit.Orange -> (holder as OrangeViewHolder).bind(fruit)
        }
    }
// ... other methods
}
```

- [Sealed-Classes](https://kotlinlang.org/docs/reference/sealed-classes.html)
- [Understanding Kotlin Sealed Classes](https://proandroiddev.com/understanding-kotlin-sealed-classes-65c0adad7015)