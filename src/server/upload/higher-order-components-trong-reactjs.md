Hiện nay việc sử dụng ReactJs + Redux đang trở nên rất phổ biến, và khi làm việc với Redux có lẽ việc nghe đến khái niệm Higher Order Components hay nhìn thấy đoạn code như dưới đây là điều chắc hẳn đã xảy ra:
``` js 
import {withRouter} from 'react-router-dom';

@withRouter
export default class EgComponent extends React.Component {
}
```
```js
import {connect} from 'react-redux';
// code
export default connect(mapStateToProps, mapDispatchToProps)(EgComponent);
```
Trông vừa lạ vừa quen =)) Khi mới động vào chính mình cũng không hiểu `@withRouter` hay `connect` kia nhét vào một `component` của React có mục đích gì. 

Bài viết này của mình sẽ giải thích cho câu hỏi đó.

![](https://images.viblo.asia/d08aa39a-285d-483d-baf7-087b621aaf24.jpg)
# Higher Order Components (HOCs)
## Khái niệm
Cơ bản có thể hiểu, HOCs là một kỹ thuật nâng cao trong React để dựng lại các `component`, vì là kỹ thuật nên đương nhiên sẽ không nằm trong React API. Nó là một `pattern` tuyệt vời, được `implement` trong các component như một function (có thể thấy điều đó ở 2 ví dụ trên kia :v)

Cụ thể, HOCs là một `function`, nhận vào một `component` và trả về `component` mới:
```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

## Khởi tạo một HOC
Có 2 cách để khởi tạo một HOC:
1. Chuyển tiếp `Props` (Props Proxy):
``` js
function propsProxyHOC(WrappedComponent) {
    return class PropsProxy extends React.Component {
        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
}
```
Có thể thấy, HOC trả về một React Element với kiểu của component nhận vào và truyền theo props mà HOC nhận được.

2. Kế thừa ngược (Inheritance Inversion):
``` js
function inheritanceInversionHOC(WrappedComponent) {
    return class InheritanceInversion extends WrappedComponent {
        render() {
        return super.render()
      }
    }
}
```
Ở đây, HOC trả về một `class` kế thừa ngược lại chính `component` mà HOC nhận được thay vì mở rộng nó. 

-----


Mỗi cách sử dụng sẽ cho chúng ta những tác dụng tuyệt vời khác nhau, dưới đây sẽ là chi tiết về chúng.
# Sử dụng HOCs
Với mỗi cách triển khai HOCs sẽ đem lại những tác dụng khác nhau, chúng ta sẽ đi vào tác dụng của từng cách.
## Props Proxy
#### Điều khiển props
Như tên của nó, chúng ta có thể CRUD `props` được truyền cho component tham số của HOC (là `WrappedComponent`).

Chú ý đến việc sửa hoặc xoá props quan trọng và đặt namespace cho HOC props.

Ví dụ:
```js
import React from 'react';

export function propsProxyHOC(WrappedComponent) {
    return class PropsProxy extends React.Component {
        render() {
            const newProps = { type: 'props proxy' };

            return <WrappedComponent {...this.props} {...newProps}/>
        }
    }
}
```



#### Truy cập instance của WrappedComponent qua Refs
Để có thể truy cập instance của WrappedComponent (this) bằng `refs` thì trước tiên `component` này cần được `render` đầy đủ đã, vì vậy cần sử dụng phương pháp Props Proxy để trả về `WrappedComponent` ở method `render()` để React có thể đối chiếu và ta sẽ có `refs` đến instance của `WrappedComponent`.

Ví dụ:
```js
export function refsPropsProxy(WrappedComponent) {
    return class RefsPropsProxy extends React.Component {
        proc = wrappedComponentInstance => {
            wrappedComponentInstance.method();
    }

    render() {
        const props = Object.assign({}, this.props, { refs: this.proc.bind(this) });
        
        return <WrappedComponent {...props}/>
    }
}
```

> Khi `WrappedComponent` được render xong thì refs callback sẽ được thực thi, và chúng ta sẽ có ref đến `WrappedComponent` instance. Điều này có thể được sử dụng để đọc/thêm các `props` và gọi các instance method.
> 
#### Bọc WrappedComponent bằng element khác
Việc này nghe có vẻ thừa vì Parent Component có thể thực hiện một cách dễ dàng, tuy nhiên chúng ta có thể sử dụng HOCs để có thể linh hoạt hơn trong cách phát triển.

Ví dụ:
```js
export function elementPropsProxy(WrappedComponent) {
    return class ElementPropsProxy extends React.Component {
        render() {
            return (
                <div className='with-div'>
                    <WrappedComponent {...this.props}/>
                </div>
            );
        }
    }
}
```

#### Trừu tượng hoá State
Bằng cách cung cấp `props` và callback cho `WrappedComponent`, chúng ta có thể trừu tượng hoá `state` gần giống cách thực hiện với `refs`.

Ví dụ:
```js
function propsProxyHOC(WrappedComponent) {
    return class PropsProxy extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                name: ''
            };
      
            this.onNameChange = this.onNameChange.bind(this)
        }
        
        onNameChange(event) {
            this.setState({
                name: event.target.value
            });
        }
    
    render() {
        const newProps = {
            name: {
                value: this.state.name,
                onChange: this.onNameChange
            }
        };
        
        return <WrappedComponent {...this.props} {...newProps}/>
    }
}
```
## Inheritance Inversion
#### Chiếm quyền render 
Ở đây, HOC sẽ kiểm soát render output của `WrappedComponent` và ta có thể làm bất kỳ điều gì với nó. 

Ví dụ: 
```js
function conditionalHOC(WrappedComponent) {
    return class ConditionalRendering extends WrappedComponent {
        render() {
            if (this.props.loggedIn) {
                return super.render()
            } else {
                return <div>Not loggedIn</div>
            }
        }
    }
}
```
Ở ví dụ này, chỉ cần `props` truyền vào loggedIn thì WrappedComponent sẽ được render nguyên vẹn.

#### Điều khiển State
HOC có thể CRUD state của `WrappedComponent` instance, tuy nhiên thử tưởng tượng ra nếu thực sự như thế thì mọi thứ trở nên rất rối và khó có thể kiểm soát được, vì vậy nên tự giới hạn ở mức độ chỉ đọc hoặc thêm state và thêm namespace để dễ quản lý `state` cho `WrappedComponent`.

Ví dụ:
```js
export function IIHOCDEBUGGER(WrappedComponent) {
    return class II extends WrappedComponent {
        render() {
            return (
                <div>
                    <h2>HOC Debugger Component</h2>
                    <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
                    <p>State</p><pre>{JSON.stringify(this.state, null, 2)}</pre>
                    {super.render()}
                </div>
            )
        }
    }
}
```
HOC này sẽ hiện `props` và `state` của `WrappedComponent`
# Một số vấn đề liên quan
## Naming
Vấn đề đặt ra khi dev và debugging đấy là HOCs sau khi bao `WrappedComponent` thì sẽ mất tên gốc của `WrappedComponent` đó, vì vậy có một cách đấy là: 

```js
import getDisplayName from 'recompose/getDisplayName';

export function HOC(WrappedComponent) {
    ...
    
    HOC.displayName = `HOC${getDisplayName(WrappedComponent)}`;
}
```
## HOC với tham số truyền vào
Điển hình với HOC `connect` của react-redux, khi sử dụng chúng ta cần truyền vào 2 tham số là `mapStateToProps` và `mapDispatchToProps` như ví dụ đầu bài, chúng ta sẽ có một function có tham số truyền vào và return về một HOC =))
```js
function connect(mapStateToProps, mapDispatchToProps) {
    return function (WrappedComponent) {
        return class extends React.Component {
            render() {
                return (
                    <WrappedComponent
                        {...this.props}
                        {...mapStateToProps(store.getState(), this.props)}
                        {...mapDispatchToProps(store.dispatch, this.props)}
                    />
                )
            }
      
            componentDidMount() {
                this.unsubscribe = store.subscribe(this.handleChange.bind(this))
            }

            componentWillUnmount() {
                this.unsubscribe()
            }

            handleChange() {
                this.forceUpdate()
            }
        }
    }
}

```
# Kết luận
Trên đây là một số kiến thức xoay quanh Higher Order Components, thực sự đây là một phần phức tạp tuy nhiên không thể bỏ qua sự mạnh mẽ của nó mang lại cho React Redux hay những thư viện khác nữa. Cám ơn mọi người đã theo dõi.

Tài liệu tham khảo:

https://reactjs.org/docs/higher-order-components.html

https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e

https://viblo.asia/p/react-higher-order-components-in-depth-aWj53VJYl6m

https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e