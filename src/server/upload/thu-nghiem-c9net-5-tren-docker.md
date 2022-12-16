Bài gốc: https://qiita.com/Nossa/items/e7a2a380c24c0c92192c

Gần đây .NET 5 đã được release rồi. Và 1.NET 5 thì có hỗ trợ #9.
Tôi muốn thử ngay lập tức nên đã ko install lên PC của mình, mà chỉ dùng Docker để chuẩn bị môi trường phát triển cho .NET 5

Tôi thử trên môi trường Play witch Docker2. Đây là môi trường ko cần install và dùng trên cloud, dùng xong thì bỏ.

Môi trường
 Play with Docker: Linux (Alpine Linux 3.12)、Docker version 19.03.11。

```
$ more /etc/issue
```

```
Welcome to Alpine Linux 3.12
Kernel \r on an \m (\l)
```

```
$ docker --version
```

```
Docker version 19.03.11, build 42e35e61f3
```

Chuẩn bị môi trường phát triển .NET 5 
Chạy Docker Image của .NET 5 SDK.
Bằng -it option, kết nối input-output tiêu chuẩn với shell. Sau đó đưa vào Container của .NET 5 SDK. 

※Dùng --rm option, khi kết thúc container thì container sẽ tự động bị xóa.

Khi thử bằng PC thì những container ko cần thiết sẽ ko đc giữ lại.

```
$ docker run -it --rm mcr.microsoft.com/dotnet/sdk:5.0
```

```
Unable to find image 'mcr.microsoft.com/dotnet/sdk:5.0' locally
5.0: Pulling from dotnet/sdk
bb79b6b2107f: Pull complete 
97805e17b1a2: Pull complete 
48d36279ea43: Pull complete 
5d23a35fbf12: Pull complete 
982bc1066a1e: Pull complete 
6cc6e848c1f3: Pull complete 
df97eda6f03d: Pull complete 
7520ee234b82: Pull complete 
Digest: sha256:ac49854ff6dcc1a2916ffc0981503f571698458187f925da0c2f2b6a0bec8dee
Status: Downloaded newer image for mcr.microsoft.com/dotnet/sdk:5.0
root@e68a47087ad8:/# 
```

Confirm .NET 5 đã được install.

```
root@e68a47087ad8:/# dotnet --version
```

```
5.0.100
```

Distribution của Linux là Debian:

```
root@e68a47087ad8:/# more /etc/issue

Debian GNU/Linux 10 \n \l
```

Thử chức năng mới của C# 9（.NET 5）
Tạo console app, rồi thử nghiệm chức năng mới của C# 9.

```
root@e68a47087ad8:/# dotnet new console -o MyConsoleApp && cd MyConsoleApp
```

```
Getting ready...
The template "Console Application" was created successfully.
```

```
Processing post-creation actions...
Running 'dotnet restore' on MyConsoleApp/MyConsoleApp.csproj...
  Determining projects to restore...
  Restored /MyConsoleApp/MyConsoleApp.csproj (in 89 ms).
Restore succeeded.
```

Tạo project:

```
root@e68a47087ad8:/MyConsoleApp# ls -R
```

```
MyConsoleApp.csproj  Program.cs  obj

./obj:
MyConsoleApp.csproj.nuget.dgspec.json  MyConsoleApp.csproj.nuget.g.targets  project.nuget.cache
MyConsoleApp.csproj.nuget.g.props      project.assets.json
```

Tôi muốn chỉnh sửa tập tin, nhưng vim không được bao gồm, vì vậy tôi muốn cài đặt nó.
Đầu tiên, hãy cập nhật package.

```
root@e68a47087ad8:/MyConsoleApp# apt update && apt upgrade
```

