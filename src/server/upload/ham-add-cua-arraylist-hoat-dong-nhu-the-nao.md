![image.png](https://images.viblo.asia/abb92621-9c71-46d7-92cb-06a33647e856.png)
> Khi coding với Java/Kotlin, chúng ta thường rất hay phải thao tác với các sub class của List điển hình là ArrayList. Nó thông dụng đến mức làm chúng ta đôi khi quên đi kiểu dữ liệu mảng (Array) - Cấu trúc dữ liệu quy định các phần tử phải có cùng kiểu và kích thước cố định không thể thay đổi.

**Vậy tại sao ArrayList có thể add/remove phần tử rất tiện lợi như thế ? Hãy cùng nhau tìm hiểu nhé.**

Nhảy vào source code Java, dễ dàng thấy được ArrayList chỉ là một 'tờ giấy gói xôi' =)) Bên trong nó sử dụng một mảng object để chứa data:
```    transient Object[] elementData; // non-private to simplify nested class access```
Và cũng vì Object là kiểu dữ liệu lớn nhất trong Java (Mọi người hay gọi vui là Father Of Big - Bố của to) nên List cho phép chúng ta có thể generics để hold kiểu dữ liệu bất kì.

Có một số khái niệm cần làm rõ trước khi bắt đầu: 
- Capacity: Sức chứa của mảng là số lượng phần tử tối đa mà mảng `elementData` có thể chứa.
- Length: Số lượng phần tử thực tế đã được add vào mảng. Và như vậy thì length <= capacity.

Bây giờ chúng ta sẽ đi qua các step hoạt động của hàm add() nhé:

```java
public boolean add(E e) {
        ensureCapacityInternal(size + 1);  // Increments modCount!!
        elementData[size++] = e;
        return true;
    }
 ```
 Thật sự rất đơn giản, chỉ cần đảm bảo mảng `elementData` có đủ không gian và sau đó chèn phần tử mới vào cuối mảng là xong.

 Tuy nhiên ta sẽ tìm hiểu hàm ensureCapacityInternal(), đây là hàm đảm bảo việc request thêm không gian để có thể chứa thêm phần tử mới được add vào.
 Mặc định, mảng sẽ được khởi tạo với không gian đủ để chứa **10 phần tử**, nếu như không gian chứa đã hết thì hàm grow() sẽ được gọi.

 Hàm grow() phụ trách 2 việc:
 1. Tăng kích thước của mảng elementData.

 ```java
      private void grow(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        // minCapacity is usually close to size, so this is a win:
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
    ```

    Logic tại đây khá rõ ràng, số lượng phần tử của mảng mới: 
    - Mặc định gán: newCapacity = 1.5 * length hiện tại của mảng.  ```  int newCapacity = oldCapacity + (oldCapacity >> 1);``` Phép dịch bit sang phải 1 bit là phép chia cho 2. => oldCapacity + (oldCapacity >> 1) = 1.5 * oldCapacity;
    - Nếu newCapacity vẫn nhỏ hơn số lượng mong muốn minCapacity thì sẽ gán luôn newCapacity = minCapacity
    - Nếu như minCapacity <= Integer.MAX_VALUE - 8 thì sẽ gán minCapacity = Integer.MAX_VALUE - 8
    - Nếu như minCapacity > Integer.MAX_VALUE - 8 thì sẽ gán minCapacity = Integer.MAX_VALUE luôn cho vừa lòng hả dạ =))
Như vậy thì số lượng phần tử tối đa mà một ArrayList có thể chứa chính là Integer.MAX_VALUE = 2147483647;

 2. Copy các phần tử của mảng hiện tại sang mảng mới.
Vì mảng có tính chất là không thể thay đổi số lượng phần tử, vậy nên việc tăng kích cỡ cho mảng đồng nghĩa với việc tạo một mảng mới có nhiều phần tử hơn sau đó mang các giá trị của mảng hiện tại sang.
Vậy Oracle sử dụng vòng lặp trên Java để thực hiện việc này ? Tất nhiên là không được, không ty đầu hàng công nghệ không thể làm theo cách dễ dàng như vậy được. Việc copy element của mảng cũ sang mảng mới được thực hiện thông qua hàm Arrays.copyOf()

 ```java
public static <T,U> T[] copyOf(U[] original, int newLength, Class<? extends T[]> newType) {
        @SuppressWarnings("unchecked")
        T[] copy = ((Object)newType == (Object)Object[].class)
            ? (T[]) new Object[newLength]
            : (T[]) Array.newInstance(newType.getComponentType(), newLength);
        System.arraycopy(original, 0, copy, 0,
                         Math.min(original.length, newLength));
        return copy;
    }
 ```
 
 Tiếp theo copyOf() sẽ call đến System.arraycopy() để thực hiện copy các phần tử từ mảng `original` từ vị trí bắt đầu là 0 sang mảng `copy` với số lượng là `newLength` = `newCapacity` vừa tính toán được ở bước trước.

 ```java
  public static native void arraycopy(Object src,  int  srcPos,
                                        Object dest, int destPos,
                                        int length);
```
Đến đây ta thấy rằng System.arraycopy là một native method được viết bằng C++, nó thực hiện việc copy các phần tử của mảng nguồn `src` sang mảng đích `dest`
System.arraycopy() được sử dụng rất rất nhiều vậy nên nó được tối ưu bộ nhớ và cung cấp thông qua hàm memmove() [Bionic Libc](https://android.googlesource.com/platform/bionic/+/81a844a%5E%21/). Nếu như platform có sẵn thì nó sẽ được sử dụng, nếu không thì [Dalvik_java_lang_System_arraycopy](https://android.googlesource.com/platform/dalvik.git/+/android-4.2.2_r1/vm/native/java_lang_System.cpp) sẽ được sử dụng thay thế.

------------------
Hoá ra những thứ mà chúng ta vẫn thường sử dụng bấy lâu nay được xây dựng vô cùng phức tạp và công phu, abstract dưới nhiều tầng mà phải đào sâu tìm hiểu rất kĩ mới có thể hiểu được.