## Introduction
Wpf/winforms provides various controls like Buttons, Textbox, TextBlock, Labels etc. All can be used in our projects as desired but customisation options are limited so sometimes we need to create a custom control to archieve what we really want. 

## Creating Custom Controls
A custom control can be easily created by extending the intended Control. Lets say i want a custom TextBox or Button, i can simply create a class and extend the Control of my choice and from there i can define various properties and customize it to my needs. In this example ill show you how to make a custom Button class. 

`public class CustomButton : Button` (To create a custom button control you simply extend System.Windows.Controls.Button)
`public class CustomTextBox : TextBox` (To create a custom TextBox control you simply extend  System.Windows.Controls.TextBox)

There are two steps to archeiving this: Firstly the Custom class and Secondly a theme that will be applied to the Control.

**CustomButton.cs**

```
static CustomButton()
{
    DefaultStyleKeyProperty.OverrideMetadata(typeof(CustomButton), new FrameworkPropertyMetadata(typeof(CustomButton)));
}
```
        
DefaultStyleKeyProperty sets the key to use to reference the style for this control, when theme styles are used or defined (We will add one later to the theme folder). Next we can create a constructor and setup any default customization needed as shown in example below:

```
public CustomButton()
        {
            InitializeCustomButton();
        }
```

```
private void InitializeCustomButton()
{
    base.Background = Brushes.Transparent; //Give the button a transparent background or color of choice
    base.BorderThickness = new Thickness(0); //Remove the border
    //ImageHeight = 60; ImageWidth = 60; Can set the button height and width as preferred. We will create this properties below
    var imgSource = new Uri(@"yourImage.png", UriKind.Relative);
    ImageSource = new BitmapImage(imgSource); //To use an image for the button if needed
}
```

Many more customizations can be added. Text, Foreground and many more properties as needed. Now to create some custom properties we can define various ones as below.

**Width**

```
public int CustomWidth
        {
            get { return (int)GetValue(CustomWidthProperty); }
            set { SetValue(CustomWidthProperty, value); }
        }
```

```
public static readonly DependencyProperty CustomWidthProperty =
    DependencyProperty.Register("CustomWidth", typeof(int), typeof(CustomButton), new PropertyMetadata(30));
```


**Height**

```
public int CustomHeight
{
    get { return (int)GetValue(CustomHeightProperty); }
    set { SetValue(CustomHeightProperty, value); }
}
```

```
public static readonly DependencyProperty CustomHeightProperty =
    DependencyProperty.Register("CustomHeight", typeof(int), typeof(CustomButton), new PropertyMetadata(30));
```

**ImageSource**

```
public ImageSource ImageSource
{
    get { return (ImageSource)GetValue(ImageSourceProperty); }
    set { SetValue(ImageSourceProperty, value); }
}
```

```
public static readonly DependencyProperty ImageSourceProperty =
    DependencyProperty.Register("ImageSource", typeof(ImageSource), typeof(CustomButton), new PropertyMetadata(null));
```

The ImageSource property allows you to use an image as your button background. Now to add click or touch events to the custom control we only need to define a RoutedEvent and add an handler for the control. To archieve the click event we will use the `PreviewMouseLeftButtonUp` mouse button event handler in the constructor right above the `InitializeCustomButton()` method.

```
private void InitializeCustomButton()
{
......
PreviewMouseLeftButtonUp += (sender, args) => OnClick();
}
```

Next create the RoutedEvent.

```
public static RoutedEvent ClickEvent =
EventManager.RegisterRoutedEvent("Click", RoutingStrategy.Bubble, typeof(RoutedEventHandler), typeof(CustomButton));
```

```
public event RoutedEventHandler Click
{
    add { AddHandler(ClickEvent, value); }
    remove { RemoveHandler(ClickEvent, value); }
}
```

```
protected virtual void OnClick()
{
    RoutedEventArgs args = new RoutedEventArgs(ClickEvent, this);
    //Do your actions here...
    Console.WriteLine("Clicked" + base.Name);
    RaiseEvent(args);
}
```

**CustomButton.cs** (Full)

