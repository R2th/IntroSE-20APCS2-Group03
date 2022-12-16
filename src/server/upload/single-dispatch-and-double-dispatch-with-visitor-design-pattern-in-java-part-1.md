### What is Single Dispatch
Mọi người hãy cũng nghía qua ví dụ sau 

Giả sử mình có một số đối tượng

```
public class Girl {
}

public class HotGirl extends Girl {
}

public class Men {
    public void kiss(HotGirl hotGirl) {
        System.out.println("a Men kissed a Hot girl");
    }

    public void kiss(Girl girl) {
        System.out.println("a Men kissed a Girl");
    }
}

public class LadyKiller extends Men {
    @Override
    public void kiss(HotGirl hotGirl) {
        System.out.println("a LadyKiller kissed a Hot girl");
    }
    @Override
    public void kiss(Girl girl) {
        System.out.println("a LadyKiller kissed a Girl");
    }
}
```

thực thi một demo sau:

```
public static void main(final String[] args) {
        Girl hotGirl = new HotGirl();
        Men ladyKiller = new LadyKiller();
        ladyKiller.kiss(hotGirl);
    }
```

Theo mọi người thì kết quả sau khi chạy hàm main là gì?  quá đơn giản, nhiều bạn sẽ trả lời ngay, `ladyKiller` chắc chắn sẽ `kiss hotGirl` rồi đúng không ?

Trật lất, thật ra kết quả sau khi run main sẽ là 

```
a LadyKiller kissed a Girl

Process finished with exit code 0
```

Lý do là Java chỉ hỗ trợ `single dispatch`, vậy `single dispatch` là gì, có rất nhiều định nghĩa được đưa ra (và rất khó hiểu), mình đã tìm hiểu rất nhiều và đúc kết được một định nghĩa sau về `single patch`

> the operation that is executed depends on: the name of the request, and the type of the receiver - nôm na là một phương thức được gọi sẽ dựa trên 2 yếu tố, tên của phương thức và kiểu đối tượng gọi nó

như ví dụ ở trên, phương thức `kiss` của đối tượng `ladyKiller` đã được gọi, tuy nhiên bước gọi hàm này được thực thi ở lúc biên dịch nên kết quả sẽ là `kiss(girl)` sẽ được gọi.

So, vậy làm sao để gọi để `ladyKiller` có thể `kiss` được `hotGirl`, cùng tìm hiểu về `double dispatch` nhé

### What is Double Dispatch
>  the operation executed depends on: the name of the request, and the type of TWO receivers (the type of the Visitor and the type of the element it visits) - nôm na là một phương thức sẽ được gọi dựa trên 2 yếu tố, tên của phương thức và kiểu của cả đổi tượng gọi và kiểu của đối số truyền vào.

Như vậy, nếu áp dụng `double dispatch`, chúng ta có thể giải quyết được bài toán phía trên, vậy áp dụng  `double dispatch` như thế nào, mình xin giới thiệu một design pattern rất thú vị:   **Visitor Design pattern**, qua [bài viết](https://viblo.asia/p/single-dispatch-and-double-dispatch-with-visitor-design-pattern-in-java-part-2-gAm5ypyLldb)


### Conclusion 
Hy vọng bài viết này sẽ giúp mọi người clear hơn về khái niệm `single dispatch` và `double dispatch`, have fun !