## Custom Serialization

Ta hãy đến với một use case sau : App của chúng ta cần kéo về 1 list các merchants ( đại lý ) từ server. User có thể chọn 1 phần của list đó và đưa danh sách theo dõi của họ. App lúc này cần gửi lại thông tin của user cũng như danh sách lựa chọn của họ về server thông qua network request

Đầu tiên, chúng ta cần tạo class model cho data gửi lên server

## Models

Thông tin của user sẽ được lưu trong class UserSimple

```
public class UserSimple {  
    private String name;
    private String email;
    private boolean isDeveloper;
    private int age;
}
```

Ngoài ra ta có class cho Merchant 

```
public class Merchant {  
    private int Id;
    private String name;
}
```

Khi app lấy thông tin từ phía server thành công, ta sẽ có 1 danh sách các merchant. Sau đó user sẽ chọn các merchant và rồi ta gửi thông tin user đó cũng như danh sách lựa chọn lên server. Vì vậy, ta tạo thêm 1 class UserSubscription được kế thừa model UserSimple có variable chính là danh sách merchant được lựa chọn.

```
public class UserSubscription {  

    // extend UserSimple
    String name;
    String email;
    int age;
    boolean isDeveloper;

    // new!
    List<Merchant> merchantList;
}
```

## The Problem
Theo lý thuyết, chúng ta đang làm đúng trình tự. Sau khi app set các properties cần thiết của class UserSubscription. Khi gửi lên server, object UserSubscription được Gson tạo ra JSON như sau

```
{
  "age": 26,
  "email": "norman@fs.io",
  "isDeveloper": true,
  "merchantList": [
    {
      "Id": 23,
      "name": "Future Studio"
    },
    {
      "Id": 42,
      "name": "Coffee Shop"
    }
  ],
  "name": "Norman"
}
```

Có lẽ ví dụ của model này sẽ không quá rõ ràng, nhưng hãy tưởng tượng xem nếu model merchant mà vô cùng phức tạp thì request JSON sẽ rất lớn
Một điều ta có thể thấy được đó là server vốn đã biết được thông tin của merchant ( vì ta lấy thông tin từ server về mà :v ). Cho nên object merchant hoàn toàn có thể được giảm bớt. Phía server chỉ cần list ids của các merchant mà user chọn là đủ.

## Simplify with Property Exclusion

Hướng tiếp cận đầu tiên mà ta nghĩ đến đó là điều chỉnh các thuộc tính trong object merchant được serialized và các thuộc tính không được bằng cách như sau

```
public class Merchant {  
    private int Id;

    @Expose(serialize = false)
    private String name;

    // possibly more properties
}
```

Sau khi thêm một vài annotations ta có thể giảm bớt được các thuộc tính trong object JSON
```
{
  "age": 26,
  "email": "norman@fs.io",
  "isDeveloper": true,
  "merchantList": [
    {
      "Id": 23
    },
    {
      "Id": 42
    }
  ],
  "name": "Norman"
}
```

Phương pháp này giúp ta có kết quả khá khả quan, tuy nhiên ta vẫn có thể làm tốt hơn. Hơn nữa, cách này vẫn có nhược điểm khi mà app cần gửi một full object merchant lên một endpoint khác

## Simplify with Custom Serialization As Single Objects

Phương pháp đầu tiên có nhược điểm và hạn chế, giờ ta sẽ xem một giải pháp khác tốt hơn : custom serialization. Ta muốn giới hạn việc serialization object merchant khi tạo request. Nghe thì có vẻ khó nhưng Gson đã làm nó dễ dàng hơn 

Ta hãy cũng làm từng bước một, đầu tiên ở phương pháp trước, khi chưa optimize sẽ như sau

```
// get the list of merchants from an API endpoint
Merchant futureStudio = new Merchant(23, "Future Studio", null);  
Merchant coffeeShop = new Merchant(42, "Coffee Shop", null);

// create a new subscription object and pass the merchants to it
List<Merchant> subscribedMerchants = Arrays.asList(futureStudio, coffeeShop);  
UserSubscription subscription = new UserSubscription(  
        "Norman",
        "norman@fs.io",
        26,
        true,
        subscribedMerchants);

Gson gson = new Gson();  
String fullJSON = gson.toJson(subscription); 
```

Ta sử dụng một custom Gson instance, đăng ký một TypeAdapter cho Merchant class sau đó gọi method toJson()

```
GsonBuilder gsonBuilder = new GsonBuilder();

JsonSerializer<Merchant> serializer = ...; // will implement in a second  
gsonBuilder.registerTypeAdapter(Merchant.class, serializer);

Gson customGson = gsonBuilder.create();  
> String customJSON = customGson.toJson(subscription);  
```

Ta cần chú ý tới method registerTypeAdapter(). Method này yêu cầu 2 parameter, đầu tiên là kiểu của Object bạn muốn custom serilization và thứ hai là một implementation của interface JsonSerializer

Ta khai báo JsonSerializer như sau

```
JsonSerializer<Merchant> serializer = new JsonSerializer<Merchant>() {  
    @Override
    public JsonElement serialize(Merchant src, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject jsonMerchant = new JsonObject();

        jsonMerchant.addProperty("Id", src.getId());

        return jsonMerchant;
    }
};
```

Interface trên override method serialize. Nó cho ta src chính là object Merchant mà ta định serialized và kiểu trả về là một JsonElement. Đơn giản thì trong method này ta sẽ tự tạo ra một Json object theo ý mà ta muốn từ object Merchant. Ở case này ta chỉ đơn giản lấy id của object Merchant và tạo 1 json object có 1 property là id của merchant đó

