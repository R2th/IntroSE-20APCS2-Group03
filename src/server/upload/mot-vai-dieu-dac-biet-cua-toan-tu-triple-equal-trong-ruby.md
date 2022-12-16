![](https://images.viblo.asia/d19a5eae-554f-4d5e-8e93-420ba112feee.jpeg)

Chúng ta thường code ruby hay rails framwork thì thường toán tử `===` thường khá là ít dùng nếu bạn có code js thì sẽ sử dụng nhiều hơn nó là một `trict mode` tring JS.Hôm nay chúng sẽ thử xem thực sự nó có thể làm được những gi trong ruby hay nó có khác gi so với JS

# What is Triple Equal?
Ở trong các trường hợp mặc đinh, 3 dấu bằng `===` nó sẽ là alias của `==`. Nhưng ở một số trường hợp đặc biệt thì các class khác lại overide lại hành vi của nó. Chúng ta cùng đến các case cụ thể nhé:
### Ranges
```
(1..10) === 1 # true
```
`Trong một range (dải) thì '===' là alias của 'includes?'`

### Regex
```
/abc/ === 'abcdef' # true
```
với regex, Nó là `match` .

## Classes
```
String === 'foo'
```
Với  một class,Nó tương đương với` is_a?`
### Procs
```
`-> a { a > 5 } === 6`
```
Với một proc, Chúng ta gọi `call`. Cái này sẽ là cái thú vị về sau.
### Just in Case
Bây giờ chúng ta sẽ có một vài trường hơpk , Chúng ta sẽ sử dụng  `case` trong Ruby:
```
case '10.0.0.1'
when IPAddr.new('10.0.0.0/8') then 'wired connection'
when IPAddr.new('192.168.1.0/8') then 'wireless connection'
else 'unknown connection'
end
```
Cũng không thú vị lắm :D
### Querying
Hầu hết chúng ta đã sử dụng ActiveRecord trước đây ,Giống như cách mà chúng ta query dưới đây:
```
Person.where(name: 'Bob', age: 10..20)
```
Có vẻ câu lệnh trên vẫn chạy nhưng thực tế dâu `===` được sử dụng như thế nào trong này: Ta đến một ví dụ sau giả sử ta có 1 mang các hash như sau:

```
people = [
  {name: 'Bob', age: 20},
  {name: 'Sue', age: 30},
  {name: 'Jack', age: 10},
  {name: 'Jill', age: 4},
  {name: 'Jane', age: 5}
]
```
Bình thường nếu trong ruby để có thể lấy ra nhưng người trên 20 tuổi ta sẽ làm như sau:
```
people.select { |person| person[:age] >= 20 }
```
Và đây là cách mà ActiveRecord chún ta overide lại hoạt động với câu lênh `where`

```
def where(list, conditions = {})
  return list if conditions.empty?
  list.select { |item|
    conditions.all? { |key, matcher| matcher === item[key] }
  }
end
```
### JSON Packet Dump
Giả sử chúng ta đã kết thúc với JSON, chúng ta có thể truy vấn nó:
```
where(packets,
  source_ip: IPAddr.new('10.0.0.0/8'),
  dest_ip:   IPAddr.new('192.168.0.0/16')
  ttl:       -> v { v > 30 }
)
```
> Lưu ý rằng JSON sẽ cung cấp cho bạn các keys String trừ khi bạn nói khác về phân tích cú pháp, vì vậy hãy cẩn thận ở đó.
> 
### Objects
OK , bây giờ chúng ta sử overide câu lệnh `where` đầu vào là list object. Thay vì sử dụng` item[key]` chúng ta dung `item.public_send(key) `:
```
def where(list, conditions = {})
  return list if conditions.empty?
  list.select { |item|
    conditions.all? { |key, matcher|
      matcher === item.public_send(key)
    }
  }
end
```
Thật đặc biêt phải không chúng ta đi đến 1 ví dụ nâng cao hơn:
```
def where(list, conditions = {})
  return list if conditions.empty?
  list.select { |item|
    conditions.all? { |key, matcher|
      matcher === item.public_send(*key)
    }
  }
end
```
### Finishing Up
Trên đây là một số ví dụ về toán tử `===` được áp dụng trong ruby hay cách chúng ta dùng trong để custom lại các câu lện ActiveRecord
### Reference
https://medium.com/rubyinside/triple-equals-black-magic-d934936a6379