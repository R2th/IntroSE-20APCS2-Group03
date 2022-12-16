Kể từ khi ra mắt cách đây hơn hai năm, LiveData đã trở thành một phần không thể thiếu để tiếp cận reactive programing. Tuy nhiên nó vẫn chưa thật sử hoàn hảo khi ta sử dụng
Vấn đề nằm ở observe function 
```kotlin 
val someLiveData : LiveData<String> = ...

someLiveData.observe(this, Observer { someString: String? ->

  // the value from the callback is always nullable
  stringWhichIsNotNull = someString ?: "placeholder message"
}
```

Tuy nhiên, với phiên bản livedata-ktx 2.2.0 , ta có một extention function
```kotlin 
val someLiveData : LiveData<String> = ...

viewModel.someLiveData.observe(this) { someString: String ->
                                      
  // the value from this lambda is inferred as non-nullable
  stringWhichI
```

Vậy chúng ta không cần sử dụng 2 lần hoặc kiểm tra null không cần thiết. Ta có thể viết code thực sự vì nó luô handle nullability một cách chính xác.

Nhưng đôi khi ta không nhận livedata từ thư viện. Đôi khi ta phải tự tạo ra chúng . Trong khi một observer function cho phép chúng ta mất một số bản mẫu ở nơi nhận, nhưng nó không giải quyết được tất cả các vấn đề

```kotlin 
val someLiveData = MutableLiveData<String>()

val currentValue = someLiveData.value

println(currentValue)  // null
```

Ở đoạn code trên ta có thể thấy vấn đề. Loại dữ liệu được cho là String, nhưng value vẫn trả về giá trị null. Ta có thể dễ dàng hiểu tại sao bằng cách nhìn vào Java code

```kotlin
package androidx.lifecycle;

@Nullable
public T getValue() {
  Object data = mData;
  if (data != NOT_SET) {
    return (T) data;
  }
  return null;
```

Nhưng vấn đề nguy hiểm hơn là mặc dù ta đã định nghĩa trong MutableLiveData<String> là non-nullable, nhưng ta vẫn có thể đặt được giá trị của nó thành null 
    
    
```kotlin
val someLiveData = MutableLiveData<String>()

// this compiles!!
someLiveData.value = null
```
    
Tương tự như trước, điều này là do Java. Nó không có cách nào để thực thi nullable phù hợp

```kotlin
package androidx.lifecycle;

public class MutableLiveData<T> extends LiveData<T> {
  ...

  @Override
  public void setValue(T value) {
    super.setValue(value);
  }
```
    
 Nhưng ta có thể sửa chúng
    
 Vì LiveData chỉ là một class, nên ta có thể kế thừa chúng rồi thêm public phương thức set value để nó có thể thay đổi 
    
```kotlin 
@Suppress("UNCHECKED_CAST")
class MutableLiveData2<T>(value: T) : LiveData<T>(value) {

  override fun getValue(): T = super.getValue() as T
  public override fun setValue(value: T) = super.setValue(value)
  public override fun postValue(value: T) = super.postValue(value)
}
```
    
 - Nếu bạn đang dùng MutiableLiveData bạn có thể dẽ dàng sửa đổi lại chúng bằng replace =))) 
    ![](https://miro.medium.com/max/1722/1*3FN6H-ouHl9y99ulChXIyg.png)
    
    Trước đây bạn có thể gán value bằng giá trị null
    ![](https://miro.medium.com/max/1762/1*owgzoFZLFXHnUHMqF1eCqA.png)

  
    Và bây giờ ta không thể gán giá trị bằng null như trước nữa 
    
    ![](https://miro.medium.com/max/1676/1*QZ_2Vm9Qfiurw0d3_xR36w.png)
    
    Nếu thấy hay bạn có thể thử sử dụng chúng 
    
  Tài liệu tham khảo
    
   https://proandroiddev.com/improving-livedata-nullability-in-kotlin-45751a2bafb7