# 1. Path trong router
Hôm nay mình sẽ hướng dẫn bạn tiếp các bạn phần router như sau 

![](https://images.viblo.asia/be3d5858-388b-4978-8c6a-2ca153a83e17.png)

Khi bạn click vào Course thì sẽ list ra các Category con của Course , và sau khi click vào Category con thì nó sẽ hiển thị nội dụng của Category con của nó .
Các bạn xem đoạn code nói trên mình sẽ giải thích như sau :
```
import React, { Component } from 'react';
import {
    Route,
    NavLink
  } from 'react-router-dom';
  
class Menu extends Component {
    render() {
      let {match} = this.props;
      console.log(match);
      return (
          <div>
              <h3>Course List</h3>
              <div className="list-group">
                <NavLink exact to={`${match.url}/angular`} activeClassName='active' className='list-group-item'>Angular</NavLink>
                
                <NavLink exact to={`${match.url}/react`} activeClassName='active' className='list-group-item'>React</NavLink>

                <NavLink  exact to={`${match.url}/nodejs`} activeClassName='active' className='list-group-item'>Node</NavLink>
              </div>

                <Route exact path="/course" render= {()=>(
                     <h3>Plaese enter the course</h3>
                )} />
          </div>
      );
    }
}

export default Menu;
```

Các bạn chú ý đoạn code sau 
 ```
 let {match} = this.props;
 console.log(match);
 ```
 
 to={`${match.url}/angular`}  => Nó sẽ tương đương là **http://localhost:3000/course/angular**
 
 Khi mình click vào các Category con của Course  thì nó sẽ bị như sau:
![](https://images.viblo.asia/0aa3050a-dec1-4c2b-a42f-8f5a97c99a69.png)
 
 Tiếp tục quay về component   **CourseList.js**  ta thêm dòng code như sau:
 ```<Route path={`${match.url}/:name`} component = {CourseItem} /> ```
 
 Code của component  **CourseItem.js**  như sau:
 ```
 import React, { Component } from 'react';

class CourseItem extends Component {
	
    render() {
        let {match} = this.props;
        console.log(match);
        let courseName = match.params.name;
        return (
            <div >
               <h3>Couse Name:  {courseName}</h3>
            </div>
        );
    }
}

export default CourseItem;
```

Mình sẽ giải thích đoạn code trên như sau: 

 ```
 let {match} = this.props;
 console.log(match);
 Sau khi console.log(match) ra thì mình nhận được Object như sau:
 ```
 
 ![](https://images.viblo.asia/9075cc5e-bef3-4f34-ae78-c1f47a8b1acb.png)
 
 Sau khi mình có được params đó mình  get được giá trị mình muốn  và kết quả sẽ nhận được như sau 
 
 ![](https://images.viblo.asia/5455fbcf-9a1f-405f-ad6a-8d5ed07577aa.png)
 
# 2. Lời kết:
Thông qua bài viết này , mình hi vọng các bạn sử dụng Path, Params trong router một cách hiệu quả .  Đây là một phần nhỏ trong router , mình hi vọng qua bài viết này sẽ giúp các bạn sử dụng router một cách hiểu quả trong những dự án của mình .

# 3. Tài liệu tham khảo 
**https://reacttraining.com/react-router/**

# 4. Source code tham khảo
**https://github.com/tranthithanhmai130495/react-router**