```
Get:1 http://security.debian.org/debian-security buster/updates InRelease [65.4 kB]
Get:2 http://deb.debian.org/debian buster InRelease [121 kB]       
Get:3 http://deb.debian.org/debian buster-updates InRelease [51.9 kB]
Get:4 http://security.debian.org/debian-security buster/updates/main amd64 Packages [248 kB]
Get:5 http://deb.debian.org/debian buster/main amd64 Packages [7906 kB]
Get:6 http://deb.debian.org/debian buster-updates/main amd64 Packages [7856 B]
Fetched 8401 kB in 1s (5711 kB/s)                         
Reading package lists... Done
Building dependency tree       
Reading state information... Done
1 package can be upgraded. Run 'apt list --upgradable' to see it.
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Calculating upgrade... Done
The following packages will be upgraded:
  tzdata
1 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Need to get 264 kB of archives.
After this operation, 3072 B of additional disk space will be used.
Do you want to continue? [Y/n] Y
Get:1 http://deb.debian.org/debian buster-updates/main amd64 tzdata all 2020d-0+deb10u1 [264 kB]
Fetched 264 kB in 0s (24.0 MB/s)
debconf: delaying package configuration, since apt-utils is not installed
(Reading database ... 9877 files and directories currently installed.)
Preparing to unpack .../tzdata_2020d-0+deb10u1_all.deb ...
Unpacking tzdata (2020d-0+deb10u1) over (2020a-0+deb10u1) ...
Setting up tzdata (2020d-0+deb10u1) ...
debconf: unable to initialize frontend: Dialog
debconf: (No usable dialog-like program is installed, so the dialog based frontend cannot be used. at /usr/share/perl5/Debconf/FrontEnd/Dialog.pm line 76.)
debconf: falling back to frontend: Readline

Current default time zone: 'Etc/UTC'
Local time is now:      Sat Nov 14 16:16:39 UTC 2020.
Universal Time is now:  Sat Nov 14 16:16:39 UTC 2020.
Run 'dpkg-reconfigure tzdata' if you wish to change it.
```


Install vim

```
root@e68a47087ad8:/MyConsoleApp# apt install vim
```

