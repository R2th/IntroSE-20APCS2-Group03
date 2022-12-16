# I. Giới thiệu
Ở phần trước chúng ta đã tìm hiểu một số khái niệm về resource routing trong rails và cách sử dụng, ở phần này chúng ta sẽ đi đến một khái niệm nữa đó là Nested Resources. Vậy Nested Resources mang lại cho chúng ta lợi ích gì và sử dụng nó như thế nào? Chúng ta sẽ cùng tìm hiểu ngay sau đây.
# II. Nội dung
Nested Resources

   -  Việc có các resource là con của các resource khác là điều phổ biến. Ví dụ: giả sử ứng dụng của bạn bao gồm các mô hình sau:

```ruby 
class Magazine < ApplicationRecord
  has_many :ads
end
 
class Ad < ApplicationRecord
  belongs_to :magazine
end
```
 
 - Nested routes cho phép bạn nắm bắt mối quan hệ này trong routing của bạn. Trong trường hợp này, bạn có thể bao gồm khai báo route này:
```ruby
resources :magazines do
  resources :ads
end
```

- Ngoài các routes cho magazines, khai báo này cũng sẽ định tuyến ads đến AdsContoder. Các ad URL yêu cầu một magazine:

![](https://images.viblo.asia/4722b3c3-27e9-4ca5-8159-64fc65b174b7.png)

## 1. Limits to Nesting

- Bạn có thể lồng resources trong các nested resources khác nếu bạn muốn. Ví dụ:

```ruby
resources :publishers do
  resources :magazines do
    resources :photos
  end
end
```

- Deeply-nested resources nhanh chóng trở nên cồng kềnh. Trong trường hợp này, ví dụ, ứng dụng sẽ có các đường dẫn như:

```ruby
/publishers/1/magazines/2/photos/3
```

- Route helper tương ứng sẽ là publisher_magazine_photo_url, yêu cầu bạn chỉ định các đối tượng ở cả ba cấp độ. Thật vậy, tình huống này đủ khó hiểu khi một bài viết phổ biến của Jamis Buck đề xuất một quy tắc ngón tay cái cho thiết kế Rails tốt:

### => Resources should never be nested more than 1 level deep.

 Tạm dịch: Resource không bao giờ được lồng sâu hơn 1 cấp.

## 2. Shallow Nesting

- Một cách để tránh lồng nhau sâu (như được khuyến nghị ở trên) là tạo các hành động thu thập nằm trong phạm vi cha mẹ, để có được ý nghĩa về thứ bậc, nhưng không lồng các hành động thành viên. Nói cách khác, chỉ xây dựng các routes với lượng thông tin tối thiểu để xác định duy nhất resource, như thế này:

```ruby
resources :articles do
  resources :comments, only: [:index, :new, :create]
end
resources :comments, only: [:show, :edit, :update, :destroy]
```

- Ý tưởng này tạo ra sự cân bằng giữa các routes mô tả và deep nesting. Tồn tại cú pháp để đạt được điều đó, thông qua :shallow option:
```ruby
resources :articles do
  resources :comments, shallow: true
end
```
- Điều này sẽ tạo ra các routes chính xác giống như ví dụ đầu tiên. Bạn cũng có thể chỉ định tùy chọn :shallow trong resource gốc, trong trường hợp đó, tất cả các resources lồng nhau sẽ là shallow:
```ruby
resources :articles, shallow: true do
  resources :comments
  resources :quotes
  resources :drafts
end
```

- Phương thức shallow của DSL tạo ra một phạm vi bên trong mà mọi nesting đều là nông (shallow). Điều này tạo ra các routes giống như ví dụ trước:

```ruby
shallow do
  resources :articles do
    resources :comments
    resources :quotes
    resources :drafts
  end
end
```


- Có hai tùy chọn cho phạm vi để tùy chỉnh các shallow routes.  :shallow_path tiền tố đường dẫn thành viên với tham số đã chỉ định:
```ruby
scope shallow_path: "sekret" do
  resources :articles do
    resources :comments, shallow: true
  end
end
```

- Comments resource ở đây sẽ có các routes sau:

![](https://images.viblo.asia/98a01bb6-3b06-4ead-9c10-64a799d8afaf.png)

- Tùy chọn :shallow_prefix thêm các tham số đã chỉ định vào các trình trợ giúp route đã được đặt tên: 

```ruby
scope shallow_prefix: "sekret" do
  resources :articles do
    resources :comments, shallow: true
  end
end
```

- Comments resource  ở đây sẽ có các routes sau được tạo cho nó:

![](https://images.viblo.asia/1619e3b0-2256-4356-af19-609f40c8b535.png)

# III. Kết luận
- Trên đây là những kiến thức mình tìm hiểu được và chia sẻ cho các bạn về  Nested Resources. Rất mong nhận được đóng góp, chia sẻ của các bạn. Chúc bạn bạn học tốt !
- Tài liệu tham khảo: https://guides.rubyonrails.org/routing.html#the-purpose-of-the-rails-router