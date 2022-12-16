## Giới thiệu.
Là một sinh viên mới học về lập trình, mình rất thích mày mò các cách để có thể tạo sự giao tiếp giữa hai ngôn ngữ khác nhau. Với [bài viết trước](https://viblo.asia/p/swift-cach-su-dung-ham-cc-trong-swift-Az45bQ4OlxY), mình đã viết cách chạy code `C/C++` trong `Swift`. Hôm nay sẽ là ngược lại, chạy code `Swift` bên trong `C/C++`. Bắt đầu thôi.

## Một chương trình đơn giản.

Chắc ai cũng đã từng thấy qua `flag -c` trong `swiftc` dùng để tạo file object. Như thế ta sẽ thử liệu tạo file object có giúp `C` đọc được hàm của `Swift` hay không. Để kiểm tra tính năng này thì ta không nên dùng đến các thư viện hay hàm của `Swift`. Với một hàm cơ bản:
```
// module.swift
func add(a: CInt, b: CInt) -> CInt {
    return a + b
}

// main.c
#include <stdio.h>
int add(int, int);
int main() {
    printf("%d + %d = %d\n", 3, 4, add(3, 4));
    return 0;
}
```
Ta sẽ complie file `module.swift` qua object file và sau đó compile file `main.c`:
```
$ swiftc module.swift -c -o addmodule.o
$ gcc -o main main.c addmodule.o
```
Ta vướng ngay lỗi không tìm thấy `_add` trong object file đó. Vậy ta sẽ phân tích object file đó có gì:
```
$ nm addmodule.o
0000000000000010 T _$s9addmodule3add1a1bs5Int32VAF_AFtF
0000000000000076 S ___swift_reflection_version
0000000000000000 T _main
                 U _memset
0000000000000078 s l_llvm.swift_module_hash
```
Ta thấy có hai hàm toàn cục: `_main` là entry point và `_$s9addmodule3add1a1bs5Int32VAF_AFtF` nhìn khá giống hàm `add` ta đã viết. Trong khi đó hàm `add` trong `C` lại cần tới `_add`. Qua tìm hiểu thì mình biết được có một attribute không chính thức, đó là `@_cdecl` giúp ta xử lý vấn đề này:
```
// module.swift
@_cdecl("add")
func add(a: CInt, b: CInt) -> CInt {
    return a + b
}
```
Sau đó thực hiện compile:
```
$ swiftc module.swift -c -o addmodule.o
$ nm addmodule.o
0000000000000020 T _$s9addmodule3add1a1bs5Int32VAF_AFtF
0000000000000086 S ___swift_reflection_version
0000000000000010 T _add
0000000000000000 T _main
                 U _memset
0000000000000088 s l_llvm.swift_module_hash
```
Và ta thấy nó đã tạo thêm `_add` vào ta ta có thể compile file `main.c` được rồi, nhưng nhớ thay hàm `main` bằng hàm `start` và set entry point là `_start`:
```
// main.c
#include <stdio.h>
int add(int, int);
int start() {
    printf("%d + %d = %d\n", 3, 4, add(3, 4));
    return 0;
}
```
```
$ gcc -o main main.c addmodule.o -e _start
$ ./main
3 + 4 = 7
```
Tuyệt vời, vậy là ta có thể tạo ra một hàm `Swift` đơn giản để có thể sử dụng trong `C` rồi.

## Một chương trình đơn giản nữa.
Ta đã có thể viết một chương trình `C` chạy được một hàm trong `Swift`, nhưng ta lại chưa thử sử dụng các hàm riêng của `Swift`. Ta thử viết một chương trình in ra chữ `Hello world!` bằng hàm `print`:
```
// module.swift
@_cdecl("hello")
func hello() {
    print("Hello world!")
}

// main.c
void hello();
int start() {
    hello();
    return 0;
}
```
Nhưng khi thử theo cách trên thì lại bị lỗi trong quá trình biên dịch. Lý do rất đơn giản, chúng ta chưa định nghĩa kiểu `String` và hàm `print` cho `C`. Vậy ta phải làm thế nào, chẳng lẽ phải kéo `libswiftCore.dylib` vào, cách này quá ngu. Với `C++`, ta có thể wrap code và build thư viện động, vậy tại sao ta không làm thế với `Swift`. May mắn là, `swiftc` có hỗ trợ `flag -emit-library` để giúp ta tạo ra một file thư viện động, thư viện động thì không có `_main` nên ta có thể thay thế hàm `start` thành `main`:
```
// module.swift
@_cdecl("hello")
func hello() {
    print("Hello world!")
}

// main.c
void hello();
int main() {
    hello();
    return 0;
}
```
```
$ swiftc -o hellomodule.dylib -emit-library module.swift
$ gcc -o main main.c hellomodule.dylib
```
Và ta ăn ngay lỗi không tìm thấy hàm `_hello`, vậy ta cũng sẽ phân tích `hellomodule.dylib`:
```
$ nm hellomodule.so
0000000000000e70 t _$s11hellomodule5helloyyF
                 U _$sSS21_builtinStringLiteral17utf8CodeUnitCount7isASCIISSBp_BwBi1_tcfC
                 U _$sSSN
                 U _$ss27_allocateUninitializedArrayySayxG_BptBwlFyp_Tg5
                 U _$ss5print_9separator10terminatoryypd_S2StF
0000000000000f10 t _$ss5print_9separator10terminatoryypd_S2StFfA0_
0000000000000f30 t _$ss5print_9separator10terminatoryypd_S2StFfA1_
0000000000000fb2 s ___swift_reflection_version
0000000000000e60 t _hello
                 U _swift_bridgeObjectRelease
                 U dyld_stub_binder
```
Ta thấy có hàm `_hello`, tuy nhiên `t` trước mặt `_hello` nói rằng `_hello` là hàm `local` trong file thư viện động này, do đó, ta phải chuyển nó về `public`:
```
@_cdecl("hello")
public func hello() {
    print("Hello world!")
}
```
Và thử compile lại:
```
$ swiftc -o hellomodule.dylib -emit-library module.swift
$ gcc -o main main.c hellomodule.dylib
$ ./main
Hello world!
```

## Một chương trình khó hơn.

Thật tuyệt vời! Ta thử làm thứ gì đó khó hơn chút, ví dụ một chương trình vẽ đồ thị đơn giản chẳng hạn. 
Ta sẽ cùng `Cocoa` để viết giao diện và thử tạo một `API` để `C` có thể sử dụng. Đầu tiên ta phải tạo một `Delegate`:
```
class AppDelegate: NSObject, NSApplicationDelegate {
    let mainWindow: NSWindow? = NSWindow(contentRect: NSRect(x: 500, y: 300, width: 700, height: 500), styleMask: [.titled, .closable, .miniaturizable], backing: .buffered, defer: false)
    var mainController: NSWindowController?
    
    func applicationDidFinishLaunching(_ notification: Notification) {
        mainWindow?.backgroundColor = .white
        mainWindow?.orderFrontRegardless()
        
        mainController = NSWindowController(window: mainWindow)
        mainController?.showWindow(mainWindow)
    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
}
```
Sau đó ta sẽ viết một `API` giúp `C` có thể chạy các code này:
```
// module.swift
class AppDelegate: NSObject, NSApplicationDelegate {
    ...
}

let delegate = AppDelegate()

@_cdecl("run")
public func run() {
    let app = NSApplication.shared
    app.delegate = delegate
    app.activate(ignoringOtherApps: false)
    app.setActivationPolicy(.regular)
    app.run()
}

// main.c
void run();
int main() {
    run();
    return 0;
}
```
Sau đó ta thử build và chạy thử, ta có kết quả sau:

![](https://images.viblo.asia/82e73615-070a-4f42-849f-724a75aba538.png)

Tuyệt vời! Ta sẽ thêm một `view` sử dụng `NSBezierPath` vào `delegate` để có thể vẽ đồ thị:
```
import Cocoa

class DrawView: NSView {
    var graphSet: [([NSPoint], NSColor, CGFloat)] = []
    var maxX: CGFloat? = nil
    var maxY: CGFloat? = nil
    var minX: CGFloat? = nil
    var minY: CGFloat? = nil
    
    func addPointSet(_ xSet: [CGFloat], _ ySet: [CGFloat], color: NSColor, size: CGFloat) {
        assert(xSet.count == ySet.count)
        var temp: [NSPoint] = []
        for i in 0..<xSet.count {
            if maxX == nil || maxX! < xSet[i] {
                maxX = xSet[i]
            }
            if maxY == nil || maxY! < ySet[i] {
                maxY = ySet[i]
            }
            if minX == nil || minX! > xSet[i] {
                minX = xSet[i]
            }
            if minY == nil || minY! > ySet[i] {
                minY = ySet[i]
            }
            temp.append(NSPoint(x: xSet[i], y: ySet[i]))
        }
        graphSet.append((temp, color, size))
    }
    
    override func draw(_ dirtyRect: NSRect) {
        super.draw(dirtyRect)
        
        if maxX != nil && maxY != nil && minX != nil && minY != nil {
            if maxX! != minX! && maxY! != minY! {
                let xCoff = self.bounds.size.width/(maxX! - minX!)
                let yCoff = self.bounds.size.height/(maxY! - minY!)
                for e in graphSet {
                    let points = e.0
                    let pathColor = e.1
                    let lineSize = e.2
                    
                    let path = NSBezierPath()
                    path.lineWidth = lineSize
                    path.lineCapStyle = .round
                    path.lineJoinStyle = .round
                    pathColor.set()
                    
                    path.move(to: NSPoint(x: (points[0].x - minX!)*xCoff, y: (points[0].y - minY!)*yCoff))
                    
                    for point in points {
                        let x = (point.x - minX!)*xCoff
                        let y = (point.y - minY!)*yCoff
                        path.line(to: NSPoint(x: x, y: y))
                    }
                    path.stroke()
                }
            }
        }
    }
}

class AppDelegate: NSObject, NSApplicationDelegate {
    let mainWindow: NSWindow? = NSWindow(contentRect: NSRect(x: 500, y: 300, width: 700, height: 500), styleMask: [.titled, .closable, .miniaturizable], backing: .buffered, defer: false)
    var mainController: NSWindowController?
    let frameView = DrawView(frame: NSRect(x: 70, y: 50, width: 560, height: 400))
    
    func addPointSet(_ xSet: [CGFloat], _ ySet: [CGFloat], color: NSColor, size: CGFloat) {
        frameView.addPointSet(xSet, ySet, color: color, size: size)
    }
    
    func applicationDidFinishLaunching(_ notification: Notification) {
        mainWindow?.backgroundColor = .white
        mainWindow?.orderFrontRegardless()
        mainWindow?.contentView?.addSubview(frameView)
        
        mainController = NSWindowController(window: mainWindow)
        mainController?.showWindow(mainWindow)
    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
}

let delegate = AppDelegate()

@_cdecl("run")
public func run() {
    let app = NSApplication.shared
    app.delegate = delegate
    app.activate(ignoringOtherApps: false)
    app.setActivationPolicy(.regular)
    app.run()
}

@_cdecl("add")
public func add(xSet: UnsafeMutablePointer<Double>, ySet: UnsafeMutablePointer<Double>, n: CInt, red: Double, green: Double, blue: Double, lineWidth: Double) {
    var xs: [CGFloat] = []
    var ys: [CGFloat] = []
    for i in 0..<Int(n) {
        xs.append(CGFloat(xSet[i]))
        ys.append(CGFloat(ySet[i]))
    }
    
    let color = NSColor(red: CGFloat(red), green: CGFloat(green), blue: CGFloat(blue), alpha: 1)
    
    let size = CGFloat(lineWidth)
    
    delegate.addPointSet(xs, ys, color: color, size: size)
}
```
Và file `main.c`:
```
#include <math.h>
void run();
void add(double*, double*, int, double, double, double, double);
int main() {
    double x[50], y[50];
    for (int i = 0; i < 50; i++) {
        x[i] = i*5/49.0;
        y[i] = exp(x[i]);
    }
    add(x, y, 50, 0, 0, 0, 1.5);
    for (int i = 0; i < 50; i++)
        y[i] = 2*x[i]*x[i] + 50;
    add(x, y, 50, 0, 1, 0, 1.5);
    for (int i = 0; i < 50; i++)
        y[i] = 100 - 10*x[i];
    add(x, y, 50, 1, 0, 0, 1.5);
    run();
    return 0;
}
```
Ta thu được kết quả:

![](https://images.viblo.asia/d05809ea-c819-4d4b-b63c-027b69e0f99e.png)

## Kết luận.
Kết hợp cùng [bài viết trước](https://viblo.asia/p/swift-cach-su-dung-ham-cc-trong-swift-Az45bQ4OlxY), ta thấy rằng, ở thời điểm hiện tại, việc giao tiếp giữa `C/C++` với `Swift` là tương đối tốt. Do đó, chúng ta có thể linh hoạt sử dụng `C/C++` hay `Swift` tùy trường hợp để phát huy điểm mạnh của từng ngôn ngữ. Ví dụ, viết giao diện dùng các thư viện `C/C++` thật sự phải gọi là đau đớn, nhưng về các cấu trúc dữ liệu, tính toán toán học thì `C/C++` rất nhiều thư viện linh hoạt. Trong khi đó, `Cocoa` thật sự khiến lập trình viên thoải mái khi viết ra các giao diện, tuy nhiên các thư viện tính toán toán học của `Swift` rất hạn chế. Thay vào đó ta sử dụng `C/C++` trong tính toán toán học và sử dụng `Swift` để viết nên phần giao diện.

Bài viết có thể chưa hoàn thiện và không thể tránh sai sót, nhưng mong  rằng bài viết nhỏ này giúp các bạn được ít nhiều.