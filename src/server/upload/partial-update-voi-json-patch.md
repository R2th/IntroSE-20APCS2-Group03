> JSON-PATCH là gì ?

Ok. Hãy xem xét một ví dụ dưới đây (mà thực ra cũng là một trường hợp phổ biến trong thực tế) : Ta cần viết một hàm API để chỉnh sửa một record. Với một hệ thống nghiệp vụ thực tế, một model tương ứng với một đối tượng của business có thể chứa rất nhiều property. Ta có thể gặp những model có thể có 10, vài chục, thậm chí hơn một trăm property. Và giờ hãy xét tới việc ta chỉ muốn thay đổi tên, hoặc một vài mô tả khác của model đó mà thôi. 

## Vấn đề gặp phải khi sử dụng PUT method

So sanh nhanh giữa việc sử dụng 2 method PUT và PATCH, ta có thể dễ dàng loại bỏ PUT trong trường hợp này, vì 2 hạn chế mà ta sẽ gặp phải 

### Lãng phí 

Việc gửi toàn bộ một object lên CHỈ để cập nhập lại 1, 2, hoặc một vài trường rõ ràng là không cần thiết. Điều này đặc biệt rõ khi mà trong thực tế một record có số lượng property lớn nghĩa là request gửi lên sẽ chiếm nhiều bandwidth hơn - ảnh hưởng rõ rệt với một hệ thống lớn.

### Có khả năng gây ra conflict giữa các request 

Giả sử khi có 2 người cùng đọc một nội dung, sau đó muốn chỉnh sửa lại thông tin của nội dung đó. Cho rằng thứ mà 2 người đó nhận được như sau

```
GET /bookings/123
{
    "id" : 123,
    "destination": "Ha Noi",
    "people_count" : 3,
    "date", "28/03/2018",
    .......
}
```

Người thứ nhất muốn chỉnh sửa lại thông tin đặt - nâng số người đăng kí lên 5 - sẽ gửi một request lên server như sau:

```
PUT /bookings/123
{
    "id" : 123,
    "destination": "Ha Noi",
    "people_count" : 5,
    "date", "28/03/2018",
    .......
}
```

Lúc này, số lượng người đặt đã được tăng lên 5. Tuy nhiên, lại có 1 người thứ 2 muốn đẩy lùi lại ngày đặt tour, vì vậy anh ấy đã gửi tiếp 1 yêu cầu thay đổi như sau:

```
GET /bookings/123
{
    "id" : 123,
    "destination": "Ha Noi",
    "people_count" : 3,
    "date", "30/03/2018",
    .......
}
```

Lúc này, sau khi xử lý yêu cầu của người 2, vô tình hệ thống đã gây ra bug và làm mất đi thông tin chỉnh sửa của người 1.

Vì 2 vấn đề trên, ta nên nghĩ tới việc sử dụng PATCH method thay thế. Tuy nhiên ...

## Vấn đề gặp phải khi sử dụng PATCH method

Ý tưởng về việc "chỉ gửi lên những gì mình muốn chỉnh sửa" nghe khá là hay ho :) Do đã có kinh nghiệm với ngôn ngữ Ruby và Rails framework, ban đầu khi mới tiếp cận với .NET , mình đã nghĩ là sẽ có thể áp dụng được mọi thứ từ bên kia sang bên này.

Để dễ demo hơn, mình sẽ đưa ra ví dụ nhỏ sau đây: Hãy coi như ta có một đối tượng (record) muốn chỉnh sửa, tương ứng với một entity class được định nghĩa như sau:

```
public class Lesson : IEntity
{
    public int Id { get; set; }
    
    public int Index { get; set; }
    
    public string BookName { get; set; }
}
```

Bên phía client, khi ta nhận được record dưới dạng JSON object như sau :

```
GET /Lessons/123
{
  "id" : 123,
  "index": 7,
  "bookName": "A21 / Ngữ pháp"  
}
```

