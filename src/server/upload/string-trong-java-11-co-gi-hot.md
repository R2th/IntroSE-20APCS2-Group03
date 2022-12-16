JDK 11 vừa release cách đây mấy ngày thôi, là tín đồ của Java mọi người sẽ quan tâm tới việc bản JDK mới này có gì hấp dẫn. Trong nội dung bài viết này mình sẽ giới thiệu qua một số API mới liên quan đến String nhé! Chúng ta hãy cùng xem một số tính năng đó là gì và cách chúng hoạt động.

![](https://images.viblo.asia/48232f6d-3ea8-4d48-a9bc-204562490ca4.jpg)

# String#repeat

Một trong những bổ sung thú vị nhất cho String API là phương thức repeat(). Phương pháp này cho phép ghép một String với chính nó một số lần nhất định:

```
var string = "framgia vietnam ";
var result = string.repeat(2); // framgia vietnam framgia vietnam
```

Nếu bạn cố gắng repeat một String 0 lần, bạn sẽ luôn nhận được một empty String, cool ^^:

```
void shouldRepeatZeroTimes() {
    var string = "foo";
    var result = string.repeat(0);
    System.out.println(result); // print empty ^^
}
```

Điều tương tự cũng áp dụng cho việc repeat một empty String:

```
void shouldRepeatEmpty() {
    var string = "";
    var result = string.repeat(Integer.MAX_VALUE);
    System.out.println(result); // print empty ^^
}
```

Thoạt nhìn qua thì ta nghĩ ngay rằng nó chỉ dựa vào một StringBuilder bên dưới, nhưng đó không phải vậy. Phần implement bên dưới thực sự rất hoàn hảo về mặt hiệu quả sử dụng resouce:

```
public String repeat(int count) {
    if (count < 0) {
        throw new IllegalArgumentException("count is negative: " + count);
    }
    if (count == 1) {
        return this;
    }
    final int len = value.length;
    if (len == 0 || count == 0) {
        return "";
    }
    if (len == 1) {
        final byte[] single = new byte[count];
        Arrays.fill(single, value[0]);
        return new String(single, coder);
    }
    if (Integer.MAX_VALUE / count < len) {
        throw new OutOfMemoryError("Repeating " + len + " bytes String " + count +
                " times will produce a String exceeding maximum size.");
    }
    final int limit = len * count;
    final byte[] multiple = new byte[limit];
    System.arraycopy(value, 0, multiple, 0, len);
    int copied = len;
    for (; copied < limit - copied; copied <<= 1) {
        System.arraycopy(multiple, 0, multiple, copied, copied);
    }
    System.arraycopy(multiple, 0, multiple, copied, limit - copied);
    return new String(multiple, coder);
}
```

Từ quan điểm của *Compressed String*, đoạn code sau có thể trông đáng ngờ ngay từ cái nhìn đầu tiên (chuỗi ký tự đơn không phải Latin chiếm hai byte), nhưng điều quan trọng hơn là *value.length* là kích thước của mảng byte nội bộ, chứ không không phải của String:

```
final int len = value.length;
// ...
if (len == 1) {
    final byte[] single = new byte[count];
    Arrays.fill(single, value[0]);
    return new String(single, coder);
}
```

# String#isBlank

Đó là một API siêu đơn giản. Bây giờ, chúng ta có thể kiểm tra xem một String là empty hay không, hoặc không chứa tất cả là khoảng trắng:

```
var result = " ".isBlank(); // true
```

Tạm biệt các loại Utils nhé :v 

# String#strip

Chúng ta có thể dễ dàng loại bỏ tất cả khoảng trắng từ String ngay bây giờ:

```
assertThat(" ".strip()).isEmpty();
```

Điều này sẽ có ích để tránh khoảng trắng quá mức trong Java.

Ngoài ra, chúng ta có thể lựa chọn chỉ loại bỏ khoảng trắng hoặc ở đầu hoặc ở cuối như bên dưới:

```
assertThat("  blabla  ".stripLeading()).isEqualTo("blabla  ");
assertThat("  blabla  ".stripTrailing()).isEqualTo("  blabla");
```

Đọc đến đây có thể bạn sẽ đặt câu hỏi thế thì API này khác với String#trim() như thế nào? Thực ra String#strip là chỉ một lựa chọn khác thôi, tuy nhiên nó base trên khái niệm Unicode-aware - mình tạm dịch là khả năng đoán trước Unicode, chi tiết các bạn tự tìm hiểu nhé :)

# String#lines

Sử dụng phương thức mới này, chúng ta có thể dễ dàng tách một instance của String thành một *Stream<String> * với các dòng riêng biệt:

```
"jav\ndanang".lines().forEach(System.out::println);
// jav
// danang
```

Điều thực sự thú vị là, thay vì tách một String và chuyển đổi nó thành một Stream, thì Spliterator đã được tạo ra (một cho Latin và một cho UTF-16 Strings):

```
private final static class LinesSpliterator implements Spliterator<String> {
    private byte[] value;
    private int index;        // current index, modified on advance/split
    private final int fence;  // one past last index
    LinesSpliterator(byte[] value) {
        this(value, 0, value.length);
    }
    LinesSpliterator(byte[] value, int start, int length) {
        this.value = value;
        this.index = start;
        this.fence = start + length;
    }
    private int indexOfLineSeparator(int start) {
        for (int current = start; current < fence; current++) {
            byte ch = value[current];
            if (ch == '\n' || ch == '\r') {
                return current;
            }
        }
        return fence;
    }
    private int skipLineSeparator(int start) {
        if (start < fence) {
            if (value[start] == '\r') {
                int next = start + 1;
                if (next < fence && value[next] == '\n') {
                    return next + 1;
                }
            }
            return start + 1;
        }
        return fence;
    }
    private String next() {
        int start = index;
        int end = indexOfLineSeparator(start);
        index = skipLineSeparator(end);
        return newString(value, start, end - start);
    }
    @Override
    public boolean tryAdvance(Consumer<? super String> action) {
        if (action == null) {
            throw new NullPointerException("tryAdvance action missing");
        }
        if (index != fence) {
            action.accept(next());
            return true;
        }
        return false;
    }
    @Override
    public void forEachRemaining(Consumer<? super String> action) {
        if (action == null) {
            throw new NullPointerException("forEachRemaining action missing");
        }
        while (index != fence) {
            action.accept(next());
        }
    }
    @Override
    public Spliterator<String> trySplit() {
        int half = (fence + index) >>> 1;
        int mid = skipLineSeparator(indexOfLineSeparator(half));
        if (mid < fence) {
            int start = index;
            index = mid;
            return new LinesSpliterator(value, start, mid - start);
        }
        return null;
    }
    @Override
    public long estimateSize() {
        return fence - index + 1;
    }
    @Override
    public int characteristics() {
        return Spliterator.ORDERED | Spliterator.IMMUTABLE | Spliterator.NONNULL;
    }
}
```

Nguồn [dzone](https://dzone.com/)