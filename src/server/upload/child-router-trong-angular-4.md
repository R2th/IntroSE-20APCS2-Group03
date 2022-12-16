# 1. Cấu hình Router trong Angular 4 
Như lần trước mình đã có viết bài Router trong Angular 4, cấu hình như sau: 
```
const  courseListRoutes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full'},
  { path: 'home',         component: HoneComponent },
  { path: 'courses',      component: CourseListComponent },
  { path: 'course/:id',   component: CourseDetailComponent },
  { path: 'contact',      component: ContactComponent },
  { path: 'about',        component: AboutComponent },
  { path: 'about/web',    component: AboutComponent },
  { path: '**',           component: NotFoundComponent }
];
```

# 2. Child Router trong Angular 4 
- Mình định nghĩa child router như sau : 
```
const courseListRoutes: Routes = [
{ 
  path: 'course/:id', 
  component: CourseComponent, 
  children: [
   { path: ' '		, redirectTo: 'detail' },
   { path: 'detail', component: CourseDetailComponent },
   { path: 'edit'	, component: CourseEditComponent },
   { path: 'delete', component: CourseDeleteComponent },
 ] 
},
  { path: 'courses', component: CourseListComponent } ,
  { path: 'contact',      component: ContactComponent },
  { path: 'about',        component: AboutComponent },
  { path: 'about/web',    component: AboutComponent },
  { path: '**',           component: NotFoundComponent }
];

```

Mình giải thích đoạn code trên như sau :
**path: 'course/:id'** , đây chính link cha của nó ví dụ  :  **localhost:3000/course/1/** , trong link này có 3 link con của nó đó chính là  **localhost:3000/course/1/detail** ,  **localhost:3000/course/1/edit** ,  **localhost:3000/course/1/delete** .

- Ở File **component-list-component.ts** , ta viết như sau để điều hướng khi click vào  **View, Edit, Delete** 
```
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from './../services/course.service';
import { ICourse } from './../defines/course.interface';

@Component({
    moduleId: module.id,
    selector: 'zvn-course-list',
    template: `
<div class="panel panel-info">
    <div class="panel-heading">
        <h3 class="panel-title">Course List</h3>
    </div>
    <div class="panel-body">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
               <tr *ngFor="let course of courses ; let i = index">
                  <td>{{ i+1 }}</td>
                  <td >{{ course.name | capitalize }}</td>
                  <td >
                    <span (click)="onSelectDetail(course.id)" class="label label-success">View</span>
                    <span (click)="onSelectEdit(course.id)" class="label label-warning">Edit</span>
                    <span (click)="onSelectDelete(course.id)" class="label label-danger">Delete</span>
                  </td>
              </tr>
            </tbody>
        </table>
    </div>
</div>
`
})

export class CourseListComponent implements OnInit {
 courses: ICourse[];

 constructor(
   private _courseService: CourseService,
   private _routerService: Router,
 ) {}

 ngOnInit() {
   this.courses = this._courseService.getCourses();
 }

 onSelectDetail(courseID: number){
   this._routerService.navigate(['/course', courseID]);
 }

 onSelectEdit(courseID: number){
   this._routerService.navigateByUrl(`/course/${courseID}/edit`);
 }

 onSelectDelete(courseID: number){
    this._routerService.navigate(['course', courseID, 'delete']);
 }
}
```

# 3. Kết luân: 
Thông qua bài viết giới thiệu về Child Router trong Angular 4 mình tin sẽ giúp bạn hiểu 1 phần nào đó về phần Router và làm chủ Router trong Angular 4 một cách cơ bản và dễ tiếp cận nhất.
Tài liệu tham khảo : 
- https://angular.io/guide/router#child-routing-component
- https://angular-2-training-book.rangle.io/handout/routing/child_routes.html