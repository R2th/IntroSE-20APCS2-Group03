Không giống như cookies, localStorage và sessionStorage không được gởi lên server trong mỗi request. Nhiều browers có ít nhất đến 2 megabytes data cho việc lưu trữ và setting configure  chúng. Server không thể xử lý localStorage và sessionStorage thông qua HTTP header, mọi thứ đều thông qua javascript.

Storage được liên kết với (domain / protocol / port triple), nghĩa là, các giao thức hoặc tên miền phụ khác nhau suy ra các đối tượng lưu trữ khác nhau, chúng có thể truy cập dữ liệu từ nhau.

Giữa localStorage và sessionStorage có cùng phương thức và thuộc tính:

* ` setItem(key, value)` – lưu cặp key/value .
* `getItem(key)` – nhận  value by key.
* `removeItem(key)` – xóa cặp key/value.
* `clear()` – xóa mọi thứ.
* `key(index)` – nhận vị trị của key tương ứng.
* `length` – độ dài của stored items.

## localStorage

  Đặc điểm chính của `localStorage`:
  
   * Tất cả các tabs và cửa sổ trong trình duyệt nếu như cùng một nguồn có thể chia sẻ thông tin của nhau.
   *  Dữ liệu không có thời gian tồn tại, nó vẫn còn sau khi brower restart hoặc OS reboot.
   
   Ví dụ: khi bạn chạy code này:
   
   `localStorage.setItem('test', 1);`
   
   sau đó đóng/mở lại trình duyệt hoặc mở một của sổ khác với trang lúc trước, bạn có thể nhận lại giá trị vừa set:
   
   `alert(localStorage.getItem('test')); // 1`
   
   Chúng phải chung một nguồn(domain/protocol/port), đường dẫn có thể khác nhau.
   
  ### access localStorage
  
  Chúng ta có thể sử dụng key getting/setting:
  
  ```
  // set key
localStorage.test = 2;

// get key
alert( localStorage.test ); // 2

// remove key
delete localStorage.test;
```

Điều này được cho phép vì lý do lịch sử, và chủ yếu là cách làm việc, nhưng thường không được khuyến khích, bởi vì:

1.  Nếu key là do người dùng tạo, nó có thể là bất cứ thứ gì, như `length` hoặc `toString` hoặc một phương thức tích hợp khác của `localStorage`. Trong trường hợp đó `getItem/setItem` hoạt động tốt, trong khi faild khi access `localStorage`:

    ```
    let key = 'length';
    localStorage[key] = 5; // Error, can't assign length
    ```

2.  Khi có `storage` `event`, nó kích hoạt khi chúng ta sửa đổi dữ liệu. `event` đó không xảy ra đối với việc access `localStorage`. Chúng ta sẽ thấy điều đó sau trong phần này :stuck_out_tongue_winking_eye:.


### looping over keys

Như những gì chúng ta đã thấy ở trên, có các method được cung cấp: `get/set/remove` bởi key, nhưng chúng có thực sự nhận tất cả giá trị đã được lưu không?

Thật không may, các đối tượng lưu trữ không thể lặp lại.

Để nhận cặp key/value chúng ta cần  lặp chúng trên một mảng: 

```
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

### String only

key và value phải là string.
## sessionStorage

`sessionStorage` được sử dụng ít hơn `localStorage`.

Các thuộc tính và phương thức là như nhau, nhưng nó giới hạn hơn nhiều:

* `SessionStorage` chỉ tồn tại trong tab trình duyệt hiện tại.
    * Một tab khác có cùng trang sẽ có dung lượng lưu trữ khác.
    * Nhưng nó được chia sẻ giữa các iframe trong cùng một tab (giả sử chúng đến từ cùng một nguồn gốc).
* Dữ liệu tồn tại khi trang refresh , nhưng mất lúc đóng / mở tab.


Hãy xem nhé: 

`sessionStorage.setItem('test', 1);`

Sau khi refresh trang, bạn có thể nhận lại dữ liêu:

`alert( sessionStorage.getItem('test') ); // after refresh: 1`

### Storage event

Khi dữ liệu được cập nhật vào `sessionStorage` hoặc `localStorage`, `storage` `event` kích hoạt với thuộc tính:
* `key` - đã được thay đổi (`null` nếu `.clear()` được gọi)
* `oldValue` - giá tri cũ (`null` nếu key mới được add)
* `newValue` - giá trị mới(`null` nếu key removed)
* `url` - url của document , nơi cập nhật xảy ra
* 

Điều quan trọng là: sự kiện kích hoạt trên tất cả các đối tượng cửa sổ nơi lưu trữ có thể truy cập được, ngoại trừ đối tượng gây ra nó.

Hãy tưởng tượng, bạn có hai cửa sổ với cùng một trang web vì vậy, `localStorage` được chia sẻ giữa chúng.
Bạn có thể muốn mở trang này trong hai cửa sổ trình duyệt để kiểm tra `code` bên dưới.
Nếu cả hai cửa sổ đang lắng nghe sự kiện `window.onStorage`, thì mỗi cửa sổ sẽ phản ứng với các cập nhật đã xảy ra trong một cửa sổ khác.

```
// triggers on updates made to the same storage from other documents
window.onstorage = event => {
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

Thank các bạn đã đọc. @@