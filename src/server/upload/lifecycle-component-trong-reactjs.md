![](https://images.viblo.asia/2d435ba1-cad4-43f8-b21b-404070bb0e7c.png)
# 1. Lời giới thiệu
Xin chào anh em, lâu lâu mình lại viết bài chia sẻ kiến thức mà mình đã tìm hiểu được. Thì hôm nay mình xin được viết về **Vòng đời của component** trong ReactJS. Như các bạn biết đấy khi ta học về một công nghệ mới nào đó thì chúng ta cần tập trung hiểu cái chủ đạo trong công nghệ đó. Vì thế nếu như để nói về ReactJS thì chúng ta sẽ thấy rằng `component` là thành phần quan trọng, và có rất nhiều thứ xoay quanh về nó. Chính vì để tìm hiểu kỹ hơn một chút ngoài `state, props,...` liên quan đến component thì chúng ta cũng nên tìm hiểu một chút về những phương thức lifecycle trong React. Đây chính là hình ảnh mình họa cho vòng đời của compponent trong React.
![](https://images.viblo.asia/c3c37d71-9a8f-4250-b7a3-d01cb1cc525e.png)

Nhìn vào hình ảnh trên thì có 3 phần chính chúng ta sẽ tìm hiểu đó chính là 
* Mounting
* Updation
* Unmounting
# 2. Mounting
Rồi đầu tiên mình trả từ điển nghĩa của từ `Mounting` đó là `something on which something else is or can be attached` :))). Chắc hẳn các bạn cũng biết khái niệm **hook** rồi đúng không - tức là cho phép người dùng can thiệp vào quá trình cập nhật UI với những thay đổi của state hoặc props.

Các bạn nhìn cột Mounting có 3 phướng thức lifecycle đó là
* componentWillMount()
* render()
* componentDidMount()

Như các bạn thấy đấy khi chúng ta refresh lại trang web hoặc mới truy cập thì 3 method lifecycle này sẽ lần lượt chạy. Một khi mà component được render trong lần đầu tiên thì phương thức `componentWillMount` sẽ được gọi trước khi render. Chúng mình có thể hiểu như này, trước khi compont vô DOM bằng hàm render() thì hàm `componentWillMount()` sẽ được gọi. Chú ý chúng ta không nên gọi hàm `setStae()` trong hàm `componentWillMount()` vì nó chưa có DOM nào để tương tác.


`componentDidMount` sẽ được gọi sau khi render component, ở đây cũng là nơi thực hiện các hàm AJAX, axios request, DOM hay update state sẽ được thực thi tại đây. Phương thức này cũng được kết nối với các Framwork khác hay database. Chúng mình sẽ đặt hàm `setState()` ở đây để tương tác vì Component đã được vô DOM.

