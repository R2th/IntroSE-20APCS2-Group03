**Giới thiệu cơ bản về Vue 2**

Chào mừng các bạn đã quay trở lại với series Từng bước học Vue2 tập 11.

Hôm nay mình sẽ giới thiệu với các bạn về Named Slots trong Vue2 và mình tin là trong quá trình làm việc với Vue chắc các bạn sẽ sử dụng đến nó cũng không ít đâu

Để không phải chờ lâu chúng ta cùng vào với ví dụ cụ thể để hiểu Named Slots là gì nhé

Đầu tiên chúng ta vẫn sẽ tạo ra 1 component để sử dụng và hôm nay mình sẽ chọn 1 đoạn html css trên https://bulma.io/ sử dụng modal có cả header, body và footer
![](https://images.viblo.asia/777846da-fb6a-4223-9667-4331b94867a1.jpg)

Tiếp theo copy đoạn html vào template được khai báo ở file main.js
![](https://images.viblo.asia/facfe1cf-1a60-4fb7-a801-2589c9d21334.jpg)

Ở index.html chúng ta gọi modal component
![](https://images.viblo.asia/8fcdb9a8-6ba3-46c4-a5ee-4f64655f3431.jpg)

Okie giờ quay lại browers chúng ta sẽ có kết quả như sau
![](https://images.viblo.asia/370295e8-34a5-4a74-b8c3-53c31335d130.jpg)

Nhưng tùy theo từng trường hợp mà header, body, footer sẽ thay đổi. Nên chúng ta sẽ sửa lại header bằng cách đặt 1 cặp thẻ `<slot></slot>`

![](https://images.viblo.asia/c98053aa-d37b-4bfc-918b-445fb42ba1ad.jpg)

Và index.html sẽ thêm text vào trong `<modal></modal>` để truyền text vào
![](https://images.viblo.asia/d7ad0f9c-08da-40f9-8335-f33f1c5f9eeb.jpg)

Refesh lại browers 
![](https://images.viblo.asia/c6462865-117e-44c5-94a6-593b0f4b8e5c.jpg)

Vậy là headers cũng đã thay đổi thành text Anything. nhưng chúng ta còn có body và footer nếu chỉ truyền `<slot></slot>` thì tất cả text sẽ chỉ hiểu là ở headers.Vậy nên chúng ta cần thay đổi 1 chút là thêm name="header" vào thẻ `<slot></slot>`
![](https://images.viblo.asia/c362fc50-ef30-4bfa-900b-73e7f37b2230.jpg)

Chuyển qua index.html chúng ta sẽ thêm `<div slot="header">My Title</div>`
![](https://images.viblo.asia/d5f020b1-2baf-4a69-bdb2-19091097a5f1.jpg)

Chuyển qua browers chúng ta sẽ có kết quả 
![](https://images.viblo.asia/5d0f0e67-c11b-4107-bdee-4763770706dd.jpg)

Nhưng Inspect lên thì chúng ta sẽ lại có thêm 1 cặp thẻ `<div></div>` bao ngoài header
![](https://images.viblo.asia/cb3fa917-98d3-4b31-9cf9-ff95056ee6d2.jpg)

Nếu không muốn có thẻ div bao bên ngoài chúng ta có thể sử dụng cặp thẻ `<template></template>` để thay thế
![](https://images.viblo.asia/c7b98181-c898-4859-b0f6-8ebf68345454.jpg)

Và refresh lại chúng ta đã không còn thẻ bao bên ngoài text nữa
![](https://images.viblo.asia/e340e6be-2fdb-4c66-8270-d2d47d2a81c7.jpg)

Vì mình sẽ thêm name cho slot của header và footer nên phần body mình sẽ không cần thêm name vào nữa, trong phần `<slot></slot>` chúng ta sẽ khai báo default cho text body để khi không khai báo ở index.html thì text default sẽ được hiển thị
![](https://images.viblo.asia/076c64e1-676c-4c88-9f4b-affb7ecbc2c4.jpg)

Tương tự ở footer chúng ta sẽ khai báo `<slot name="footer"></slot>`
![](https://images.viblo.asia/bcb5188b-5034-4d03-aa09-3688fc70d47e.jpg)
![](https://images.viblo.asia/c70f25fb-eda4-4607-a17b-c24221087fbe.jpg)

Và kết quả chúng ta có được sẽ là
![](https://images.viblo.asia/370e53a2-b4c0-4c79-95aa-820feae2ab8a.jpg)


Okie, bài học hôm nay cũng dừng lại ở đây, vào tập tiếp theo mình sẽ giới thiệu đến các bạn những phần khác của Vue2, cùng đón chờ nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!