# Lời nói đầu:
Xin chào các bạn mình đã quay trở lại rồi đây. Hi vọng là các bạn chưa quên mình cũng như [series VueJS của mình](https://viblo.asia/s/cung-hoc-vuejs-tu-con-so-0-L6lAyeBrlek).

Ở trong [bài trước](https://viblo.asia/p/tim-hieu-ve-computed-properties-va-watchers-RnB5p0WG5PG) của series, mình đã đề cập đến v-for dùng cho component và hẹn các bạn trong một bài viết riêng về **component**. Quả thực, mình nghĩ để tìm hiểu về Component trong VueJS thì kiến thức rất là nhiều và không thể nào gói gọn trong một bài viết được. Vì vậy mình sẽ chia ra thành nhiều part nhỏ để các bạn không bị ngợp (giống như mình lúc bắt đầu) với lượng kiến thức đó.

Và trong quá trình làm việc với VueJS, mình thấy extension **[Vuejs devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)** khá hữu ích và tiện lợi, các bạn cũng nên dùng thử xem.
# Nội dung:
## Khái niệm Component:
Theo như mình hiểu thì VueJS sử dụng component gom nhóm code liên quan đến một đối tượng vào thành một khối, từ đó có thể tái sử dụng mà không cần phải viết lại code. Và code trong component ở đây có thể là HTML, CSS hay là cả javascripts để xử lí. Đó sẽ là một Vue Instance hoàn thiện đầy đủ từ hiển thị đến xử lí sự kiện. 

Tức là bạn chỉ cần khai báo component và gọi ra là sẽ có đầy đủ chức năng có thể sử dụng được. Khi muốn thay đổi gì thì cũng chỉ cần thay đổi ở trong component là những chỗ được gọi ra cũng sẽ thay đổi theo, không sợ bị bỏ sót khi sửa code, hay quá phải không.

Nếu đã biết về HTML thì chắc chắn bạn cũng không xa lạ gì với **DOM** (**Document Object Model**).

Và khi đến với VueJS, bạn sẽ biết thêm khái niệm **Virtual DOM (DOM ảo)** được xây dựng từ một cây các Vue component. Nó được xây dựng để theo dõi nhưng thay đổi, tương tác mà ta thực hiện với DOM thật.
![](https://images.viblo.asia/28b0c409-bf9b-4292-8c08-62e45ff3c420.png)


## Cú pháp khai báo, sử dụng:
Để sử dụng được component, việc đầu tiên chúng ta cần làm là khai báo nó. Và có 2 kiểu khai báo component là **global** và **local**.
- **global (toàn cục)**: tức là component này có thể được truy xuất từ bất cứ đâu. Cú pháp:
    ```javascript
    Vue.component('ComponentName', {
        // options
    })
    ```
- **local (cục bộ)**: khai báo component khi khởi tạo một Vue Instance, với cách này thì component chỉ có thể truy xuất bởi Vue Instance vừa được khởi tạo. Cú pháp:
    ```javascript
    var ComponentName = { ... } //khai báo component

    //khai báo component được sử dụng trong tùy chọn 'components' khi khởi tạo Vue Instance
    new Vue({
        components: {
            'component-name': ComponentName
        }
    })
    ```

- Ngoài ra, còn 1 trường hợp khá là phổ biến nữa là **subcomponents** (tức là một component sẽ nằm trong một component khác). Có 2 cách để bạn chọn trong trường hợp này:

    - Cách 1:
    ```javascript
    var ComponentA = { }
    
    var ComponentB = {
        components: {
            'component-a': ComponentA
        },
    }
    ```
    - Cách 2: bạn sẽ sử dụng cách này nếu bạn sử dụng modules ES2015 (hay còn biết đến với tên gọi ES6)
    ```javascript
    import ComponentA from './ComponentA.vue'
    
    export default {
        components: {
            ComponentA
        },
    }
    ```

Về việc đặt tên cho component thì có thể sử dụng 1 trong 2 quy tắc sau thì theo dự án mà bạn đang làm:
- **kebab-case**: sử dụng các kí tự thường, các chữ được ngăn cách bởi dấu gạch nối. VD: `component-name` 
- **PascalCase**: các chữ viết liền, viết hoa chữ cái đầu tiên của các chữ. VD: `ComponentName`

Đã xong phần khai báo rồi, giờ chúng ta sẽ đi đến cú pháp sử dụng component ở trong template. Khi đã khai báo component trong scripts, để gọi ra trong template ta chỉ cần gọi component giống như một thẻ html. 
```html
   <div>
       <component-name></component-name>
       <!-- tên component ở đây được sử dụng như 1 thẻ trong html -->
   </div>
```
## Data ở trong Component:
Trong [bài viết về **Vue Instance**](https://viblo.asia/p/tim-hieu-vue-instance-va-vue-template-jvEla47dZkw), nếu các bạn còn nhớ thì data được khai báo là **object**. Nhưng khi khai báo trong **component**, thì data bắt buộc phải là **function**.

```javascript
   //khai báo data trong Vue Instance)
   data: {
       ...
   }
   
   //khai báo data trong Vue component)
   data: function () {
       return {
           ...
       }
   }
```

- **Vậy tại sao bắt buộc phải khai báo data là function?**
Lấy ví dụ là khi bạn muốn sử dụng một component nhiều lần trong cùng 1 trang. 
    - Nếu khai báo data là object thì những những instance đó sẽ nhận chung giá trị data đó, và khi có tác động thay đổi data ở một instance thì data của các instance khác cũng thay đổi theo.
    - Nếu khai báo data là function thì mỗi instance có thể lưu trữ một bản sao độc lập của data trả về, tức là tác động vào instance nào thì data của cái đó mới bị thay đổi.

    --> để dễ hiểu hơn thì mình lấy ví dụ trong nhà bạn có công tắc điện tầng 1, tầng 2, tầng 3 (component tái sử dụng nhiều lần trong 1 trang) thì khi bạn bấm 1 công tắc, bạn muốn đèn cả 3 tầng cùng bật hay là chỉ bật đèn ở tầng bạn bấm thôi. Đó, khai báo data là function nó cũng kiểu kiểu như vậy đó.

**(mình sẽ up ví dụ minh họa sau nhé)**

## Quan hệ component cha-con:
Như ở phần khai báo mình có nhắc đến **subcomponent** (sử dụng component này ở bên trong một component khác, tạm gọi là cha-con). Và chắc chắn là khi sử dụng hai component này cũng phải có sự tương tác qua lại với nhau rồi. Và đó là quan hệ **props down, events up** (thuộc tính xuống, sự kiện lên)

Có nghĩa là component cha sẽ truyền data xuống component con bằng **props**, và component con gửi lại thông điệp cho component cha bằng **events**(sự kiện).

![](https://images.viblo.asia/d86c2992-6a76-4101-9f62-7d4f9d15584e.png)

Hãy nhớ lấy hai từ khóa **`props`**, **`events`** nhé, ở bài viết tiếp theo chúng ta sẽ tìm hiểu về nó.
## Chú ý khi "Parse DOM Template":
Ở phần sử dụng component ở trong template, chúng ta đã biết rằng để gọi component, ta có thể dùng cú pháp giống như một thẻ HTML.

Nhưng trong thực thế, HTML có một số thẻ có yêu cầu phụ thuộc đặc biệt, ví dụ **<tr>**, **<td>** phải nằm trong **<table>**, **<li>** phải nằm trong **<ul>**. 
    
Bài toán đặt ra ở đây là nếu ta muốn đưa một component vào bên trong những thẻ đặc biệt đó thì làm thế nào? Chắc sẽ có bạn thử tống nó vào như thế này:
```html
<table>
    <component-name></component-name>
</table>
```

Và kết quả trả về sẽ là lỗi, do khi render, nó sẽ hiểu component của bạn là nội dung không hợp lệ (vì bên trong **<table>** bắt buộc phải là **<tr>**)
    
Để giải quyết vấn đề này, Vue cung cấp cho chúng ta một thuộc tính đặc biệt, đó là `is`. Khi này, component được sử dụng như một thuộc tính, chứ không phải là một thẻ HTML như trên nữa.
```html
<table> 
    <tr is="component-name"></tr>
    <!-- nó đòi <tr> thì mình cho <tr> vào thôi -->
</table>
```

Ngoài ra, nếu bạn không muốn sử dụng `is` thì vẫn còn những cách khác. Khi sử dụng những string templates từ một trong những nguồn sau thì sẽ không gặp phải vấn đề này nữa (những cách dưới đây mình sẽ đề cập đến trong một bài viết khác nhé, tạm thời bạn cứ dùng `is` đi đã)
- **String templates** (e.g. template: '...')
- **Single-file components** (Component.vue)
- **Sử dụng X-template**.
    ```html
    <script type="text/x-template">
    ```
    
# Lời kết:
Trong bài viết này mình đã đưa ra những thông tin cơ bản nhất về Vue Component. Rất mong những thông tin này sẽ có ích đối với các bạn, nếu trong bài viết có vấn đề gì, mong các bạn sẽ góp ý để mình ngày một hoàn thiện hơn.

Trong bài viết tiếp theo, mình sẽ tiếp tục trình bày về Prop, Event, Async Component. Các bạn cùng đón đọc nhé!

# Tài liệu tham khảo:
https://vuejs.org/v2/guide/components.html

https://toidicode.com/component-trong-vue-js-325.html