![](https://images.viblo.asia/548b7fea-3301-4c27-b436-2d3a70606d81.png)
Cuộc sống không có gì là mãi mãi. Công việc cũng vậy. Thỉnh thoảng chúng ta cần thay đổi hay tìm hiểu thứ gì đấy mới mẻ hơn, và thay đổi đôi chút. Và  mình cũng vậy, một hôm mình có yêu cầu sẽ làm việc với React, thế là sẵn sàng đi vào học luôn và không ngại ngần để chia sẻ với các bạn những thứ cơ bản của React.js trong bài này. Chúng ta cùng bắt đầu thôi nhé. 

# 1. Hello world. 
Reactjs là một **thư viện** Javascript được phát triển bởi Facebook  và phát hành vào năm 2013 ra toàn thế giới. với mục đích là đơn giản hóa các giao diện, tạo một trang web SPA thân thiện với người dùng. 

Tại sao React lại trở nên nổi tiếng và được nhiều nguời sử dụng: 
- Đầu tiên nó được hậu thuẫn bởi Facebook - một ông lớn như Facebook hậu thuẫn cùng với Paypal, Uber, Instagram... sử dụng để phát triển giao diện cho họ thì việc nổi tiếng là điều khó tránh khỏi.
- Ít phức tạp hơn, triển khai nhanh hơn các framework khác : Thời điểm react ra đời có nhiều framework trước đó như Angular.js, trong khi các framework đó tập trung cho cả MVC thì React chỉ tập trung cho tầng View vì vậy triển khai đơn giản hơn.  
- Tái sử dụng Components: Khi xây dựng giao diện website không thể không tránh khỏi những giao diện trùng lặp và với React chúng ta có gom chung vào Component để tái sử dụng. Việc viết component cũng dễ dàng hơn khi sử dụng JSX.

Nhược điểm :  
- React.js chỉ tập trung ở phần View trong mô hình MVC 
- Để học cơ bản thì khá nhanh nhưng làm việc sâu với nó thì là cả một quãng đường dài

Chúng ta cùng sử dụng React cơ bản nào ! 

 Là một developer chính hiệu hay một coder nghiệp dư, từ học sinh cho tới professional thì chắc ai mà chả phải khởi đầu với hello world nhỉ. Mà thực ra trong doc của React cũng bắt đầu chương đầu là Hello world vì vậy mình cũng sẽ bắt đầu với việc làm thế nào để hiển thị hello world bằng React.js?  = = =

Đầu tiên là phải setup để chạy trước :)
Có 2 cách để sử dụng React.js dưới đây :

- Sử dụng thông qua link CDN
- Sử dụng bằng cách tạo một ứng dụng với React thông qua package manager. 

Trong bài này mình sẽ sử dụng node package manager (NPM) để setup một ứng dụng react nhé ! .  Nhưng trước hết yêu cầu cài đặt là chúng ta cần cài đặt sẵn phiên bản Node >= 8.10 và npm >= 5.6.

```
  $ npx create-react-app first-app
```

![](https://images.viblo.asia/cafc54a7-1848-4b6b-9b3a-bb1e1274583d.png)

Tiếp theo như console trong hình đã hướng dẫn chúng ta vào thư mục vừa create và dùng npm start để chạy react nhé ! 

Để in ra Helloworld trong màn hình chúng ta vào src/App.js để sửa lại code nhé : 
Chúng ta thay ở phần return bên dưới thành thứ bạn muốn! 
```js
import './App.css';

function App() {
  return (
    <div className="App">
         Helloworld 
    </div>
  );
}

export default App;
```

![](https://images.viblo.asia/beb8d696-903e-4ec2-af0b-035a8cc85f60.png)

Vì ở đây mình sử dụng react thông qua việc tạo bằng package manager vì vậy package manager đã chia các file js hay css thành các module. Cái này rất quan trọng vì khi làm việc thường chúng ta sẽ chia nhỏ các module và sử dụng import, export của es6 như vậy.  
Và chúng ta đã xong bài học đầu tiên với Hello world. Chắc mọi người sẽ thắc mắc ở đoạn return vì sao lại có thể viết html mà không đưa vào một chuỗi (string) ở trong file javascript như vậy. Và đấy chính là JSX. 

# 2. JSX 
- JSX :  Javascript + XML.

- JSX giúp chúng ta viết html trong React nhưng không phải là html. 

- JSX không bắt buộc phải sử dụng trong React nhưng mọi người hầu hết đều sử dụng vì nó là một công cụ hữu ích, giúp đơn giản hóa cách code của chúng ta hơn. 

cú pháp của JSX: 

```js
const name = <h1> Pham Hieu </h1>;
```
Để nhúng biểu thức vào bên trong JSX. Chúng ta có thể đặt chúng trong dấu ngoặc nhọn : 
```js
const name = () => {
   return "Pham Hieu"
}

const hello = <h1> Hello {name()} </h1>;

```
Trong ví dụ hello world ở trên chúng ta cũng có thể viết : 

```js
import './App.css';

const name = () => {
   return "Moi Nguoi"
} //ở đây mình viết tượng trưng cho một function có thể được nhúng vào bên trong JSX 

const hello = <h1> Hello {name()} </h1>;

function App() {
  return (
    <div className="App">
         {hello} 
    </div>
  );
}

export default App;
```
![](https://images.viblo.asia/85d716aa-8a83-46cd-8f84-2c03176c5975.png)

Trong JSX chúng ta cũng nên lưu ý một số attribute của html sẽ không viết giống html như ```<div class="App"> </div>``` ,  JSX sẽ viết thành ```<div className="App"> </div>``` 

# 3. Rendering một element:

Vì phục vụ cho việc thiết kế giao diện nên việc render một element và liên kết DOM rất quan trọng. Trong một ứng dụng React.js , thường tất cả ứng dụng sẽ được xây dựng với một node DOM gốc duy nhất (root).
```js
<div id="root"></div>
```

Để render dữ liệu vào node này chúng ta sẽ sử dụng ReactDOM.render : 

```js
const name =  "Pham Hieu";
ReactDOM.render(name, document.getElementById('root'));
```

Khi này chúng ta có thể hiển thị được ```name``` ở bên trong ```<div id="root"> </div>```


Quay trở lại với ứng dụng chúng ta đã tạo lúc nãy và cùng mở file index.js trong folder src nhé 

```js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
Và mở public/index.html 
```html <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

Ở file public/index.html chúng ta chú ý vào ```<div id="root"> </div> ``` . Có thể thấy khi chúng ta tạo ứng dụng này , React đã tự động tạo các module và tạo sẵn file html để render . Và thông qua index.js và câu lệnh ReactDOM.reder để render  component <App /> và <React.StrictMode> vào root. 
```js
  <React.StrictMode>
    <App />
  </React.StrictMode>,
```

Phần **Component** này mình sẽ tiếp tục viết ở bài sau nhé .
# 4. Kết luận 
Với chút kiến thức mình tìm hiểu được về React. Mình mong phần nào sẽ giúp các bạn mới làm quen có thể dễ dàng tiếp cận với React.js hơn. Bài hôm này của mình đến đây đã kết thúc , chào mọi người và hẹn gặp lại ở những bài viết sau. 
Nếu mọi người muốn tham khảo thêm thì hãy vào trang chủ của React để tìm hiểu nhé. Hiện tại đã có thêm bản dịch tiếng việt trong tài liệu tại https://reactjs.org/. Cảm ơn mọi người đã theo dõi bài viết !