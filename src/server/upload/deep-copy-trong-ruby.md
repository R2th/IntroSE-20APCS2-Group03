Việc copy giá trị trong Ruby thường cần thiết. Điều này có vẻ đơn giản nếu object được copy đơn giản. Nhưng nếu bạn phải copy một object với cấu trúc gồm nhiều mảng hoặc hash, bạn sẽ gặp một số vấn đề.

## Objects and References

Để hiểu chuyện gì đang xảy ra, hãy xem vài ví dụ đơn giản. Đầu tiên, phép gán sử dụng trong Ruby.
```ruby
a = 1
b = a
a += 1
puts b
```

Ở đây phép gán đang lấy giá trị của `a` và gán giá trị đó cho `b` sử dụng phép gán. Bất kỳ thay đổi nào đến `a` sẽ không phản liên quan đến `b`. Nhưng hãy đến ví dụ phức tạp hơn chút nữa?
```ruby
a = [1, 2]
b = a
a << 3
puts b.inspect
```

Trước khi chạy các câu lệnh trên, thử đoán output là gì và tại sao. Không giống như ví dụ trước, khi `a` thay đổi thì `b` cũng thay đổi theo, nhưng vì sao? Bởi vì mảng trong Ruby không thuộc loại POD. Phép gán không copy giá trị mà chỉ đơn giản là copy tham chiếu đến mảng ban đầu mà `b` trỏ tới trên vùng nhớ. Lúc này `a` và `b` đang trỏ đến cùng một đối tượng mảng, bất kỳ thay đổi nào lên mỗi biến thì sẽ thấy được trên biến kia.

Bây giờ, bạn đã biết tại sao copy các đối tượng non-trivial với những tham chiếu đến đối tượng khác có thể gặp khó khăn. Nếu đơn giản copy một object nghĩa là bạn đang copy một tham chiếu từ object đó đến object sâu hơn, bản copy đó gọi là `shallow copy`

![](https://images.viblo.asia/17422141-4bb4-4d7c-8051-8470e7d6e9ba.png)

## dup and clone
Ruby cung cấp 2 method phục vụ cho việc copy. Object#dup sẽ tạo ra "shallow copy" của object. Nó gọi method initialize_copy của class đó.  Ở một vài class giống như Array, nó sẽ khởi tạo một array mới với cùng số phần tử như mảng gốc, tuy nhiên không phải là deep copy.
Xem ví dụ sau:
```ruby
a = [1, 2]
b = a.dup
a << 3
puts b.inspect
a = [[1, 2]]
b = a.dup
a[0] << 3
puts b.inspect
```
Cái gì bên trong đang xảy ra? Method Array#initialize_copy sẽ tạo một bản sao của một mảng, nhưng bản copy đó là shallow copy. Nếu bạn có bất kỳ loại non-POD trong mảng của bạn, sử dụng dup chỉ deep copy một phần. Nó chỉ deep copy mảng đầu tiên (mảng cha), bất kỳ các mảng sâu hơn(bên trong), hash hoặc các object khác sẽ chỉ là shallow copy.

![](https://images.viblo.asia/ef802af9-9880-4abe-ab48-f489355fc515.png)

Có một method khác là `clone`, nó thực hiện điều tương tự như method `dup` với khác biệt quan trọng: Người ta mong đợi những object sẽ ghi đè method này bằng một method khác có thể thực hiện deep copy.

Trong thực tế, trên mỗi class bạn có thể định nghĩa một method `clone` để tạo ra deep copy object của class đó. Có nghĩa bạn phải viết method clone cho mỗi class của các object bạn muốn copy.

## Marshalling
`Marshalling` một object là cách để nói `serializing` một object. Nói cách khác, biến object thành một luồng ký tự có thể được ghi vào file, sau đó `unmarshal` hoặc `unserialize` để lấy ra cùng object. Điều này được áp dụng để deep copy bất kỳ object nào.
```ruby
a = [[1, 2]]
b = Marshal.load(Marshal.dump a)
a[0] << 3
puts b.inspect
```
`Marshal.dump` tạo `dump` của mảng lồng nhau được lưu trong biến `a`. Dump này là một chuỗi kí tự nhị phân được dự định lưu trong file. Nó chứa toàn bộ nội dung của mảng, ta có 1 bản deep copy trọn vẹn. Tiếp theo, Marshal.load thì ngược lại. Nó phân tích mảng kí tự nhị phân này và tạo một mảng mới hoàn toàn với những phần mới hoàn toàn.

Nhưng marshalling không được hỗ trợ trên tất cả các object và nó không quá nhanh. Tuy nhiên, nó là cách dễ nhất để tạo deep copy mà không cần method `initialize_copy` hay `clone`