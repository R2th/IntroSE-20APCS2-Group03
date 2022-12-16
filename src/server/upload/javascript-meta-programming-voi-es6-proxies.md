Bài viết được dịch từ [Meta programming with ES6 Proxy](https://wecodetheweb.com/2015/08/16/meta-programming-with-es6-`proxy`/) của tác giả Niels Gerritsen

`Proxy` là một chức năng ít được biết đến trong EcmaScript 6 (ES6). Lý do cũng rất đơn giản, vì trên thực tế khi phát triển sản phẩm, ta ít khi bắt buộc phải dùng đến nó. Nhưng nó khá thú vị nhé!

`Proxy` là một `lower level functionality` của ES6. Có nghĩa là, nó thay thay đổi hành vi mặc định của Javascript, còn được gọi là metaprogramming. Tuy nhiên, không giống như metaprogramming thông thường, do bản chất của Javascript, nên ta có thể sửa đổi hành vi mặc định của Javascript với Javascript.

Vậy làm thế nào nó hoạt động? Giả sử bạn có 1 object. Trong object chứa thông tin địa chỉ. Và vì một lý do gì đó bạn muốn lấy giá trị nhưng phải được uppercase của giá trị đó. Điều này khá đơn giản và có thể giải quyết đơn giản bằng cách khi lấy giá trị của object ra thì uppercase nó lên. Nhưng với `Proxy` thì ta có cách làm khác.
```
let address = {
  street: 'Elite Street',
  postalCode: '1337 xD'
}

address = new Proxy(address, {
  get(target, property) {
     return target[property].toUpperCase();
  }
});

console.log(address.street); // => 'ELITE STREET'
console.log(address['postalCode']); // => '1337 XD'
```

# Cách hoạt động
Khi chúng ta tạo một `Proxy`, hàm khởi tạo của nó sẽ có 2 param, `target`, và `hander`. `target` là object mà ta muốn thay đổi hành vi.`hander` là một đối tượng trong đó có các phương thức để ta có thể thay đổi hành vi của object đó.

Phương thức `get` là một built-in navite của object, khi gọi bằng cách dùng dấu chấm  (`obj.prop`) hoặc dấu ngoặc  (`obj['prop']`). Nó nhận 2 tham số là `target` và `property`. Ví dụ trên `Proxy` đã ghi đè lên `built-in get` của object để  thay đổi giá trị khi được lấy ra.

> Hiện tại chỉ Filefox 4 hỗ trợ `Proxy` (với ES5 syntax). Nếu muốn thử sử dụng `proxy`, bạn có thể test trên Firefox hoặc phải sử dụng thư viện [harmony-reflect polyfill.](https://github.com/tvcutsem/harmony-reflect)


`Proxy` về cơ bản sẽ chặn các hoạt động gốc tới object và thực hiện những sửa đổi trong object đó.

Xét một ví dụ khác, chúng ta có một tài khoản ngân hàng, và khi lấy tiền ra, ta sẽ lấy được gấp đôi số tiền đã nạp vào.
```
let bankAccount = {
  money: 0
}

bankAccount = new Proxy(bankAccount, {
  set(target, property, value) {
    target[property] = value * 2;
  }
});

bankAccount.money = 1000000;

console.log(bankAccount.money); // => 2000000
```

Ví dụ trên `Proxy` đã ghi đè lên phép gán `set` mặc định của object. Khi gán `1000000` cho `object bankAccount`, thì giá trị sẽ được nhân 2 lên do hàm `get` đã bị ghi đè và sửa đổi.

# Kết luận
`Proxy` khá thú vị, nhưng không nên lạm dụng nó để giải quết công việc, vì nó dễ gây nhầm lẫn và có nhều cách khác dễ hiểu hơn để giải quyết công việc của bạn. Nó chỉ nên được sử dụng để xây dựng những chức năng nhất định nào đó trong một thư viện hoặc framework. Hoặc để tạo ra một đối tượng đặc biệt để sử dụng nhiều lần  trong ứng dụng của bạn.
# Tham khảo
Harmony-reflect polyfill: github.com/tvcutsem/harmony-reflect
Proxy spec: developer.mozilla.org/en/docs/…/`Proxy`