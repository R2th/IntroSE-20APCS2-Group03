### I. Giới thiệu
Mình có chức năng gọi là import `formula`  (các công thức về toán học, hóa học...) vào trong editor nhưng tìm mãi không có support cho vue, may mà tìm được cái [vue-quill-editor](https://github.com/surmon-china/vue-quill-editor) này và thử dùng cũng hay cũng như có sự support từ cộng đồng khá lớn với cách sử dụng mình nghĩ là tiện lợi hơn ckeditor, TinyMCE... 
### II. Tiến hành
#### 1. Chuẩn bị
Về mặt cài đặt thì bạn xem hướng dẫn theo link trên nhé. Cách sử dụng thì chỉ đơn giarn là cấn thêm tag `<quill-editor/>` mà bạn đã đăng ky global ở trong vuejs thôi. Để sử dụng cho ở nhiều nơi thì tất nhiên ta nên viết nó ở 1 component riêng để tái sử dụng.
```html:html
<quill-editor
    class="editor-form"
    :ref="commonRef"
    :options="options"
    v-model.trim="content"
    @input="handleInput" 
    @change="handleChange($event)"
/>
```
Giải thích chút thì có các phần càn lưu ý
- `ref`: Mình sẽ nhận vào từ props để xử lý cụ thể với từng editor component khi cần thiết.
- `options`: là các gía trị được đưa vào trong editor, no có hết [ở đây](https://quilljs.com/docs/configuration/) và trong vuejs sẽ sử dụng thế này
```css
data() {
    return {
        ...
        options: {
            modules: {
                toolbar: {
                    container: toolbarModules,
                },
            },
            placeholder: '',
            theme: 'snow',
            readOnly: false
        }
        ...
    }
}
```
- `change`: sẽ trigger mỗi khi người dùng nhập vào một kí tự qua function (ở đây là hàm `handleChange`)
- Còn `v-model`, `input` thì dĩ nhiên gianh cho việt `binding model` nếu như sử dụng component chung rồi.
#### 2. Tạo toolbar
ở đây mình sẽ có gía trị `options` được định nghĩa như trên và `toolbarModules` là
```python
    let toolbarModules = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['formula'],
    ];
```
và sau đó nó sẽ có dạng đơn gian thế này, bạn muốn thêm vào toolbar thì hãy xem config [tại đây](https://quilljs.com/docs/modules/toolbar/) và ta sẽ được kết qủa thế này
![](https://images.viblo.asia/15b98cd8-0266-4bbd-88ba-c9b8b2081724.png)
Bạn có thấy chữ Clear không? Đó là do mình đã add thêm vào module toolbar, bây giờ đến phần thêm vào toolbar nhé.
#### 3. Tự custom một action trên toolbar
 Thêm bằng cách sử dụng
```javascript
if (JSON.stringify(toolbarModules).indexOf(JSON.stringify(['clear'])) == -1) {
    toolbarModules.push(['clear']);
}
```
Và đây là cách để chèn content vào, b có thể dụng icon dạng text cũng được, ở đây mình dùng chữ vì k tìm được cái thùng rác dạng text đâu :))
```css
.ql-omega:after {
    content: "Clear";
}
```
Sau khi đã hoàn tất việc thêm gía trị, thì viêc bấy giờ là phải handle một function khi click bằng cách thêm object `handler` bên trong `toolbar`
```css
options:{
    ...
    modules:{
        toolbar: {
            handlers: {
                clear: this.clearHtml
            }
        }
    }
}
```
Và bây giờ bạn chỉ cần viết thêm một method `clearHtml` ở trong `methods` là sẽ hoàn thành việc trigger.
#### 4. Xử lý ảnh
- Để upload được image thì bạn thêm `image` vào toolbar với 1 dòng value riêng nhé.
- Để handle được việc upload thì mình cũng phải viết vào object `handlers` giống như `clear` ở trên để xử lý việc lưu ảnh vào trong server.
Ví dụ với method `imageHandler` sẽ thế này
```javascript
imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async function() {
        const file = input.files[0];
        let quill = this.$refs[this.commonRef].quill; //lấy ra object quill theo ref - gỉa sử ở đây có nhiều quill editor trong một component
        const range = quill.getSelection();
        let formData = new FormData();
        this.$store.dispatch('actUploadImage', formData)
            .then(res => {
                quill.insertEmbed(range.index, 'image', res.link); 
   })
     }.bind(this);
},
```
- Để có thể resize ảnh trong editor thì editori thêm package [quill-image-resize](https://www.npmjs.com/package/quill-image-resize) và thêm object này vào trong toolbar
```cpp
imageResize: {
    displaySize: true
},
```
#### 5. Xử lý khi nhập từ bàn phím
Bạn hãy thêm object này vào trong object `modules`
Ví dụ
```swift
keyboard: {
    bindings: {
        enter: {
            key: 13,
            handler: function() {
                // handle function
            }
        }
    }
},
```
#### 6. Formula
Mình thấy ở `Quill` này support về `formula` khá tốt ví dụ demo như
![](https://images.viblo.asia/6467e6b9-359d-4cde-976c-e8c8ee613ea0.gif)
Nhưng Quill lại không thể có sẵn các bộ `formula` như `word` điền vào các ô trông được cho nên mình đã phải làm sẵn một bộ [katex](https://katex.org/) như bài mình đã [chia sẻ](https://viblo.asia/p/katex-thu-vien-thiet-ke-cac-cong-thuc-toan-hoc-hoa-hocdu-thu-3P0lPPr4lox) 
- Để thêm được như một công cụ trên toolbar thì bạn hãy làm theo hướng dẫn ở phần 3, sau đó thì trigger tạo modal, chọn công thức các kiểu...
### III. Kết thúc
- Minh đã tự build được mọt bộ editor khá ổn từ quill và có thể sẽ sử dụng nó cho các dự án về vuejs sắp tới
- Hi vọng bài chia này của mình sẽ giúp bạn có thêm sự lựa chọn khi muốn dùng editor nào đó cho dự án.