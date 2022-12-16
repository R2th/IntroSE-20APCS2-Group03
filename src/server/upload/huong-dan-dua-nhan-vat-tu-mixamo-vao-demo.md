![](https://images.viblo.asia/6a2e4c07-f6e6-4dcf-b8ca-973e07bce48c.png)


Chào các bạn!

Hôm nay mình sẽ hướng dẫn các bạn lấy model, animation từ trang web Mixamo (của Adobe) về để làm demo nhé! Mình cũng mới biết vì vậy không rõ họ có cho phép chúng ta release sản phẩm không, cái đó các bạn tìm hiểu thêm nhé ;)

Bài này chúng ta chỉ tìm hiểu cách để lấy model, animation về, setting sao cho nó chạy được trong Unity để làm demo là ngon rồi nhé ;)

### Bước 1: Đăng nhập.

- Các bạn hãy đăng nhập vào trang [Mixamo.com](https://www.mixamo.com/) đây là yêu cầu bắt buộc để có thể được download tài nguyên từ đây về.
- Hãy tạo tài khoản nếu các bạn chưa có.

### Bước 2: Model.

- Mixamo cho phép bạn lấy về 2 thứ, model và animation.
- Với model, các bạn sẽ bao gồm cả texture vì vậy cũng rất là ok để sử dụng ngay được nhé.
- Sau khi đăng nhập, các bạn ấp vào tab Characters để lựa chọn model cho mình.
- Ở thời điểm mình viết bài thì nó có 121 model nhân vật, cũng khá nhiều để chúng ta dùng ha ;)

![](https://images.viblo.asia/02db56a8-0f05-4fc6-93eb-ac6de7c5e5ae.png)


- Các bạn ấn vào model muốn lấy về, sẽ có màn preview ngay bên phải cho các bạn view to rõ hơn.
- Nút Download màu vàng cam, các bạn ấn vào đó sẽ có 1 popup hiện ra.
- Các bạn chọn Format là FBX 2019 Binary (.fbx) và Pose là T-pose, sau đó ấn Download trên popup.

![](https://images.viblo.asia/8c1f6022-d957-4e41-b545-e11f976782b0.png)


### Bước 3: Import Model To Unity.

- Sau khi download về xong, các bạn kéo model vào trong Unity.
- Kéo thử vào scene các bạn sẽ thấy nó đang bị tình trạng "X-QUANG", chúng ta nhìn thấy bên trong nhân vật, nhìn cái mắt nó khá là ghê =)))

![](https://images.viblo.asia/9303ec89-ef11-4fb9-9fd9-8417335e6bd9.png)


- Để khác phục tình trạng này các bạn ấn vào model trong phần Project, rồi chọn tab Materials, ở phần Location các bạn đổi từ Use Embedded Materials thành Use External Materials (Legacy) rồi ấn Apply.

![](https://images.viblo.asia/c5d3d1a0-38e1-46c2-be0d-36144e080567.png)


- Đợi 1 chút nó sẽ tạo ra export ra 2 thư mục gồm Materials và tên model có chứa textures của model. Nếu nó có hỏi bạn fix lỗi ảnh normal thì bạn cứ ấn fix now nhé.
- Tiếp theo, bạn hãy đổi tất cả các Materials mới export ra kia cho Rendering Mode từ Transparent thành Opaque.
- Giờ nhìn xem, model đã không còn trong tình trạng nội soi nữa rồi ;)

### Bước 4: Animation.

- Bây giờ các bạn đã có model rồi, tuy nhiên nó không cử động gì cả, chúng ta cần animation cho nó.
- Các bạn quay lại trang Mixamo, ngay cạnh tab Characters chính là tab Animations.
- Chọn tab Animations, tìm 1 anim các bạn muốn sử dụng, rồi cũng ấn vào nút download màu vàng cam bên phải.
- Popup lại hiện ra, nhưng lần này nó có nhiều option hơn.

![](https://images.viblo.asia/2d499efb-84ca-4eea-afea-981d56277c85.png)


- Các bạn chọn Without Skin (vì chúng ta chỉ cần animation thôi), Frames Per Second thì tùy bạn muốn dùng bao nhiêu vào game của mình, càng nhiều frame thì nó càng mượt ;) , Keyframe Reduction các bạn chọn none, cuối cùng ấn download là xong.

### Bước 5: Import Animation To Character.

- Đầu tiên, để model và anim có thể khớp nhau, các bạn cần đổi nó về cùng avatar.
- Các bạn ấn vào model nhân vật, tại tab Rig, các bạn đổi Animation Type từ Generic qua Humanoid, tại Avatar Definition các bạn chọn Create From This Model để nó tạo ra 1 avatar, sau đó ấn apply.
- Tiếp theo các bạn chọn animation vừa lấy về được (đã kéo vào trong Unity), các bạn cũng chọn tab Rig, cũng đổi Animation Type từ Generic qua Humanoid, nhưng ở Avatar Definition các bạn chon Copy From Other Avatar, tiếp theo các bạn chọn Source cho nó chính là Avatar của model vừa được tạo, cuối cùng ấn apply.

### Bước 6: Animator.

- Như các bạn đã biết, để nhân vật hoạt động được, ta cần có Animator Controller thì nó mới chạy được.
- Các bạn tạo 1 Animator Controller rồi kéo nó vào nhân vật trên scene.
- Các bạn mở cửa sổ Animator (Từ Menu chọn Windows -> Animation -> Animator), sau đó các bạn kéo animation đã download về vào cửa sổ Animator.
- Thử ấn play để xem nhân vật của chúng ta quẩy tung trời thế nào nhé (dance8)

![](https://images.viblo.asia/f11b6438-9fbf-4efc-afa2-af0f63c278ee.gif)


Như vậy là mình đã hướng dẫn các bạn cách lấy model và animation từ Mixamo, cũng như cách đưa chúng vào Unity và ghép cho chúng hoạt động cùng nhau! Nếu thấy nó quay cuồng linh tinh thì thử tích thêm vào Apply Root Motion của nhân vật trên scene để nó hoạt động chính xác hơn nhé!

Chúc các bạn thành công ^_^