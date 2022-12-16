## Hello, Word:
![](https://images.viblo.asia/3e943f69-368d-41eb-adac-a9c3837db25f.png)

## Tổng quan về ActiveRecord :


Là một devoloper Ruby On Rails chắc hẳn các bạn  không còn xa lạ gì với cáI tên "Active Record", vậy liệu đã bạn đã hiểu rõ về nó , quá trình hoạt động và cấu trú nó ra sao như thế nào ??? nhất là những bạn mới tiếp cận Rails đồng thời là ActiveRecord ?, sau đây tôi và các bạn sẽ đi tìm hiểu rõ hơn về nó và những điểm nổi bật của ActiveRecord nhé ! và như các bạn đã biết đối với 1 lập trình viên thì , một trong những kỹ năng quan trọng nhất là lập luận logic, chia vấn đề thành những phần nhỏ và giải quyết từng phần một, 1 ví dụ nhỏ : khi bạn xây dựng  1 ứng dụng website và dĩ nhiên Database là điều không thể thiếu cho website của bạn từ 1 trang blog của bạn cho tới các ông lớn như FaceBook, instagram . . . với lượng dữ liệu khổng lồ và cực kỳ phức tạp, chồng chéo , từ đây ta có thể hình dung ra được với việc thiếu kế 1 hệ cơ sở dữ liệu phức tạp và không đúng cách sẽ khiến cho bạn gặp rất nhiều vấn đề cho công đoạn lập trình sau đó của bạn , từ đây ta thấy rằng  hệ cơ sở dữ liệu là mảnh ghép quan trọng đối với ứng dụng của bạn, thì sau đây bạn có thể thấy được cách Rails thao tác, kết nối  với data sẽ khiến bạn ngạc nhiên  thật thú vụ. Đây chính là một trong những lí do chính khiến cho Rails hoạt động tốt khi so sánh với những lựa chọn khác trong một vài năm trở lại đây, Từ đây Rails cung cấp cho chúng ta 1 ActiveRecord một ORM nằm gữi ứng dụng web và database , cho phép cái model cấu trú theo 1 cách logic hơn, và cho bạn cảm nhận dễ dàng  nắm bắt. Vậy ```ORM``` là gì ? chúng ta cùng tìm nhé Follow me !

-----


## ORM ? WHAT IS IT ?

Đầu tiên các bạn đã tự hỏi rằng  ORM là viết tắt của cái gì không  ? nó viết tắt của cụm từ ```Object Relational Mapping``` tạm dịch ra tiếng việt là ```Bản đồ quan hệ giữa các đối tượng``` hơi khó hiểu nhỉ @@ , nghe xong từ thì chắc hẳn mọi người vẫn còn ngơ về nó  và chắc rồi mình cũng vậy , về tổng quan nó là một kĩ năng trong lập trình giúp chuyển đổi dữ liệu giữa các hệ thống không tương thích trong lập trình hướng đối tượng. Nó tạo ra một Cơ sở dữ liệu object ảo, có thể sử dụng được bên trong ngôn ngữ lập trình, nói 1 cách khác hay mĩ miều hơn 1 chút thì  ORM framework là một layer nằm ở giữa ngôn ngữ lập trình và database, được viết bằng một ngôn ngữ lập trình hướng đối tượng (như là Ruby, Python, PHP ... vân vân mây mây ) nó giúp bạn có thể sử dụng chính ngôn ngữ lập trình đó để thao tác với database mà không cần viết các câu lệnh SQL dài dòng, Các object class sẽ tương ứng với các bảng dữ liệu trong database, và các object instance sẽ tương ứng với các record trong các bảng dữ liệu đó, nào cùng đi đến sức mạnh của nó nhé GOOO !


-----


##  Điểm mạnh:

  ORM mang tới cho chúng ta rất nhiều tiện tích , có thể kể tới là :
  
  
  *  Độc lập với Database Đây có lẽ là lợi ích lớn nhất khi sử dụng ORM trong một ứng dụng. Bạn không cần viết các câu lệnh của database. Bạn đang sử dụng SQLite, bạn không thích và đổi sang MySQL hay PostgreSQL, lúc này bạn cũng k cần phải sửa các câu lệnh bởi ORM đã làm hết cho bạn. Kể cả khi thay đổi database, bạn cũng chỉ cần chỉnh sửa một vài dòng trong Database configuration adapter
  *  Giảm số lượng dòng code và tăng hiệu quả lập trình ORM cho phép lập trình viên có thể tập trung vào các business logic hơn là viết các câu query phức tạp tới database, nhờ đó thu gọn được code và tăng hiệu quả làm việc.
  *  Query Interface đa dạng ORM framework mang đến một số lượng query interface đa dạng, giải quyết được hầu hết các trường hợp có thể xảy ra tương ứng với những câu lệnh SQL phức tạp.
  *  Quan hệ giữa các dữ liệu ORM giúp quản lý hiệu quả mối liên hệ giữa các dữ liệu. Các object liên quan đều được load một cách tự động khi một query được dịch sang câu lệnh SQL tương ứng.
  *  Xử lý đồng thời ORM hỗ trợ xử lý đồng thời, cho phép nhiều user có thể update một tập hợp các data cùng một lúc.
  *  Caching Object được cache lại, giảm thiểu thời gian load trên database.Transaction Nhiều sự thay đổi của object đều có thể đưa vào chung trong 1 transaction, nhờ đó chúng có thể đồng thời được thực thi (commit) cũng như bị huỷ bỏ (rollback). Nhiều transaction có thể chạy cùng một lúc nhưng mỗi transaction đều độc lập với các transaction khác.

Và tất nhiên rồi cái gì cũng có điểm mạnh điểm yếu của nó:

## Điểm Yếu :
   * Tăng xử lý ORM framework tạo ra một layer giữa ngôn ngữ lập trình và database, giúp giảm sự phức tạp trong lập trình và tăng tốc độ phát triển. Tuy nhiên điều này cũng làm tăng thêm các xử lý trong ứng dụng. Sử dụng ORM sẽ tiêu tốn nhiều dữ liệu và tài nguyên CPU hơn.
   * Làm quen Để đưa một ORM vào trong ứng dụng, các lập trình viên sẽ cần thêm kĩ năng để sử dụng một framework mới. Do đó sẽ mất thời gian để làm quen.Hiệu suất Một số thao tác như insert hàng loạt, sửa xoá ... sẽ chậm hơn khi được viết bằng ORM. Thông thường, các công việc này sẽ có hiệu năng cao hơn nếu sử dụng trực tiếp câu lệnh SQL thuần.
   * Bỏ quên SQL Sử dụng ORM giúp lập trình viên dễ dàng hơn trong thao tác với database nhưng cũng dẫn tới việc lập trình viên không nghiên cứu chi tiết vào SQL, tạo ra lỗ hổng kiến thức.

và tẩt cả đây là tổng quan về ORM, nói 1 hồi về ORM rồi nhỉ ? chúng ta cùng tìm hiểu về từ khóa chính ngày hôm nay nhé ```ACTIVE RECORD```


-----

## ACTIVE RECORD:

Vậy là chúng ta có thể hiểu được phần nào về ORM and now là Active Record nó có tính năng gì ? sử dụng nó như thế nào ? 

à nói qua 1 chút thì bạn có biết rằng Rails thực chất là tổng hợp của 7 gem Ruby hoạt động cùng nhau và được quản lý bởi gem . Trong đó, Active Record chính là gem đóng vai trò của một ORM, nghiệm vụ chính của nó là xử lý và thao tác các vấn đề liên quan tới hệ cơ sở dữ liệu, và việc thao tác này vốn được thực hiện bởi các câu lệnh SQL(nếu bạn sử dụng SQL database), đến nay thì nó  đã được đơn giản hoá thành việc thao tác với các Ruby object thông thường.

Nếu như bạn muốn query 1 bảng lấy ra tất cả Student , thì bạn phải query câu lệnh ``` SELECT * FORM students```  rồi lại rồi convert kết quả đó sang dạng mảng, thay vì đó trong ```active record``` thì bạn chỉ cần viết 1 câu ngắn ngủi như sau :  ```Student.all``` done và sau đó là nghiệm vụ của ```active record``` nó sẽ lấy ra cho 1 mảng bao gồm tất cả các ```student``` thật vi diệu phải không nào ? 

à có 1 điểm cần các bạn lo ngại ở đây là ? nếu sử dụng data base khác thì phải làm sao ?  thì để giải quyết vấn đề này thì bạn chỉ cần vào file 
```config/database.yml```  ở đây bạn có thể setting cấu hình database, còn lại thì Active Record sẽ xứ lý cho bạn việc đồng nhất và xử lý đối với các database khác nhau, việc của bạn là tập trung vào code cho ứng dụng của mình mà thôi. còn ở phía model thì sao nó sẽ như thế nào ? nào cùng tôi tiếp tục khám phá nhé !

-----

## Rails Model:

Active Record giao tiếp với database, nó đóng vai trò là phần M trong MVC của Rails: models. Model là nơi xử lý hầu hết các business logic trong ứng dụng của bạn, muốn lưu giữ thông tin về các students của mình, bạn tạo một bảng trong database đặt tên là students.Bạn muốn truy nhập vào bảng đó từ trong ứng dụng của bạn, bạn tạo một model đặt tên là Student, Một bảng trong database sẽ tương ứng với một model được thừa kế từ Active Record. Chỉ thế thôi, bạn đã có thể sử dụng các phương thức vô cùng tiện lợi như `all`, `find` hay `create`, `destroy` .... 

sau khi bạn tao 1 project rails với câu lệnh sau :
 
 ``` 
 rails new myapp
cd myapp
```
và tạo database :
 à và khá nhiều cách để tạo ra model mình sẽ liệt kê như sau :
 
 ```
 rails generate model Student
rails g model Studet
rails g model Student name:string, code:integer, age:integer, address:string
```

nhìn đây chúng ta có thể hiểu rằng chữ `g` chưa kia là viết tắt của `generate` và ngược lại cũng vậy nếu bạn muốn xóa thì chỉ cần thay chữ `g` kia thành `d` tức là `delete` , thật tuyệt vời và thú vị phải k :))) phương châm của RubyOnRails mà làm ra để cho các lập trình thấy hạnh phúc không bị nhàm chán với công việc lâp trình, đi hơi xa chút rồi ... quay lại nào. Và khi bạn chạy câu lệnh trên thì nó sẽ tạo ra cho bạn 2 file như sau :

