### Goroutine 
Một trong những điểm nổi bật của Golang là goroutine, nó có gì nổi bật để khiến cho cocurrency trong Go trở nên dễ dàng như vậy
### Cấu trúc:
- Một goroutine được khởi tạo với chỉ 2KB trong stack size
- Goroutines chứa trong ít stack size nhưng có thể tự grow khi cần, thông thường sẽ có hàng trăm nghìn goroutines bên trong chương trình của bạn. Điều này cho phép lập trình viên use **concurrency structure** bên trong chương trình mà không cần quan tâm có bị overhead hay không.
- Goroutines chính là **function executing concurrently** cùng lúc với các goroutines khác trên cùng địa chỉ space
- Cấu trúc code:
```
struct P
{
    Lock;
    G *gfree; // freelist, moved from sched
    G *ghead; // runnable, moved from sched
    G *gtail;
    MCache *mcache; // moved from M
    FixAlloc *stackalloc; // moved from M
    uint64 ncgocall;
    GCStats gcstats;
    // etc
    ...
};

P *allp; // [GOMAXPROCS]

type schedt struct {
	glock mutex
	gfree *g
     Ngfree int32
}

```

![](https://images.viblo.asia/e5451107-5bae-4615-bd52-bd6f9519383f.png)

### Go scheduler.
Go Scheduler có 3 thành phần chính: 
![](https://images.viblo.asia/fc3ae532-29c9-425f-b5a1-a7ccd914a3ca.jpg)
- Hình tam giác đại diện cho OS thread, thread là luồng thực thi được quản lí bởi OS.
- Hình tròn đại diện cho goroutine, nó bao gồm stack, pointer, và các thông tin quan trọng cho việc quản lí scheduling goroutines.
- Hình chữ nhật đại diện cho context của scheduling. Nó được coi như phiên bản single thread trong golang.

![](https://images.viblo.asia/821ee030-f98c-4c99-b04a-9711219cd829.jpg)

- Như các bạn thấy có 2 loại queue trong golang là global queue và local queue, và mỗi P duy trì một chuỗi G đang chạy.
- Để thực thi được goroutine, M cần được trong context của P. Machine, sau đó sẽ pop goroutine ra khỏi queue P và thực thi code.
- Khi chúng ta tạo thực thi cuộc gọi: `go func()`, thì nó sẽ được đặt vào trong P queue. Và đây là mấu chốt trong thuật toán đánh cắp công việc (work-stealing scheduling algorithm), cái mà sẽ chạy khi M kết thúc thực thi một số G và thử một số G khác bên ngoài queue hiện tại, nếu queue hiện tại mà rỗng, nó sẽ random chọn P(gọi là P1) khác và thử đánh cắp một nửa số goroutine G khỏi queue P1.

![](https://images.viblo.asia/a69196fa-5240-405c-be35-c6f5d6e83efc.jpg)

![](https://images.viblo.asia/5a52dd2d-67c6-41c9-8a61-f4565043ae96.png)

### Tại sao chúng ta lại cần context P.
- Lí do cho việc có context P là để đánh cắp số lượng Goroutine G từ một threads khác nếu thread đang chạy bị block vì một lí do nào đó. 
- Ví dụ chúng ta cần block thread vì cần chờ người dùng nhập input (syscall) hay connect với DB chẳng hạn. Một thread không thể vừa bị block vừa thực thi code được, nên chúng ta cần khái niệm context để giữ việc scheduling.

![](https://images.viblo.asia/1f9da227-700e-4029-aab0-762d5e8755f3.jpg)

Source: https://phanngoc123.blogspot.com/2018/12/oi-net-ve-goroutine.html