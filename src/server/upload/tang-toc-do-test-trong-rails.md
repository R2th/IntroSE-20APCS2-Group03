Một bộ test chậm chạp thực sự gây khó chịu trong quá trình phát triển hướng TDD. Mỗi lần thay đổi, chúng ta chạy lại specs và “kiên nhẫn” chờ đợi những dòng xanh lá xuất hiện trên màn hình, điều này mất thật nhiều thời gian. Điều này thường dẫn đến việc lười chạy test hơn, mang lại rủi ro khi có sự thay đổi logic trong ứng dụng. Vậy hãy cùng tìm xem một số cách để cải thiện tốc độ chạy Test.

**Xem ứng dụng chúng ta có gì nào?**

Trước khi vào tìm hiểu cách để cải thiện tốc độ Test, hãy xem ta đang test gì nào. Thử đưa ra một ví dụ đơn giản với 1 controller và một model. Controller được viết theo kiểu RESTful với 7 hành động và model chứa một số phương thức để chuyển đổi thời gian thành số dây cùng với validations và scope. Ứng dụng được Test bằng Rspec và FactoryGirl.
Ok xong phần “giả thiết”. Chạy test nào.
Cách chạy Test có thể ảnh hưởng lớn đến tốc độ chúng chạy. Sử dụng rake không phải là một ý hay, chạy thử cùng với lệnh thời gian, có thể dễ dàng thấy được điều này.

```
$ time bundle exec rake spec:models

Finished in 0.77065 seconds
129 examples, 0 failures

Randomized with seed 2083


real  0m11.832s
user  0m8.772s
sys 0m1.665s
```

Thời gian mà RSpec hiển thị là thời gian mà các chấm màu xanh lá cây lần lượt xuất hiện trên màn hình. Dưới đây, có thể thấy tổng thời gian, bao gồm cả thời gian khởi động, dài hơn khoảng bốn giây. Nếu chạy thử nghiệm thông qua RSpec, sẽ thấy sự khác biệt về thời gian thực hiện. Chạy thử nghiệm theo cách này cho tổng thời gian 7,7 giây, nhanh hơn khoảng bốn giây.

```
$ time bundle exec rspec spec/models
Run options: include {:focus=>true}

All examples were filtered out; ignoring {:focus=>true}
.................................................................................................................................

Finished in 0.85975 seconds
129 examples, 0 failures

Randomized with seed 54380


real  0m7.701s
user  0m6.382s
sys 0m1.069s 
```

Có thể tiết kiệm thêm một ít thời gian bằng cách tránh thực thi bundle exec. Thử chạy bundle binstubs để tạo binstubs cho rspec-core

```
$ bundle binstubs rspec-core
$ time bin/rspec spec/models
Run options: include {:focus=>true}

All examples were filtered out; ignoring {:focus=>true}
.................................................................................................................................

Finished in 0.80396 seconds
129 examples, 0 failures

Randomized with seed 51207


real  0m6.987s
user  0m5.677s
sys 0m0.993s
```

Lần này thì mất 7s để chạy, có vẻ đã tiết kiệm thêm được 10% thời gian.

**Tăng tốc thêm chút nữa nào**

Tốc độ chạy Test đã được cải thiện hơn nhưng nó vẫn tốn khá nhiều thời gian, trong đó có cả thời gian để khởi động một ứng dụng Rails. Đây là lí do tại sao có sự khác biệt giữa tổng thời gian chạy và thời gian chạy specs. Một cách hiệu quả để giải quyết điều này là sử dụng Zeus đẻ preload Rails app. Hãy xem thời gian được cải thiện cực ấn tượng.
```
$ time zeus test spec/models
Run options: include {:focus=>true}

All examples were filtered out; ignoring {:focus=>true}
.................................................................................................................................

Finished in 0.81326 seconds
129 examples, 0 failures

Randomized with seed 0


real  0m2.308s
user  0m0.577s
sys 0m0.177s
```

**Cải thiện Tests code**

Ngoài việc dùng những tool hữu ích để nâng cao tốc độ test, cũng cần chú ý đến cách viết test.
- Cần chú ý đến việc Test trùng vào một chức năng, method nào đó. Ví dụ như việc đã hoàn thành test validations thì những phần test feature thực sự là không cần thiết.
- Test những gì cần thiết, có ảnh hưởng đến logic của ứng dụng.
- Tạo dữ liệu test đơn giản nhưng đầy đủ, tránh tạo dữ liệu thừa thải, cồng kềnh.