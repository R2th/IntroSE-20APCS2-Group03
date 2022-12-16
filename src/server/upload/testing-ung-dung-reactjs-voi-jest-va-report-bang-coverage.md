## Nội dung: 
   Trong quy trình phát triển phần mềm thì testing luôn nằm trong đó và chiếm hữu vai trò vô cùng quan trọng không kém gì các giai đoạn khác. Đặc biệt, nếu bạn được làm trong 1 dự án có quy trình bài bản và chuyên nghiệp thì giai đoạn này càng được đề cao hơn nữa để đảm bảo sản phẩm tới tay khách hàng 1 cách tốt nhất. Hơn nữa đây cũng là 1 kiến thức quan trọng cần phải có khi bạn đi phỏng vấn ở các công ty phần mềm hiện nay.
   
   Do đó, trong bài viết này mình sẽ hướng dẫn các bạn viết Unit Test để kiểm tra các components có đúng với expect của mình hay không. Đi vào ví dụ luôn cho trực quan và dễ hiểu nhé.
## Cài đặt ứng dụng:
   Để cho nhanh thì mình tiếp tục tin tưởng vào **create-react-app** và tạo 1 project là react-app-testing: `npx create-react-app react-app-testing`

   Tiếp đó mình tạo thư mục **utils** trong **src** và tạo 1 file **sumOfTwoNumber.js**, thường thì thư mục **utils** này dùng để đặt những function dùng chung trong project và đa số là những function tính toán logic nên mình để tên hàm như vậy làm ví dụ.
   ```js
       function sumOfTwoNumber(a, b){
          if(a === undefined || b === undefined) return 0
          return a + b
        }

        export default sumOfTwoNumber
   ```
   
   Ngoài ra mình còn tạo file **sumOfTwoNumber.test.js** và import file **sumOfTwoNumber.js** vào để test với nội dung bên như sau (Lưu ý là file test phải có đuôi **.test.js** để **jest** biết đây là file test và nó tự tìm kiếm để chạy)
   ```js
       import sumOfTwoNumber from './sumOfTwoNumber'

        test('should add two numbers', () => {
          const sum = sumOfTwoNumber(3, 4);
          expect(sum).toBe(7);
         });
   ```
