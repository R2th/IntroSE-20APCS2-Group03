## Introduction 
In Backbone's singleton applications, JS uses a lot of routes, so what is routing, and why is it used so much? In this article, we'll look at the issue. This.

Backbone routes and history provide us with the mechanisms by which we can copy URLs and use them to gain accurate insights. It also allows us to use browser navigation with single page applications.

For applications that do not use Routes, our code will look like this:

```javascript
   var View1 = Backbone.View.extend({

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.model.get('Message') + " from the View 1"); 
            return this;
        }
    });

    var View2 = Backbone.View.extend({

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.model.get('Message') + " from the View 2"); 
            return this;
        }
    });

    var View3 = Backbone.View.extend({

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.model.get('Message') + " from the View 3"); 
            return this;
        }
    });
```

Use ContentView to show the data:

```javascript
var ContainerView = Backbone.View.extend({
     myChildView: null,
     
     render: function() {
        this.$el.html("Greeting Area"); 

        this.$el.append(this.myChildView.$el); 
        return this;
    }
});

var greeting = new GreetModel({ Message: "Hello world" });

var container = new ContainerView({ el: $("#AppContainer"), model: greeting });
var view1 = null;
var view2 = null;
var view3 = null;

function showView1() {
    if (view1 == null) {
        view1 = new View1({ model: greeting });
    }

    container.myChildView = view1;
    container.render();
}

function showView2() {
    if (view2 == null) {
        view2 = new View2({ model: greeting });
    }

    container.myChildView = view2;
    container.render();
}

function showView3() {
    if (view3 == null) {
        view3 = new View3({ model: greeting });
    }

    container.myChildView = view3;
    container.render();
}
```

As you can see, when clicking on the buttons to switch views 1, view 2, view 3, the URL does not change.

![](https://images.viblo.asia/8e2b21a0-806d-4d78-afa8-1292854f62ff.jpg)

For applications that use Routes concurrently with passing params from the URL, the code of the routine is as follows:

```javascript
﻿var myRouter = Backbone.Router.extend({

    greeting: null,
    container: null,
    view1: null,
    view2: null,
    view3: null,

    initialize: function () {
        this.greeting = new GreetModel({ Message: "Hello world" });
        this.container = new ContainerView({ el: $("#rAppContainer"), model: this.greeting });
    },

    routes: {
        "": "handleRoute1",
        "view1": "handleRoute1",
        "view2": "handleRoute2",
        "view3": "handleRoute3",
        "view/:viewid(/:msg)": "handleRouteAll"
    },

    handleRoute1: function () {
        if (this.view1 == null) {
            this.view1 = new View1({ model: this.greeting });
        }

        this.container.myChildView = this.view1;
        this.container.render();
    },

    handleRoute2: function () {
        if (this.view2 == null) {
            this.view2 = new View2({ model: this.greeting });
        }

        this.container.myChildView = this.view2;
        this.container.render();
    },

    handleRoute3: function () {
        if (this.view3 == null) {
            this.view3 = new View3({ model: this.greeting });
        }

        this.container.myChildView = this.view3;
        this.container.render();
    },

    handleRouteAll: function (viewid, msg) {

        if (viewid == 1) {
            this.handleRoute1();
        }
        else if (viewid == 2) {
            this.handleRoute2();
        }
        else if (viewid == 3) {
            this.handleRoute3();
        }

        if (msg) {
            alert(msg);
        }
    }
});
```

And we can see the difference when changing the view:

![](https://images.viblo.asia/4cd3cfb3-b008-4953-88ce-8dfef4f2f9ae.jpg)

And with passing other params above the URL:

![](https://images.viblo.asia/5413650d-e12a-4f8f-a422-d590ef3276a3.jpg)