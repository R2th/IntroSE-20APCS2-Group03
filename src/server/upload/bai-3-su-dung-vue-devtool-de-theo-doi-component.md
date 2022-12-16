Trong bài trước mình đã hướng dẫn các bạn [Tự tạo component và binding data cho component](https://viblo.asia/p/bai-2-tu-tao-component-va-binding-data-cho-component-GrLZDwwnKk0). Ở bài này mình sẽ hướng dẫn các bạn sử dụng Vue devtool - một công cụ cực kì hữu hiệu trong quá trình phát triển ứng dụng sử dụng VueJS để có thể theo dõi quá trình thay đổi của dữ liệu trong toàn bộ ứng dụng VueJS.
# Cài đặt
Để cài đặt Vue devtool các bạn, yêu cầu các bạn sử dụng trình duyệt Google Chrome. Các bạn truy cập ở địa chỉ sau [Vue devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd), click thêm vào Chrome, mọi thứ khác sẽ tự động cài đặt, quá dễ phải không :-D. Kết quả các bạn nhìn lên góc trên bên phải của trình duyệt sẽ thấy như sau:

![](https://images.viblo.asia/abedcdab-554a-4e53-b185-15f921aec6c3.png)

Nếu chữ "V" (biểu tượng của Vue) sáng như kia là trang web hiện tại có thể sử dụng VueJS, nếu không sáng là không sử dụng (miễn là có là biết cài đặt thành công rồi nhé :) ).

# Cùng khám phá Vue devtool
Để có thể sử dụng Vue devtool yêu cầu project của bạn phải sử dụng VueJS (tất nhiên rồi :) ), và ứng dụng **không** chạy ở chế độ `production`

Quay trở lại app của chúng ta, các bạn click chuột phải vào trình duyệt chọn `Inspect`, các bạn sẽ thấy 1 tab `Vue`, click vào tab này sẽ thấy xuất hiện như sau:

![vue_dev_tool](https://images.viblo.asia/dd5c6bb2-4732-490d-9084-b8c88b03346e.png)

Ở đây các bạn có thể thế ứng dụng của chúng ta có một component cha là `Root`, đây cũng là component tổng cho bất kì ứng dụng nào khác, trong đó sẽ là các component do chúng ta tạo ra - ở đây là `my-component`.

Click vào `my-component` các bạn có thể thấy thuộc tính `message` trong `data` và giá trị của nó, còn khi click vào `Root` sẽ có các thông tin mà chúng ta thiết lập ở trong file `app.js` (data, methods, computed,...) nhưng hiện tại ở `app.js` chúng ta chưa có dữ liệu gì cả.

Chúng ta có thể chọn `Select` sau đó bấm vào bất kì phần tử nào trên màn hình để xem nó thuộc component nào.

Bằng các sử dụng `Vue devtool` chúng ta có thể theo dõi được sự thay đổi của dữ liệu, event, hay của Vuex. So sánh nhanh với devtool của React và Angular. Với Angular project hiện tại mình làm team mình dùng Angular 1 (@@) nên mình không tìm thấy devtool (thấy báo chỉ từ angular 2), còn với React thì các bạn có thể xem hình dưới, theo đánh giá cá nhân của mình là khá rối mắt :):

![react_dev_tool](https://images.viblo.asia/e4cb5bb2-479b-4166-b387-438c35e3a8d5.png)

# Kết luận
Qua bài này hi vọng rằng các bạn có thể hiểu được cách sử dụng Vue devtool để quan sát tổng thể về các component trong app của chúng ta, từ đó dễ hơn cho việc debug và phát triển phần mềm.

Ở bài sau chúng ta sẽ cùng tìm hiểu về `methods` trong Vue nhé.

Cám ơn các bạn đã theo dõi ^^!