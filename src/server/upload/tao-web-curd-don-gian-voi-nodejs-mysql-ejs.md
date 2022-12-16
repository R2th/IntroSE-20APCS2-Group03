# Mở đầu 
Trong bài viết này mình sẽ tạo web **CRUD** đơn giản bằng Nodejs sử dụng Mysql , Express, Ejs.
# Chuẩn bị
Các bạn hãy xem [bài viết này](https://viblo.asia/p/xay-dung-restful-api-bang-nodejs-Qbq5QRJmKD8) để tạo cơ sở dữ liệu cũng như tạo một dự án nodejs + express. Mình sẽ không nhắc lại để tránh mất thời gian của các bạn.
# Cấu trúc thư mục
![image.png](https://images.viblo.asia/ba888f7c-8873-41e1-9555-3984aeb66409.png)
# Tạo Model
Trong file **bangDia.model.js** ta sẽ tạo 2 class **BangDia**  và  **QLBD**.
```js
"use strict";
const sql = require("../conf/db");

class BangDia {
  constructor(bangDia) {
    this.tenBangDia = bangDia?.tenBangDia;
    this.theLoai = bangDia?.theLoai;
    this.nhaSX = bangDia?.nhaSX;
    this.noiDung = bangDia?.noiDung;
    this.gia = bangDia?.gia;
  }
}

class QLBD {
  static insert(bangDia, callback) {
    sql.query("INSERT INTO bangdia SET ?", bangDia, (err, res) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
        return;
      }
      console.log("inserted:", { id: res.insertId });
      callback(null, {
        id: res.insertId,
        ...bangDia,
      });
    });
  }
  static getById(id, callback) {
    sql.query(`SELECT * FROM bangdia WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
        return;
      }
      if (res.length) {
        console.log("found: ", res[0]);
        callback(null, res[0]);
        return;
      }
      // not found with the id
      callback({ kind: "not_found" }, null);
    });
  }
  static getAll(tenBangDia, callback) {
    let query = "SELECT * FROM bangdia";
    if (tenBangDia) {
      query += ` WHERE tenBangDia LIKE '%${tenBangDia}%'`;
    } // nếu có truyền vào tên băng đĩa thì sẽ tìm kiếm theo tên
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }
      console.log("bangDia: ", res);
      callback(null, res);
    });
  }
  static update(id, bangDia, callback) {
    sql.query(
      "UPDATE bangdia SET ? WHERE id = ?",
      [bangDia, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          callback(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found  with the id
          callback({ kind: "not_found" }, null);
          return;
        }
        console.log("updated : ", { id: id, ...bangDia });
        callback(null, { id: id, ...bangDia });
      }
    );
  }
  static delete(id, callback) {
    sql.query("DELETE FROM bangdia WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found with the id
        callback({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted with id: ", id);
      callback(null, res);
    });
  }
}
module.exports = { BangDia, QLBD };
```
# Tạo Controller
Trong file **bangDia.controller.js** tạo class **BangDiaCtrl**. và require 2 class **BangDia** và **QLBD** mà ta đã tạo trong model.
```js
"use strict";
const { BangDia, QLBD } = require("../models/bangDia.model");
class BangDiaCtrl {
  // lấy tất cả các băng đĩa trong csdl sau đó truyền vào trang bangDia/index.js trong view
  index(req, res) {
    res.locals.deleted = req.query.deleted;
    const tenBangDia = req.query.tenBangDia;
    QLBD.getAll(tenBangDia, (err, data) => {
      if (err) res.redirect("/500");
      else res.render("bangDia/index", { bangDias: data });
    });
  }
  // hiển thị form tạo băng đĩa 
  showFormCreate(req, res) {
    res.locals.status = req.query.status;
    res.render("bangDia/create");
  }
  // thực hiện thêm băng đĩa mới vào csdl khi ấn save
  create(req, res) {
    if (!req.body) {
      res.redirect("bangDia/create?status=error");
    }
    const newBangDia = new BangDia(req.body); // tạo một băng đĩa mới 
    QLBD.insert(newBangDia, (err, result) => {
      if (err) res.redirect("/bangDia/create?status=error");
      else {
        console.log(result);
        res.redirect("/bangDia");
      }
    });
  }
  // hiển thị form chỉnh sửa băng đĩa
  showFormEdit(req, res) {
    res.locals.status = req.query.status;
    // lấy thông tin băng đĩa theo id sau đó truyền vào view
    QLBD.getById(req.params.id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.redirect("/404");
        } else {
          res.redirect("/500");
        }
      } else res.render("bangDia/edit", { bangDia: result });
    });
  }
  // thực hiện lưu thông tin sau khi thay đổi
  update(req, res) {
    const newBangDia = new BangDia(req.body); // tạo băng đĩa với thông tin được thay đổi
    QLBD.update(req.params.id, newBangDia, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.redirect("/404");
        } else {
          res.redirect("/500");
        }
      } else {
        res.redirect("/bangDia");
      }
    });
  }
  // xóa băng đĩa theo id
  delete(req, res) {
    QLBD.delete(req.params.id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.redirect("/404");
        } else {
          res.redirect("/500");
        }
      } else res.redirect("/bangDia?deleted=true");
    });
  }
}
module.exports = new BangDiaCtrl();
```
# Tạo Router
Tạo file **bangDia.router.js** .
```js
const router = require("express").Router();
const bangDiaCtrl = require("../controllers/bangDia.controller");
module.exports = (app) => {
  router.get("/", bangDiaCtrl.index);
  router.get("/create", bangDiaCtrl.showFormCreate);
  router.post("/", bangDiaCtrl.create);
  router.get("/delete/:id", bangDiaCtrl.delete);
  router.put("/:id", bangDiaCtrl.update);
  router.get("/edit/:id",bangDiaCtrl.showFormEdit);
  app.use("/bangDia", router);
};
```

# Tạo View
Tạo View **index.ejs** để hiển thị tất cả băng đĩa.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/index.css" />
    <title>BangDia</title>
  </head>
  <body>
    <h1>Get All BangDia</h1>
    <% if (typeof deleted !=='undefined' ) { %> <%if (deleted=='true' ) { %>
    <div style="color: green">Deleted Successfully</div>
    <% } %>
    <br />
    <% } %>
    <form action="/bangDia" method="get">
      <input type="text" name="tenBangDia" placeholder="Enter tenBangDia" />
      <button type="submit">Search</button>
    </form>
    <br />
    <a href="/bangDia/create">insert</a>
    <br />
    <table border="1" cellpadding="0" cellspacing="0">
      <tr>
        <th>ID</th>
        <th>tenBangDia</th>
        <th>theLoai</th>
        <th>nhaSX</th>
        <th>noiDung</th>
        <th>gia</th>
        <th>Action</th>
      </tr>
      <% bangDias.forEach((item)=> { %>
      <tr>
        <td><%= item.id %></td>
        <td><%= item.tenBangDia %></td>
        <td><%= item.theLoai %></td>
        <td><%= item.nhaSX %></td>
        <td><%= item.noiDung %></td>
        <td><%= item.gia %></td>
        <td>
          <a href="/bangDia/edit/<%= item.id %>">Edit</a> <br />
          <a href="/bangDia/delete/<%= item.id %>">Delete</a>
        </td>
      </tr>
      <% }) %>
    </table>
    <br />
    <a href="/">back</a>
    <br />
  </body>
</html>
```
Tạo view **create.ejs** để thêm mới băng đĩa.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/index.css" />
    <title>Create BangDia</title>
  </head>
  <body>
    <h2>Create new BangDia</h2>
    <form action="/bangDia" method="post">
      <label for="tenBangDia">tenBangDia</label>
      <input type="text" id="tenBangDia" name="tenBangDia" />
      <br />
      <br />
      <label for="theLoai">theLoai</label>
      <input type="text" name="theLoai" id="theLoai" />
      <br />
      <br />
      <label for="nhaSX">nhaSX</label>
      <input type="text" name="nhaSX" id="nhaSX" />
      <br /><br />
      <label for="noiDung">noiDung</label>
      <input type="text" name="noiDung" id="noiDung" />
      <br /><br />
      <label for="gia">gia</label>
      <input type="number" name="gia" id="gia" />
      <br /><br />
      <button type="submit">Save</button>
    </form>
    <br />
    <a href="/bangDia">back</a>
    <br />
  </body>
