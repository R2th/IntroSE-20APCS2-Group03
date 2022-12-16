Method chaining là một tính năng rất thuận tiện cho việc gọi nhiều method cùng một lúc. Nó không chỉ khiến cho code dễ đọc hơn mà còn giảm thời gian phải viết code khi chúng ta tương tác với các object và class

Gần như lập trình viên Ruby on Rails nào cũng đã từng sử dụng method chaining, đặc biệt là khi sử dụng ActiveRecord. Nhớ lại những lúc chúng ta sử dụng đoạn code như sau `Model.where(…).order(…)`, đó chính là ta đang sử dụng method chaining khi các method đó được gọi liên tục, "chaining" với nhau.

Trong bài viết này, mình sẽ cùng với các bạn khám phá cách áp dụng method chaining vào đoạn code của chính mình !

# Giới thiệu về Method chaining

Ở phần này chúng ta sẽ cùng nhau tạo ra một class chứa một vài method sẽ được chaining cùng nhau, và một method cuối cùng sẽ đưa ra một message. Hãy cùng bắt đầu với một cấu trúc class đơn giản:

```ruby
class Person

  def name(value)
  end

  def age(value)
  end

  def introduce
  end

end
```

Chưa có gì nhiều ở đây vì mình chỉ muốn lấy một ví dụ đơn giản, dễ hiểu để làm base. Như các bạn có thể thấy, class này chứa 3 method: `name()` nhận vào một giá trị, `age()` cũng nhận vào một giá trị và `introduce` sẽ đưa ra một message. Hãy cùng nhau đi đến bước tiếp theo.

Chúng ta sẽ lưu các input của name và age vào các instance variable để có thể sử dụng được sau này.

```ruby
# ...
def name(value)
  @name = value
end

def age(value)
  @age = value
end
# ...
```

Ok, sau cài đặt trên thì ta thử luôn method chaining xem có được không:

```ruby
> person = Person.new
# => #<Person:0x007fb18ba29cb8>
> person.name('Baz')
# => "Baz"
> person.name('Baz').age(21)
NoMethodError: undefined method `age' for "Baz":String
```

Như các bạn đã thấy, method chaining chưa hoạt động. Lý do là bởi vì trong các hàm `name` và `age`, chúng trả về các giá trị ở dòng cuối cùng, mà dòng cuối cùng ở đây là string đối với `name` và integer đối với `age`. Và các giá trị này thì không có các method tiếp theo nó cần gọi. Để rõ hơn thì ta cứ đi tiếp nhé.

Tiếp theo ta sẽ sửa các method trên bằng cách return về `self` chứ không phải là string hay integer. Bằng cách trả về `self` thì các method sẽ được chaining với nhau. Cùng thử nhé ?

```ruby
# ...
def name(value)
  @name = value
  self
end

def age(value)
  @age = value
  self
end

def introduce
  puts "Hello, my name is #{@name}, and I am #{@age} years old."
end
# ...
```

Và chạy thử Method chaining:

```ruby
> person = Person.new
# => #<Person:0x007fd079085ba0>
> person.name('Baz').age(21).introduce
# => Hello, my name is Baz and I am 21 years old.
```

Ổn rồi, vậy bạn đã đoán được ra tại sao Method chaining lại hoạt động được chưa ?

Trong các hàm instance, khi gọi đến `self` thì tức là truy vấn đến object mà gọi hàm đó. Trong ví dụ trên, object `person` gọi đến hàm `name`, object `person` gọi đến hàm `age` vậy nên `self` khi trả về trong các hàm này chính là `person`. Khác với các giá trị `string` và `integer` trả về lúc trước, `person` có chứa các hàm `age` và `introduce` vậy nên nó có thể gọi tiếp tục được các method sau.

Túm lại thì đoạn code trên hoạt động như sau:
1. `person = Person.new` --> Khởi tạo `person`
2. `person.name('Baz')` --> Gán giá trị `Baz` cho instance variable `name` và trả về object `person`
3. `person.name('Baz').age(21)` --> Vì đoạn `person.name('Baz')` trả về object `person` nên đoạn này tương đương `person.age(21)` và tiếp tục trả về object `person`
4. `person.name('Baz').age(21).introduce` --> Dễ đoán đúng không ? Đoạn này tương đương với việc gọi `person.introduce` sau khi `person` đã có các instance variable `name = 'Baz'` và `age = 21`

# Nguồn bài viết

https://www.sitepoint.com/a-guide-to-method-chaining/