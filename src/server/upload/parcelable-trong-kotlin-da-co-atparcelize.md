![](https://images.viblo.asia/038ccc7c-5914-4348-b41b-17df3b070b16.jpg)

#### **Bạn dùng cách nào để truyền data giữa các activity khi code Android bằng Kotlin?**

##### Với các kiểu nguyên thủy thì bạn có thể thực hiện ngay thông qua Bundle

```kotlin
    bundle.putString("A_STRING", "some string")
    bundle.putInt("A_NUMBER", 1234)
    bundle.put("AN_OBJECT", person) // compilation error
```

##### Thế còn với các object thì sao nhỉ?

- `Serializable`?
- Thông qua `String`
- `EventBus` / `Otto`?
- `Parcelable`?

`Serializable` dễ dàng cài đặt nhưng hiệu năng không được tốt lắm cho Android.

Bạn có thể truyền object dưới dạng `String`, cách này khá dễ làm và đặc biệt đơn giản hơn khi bạn có sử dụng một vài thứ tương tự `Gson` trong project. Tuy nhiên vẫn chưa phải là lựa chọn tốt nhất

Các thư viện bus như `EventBus` hay `Otto` thì dễ sử dụng và có hiệu năng khá ổn, tuy nhiên nếu dùng nhiều thì code sẽ trở nên rất phức tạp.

`Parcelable` cho hiệu năng rất tốt với Android, tuy nhiên nó lại có quá nhiều code thừa. Và mỗi khi model thay đổi thì ta sẽ cần phải update lại code parcelable.

#### Parcelize

Thật tuyệt vời khi Kotlin version 1.1.4 đã hỗ trợ sẵn cho parcelable, giải quyết vấn đề code thừa và phải cập nhật lại parcelable khi thay đổi model.

Bạn chỉ cần định nghĩa model và thêm annotation `@Parcelize` thì các phương thức `writeToParcel()`/`createFromParcel()` sẽ được sinh ra một cách tự động.

Yêu cầu:

- `Kotlin version 1.1.4`  trở lên

- Thêm vào app `build.gradle`

```kotlin
apply plugin: ‘kotlin-android-extensions’
androidExtensions {
    experimental = true
}
```

## Thực hành

Giả sử mình có một model như sau và cần thực hiện việc implement Parcelable trong Kotlin.

```kotlin
data class Person(val name: String, val age: Int, val email: String, val phone: Long)
```

### Cách thông thường

Android Studio đã hỗ trợ sẵn việc implement Parcelable theo cách này, bạn chỉ cần làm theo hình bên dowis và sẽ có kết quả như sau

![](https://images.viblo.asia/bd2e7572-2847-40a2-bfab-4f9ca4d23a18.png)

```kotlin
package com.quanda.moviedb.data.model

import android.os.Parcel
import android.os.Parcelable

data class Person(val name: String, val age: Int, val email: String, val phone: Long) : Parcelable {
    constructor(parcel: Parcel) : this(
            parcel.readString(),
            parcel.readInt(),
            parcel.readString(),
            parcel.readLong()) {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(name)
        parcel.writeInt(age)
        parcel.writeString(email)
        parcel.writeLong(phone)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<Person> {
        override fun createFromParcel(parcel: Parcel): Person {
            return Person(parcel)
        }

        override fun newArray(size: Int): Array<Person?> {
            return arrayOfNulls(size)
        }
    }
}
```

Như mình đã nói từ trước thì có khá nhiều code mẫu thừa. Có thể việc implement kiểu này không khó do chúng ta đã được Android Studio hỗ trợ sẵn. Tuy nhiên số lượng code sinh ra (khoảng 28 LOC) khá là nhiều so với một model nhỏ. Hơn nữa khi mà model của chúng ta thay đổi thì ta sẽ phải quay lại cập nhật constructor và writeToParcel(),

### Parcelize

Để implement Parcelable chúng ta chỉ cần thêm `@Parcelize` và `: Parcelable` như sau

```kotlin
package com.quanda.moviedb.data.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class Person(val name: String, val age: Int, val email: String, val phone: Long) : Parcelable
```

Thật tuyệt vời phải không nào? Không còn nhiều code mẫu thừa nữa. Các đoạn code cần thiết đó sẽ được tự động sinh ra và chúng ta không cần quan tâm về nó kể cả khi tạo mới hay là update model.

**Lưu ý:** Bạn hãy cập nhật phiên bản Android Studio và Kotlin mới nhất để có thể tránh lỗi không muốn nhé.

# Tham khảo

https://proandroiddev.com/parcelable-in-kotlin-here-comes-parcelize-b998d5a5fcac

https://android.jlelse.eu/yet-another-awesome-kotlin-feature-parcelize-5439718ba220