> Redux là một thư viện tuyệt với giúp quản lý state trong React, với đầy đủ các chức năng cần thiết mà cũng không quá phức tạp. Tuy nhiên, nó vẫn có những nhược điểm khiến việc code trở nên chậm chạp và tốn giấy mực. Reselect sinh ra nhằm khắc phục các yếu điểm của redux.
> 

Trích dẫn: [nguồn](https://github.com/reduxjs/reselect)

### Nhược điểm chí mạng: không có computed value

Nếu bạn đã từng code Vue, thì sẽ thấy computed value là một thức không thể thiếu, vì:

- dữ liệu lưu trong store chưa chắc đã là thứ ta cần hiển thị

```
    // dữ liệu về lương trả về từ api
    state = {
        luong_cung: "10000000",
        luong_tro_cap: "300000",
        luong_thuong: "100000",
    } 
    
    // tuy nhiên cái ta quan tâm chỉ là thực lĩnh vào túi :v
    luong_tong_the = luong_cung + luong_tro_cap + luong_thuong
    
```

- những dữ liệu cần tính toán đôi khi không phải tính toán lại vì input có thể giữ nguyên

```
    // tính lương qua thuế
    state = {
       ...
       thue: 10
    }
    
    // với mỗi nhân viên có cùng lương, thì đoạn code này vẫn chạy, thực tốn tài nguyên!
    // (thực ra cũng chả tốn mấy với ví dụ này, tuy nhiên hãy tưởng tượng ta cần iterate qua 1 array)
    luong_tong_the = .... * (1 + thue / 100)
```

### Một ví dụ của reselect

Ví dụ này được lấy trực tiếp từ trang chủ, câu chuyện là tính toán 1 hóa đơn siêu thị.

```
import { createSelector } from 'reselect'

const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}

console.log(subtotalSelector(exampleState)) // 2.15
console.log(taxSelector(exampleState))      // 0.172
console.log(totalSelector(exampleState))    // { total: 2.322 }
```

### Kết luận:

Như vậy, nếu ứng dụng đòi hỏi việc tính toán dữ liệu nhiều thì Reselect là một lựa chọn hoàn hảo, nó dễ dàng để ta reuse code và sử dụng computed value một cách đơn giản. Nó chạy tốt với Redux và không có dependency nào cả. Tuy nhiên, nếu ứng dụng chỉ hiển thị trực tiếp dữ liệu lấy từ api mà không tính toán gì thêm, thì Reselect vẫn có thể dùng tốt trong vai trò là 1 rào cản để hạn chế thay đổi tên trường, tức mỗi khi đổi ta sẽ sửa code reselect thay vì thay toàn bộ tên field từ code javascript đến code html. Ngoài ra, nó cũng là một công cụ đắc lực để làm việc với các legacy api, khi mà tên trường không hề theo chuẩn naming convention nào cả.