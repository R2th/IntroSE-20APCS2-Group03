# 1. Giới thiệu
Hi everybody hôm nay chúng ta sẽ cùng nhau tìm hiểu một khái niệm không xa cũng không gần trong giới lập trình. Đó chính là xây dựng tính năng phân trang ( Pagination ) với Angular. Xin phép mọi người một chút thời gian giới thiệu về bản thân mình , nếu điều đó không cần thiết trong bài viết này các bạn có thể đọc tiếp mục xây dựng tính năng phân trang với Angular Material hoặc Bootstrap. Xin chào mọi người mình là một lập trình viên Front end đúng chuẩn ra mình Job vào vị trí React developer y như lời HR bàn với mình trong buổi đầu làm việc 🙁 Cú lừa. Trong dự án đầu tiên mình đã làm rất tốt công việc của mình và mình tự tin có thể làm tốt hơn thế nữa nếu như deadline không dí mình sấp mặt 😂 đó là dự án code bằng React. Nhưng đến dự án thứ 2 mình phải đối mặt với Angular. Angular đã thay đổi lại toàn bộ giao diện, phong cách code phóng khoáng có thể làm mù mắt thằng em ngồi bên cạnh vì có quá nhiều kiến thức phải học. Nay có cơ hội được chia sẻ đến cho mọi người 1 phần kiến thức nhỏ bé , mong rằng các bạn sẽ đón nhận nó một cách ôn tồn. Mọi đáng giá của các bạn là quý giá cho lần đầu của mình viết bài ở trên đây xin cảm ơn các bạn.
![](https://images.viblo.asia/bf52a2b4-30df-4917-a11f-5e69f7127f15.jpg)
# 2. Xây dựng tính năng phân trang với Angular Material
> bài post này tương thích với Angular4 cho đến các phiên bản mới hơn Angular11 và 12
các bạn hãy làm theo các bước sau đây để đạt được kết quả như ý nhé 😊.
## Bước 1: cần install một vài package vào dự án để sử dụng Material
Sau khi tạo thành công dự án Angular, bạn chỉ cần chạy lệnh sau để add Angular CDK và Angular Material vào dự án:
```javascript
    ng add @angular/cdk
    ng add @angular/material
```
## Bước 2: Edit lại file angular.json
Mình từng gặp nhiều trường hợp khi bạn đã install đủ cdk, material nhưng khi build giao diện sử dụng components của Material thì không hoạt động và mình đã search ra đáp án và phương pháp giải quyết. Các bạn vào file angular.json của dự án và add thêm cho mình.
```json
"styles": [
              {
                "input": "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
              },
              "src/styles.scss"
         ]
```
🤣 Chạy luôn các bạn!!.
## Bước 3: Thêm các component vào @NgModule file app.module.ts
ngay tại file app.module.ts các bạn thêm cho mình MatTableModule , MatButtonModule , MatPaginatorModule.
```javascript
    @NgModule({
          declarations: [...],
          imports: [
            BrowserModule,
            MatTableModule,
            MatButtonModule,
            MatPaginatorModule
          ],
          providers: [],
          bootstrap: [...],
      })
```
Cụ thể hóa thì MatPaginatorModule hay mọi thứ khác thì "Mat" nó viết tắt của Material. sau từ đó là tên thành phần như ở đây là "Paginator". Dự vào cụm từ nếu muốn tìm hiểu chi tiết thêm chỉ cần truy cập vào https://material.angular.io/components , gõ F3 ấn paginator là có nguyên 1 trang ghi cho các bạn về các API của thành phần đấy, Examples khi sử dụng thành phần ấy sẽ như thế nào.
## Bước 4: tạo dữ liệu mẫu, add thêm tí logic
các bạn hãy add data vào trong 1 file components trong dự án Angular của các bạn nhé. Lấy cái data này cho dễ áp dụng nhé https://jsonplaceholder.typicode.com/todos. Copy vài item nhỏ để demo các bạn ạ. Ở đây mình sẽ dùng kiểu dữ liệu khác để demo.
```javascript
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

//Hãy nhớ add interface vào trong object ELEMENT_DATA nhé

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
```
trong class ở file component mình vừa tạo trong angular mình add thêm một vài logic.
```javascript

// import một vài thứ cần thiết

import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
    export class AppComponent {
          displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
          dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
          @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
          @ViewChild(MatSort, { static: true }) sort!: MatSort;

          ngOnInit() {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
}

//displayedColumns : tạo một mảng tên cột sẽ được hiển thị một cách cố định.
//dataSource: được sử dụng để liên kết với mảng dữ liệu mà bạn truyền cho hàm MatTableDataSource.
//ViewChild: giúp bạn trỏ tới một phần tử HTML hoặc components trong template và thao tác trực tiếp lên nó ở đây mình thao tác với MatPaginator , MatSort. Mình chưa build giao diện nên nhiều bạn còn thấy mơ hồ nhanh thôi cố nhé.
```
## Bước 5: Xây dựng giao diện
Nếu một vài bạn đang mới học Angular chưa có biết đến Input Binding thì học xong các bạn sẽ hiểu tại sao có thể chuyền data từ một components sang một template độc lập trong angular nhé😂
```HTML
<div>
  <table mat-table matSort [dataSource]="dataSource">
    <tbody>
    <ng-container matColumnDef="position">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> No. </th>
      <td mat-cell *matCellDef="let element"> {{element.position}} </td>
    </ng-container>

    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
      <td mat-cell *matCellDef="let element"> {{element.name}} </td>
    </ng-container>

    <ng-container matColumnDef="weight">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Weight </th>
      <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
    </ng-container>

    <ng-container matColumnDef="symbol">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Symbol </th>
      <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </tbody>
  </table>

  <table>
    <tr *ngIf="!dataSource.data.length">
      <td style="text-align: center;" [attr.colspan]="displayedColumns.length">
        No Records Found!
      </td>
    </tr>
  </table>

</div>
<mat-paginator
  [pageSize]="5"
  [pageSizeOptions]="[5, 10, 15]"
  showFirstLastButtons
>
</mat-paginator>
```
tại "mat-paginator" các bạn có thấy mình có thêm vài API hơi lạ lạ mình sẽ giải thích ngay nhé
```HTML
<mat-paginator
  [pageSize]="5"
  [pageSizeOptions]="[5, 10, 15]"
  showFirstLastButtons
>
</mat-paginator>
```
Theo như nguyên văn củ cải của nhà Angular Material.
```javascript
    pageSize: Kích thước trang hiện tại --- giá trị yêu cầu là number
    pageSizeOptions: Tập hợp các tùy chọn kích thước trang được cung cấp để hiển thị cho người dùng. --- giá trị yêu cầu là một array number
```
## thành quả
![](https://images.viblo.asia/272df92f-66f7-4b13-a9d3-79a93c7ed81d.PNG)
# 3. Kết luận
Đó là tất cả những gì đơn giản nhất để xây dựng tính năng phân trang trên Angular khi áp dụng với Angular Material. Bài sau sẽ hướng dẫn xây dựng tính năng phân trang trên Bootstrap hẹn gặp lại các bạn trong bài post tiếp theo.
<div align="right">Tuanpk</div>