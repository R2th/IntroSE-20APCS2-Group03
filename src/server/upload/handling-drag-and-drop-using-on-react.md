We'll build a Kanban styled todo list using reactjs today. Here's a peak of our end product.
![](https://images.viblo.asia/ee329fc4-9202-47b1-b280-b418c6bd2e84.gif)
Let's get started. First off, we create our project 
```sh
npx create-react-app react_drag_and_drop
cd react_drag_and_drop
```

And remove everything inside other than `index.js` ,

We'll be using the [React Beautiful Dnd](https://github.com/atlassian/react-beautiful-dnd) package for our project. 
```sh
npm i styled-components react-beautiful-dnd modern-css-reset
```

There are 3 important components to know about the `react-beautiful-dnd` plugin. `DragDropContext`, `Droppable` and `Draggable`.

It's shown in the diagram below
![dnd context](https://images.viblo.asia/f85d4f3c-0ced-4a3f-aac1-fc302d326a78.png)
For `Draggable` anad `Droppable` to work it has to be inside a `DragDropContext`, the `Draggable` can be dragged and dropped in a `Droppable` element.

Now, we need to create a datasource to feed our app.
```js
# touch data.js

const initialData = {
  tasks: {
    'task-1' : { id: 'task-1', content: 'Escape from Arkham'},
    'task-2' : { id: 'task-2', content: 'Free Harley Quinn'},
    'task-3' : { id: 'task-3', content: 'Hire Poison Ivy'},
    'task-4' : { id: 'task-4', content: 'Hire Bane'},
    'task-5' : { id: 'task-5', content: 'Kill Batman'},
    'task-6' : { id: 'task-6', content: 'Rule Gotham City'},
  },
  columns: {
    'column-1' : {
      id: 'column-1',
      title: 'Todo',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
    },
    'column-2' : {
      id: 'column-2',
      title: 'Doing',
      taskIds: []
    },
    'column-3' : {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    },
  },
  columnOrder: ['column-1','column-2','column-3'],
}

export default initialData;
```

All tasks in our app will reside inside the `tasks` key, the `columns` will hold all the columns, and `columnOrder` will hold the order how the columns are ordered in our app.

Let's modify our `index.jsx` file,
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import initialData from './data';
import Column from './column';
import reportWebVitals from './reportWebVitals';
import 'modern-css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  padding: 30px;
`;

class App extends React.Component {
  state = initialData;

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        {
          this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })
        }
      </DragDropContext>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
```

We loop through the `columnOrder` and map the `Columns`, ofcoure we haven't created the `Column` file yet. So, type in that

```jsx
# touch column.jsx

import React from 'react';
import styled from 'styled-components';
import Task from './task';
import {Droppable} from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  width: 400px;
  background: #d6d6d6;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id} >
          {(provided) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}
```

Here we loop through the tasks inside the column. Ofcourse, because we will drop tasks inside the columns, we need to wrap it in a `Droppable` tag.  We also need to send a `provided` param inside. This is to keep track of which components can have items dropped in.
So, each `Task` should be marked as that. So, each TaskList gets `ref={provided.innerRef}` and need the droppableProps `{...provided.droppableProps}`

We haven't created any `Task` component yet, so let's create that.
```jsx
import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const TaskContainer = styled.div`
  border: 2px solid #5fd1f3;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 10px;
  background: #89e4dc;
`;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided) => (
          <TaskContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {this.props.task.content}
          </TaskContainer>
        )}
      </Draggable>
    );
  }
}
```

This is almost as same as the columns component. Just we are importing `Draggable` instead of `Droppable`
Also, some little difference here and there

```jsx
<TaskContainer
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps} <<<<// Which part of the task can be clicked to drag the entire task. The whole task in this case.
```

That's it. Now let's run our app
```sh
npm start
```

![](https://images.viblo.asia/b53b35f4-1244-4fee-950a-1221e42f32ba.gif)

So, our drag and drop runs great, but it doesn't save any state. We need to handle that on our `DragDropContext` in `index.jsx` file.

```jsx
<DragDropContext
  onDragStart           <<//  What to do when someone started dragging
  onDragUpdate          <<//  What to do when someone is dragging
  onDragEnd             <<// (Required) What to do when someone has dropped the element.
>
```

The `onDragEnd` is most important, we need to pass a function here to handle what to do. For now, let's add a `console.log` to see what it does
![](https://images.viblo.asia/26e1d6f7-f2a3-48a2-be72-869f6b4b3d3c.gif)

After you've dropped a component, you'll get a json object. Which will have the `source` and `destination` keys. From that, we know where will be the new destination for our tasks.

Now, let's create a function that will handle this for us.
```jsx
onDragEnd = result => {
    const {destination, source, draggableId} = result;

    if(!destination) {return}

    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }

      this.setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

   const newState = {
     ...this.state,
     columns: {
       ...this.state.columns,
       [newStart.id]: newStart,
       [newFinish.id]: newFinish,
     }
   }

   this.setState(newState);
  }
```

That's it. Here's the final code for `index.jsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import initialData from './data';
import Column from './column';
import reportWebVitals from './reportWebVitals';
import 'modern-css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  padding: 30px;
`;

class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const {destination, source, draggableId} = result;

    if(!destination) {return}

    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }

      this.setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

   const newState = {
     ...this.state,
     columns: {
       ...this.state.columns,
       [newStart.id]: newStart,
       [newFinish.id]: newFinish,
     }
   }

   this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        {
          this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })
        }
      </DragDropContext>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
```


# Source code

https://github.com/Salekin-1169/react_drag_and_drop