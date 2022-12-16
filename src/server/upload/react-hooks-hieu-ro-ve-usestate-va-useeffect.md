React Hooks được ra mắt từ phiên bản React 16.8 và đã nhanh chóng được sử dụng rộng rãi trong cộng đồng ReactJS. Reack Hooks cho phép chúng ta sử dụng state, lifecycle methods, và những feactures khác mà không cần sử dụng classes như trước đây, thay vào đó, chúng ta sẽ sử dụng các funtional compnents. Để biết thêm về lý do cũng như các cách thức sử dụng React Hooks, các bạn có thể tìm hiểu [tại đây](https://reactjs.org/docs/hooks-intro.html). Đối với các phiên bản React trước đây, class có 2 ưu điểm đặc trưng so với cách sử dụng function, đó là :
1. State Manaments
2. Lifcycle Methods

![](https://images.viblo.asia/2752c71d-7b1f-467b-a858-bfaa241c4907.png)

Trong bài viết này, chúng ta sẽ cùng tìm hiểu 2 điều trên đã được tích hợp vào Hooks như thế nào nhé. Bắt đầu thôi !

## State Management

Trước hết hãy cùng đi qua ví dụ nho nhỏ sau đây :
![](https://images.viblo.asia/b5e9ba1c-45b8-4281-bd79-aa4b11d22d40.gif)

Trong ví dụ trên, component của chúng ta có một select button với các options từ 1-5. Nếu một option được chọn, một đoạn text ngắn tương ứng với các option sẽ được hiển thị. Bây giờ hãy cùng tìm hiểu đoạn code của ví dụ trên:

```javascript
import React from 'react';
import './App.css';
import CharacterInfoPage from './CharacterInfoPage'

class App extends React.Component {
  state = {
    characterChoiceNumbers: [1,2,3,4,5],
    chosenChoiceNumber: 1
  }

  handleChoiceChange = (newNumber) => {
    this.setState({
      chosenChoiceNumber: newNumber
    })
  }

  render(){
    return(
      <div>
        <select onChange={(e)=> this.handleChoiceChange(e.target.value)}>
          {
            this.state.characterChoiceNumbers.map(choice => <option key={choice}>{choice}</option>)
          }
        </select>
        <CharacterInfoPage chosenChoiceNumber={this.state.chosenChoiceNumber}/>
      </div>
    )
  }
}


export default App;
```

Như các bạn đã thấy, đoạn code này sử dụng class components truyền thống. Cách sử dụng này sẽ được chuyển sang funtional component với Hooks như sau: 

```javascript
import React, {useState} from 'react';
import './App.css';
import CharacterInfoPage from './CharacterInfoPage'

const App = () => {

  const [characterChoiceNumbers, setCharacterChoiceNumbers] = useState([1,2,3,4,5])
  const [chosenChoiceNumber, setChosenChoiceNumber] = useState(1)

  const handleChoiceChange = (newNumber) => {
    setChosenChoiceNumber(newNumber)
  }
  return(
    <div>
      <select onChange={(e)=> handleChoiceChange(e.target.value)}>
        {
          characterChoiceNumbers.map(choice => <option key={choice}>{choice}</option>)
        }
      </select>
      <CharacterInfoPage chosenChoiceNumber={chosenChoiceNumber}/>
    </div>
  )
  
}

export default App;
```

Nhìn kĩ vào 2 đoạn code trên và so sánh thì chúng ta có thể nhìn thấy một số thay đổi nhỏ, đó là đoạn code thứ 2 có import và sử dụng **useState** từ React/

## useState()

Với useState(), chúng ta có thể truyền initial state (state khởi tạo) làm tham số, ở đây là mảng `[1,2,3,4,5]`. Hàm useState() sẽ trả về một mảng với 2 phẩn tử, đó là `[characterChoiceNumbers, setCharacterChoiceNumbers]`. Phần tử đầu tiên là state hiện tại, phần tử thứ 2 là hàm set state cho state này, tương tự với  hàm `setState()` trong class component. State của component sẽ được đọc bởi phần tử thứ nhất và được thay đổi bởi phần tử thứ 2.

Tuy nhiên, useState lại có cách hoạt động khác so với `state` và `setState` của class-based components. Khi sử dụng hàm set state của React Hooks, ở đây là `setCharacterChoiceNumbers`, state cũ sẽ được thay thế hoàn toàn. Như vậy, nếu có nhiều phần của state, tốt hơn hết chúng ta nên gọi `useState()` nhiều lần để các state được độc lập với nhau và tránh conflict không mong muốn, nếu không thì mỗi lần gọi hàm set state là chúng ta sẽ vô cùng bối rối đó :grinning:. Như ở ví dụ trên thì mình đã sử dụng `useState()` 2 lần, một lần cho state `characterChoiceNumbers`, một lần cho state `chosenChoiceNumber`, thay vì gộp hai state này vào và chỉ sử dụng `useState` một lần.

Lưu ý rằng, tham số của `useState` không cần là một object, nó có thể là String, Intenger hoặc một array như ví dụ trên đây.

## Lifecycle Methods
Bây giờ hãy xem đoạn code của một class khác nhé: `CharacterInfoPage`

```javascript
import React, { Component } from 'react'

export default class CharacterInfoPage extends Component {
    state = {
        characterObject: {}
    }

    componentDidMount(){
        fetch(`https://swapi.co/api/people/${this.props.chosenChoiceNumber}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                characterObject: data
            })
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.chosenChoiceNumber !== this.props.chosenChoiceNumber){
            fetch(`https://swapi.co/api/people/${this.props.chosenChoiceNumber}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    characterObject: data
                })
            })
        }
    }
    render() {
        return (
            <div>
                {
                    Object.keys(this.state.characterObject).length !== 0 ? 
                    <div>
                        <h1>{this.state.characterObject.name}</h1>
                    </div>
                    :
                    <h1>Loading</h1>
                }
            </div>
        )
    }
}
```

Chúng ta bắt gặp trong class này những methods sau: `componentDidMount` và `componentDidUpdate`. Như đã được đề cập ở component `App` ở trên, `CharacterInfoPage` có props `chosenChoiceNumber`. Mỗi khi giá trị của prop này có thay đổi, component sẽ fetch API để thay đổi state của nó (tức là component `CharacterInfoPage`) , điều này được thể hiện qua 2 methods đó là `componentDidMount` và `componentDidUpdate`. Bây giờ hãy cùng chuyển đoạn code trên sang ReactHooks nhé:

```javascript
import React, { useState, useEffect } from 'react'

const CharacterInfoPage = (props) => {
    const [characterObject, setCharacterObject] = useState({})
    
    //componendDidMount equivalent
    useEffect(() => {
        fetch(`https://swapi.co/api/people/${props.chosenChoiceNumber}`)
        .then(resp => resp.json())
        .then(data => {
            setCharacterObject(data)
        })
    }, [])
    
    //componentDidUpdate equivalent
    useEffect(() => {
        fetch(`https://swapi.co/api/people/${props.chosenChoiceNumber}`)
        .then(resp => resp.json())
        .then(data => {
            setCharacterObject(data)
        })
    }, [props.chosenChoiceNumber])
    return (
        <div>
            {
                Object.keys(characterObject).length !== 0 ? 
                <div>
                    <h1>{characterObject.name}</h1>
                </div>
                :
                <h1>Loading</h1>
            }
        </div>
    )  
}
export default CharacterInfoPage
```

Với React Hooks, chúng ta có thể quản lý side effects  bằng method `useEffect`. Method `useEffect` nhận 2 tham số, một function và một array, và không return gì cả. Function được truyền vào (tham số thứ nhất) sẽ được thực hiện **sau mỗi render cycle**. Tuy nhiên, nếu không cẩn thận xử lý chúng thì chúng ta có thể rơi vào vòng lặp vô hạn (infinite loop). Mình lấy ví dụ nhé: trong lần load page đầu tiên, `useEffect` sẽ chạy và state được thay đổi dẫn đến component được render lại một lần nữa, và `useEffect` lại được thực thi tiếp. Cứ như vậy thì component sẽ render mãi mãi không bao giờ dừng lại, nguy hiểm phải không ?

Tuy nhiên, để giải quyết vấn đề này một cách hiệu quả, `useEffect` hook cần đến tham số thứ hai, một array. Tham số này sẽ chỉ định khi nào tham số thứ nhất (một function) được thực thi. `useEffect` chỉ chạy khi một trong số những giá trị trong array của tham số thứ hai này thay đổi.

### Sự tương đồng giữa useEffect và componentDidMount

Trong hàm `useEffect` đầu tiên, tham số thứ hai là một array rỗng, tức là không có phần tử nào. Theo định nghĩa thì `useEffect` sẽ được thực thì khi mà một trong những giá trị phần tử trong array này thay đổi. Nhưng vì tham số thứ hai là một array rỗng, do đó mà `useEffect` đầu tiên này sẽ không được gọi lại lần nữa.

### Sự tương đồng giữa useEffect và componentDidUpdate

Trong ví dụ mà mình đưa ra, và giá trị prop `chosenChoiceNumber` sẽ thay đổi khi người dùng click chọn một option khác của select box, chúng ta muốn một function được thực hiện mỗi khi giá trị này thay đổi. Trong `useEffect` thứ hai, array được truyền vào có chứa phần tử đó là `props.chosenChoiceNumber`. Trong trường hợp này, mỗi khi giá trị `props.chosenChoiceNumber`thay đổi, component sẽ thực hiện gọi API. Array của tham số thứ hai có thể có nhiều hơn một phần tử

## Kết luận

React Hooks từ khi được giới thiệu đã thể hiện được rất nhiều ưu điểm của nó. Tuy nhiên, để sử dụng một cách đúng và hiệu quả nhất, chúng ta nên có những quy tắc nhất định. Tuyệt đối không nên sử dụng Hooks bên trong vòng lặp, khối lệnh điều kiện, hoặc trong nested function. Nếu tuân theo quy tắc này, chúng ta có thể đảm bảo rằng Hooks được gọi theo đúng thứ tự mỗi lần render của component. Để biết rõ hơn, các bạn có thể tìm hiểu [những quy tắc của Hooks tại đây](https://reactjs.org/docs/hooks-rules.html).

Trên đây là những chia sẻ dựa trên hiểu biết của mình về React Hooks. Cảm ơn các bạn đã đọc bài viết của mình.

Tài liệu tham khảo :
https://reactjs.org/docs/hooks-intro.html

https://levelup.gitconnected.com/react-hooks-usestate-and-useeffect-2d0b870c654f