```
public class CustomButton : Button
{
static CustomButton()
{
    DefaultStyleKeyProperty.OverrideMetadata(typeof(CustomButton), new FrameworkPropertyMetadata(typeof(CustomButton)));
}

public CustomButton()
{
    InitializeCustomButton();
}

private void InitializeCustomButton()
{
    PreviewMouseLeftButtonUp += (sender, args) => OnClick();
    base.Background = Brushes.Transparent; //Give the button a transparent background or color of choice
    base.BorderThickness = new Thickness(0); //Remove the border
    //ImageHeight = 60; ImageWidth = 60; Can set the button height and width as preferred. We will create this properties below
    var imgSource = new Uri(@"yourImage.png", UriKind.Relative);
    ImageSource = new BitmapImage(imgSource); //To use an image for the button if needed
}

public int CustomWidth
{
    get { return (int)GetValue(CustomWidthProperty); }
    set { SetValue(CustomWidthProperty, value); }
}

public static readonly DependencyProperty CustomWidthProperty =
DependencyProperty.Register("CustomWidth", typeof(int), typeof(CustomButton), new PropertyMetadata(30));

public int CustomHeight
{
    get { return (int)GetValue(CustomHeightProperty); }
    set { SetValue(CustomHeightProperty, value); }
}

public static readonly DependencyProperty CustomHeightProperty =
DependencyProperty.Register("CustomHeight", typeof(int), typeof(CustomButton), new PropertyMetadata(30));

public ImageSource ImageSource
{
    get { return (ImageSource)GetValue(ImageSourceProperty); }
    set { SetValue(ImageSourceProperty, value); }
}

public static readonly DependencyProperty ImageSourceProperty =
DependencyProperty.Register("ImageSource", typeof(ImageSource), typeof(CustomButton), new PropertyMetadata(null));

public static RoutedEvent ClickEvent =
EventManager.RegisterRoutedEvent("Click", RoutingStrategy.Bubble, typeof(RoutedEventHandler), typeof(CustomButton));

public event RoutedEventHandler Click
{
    add { AddHandler(ClickEvent, value); }
    remove { RemoveHandler(ClickEvent, value); }
}

protected virtual void OnClick()
{
    RoutedEventArgs args = new RoutedEventArgs(ClickEvent, this);
    //Do your actions here...
    Console.WriteLine("Clicked" + base.Name);
    RaiseEvent(args);
}

}
```



Thats it! Now your custom control has a click listener you could use however you want. Remember, any property that can be archieved in the xaml can also be done here. Last thing we need to do is create the theme style we talked about earlier. Open your theme folder (Or add a new directory "Themes" if one doesnt exist already). Create a new file Generic.xaml in this folder. It will hold our custom style and properties.

**Generic.xaml**

```
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    
<Style TargetType="{x:Type local:CustomButton}" BasedOn="{StaticResource {x:Type Button}}">
    <Setter Property="ContentTemplate">
        <Setter.Value>
            <DataTemplate>

                <Image Source="{Binding ImageSource, RelativeSource={RelativeSource AncestorType=local:CustomButton}}"
                           Width="{Binding CustomWidth, RelativeSource={RelativeSource AncestorType=local:CustomButton}}"
                           Height="{Binding CustomHeight, RelativeSource={RelativeSource AncestorType=local:CustomButton}}"
                           VerticalAlignment="Center" HorizontalAlignment="Center"></Image>
            </DataTemplate>
        </Setter.Value>
    </Setter>

    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="Button">
                <Border Name="border" 
                        BorderThickness="0"
                        Width="60"
                        Height="60"
                        Padding="0" 
                        BorderBrush="#000000" 
                        CornerRadius="10" 
                        Background="#00677B">
                    <ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center" />
                </Border>
                <ControlTemplate.Triggers>
                    <Trigger Property="IsMouseOver" Value="True">
                        <Setter TargetName="border" Property="BorderBrush" Value="Black" />
                    </Trigger>
                </ControlTemplate.Triggers>
            </ControlTemplate>
        </Setter.Value>
    </Setter>

</Style>
</ResourceDictionary>
```

The style created above using Binding helps us to bind our respective properties to the control and add further styling however we want. You can change the border, cornerRadius defaults to suit your needs. 

To use your custom button simply import it to the xaml file and pass your values as shown below:

`<controls:CustomButton CustomWidth="60" CustomHeight="60" ImageSource="/Images/button.png"/>`
            

Happy Codding!!!