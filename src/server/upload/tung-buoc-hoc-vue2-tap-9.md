**Giới thiệu cơ bản về Vue 2**

Chào mừng các bạn đã quay trở lại với series Từng bước học Vue2 tập 9.

Tiếp tục với phần sử dụng thư viện css Bulma ở bài trước, nhưng hôm nay chúng ta sẽ cùng nhau thử xử lý modal nhé

![](https://images.viblo.asia/a5d0586a-ae1b-4610-a44f-d3ee75b072b0.jpg)

Cùng click Lauch example modal nhé
![](https://images.viblo.asia/0f8fc977-6ac1-4b2d-b636-09a9f8e1a45c.jpg)

Khá là đẹp phải không nào, giờ hãy copy đoạn html của modal vào file index cũ của chúng ta để có được đoạn code như sau
![](https://images.viblo.asia/832d0e2f-ae23-4fd8-a070-df19ef72a65e.jpg)

Quay trở lại với chrome và chúng ta sẽ có kết quả. Lưu ý là mình có thêm class is-active để modal đc show ra nhé
![](https://images.viblo.asia/32410c9e-e8d1-4c2c-a7d2-d84c1a9456ef.jpg)

Với kiến thức những bài trước chúng ta được học về component thì mình cũng sẽ áp dụng thử ở modal nhé
![](https://images.viblo.asia/9eab7b51-d737-491a-8288-1b563a15915d.jpg)

![](https://images.viblo.asia/71476a31-b3f2-4360-a191-f648e8e359d0.jpg)

Mình sẽ đặt cặp thẻ <modal></modal> ở đây để xử lý component.Quay lại chrome thì kết quả cho vẫn là như cũ.

Okie giờ sẽ thêm button click vào để show modal ra
![](https://images.viblo.asia/8f69e98c-86db-4820-8315-a2c884920825.jpg)

Trở lại trình duyệt chúng ta sẽ có kết quả
![](https://images.viblo.asia/a6989d28-c46e-4485-b789-857772ccb99b.jpg)

Vì do mình vẫn đang để class is-active nên modal sẽ luôn được show. Thêm biến showModal = false ở file .js để xử lý việc bật tắt modal
![](https://images.viblo.asia/94a82f63-6475-4b01-a23c-f0bd016ed954.jpg)

Sau đó sẽ thêm v-if để check việc show ra modal
![](https://images.viblo.asia/8d04dca5-00c0-4135-a5a4-8c5ac41b6826.jpg)

Giờ chúng ta thêm sự kiện @click="showModal = true" để click button thì biến showModal sẽ được đổi thành true và modal sẽ được show ra
![](https://images.viblo.asia/eaed2494-f30c-4cf6-9030-08328c998d89.jpg)

Cùng quay trở lại chrome và mọi thứ hoạt động đúng theo bước click button thì modal đc show ra nhưng khi click X để tắt modal thì chưa có action gì xảy ra

![](https://images.viblo.asia/2c24dbf2-f6fa-48c7-96c7-71bdca6f623a.jpg)

Để tắt modal chúng ta sẽ sửa component ở .js như trên, nhưng quay trở lại chrome các bạn sẽ không thấy action gì xảy ra khi click button X.
là vì data showModal đc đặt trong component nên sẽ không hoạt động.

Để xử lý việc này chúng ta hãy tự định nghĩa 1 event ở view, ở đây mình đặt tên là close
![](https://images.viblo.asia/7ee3f504-8195-48b7-a278-ae5506e1b8a6.jpg)

Và ở .js chúng ta sẽ dùng $emit để gọi tới action close đã được định nghĩa.
![](https://images.viblo.asia/6f4673f1-0a3c-4d9f-84a9-2843fbf5e579.jpg)

Cùng quay lại chrome và thử lại các action click button đến close modal nhé. Mọi thứ đều hoạt động okie r đúng không ?

Để hoàn thiện chúng ta cùng sửa file .js 1 chút xóa bỏ đoạn text hard code đi và thay bằng cặp thẻ <slot></slot>
![](https://images.viblo.asia/493e891d-ff36-4331-a370-719edb59e8ed.jpg)

Và giờ ở view chúng ta có thể truyền text tùy ý vào rồi
![](https://images.viblo.asia/ef910113-810c-452b-a55e-67efc1f8e2ee.jpg)

Và kết quả là
![](https://images.viblo.asia/43752f7f-a23d-45eb-a3c0-22b96e50a981.jpg)


Rất cơ bản phải không nào ?

Okie, bài học hôm nay cũng dừng lại ở đây, vào tập tiếp theo mình sẽ giới thiệu đến các bạn những phần khác của Vue2, cùng đón chờ nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!