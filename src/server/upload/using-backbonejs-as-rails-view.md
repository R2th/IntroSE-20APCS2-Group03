### "Backbone.js is a new exciting MVC framework for creating Single Page Applications"

Okay, lets point out the errors of the previous statement.

### New
Ya, sure, lol. BB.js is right now considered as the grandfather of all frameworks (amber, angular, react, vue, aurelia)
It came out at the year 2010, developed by [Jeremy Ashkenas](https://github.com/jashkenas) (also reknowned for CoffeeScript, UnderScore.js), and was the first of it's kind.

### MVC
This is not entirely true. BackBone.js has models and views, but it has no controllers. Kinda like the Django framework, where they call controllers as Views and views as Templates.
In Backbone.js the View also double as a Controller. So, newcomers often find it a little confusing. If it's any help, you can think it's more like an MVVM architecture.

### Framework
Another misconseption. BB isn't a framework at all. It's a library at best. Which provides a plethora of options and flexibility.

# Why
Frontend web developement was getting more and more messier as the days went, because of the increasing use of JavaScript. Devs trying to add more and more interactivity
to their pages, and thus even small scale sites became pretty much a gigantic mess after a year or two. BackBone.js tried to fix this clutter by adding some
stucture to the frontend.


So, why would you want to learn it in 2018?


Two reasons, to be honest.
  1. You want to write a JS framework of your own, so want to learn how different tools were implemented.
  2. (more common one, and also my case) You got assigned in an existing project which was developed using Backbone.

So, which case is it for you, you'll have fun learning it. The whole library is just 1000 lines long (excluding the comments), and very elegantly written.

#### Now let's discuss some basics of a Backbone application.

## Models
Just as any other library or framework, models are the heart of the application. This is how you represent your data. If your project is a glorified ToDo list, then each todo item would be represented as a model. Here's a sample:

```JavaScript
const Todo = Backbone.Model.extend({
  urlRoot: 'api/todos',
  defaults: {
    title: '',
    description: '',
    isCompleted: false
  },
  validate: function(attrs) {
    if(!attrs.title)
      return "Title is required!"
  }
});
```

and to initialize,
```JavaScript
let aTodo = new Todo({title: 'Get alcohol', description: 'Title is self-explanatory'});
```

One thing to note that, we can't get/set value on models like regular JavaScript objects.
So, this won't work.
`
aTodo.isCompleted = true;
`

instead, we need to use the getter / setter methods to change the values of our model

```JavaScript
  aTodo.set("isCompleted": true);
```

After a model is changed, it notifies is related view. Backbone does this with the help of 'on' event,
here's a sample

```JavaScript
aTodo.on({
  "change:title change:description change:isCompleted": todoView.update,
});
```


## Collections
A collection in backbone is just a list of backbone model objects of same type.

```JavaScript
const Todos = Backbone.Collection.extend({
  model: todo,
  url: 'api/todos'
});

let todos = new Todos([
  new Todo({title: 'todo-1', description: 'XYZ'}),
  new Todo({title: 'todo-2', description: 'MNO'}),
  new Todo({title: 'todo-3', description: 'PQR'})
])
```

You can add/remove items in a collection using the `.add(model)` and `.remove(index_of_model)`
And, search in a collection using the `where(...)` method.

```JavaScript
  todos.add(new Todo({...});

  todos.remove(todos.at(0));

  let completed_todos = todos.where({ isComplete: true });
```

## Views
As you've already guessed it, Backbone views are responsible for rendering data to the browser.

```JavaScript
const TodoView = BackBone.View.extend({
    tagName: "li",
    className: "todo_item",

    render: () => {
      this.$el.html("Finish this report");
      return this;
    }
});
```

Now, to pass a model to a view

```JavaScript
let aTodo = new Todo({title: 'Get alcohol', description: 'Title is self-explanatory'});

const TodoView = BackBone.View.extend({
    tagName: "li",
    className: "todo_item",

    render: () => {
      this.$el.html(this.model.get("title"));
      return this;
    }
});


let todoView = new TodoView({
  el: "#container",
  model: aTodo
});

todoView.render();
```

You can also render collections like this

```JavaScript

const todos = new Todos([
  new Todo({title: 'todo-1', description: 'XYZ'}),
  new Todo({title: 'todo-2', description: 'MNO'}),
  new Todo({title: 'todo-3', description: 'PQR'})
])

const TodosView = BackBone.View.extend({
  render: function(){
    const self = this;
    this.model.each(function(todo){
      let todoView = new TodoView({model: song});
      self.$el.append(todoView.render().$el);
    })
  }
});

let todosView = new TodosView({model: todos}); // even though we are passing a collection.
todosView.render();
```

# Templates
If we assume Views in BackBone as more like a Controller of traditional MVC, then the Templates will be the View.
BackBone is felxible and supports most templating engines such as handlebars, mustache and underscore.js's template

Here is a sample template.

```HTML
<h1>New todo</h1>

<form id="new-todo" name="todo">
  <div class="field">
    <label for="title"> title:</label>
    <input type="text" name="title" id="title" value="<%= title %>" >
  </div>

  <div class="field">
    <label for="description"> description:</label>
    <input type="text" name="description" id="description" value="<%= description %>" >
  </div>

  <div class="actions">
    <input type="submit" value="Create Todo" />
  </div>

</form>

<a href="#/index">Back</a>
```

# Using with rails 5
Let's create a rails application. And use BackBone.js to generate it's views.

```bash
rails new todo_application
```

We will use scaffold to generate everything necessary here.
```bash
rails g scaffold todo title description
```

Finally, run `rails db:migrate` to add the migrations in database.

Scaffold has created everything we need, including the View codes in ERB. You can delete everything inside the views/todos folder
except the `index.html.erb` file.

Now, to install Backbone.js, we need to meet some dependencies.

First, add jquery, and backbone gem to our Gemfile

```
gem 'jquery-rails'
gem 'rails-backbone'
```

And run `bundle`

Now, we need to add jquery to load in our `application.js` file.
Note, we haven't added `UnderScore.js` here, even Backbone.js has hard dependency on underscore.
That's because 'rails-backbone' gem will take care of that for us.

```JavaScript
//= require jquery
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require underscore
//= require backbone
//= require backbone_rails_sync
//= require backbone_datalink
//= require backbone/todo_application
//= require_tree .
```

Now, if you run `rails c` and open your browsers console, you can see if BackBone was properly loaded by typing `backbone` there.

We, will again use scaffolds to generate the views using Backbone.


To do that, run `rails g backbone:install`

```
Running via Spring preloader in process 30206

insert  app/assets/javascripts/application.js
create  app/assets/javascripts/backbone/routers
create  app/assets/javascripts/backbone/routers/.gitkeep
create  app/assets/javascripts/backbone/models
create  app/assets/javascripts/backbone/models/.gitkeep
create  app/assets/javascripts/backbone/views
create  app/assets/javascripts/backbone/views/.gitkeep
create  app/assets/javascripts/backbone/templates
create  app/assets/javascripts/backbone/templates/.gitkeep
create  app/assets/javascripts/backbone/todo_application.js.coffee
```


Now, we use backbone:scaffold to generate our views.


`rails g backbone:scaffold todo title:string description:string`

This will generate all the necessary files

```
Running via Spring preloader in process 30257

create  app/assets/javascripts/backbone/models/todo.js.coffee
create  app/assets/javascripts/backbone/routers/todos_router.js.coffee
create  app/assets/javascripts/backbone/views/todos/index_view.js.coffee
create  app/assets/javascripts/backbone/templates/todos/index.jst.ejs
create  app/assets/javascripts/backbone/views/todos/show_view.js.coffee
create  app/assets/javascripts/backbone/templates/todos/show.jst.ejs
create  app/assets/javascripts/backbone/views/todos/new_view.js.coffee
create  app/assets/javascripts/backbone/templates/todos/new.jst.ejs
create  app/assets/javascripts/backbone/views/todos/edit_view.js.coffee
create  app/assets/javascripts/backbone/templates/todos/edit.jst.ejs
create  app/assets/javascripts/backbone/views/todos/todo_view.js.coffee
create  app/assets/javascripts/backbone/templates/todos/todo.jst.ejs
```


By default, the gem uses CoffeeScript as it's language. If we open the generated Todo model, we will see it's identical with our example above, though missing some attributes, and validation method.

```CoffeeScript
class TodoApplication.Models.Todo extends Backbone.Model
  paramRoot: 'todo'

  defaults:
    title: ""
    description: ""

class TodoApplication.Collections.TodosCollection extends Backbone.Collection
  model: TodoApplication.Models.Todo
  url: '/todos'

```


For almost in each model, Backbone.js will need a router, to help navigate our application.
Here's the generated route from our scaffold command.
```CoffeeScript
class TodoApplication.Routers.TodosRouter extends Backbone.Router
  initialize: (options) ->
    @todos = new TodoApplication.Collections.TodosCollection()
    @todos.reset options.todos

  routes:
    "new"      : "newTodo"
    "index"    : "index"
    ":id/edit" : "edit"
    ":id"      : "show"
    ".*"        : "index"

  newTodo: ->
    @view = new TodoApplication.Views.Todos.NewView(collection: @todos)
    $("#todos").html(@view.render().el)

  index: ->
    @view = new TodoApplication.Views.Todos.IndexView(collection: @todos)
    $("#todos").html(@view.render().el)

  show: (id) ->
    todo = @todos.get(id)

    @view = new TodoApplication.Views.Todos.ShowView(model: todo)
    $("#todos").html(@view.render().el)

  edit: (id) ->
    todo = @todos.get(id)

    @view = new TodoApplication.Views.Todos.EditView(model: todo)
    $("#todos").html(@view.render().el)
```

### Wiring up with rails
Now, both our rails's model, controllers and Backbone's model, view, collection, routes in place,
we just need to command rails to use the backbone's view instead of it's own.

In generic rails app, this was the flow of data

```
View <=> Controller <=> Model
```

In Backbone-rails app, the direction flow will be changed to

```
BB View <=> BB Model <=> Rails Controller <=> Rails Model
```

Now, remember, we have removed all our scaffold generated rails view files except the 'index.html.erb',
open that and replace it with the following 

```JavaScript
<div id="todos"></div>  // Should match from the id defined in todos.router

<script type="text/javascript">
  $(function() {
    window.router = new TodoApplication.Routers.TodosRouter({todos: <%= @todos.to_json.html_safe -%>});
    if(!Backbone.History.started)  {
      Backbone.history.start();
    }
  });
</script>
```

Now, save the file, and run `rails s`
You now have a functioning Backbone rails application.

[Here is the source code](https://github.com/SSalekin/backbone_rails_demo) you can download and fiddle with.

# Study material

[What is the purpose of BackBone.js?](https://stackoverflow.com/questions/5418369/what-is-the-purpose-of-backbone-js?rq=1)

[ToDo MVC ](http://todomvc.com/examples/backbone/)

[Annotated source code of BackBone.js](http://backbonejs.org/docs/backbone.html)