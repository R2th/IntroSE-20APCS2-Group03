1 vài phương pháp để tăng hiệu năng cũng như levelup skill của developer trong Backbone JS
1. Định nghĩa các Class Method 1 cách đúng đắn

    Thông thường đây là cách các newbee BackboneJS sẽ thực hiện khi viết các function mới:
    ```javascript
    / anti-pattern
    var Car = Backbone.Model.extend({});
    Car.manufacturersByCountry = function(country) {
        // custom logic to query manufacturers
    }
    ```
    
    Ở đây, câu lệnh bổ sung là không cần thiết. Backbone chấp nhận các phương thức lớp làm đối số thứ hai khi mở rộng bất kỳ lớp nào của nó:
    ```javascript
    var Car = Backbone.Model.extend({
      // instance methods

    }, {
      // class methods

      manufacturersByCountry: function(country) {
        // custom logic to query manufacturers
      }
    });
    ```

2. Bảo toàn các tính năng khi override lại 1 Method

    Đôi khi bạn cần phải ghi đè lên một phương thức của BackBone, như fetch  hoặc initlize. Trong những trường hợp này, bạn thường muốn thực hiện các hành động của riêng bạn, trong khi vẫn duy trì cơ chế cơ bản của các phương thức Backbone nguyên gốc.

    Để thực hiện việc này, hãy gọi Backbone.View.prototype.initialize.call (điều này) sau mã tùy chỉnh của bạn:
    
    ```javascript
    var Car = Backbone.Model.extend({
        initialize: function() {
          Backbone.View.prototype.initialize.call(this);
        }
    })
    ```
    
3. Định nghĩa các private method đúng cách 

    Định nghĩa 1 method là private trong BackBone ,ta có thể thêm tiền tố _ ở trước tên function ,như ví dụ sau :
    ```javascript
    var Session = Backbone.Model.extend({
        _persistAuth: function() {
            // sensitive auth code
        }
    });

    module.exports = Session;
    ```
4. Tận dụng điểm mạnh của BackBoneJS

    Backbone là 1 framework làm việc tốt với việc quản lí các models and đồng bộ với các RESTful service, nhưng nó ko phải là 1 thư viện tốt với việc render lại view . Method .render() ko thực hiện việc render the vị trí cần đc update, nó đơn giản là render lại toàn bộ view.

    React lại thực hiện tốt tính năng mà BackBone còn thiếu ,đó là render view theo vị trí cần update.Việc kết hợp giữa BackBone và React có thể  cho phép bạn thực hiện tốt hơn về performance trong việc cấu trúc lại view ,và vẫn kế thừa đc các điểm mạnh của Backbone trong khía cạnh quản lý các models, đồng bộ hóa và routes vững chắc.

    ```javascript
    var UserView = Backbone.View.extend({
      render: function() {
        React.renderComponent(new UserComponent(), this.el);
        return this;
      }
    });
    ```
    
5. Sử dụng routes đúng cách
    
    Routes trong Backbone cho phép developer có thể định nghĩa các routes giống định dạng của Rails và bạn có thể  khai báo các route trong cùng 1 file gióng như ví dụ sau :

    ```javascript
    Routers.Boards = Backbone.Router.extend({
      routes: {
        "": "index",
        ":id/member": "member"
      },

      index: function(){
        // Check if OwnerBoardsIndex View exists in DOM, then destroy it
      },

      start: function(){
        Backbone.history.start();
      },

      member: function(id){
        // Check if OwnerBoardsIndex View exists in DOM, then destroy it
      }
    });
    ```