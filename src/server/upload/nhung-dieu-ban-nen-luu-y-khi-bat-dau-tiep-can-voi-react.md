React là một thư viện UI JavaScript mà Facebook dẫn đầu về phát triển và tiếp thị.
Nó rất phổ biến với các tính năng như cấu trúc component, quản lý DOM một cách tách biệt, render nhanh. Nhưng React cũng tuơng đối khó tiếp cận đối với các lậ trình viên front-end đã quen với việc xử lý trực tiếp DOM và làm việc với HTML.

Trong bài viết này, mình sẽ giải thích một vài điểm khó khăn cho các lập trình viên mới tiếp cận React với các ví dụ cụ thể.

# 1. Lỗi cú pháp của React API:
Các lập trình viên thường hay tạo ra một lỗi đánh máy trong các hàm liên quan tới vòng đời của component hoặc PropTypes.

React component có những methods có sẵn ngay khi component đưoc khởi tạo hay khi state có thay đổi.
* componentWillMount()
* componentDidMount()
* componentWillUnmount()
* componentWillReceiveProps()
* shouldComponentUpdate()
* componentWillUpdate()
* componentDidUpdate()
* render()
Các bạn có thể dễ dàng thấy tên của nhưng methods này khá là dài và rất dễ khiến bạn vướng vào một lỗi cú pháp đơn giản nhưng vô cùng khó chịu.
Hãy xem ví dụ sau
```
import { Component } from 'react';

class SyncReaderFollows extends Component {
    check() {
        if ( this.props.shouldSync ) {
            this.props.requestFollows();
        }
    }
 
    componentDidMount() {
        this.check();
    }
 
    componentDidUpate() {
        this.check();
    }
 
    render() {
        return null;
    }
}
```
Lập trình viên đã dự định gọi check () trong componentDidUpdate sau khi state đã thay đổi, nhưng nó không được gọi vì lỗi cú pháp componentDidUpate.
# 2 Giá trị trả về trong render() bị sai
Chức năng render của React trả về một "cây" DOM (phần tử React) để hiển thị trong UI. Khi không có thông tin để hiển thị, nó có thể trả về null hoặc false. Lỗi sẽ xảy ra nếu bất kỳ giá trị khác được trả lại.
Hãy xem ví dụ sau
```
var React = require( 'react' );

module.exports = React.createClass( {
    render: function() {
        if ( ! this.props.site || ! this.props.plugin ) {
            return;
        }
        if ( this.props.site.canUpdateFiles &&
                ( ( this.props.site.plugin.update && ! this.props.site.plugin.update.recentlyUpdated ) || this.isUpdating() ) ) {
            if ( ! this.props.expanded ) {
                /* eslint-disable wpcalypso/jsx-gridicon-size */
                return <Gridicon icon="sync" size={ 20 } />;
                /* eslint-enable wpcalypso/jsx-gridicon-size */
            }
     
            return this.renderUpdate();
        }
        return null;
    }
} );
```
Lập trình viên sẽ kiểm tra props và return ngay lập tức vì không có gì để hiển thị.

Tuy nhiên, chức năng render của React chỉ có thể trả về phần tử React, null và false. Vì vậy, khi undefined được trả về, một ngoại lệ sẽ được đưa ra và các phương thức lifecycle đáng ra sẽ được thực hiện sau khi render sẽ không được gọi.

Điều này rất dễ gây nhầm lẫn, phải không?

# 3 Các hàm xử lý sự kiện không đúng
Hàm xử lý sự kiện trong React phải là một hàm đối tượng, tuy nhiên đôi khi các lập trình viên lại làm sai đi. 
Hãy xem ví dụ sau
```
import React, { Component } from 'react';

const EditUserForm = React.createClass( {
    recordFieldFocus( fieldId ) {
        analytics.ga.recordEvent( 'People', 'Focused on field on User Edit', 'Field', fieldId );
    },

    handleChange( event ) {
        this.setState( {
            [ event.target.name ]: event.target.value
        } );
    },

    renderField( fieldId ) {
        let returnField = null;
        switch ( fieldId ) {
            case 'roles':
                returnField = (
                    <RoleSelect
                        id="roles"
                        name="roles"
                        key="roles"
                        siteId={ this.props.siteId }
                        value={ this.state.roles }
                        onChange={ this.handleChange }
                        onFocus={ this.recordFieldFocus( 'roles' ) }
                    />
                );
                break;
        }
    }
} );
```

