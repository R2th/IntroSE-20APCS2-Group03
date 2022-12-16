Like Google Anankytics, Sentry allows you to monitor and observe your projects with data sent to your your provided link. These allows you to view various reports such as your userbase usage, error and more. We will dive into how to integrate this service into the app.

## Installation and Initialization

Firstly add the nugget package:

`Install-Package Sentry -Version 3.0.6`

After package has been installed we can then initialise Sentry prefereably in the App.cs class as demostrated below.

**App.cs**

Inside the App() method add below code.

//Creates sentry options, pass the Dsn then Initialize SentrySdk
```
    SentryOptions sentryOptions = new SentryOptions
    {
        Environment = EnviromentUtils.GetEnviromentSentry(),
        Dsn = new Dsn("your dsn url here")
    };
    SentrySdk.Init(sentryOptions);
```
            
##  Catching Errors

To auto catch errors simply add below method in App.xaml.cs and then call it in App() right after the SentrySdk has been Initialized.

```
 void App_DispatcherUnhandledException(object sender, DispatcherUnhandledExceptionEventArgs e)
        {
            SentrySdk.CaptureException(e.Exception);
            // If you want to avoid the application from crashing:
            e.Handled = true;
        }
```

**App()**
    .....
```
SentrySdk.Init(sentryOptions);

this.DispatcherUnhandledException += new DispatcherUnhandledExceptionEventHandler(App_DispatcherUnhandledException);
```

Now whenever an error occurs the App_DispatcherUnhandledException is triggered and the content of the error is sent to the provided DSN.

## Capturing Messages

One can also capture a bare message which is then sent to Sentry. Typically messages are not emitted, but they can be useful for some teams.

`SentrySdk.CaptureMessage("Something went wrong");`

**Adding Breadcrumbs**

To add a breadcrumb to Sentry log simply pass in the Message, assign a Category and Level.

```
SentrySdk.AddBreadcrumb(
    message: "message here",
    category: "category here",
    level: BreadcrumbLevel.Info //Info
    );
```

Now when there is an occurence you will be able to see the breadcrumbs in the Sentry platform.

## Identify Users

Users consist of critical pieces of information like name, email etc that provides a unique identity in Sentry. In other to add this at least one must be present in order for Sentry SDK to capture the user:

```
SentrySdk.ConfigureScope(scope =>
{
    scope.User = new User
    {
        Email = "youremail@somemail.com"
    };
});
```
You can also add the username and ip_address if needed.

Sentry also allows you to add even more features such as Attachments, Custom Tags and many more. You can refer [here](https://docs.sentry.io/platforms/dotnet/guides/wpf/) to access the documentation for further information. Happy Coding!