```
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  libgpm2 vim-common vim-runtime xxd
Suggested packages:
  gpm ctags vim-doc vim-scripts
The following NEW packages will be installed:
  libgpm2 vim vim-common vim-runtime xxd
0 upgraded, 5 newly installed, 0 to remove and 0 not upgraded.
Need to get 7425 kB of archives.
After this operation, 33.8 MB of additional disk space will be used.
Do you want to continue? [Y/n] Y
Get:1 http://deb.debian.org/debian buster/main amd64 xxd amd64 2:8.1.0875-5 [140 kB]
Get:2 http://deb.debian.org/debian buster/main amd64 vim-common all 2:8.1.0875-5 [195 kB]
Get:3 http://deb.debian.org/debian buster/main amd64 libgpm2 amd64 1.20.7-5 [35.1 kB]
Get:4 http://deb.debian.org/debian buster/main amd64 vim-runtime all 2:8.1.0875-5 [5775 kB]
Get:5 http://deb.debian.org/debian buster/main amd64 vim amd64 2:8.1.0875-5 [1280 kB]
Fetched 7425 kB in 0s (59.9 MB/s)
debconf: delaying package configuration, since apt-utils is not installed
Selecting previously unselected package xxd.
(Reading database ... 9877 files and directories currently installed.)
Preparing to unpack .../xxd_2%3a8.1.0875-5_amd64.deb ...
Unpacking xxd (2:8.1.0875-5) ...
Selecting previously unselected package vim-common.
Preparing to unpack .../vim-common_2%3a8.1.0875-5_all.deb ...
Unpacking vim-common (2:8.1.0875-5) ...
Selecting previously unselected package libgpm2:amd64.
Preparing to unpack .../libgpm2_1.20.7-5_amd64.deb ...
Unpacking libgpm2:amd64 (1.20.7-5) ...
Selecting previously unselected package vim-runtime.
Preparing to unpack .../vim-runtime_2%3a8.1.0875-5_all.deb ...
Adding 'diversion of /usr/share/vim/vim81/doc/help.txt to /usr/share/vim/vim81/doc/help.txt.vim-tiny by vim-runtime'
Adding 'diversion of /usr/share/vim/vim81/doc/tags to /usr/share/vim/vim81/doc/tags.vim-tiny by vim-runtime'
Unpacking vim-runtime (2:8.1.0875-5) ...
Selecting previously unselected package vim.
Preparing to unpack .../vim_2%3a8.1.0875-5_amd64.deb ...
Unpacking vim (2:8.1.0875-5) ...
Setting up libgpm2:amd64 (1.20.7-5) ...
Setting up xxd (2:8.1.0875-5) ...
Setting up vim-common (2:8.1.0875-5) ...
Setting up vim-runtime (2:8.1.0875-5) ...
Setting up vim (2:8.1.0875-5) ...
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/vim (vim) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/vimdiff (vimdiff) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/rvim (rvim) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/rview (rview) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/vi (vi) in auto mode
update-alternatives: warning: skip creation of /usr/share/man/da/man1/vi.1.gz because associated file /usr/share/man/da/man1/vim.1.gz (of link group vi) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/de/man1/vi.1.gz because associated file /usr/share/man/de/man1/vim.1.gz (of link group vi) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/fr/man1/vi.1.gz because associated file /usr/share/man/fr/man1/vim.1.gz (of link group vi) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/it/man1/vi.1.gz because associated file /usr/share/man/it/man1/vim.1.gz (of link group vi) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/ja/man1/vi.1.gz because associated file /usr/share/man/ja/man1/vim.1.gz (of link group vi) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/pl/man1/vi.1.gz because associated file /usr/share/man/pl/man1/vim.1.gz (of link group vi) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/ru/man1/vi.1.gz because associated file /usr/share/man/ru/man1/vim.1.gz (of link group vi) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/man1/vi.1.gz because associated file /usr/share/man/man1/vim.1.gz (of link group vi) doesn't exist
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/view (view) in auto mode
update-alternatives: warning: skip creation of /usr/share/man/da/man1/view.1.gz because associated file /usr/share/man/da/man1/vim.1.gz (of link group view) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/de/man1/view.1.gz because associated file /usr/share/man/de/man1/vim.1.gz (of link group view) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/fr/man1/view.1.gz because associated file /usr/share/man/fr/man1/vim.1.gz (of link group view) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/it/man1/view.1.gz because associated file /usr/share/man/it/man1/vim.1.gz (of link group view) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/ja/man1/view.1.gz because associated file /usr/share/man/ja/man1/vim.1.gz (of link group view) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/pl/man1/view.1.gz because associated file /usr/share/man/pl/man1/vim.1.gz (of link group view) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/ru/man1/view.1.gz because associated file /usr/share/man/ru/man1/vim.1.gz (of link group view) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/man1/view.1.gz because associated file /usr/share/man/man1/vim.1.gz (of link group view) doesn't exist
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/ex (ex) in auto mode
update-alternatives: warning: skip creation of /usr/share/man/da/man1/ex.1.gz because associated file /usr/share/man/da/man1/vim.1.gz (of link group ex) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/de/man1/ex.1.gz because associated file /usr/share/man/de/man1/vim.1.gz (of link group ex) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/fr/man1/ex.1.gz because associated file /usr/share/man/fr/man1/vim.1.gz (of link group ex) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/it/man1/ex.1.gz because associated file /usr/share/man/it/man1/vim.1.gz (of link group ex) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/ja/man1/ex.1.gz because associated file /usr/share/man/ja/man1/vim.1.gz (of link group ex) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/pl/man1/ex.1.gz because associated file /usr/share/man/pl/man1/vim.1.gz (of link group ex) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/ru/man1/ex.1.gz because associated file /usr/share/man/ru/man1/vim.1.gz (of link group ex) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/man1/ex.1.gz because associated file /usr/share/man/man1/vim.1.gz (of link group ex) doesn't exist
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/editor (editor) in auto mode
update-alternatives: warning: skip creation of /usr/share/man/da/man1/editor.1.gz because associated file /usr/share/man/da/man1/vim.1.gz (of link group editor) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/de/man1/editor.1.gz because associated file /usr/share/man/de/man1/vim.1.gz (of link group editor) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/fr/man1/editor.1.gz because associated file /usr/share/man/fr/man1/vim.1.gz (of link group editor) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/it/man1/editor.1.gz because associated file /usr/share/man/it/man1/vim.1.gz (of link group editor) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/ja/man1/editor.1.gz because associated file /usr/share/man/ja/man1/vim.1.gz (of link group editor) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/pl/man1/editor.1.gz because associated file /usr/share/man/pl/man1/vim.1.gz (of link group editor) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/ru/man1/editor.1.gz because associated file /usr/share/man/ru/man1/vim.1.gz (of link group editor) doesn't exist
update-alternatives: warning: skip creation of /usr/share/man/man1/editor.1.gz because associated file /usr/share/man/man1/vim.1.gz (of link group editor) doesn't exist
Processing triggers for libc-bin (2.28-10) ...
```

Bây giờ bạn đã sẵn sàng, hãy thử mã C # 9.
Để biết chi tiết, vui lòng xem bài viết sau mà tôi đã tham khảo.