```
create db/migrate/_create_students.rb
create    app/models/student.rb
```

File đầu tiên, là một file migrate, sử dụng để sửa database. File thứ hai, chính là một class của Ruby, class này kế thừa từ Active Record.
OK tới đây ta có thể sủ dụng các câu lệnh của Active Record  đối với model `student` rồi đó. Chúng ta cùng thử 1 ra 1 record trong bảng `student` này nhé :

```Student.create(name: “dutavi”, code: 00686, age: 18, address: london)```

done vậy là chúng ta đã có 1 bản ghi là : có tên là: `dutavi`, code là: `00686`, tuổi là : 18, và địa chỉ là: `london`
với việc gọi method `create` của class Student và truyền vào đó tham số là một Hash bao gồm các key và value là các trường của model User và các giá trị tương ứng là chúng ta đã hoàn thành bước tạo 1 record, tới phần migration thì sao ?

## Migration:

Bạn cần migration khi nào? Đó là khi bạn cần những sự thay đổi về cấu trúc database. Bạn sẽ định nghĩa những thay đổi đó sử dụng các câu lệnh của Rails, các file migration sẽ được tạo ra và bạn chạy

```rails db:migrate```

để cập nhât những gì bạn thay đổi hay muốn  thêm vào db, và đây là cấu trúc của 1 file migration:

