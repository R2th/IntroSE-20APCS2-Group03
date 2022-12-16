ArrayList là một loại list khá là thông dụng và thường được nghĩ tới đầu tiên khi cần lưu trữ dữ liệu dạng List mà không có yêu cầu gì đặc biệt. Tuy nhiên nó có thể sử dụng tốt trong môi trường multi-thread không ?

Xem xét đoạn code dưới đây
```
ArrayList<Integer> arrayList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
				for (int j = 0; j < 10000; j++) {
					arrayList.add(j);
				}
			}).start();
        }
```
Kết quả mong đợi là arrayList sau khi chạy xong sẽ có size = 50000.

**Kết quả:** Nếu may mắn không crash, có thể sẽ nhận được kết quả:

`list size : 48490`

không thì sẽ gặp Exception này:
```
Exception in thread "Thread-1" java.lang.ArrayIndexOutOfBoundsException: 33
	at java.util.ArrayList.add(ArrayList.java:459)
```
-> ArrayList không thread-safe.

Có thể giải quyết vấn đề bằng cách sử dụng synchronized hoặc dùng Collections.synchronizedList() hoặc dùng Vector, chẳng hạn : 
```
    ArrayList<Integer> arrayList = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			new Thread(() -> {
				for (int j = 0; j < 10000; j++) {
					synchronized (arrayList) {
						arrayList.add(j);
					}
				}
			}).start();
		}
```

```
    ArrayList<Integer> arrayList = new ArrayList<>();
	List<Integer> syncList = Collections.synchronizedList(arrayList);
		for (int i = 0; i < 5; i++) {
			new Thread(() -> {
				for (int j = 0; j < 10000; j++) {
					syncList.add(j);
				}
			}).start();
		}
```

```
    Vector<Integer> vector = new Vector<>();
		for (int i = 0; i < 5; i++) {
			new Thread(() -> {
				for (int j = 0; j < 10000; j++) {
					vector.add(j);
				}
			}).start();
		}
```
Kết quả : `list size : 50000`
### Thanks for reading!