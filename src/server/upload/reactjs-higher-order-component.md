Một `higher-order component` hay HOC là một function đơn giản với đầu vào tham số là một React component và trả về một React component khác. Một HOC cho phép chúng ta wrap một component với một component khác. Đây cũng là một kỹ thuật tốt để sử dụng lại một chức năng thông qua React component.

Component cha có thể giữ state hoặc bao gồm chức năng nào đó và có thể truyền cho component con (có cách gọi khác là `incoming component` hoặc `composed component`) qua thuộc tính (props). Các composed component sẽ không cần biết bất cứ điều gì về việc thực thi của HOC, chúng chỉ cần quan tâm đến các props mà chúng được nhận. 

Chúng ta sẽ tạo một ví dụ nhỏ để hiểu rõ hơn như sau
```javascript
import { Component } from 'react'
import { render } from 'react-dom'
import fetch from 'isomorphic-fetch'
class PeopleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loaded: false,
            loading: false
        }
   }
   
   componentWillMount() {
        this.setState({loading:true})
        fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(obj => obj.results)
            .then(data => this.setState({
                 loaded: true,
                loading: false,
                data
        }))
    }
    
    render() {
        const { data, loading, loaded } = this.state
        return (loading) ?
            <div>Loading...</div> :
            <ol className="people-list">
                {data.map((person, i) => {
                    const {first, last} = person.name
                    return <li key={i}>{first} {last}</li>
            })}
            </ol>
        }

render(
    <PeopleList />,
    document.getElementById('react-container'))
 }
```

Như ví dụ trên, chúng ta sẽ tạo ra một component là `PeopleList` để get data, trong quá trình get data, chúng ta sẽ hiển thị một đoạn text là "Loading...".  Giả sử chúng ta có rất nhiều component cũng cần loading, vậy mỗi một component chúng ta sẽ đều phải handle loading như ví dụ trên. Để tối ưu và có thể sử dụng lại được chức năng `loading` này, ta nên sử dụng `higher-order component`. Ở đây mình sẽ tạo `higher-order component` có tên là `DataComponent`. 

Lúc này, component PeopleList sẽ đơn giản hơn
```javascript
const PeopleList = ({data}) =>
    <ol className="people-list">
        {data.results.map((person, i) => {
            const {first, last} = person.name
            return <li key={i}>{first} {last}</li>
        })}
    </ol>
```

Component ban đầu của chúng ta sẽ thành
```javascript
const RandomMeUsers = DataComponent(PeopleList, "https://randomuser.me/api/")
```

Phần quan trọng chính là DataComponent
```javascript
const DataComponent = (ComposedComponent, url) =>
    class DataComponent extends Component {
        constructor(props) {
            super(props)
            this.state = {
                data: [],
                loading: false,
                loaded: false
            }
    }
    componentWillMount() {
        this.setState({loading:true})
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                loaded: true,
                loading: false,
                data
               }))
    }
    render() {
        return (
            <div className="data-component">
                {(this.state.loading) ?
                <div>Loading...</div> :
                <ComposedComponent {...this.state} />}
               </div>
            )
    }
}

```

Như vậy, component RandomMeUsers sẽ load data từ randomuser.me. Việc handle data đã được đưa vào HOC và UI được handle bởi PeopleList component. HOC sẽ cung cấp state cho loading và cơ chế load data. Khi data đang được tải, HOC sẽ hiển thị một loading message. Khi data được tải xong, HOC sẽ mount PeopleList component và truyền data dưới dạng props của PeopleList.

Chú ý, DataComponent là một function. Mọi HOC đều  đều là function. Composed component là component mà bạn muốn wrap. HOC sẽ lưu trữ và quản lý state. Khi state change, Composed component sẽ được render và nhận data thông qua props của chúng.

DataComponent có thể được sử dụng để tạo bất cứ loại data component nào. Ví dụ sau sẽ cho thấy cách mà DataComponent được tái sử dụng
```javascript
import { render } from 'react-dom'
const CountryNames = ({data, selected=""}) =>
    <select className="people-list" defaultValue={selected}>
        {data.map(({name}, i) =>
            <option key={i} value={name}>{name}</option>
        )}
    </select>
const CountryDropDown = DataComponent(
    CountryNames,
    "https://restcountries.eu/rest/v1/all"
)
render(
    <CountryDropDown selected="United States" />,
    document.getElementById('react-container')
)

```
Các bạn có thấy đơn giản ko? :D Tuy nhiên đoạn code trên sẽ ko chạy được, bởi vì CountryDropDown component có một prop là selected và giá trị mặc định là "United States" nhưng chúng ta lại ko truyền props xuống cho chúng. Ta cần sửa lại như sau
```javascript
render() {
    return (
        <div className="data-component">
            {(this.state.loading) ?
                <div>Loading...</div> :
                <ComposedComponent {...this.state} {...this.props} />
            }
        </div>
    )
}
```

Như vậy HOC trên đã truyền cả state và props xuống cho composed component.

Higher-Order Component là một cách tối ưu để tái sử dụng một số tính năng và làm đơn giản đi việc quản lý state hoặc vòng đời của một component. Chúng cho phép chúng ta thiết kế và tạo ra nhiều stateless functional components, điều này khá tốt khi chúng ta xây dụng UI.

Hy vọng qua bài viết này, các bạn có thể hiểu được cách xây dựng và hoạt động của `Higher-Order Components` và có thể áp dụng chúng vào các project thực tế  :D

#### Cảm ơn các bạn đã đọc bài viết. Happy Coding!!!

#### Refs: http://shop.oreilly.com/product/0636920049579.do