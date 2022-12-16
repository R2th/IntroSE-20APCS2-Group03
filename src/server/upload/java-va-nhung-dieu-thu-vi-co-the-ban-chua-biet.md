> Hôm nay mình sẽ chia sẻ một số điều thú vị trong Java mà bạn có thể chưa biết đến. 
> 
> Lưu ý những chia sẻ này chỉ mang tính chất tìm hiểu thôi không nên áp dụng vào trong dự án của bạn hoặc của công ty bạn. Vì điều này không được phép ở cấp độ ngôn ngữ Java nó là một chủ đề của kiểm tra bảo mật và bị cấm trong nhiều môi trường máy chủ doanh nghiệp.
# 1. Bạn có nghĩ có thể truy cập biến private từ một class khác không ?
Các phương thức, biến và constructor mà được khai báo private chỉ có thể được truy cập trong chính lớp được khai báo đó.
Các biến được khai báo `private` chỉ có thể được truy cập bên ngoài lớp nếu phương thức `public getter` có mặt trong lớp đó.

Đó là những gì ta biết về `Private` 

Nhưng mình sẽ cho bạn thấy những điều thú vị sau một ví dụ dưới đây những gì cần đến chỉ là phương thức:

 `java.lang.reflect.AccessibleObject.setAccessible(boolean)`

Nếu java không cho truy cập vào một biến private từ một class khác thì hãy sử dụng phương thức Field với quyền truy cập setAccessible(true) để có thể truy cập vào biến hoặc phương thức đó

Ví dụ sau đây sẽ cho bạn thấy việc truy cập và cập nhật một biến private từ một class khác.

Nào chúng ta bắt đầu vào code ->>>

**A.class**
```
public class A
    {
        private int mField = 50;
    }
```
**AccessPrivate.class**
```
public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {
        final A instance = new A(  );
        Field fieldA = A.class.getDeclaredField( "mField" );
        fieldA.setAccessible( true );
        
        System.out.println("Giá trị hiện tại: "+fieldA.get(instance));
        fieldA.setInt( instance, 100 );
        System.out.println( "Giá trị sau khi thay đổi: "+fieldA.get(instance));
    }
```
**Kết quả:**
```
run:
Giá trị hiện tại: 50
Giá trị sau khi thay đổi: 100
BUILD SUCCESSFUL (total time: 0 seconds)
```
Mặc dù tại class A biến mField đã được khai báo là `private` nhưng vẫn có thể được lấy ra khi ở class `AccessPrivate` và ta cũng có thể thấy nó được thay đổi từ 50 thành 100

Bắt đầu thấy thú vị rồi đây :upside_down_face::upside_down_face:
# 2. Biến Final có thay đổi được không ?
Lại một câu hỏi đáng buồn cười nữa :joy::joy:
> Nhưng câu trả lời lại là có, tiếp tục theo dõi ví dụ tiếp theo nhé
> 
Cách này sẽ phức tạp hơn 1 chút:

Bây giờ chúng ta cần cập nhật một trường tĩnh nó sẽ không thành vấn đề nếu là `private` như trên. Nhưng `Java` chỉ ra rằng các biến `final static` được khởi tạo trong `Compile Time`. Nó làm cho các bản cập nhật cho các trường nguyên thủy hoặc chuỗi gốc gần như vô dụng. Cách duy nhất để có được giá trị mới sẽ là thông qua sự phản chiếu.

Việc cần làm bây giờ là áp dụng cùng một thủ thuật 2 lần. Trước hết, làm cho chính trường có thể truy cập. Sau đó xóa `final` và sửa đổi từ trường này. Để thực hiện việc này, bạn sẽ phải cập nhật trường` java.lang.reflect.Field.modifier `làm cho nó có thể truy cập và cập nhật.

Mọi người cùng tiếp tục xem ví dụ tiếp theo:

**A.class**
```
    public class A
    {
        private final static int FIELD = 50;
    }
```
**ChangeFinal.class**
```
public class ChangeFinal {
    public static void main(String[] args) throws NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
        final A instance = new A(  );
        Field fieldA = A.class.getDeclaredField( "FIELD" );
        fieldA.setAccessible( true );
//        System.out.println("Giá trị hiện tại: "+fieldA.get(instance));
      
        Field modifiersField = Field.class.getDeclaredField("modifiers");
        modifiersField.setAccessible(true);
        modifiersField.setInt(fieldA, fieldA.getModifiers()&~Modifier.FINAL);
        
        fieldA.set(instance, 100);
        System.out.println( "Giá trị sau khi thay đổi từ 50 : "+fieldA.get(instance));
 }
}
```
**Kết quả:**
```
run:
Giá trị sau khi thay đổi từ 50 : 100
BUILD SUCCESSFUL (total time: 0 seconds)
```

Đầu tiên ta truy cập vào biến từ một class khác 

`fieldA.setAccessible( true );`

Sau đó ta cập nhật lại trường 

`java.lang.reflect.Modifier`
```
Field modifiersField = Field.class.getDeclaredField("modifiers");
modifiersField.setAccessible(true); 
modifiersField.setInt(fieldA, fieldA.getModifiers()&~Modifier.FINAL);
```
Vậy là chúng ta đã thay đổi một biến final từ 50 thành 100

