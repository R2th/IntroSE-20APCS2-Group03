*Thực ra tiêu đề đúng phải là : "Tôi đã từng bất ngờ khi biết những điều này" , nhưng viết vậy thì có ma nào vào xem bài viết của mình chứ*  😅😅😅

Không dài dòng nữa, bắt đầu thôi nào!

# 1.  Count và Size

Hai thằng này chắc mọi người chẳng còn lạ gì, tuy nhiên để tìm hiểu bản chất của nó, chúng ta hãy làm thử thí nghiệm đơn giản sau xem nhé!

Đầu tiên chạy rails c :

```ruby
$ rails c
>> users = User.where(id: 1)
>> users.first
=> {id: 1, name: "Nam"}
```

users.count hay user.size đều sẽ trả về giá trị là 1. 

 Nhưng nếu ta thử :

```ruby
  >> users = User.where(id: 1).group(:id)
  >> users.first
  => {id: 1, name: "Nam"}
```

 users.first vẫn ko thay đổi kết quả nhận được , nhưng users.count và users.size thì sao ?

 Kết quả  :
```ruby
 >> users.size
 => 1
 >> users.count
 => {1 =>1}
```

Lý giải cho điều này. Hàm **count** và **size** đối với mảng, hash là như nhau, nhưng nếu dùng với 1 active record thì **size** sẽ đếm số phần tử như bình thường còn **count** sẽ thực hiện câu truy vấn vào db để đếm (câu lệnh SELECT COUNT (*)..  . ). users ở trường hợp này là 1 bảng tạm gồm 2 field :id được group và 1 field gồm những record có chung :id được nhóm lại với nhau, chính vì vậy SELECT COUNT sẽ đếm cả 2 field này và cho ra kết quả là 1 hash {1 => 1}

Vẫn là database như trên nếu ta đếm trực tiếp như thế này thì trả về gì ?

```ruby
  >> User.where(id: 1).group(:id).count
  >> User.where(id: 1).group(:id).size
  >> User.where(id: 1).group(:id).length
```

Hãy thử xem để thấy điều bất ngờ nhé :D (điều này cũng dễ giải thích thôi )
# 2 . if @user và if @user.present? 

Về cơ bản cả 2 cách viết này đều kiểm tra @user có tồn tại hay không. Cách viết if @user rõ ràng là ngắn gọn hơn và thường được các coder cứng tay ưu tiên sử dụng hơn. Tuy nhiên không phải lúc nào cũng nên lạm dụng cách viết này.

Đó là trong trưởng hợp @user chúng ta cần trả về 1 mảng, lúc này nếu @user trả về 1 mảng rỗng [], có nghĩa là không tồn tại , nhưng if @user vẫn trả về true, còn if @user.present? trả về false. Hãy lưu ý điều này khi kiểm tra sự tồn tại của 1 mảng nhé.

Tương tự nếu chúng ta dùng với biến local: if user và if user.present? , tuy nhiên trước hết nhớ define biến local ra đã nhé :D

# 3. Biến instance và biến local

Biến instance thì có @ phía trước ví dụ : @user , @member, @book ...., còn biến local thì chỉ là những chữ cái viết thường ví dụ : name, member, user ....

Đối với biến instance, nếu @user chưa từng khai báo, @user sẽ trả ra **nil**, vì vậy chúng ta dùng @user.present? sẽ trả về **false** và không có chuyện gì nghiêm trọng xảy ra.
Đối với biến local , nếu user chưa từng khai báo, chúng ta dùng user.present? sẽ bắn ra lỗi "local varible undefine" ( biến local chưa được khởi tạo )

Tuy nhiên chúng ta chạy thử
```ruby
$ rails c
>> if 5 > 6
>> a = 100
>> end
>> a
```

Đây là kiến thức mình thấy được sử dụng khá phổ biến trong controller/service.

Câu lệnh trên có nghĩa là nếu 5 >6 thì chúng ta sẽ define a = 100, nhưng điều nãy rõ ràng không xảy ra vì 5 <6, vậy nếu chúng ta return a thì có bắn lỗi "local varible undefine" không ? 
Câu trả lời là không, kết quả nhận được là **nil** nhé !

# 4. Share port mạng lan trong làm việc thực tế (ubuntu)

Nếu team bạn làm cùng 1 văn phòng và sử dụng chung mạng lan,  thay vì Front end chờ Back end đẩy code lên serve mới có thể ghép api được thì chúng ta có thể share port cho nhau, giúp tăng hiệu suất làm việc và khi đẩy code lên serve ít xảy ra bug.
Cách thức share port trong Ubuntu rất đơn giản : 

Ở BE các bạn gõ câu lệnh ở terminal
```ruby
  >> ifconfig
```

Ở đây chúng ta có thể get được địa chỉ IP của máy tính mình đang sử dụng, sau đó share địa chỉ này cho đồng nghiệp Front-end. Ví dụ địa chỉ ip của bạn là 127.0.0.101 thì đồng nghiệp sẽ gọi API tới địa chỉ 127.0.0.101:3000 .
Để run serve thay vì chạy rails s thì chúng ta chạy:

```ruby
  >> rails s --binding 0.0.0.0 --port 3000
```

Bây giờ Front end đã có thể call tới serve ở máy tính của bạn để get api được như bình thường


*Thank you for watching!*