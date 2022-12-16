Tự động scan port, brute-force đường dẫn và một số công cụ khác trên Kali Linux có lẽ khá là khó với những người bắt đầu tìm hiểu về hack, chính vì vậy, công cụ Sparta ra đời với mục đích đơn giản hóa các tác vụ phức tạp.

Sparta là một công cụ có giao diện đồ họa được viết trên nền ngôn ngữ Python. Sparta giúp chúng ta tự động hóa được các công việc như thu thập thông tin, quét tự động và kiểm tra lỗ hổng bảo mật tự động. Không lạ là Sparta cũng sử dụng các module của Nikto, WhatWeb, Nmap, Telnet, Netcat để hoạt động.

Trước khi bắt đầu vào tìm hiểu thì ta sẽ cài đặt Sparta

1\. Cài đặt công cụ hack Sparta
-------------------------------

Sparta thường được cài đặt sẵn trên hầu hết các bản phân phối của Kali Linux, tuy nhiên với bản Kali Linux Light thì bạn cần cài nó thủ công. Để cài đặt thì bạn gõ lệnh sau :

 |

`apt-get update &amp;&amp; apt-get install sparta python-requests`

 |

 |

`Reading package lists... Done`

`Building dependency tree`

`Reading state information... Done`

`The following additional packages will be installed:`

`avahi-daemon cutycapt finger firebird3.0-common firebird3.0-common-doc geoclue-2.0 hydra iio-sensor-proxy javascript-common ldap-utils libapr1 libaprutil1 libaudio2 libavahi-core7 libavahi-glib1 libbrotli1`

`libdaemon0 libdouble-conversion1 libfbclient2 libhyphen0 libjs-jquery libmng1 libnss-mdns libpcre2-16-0 libpq5 libqt4-dbus libqt4-declarative libqt4-designer libqt4-help libqt4-network libqt4-script`

`libqt4-scripttools libqt4-sql libqt4-sql-mysql libqt4-svg libqt4-test libqt4-xml libqt4-xmlpatterns libqt5core5a libqt5dbus5 libqt5gui5 libqt5network5 libqt5positioning5 libqt5printsupport5 libqt5qml5`

`libqt5quick5 libqt5sensors5 libqt5svg5 libqt5webchannel5 libqt5webkit5 libqt5widgets5 libqtassistantclient4 libqtcore4 libqtdbus4 libqtgui4 libserf-1-1 libssh-4 libsvn1 libtommath1 libutf8proc2 libwoff1`

`libxcb-icccm4 libxcb-image0 libxcb-keysyms1 libxcb-randr0 libxcb-render-util0 libxcb-xinerama0 libxcb-xkb1 libxkbcommon-x11-0 libxslt1.1 nikto python-asn1crypto python-blinker python-cffi-backend python-click`

`python-colorama python-crypto python-cryptography python-elixir python-enum34 python-flask python-impacket python-ipaddress python-itsdangerous python-jinja2 python-ldap3 python-markupsafe python-openssl`

`python-pkg-resources python-pyasn1 python-pycryptodome python-pyinotify python-qt4 python-simplejson python-sip python-six python-sqlalchemy python-sqlalchemy-ext python-werkzeug qdbus qt-at-spi`

`qt5-gtk-platformtheme qtchooser qtcore4-l10n qttranslations5-l10n rwho rwhod sparta xsltproc`

`0 upgraded, 109 newly installed, 0 to remove and 0 not upgraded.`

`Need to get 57.8 MB of archives.`

`After this operation, 227 MB of additional disk space will be used.`

`Do you want to continue? [Y/n]`

 |

Sau khi cài đặt xong, bạn có thể khởi động Sparta bằng cách gõ "sparta" vào terminal.

|

 |

`sparta`

`[+] Creating temporary files..`

`[+] Wordlist was created/opened: /tmp/sparta-9AE08J-tool-output/sparta-usernames.txt`

`[+] Wordlist was created/opened: /tmp/sparta-9AE08J-tool-output/sparta-passwords.txt`

`[+] Loading settings file..`

 |

Sau khi loading file xong thì Sparta sẽ come to your computer :)))) Giao diện của Sparta về cơ bản sẽ như sau :

