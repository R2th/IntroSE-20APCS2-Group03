# Mở đầu

Hí anh em!

Lại là mình đây, dạo này hơi bận và lười nên cũng chưa viết phần 2 của bài Optional trong java!

Hôm nay Hà Nội lại mưa, nên mình sẽ tiếp tục phần 2 cũng là phần cuối về Optional nhe!
bắt đầu thoi!!!

# Bắt đầu

## VIII. Filter();

Ngay cái tên thì các bạn cũng biết nó làm gì rồi phải không?
ví dụ đơn giản về Filter()


```
@Test
public void checkFilter() {
    Integer year = 2016;
    Optional<Integer> yearOptional = Optional.of(year);
    boolean is2016 = yearOptional.filter(y -> y == 2016).isPresent();
    assertTrue(is2016);
    boolean is2017 = yearOptional.filter(y -> y == 2017).isPresent();
    assertFalse(is2017);
}
```

Rồi bây giờ bắt đầu áp dụng vào bài toán thực tế xem filter hoạt động ra sao nhé!

> Mình có 1 đề bài là kiểm tra xem điểm toán có nằm trong khoảng điểm từ A -> B hay không? Nếu có thì trả ra true và false nếu ngược lại!

Oke bắt đầu với từng trường hợp nhé!
 
 Tạo một đối tượng là **Poin** và thuộc tính là **math**
 
```
@Data
@AllArgsConstructor
public class Poin {

    private Double math;
}
```

ở đây mình có dùng [Lombook](https://projectlombok.org/) để tự động genarate contructor và setter,getter 

Tiếp theo mình tạo một class cho chứa method checkMath. Giả sử mình muốn kiểm tra điểm toán có nằm tròn khoảng từ 5 -> 8 hay không?

```
    Boolean check = false;

    public Boolean checkMath(Poin poin){

        if(poin != null && poin.getMath() != null
            && poin.getMath() > 5 && poin.getMath() < 8){
            return check = true;
        }

        return check;
    }
```

Oke giờ chúng ta test cái method này xem sao nhé! 

```
 @Test
    public void testCheckMath() {
        assertTrue(priceAvg(new Poin(7.1)));
    }
```
Các bạn tự run và xem kết quả nhé!

Trên là cách check if bình thường mà chúng ta hay làm, vậy giờ hãy sử dụng Filter của Optional xem sao nhé!

```
   public Boolean checkMath(Poin poin){
       return Optional.ofNullable(poin)
               .map(poin::getMath)
               .filter(f -> f < 5)
               .filter(f -> f > 8)
               .isPresent();
    }
```

rồi các bạn chạy lại hàm test bên trên để xme kết quả nhé!

## IX.map();

Ở ví dụ trên chúng ta thấy có map(), vậy để xem map này để làm gì nhé!

```
@Test
public void optionWithMap() {
    List<String> companyNames = Arrays.asList(
      "paypal", "oracle", "", "microsoft", "", "apple");
    Optional<List<String>> listOptional = Optional.of(companyNames);

    int size = listOptional
      .map(List::size)
      .orElse(0);
    assertEquals(6, size);
}
```

nhìn ví dụ trên thì điều cái chúng ta quan tâm nhất là dấu " **::** " này đúng không, đơn giản là nó dùng để tham chiếu đến các method của chính nó -> *nó ở đây là List*

Hay kết hợp **map()** với **Filter()** để có được hiểu năng tốt nhất nhé!


# Kết
Như vậy chúng ta đã đi qua nhưng method của Optional rồi. Hãy app dụng nó vào những bài toán hàng ngày nhé!
Hẹn gặp lại các bạn vào bài viết sau nhé. Thanks fo watch!