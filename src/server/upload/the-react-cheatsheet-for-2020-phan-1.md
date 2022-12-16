Bài tổng hợp về tất cả các khái niệm và kỹ năng về ReactJs của một `professional developer` mời các bạn cùng tham khảo (bow)

### Core Concepts
#### Elements and JSX
Dưới đây là cú pháp cơ bản của React element:
```
    // In a nutshell, JSX allows us to write HTML in our JS
    // JSX can use any valid html tags (i.e. div/span, h1-h6, form/input, etc)
    <div>Hello React</div>
```

JSX elements có thể được coi như là các biểu thức, tức là có thể dùng để gán giá trị cho biến, là giá trị trả về cho một hàm...

```
    // as an expression, JSX can be assigned to variables...
    const greeting = <div>Hello React</div>;

    const isNewToReact = true;

    // ... or can be displayed conditionally
    function sayGreeting() {
      if (isNewToReact) {
        // ... or returned from functions, etc.
        return greeting; // displays: Hello React
      } else {
            return <div>Hi again, React</div>;
          }
    }
```

JSX cho phép các biểu thức lồng nhau, tức là có thể chứa 1 JSX khác hoặc 1 biến khác.

```
    const year = 2020;
    // we can insert primitive JS values in curly braces: {}
    const greeting = <div>Hello React in {year}</div>;
    // trying to insert objects will result in an error
```
JSX cũng cho phép lồng các HTML element:

```
    const greeting = (
      // div is the parent element
      <div>
        {/* h1 and p are child elements */}
        <h1>Hello!</h1>
        <p>Welcome to React</p>
      </div>
    );
```

HTML và JSX có cú phép *hơi* khác nhau một chút:

```
    // Empty div is not <div></div> (HTML), but <div/> (JSX)
    <div/>

    // A single tag element like input is not <input> (HTML), but <input/> (JSX)
    <input name="email" />

    // Attributes are written in camelcase for JSX (like JS variables
    <button className="submit-button">Submit</button> // not 'class' (HTML)
```

Một ứng dụng React về cơ bản yêu cầu 3 thứ sau:
* ReactDOM.render() để render app
* Một JSX element đóng vai trò là một *root node* của app.
* Một DOM element đóng vai trò là *mounting point* của app.
 ```
    // imports needed if using NPM package; not if from CDN links
    import React from "react";
    import ReactDOM from "react-dom";

    const greeting = <h1>Hello React</h1>;

    // ReactDOM.render(root node, mounting point)
    ReactDOM.render(greeting, document.getElementById("root"));
```

#### Components and Props
Đây là cú pháp cho một *React Component* cơ bản:
```
    import React from "react";

    // 1st component type: function component
    function Header() {
      // function components must be capitalized unlike normal JS functions
      // note the capitalized name here: 'Header'
      return <h1>Hello React</h1>;
    }

    // function components with arrow functions are also valid
    const Header = () => <h1>Hello React</h1>;

    // 2nd component type: class component
    // (classes are another type of function)
    class Header extends React.Component {
      // class components have more boilerplate (with extends and render method)
      render() {
        return <h1>Hello React</h1>;
      }
    }
```

Đây là cách các *components* được sử dụng:

```
    // do we call these function components like normal functions?

    // No, to execute them and display the JSX they return...
    const Header = () => <h1>Hello React</h1>;

    // ...we use them as 'custom' JSX elements
    ReactDOM.render(<Header />, document.getElementById("root"));
    // renders: <h1>Hello React</h1>
```

Các components có thể được sử dụng lại trong app của chúng ta:

```
    // for example, this Header component can be reused in any app page

    // this component shown for the '/' route
    function IndexPage() {
      return (
        <div>
          <Header />
          <Hero />
          <Footer />
        </div>
      );
    }

    // shown for the '/about' route
    function AboutPage() {
      return (
        <div>
          <Header />
          <About />
          <Testimonials />
          <Footer />
        </div>
      );
    }
```

Dữ liệu có thể được truyền tới các *components* một cách *dynamically* thông qua các *props*:
```
    // What if we want to pass data to our component from a parent?
    // I.e. to pass a user's name to display in our Header?

    const username = "John";

    // we add custom 'attributes' called props
    ReactDOM.render(
      <Header username={username} />,
      document.getElementById("root")
    );
    // we called this prop 'username', but can use any valid JS identifier

    // props is the object that every component receives as an argument
    function Header(props) {
      // the props we make on the component (i.e. username)
      // become properties on the props object
      return <h1>Hello {props.username}</h1>;
    }
```

Các *props* không được phép thay đổi một cách trực tiếp mà phải thông qua api của React là *setState* hoặc *useState* (React Hook).

```
    // Components must ideally be 'pure' functions.
    // That is, for every input, we be able to expect the same output

    // we cannot do the following with props:
    function Header(props) {
      // we cannot mutate the props object, we can only read from it
      props.username = "Doug";

      return <h1>Hello {props.username}</h1>;
    }
    // But what if we want to modify a prop value that comes in?
    // That's where we would use state (see the useState section)
```

