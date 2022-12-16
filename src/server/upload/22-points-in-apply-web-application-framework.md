Series bài viết này sẽ giới thiệu về 22 quan điểm quan trọng cần lưu tâm khi áp dụng một framework nào đó vào việc phát triển Web Application

Mỗi Framework đều có đặc trưng khác nhau nhưng khi áp dụng vào môi trường Product thì các quan điểm cũng không khác nhau, các quan điểm này xây dựng trên tiền định là để không phụ thuộc vào cá tính của framework mà để phổ biển được cho càng nhiều framework[^1] càng tốt. Và để câu chuyện được đơn giản thì chủ thể nói đến trong bài này là các application cung cấp REST API.

[^1]: Ở đây chủ yếu là  Java、Scala、Kotlin、Ruby、PHP、Python.


## Pre-condition

### Software entropy

Chắc hẳn là nhiều engineer đều nhận thấy [Software cannot avoid the law of increasing entropy- Các phần mềm không thể tránh khỏi quy luật gia tăng hỗn loạn](http://forza.cocolog-nifty.com/blog/2012/08/post-9619.html) phải không nào [^2]. Thông thường khi liên tục phát triển ứng dụng thì đều sẽ rơi vào trạng thái: **tốc độ dev chậm đi, chất lượng đi xuống và càng ra nhiều bug, đổ lỗi cho trách nhiệm kĩ thuật**. Quả thực sức ép gia tăng hỗn loạn là vô cùng mạnh mẽ và bạn sẽ dễ dàng bị rơi vào darkside nếu bạn không tỉnh và ẹp zai :v: .

[^2]: Tham khảochương 2_Software entropy của cuốn  [Master of programmer](https://www.amazon.co.jp/dp/427421933X/).

### Phân tách lĩnh vực quan tâm

Như ở bài viết này [A Study of Complexity and Architectural Design in Large Web Applications](https://qiita.com/tmknom/items/be5c4b350f561991f2f5) cũng có ghi, Software development là chiến đấu với sự phức tạp. Đặc biệt là việc nắm được **Làm sao để phân tách lĩnh vực quan tâm về「business」và「kĩ thuật」** chính là chìa khóa để hiện thực hóa phát triển ứng dụng cho phép biến đổi liên tục đáp ứng thời cuộc.

### Thiết kế ổ domain

Phương pháp ưu việt nhất để phân tách được lĩnh vực「Business」và「Kĩ thuật」đó là [Thiết kế ổ domain（DDD）](https://www.slideshare.net/digitalsoul0124/ss-44948096). Phân tách lĩnh vực quan tâm ra, vừa kết hợp sử dụng triệt để [ngôn ngữ phổ thông](http://yoskhdia.hatenablog.com/entry/2016/05/22/182605) vừa thực hiện modeling, và liên tục refactor thì sẽ thấy được thay đổi rõ rệt. [^3] Ở bài viết này sẽ không sờ sâu đến chi tiết thiết kế ổ domain, nhưng sẽ nổi bật nhận thức về **Thiết kế architecture cơ bản để thực hành thiết kế domain**.

[^3]: Đây là kinh nghiệm cá nhân của người viết bài.

## 22 quan điểm cần lưu ý

Các quan điểm sau đây độc lập với nhau, sắp xếp theo trật tự thiết kế của người viết bài

### Thiết kế tổng thể

1. [Chọn ngôn ngữ/framework](#Chọn ngôn ngữ và framework)
1. [Application・Architecture](#Application architecture)

### Core technology

1. [DI（Dependency Injection）và DI container](#didependency-injectionとdiコンテナ)
1. [O/R mapper](#ormapper)

### Mối quan tâm xuyên suốt

1. [Transaction](#transaction)
1. [Xử lý exeption](#xử lý exeption)
1. [Logging](#logging)
1. [Authentification・Authorization](#Authentification authorization)

### Các yếu tố quan trọng dễ bị bỏ qua

1. [Directory structure](#directory structure)
1. [Timezone](#timezone)
1. [Date time hiện tại](#Date time hiện tại)
1. [Presentation](#presentation)
1. [Thiết kế application và xử lý khởi tạo](#thiết kế application và khởi tạo)
1. [ĐỊnh nghĩa build](#Định nghĩa build)
1. [CI](#ci)
1. [Database migration](#database migration)
1. [Databaser server](#database server)

### Test code

1. [Database test](#Database test)
1. [Double test và giao tiếp HTTP](#double test và giao tiếp http)
1. [Module for test](#module for test)

### Scale organization

1. [Documentation](#documentation)
1. [Service template](#service template)


## Thiết kế tổng quan

### Chọn ngôn ngữ/framework

Việc chọn ngôn ngữ và framework là vô cùng quan trọng đòi hỏi cả tính cẩn thận và năng lực tính toán và không chấp nhận có sai sót thất bại nào.

#### Thử nghiệm

Không được chỉ đọc qua các document trên mạng rồi đưa ra kết luận. Mà cần phải **tự mình thử làm** dù chỉ là 1 ứng dụng nhỏ cũng được nhưng cần để chứng minh cho tìm hiểu của mình là đúng.

Cá nhân tác giả có nhiều kinh nghiệm taoj RSS leader. Có thể bao quát nhiều yếu tố quan trọng trọng Web application, spec cũng không phức tạp nên có thể thực hiện được ngay. Ngoài ra nếu làm nhiều lần cùng 1 chủ đề thì cũng có thể học hỏi được các điểm khác nhau của các framework. Chủ đề làm thử tôi suggest đây là 「Hello, World!」.

#### Đưa ra lựa chọn

Tự mình thử nghiệm xong rồi nhận thấy cốt lõi tốt phù hợp của nó thì đến bước đưa ra lựa chọn, khi lựa thì check với các tiêu chí như sau:

* Có thể Readable được business logic phức tạp không
* Có hỗ trợ compiler và Editro（bao gồm IDE）và có thể dễ dàng refactoring không
* Có coi trọng khả năng tương thích ngược không
* Có tồn tại Community, liên tục được maintenance không
* Có lưu thông lượng thông tin vừa đủ không
* Có nâng cao được motivation của engineer không

Ngoài ra còn có thể tham khảo ở [Câu chuyện chiến lược kĩ thuật mới có thể chạy được 10 năm](http://developer.hatenastaff.com/entry/2015/12/25/140233)

#### Chuẩn bị trước

Việc thay đổi sau khi áp dụng ngôn ngữ/framework gần như đồng nghĩa với làm lại từ đầu. Nếu bạn thất bại tức là project thất bại nên trách nhiệm rất là lớn, **cần phải cẩn tắc vô áy náy** nhe mấy bạn.

Ngoài ra, một khi đã đưa ra quyết định đôi khi sẽ có những câu nói làm lung lay tư tưởng, nhưng đừng để ý đến nó, hãy tin vào kết quả thử nghiệm và quyết định của bản thân.

### Application・Architecture

#### Truyền thuyết MVC[^5]

Rất nhiều các ứng dụng Web đều tiền định là MVC framework. Nếu là các service CRUD đơn giản thôi thì MVC cũng được, còn nếu là ứng dụng dự định áp dụng thời gian vừa và dài thì sẽ có nhiều trường hợp mà MVC không thể kiểm soát được độ phức tạp.
[^5]: Tham khảo [.NET Enterprise Application Architecture](https://www.amazon.co.jp/dp/4822298485/) - chương 7

#### Ứng viên cho Application・Architecture

Theo phân tích ở trên, vậy nếu không nên chọn MVC thì sẽ là gì bây giờ?
Các bạn có thể tham khảo Architecture giải thích trong [What is the most accessible architecture to get started with Domain Driven Design](https://qiita.com/little_hand_s/items/ebb4284afeea0e8cc752)
1. Layered architecture
1. Hexagonal architecture
1. Onion architecture
1. Clean architecture

Thực tế thì cách suy nghĩ cũng như nhau thôi, **Hãy thiết kế theo cốt lõi đã có trong domain model**. Nếu có thể phân tác Domain model Business và vấn đề Kĩ thuật như là Database access thì sẽ thay đổi cục diện tương đối, code khá vững chãi.
Trường hợp của tác giá thì thường chọn Layered architecture làm base. Tuy nhiên, cũng có sử dụng DI nhắc đến sau đây, để tầng domain sẽ không phụ thuộc vào cái nào khác.

![layer.png](https://qiita-image-store.s3.amazonaws.com/0/39241/29d4c01d-092f-bd2b-7f55-afd7175aa4f2.png)

## Core technology
### DI（Dependency Injection）và DI container
Khi phát triển ứng dụng Web mà tính biển đổi mạnh, tức là **bắt buộc phải có DI** cho nên cần phải cân nhắc nên thực hiện như thế nào
#### DI（Dependency Injection）
Suy nghĩ cốt lõi làm sao để có thể phân tách lĩnh vực Business vào Kĩ thuật chính là [DI（Dependency Injection）](http://blog.shin1x1.com/entry/di-memo). **Nếu áp dụng DI thì có thể du nhập các object phụ thuộc từ bên ngoài vào** và có thể giảm phạm vi kết hợp. Theo đó DI container có support thực hiện DI nói đây.
Tiện đây thì tác giả cũng nói dù không có DI container thì cũng có thể thực hiện được DI. Ví dụ như [Consider the optimal Dependency Injection method in Scala](https://qiita.com/pab_tech/items/1c0bdbc8a61949891f1f) trong bài viết này có giới thiệu cách thực hiện chức năng Scala dùng DI mà không cần đến DI container.

#### DI container
Trường hợp áp dụng DI container, cơ bản sẽ dùng những cái mà Framework cung cấp hoăcj suggest mà thôi. Ví dụ [For Scala + Play, Google Guice is the defact](https://www.playframework.com/documentation/2.6.x/ScalaDependencyInjection). Các bước chuẩn bị cần thiết sẽ khác nhau để đưa các object ngoài vào bởi DI container.
[In Java Spring, just define declaratively using annotations](https://qiita.com/shuntaro_tamura/items/ba5a2e9b3ba305285edd#didependency-injection) bằng thông tin ở bài viết này đã có thể thực hiện DI rồi. Mặt khác , so sánh Google Guice và Laravel của PHP v.v..[You have to write the binding definition yourself](https://readouble.com/laravel/5.5/ja/container.html) , so sánh với Spring thì có hơi phiền toái chút.

### O/R mapper

#### Giải quyết Impedance mismatch

Đại ý có 2 thiên hướng:

* **Active record pattern** ： Đóng gói Database access đến object và thêm domain logic. Nên để cấu tạo data của table và cấu tạo data object thống nhất nhau thì sẽ thuận tiện hơn, ban đầu khá đơn giản càng về sau thì sẽ dần thay đổi lớn nên sẽ vất.
* **Data map pattern** ：Định nghĩa class mapping domain model và table, phân tách hoàn toàn cấu trúc của data table với cấu trúc data của object. Việc mapping thì khá là vất vả nên cách này ban đầu thì mệt nhưng sau sẽ nhàn hơn.

Active record pattern nhiều nhựọc điểm khi code thay đổi nên không khuyến khích sử dụng cho duy trì ứng dụng chạy lâu dài, ứng dụng này thích hợp hơn là dùng Data map pattern.

#### Mapping

Chúng ta cùng check xem O/R map có thể tự động mapping các value đến cỡ nào nhé:
1. các giá trị cơ bản như là string, int
2. giá trị ngày hơpf（LocalDateTime etc...）
3. value cho phép null（Optional etc..）
4. enum liệt kê (enum etc..）
5. value class đã định nghĩa độc lập（ValueObject etc...）

Nó sẽ mapping giúp khoảng từ No.1〜3. No.4〜5 sẽ cho mapping một phát vào O/R mapper rồi sẽ mapping lại bằng cơm hoặc ghép mapping rule độc lập vào O/R mapper cũng được.

#### Type safe

Có lẽ đây là điều thường thức rồi, dù áp dụng ngôn ngữ có kèm kiểu tĩnh thì về phần SQL, Compiller cũng không làm giúp ta cái gì cả. Tuy nhiên, trong O/R mapper, có trường hợp cung cấp query builder có thể check bằng DSL độc lập.

* SQL thông thường

```scala
def find(id: Long)(implicit session: DBSession): Option[Member] = {
  sql"select id, name, birthday from members where id = ${id}"
    .map { rs =>
      new Member(
        id       = rs.long("id"),
        name     = rs.string("name"),
        birthday = rs.jodaLocalDateOpt("birthday")
      )
    }
    .single.apply()
}
```

* Type safe SQL

```scala
def find(id: Long)(implicit session: DBSession): Option[Member] = {
  val m = Member.syntax("m")
  withSQL { select.from(Member as m).where.eq(m.id, id) }
    .map { rs =>
      new Member(
        id       = rs.get(m.resultName.id),
        name     = rs.get(m.resultName.name),
        birthday = rs.get(m.resultName.birthday)
      )
    }.single.apply()
}
```

Nếu viết Type safe SQL thì sẽ khởi động được check theo compiller nên chúng ta hoàn toàn có thể yên tâm hơn. Mặt khác, trường hợp thực hiện JOIN phức tạp, thì cần phải học thêm cách viết DSL độc lập, tốn thêm xíu thời gian tìm hiểu.


## Mối quan tâm xuyên suốt
### Transaction
#### Định nghĩa transaction

Cơ bản,sẽ thực hiện bằng Framework hoặc phương pháp tiêu chuển mà O/R mapper cung cấp. Trong Application code, có nhiều cái ghi code kiểm soát transaction, theo [Trường hợp Laravel của PHP](https://readouble.com/laravel/5.5/ja/database.html) thì có ghi như sau:

```php
public function update() {
    DB::transaction(function () {
        DB::table('users')->update(['votes' => 1]);
        DB::table('posts')->delete();
    });
}
```

Bên cạnh đó, cũng tồn tại cái giống như  `@Transactional` annotation của Spring [Thứ có thể định nghĩa bằng cách khai báo] (https://qiita.com/NagaokaKenichi/items/a279857cc2d22a35d0dd) . Mọi người có thể tham khảo.

```java
@Transactional
public void updateFoo(Foo foo) {
  ...
}
```

Tiện đây tác giả cũng muốn lưu ý tuyệt đối không nên cứ commit xong lại rollback về, việc này dễ gây ra bug không đáng có nhé các bạn.

```java
public void updateFoo(Foo foo) {
  connection.begin();
  ...
  connection.commit();
}
```

#### Nhiệm vụ của transaction
Ngoài cách định nghĩa, việc quan trọng nữa đó là **Khớp nhiệm vụ của transaction vào class nào**. Nếu không thiết kế nhất quán trong team, đến khi thực sự lưu tâm thì transaction đã thành nest và không thể kiểm soát nổi rồi

### Xử lý exeption
#### Tiếp nhận error

Việc tiếp nhận error nhất định các bạn phải tham khảo [Error handling・Chronicle](http://nekogata.hatenablog.com/entry/2015/04/11/135231). Với trường hợp ứng dụng Web, ở rất nhiều ngôn ngữ **error là thực hiện trên exeption**.  Cho nên ở bài viết này cũng sẽ focus vào các exeption.

#### Thiết kế exeption

Về thiết kế exeption thì tài liệu sau đây viết khá chi tiết và bao hàm đầy đủ thông tin áp dụng được vào thực tiễn [Write robust code in PHP7-exception handling, assertive programming, contract design](https://speakerdeck.com/twada/php-conference-2016-revised)

Vậy thì nói đến cách xử lý exeption, **Exeption bên trong code application sẽ không đi theo/catch nguyên tắc nào cả**. sử dụng câu try-catch để xuất log và viết thông báo error riêng là khá quan ngại. Dễ bị bỏ sót, không cover đủ nên là xử lý exeption hãy phó thác cho Handler

Hầu hết các framework đều cung cấp cơ chế xác định các trình xử lý exeption cho phép bạn customize xử lý exeption.

#### Exeption Handler
Có 3 điều quan trọng sau đây là cần làm trong Exeption Handler
* Định nghĩa error response
* Error notification
* Xuất error log

##### Định nghĩa error response
Tóm lược về error response trong exeption handler thì status code HTTP và tải trọng tại thời điểm xảy ra error dễ duy trì tính nhất quán trên tổng thể ứng dụng. Ví dụ [Trường hợp Facebook](https://developers.facebook.com/docs/graph-api/using-graph-api/v2.3#errors) thì có cấu trúc như sau để biểu thị error

```json
{
  "error": {
    "message": "Message describing the error",
    "type": "OAuthException",
    "code": 190,
    "error_subcode": 460,
    "error_user_title": "A title",
    "error_user_msg": "A message",
    "fbtrace_id": "EJplcsCHuLu"
  }
}
```

**Nếu tiêu chuẩn hóa error response được thì việc thực hiện API client là vô cùng nhẹ nhàng đơn giản**. Ngược lại nếu làm rời rạc, khi thực hiện API client sẽ vất vả, khóc tiếng Mán luôn á. 


##### Push noti error
Không phải là thông báo push bằng mail hay Slack từ phía Application mà là **nên thông báo thông qua error monitoring system** kiểu như  [Rollbar](https://rollbar.com/). Off thông báo tạm thời, grouping các error cùng kiểu lại với nhau rồi thông báo etc.. có rất nhiều cách kiểm soát thông báo linh động mà không cần đụng đến phía Application.
Ngoài ra cũng cần phải chú ý đến wolf alarm. tôi lo ngại nó dễ xảy ra ngay sau khi vào service, dễ có khuynh hướng cái gì cũng thông báo, đến một khoảng nào đó khi ổn định rồi thì sẽ khó để có thể bỏ thông báo error. Điều tệ nhất là khi error noti được xuất hiện quá thường xuyên, biến nó như thói quen bình thường và các vấn đề nghiêm trọng dễ bị không được chú ý.

##### Xuất error log
Sẽ có những lúc cần điều tra bug nên chúng ta cần cho xuất error log để phục vụ công tác điều tra.
Ngoài ra để rõ hơn nữa thì nếu có thể, hãy cho thêm error message.
Có những người còn cẩn thận đến mức ghi tiếp nội dung vì sao xảy ra error đấy luôn nữa. Tuy nhiên , best nhất còn thêm cả hướng dẫn khi error xảy ra rồi thì khắc phục như nào nữa =)))).