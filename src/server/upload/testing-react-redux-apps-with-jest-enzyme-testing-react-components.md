Bài viết được dịch từ nguồn: https://alligator.io/react/testing-react-components/

Phần 1 nói về `install & setup` các bạn thao khảo link này: https://alligator.io/react/testing-react-redux-with-jest-enzyme/

Khi nói đến `testing React components`, mọi thứ sẽ liên quan nhiều hơn một chút so với `testing` các hàm `JavaScript` thông thường. Tin vui là bạn vẫn đang `testing public interface` các `components` của bạn. Bạn vẫn có đầu vào (`props`) và đầu ra (những gì nó `renders`).

Nếu bạn đọc và theo dõi Phần 1 của loạt bài này, thậm chí còn có tin tốt hơn. Bạn đã cài đặt và cài đặt `Jest` và `Enzyme`. Hai thư viện này kết hợp với nhau giảm đi rất nhiều khó khăn việc viết test các thành phần `React`.

## What to Import

`__tests__/components/GatorMenu.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import GatorMenu from '../../components/GatorMenu';

...
```

> `Method` `shallow()` của  `Enzyme` `renders node` hiện tại và trả về `shallow wrapper` nó. Điều này cho phép bạn giữ đúng với `unit testing`, chỉ `testing component` và không liên quan đến `components children`.

> `Method` `toJson()` từ `enzyme-to-json` chuyển đổi `Enzyme wrappers` thành định dạng tương thích với `testing Jest snapshot`.
 
> `Method` `configureStore()` từ `redux-mock-store` được sử dụng để giúp giả lập các tương tác với `Redux store` của bạn. Chỉ cần cho `smart components` được kết nối với `store`.

## Test that Your Component Renders

`__tests__/components/GatorMenu.test.js`

```
...

describe('<GatorMenu />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<GatorMenu />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});

...
```

> `Method` `dive()` trả về kết quả không phải là `DOM child` của `wrapper` hiện tại. Điều đó trở nên hữu ích nếu `component` của bạn `wraps` một `component` khác một thứ như `div element` và điều bạn quan tâm đến `testing` là `component` bên trong đó.
> 

## Simulating Events

Dưới đây, một ví dụ mô phỏng một sự kiện nhấp chuột trên `rendered component`. Chúng tôi sử dụng `method` `shallow-rendered component’s find` để tìm một `element` và sau đó gọi phương thức `simulation` trên `element` được trả về với tên của sự kiện được truyền vào dưới dạng chuỗi:

`__tests__/components/GatorButton.test.js`

```
...

describe('<GatorButton />', () => {
  describe('onClick()', () => {
    test('successfully calls the onClick handler', () => {
      const mockOnClick = jest.fn();
      const wrapper = shallow(
        <GatorButton onClick={mockOnClick} label="Eat Food" />
      );
      const component = wrapper.dive();

      component.find('button').simulate('click');

      expect(mockOnClick.mock.calls.length).toEqual(1);
    });
  });
});

...
```

> `Method` `jest.fn()` cho phép bạn dễ dàng giả định và theo dõi các chức năng.
> 

## Testing Smart Components

Tôi khuyên bạn nên kiểm tra các tương tác của bạn với `Redux store` thông qua `tests` bao gồm các `#actions` và `reducers` của bạn. Hãy thử và giữ `test` `components` của bạn tập trung vào những gì đang được hiển thị và hành vi `client-side`. Như đã nói, bạn có thể kiểm tra các tương tác với `store` của mình trong `smart components` của bạn:

`__tests__/components/GatorAvatar.test.js`

```
import { Avatar } from 'react-native-elements';

...

const mockStore = configureStore();
const initialState = {
  selectReducer: {
    selectedAvatar: 0,
  },
  avatars: [
    {
      name: 'Green Gator',
      image: 'https://cdn.alligator.io/images/avatars/green-gator.jpg',
    },
    {
      name: 'Yellow Gator',
      image: 'https://cdn.alligator.io/images/avatars/yellow-gator.jpg',
    },
    {
      name: 'Blue Gator',
      image: 'https://cdn.alligator.io/images/avatars/blue-gator.jpg',
    },
  ],
};
const store = mockStore(initialState);

describe('<GatorAvatar />', () => {
  test('dispatches event to show the avatar selection list', () => {
    const wrapper = shallow(<GatorAvatar store={store} />);
    const component = wrapper.dive();

    component.find(Avatar).props().onPress();

    expect(store.getActions()).toMatchSnapshot();
  });
});

...
```

Như bạn có thể thấy, chúng tôi có thể access vào một `component props` bằng cách gọi `props()` trên `element`.

Các phần 3, 4 nói về viết test cho `Redux Actions`, và `Redux Reducers` mình xin phép trình bày ở các phần sau.

Cảm ơn và hi vọng bài viết có ích cho công vieejv của bạn.