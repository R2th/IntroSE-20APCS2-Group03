### I. Lời mở đầu
- Tựa đề `Suy nghĩ như React` được mình tách ra từ phần `Main Concepts` số 12 `Thinking In React`trong document của [reactjs](https://reactjs.org/docs), mình cũng đang viết về document của reactjs này, hiện tại thì mới có [phần 1](https://viblo.asia/p/reactjs-docs-phan-1-Qpmle74VKrd), nếu rảnh thì mọi người có thể ghé qua đọc :v
- Tựa đề mình đặt ở đây vì sao lại là Suy nghĩ như React mà không phải là Suy nghĩ trong React và tại sao mình lại tách riêng ra mà không viết chung vào phần doc. Đơn giản là mình thấy phần này rất hay, có một số chỗ có thể áp dụng được cho các ngôn ngữ khác, nâng cao mindset của chúng ta, nó không chỉ là gói gọn trong React, ta vẫn có thể áp dụng nó với các project khác với ngôn ngữ không phải là React.

### II. Bắt đầu với một Mock
- Giả sử chúng ta đang có API JSON và một mock từ designer. Thì mock của chúng ta trong như thế này:
![](https://images.viblo.asia/8b6637a1-38bc-4181-a1b8-f3edb3cd88aa.png)

- API JSON trả về gồm:
    ```
    [
      {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
      {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
      {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
      {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
      {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
      {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
    ];
    ```
    
### III. Phá vỡ UI thành một hệ thống cấp bậc Component (Component Hierarchy)
- Điều đầu tiên là bạn sẽ suy nghĩ trong đầu hoặc vẽ ra các ô khoanh vùng mỗi thành phần và đặt tên cho chúng trong mock. Nếu bạn làm việc với một designer thì có thể việc đặt tên họ đã có. Hãy nói chuyện với các designer đấy và xin họ tên Photoshop layer, và những tên này sẽ thành tên của các Component của bạn.
- Nhưng vấn đề ở đây là làm thế nào mà biết được những gì nên trở thành component? Đơn giản là ta dùng kỹ thuật tương tự (tức là những phần có cấu tạo giống nhau) để quyết định xem có nên tạo một chức năng hoặc đối tượng mới không. Một kỹ thuật như vậy là nguyên tắc trách nhiệm duy nhất (the single responsibility principle), đó là một component lý tưởng chỉ nên làm một việc, nói nôm na là `người nào làm việc người đó`. Nếu nó kết thúc sự phát triển, thì hãy phân nó thành các component nhỏ hơn (smaller subcomponents).
- Vì bạn có thể hiển thị mô hình dữ liệu JSON model cho người dùng, nên việc bạn phải xây dựng chính xác mô hình giao diện người dùng của bạn là điều cần thiết. Mô hình UI và dữ liệu có xu hướng tuân thủ cùng một kiến trúc thông tin, chỉ cần chia nó ra thành các phần đại diện chính xác cho một mô hình của bạn.

![](https://images.viblo.asia/6f840534-3066-4634-a587-5fcad9fdf34d.png)

- Như bạn thấy hình trên, thì ta sẽ có gồm 5 component tương ứng với 5 màu border được tô ở trên
    - **FilterableProductTable (màu cam):** nơi chứa toàn bộ ví dụ
    - **SearchBar (xanh dương):** nơi nhận đầu vào từ người dùng
    - **ProductTable (xanh lục):** hiển thị và lọc bộ sưu tập dữ liệu (data collection) dựa trên đầu vào của người dùng
    - **ProductCategoryRow (xanh ngọc lam):** hiển thị tiêu đề cho từng danh mục
    - **ProductRow (đỏ):** hiển thị một hàng cho mỗi sản phẩm
- Nếu bạn nhìn vào ProductTable, bạn sẽ thấy rằng tiêu đề của bảng (chứa các "Name" và "Price" label) không phải là thành phần của chính nó. Đây là một vấn đề ưu tiên, và có một cuộc tranh luận được đưa ra theo một trong hai cách. Trong ví dụ này, ta để nó như một phần của ProductTable vì đây là một phần của việc hiển thị bộ sưu tập dữ liệu thuộc trách nhiệm của ProductTable. Tuy nhiên, nếu header trở lên phức tạp (tức là ta phải thêm affordance để sorting lại), thì chắc chắn, nó sẽ có ý nghĩa hơn khi để nó thành component của riêng ProductTableHeader.
- Mọi thứ đã xong, ta có dạng phân cấp như sau:
    - `FilterableProductTable`
        - `SearchBar`
        - `ProductTable`
            - `ProductCategoryRow`
            - `ProductRow`
### IV. Xây dựng một version tĩnh
Trong React ta xây dựng các component như phía dưới
```
// trang html
<div id="container"></div>

// React
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```

- Bây giờ ta đã có hệ thống phân cấp component của mình, đến lúc triển khai app. Cách dễ nhất là xây dựng một phiên bản lấy data model của bạn và render ra UI nhưng như vậy lại không có tính tương tác. Nó tốt nhất là tách các quá trình này, bởi vì xây dựng một version tĩnh cần đòi hỏi nhiều thao tác gõ và không cần suy nghĩ, và việc thêm tương tác lại đòi hỏi nhiều suy nghĩ và không cần phải gõ nhiều. Ta sẽ thấy tại sao.
- Để xây dựng một version tĩnh của ứng dụng, render lại dữ liệu model, bạn sẽ muốn xây dựng các component và truyền dữ liệu vào chúng thông qua các prop. Các props được truyền vào là cách để có thể truyền giữ liệu từ cha sang con. Nếu bạn đã biết state, thì không nên xây dựng version tĩnh này bằng state. State chỉ dành riêng cho tương tác, nghĩa là dữ liệu luôn thay đổi theo thời gian. Và version tĩnh này bạn không cần thiết phải dùng nó.
- Bạn có thể xây dựng bằng top-down (trên xuống dưới) hoặc bottom-up (dưới lên trên). Tức là bạn có thể bắt đầu từ những component cao hơn trong phân cấp (nghĩa là bắt đầu từ `FilterableProductTable`) hoặc với các thành phần thấp hơn (ProductRow). Trong các ví dụ đơn giản, nó thường đi từ trên xuống dưới, và trong các dự án lớn thì nó lại dễ dàng hơn khi đi từ dưới lên trên và bạn sẽ dễ viết test như bạn xây dựng.
- Ở bước cuối, bạn sẽ có một thư viện các component có thể tái sử dụng để hiển thị model dữ liệu của bạn. Các compoent sẽ chỉ có phương thức render vì đây là version tĩnh của ứng dụng. Thành phần ở đầu phân cấp (`FilterableProductTable`) sẽ lấy mô hình dữ liệu (data model) như một prop. Nếu bạn tạo một thay đỏi mô hình dữ liệu cơ bản của mình và gọi lại ReactDOM.render(), UI sẽ được cập nhật.
### V. Xác đinh tối thiểu (nhưng đầy đủ) đại diện của UI State
- Để làm cho UI của bạn tương tác, bạn cần có khả năng kích hoạt thay đổi đối với mô hình dữ liệu cơ bản của bạn. Trong React, thì nó dùng state.
- Để xây dựng app của bạn một cách chính xác, đầu tiên bạn cần nghĩ đến tập hợp state tối thiểu mà ứng dụng bạn cần. Chìa khóa ở đây là `DRY (Don't Repeat Yourself)` - Không lặp lại chính mình. Chỉ ra đại diện tối thiểu của state mà ứng dụng bạn cần có và tính toán mọi thứ khác bạn cần theo yêu cầu.
- Nghĩ lại tất cả các phần dữ liệu trong ứng dụng ví dụ ở trên, ta có:
    - Danh sách các product ban đầu
    - Text tìm kiếm khi user nhập
    - Giá trị của checkbox
    - Danh sách lọc của project
- Có 3 câu hỏi về mỗi phần của dữ liệu
    - Nó có phải được truyền từ cha thông qua props? Nếu vậy, nó có thể là không phải state
    - Nó vẫn không thay đổi theo thời gian? Nếu vậy, nó có thể là không phải state
    - Bạn có thể tính toán nó dựa trên bất kỳ state hay prop nào khác trong component? Nếu vậy, nó không phải state.
- Danh sách ban đầu của product là truyền qua prop, vậy nó không phải state. Text tìm kiếm và checkbox dường như là state vì chúng thay đổi theo thời gian và có thể được tính toán từ bất cứ thứ gì. Cuối cùng, danh sách các product được lọc là state vì nó có thể được tính bằng cách kết hợp danh sách sản phẩm gốc với text tìm kiếm và giá trị của checkbox
- Tổng kết, state chúng ta có là
    - Text tìm kiếm khi user nhập vào
    - Giá trị của checkbox
### VI. Xác định nơi mà state nên ở
```
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText} />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```

- Ok, ta đã xác định được state tối thiểu. Tiếp theo, ta cần xác định component nào sẽ sở hữu state.
- Nên nhớ: React là luồng dữ liệu một chiều xuống component phân cấp. Có thể không rõ ràng ngay là component nào thì sở hữu state. Đây thường là phần khó khăn với những người mới hiểu, vì vậy làm theo các bước để tìm ra
- Đối với mỗi phần của state trong ứng dụng của bạn
    - Xác định mọi compoent khi render một cái gì thì phải dựa trên state đó.
    - Tìm một component chung (một component duy nhất trên tất cả các component)
    - Các phần chung hoặc component có phân cấp cao hơn sẽ có state
    - Nếu bạn có thể tìm thấy một compoent ở đó có thể sở hữu state, tạo một component đơn giản, để giữ state và thêm nó vào đâu đó ở component chung có phân tầng cao hơn
- Tuyệt vời, giờ ở `FilterableProductTable`, ta thêm `this.state = {filterText: '', inStockOnly: false}` từ `constructor` khởi tạo và map với các giá trị mới. Sau đó, truyền nó qua `ProductTable ` và `SearchBar` như một prop. Cuối cùng, sử dụng prop để lọc các row trong `ProductTable` và set giá trị của form field trong `SearchBar`
###  VII. Thêm luồng dữ liệu ngược
- Từ lúc nãy tới giờ ta đã thấy dữ liệu được đi từ trên xuống thấp (tức từ cha sang con). Bây giờ, ta sẽ hỗ trợ luồng dữ liệu theo một cách khác: ta sẽ cập nhật state từ tầng phân cấp thấp nhất lên tầng cao nhất (`FilterableProductTable`)
- Đơn giản là ở vùng cao ta sẽ tạo ra một function có truyền tham số, trong hàm đó ta `setState` tham số đấy
    ```
    function changeState(params) {
        this.stateState(params);
    }
    ```
- Ta truyền function này như một prop vào các tầng con của phân cấp, rồi sử dụng nó như một function bình thường
- Như vậy việc gọi thay đổi state sẽ được diễn ra ở tầng con như mình mong muốn
### VIII. Kết
Phần này chủ yếu để hiểu rõ thêm về Composition và lợi ích của nó, mong sao bài viết này có thể giúp các bạn phần nào về việc áp dụng phân tách các component lớn thành nhỏ để dễ quản lý, và tránh dư thừa code.