### About the BackboneJs
During the development of the web application, we initially focused on backend development, and now there are many backend frameworks out there such as Yii, Zend, Spring, Truct, Ror .... , to determine the success of a site also includes the integral component of the frontend. So, there are a bunch of frameworks to improve the speed of frontend development such as angularJS, jQuery, bootstrap ... In this article, I focus on introducing backboneJs, a frontend framework, and answering and introduce about questions:
1. What is BackboneJS?
2. What are the main components of BackboneJS?
3. Comparison between BackboneJS and AngularJS?

### I What is BackboneJS?
BackboneJS is a javascript framework for frontend development. This framework is built on the MV model (because it only has a controller), and its highlight is Sync, which allows synchronization of data between client and server with the save () method. We just declare the endpoint, and call the save () method. There is no need to use ajax everywhere.

### II. The main component of BackboneJS
The main components of the backbonejs include Model, View, Router.

Model is the definition of an object in the backbone that includes the attributes and methods involved. One particular thing in the model is that we do not need to predefine all properties of this object, adding the property of an object through its methods!

Structure declaration model:
```
var model_name = Backbone.Model.extend({
    defaults: {
    
    },

    initialize: function(){
    
    },

    myMethod: function(){
    
    }
  });
```
In addition to the methods declared, the backboneJs model includes two default set and get methods written in the form:
```
object.set({attribute_1: value_1, attribute_2: value_2,...});
object.get("attribute_name");
```
In addition, the backbone model supports us to check the value entered through the validate declaration:
```
  validate: function(attribs){
  
  }
  object.set({..., }, {validate : true});
```
Processed in the model when the error occurred
```
   initialize: function(){
        this.on("invalid", function(model, error){
          
        }
    }
```
In addition to capturing events when an error occurs, the backbone also supports event capture when changing the value of an object
```
  initialize: function(){
        this.on("change:#{attribute_name}", function(){
       
        }
    }
```
In addition to writing in the contructor method of the object, you can also add the function of the object itself
```
 object.on("change[:attribute_name]", function(){
        //Todo something
})
```
View is not part of our application, but it supports the model of displaying data to users through the interface using the Javascript template. The render () method of the view can be synchronized with the model change event without refreshing the entire page, which is a strong point of the backbone.

To create a new view, we simply declare the structure:
```
    Var model_name = Backbone.View.extend({
        el: <phần_tử được_xác_định_trên_html>,
        render: function( event ){
        var template = _.template( <template>.html() );
        this.$el.html(template);
        return this;
        },
        events: {
            "submit <tên_phần_tử>": "<phương_thức>"
        },
        <phương_thưc>: function( event ){
            //todo
        }
    });
```
template declaration
```
<script type="text/template" id="<tên_template>">
    //Content
</script>
```
To render, we treat it as a method of the object. Routers Routers in the backbone are used to manage the status of the site and connect the event requests through the url. They are used through the browser's pushState and History APIs. To define a routers, we do the following:
```
var router_name = Backbone.Router.extend({
    routes: {
        "state" : "method_name",
        "*other" : "defaultRoute"
    },
    method_name: function(){
        //Todo something
    },
    defaultRoute: function(other){
        //Todo something
    }
})
```
Next, we need to initialize Backbone.history, which automatically handles hash events in the application and automatically handles the specified routing and triggers a callback when the user requests it. Enabling the backbone history simply by doing the following:
```
Backbone.history.start();
Router.navigate();
```
At the same time, we declare .navigate () in the method to update the URL. If you do not want to execute the method, do the following:
```
method_name: function(factor){
        //Todo something
        this.navigate("extent_url/" + factor);
}
```
If you want to execute this method, just add it true
```
 method_name: function(factor){
        //Todo something
        this.navigate("extent_url/" + factor, true);
}
```
Because the Backbone lacks a controler, so much work is being done, as the controls in the controler are now scattered into the model and view. However, its plus is quite a lot, such as declaring a view or declaring and handling events fairly simple, besides, the direct synchronization between model and view is a plus. Floating the framework of this.

Here, the article has introduced the backbone and backbone components. In the next article, I will introduce you to build a RESTful application with backbone, and some advanced concepts. Alternatively, refer to http://backbonejs.org/ or Developing Backbone.js Applications book

Thanks everyone!