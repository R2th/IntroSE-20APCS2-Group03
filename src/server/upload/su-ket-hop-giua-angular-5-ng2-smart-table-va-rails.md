# 1. Giới thiệu về Ng2-smart-table
Hẳn trong số chúng ta đã rất nhiều bạn sử dụng các tư viện về table, mục địch của các thư viện này giúp bạn xử lí dữ liệu, cũng như các hành động trên table được tốt hơn ngoài ra mỗi table sẽ có những tiện ích riêng cũng như vẻ đẹp riêng biệt. Hôm nay mình xin giới thiệu đến các bạn thư  viện Ng2-smart-table khá là dễ sử dụng và có rất nhiều tiện ích.

- **Live Demo**
https://raw.githubusercontent.com/akveo/ng2-smart-table/master/src/assets/img/demo.gif

- **Cài đặt**
```
npm install --save ng2-smart-table
```

- **Tổng quan một số cấu trúc chính của ng2-smart-table**
Đầu tiên bạn cần import ng2-smart-table vào bên trong component của bạn
```
import { Ng2SmartTableModule } from 'ng2-smart-table';
```

Sau đó bạn cần thêm vào danh sách các directives trong module của bạn

```
// ...

@NgModule({
  imports: [
    // ...
    
    Ng2SmartTableModule,
    
    // ...
  ],
  declarations: [ ... ]
})
// ...
```

Bây giờ chúng ta cần cấu hình table và thêm chúng vào trong template. Cấu hình bắt buộc bạn phải có là cấu hình các cột trong table. Hãy thiết lập tên các cột là các trường mà bạn muốn hiển thị bên trong table. Ví dụ

```
settings = {
  columns: {
    id: {
      title: 'ID'
    },
    name: {
      title: 'Full Name'
    },
    username: {
      title: 'User Name'
    },
    email: {
      title: 'Email'
    }
  }
};
```

Như ở trên mà đã thiết lập table sẽ hiển thị ra 4 trường là ID, full name, user name và email. Cuối cùng là bạn cần phải đặt component ng2-smart-table vào bên trọng template

```
// ...

@Component({
  template: `
    <ng2-smart-table [settings]="settings"></ng2-smart-table>
  `
})
// ...
```

Sau bước trên bạn đã hoàn thành cấu hình một table của ng2-smart-table. Tất cả các chức năng có sẵn đều có thể sử dụng mà bạn không cần phải làm bất cứ việc gì như add/edit/delete rows, sort hoặc filter the table, etc. Tuy nhiên bạn vẫn chưa thể có dữ liệu để hiển thị lên table trên. Vì vậy chúng ta cần phải tạo ra dữ liệu cho nó.
```
data = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz"
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv"
  },
  
  // ... list of items
  
  {
    id: 11,
    name: "Nicholas DuBuque",
    username: "Nicholas.Stanton",
    email: "Rey.Padberg@rosamond.biz"
  }
];
```
Và gán dữ liệu vào bên trong table như sau:
```
// ...

@Component({
  template: `
    <ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>
  `
})
// ...
```

Trên là mình đã giới thiệu tổng quát cũng như cách thức hoạt động của ng2-smart-table. Bây giờ chúng ta sẽ đi vào việc kết hợp giữa Rails và Ng2-smart-table nhé.

# 2. Demo kết hợp giữa Rails và Ng2-smart-table
Sự kết hợp này khá là đơn giản, Rails sẽ là nơi xử lí bên server và ng2-smart-table xử lí bên client. Và trước khi bắt đầu các bạn cần phải cấu hình để kết hợp giữa Angular 5 và Rails, để làm được điều này mời bạn xem bài viết này nhé: https://viblo.asia/p/tao-ung-dung-voi-rails-5-va-angular-5-63vKjm6y52R
Sau khi làm theo hướng dẫn ở bài trên ta sẽ có 2 thư mục, một thư mục là server sẽ chứa code của Rails, một thư mục là client chứa code của ng2-smart-table. Tiếp theo bạn **cd server** và tạo một user đơn giản bằng Rails nhé. 
```
rails generate scaffold User name:string user_name: string email:string
```
Khi câu lệnh trên tạo xong, sẽ tạo đầy đủ xử lí về việc edit/create/destroy một user. Tiếp theo bạn **cd client** chúng ta bắt đầu việc xử lí bên client nhé.
Ở trong thư mục client/src/app/app.component.ts, bạn thêm đoạn code dưới đây:
```
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './app.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AppComponent {
  constructor(private http: Http) {
    this.getData();
  }

  users: LocalDataSource = new LocalDataSource();
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      user_name: {
        title: 'User Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
    },
  };


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.http.delete('http://localhost:3000/users/' + event.data.id).subscribe(
        res => {
            event.confirm.resolve(event.newData);
            this.getData();
        }
      )
    } else {
      event.confirm.reject();
    }
  }
  private getData (){
    this.http.get('http://localhost:3000/users.json')
      .subscribe(res => {
        this.companies.load(res.json().data);
      });
  }

  onCreateConfirm(event): void {
    var data = {
      "name": event.newData.name,
      "user_name": event.newData.description,
      "email": event.newData.email,,
    };

    this.http.post('http://localhost:3000/users/', data).subscribe(
      res => {
          event.confirm.resolve(event.newData);
          this.getData();
      }
    );
  }

  onUpdateConfirm(event): void{
    var data = {
      "name": event.newData.name,
      "user_name": event.newData.description,
      "email": event.newData.email,
    };

    this.http.put('http://localhost:3000/users/' + event.newData.id, data).subscribe(
      res => {
          event.confirm.resolve(event.newData);
          this.getData();
      }
    );
  }
}
```

Tiếp theo trong thư mục app.component.html, bạn thêm đoạn code sau:
```
<nb-card>
  <nb-card-header>
    User
  </nb-card-header>
  <nb-card-body>
    <ng2-smart-table [settings]="settings" [source]="users" (deleteConfirm)="onDeleteConfirm($event)"
      (createConfirm)="onCreateConfirm($event)" (editConfirm)="onUpdateConfirm($event)">
    </ng2-smart-table>
  </nb-card-body>
  <nb-card-footer>
  </nb-card-footer>
</nb-card>
```

Như các bạn thấy ở trên ng2-smart-table cung cấp cho chúng ta các hàm như là deleteConfirm, editConfirm và createConfirm. Các hàn này dùng để config lại các button edit/create/delete mặc định của ng2-smart-table. Ở đây mình sẽ cấu hình để việc thêm sửa xóa nhận dữ liệu sẽ xử lí bên phía server và bên client chỉ nhận dữ liệu trả về. Các bạn có thể tìm hiểu thêm nhiều hàm khác ở đây: https://akveo.github.io/ng2-smart-table/#/documentation

Và bạn đừng quên ở trong app.module.ts cần phải import ng2-smart-table vào nhé:
```
// ...

@NgModule({
  imports: [
    // ...
    
    Ng2SmartTableModule,
    
    // ...
  ],
  declarations: [ ... ]
})
// ...
```

Vậy là mình đã hoàn thành bài viết về cách xử lí ng2-smart-table và cách làm việc của nó với Rails. Vì mình chỉ mới tìm hiểu nên có gì chưa đúng hãy để lại một comment. Mình sẽ tìm hiểu và giải thích lại cho các bạn. 
# 3 Tài liệu tham khảo
- https://github.com/akveo/ng2-smart-table