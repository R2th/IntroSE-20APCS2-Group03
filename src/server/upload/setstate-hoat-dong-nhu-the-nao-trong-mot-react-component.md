Có thể, ngay khi đọc tiêu đề, bạn sẽ bối rối không hiểu một hàm setState() thông dụng, đơn giản thì có gì để phải đem ra bàn luận. Nhưng với một người mới bắt đầu làm việc cùng ReactJS, rất nhiều điều thú vị xung quanh hoạt động của nó.

## Giới thiệu qua về State.

Khi mới tiếp cận với ReactJS, hẳn là bạn sẽ tiếp cận với khái niệm `Component`. Một `Component` trong React có vòng đời 4 giai đoạn. ![Vòng đời của Component](https://cdn-images-1.medium.com/max/2000/1*sn-ftowp0_VVRbeUAFECMA.png). Ở giai đoạn `Initialization`, hành động được đề cập trong giai đoạn này là khởi tạo giá trị cho  `Props` và `State`. Có thể nói, cả hai chính là dữ liệu input của hàm `render()`. `State` được khởi tạo giá trị mặc định khi `Component` được mount, `State` là đầu vào có thể thay đổi được. Mỗi `Component` tự quản lý `State` của nó, không chia sẻ với các `Component` con, `State` là thuộc tính private trong mỗi Component.

Ví dụ khởi tạo `State`:
``` javascript
class Component extends React.Component
constructor(props) {
  super(props);
  
  this.state = {
    count: 0
  }
}
```
## Thay đổi giá trị của State
Để thay đổi giá trị của `State`, bạn không thể dùng phép gán để thay đổi giá trị cho nó, mà`State` trong mỗi Component được thay đổi thông qua hàm `setState`.
``` javascript
class Component extends React.Component
constructor(props) {
  super(props);
  
  this.state = {
    count: 0
  }
  
  incrementCount = () => {
      this.setState({
          count: this.state.count + 1
      })
  }
}
```

`State` sẽ có giá trị mới và component sẽ render lại.

Nếu chỉ có vậy, `setState()` thực sự quá đơn giản và chẳng có gì để bàn luận thêm cả. Tuy nhiên, mình thử 1 case như này:

``` javascript
incrementCount = () => {
  this.setState({
      count: this.state.count + 1
  })
  console.log(`Count: ${this.state.count}`)
}
```
Ngay sau khi mình thực hiện cập nhật giá trị mới cho state, mình thực hiện log ra giá trị của state `count`. Bạn thử đoán xem kết quả là bao nhiêu? (dx). Ban đầu mình cứ nghĩ, sau khi set state xong, kết quả nhận được sẽ là 
> => Count: 1
> 
Nhưng thật bất ngờ, thứ mình nhận được lại là:
> => Count: 0
> 
(confused) Một chút bối rối không hề nhẹ, sau khi set state, giá trị của state `count` không hề thay đổi.

Mình bắt đầu tìm hiểu nguyên nhân, và câu trả lời nhận được từ Google là: hàm `setState` hoạt động một cách bất đồng bộ, vì vậy sau khi gọi nó, state sẽ không thay đổi giá trị ngay lập tức.

## Tại sao React không cập nhật state một cách đồng bộ? 
React cố tình chờ khi tất cả `Component` gọi tới hàm `setState()` trước khi bắt đầu re-render, điều này làm tăng hiệu suất, tránh việc re-render không cần thiết. 

Trong thực tế, khi mình thực hiện việc `setState` bất đồng bộ, mình cũng rơi vào 1 case như này:
``` javascript
class ComponentA exends Component {
    
    state = {
        isLoading: true
    }
    
    componentDidMount() {
        this.handleFetchData()
    }
    
     componentDidUpdate(prevProps) {
        if (this.props.match.params.url !== prevProps.match.params.url) {
            this.handleFetchData()
        }
    }
    
    handleFetchData = () => {
        let url = this.props.match.params.url
        axios.get(url).then(response => {
                this.setState({isLoading: false)}
        }).catch(error)
    }
}
```

Đoạn code trên thực hiện việc gọi đến api và set `state` cho component mỗi khi có sự thay đổi của `params.url` . Vấn đề xảy đến ở đây là khi `axios` hoàn thành request và thực hiện `setState`, mà mình `Unmount` component đó. Vấn đề này sẽ dẫn đến việc memory bị leak, component bị `Unmount`, không được sử dụng mà việc thay đổi state vẫn tiếp tục thì không hợp lý cho lắm. 

Cách giải quyết cho vấn đề này là mình sẽ phải dừng những asynchronous task khi componet sắp bị `Unmount`:
``` javascript
class ComponentA exends Component {
    constructor(props) {
        super(props)
        this._isMounted = false
    }

     state = {
        isLoading: true
    }
     componentDidMount() {
        this._isMounted && this.handleFetchData()
    }
     componentDidUpdate(prevProps) {
        if (this.props.match.params.url !== prevProps.match.params.url) {
            this.handleFetchData()
        }
    }
     handleFetchData = () => {
        let url = this.props.match.params.url
        axios.get(url).then(response => {
                this._isMounted && this.setState({isLoading: false)}
        }).catch(error)
    }
    
    componentWillUnmount() {
        this._isMounted = false
    }
}
```


Có hai lý do chính để React không thay đổi ngay lập tức `state`:

- Nó sẽ phá vỡ sự nhất quán giữa `props` và `state`, gây ra những vấn đề khó để debug.
- Nó sẽ ảnh hưởng đến những tính năng mới mà React đang phát triển.

##  Tạm kết

Trên đây là một vài chia sẻ của mình về State, hy vọng bài viết sẽ giúp bạn hiểu thêm về cách hoạt động của `State`, giải pháp để tránh memory leak gây ra bởi  việc setState asynchronous của React.