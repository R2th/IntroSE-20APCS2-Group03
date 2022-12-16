# Why i can not be done with just storyboard?
When developing with Swift, I think beginners may be worried about whether to build the UI with storyboard or only with code

You can develop with only the storyboard, but customizing with code can reduce the work man-hours, and if you need to change the design, customizing with code is easier to edit, i will try to make a tutorial below. However, it is difficult to intuitively understand screen transitions etc.,, with only code, so this time we will build the minimum with storyboard and write custom contents with code.

In addition, there are advantages and disadvantages to both ways, such as the problem that conflicts are likely to occur when building with storyboard only, and the amount of code comments increases when building with code only.

# Implement `NavigationController` with `storyboard`

Firstly we create NavigationBar at storyboard

1. Choose iPhone of storyboard (in the middle of the below image)
![](https://images.viblo.asia/16ff0e96-f653-4f4d-a7ed-d296ade7e2c0.png)


2. From Menubar of Xcode : 
choose `/Editor/Embed In/NavigationController/`
3. After that ViewController that extends the NavigationController will be created as follows

The storyboard's Navigation Bar is now ready.

![](https://images.viblo.asia/9db0cf12-cabd-48ab-a977-cf3c7103e1ba.png)


# Customize the NavigationBar by code

Customize the NavigationBar with code. The following is customizable:

① Navigation Bar color

② Navigation Bar title

③ Text color of the title of Navigation Bar

④ Font and size of the title of Navigation Bar

⑤ Set the state like frosted glass to false

⑥ Remove the underline of the Navigation Bar

Now let's write the code.

* ViewController.swift

```
class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        navigationItem.title = "サンプル文字列"
        self.navigationController?.navigationBar.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white, NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 20.0)]

        self.navigationController?.navigationBar.barTintColor = UIColor.red

        self.navigationController?.navigationBar.isTranslucent = false

        navigationController?.navigationBar.setValue(true, forKey: "hidesShadow")
    }
}
```

After building, you can see that the design of NavigationBar has been changed as shown in the image below!
![](https://images.viblo.asia/b771a750-8f5a-4f4d-91ff-10ed156926e9.png)

`self.navigationController? .NavigationBar.isTranslucent = false`

If false is not specified, the color will be unexpected, so this line is needed

I think that learning will deepen if you actually arrange the colors and font sizes yourself, so please take care of that

# Finally
As I mentioned at the beginning, there are advantages and disadvantages to both UI construction with storyboard and UI construction with code only, so it is necessary to understand each other's characteristics and handle them!

Thank you for watching until the end!