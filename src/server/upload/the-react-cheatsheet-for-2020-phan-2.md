### React Hooks
#### State and useState
*useState* tạo ra một *local state* trong một function component:
```
import React, { useState } from "react";

function App() {
  const [language] = useState("javascript");

  return <div>I am learning {language}</div>;
}
```

useState còn cung cấp cho chúng ta một hàm *setter* để update *state* mà nó tạo ra:
```
function App() {
  // the setter function is always the second destructured value
  const [language, setLanguage] = React.useState("python");
  // the convention for the setter name is 'setStateVariable'

  return (
    <div>
      {/*  why use an arrow function here instead onClick={setterFn()} ? */}
      <button onClick={() => setLanguage("javascript")}>
        Change language to JS
      </button>
      {/*  if not, setLanguage would be called immediately and not on click */}
      <p>I am now learning {language}</p>
    </div>
  );
}

// note that whenever the setter function is called, the state updates,
// and the App component re-renders to display the new state
```

*useState* có thể được sử dụng một hoặc nhiều lần trong một component:

```
function App() {
  const [language, setLanguage] = React.useState("python");
  const [yearsExperience, setYearsExperience] = React.useState(0);

  return (
    <div>
      <button onClick={() => setLanguage("javascript")}>
        Change language to JS
      </button>
      <input
        type="number"
        value={yearsExperience}
        onChange={event => setYearsExperience(event.target.value)}
      />
      <p>I am now learning {language}</p>
      <p>I have {yearsExperience} years of experience</p>
    </div>
  );
}
```

*useState* có thể cho phép các giá trị nguyên thủy hoặc *object* để quản lý *state*:

```
// we have the option to organize state using whatever is the
// most appropriate data type, according to the data we're tracking
function App() {
  const [developer, setDeveloper] = React.useState({
    language: "",
    yearsExperience: 0
  });

  function handleChangeYearsExperience(event) {
    const years = event.target.value;
    // we must pass in the previous state object we had with the spread operator
    setDeveloper({ ...developer, yearsExperience: years });
  }

  return (
    <div>
      {/* no need to get prev state here; we are replacing the entire object */}
      <button
        onClick={() =>
          setDeveloper({
            language: "javascript",
            yearsExperience: 0
          })
        }
      >
        Change language to JS
      </button>
      {/* we can also pass a reference to the function */}
      <input
        type="number"
        value={developer.yearsExperience}
        onChange={handleChangeYearsExperience}
      />
      <p>I am now learning {developer.language}</p>
      <p>I have {developer.yearsExperience} years of experience</p>
    </div>
  );
}
```
Nếu *new state* phụ thuộc vào *previous state*, để chắc chắn rằng state được update chính xác, chúng ta có thể sử dụng 1 hàm callback bên trong hàm setter để lấy ra *previous state* mới nhất.
```
function App() {
  const [developer, setDeveloper] = React.useState({
    language: "",
    yearsExperience: 0,
    isEmployed: false
  });

  function handleToggleEmployment(event) {
    // we get the previous state variable's value in the parameters
    // we can name 'prevState' however we like
    setDeveloper(prevState => {
      return { ...prevState, isEmployed: !prevState.isEmployed };
      // it is essential to return the new state from this function
    });
  }

  return (
    <button onClick={handleToggleEmployment}>Toggle Employment Status</button>
  );
}
```

#### Side effects and useEffect

##### *useEffect* dùng để xử lý các *side effects* trong function components. Vậy *side efects* là gì?
* *Side effects* là các xử lý như là fetch data, thao tác với DOM...
* *Side effects* là các thao tác mà có thể thay đổi các *component state* theo một cách không đoán định được.

***useEffect*** cho phép một callback function (gọi là *effect function*), cái mà sẽ chạy một cách mặc định mỗi khi component re-render. Nó được sử dụng để thay thể cho *life cycle* componentDidMount và componentDidUpdate.
```
// what does our code do? Picks a color from the colors array
// and makes it the background color
function App() {
  const [colorIndex, setColorIndex] = React.useState(0);
  const colors = ["blue", "green", "red", "orange"];

  // we are performing a 'side effect' since we are working with an API
  // we are working with the DOM, a browser API outside of React
  useEffect(() => {
    document.body.style.backgroundColor = colors[colorIndex];
  });
  // whenever state is updated, App re-renders and useEffect runs

  function handleChangeIndex() {
    const next = colorIndex + 1 === colors.length ? 0 : colorIndex + 1;
    setColorIndex(next);
  }

  return <button onClick={handleChangeIndex}>Change background color</button>;
}
```
Để tránh thực thi hàm effect callback sau mỗi lần render, chúng ta thêm vào tham số thứ 2 là một mảng rỗng:
```
function App() {
  ...
  // now our button doesn't work no matter how many times we click it...
  useEffect(() => {
    document.body.style.backgroundColor = colors[colorIndex];
  }, []);
  // the background color is only set once, upon mount

  // how do we not have the effect function run for every state update...
  // but still have it work whenever the button is clicked?

  return (
    <button onClick={handleChangeIndex}>
      Change background color
    </button>
  );
}
```
*useEffect* cho phép chúng ta  thực thi các hàm effects với mảng phụ thuộc.

Mảng phụ thuộc là tham số thứ 2 ở trên, và nếu có bất kì giá trị nào trong mảng thay đổi, hàm effect sẽ được thực thi lại.
```
function App() {
  const [colorIndex, setColorIndex] = React.useState(0);
  const colors = ["blue", "green", "red", "orange"];

  // we add colorIndex to our dependencies array
  // when colorIndex changes, useEffect will execute the effect fn again
  useEffect(() => {
    document.body.style.backgroundColor = colors[colorIndex];
    // when we use useEffect, we must think about what state values
    // we want our side effect to sync with
  }, [colorIndex]);

  function handleChangeIndex() {
    const next = colorIndex + 1 === colors.length ? 0 : colorIndex + 1;
    setColorIndex(next);
  }

  return <button onClick={handleChangeIndex}>Change background color</button>;
}
```

Trong *useEffect* để unsubscribe một event chúng ta trả về một hàm ở cuối mỗi effect subscribe event đó, cụ thể như ví dụ sau

```
function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    // .addEventListener() sets up an active listener...
    window.addEventListener("mousemove", event => {
      const { pageX, pageY } = event;
      setMousePosition({ x: pageX, y: pageY });
    });

    // ...so when we navigate away from this page, it needs to be
    // removed to stop listening. Otherwise, it will try to set
    // state in a component that doesn't exist (causing an error)

    // We unsubscribe any subscriptions / listeners w/ this 'cleanup function'
    return () => {
      window.removeEventListener("mousemove", event => {
        const { pageX, pageY } = event;
        setMousePosition({ x: pageX, y: pageY });
      });
    };
  }, []);

  return (
    <div>
      <h1>The current mouse position is:</h1>
      <p>
        X: {mousePosition.x}, Y: {mousePosition.y}
      </p>
    </div>
  );
}

// Note: we could extract the reused logic in the callbacks to
// their own function, but I believe this is more readable
```