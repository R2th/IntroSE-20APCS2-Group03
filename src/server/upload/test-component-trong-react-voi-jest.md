Testing code luôn là bài toán khó khắn với mỗi developer, bởi vì đơn giản là nó tốn nhiều thời gian, công sức, thậm chí bạn phải có khả năng nhìn thấy được những trường hợp có thể xảy ra. Thường những project nhỏ sẽ bỏ qua công đoạn này bởi vì thiếu nguồn lực. Tuy nhiên, nó vẫn luôn là cần thiết bởi nó sẽ giúp bạn cảm thấy tự tin hơn với dòng code của mình, tăng năng suất lao động.

Trong React cũng phải khác biệt gì, và ở trong bài viết này tôi sẽ hướng dẫn các bạn cách viết test cho React component.

## Test component trong React
Test là quá trình kiểm tra xem những điều kiện mà chúng ta đặt ra có được trả về chính xác không thông qua quá trình hoạt động của ứng dụng. Có rất nhiều kiểu test cho những lập trình viên để nhưng ở đây tôi chỉ nói đến những mô hình test phổ biến mà hay được sử dụng đó là : unit test, functional test và integration test.


### Unit test

Unit test đã là một kiểu test quá cơ bản với mỗi quy trình test. Như cái tên của nó, bạn sẽ phải test từng phần code riêng với những chức năng mà chúng phụ trách. Bởi vì kết cấu của các Component trong React nên unit test cực kỳ hữu ích.  Unit test giúp bạn phân chia các component thành các chức năng riêng biệt. Phần unit test của bạn trong component phải trả lời được các câu hỏi sau: 

1. Có prop nào không? Nếu có thì để làm gì ?
2. Nó render ra component nào ?
3. Nó có nên có state không ? Khi nào và như thế nào nên update state ?
4. Có quá trình nào mà nó phải theo dõi khi được mount và unmount hoặc người dùng tương tác ?

### Functional test

Functional test được sử dụng để test việc đối ứng của một phần của hệ thống. Function test thường được viết bởi góc nhìn của người dùng.  Một phần của chức năng không chỉ giới hạn bởi một component.

### Integration test

Integration test là quá trình gộp các component riêng biệt lại thành một nhóm. Nó nhằm kiểm tra quá trình hoạt động của user,  tuy nó lâu hơn functional test và unit test nhưng nó được thực hiện trực tiếp. Trong React, unit test và functional test nổi tiếng hơn bởi vì chúng dễ viết và bảo trì. 

## Những Tool sẽ sử dụng
### Jest Test
Jest là một framework test mà không cần phải tuỳ chỉnh gì cả và rất dễ để cài đặt. Nó nổi tiếng hơn những framework như là Jasmine và Mocha bởi nó được phát triển bởi Facebook. Jest thậm chí còn nhanh hơn chúng  bởi vì nó sử dụng kỹ thuật chạy test song song trong mỗi worker. Ngoài ra, mỗi lần chạy test được đưa vào trong môi trường sandbox riêng để tránh conflict với các case test khác.

