# Signal

UNIX/Linux systems cung cấp các cơ chế đặc biệt để communicate giữa các process. Một trong số đó lấy tên là signals. 

Một cách ngắn gọn, a signal giống như một notification của một event. Khi một event nào đó xảy ra trong system, một signal sẽ được tạo ra để notify tới các chương trình khác về event này. 

Một ví dụ đơn giản: Khi bạn đang run một command trên terminal. Câu lệnh đang chạy, mà bạn lại sử dụng tổ hợp phím `ctrl + C` . Khi đó, một signal được gọi là `SIGINT` sinh ra. Và chương trình terminal sẽ đọc tín hiệu đó và thực thi việc dừng command lại. 

Trên UNIX-based systems, sẽ có 3 loại signals chính:

- System signals: 
    - SIGILL 
    - SIGTRAP 
    - SIGBUS
    - SIGFPE,
    - SIGKILL
    - SIGSEGV
    - SIGXCPU
    - SIGXFSZ
    - SIGIO
- Device signals:
    - SIGHUP
    - SIGINT
    - SIGPIPE
    - SIGALRM
    - SIGCHLD
    - SIGCONT
    - SIGSTOP
    - SIGTTIN
    - SIGTTOU
    - SIGURG
    - SIGWINCH
    - SIGIO
- User-defined signals: 
    - SIGQUIT
    - SIGABRT
    - SIGUSR1 
    - SIGUSR2
    - SIGTERM


Mỗi một signal sẽ được đại diện bởi một integer value. 

Trên Ubuntu, bạn có thể check list signal này :

```sh
man 7 signal
....
First the signals described in the original POSIX.1-1990 standard.

Signal     Value     Action   Comment
──────────────────────────────────────────────────────────────────────
SIGHUP        1       Term    Hangup detected on controlling terminal or death of controlling process
SIGINT        2       Term    Interrupt from keyboard
SIGQUIT       3       Core    Quit from keyboard
SIGILL        4       Core    Illegal Instruction
SIGABRT       6       Core    Abort signal from abort(3)
SIGFPE        8       Core    Floating point exception
SIGKILL       9       Term    Kill signal
SIGSEGV      11       Core    Invalid memory reference
SIGPIPE      13       Term    Broken pipe: write to pipe with no
                                readers
SIGALRM      14       Term    Timer signal from alarm(2)
SIGTERM      15       Term    Termination signal
SIGUSR1   30,10,16    Term    User-defined signal 1
SIGUSR2   31,12,17    Term    User-defined signal 2
SIGCHLD   20,17,18    Ign     Child stopped or terminated
SIGCONT   19,18,25    Cont    Continue if stopped
SIGSTOP   17,19,23    Stop    Stop process
SIGTSTP   18,20,24    Stop    Stop typed at terminal
SIGTTIN   21,21,26    Stop    Terminal input for background process
SIGTTOU   22,22,27    Stop    Terminal output for background process

The signals SIGKILL and SIGSTOP cannot be caught, blocked, or ignored.
....
```
Khi thực hiện lệnh `man 7 signal`, bạn cũng sẽ thể thấy cách sử dụng signal trong Ubuntu nó như thế nào:

```sh
Sending a signal
    The following system calls and library functions allow the caller to send a signal:

    raise(3)        Sends a signal to the calling thread.

    kill(2)         Sends a signal to a specified process, to all members of a specified process group, or to all processes on the system.

    killpg(2)       Sends a signal to all of the members of a specified process group.

    pthread_kill(3) Sends a signal to a specified POSIX thread in the same process as the caller.

    tgkill(2)       Sends a signal to a specified thread within a specific process.  (This is the system call used to implement pthread_kill(3).)

    sigqueue(3)     Sends a real-time signal with accompanying data to a specified process.

Waiting for a signal to be caught
    The following system calls suspend execution of the calling process or thread until a signal is caught (or an unhandled signal terminates the process):

    pause(2)        Suspends execution until any signal is caught.

    sigsuspend(2)   Temporarily changes the signal mask (see below) and suspends execution until one of the unmasked signals is caught.

Synchronously accepting a signal
    Rather than asynchronously catching a signal via a signal handler, it is possible to synchronously accept the signal, that is, to block execution until the signal  is  deliv‐
    ered, at which point the kernel returns information about the signal to the caller.  There are two general ways to do this:

    * sigwaitinfo(2),  sigtimedwait(2),  and sigwait(3) suspend execution until one of the signals in a specified set is delivered.  Each of these calls returns information about
        the delivered signal.

    * signalfd(2) returns a file descriptor that can be used to read information about signals that are delivered to the caller.  Each read(2) from this  file  descriptor  blocks
        until  one  of the signals in the set specified in the signalfd(2) call is delivered to the caller.  The buffer returned by read(2) contains a structure describing the sig‐
        nal.

```

# Python signal