```
class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|

      t.string :name
      t.integer :age
      t.timestamps
    end
  end
end
```

và tất nhiên khi bạn muốn đảo ngược quá trình thay đổi database mà bạn vừa tạo ra với câu lệnh:

`rails db:rollback`

## VALIDATIONS:

Và chúng ta không thể xin nhắc lại  không thể thiếu phần này nhé.  Đây là nơi ta đưa ra các điều kiện để chắc chắn rằng những dữ liệu được đưa vào trong database là chính xác và đúng chuẩn.
vd: `validates :name, presence: true` 
viết  như sau để chắc chắn rằng mỗi 1 học sinh đều phải có tên , và tất nhiên Rails còn hỗ trợ rất nhiều các validations khác như : `presence`, `uniqueness`, `inclusion`, `exclusion`, `length`... ngoài ra còn nhiều các option  bạn có thể xem thêm tại đây nhé :https://guides.rubyonrails.org/active_record_validations.html


## CALLBACK:
callback  là 1 phần quan trọng của Active Record(đảm bảo đi phỏng vấn 10 ông thì 9 ông bị hỏi về cái này :v) nó sẽ được gọi tới vào một thời điểm nào đó trong vòng đời của một đối tượng. Callback thường được dùng để thực thi các phương thức logic trước hoặc sau khi đối tượng có một sự thay đổi nào đó. Ví dụ như create, update, delete.

