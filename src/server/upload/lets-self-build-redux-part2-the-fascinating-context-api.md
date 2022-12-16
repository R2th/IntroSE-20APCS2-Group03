# `Let's self build Redux`
Tiếp nối phần một, ta đã hiểu được cách một store được lưu trữ như thế nào. Tuy nhiên store hiện tại vẫn còn rất đơn giản và lưu trực tiếp vào global nên đi kèm với nhiều mối nguy hiểm khi React không thể phát hiện ra những thay đổi để cập nhật view cho đúng lúc. Hơn nữa, việc lưu store như vậy khiến dev phải tự handle từng bước cho bất kỳ một thay đổi nào của store. Cực kỳ mệt mỏi nếu như store scale tăng một cách nhanh chóng.
![](https://images.viblo.asia/e3239b00-67de-4b81-8c3f-4343fc33f7a2.png)
<Br/><Br/>
# `1. Create Reducer`
Redux ra đời mang theo một thuật ngữ mới REDUCER. Tên gọi reducer bắt nguồn từ chính function của nó sự dụng reduce - dịch nôm na chắc là sự giảm trừ ha!??
Bắt đầu tạo reducer đơn giản như sau:
```
const initalState = {
  notes: [],
}

const reducers = (state = initalState, action) => {
  switch (action.type) {
    case ADD_NOTE: return ({
      ...state,
      notes: [...state.notes, action.payload],
    })
    case RESET_NOTE: return initalState
    default: return state
  }
}
```
Khá là đơn giản, truyền vào reducer 2 tham số là state và action. Kết quả trả lại là một state object hoàn toàn mới. Bây giờ thử trải nghiệm với reducer vừa tạo:
```
const state1 = reducer(undefined, { type: ADD_NOTE, payload: 'hehe' }) // { notes: ['hehe'] }
const state2 = reducer(state1, { type: ADD_NOTE, payload: 'hihi' }) // { notes: ['hehe', 'hihi'] }
```
Tuyệt vời phải không. Trên thực tế, Redux thì không có tạo nhiều biến state 1 state 2 như vậy. Điểm thú vị ở dây là method reduce của array. Nếu coi như các actions kia là mỗi chuỗi các mệnh lệnh, thì reducer chính là người thực hiện các mệnh lênh đó theo thứ tự lần lượt theo thời gian. state sau sẽ dùng kết quả state trước.
```
const actions = [
  { type: ADD_NOTE, payload: 'hehe' },
  { type: ADD_NOTE, payload: 'hehadshe' },
]
const t = actions.reduce(reducer, undefined) // Kết quả mang lại hiệu quả tương tự { notes: ['hehe', 'hihi'] }
```
# `2. Create Store`
Tiến hành tạo store đẻ quản lý các state 
```
const createStore = (reducer) => {
  let state = undefined
  return {
    dispatch: (action) => { state = reducer(state, action) },
    getState: () => state,
  }
}

const store = createStore(reducer)
store.dispatch(addNote('hihi'))
console.log(store.getState())
```
Bây giờ ta đã có một store, thay đổi các dự liệu nhờ các actions. Nhưng điều quan trong lúc này là làm cách nào để thông báo cho các Component biết là các state này thay đổi. Việc này yêu cầu store phải thêm một subscribe method nữa
```
 subscribe: handler => {
      subscribers.push(handler);
      return () => {
        const index = subscribers.indexOf(handler);
        if (index > 0) {
          subscribers.splice(index, 1);
        }
      };
    }
``` 

Truyền store xuống TodoComponent và sử dụng chúng
```

class Todo extends React.Component {
  state = { notes: [], value: '' }

  componentWillMount() {
    this.unsubscribe = this.props.store.subscribe(this)
    this.setState(this.props.store.getState())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  addNote = () => {
    this.props.store.dispatch(addNote(this.state.value))
    this.setState(this.props.store.getState())
    this.setState({ value: '' })
  }

  textChange = (e) => {
    const value = e.target.value
    this.setState({ value })
  }

  render() {
    const { notes = [], value } = this.state
    return (
      <div className="list">
        <div className="control">
          <input className="input" value={value} onChange={this.textChange} />
          <button className="button" onClick={this.addNote}>Add note</button>
        </div>
        <ul>
          {notes.map((content) => <Note key={content}>{content}</Note>)}
        </ul>
      </div>
    )
  }
}
```

# `3.Provider and Connect`
Mọi thứ đang hoạt động khá hiệu quả, tuy nhiên vẫn còn một số điểm hạn chế như phải truyền store rất nhiều khi muốn một component chăt chút chít connect với store. Rất nhiếu code phải lặp lại khi muốn lấy một nội dung nào đó. React cung cấp một cơ chế là Context API. Vào thời điểm hiện tại, mặc dù React 16 đã ra và giới thiệu các hàm context api mới, nhưng để tập trung vào cách thức redux hoạt động, mình vẫn sẽ sử dụng các tính năng mà các bản React về trước.

```
class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return this.props.children
  }
}

Provider.childContextTypes = {
  store: PropTypes.object,
}

const connect = (
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({})
) => Component => {
  class Connected extends React.Component {
    componentWillMount() {
      const { store } = this.context;
      this.onStoreOrPropsChange(this.props);
      this.unsubscribe = store.subscribe(() => this.onStoreOrPropsChange(this.props));
    }
    componentWillReceiveProps(nextProps) {
      this.onStoreOrPropsChange(nextProps);
    }
    componentWillUnmount() {
      this.unsubscribe();
    }
    onStoreOrPropsChange(props) {
      const { store } = this.context;
      const state = store.getState();
      const stateProps = mapStateToProps(state, props);
      const dispatchProps = mapDispatchToProps(store.dispatch, props);
      this.setState({
        ...stateProps,
        ...dispatchProps,
      });
    }
    render() {
      return <Component {...this.props} {...this.state} dispatch={this.context.store.dispatch} />;
    }
  }

  Connected.contextTypes = {
    store: PropTypes.object
  };

  return Connected;
}

```

Hàm connect là một HOC, nó hỗ trợ việc nhận store từ context, chuyển các state trong store và dispatch action xuống component mong muốn.
> Trên đây là những gì cơ bản nhất mà Redux đã thực hiện. Hy vọng với bài viết này có thể giúp bạn hiểu được phần nào cơ chế hoạt động của chúng, làm sáng tỏ những điều magical khi sử dụng bấy lâu nay.

### `References`
1. https://zapier.com/engineering/how-to-build-redux/
1. https://antjanus.com/blog/web-development-tutorials/front-end-development/build-alterdux-redux-like-redux-compatible-library-scratch/