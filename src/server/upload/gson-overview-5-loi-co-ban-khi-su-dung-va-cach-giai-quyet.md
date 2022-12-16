Ở bài viết này mình sẽ nói về 5 lỗi phổ biến khi sử dụng Gson mà các develop thường gặp.

### 1. Expecting an Object Instead of an Array

Hầu hết lỗi chúng ta gặp đó là  **java.lang.IllegalStateException: Expected BEGIN_OBJECT but was BEGIN_ARRAY at line 1 column 2 path bla bla ....**  khi  thực hiện deserializing data

Exception này đơn giản chỉ là báo cho chúng ta biết JSON này chưa 1 array nằm trong [ ] và Model class của bạn là nghĩ chúng ra Object ( thực ra là đó là do bạn thiết đặt cho Gson coi data đó là Object để thực hiện deserialize ).

Tips để bạn biết rõ hơn đoạn sai của bạn nằm ở vế sau :D Nếu ghi là line 1 có nghĩa là cả model của bạn đang sai, nó đang mong là 1 object thay vì 1 array. Nếu số line càng cao có nghĩa là các lỗi nằm ở các nested element trong model của bạn

Bạn nên xem kĩ hơn file JSON và so sánh với model Java. Tốt nhất hãy sử dụng các tools như jsonschema2pojo để setup model của bạn thông qua Json, hoặc có thể kiểm tra object Json của bạn có match với model hay không.

### 2. Expecting an Array Instead of an Object

Lỗi này cũng tưonwg tự lỗi trên. Nếu model của bạn là 1 array mà JSON lại chứa 1 single Object wrapped trong { }. Lúc đó lỗi sẽ là Gson will throw java.lang.IllegalStateException: Expected BEGIN_ARRAY but was BEGIN_OBJECT at line 1 column 2 path $.

Cách sửa cũng như trên, hãy check thật cẩn thận model class và JSON . Nếu match với nhau thì lỗi này sẽ không xảy ra nữa.

### 3. Không dùng lại Gson Instance
Chúng ta hay thấy trong các ví dụ về Gson có đoạn code như sau

```
UserSimple userObject = new UserSimple("Norman", "norman@futurestud.io", 26, true);

Gson gson = new Gson();  
String userJson = gson.toJson(userObject);  
```

Một cách để optimize perforamce của app đó là chỉ sử dụng 1 instance Gson. Ta không nhất thiết phải tạo mới mỗi khi sử dụng, hãy tạo class instance để tái sử dụng.

### 4. Không làm gọn (Minifying) Serialized Data

Gson giúp thực hiện việc serializes và deserializes data mà không cần thiết đặt quá phức tạp. Tuy nhiên hãy luôn nghĩ đến việc optimize việc thực hiện này.

Ví dụ, trong nhiều app hiện nay, Java model phức tạp hơn server "nghĩ". App có thể gửi nhiều data hơn server có thể xử lí. Nó tạo ra xử phức tạp không cần thiết cho cả 2 bên và Gson phải thực hiện những việc chuyển đổi không cần thiết. Chưa kể việc gửi data qua lớn qua internet sẽ làm request lâu hơn và tốn data hơn.

Bạn nên kiểm tra việc gửi và nhận data. Nếu có thể, hãy giảm thiểu lượng data serialized nhiều nhất có thể.

### 5. Using Custom Setters

Gson sử dụng reflection và không sử dụng custom getters& setters. Nếu model class có thêm logic trong hàm setter, nó sẽ gây ra những lỗi bất thường.
```
public void setFirstName(String firstName) {  
    this.firstName = firstName;

    updateFullName();
}
```