## Tình huống đề ra
**Bạn có component nhận vào prop, muốn sử dụng v-model để nó tự cập nhập giá trị khi có thay đổi**

![](https://images.viblo.asia/5d1a0009-dea6-4384-ab75-7053335d815c.png)

Bạn truyền nó vào như thế này, với hy vọng mọi thứ chạy ngon lành
![](https://images.viblo.asia/28760f71-9f6a-4eed-8d70-d4cee1d08913.png)

NHƯNG TIẾC LÀ KHÔNG :weary::weary::weary::weary: Nó sẽ thông báo trong console, “*Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders*. “

Về nguyên tắc, chúng ta ko được thay đổi giá trị của **prop**, nếu không lúc re-render nó sẽ ko còn đúng nữa
Để nó chạy ngon lành, chúng ta không dùng prop. Khi sử dụng **v-model** nó làm cho chúng ta 2 việc, bind giá trị vào biến **value**, gắn handle cho sự kiện** v-on:input**. Túm lại chúng ta ko cần dùng prop làm gì cả, chỉ việc dùng lùng **value** bên trong component

![](https://images.viblo.asia/e9bee6ee-6278-48e1-a9ed-48468faae722.png)

Khi sử dụng
![](https://images.viblo.asia/a32c9ce6-2fd1-43f3-9c50-59be6578aa85.png)

Nếu nó thêm một cấp nữa thì sao? Ví dụ bên trong Address.vue chúng ta nhét thêm một component cháu nội của Form nữa
![](https://images.viblo.asia/1c9b0060-9226-4e22-882b-90a13e76770b.png)

State component
![](https://images.viblo.asia/835e9b60-955e-42c9-a4ce-e6b6c18a9b44.png)

Nó sẽ tiếp tục chửi bới chúng ta, vì chúng ta đi thay đổi prop nữa rồi, chúng ta cần đưa nó về **computed**
![](https://images.viblo.asia/ac280eb2-49ee-4029-8015-9f5cb8cfb647.png)

Cách này giống như chúng ta dùng controlled component trong React. Hi vọng với cách này mọi người sẽ không còn đau đầu với v-model và child components :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

Ref: https://zaengle.com/blog/using-v-model-on-nested-vue-components