Một thứ mà bạn thực sự cần biết khi bạn tiếp cận Vue.js lần đầu tiên là **Lifecycle Hooks.**
 ![](https://images.viblo.asia/67b97473-e92a-4ae1-b255-ebd441415846.jpg)
# The Vue instance
Cốt lõi của Vue.js là instance. Mỗi ứng dụng Vue được bắt đầu bằng cách tạo một đối tượng sẽ giúp bạn thực hiện những gì bạn mong muốn.
Ví dụ Vue chứa các tùy chọn khác nhau (1):  data, props, template, methods, computed, watchers, lifecycles and much more. Như vậy bạn có thể thấy instance chịu trách nhiệm cho những thứ khác nhau, ví dụ như giám sát dữ liệu, biên dịch mẫu, gắn instance vào DOM, cập nhật DOM khi dữ liệu thay đổi và các thứ khác. 

# The Vue lifecycle hooks
There are 11:
* beforeCreate
* create
* beforeMount
* mounted
* beforeUpdate
* updated
* activated
* deactivated
* beforeDestroy
* destroyed
* errorCaptured

Các hook beforeCreate, created, beforeMount, mount và errorCaptured sẽ được thực thi tự động, các hook khác sẽ được thực thi khi có điều gì đó xảy ra. 

## beforeCreate
Nó được gọi ngay sau khi instance đã được khởi tạo và trước khi tất cả các tùy chọn (1) được xử lý.

***Called during server-side rendering***

## created
Nó được gọi ngay sau khi instance đã được tạo và sau đó tất cả khi tất cả các tùy chọn (1) được thiết lập.

***Called during server-side rendering***

## beforeMount
Nó được gọi ngay trước khi quá trình gắn DOM bắt đầu.

***Called on the client-side***

## mounted
Nó được gọi khi instance đã được gắn và el (DOM) đã được thay thế.

***Called on the client-side***

## updated
Nó được gọi khi một số data thay đổi và DOM đã được re-render.

***Called on the client-side***

## activated
This Hook được sử dụng cho các thành phần <keep-life>, nó cho phép bạn biết khi nào một thành phần bên trong thẻ <keep-life> </ keep-life> được bật ON.

***Called on the client-side***
    
## deactivated
This Hook được sử dụng cho các thành phần <keep-life>, nó cho phép bạn biết khi nào một thành phần bên trong thẻ <keep-life> </ keep-life> được bật OFF.

***Called on the client-side***

* activated and deactivated Lifecycle Hooks
    
    Code HTML
    ```
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <div id="app">     
      <button @click="selectedComponent='component1'">Comp1</button>
      <button @click="selectedComponent='component2'">Comp2</button>
        <keep-alive>
          <component :is="selectedComponent"></component>
        </keep-alive>
    </div>
    ```
    Code JS
    ```
    Vue.component('component1', {
      data: function () {
        return {
          count: 0
        }
      },
      activated: function() {
        console.log("activated()")
      },
      deactivated: function() {
        console.log("deactivate()")
      },
      template: '<h3>Template 1</h3>'
    })
    Vue.component('component2', {
      data: function () {
        return {
          count: 0
        }
      },
      template: '<h3>Template 2</h3>'
    })
    new Vue({
      el: '#app',
      data: {
        selectedComponent: 'component2'
      },
    })
    ```

    Ở đây nếu bạn nhấp vào các nút, bạn sẽ có thể chuyển đổi thành phần và để xem khi nào các hook này được gọi.
    
   ![](https://images.viblo.asia/2accd9ef-9d7e-4e72-82da-1fb9c8cc5361.PNG)
    
## destroyed
Nó được gọi sau khi instance Vue bị hủy, điều này không có nghĩa là nó sẽ xóa tất cả ra khỏi DOM nhưng nó sẽ xóa tất cả logic của Java Script và instance đó sẽ không còn tồn tại nữa.
 
***Called on the client-side***
    
## errorCaptured
Nó được gọi bởi 1 companent cha để xử lý một lỗi từ component con. It is not accessible from the main instance but only from a component with children.
 
***Called on the client-side***


Bây giờ nếu bạn có những lifecycle này, bạn sẽ hiểu được cách thức và thời điểm chúng có thể hữu ích trong quá trình phát triển các dự án của bạn.