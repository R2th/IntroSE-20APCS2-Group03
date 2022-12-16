Khi bạn học về `Vuejs` hay `Reactjs` thì không ít lần các bạn sẽ gặp từ khóa `Lazy loading` ở phần `Code-Splitting (React)`  và `Lazy Loading (Vue Router`). Đọc tài liệu thì dường như chỉ hiểu sơ sài bản chất của nó rồi xem những example và apply vào dự án. Vậy bên trong nó hoạt động như thế nào? Hãy cùng mình đi qua những ví dụ để hiểu thêm nhé @@

### 1. `Lazy loading` là gì?
Đây là một kỹ thuật hạn chế tải các resource chưa thực sự cần khi bạn load một trang web:
- Lazy loadding images: 
    - Khi bạn có một list ảnh 1000 images, scroll tới đâu thì load ảnh tới đó thay vì phải load hết 1000 images
    - Khi bạn có một list ảnh với tốc độ mạng chậm, bạn có thế load `placeholder images` (những images có độ phân giải thấp để hiển thị trước) và khi load thành công thì sẽ thay thế `placeholder images`.[(Link tham khảo)](https://web.dev/browser-level-image-lazy-loading/)

- Lazy Loading Routes:
    - Một trang web với nhiều route, bạn sẽ chỉ load những resource mà trang web hiện tại bạn đang cần và những resource của route mà bạn nghĩ user có khả năng cao sẽ vào trang tiếp theo. Thay vì phải load hết toàn bộ resource, điều này khá lãng phí phải không nào?

Bài viết này mình sẽ đi sâu vào `Lazy Loading Routes` vì nó áp dụng khá nhiều khi mình làm dự án.

### 2. Link prefetching là gì?
Là một cơ chế của `Browser`, sử dụng thời gian rảnh của Browser để `download` hoặc `prefetch` những resource mà user có thể truy cập tới trong tương lai. Sau khi một page đã được load hoàn thành, Browser sẽ tìm những `prefetch links`, download những resource và sau đó lưu vào `browser's cache`. Khi user truy cập tới những page khác, nó sẽ cung cấp những resource tương ứng từ `browser's cache` một cách nhanh chóng.

Hình ảnh sau sẽ cho thấy được cơ chế hoạt động của nó:
![](https://images.viblo.asia/f2b8aa74-4c3e-4cb2-b025-151be1d614ee.png)


### 3. Vào demo 2 khái niệm trên nhé !!!

##### 1. Tạo Vue Project với Vue CLI:

https://cli.vuejs.org/guide/creating-a-project.html#vue-create
```
vue create demo-lazyloading-prefetch
```
##### 2. Cài đặt Vue Router: https://router.vuejs.org/installation.html#direct-download-cdn
```
npm install vue-router
```
##### 3. Chuẩn bị code demo [Link Repository: ](https://github.com/thaith-2022/demo-lazyloading-prefetch)
Tạo ra 2 route `/` và `/about` 

##### Trường hợp 1: Không sử dụng `Lazy Loading Routes`:
![](https://images.viblo.asia/3b8fb9e8-e8a5-4c7f-91f7-45a3cf8fc0ff.png)
![](https://images.viblo.asia/dc46b459-ae31-4e9c-bdce-00a84aa8bc01.png)
![](https://images.viblo.asia/6cd17655-3989-4b88-a70e-daf89b9096be.png)

Như trên hình ta có thể nhìn thấy được. Khi không dùng `Lazy Loading Routes`. Trang `About` sẽ được tải về cùng một lúc ở trong `app.js`

##### Trường hợp 2: Sử dụng `Lazy Loading Routes`:
![](https://images.viblo.asia/4e46ed8b-5d31-484b-95df-16b19d9751d7.png)
![](https://images.viblo.asia/e086d7a8-0ef2-493f-9c94-519a737e98b2.png)
![](https://images.viblo.asia/70eca676-670e-4090-9471-c4311d2db742.png)
![](https://images.viblo.asia/621728e5-cb4c-4fe4-84f8-87b0fca6fabe.png)

Trang `Home` và `About` được chia ra thành từng file `js`. 

Ở hình 2 sẽ thấy `rel="prefetch"`, khi tới trang `Home` và download hết file `js` từ `Home` thì tiếp tục download file `js` từ trang `About` và lưu vào cache browser. Khi tới trang About thì chỉ việc lấy ra từ cache.

Nếu thấy không hiểu hoặc có những góp ý cho bài viết thì mong các bạn để lại comment nhé !@#$%^&*