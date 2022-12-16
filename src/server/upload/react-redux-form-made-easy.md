Bài viết được dịch từ nguồn: https://hackernoon.com/redux-form-made-easy-345060c6a700

Tìm hiểu cách viết một component có chứa redux-form, biết cách describes the fields dạng JSON, render redux-form. Tạo component đơn giản và rõ ràng.

## The problem:

Redux-form là một repository phổ biến để render react form.

Trong github nó được mô tả: một component bậc cao sử dụng react-redux để lưu giữ form state trong Redux store.

Nếu bạn tìm hiểu sâu hơn về nó, bạn sẽ thấy đây thực sự là một công cụ rất mạnh để cung cấp metadata cho bạn, errors, warning, state, field array và nhiều thứ khác.

Nhưng redux-form không thực sự đơn giản.

Ví dụ khi bạn muốn form của bạn init với value lấy từ state, bạn phải làm như sau:

![](https://images.viblo.asia/0ffca149-4ba4-41df-b404-4ade86e1e662.png)

Và khi bạn có nhiều form component trong app của bạn, bạn cần có cách để các form này có một cách hoạt động nhất quán, ví dụ submit button sẽ disabled hoặc không tùy theo validate của form. Logic này không nhất thiết đối với tất cả các form. Bạn cần một số component chung để giữ form generation.

## The Solution:

Tạo component, field đầu vào là dạng JSON, và sẽ generate from bởi những dự liệu đầu vào này. Component này sẽ sử dụng redux-form, nó nằm trong component đó.

## Advantages:

- Thích hợp đối với mọi dạng form
- Thời gian code form được rút ngắn
- Không có redux-form mẫu
- Có thể dễ dàng tái sử dụng
- Dễ dàng thay đổi form, chỉ cần thay đổi ở wrapper component nền có chứa redux form

## Let’s see some code

Đây là ví dụ đơn giản về trang sign up, nó dùng một wrapper component có chứa redux form.

Đầu tiên, tạo một form với dữ liệu đầu vào là 1 array: mỗi phần tử là name, label và validation function cho field đó (bạn cũng có thể định nghĩa thêm các fiels khác như checkbox, drop-down ...)

![](https://images.viblo.asia/59eff75a-7940-4ed2-9b80-fb2248be3af2.png)

Tạo một submit function:

![](https://images.viblo.asia/96219a7f-5d5f-42db-839a-51b602f7b560.png)

Nếu bạn làm đến đây, phần lớn công việc đã xong. Bây giờ chỉ việc render redux form wrapper component, nó được gọi là GenericReduxForm và truyền submit callback, fields, values, form ID những thứ cần để phân biệt các form khác nhau trong app, và title nếu như bạn muốn form hiện ra title header.

![](https://images.viblo.asia/ca0aea48-de46-4785-bdcc-97f98584a3bf.png)

Và bạn đã setup form, chỉ với data dạng JSON, một form có nhiều tính năng mạnh mẽ, bao gồm validation, submit button, trong đó có redux-state.

GenericReduxForm sẽ có dạng như sau:

Render function:

![](https://images.viblo.asia/9f770597-31af-4854-92f8-d3218cc48efc.png)

Bây giờ sễ đi sâu hơn, render field function, sử dụng redux-form component Field, có thể custom component để render ra, trong trường hợp này là GenericFormField

![](https://images.viblo.asia/d9435d9b-1819-4b13-88ae-d9452017bd20.png)

Field sẽ được render như sau (GenericFormField):

![](https://images.viblo.asia/e6ac1f2f-9282-47ee-821e-fbfcc62a8a18.png)

Khi nào submit button bị disabled?

![](https://images.viblo.asia/4775d967-d5c5-43d8-b9ee-acc648b01d10.png)

Bây giờ là đoạn khá phức tạp, định nhĩa redux-form props.

![](https://images.viblo.asia/c67b4bdf-8cee-44c0-a3e2-979230211da4.png)

Tạo redux-form và connect nó với store

![](https://images.viblo.asia/7bee5b2d-dacc-446e-a751-49a2b50febdc.png)

Bây giờ, mục tiêu đã hoàn thành, form được hoàn thành khá nhanh, form library có thể thay đổi nhưng các components liên quan vẫn hoạt động và không có thay đổi nào, điểm mạnh nhất là tạo form thực sự đơn giản và rõ ràng, chỉ json, value.

Cảm ơn và hi vọng bài viết có ích cho công việc của bạn.