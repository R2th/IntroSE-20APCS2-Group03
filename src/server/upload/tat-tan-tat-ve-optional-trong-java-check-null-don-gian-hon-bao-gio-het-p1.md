#  Mở đầu

Hí anh em!

 Chắc hẳn khi code thì khi cần check giá trị của một biến hay một đối tượng có giá trị hay không thì chúng ta rất hay sử dụng cách sau:

```
String name = "Nguyen Duc Thao";
if(name != null){
    // TODO
}
```
Kiểu kiểu như thế này đúng không?. Nó cũng chẳng sai, mình cũng rất hay dùng cách này để check!

Thế thì có cách nào khác để check null ngoài cách trên không? Có đấy, một trong những cách khác đó chính là sử dụng **Optional** 
  
>       Lưu ý: như mình đã nói ở các bài viết của mình là, các kiến thức được mình chia sẻ thì đều là do mình
>        tự tìm hiểu và đúc kết khi mình thực tế trải nghiệm nó khi làm việc, nó có thể đúng hoặc sai, nếu sai 
>        hay góp ý phía bên dứoi để mọi người cùng hiểu hơn nhaaa😍

# Optional là gì?

**Optional**  được giới thiệu ở trong java 8, nó cung cấp những tuỳ chọn giá trị thay vì phải tham chiếu đến giá trị null!

# Bắt đầu thôi

> À trong bài viết này, mình sẽ sử dụng hàm test và dependency thư viện junit để thực hiện test kết quả các method và các bạn chỉ cần add dependency và coppy rồi chạy thui nha!

### I. Tạo Optional
Có một số cách để tạo đối tượng optional, chúng ta cùng tìm hiểu bên dưới nhé!

**1. Tạo optional rỗng**
```
    @Test
    public void createOptionalEmpty(){

        Optional<String> otp = Optional.empty();
        Assertions.assertFalse(otp.isPresent());
    }
```
Method *isPresen()* để kiểm tra xem optional có giá trị hay không!

**2. Tạo optional với method of()**

```
@Test
public void createOptionalWithMethodOf() {
    String name = "Duc Thao";
    Optional<String> opt = Optional.of(name);
    assertTrue(opt.isPresent());
}
```

>Tuy nhiên nếu chúng ta chuyền vào method of() này một tham số có giá trị null thì sẽ sinh ra **nullPointerException**  đó nha!

Thế thì có cách nào để mình chyền vào một tham số có giá trị null mà không sinh ra exception không nhỉ? có đấy!

**3. Chuyền tham số null với method ofNullable()** 

```
@Test
public void createOptionWithofNullable() {
    String name = null;
    Optional<String> opt = Optional.ofNullable(name);
    assertFalse(opt.isPresent());
}
```

Với cách này thì khi chuyền vào giá trị null thì nó sẽ không ném ra exception

### II. isPresent(), isEmpty()

Khi có một đối tượng, để kiểm tra xem nó có giá trị hay không thì chúng ta sử dụng *isPresent()*

```
@Test
public void checkWithisPresen() {
    Optional<String> opt = Optional.of("Duc Thao");
    assertTrue(opt.isPresent());

    opt = Optional.ofNullable(null);
    assertFalse(opt.isPresent());
}
```
Và *isEmpty()* được thêm vào từ java 11, nên nếu bạn dùng java 11 trở lên thì mới có thể sử dụng được method *isEmpty()*  này nhé!

```
@Test
public void checkWithisEmpty() {
    Optional<String> opt = Optional.of("Duc Thao");
    assertFalse(opt.isEmpty());

    opt = Optional.ofNullable(null);
    assertTrue(opt.isEmpty());
}
```

### III. ifPresent();

Như mình cũng đã nói ở đầu bài là, thường thì chúng ta sẽ check null như sau

```
String name = "Nguyen Duc Thao";
if(name != null){
    // TODO
}
```

Để ngắn gọn hơn thì Optional cung cấp chúng ta method *ifPresent()*

```
@Test
public void checkWithifPresent() {
    Optional<String> opt = Optional.of("Duc Thao");
    opt.ifPresent(name -> System.out.println(name));
}
```

### IV. orElse();

Method *orElse()* sẽ tiếp tục nếu kết quả là *fasle* hơi khó hiểu nhỉ? , để mình viết code ra cho dễ hiểu!
```
@Test
public void checkWithorElse() {
    String nullName = null;
    String name = Optional.ofNullable(nullName).orElse("Thao");
    assertEquals("Thao", name);
}
```

