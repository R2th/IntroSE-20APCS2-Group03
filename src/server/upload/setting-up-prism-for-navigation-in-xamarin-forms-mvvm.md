![](https://images.viblo.asia/13f77fc6-fd13-4b42-818b-65ef2f2cda6c.png)


When building an app on an architecture such as mvvm it is important to seperate the business logic from the presentation logic. For example using Mvvm arc in your project then navigating from your UI class isnt fully embracing the Mvvm architecture. Instead one should navigate from the ViewModel. Prism allows you to archive this and many more but to make this tutorial as simple and precise as possible we will only focus on how to achieve clean Navigation in our Xamarin Forms Mvvm application. 

Why use Prism?
There are a lot of MVVM frameworks that can be used to develop better code based on MVVM pattern. Examples similar to Prism are MvvmLight, MvvmCross, FreshMvvm and so on. Prism framework allows us to utilize best coding practices so as to develop loosely coupled, and maintainable applications. It handles navigation events, handles modules and it is easier to test.

Let's begin!

**Add Prism Library**

`Install-Package Prism.Unity.Forms -Version 8.1.97`

**Add prism reference to the App.xaml file**

```
<?xml version="1.0" encoding="utf-8" ?>
<prism:PrismApplication  xmlns:prism="clr-namespace:Prism.Unity;assembly=Prism.Unity.Forms"
                         xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="PrismDemo.App">
    <Application.Resources>

    </Application.Resources>
</prism:PrismApplication>
```

In my case my project name is PrismDemo and i have added the Prism library reference to the root replacing the "Application" tag.

Note: The PrismApplication tag might throw error but move on. It will launch later on after all is done.

**Open the App.xaml.cs**
Let this class inherit the PrismApplication class. Next add Prism initializer parameter into the constructor and override the methods as shown below:

```
using Prism;
using Prism.Ioc;
using Prism.Unity;

namespace PrismDemo
{
    public partial class App : PrismApplication
    {
          public App(IPlatformInitializer initializer = null) : base(initializer) { }

        protected override void OnInitialized()
        {
            InitializeComponent();
        }

        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            
        } 
    }
}
```

**Update iOS AppDelegate.cs and MainActivity.cs for Android**

Open AppDelegate.cs and update as shown below:

**AppDelegate.cs**

```
using Foundation;
using Prism;
using Prism.Ioc;
using UIKit;

namespace PrismDemo.iOS
{
    [Register("AppDelegate")]
    public partial class AppDelegate : global::Xamarin.Forms.Platform.iOS.FormsApplicationDelegate
    {
        public override bool FinishedLaunching(UIApplication app, NSDictionary options)
        {
            global::Xamarin.Forms.Forms.Init();
            LoadApplication(new App(new iOSInitializer()));

            return base.FinishedLaunching(app, options);
        }
    }

    public class iOSInitializer : IPlatformInitializer
    {
        public void RegisterTypes(IContainerRegistry containerRegistry)
        {
            
        }
    }
}
```

Next Open MainActivity.cs and update as shown below:

**MainActivity.cs**

```
using Android.App;
using Android.Content.PM;
using Android.Runtime;
using Android.OS;
using Prism;
using Prism.Ioc;

namespace PrismDemo.Droid
{
    [Activity(Label = "PrismDemo", Icon = "@mipmap/icon", Theme = "@style/MainTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode | ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            global::Xamarin.Forms.Forms.Init(this, savedInstanceState);
            LoadApplication(new App(new AndroidInitializer()));
        }
        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Android.Content.PM.Permission[] grantResults)
        {
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    public class AndroidInitializer : IPlatformInitializer
    {
        public void RegisterTypes(IContainerRegistry containerRegistry)
        {
            
        }
    }
}
```

All we have done here is simply adding independent initializers for each platfrom (iOS and Android). For Android we have the AndroidInitializer and for iOS we have the iOSInitializer.

Now for the sweet part. In xamarin forms we always connect our UI to its ViewModel class by **this.BindingContext = new HomePageViewModel();** but prism makes handles it differently. So lets say we have a screen **PageOne** and it has its viewmodel **PageOneViewModel** we can bind them together using prism as shown below:

**Connect the Views with the ViewModel**

Open the App.cs file and in the method **RegisterTypes** register all  pages which you will navigate to by specifying the name and the viewmodel's name.

```
protected override void RegisterTypes(IContainerRegistry containerRegistry)
{
    containerRegistry.RegisterForNavigation<PageOne, PageOneViewModel>();
    containerRegistry.RegisterForNavigation<PageTwo, PageTwoViewModel>();
} 
```

The first parameter in the RegisterForNavigation above is the name of the page and the second parameter is the viewmodel.

**All set and ready!**

You can simply navigate to any screen by using `NavigationService.NavigateAsync(nameof(PageOne));` This will take you to the PageOne screen. If we are to set PageOne as the initial page we can set using this command in the App.cs shown below.

```
protected override void OnInitialized()
{
    InitializeComponent();
    NavigationService.NavigateAsync(nameof(PageOne));
}
```

When the app is launched PageOne will be loaded. Now you may ask what if one was to navigate from the viewmodel as it should be? This is easily archievable by Dependency Injection. We simply inject the NavigationService into the ViewModel.

**Injecting the Navigation Service in your ViewModel**

```
public class PageOneViewModel {
    INavigationService _navigationService;
    public PageOneViewModel(INavigationService navigationService)
    {
        _navigationService = navigationService;
    }
}
```
Now that the NavigationService is accessible you can use it to navigate from front and back from your viewmodel.

**Go to a Page**

`_navigationService.NavigateAsync(nameof(PageOne));`

**Go Back**

`_navigationService.GoBackAsync();`

Now there is a very useful feature of using Prism to navigate. This is passing and receiving parameters. It allows you to send data or Objects from one page to another.

**Passing Data**

Lets say i have a data class Person and i want to pass this object **person** to another page. I will do this as shown below:

```
    var nav_parameter = new NavigationParameters();
    nav_parameter.Add("Person", person);
    _navigationService.NavigateAsync(nameof(PageTwo), nav_parameter);
```

Here Person is the key and person the data. You can then proceed to recieve this data from PageTwoViewModel as shown below:

Firstly you should know that any class that tends to recieve data from another needs to be navigation aware. So the PageTwoViewModel will extend **INavigatedAware**

Override the method OnNavigatedFrom and OnNavigatedTo. The OnNavigatedTo method is where we will recieve any data sent from the calling page. The Person object sent from PageOne will be received here.

```
using Prism.Navigation;

namespace PrismDemo.Common.Viewmodels
{
    public class PageTwoViewModel : INavigatedAware
    {
        INavigationService _navigationService;

        public PageTwoViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
        }

        public void OnNavigatedFrom(INavigationParameters parameters)
        {
            
        }

        public void OnNavigatedTo(INavigationParameters parameters)
        {
        //Get data object as model person
            Person person = parameters["Person"] as Person;
        }
    }
}
```

One last thing. As you may have noticed there isnt a toolbar present. We can add this simply by adding NavigationPage to the RegisterTypes in App.xaml.cs as shown below:

`containerRegistry.RegisterForNavigation<NavigationPage>();`
    
Next on the OnInitialized add NavigationPage to the path and make it asynchronous:

```
protected async override void OnInitialized()
{
    InitializeComponent();
    await NavigationService.NavigateAsync("NavigationPage/PageOne");
}
```
    
Now there will be a toolbar and back button auto added when you navigate to a new screen.

And that is it. Easy and clean as it should be. Happy Coding!


For more clearity on Prism Navigation refere [here>>](https://prismlibrary.com/docs/xamarin-forms/navigation/navigation-basics.html)