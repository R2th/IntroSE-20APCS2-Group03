HashMap là một cấu trúc dữ liệu rất mạnh mẽ trong Java. Chúng ta sử dụng nó hàng ngày và gần như trong tất cả các ứng dụng. HashMap là một lớp không đồng bộ trong Java collection.

Vậy bạn đã từng tự hỏi những câu sau đây chưa?
* Sự khác biệt giữa ConcurrentHashMap và Collections.synchronizedMap(Map) là gì?
* Sự khác biệt giữa ConcurrentHashMap và Collections.synchronizedMap(Map) về hiệu suất như thế nào?
* ConcurrentHashMap vs Collections.synchronizedMap()?

Trong bài viết này, chúng ta sẽ lần lượt làm rõ tại sao và làm thế nào để có thể đồng bộ hóa HashMap.

## 1. Tại sao?

Map object là một container chứa các phần tử, các phần tử đó được tạo thành bởi sự kết hợp của khóa xác định duy nhất và giá trị được ánh xạ.
Nếu bạn có ứng dụng mang tính đồng thời cao, bạn có thể muốn sửa đổi hoặc đọc giá trị khóa trong các luồng(threads) khác nhau thì đó là lúc lý tưởng để sử dụng Concurrent Hashmap. Ví dụ như bạn muốn cache dữ liệu, nhiều luồng(threads) có thể đọc dữ liệu cache đồng thời...
Vậy thì thread-safe Map có nghĩa là gì? Nếu nhiều luồng(threads) có thể truy cập một HashMap đồng thời, và ít nhất 1 luồng sửa đổi cấu trúc của Map thì nó phải đồng bộ bên ngoài để tránh việc dữ liệu không nhất quán.

## 2. Làm thế nào?

Có 2 cách để chúng ta có thể đồng bộ hóa một HashMap
* Java Collections synchronizedMap()
* Sử dụng ConcurrentHashMap

```

//Hashtable
Map<String, String> normalMap = new Hashtable<String, String>();
 
//synchronizedMap
synchronizedHashMap = Collections.synchronizedMap(new HashMap<String, String>());
 
//ConcurrentHashMap
concurrentHashMap = new ConcurrentHashMap<String, String>();
```

## 3. ConcurrentHashMap

* Bạn nên sử dụng ConcurrentHashMap khi bạn cần tính đồng bộ trong dự án của bạn.
* Thread safe mà không cần đồng bộ hóa toàn bộ map.
* Đọc có thể xảy ra rất nhanh trong khi ghi được thực hiện với một khóa.
* Không có khóa ở cấp độ object.
* ConcurrentHashMap không ném ra một ConcurrentModificationException nếu một luồng cố gắng sửa đổi nó trong khi một luồng khác đang lặp qua nó.
* ConcurrentHashMap sử dụng vô số khóa.

## 4. SynchronizedHashMap

* Đồng bộ hóa ở mức độ Object.
* Mọi hoạt động đọc / ghi cần phải có khóa.
* Khóa toàn bộ thực thể collection là vấn đề đau đầu về hiệu suất.
* Về cơ bản, điều này cho phép chỉ một luồng truy cập toàn bộ map và chặn tất cả các luồng khác.
* Nó có thể gây ra việc tranh chấp tài nguyên.
* SynchronizedHashMap trả về Iterator, nó có thể thất bại trong việc sửa đổi đồng thời.

## 5. Ví dụ

* Tạo class ConcurrentHashMapVsSynchronizedHashMap.java
* Tạo object HashTable, SynchronizedMap và ConcurrentHashMap
* Thêm mới và truy xuất 1 triệu entries với Map
* Đo lường thời gian bắt đầu và kết thúc => milliseconds
* Sử dụng ExecutorService để chạy 10 luồng(threads) song song

