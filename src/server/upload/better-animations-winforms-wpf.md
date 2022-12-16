Animations in wpf can be a headache sometimes. Not many clear articles on it so ill make this article on how one can create animation class and bypass those anoying xml storyboards (and all tags within) that makes ones layout a mess to look at.

## What are Storyboards?

To understand Storyboard one must first understand Timelines since Storyboards are a kinf of specialised Timelines (Being that they inherit Timeline class). As the name suggests, timeline represents a division of time. It provides various properties of this divisiom/segments such as Start Time, number of repeat, how long an individual segement will last and so on. There are many derivatives of Timeline this includes Animations, ParallelTimelines, MediaTimelines and also Storyboards. In a simple definition, Storyboard is a special kind of container timeline (ParallelTimeline to be precise) which provides object (From buttons to images or any other objects one can think of) and property targeting information for the timelines it contains. Using Storyboards you can also combine timelines that affect a variety of objects and properties into a single timeline tree, making it easy to organize and control complex timing behaviors. Lets say for example you have a single object and want to apply not just one but many animations to this object based on whatever case you want, Storyboard allows you to do this and without much hassle.

Normally an animation can be applied using the xml as demostrated below:

```
<Window.Resources>
    <Storyboard x:Key="Storyboard" BeginTime="00:00:00.000" Duration="00:00:10.000">
        <DoubleAnimation Storyboard.TargetName="RotateImage" 
                         Storyboard.TargetProperty="(UIElement.RenderTransform).(RotateTransform.Angle)" 
                         From="0" To="360" BeginTime="00:00:05.000" Duration="00:00:05.000" />
        <DoubleAnimation Storyboard.TargetName="OpacityImage" 
                         Storyboard.TargetProperty="Opacity" 
                         From="1" To="0" Duration="00:00:10.000" />
    </Storyboard>
</Window.Resources>
```

I however have found it to be way more cleaner to create an animation class and add any animation we want in this class so that our code looks way more cleaner than having it in the xaml file where it looks so cumbersome. The animation above is simply rotating an element where TargetProperty is set to **RotateTransform.Angle** and from an angle of 0 to 360. pretty straight foward while the other is setting the opacity. So lets make an Animation class and translate to code. Your class can have any specified name but here is a method that will rotate any element continously non stop (Well until u deem it so of course).

//Image button can be changed to any element and if you want broader range you can change to FrameworkElement so can pass any supported element into the method

**RotationAnimation**

```
        public void StartRotationAnimation (Image button)
        {
            Storyboard storyboard = new Storyboard();
            button.RenderTransformOrigin = new Point(0.5, 0.5);
            RotateTransform transform = new RotateTransform()
            {
                CenterX = 1,
                CenterY = 1
            };
            button.RenderTransform = transform;

            var rotateAnimation = new DoubleAnimation
            {
                From = 0,
                To = 360,
                Duration = TimeSpan.FromMilliseconds(1000),
                RepeatBehavior = RepeatBehavior.Forever
            };

            Storyboard.SetTarget(rotateAnimation, button);
            Storyboard.SetTargetProperty(rotateAnimation, new PropertyPath("(UIElement.RenderTransform).(RotateTransform.Angle)"));
            transform.BeginAnimation(RotateTransform.AngleProperty, rotateAnimation);
        }
```

So what have we archeived here? Well we set the RenderTransformOrigin and what this does is sets the center point of any possible render transform, relative to the bounds of the element. The default being 0,0. Next we declared our animation type as RotateTransform which is then rendered in the button. Note that this will have zero effect if we do not pass a DoubleAnimation arguments and tell the RotateTransform what we want it to do which in this case is rotate our image in a 360 degree loop.

```
var rotateAnimation = new DoubleAnimation
{
    From = 0,
    To = 360,
    Duration = TimeSpan.FromMilliseconds(1000),
    RepeatBehavior = RepeatBehavior.Forever
};
```

So we have declared start **From** 0 and **To** end in a complete 360 rotation. Duration can be as long as we want using TimeSpan and here 1 Seconds (you can also use TimeSpan.FromSeconds or Mintutes as you wish). RepeatBeahvior set to Forever means our animation will keep rotating non stop until the animation is stopped. You can stop the animation by calling the Stop method on the storyboard as shown below:

```
public void StopAnimation(FrameworkElement element)
{
    if (storyboard != null)
    {
    //Make sure you have access to the storyboard by making it a global variable
        storyboard.Stop(element);
    }
}
```

Ok one more example to demostrate the opasity animation like the one in the xaml above.

**Opacity Animation**

```
public void StartAnim(Button button)
{
    Storyboard storyboard = new Storyboard();
    var opacityAnimation = new DoubleAnimation
    {
        From = 1.0,
        To = 0,
        Duration = TimeSpan.FromMilliseconds(1000),
        AutoReverse = true,
        FillBehavior = FillBehavior.Stop,
        //Will repeat forever. If you want it to repeat in X number of times then uncomment the last line and pass X number.
        RepeatBehavior = RepeatBehavior.Forever
        //RepeatBehavior = new RepeatBehavior(3)
    };

    Storyboard.SetTarget(opacityAnimation, button);
    Storyboard.SetTargetProperty(opacityAnimation, new PropertyPath("Opacity"));

    storyboard.Children.Add(opacityAnimation);
    storyboard.Begin(CalibrationScreen.instance, true);
}
```

SetTargetProperty as Opacity specifies what type of property we want to animate. From 1 to 0 will make our element blink from visible all the way to being invisible and AutoReverse set to true indicates that timeline will plays in reverse after it completes a forward iteration. When you have an idea of any animation or xaml you can now easily convert it using the properties of that animation here in the custom Animation class. You can get more information on various animations using storyboards [here>>](https://docs.microsoft.com/en-us/dotnet/framework/wpf/graphics-multimedia/storyboards-overview) Happy Coding!