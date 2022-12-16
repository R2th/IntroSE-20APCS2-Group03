In this tutorial i will show you how to use the WebBrowser control to create a web browser application in WPF. Its a pretty simple app but can come in handy if ever the opportunity arrises. Without further adue, lets begin!

## Step 1

Open Visual Studio and create a new wpf application.

![](https://images.viblo.asia/d0a65246-9cb1-4b1c-83e8-bab8c9b5302d.png)

Name it CustomBrowser

![](https://images.viblo.asia/24f5094c-4152-4484-9a43-c2172f38cbc7.png)

Finish the setup and move on to the next step.

### The WebBrowser Control

The WebBrowser control comes by default with wpf. It supports hosting a full web broswer in the wpf app. Consider the WebBrowser same as Internet Explorer and it will work on all windows machine without much hassle. 

Open the MainWindow.xaml and add below xml code. It consist of 3 buttons 2 of whic are for navigating, 1 for refreshing between pages, a textbox for entering url and a WebBrowser control for displaying our web contents.

**MainWindow.xaml**

```
<Window x:Class="CustomBrowser.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:CustomBrowser"
        mc:Ignorable="d"
        WindowState="Maximized"
        Title="CustomWebBrowser" Height="450" Width="800">
    <Grid>
        <Grid.RowDefinitions>

            <RowDefinition Height="40"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>

        <Grid Grid.Row="0" Margin="5" VerticalAlignment="Center">
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="30"/>
                <ColumnDefinition Width="30"/>
                <ColumnDefinition Width="30"/>
                <ColumnDefinition Width="4*"/>
            </Grid.ColumnDefinitions>

            <Image x:Name="backBtn"  Source="/Images/icon_back.png" Width="30" Height="30" Grid.Row="0" Grid.Column="0" MouseDown="backBtn_MouseDown" VerticalAlignment="Center" HorizontalAlignment="Left"/>
            <Image x:Name="fowardBtn"  Source="/Images/icon_foward.png" Width="30" Height="30" Grid.Row="0" Grid.Column="1" MouseDown="fowardBtn_MouseDown"/>
            <Image x:Name="refreshBtn"  Source="/Images/icon_refresh.png" Width="25" Height="22" Grid.Row="0" Grid.Column="2" MouseDown="refreshBtn_MouseDown"/>
            <TextBox x:Name="textBoxUrl" KeyDown="textBoxUrl_KeyDown" Grid.Row="0" Grid.Column="3" Height="30" Width="Auto" TextAlignment="Center" VerticalContentAlignment="Center" Foreground="#546E7A" VerticalAlignment="Center" RenderTransformOrigin="0.5,0.5" FontSize="12" BorderBrush="#546E7A"/>
            </Grid>
        <WebBrowser x:Name="WebBrowserControl" Grid.Row="1"/>
    </Grid>
</Window>
```

Create a directory in the project and name it Images then add the 3 images below >

![](https://images.viblo.asia/f796adba-2515-46d9-adcc-da46197efa3f.png)
![](https://images.viblo.asia/423699cd-4630-4502-9aa4-bfbf0dc7befd.png)
![](https://images.viblo.asia/c0c3257b-11b3-46e9-99a2-92d9f2d1d293.png)


The WebBrowser control comes with various features by default. For example we could add the Source directly from the xaml file such as this: `Source="http://google.com"` and the url will be loaded automatically when app launches. We wont be doing this however.

## Step 2
Now we need to add the necessary references we will be needing for this project. Right click on References and add the following reference.

**Microsoft.mshtml**

![](https://images.viblo.asia/5b755cec-aff5-4335-b6de-7551138a70a7.png)

Next add reference to Microsoft Internet Controls

**Microsoft Internet Controls**

![](https://images.viblo.asia/22a48d7a-4701-4f45-9e6a-196bc5c63a73.png)

## Step 3

Now we can move on to he Main class and implement some necessary features. Open the MainWindow class and add all functions below.

**MainWindow.cs**

```
using Microsoft.Win32;
using System;
using mshtml;
using System.Diagnostics;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Windows.Input;

namespace CustomBrowser
{
    public partial class MainWindow : Window
    {
        [ComImport, InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
        [Guid("6d5140c1-7436-11ce-8034-00aa006009fa")]
        internal interface IServiceProvider
        {
            [return: MarshalAs(UnmanagedType.IUnknown)]
            object QueryService(ref Guid guidService, ref Guid riid);
        }

        //We will use this as default homepage 
        string defaultUrl = "http://google.com";
        static readonly Guid SID_SWebBrowserApp = new Guid("0002DF05-0000-0000-C000-000000000046");

        public MainWindow()
        {
            InitializeComponent();
            SetFeatureControls();          
            this.Loaded += WebBrowser_Loaded;
        }

        private void SetFeatureControls()
        {
            //Feature controls as documented by Mircisift here>> http://msdn.microsoft.com/en-us/library/ee330720(v=vs.85).aspx
            // FeatureControl settings are per-process
            var fileName = System.IO.Path.GetFileName(Process.GetCurrentProcess().MainModule.FileName);

            // make the control is not running inside Visual Studio Designer
            if (String.Compare(fileName, "devenv.exe", true) == 0 || String.Compare(fileName, "XDesProc.exe", true) == 0)
                return;

            SetFeatureControlKey("FEATURE_BROWSER_EMULATION", fileName, GetEmulationMode()); // Webpages containing standards-based !DOCTYPE directives are displayed in IE10 Standards mode.
            SetFeatureControlKey("FEATURE_AJAX_CONNECTIONEVENTS", fileName, 1);
            SetFeatureControlKey("FEATURE_ENABLE_CLIPCHILDREN_OPTIMIZATION", fileName, 1);
            SetFeatureControlKey("FEATURE_MANAGE_SCRIPT_CIRCULAR_REFS", fileName, 1);
            SetFeatureControlKey("FEATURE_DOMSTORAGE ", fileName, 1);
            SetFeatureControlKey("FEATURE_GPU_RENDERING ", fileName, 1);
            SetFeatureControlKey("FEATURE_IVIEWOBJECTDRAW_DMLT9_WITH_GDI  ", fileName, 0);
            SetFeatureControlKey("FEATURE_DISABLE_LEGACY_COMPRESSION", fileName, 1);
            SetFeatureControlKey("FEATURE_LOCALMACHINE_LOCKDOWN", fileName, 0);
            SetFeatureControlKey("FEATURE_BLOCK_LMZ_OBJECT", fileName, 0);
            SetFeatureControlKey("FEATURE_BLOCK_LMZ_SCRIPT", fileName, 0);
            SetFeatureControlKey("FEATURE_DISABLE_NAVIGATION_SOUNDS", fileName, 1);
            SetFeatureControlKey("FEATURE_SCRIPTURL_MITIGATION", fileName, 1);
            SetFeatureControlKey("FEATURE_SPELLCHECKING", fileName, 0);
            SetFeatureControlKey("FEATURE_STATUS_BAR_THROTTLING", fileName, 1);
            SetFeatureControlKey("FEATURE_TABBED_BROWSING", fileName, 1);
            SetFeatureControlKey("FEATURE_VALIDATE_NAVIGATE_URL", fileName, 1);
            SetFeatureControlKey("FEATURE_WEBOC_DOCUMENT_ZOOM", fileName, 1);
            SetFeatureControlKey("FEATURE_WEBOC_POPUPMANAGEMENT", fileName, 0);
            SetFeatureControlKey("FEATURE_WEBOC_MOVESIZECHILD", fileName, 1);
            SetFeatureControlKey("FEATURE_ADDON_MANAGEMENT", fileName, 0);
            SetFeatureControlKey("FEATURE_WEBSOCKET", fileName, 1);
            SetFeatureControlKey("FEATURE_WINDOW_RESTRICTIONS ", fileName, 0);
            SetFeatureControlKey("FEATURE_XMLHTTP", fileName, 1);
        }

        private void SetFeatureControlKey(string feature, string appName, uint value)
        {
            using (var key = Registry.CurrentUser.CreateSubKey(
                String.Concat(@"Software\Microsoft\Internet Explorer\Main\FeatureControl\", feature),
                RegistryKeyPermissionCheck.ReadWriteSubTree))
            {
                key.SetValue(appName, (UInt32)value, RegistryValueKind.DWord);
            }
        }

        private UInt32 GetEmulationMode()
        {
            int browserVersion = 7;
            using (var ieKey = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Internet Explorer",
                RegistryKeyPermissionCheck.ReadSubTree,
                System.Security.AccessControl.RegistryRights.QueryValues))
            {
                var version = ieKey.GetValue("svcVersion");
                if (null == version)
                {
                    version = ieKey.GetValue("Version");
                    if (null == version)
                        throw new ApplicationException("Microsoft Internet Explorer is required!");
                }
                int.TryParse(version.ToString().Split('.')[0], out browserVersion);
            }

            UInt32 mode = 11000; // Internet Explorer 11. Webpages containing standards-based !DOCTYPE directives are displayed in IE11 Standards mode. Default value for Internet Explorer 11.
            switch (browserVersion)
            {
                case 7:
                    mode = 7000; // Webpages containing standards-based !DOCTYPE directives are displayed in IE7 Standards mode. Default value for applications hosting the WebBrowser Control.
                    break;
                case 8:
                    mode = 8000; // Webpages containing standards-based !DOCTYPE directives are displayed in IE8 mode. Default value for Internet Explorer 8
                    break;
                case 9:
                    mode = 9000; // Internet Explorer 9. Webpages containing standards-based !DOCTYPE directives are displayed in IE9 mode. Default value for Internet Explorer 9.
                    break;
                case 10:
                    mode = 10000; // Internet Explorer 10. Webpages containing standards-based !DOCTYPE directives are displayed in IE10 mode. Default value for Internet Explorer 10.
                    break;
                default:
                    // use IE11 mode by default
                    break;
            }

            return mode;
        }

        void WebBrowser_Loaded(object sender, RoutedEventArgs e)
        {
            WebBrowserControl.LoadCompleted += WebBrowserControl_LoadCompleted;
            WebBrowserControl.Navigate(defaultUrl);
            WebBrowserControl.Navigated += new NavigatedEventHandler(WebBrowser_Navigated);
        }

        void WebBrowserControl_LoadCompleted(object sender, NavigationEventArgs e)
        {
            IServiceProvider serviceProvider = (IServiceProvider)WebBrowserControl.Document;
            Guid serviceGuid = SID_SWebBrowserApp;
            Guid iid = typeof(SHDocVw.IWebBrowser2).GUID;
            SHDocVw.IWebBrowser2 myWebBrowser2 = (SHDocVw.IWebBrowser2)serviceProvider.QueryService(ref serviceGuid, ref iid);
            SHDocVw.DWebBrowserEvents_Event wbEvents = (SHDocVw.DWebBrowserEvents_Event)myWebBrowser2;
            wbEvents.NewWindow += new SHDocVw.DWebBrowserEvents_NewWindowEventHandler(OnOpenNewWindow);
        }

        void WebBrowser_Navigated(object sender, NavigationEventArgs e)
        {
            HideJsScriptErrors((WebBrowser)sender);
            textBoxUrl.Text = e.Uri.ToString();
        }

        void OnOpenNewWindow(string URL, int Flags, string TargetFrameName, ref object PostData, string Headers, ref bool Processed)
        {
            Processed = true;
            WebBrowserControl.Navigate(URL);
        }

        public void HideJsScriptErrors(WebBrowser wb)
        {
            FieldInfo fld = typeof(WebBrowser).GetField("_axIWebBrowser2", BindingFlags.Instance | BindingFlags.NonPublic);
            if (fld == null)
                return;
            object obj = fld.GetValue(wb);
            if (obj == null)
                return;
            obj.GetType().InvokeMember("Silent", BindingFlags.SetProperty, null, obj, new object[] { true });
        }

        private void textBoxUrl_KeyDown(object sender, System.Windows.Input.KeyEventArgs e)
        {
            if (e.Key == Key.Return)
            {
                if (isValidatUrl())
                {
                    WebBrowserControl.Navigate(textBoxUrl.Text);
                } else
                {
                    MessageBox.Show("Invalid Url format");
                }
            }
        }

        private bool isValidatUrl()
        {
            if(textBoxUrl.Text.Length<1 || !Uri.IsWellFormedUriString(textBoxUrl.Text, UriKind.Absolute))
            {
                return false;
            }

            return true;
        }

        private void backBtn_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (this.WebBrowserControl.CanGoBack)
            {
                try
                {
                    this.WebBrowserControl.GoBack();
                }
                catch (COMException) { }
            }
        }

        private void fowardBtn_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (this.WebBrowserControl.CanGoForward)
            {
                try
                {
                    this.WebBrowserControl.GoForward();
                }
                catch (COMException) { }
            }
        }

        private void refreshBtn_MouseDown(object sender, MouseButtonEventArgs e)
        {
            WebBrowserControl.Refresh();
        }
    }
}
```

Now i will explain what each function does so you can have a clear understanding of the class. 

The `SetFeatureControls()` simply adds support for various modes and standards. `The GetEmulationMode()` tells the system to use to latest available version of Internet Explorer so pages are opened correctly and such. When the pages are navigated. the `HideJsScriptErrors()` method disable error scripts from popping up on our windows all the time. In the `WebBrowser_Navigated()` method you can see we set the textBoxUrl to the url link, this is good as it updates each time a new pag is loaded and let user know the current address he/she is at. It also updates when we go back and forth between pages.

The webEvents as shown in below code:
`wbEvents.NewWindow += new SHDocVw.DWebBrowserEvents_NewWindowEventHandler(OnOpenNewWindow);`
helps to disable new links opening in a new or default browser outside of our apps. We want to restrict and limit all navigation to the current app and window only so we have set the listener to `OnOpenNewWindow()` method.

We added a keyDown event the textBoxUrl for whenever user presses enter after entering a new url. The `textBoxUrl_KeyDown()` method checks and validates (using isValidUrl() method) the url before navigating to it and we simply go back and forward when we press the back and foward button respectively. The WebBrowser control has both methods we need for going forth and back (`WebBrowserControl.GoBack()` and `WebBrowserControl.GoFoward()`) and also the `Refresh()` which as you guessed is for refreshing the page.

**ScreenShots**

**01**
![](https://images.viblo.asia/07087c26-1fc9-43d3-9298-0455fec5b45d.png)

**02**
![](https://images.viblo.asia/bc234c3b-d8c4-4a24-b81e-21e9818cf88b.png)