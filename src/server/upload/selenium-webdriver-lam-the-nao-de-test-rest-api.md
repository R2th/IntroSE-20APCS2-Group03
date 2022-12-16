# Tổng quan :

Câu hỏi này được hỏi rất nhiều lần , làm thế nào để test REST API bằng việc sử dụng Selenium Webdriver, bạn có thể nhìn thấy câu hỏi này trên stackOverflow, những người mới test automation đôi khi hiểu rằng selenium chỉ automate cho UI ứng dụng web, tuy nhiên nếu bạn muốn thực hiện setup data hoặc clean data cho UI test sử dụng selenium, có rất nhiều cách để thực hiện điều đó bao gồm thêm 1 vài thư viện, đó cũng là những gì chúng ta sẽ nhìn thấy trong bài này. 
 
Nếu bạn chỉ cần test APIs, tôi khuyên bạn nên dùng : JMETER

  Vì vậy trong bài này , hãy xem cách để test rest api trong selenium framework của bạn nhé.

## REST API Testing

Rest API testing không khó  lắm để so sánh với UI testing, hầu hết APIs thực hiện 1 trong các request : GET / POST / PUT / PATCH / DELETE

* GET được sử dụng để lấy thông tin từ back end và hiển thị trên UI 
* POST được sử dụng để thêm thông tin vào back end
* PUT được sử dụng để update/replace bất cứ thông tin gì đã tồn tại
* PATCH là một phần update
* DELETE được sử dụng để xoá thông tin từ back end

Giả sử rằng bạn đang sử dụng framework testNG/Junit và kiểm tra UI của app sử dụng selenium - bây giờ bạn muốn bao gồm cả test API vào trong framework của bạn nữa , hãy theo dõi phần dưới đây
 
###  Dependencies

thêm dependencies vào maven : 
```
<dependency>
    <groupId>com.mashape.unirest</groupId>
    <artifactId>unirest-java</artifactId>
    <version>1.4.9</version>
</dependency>
<dependency>
    <groupId>org.jtwig</groupId>
    <artifactId>jtwig-core</artifactId>
```

Unirest là một thư viện request HTTP đơn giản và
Jtwig cũng vậy

### ứng dụng mẫu
Hãy xem ứng dụng này https://github.com/dsternlicht/RESTool bạn có thể clone về, cài đặt và chạy trên máy của bạn
cũng như những ứng dụng khác, nó thực hiện get requets  API để lấy ra danh sách contacts được hiển thị trong application

### Lấy danh sách contacts

Khi bạn truy cập vào trang chủ, danh sách contacts sẽ hiển thị :

![](https://images.viblo.asia/406df2dd-0e28-478c-990b-9a61edcc682b.png)

Bạn có thể xem 1 vài  yêu cầu API  GET đã được gửi để lấy danh sách các contacts bằng việc ấn F12 trên trình duyệt chrome , Chrome DevTools sẽ hiển thị ra

![](https://images.viblo.asia/01d3730b-6f62-4c9c-84bf-80c3e7d2f1f2.png)

```
https://localhost:4200/api/contacts?q=
```
 bạn có thể nhìn thấy giá trị trả về dưới định dạng JSON như ở bên dưới :
 
```
[
   {
      "id":"123",
      "name":"Guru",
      "email":"guru@gmail.com",
      "thumbnail":"guru.jpg",
      "phone":{
         "mobile":111,
         "work":222
      },
      "friends":[],
      "numbers":[]
   }
]
```

Bạn có thể lấy, thêm, sửa , xoá thông tin  contact bằng việc sử dụng GET / POST / PUT / DELETE requests. 

### GET Request

Bạn có thể tự thực hiện yêu cầu GET ở trên bằng cách sử dụng Unirest như hiển thị ở đây.

```
String searchQueryApi = "https://localhost:4200/api/contacts?q=";

JsonNode body = Unirest.get(searchQueryApi)
                        .asJson()
                        .getBody();
System.out.println(body);         // gives the full json response
System.out.println(body.length);  // gives the no of items
```

Điều này có thể được sử dụng để thực hiện các sự so sánh đơn giản trong frameWork test 
Ví dụ: bên dưới code mẫu xác nhận rằng tất cả dữ liệu trong phản hồi API được hiển thị trong Giao diện người dùng.

```
driver.get("http://localhost:4200");
List<WebElements> contacts = driver.findElements(By.tagName("tr"));

assert.equals(contacts.size(), body.length);
```

### POST Request:

Khi nào cần thêm contact mới, chúng ta sử dụng POST request theo format dưới đây: 

```
{
  "name": "guru",
  "email": "guru@gmail.com",
  "thumbnail": "",
  "phone": {
    "work": "",
    "mobile": ""
  },
  "numbers": "[]",
  "friends": "[]"
}
```

Nếu bạn muốn tự gửi request và bạn không muốn hard code trong file JSON , chúng ta sử dụng mẫu JTwig dưới đây:

```
{
  "name": "{{name}}",
  "email": "{{email}}",
  "thumbnail": "",
  "phone": {
    "work": "",
    "mobile": ""
  },
  "numbers": "[]",
  "friends": "[]"
}
```

Bây giờ chúng ta có thể đọc template trên và thay đổi giá trị như hiển thị dưới đây:

```
JtwigTemplate template = JtwigTemplate.classpathTemplate("contact.json");
JtwigModel model = JtwigModel.newModel()
                            .with("name", "guru")
                            .with("email", "guru@gmail.com");

template.render(model); //gives the json in the above format by replacing the template expressions
```

Bây giờ chúng ta có thể sử dụng Unirest và gửi JSON ở trên để tạo contact 

```
String postApi = "https://localhost:4200/api/contacts";

Unirest.post(postApi)
        .header("accept", "application/json")
        .header("Content-Type", "application/json")
        .body(template.render(model))
        .asJson();
```

### EDIT Request:

Để edit chúng ta cần sử dụng PUT request 

```
String editApi = "https://localhost:4200/api/contacts/{contact_id}";

JtwigModel model = JtwigModel.newModel()
                            .with("name", "guru")
                            .with("email", "guru123@gmail.com");

Unirest.put(editApi)
        .routeParam("contact_id", "125432")
        .header("accept", "application/json")
        .header("Content-Type", "application/json")
        .body(template.render(model))
        .asJson();
```

đây là edit contact id

### DELETE Request:

```
String editApi = "https://localhost:4200/api/contacts/{contact_id}";

Unirest.delete(editApi)
        .routeParam("contact_id", "1530237572905")
        .asJson();
```

Sử dụng API này để xoá data mà chúng ta gửi lên

```
public class ContactsPageTest{
    
    private String editApi = "https://localhost:4200/api/contacts/{contact_id}";

    @Test
    public void someUItest1(){
        //
    }

    @Test
    public void someUItest2(){
        //
    }


    @AfterTest
    public void teardown(){
        for(String contactid: listOfContacts){
            Unirest.delete(editApi)
            .routeParam("contact_id", contactid)
            .asJson();
        }
    }

}
```

## Kết luận

Bằng cách sử dụng Unirest trong framwork / page object hiện tại của bạn, bạn có thể tương tác với các API REST của ứng dụng và bạn cũng có thể sử dụng các API đó để thiết lập dữ liệu nhanh trong ứng dụng của mình để xác thực chức năng nhanh chóng.

link tham khảo:

http://www.vinsguru.com/selenium-webdriver-how-to-test-rest-api/