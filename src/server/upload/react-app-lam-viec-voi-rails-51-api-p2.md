## Thêm record mới

Tiếp theo chúng ta sẽ implement phần tạo mới các ideas.

Đầu tiên, hãy thêm một button để thêm mới idea.

Trong render function bên trong `IdeasContainer`, thêm vào đoạn sau:

```
<button className="newIdeaButton">
  New Idea
</button>
```

Bây giờ khi ấn vào button, chúng ta muốn sẽ có một ô tile mới hiện ra với một form để điền nội dung idea.

Khi chúng ta sửa nội dung form xong, ta sẽ muốn submit tới API để tạo ra một idea mới.

### API endpoint cho việc tạo mới idea

Hãy bắt đầu bằng việc tạo ra một API endpoint cho việc tạo mới idea trong `IdeasController`:


```
def create
  @idea = Idea.create(idea_params)
  render json: @idea
end

private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
```

  Do Rails sử dụng `strong parameters`, chúng ta đã định nghĩa private method `idea_params` để whitelist các params mà ta cần - `title` và `body`
  
  Bây giờ ta có một API endpoint mà ta có thể post các dữ liệu idea mới vào đó và tạo mới.
  
  Quay lại ứng dụng React của chúng ta, bây giờ hãy thêm  một click handler `addNewIdea` vào button `New Idea`.
  
  ```
  <button className="newIdeaButton"
  onClick={this.addNewIdea} >
  New Idea
</button>
```

Ta hãy định nghĩa `addNewIdea` là một function sử dụng axios để gọi một request POST tới API endpoint mà ta vừa tạo ở trên, tạm thời là với một idea rỗng, và hiện tại ta chỉ log lại response vào console:

```
addNewIdea = () => {
  axios.post(
    'http://localhost:3001/api/v1/ideas',
    { idea:
      {
        title: '',
        body: ''
      }
    }
  )
  .then(response => {
    console.log(response)
  })
  .catch(error => console.log(error))
}
```

Bây giờ nếu ta thử ấn vào button New Idea và em log ở browser ta sẽ thấy nội dung response trả về và trong data object có title và body rỗng.

Sau khi refresh lại trang, ta sẽ thấy một idea rỗng mới hiển thị của cuối của danh sách Idea.

![](https://images.viblo.asia/55cb5e85-2cc4-4668-94b0-baa99f0f50bc.png)

Điều mà chúng ta mong muốn đó là khi ta ấn vào button New idea, một idea sẽ được tạo ra ngay lập tức, và một form để điền nội dung idea đó hiển thị trên trang web.

Và ta cũng sử dụng logic và form này trong việc edit các idea sau đó trong tutorial.

Trước khi ta làm điều đó, trước tiên hãy đảo lại thứ tự hiển thị các idea từ mới đến cũ.

Ta chỉ cần sửa lại định nghĩa @ideas trong `IdeasController` như sau:

```
module Api::V1
  class IdeasController < ApplicationController
    def index
      @ideas = Idea.order("created_at DESC")
      render json: @ideas
    end
  end
end
```

Bây giờ ta tiếp tục với việc định nghĩa `addNewIdea`.

Đầu tiên, hãy sử dụng response từ request POST của chúng ta để update mảng các idea trong state, để sau khi chúng ta thêm mới idea, nó sẽ hiển thị ngay ở page.

Chúng ta có thể chỉ cần dùng `push` idea mứoi vào array do đây chỉ là một ứng dụng ví dụ, nhưng nó là một thực hành tốt nếu chúng ta sử dụng immutatble data.

Vì vậy, ta hãy sử dụng `immutablility-helper`, một package dành cho việc update dữ liệu mà không phải thay đổi nó một cách trực tiếp.

Cài đặt nó với npm:

```
npm install immutability-helper --save
```

Sau đó import function `update` bên trong `IdeasContainer`:

```
import update from 'immutability-helper'
```

Bây giờ hãy sử dụng nó bên trong `addNewIdea` để insert idea mới vào đầu của mảng của các ideas.

```
addNewIdea = () => {
  axios.post(
    'http://localhost:3001/api/v1/ideas',
    { idea:
      {
        title: '',
        body: ''
      }
    }
  )
  .then(response => {
    console.log(response)
    const ideas = update(this.state.ideas, {
      $splice: [[0, 0, response.data]]
    })
    this.setState({ideas: ideas})
  })
  .catch(error => console.log(error))
}
```

Chúng ta tạo ra một copy mới của `this.state.ideas` và sử dụng command `$splice` để thêm vào idea mới (trong `response.data`) ở vị trí đầu tiên của array.

Và tiếp theo chúng ta sử dụng ideas array mới này để update vào state sử dụng `setState`.

Bây giờ ta mở browser ra và ấn vào button New Idea, một tile trống sẽ được hiển thị ra.

### Chỉnh sửa Idea

Ta có thể tiếp tục với việc sửa idea.

Đầu tiên, chúng ta cần một state property mới tên là `editingIdeaId`, được dùng để theo dõi xem idea nào đang được chỉnh sửa.

Mặc định, ta không edit idea nào, vì vậy hãy khởi tạo editingIdeaId trong state với giá trị null.

```
this.state = {
  ideas: [],
  editingIdeaId: null
}
```