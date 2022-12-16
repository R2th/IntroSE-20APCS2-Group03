### Các cách tạo mảng (array)

* Tạo trực tiếp (literal constructor ) <br>
 `arr = [1, "two", 3.0]`
 * Tạo qua đối tượng Array.new với 0, 1 hoặc 2 đối số truyền vào:<br>
 `arr = Array.new`
  sẽ tạo ra một mảng rỗng: []<br>
`arr = Array.new(3)`
  sẽ tạo ra một mảng có 3 phần tử có giá trị là nil: [nil, nil, nil], dùng `print arr` để xem nhé, nếu dùng `puts arr` thì sẽ được mảng trống cách nhau 3 phần tử.<br>
`arr = Array.new(3, "abcxyz")`
  sẽ tạo ra một mảng 3 phần tử: ["abcxyz", "abcxyz", "abcxyz"]
  
  => Tạo mảng 2 chiều: `arr = Array.new(3){Array.new(3)}`
sẽ tạo ra một mảng 2 chiều 3x3

### Truy cập phần tử trong mảng
```ruby
arr = [1,2,3,4,5,6]
arr[2]   #=> 3
arr[100]  #=> nil
arr[-3]   #=> 4
arr[2, 3] #=> [3, 4, 5]
arr[1..4] #=> [2, 3, 4, 5]
arr[1..-3] #=> [2, 3, 4]
```
Method `arr.at(0)` tương đương với `arr[0]` đều cho ra kết quả là 1.  
##### Một số phương thức đặc biệt khác:
`arr.frist #=>1`<br>
`arr.last #=>6`<br>
`arr.take(3) #=> [1,2,3]`- lấy 3 phần tử đầu tiên.  
`arr.drop(3) #=>[4,5,6]` - trả về mảng sau khi xóa 3 phần tử đầu tiên.
### Lấy thông tin của mảng
browsers = ['Chrome', 'Firefox', 'Safari', 'Opera', 'IE']
* Kiểm tra số phần tử của mảng: 
`browsers.length #=> 5`<br>
`browsers.count #=> 5`<br>
`browsers.size #=>5`<br>
* Kiểm tra mảng có rỗng không?
`browsers.empty? #=>flase`<br>
* Kiểm tra xem trong mảng có tồn tại phần tử này không?   
`browser.include?('IE') #=>true`

### Thêm phần tử vào mảng
```ruby
arr = [1, 2, 3, 4]
arr.push(5) #=> [1, 2, 3, 4, 5]
arr << 6    #=> [1, 2, 3, 4, 5, 6]
```
`arr.unshift(0) #=> [0, 1, 2, 3, 4, 5, 6]` - Thêm vào đầu mảng.<br>
`arr.insert(3, 'apple')  #=> [0, 1, 2, 'apple', 3, 4, 5, 6]` - Thêm vào vị trí bất kỳ.<br>
`arr.insert(3, 'orange', 'pear', 'grapefruit')
#=> [0, 1, 2, "orange", "pear", "grapefruit", "apple", 3, 4, 5, 6]` -Thêm nhiều phần tử một lúc.
### Xóa phần tử trong mảng
Cho mảng `arr =  [1, 2, 3, 4, 5, 6]`<br>
**Lấy phần tử cuối cùng ra khỏi mảng**
```
arr.pop #=> 6
arr #=> [1, 2, 3, 4, 5]
```
**Lấy phần tử đầu tiên ra khỏi mảng**
```
arr.shift #=> 1
arr #=> [2, 3, 4, 5]
```
**Xóa phần tử tại chỉ mục cụ thể**
```
arr.delete_at(2) #=> 4
arr #=> [2, 3, 5]
```
**Để xóa 1 phần tử xuất hiện ở bất kỳ đâu trong mảng**<br>
Cho mảng mới `A = [1,2,2,4,2,2]`
```
arr.delete_at(2) #=> 4
arr #=> [2, 3, 5]
```
**Để xóa các giá trị nil tồn tại trong mảng**
```arr = ['foo', 0, nil, 'bar', 7, 'baz', nil]
arr.compact  #=> ['foo', 0, 'bar', 7, 'baz']
arr          #=> ['foo', 0, nil, 'bar', 7, 'baz', nil]
arr.compact! #=> ['foo', 0, 'bar', 7, 'baz']
arr          #=> ['foo', 0, 'bar', 7, 'baz']
```
**Xóa bỏ sự trùng lặp trong mảng**
```arr = [2, 5, 6, 556, 6, 6, 8, 9, 0, 123, 556]
arr.uniq #=> [2, 5, 6, 556, 8, 9, 0, 123]
```