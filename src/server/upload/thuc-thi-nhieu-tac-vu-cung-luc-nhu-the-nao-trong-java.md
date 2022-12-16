Trong bài viết về [CompletableFuture](https://gpcoder.com/4064-lap-trinh-da-luong-voi-completablefuture-trong-java-8/), chúng ta đã tìm hiểu về cách sử dụng [multi-thread](https://gpcoder.com/category/java-core/multi-thread/) trong [Java 8](https://gpcoder.com/category/java-core/java-8/). Trong bài này, chúng ta sẽ cùng xem cách sử dụng CompletableFuture trong một bài toán thực tế.

Giả sử chúng ta có một ứng dụng cần thực hiện 2 công việc, tạm gọi là work1 và work2. Có hàng nghìn hàng triệu công việc work1 và khi mỗi công việc work1 hoàn thành sẽ có một danh sách các công việc work2 cần thực hiện. Để tiết kiệm được thời gian, chúng ta sẽ sử dụng Multi-Thread để thực thi công việc work1, khi mỗi công việc work1 hoàn thành, chúng ta cũng sẽ sử dụng Multi-Thread để xử lý kết quả nhận được từ công việc work1 (thực thi công việc work2).

![](https://images.viblo.asia/5fa8b242-11b3-4579-94d4-66e4039a17b1.png)

Chương trình của chúng ta như sau:

```
package com.gpcoder.completable_future;
 
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
 
/**
 * All level is running with multi-thread
 */
public class ConcurrencyWithCompletableFuture3 {
 
    public static void main(String[] args) {
        List<String> works = new ArrayList<>();
        works.add("A");
        works.add("B");
        works.add("C");
        works.add("D");
        works.add("E");
        runMultipleAsync(works);
    }
 
    private static void runMultipleAsync(List<String> works) {
        List<CompletableFuture<List<Void>>> allOfWork1Futures = new ArrayList<>();
        works.stream().forEach(work -> {
            allOfWork1Futures.add(createWork1(work).thenCompose(work1Results -> {
                List<CompletionStage<Void>> allOfWork2Futures = work1Results.stream()
                        .map(work1Result -> createWork2(work1Result)).collect(Collectors.toList());
                CompletableFuture<Void> done = CompletableFuture
                        .allOf(allOfWork2Futures.toArray(new CompletableFuture[allOfWork2Futures.size()]));
                return done.thenApplyAsync(v -> allOfWork2Futures.stream().map(CompletionStage::toCompletableFuture)
                        .map(CompletableFuture::join) // Returns the result value when complete
                        .collect(Collectors.toList()));
            }).whenCompleteAsync((result, th) -> {
                // Do something when complete
            }).toCompletableFuture());
        });
        CompletableFuture<Void> done = CompletableFuture
                .allOf(allOfWork1Futures.toArray(new CompletableFuture[allOfWork1Futures.size()]))
                .whenComplete((result, th) -> {
                    // Do something when complete
                });
        done.join(); // Returns the result value when complete
    }
 
    private static CompletionStage<List<String>> createWork1(String str) {
        return CompletableFuture.completedFuture(str).thenApplyAsync(s -> executeWork1(s));
    }
 
    private static CompletionStage<Void> createWork2(String str) {
        return CompletableFuture.completedFuture(str).thenAcceptAsync(s -> executeWork2(s));
    }
 
    private static List<String> executeWork1(String _item) {
        waitingForComplete();
        System.out.println("Work" + _item + " -> work1");
        return Arrays.asList(_item + "_item" + 1, _item + "_item" + 2);
    }
 
    private static void executeWork2(String data) {
        waitingForComplete();
        System.out.println("Work" + data + " -> work2");
    }
 
    private static void waitingForComplete() {
        try {
            TimeUnit.SECONDS.sleep(random(0, 3));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
 
    private static int random(int min, int max) {
        Random r = new Random();
        return r.nextInt((max - min) + 1) + min;
    }
}
```

Output của chương trình:

```
WorkB -> work1
WorkC -> work1
WorkB_item1 -> work2
WorkA -> work1
WorkB_item2 -> work2
WorkC_item1 -> work2
WorkD -> work1
WorkE -> work1
WorkA_item1 -> work2
WorkC_item2 -> work2
WorkD_item1 -> work2
WorkD_item2 -> work2
WorkE_item2 -> work2
WorkA_item2 -> work2
WorkE_item1 -> work2
```
Link bài viết gốc: https://gpcoder.com/5100-thuc-thi-nhieu-tac-vu-cung-luc-nhu-the-nao-trong-java/