đầu tiên ta sẽ tạo ra 1 một method muốn sử dụng trong callback:
```
def set_name
  self.name = “dutavi”
end
```

và viết ra 1 câu lệnh để thực thi:

`before_save :set_name`

nói 1 cách văn học thì điều này có nghĩa là , cứ mỗi khi ta gọi lệnh save, method set_name sẽ được chạy xong trước khi save được hoàn thành, và có rất rất nhiều loại callback khác nhau xủ lỹ trong những trường hợp khác nhau dưới đây tôi sẽ để 1 vài bài viết chi tiết và các tổng hợp về callback: https://guides.rubyonrails.org/active_record_callbacks.html, https://viblo.asia/p/tim-hieu-ve-callback-trong-rails-RQqKLg9657z, và tôi xin nhấn mạnh với ae là developer rails thì phải chắc cú cái này nhé !

## Associations: 
đây cũng có thể nói là 1 phần hay ho , như chúng ta đã biết thì relational database đều có nhiều các bảng có mối liên hệt với nhau.
Ví dụ như: ngoài model Student, chúng ta còn có thêm một model là Teacher , và một student có thể có nhiều teacher. Làm thế nào ta có thể tạo được liên kết này, tất nhiên rồi đầu tiên ta phải tạo 1 model teacher đã :

`rails g model Teacher name:string, student_id:integer`

và `student_id` ở đây  chính là foreign key ta sử dụng để liên kết giữa hai model. và chạy `rails db:migrate` và chúng ta bắt đầu thiết lập mỗi quan hệ 2 bảng với nhau. ở đây tôi sẽ làm như sau 

ở class `app/model/student.rb` chúng ta thêm mối quan hệ như sau :

`has_and_belongs_to_many :teachers`

và ở `app/model/teacher.rb` 

`has_and_belongs_to_many :students`

done, như vậy là chúng ta đã thiếp lập được mối quan hệ gữi 2 bảng ở đây là quan hệ n-n, ngoài ra có rất nhiều mối quan hệ và nhiều cách thiếp lập mối quan hệ khác nhau : https://viblo.asia/p/association-trong-rails-part-1-4dbZN0Aa5YM, https://guides.rubyonrails.org/association_basics.html.

## Tổng Kết:
nói 1 hồi dài rồi bây giờ chúng ta cùng đến phần kết nào, nói ngắn ngọn thì như này :
Active Record là tính năng mạnh nhất của Rails và cũng là một trong những phần khó hiểu nhất để bạn có thể làm quen với Rails. Khái niệm khó nhất của ActiveRecord có lẽ là Association, 
và 1 chút quan điểm cá nhân mình , thực sự mình bất ngờ và thích thú với active record nhưng đổi lại active record hỗ trợ quá nhiều thứ nên việc sử dụng câu query của sql sẽ bị giảm đi, đồng thời giảm cảm giác với các câu query thông thường, mỗi khi mình muốn xem đầy đủ câu query đều phải bật log lên xem, tuy vậy mình không phủ nhận sức mạnh của active record, và chắc hản đối tượng đọc bài viết này sẽ là những bạn mới làm quen với rails cũng như `active record` , vì vậy thông qua bài giới thiện này (Có thể nhiều điểm chưa rõ hoặc hơi khó hiểu )   mình mong mang đến cho ae những kiến thức bổ ích và có thể giúp ae giải quyết 1 vài vấn đề đang còn bế tắc trong kỹ thuật này , chúc ae nắm chắc về kỹ thuật này và hoàn thành ứng dụng của mình 1 cách hiệu quả và thành công nhất nhé !