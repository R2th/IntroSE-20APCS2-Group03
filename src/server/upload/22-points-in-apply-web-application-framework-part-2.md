## 22 quan điểm cần cân nhắc khi áp dụng web application framework
### Datetime hiện tại

#### Production code

Date time hiện tại thì có thể lấy thông tin 1 cách dễ dàng nhưng không vì thế mà chủ quan, [Bắt buộc phải get thông tin "ngày giờ hiện tại"](http://nekoya.github.io/blog/2013/07/09/what-time-is-it/)

#### Test code

Ở testcode thì trên thực tế thông tin ngày giờ nó cũng khá phiền phức, vì mỗi lần test là giá trị time này lại thay đổi, test sẽ không ổn định. Bởi vậy, thông thường  **khi test sẽ cố định date time hiện tại**

Ví dụ bên Ruby có [Timecop](https://github.com/travisjeffery/timecop) gọi là "gem", có thể dễ dàng cố định datetime hiện tại.

```ruby
Timecop.freeze(Time.new(2017, 12, 15, 12, 34, 56))
Time.now #=> 2017-12-15 12:34:56 +0900
Timecop.return
```

Ngược lại, bên Java với trường hợp là các ngôn ngữ hệ JVM thì cần cơ chế replace [Clock object](https://docs.oracle.com/javase/jp/8/docs/api/java/time/Clock.html) khi test để có thể cố định được datetime hiện tại, cần phải [dùng DI](https://qiita.com/harry0000/items/367b4c8f9b28b80898c6), [định nghĩa wrapper class độc lập](https://stackoverflow.com/questions/24491260/mocking-time-in-java-8s-java-time-api) v.v..

Đây chỉ là vấn đề ngôn ngữ chứ không phải vấn đề framework, nên về cách cố định datetime hiện tại nên tìm ra giải pháp sớm.


### Presentation

#### Định nghĩa routing và Thiết kế endpoint

Định nghĩa routing thì dễ bị confuse, nếu release 1 lần thì sau đó refactoring sẽ khó refactoring, nên chúng ta cần  ý thức sâu sắc về tầm quan trọng của cấu trúc hóa.

Ngoài ra nếu thiết kế endpoint không có tính nhất quán thì có thể khiến hiểu lầm, các member trong team cần quyết sách hợp lý ngay từ đầu. [Tham khảo thêm: Best practise of WebAPI design](https://qiita.com/mserizawa/items/b833e407d89abd21ee72) và [Web API: The Good Parts](https://www.oreilly.co.jp/books/9784873116860/).

#### Request param

Về cơ bản thì việc xử lý request parameter sẽ phụ thuộc vào framework. Nếu có cơ chế mapping với object Form tùy ý thì nhất định tôi cũng muốn được sử dụng. Vì cũng có nhiều framework chỉ mapping với hash đơn thuần, nên trong trường hợp đó cần mapping với object bằng tay.

Thêm đó, **dù có sai sót gì thì cũng không được để nguyên hash** cho nên với giai đoạn đầu thì nhàn dễ nhưng với những người vào sau lại không biết đã cấu trúc như nào lại phải mất nhiều thời gian để tìm hiểu code.

#### Validation

Cũng có framework thực hiện validation khi vĩnh viễn hóa database như Rails, nhưng framework gần đây thì có nhiều cái sẽ thực hiện validation bằng controller. Do phạm vi mà các gọi validation sẽ khác nhau tùy theo framework nên nhiệm vụ của validation cần thống nhất nhận thức trong team. Luận điểm của validation tham khảo [Chương 9.1_Test của Design application architecture pattern](https://www.amazon.co.jp/dp/4774193038).

Ngoài ra cũng cần làm rõ việc **định nghĩa của validation sẽ viết vào đâu**. Ý kiến cá nhân của thôi thì Validation sẽ định nghĩa Form object vào Presentation layer, còn cũng có nhiều người định nghĩa nó trong domain model.

Về hoạt động khi validation error, throw exception rồi throw exception handler thì implement sẽ dễ dàng hơn. Tuy nhiên, vì hơi rối nên phương châm là handling mỗi lần cũng được.

#### Response

Nếu chỉ trả về JSON thôi thì việc đưa object sẽ convert sang chuỗi ký tự JSON là nhanh chóng. Tuy nhiên, không convert y nguyên domain model. Domain model sẽ trở nên kết hợp chặt chẽ với View và domain model, domain model trở nên khó thay đổi. Cách làm này có vẻ phức tạp **nhưng cơ bản là nên chèn trước View. **

Trường hợp trả về HTML thì sẽ install template engine. Về template engine thì tùy theo từng cái mà cấu trúc khác nhau, khuyết điểm khác nhau. ít có thể thực hiện được nên sẽ kiểm chứng kỹ trước khi install. Ngoài ra, vì logic không được gọn gàng với template engine nên team hãy thống nhất nhận thức với nhau thật chỉn chu.


### Setting application và Xử lý init

#### Module hóa

File setting và code init của application thường default là file độc lập. Tuy nhiên thường có cơ chế READ file riêng nên người ta vẫn hay  **chia tách file dựa theo vai trò.** Lý do là việc Module hóa này thường bị coi nhẹ, việc chia nhỏ nhiều file thì về sau dễ thay đổi/update hơn.

#### Comment

Chúng ta phải bỏ tư tưởng "code sao cho người khác không cần đọc comment mà vẫn hiểu được"!
Để mà cho người sau đọc hiểu được thì chúng ta có thể dùng các comment, viết càng nhiều comment giải thích càng tốt.=
Về nội dung comment, viết được "mình đang code cái gì" và  **vì sao mình code vậy** thì khi mình định sửa code sau này , các thông tin đó sẽ vô cùng có ích.

### Định nghĩa build

JavaScript trước nay vẫn rất phức tạp, tuy nhiên đã là ngôn ngữ thì cái nào cũng sẽ có defactor standard nên chúng ta hãy sử dụng standard. Ví dụ như Java thì có Gradle , Scala thì có sbt.etc...

#### Định nghĩa library phụ thuộc

Bất kể ngôn ngữ/framework nào, việc định nghĩa library phụ thuộc là bắt buộc. Cách thức định nghĩa thì tra Google là ra ngay, point quan trọng nhất vẫn là lên chiến lược chỉ định repository quản lý và version up cho lib.

##### Policy quản lý

Giảm thiểu các thư viện phụ thuộc, vì nhiều thư viện mà bạn không biết mình đang sử dụng ở đâu sẽ phải chịu chi phí bảo trì lãng phí. Ngoài ra, nếu bạn cứ cố đẩy nó vào một cách tùy tiện, có nguy cơ phụ thuộc sẽ trở nên phức tạp và bạn sẽ không thể nâng cấp. Khi áp dụng library vào **bạn cần test ngẫu nhiên và đưa ra quyết định cẩn thận**

##### Chiến lược version up

Chỉ có 1 chiến lược version up duy nhất. **Đó là version up thường xuyên**. Nếu bạn coi việc version up là sự kiện gì đó đặc biệt thì vô hình trung sẽ tăng rào cản tâm lý, dần dần lại bỏ luôn việc thực hiện version up.

#### Module hóa và comment

Tươgng tự với file setting etc.. định nghĩa build cũng cần module hóa, nên bạn cũng comment càng nhiều càng tốt. Ngay cả OSS nổi tiếng cũng có hàng trăm dòng định nghĩa build không comment, nhưng bạn không cần phải bắt chước nó.

### Database migration

Việc data migration có thể áp dụng các thứ được cung cấp framework standard, hoặc có thể áp dụng library thao tác đơn lập. Ở đây tôi xin giới thiệu 2 quan điểm, các bạn tùy ý tham khảo xem cái nào phù hợp với team của mình nhé.

#### DSL

Có nhiều công cụ migration có cung cấp DSL để support một cách minh bạch nhiều database. Ví dụ [Active Record migration](https://railsguides.jp/active_record_migrations.html) của Rails, có thể định nghĩa migration trên code Ruby

```ruby
class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.timestamps
    end
  end
end
```

Trong khi đó bên Javaの[Flyway](https://flywaydb.org/) thì lại viết SQL.

```sql
CREATE TABLE person(
  id INT(11) NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
```

#### Rollback

Nhiều công cụ di chuyển có cơ chế rollback, nhưng một số công cụ, chẳng hạn như Flyway, không có cơ chế rollback. Tôi không thích có incident trên product, vì vậy cá nhân tôi không cần chức năng rollback, nhưng nó cũng khá tiện lợi trong quá trình phát triển.