Hàm **test** là global function mà jest cung cấp để chạy test case, bạn có thể tham tìm hiểu sâu thêm về nó hoặc các function tại [đây](https://jestjs.io/docs/en/api)

Sau đó bạn mở terminal lên và chạy lện npm run test, và đc kết quả như bên dưới:
![](https://images.viblo.asia/8d1818f6-d584-4cfb-be91-9bd3fdd4c89d.png)

Bạn cũng nên thử tự mình thay đổi giá trị 3, 4 hoặc 7 để xem kết quả run test như thế nào nhé

Giờ đến phần test component

   Ở phần này bạn cần lưu ý khái niệm snapshot testing giúp mình, nói đơn giản thì nó là cách để test react-component nơi mà với các props truyền vào thì sẽ tạo ra 1 snapshot mới với các giá trị truyền vào tương ứng.
   
   Để test **react-component** mình khuyến khích các bạn dùng **enzyme**, enzyme sẽ giúp ta dễ dàng xử lý các event, quản lý state.
   
   Để sử dụng cùng vs jest ta cần install và config nó 1 chút: `npm i enzyme enzyme-adapter-react-16 jest-enzyme`
   
   Xong phần cài đặt, giờ đến configs nhé:
   
   Tại file **setupTests.js** và thêm  dung sau để có thể add enzyme vào jest:
   ```js
   import { configure } from 'enzyme';
    import Adapter from 'enzyme-adapter-react-16';
    import 'jest-enzyme';

    configure({ adapter: new Adapter() });
   ```
   Mình có xoá đi các file **App.test.js, App.css**... ban đầu và viết lại file **App.js** như bên dưới cho đỡ rối:
   ![](https://images.viblo.asia/d3e68949-6063-4a26-ae26-7592c1a2c23e.png)

   Sau đó mình tạo thư mục **test** với file **App.test.js** và import components **App** vào để viết test:
   ```js
   import { shallow } from 'enzyme';

    import App from '../App'

    test('should test App component', () => {
      const wrapper = shallow(<App />);
      expect(wrapper).toMatchSnapshot();
    });
   ```
   Xong rồi đó, mình run test lại thôi: `npm run test`
   ![](https://images.viblo.asia/5127d177-7f07-446b-b3dd-9770ab2cbe3e.png)
   
   Bạn có để ý, trong thư mục test có folder __snapshots__ được sinh ra và bên strong nó là file snapshots **App.test.js.snap**, nếu tò mò thì bạn có thể mở nó lên xem thử. (nhớ kiểm tra lại nó khi thay đổi ở file App.js - như thêm className, và update lại snapshot như bên dưới)
   
   Giờ thử thay đổi file App.js 1 chút nhé, change title theo ý của bạn và save, của mình thì change từ **This is header** sang **This is header 1**. 
   ![](https://images.viblo.asia/6240d22b-ca72-4d71-b9bc-98bbb189164c.png)

   Quan sát kết quả ở dưới thì có thể thấy terminal báo lỗi test case should test App component và nguyên nhân là do snapshot khác nhau do chưa được update.
   Để khắc phục điều này thì bạn nhấn phím u ở terminal sau đó enter và jest sẽ chạy lại để update snapshot cho bạn.
   
   Cuối cùng là **coverage**,  report ra các số % function, line code mà mình đã cover ở các file test và toàn bộ ứng dụng, ta cần configs lại jest 1 chút:
   Tạo file** jest.config.json** với nội dung
   ```js
   {
      "setupFiles": ["<rootDir>/src/setupTests.js"],
      "testRegex": "/*.test.js$",
      "collectCoverage": true,
      "coverageReporters": ["lcov"],
      "coverageDirectory": "test-coverage",
      "coverageThreshold": {
       "global": {
       "branches": 0,
       "functions": 0,
       "lines": 0,
       "statements": 0
       }
      },
      "moduleDirectories": ["node_modules", "src"]
     }
 ```
     Và run nào: `npm run test -- --coverage --watchAll=false`
    
    Đây là kết quả:
   ![](https://images.viblo.asia/0aeb6f01-6677-434c-adcb-8c04a1d999c7.png)
   
   Ở bảng thống kê này, bạn cần chú ý 2 phần là **%Branch, %Funcs** và **Uncovered line**.
   **%Branch** là kiểm tra % số đơn vị đã được test ít nhất 1 lần. 
   - VD: ở function **sumOfTwoNumber** trên sẽ có 2 đơn vị cần phải kiểm tra là điều kiện nếu a hoặc b là undefine và đơn vị thứ 2 là a và b là số bình thường.
   **%Funcs** là kiểm tra function đó có được test ít nhất 1 lần hay không.
  -  VD: function **sumOfTwoNumber** ở trên thì chỉ cần vào 1 trong 2 điều kiện là đã thoả mãn điều kiện.
   **Uncovered line** là line chưa được viết test cho trường hợp %Branch chưa được thoả mãn.
   - VD: Bạn để ý ở bảng report thì function **sumOfTwoNumber** của mình đang có **%Branch** là 75 và có **line 2** chưa cover, vậy để cover cho line 2 này thì mình sẽ viết thêm test case cho nó ở file **sumOfTwoNumber.test.js** như sau:
   ```js
    import sumOfTwoNumber from './sumOfTwoNumber'

    test('should add two numbers', () => {
      const sum = sumOfTwoNumber(3, 4);
      expect(sum).toBe(7);
     });

     test('should add two numbers whit undefined value', () => {
      const sum = sumOfTwoNumber(undefined, 4);
      expect(sum).toBe(0);
     });
 ```
 Và khi run coverage lại thì như bạn đã thấy, tất cả là 100% hết
 ![](https://images.viblo.asia/1e036e9c-d275-4311-bdd8-30f0be7e0c44.png)

 Việc run coverage này đồng thời cũng tạo cho mình 1 folder coverage, và khi bạn mở file index.html bằng browser thì sẽ thấy được thống kê đầy đủ = trình duyệt
 ![](https://images.viblo.asia/24d0d47b-0bca-40d5-ac34-b7d75d4593f4.png)
 
 Và khi bạn click vào src hoặc src/utils thì sẽ hiển thị chi tiết hơn những file còn thiếu, line nào chưa coverage ...
 ![](https://images.viblo.asia/26405708-97a2-4545-94fe-d3ea3aac1f25.png)

## Kết luận:
Khi viết test thì không nhất thiết coverage phải là 100% cho toàn bộ dự án. Có khi dự án chỉ expect đến 80% thôi, vì để viết 100% thì sẽ khá mất thời gian.

Cảm ơn  các bạn đã đọc và tạm biệt.

Lần tới có thể sẽ khá lâu mình mới viết bài nên có gì góp ý bạn cứ comment nhé