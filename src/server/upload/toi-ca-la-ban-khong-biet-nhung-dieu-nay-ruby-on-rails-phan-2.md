Các bạn có thể theo dõi phần 1 ở đây : 
https://viblo.asia/p/toi-ca-la-ban-khong-biet-nhung-dieu-nay-ruby-on-rails-phan-1-WAyK8DDeKxX

# 5. presence và ||
Giả sử chúng ta cần kiểm tra biến a có giá trị hay không, nếu a nil thì return biến b, ta thường viết a||b

Tuy nhiên nếu biến a có giá trị là một string rỗng "" hoặc một mảng rỗng [ ] hoặc một hash rỗng {}, khi đó ta dùng a||b sẽ trả về a chứ không phải b.

Đối với trường hợp chúng ta không muốn lấy 3 giá trị trên (vì bản chất chúng cũng là rỗng ), lúc này chúng ta cần dùng hàm presence kết hợp với ||

`a.presence || b`

Nó tương đương với `a.present? ? a : b` nhưng viết gọn hơn

Kết quả trả sẽ về b kể cả nếu a là string rỗng "" hoặc mảng rỗng [ ] hoặc hash rỗng {}

Ứng dụng của `presence` mình thấy khi làm dự án khá nhiều. 

# 6. Tắt binding.pry bằng dấu !!!
Chắc hẳn chúng ta chẳng lạ gì gem binding pry , 1 gem hỗ trợ fix bug rất thông dụng. 

Có bao giờ bạn ngại dùng `binding.pry` vào trong 1 vòng lặp vì nó sẽ dừng chương trình vào trong mỗi vòng lặp, bạn phải Ctrl + D rất nhiều lần mới thoát khỏi vòng lặp đó ?

Cách đơn giản trong trường hợp này đó là dùng dấu !!!. Quá trình `binding.pry` sẽ kết thúc ngay lập tức!

Ngoài ra, mình thường ứng  dụng mẹo này trong việc tìm bug khi viết rspec vì thông thường khi viết rspec sẽ lặp qua 1 dòng lệnh rất nhiều lần.

# 7. Sort_by() array, group_by() array
Khi làm việc với mảng chứa các hash hoặc các record, nếu cần sắp xếp hoặc nhóm chúng ta thường dùng sort_by và group_by. Tuy nhiên nếu sort (hoặc group) theo nhiều điều kiện dưới đây thì sao ?

Có một mảng gồm 1 list record. Khách hàng yêu cầu sort theo `:name`, các dữ liệu cùng `:name` thì sort theo `:age`.
Lúc này chúng ta sẽ làm như sau :
```
list_record.sort_by{|record| [record.name, record.age]}
```
Nếu muốn sort theo `:age` tăng dần
```
list_record.sort_by{|record| [record.name, -record.age]}
```

Tương tự, nếu muốn nhóm các record theo nhiều điều kiện giống nhau:
```
list_record.group_by{|record| [record.name, record.age]}
```

Tương tự, nếu muốn sort/group với các hash

```
list_record.sort_by{|record| [record[:name], record[:age]}
list_record.group_by{|record| [record[:name], record[:age]}
```
# 8. any? và all?

Trong ruby có 2 hàm kiểm tra mảng mà mình rất thích (và hay sử dụng) là **all**? và **any?** . Cả 2 đều trả về kết quả true hoặc false.

**all?** kiểm tra có phải tất cả phần tử đều thỏa mãn điều kiện trong block hay không, trong khi **any?** kiểm tra xem có tồn tại ít nhất 1 phần tử trong mảng thỏa mãn điều kiện hay không ?

```
>> (1..5).all? {|x| x > 0}
=> true
>> (1..5).all? {|x| x > 3}
=> false
>> (1..5).any? {|x| x > 4}
=> true
>> (1..5).any? {|x| x > 6}
=> false
```

**Nếu trong block không phải 1 condition thì cả 2 hàm đều trả về true*

# 9. Scope trong điều kiện where

Có 1 list products, mỗi products belongs_to 1 members (thông qua trường member_id). Chúng ta cần lấy ra những products của member có giới tính là nam. Có rất nhiều cách viết, trong đó dưới đây là 1 cách :

```
Product.where(member_id: Member.where(gender: :male).ids)
```

Câu lệnh trên sẽ thực hiện 2 câu query. Đầu tiên lấy ids của member có gender là :`male`, sau đó lấy products tương ứng.Tuy nhiên chúng ta không cần viết `.ids` mà chỉ cần viết thành:

```
Product.where(member_id: Member.where(gender: :male))
```

Lúc này câu lệnh trên sẽ gom 2 câu query làm 1. 
Bất ngờ chưa ?` Member.where(gender: :male)` là 1 list record lại có thể đem so sánh với  field `member_id`. Rails rất thông minh đúng không ?

Chưa hết, chúng ta có thể rút gọn ngắn hơn :

```
Product.where(member: Member.where(gender: :male))
```
*(continue)*

*Thank you for your watching!*