Giờ, khi muốn thay đổi trường bookName chẳng hạn, giống như với Rails, mình cũng gửi lên 1 request như sau:

```
PATCH /Lessons/123
{ 
  "bookName": "A21 / 文法"
}
```

Vì ta chỉ muốn update 1 trường bookName, nên ta sẽ chỉ gửi lên bookName. Bên phía server, ta có thể xử lý như sau:

```
[HttpPatch("{id}")]
public IActionResult Update(int id, [FromBody] Lesson lessonParams)
{
  if (lessonParams == null) { return BadRequest(); }
  try {        
     // Logic lấy bản ghi cũ ra, update các trường và lưu lại vào database.        
    return new ObjectResult(updatedLesson);
  } catch (Exception e) {
    return BadRequest(e.Message);
  }
}
```

Và giờ xem lại , record vừa được update của chúng ta thành ra như thế này :)

```
GET /Lessons/123
{
  "id" : 123,
  "index": null,
  "bookName": "A21 / 文法"  
}
```

Index bị biến thành null ! và nếu model của mình có thêm nhiều property nữa thì chúng cũng đều sẽ trở về null :-? Tại sao lại như vậy ??

Hóa ra, vấn đề này xảy ra là do cách C# (và .NET) deserialize một JSON Object về một class object.

Khác với Ruby, hay javascript, C# là một ngôn ngữ dạng typed language - tức là các property của một class đã được định nghĩa từ trước.

```
public class Lesson : IEntity
{
    public int Id { get; set; }
    
    public int Index { get; set; }
    
    public string BookName { get; set; }
}
```

Như vậy, một khi server nhận request update từ phía client, nó sẽ phải parse JSON Object từ request về 1 object Lesson. Lúc này ...

```
PATCH /Lessons/123
{ 
  "bookName": "A21 / 文法"
}
```

Sẽ được C# convert về thành như sau:

```
public class Lesson : IEntity
{
    public int Id { get; set; }                 // 123 lấy từ params id
    
    public int Index { get; set; }              // null
    
    public string BookName { get; set; }        // "A21 / 文法"
}
```

Hmmm ... Như vậy là vì ta không gửi lên Index, nên trường đó được convert về null. 

Nếu trong trường hợp này, bên phía server ta có thể xử lý theo cách : bỏ qua các giá trị null và chỉ cập nhật những trường có giá trị. 

Lúc này, ta lại gặp phải một vấn đề nữa - đó là khi ta THẬT SỰ cần update 1 trường về giá trị NULL:

```
PATCH /Lessons/123
{   
  "bookName":  null
}
```

Ok, như vậy là do giới hạn của ngôn ngữ C#, .NET sẽ không có cách nào phân biệt được 2 trường hợp:
 - ta muốn xóa giá trị của một trường (gửi lên với value = null)
 - không muốn thay đổi giá trị của trường đó (không gửi lên gì cả)

Cả 2 trường hợp, sau khi convert từ JSON Object về Class Object, property đó đều mang giá trị là null.

