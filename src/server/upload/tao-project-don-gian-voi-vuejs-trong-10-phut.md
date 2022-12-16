# Giới thiệu
Với tốc độ phát triển web cực nhanh như ngày chúng ta có rất nhiều sự lựa chọn trong việc phát triển website nói chung và front-end nói riêng, Hệ sinh thái của Google (Angular) và Facebook (React) hiện nay đang rất được các  lập trình viên ưa chuộng.

![Người mới bắt đầu sẽ rất khó trong việc trong hướng đi mới](https://images.viblo.asia/1c9344ff-c0ad-4063-b4be-692715d13e75.png)

Nhưng trong đó, có một framework được dự đoán là sẽ thay thế cho React Và Angular trong tương lai không xa đó là `Vuejs`.
# Cài đặt Vuejs
Để hiểu nhưng gì mình viết dưới đây, các bạn chỉ cần biết HTML, CSS, Javascript ở mức độ cơ bản là cũng có thể hiểu được.
Có 2 cách để tạo 1 ứng dụng Vuejs đó là chèn trực tiếp thư viện Vue vào qua thẻ <script> và tạo project qua Vue-CLI.
Giới hạn bài viết này chỉ trong 10 phút nên mình chỉ hướng dẫn cho các bạn cách chèn trực tiếp thư Vue vào HTML, để tìm hiểu thêm mình sẽ để link tới tài liệu chính thức của Vue ở trang chủ.
Giống như việc sử dụng Jquery, mình sẽ làm điều tương tự với Vue đó là thêm thư viện vào file `index.html`:
    
```html
<!-- bản phát triển (development), bao gồm những cảnh báo hữu ích trong console -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- OR -->

<!-- bản production, được tối ưu về dung lượng và tốc độ -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```
Ta có thể tải trực tiếp file `vue.js` về hoặc sử dụng như CDN mà mình đã viết ở trên.
Rất đơn giản đúng không nào. 😁
# Tạo project tìm kiếm và lấy thông tin repositories Github
Vì là đơn giản nên mình sẽ viết tất cả các thành phần của trang web trong cùng file là file` index.html `.
Tạo 1 form đơn giản cho chúng ta nhập vào tìm kiếm.
```html
<div id="app">
    <input type="text" placeholder="Enter search here..." v-model="querySearch" v-on:keyup.enter="seach">
</div>
```
Khởi tạo đối tượng Vue để tương tác với DOM
```html
new Vue({
    el: '#app',
    data: {
        querySearch: '',
        listResponse: [],
    }
})
```
Thuộc tính `v-on` và `v-model`được gọi là  ***directive***. Một directive trong Vue được bắt đầu với v- để chỉ định rõ rằng đây là một thuộc tính riêng do Vue cung cấp, đồng thời thuộc tính này sẽ áp dụng một hành vi (behavior) đặc biệt lên kết quả DOM được render ra.    
* `v-model` để tạo ràng buộc dữ liệu 2 chiều lên các phần tử form input và textarea.
* `v-on` để lắng nghe các sự kiện DOM và thực thi JavaScript khi những sự kiện này được kích hoạt.
Sự kiện `keyup.enter` sinh ra khi chúng ta nhấn enter, đồng thời `v-model` rằng buộc lên `querySearch` 
Khởi tạo đối tượng methods để xử lý hàm khi người dùng gọi tới hàm `search()`.
```javascript
new Vue({
        el: '#app',
        data: {
            querySearch: '',
            listResponse: [],
        },
        methods: {
            seach() {
                fetch(`https://api.github.com/search/repositories?q=${this.querySearch}`)
                .then(response => response.json())
                .then(json => this.listResponse = json.items)
            }
        }
    })
```
Sử dụng `fetch` để tạo HTTP request call để lấy data từ github. 
Trả về kết quả dữ liệu được gán cho `listResponse` bây giờ thì chỉ cần in ra màn hình.
```html
<div id="app">
        <input type="text" placeholder="Enter search here..." v-model="querySearch" v-on:keyup.enter="seach">
        <ul>
            <li v-for="item in listResponse">
                <a v-bind:href="item.html_url"> {{ item.name }} - {{ item.description }}</a>
            </li>
        </ul>
    </div>
```
`v-for` để render một danh sách các item dựa trên một mảng.  Bên trong vòng lặp `v-for` chúng ta có toàn quyền truy xuất đến các thuộc tính của scope cha.
Gõ tìm kiếm vào input rồi nhấn enter. Show kết quả nào. 😁
![](https://images.viblo.asia/87dbc752-a25c-4ace-8487-c4c392825051.png)

# Tổng kết
Trên đây mình đã hướng cho nhưng bạn nào đang có ý định muốn học Vuejs và đang tìm hiểu về nó 1 cách khái quát. Chỉ trong 10 phút mình đã tạo được 1 project nhỏ với Vue rất nhanh đúng không😀
<br>
Github link: [https://github.com/hypnguyen1209/search-repository-github](https://github.com/hypnguyen1209/search-repository-github)
## Tham khảo:
[https://vi.vuejs.org/v2/guide/](https://vi.vuejs.org/v2/guide/)
<br>
[https://cli.vuejs.org/](https://cli.vuejs.org/)