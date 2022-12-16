## Using CSS variable
***
Large websites will often use a lot of CSS with large amounts of repetitive value. Assuming that when you want to fix the site's main color, you'll probably have to fix it in a lot of places, such as the button, navbar, title, etc. This causes a lot of difficulty in code as well. When preserving and maintaining website.

To solve this problem we can use CSS pre-processing: SASS, LESS. However, in this way you will need to add a standalone complile step, also need to spend time learning and learn about them and it is very important that you will not be able to use javascript to update the price. Css treatment.

In this article I will introduce you a simpler way is that the variable in css does not need independent compile step at the same time you can completely change the css value with javascript.

However, there is a note here is still an experimental feature should use when you need to note that the browser you develope for support. You can see on this page
### Usage
```
/# Declaring variable #/

element {
  --spacing:10px;
}

/# Using variable #/

element {
  padding: var(--spacing);
}
```

### Using javascrip to change css variable value
```
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        --main-color: red;
      }
      
      .red {
        color: var(--main-color);
      }
      
      .red2 {
        color: var(--main-color);
      }
      
      .red3 {
        color: var(--main-color);
      }
      
    </style>
  </head>

  <body>
    <h1 class="red">Red 1</h1>
    <h1 class="red">Red 2</h1>
    <h1 class="red">Red 3</h1>
  </body>
</html>
```

In the above example, the color of all class  ''red''  elements is set to the ''--main-color '' variable. When you want to change the color, just change the value of the  ''--main-color''  variable.
You can change the value - ''-main-color''  to "blue" with javascript as follows
```

document.querySelector('body').style.setProperty("--main-color",'blue');
```
### The inheritance of CSS variables
```
<style>
    .parent {
      --color: blue;
    }
    .child1 {
      --color: green;
    }
    
    .child1 {
      color:var(--color);
    }
    
    .child2 {
      color:var(--color);
    }
  </style>
  <body>
    <div class="grand-parent">
      <div class="parent">
        <div class="child1">child1</div>
        <div class="child2">child2</div>
      </div>
    </div>
  </body>
```
In the example above:
For class = "child1": color = green that is not blue because this value is defined in class = "child1"
For class = "child2": color = blue because inherited from class = "parent"
For class = "grand-parent": the --color variable does not exist because this variable is only defined in child elements.
### Default value 
You can define the default value when the variable does not exist as follows:
```
element {
  color: var(--main-color, red); /# If --main-color does not exist, then red returns #/
}


element {
  background-color: var(--main-color, --second-color, pink); /# Returns red if --main-color and --second-color do not exist #/
}
```

Reference link .  
https://mytutorials.xyz/post/view/Using-CSS-variables/1/202/202  
https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables#Browser_compatibility