Bạn cần gán một hàm cho trình xử lý sự kiện onFocus.
Nhưng kết quả của việc gọi recordFieldFocus () không có câu lệnh return sẽ trở thành undefined. Do đó, hàm xử lý sự kiện không được chỉ định chính xác và Google Analytics sẽ không bắt đựoc sự kiện Focus.

Trong trường hợp này, bạn có thể khắc phục lỗi như sau:
```
onFocus={ () => this.recordFieldFocus( 'roles' ) }
```
# 4 Props trong DOM không đúng
React's DOM sử dụng quy chuẩn camelCased để đặt tên cho các prop và thuộc tính của nó trong DOM.
Có 2 ví dụ tiêu biểu như sau
* React yêu cầu bạn sử dung className để định nghĩa cho class css cho các thành phần.
* Xự kiện nhấn chuột trong React được định nghĩa là onClick chứ không phải là onclick. Nó dường như đặc biệt khó hiểu đối với những người quen thuộc với HTML không phân biệt chữ hoa chữ thường.
Hãy xem ví dụ sau
```
import React, { PropTypes } from 'react';

export default React.createClass( {
    getImportError: function() {
        return this.translate(
            '%(errorDescription)sTry again or contact support.', {
                args: {
                    errorDescription: this.props.description
                },
                components: {
                    a: <a href="#" onclick={ this.retryImport }/>,
                    br: <br />,
                    cs: <a href="#" onclick={ this.contactSupport } />
                }
            }
        );
    }
} );
```
Trong đoạn code trên, hàm xử lý sự kiện click sẽ không được thực thi.

# 5 Sử dụng giá trị trực tiếp đựơc trả về từ render
Bạn có thể sử dụng ReactComponent được trả về bởi hàm ReactDOM.render.

Điều này không được khuyến khích vì render có thể xảy ra không đồng bộ trong phiên bản tương lai của React và đối tượng ReactComponent có thể không có sẵn dưới dạng giá trị trả về.

Hãy xem ví dụ sau
```
import ReactDOM from 'react-dom';

let appInstance;

async function onLocationChange(location, action) {
    appInstance = ReactDOM.render(
      <App context={context}>{route.component}</App>,
      container,
      () => onRenderComplete(route, location),
    );
}

if (appInstance) {
  // Force-update the whole tree, including components that refuse to update
  deepForceUpdate(appInstance);
}
```

Trong trường hợp này bạn cần lấy giá trị thông qua hàm callback ref

```
function cb(instance) {
}

async function onLocationChange(location, action) {
    ReactDOM.render(
      <App context={context} ref={cb}>{route.component}</App>,
      container,
      () => onRenderComplete(route, location),
    );
}
```
# 6 JavaScript comment trong JSX
Trong JSX, các lập trình viên nên sử dụng các nhận xét JavaScript như // hoặc / * * /.

Nếu nhận xét được nhận dạng là văn bản của một thành phần, nó sẽ hiển thị trên màn hình trình duyệt. Một bình luận nên được đặt trong dấu ngoặc nhọn như {/ * * /}.

```
import React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
        <h2>Rating</h2>

        <Card>

          <Button onClick={ this._updateRatingToThree }>Update Rating to value 3</Button>

          //onUpdate should not be called for valueLink
          <h3>ValueLink</h3>

        </Card>

      </div>
    );
  }
});
```
Nếu bạn muốn viết comment như đoạn code trên, bạn nên sử dụng nó như sau
```
{/* onUpdate should not be called for valueLink */}
<h3>ValueLink</h3>
```
Trong trường hợp ngược lại, nếu bạn muốn sử dụng “//” như `<h3>// a is a double slash.</h3>` thì hãy dùng chúng dưới dạng sau `<h3>{"// is a double slash."}</h3>`

Bài viết lần này của mình tới đây là hết, mình sẽ tiếp tục chia sẻ những gì mình biết về React, hi vọng mọi người đón đọc. Nếu có bất cứ góp ý gì hãy comment bên dưới cho mình nhé.