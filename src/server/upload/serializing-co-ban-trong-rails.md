Qua nhiều bài viết chia sẻ về những thứ đã và đang học của mình các bạn sẽ thấy gần như luôn đi với cụm từ "cơ bản", thực tế đúng là như vậy, mình luôn mong muốn được tìm hiểu những thứ từ cơ bản nhất để rồi mường tượng ra được bản chất của nó, như vậy mình mới cảm thấy mình thật sự đã tiếp thu được 1 kiến thức mới. Tiếp tục series đó, hôm nay mình cũng sẽ lại chia sẻ thêm một ít kiến thức cơ bản mà mình tìm hiểu được về serializing trong rails.

# Serializing là gì ?
Mình đoán là các bạn tìm đọc bài này thì cũng giống mình, đang đi những bước đi đầu tiên và còn rất nhiều điều mới lạ, khi mới nhận được task "viết serialize cho abcxyz...", mình thấy khá là khó hiểu về công việc mình cần làm là gì, trước đó mình cx đã được nghe một cụm từ quen thuộc tương tự nhưng đó lại là ["ActiveRecord Serialize"](https://apidock.com/rails/ActiveRecord/Base/serialize/class), đến đoạn này mình vẫn đang hơi rối, qua tìm hiểu thêm thì mình mới biết nó tương tự như một bộ lọc data API vậy. 

Để hiểu trực quan hơn mình sẽ đưa ra 1 ví dụ như này, bạn cần call API cho một màn hình cần hiển thị một vài thông tin: họ tên, tuổi, quê quán của một user. Nhưng với mỗi bản ghi trong DB thì lại tương ứng với rất nhiều trường data, vậy để kiểm soát về lưu lượng data cần và đủ đó thì chúng ta sẽ làm gì? Chúng ta sẽ chỉ lấy ra thứ cần dùng thôi đúng không nào, đương nhiên rails cũng sẽ hỗ trợ lấy data theo chỉ định của chúng ta bằng cách dùng select field chỉ định, nhưng làm việc đó nghĩ đến thôi cx đã thấy rườm rà rồi đúng không. Ngoài ra thì theo mình còn một lí do nữa rails có thêm khái niệm serializing là vì để tổ chức code một cách mạch lạc hơn, điều đó sẽ đúng nếu như mỗi bộ phận chỉ làm đúng và đủ nhiệm vụ của chúng.

Qua ví dụ trên, mình và các bạn sẽ thấy được rằng serializing chính là việc chúng ta tạo ra một bộ lọc data cho API trả về

# Set up cho serializing
Một đích đến sẽ có nhiều đường đi, việc serialzing cũng như vậy, sẽ có các cách khác nhau để tạo nên một lọc mong muốn, nhưng có một gem đã được xây dựng sẵn cho việc này rồi đó chính là gem "active_model_serializers"
Việc cần làm tiếp theo là bạn cài đặt gem này cho project của mình bằng một trong 2 cách
Cách 1:
```
#gemfile
gem 'active_model_serializers'
```
Thêm dòng này vào gemfile và run command: bundle install

Cách 2:
run command: gem install active_model_serializers

# Sử dụng
### Tạo ra serializer
Mỗi serializer chúng ta tạo ra sẽ tương ứng với một model, ví dụ như để tạo bộ lọc cho bảng User, chúng ta sẽ tạo ra một serializer có tên là "UserSerializer" chẳng hạn, việc tạo cx hết sức đơn giản
```
rails generate serializer user
```

lúc này một file có dạng như này sẽ được sinh ra
```
class UserSerializer < ActiveModel::Serializer
end 
```

### Chỉ định data trả về
Vậy là xong rồi, chúng ta đã có cho mình bộ lọc data rồi, giờ việc cần làm tiếp theo chính là nói cho bộ lọc biết chúng ta cần đưa ra những data nào thay vì trả về all
```
class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :birthday
end 
```

Chỉ cần thêm một dòng lệnh này, bộ lọc của chúng ta sẽ tự động hiểu là nó cần trả về 3 thuộc tính của một record đó chính là id, name và birthday của user

### Related data
Ngoài ra thì gem này còn hỗ trợ trả data theo association của record, ví dụ như một user có nhiều lịch sử mua hàng
```
class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :birthday
    has_many :histories
end 
```

### Custom data
Có phải bạn đang nghĩ nếu cần một data khác mà không phải một field nhất định mà còn phụ thuộc những thứ khác hay chưa, ví dụ trong DB mình chỉ lưu first_name và last_name của user, nhưng bên client họ lại yêu cầu chúng ta trả về full_name thì sao ạ? rất đơn giản, everything  is an object - đó là một câu để nói về ngôn ngữ Ruby mà, chúng ta sẽ tạo ra một instance method dạng như full_name, làm thế nào để có thể ra được dạng User.first.full_name là được, việc này có thể viết được trong model luôn nhưng thường sẽ được viết trong một decorator.
```
class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :birthday, :full_name
    has_many :histories
end 
```
Chỉ cần như vậy chúng ta đã có thể lấy được một data custom theo mong muốn

### Get data
Nãy đến giờ chúng ta chỉ mới thấy những câu lệnh set up, vậy làm thế nào để kiểm chứng được những điều trên là đúng?
```
users = User.all
render json: users
```
Chỉ cần với câu lệnh render json, chúng ta đã có thể thấy được một data được kiểm soát như mong muốn có dạng như
```
[
    {
        id: 1,
        name: "haha",
        birthday: "2021/05/05",
        full_name: "hahahaha",
        histories: [
            {
                abc: "fsdfsd",
                xyz: "sdfsdf",
            }
        ]
    }
]
```

Như vậy ở bài viết này mình mong muốn được bản chất của việc serializing là gì, và mình đã chia sẻ một cách mình thấy dễ hiểu và đơn giản nhất. Cảm ơn các bạn đã tìm đọc !