Ở phần [trước](https://viblo.asia/p/gson-overview-mapping-enums-ORNZqgeG50n), chúng ta đã tìm hiểu về mapping enum của Gson, ở phần này ta sẽ tìm hiểu cách serialize của các Object có Generics.

Nếu bạn thắc mắc generics là gì thì hãy xem bài viết [này](https://viblo.asia/p/java-generic-aWj53Xw1K6m) để hiểu rõ hơn trước khi đọc tiếp bài viết này

## Serialization of Generics

Hãy bắt đầu bằng một ví dụ đơn giản : Chúng ta muốn convert một java object sang Json thì chỉ cần biết các kiểu data của object đó và cách mapping thế nào với Json là được phải không ?

Thực tế có một trường hợp rất hay gặp khi sử dụng Generics đó là object có chứa kiểu : **Java Collections**. Giả sử ta có một object gồm 2 List, trong đó có 1 list chứa các items kiểu **Integer**, và 1 list kiểu **String**.

Bình thường,ta sử dụng Gson khi convert object này sang Json chỉ đơn giản gọi hàm **gson.toJson()**

```
Gson gson = new Gson();

List<Integer> integerList = new ArrayList<>();  
integerList.add(1);  
integerList.add(2);  
integerList.add(3);

List<String> stringList = new ArrayList<>();  
stringList.add("1");  
stringList.add("2");  
stringList.add("3");

String integerJson = gson.toJson(integerList);  
String stringJson = gson.toJson(stringList);  
```

Thông thường việc convert diễn ra bình thường không có vấn đề gì, tuy nhiên Gson lại không đảm bảo việc JsonObject được convert ra đúng như bạn muốn. VỚi các kiểu data nguyên thủy thông thường, việc convert không xảy ra vấn đề gì và ta hoàn toàn có thể check lại được. nhưng với các object có data phức tạp, thì Gson khuyên bạn sử dụng **new TypeToken**

```
Gson gson = new Gson();

List<Integer> integerList = new ArrayList<>();  
integerList.add(1);  
integerList.add(2);  
integerList.add(3);

List<String> stringList = new ArrayList<>();  
stringList.add("1");  
stringList.add("2");  
stringList.add("3");

Type integerType = new TypeToken<List<Integer>>() {}.getType();  
Type stringType = new TypeToken<List<String>>() {}.getType();

String integerJson = gson.toJson(integerList, integerType);  
String stringJson = gson.toJson(stringList, stringType);
```

**new TypeToken** sẽ tạo ra một inner class rỗng và anonymous, vì vậy khi khai báo ta sẽ thấy nó có kiểu () {} hơi kì cục.
Tuy nhiên, điều này đảm bảo Gson sẽ biết được chính xác kiểu generics mà bạn mong muốn khi convert sang JsonObject.

```
integerJson = "[1,2,3]"  
stringJson = "["1","2","3"]"  
```

Đến với một ví dụ đơn giản nữa, cũng như ví dụ trên, có vẻ không cần thiết thì thông thường hàm **toJson()** hoạt động tốt thế nhưng đến Gson còn khuyên chúng ta nên làm quen việc sử dụng **TypeToken** thì không có lý gì ta lại bỏ qua nó nếu không muốn vướng phải vào những lỗi không thể lường trước được :D

```
public class Box<T> {  
    private T boxContent;

    public Box(T t) {
        this.boxContent = t;
    }
}
```

Class Box chỉ chứa một object chưa rõ cho đến khi compile. Với generics, Box sẽ nhận bất cứ object nào ta truyền cho nó. Như mình đã đề cập phía trên, nếu bạn muốn an toàn, hay sử dụng TypeToken trong quá trình serialize object này :v

```
Gson gson = new Gson();

Box<String> stringBox = new Box<>("String Type");  
Box<Integer> integerBox = new Box<>(42);  
Box<UserDate> complexBox = new Box<>(new UserDate("Norman", "norman@fs.io", 26, true));

Type stringType = new TypeToken<Box<String>>() {}.getType();  
Type integerType = new TypeToken<Box<Integer>>() {}.getType();  
Type complexType = new TypeToken<Box<UserDate>>() {}.getType();

String integerJson = gson.toJson(integerBox, integerType);  
String stringJson = gson.toJson(stringBox, stringType);  
String complexJson = gson.toJson(complexBox, complexType); 
``` 

## Deserialization of Generics

```
{
  "boxContent": {
    "_name": "Norman",
    "age": 26,
    "email": "norman@fs.io",
    "isDeveloper": true,
    "registerDate": "Jun 7, 2016 7:15:29 AM"
  }
}
```

Giả sử ta nhận được một JsonObject từ API, lấy ví dụ object Box phía trên ta sẽ có một JsonObject như sau

Gson cần phải biết chính xác kiểu Generics của Box, nếu không nó không thể map với Json. Ví dụ nếu có object Box<String>, nó sẽ không thể mapping với Json trên được. Chính vì vầỵ, trước khi deserialize object này, ta cần xác định kiểu của Box trước, tất nhiên là sẽ sử dụng **TypeToken** :v

```
String complexGenericJson = "{\"boxContent\":{\"_name\":\"Norman\",\"age\":26,\"email\":\"norman@fs.io\",\"isDeveloper\":true,\"registerDate\":\"Jun 7, 2016 7:15:29 AM\"}}";

Type complexType = new TypeToken<Box<UserDate>>() {}.getType();

Gson gson = new Gson();  
Box boxWithData = gson.fromJson(complexGenericJson, complexType);  
Box<UserDate> boxWithoutData = gson.fromJson(complexGenericJson, Box.class);  
```

Chỉ khi xác định được kiểu của Object, Gson có thể map được nó 

Cảm ơn các bạn đã theo dõi