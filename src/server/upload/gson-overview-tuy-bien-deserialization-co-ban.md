Ở phần này ta sẽ tìm hiểu cách custom Deserialization. Ứng dụng phổ biến của Deserialization là giúp giải quyết vấn đề data model từ server có format không giống với bên client sẽ nhận.

## Custom Deserialization

Bạn sẽ it nhiều thường gặp trường hợp data mà API trả về thường không matching với model data hiện tại của phía client, hoặc khi buộc phải đưa ra một số thay đổi cấu trúc của model phía server, ta luôn phải chuẩn bị tâm lý về thay đổi yêu cầu đó. Sử dụng deserialization sẽ giúp data forrmat từ dạng JSON có thể chuyển sang format của model theo ý bạn muốn ở phía client.

Ta hãy xem ví dụ sau :

```
{
    "year": 116,
    "month": 5,
    "day": 21,
    "age": 26,
    "email": "norman@futurestud.io",
    "isDeveloper": true,
    "name": "Norman"
}
```

4 properties cuối cùng của object này ta có thể hoàn toàn match sang phía Object bên Java. Nhưng hay để ý 3 properties đầu tiên, đây là 3 trường của một object  Date. Bạn hoàn toàn có thể tạo ra một Object matching bới 3 properties trên tuy nhiên nếu làm vậy, trong mỗi lần xử lí logic app bạn luôn bảo khởi tạo Object Date với 3 properties này.

Tại sao ta không parse data từ server về object client đã chứa sẵn Object Date nhỉ :D Và giải pháp tốt nhất đó là custom lại việc deserialization của JSON object và kết hợp 3 trường trên về 1 object Date và bạn sẽ không phải quan tâm việc khởi tạo object Date cho mỗi lần xử lí nữa

Ta sẽ sử dụng object phía client như sau

```
public class UserDate {  
    private String name;
    private String email;
    private boolean isDeveloper;
    private int age;
    private Date registerDate;
}
```

Bạn có thể thấy quá trình xử lí deserialization cũng tương tự như serialization. Nếu chưa rõ  thì trước tiên hãy đọc thêm về  [custom serialzation](https://viblo.asia/p/gson-overview-don-gian-hoa-viec-serialization-maGK7paBZj2)

Bắt tay vào việc chính nào, đầu tiên ta cần một Gson instance và gọi method  registerTypeAdapter() , method này cần 2 parameters. Đầu tiên là kiểu của Model chúng ta muốn tùy biến và instance của 1 object kiểu JsonDeserializers

```
GsonBuilder gsonBuilder = new GsonBuilder();

JsonDeserializer<UserDate> deserializer = ...; // will implement in a second  
gsonBuilder.registerTypeAdapter(UserDate.class, deserializer);

Gson customGson = gsonBuilder.create();  
UserDate customObject = customGson.fromJson(userJson, UserDate.class); 
```

Phần quan trọng nhất đó là việc implement JsonDeserializer.  Method bắt buộc có là deserialize(). Trong method này sẽ gửi cho bạn 1 JsonElement chưa JSON object mà bạn sẽ nhận được và kiểu mong muốn trả về của bạn.
Dựa vào đầu vào của JSON, ta sẽ tạo một Java model và get từng key của JSON object đó ra set cho Java model đó. Thực ra việc này Gson sẽ tự động làm cho bạn mà k cần đến custom serialization, tuy nhiên ở đây ta còn phải kết hợp 3 properties của JSON object để khởi tạo nên 1 Object phía java model

Ta sẽ map 4 properties phía dưới và kết hợp 3 properties phía trên để tạo Object Date, Vậy là đã tạo ra được một object Java hoàn chỉnh như mong muốn rồi

```
JsonDeserializer<UserDate> deserializer = new JsonDeserializer<UserDate>() {  
    @Override
    public UserDate deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonObject jsonObject = json.getAsJsonObject();

        Date date = new Date(
                jsonObject.get("year").getAsInt(),
                jsonObject.get("month").getAsInt(),
                jsonObject.get("day").getAsInt()
        );

        return new UserDate(
                jsonObject.get("name").getAsString(),
                jsonObject.get("email").getAsString(),
                jsonObject.get("isDeveloper").getAsBoolean(),
                jsonObject.get("age").getAsInt(),
                date
        );
    }
};
```

Như bạn thấy thì ta gọi method getAsJsonObject() để truy cập các property bên trọng JsonElement. Sau đó lấy ra các value theo kiểu mà bạn mong muốn, nên như kèm theo check các kiểu trả về để lấy đc data chính xác nhất. Có rất nhiều kiểu trả về của properties mà bạn có thể gọi ví dự như getAsInt(), getAsBoolean(), getAsJsonObject().... Sau đó ta trả về một instance của class UserDate. Vậy là hoàn thành việc custom deserialization data rồi

Ở ví dụ trên mình gọi method jsonObject.get("xxx").getAsXXX() có thể xảy ra NullPointerExceptions nếu trong jsonObject không có key tương ứng. Để an toàn thì hãy check xem Json có key đó đã không nhé ( Bạn có thể sử dụng method jsonObject.has("key") )

Source : [link](https://futurestud.io/tutorials/gson-advanced-custom-deserialization-basics)