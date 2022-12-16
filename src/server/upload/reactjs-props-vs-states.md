Recently, I have been learnt and working ReactJs. I noticed that we have a  lot of place using `props` and `states`. So what are they? what are different points bewteen `props` and `states` ?. In this article, i will talk about defferent bewteen `props` and `states`.

### **What is the difference between Props and State in React?**

* Props stands for Properties. It is a React built-in object that stores the value of tag attributes and behaves similarly to HTML attributes. Props allows us to communicate between components by passing parameters back and forth between components.
* State is a built-in React object that is used to hold data or information about the Component. State in a component is mutable and whenever it changes, the component will re-render. Let's go deeper into props and state .

The main difference between them is that `props` can't be changed, while `state` can be changed. In this point, we should to know about the concept of Stateful components and Stateless components.

**What is Stateless Components?** Stateless components are components that only contain props, components of this type only used to render() are more efficient.

**What is Stateful Components?** Stateful Components are components that contain both props and state, these components are used to process data, respond to user requests, suitable for the client server model...

### Props
In ReactJs props is just a object what we can store data and pass to the component as a attribute in Tag. And that is only ways that component can get the data from outside the component. Let see code below:

```
function Hello(props) {
  return (
    <h1>
       Hello, {props.name}
    </h1>
  );
}

export default function App() {
  return (
    <div className="App">
      <Hello name='Kane' />
    </div>
  );
}
```

Now we can see `Hello` component. {props.name} is a props and a attributes in the tag that we need to pass data into component.

### State
State is similar to props, but it is only inside the component and is fully controlled by them. State is mutable and every time the state changes the component will be re-rendered. State is dynamic data, it allows a component to track information.

```
function Hello(props) {
  const [name, setName] = useState(props.name);
  const handleChange = (event) => {
    const el = event.target;
    setName(el.value);
  };
  return (
    <h1>
        <input value={name} onChange={handleInputChange} />
         Hello, {name}
    </h1>
  );
}

export default function App() {
  return (
    <div className="App">
      <Hello name='Kane' />
    </div>
  );
}
```

In code above, we can see state `name` that we use track on value name change and the component will re render when that state `name` change.

At last, let's see the comparison between `state` and `props`:
* They can be initialed value from parent component.
* They can be initialed value from child component.
* `props` can be changed by parent component, while `state` can not.
* `state` can be changed inside component, while `props` can not.
* `props` can be changed by child component, while `state` can not.