![](https://images.viblo.asia/f4c9e189-e9cd-4cb6-a381-57c554a1e2c7.png)

Giải pháp mà mình thường sử dụng khi viết API với Rails, bây giờ đã không thể áp dụng được với .NET. Điều đó buộc mình phải tìm đến với một giải pháp khác.

## JSON Patch

Trong chuẩn [RFC 5789](https://tools.ietf.org/html/rfc5789#section-2.1) (chuẩn RFC cho `PATCH` method), ví dụ cho 1 request PATCH được ghi như sau:

```
PATCH /file.txt HTTP/1.1
Host: www.example.com
Content-Type: application/example
If-Match: "e0023aa4e"
Content-Length: 100

[description of changes]
```

Trong đó, phần `[description of changes]` có thể chứa bất kì dạng mô tả nào có thể được dùng để mô tả cách thức thay đổi đối với resource. Một trong các chuẩn được quy ước sử dụng được nhắc tới ở tài liệu [RFC 6902](https://tools.ietf.org/html/rfc6902) như sau:

```
PATCH /my/data HTTP/1.1
Host: example.org
Content-Length: 326
Content-Type: application/json-patch+json
If-Match: "abc123"

[
  { "op": "test", "path": "/a/b/c", "value": "foo" },
  { "op": "remove", "path": "/a/b/c" },
  { "op": "add", "path": "/a/b/c", "value": [ "foo", "bar" ] },
  { "op": "replace", "path": "/a/b/c", "value": 42 },
  { "op": "move", "from": "/a/b/c", "path": "/a/b/d" },
  { "op": "copy", "from": "/a/b/d", "path": "/a/b/e" }
]
```

Ví dụ này lấy từ tài liệu của chuẩn RFC 6902, cung cấp một trong những cách chuẩn hóa để thực hiện việc update - và có tên gọi là JSON Patch.

Nhìn vào ví dụ trên, một JSON Patch Object thực chất là một tài liệu JSON có cấu trúc, quy định cụ thể các bước thao tác để thay đổi một đối tượng. Do đó một JSON Patch Object sẽ có dạng mảng chứa các JSON Object 

```
{ "op": "test", "path": "/a/b/c", "value": "foo" }
```

Trong đó:
- Trường `op` sẽ định nghĩa loại hành động mà ta muốn thực hiện. Trường này sẽ chứa 1 trong các action: `test` , `remove`,  `replace`, `move`, `copy`.
- Trường `path` sẽ chứa địa chỉ đường dẫn tới property mà ta muốn thực hiện thay đổi. Chú ý rằng ta có thể áp dụng với cả các nested object. Ví dụ như với một object `car` chẳng hạn:

```
{
   "branch": "BMW",
   "color": "red",
   "year": 2015,
   "owner": {
       "name" : "John",
       ...
   },
   "renters": [
       { "name": "Mark", ... },
       ...
   ]
   ...
}
```

Nếu muốn update tên của chủ xe, thì lúc này trường "path" trong request của ta sẽ có giá trị là "/owner/name"

- Trường `value` chứa giá trị mới muốn thay thế cho giá trị cũ.

Giờ hãy xem xét từng operation cụ thể.

### 6 loại operation của JSON Patch

#### Add 

- `add` operation có nghĩa là ta muốn thêm một property cho object, hoặc thêm một item vào 1 array. 
- Thực tế với C#, vế đầu tiên không áp dụng được, vì các property của object là luôn xác định từ trước.

Để thêm một item vào một array - quay lại với ví dụ về object `car` bên trên, để thêm một renter, trong request ta có thể viết như sau:

```
{ "op": "add", "path": "/renters/1", "value": { "name", "Spacy", .... } }
```

Lệnh trên sẽ thêm 1 `renter` vào đầu danh sách `renters`. Thay vì đó, ta có thể dùng `-` để thay cho chỉ số index để thêm item vào cuối array:

```
{ "op": "add", "path": "/renters/-", "value": { "name", "Spacy", .... } }
```

#### Remove

Tương tự như Add, lệnh `remove` có nghĩa là ta muốn bỏ đi 1 property trong object hoặc bỏ đi 1 item trong array. Và cũng tương tự như với `add` - ta không thể thực sự "vứt đi" một property của một class trong C#, mà thay vào đó ta sẽ set giá trị của trường đó về giá trị mặc định. Với các trường có type ở dạng nullable, giá trị của trường đó sẽ bị set về NULL. (Quay lại với ví dụ về class `Lessons` ở trên :)). Trong khi đó, với các trường có dạng như int, giá trị sẽ bị set về `0`.

```
{ "op": "remove", "path": "/renters/1" }
```

Lệnh trên sẽ xóa đi item đầu tiên trong mảng `renters`.

#### Replace

Hàm này đơn giản chỉ là cập nhật lại giá trị cho 1 trường .

```
{ "op": "replace", "path": "/year", "value": 2016 }
```

#### Copy

Hàm `copy` sẽ `copy` giá trị từ một path này tới path khác. Path ở đây có thể là property, object, array ... 

```
{ "op": "copy",  "from": "/branch", "path": "/color" }
```

Thực tế, operation này không có nhiều ý nghĩa lắm ! Đối với C#, thư viện `ASP.Net Core` implement operation này chính bằng một `add` operation.

#### Move

Hàm `move` hoạt động giống với `copy`, chỉ có 1 điểm khác là value sẽ không còn nằm ở trường `from` nữa. `ASP.Net Core` implement operation này bằng một `remove` operation ở path gốc, và một `add` operation ở path đích.

```
{ "op": "move",  "from": "/branch", "path": "/color" }
```

#### Test

Operation `Test` cho đến bây giờ vẫn chưa nằm trong implementation của `ASP.Net Core`. Trong thực tế, operation này được sử dụng để kiểm tra xem một object bên phía server đã có thay đổi gì chưa so với lần cuối ta lấy nó về.

```
{ "op": "test",  "from": "/branch", "value": "BMW" }
{ "op": "replace",  "from": "/branch", "value": "Honda" }
```

2 câu lệnh trên tương đương với *Đầu tiên, kiểm tra xem `branch` có giá trị là `BMW`, sau đó update lại giá trị thành `Honda`*. Nếu như giá trị ban đầu không phải là BMW, vậy thì sẽ không có gì xảy ra cả. 

Trong 1 payload, ta có thể có nhiều operation test, và nếu như 1 trong các test này fail thì toàn bộ Patch request sẽ không được apply.

### Sử dụng JSON Patch trong ASP.Net project

Trước đây, với ASP.Net framework , JSON Patch không được mặc định hỗ trợ và ta phải sử dụng các library bên thứ 3. Tuy nhiên, `ASP.Net Core`, JSON Patch [đã được hỗ trợ natively](https://github.com/aspnet/JsonPatch). 

Trong một project, ta chỉ việc thêm thư viện này với câu lệnh:

```
dotnet add package Microsoft.AspNet.JsonPatch
```

Quay lại với ví dụ với class `Lessons` đầu bài, bây giờ ta có thể sửa lại controller như sau:

```
[HttpPatch("{id}")]
public IActionResult Update(int id, [FromBody] JsonPatchDocument<Lesson> lessonParams)
{
  if (lessonParams == null) { return BadRequest(); }
  try {  
     var oldRecord = context.Find(id); // Lấy bản ghi cũ ra
     
     lessonParams.ApplyTo(oldRecord);
     
     context.Update(oldRecord); 
     context.SaveChanges();           // Lưu lại record vào database
     
    return new ObjectResult(oldLesson);
  } catch (Exception e) {
    return BadRequest(e.Message);
  }
}
```

Chú ý, với request sử dụng JSON Patch, ta phải để ở dạng format là `application/json`

![](https://i.imgur.com/F0vdqi5.png)

### Sử dụng JSON Patch với Client - Javascript.

Rõ ràng , so với việc gửi ngược lại một record lên - khá là đơn giản - thì việc xử lý form phía client để tạo ra 1 JSON Patch Object có vẻ phức tạp hơn. Với các ngôn ngữ Client khác (Java với Android, Swift với iOS ...) ... thì mình không biết các ngôn ngữ này có hỗ trợ native việc này không, nhưng với Client Web - khi xử lý form với Javascript, ta buộc phải sử dụng các 3rd party lib nếu không muốn "tay to" xử lý một object bằng tay. Và đây là lib mà mình lựa chọn sử dụng phía client:

https://github.com/Starcounter-Jack/JSON-Patch

### Tài liệu tham khảo

http://williamdurand.fr/2014/02/14/please-do-not-patch-like-an-idiot/
https://philsturgeon.uk/api/2016/05/03/put-vs-patch-vs-json-patch/
https://dotnetcoretutorials.com/2017/11/29/json-patch-asp-net-core/
http://benfoster.io/blog/aspnet-core-json-patch-partial-api-updates