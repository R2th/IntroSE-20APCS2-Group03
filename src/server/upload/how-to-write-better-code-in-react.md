ReactJS is an isomorphic JavaScript library developed by Facebook for building user interfaces. Taking component-based approach to front-end web development while utilizing server-side rendering and the Virtual DOM, ReactJS provides a performance-oriented solution for designing encapsulated & reusable UI components.

This article represents some tips and best practices of writing code in ReactJS that you might want to keep in mind as you bring your next ReactJS project to life.

![](https://images.viblo.asia/a05de564-17a2-4d6b-b91a-ac0449f0270c.png)

# 1. DRY
DRY is the abbreviation of “Don’t Repeat Yourself.” If you are doing the same thing in multiple places, consider consolidating the duplicated code. One of the indications of DRYing is that you can see patterns in your code.

```javascript
// Bad
const UserList = () => (
  <div>
    <User
      type="teacher"
      className="user user-primary"
      onEdit={id => this.edit(id)}
      onRemove={id => this.remove(id)}
    />
    <User
      type="student"
      className="user user-primary" 
      onEdit={id => this.edit(id)}
      onRemove={id => this.remove(id)}
    />   
  </div>
);
```

```javascript
// Good
const UserPlaceHolder = ({ type }) => (
  <User
    type={type}
    className="user user-primary"
    onRemove={id => this.remove(id)}
  />
);
const UserList = () => (
  <div>
    <UserPlaceHolder type="teacher" />
    <UserPlaceHolder type="student" />
  </div>
);
```

Sometimes, despite of improving maintainability generally, DRYing your code might actually increase code size (as in our example above). Also, be aware that it’s possible to go too far with DRYing up your code, so know ***when to say when***.

# 2. Self-commenting
Has this ever happened in your life before? You wrote some code and guarantee it was fully commented. The familiar scenario is that you suddenly found out a bug and decided to go back and modify the code. Did you remember to change your comments as well to reflect the new logic? Maybe. Maybe not. The next person, maybe a junior developer, who looked at your code then may have gone down a rabbit hole because they focused on the comments.

The main purpose of adding comments is to explain complex thoughts. So **don’t comment on the obvious**. Fewer comments also reduces visual clutter significantly.

```javascript
// Dirty
const fetchUser = (id) => (
  fetch(buildUri`/users/${id}`) // Get User DTO record from REST API
    .then(convertFormat) // Convert to snakeCase
    .then(validateUser) // Make sure the the user is valid
);
```

In the clean version, we rename some of the functions to better describe what they do. In addition to eliminating the need for comments and reducing visual clutter, this also limits the potential confusion of the code not matching the comments later.

```javascript
// Bad
const fetchUser = id => (
  fetch(`${API_END_POINT}/users/${id}`) // Get user data from REST API
    .then(convertFormat)                // Convert to camel-case
    .then(validateUser)                 // Make sure the the user is valid
);
```

```javascript
// Good
const fetchUser = (id) => (
  fetch(`${API_END_POINT}/users/${id}`)
    .then(snakeToCamelCase)
    .then(validateUser)
);
```

# 3. Naming Convention
Boolean variables and functions that return a boolean value should has **“is,” “has” or “should”-prefix**. (Self-study of English grammar might help, duh...)

```javascript
// Bad
const passed = score >= minimumScore;
```

```javascript
// Good
const hasPassed = score >= minimumScore;
```

As for functions, their name should describe what they do, not how they do it. In other words, never expose details of the implementation in the name. Why? Because how you do it may change someday, for real. And you shouldn’t need to refactor your consuming code because of "familiar scenario". For example, you (or your funky Technical Leader) may load your i18n from a REST API today, but you (or your Technical Leader, again) may decide to bake it into a json file on client-side tomorrow.
```javascript
// Dirty
const loadI18NFromServer = () => {
  ...
};
```

```javascript
// Clean
const loadI18N = () => {
  ...
};
```

# 4. Declaration of default values
The following code snippet defaults the `className` to “btn__primary” using a logical OR statement, which is kind of similar to the way your grand-grand-grand-grandfather might have done it during his glorious time.
```javascript
// Bad
const Button = ({ className, onClick }) => {
  const additionalClasses = className || 'btn__primary';
  return (
    <button
      className={`btn ${additionalClasses}`}
      onClick={onClick}>
    </button>
  );
};
```

Fortunately, ES6's default syntax has come to the rescue. We can now use ES6’s single statement form of the fat-arrow function, therefore, eliminating the need for the return statement.

```javascript
// Good
const Button = ({ className = 'btn__primary', onClick }) => (
  <button
    className={`btn ${btn__primary}`}
    onClick={onClick}
  />
);
```

In this even cleaner version, the default values are set in React.
```javascript
// Best
const Button = ({ className, onClick }) => (
  <button
    className={`btn ${btn__primary}`}
    onClick={onClick}
  />
);
Button.defaultProps = {
  className: 'btn__primary',
};
```

Really? Why bother? After all, all three versions do the same thing, don't they? For the most part, yes. The advantage of letting React set your prop defaults, however, is that it produces more efficient code, defaults props in a Class based lifecycle component, as well as allows your default values to be checked against propTypes. But there is one more advantage: it **declutters the default logic from that of the component itself**.

# 5. Separation between Stateful Aspects & Rendering
Most of the component complexity is the consequence of mixing your stateful data-loading logic with your rendering (or *presentation*). The optimal solution is:
- Write a stateful container component whose sole responsibility is to load the data. 
- Write another component which is responsible for displaying the data. 
=> This is called the **Container Pattern**.

In the example below, user data is loading and is displayed in a single component.

```javascript
// Bad
class StudentDetail extends React.Component {
  state = { loading: true };

  render() {
    const { loading, student } = this.state;
    return loading
      ? <div>Loading...</div>
      : <div>
          <p>
            First name: {student.firstName}
          </p>
          <p>
            First name: {student.lastName}
          </p>
        </div>;
  }

  componentDidMount() {
    fetchStudent(this.props.id)
      .then(student => this.setState({ loading: false, student }))
  }
}
```

```javascript
// Good
import Student from './Student';
import Loader from './Loader';

class StudentDetail extends Component {
  state = { loading: true };

  render() {
    const { loading, student } = this.state;
    return loading ? <Loader /> : <Student student={student} />;
  }

  componentDidMount() {
    fetchStudent(this.props.id)
      .then(student => this.setState({ loading: false, student }));
  }
}
```

In the clean version, the concerns – loading data, displaying a loading spinner, and displaying data – have been separated. Not only does this make the code easier to understand, but testing will also require a lot less effort as you can test each concern independently. And due to `Student` being a stateless component, the results are predictable.


# 6. Stateless components
Stateless components were introduced in React v0.14 and thank to them, we are able to simplify a render-only component greatly. However, some developers haven’t let go of the past. For example, the following component is ripe for converting to an stateless component.
```javascript
// Good
class Teacher extends React.Component {
  render() {
    return (
      <div>
        <p>First name: {this.props.firstName}</p>
        <p>Last name: {this.props.lastName}</p>
        <p>Subject: {this.props.teachingSubject}</p>
      </div>
    );
  }
}
```

The clean version clears a lot of the screen clutter of the dirty version. Through optimization of React’s core, it’s possible to use far less memory, as no instance is created.

```javascript
// Clean
const Teacher = ({ firstName, lastName, teachingSubject }) => (
  <div>
    <p>First name: {firstName}</p>
    <p>Last name: {lastName}</p>
    <p>Subject: {teachingSubject}</p>
  </div>
);
```

# 7. Rest/spread operator
I used to have a strong belief that `Object.assign` would become befriend with everyone for eternity. Well time changes, nothing last forever and friendship is no exception. Say hello to **rest/spread spec in ES2016/ES7**.

Take account of the case in which you pass some props to a component. You’d like to use `className` property in the component itself, but pass all other props down the chain. You would do something like this.

```javascript
// Bad
const ParentComponent = (props) => {
  const data = Object.assign({}, props);
  delete data.className;
  return (
    <div className={props.className}>
      <ChildComponent data={data} />
    </div>
  );
};
```

Well, it is indeed not a very elegant solution without rest/spread...

```javascript
// Good
const ParentComponent = ({ className, ...rest }) => (
  <div className={className}>
    <ChildComponent {...rest} />
  </div>
);
```

We take the “rest” of the properties and we “spread” them as new props to `ChildComponent`. (Sometimes things just name themselves…)

# 8. Destructuring whenever possible
ES6 introduced the concept of destructuring, which serve as another bestfriend, beside the spread/rest operator. **Destructuring allows you to “pull apart” properties of an object or elements of an array.**

Object destructuring
```javascript
// Bad
const firstName = this.props.student.firstName;
const lastName = this.props.student.lastName;
```

```javascript
// Good
const { firstName, lastName } = this.props.student;
```

Array destructuring
```javascript
// Bad
const splitName = fullName.split(' ');
const firstName = splitName[0];
const lastName = splitName[1];
```
```javavascript
// Good
const [firstName, lastName] = fullName.split(' ');
```

## Conclusion
Whether you’re a developer looking to explore this powerful library, or an entrepreneur trying to assess a new technology for their product, I hope these tips and best practices should help boost your confidence to dive right into the world of React.