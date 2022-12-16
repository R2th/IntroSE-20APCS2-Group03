# Introduction 
In CSS, you can execute animation using the aimmation property and keyframes.

It is not so difficult if you only set one animation setting for one object. However, sometimes you want to switch the animation content according to the input content of the button.

In this tutorial I used JavaScript to write a way to switch CSS animations.

# Firstly: one-time CSS-animation

First of all, let's create a sample that performs animation only once when the button is pressed.

Here, let's move the red box `(id = "box")` created by the `span` in the `div` element aside with `transform: translateX`.

```
<div class="parent">
 <span class="child" id="box"></span>
</div>

<p>
<input type="button" onclick="move();" value=" move! " />
</p>
```

```
div.parent {
    position: relative;
    border: 1px solid black;
    width : 400px;
    height: 100px;
}
span.child {
    position: absolute;
    left: 100px;
    top: 25px;
    width : 50px;
    height: 50px;
    background-color: red;
}
@keyframes move {
    to {
        transform:translateX(200px);
    }
}
.moveToRight {
    animation-name: move;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}
```

```
function move() {
    const objBox = document.getElementById("box");
    objBox.classList.add('moveToRight');
}
```
The motion to move 200px to the right as `@keyframes` is defined as move, and the definition to animate this move only once per second is `.moveToRight`. When the button is pressed, the animation starts to move by adding `moveToRight` to the classList of box in JavaScript.

Since `animation-fill-mode: forwards` is in the CSS, the box stops at the end of the move.

# How to change the animation content
In the example above, the animation works only once (the button can be pressed any number of times, but it does not change when pressed).

If you want to do the same animation many times, you need to remove the previous animation from the classList at the end of the animation.

But what if you want the animation to return to its original position when the button is pressed?

In this case as well, remove the previous animation from classList at the end of animation, define an animation using keyframes of transform which moves in the opposite direction this time, and add it to classList.

However, that alone does not work well. Since the effect of transform disappears when it is removed from classList, box returns to the original position instantly. For this reason, it is necessary to write a value that takes into account the value after transform at the left position. The values of `left` and `transform` can not be read from JavaScript, so you have to calculate them and write the values yourself (it is not good to have to manage the values that the rendering engine should know separately as well) It feels like, is there a good way to do it? You can read the value of transform using `window.getComputedStyle()`.

Also, adding or removing animations from `classList` is surprisingly annoying. If there are many objects that you want to move, you will have the feeling to lose control over time.

This problem is actually easy to solve. Instead of using `classList`, just write the `style.animationName` of the object.

Below is a sample where box (span.child) moves to the right and back to the left each time the button is pressed. (the html is the same with the first sample)

```
div.parent {
    position: relative;
    border: 1px solid black;
    width : 400px;
    height: 100px;
}
span.child {
    position: absolute;
    left: 100px;
    top: 25px;
    width : 50px;
    height: 50px;
    background-color: red;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}
@keyframes moveRight {
    to {
        transform:translateX(200px);
    }
}
@keyframes moveLeft {
    to {
        transform:translateX(-200px);
    }
}
```
```
let direct = 0; // Direction of movement. To the right if not equals 0, to the left if equals 0

function move() {
    const objBox = document.getElementById("box");
    objBox.style.transform = '';    // delete the transform of previous movement animation

    direct ^= 1;
    if (direct !== 0) {
        objBox.style.left = '100px';    // it's crucial to set the starting position of movement
        objBox.style.animationName = 'moveRight';
    } else {
        objBox.style.left = '300px';
        objBox.style.animationName = 'moveLeft';
    }
}
```

Unlike the first example, the animation settings are pre-written in the span (the CSS description `.moveToRight` for animation settings only is gone).

In this way, you can switch animations by writing `style.animationName` when the button is pressed without using `classList` (of course, you can change the duration etc.).

In addition, it is OK if the transformation initialization corresponding to the deletion of `classList` is done after the button is pressed. This can be achieved simply by setting the null character.

In this example, the animation is only horizontal movement, but the idea is the same when changing color and transparency.

# Sample Application
As an application example, I made a sample to animate in the pressed direction for the up, down, left and right buttons.

What is slightly different from the sample on this page is that it can be moved many times in the same direction. In order to achieve this, we clear the `style.animationName` at the end of the animation. `style.animationName` starts animation only when there is a change of value. Because the same name is set in animation in the same direction, the animation will not move unless it is cleared once.

From this, it can be seen that assignment to `style.animationName` is not an overload of the operator as it appears to be an assignment. Not limited to `style.animationName`, the left and transform values are not immediately reflected in the state even if they are set in JavaScript, and it seems that the difference with the previous time seems to be reflected at a stretch immediately before drawing. we can make it done.

As you might expect, it is also possible to switch animationDirection between normal and reverse in JavaScript with one keyframe, without creating `moveRight` and `moveLeft` keyframes. However, in reverse, the method of acceleration is also reversed, so it is difficult to use except when `animationTimingFunction` is linear.

# Conclusion
Isn't it easy to control using JavaScript instead of using CSS animation? I should totally think of the same,

However, due to the processing by interval interrupts in JavaScript, the movement is definitely noticeable compared to CSS, which processes each drawing frame.

It may be good to try moving it referring to the contents of this page and the production that the `hit` judgment is unnecessary.