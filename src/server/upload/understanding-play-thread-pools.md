Chúng ta đều biết Play framework là một asynchronous web framework. Trong bài viết này mình sẽ trình bày thêm 1 số điểm về nó.
Thread pools trong Play được điều chỉnh để ít sử dụng hơn so với web frameworks khác và nó được sử dụng cho một số mục đích khác nhau, cụ thể:
* **Internal thread pools**: nó được xử dụng bên trong của server engine giành cho việc xử lý IO. Code của một ứng dụng không bao giờ phải thực thị bởi 1 thread trong Threadpool đó. Play thiết lập cấu hình trong Akka HTTP server một cách mặc định. Nhưng ta có thể thay đổi cấu hình bằng cách thay đổi tham số trong file application.conf. Cách này có thể áp dụng tương tự cho Netty server.
* **Play default thread pool** : đây là thread pool được sử dụng cho toàn bộ code trong ứng dụng của bạn thực thị. Nó là một Akka dispatcher và được sử dụng bởi ứng dụng ActorSystem. Nó được cấu hình bởi cấu hình Akka.
**1. Cách sử dụng Thread pool mặc định.**
Mọi hoạt động trong Play Framework sử dụng thread pool mặc định. Khi thực hiện các công việc không đồng bộ (asynchronous), ví dụ gọi hàm map hoặc flatMap bạn cần phải cung cấp một implicit execution context để thực hiện function đó. Một execution context về cơ bản là tên khác của một thread pool. Trong hầu hết các tình huống thì execution context thích hợp là default Threadpool. Ví dụ trong Java code:

```
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.*;

import javax.inject.Inject;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class MyController extends Controller {

    private HttpExecutionContext httpExecutionContext;

    @Inject
    public MyController(HttpExecutionContext ec) {
        this.httpExecutionContext = ec;
    }

    public CompletionStage<Result> index() {
        // Use a different task with explicit EC
        return calculateResponse().thenApplyAsync(answer -> {
            // uses Http.Context
            ctx().flash().put("info", "Response updated!");
            return ok("answer was " + answer);
        }, httpExecutionContext.current());
    }

    private static CompletionStage<String> calculateResponse() {
        return CompletableFuture.completedFuture("42");
    }
}
```
Execution context này sẽ kết nối trực tiếp tới ActorSystem của ứng dụng và sử dụng dispatcher mặc định.

2. Cách cấu hình Thread pool mặc định.
Mặc định Thread pool có thể được cấu hình bằng việc sử dụng cấu hình chung của Akka server trong file application.conf, sử dụng akka namespace. Ví dụ:

```
akka {
  actor {
    default-dispatcher {
      fork-join-executor {
        # Settings this to 1 instead of 3 seems to improve performance.
        parallelism-factor = 1.0

        # @richdougherty: Not sure why this is set below the Akka
        # default.
        parallelism-max = 24

        # Setting this to LIFO changes the fork-join-executor
        # to use a stack discipline for task scheduling. This usually
        # improves throughput at the cost of possibly increasing
        # latency and risking task starvation (which should be rare).
        task-peeking-mode = LIFO
      }
    }
  }
}
```
Cấu hình này cho Akka biết cần tạo 1 thread/CPU processor và có tối đa là 24 thread trong pool.
Muốn xem toàn bộ cấu hình của Akka bạn có thể tham khảo thêm theo link:
https://doc.akka.io/docs/akka/2.5.3/java/general/configuration.html#listing-of-the-reference-configuration

**3. Sử dụng Thread pool khác.**
Nếu không muốn sử dụng thread pool mặc định, bạn có thể thiết lập 1 thread pool khác cho riêng ứng dụng của mình. Trong trường hợp này bạn sử dụng Akka để sử dụng ExecutionContext nhưng bạn cũng dễ dàng tạo ra ExecutionContext của riêng bạn sử dụng Java executor hay Scala fork join thread pool.
Để cấu hình Akka execution context bạn có thể sửa file application.conf theo hướng dẫn sau:

```
my-context {
  fork-join-executor {
    parallelism-factor = 20.0
    parallelism-max = 200
  }
}
```

Để biết thêm chi tiết ban có thể tham khảo thêm tại https://playframework.com/download#examples