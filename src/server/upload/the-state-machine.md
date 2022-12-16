The State Machine được định nghĩa ở đây là một kiến trúc trạng thái máy cái xử lý các thông điệp(messages) và có thể có các trạng thái được sắp xếp có thứ bậc.

Một state là một State object và các trạng thái tùy chọn enter/exit/getName.
Các phương thức enter/exit là tương đương với quá trình khởi tạo(construction) và hủy(destruction) trong lập trình hướng đối tượng và được sử dụng để thực hiện quá trình khởi tạo và dọn dẹp các state tương ứng.
Phương thức getName trả về tên của state; quá trình triển khai mặc định trả về tên class. Có thể có mong muốn phương thức getName trả về thể hiện của state thay vì tên trong một số trường hợp riêng biệt nếu một lớp state riêng biệt có rất nhiều thể hiện(instance).

Khi một state machine được tạo, addState được sử dụng để xây dựng kiến trúc và setInitialState được sử dụng để chỉ ra đây là trạng thái khởi tạo. Sau quá trình khởi tạo người lập trình viên gọi start cái sẽ khởi tạo và start một state machine. Hoạt động đầu tiên của SateMachine là gọi enter cho tất cả các trạng thái khởi tạo của kiến trúc, bắt đầu tại cha lớn nhất của nó. Việc gọi enter sẽ được thực hiện trong bối cảnh của Handler của StateMachine, không phải trong bối cảnh của nơi gọi nó để start, và chúng sẽ được gọi trước bất cứ messages nào được xử lý. Ví dụ, trong một state machine đơn giản bên dưới, mP1.enter sẽ được gọi và rồi mS1.enter. Cuối cùng, các messages được gửi tới state machine sẽ được xử lý bởi state hiện tại; trong state machine đơn giản của chúng ta bên dưới đó có thể là quá trình khởi tạo mS1.processMessage.

        mP1
       /   \
      mS2   mS1 ----> initial state
      
Sau khi state machine được tạo và chạy, các thông điệp(messages) được gửi tới một state machine sử dụng sendMessage và các messages được tạo sử dụng obtainMessage. Khi một state machine nhận được một message thì phương thức processMessage của state hiện tại được gọi. Trong ví dụ trên mS1.processMessage sẽ được gọi trước tiên. State có thể sử dụng transitionTo để thay đổi state hiện tại thành một state mới.

Mỗi state trong state machine có thể không có hoặc có một state cha. Nếu một state con không thể xử lý một message, nó có thể phải được xử lý bởi cha của nó bằng các trả về false hoặc NOT_HANDLE. Nếu một message không được xử lý bởi state con hoặc bất cứ tổ tiên nào của nó, unhandledMessage sẽ được gọi nhằm gửi một cơ hội cuối cùng cho state machine nhằm xử lý message đó.

Khi tất cả quá trình xử lý hoàn tất một state machine có thể lựa chọn nhằm gọi transitionToHaltingState. Khi processingMessage hiện tại được returns, state machine sẽ di chuyển tới một HaltingState cục bộ và vọi halting. Bất cứ message nhận được sau đó bởi sate machine sẽ gây ra việc haltedProcessMassage được gọi.

Nếu nó là mong muốn nhằm dừng lại một cách hoàn toàn state machine gọi quit hoặc quitNow. Điều này sẽ gọi exit của sate hiện tại và các cha của nó, gọi onQuitting và rồi thoát khỏi Thread/Loopers.

Ngoài ra để processMessage, mỗi State có một phương thức enter và một phương thức exit cái có thể được ghi đè.