C # Chuyện nhỏ: Giới thiệu các tính năng ưa thích trong C # 9.0 có thể dùng trong .NET 5.0
https://qiita.com/okazuki/items/8043ea6f0095b3019cdf


Tuyên bố cấp cao nhất 4
Tại điểm nhập, bạn có thể viết mã trực tiếp mà không cần class. Nó có vẻ là thuận tiện cho các batch đơn giản.

```
root @ e68a47087ad8: / MyConsoleApp # vim Program.cs
```

```
System.Console.WriteLine("Hello from top.");
```

Build (Trong các sample sau tôi sẽ giản lược phần này)

```
root@e68a47087ad8:/MyConsoleApp# dotnet build
```

```
Microsoft (R) Build Engine version 16.8.0+126527ff1 for .NET
Copyright (C) Microsoft Corporation. All rights reserved.
```

```
  Determining projects to restore...
  All projects are up-to-date for restore.
  MyConsoleApp -> /MyConsoleApp/bin/Debug/net5.0/MyConsoleApp.dll

Build succeeded.
    0 Warning(s)
    0 Error(s)

Time Elapsed 00:00:02.44
```

```
root@e68a47087ad8:/MyConsoleApp# dotnet run
```

```
Hello from top.
```

Bản ghi loại 5
Bạn có thể dễ dàng tạo các đối tượng bất biến.
Ngoài ra, nếu các giá trị thuộc tính khớp, == sẽ đúng ngay cả đối với các loại bản ghi có các tham chiếu khác nhau.
Ngoài ra, mặc dù không được thử trong bài viết này, bạn có thể sử dụng biểu thức with để tạo một bản ghi mới chỉ với một số thuộc tính được viết lại.

Việc tạo đối tượng giá trị dường như diễn ra nhanh chóng.

```
root@e68a47087ad8:/MyConsoleApp# vim Program.cs
```

```
using static System.Console;

record Money(decimal amount);

class Program  {
  static void Main() {
    var money1 = new Money(10);
    WriteLine($"money1: {Money}");

    var money2 = new Money(10);
    WriteLine($"money2: {money2}");

    WriteLine($"money1 == money2: {money1 == money2}");
  }
}
```

```
root@e68a47087ad8:/MyConsoleApp# dotnet run
```

```
money1: Money { amount = 10 }
money2: Money { amount = 10 }
money1 == money2: True
```

Target typed new
Bạn có thể bỏ qua tên kiểu mới khi  suy luận theo model.
Cho đến bây giờ, có một var được suy ra từ phía bên phải, nhưng nó không thể được sử dụng như một biến thành viên.
Ngoài ra, có vẻ như tên model có thể bị bỏ qua ngay cả khi model được khai báo rõ ràng trong đối số hoặc giá trị trả về.

```
using System.Collections.Generic;
using System.Linq;

class Program {
  static readonly Dictionary<int, List<string>> _cache = new();

  static void Main() {
    _cache.Add(1, new() { "aaa" });

    System.Console.WriteLine(_cache[1].First());
  }
}
```

```
    root@e68a47087ad8:/MyConsoleApp# dotnet run
```

```
    aaa
```

    Các tính năng mới của biểu thức điều kiện
Chi tiết các bạn tham khảo bài viết sau đây mà mình tham khảo nhé.

Biểu thức điều kiện tạo ra một cuộc cách mạng trong C # 9.0
    https://qiita.com/Zuishin/items/aac9f0dea33f96c265ac

Hoặc, và chưa được thêm vào biểu thức điều kiện.
Là một tính năng, nó được đánh giá một lần, vì vậy nó có vẻ dễ sử dụng ngay cả đối với các biểu thức có tác dụng phụ.

```
root @ e68a47087ad8: / MyConsoleApp # vim Program.cs
```

```
 using static System.Console;

int Add2AndPrint(int i)
{
    var res = i + 2;
    WriteLine(res);
    return res;
}

WriteLine(Add2AndPrint(2) is >= 3 and <= 5);

object o = 10;
WriteLine(o is int i && ((i % 3, i % 5) is ((0, int _) or (int _, 0)) and not (0, 0)));
```                                     

```
 root@e68a47087ad8:/MyConsoleApp# dotnet run
```

```
4
True
True
 ```
 
Như tôi nhận thấy sau đó, mỗi khi tôi thay đổi mã nguồn, nó được xây dựng bằng cách chạy dotnet mà không thực hiện xây dựng dotnet. Thật tiện lợi!
Cảm ơn bạn đã đọc.