</html>
```
Tạo view **edit.ejs** để sửa thông tin băng đĩa.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/index.css" />
    <title>Edit BangDia - <%= bangDia.tenBangDia %></title>
  </head>
  <body>
    <h2>Edit BangDia</h2>
    <form action="/bangDia/<%= bangDia.id %>" method="post">
      <input name="_method" type="hidden" value="put" />
      <label for="title">tenBangDia</label>
      <input
        type="text"
        id="tenBangDia"
        name="tenBangDia"
        value="<%= bangDia.tenBangDia %>"
      />
      <br />
      <br />
      <label for="theLoai">theLoai</label>
      <input
        type="text"
        name="theLoai"
        id="theLoai"
        value="<%= bangDia.theLoai %>"
      />
      <br />
      <br />
      <label for="nhaSX">nhaSX</label>
      <input type="text" name="nhaSX" id="nhaSX" value="<%= bangDia.nhaSX %>" />
      <br /><br />
      <br />
      <label for="noiDung">noiDung</label>
      <input
        type="text"
        name="noiDung"
        id="noiDung"
        value="<%= bangDia.noiDung %>"
      />
      <br /><br />
      <br />
      <label for="gia">gia</label>
      <input type="number" name="gia" id="gia" value="<%= bangDia.gia %>" />
      <br /><br />
      <button type="submit">Update</button>
    </form>
    <br />
    <a href="/bangDia">back</a>
    <br />
  </body>
</html>
```
# Kết luận
Mình đã hướng dẫn xây dựng web crud đơn giản bằng nodejs các bạn có thể tham khảo sroure code  [tại đây](https://github.com/phamkim/nodejs-ssr).