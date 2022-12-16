**Tài liệu tham khảo:**
* [Getting to Know Pluck and Select](http://gavinmiller.io/2013/getting-to-know-pluck-and-select/)
* [ActiveRecord’s Select & Pluck](https://medium.com/@amliving/activerecords-select-pluck-3d5c58872053)

Trong bài viết này, chúng ta hãy cùng tìm hiểu, quan sát cụ thể hơn 2 phương thức phổ biến khi làm việc với Rails ActiveRecord, đó là `pluck` và `select`. Khi sử dụng chúng một cách hài hòa, hợp lý, bạn có thể góp phần vào việc cải thiện hiệu năng của ứng dụng một cách đáng kể.

Trước hết chúng ta sẽ nói về `select`. Đây là cách để bạn truy vấn ra dữ liệu của một hoặc nhiều trường trong cơ sở dữ liệu:
```sh
2.4.2 :003 > User.select :name, :email
  User Load (0.8ms)  SELECT  "users"."name", "users"."email" FROM "users" LIMIT ?  [["LIMIT", 11]]
 => #<ActiveRecord::Relation [#<User id: nil, name: "Example User", email: "example@railstutorial.org">, #<User id: nil, name: "Brennan Emard", email: "example-1@railstutorial.org">, ...]>
```
Câu lệnh này đã trả về một `ActiveRecord::Relation` object.

`pluck` được giới thiệu lần đầu ở Rails phiên bản 3.2. Khi sử dụng nó, bạn có thể thực hiện thao tác `select` nhưng bỏ qua việc tạo các ActiveRecord model:
```sh
2.4.2 :025 > User.pluck :name, :email
   (0.9ms)  SELECT "users"."name", "users"."email" FROM "users"
 => [["Example User", "example@railstutorial.org"], ["Brennan Emard", "example-1@railstutorial.org"], ["Damian Frami", "example-2@railstutorial.org"], ...]
```
Hai kết quả gần giống nhau, thời gian thực thi câu lệnh cũng gần như nhau, vậy thì sự khác nhau ở đây là gì?

Bí mật nằm ở chi phí của việc tạo ra các object mà Rails đã "không nói" với bạn!

Bằng cách sử dụng class `Benchmark`, chúng ta có thể biết được chi phí thực tế khi thực thi lệnh `select` và `pluck`. Cụ thể như sau:
```sh
2.4.2 :001 > puts Benchmark.measure{User.select :name, :email}
Creating scope :working. Overwriting existing method User.working.
  0.040000   0.000000   0.040000 (  0.043056)

2.4.2 :007 > puts Benchmark.measure{User.pluck :name, :email}
   (0.8ms)  SELECT `users`.`name`, `users`.`email` FROM `users`
  0.020000   0.000000   0.020000 (  0.018016)
```
Với số lượng bản ghi đủ lớn (vài nghìn trở lên), có thể quan sát thấy rằng `select` chậm hơn đáng kể so với `pluck`. Lý do là vì với `select`, Rails cần một khoảng thời gian nhất định để tạo ra các object.

Mặc dù khác nhau về hiệu năng, tuy nhiên `select` trả về một object nên sẽ được sử dụng khi bạn muốn nối chuỗi các method của ActiveRecord. Với `pluck` thì đơn thuần là chúng ta chỉ lấy ra dữ liệu, khi đó sức mạnh của ActiveRecord sẽ bị hạn chế nhiều khi làm việc với câu lệnh này.

Tóm lại, chúng ta có thể rút ra một lưu ý quan trọng khi làm việc với 2 phương thức này:
> `pluck` được sử dụng để lấy ra dữ liệu từ model, còn `select` được dùng để làm việc với object của các model ấy

Cảm ơn các bạn đã theo dõi bài viết.