# Giới thiệu

Recompose Library là 1 React utility cho các function components và higher-order components. Hiểu đơn giản nó gần giống như lodash cho React

# Cài đặt
Đầu tiên chúng ta phải tạo 1 project react đã
- npm install -g create-react-app
- create-react-app my-app
- cd my-app
- npm start

(Nếu dùng npm version 5.2.0+ bạn có thể dùng npx create-react-app my-app)
Sau đó cài recompose :

- npm install recompose --save

Trong file `App.js`  chỉnh sửa 1 chút ^^:
```javascript
import React, { Component } from 'react';

const App = () => (
  <div>
    <h1>Demo Recompose</h1>
  </div>
);

export default App;

```

Ok vậy là các bước setup môi trường đã xong. giờ mình sẽ đi chi tiết vào các function trong recompose nhé ^^
# Chi tiết các function trong recompose
1.  defaultProps
    
    ```javascript
    defaultProps(
          props: Object
    ): HigherOrderComponent
    ```
    - example:
    ```javascript
    import React from 'react';
    import { defaultProps } from 'recompose' //import

    const enhance = defaultProps({
      counter: 0
    })

    const App = ({couter}) => (
      <div>
        <h1>Demo Recompose {couter}</h1>
      </div>
    );

    export default enhance(App);
    ```
    - display ![](https://images.viblo.asia/7e908f7b-899c-4622-be27-a36650eb4a04.png)
2. renameProp
     ```javascript
       renameProps(
          nameMap: { [key: string]: string }
        ): HigherOrderComponent

    ```
    - example:
        ```javascript
        import React from 'react';
        import { defaultProps, renameProps } from 'recompose' //import

        const enhance = defaultProps({
          counter: 0
        })

        const enhance1 = renameProps({
          counter: 'counterX'
        })

        const App = ({counterX}) => (
          <div>
            <h1>Demo Recompose {counterX}</h1>
          </div>
        );

        export default enhance(enhance1(App));
        ```
    - display ![](https://images.viblo.asia/7e908f7b-899c-4622-be27-a36650eb4a04.png)
    
    3. compose
     Như VD 2: nếu cứ dùng function trong recompose ta lại định nghĩa 1 function rồi export nó như vậy sẽ rất bất biện `enhance(enhance1(enhance2)...)`
     Recompse cung cấp cho ta 1 function compose để gộp các function lại 
     ```javascript
      compose(...functions: Array<Function>): Function
    ```
    - example:
        ```javascript
      import React from 'react';
      import { defaultProps, renameProps, compose } from 'recompose' //import

        // gộp các recompose function 
        const enhance = compose(
          defaultProps({
            counter: 0
          }),
          renameProps({
            counter: 'counterX'
          })
        )


        const App = ({counterX, ...rest}) => (
          <div>
            <h1>Demo Recompose {counterX}</h1>
          </div>
        );

        export default enhance(App);

        ```
    - display ![](https://images.viblo.asia/7e908f7b-899c-4622-be27-a36650eb4a04.png)
    4. withProps()
          ```javascript
          withProps(
              createProps: (ownerProps: Object) => Object | Object
            ): HigherOrderComponent
        ```
    - example:
        ```javascript
      import React from 'react';
        import { defaultProps, renameProps, compose, withProps } from 'recompose' //import

        const enhance = compose(
          defaultProps({
            counter: 0
          }),
          renameProps({
            counter: 'counterX'
          }),
          withProps({
            user: {
              name: 'Minh',
              age: 30
            }
          })
        )


        const App = ({counterX, user, ...rest}) => (
          <div>
            <h1>Demo Recompose {counterX}</h1>
            {user.name} - {user.age}
          </div>
        );

        export default enhance(App);


        ```
    - display ![](https://images.viblo.asia/8a6a7a8a-a864-41e8-bf30-36c9bd2c3470.png)
    5. flattenProp
        nếu bạn không muốn viết {user.name} - {user.age}
        ```javascript
         flattenProp(
           propName: string
         ): HigherOrderComponent
        ```
    - example:
        ```javascript
        import React from 'react';
        import { defaultProps, renameProps, compose, withProps, lifecycle, flattenProp } from 'recompose' //import

        const enhance = compose(
          defaultProps({
            counter: 0
          }),
          renameProps({
            counter: 'counterX'
          }),
          withProps({
            user: {
              name: 'Minh',
              age: 30
            }
          }),
          flattenProp('user'),
        )

        const App = ({counterX, name, age, ...rest}) => (
          <div>
            <h1>Demo Recompose {counterX}</h1>
            {name} - {age}
          </div>
        );

        export default enhance(App);
        ```
   6. withState
       
        ```javascript
         withState(
          stateName: string,
          stateUpdaterName: string,
          initialState: any | (props: Object) => any
         ): HigherOrderComponent
        ```
        withState function có 3 tham số truyền vào (props khởi tạo, function, giá trị khởi tạo)
    - example:
        ```javascript
        import React from 'react';
        import { compose, withState } from 'recompose' //import

        const enhance = compose(
          withState('counter',  'updateCounter', 0)
        )

        const App = ({counter, updateCounter}) => (
          <div>
            <h1>Demo Recompose {counter}</h1>
            <button onClick={() => updateCounter(counter = counter + 1)} >Counter</button>
          </div>
        );
        ```

        export default enhance(App);
     7. withHandlers
       handlers các funtion 
        ```javascript
         withHandlers(
          handlerCreators: {
            [handlerName: string]: (props: Object) => Function
          } |
          handlerCreatorsFactory: (initialProps) => {
            [handlerName: string]: (props: Object) => Function
          }
        ): HigherOrderComponent
        ```
        withState function có 3 tham số truyền vào (props khởi tạo, function, giá trị khởi tạo)
    - example:
        ```javascript
       import React from 'react';
        import { compose, withState, withHandlers } from 'recompose' //import

        const enhance = compose(
          withState('counter',  'updateCounter', 0),
          withHandlers({
            increment: ({updateCounter}) => (counter) => {updateCounter(counter => counter + 1)}
          })
        )

        const App = ({counter, increment}) => (
          <div>
            <h1>Demo Recompose {counter}</h1>
            <button onClick={increment} >Counter</button>
          </div>
        );

        export default enhance(App);
        ```

        7. mapProps
    - example:
        ```javascript
       import React from 'react';
        import { compose, defaultProps, mapProps } from 'recompose' //import

        const enhance = compose(
          defaultProps({
            counter: 0
          }),
          mapProps(({counter, ...rest}) => {
            return {
              ...rest,
              counter: 1
            }
          })
        )

        const App = ({counter, increment}) => (
          <div>
            <h1>Demo Recompose {counter}</h1>
          </div>
        );

        export default enhance(App);

        ```
        8. lifecycel()
            1 statefull (React.Component()) nó sẽ support toàn thể các ComponentAPI 
        Đi sâu hơn về 1 vòng đời (lifecycel component):
        - constructor 
        - componentWillMount()
        - render()
        - componentDidMount()
     
     (ở bài sau mình sẽ đi cụ thể về khái niệm và ví dụ của lifecycle method sau)
     ```javascript
     lifecycle(
      spec: Object,
    ): HigherOrderComponent
     ```
     example:
     ```javascript
     import React from 'react';
        import { compose, defaultProps, lifecycle } from 'recompose' //import

        const enhance = compose(
          defaultProps({
            counter: 0
          }),

          lifecycle({
            componentWillMount(){
              console.log(this.props);
            }
          })
        )

        const App = ({counter, increment}) => (
          <div>
            <h1>Demo Recompose {counter}</h1>
          </div>
        );

        export default enhance(App);

     ```
     9,  branch() và  renderComponent()
     Gộp chung 2 thằng này làm VD cho dễ hiểu
     branch() là để xử lý có thể xảy ra nhiều TH, kiểu như if else vậy
     ```javascript
     branch(
      test: (props: Object) => boolean,
      left: HigherOrderComponent,
      right: HigherOrderComponent
    ): HigherOrderComponent
     ```
     nó có 3 đối số:
     - test 1 function và trả về true flase
     - left nếu true
     - right nếu false
     
     example
     ```javascript
     import React from 'react';
    import { compose, defaultProps, branch, renderComponent } from 'recompose' 

    const enhance = compose(
      defaultProps({
        counter: 0
      }),

      branch(
        ({counter}) => counter < 1,
        renderComponent(under),
        renderComponent(over)
      )
    )

    const App = ({counter}) => (
      <div>
        <h1>Demo Recompose {counter}</h1>
      </div>
    );

    function under({counter}){
      return (
        <div>
          <h1>{counter} is less than  1</h1>
        </div>
      )
    }

    function over({counter}){
      return (
        <div>
          <h1>{counter} is greater than 1</h1>
        </div>
      )
    }

    export default enhance(App);

     ```
    # Kết Luận
    Mới tìm hiểu và làm việc với React. Nên sẽ có 1 số chố mình hiểu sai khái niệm....
    Trên là những ví dụ khá hay và cơ bản của recompose. Mình sẽ cố gắng tìm hiểu nhiều hơn và update thêm vào bài viết này. 
    Mọi người có thể tham khảo ở : https://github.com/acdlite/recompose/blob/master/docs/API.md