*Children props* là cách hữu ích để chúng ta truyền các elements/ components như là các *props* tới các *components* khác.

```
    // Can we accept React elements (or components) as props?
    // Yes, through a special property on the props object called 'children'

    function Layout(props) {
      return <div className="container">{props.children}</div>;
    }

    // The children prop is very useful for when you want the same
    // component (such as a Layout component) to wrap all other components:
    function IndexPage() {
      return (
        <Layout>
          <Header />
          <Hero />
          <Footer />
        </Layout>
      );
    }

    // different page, but uses same Layout component (thanks to children prop)
    function AboutPage() {
      return (
        <Layout>
          <About />
          <Footer />
        </Layout>
      );
    }
```

Hiển thị các *components* theo điều kiện với toán tử 3 ngôi và toán tử logic *&&*:

```
    // if-statements are fine to conditionally show , however...
    // ...only ternaries (seen below) allow us to insert these conditionals
    // in JSX, however
    function Header() {
      const isAuthenticated = checkAuth();

      return (
        <nav>
          <Logo />
          {/* if isAuth is true, show AuthLinks. If false, Login  */}
          {isAuthenticated ? <AuthLinks /> : <Login />}
          {/* if isAuth is true, show Greeting. If false, nothing. */}
          {isAuthenticated && <Greeting />}
        </nav>
      );
    }
```

***Fragments*** là *components* đặc biệt cho trường hợp hiển thị nhiều *components* mà không phải thêm mới element vào DOM.
Fragments đặc biệt lý tưởng cho việc hiển thị điều kiện logic như trong ví dụ dưới đây:

```
    // we can improve the logic in the previous example
    // if isAuthenticated is true, how do we display both AuthLinks and Greeting?
    function Header() {
      const isAuthenticated = checkAuth();

      return (
        <nav>
          <Logo />
          {/* we can render both components with a fragment */}
          {/* fragments are very concise: <> </> */}
          {isAuthenticated ? (
            <>
              <AuthLinks />
              <Greeting />
            </>
          ) : (
            <Login />
          )}
        </nav>
      );
    }
```

#### Lists and Keys

Sử dụng ***.map()*** để convert một list các data dạng mảng sang một list các elements hiển thị data đó:
```
    const people = ["John", "Bob", "Fred"];
    const peopleList = people.map(person => <p>{person}</p>);
```

```
    function App() {
      const people = ['John', 'Bob', 'Fred'];
      // can interpolate returned list of elements in {}
      return (
        <ul>
          {/* we're passing each array element as props */}
          {people.map(person => <Person name={person} />}
        </ul>
      );
    }

    function Person({ name }) {
      // gets 'name' prop using object destructuring
      return <p>this person's name is: {name}</p>;
    }
```

Đừng quên thêm *key props* cho các elements khi trả về từ hàm callback của ***.map()***( thực ra là nếu quên thì chúng ta sẽ nhận được các *warning* ngay). *Key props* thường sẽ được lấy luôn theo index của hàm *map()* nhưng nếu data có các thuộc tính không trùng lặp thì ta nên dùng thuộc tính đó làm *key props*.

```
    function App() {
      const people = ['John', 'Bob', 'Fred'];

      return (
        <ul>
          {/* keys need to be primitive values, ideally a generated id */}
          {people.map(person => <Person key={person} name={person} />)}
        </ul>
      );
    }

    // If you don't have ids with your set of data or unique primitive values,
    // you can use the second parameter of .map() to get each elements index
    function App() {
      const people = ['John', 'Bob', 'Fred'];

      return (
        <ul>
          {/* use array element index for key */}
          {people.map((person, i) => <Person key={i} name={person} />)}
        </ul>
      );
    }
```

#### Events and Event Handlers

***Events*** trong React và HTML có đôi chút khác biệt

```
// Note: most event handler functions start with 'handle'
function handleToggleTheme() {
  // code to toggle app theme
}

// in html, onclick is all lowercase
<button onclick="handleToggleTheme()">
  Submit
</button>

// in JSX, onClick is camelcase, like attributes / props
// we also pass a reference to the function with curly braces
<button onClick={handleToggleTheme}>
  Submit
</button>
```

2 events thường được dùng nhiều nhất trong React là *onClick* và *onChange*

* onClick xử lý các events click trong JSX elements
* onChange xử lý các events keyboard.

```
    function App() {
      function handleChange(event) {
        // when passing the function to an event handler, like onChange
        // we get access to data about the event (an object)
        const inputText = event.target.value;
        const inputName = event.target.name; // myInput
        // we get the text typed in and other data from event.target
      }

      function handleSubmit() {
        // on click doesn't usually need event data
      }

      return (
        <div>
          <input type="text" name="myInput" onChange={handleChange} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      );
    }
```

Phần *Core Concepts* khá là tẻ nhạt vì phần lớn các bạn đọc tới đây đều đã nắm khá chắc các khái niệm này rồi, phần sau mình sẽ viết tiếp về ***Hook*** api mới của React, sẽ có nhiều điều thú vị hơn. Chúc các bạn thành công.