Nếu bạn dùng create-react-app thì nó đã có cả Jest. Nếu không, bạn sẽ phải cài Jesst và một vài dependency khác. [Hãy tham khảo tài liệu Jest ở đây](https://jestjs.io/docs/en/tutorial-react).

### react-test-renderer

Cho dù bạn có dùng create-react-app thì bạn vẫn phải cài phần này vì nó sẽ render snapshot. Snapshot test là một phần của Jest. Thay vì phải render UI của cả ứng dụng thì ta có thể dùng test render để tạo ra output được giả lập.
```javascript
yarn add react-test-renderer
```

### ReactTestUtils và Enzyme
**react-dom/test-utils** chứa những phần tuỳ chỉnh test thuộc về React. Ngoài ra bạn có thể sử dụng [Enzyme](https://github.com/enzymejs/enzyme) của Airbnb. Enzyme tốt hơn ReactTestUtils bởi vì nó dễ  sử dụng, truy ngược về output của React Component. Chúng ta sẽ bắt đầu bằng React util sau đó sẽ chuyển sang Enzyme.

Để cài Enzyme : 
```javascript
yarn add enzyme enzyme-adapter-react-16
```

Thêm code sau vào **src/SetupTest.js**
```javascript
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });
```

###  Cài đặt Demo App và sắp xếp Test

Chúng ta sẽ viết một ứng dụng demo có chức năng hiện lên danh sách sản phẩm. Ứng dụng chứa các component như là `ProudctContainer.js` và 3 present component là `ProductList`,`ProductDetails`,  và `ProductHeader`.

```javascript
.
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   └── manifest.json
├── src
│   ├── components
│   │   ├── App.js
│   │   ├── ProductContainer.js
│   │   ├── ProductDetails.jsx
│   │   ├── ProductHeader.js
│   │   ├── ProductList.jsx
│   ├── index.js
│   └── style.css
```

Bạn có thể lấy [demo ở đây](https://github.com/tutsplus/testing-components-in-react-using-jest-the-basics). Khi bạn download về, hãy tạo thư mục là   `__test__` ở trong `/src/components/`. 

## Viết Test trong React

Tạo file `ProductHeader.test.js` nếu bạn chưa có. Đây là ví dụ về việc test sẽ viết như thế nào

`src/components/__tests__/ProductList.test.js`
```javascript
describe('ProductHeader', () => {
 
  it('passing test', () => {
    expect(true).toBeTruthy();
  })
 
  it('failing test', () => {
    expect(false).toBeTruthy();
  })
})
```

Việc test bắt đầu với `describe` block, nó là function của  Jest với hai parameter. Cái đầu là tên của cast test, cái thức hai là phần muốn test. Từ khoá `it()` thể một test case hoặc một spec. Mỗi trường hợp test có chức một hoặc nhiều kết quả test mà kiểm tra tình trạng của code.

`expects(true).toBeTruthy();`

`toBeTruthy()` là một hàm so sánh được define sẵn. Trong Jest, mỗi hàm so sánh tạo bước so sánh với giá trị kết quả và thực tế và trả về giá trị boolean. 

## Chạy test

create-react-app đã cài đặt tất cả nên bạn chỉ cần chạy test bằng câu lệnh sau: 

`yarn test`

![](https://images.viblo.asia/fc92bbb4-06d7-4413-a535-20c29e4c06f4.png)

Bạn thay hàm `toBeTruthy()` bằng `toBeFalsy()` để pass test.

## Các hàm so sánh trong Jest

Như đã nêu ở trên, Jest có rất nhiều hàm so sánh như sau:

```javascript
toBe()
toBeNull()
toBeDefined()
toBeUndefined()
toBeTruthy()
toBeFalsy()
toBeGreaterThan()
toBeLesserThan()
toMatch()
toContain()
```

Ngoài ra bạn có thể tham khảo tài liệu sau để tìm nhiều hàm hơn : https://jestjs.io/docs/en/using-matchers

## Test react component

Đầu tiên ta sẽ viết vài case test cho `ProductHeader`. 
`src/components/ProductHeader.js`
```javascript
import React, {Component} from 'react';
    
class ProductHeader extends Component  {
    render() {
        return(
            <h2 className="title"> Product Listing Page </h2>
        );
    }
};
export default ProductHeader;
```

Để test ta có hai giả định như sau :

1. Component này sẽ trả về `h2`tag.
2. `h2`tag sẽ có một lớp tên `title`.

Quay lại file test ta viết  như sau :

`src/components/__tests__/ProductHeader.test.js`
```javascript
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 
import ProductsList from '../ProductsList';
 
describe('ProductHeader Component', () => {
 
    it('has an h2 tag', () => {
     //Test here
    });
   
    it('is wrapped inside a title class', () => {
     //Test here
    })
  })
```

Để test được đầu tiên ta phải render vào trong document. Với sự giúp đỡ của `ReactTestUtils`, hãy viết như sau : 

`const component = ReactTestUtils.renderIntoDocument(<ProductHeader/>);`

Sau đó sửa lại hàm test như sau :

```javascript
  it('has an h2 tag', () => {
 
    const component = ReactTestUtils.renderIntoDocument(<ProductHeader/>);    
    var h2 = ReactTestUtils.findRenderedDOMComponentWithTag(
     component, 'h2'
   );
   
});
```

Tương tự như vậy với case test thứ hai
```javascript
it('has a title class', () => {
 
  const component = ReactTestUtils.renderIntoDocument(<ProductHeader/>);    
  var node = ReactTestUtils.findRenderedDOMComponentWithClass(
   component, 'title'
 );
})
```

Sau đó xem kết quả: 

![](https://images.viblo.asia/616d70b2-ba76-4530-a10c-df5878716e4e.png)

Vậy qua bài này chúng ta đã viết được case test trên React, ở phần sau ta sẽ dùng Enzyme để viết bởi vì Enzyme dễ dàng phát triển hơn, dễ dùng hơn. Cảm ơn các bạn đã xem.

Ref: