# Kotlin Setter and getter

## Field and property
Mình bắt đầu học Kotlin từ Java nên khi tiếp xúc với `field` và `property` trong `Kotlin` thì không hiểu rõ bởi vì Java không có `property`. (https://stackoverflow.com/questions/2963243/does-java-have-something-similar-to-c-sharp-properties)  

Sau một thời gian tìm kiêm mình thấy, `field` và `property` ở Kotlin cũng tương tự như C# nên mình nghĩ chúng ta có thể hiểu sự khác biệt của `field` và `property` trong `Kotlin` như trong `C#`
(https://stackoverflow.com/questions/295104/what-is-the-difference-between-a-field-and-a-property)

## Example sử dụng setter và getter trong Kotlin

### 1 ) Example default `setter` and `getter` for **property** `firstName` in Kotlin

```java
class Person {
    var firstName: String = ""
            get() = field       // field here ~ `this.firstName` in Java or normally `_firstName` is C#
            set(value) {
                field = value
            }

}
```

**Using**
```java
val p = Person()
p.firstName = "A"  // access setter
println(p.firstName) // access getter (output:A)
```

**IF** your `setter` or `getter` is **exactly same** above, you can remove it because it is **unnecessary**

### 2) Example custom setter and getter. 
```
const val PREFIX = "[ABC]"

class Person {

    // set: if value set to first name have length < 1 => throw error else add prefix "ABC" to the name
    // get: if name is not empty -> trim for remove whitespace and add '.' else return default name
    var lastName: String = ""
        get() {
            if (!field.isEmpty()) {
                return field.trim() + "."
            }
            return field
        }
        set(value) {
            if (value.length > 1) {
                field = PREFIX + value
            } else {
                throw IllegalArgumentException("Last name too short")
            }
        }
}
```
**Using**
```
    val p = Person()
    p.lastName = "DE         " // input with many white space
    println(p.lastName)  // output:[ABC]DE.
    p.lastName = "D" // IllegalArgumentException since name length < 1
```
 
### Reference
Here is some relevant post which talk about `field` and `property` in Java and Kotlin.  
https://blog.kotlin-academy.com/kotlin-programmer-dictionary-field-vs-property-30ab7ef70531