Sometimes you might want to detect when some special keys are pressed from your app. Some of which the regular onKeyDown or OnKeyUp just wont suffice. You may want to restrict them or simply detect when pressed only so in the episode ill show you how to easily hook your keyboard.

Create a class KeyHook.cs

**KeyHook.cs**

```
class KeyHook
{
    public delegate IntPtr LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);
    private const int WH_KEYBOARD_LL = 13;
    private const int WM_KEYDOWN = 0x0100;

    public static IntPtr SetHook(LowLevelKeyboardProc proc)
    {
        using (Process curProcess = Process.GetCurrentProcess())
        using (ProcessModule curModule = curProcess.MainModule)
        {
            return SetWindowsHookEx(WH_KEYBOARD_LL, proc, GetModuleHandle(curModule.ModuleName), 0);
        }
    }

    [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    private static extern IntPtr SetWindowsHookEx(int idHook,
                                                  LowLevelKeyboardProc lpfn, IntPtr hMod, uint dwThreadId);

    [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool UnhookWindowsHookEx(IntPtr hhk);

    [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    public static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode,
                                               IntPtr wParam, IntPtr lParam);

    [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    private static extern IntPtr GetModuleHandle(string lpModuleName);
}
}
```

This class includes all the dll references we need to get the keyboard keys from system level.

Next open your window class where you intend to restrict or detect key press and below variables 
 
```
    private static readonly KeyHook.LowLevelKeyboardProc _proc = HookCallback;
    private static IntPtr _hookID = IntPtr.Zero;
```

Next override the **OnSourceInitialized** and initialize tje 

```
protected override void OnSourceInitialized(EventArgs e)
{
    base.OnSourceInitialized(e);
    _hookID = KeyHook.SetHook(_proc);
}
```

Now the only thing left is the Callback Function that is called when key events are triggered.

```
        public static IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam)
        {
            if (nCode >= 0)
            {
                int vCode = Marshal.ReadInt32(lParam);
                System.Windows.Forms.Keys keyPressed = (System.Windows.Forms.Keys)vCode;

                // Dissable WindowsKey
                if (keyPressed == System.Windows.Forms.Keys.LWin || keyPressed == System.Windows.Forms.Keys.RWin)
                {
                    return (IntPtr)1;
                }

                //You can also dissable keys using the virtual code. For example the menu key is 93:
                // Menu Key
                if (vCode == 93)
                {
                    return (IntPtr)1;
                }

                //Show alert when key 'M' is clicked:
                // M Key
                if (keyPressed == System.Windows.Forms.Keys.M)
                {
                    MessageBox.Show("You pressed M");
                    return (IntPtr)1;
                }
            }
            return KeyHook.CallNextHookEx(_hookID, nCode, wParam, lParam);
        }
```

Thats it. You can add any key now to the callback and listen or block it. Happy Coding!