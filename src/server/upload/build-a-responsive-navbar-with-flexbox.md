In this post, we're going to build a responsive navbar with a CSS3 feature called flexbox. This is a very cool feature and a truly life-saver for any developers struggling with centering  things (vertical & horizontal, especially vertical center).

This post includes two parts, this is the part one, the part two will come soon.

### 1. Hamburger

The first thing we're going to build is the hamburger icon. There're are two parts that we need to figure out. First is its appearance and second is its function. Its appearance (how it looks):

```html
<a role="button" class="navbar-burger">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
</a>
```

```scss
.navbar-burger {
  display: block;
  width: 52px;
  height: 52px;
  cursor: pointer;
  position: relative;
  
  span {
    background-color: #517d36;
    display: block;
    height: 3px;
    width: 30px;
    left: calc(50% - 15px);
    position: absolute;
    &:nth-child(1) {
      top: calc(50% - 10px);
    }
    &:nth-child(2) {
      top: calc(50% - 2px);
    }
    &:nth-child(3) {
      top: calc(50% + 6px);
    }
  }
}
```

For Its function (how it behaves), we're going to use some CSS3 features. What we do is we will rotate the first bar 45degree, hide the second bar and rorate the third bar -45degree, the transform origin is the center. Then we move the first bar downward 8px and move the third bar upward 8px in order to make them intersect at the middle. 

```css
.navbar-burger {
  span {
    transform-origin: center;
  }
}
.navbar-burger.is-active {
  span {
    &:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
}
```

Add some *secret sauce* to make its funtion smoother: `transition: all 86ms ease-out;`

When talking about `function` of a webpage or controling user interface behaviors, we're normally talking about Javascript. We will need some Javascript to make our UI move (or transform, in this case). Here is the code that we need:
```javascript
$(document).ready(function() {
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
  });
});
```

After doing all of that, here is what we got:

{@embed: https://codepen.io/tunt-1890/pen/qBdMaoG}


### 2. Navbar Container & Navbar Brand

Navbar container will be where our hamburger live, along with a brand name (or icon) and other navigation links.
```html
<nav class="navbar" role="navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#">
      <img src="https://via.placeholder.com/640x160.png?text=Nguyen+You" width="112" height="28">
    </a>
    <a role="button" class="navbar-burger">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
</nav>
```

```scss
$desktop: 960px;
$navbar-breakpoint: $desktop;

@mixin from($device) {
  @media screen and (min-width: $device) {
    @content;
  }
}

$navbar-height: 52px;

.navbar-burger {
  @include hamburger();
  margin-left: auto;
}

@include from($navbar-breakpoint) {
  .navbar-burger {
    display: none
  }
}

.navbar {
  min-height: $navbar-height;
  background-color: whitesmoke;
}

.navbar-brand {
  display: flex;
  min-height: $navbar-height;
}

.navbar-item {
  display: flex;
  align-items: center;
}
```

Let's break it down. 

1. We don't want to see the hamburger icon when the device width is greater than or equal to 960px
2. We want our navbar-item align its content to the center

Here is what we got till now

{@embed: https://codepen.io/tunt-1890/pen/jOPvVrv}

### 3. Navbar Menu

```html
<div class="navbar-menu">
  <div class="navbar-start">
    <a class="navbar-item">
      Home
    </a>
    <a class="navbar-item">
      Documentation
    </a>
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        More
      </a>
      <div class="navbar-dropdown">
        <a class="navbar-item">
          About
        </a>
        <a class="navbar-item">
          Jobs
        </a>
        <a class="navbar-item">
          Contact
        </a>
      </div>
    </div>
  </div>
  <div class="navbar-end">
    <a href="#" class="navbar-item">
      Sign up
    </a>
    <a href="#" class="navbar-item">
      Log in
    </a>
  </div>
</div>
```
The scss code is too long so I didn't put them on here, you can see them in codepen. There are some secret sauce for this part which are described below:

1. Every div is declared as `display: flex` and  `align-items: stretch`. This make them always have a same height.
2. `navbar-menu` hide by default and only be visible when the screen width is over than 960px.
3. `navbar-menu` only accept two and only two children: `navbar-start` and `navbar-end`.
4. `navbar-start` on the left side of the navbar, is made by setting the `margin-right: auto` (Magic !!  :scream:)
5. `navbar-end` on the right side of the navbar, is made by setting the `margin-left: auto`.
6. Finally, the dropdown is hide by default. When the `navbar-item` is hovered, the `navbar-dropdown` will show up.

Here is what we got up to this point:

{@embed: https://codepen.io/tunt-1890/pen/poJORay}

*Switch to 0.5x mode to see the full navbar*
# To be continued...
![](https://images.viblo.asia/a36489c3-9d63-49ca-b944-bf9be8f17c52.gif)

> Part 2 will come out soon, I'm working on it...