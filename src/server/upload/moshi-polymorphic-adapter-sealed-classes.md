Cách sử dụng Moshi Polymorphic Adapter(+ Retrofit) để chuyển đổi các lớp sealed của Kotlin sang / từ Json
######
Tôi đã làm việc trên một số ứng dụng nội bộ cho nhóm của chúng tôi. Trong khi tôi đang cố gắng serialize và deserialize các lớp sealed, mọi thứ trở nên hơi lộn xộn. Hóa ra bản phát hành Moshi gần đây có một cách dễ dàng như vậy quanh nó!
######
Vì nó không phải là cực kỳ dễ dàng để tôi khám phá giải pháp và một ví dụ, hy vọng điều này có thể giúp bạn.
### Tôi đã cố gắng làm gì?
Để có thêm một chút context:
######
[Nexmo](https://developer.nexmo.com/) có [API Voice](https://developer.nexmo.com/voice/voice-api/overview) cực kỳ mạnh mẽ, Nó cho phép bạn dễ dàng tạo một loạt các action bán muốn xảy ra trong các cuộc hội thoaik. Ví dụ: Nói chuyện (bằng văn bản thành giọng nói, truyền phát tệp âm thanh, thu thập các chữ số được nhấn của bàn phím điện thoại (đầu vào), ghi lại các phần của cuộc gọi và nhiều hơn thế nữa.
######
Bạn xác định chuỗi action này trong một đối tượng mà tôi đặt tên là [NCCO (Nexmo Call Control Object)](https://developer.nexmo.com/voice/voice-api/ncco-reference), và gửi nó ở định dạng JSON, khi bạn request [Nexmo backend](https://developer.nexmo.com/voice/voice-api/building-blocks/make-an-outbound-call-with-ncco) để thực hiện cuộc gọi đi.
######
Tôi đã tạo một ứng dụng thử nghiệm cho phép người dùng tạo một loạt các action, tuần tự hóa nó thành NCCO theo định dạng Json bằng **Moshi** và gửi request  thông qua API Nexmo với **Retrofit** 

### Ở đây, tôi đã làm thế nào
Bắt đầu bằng cách thêm thư viện
* The Moshi core library:

   `implementation "com.squareup.moshi:moshi:1.8.0"`
* Để chuyển đổi các lớp Kotlin to/from Json bằng cách sử dụng sự phản chiếu

  `implementation "com.squareup.moshi:moshi-kotlin:1.8.0"`
* Để sử dụng PolymorphicJsonAdapterFactory (sẽ giải thích bên dưới), chúng ta sẽ cần:

  `implementation("com.squareup.moshi:moshi-adapters:1.8.0")`
* Tôi sẽ thực hiện request với Retrofit và sử dụng Moshi converter, để convert các request và response body object to/from JSON

  ```
  implementation "com.squareup.retrofit2:retrofit:2.5.0"
  implementation "com.squareup.retrofit2:converter-moshi:2.5.0"
  ```

### Mô hình dữ liệu

NCCO là danh sách các Actions (Talk, Stream,...). Các loại Actions đc phân biệt bởi một trường "action" trong JSON.
Ví dụ: Bên dưới là NCCO với 2 Actions: Talk và Stream
  ```
"ncco" :
[
  {
    "action": "talk",
    "text": "You are listening to a Call made with Voice API"
  },
  {
    "action": "stream",
    "streamUrl": ["https://acme.com/streams/music.mp3"]
  }
]
  ```

1.  Tôi đã tạo một enum với các loại Action:
```
enum class ActionType {
    talk,
    record,
    stream,
    input,
    conversation 
}
```

2. Các Action data models: Như đã đề cập, NCCO có nhiều Actions. Đây là trường hợp sử dụng cổ điển của các lớp sealed của Kotlin
```
sealed class NccoAction(@Json(name="action") val actionType: ActionType)

data class Talk(val text: String, val voiceName: String? = null, val bargeIn: Boolean? = null, val loop: Int? = null : NccoAction(ActionType.talk)

data class Record(val eventUrl: Array<String>) : NccoAction(ActionType.record)

data class Stream( val streamUrl: List<String>) : NccoAction(ActionType.stream, false)

data class Input(val submitOnHash: Boolean = false, val timeOut: Int = 3) : NccoAction(ActionType.input, true)
```

Để ý: Để thuận tiện, trong lớp NccoAction, tôi đã gọi trường đại diện các loại ActionType. Để đảm bảo serilazation sẽ được thực hiện với trên trường là "action" thay vì "actionType", tôi đã sử dụng annotation @Json: @Json(name = "action") val actionType

3. Tạo một **Moshi reference**

* Thêm một PolymorphicJsonAdapterFactory. Class này là trái tim và giúp trò chuyện giữa các lớp sealed Action với các lớp dữ liệu (Talk, Stream...) và ngược lại. Nó cũng phù hợp với các abtract class hoặc interface
* Bạn nên nới với từng PolumorphicJsonAdapterFactory instance, sealed class hoặc interface nào chịu trách nhiệm và bằng cách **filed** vào JSON, conversation đc thực hiện.
* Nhớ thêm 1 **Subtype** cho mỗi class

```
var moshi = Moshi.Builder()
    .add(
        PolymorphicJsonAdapterFactory.of(NccoAction::class.java, "action")
            .withSubtype(Talk::class.java, ActionType.talk.name)
            .withSubtype(Stream::class.java, ActionType.stream.name)
            .withSubtype(Input::class.java, ActionType.input.name))
    //if you have more adapters, add them before this line:
    .add(KotlinJsonAdapterFactory())
    .build()
```
* Chú ý: KotlinJsonAdapterFactory là adapter cho các lớp Kotlin của bạn. Như đã đề cập, nó được sử dụng vì ví dụ này sử dụng reflection. Điều quan trọng là phải đảm bảo thêm KotlinJsonAdapterFactory làm adapter vào Moshi builder. Trong quá trình chuyển đổi, Moshi sẽ cố gắng sử dụng các adapter theo thứ tự bạn đã thêm chúng. Chỉ khi thất bại, nó sẽ thử adapter tiếp theo. KotlinJsonAdapterFactory là cái chung nhất, do đó nên được gọi cuối cùng.

4. Vì tôi sử dụng Retrofit nên tôi sẽ thêm MoshiConverterFactory vào Retrofit Instance của mình, Moshi sẽ chuyển đổi các objects được gửi và nhận từ các network calls. Đừng quên tạo MoshiConverterFactory với Moshi instance mà chúng ta đã tạo trước đó như là một parameter

```
var retrofit = return Retrofit.Builder()
        .baseUrl("https://api.nexmo.com/v1/")
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .client(httpClient)
        //...
        .build()
var nexmoService = retrofit.create<NexmoApiService>(NexmoApiService::class.java)
```
5. Khi tạo object này
```
val ncco = listOf(
    Talk("Hi this is nexmo talking!!"),
    Stream(listOf(Tunes.DixieHorn.url)),
    Talk("Press 1 if you're happy, press 2 if you're incredibly happy, followed by the hash key"),
    Input(timeOut = 5, submitOnHash = true),
    Talk("Thank you for the input! Bye Bye")
)
```
-> Nó sẽ được serialized với:
```
”ncco”:[
    {“action”:”talk”,”text”:”Hi this is nexmo talking!!”},
    {“action”:”stream” , ”streamUrl”:[“https:.....mp3"]},
    {"action":"talk","text":"Press 1 if you’re happy, press 2 if you’re incredibly happy, followed by the hash key”},    
    {“action”:”input”,”submitOnHash”:true,”timeOut”:5},
    {“action”:”talk”,”text”:”Thank you for the input! Bye Bye”}
]
```

6. Tôi sẽ thêm nó vào đối tượng yêu cầu của tôi:

```
data class PhoneNum(val type: String = "phone", val number: String)
val request = NXMRequest(
    arrayOf(PhoneNum(number = CALLEE_PHONE_NUM)),
    PhoneNum(number = CALLER_PHONE_NUM),
    ncco
)
```

7. Khi tôi thực hiện Retrofit request:
```
nexmoService.makeCall(request).enqueue(...)
```
với interface này:
```
interface NexmoApiService {

    @Headers(
        "Authorization: Bearer $APP_JWT",
        "Content-Type: application/json"
    )
    @POST("calls")
        fun makeCall(@Body request: NXMRequest): Call<Unit>
}
```
Sau đó, điện thoại bạn yêu cầu gọi sẽ đổ chuông và NCCO bạn tạo sẽ thực thi. 

[Project Githun](https://github.com/nexmo-community/Android-Voice-Api-Playground)

Nguồn: [Medium](https://proandroiddev.com/moshi-polymorphic-adapter-is-d25deebbd7c5)