## Nội dung:
   Khi mình bắt đầu dùng dùng ứng dụng quản lý công việc như trello, asana mình cảm thấy khá hứng thú khi thấy việc kéo thả giữa các task để chuyển trạng thái công việc, cũng như việc sắp xếp lại các task từ 1 list các tasks khi mà nó bị kéo đi mất. Chính vì lý do đó nên hôm nay mình muốn thử làm việc này với reactjs và build nó mà không cần thư việc hỗ trợ gì. Tất nhiên để rút ngắn thời gian làm dự án, bạn có thể dùng thư viện để làm, và react-beautiful-dnd hỗ trợ cho việc drag and drop này rất tốt. Nó có cả các animation để sao cho mượt mà nhất có thể. Nhưng để hiểu hơn về cách nó hoạt động như thế nào thì mình muốn tự tay xây dựng từ đầu 1 cách đơn giản nhất. Let's go T_T !

## Ví dụ:
Để tránh mất nhiều thời gian quý báu, cũng như việc có thể các bạn bị nhầm lẫn trong khi code, mình dùng https://codesandbox.io/ để tạo dự án và code để các bạn tiện theo dõi.

Mình tạo luôn component **Test** là nơi mình code *drag and drop* function. bên cạnh đó, mình cũng thêm 1 số common class trong file **styles.css** để tiện cho việc style.
```
.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.justify-content-center {
  justify-content: center;
}

.justify-content-between {
  justify-content: space-between;
}

.w-30 {
  width: 30%;
}

```

Trong file **Test.js** mình khỏi tạo 1 object **initialTasks** chứa các cặp key-value tương ứng với key là id của task và value là 1 object chứa thông tin về các task:
```
const initialTasks = {
  task_1: {
    name: "task-1",
    description: "this is task-1",
    type: "start",
    bgcolor: "yellow"
  },
  task_2: {
    id: "task_2",
    name: "task-2",
    description: "this is task-2",
    type: "start",
    bgcolor: "yellow"
  },
  task_3: {
    id: "task_3",
    name: "task-3",
    description: "this is task-3",
    type: "complete",
    bgcolor: "orange"
  }
};
```

Sau đó mình lưu nó vào trong state:
```
state = {
    taskList: { ...initialTasks }
  };
```

Ở hàm render(), từ initialTasks state ban đầu, mình tạo 1 biến tasks lưu các task element được chia ra tương ứng thành 2 loại là start và complete.

2 loại này tương ứng được render thành 2 cột ở hàm **return** thuộc **render()**. Lưu ý là với mỗi** element task** được render thì mình sẽ phải thêm cho nó thuộc tính html5 **draggable** để cho phép mình kéo thả element đó, đồng thời là thêm 1 event **onDragStart** với tham số là **id** của task để lưu nó vào object **dataTransfer**.
```
const { taskList } = this.state;
    const tasks = {
      start: [],
      complete: []
    };
    Object.keys(taskList).forEach((key) => {
      const task = taskList[key];
      tasks[task.type].push(
        <div
          key={task.name}
          onDragStart={(e) => this.onDragStart(e, key)}
          draggable
          style={{ backgroundColor: task.bgcolor }}
        >
          {task.name}
        </div>
      );
    });
```

Cuối cùng, ở thẻ **div target**, nơi mà mình muốn **drop element** kéo từ tasks list, mình thêm thuộc tính **onDragOver** để cho phép html element được thả ở đây.
Thêm 1 event onDrop để gọi khi mà có 1 element drop vô nữa, hàm này gọi vô hàm handleDrop là nơi mình update lại sate để thay đổi type của task mình vừa kéo thả:
```
        <div
          className="w-30"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => this.handleDrop(e)}
        >
          {tasks.complete}
        </div>
```

Và kết quả như trong codesandbox của mình đây, khá đơn giản đúng ko.
![](https://images.viblo.asia/c984124f-9743-4236-ac73-4e4e823f460d.png)


## Kết luận:
Chú ý: Hy vọng qua bài vừa rồi, bạn có thể học được gì đó thú vj, hẹn gặp lại các bạn ở bài sau!