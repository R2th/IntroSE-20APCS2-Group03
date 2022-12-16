Hôm nay chúng ta sẽ cùng tìm hiểu cách để viết code ruby trở lên nhanh hơn. Trong ruby có nhiều methods có cùng tác dụng như nhau (vd: tr và gsub, ...), vậy chúng ta đã từng tìm hiểu xem method nào nhanh hơn method nào không. Hôm nay chúng ta sẽ tìm khám phá được điều này. Khi mới đầu học ruby chúng ta sẽ chỉ quan tâm đến tác dụng của method cần dùng để giải quyết bài toán mình gặp phải, tuy nhiền khi vào các project lớn thì không những viết code sao cho đúng logic mà còn phải tối ưu code sao cho nhanh nhất có thể.
> Ruby được thiết kế để làm cho các lập trình viên trở lên hạnh phúc
##  Array argument and splat arguments
```
   def get_name(*args)

  end
  Hàm get_name có arg là một array, có hai cách truyền arg:
  - object.get_name(M::ITEMS)
  - object.get_name(*M::ITEMS)
  Tuy nhiên sử dụng splat lại chậm hơn 102 lần, Bạn có thể sử dụng benchmark để kiểm tra điều này.
```
## Hash and OpenStruct 
```
  OpenStruct.new(a: 1, b: 2)
  { a: 1, b: 2 }
- Khởi tạo bằng hash sẽ nhanh hơn 16 lần openstruct
```
## Array#bsearch and Array#find
```
data = [*0..100]
data.find    { |number| number > 77 }
data.bsearch { |number| number > 77 }
- Hai method trên để lấy sô đầu tiên thoả mãn dk, bsearch nhanh hơn find 3137489 lần( besearch chi sủ dụng khi array đã sorted nhé)
```
## Array#sample and shuffle.first
```
data = [*0..100]
data.simple
data.shuffle.first
- Hai method trên để lấy ra một sô ngẫu nhiên, sử dụng shuffle.first sẽ nhanh hơn 18 lần.
```
## Array#insert and Array#unshift 
```
array = []
100.times { |i| array.unshift(i) }
100.times { |i| array.insert(0, i) }
- Sử dụng insert nhanh hơn 250 lần.
```
## Hash#key? and Hash#keys.include? 
```
HASH.key? KEY
HASH.keys.include? KEY
- sử dụng key? nhanh hon 700 lần
```
## Hash#value? vs Hash#values.include? 
```
HASH.value? KEY
HASH.values.include? KEY
- sử dụng value? nhanh hon 2 lần
```
## Hash#merge and Hash#merge! 
```
- Sử dụng merge! sê nhanh hơn 24 lần
```
## String#gsub and String#tr 
```
"string".gsub('s', ' ')
"string".tr('s', ' ')
- Sử dụng tr sẽ nhanh hơn 3 lần
```
## String#gsub and String#squeeze
```
"Lorem ipsum dolor sit amet,  consectetur adipiscing  elit, sed do eiusmod    tempor".gsub(/ +/, " ")
"Lorem ipsum dolor sit amet,  consectetur adipiscing  elit, sed do eiusmod    tempor".squeeze(" ")
- Cả hai cách trên để loại bỏ space thừa, sử dụng squeeze sẽ nhanh hơn 25 lần
```
## Hash#key_each and keys.each
```
hash.keys.each do |k|
 # do something
end
hash.each_key do |k|
 # do something
end
- Sử dụng each_key nhanh hơn 30 lần
```
- Còn rất nhiều method có cùng chức năng, mọi người có thể tìm hiểu thêm và so sánh các method với nhau để biết thêm về performance giữa các method. Hy vọng bài viết này có thể giúp mọi người trong code, tiếp tục tìm những điều happy trong ruby.
Happy codding!!