Do đó các states được sắp xếp trong một kiến trúc chuyển tiếp(h cho một state mới gây ra bởi các states hiện tại để thoát khỏi và đi vào một state mới. Đối với việc xác định danh sách các states được entered/exited khỏi state cha nhằm tìm ra trạng thái hiện tại. Chúng ta rồi sẽ thoát khỏi trạng thái hiện tại và trở về trạng thái cha của nó nhưng không bao gồm trạng thái thông thường của cha và rồi đi vào tất cả các states mới bên dưới trạng thái thông thường của cha đi xuống state đích bên dưới.
Nếu không có trạng thái thông thường của cha, tất cả các states được thoát, và rồi states mới được đi vào.

Hai phương thức khác mà các states có thể sử dụng là deferMessage và sendMessageAtFrontOfQueue. sendMessageAtFrontOfQueue gửi đi một mesage nhưng đặt nó ở đằng trước của của queue thay vì ở đằng sau. deferMessage gây ra bởi message được lưu lại trong một danh sách cho đến khi một transition được tạo ra để tới một state mới.
Tại thời điểm tất cả các deferred messages(các message trì hoãn) sẽ được đẩy vào đằng trước của queue của state machine với message cũ nhất sẽ ở đằng trước. Cái này sẽ được xử lý bởi một state mới hiện tại trước bất cứ messages nào khác cái đang nằm trong queue hoặc có thể được thêm vào sau đó. Cả hai điều này đều được bảo vệ và chỉ có thể được gọi từ state machine.

Để giải thích một vài thuộc tính này, chúng ta sẽ sử dụng state machine với kiến trúc 8 states.

         mP0
         /   \
        mP1   mS0
       /   \
      mS2   mS1
     /  \    \
    mS3  mS4  mS5  ---> initial state

Sau khi start mS5 danh sách các states có hiệu lực sẽ là mP0, mP1, mS1 và mS5. Do đó thứ tự của quá trình gọi processMessage khi một message được nhận là mS5, mS1, mP1, và mP0 quá trình đảm bảo mỗi processMessage chỉ ra nó không thể xử lý message này bằng cách trả về false hoặc NOT_HANDLE.

Bây giờ, để đảm bảo mS5.processMessage nhận được một message nó có thể xử lý được, và trong quá trình xử lý xác định machine nên chuyển đổi các states. Nó có thể gọi transitionTo(mS4) và trả về true hoặc HANDLE.
Ngay sau quá trình trả về từ processMessage thì state machine runtime sẽ tìm tới trạng thái thông thường của cha, cái là mP1. Nó rồi sẽ gọi tới mS5.exit, mS2.exit, và mS2.enter và rồi mS4.enter. Danh sách các states có hiệu lực mới là mP0, mP1, mS2, và mS4. Do đó khi message tiếp theo nhận được là mS4.processMessage sẽ được gọi.

Bây giờ đối với các ví dụ cụ thể, đây là ứng dụng HelloWorld truyền thống như là một State Machine. Nó trả về "Hello World" được in ra log đối với mỗi messages.

```
class HelloWorld extends StateMachine {
    HelloWorld(String name) {
        super(name);
        addState(mState1);
        setInitialState(mState1);
    }
    public static HelloWorld makeHelloWorld() {
        HelloWorld hw = new HelloWorld("hw");
        hw.start();
        return hw;
    }
    class State1 extends State {
        &#64;Override public boolean processMessage(Message message) {
            log("Hello World");
            return HANDLED;
        }
    }
    State1 mState1 = new State1();
}
void testHelloWorld() {
    HelloWorld hw = makeHelloWorld();
    hw.sendMessage(hw.obtainMessage());
}
```

Một sự quan tâm nhiều hơn tới state machine là cái với 4 states với hai states cha độc lập.

        mP1      mP2
       /   \
      mS2   mS1

Đây là mô tả về state machine này sử dụng mã giả:

```
state mP1 {
     enter { log("mP1.enter"); }
     exit { log("mP1.exit");  }
     on msg {
         CMD_2 {
             send(CMD_3);
             defer(msg);
             transitionTo(mS2);
             return HANDLED;
         }
         return NOT_HANDLED;
     }
}
INITIAL
state mS1 parent mP1 {
     enter { log("mS1.enter"); }
     exit  { log("mS1.exit");  }
     on msg {
         CMD_1 {
             transitionTo(mS1);
             return HANDLED;
         }
         return NOT_HANDLED;
     }
}
state mS2 parent mP1 {
     enter { log("mS2.enter"); }
     exit  { log("mS2.exit");  }
     on msg {
         CMD_2 {
             send(CMD_4);
             return HANDLED;
         }
         CMD_3 {
             defer(msg);
             transitionTo(mP2);
             return HANDLED;
         }
         return NOT_HANDLED;
     }
}
state mP2 {
     enter {
         log("mP2.enter");
         send(CMD_5);
     }
     exit { log("mP2.exit"); }
     on msg {
         CMD_3, CMD_4 { return HANDLED; }
         CMD_5 {
             transitionTo(HaltingState);
             return HANDLED;
         }
         return NOT_HANDLED;
     }
}
```

Quá trình triển khai ở bên dưới đồng thời cũng trong StateMachineTest:

```
class Hsm1 extends StateMachine {
    public static final int CMD_1 = 1;
    public static final int CMD_2 = 2;
    public static final int CMD_3 = 3;
    public static final int CMD_4 = 4;
    public static final int CMD_5 = 5;
    public static Hsm1 makeHsm1() {
        log("makeHsm1 E");
        Hsm1 sm = new Hsm1("hsm1");
        sm.start();
        log("makeHsm1 X");
        return sm;
    }
    Hsm1(String name) {
        super(name);
        log("ctor E");
        // Add states, use indentation to show hierarchy
        addState(mP1);
            addState(mS1, mP1);
            addState(mS2, mP1);
        addState(mP2);
        // Set the initial state
        setInitialState(mS1);
        log("ctor X");
    }
    class P1 extends State {
        @Override public void enter() {
            log("mP1.enter");
        }
        @Override public boolean processMessage(Message message) {
            boolean retVal;
            log("mP1.processMessage what=" + message.what);
            switch(message.what) {
            case CMD_2:
                // CMD_2 will arrive in mS2 before CMD_3
                sendMessage(obtainMessage(CMD_3));
                deferMessage(message);
                transitionTo(mS2);
                retVal = HANDLED;
                break;
            default:
                // Any message we don't understand in this state invokes unhandledMessage
                retVal = NOT_HANDLED;
                break;
            }
            return retVal;
        }
        @Override public void exit() {
            log("mP1.exit");
        }
    }
    class S1 extends State {
        @Override public void enter() {
            log("mS1.enter");
        }
        @Override public boolean processMessage(Message message) {
            log("S1.processMessage what=" + message.what);
            if (message.what == CMD_1) {
                // Transition to ourself to show that enter/exit is called
                transitionTo(mS1);
                return HANDLED;
            } else {
                // Let parent process all other messages
                return NOT_HANDLED;
            }
        }
        @Override public void exit() {
            log("mS1.exit");
        }
    }
    class S2 extends State {
        @Override public void enter() {
            log("mS2.enter");
        }
        @Override public boolean processMessage(Message message) {
            boolean retVal;
            log("mS2.processMessage what=" + message.what);
            switch(message.what) {
            case(CMD_2):
                sendMessage(obtainMessage(CMD_4));
                retVal = HANDLED;
                break;
            case(CMD_3):
                deferMessage(message);
                transitionTo(mP2);
                retVal = HANDLED;
                break;
            default:
                retVal = NOT_HANDLED;
                break;
            }
            return retVal;
        }
        @Override public void exit() {
            log("mS2.exit");
        }
    }
    class P2 extends State {
        @Override public void enter() {
            log("mP2.enter");
            sendMessage(obtainMessage(CMD_5));
        }
        @Override public boolean processMessage(Message message) {
            log("P2.processMessage what=" + message.what);
            switch(message.what) {
            case(CMD_3):
                break;
            case(CMD_4):
                break;
            case(CMD_5):
                transitionToHaltingState();
                break;
            }
            return HANDLED;
        }
        @Override public void exit() {
            log("mP2.exit");
        }
    }
    @Override
    void onHalting() {
        log("halting");
        synchronized (this) {
            this.notifyAll();
        }
    }
    P1 mP1 = new P1();
    S1 mS1 = new S1();
    S2 mS2 = new S2();
    P2 mP2 = new P2();
}
```

Nếu điều này được thực thi bằng các gửi đi 2 messages là CMD_1 và CMD_2(Chú ý là việc đồng bộ hóa chỉ cần thiết bởi vì chúng ta sử dụng **hsm.wait()**).

```
Hsm1 hsm = makeHsm1();
synchronize(hsm) {
     hsm.sendMessage(obtainMessage(hsm.CMD_1));
     hsm.sendMessage(obtainMessage(hsm.CMD_2));
     try {
          // wait for the messages to be handled
          hsm.wait();
     } catch (InterruptedException e) {
          loge("exception while waiting " + e.getMessage());
     }
}
```

Và kết quả sẽ như sau:

```
D/hsm1    ( 1999): makeHsm1 E
D/hsm1    ( 1999): ctor E
D/hsm1    ( 1999): ctor X
D/hsm1    ( 1999): mP1.enter
D/hsm1    ( 1999): mS1.enter
D/hsm1    ( 1999): makeHsm1 X
D/hsm1    ( 1999): mS1.processMessage what=1
D/hsm1    ( 1999): mS1.exit
D/hsm1    ( 1999): mS1.enter
D/hsm1    ( 1999): mS1.processMessage what=2
D/hsm1    ( 1999): mP1.processMessage what=2
D/hsm1    ( 1999): mS1.exit
D/hsm1    ( 1999): mS2.enter
D/hsm1    ( 1999): mS2.processMessage what=2
D/hsm1    ( 1999): mS2.processMessage what=3
D/hsm1    ( 1999): mS2.exit
D/hsm1    ( 1999): mP1.exit
D/hsm1    ( 1999): mP2.enter
D/hsm1    ( 1999): mP2.processMessage what=3
D/hsm1    ( 1999): mP2.processMessage what=4
D/hsm1    ( 1999): mP2.processMessage what=5
D/hsm1    ( 1999): mP2.exit
D/hsm1    ( 1999): halting
```

Mã nguồn State Machine trong Android SDK:
https://android.googlesource.com/platform/frameworks/base.git/+/master/core/java/com/android/internal/util/StateMachine.java

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))