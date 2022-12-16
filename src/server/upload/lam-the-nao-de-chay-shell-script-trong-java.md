Trong thực tế nhiều khi chương trình Java của bạn sẽ phải gọi đến shell script của hệ điều hành (Window, Linux) để thực hiện một số các tác vụ đặc biệt nào đó. Ví dụ như khi ứng dụng của bạn thực hiện một nghiệp vụ và sau đó phải gọi đến 1 shell script để import dữ liệu vào DB chẳng hạn....
Bài viết này sẽ giới thiệu cách thức để chúng ta có thể chạy shell script trong Java.

## Đầu tiên phải kể đến sự phụ thuộc vào hệ điều hành khi bạn chạy shell script.

Trước khi tạo ra một tiến trình mới thực hiện lệnh shell, trước tiên chúng ta cần xác định hệ điều hành mà JVM đang chạy. Bởi vì, trên Windows, chúng ta cần chạy lệnh như là đối số cho cmd.exe shell và trên tất cả các hệ điều hành khác, chúng ta có thể chạy như là shell tiêu chuẩn, được gọi là sh.

```
private static final String WINDOWS_OS_PREFIX = "windows";
private static final String OS_NAME_KEY = "os.name";

...

//Chúng ta có thể dùng method dưới để check OS
private static boolean isWindows() {
		return System.getProperty(OS_NAME_KEY).toLowerCase().startsWith(WINDOWS_OS_PREFIX);
}
```

Trong Java chúng ta có thể sử dụng ProcessBuilder để chạy shell script. Và tùy từng OS thì các command sẽ được sử dụng phù hợp
```
	ProcessBuilder processBuilder = new ProcessBuilder();

	// -- Linux --
	// Run a shell command
	processBuilder.command("bash", "-c", "ls /home/framgia/");
	// Run a shell script
	processBuilder.command("/home/framgia/importData.sh");

	// -- Windows --
	// Run a command
	processBuilder.command("cmd.exe", "/c", "dir C:\\Users\\vuta");
	// Run a bat file
	processBuilder.command("C:\\Users\\vuta\\importData.bat");

	Process process = processBuilder.start();
```

## Ví dụ chạy shell script 1

Ví dụ dưới sử dụng ProcessBuilder để thực hiện chạy shell command -> ping google.com 3 lần.
```
package com.vuta.shell;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class JavaShellExample1 {

	private static final String WINDOWS_OS_PREFIX = "windows";
	private static final String OS_NAME_KEY = "os.name";

	public static void main(String[] args) {
		ProcessBuilder processBuilder = new ProcessBuilder();
		if (isWindows()) {
			// Run this on Windows, cmd, /c = terminate after this run
			processBuilder.command("cmd.exe", "/c", "ping -n 3 google.com");
		} else {
			// Sorry!!! I don't have Linux machine so not yet tested :)
			processBuilder.command("bash", "-c", "ping 3 google.com");
		}

		try {

			Process process = processBuilder.start();

			// blocked :(
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

			String line;
			while ((line = reader.readLine()) != null) {
				System.out.println(line);
			}

            // Causes the current thread to wait, if necessary, until the
			// process represented by this Process object has terminated. This
			// method returns immediately if the subprocess has already
			// terminated. If the subprocess has not yet terminated, the calling
			// thread will be blocked until the subprocess exits.
			//
			// Returns: the exit value of the subprocess represented by this
			// Process object. By convention, the value 0 indicates normal
			// termination.
			int exitCode = process.waitFor();
			System.out.println("\nExited with error code : " + exitCode);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	private static boolean isWindows() {
		return System.getProperty(OS_NAME_KEY).toLowerCase().startsWith(WINDOWS_OS_PREFIX);
	}
}

```

Kết quả thu được như sau
> Pinging google.com [2404:6800:4005:80e::200e] with 32 bytes of data:
> 
> Reply from 2404:6800:4005:80e::200e: time=22ms 
> 
> Reply from 2404:6800:4005:80e::200e: time=23ms 
> 
> Reply from 2404:6800:4005:80e::200e: time=22ms 
> 
> Ping statistics for 2404:6800:4005:80e::200e:
> 
>     Packets: Sent = 3, Received = 3, Lost = 0 (0% loss),
>     
> Approximate round trip times in milli-seconds:
> 
>     Minimum = 22ms, Maximum = 23ms, Average = 22ms
> 
> Exited with error code : 0
> 

## Ví dụ chạy shell script 2
Trên thực tế thì shell script làm được rất nhiều thứ hay ho, có rất nhiều tutorial hướng dẫn lập trình shell, tuy nhiên trong bài viết này mình không đề cập chi tiết. Các bạn có thể tham khảo thêm ở 1 số link sau:

https://www.tutorialspoint.com/batch_script

https://www.tutorialspoint.com/unix/shell_scripting.htm
...

Do viết bài trên window nên mình chỉ cung cấp ví dụ cho window thôi nhé :P. Đầu tiên hãy cùng tạo 1 shell script giả lập việc import data có path C:\importData.bat như sau: 

```
@echo off
echo begin import data ...
echo importing data to DB...
echo import data successfully :)
```

```
package com.vuta.shell;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class JavaShellExample2 {

	private static final String WINDOWS_OS_PREFIX = "windows";
	private static final String OS_NAME_KEY = "os.name";

	public static void main(String[] args) {
		ProcessBuilder processBuilder = new ProcessBuilder();
		if (isWindows()) {
			// Run this on Windows, cmd, /c = terminate after this run
			processBuilder.command("cmd.exe", "/c", "C:\\importData.bat");
			
			try {

				Process process = processBuilder.start();

				BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

				String line;
				while ((line = reader.readLine()) != null) {
					System.out.println(line);
				}
				
				int exitCode = process.waitFor();
				System.out.println("\nExited with error code : " + exitCode);

			} catch (IOException e) {
				e.printStackTrace();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	private static boolean isWindows() {
		return System.getProperty(OS_NAME_KEY).toLowerCase().startsWith(WINDOWS_OS_PREFIX);
	}
}

```

Kết quả như sau:
> begin import data ...
> 
> importing data to DB...
> 
> import data successfully :)
> 
> 
> Exited with error code : 0

Hy vọng các bạn có nhiều ý tưởng hay ho để nghịch ngợm sau bài viết này :D