## Giới thiệu

Trong sự phát triển web hiện đại, việc cải thiện trải nghiệm người dùng và với React rất dễ dàng. Khái niệm autocomplete rất đơn giản. Đây là danh sách các đề xuất dựa trên đầu vào của người dùng. Sau đó, một người dùng có thể nhấn enter để hoàn thành từ của cụm từ. Nó tiết kiệm thời gian của người dùng. 

Autocomplete có thể được triển khai theo bất kỳ cách nào liên quan đến cách các đề xuất được lọc và trình bày cho người dùng. Nó thường được dùng khi xử lý với dữ liệu lớn mà không không thể đưa vào drop-down. Khi người dùng nhập, chúng sẽ lọc kết quả và chỉ hiển thị các đề xuất có chứa đầu vào của người dùng ở bất kỳ đâu trong đề xuất. Trong bài viết này, mình sẽ giới thiệu cách sử dụng react-autocomplete-input, bạn có thể vừa nhập text và search.

**Tính năng**
* Hỗ trợ cả bàn phím và chuột để lựa chọn tùy chọn.
* Hỗ trợ đáp ứng và hoạt động trên mọi thiết bị.
* Hỗ trợ cập nhật danh sách tùy chọn lazy-loading và dynamic.
* Hỗ trợ tất cả các trình duyệt chính bao gồm IE 8+.

## Cài đặt và sử dụng

Để cài đặt, bạn sử dụng lệnh: `npm i react-autocomplete-input`

### Cấu hình Props
Lưu ý: Tất cả các prop là tùy chọn.

**Component : string or func**

Giá trị mặc định:  "textarea" => Loại input field được sử dụng.

**defaultValue : string**

Giá trị mặc định: "" => Văn bản ban đầu cho đầu vào

**disabled : boolean**

Giá trị mặc định: false => Tắt widget, trong quá trình gửi form.

**maxOptions : number**

Giá trị mặc định: 6 => Xác định có bao nhiêu tùy chọn có thể được liệt kê đồng thời. Hiển thị tất cả các tùy chọn phù hợp nếu maxOptions bằng 0

**onRequestOptions : func**

Giá trị mặc định: () => {} 

Gọi lại để yêu cầu các tùy chọn mới để hỗ trợ lazy-loading. Nếu requestOnlyIfNoOptions là đúng, thì onRequestOptions chỉ được gọi nếu không có tùy chọn nào khả dụng. Mặt khác, onRequestOptions được gọi mỗi khi văn bản được thay đổi và trigger được tìm thấy.

**matchAny: boolean**

Giá trị mặc định: false => Nếu đúng, cũng sẽ phù hợp với các tùy chọn ở giữa từ này.

**offsetX: number**

Giá trị mặc định: 0 => Popup horizontal offset

**offsetY: number**

Giá trị mặc định: 0 => Popup vertical offset

**options : array**

Giá trị mặc định: [] => Danh sách các tùy chọn có sẵn cho autocomplete

**regex : string**

Giá trị mặc định: ^[a-zA-Z0-9_\-]+$ 

Biểu thức chính quy này kiểm tra nếu văn bản sau khi trigger có thể được autocompleted hay không.

**requestOnlyIfNoOptions : boolean**

Giá trị mặc định: true 

Nếu requestOnlyIfNoOptions là đúng, thì onRequestOptions chỉ được gọi nếu không có tùy chọn nào khả dụng. Mặt khác, onRequestOptions được gọi mỗi khi văn bản được thay đổi và trigger được tìm thấy.

**spaceRemovers : array**

Giá trị mặc định: [',', '.', '!', '?'] 

Theo mặc định, sau khi tùy chọn được chọn, nó được chèn với spacer. Nếu người dùng nhập một trong các ký tự từ mảng spaceRemovers, sau đó spacer được tự động loại bỏ.

**spacer : string**

Giá trị mặc định: ' ' => Ký tự được chèn cùng với tùy chọn đã chọn.

**trigger : string**

Giá trị mặc định: '@' 

Ký tự hoặc chuỗi, kích hoạt hiển thị danh sách tùy chọn autocompletion. Hãy nhớ rằng người dùng phải nhập ít nhất một ký tự phụ để cung cấp danh sách tùy chọn nếu sử dụng trigger trống.

**minChars: number**

Giá trị mặc định: 0 => Chỉ hiển thị danh sách tùy chọn tự động hoàn thành sau khi nhiều ký tự này được nhập sau ký tự trigger.

**value : string**

Giá trị mặc định: '' => Widget hỗ trợ cả hai tùy chọn: value và state. Nếu bạn vượt qua giá trị prop, bạn phải update nó thủ công mỗi khi có sự kiện onChange.

### Ví dụ

```
import TextInput from 'react-autocomplete-input';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    
    this.list_datas = [];

    this.state = {
      autocompleteData: [],
    };
  }

  componentDidMount() {
    API.ListData.getList((status, data) => this.handleDataResponse(status, data, "list_datas"))
  }

  handleDataResponse = (status, data, type) => {
    let arr = [];
    data.list_datas.map(obj => {
      arr.push({
        id: obj.id,
        name: obj.name
      });
    });

    this.list_datas = arr;
  }
  
  handleDataDeviceResponse = (status, data) => {
    if (!status) return;
    this.setState({
      autocompleteData: data.list_datas,
    })
  }

  handleChange = (event) => {
    let value = event;
    let array = [];
    this.list_datas.map((data) => {
      array.push(data.name);
    })

    this.setState({
      autocompleteData: array,
    });
  }

  render() {
    return (
      <div className="form-group">
        <TextInput
          value=""
          options={this.state.autocompleteData}
          onChange={this.handleChange}
          maxOptions={6}
        />
      </div>
    )
  }
}

```
## Kết luận
Bài viết trên mình đã giới thiệu và cách sử dụng react-autocomplete-input, nó giúp cho việc kết hợp nhập text và suggest data vào đoạn văn bản. Hy vọng bài viết của mình sẽ giúp được các bạn để có thể ứng dụng được vào project.

Tài liệu tham khảo:  https://www.npmjs.com/package/react-autocomplete-input