Đối với dự án Backbone.js mà tôi đang làm việc, tôi cần triển khai một mô hình trong đó lưu yêu cầu vào chương trình phụ trợ 1 cách tuần tự. Điều này có thể cần thiết hoặc hữu ích vì những lý do sau:
1. State và thứ tự ưu tiên: 

    Giả sử ứng dụng phía máy khách trong đó người dùng thực hiện hai hành động gửi hai yêu cầu Ajax. Yêu cầu A thêm một mục và yêu cầu B loại bỏ mục đó. Do tính chất không đồng bộ của nó, có thể yêu cầu B được xử lý trước khi yêu cầu A kết thúc, bởi vì yêu cầu A mất nhiều thời gian hơn vì bất kỳ lý do nào, mặc dù nó được gửi trước tiên. Yêu cầu B sẽ dẫn đến lỗi và dẫn đến hành vi không mong muốn trong giao diện người dùng. Trong trường hợp này, bạn cần đảm bảo rằng yêu cầu A được hoàn tất trước khi yêu cầu B được gửi và cập nhật chế độ xem của bạn cho phù hợp.
    
2. Đồng bộ dữ liệu:
    Đôi khi bạn không cần nhiều yêu cầu song song. Ví dụ, nếu bạn có các tệp được tải lên và đọc từng file một, nhưng bạn muốn xếp hàng các request này trước khi chúng được gửi đến server
 
3. Server Loading:
    Đây không phải là mối quan tâm chính của bạn khi bạn triển khai một cái gì đó như thế này, nhưng có những tình huống mà các yêu cầu song song có thể gây bất lợi cho hiệu suất, như tải lên nhiều hình ảnh có độ phân giải cao và tạo hình thu nhỏ. Bạn sẽ muốn khắc phục phía máy chủ này, nhưng có thể hữu ích khi xem xét các tác động của phía máy khách.

Dưới đây là đoạn code mà t muốn thực hiện viêc triển khai các chuỗi request :

```javascript
var ShoppingBasket = Backbone.Model.extend({

    url: '/your/api/url',

    isSaving: false,

    chain: [],

    initialize: function() {
        this.listenTo(this, 'sync', this.onAjaxComplete);
        this.listenTo(this, 'error', this.onAjaxComplete);
    },

    // override Backbone save method
    save: function(attributes, options) {
        if (!this.isSaving) {
            // no unfinished request, call "super" save method
            this.isSaving = true;
            Backbone.Model.prototype.save.apply(this, [attributes, options]);
        } else {
            // unfinished request, add changed attributes to chain
            this.chain.push([attributes, options]);
        }
    },

    callChain: function() {
        // remove first item from array and pass arguments to save method
        return this.chain.length ? this.save.apply(this, this.chain.shift()) : false;
    },

    onAjaxComplete: function() {
        this.isSaving = false;
        this.callChain();
    }

});
```

Lưu ý rằng trong ví dụ này, lỗi gọi lại không được triển khai và quan trọng hơn, hãy đảm bảo rằng các attributes không bị thay đổi trước khi được gửi tới máy chủ. Bạn có thể truyền trực tiếp các đối tượng trực tiếp, như shoppingBasket.save ({items: ...}) thay vì shoppingBasket.save (dữ liệu) hoặc sử dụng hàm _.clone () từ Underscore.js để sao chép đối tượng.

Mặc dù ví dụ ở trên rất cụ thể về Backbone, bạn có thể dễ dàng dịch mẫu này sang các tình huống khác nhau không liên quan đến Ajax, ví dụ như hoạt ảnh chuỗi. Miễn là bạn có một đối tượng theo dõi tất cả các cuộc gọi trong một mảng và lặp lại chúng từng cái một.