Giải thích: ta sử dụng *ofNullable()* để kiểm tra xem giá trị của biến *nullName* có bị null hay không, nếu nó null thì sẽ thực hiện gán giá trị "Thao" cho biến *name*! okee
### V. orElseGet();

Method *orElseGet()*  thì nó cũng giống như *orElse()* thôi, nhưng thay vì chuyền vào nó 1 giá trị, thì chúng ta phải vứt vào cho nó một functional interface

```
@Test
public void checkWithorElseGet() {
    String nullName = null;
    String name = Optional.ofNullable(nullName).orElseGet(() -> "Thao");
    assertEquals("Thao", name);
}
```

**Thế làm sao để phân biệt chính sác 2 thằng này khách nhau như thế nào nhỉ? Hãy để mình giải thích nè**

Mình sẽ tạo 1 method bên trong class test có tên là *taoKhongHieuTaiSaoLaiCo2ThangNay*

```
public String taoKhongHieuTaiSaoLaiCo2ThangNay() {
    System.out.println("Nó chạy vào đây rồi");
    return "Tại vì tao thích";
}
```

và mình sẽ tạo 1 hàm test có chứa cả *orElse()* và *orElseGet()*

```
@Test
public void checkDiffBetweenorElseAndorElseGet() {
    String text = null;

    String defaultText = Optional.ofNullable(text).orElseGet(this::taoKhongHieuTaiSaoLaiCo2ThangNay);
    assertEquals("Tại vì tao thích", defaultText);

    defaultText = Optional.ofNullable(text).orElse(taoKhongHieuTaiSaoLaiCo2ThangNay());
    assertEquals("Tại vì tao thích", defaultText);
}
```

cả 2 thằng này đều gọi đến method *taoKhongHieuTaiSaoLaiCo2ThangNay* khi biến *text* là null và kết quả!

>Nó chạy vào đây rồi
>
>Nó chạy vào đây rồi
 
 vẫn chưa có gì đặc. biệt phải không? nào cùng xem thêm trường hợp khi biến *text* không null thì sao?
 
 ```
@Test
public void checkDiffBetweenorElseAndorElseGet() {
    String text = "Thao";

    System.out.println("Using orElseGet:");
    String defaultText = Optional.ofNullable(text).orElseGet(this::taoKhongHieuTaiSaoLaiCo2ThangNay);
    assertEquals("Tại vì tao thích", defaultText);

    System.out.println("Using orElse:");
    defaultText = Optional.ofNullable(text).orElse(taoKhongHieuTaiSaoLaiCo2ThangNay());
    assertEquals("Tại vì tao thích", defaultText);
}
```

và kết quả là:

>Using orElseGet:
>
>Using orElse:
>
>Nó chạy vào đây rồi

thế vấn đề ở đây là gì? 
* *orElseGet()* nó thậm chí còn không chạy vào method *taoKhongHieuTaiSaoLaiCo2ThangNay* khi biến *text* có dữ liệu
* *orElse()* cho dù biến *text* có dữ liệu hay không thì nó vẫn sẽ được khởi tạo vào chạy vào method *taoKhongHieuTaiSaoLaiCo2ThangNay* nhưng nó sẽ không gán dữ liệu trả về, vì thế nên testcase sẽ vẫn là fail

Hiểu rồi đúng không nào, lằng nhằng ghia 😁

### VI. orElseThrow();
Lại có thêm một cách nữa để xử lý ngoại lệ nữa nè!

```
@Test(expected = IllegalArgumentException.class)
public void checkWithorElseThrow() {
    String nullName = null;
    String name = Optional.ofNullable(nullName).orElseThrow(
      IllegalArgumentException::new);
}
```
nếu các bạn dùng java 10 trở lên thì bạn có thể để *orElseThrow()* rỗng!
### VII. get();

như cái tên của nó thì nó dùng để lấy gia giá trị của Optional
và nếu giá trị Optional là null thì nó cũng sẽ ném ra ngoại lệ!

```
@Test
public void checkWithGet() {
    Optional<String> opt = Optional.of("Duc Thao");
    String name = opt.get();
    assertEquals("Duc Thao", name);
}
```

# Kết
Thôi chúng ta kết thúc phần 1 tại đây, Optional có những hàm nâng cao hơn và chúng ta sẽ tìm hiể nó ở phần sau nha, hẹn gặp lại!