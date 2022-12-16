# Giới thiệu
Nếu bạn đã từng làm với Spring chắc hẳn bạn đã từng sử dụng tới @RequestParam, khi bạn muốn bắt một dữ liệu được truyền từ client về server thì bạn sẽ dùng annotation này để map dữ liệu tương ứng với key name chẳng hạn như @RequestParam("id") Long id;
Bạn có thể thấy với key là id chúng ta sẽ nhận được giá trị là Long id, như vậy có phải là ở trên client sẽ gửi xuống một giá trị kiểu Long hay không? giả sử là đúng thì tương ứng với các kiểu dữ liệu khác thì sao, giả sử chúng ta muốn dữ liệu trả về là một Object thì sao @RequestParam("id") Student student. Như vậy thì kết quả nhận được sẽ là gì?
Như vậy thì chúng ta có thể nhận thấy rằng dữ liệu từ client gửi lên server khi mà nhận được chúng chỉ đơn thuần là những chuối (String) và khi nhận được thì chúng ta sẽ convert nó sang kiểu dữ liệu mong muốn, như trường hợp đầu tiên  @RequestParam("id") Long id thì đây là trường hợp đơn giản framwork có hỗ trợ sẵn, Nhưng với trường hợp thứ 2 thì sao @RequestParam("id") Student student làm sao để có thể convert được sang được một kiểu đối tượng tùy thích, vì vậy chúng ta cần phải custom lại converter tương ứng cho kiểu đối tượng mà chúng ta mong muốn.
# Built-in Converters
Đây là những converters mà Spring đã cung cấp sẵn, việc của chúng ta là chỉ cần gọi ra và dùng thôi. Spring cung cấp sẵn ConversionService để xử lý cho việc gọi ra các hàm convert tương ứng với mong muốn, ví dụ như
```
@Autowired
ConversionService conversionService;
 
@Test
public void whenConvertStringToIntegerUsingDefaultConverter_thenSuccess() {
    assertThat(
      conversionService.convert("25", Integer.class)).isEqualTo(25);
}
```
ở đây mình sử dụng lại đoạn code từ tài liệu tham khảo, công việc ở đây chỉ là Autowired lại ConversionService và gọi hàm convert đã được implement sẵn.
# Custom Converters
Như đã trình bày ở trên, thì những trường hợp đơn giản chúng ta chỉ cần gọi lại các hàm đã được cung cấp, nhưng còn việc convert cho những đối tượng theo mong muốn thì sao, chúng ta cấn phải custom lại để tạo cho chúng ta những hàm convert riêng cho các đối tượng mong muốn, bây giờ mình sẽ đi qua một ví dụ cho trường hợp này.
ở đây mình có một class Student 
```
public class Student {
    private long id;
    private String name;
}
```
Đương nhiên là chúng sẽ có các hàm getter setter nhưng mình ko ghi vào. ở đây mỗi sinh viên sẽ có 2 thuộc tính là id và name.
bây giờ ở trên view mình muốn tạo ra một Student tương ứng với id và tên được truyền vào với param student = id,name (Hơi tào lao nhưng chỉ là một ví dụ)
Ở Server bây giờ cần định nghĩa một coverter để thực hiện việc convert từ String thành một Student, với key là student có chứa giá trị của id và name được phân cách nhau bởi dấu phẩy chẳng hạn
```
public class StringToStudentConverter
  implements Converter<String, Student> {
 
    @Override
    public Student convert(String name) {
        String[] data = from.split(",");
        return new Employee(
          Long.parseLong(data[0]), data[1]);
    }
}
```
Bây giờ ở Controller chúng ta cần hứng Param với annotation @Request để thực hiện việc convert 
```
@RequestMapping(value="/create", method=RequestMethod.GET)
public String createStudent(@RequestParam("student") Student student, ModelMap model) {
return "new-student";
}
```
Khi khai báo như vậy thì framwork sẽ kiểm tra các converter tương ứng để giao việc thực hiện nhiệm vụ. Nhưng làm sao để Spring có thể hiểu được? chúng ta cần phải có thêm một bước là khai báo Formatter mới này cho Spring framwork 
```
@Configuration
public class WebConfig implements WebMvcConfigurer {
 
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToStudentConverter());
    }
}
```
Như vậy là chúng ta có đẩy đủ các bước để có thể thực hiện việc custom lại việt convert theo mong muốn đơn giản.
# Converters Tường minh
Spring còn cung cấp cho chúng ta một các implement converter một cách tường mình ngay trong hàm gọi của Controller
ví dụ như sau 
```
 @GetMapping("/string-to-student")
    public ResponseEntity<Object> getStringToStudent(
      @RequestParam("student") Student student) {
        return ResponseEntity.ok(student);
    }
```
# ConverterFactory
Chúng ta cũng có thể tạo ra ConverterFactory và từ ConverterFactory này chúng ta sẽ tạo ra các Converter theo mong muốn
Trong trường hợp cụ thể thì trường hợp này sẽ thích hợp trong trường hợp chúng ta muốn convert sang một Enum
Theo như ví dụ sau
```
public enum Gender {
    MALE, FEMALE;
}
```
Tạo ra một ConverterFactory cho trường hợp convert sang Enum
```
@Component
public class StringToEnumConverterFactory 
  implements ConverterFactory<String, Enum> {
 
    private static class StringToEnumConverter<T extends Enum> 
      implements Converter<String, T> {
 
        private Class<T> enumType;
 
        public StringToEnumConverter(Class<T> enumType) {
            this.enumType = enumType;
        }
 
        public T convert(String source) {
            return (T) Enum.valueOf(this.enumType, source.trim());
        }
    }
 
    @Override
    public <T extends Enum> Converter<String, T> getConverter(
      Class<T> targetType) {
        return new StringToEnumConverter(targetType);
    }
}
```
và cuối cùng chúng ta đăng ký Factory này 
```
@Override
public void addFormatters(FormatterRegistry registry) {
    registry.addConverterFactory(new StringToEnumConverterFactory());
}
```
# Tài liệu tham khảo
https://www.theserverside.com/tip/Spring-Converters-and-Formatters
https://www.baeldung.com/spring-type-conversions