Interface callback này sẽ được gọi mỗi khi Gson cần xử lí serialize obejct Merchant. Ở trường hợp của chúng ta sẽ là mọi object Merchant trong list merchant của user
Khi ta chạy code, sẽ có được kết quả JSON như sau 

```
{
  "age": 26,
  "email": "norman@fs.io",
  "isDeveloper": true,
  "merchantList": [
    {
      "Id": 23
    },
    {
      "Id": 42
    }
  ],
  "name": "Norman"
}
```

Như bạn thấy, kết quả cũng giống như phương pháp đầu tiên sử dụng annotation. Tuy nhiên việc sử dụng callback interface mỗi lần như này cho phép ta tùy biến được nhiều hơn JSON object được tạo ra mỗi khi object được serialized. Ở phần tiếp theo sẽ là ví dụ khi thực hiện serialize một list.

## Simplify with Custom Serialization As List Objects

```
GsonBuilder gsonBuilder = new GsonBuilder();

Type merchantListType = new TypeToken<List<Merchant>>() {}.getType();  
JsonSerializer<List<Merchant>> serializer = ...; // will implement in a second  
gsonBuilder.registerTypeAdapter(merchantListType, serializer);

Gson customGson = gsonBuilder.create();  
String customJSON = customGson.toJson(subscription);  
```

Ở phần này ta tập trung vào list merchant, ta cần sử dụng class TypeToken và cách thức thực hiện như sau

```
JsonSerializer<List<Merchant>> serializer =  
    new JsonSerializer<List<Merchant>>() {
        @Override
        public JsonElement serialize(List<Merchant> src, Type typeOfSrc, JsonSerializationContext context) {
            JsonObject jsonMerchant = new JsonObject();

            List<String> merchantIds = new ArrayList<>(src.size());
            for (Merchant merchant : src) {
                merchantIds.add("" + merchant.getId());
            }

            String merchantIdsAsString = TextUtils.join(",", merchantIds);

            jsonMerchant.addProperty("Ids", merchantIdsAsString);

            return jsonMerchant;
        }
}
```

In the serialize() callback we're creating a new JsonObject and add just a single property. That property Ids contains a string with all the merchant IDs.

Ở trong callback serialize() ta tạo một JsonObject và thêm một property. Property Ids sẽ chứa string của tất cả merchant ids.

Ưu điểm của cách trên đó là giảm kích thước JSON. Đặc biệt với trường hợp user chọn 1 lượng lớn merchant thì data gửi trả về server sẽ được gọn hơn thay vì gửi lên một list và nó đồng nghĩa với việc request xử lí sẽ nhanh hơn một chút. 

Ngoài ra nếu không muốn, bạn có thể thử một cách khác đó là gửi lên merchant list một array chứ không phải gửi lên object như sau

## Simplify with Custom Serialization As List Array

Ta cần thay đổi như sau

```
JsonSerializer<List<Merchant>> serializer =  
    new JsonSerializer<List<Merchant>>() {
        @Override
        public JsonElement serialize(List<Merchant> src, Type typeOfSrc, JsonSerializationContext context) {
            JsonArray jsonMerchant = new JsonArray();

            for (Merchant merchant : src) {
                jsonMerchant.add("" + merchant.getId());
            }

            return jsonMerchant;
        }
}
```

Ở đây ta tạo ra một JsonArray thay vì JsonObject bằng cách trên, kết quả có được sẽ là

```
{
  "age": 26,
  "email": "norman@fs.io",
  "isDeveloper": true,
  "merchantList": [
    "23",
    "42"
  ],
  "name": "Norman"
}
```

Qua một vài ví dụ trên ta có thể thấy được Gson có thể cover được khá nhiều case xử lí khác nhau cho việc serialiation tuy nhiên vẫn có vài vấn đề sau

## Common Issues

```
GsonBuilder gsonBuilder = new GsonBuilder();

Type merchantListType = new TypeToken<List<Merchant>>() {}.getType();

JsonSerializer<List<Merchant>> serializerA = ...;  
JsonSerializer<List<Merchant>> serializerB = ...;

gsonBuilder.registerTypeAdapter(merchantListType, serializerA); // will be ignored  
gsonBuilder.registerTypeAdapter(merchantListType, serializerB); // will be used

Gson customGson = gsonBuilder.create();  
String customJSON = customGson.toJson(subscription); 
```

Ta có một vấn đề không mong muốn đó là overwrite custom type adapter. Nếu bạn khai báo nhiều lần cùng một kiểu thì Gson sẽ chỉ chấp nhận lời gọi registerTypeAdapter() cuối cùng.

Vấn đề thứ hai hay xảy ra với những người mới đó là sử dụng method serialize() bên trong implementation của serializer. Ta hãy xem đoạn code sau

```
new JsonSerializer<UserSubscription>() {  
    @Override
    public JsonElement serialize(UserSubscription src, Type typeOfSrc, JsonSerializationContext context) {
        JsonElement jsonSubscription = context.serialize(src, typeOfSrc);

        // customize jsonSubscription here

        return jsonSubscription;
    }
}
```

Về ý tưởng thì khá hay, khi bạn custom một JSON mapping, ta thường  map một tập hợp các thuộc tính và cách gọi trên có thể giúp bạn đơn giản việc khai báo. Tuy nhiên hãy cẩn thận nếu lời gọi serialize() cùng kiểu của custom serializer của bạn thì sẽ xảy ra vòng lặp vô hạn khi liên tục gọi đến custom serializer giống hệt của nhau