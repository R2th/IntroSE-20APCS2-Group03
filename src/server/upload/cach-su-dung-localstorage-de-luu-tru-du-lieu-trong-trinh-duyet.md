Lưu trữ dữ liệu trên trình duyệt là điều mà chúng ta vẫn thường hay làm khi xây dựng ứng dụng web. Thông thường, chúng ta cần lưu trữ một số dữ liệu tạm thời liên quan đến trải logic xử lý hay giúp cho trải nghiệm người dùng được tốt hơn. Để làm được điều này, chúng ta có thể sử dụng localStorage

Với localStorage, chúng ta lưu trữ dữ liệu trên trình duyệt dưới dạng string. Nó là một phương tiện lưu trữ dữ liệu thông qua các ***"key"***, cho phép chúng ta lấy dữ liệu thông qua các ***"key"*** này. Nếu một phần dữ liệu không phải là một chuỗi, thì nó sẽ được chuyển đổi thành  chuỗi trước khi được lưu trữ.

## Saving Data

Chúng ta có thể sử dụng phương thức *`setItem`* để lưu dữ liệu vào bộ nhớ cục bộ của trình duyệt. Sẽ cần hai đối số cho quá trình này. Đối số đầu tiên là một chuỗi là khóa của dữ liệu và đối số thứ hai là một chuỗi có giá trị của khóa tương ứng mà chúng ta đã chuyển vào đối số thứ nhất.

Nghe có vẻ lòng vòng, nhưng nếu nhìn vào ví dụ dưới đây chúng ta sẽ dễ dàng nắm bắt dc:

```
  localStorage.setItem('foo', 'bar');
  
  // foo là key
  // bar là giá trị ứng với key
```

Có thể kiểm tra xem nó đã được lưu chưa bằng cách trỏ vào tab Apllication của trình duyệt, kiểm tra mục localStorage

Bạn cũng có thể viết...

```
  localStorage.foo = 'bar';
```

...để lưu trữ data

Ký hiệu "[ ]" cũng có thể hoạt động để gán giá trị cho bộ nhớ cục bộ. Ví dụ, chúng ta có thể viết...

```
  localStorage['foo'] = 'bar';
```

Để lưu trữ data vào localStorage với khoá 'foo' và giá trị là 'bar'

## Saving object data

Nếu như bạn muốn lưu trữ một object, chúng ta sẽ lấy [object Object] làm giá trị. Để lưu nội dung, ta sẽ sử dụng phương thức JSON.stringify. Ví dụ, thay vì viết:

```
  localStorage.setItem('foo', {foo: 'bar'});
```

... ta sẽ viết là:

```
  localStorage.setItem('foo', JSON.stringify({foo: 'bar'}));
```

Giờ đây, {“foo” : ”bar”} là một giá trị được lưu trong localStorage với khoá `foo`

## Repeated calling

Nếu chúng ta gọi lặp lại phương thức `setItem` với cùng một key, thì giá trị hiện tại của key sẽ bị ghi đè.
Ví dụ nếu như ta viết:

```
  localStorage.setItem('foo', 1);
  localStorage.setItem('foo', 2);
```

Sau đó, giá trị của khoá `foo` sẽ là 2 vì nó giá trị cuối cùng được set ứng với khoá `foo` được lưu.

## Getting Data

Ta có thể lấy dữ liệu bằng phương thức `getItem` hoặc sử dụng ký hiệu `'.'` để lấy dữ liệu như bất kỳ đối tượng nào. `getItem` sẽ lấy ra giá trị ứng với key được lưu trong localStorage. Nó sẽ trả về một chuỗi chứa giá trị hoặc `null` nếu như không có

Ta có thể viết:

```
  localStorage.getItem('foo');
```

Ta sẽ nhận được giá trị ứng với key `foo`, nếu như không có, ta sẽ nhận được giá trị `null`

Ta cũng có thể viết theo các cú pháp khác để lấy được giá trị ứng với khoá chỉ định. Ví dụ như:

```
  localStorage.foo;
  localStorage['foo'];
```

Ngoài ra còn có một phương pháp để lấy tên của khóa trong localStorage với index của nó. Giá trị truyền vào là một số nguyên ứng với vị trí cần lấy. Vị trí đầu tiên được đánh số 0.
Ví dụ:

```
  localStorage.key(1)
```

Sẽ trả về tên của khoá đứng ở vị trí số 2 trong localStorage.

## Removing a Single Entry in Local Storage

Ta có thể xoá một mục trong localStorage bằng cách cung cấp key của mục đó cho phương thức `removeItem`.

Ví dụ, ta muốn xoá một entry với key `'foo'`, ta sẽ viết:

```
  localStorage.removeItem('foo');
```

Đoạn code trên sẽ thực thi việc xoá một phần tử trong localStorage với key name là `'foo'`

Ngoài ra, ta có thể sử dụng `delete` để xoá phần tử thông qua key name. Ví dụ, ta có thể xoá một entry với key `'foo'` bằng cú pháp:

```
  delete localStorage.foo;
  // hoặc
  delete localStorage['foo'];
```

## Clearing Local Storage
Ta có thể sử dụng phương thức `clear()` để xoá toàn bộ entry trong localStorage

```
  localStorage.clear()
```

Bằng cách sử dụng cú pháp này, toàn bộ dữ liệu của localStorage trên trình duyệt sẽ bị xoá bỏ hoàn toàn

## Lời kết
Trên đây là một số chia sẻ về localStorage và cách sử dụng nó. LocalStorage có tính ứng dụng cao, thường xuyên được sử dụng trong các dự án. Hi vọng bài viết này của mình sẽ giúp đỡ các bạn phần nào trong việc tiếp cận với localStorage

Tham khảo: https://medium.com/better-programming/use-localstorage-to-store-data-on-the-browser-d10f8363dda5