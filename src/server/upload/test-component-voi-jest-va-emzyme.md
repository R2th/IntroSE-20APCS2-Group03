Ở phần 1 chúng ta đã tìm hiểu qua cách test cho Action, Reducer, Saga. Trong phần này chúng ta tiếp tục tìm hiểu cách viết test cho thành phần quan trọng nhất đó là component

Đầu tiên để test được một component chúng ta cần những tool gì nó như thế nào và làm sao để test được, nó đây các bạn nhé `JEST` và `Enzyme` cặp đôi song sát để test component. Nào chúng ta bắt đầu tìm hiểu từng thằng xem chúng là gì nhé

# JEST
Jest là một framework javascript rất thú vị và nó focus vào sự đơn giản, hỗ trợ nhiều các project javascript khác nhau như Babel, TypeScript, Node, React, Angular, Vue và nhiều hơn nữa! . Đấy home page của Jest đã định nghĩa rất rõ ràng và đơn giản. Các bạn có thể xem vào trang chủ của [Jest](https://jestjs.io)  để xem bản tiếng anh, nếu mình có dịch không chính xác mong các bạn bổ xung thêm. Nó cũng là 1 framework có lượng sao lên đến 25k, một con số khác lớn phải không? 

Về API của Jest mình đánh giá khá tốt, document rõ ràng cụ thể dễ dàng dễ hiểu. Jest cung cấp rất nhiều các API đủ dụng cụ cho chúng ta chơi với component các cụ có thể xem [ở đây](https://jestjs.io/docs/en/api) 
# Enzyme
Enzyme rất hữu dụng trong test React, giúp kiểm tra đầu ra của các component của bạn dễ dàng hơn. Bạn cũng có thể thao tác, duyệt qua và trong một số cách mô phỏng thời gian chạy cho đầu ra.
API của Enzyme có nghĩa là trực quan và linh hoạt bằng cách bắt chước API của jQuery để thao tác và truyền tải DOM. Đây là [trang chủ ](https://airbnb.io/enzyme/)của Enzyme

Đối với mình thì `Shallow Rendering` và `mount Rendering` được mình hay sử dụng nhất. Vậy sự khác biệt giữ 2 cụ này là gì nhỉ

Với `Shallow Rendering` sử dụng trong trường hợp không cần render child component của component còn khi cần render child component thì bạn dùng `mount Rendering` nhé. Cụ này render đến child component

Còn rất nhiều các API khác cần tìm hiểu những cụ khác cứ lên trang chủ tra nhé.

# Cấu trúc của component
Một component thông thường sẽ bao gồm các thành phần sau

1. Các lifecycle method
2. Các method xử lý logic và handle action  

**Components: Testing A Life Cycle Method**
Khi kiểm tra các thành phần React, chúng ta thường muốn kiểm tra lifecycle method  nếu bạn nào còn chưa rõ Life Cycle Method là gì thì hãy xem hình ảnh sau đây
![](https://images.viblo.asia/3df1f0d0-6d56-41ef-90c4-9eb4dd5d3fa6.png)

Trong ví dụ này, tôi đã có một component UsersTable đưa ra yêu cầu tìm nạp người dùng để hiển thị trong `componentDidMount` của nó. Chúng ta sẽ kiểm tra xem điều này có thực sự xảy ra hay không và nó có render chính xác hay không

Chúng ta sẽ bắt đầu bằng cách tạo ra  instance component  bằng cách sử dụng enzyme. Lưu ý rằng vì chúng ta sử dụng `shallow` thay vì dùng `mount`, để tránh render các  child component.

Vì component được kết nối đển store, chúng tôi sẽ  `Wraper` nó trong  `Store` hoặc tạo `Store` giả để truyền vào nó. `Redux-mock-store` làm cho điều này một cáchc dễ dàng.

Ngoài ra, chúng ta cũng quan tâm đến việc `request to fetch users`  có gọi chính xác hay không. Vì vậy, chúng tôi sẽ sử dụng jest  `[spy](https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname)` mock `request to fetch users` và sử dụng `toHaveBeenCalled`  kiểm tra xem method có được gọi hay không
```
import React from "react";
import configureMockStore from "redux-mock-store";
import UsersTable from "./UsersTable";
import { shallow } from "enzyme";

const initialState = {};
const createMockStore = createMockStore(initialState);

describe("Users Table", () => {
  const mockStore = createMockStore({});

  describe("componentDidMount", () => {
    const usersTableInstance = shallow(<UsersTable store={mockStore} />)
      .dive()
      .instance();
    const fetchUsersSpy = jest.spyOn(usersTableInstance, "fetchUsers");
    usersTableInstance.componentDidMount();

    it("makes a request to fetch the users", () => {
      expect(fetchUsersSpy).toHaveBeenCalled();
    });
  });
});`
```

Đây là một ví dụ rất cơ bản về test `componentDidMount`, các bạn có thể hình dung được phần nào cách test `Cycle Method`

**Các method xử lý logic và handle action** 

Để test được các method logic hay các handle action như `onChange`, `onClick` ..., thông thường chúng ta phải dùng đến môt `instance` component

Chúng ta hãy xét 1 ví dụ trong `UsersTable` có function handle action làm thay đổi một state `loading` icon của component đó. Mặc định state `loading` sẽ là `false`. Khi  `onClick` button trên compoent `UsersTable` thì `loading` sẽ là `true` và method handle đó là `handleChangeLoading`

```
import React from "react";
import Loading from './Loading';

export class UsersTable extends React.PureComponent {
     constructor(props) {
        super(props);
        this.state = {
          loading: false,
        };
    }
    handleChangeLoading = () => {
        this.setState({
            loading: true,
        });
    }
    render() {
        const { loading } = this.state;
        return (
            <>
                { loading && (<Loading />)}
                <Button onClick={this.handleChangeLoading} />
            </>     
          )
    }    
}
```

Chúng ta bắt đầu viết test có  method `handleChangeLoading` nào

```
import React from "react";
import configureMockStore from "redux-mock-store";
import UsersTable from "./UsersTable";
import { shallow } from "enzyme";

const initialState = {};
const createMockStore = createMockStore(initialState);

describe("Users Table", () => {
  const mockStore = createMockStore({});

  describe("handleChangeLoading", () => {
    const usersTableInstance = shallow(<UsersTable store={mockStore} />)
      .dive()
      .instance();

    it("handleChangeLoading", () => {
    usersTableInstance.handleChangeLoading();
      expect(usersTableInstance.sate.loading).toEqual(true);
    });
  });
});`
```

Như vậy mình đã lấy 2 ví dụ về test `Life Cycle Method` và `handle action` cũng đơn giản thôi các cụ nhỉ. Còn nhiều vấn đề liên quan đến component khi viết unit test như `mapsStateToProps` hay `defaultProps` hoặc call back function từ childe component sang parent component các cụ tìm hiểu tiếp nhé. Nó cũng rất hấp dẫn đấy. Nếu các bạn quan tâm mình sẽ chia sẽ tiếp ở bài sau
# Kết luận

Thông qua các ví dụ rất cơ bản về test component, hi vọng các bạn có cái nhìn tổng thể về cách test component. Nếu có ý kiến hay bổ xung gì xin mời comment nhé các cụ.