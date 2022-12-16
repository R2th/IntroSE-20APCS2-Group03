![image.png](https://images.viblo.asia/d364ca59-ce60-49cc-aabe-4b820ef854d0.png)

Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu về ReactJS thông qua một vài ví dụ đơn giản, giúp bạn dễ nắm bắt và hiểu hơn về cách hoạt động của React.

## 1. ReactJS là gì?

ReactJS là một thư viện JavaScript mã nguồn mở được phát triển bởi Facebook, ra mắt vào năm 2013 với mục đích để xây dựng giao diện người dùng. Nó được sử dụng rộng rãi để xây dựng các trang web SPA (Single Page Application) và các ứng dụng trên nền tảng di động. Nó rất dễ sử dụng và cho phép người dùng có thể tạo các component UI có thể tái sử dụng.

Xem thêm bài viết tại: https://200lab.io/blog/tim-hieu-reactjs/

## 2. Những tính năng của ReactJS

ReactJS có các tính năng hết sức nổi bật bao gồm:

* **JSX**: viết tắt của JavaScript extension, nó là React extension , giúp cho việc thay đổi cây DOM dễ dàng hơn bằng HTML-style code đơn giản. Nó là một trong những tính năng tốt và dễ sử dụng.
* **Components**: Một trang web được xây dựng bằng ReactJS là một sự kết hợp nhiều component lại với nhau chứ không phải chung một Template như bình thường. Các component cũng như các hàm JavaScript bình thường, giúp tạo ra các code dễ dàng bằng cách tách các logic ra thành các đoạn code độc lập có thể tái sử dụng. Chúng ta có thể sử dụng component dưới dạng function hoặc class, ngoài ra các component còn có state và props.
* **Virtual DOM**: ReactJS tạo một thứ gọi là Virtual DOM (DOM ảo). Đúng như tên gọi, nó là một copy của DOM thật trên trang web đó. ReactJS dùng những DOM ảo đó để tìm đúng những DOM thật cần được cập nhật khi có bất kỳ sự kiện nào làm các thành phần bên trong nó thay đổi.
* **Javascript Expressions**: Biểu thức JS có thể sử dụng trong file .jsx hoặc .js bằng cách sử dụng cặp dấu ngoặc nhọn “{}”.

## 3. ReactJS: Ưu và nhược điểm.

Mỗi framework hay thư viện nào cũng có ưu và nhược điểm cả, ReactJS cũng vậy. Dưới đây là ưu và nhược điểm của ReactJS.

### 3.1 Ưu điểm của ReactJS:

* Vì ReactJS sử dụng DOM ảo để cache cấu trúc dữ liệu trong bộ nhớ và chỉ những thay đổi cuối cùng mới được cập nhật vào trong DOM trình duyệt. Điều này làm cho ứng dụng trở nên nhanh hơn.
* Bạn có thể tạo các component theo từng chức năng mà bạn muốn bằng cách sử dụng tính năng react component. Các component này có thể tái sử dụng theo nhu cầu của bạn, đồng thời việc tạo các component theo từng chức năng cũng giúp cho việc bảo trì sau này trở nên dễ dàng hơn.
* ReactJS là một opensource, vì vậy cũng rất dễ cho những bạn mới bắt đầu tìm hiểu nó.
* Trong những năm gần đây, ReactJS đang trở nên phổ biến hơn và được duy trì bởi Facebook và Instagram. Ngoài ra nó cũng được sử dụng bởi các công ty nổi tiếng như Apple, Netflix, …
* Facebook vẫn đang duy trì, phát triển, và cho ra những thay đổi mới. Vì thế bạn cứ yên tâm sử dụng ReactJS cho những dự án của bạn hoặc những dự án dành do doanh nghiệp.
* ReactJS có thể được sử dụng để xây dựng giao diện người dùng cho cả các ứng dụng dành cho máy tính và các ứng dụng di động.
* Dễ dàng cho việc test và debug, vì hầu hết các code đều được thực hiện bằng JavaScript chứ không phải bằng HTML.

### 3.2 Nhược điểm của ReactJS

* Vì hầu hết code được viết dưới dạng JSX, tức là HTML và CSS là một phần của JavaScript, nó không giống như những framework khác vẫn tách biệt giữa HTML và CSS nên những bạn mới làm quen với ReactJS sẽ hơi lúng túng và dễ nhầm lẫn giữa JSX và HTML. Tuy nhiên bạn sẽ nhanh chóng quen với cách kết hợp này của React mà thôi.
* Một nhược điểm nữa của ReactJS đó là dung lượng các file của nó hơi lớn.

## 4. Sử dụng ReactJS thông qua CDN

Để bắt đầu làm việc với React thì trước tiên chúng ta cần cài đặt ReactJS. Việc cài đặt rất dễ dàng, bạn chỉ cần sử dụng các file CDN mà React cung cấp nhưng hình bên dưới.

![image.png](https://images.viblo.asia/df0eed1b-372d-43a2-9865-20f75c90064f.png)

Bạn có thể truy cập vào đây để đến trang chứa CDN mà React cung cấp.

Lưu ý, ở đây ta có 2 phiên bản:

1. Dành cho dev:

![image.png](https://images.viblo.asia/26c8752f-bbf1-4f3d-a4b0-65d84c6c0342.png)

2. Dành cho production:

![image.png](https://images.viblo.asia/c6418b99-9cc4-42db-8025-4b45e6e533d7.png)

Bạn thay thế chữ version thành các con số phiên bản mới nhất mà facebook cung cấp cho cả **react-development.js** và **react-dom.developement.js**. Bạn hãy đặt hai đoạn script này ở cuối của cặp thẻ `<body></body>` hoặc ở cuối của cặp thẻ `<head></head>` để bắt đầu làm việc với ReactJS.

![image.png](https://images.viblo.asia/3de273e6-4167-47a6-976b-8d46577b27ca.png)

Một lưu ý nữa, nếu bạn chỉ sử dụng file CDN thì bạn đảm bảo vẫn còn giữ thuộc tính cross-origin để tránh gặp các lỗi liên quan đến cross-domain. Code của ReactJS không thể thực thi trực tiếp trên trình duyệt được mà nó cần được babel convert sang dạng JavaScript trước khi thực thi trên trình duyệt.

Bạn có thể lên trang chủ của babel để lấy đoạn script này hoặc ở ngay dưới đây và đặt chung chỗ với hai link CDN ở trên.

`<script src=”https://unpkg.com/babel-standalone@6.15.0/babel.min.js“></script>`

Dưới đây là toàn bộ ví dụ về ReactJS hoạt động bằng file CDN và file bablejs.

![image.png](https://images.viblo.asia/52b3e3cc-b803-40a8-a3ea-b67fac724219.png)

Kết quả:

![image.png](https://images.viblo.asia/c7942a25-143e-4c17-990f-3f9c869bfb0d.png)

Chạy thành công sẽ hiện ra kết quả như hình trên, bạn cũng có thể thấy phần mà tôi khoanh đỏ là biểu tượng của extension React-dev-tool cũng đã sáng lên, có nghĩa là chúng ta đã thành công rồi đó.

Nếu bạn chưa cài extension này thì có thể lên google và tìm kiếm theo keyword “React-dev-tool” hoặc cũng có thể truy cập vào đây để cài đặt.


Các chuyên gia cho rằng, việc trực tiếp làm việc với các file script babel không phải là cách tốt, nó chỉ phù hợp với những bạn mới bắt đầu tìm hiểu về ReactJS mà thôi. Trong thực tế khi làm việc với ReactJS thì bạn phải cài đặt ReactJS bằng NPM Package.Chúng ta sẽ cùng nhau đi vào chi tiết hơn về code trong mục tiếp theo.

## 5. Sử dụng NPM Packages

Trước khi bắt tay vào làm việc với ReactJS bằng npm package thì hãy chắc rằng bạn đã cài đặt nodejs. Nếu chưa, bạn có thể vào trang chủ nodejs tại đây, tải về và cài đặt.

Sau khi cài đặt nodejs xong, tạo một folder first-project.
Để setup project, chạy lệnh npm init và làm theo như hình bên dưới.

![image.png](https://images.viblo.asia/d797a9b1-1f47-4a12-952f-06aa13ed53f6.png)

Những mục như: version, entry point, test command, git repository, keywords, license các bạn không cần quan tâm, chỉ cần nhấn enter là được. Sau khi xong ta được một file package.json như hình.

![image.png](https://images.viblo.asia/b9ed0116-5e11-4ef1-b2a5-f2cf5d7e32c5.png)

Tiếp theo, ta cần cài đặt một số các packages cần thiết cho ReactJS như:

npm install react –save-dev

npm install react-dom –save-dev

npm install react-scripts –save-dev
Sau khi hoàn tất, bạn vào file package.json sẽ như hình.

![image.png](https://images.viblo.asia/65e11406-6880-4c1d-a78b-68c7943b6781.png)

Tạo thư mục tên src, thư mục này sẽ chứa tất cả các file .js. Chúng ta sẽ chứa các code React trong thư mục này. tạo một file index.js và import react và react-dom vào như hình bên dưới.

![image.png](https://images.viblo.asia/cd5d1461-0412-4aee-8f1c-b3548f9fb3b5.png)

Tạo tiếp thư mục public bên ngoài thư mục gốc và tạo thêm file index.html bên trong nó.

![image.png](https://images.viblo.asia/757bc955-8936-4f4b-a184-c8840fe06a71.png)

Những đoạn code JSX ở phần index.js sẽ được render vào trong phần tử DOM có id là “root” ở phần index.html.

Để run được project, trước tiên ta cần thêm lệnh “start”: “react-scripts start” vào trong phần “script” của file package.json. Package react-script sẽ giúp ta biên dịch code và khởi động server local để hiển thị nội dung trong file index.html

Sau khi hoàn tất ta sẽ được file package.json như hình bên dưới, bạn lưu ý những phần được khoanh đỏ là những phần quan trọng bắt buộc phải có nhé.

![image.png](https://images.viblo.asia/3aede1fd-2e1f-4350-8e05-d37ba52a81af.png)

Để chạy project ta chạy lệnh npm run start trong terminal. Server sẽ tạo một localhost có port là 3000 để chạy project trên trình duyệt như hình.

![image.png](https://images.viblo.asia/2ef3c09c-b8de-411f-a93a-ce22816f5017.png)

Như vậy là chúng ta đã setup và chạy thành công project đầu tiên bằng NPM Package. Trước khi bắt đầu đi vào tìm hiểu sâu hơn, các bạn lưu ý rằng các file .js hoặc .jsx sẽ được đặt trong thư mục src nhé.

## 6. JSX là gì?

JSX là một phần mở rộng của JavaScript, nó là một template script mà bạn có thể sử dụng HTML và JavaScript cùng nhau.

Dưới đây là ví dụ nhỏ về JSX:

![image.png](https://images.viblo.asia/58cb2397-d25d-4405-be69-084ef52ce000.png)

Đối với một UI bình thường, Chúng ta sẽ có các đoạn code HTML và mỗi phần tử DOM sẽ có các sự kiện cần được handle,… Nhưng đối với ReactJS thì mọi chuyện trở nên đơn giản hơn nhờ JSX, ta có thể sử dụng cả HTML và JavaScript trong cùng một file và có thể handle những thay đổi của state trong DOM một cách hiệu quả.

Biểu thức JSX, khi làm việc với ReactJS ta sẽ phải làm việc với các biểu thức JSX rất nhiều.

Trong file index.js ta có như hình dưới

![image.png](https://images.viblo.asia/34f1b553-c286-4317-a738-2ff4c2675730.png)

Ngoài cách viết trên, ta có thể viết chúng dưới dạng JSX, các biểu thức JSX được viết bên trong dấu ngoặc nhọn “{}” và chúng được mở rộng trong thời gian chạy. Các biểu thức trong JSX hoàn toàn tương tự như các biểu thức trong JavaScript.

Ta tạo thêm một file có tên test.jsx và thêm những dòng code như bên dưới.

![image.png](https://images.viblo.asia/3b2cf8eb-f8f2-49eb-8abb-716128199bb1.png)

Chúng ta sẽ import file test.jsx này vào trong file index.js. Để sử dụng được biến  H1_Tag thì ta phải export nó trong file test.jsx như hình trên. Sau khi import xong ta chỉnh sửa code lại được như sau.

![image.png](https://images.viblo.asia/d5f02d0f-ce53-4272-a322-47ccd4fbd12e.png)

kết quả:

![image.png](https://images.viblo.asia/7f682539-8a6c-4792-83c1-f82ba028c227.png)

## 7. Component trong ReactJS là gì?

Component chúng ta có thể hiểu là những function JavaScript thuần túy, giúp ta code dễ dàng hơn bằng cách tách logic code thành một đoạn code độc lập mà có thể tái sử dụng lại.

Để nói về component thì nó có hai cách viết, một là dạng function component và hai là class component. Chúng ta cùng tìm hiểu hai cách viết này có gì khác nhau nào.

Function component:
Đối với function component ta có cách viết như sau:

test.jsx

![image.png](https://images.viblo.asia/aa3064ed-a9ba-43aa-86c2-d77a9f3254fe.png)

Ta có một hàm DisplayText return một thẻ <h1>, nó hoạt động như một element như hình trên. Như ta thấy function DisplayText được dùng như một thẻ HTML và được gán vào biến displayText và muốn dùng được thì ta phải export nó.

Giờ ta có thể dùng component này trong file index.js như bình thường.

![image.png](https://images.viblo.asia/882dad6e-b6e2-4819-a03f-13a93196cb2a.png)
    
Kết quả:

![image.png](https://images.viblo.asia/c3bf8d88-62dc-4e44-88ac-38829384531b.png)
 
Class component
    
Đối với class component thì ta có cách viết như sau:

test.jsx
    
![image.png](https://images.viblo.asia/26f5d809-ee2e-4f83-a8dc-1deadc0ecd5f.png)
    
Trong index.js ta import nó vào như hình
    
 ![image.png](https://images.viblo.asia/ad730e23-1b70-4ae9-b251-307448f10e24.png)
    
 Component DisplayText được sử dụng như một thẻ HTML. Output vẫn vậy.
    
 ![image.png](https://images.viblo.asia/09b1f3ec-5696-4b44-83cd-23bb202d2338.png)
    
 Trước phiên bản React 16.8 thì function component chưa được hỗ trợ mạnh như class nhưng sau phiên bản 16.8 thì Hook được thêm vào và hỗ trợ mạnh mẻ cho function component không thua kém class component.

Hiện nay các dev khuyên chúng ta nên dùng function component thay cho class component  vì những ưu điểm vượt trội mà nó mang lại, những ưu điểm nào thì chúng ta sẽ tìm hiểu trong bài viết sau nhé.

## 8. State là gì? Props là gì? Chúng có giống nhau không?
    
Có thể nhiều bạn mới học sẽ không phân biệt hay nắm rõ được những khái niệm cùng như liệu hai cái này có khác hay hay không. Câu trả lời là chúng khác nhau.

State là một object javascript tương tự như props, nó chứa dữ liệu được sử dụng để react render. Dữ liệu của state là một private object và được sử dụng bên trong các component.
Ví dụ về state

Cách sử dụng state trong class component

test.jsx

![image.png](https://images.viblo.asia/7e14c832-030e-4e29-8b22-95c14959b240.png)
    
index.js
    
![image.png](https://images.viblo.asia/f5c9608b-074f-4dc9-aa33-3e1847f93b24.png)
    
kết quả
    
![image.png](https://images.viblo.asia/4b508f0a-0a11-4bd4-8896-780cd771ef8b.png)
    
Cách sử dụng state trong function component

test.jsx
    
![image.png](https://images.viblo.asia/3c3c07dd-d74e-4d7a-8ad1-e3c8db526ce1.png)
    
index.js
    
![image.png](https://images.viblo.asia/c9e78514-bd9d-413f-b8d7-91f2e69a8dac.png)
    
kết quả
    
![image.png](https://images.viblo.asia/6c8a8028-b782-470f-929a-c07f57b25035.png)
    
Props (properties) là data được truyền vào từ component cha và có thể truy cập ở các component con. Nó hoạt động như một object global hoặc như các biến có thể sử dụng bên trong component.

Ví dụ về props

props trong function component

test.jsx
    
![image.png](https://images.viblo.asia/b248509b-dca0-4a14-9f03-3a503f5ee8b3.png)
    
Chúng ta chỉ cần thêm thuộc tính text vào component <DisplayText/> như trên là có thể truyền các giá trị vào trong function DisplayText, bên trong function ta có thể sử dụng các giá trị truyền vào thông qua props. Là một object nên nó cũng có các thuộc tính như text mà ta truyền vào và nó được dùng như một biểu thức.

Trong index.js ta sử dụng như sau
    
![image.png](https://images.viblo.asia/93687f1c-1f0c-4b43-a92c-2e3dbb46117d.png)
    
Kết quả
    
![image.png](https://images.viblo.asia/0b029cfd-4c5f-458e-8cf2-558819ab9a81.png)
    
props trong class component

Để thao tác với props trong class ta làm như sau:

trong file test.jsx
    
![image.png](https://images.viblo.asia/d58fa229-bac4-417c-b692-9695e4facc6b.png)
    
Đoạn text được truyền vào component trong file index.js như sau
    
![image.png](https://images.viblo.asia/c49ab3a8-7b2f-47be-a2f0-34737e79c80e.png)
    
Kết quả
    
![image.png](https://images.viblo.asia/4f51b4f7-cd36-4689-b4a9-844310f2787e.png)
    
## 9. Vòng đời của một Component (life cycle)
    
![image.png](https://images.viblo.asia/08e4cd73-c4ff-45b0-adf7-fc3306ee4ad7.png)
    
Vòng đời của một component trải qua 4 giai đoạn: Initialization, Mounting, Update, và UnMounting

Initialization: Đây là giai đoạn đầu tiên của vòng đời một component.

Ở giai đoạn này component bắt đầu thiết lập các state và props của nó.

* Mounting: Trong giai đoạn này, component được hiển thị bên trong DOM. Giai đoạn này được thực hiện sau giai đoạn Initialization. Tại giai đoạn này, các component sẽ được render lần đầu tiên và chúng có những phương thức để xử lý trong giai đoạn này
* componentDidMount(): Phương thức này được gọi sau khi component được thêm vào DOM.
* render(): Phương thức này có ở mọi component, nó trả về HTML node.
* Update: Trong giai đoạn này, các DOM được người dùng tương tác và được cập nhật. Ví dụ người dùng click vào một button nào đó và làm state thay đổi dẫn đến component sẽ được re-render lại.

Trong giai đoạn này có các phương thức chính như:

* shouldComponentUpdate(): Phương thức này được gọi khi component được update.
* componentDidUpdate(): Được gọi sau khi component đã được update
* UnMounting: Đây là giai đoạn cuối cùng của vòng đời một component, ở giai đoạn này component sẽ bị loại bỏ khỏi DOM.
    
Trong giai đoạn này có phương thức:

ComponentwillUnmount(): Được gọi khi component bị loại bỏ khỏi DOM.

## 10. Ví dụ khi làm việc với life cycle
    
Tạo một file tên complife.jsx và thêm các dòng code bên dưới.

![image.png](https://images.viblo.asia/884ad850-055d-4b15-a505-badde3cee61e.png)
    
index.js
    
![image.png](https://images.viblo.asia/5951a889-7e5a-48fb-bd02-21969663bc23.png)
    
kết quả:
    
![image.png](https://images.viblo.asia/d85953d5-3400-4926-88bc-31df52392ed4.png)
    
Khi inspect element và mở qua tab console ta sẽ thấy
    
![image.png](https://images.viblo.asia/5dc77ea6-c3eb-419d-8221-651ff76eb288.png)
    
Khi gõ vào ô input ta được
    
![image.png](https://images.viblo.asia/5dc60d30-93aa-490b-85b2-5dc043e3c1e9.png)
    
## 11. Làm việc với Form

Trong ReactJS, các phần tử HTML như <input/>, <textarea /> và <select /> có state riêng của nó, chúng cần được cập nhật lại khi người dùng tương tác bằng phương thức setState().

Tạo một file có tên form.jsx và thêm code như hình
    
![image.png](https://images.viblo.asia/14eee7be-06ad-4d7c-ab49-3a0fd1ae1636.png)
    
Đối với các input field, chúng ta cần duy trì các state của nó, vì vậy ReactJS cung cấp một phương thức đặc biệt là setState(), giúp cập nhật và duy trì bất cứ state nào thay đổi.

Trong trường hợp này, ta sử dụng sự kiện onClick và onChange cho button submit và ô textbox. Khi người dùng nhập bất kỳ ký tự nào vào ô textbox thì sự kiện onChange được gọi và  trường name trong state thay đổi đối object state được cập nhật lại như hình:

![image.png](https://images.viblo.asia/3b42c8f0-9cee-45bd-991f-c73c8787eb17.png)  
    
index.js
    
![image.png](https://images.viblo.asia/e9294c8e-3e1f-466c-aa9e-40185f62c04b.png)
    
kết quả:
    
![image.png](https://images.viblo.asia/5bb491e5-68a0-43ec-b8d3-9ab964a49237.png)
    
Nhập bất kỳ gì bạn muốn vào ô textbox và nhấn submit, ta được:
    
![image.png](https://images.viblo.asia/cdc50ca9-a1df-41e2-981b-f99d1fb76118.png)
    
## 12. Làm việc với Event trong ReactJS
    
Làm việc với các event trong reactjs giống như cách bạn làm trong javascript. Bạn có thể sử dụng tất cả các event handle nào được sử dụng trong javascript. Phương thức setState () được sử dụng để cập nhật trạng thái khi người dùng tương tác với bất kỳ phần tử HTML nào.

Tạo một file tên events.jsx và thêm code vào như hình:    
    
![image.png](https://images.viblo.asia/cc562906-5fa8-4246-8eba-f83fc0ddad96.png)
    
Trong ví dụ này có dụng các sự kiện onChange và onClick trên ô textbox và button. Khi người dùng nhập vào bên trong ô textbox, sự kiện onChange được gọi và trường name bên trong state đối tượng state được cập nhật như hình dưới đây:
    
![image.png](https://images.viblo.asia/5fb8a70f-2a05-4fd4-a4e2-f3b808811fbf.png)
    
index.js
    
![image.png](https://images.viblo.asia/ad93bc98-626d-42ec-aca0-31d51ae90b55.png)
    
Nhập bất kỳ gì bạn muốn vào ô textbox và nhấn click here, ta được:
    
![image.png](https://images.viblo.asia/939f3a9c-a10f-4836-8a55-45e2afabc0ec.png)
    
## 13. Làm việc với inline CSS trong ReactJS
    
Cùng xem ví dụ về inline CSS trong ReactJS sẽ như thế nào nhé:

Tạo một file tên inlineCSS.jsx và thêm code bên dưới    
    
![image.png](https://images.viblo.asia/0e1a8c26-63bd-4dfb-8be2-57ee3a7d65fd.png)
    
index.js
    
![image.png](https://images.viblo.asia/2de2f106-931c-443c-b470-3c2d906f169f.png)
    
Kết quả:
    
![image.png](https://images.viblo.asia/2f59708d-e99e-47fa-b2a9-20f06b981747.png)
    
Đơn giản phải không nào, bạn có thể tạo một object style mà bạn muốn trên element và sử dụng dạng  biểu thức để thêm style vào element đó, như trong ví dụ trên.

## 14. Làm việc với external CSS trong ReactJS
    
Đầu tiên ta cần tạo một folder css trong nó tạo thêm file css tên style.css và thêm css vào như hình    
    
![image.png](https://images.viblo.asia/9401fbc0-17b1-49a2-8bb7-478530e5b8ed.png)
    
Tạo thêm một file tên externalCSS.jsx và import file css vào như sau
    
![image.png](https://images.viblo.asia/67236f17-9034-4e77-9f5f-ff7010196f9c.png)
    
index.js
    
![image.png](https://images.viblo.asia/0aa10f19-e269-432d-80fb-ad1f790e61a3.png)
    
Kết quả:
    
![image.png](https://images.viblo.asia/7ad12cba-0361-4803-a475-f120d2c5a097.png)
    
## 15. Tổng kết:
    
Qua những ví dụ đơn giản này, hy vọng đã giúp bạn hiểu hơn về các khái niệm cũng như cách sử dụng ReactJS.