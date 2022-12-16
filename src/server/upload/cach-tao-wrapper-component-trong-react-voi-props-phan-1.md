###  Introduction

Trong hướng dẫn này, bạn sẽ tạo các wrapper components với props bằng cách sử dụng React JavaScript library. Wrapper components là các thành phần bao quanh các components không xác định và cung cấp cấu trúc mặc định để hiển thị children components. Pattern này mục đích tạo rac giao diện người dùng (UI) được sử dụng nhiều lần trong suốt quá trình thiết kế, như modals, template pages và ô thông tin.

Để tạo các wrapper components, trước tiên, xem qua cách sử dụng các rest and spread operators: (https://www.digitalocean.com/community/tutorials/understanding-destructuring-rest-parameters-and-spread-syntax-in-javascript#spread, gom props không sử dụng để chuyển cho các nested components (component lồng nhau). Sau đó, bạn sẽ tạo một component sử dụng children component được tích hợp sẵn để wrap các nested component trong JSX như thể chúng là các phần tử HTML. Cuối cùng, bạn sẽ chuyển các components làm props, có thể nhúng JSX tùy ý ở nhiều vị trí trong một component.

Trong hướng dẫn này, bạn sẽ xây dựng các component để hiển thị danh sách dữ liệu animal ở dạng thẻ. Bạn sẽ học cách tách dữ liệu và cấu trúc lại các components khi tạo các wrapper components. Cuối cùng bạn sẽ có một ứng dụng, sử dụng các kỹ thuật để tạo components có thể tái sử dụng, mở rộng quy mô và tích hợp khi phát triển ứng dụng.

Lưu ý: Bước đầu tiên thiết lập một project trống, Nếu bạn đã có sẵn một project và muốn trực tiếp làm việc với các props, hãy bắt đầu với Bước 2.
###  Creating an Empty Project

Trong bước này, bạn sẽ tạo một project mới bằng cách create-react-app (https://github.com/facebook/create-react-app). Sau đó, bạn sẽ xóa project mẫu và các file liên quan được cài đặt khi bạn khởi động dự án. Cuối cùng, bạn sẽ tạo một cấu trúc file đơn giản để tổ chức các component của mình. Điều này sẽ cung cấp cho bạn cơ sở vững chắc để xây dựng wrapper app của hướng dẫn này trong bước tiếp theo.

Chạy dòng lệnh sau để tạo một project mới bằng cách sử dụng create-react-app:

```
  npx create-react-app wrapper-tutorial
```

sau đó cd vào thư mục dự án mới khởi tạo:

```
  cd wrapper-tutorial
```

mở thêm một tab terminal mới để luôn chạy project trong khi làm việc:

```
  npm start
```

Trình duyệt tự động mở project vừa tạo và hiển thị lên server local. Nếu dự án không tự mở trong cửa sổ trình duyệt, bạn có thể mở bằng http://localhost:3000/. Nếu bạn đang chạy remote server, địa chỉ sẽ là http://your_domain:3000.

![](https://images.viblo.asia/bfbf59f0-ce59-4d1e-bdd5-fbb23fb8bda5.png)

trình duyệt của bạn sẽ  khởi động với một app React đơn giản như sau:

Bạn sẽ xây dựng các custom component mới, vì vậy bạn sẽ cần bắt đầu bằng cách xóa một số code soạn sẵn để có một  project trống.

Mở file src/App.js sửa lại code: 

```
    import React from 'react';
    import './App.css';

    function App() {
      return <></>;
    }

    export default App;
```

tạo 1 thư mục có tên components

```
    mkdir src/components
```

với mỗi component sẽ có các thư mục riêng để lưu trữ: file component, styles, images …

tạo thư mục app trong thư mục components:

```
    mkdir src/components/App
```

move tất cả các file App vào thư mục vừa tạo. Sử dụng ký tự đại diện, *, để chọn bất file nào bắt đầu bằng App. Bất kể phần mở rộng tệp. Sau đó, sử dụng lệnh mv để đưa chúng vào thư mục mới:

```
    mv src/App.* src/components/App
```

Tiếp theo, cập nhật đường dẫn tương đối trong index.js, là thành phần root khởi động toàn bộ quá trình:
Mở file src/index.js thực hiện thay đổi và xoá các file không sử dụng tương ứng trong file index khi tạo dự án đã import.

```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './components/App/App';

    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
```

Bây giờ project đã được thiết lập, bạn có thể tạo component đầu tiên của mình

###  Collecting Unused Props with ...props

Trong bước này, bạn sẽ tạo một component để hiển thị một tập hợp data về một nhóm động vật. Component của bạn sẽ chứa một nested component thứ hai để hiển thị một số thông tin một cách trực quan. Để kết nối parent và nested component, bạn sẽ sử dụng các rest and spead operators để chuyển các props không sử dụng từ parent sang children mà không cần parent biết tên hoặc type props.

Đến cuối bước này, bạn sẽ có một parent component có thể cung cấp props cho các nested component mà không cần phải biết props là gì. Điều này sẽ giữ cho parent component linh hoạt, cho phép bạn cập nhật children component mà không cần phải thay đổi parent compnent.

**1. Tạo AnimalCard Component**
 
 Tạo file data.js 
 
 ```
     touch src/components/App/data.js
 ```
 
 với nội dung như sau:
 
 ```
  export default [
      {
        name: 'Lion',
        scientificName: 'Panthero leo',
        size: 140,
        diet: ['meat']
      },
      {
        name: 'Gorilla',
        scientificName: 'Gorilla beringei',
        size: 205,
        diet: ['plants', 'insects']
      },
      {
        name: 'Zebra',
        scientificName: 'Equus quagga',
        size: 322,
        diet: ['plants'],
      }
 ]
 ```
 
Danh sách animals này là một loạt các đối tượng bao gồm tên động vật, tên khoa học, trọng lượng và chế độ ăn.

Tiếp theo, tạo một thư mục cho AnimalCard component:

```
    mkdir src/components/AnimalCard
```

tạo file AnimalCard.js

```
    touch src/components/AnimalCard/AnimalCard.js
```

Bây giờ, thêm một component lấy name, diet và sizelàm prop và hiển thị:

```
    import React from 'react';
    import PropTypes from 'prop-types';

    export default function AnimalCard({ diet, name, size }) {
      return(
        <div>
          <h3>{name}</h3>
          <div>{size}kg</div>
          <div>{diet.join(', ')}.</div>
        </div>
      )
    }

    AnimalCard.propTypes = {
      diet: PropTypes.arrayOf(PropTypes.string).isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    }
```

Ở đây bạn đang cấu trúc các props trong danh sách tham số cho hàm AnimalCard, sau đó hiển thị dữ liệu trong một div. Dữ liệu về chế độ ăn uống được liệt kê dưới dạng một chuỗi đơn bằng cách sử dụng phương thức join (). Mỗi phần dữ liệu bao gồm một PropType tương ứng để đảm bảo rằng kiểu dữ liệu là chính xác.

Giờ bạn đã có component và data của mình, bạn cần kết hợp chúng với nhau. Để làm điều đó, hãy nhập component và data vào root component của project: App.js.

sửa lại file src/components/App/App.js

```
    import React from 'react';
    import PropTypes from 'prop-types';

    export default function AnimalCard({ diet, name, size }) {
      return(
        <div>
          <h3>{name}</h3>
          <div>{size}kg</div>
          <div>{diet.join(', ')}.</div>
        </div>
      )
    }

    AnimalCard.propTypes = {
      diet: PropTypes.arrayOf(PropTypes.string).isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    }
```

Khi bạn làm việc trên các dự án phức tạp hơn, dữ liệu của bạn sẽ đến từ nhiều nơi khác nhau, chẳng hạn như API, localStorage hoặc tệp tĩnh. Nhưng quy trình sử dụng từng cái này sẽ tương tự nhau: gán dữ liệu cho một biến và lặp qua dữ liệu. Trong trường hợp này, dữ liệu là từ một tệp tĩnh, vì vậy bạn đang nhập trực tiếp vào một biến.

 
Trong đoạn code này, bạn sử dụng phương thức .map () để lặp lại các con vật và hiển thị các props. Lưu ý rằng bạn không phải sử dụng từng phần dữ liệu. Ví dụ: bạn không chuyển thuộc tính ScientificName một cách rõ ràng. Bạn cũng đang thêm một key prop mà React sẽ sử dụng để theo dõi dữ liệu được map. Cuối cùng, bạn đang wrapping code bằng một div với className của wrapper mà bạn sẽ sử dụng để thêm một số style.

Mở file: src/components/App/App.css Xoá các dòng code cũ, thêm vào đoạn code sau: 

```
 .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content;
    space-between;
    padding: 20px;
}
```

Lưu và thoát khỏi file, browser sẽ refresh và bạn sẽ thấy một số dữ liệu được tách ra.

![](https://images.viblo.asia/bb4e466d-a73d-4e5a-8017-82d598e1df65.png)

**2. Tạo Details Component**

Bây giờ bạn có một component đơn giản hiển thị data. Nhưng giả sử bạn muốn cung cấp cho diet data một chút tinh tế bằng cách chuyển đổi text thành emoji. Bạn có thể làm điều này bằng cách chuyển đổi data trong component của mình. Component mới sẽ được gọi là AnimalDetails. Để thực hiện, hãy tạo một thư mục mới:

```
    mkdir src/components/AnimalDetails
```

Bên trong file, hãy tạo một component nhỏ hiển thị diet dưới dạng emoji:

```
    import React from 'react';
    import PropTypes from 'prop-types';
    import './AnimalDetails.css';

    function convertFood(food) {
      switch(food) {
        case 'insects':
          return '🐜';
        case 'meat':
          return '🍖';
        case 'plants':
        default:
          return '🌱';
      }
    }

    export default function AnimalDetails({ diet }) {
      return(
        <div className="details">
          <h4>Details:</h4>
          <div>
            Diet: {diet.map(food => convertFood(food)).join(' ')}
          </div>
        </div>
      )
    }

    AnimalDetails.propTypes = {
      diet: PropTypes.arrayOf(PropTypes.string).isRequired,
    }
```

Đối tượng AnimalDetails.propTypes thiết lập function để thực hiện diet prop là một mảng các chuỗi. Sau đó, bên trong component, code lặp qua diet và chuyển đổi chuỗi thành emoji bằng cách sử dụng câu lệnh switch

Bạn đang import một số css vì vậy hãy thêm css vào file sau:

```
   Touch src/components/AnimalDetails/AnimalDetails.css
```

thêm vào code sau:

```
    .details {
        border-top: gray solid 1px;
        margin: 20px 0;
    }
```

Bây giờ bạn đã có một custom component mới, bạn có thể thêm nó vào component AnimalCard của mình. Mở AnimalCard.js:

Mở src/components/AnimalCard/AnimalCard.js

```
    import React from 'react';
    import PropTypes from 'prop-types';
    import AnimalDetails from '../AnimalDetails/AnimalDetails';

    export default function AnimalCard({ diet, name, size }) {
      return(
        <div>
          <h3>{name}</h3>
          <div>{size}kg</div>
          <AnimalDetails
            diet={diet}
          />
        </div>
      )
    }

    AnimalCard.propTypes = {
      diet: PropTypes.arrayOf(PropTypes.string).isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    }
```

Lưu tệp và bạn sẽ thấy các details mới trong trình duyệt.

![](https://images.viblo.asia/0dc55b8b-18fe-4916-816e-835ca5853f1a.png)

**3. Passing Details Through a Component with ...props**

Các component đang hoạt động tốt với nhau, nhưng có một chút kém hiệu quả trong AnimalCard. Bạn rõ ràng đang loại bỏ diet khỏi đối số prop, nhưng bạn không sử dụng dữ liệu. Thay vào đó, bạn đang chuyển nó qua component. Vốn dĩ không có gì sai về điều này — trên thực tế, tốt hơn là bạn đã sai khi giao tiếp quá nhiều. Nhưng khi làm điều này, bạn làm cho code của mình maintain hơn. Bất cứ khi nào bạn muốn chuyển data mới đến AnimalDetails, bạn cần cập nhật ba nơi App: nơi bạn chuyển các props, AnimalDetails: nơi sử dụng props và AnimalCard: là trung gian.

Một cách tốt hơn là gom bất kỳ props không sử dụng nào bên trong AnimalCard và sau đó chuyển trực tiếp chúng đến AnimalDetails. Điều này cho bạn cơ hội thực hiện các thay đổi đối với AnimalDetails mà không cần thay đổi AnimalCard. Trên thực tế, AnimalCard không cần biết bất cứ điều gì về các props hoặc các PropTypes sẽ có trong AnimalDetails.

Để làm điều đó, bạn sẽ sử dụng object rest operator. Toán tử này thu thập bất kỳ items nào không được pulled ra trong quá trình destructuringvà lưu chúng vào một đối tượng mới.

ví dụ
```
    const dog = {
        name: 'dog',
        diet: ['meat']
    }
    
    const { name, ...props  } = dog;
```

Trong trường hợp này, tên biến sẽ là 'dog' và biến props sẽ là {diet: ['meat']}.

Đến nay, bạn đã chuyển tất cả các props như thể chúng là thuộc tính HTML, nhưng bạn cũng có thể sử dụng các object để gửi props. Để sử dụng một đối tượng làm props, bạn cần sử dụng toán tử spread —... props — được bao quanh bởi dấu ngoặc nhọn. Điều này sẽ thay đổi mỗi cặp key-value thành một prop.

Mở src/components/AnimalCard/AnimalCard.js

Bên trong, xóa diet khỏi destructured object và thay vào đó gom phần còn lại của props vào một biến gọi là props. Sau đó, chuyển trực tiếp các props đó đến AnimalDetails:

```
    import React from 'react';
    import PropTypes from 'prop-types';
    import AnimalDetails from '../AnimalDetails/AnimalDetails';

    export default function AnimalCard({ name, size, ...props }) {
      return(
        <div>
          <h3>{name}</h3>
          <div>{size}kg</div>
          <AnimalDetails
            {...props}
          />
        </div>
      )
    }

    AnimalCard.propTypes = {
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    }
```

Lưu ý rằng bạn có thể loại bỏ diet PropType vì bạn không sử dụng prop trong component này.

Trong trường hợp này, bạn chỉ chuyển một prop cho AnimalDetails. Trong trường hợp bạn có nhiều props, thứ tự sẽ có vấn đề. Phần prop sau sẽ ghi đè lên các props trước đó, vì vậy nếu bạn có phần prop mà bạn muốn ưu tiên, hãy đảm bảo rằng nó là điểm cuối cùng. Điều này có thể gây ra một số nhầm lẫn nếu đối tượng props của bạn có một thuộc tính cũng là một giá trị được đặt tên.

Lưu và đóng file, browser sẽ refresh và mọi thứ sẽ như sau: 

![](https://images.viblo.asia/69f5bca7-ee3d-4c27-a82e-6e255423f7cf.png)


Để xem đối tượng {...props} thêm tính linh hoạt như thế nào, hãy chuyển tên khoa học: scientificName đến AnimalDetails thông qua AnimalCard component.

Mở src/components/App/App.js, Thêm scientificName làm prop.

```
    import React from 'react';
    import './App.css';

    import animals from './data';
    import AnimalCard from '../AnimalCard/AnimalCard';

    function App() {
      return (
        <div className="wrapper">
          {animals.map(animal =>
            <AnimalCard
              diet={animal.diet}
              key={animal.name}
              name={animal.name}
              size={animal.size}
              scientificName={animal.scientificName}
            />
          )}
        </div>
      );
    }

    export default App;
```

thay đổi file src/components/AnimalDetails/AnimalDetails.js
props mới sẽ là một chuỗi mà bạn thêm vào danh sách detail cùng với dòng khai báo PropType

```
    import React from 'react';
    ...
    export default function AnimalDetails({ diet, scientificName }) {
      return(
        <div className="details">
          <h4>Details:</h4>
          <div>
            Scientific Name: {scientificName}.
          </div>
          <div>
            Diet: {diet.map(food => convertFood(food)).join(' ')}
          </div>
        </div>
      )
    }

    AnimalDetails.propTypes = {
      diet: PropTypes.arrayOf(PropTypes.string).isRequired,
      scientificName: PropTypes.string.isRequired,
    }
```

Lưu và đóng file, browser sẽ refesh và bạn sẽ thấy các detail mới mà không có bất kỳ thay đổi nào với AnimalCard component

![](https://images.viblo.asia/206de2df-f007-4426-a081-9b7503add637.png)

Trong bước này, bạn đã học cách tạo các parent props linh hoạt có thể lấy các props không xác định và chuyển chúng vào các nested component bằng spread operator. Đây là một mô hình chung sẽ cung cấp cho bạn sự linh hoạt cần thiết để tạo ra các components. Trong bước tiếp theo, bạn sẽ tạo các component có thể lấy các component không xác định làm prop bằng cách sử dụng children prop được tích hợp sẵn.

Phần 2:  https://viblo.asia/p/cach-tao-wrapper-component-trong-react-voi-props-phan-2-Az45bPJzZxY