Ví dụ
```Javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Demo extends Component {
    constructor(props) {
         super(props);
         // Don't do this!
         this.state = { color: 'green' };
    }
    componentWillMount() {
      console.log("componentWillMount da chay")
    }

    componentDidMount() {
        console.log("componentDidMount da chay")
    }
    
    render() {
        console.log("Ham render da duoc chay");
        return (
           <div>
              <button onClick={() =>  this.setState({color : 'aaaaa'})}>Submit</button>
                <p>{this.state.color}</p>
            </div> 

        )
    }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Demo></Demo>
        <p className="App-intro">
          
        </p>
      </div>
    );
  }
}

export default App;

```
Chúng ta npm start và bật F12 lên và chúng ta được kết quả như sau
![](https://images.viblo.asia/f47a7b2a-b3a2-4d19-bfc6-695b4bbd9244.png)

Vậy chúng mình có thể kết luận được khi mà Component được khởi tạo thì React sẽ follow theo trình tự như sau :
* Khởi tạo class đã kế thừa từ Component
* Khởi tạo giá trị mặc định cho Props
* Khởi tạo giá trị mặc định cho State
* Gọi hàm componentWillMount()
* Gọi hàm render()
* Gọi hàm componentDidMount()
# 2.Updation
## 2.1.Props && State
![](https://images.viblo.asia/c12d8ba3-c791-465a-94dc-53c2fae90089.png)
Chúng mình sẽ đi tìm hiểu từng method một nhé
* `componentWillReceiveProps()`: Chạy khi component con nhận props từ component cha. Sau khi nhận được props mới từ component cha rồi có thì component con có thể set lại state.
* `shouldComponentUpdate()`: Hàm này có thể nói là nó tăng hiệu năng của React lên. Nếu như return `false` thì các phương thực `componentWillUpdate, render, componentDidUpdate` sẽ không được chạy nữa(vì mặc định nó return về true để chạy được 3 hàm tiếp theo, nhiều trường hợp mình không cần chạy 3 hàm tiếp theo).
* `componentWillUpdate()`: Hàm này cũng giống như hàm `componentWillMount()` trước khi re-render ra Component. Nhưng chúng mình hầu hết không tương tác gì nhiều lắm trong hàm này, hàm `setState` hầu hết chúng mình sẽ sủ dụng trong hàm `componentWillReceiveProps` 
* `componentDidUpdate()`: hàm này được gọi đến sau khi đã re-render lại hay React đã cập nhật lại UI, nếu mà chúng ta muốn chạy animation thì đây chính là lúc chúng ta nên gọi trong hàm này.
* 
Mình lấy một ví dụ nhé, ví dụ dưới đây sẽ thêm mới một phần tử vào trong danh sách Note để. Component cha là ListNote, component con là Note. Các bạn chỉ cần focus vào nhứng thứ sau:
* Trong component `ListForm` khi chúng ta ấn Submit để thêm một phần tử vào danh sách thì sau khi cập nhật lại Component thì chúng ta sẽ render 1 Note có truyền những props. Các bạn chú ý trong hàm `getData()`.
* Trong component Note có component `componentWillReceiveProps()` để hiện ra thông báo là vừa nhận được props từ cha.

listNote.js
```Javascript
import React from 'react';
import Note from './Note.js';
import FormNote from './FormNote.js';
import { firebaseConnect } from '../firebaseConnect.js';
import { connect } from 'react-redux';
import store from '../store.js';

class listNote extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
		this.getData = this.getData.bind(this);
	}

	componentWillMount() {
		let current = this;
		firebaseConnect.on('value', function (notes) {
			const arrData = [];
			notes.forEach( (element) => {
				const id = element.key;
				const title = element.val().title;
				const content = element.val().content;
				arrData.push({
					id:id,
					title:title,
					content:content
				});
			});
			//console.log(arrData);
			current.setState({
				data: arrData
			});
			//console.log(current.state.data);
		});
	}

	getData () {
		console.log(this.state.data);
		return this.state.data.map(function(value, key) {
			return <Note
					key={key}
					title={value.title}
					content={value.content}
					note={value} 
					/>
		});
	}

	showForm () {
		if (this.props.isEdit) {
			return <FormNote />
		}
	}

	showFormAddData () {
		if (this.props.isAdd) {
			return <FormNote />
		}
	}
	render() {
		return (
			<div className="row">
		        <div className="col-8">
		        	{ this.getData() }
		        </div>
		        <div className="col-4">
		        	{ this.showForm() }
		        	{ this.showFormAddData() }
		        </div>
		    </div>
		);
	}
}

const mapPropsToState = (state, ownProps) => {
	return {
		isEdit: state.isEdit,
		isAdd: state.isAdd
	}
}

const mapDispatchToState = (dispatch, ownProps) => {
	return {
		changeEditStatus: () => {
			dispatch({type:"CHANGE_EDIT_STATUS"});
		}
	}
}
export default connect(mapPropsToState, mapDispatchToState)(listNote);

```
file Note.js
```Javascript
import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';

class Note extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		console.log("Component con da nhan duoc props tu component cha");
	}
	twoAction () {
		this.props.changeEditStatus();
		this.props.changeEditItem(this.props.note);
	}

	deleteDataItem () {
		if (window.confirm("Are you sure delete item") == true) {
			this.props.deleteItemFunc(this.props.note); 
		};
		
	}
	render() {
		return (
			<div className="row">
				<div className="col-8">
					Title: { this.props.title }
					<br/>
					Noi dung: { this.props.content }
				</div>
				<div col-4>
					<button onClick={() => this.twoAction()}>Edit</button>
					<button onClick={() => this.deleteDataItem()}>Delete</button>
				</div>	
			</div>
		);
	}
}

const mapPropsToState = (state, ownProps) => {
	return {

	}
}

const mapDispatchToState = (dispatch, ownProps) => {
	return {
		changeEditStatus: () => {
			dispatch({type: "CHANGE_EDIT_STATUS"});
		},
		changeEditItem: (editItem) => {
			dispatch({type:"EDIT_ITEM", editItem});
		},
		deleteItemFunc: (deleteItem) => {
			dispatch({type: "DELETE_ITEM", deleteItem});
		}
	}
}
export default connect(mapPropsToState, mapDispatchToState)(Note);
```
Demo:
![](https://images.viblo.asia/669e33ac-89da-4fd9-ab8d-3ebe6532e4b8.gif)

Tương tự khi State thay đổi:
* Cập nhật giá trị cho state
* Gọi hàm shouldComponentUpdate()
* Gọi hàm componentWillUpdate() – với điều kiện hàm trên return true
* Gọi hàm render()
* Gọi hàm componentDidUpdate()
# 3.Unmount
Quá trình unmounting xảy ra khi component bị remove khỏi DOM, hay nói một cách khác là hàm `componentWillUnmount` sẽ được gọi khi render ra không có component nào hoặc người dùng chuyển hướng trang web.
## Chú ý
Các bạn chú ý rằng khi khởi tạo Component chúng ta chỉ khởi tạo this.state đúng một lần. Mọi hành động làm thay đổi state trong nội tại của component đều phải sử dụng hàm `setState`, và bạn cần nên nhớ rằng hàm `setState` là hàm asyn nên sau khi chúng ta `setState` xong mà chúng ta truy cập ngay vào state vd như chúng ta in ra state vừa mới được set xong thì chúng ta sẽ không nhận được giá trị vừa mới set.
# 4.Kết luận
Vậy qua những phần kiến thức mình tím hiểu được và chia sẻ cho các bạn ở trên, mong rằng các bạn cũng mường tượng và có thể hiểu thêm được về vòng đời của Component. Cảm ơn các bạn đã đọc bài chia sẻ của mình.
# 5.Tham khảo
https://reactjs.org/docs/state-and-lifecycle.html

https://luubinhan.github.io/blog/2017-10-20-react-lifecycle-la-gi/