Xin chào mọi người hôm nay mình sẽ chia sẻ với các bạn một số tip để viết code React clean code hơn nhé. Chúng ta bắt đầu nào !!
### 1. Cẩn thận trong khi làm việc với state
- Lưu ý rằng setState là bất đồng bộ, vì vậy khi chúng ta cần cẩn thận khi sử dụng state hiện tại để set một new state.
- Một ví dụ điển hình về cái này là khi bạn muốn tăng một giá trị trong state.
- Cách sai:
````js
    this.setState({ value: this.state.value + 1 });
````
- Cách đúng sẽ là:
````js
    this.setState(prevState => ({ value: prevState.value + 1 }));
````
### 2. Khi làm việc với String props
-  Một giá trị string props có thể sử dụng trong nháy ngoặc kép mà không sử dụng dấu ngoặc nhọn ({}) hoặc dấu gạch ngược (`)
- Cách sai:
````js
    const Greeting = ({ personName }) => <p>Hello, {personName}!</p>
    
    export const StringPropValuesBad = () => (
        <div>
            <Greeting personName={"Jack"} />
            <Greeting personName={"John"} />
            <Greeting personName={"Jame"} />
        </div>
    )
````
- Cách đúng sẽ là:
````js
    const Greeting = ({ personName }) => <p>Hello, {personName}!</p>
    
    export const StringPropValuesBad = () => (
        <div>
            <Greeting personName="Jack" />
            <Greeting personName="John" />
            <Greeting personName="Jame" />
        </div>
    )
````
### 3.Object destructuring
-  Trong ví dụ này , componentWillReceiveProps  được truyền vào mộtt newProp và nhiệm vụ của chúng ta sẽ set state.active cho new active prop.
-   Cách chưa tốt:
````js
    componentWillReceiveProps() {
        this.setState({
            active: newProps.active
        });
    }    
````
-  Nên viết:
````js
    componentWillReceiveProps() {
        this.setState({ active );
    }    
````
### 4. Câu điều kiện
- Chúng ta thường viết câu điều kiện hoặc biểu thức điều kiện để hiển thị một số thứ liên quan đến điều kiện, và sẽ khó khăn hơn nếu chúng ta có nhiều component và điều kiện.
-   Cách chưa tốt:
````js
    let link;
    if (isLoggedIn) {
      link = <LogoutLink />
    }
    return <div>{link}</div>
````
-  Nên viết:
````js 
  <div>{isLoggedIn && <LogoutLink />}
````
### 5 . Sử dụng một Fragment nhỏ trên Fragment lớn

-   Cách chưa tốt:
````js
    const App = () => (
        <React.Fragment>
            <FrogsTable />
            <FrogsGellery />
        </React.Fragment>
    )
````
-   Nên viết:
````js
    const App = () => (
         <>
            <FrogsTable />
            <FrogsGellery />
         </>
    )
````
### 6.  Sử dụng toán tử 3 ngôi
- Cách này rất hữu dụng để show các trạng thái khác nhau hoặc các component khác nhau phụ thuộc vào điều kiện.
-    Cách chưa tốt:
````js
    let link;
    if(isLoggedIn) {
        link = <LogoutLink />
    } else {
        link = </LoginLink>
    }
    return <div>{link}</div>
````
-  Nên viết:
````js
    <div>
        {isLoggedIn ? <LogoutLink /> : </LoginLink>}
    </div>       
````
### 7.  Check array or empty
-  Khi kiểm tra có phải là array không hay nó là rỗng.
-    Cách chưa tốt:
````js
    function findMax1(numberList) {
        if (!numberList || !numberList.length)
            return undefined;
            // nếu không tìm giá trị lớn nhất và return            
    }    
````
-  Nên viết:
````js
   function findMax2(numberList) {
        if (!Array.isArray(numberList) || numberList.length === 0)
            return undefined;
            // nếu không tìm giá trị lớn nhất và return            
    }      
````
-    Bởi vì cách đầu tiên sẽ sai nếu có property là length hoặc sai nếu truyền string vào.
### 8.  Thứ tự sắp xếp import
-  Mình thường sắp xếp thứ tự import theo thứ tự ưu tiên như sau để dễ nhìn hơn:
1.  React import.
2.  Library import (theo thứ tự alpha).
3.  Absolute import từ project (theo thứ tự alpha)
4.  Relative import (theo thứ tự alpha).
5.  import * as
6.  import './<some file>.<some ext>'.
   -  Ví dụ:
````js
    import React from 'react'
    import { useSelector } from 'react-redux'
    import styled from 'styled-components'
    import FrogsGalley from './FrogsGalley'
    import FrogsTable from './FrogsTable'
    import Stations from './Stations'
    import * as errorHelpers from '../utils/errorHelpers'
    import * as utils from '../utils/'      
````
    
    ** TRÊN ĐÂY LÀ NHỮNG CHIA SẺ CỦA MÌNH, CẢM ƠN CÁC BẠN ĐÃ ĐỌC BÀI VIẾT .**😘