1. Giới thiệu

    Trong bài viết về  Backbone.js này, chúng ta sẽ xem xét một số sai lầm phổ biến thường được các freelance thực hiện khi lần đầu tiên vào học Backbone.js và cách để tránh chúng.

2. Sai lầm 2: Sửa đổi DOM trực tiếp với các sự kiện.

    Khi mới bắt đầu tìm hiểu về BackBone ,phần lớn các dev sẽ thực thi việc thay đổi DOM ,sử dụng JQuery theo hướng tiện sử dụng và viết tắt như sau:
    
    ```javascript
    var AudioPlayerControls = Backbone.View.extend({
        events: {
            ‘click .btn-play, .btn-pause’: function(event) {
                $(event.target).toggleClass(‘btn-play btn-pause’)
            }
        },
        // ...
    })
    ```
    
    Để tránh những lỗi như thế này ,cta có thể sử lí code theo các hàm nhỏ ,rõ nghĩa hơn và được BackBone hỗ trợ nhiều như:
    
    ```javascript
    var AudioPlayerControls = Backbone.View.extend({
        events: {
            ‘click .btn-play, .btn-pause’: function(event) {
                this.model.set(‘playing’, !this.model.get(‘playing’))
            }
        },
        initialize: function() {
            this.listenTo(this.model, ‘change’, this.render)
            this.render()
        },
        // ...
    })
    ```
    
3. Sai lầm 3: sử lí sai với việc render view 

    Vì Backbone.js rất dễ dàng để render và tái render DOM theo ý muốn hoặc để đáp ứng với các sự kiện, chúng ta thường bỏ qua mức độ ảnh hưởng của hiệu ứng này đối với hiệu năng tổng thể của ứng dụng web. Có rất nhiều cách chúng ta có thể kết thúc bằng phương thức render trên các khung nhìn của chúng ta. Thường thì điều này có vẻ không nhiều, vì các trình duyệt web hiện đại đang trở thành những phần mềm có hiệu năng cao. Nhưng khi ứng dụng web phát triển và lượng dữ liệu mà ứng dụng đó phát triển, hiệu suất giảm càng ngày càng rõ ràng.
    ```javascript
        var AudioPlayerPlaylist = Backbone.View.extend({
        template: _.template(‘<ul> <% _.each(musics, function(m) { %> <li><%- m.title %></li> <% }) %> </ul>’),
        initialize: function() {
            this.listenTo(this.collection, ‘add’, this.render)
        },
        // ...
    })
    ```
    
4. Sai lầm: Lưu trữ dữ liệu trên Views thay cho việc giữ ở trong Models

    Một sai lầm mà chúng ta thường có thể thực hiện như một người mới bắt đầu học Backbone.js là lưu trữ dữ liệu trực tiếp trên view như các thuộc tính. Dữ liệu này có thể ở đó để theo dõi một số trạng thái hoặc một số lựa chọn của người dùng. Đây là điều cần tránh.
    
    ```javascript
    var AudioPlayerVisualizer = Backbone.View.extend({
        events: {
            ‘click .btn-color’: function(event) {
                this.colorHex = $(event.target).data(‘color-hex’)
                this.render()
            }
        },
        // ...
    })
    ```
    
    Bạn luôn có thể tạo một số model và collection. Lưu trữ chúng trong các model  cung cấp cho bạn lợi ích của việc có thể lắng nghe những thay đổi. Chế độ xem có liên quan hoặc thậm chí nhiều chế độ xem, có thể quan sát các mô hình này và tái xuất hiện khi cần thiết.
5. Sai lầm : Sử dụng jQuery “.on()” thay cho việc Delegated Events

    Backbone.js theo ý kiến của tôi có một cách tuyệt vời để xử lý các sự kiện DOM. Không sử dụng nó đặt ra một loạt các nhược điểm. Chức năng liên kết sự kiện “.on ()” của jQuery có thể cảm thấy thuận tiện, nhưng thường trở nên phức tạp về lâu dài. Ví dụ, khi các phần tử được tách ra khỏi DOM, jQuery sẽ tự động xóa tất cả các trình xử lý sự kiện được liên kết với các phần tử bằng cách sử dụng “.on ()”. Điều này có nghĩa là bất kỳ sự kiện DOM nào bạn cố ràng buộc từ bên trong một khung nhìn sẽ cần phải được phục hồi nếu bạn tách phần tử gốc khỏi DOM và gắn lại nó.
    ```javascript
    var AudioPlayerControls = Backbone.View.extend({
        events: {
            ‘click .btn-play, .btn-pause’: function() { /* ... */ },
            ‘click .btn-prev’: function() { /* ... */ },
            ‘click .btn-next’: function() { /* ... */ },
            ‘click .btn-shuffle’: function() { /* ... */ },
            ‘click .btn-repeat’: function() { /* ... */ }
        },
        // ...
    })
    ```
    Khi phần tử tương ứng với khung nhìn này được gắn lại với DOM, tất cả những gì bạn phải làm là gọi “delegateEvents ()” trên khung nhìn để ràng buộc tất cả các sự kiện này.
    Lưu ý rằng điều quan trọng là phải hiểu các sự kiện này bị ràng buộc như thế nào. Thay vì ràng buộc sự kiện trên các phần tử được chỉ định bởi bộ chọn, Backbone.js thực sự liên kết trình xử lý sự kiện với phần tử gốc của view. Điều này làm việc tốt trong hầu như tất cả các trường hợp, và trong thực tế hoạt động tốt hơn cho hầu hết các nhu cầu của chúng tôi. Thay đổi hoặc thay thế các phần tử con trong DOM của view không yêu cầu Backbone.js ràng buộc từng sự kiện một lần nữa trên các phần tử mới. Người nghe hiện tại chỉ tiếp tục làm việc.