Nếu bạn mở đoạn comment mà mình đã comment lại kia thì sẽ thấy lỗi 
> Can not set static final int field java_secret.A.FIELD to java.lang.Integer
> 
Vì cách này chỉ hiệu quả khi biến `final` chưa được sử dụng. Ở đây bạn đã sử dụng đến nên sẽ có thông báo không thể thay đổi được:laughing:.
# 3. Unsafe kẻ nguy hiểm nhưng cũng vô cùng thú vị
Hai phương pháp trên đây về việc cập nhật trường `final` chỉ sử dụng các khả năng JDK chính thức của `Java` . Bây giờ, hãy sử dụng chút mánh chúng ta sẽ sử dụng `sun.misc.Unsafe` để thực hiện các cập nhật tương tự. Chúng ta sẽ kết thúc với một mã ngắn hơn so với các ví dụ trước nhưng độ nguy hiểm của nó cũng khó lường.

Về việc cập nhật các đối tượng Java thông qua `sun.misc.Unsafe` là tất cả các trường Java có thể được giải quyết bằng cách bù đắp từ địa chỉ của đối tượng. Áp dụng tương tự cho các trường tĩnh phần bù của chúng được tính từ lớp đối tượng.
Để thay đổi bạn cần phải có 3 đối số
- Đối số đầu tiền là đối tượng cơ sở (đối tượng cơ sở cho các trường tĩnh là đối tượng Class của chúng. Thật không may, nó không được ghi lại. Thay vào đó, bạn nên sử dụng phương thức `Object Unsafe.staticFieldBase` công khai để lấy đối tượng cơ sở cho các trường tĩnh)
- Đối số thứ hai là trường bù sử dụng `Unsafe.objectField Offerset ()` cho các trường đối tượng và U`nsafe.staticField Offerset()` cho các trường tĩnh
- Đối số thứ ba là giá trị cần đặt.
Nào bắt tay vào nào:

**A.class**
```
public class A {
    private static final Integer NOT_SO_CONSTANT = 50;
    public static int getNotSoConstant()
    {
        return NOT_SO_CONSTANT;
    }
}
```
**FinalUnsafe.class**
```
public class FinalUnsafe {
    private static final Unsafe unsafe;
    static
    {
        try
        {
            Field field = Unsafe.class.getDeclaredField("theUnsafe");
            field.setAccessible(true);
            unsafe = (Unsafe)field.get(null);
        }
        catch (Exception e)
        {
            throw new RuntimeException(e);
        }
    }
 
 
    public static void main(String[] args) throws NoSuchFieldException {
        updateFinal();
        updateFinalStatic();
    }
 
    private static void updateFinalStatic() throws NoSuchFieldException {
        System.out.println( "Giá trị của biến static final cũ  = " + A.getNotSoConstant() );
       //Cập nhật đối số
        final Field fieldToUpdate = A.class.getDeclaredField( "NOT_SO_CONSTANT" );
        //lấy lớp cơ sở
        final Object base = unsafe.staticFieldBase( fieldToUpdate );
        //đây là trường bù
        final long offset = unsafe.staticFieldOffset( fieldToUpdate );
        //thực hiện cập nhật
        unsafe.putObject( base, offset, 100 );
        System.out.println( "Giá trị của biến static final mới = " + A.getNotSoConstant() );
    }
 
    private static void updateFinal() throws NoSuchFieldException {
        final JustFinal obj = new JustFinal( 5 );
        System.out.println( "Giá trị của biến private final cũ = " + obj.getField() );
        final Field fieldToUpdate = JustFinal.class.getDeclaredField( "m_field" );
        final long offset = unsafe.objectFieldOffset( fieldToUpdate );
        unsafe.putInt( obj, offset, 15 );
        System.out.println( "Giá trị của biến private final mới = " + obj.getField() );
    }
 
    private static final class JustFinal
    {
        private final int m_field;
 
        public JustFinal(int field) {
            m_field = field;
        }
 
        public int getField() {
            return m_field;
        }
 }
} 
```
**Kết quả**
```
run:
Giá trị của biến private final cũ = 5
Giá trị của biến private final mới = 15
Giá trị của biến static final cũ  = 50
Giá trị của biến static final mới = 100
BUILD SUCCESSFUL (total time: 0 seconds)
```
# 4. Tổng kết
- Nếu bạn muốn cập nhật trường private hoặc trường final bằng cách sử dụng phản chiếu Java - hãy tạo Phương thức hoặc Trường có thể truy cập được qua thông qua phương thức `Field.setAccessible (true)` và sau đó đặt giá trị mới.
- Nếu bạn muốn cập nhật tường` final static `bạn sẽ cần thực hiện 2 bước: làm cho trường có thể truy cập được và sau đó tạo trường sửa đổi có thể truy cập của trường bạn muốn cập nhật và xóa cờ cuối cùng khỏi bộ sửa đổi
- Bạn cũng có thể cập nhật các trường final hoặc static final bằng `sun.misc.Unsafe`. Sử dụng các phương thức `Unsafe.put* (base, offset, newValue)` để cập nhật. `sun.misc.Unsafe` có chứa đựng khá nhiều sự thú vị mình sẽ cố gắng tìm hiểu kỹ và chia sẻ tới mọi người trong một bài viết khác.

Tham khảo:

https://stackoverflow.com/questions/3301635/change-private-static-final-field-using-java-reflection

http://paginaswebpublicidad.com/questions/704/tai-sao-sun-misc-unsafe-ton-tai-va-lam-the-nao-no-co-the-duoc-su-dung-trong-the-gioi-thuc-da-dong