Bài viết gốc được đăng tải tại: [laptrinhb2a.com](https://www.laptrinhb2a.com/)

Nếu anh em để ý thì nhiều khi ngôn ngữ lập trình giống như người yêu của anh em vậy. Có những lúc khó hiểu vô cùng, vô lý vô cùng.

Nhưng mà thực ra đó là khi anh em không chịu hiểu người ta thôi, còn khi anh em hiểu họ rồi thì mọi thứ lại rất đơn giản. Thậm chí anh em còn có thể thao túng cảm xúc của họ nữa 😁😁😁

Trong bài viết này mình sẽ cùng anh em tìm hiểu một vấn đề tương tự như vậy trong ngôn ngữ lập trình Java. Tin mình đi, hãy đọc hết bài viết không tốn 10' của anh em đâu ha!

## 1/ Sao em vô lý thế!

Câu này mình tin chắc nhiều anh em có người yêu mà yêu nhau được một thời gian rồi thì đều phải thốt lên ít nhất một lần (một sự cay cú không hề nhẹ 😤😤😤)

Quay lại vấn đề của chúng ta, bây giờ nếu không ăn gian bằng cách chạy code mà dựa vào kiến thức sẵn có thì anh em sẽ chọn đáp án nào trong ảnh bên dưới.

![](https://images.viblo.asia/abe7a644-ba17-48a0-ba68-d8ef04b6a105.png)

Tất nhiên là với cái tiêu đề to lù lù của bài viết thì chắc anh em cũng đoán được đáp án là C. Cơ mà kể cả khi đoán được đáp án thì mình tin chắc nhiều anh em vẫn thắc mắc sao lại là C (ai đó giải thích giùm tôi với 🙃)

Đến đây anh em thấy tôi nói đúng chưa, vậy hãy đọc tiếp để biết tại sao lại là C nha.

## 2/ Em không vô lý, anh mới vô lý!

Ủa, tôi làm gì sai đâu mà bà kêu tôi vô lý, một vừa hai phải thôi nhé 😤 Rồi xong, khi anh em buông câu này thì xác định ôm gối ra sofa ngủ (còn ôm được gối không thì tôi không biết đâu 😁)

Quay lại với vấn đề của chúng ta, đáp án là C nghe có vẻ vô lý nhưng thực ra người sai lại chính là anh em lập trình viên chúng ta. Vậy chúng ta đã sai ở đâu?

**Với những anh em chọn A:** có lẽ vẫn chưa nắm chắc về các kiểu dữ liệu trong Java, trong Java có 2 nhóm kiểu dữ liệu là Primitive Types và Reference Types

Primitive Types (long, int, short, byte, float, double, char, boolean): với các biến có kiểu dữ liệu này thì chúng ta có thể so sánh giá trị thông qua toán tử "==" (vì giá trị được lưu trực tiếp dưới dạng các bit nhị phân)

Reference Types (Classes, Interfaces, Enums, Arrays...):

+ Với các biến có kiểu dữ liệu này thì bản chất chúng không lưu giá trị dưới dạng bit nhị phân mà chúng lưu địa chỉ vùng nhớ của đối tượng có giá trị tương ứng.

+ Ví dụ: Integer x = new Integer(21) và Integer y = new Integer(21) thì bản chất x và y sẽ lưu địa chỉ vùng nhớ nơi mà hai đối tượng được tạo ra thông qua hai lệnh new Integer(21)

Vậy là anh em chọn A biết mình sai ở đâu rồi, các biến mình dùng ở đây là kiểu Reference Types nên việc anh em sử dụng toán tử "==" để so sánh là anh em đang so sánh hai địa chỉ ô nhớ khác nhau. Và rõ ràng chúng sẽ không thể nào bằng nhau được.

Nếu muốn đúng anh em phải so sánh bằng hàm equals() như sau:

```JAVA
Integer a = 500, b = 500;
System.out.println(a.equals(b)); // true

Integer x = 100, y = 100;
System.out.println(x.equals(y)); // true
```

Vậy tại sao so sánh bằng hàm equals() lại đúng thì mời anh em xem code của hàm đó, bản chất hàm này sẽ lấy ra giá trị của đối tượng thông qua hàm intValue() rồi đem so sánh hai giá trị đó thôi.

```JAVA
public boolean equals(Object obj) {
    if (obj instanceof Integer) {
        return value == ((Integer)obj).intValue();
    }
    return false;
}
```

**Với những anh em chọn B**: mình tin chắc sẽ ngồi rung đùi và nghĩ:"Dăm ba câu này không làm khó được anh đâu 😂😂😂"

Để rồi khi nghe đáp án là C thì không phục, mở máy lên code rồi chạy thử... và... oh no... Sao lại thế nhỉ? Sao lại là C được nhỉ?

👉Câu hỏi của những anh em chọn B cũng chính là chủ đề mình muốn nói trong bài viết này. Anh em ráng đọc đến cuối bài để biết tại sao nha.

**Với những anh em chọn D**: chắc anh em nhóm này có họ hàng với Tào Tháo vì có kiến thức để loại A nhưng lại đa nghi vì nếu chọn B thì game dễ quá. Thành ra 50-50 C và D, nhưng lại đen chọn đúng đáp án sai 😆

**Với những anh em chọn C**: trừ mấy anh em khoanh lụi ra thì xứng đáng có 10 ny hết, để chọn được C mình tin là anh em cũng phải nắm được Java ở một mức nào đó.

## 3/ Anh xin lỗi, anh sai rồi!

Khi anh em nhận ra:"*Người yêu không sai, anh em sai!*" thì mình tin chắc anh em cũng đã hiểu được tại sao chọn B lại sai.

Câu hỏi là nếu kết quả đầu tiên trả về false vì chúng đang trỏ đến hai object khác nhau. Vậy thì kết quả thứ 2 trả về true vì chúng đang trỏ đến cùng một object?

Để trả lời được câu hỏi này chúng ta phải mổ xẻ lớp Integer.java một chút. Trong lớp này có một lớp là IntegerCache như sau:

```JAVA
/**
 * Cache to support the object identity semantics of autoboxing for values between
 * -128 and 127 (inclusive) as required by JLS.
 *
 * The cache is initialized on first usage.  The size of the cache
 * may be controlled by the {@code -XX:AutoBoxCacheMax=<size>} option.
 * During VM initialization, java.lang.Integer.IntegerCache.high property
 * may be set and saved in the private system properties in the
 * jdk.internal.misc.VM class.
 */
	 
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high value may be configured by property
        int h = 127;
        String integerCacheHighPropValue =
                VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
            } catch( NumberFormatException nfe) {
                // If the property cannot be parsed into an int, ignore it.
            }
        }
        high = h;

        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);

        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert Integer.IntegerCache.high >= 127;
    }

    private IntegerCache() {}
}
```

Các bạn hãy để ý mô tả của lớp này: "***Cache to support the object identity semantics of autoboxing for values between -128 and 127 (inclusive) as required by JLS***"

Có nghĩa là khi bạn khai báo các số nguyên (kiểu Integer) trong khoảng từ **-128 tới 127** thì chúng sẽ được lưu vào cache.

Cụ thể là nếu như bạn khai báo Integer x = 100 thì bản chất nó là Integer x = Integer.valueOf(100). Tự dưng lòi đâu ra cái hàm valueOf() vậy? Thì cũng ở trong lớp Integer.java luôn:

```JAVA
@HotSpotIntrinsicCandidate
public static Integer valueOf(int i) {
    if (i >= Integer.IntegerCache.low && i <= Integer.IntegerCache.high)
        return Integer.IntegerCache.cache[i + (-Integer.IntegerCache.low)];
    return new Integer(i);
}
```

Nhìn vào hàm này ta thấy rằng các số nguyên trong vùng cache (mặc định là từ -128 đến 127) sẽ được trả về cùng một đối tượng. Và đó cũng là lý do tại sao kết quả thứ 2 lại trả về true.

Cơ mà cache làm chị vậy? Sao lại cache từ -128 đến 127 mà không phải khoảng khác?

Trả lời cho câu hỏi "làm chị vậy?" thì anh em chắc cũng biết tác dụng của việc cache rồi. Nó giúp chúng ta tiết kiệm không gian bộ nhớ khi phải tạo ra quá nhiều đối tượng có giá trị giống nhau.

Còn về việc sao lại chỉ cache từ -128 đến 127 thì nguyên nhân đây là khoảng giá trị được sử dụng nhiều với kiểu số nguyên (chắc mấy bác thống kê thấy vậy!) nên chọn mặc định khoảng này. 

Hơn nữa nếu cache toàn bộ khoảng số nguyên thì cũng phải sử dụng quá nhiều bộ nhớ. Chính vì vậy chọn cache một khoảng có các giá trị được dùng nhiều là một ý tưởng rất hay.

Note: với các kiểu dữ liệu tham chiếu khác (Long, Short...) thì cũng có cơ chế cache tương tự (khoảng cache có thể nhau). Anh em tự tìm hiểu thêm nhé!

## 4/ Thế để trà sữa nói thay lời anh vậy!

Okay, biết mình sai, nhận sai rồi thì anh em phải hành động để người ta thực sự hết giận. Mà cách tốt nhất là đánh vào cảm xúc, vậy cái gì tạo ra cảm xúc? Đồ ăn chứ gì nữa 😁😁😁

Tương tự với vấn đề của chúng ta, ở đây mình có thể sử dụng Reflection API trong Java để thay đổi kết quả của phép tính như sau:

```JAVA
public static void main(String[] args) {
    try {
        Class cache = Integer.class.getDeclaredClasses()[0]; // (1)
        Field fieldCache = cache.getDeclaredField("cache"); // (2)
        fieldCache.setAccessible(true); // (3)
        Integer[] newCache = (Integer[]) fieldCache.get(cache); // (4)

        // (5)
        int idx0 = 128; // index của 0
        int idx1 = 129; // index của 1
        newCache[idx0] = newCache[idx1];

        Integer a = 0;
        Integer b = 1;

        System.out.println(a + b);
    }catch (NoSuchFieldException | IllegalAccessException ex ) {
        ex.printStackTrace();
    }
}
```

Kết quả khi các bạn chạy chương trình sẽ là: 2 (ảo thật đúng không!). Giải thích chút ha!

(1) -  Mình dùng biến cache tham chiếu tới lớp IntegerCache bên trong lớp Integer.java

(2) -  Sau đó tạo field có tên là fieldCache tham chiếu tới field có tên là cache trong class IntegerCache.

(3) -  Tiếp đó mình set quyền truy cập cho field này.

(4) -  Và rồi mình lấy được mảng các số nguyên được cache (là mảng số nguyên từ -128 đến 127)

(5) -  Cuối cùng mình chỉ việc thay đổi giá trị của hai phần tử mình mong muốn thông qua index của chúng trong mảng.

Trong đoạn code bên trên thực ra khai báo Integer a = 0 nhưng bản chất biến a đã không còn trỏ đến vùng nhớ có chứ giá trị là 0 nữa mà bị trỏ đến vùng nhớ có giá trị là 1. Dẫn đến kết quả của phép tính là 2 chứ không phải là 1.

## 5/ Kết luận?

Hi vọng qua bài viết ngắn này cùng với một chút liên tưởng nhẹ nhàng mà thực tế có thể giúp anh em rút ra nhiều điều thú vị.

Nếu thấy bài viết hay và bổ ích thì hãy comment cho mình biết và chia sẻ cho bạn bè của anh em cùng đọc nha.

Bài viết có tham khảo một số nguồn trong nước và nước ngoài:

https://dzone.com/articles/java-integer-cache-why-integervalueof127-integerva

https://tubean.github.io/2018/11/magical-1000-vs-100/

Thanks all!💗💗💗