Từ bản Python 1.4, `signal` library đã được tích hợp và cập nhật thường xuyên vào trong core. 

## Python Basic

Một ví dụ nhỏ về sử dụng `SIGINT` signal:

```py
import signal  
import time  
  
  
def handler(a, b): 
    print("Signal Number:", a, " Frame: ", b)  
  
signal.signal(signal.SIGINT, handler) 
  
while True:  
    print("Press ctrl + c")
    time.sleep(10) 
```

Line 1, 2 sẽ import lib `signal` và lib `time`. 

Line 5, 6 define function handle signal. Trong function này mình sẽ print ra value integer của signal và frame mà nó nhận được cùng với signal.

Line 8 sử dụng `signal.signal()` function để assign handle signal `SIGINT`. Mỗi một khoảng thời gian, CPU nhận được `ctrl + c`, function `handler` lại được thực hiện. 

Line 10, 11, 12 sử dụng `while True` để chương trình luôn chạy.

Lưu đoạn code trên mà test thử :


```
% python test_signal.py                                                                                                                                     
Press ctrl + c
^C('Signal Number:', 2, ' Frame: ', <frame object at 0x7f573f59c050>)
Press ctrl + c
^C('Signal Number:', 2, ' Frame: ', <frame object at 0x7f573f59c050>)
Press ctrl + c
^C('Signal Number:', 2, ' Frame: ', <frame object at 0x7f573f59c050>)
Press ctrl + c
^C('Signal Number:', 2, ' Frame: ', <frame object at 0x7f573f59c050>)
Press ctrl + c
^C('Signal Number:', 2, ' Frame: ', <frame object at 0x7f573f59c050>)
Press ctrl + c
^C('Signal Number:', 2, ' Frame: ', <frame object at 0x7f573f59c050>)
Press ctrl + c
^C('Signal Number:', 2, ' Frame: ', <frame object at 0x7f573f59c050>)
Press ctrl + c
```

Trên đây là ví dụ rất đơn giản về sử dụng sinal trong Python basic.

## Django

Django cung cấp các `signal dispatcher`. Nó cho phép các app tách rời được notified khi các action xảy ra ở nơi khác trong framework. 

Các signal built-in trong Django:

- `django.db.models.signals.pre_save & django.db.models.signals.post_save`: Send trước hoặc sau khi save() method được thực hiện trong model. 
- `django.db.models.signals.pre_delete & django.db.models.signals.post_delete`: Send trước hoặc sau khi delete() method được thực hiện trong model. 
- `django.db.models.signals.m2m_changed`: Sent khi`ManyToManyField` on a model is changed.
- `django.core.signals.request_started & django.core.signals.request_finished`: Sent khi Django starts or finishes một HTTP request.


Trong django, sử dụng `Signal.connect()` method để đăng ký một `receiver` function. `receiver` function này được called khi một signal được sent. Toàn bộ các signal’s receiver functions được gọi ở cùng một thời điểm và dựa theo thứ tự đăng ký.

```py
Signal.connect(receiver, sender=None, weak=True, dispatch_uid=None)
```

Bài toán dưới đây là thực hiện in ra dòng chữ `Request finished!` trên console sau mõi request được hoàn thành.

### Receiver functions

Đầu tiên, `receiver` được define như thế nào ?

```py
def my_callback(sender, **kwargs):
    print("Request finished!")
```

Lưu ý, trong hàm `receiver` phải có `sender` argument. Các arguments khác sẽ cần phải đẩy vào `**kwargs`. 

### Connecting receiver functions

Có 2 syntax cho phép connect a receiver to a signal.

- Option1: sử dụng `request_finished.connect()`.

```py
from django.core.signals import request_finished

request_finished.connect(my_callback)
```

- Option2: sử dụng `receiver()` decorator.

```py
from django.core.signals import request_finished
from django.dispatch import receiver

@receiver(request_finished)
def my_callback(sender, **kwargs):
    print("Request finished!")
```

Sau khi setup xong, `my_callback` function sẽ được call mỗi khi request finish.

Với bài toán trên, toàn bộ các requests finish thì sẽ đều bắn ra một signal. Vậy với bài toán, mình sẽ chỉ bắn signal với case cụ thể thì sao ?

### Connecting to signals sent by specific senders

Trong bài toán đăng ký user. Giải sử mình có một model User. Sau khi save user info vào model, mình muốn send thông báo rằng "Bạn đã đăng ký thành công" chẳng hạn. 

Minh sẽ cần sử dụng signal built-in : `from django.db.models.signals import post_save`

```py
from django.db.models.signals import post_save
from django.dispatch import receiver
from myapp.models import User


@receiver(post_save, sender=User)
def my_handler(sender, **kwargs):
    ...
    # Todo: Send email
```

# Summary

Trong article này, mình đã hướng dẫn các bạn hiểu signal là gì ? Cách sử dụng signal trong Python nói chung và trong Django nói riêng.

Thanks for reading!