```
package sync.map.test;

import java.util.Collections;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ConcurrentHashMapVsSynchronizedMap {

	public final static int THREAD_POOL_SIZE = 10;

	public static Map<String, Integer> hashTable = null;
	public static Map<String, Integer> synchronizedMap = null;
	public static Map<String, Integer> concurrentHashMap = null;

	public static void main(String[] args) throws InterruptedException {

		// Test with Hashtable Object
		hashTable = new Hashtable<String, Integer>();
		performTest(hashTable);

		// Test with synchronizedMap Object
		synchronizedMap = Collections.synchronizedMap(new HashMap<String, Integer>());
		performTest(synchronizedMap);

		// Test with ConcurrentHashMap Object
		concurrentHashMap = new ConcurrentHashMap<String, Integer>();
		performTest(concurrentHashMap);

	}

	public static void performTest(final Map<String, Integer> testMap) throws InterruptedException {

		System.out.println("Test started for: " + testMap.getClass());
		long averageTime = 0;
		for (int i = 0; i < 10; i++) {

			long startTime = System.nanoTime();
			ExecutorService executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);

			for (int j = 0; j < THREAD_POOL_SIZE; j++) {
				executorService.execute(new Runnable() {
					@SuppressWarnings("unused")
					@Override
					public void run() {

						for (int i = 0; i < 1000000; i++) {
							Integer randomNumber = (int) Math.ceil(Math.random() * 100000);

							// Retrieve value. Only for test
							Integer value = testMap.get(String.valueOf(randomNumber));

							// Put value
							testMap.put(String.valueOf(randomNumber), randomNumber);
						}
					}
				});
			}

			executorService.shutdown();
			executorService.awaitTermination(Long.MAX_VALUE, TimeUnit.DAYS);

			long endTime = System.nanoTime();
			long totalTime = (endTime - startTime) / 1000000L;
			averageTime += totalTime;
			System.out.println("1M entried added/retrieved in " + totalTime + " ms");
		}
		System.out.println("For " + testMap.getClass() + " the average time is " + averageTime / 10 + " ms\n");
	}
}
```

> Đây là kết quả trung bình(10 lần) sau khi đọc ghi 1 triệu entries đối với từng loại Map
> 
> Test started for: class java.util.Hashtable
> 
> 1M entried added/retrieved in 4765 ms
> 
> 1M entried added/retrieved in 4463 ms
> 
> 1M entried added/retrieved in 4420 ms
> 
> 1M entried added/retrieved in 4422 ms
> 
> 1M entried added/retrieved in 4369 ms
> 
> 1M entried added/retrieved in 4249 ms
> 
> 1M entried added/retrieved in 4446 ms
> 
> 1M entried added/retrieved in 4443 ms
> 
> 1M entried added/retrieved in 4462 ms
> 
> 1M entried added/retrieved in 4319 ms
> 
> For class java.util.Hashtable the average time is 4435 ms
> 
> 
> 
> Test started for: class java.util.Collections$SynchronizedMap
> 
> 1M entried added/retrieved in 4672 ms
> 
> 1M entried added/retrieved in 4547 ms
> 
> 1M entried added/retrieved in 4541 ms
> 
> 1M entried added/retrieved in 4561 ms
> 
> 1M entried added/retrieved in 4338 ms
> 
> 1M entried added/retrieved in 4536 ms
> 
> 1M entried added/retrieved in 4543 ms
> 
> 1M entried added/retrieved in 4485 ms
> 
> 1M entried added/retrieved in 4562 ms
> 
> 1M entried added/retrieved in 4533 ms
> 
> For class java.util.Collections$SynchronizedMap the average time is 4531 ms
> 
> 
> 
> Test started for: class java.util.concurrent.ConcurrentHashMap
> 
> 1M entried added/retrieved in 1936 ms
> 
> 1M entried added/retrieved in 1369 ms
> 
> 1M entried added/retrieved in 1341 ms
> 
> 1M entried added/retrieved in 1337 ms
> 
> 1M entried added/retrieved in 1359 ms
> 
> 1M entried added/retrieved in 1359 ms
> 
> 1M entried added/retrieved in 1338 ms
> 
> 1M entried added/retrieved in 1328 ms
> 
> 1M entried added/retrieved in 1350 ms
> 
> 1M entried added/retrieved in 1344 ms
> 
> For class java.util.concurrent.ConcurrentHashMap the average time is 1406 ms