Khi bắt đầu học Rails, bạn có bao giờ thấy thắc mắc về việc sử dụng  includes hoặc joins, bởi vì cả hai đều được sử dụng trong một hoàn cảnh gần như giống nhau. includes sử dụng **eager loading** trong khi các liên kết sử dụng **lazy loading**. Cả hai đều được sử dụng khi các hoạt động nhất định được thực hiện trên các bảng liên quan. Và đây là sự khác biệt.
Vấn đề với joins là gì?

# Khác biệt về eager loading và lazy loading
* Eager Loading 
Một cách để cải thiện performance là cắt giảm số lượng truy vấn SQL. Bạn có thể thực hiện việc này thông qua eager loading.
```
class UsersController < ApplicationController
   
    def user_friends
      users = User.all.includes(:friends)
    end
end
```

Khi bạn chạy hàm trên, nếu bạn check log trên server bạn sẽ thấy nó tạo ra 2 câu queries :
1. Câu query đầu để lấy ra tất cả user
2. Câu query thứ hai để lấy ra friend của các user ở trên 

* Lazy Loading 
```
class UsersController < ApplicationController
    def show
      
      users = User.all
      
      users.each do |user|
        friend = Friend.find_by(user_id:user.id)
      end
    
    end
end
```
Giống như ví dụ ở eager loading nhưng lấy dữ liệu theo lazy loading
Khi bạn chạy hàm trên, nếu bạn check log trên server bạn sẽ thấy nó tạo ra nhiều câu queries :
1. Câu query đầu để lấy ra tất cả user
2. Và sau đó n số query được tạo theo số lượng bạn bè của mỗi người dùng khi nó sẽ lặp qua đối tượng người dùng. Vì vậy, điều này cho chúng ta thấy sự khác biệt cơ bản giữa tải nhanh và tải chậm và tại sao lại thích sử dụng tải nhanh hơn tải chậm.

# Joins
Joins sử dụng lazy loading cho nên bạn cũng nhận thấy vấn đế của joins là gì 
```
      users = User.where(status: "active").joins(:account)
      users.each do |user|
        user_data << {
            name: user.account.name
        }
      end
    
    end
```
Ở đây, chúng ta đã truy xuất User trong dòng đầu tiên và dữ liệu được thêm vào trong mỗi vòng lặp do. Đây là điều thú vị, để truy xuất user.account.name, mỗi lần gọi đến database một câu query được tạo ra. Có nghĩa là, nếu có 10 nghìn User thì 10 nghìn truy vấn riêng biệt sẽ được kích hoạt. Và điều này sẽ làm hệ thống quá mức cần thiết khi mở rộng quy mô. Không có cách nào hiệu quả? Có, nó là **Includes**.

# Includes
Trong tài liệu của rails, nó nói rõ ràng - "Với Includes, Active Record đảm bảo rằng tất cả các liên kết được chỉ định được load bằng cách sử dụng số lượng truy vấn tối thiểu có thể". Khi chúng ta cần dữ liệu được sử dụng từ các bảng được liên kết, phải sử dụng **Includes**.

```
      users = User.where(status: "active").includes(:account)
      users.each do |user|
        user_data << {
            name: user.account.name
        }
      end
    
    end
```

Ở đây, dữ liệu từ các account trong bảng được tìm load ngay trong dòng đầu tiên, vì nó cho biết includes các account. Không có truy vấn bổ sung nào được kích hoạt từ vòng lặp do cho ‘user.account.name’. Size của bảng User bây giờ không quan trọng 

Nó tiết kiệm rất nhiều thời gian. Và nó được chứng minh là rất hiệu quả, khi ứng dụng chứa dữ liệu khổng lồ. Vì vậy, Includes luôn luôn được ưu tiên hơn Joins? Không hẳn, có một số trường hợp khi includes không vượt quá joins về mặt hiệu quả.

```
      users = User.joins(:account).where('account.last_name = ?', 'Nguyen')
      users.each do |user|
        user_data << {
            name: user.name
        }
      end
    
    end
```
Ở đây, chúng tôi đã sử dụng bảng User và Account, nhưng account có điều kiện lọc. Và sau đó tôi đã sử dụng dữ liệu từ bảng account . Vì vậy, không cần phải mang dữ liệu từ các account cùng với người dùng. Đây là lý do tại sao joins hiệu quả trong trường hợp này.

# Tài liệu tham khảo
* [Rails Includes vs Joins](https://medium.com/@swapnilggourshete/rails-includes-vs-joins-9bf3a8ada00#:~:text=When%20I%20started%20learning%20Rails,be%20performed%20on%20associated%20tables.)