![](https://anonymousvn.org/wp-content/uploads/2019/06/Sparta-screen.jpg)

2\. Tiến hành quét Networks, Webapp
-----------------------------------

Sparta có một chức năng khá hay đó là nó có thể quét theo dải ip của một mạng, hoặc có thể quét theo 1 domain, hay chỉ 1 ip. Bạn chỉ cần bấm vào dòng **"Click here to add host(s) to scope**" ở dưới tab **Scan**

Ở đây bạn có thể điền vào domain, ip hoặc dải ip tùy vào mục đích sử dụng của bạn. Sau khi xong thì bạn bấm vào **"Add to Scope"**.

Sau khi bạn click thì Nmap sẽ được chạy đầu tiên để quét trên các port phổ biến như 80, 443. Sau khi xong thì Nmap và Nikto sẽ cùng chạy quét trên các port ít phổ biến hơn.

![](https://anonymousvn.org/wp-content/uploads/2019/06/sparta-result-.jpg)

3\. Phân tích kết quả
---------------------

Sau khi đã có kết quả quét, bạn sẽ tìm được khá nhiều điểm thú vị ở phần kết quả của Sparta. Chúng ta sẽ cùng phân tích thử một kết quả.

Đáng chú ý nhất trong quá trình quét ứng dụng web, dịch vụ SSH nằm trên cổng 22222. Quản trị viên hệ thống có thể đã thay đổi cổng SSH mặc định từ 22 thành 22222. Có thể admin của website này nghĩ rằng việc đổi port như vậy sẽ an toàn hơn, tuy nhiên, như chúng ta có thể thấy, điều này không đúng -- Sparta vẫn phát hiện dịch vụ SSH. Ngoài ra Sparta còn hỗ trợ một số công cụ khác trong quá trình scan như:

-   Portscan
-   Mark as checked
-   Open with telnet
-   Open with ssh client (as root)
-   Open with netcat
-   Send to Brute
-   Open in browser
-   Take screenshot
-   Run whatweb
-   Run nmap (scripts) on port
-   Run nikto
-   Launch webslayer
-   Launch dirbuster
-   Grab banner

Bạn cũng có thể target tới nhiều scope cùng lúc bằng cách bấm vào **File **và chọn ""Add host(s) to scope."

4\. Quét một dịch vụ SSH
------------------------

SSH là một giao thức quản trị từ xa cực kỳ phổ biến với các máy chủ hiện nay. Mình sẽ click vào dịch vụ SSH vừa được quét ở trên, trong trường hợp này thì SSH nằm ở cổng 22222 và chọn **"Open with SSH client"**, Sparta sẽ mở một terminal lên và cố gắng đăng nhập.

 |

`The authenticity of host '[███.███.███.███]:22222 ([███.███.███.███]:22222)' can't be established.`

`ECDSA key fingerprint is SHA256:f94dIlgg2kDtCK4ahtN5/iAZxY9D6v+FtNTLK03uTr4.`

`Are you sure you want to continue connecting (yes/no)? yes`

`Warning: Permanently added '[███.███.███.███]:22222' (ECDSA) to the list of known hosts.`

`This is a private system maintained by ██████████ Corporation.`

`All connections are logged and monitored. Issues accessing this server should be reported to ████████@████████████.org.`

`root@███████████'s password:`

 |

Tiếp tục bấm chuột phải vào Service SSH vừa quét được ở trên và chọn **"Send to brute"**. Sau đó click vào tab Brute trên cửa sổ của Sparta

![](https://anonymousvn.org/wp-content/uploads/2019/06/send-to-brute-sparta.jpg)

Ở tab này, Sparta sẽ tiến hành brute-force mật khẩu đăng nhập SSH. Điều bạn cần làm là chọn username và wordlist.

Tham khảo thêm [Hướng dẫn hack pass Wifi bằng từ điển](https://anonymousvn.org/crack-wifi-wpawpa2-aircrack-ng-cowpatty.hav)

Trên Linux, có một số bản wordlist sẵn ở đường dẫn **/usr/share/wordlists/ **

Bạn cũng có thể tham khảo một số wordlist tại :

-   [Seclist](https://ouo.io/s2vkWA)
-   [Hashes](https://ouo.io/kMIJiN)

Khi bạn đã cấu hình wordlist và username xong thì chỉ cần bấm "RUN" và ngồi đợi. Ở bước này thì Sparta sử dụng module brute-force của [Hydra](https://anonymousvn.org/tim-hieu-ve-andrax-penetration-testing-platform-dau-tien-tren-android-2.hav)

![](https://anonymousvn.org/wp-content/uploads/2019/06/sparta-brute-force-hydra.jpg)

Nếu như mật khẩu được tìm thấy trong wordlist thì sẽ hiện kết quả như sau

![](https://anonymousvn.org/wp-content/uploads/2019/06/sparta-successfull-bruteforce.jpg)

Bài viết này khá dài nên tạm thời mình sẽ dùng ở đây, phần 2 sẽ được mình viết và đăng nốt trong tuần này.

Chúc các bạn thành công <3