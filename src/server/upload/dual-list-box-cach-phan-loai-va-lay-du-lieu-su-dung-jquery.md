# I.  Giới thiệu:
* Bình thường khi muốn chọn 1 giá trị trong nhiều giá trị khác ta có có thể dùng tag <option></option> để chọn 1 giá trị. Thế nhưng nếu trong trường hợp ta vừa phải chọn vừa phải filter những giá trị mà ta cần thiết thôi thì phải làm thế nào? Hôm nay mình sẽ giới thiệu cho các bạn cách làm dual-list box để có thể filter các giá trị muốn chọn theo đúng ý mình muốn nhé
* Về bài học hôm nay mình sẽ ứng dụng việc phân loại các siêu anh hùng để ứng dụng trong bài học này nhé!! Cơ bản thì nó sẽ có 1 box lớn chứa toàn bộ anh hùng việc của ta là sẽ phân loại anh hùng vào đúng box. Tiến hành ngay thoiiii.
# II. Bắt đầu:
Mình sẽ bố trí thư mục như sau:
![](https://images.viblo.asia/0408b097-89de-4ec6-bb61-4eb9911c4a62.PNG)
Trong folder dual-list có 2 folder là css và js với 1 file code có tên là demo.html
trong 2 folder css và js sẽ chứa các file tương ứng là site.css và  jquery.selectlistactions.js
* Đầu tiên hay sử dụng đoạn mã html này và mình sẽ giải thích chi tiết ở phía bên dưới:
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>jQuery SelectListActions</title>
        <meta name="description" content="Select List Actions - jQuery Plugin" />
        <link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css" />
        <script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
        <script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script src="js/jquery.selectlistactions.js"></script>

        <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/site.css" />
    </head>

    <body>
        <div class="container">
            <h1>jQuery Dual-List</h1>
            <div class="row style-select">
                <div class="col-md-6">
                    <label class="control-label">Superheroes</label>
                    <select multiple class="form-control" id="StaffList">
                        <option value="123">Superman</option>
                        <option value="456">Batman</option>
                        <option value="789">Spiderman</option>
                        <option value="654">Captain America</option>
                        <option value="856">Iron Man</option>
                        <option value="765">Nick Fury</option>
                        <option value="698">The Hulk</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-3 col-sm-3 col-xs-3 add-btns">
                            <input type="button" id="btnAvenger" value="Add Avenger" class="btn btn-default" />
                        </div>
                        <div class="col-md-9 col-sm-9 col-xs-9">
                            <label class="control-label">Avengers</label>
                            <div class="selected-left">
                                <select multiple class="form-control" id="PresenterList">
                                    
                                </select>
                            </div>
                            <div class="selected-right">
                                <button type="button" class="btn btn-default btn-sm" id="btnAvengerUp">
                                    <span class="glyphicon glyphicon-chevron-up"></span>
                                </button>
                                <button type="button" class="btn btn-default btn-sm" id="btnAvengerDown">
                                    <span class="glyphicon glyphicon-chevron-down"></span>
                                </button>
                                <button type="button" class="btn btn-default btn-sm" id="btnRemoveAvenger">
                                    <span class="glyphicon glyphicon-remove"></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3 col-sm-3 col-xs-3 add-btns">
                            <input type="button" id="btnShield" value="Add S.H.I.E.L.D." class="btn btn-default" />
                        </div>
                        <div class="col-md-9 col-sm-9 col-xs-9">
                            <label class="control-label">S.H.I.E.L.D.</label>
                            <div class="selected-left">
                                <select multiple class="form-control" id="ContactList">
                                   
                                </select>
                            </div>
                            <div class="selected-right">
                                <button type="button" class="btn btn-default btn-sm" id="btnShieldUp">
                                    <span class="glyphicon glyphicon-chevron-up"></span>
                                </button>
                                <button type="button" class="btn btn-default btn-sm" id="btnShieldDown">
                                    <span class="glyphicon glyphicon-chevron-down"></span>
                                </button>
                                <button type="button" class="btn btn-default btn-sm" id="btnRemoveShield">
                                    <span class="glyphicon glyphicon-remove"></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3 col-sm-3 col-xs-3 add-btns">
                            <input type="button" id="btnJusticeLeague" value="Add Justice League" class="btn btn-default" />
                        </div>
                        <div class="col-md-9 col-sm-9 col-xs-9">
                            <label class="control-label">Justice League</label>
                            <div class="selected-left">
                                <select multiple class="form-control" id="FacilitatorList"> </select>
                            </div>
                            <div class="selected-right">
                                <button type="button" class="btn btn-default btn-sm" id="btnJusticeLeagueUp">
                                    <span class="glyphicon glyphicon-chevron-up"></span>
                                </button>
                                <button type="button" class="btn btn-default btn-sm" id="btnJusticeLeagueDown">
                                    <span class="glyphicon glyphicon-chevron-down"></span>
                                </button>
                                <button type="button" class="btn btn-default btn-sm" id="btnRemoveJusticeLeague">
                                    <span class="glyphicon glyphicon-remove"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p>&nbsp;</p>
        </div>

        <script>
            $("#btnAvenger").click(function (e) {
                $("select").moveToList("#StaffList", "#PresenterList");
                e.preventDefault();
            });

            $("#btnRemoveAvenger").click(function (e) {
                $("select").removeSelected("#PresenterList");
                e.preventDefault();
            });

            $("#btnAvengerUp").click(function (e) {
                $("select").moveUpDown("#PresenterList", true, false);
                e.preventDefault();
            });

            $("#btnAvengerDown").click(function (e) {
                $("select").moveUpDown("#PresenterList", false, true);
                e.preventDefault();
            });

            $("#btnShield").click(function (e) {
                $("select").moveToList("#StaffList", "#ContactList");
                e.preventDefault();
            });

            $("#btnRemoveShield").click(function (e) {
                $("select").removeSelected("#ContactList");
                e.preventDefault();
            });

            $("#btnShieldUp").click(function (e) {
                $("select").moveUpDown("#ContactList", true, false);
                e.preventDefault();
            });

            $("#btnShieldDown").click(function (e) {
                $("select").moveUpDown("#ContactList", false, true);
                e.preventDefault();
            });

            $("#btnJusticeLeague").click(function (e) {
                $("select").moveToList("#StaffList", "#FacilitatorList");
                e.preventDefault();
            });

            $("#btnRemoveJusticeLeague").click(function (e) {
                $("select").removeSelected("#FacilitatorList");
                e.preventDefault();
            });

            $("#btnJusticeLeagueUp").click(function (e) {
                $("select").moveUpDown("#FacilitatorList", true, false);
                e.preventDefault();
            });

            $("#btnJusticeLeagueDown").click(function (e) {
                $("select").moveUpDown("#FacilitatorList", false, true);
                e.preventDefault();
            });
        </script>
    </body>
</html>

```

* Ở thẻ <head></head> mình sẽ sử dụng 2 file ở trong 2 folder css và js   <script src="js/jquery.selectlistactions.js"></script>  <link rel="stylesheet" href="css/site.css" />
* Và có sử dụng thêm thư viện của jQuery và Boostrap tiện trong việc xử lý vào giao diện nhìn bắt mắt hơn nhé.
* Trong phần <body></body> sẽ có những các thẻ div tương ứng với 4 box: 1 box chứa toàn bộ heroes và 3 box còn lại để phân loại gồm Avengers, S.H.I.E.L.D., Justice League :D
* Note: các bạn nhớ chú ý các id của các ô input nó sẽ là các id để bắt JQuery ở đằng dưới nhé.
* các bạn add thêm file css và js tương tự đưới đây nhé
* site.css:
```
body {
  	background-color: #fafafa;
    font-family:'Roboto';
}
.container { margin:150px auto;}
#StaffList {
    height: 350px;
    margin-bottom: 10px;
}
#PresenterList,
#ContactList,
#FacilitatorList {
    height: 95px;
    margin-bottom: 10px;
}

.style-select select {
    padding: 0;
}

.style-select select option {
    padding: 4px 10px 4px 10px;
}

.style-select select option:hover {
    background: #EEEEEE;
}

.add-btns {
    padding: 0;
}

.add-btns input {
    margin-top: 25px;
    width: 100%;
}

.selected-left {
    float: left;
    width: 88%;
}

.selected-right {
    float: left;
}

.selected-right button {
    display: block;
    margin-left: 4px;
    margin-bottom: 2px;
}

@media (max-width: 517px) {
  .selected-right button {
        display: inline;
        margin-bottom: 5px;
  }
}

.subject-info-box-1,
.subject-info-box-2 {
    float: left;
    width: 45%;
}

.subject-info-box-1 select,
.subject-info-box-2 select {
    height: 200px;
    padding: 0;
}

.subject-info-box-1 select option,
.subject-info-box-2 select option {
    padding: 4px 10px 4px 10px;
}

.subject-info-box-1 select option:hover,
.subject-info-box-2 select option:hover {
    background: #EEEEEE;
}

.subject-info-arrows {
    float: left;
    width: 10%;
}

.subject-info-arrows input {
    width: 70%;
    margin-bottom: 5px;
}

```
* jquery.selectlistactions.js
```
(function ($) {
    //Moves selected item(s) from sourceList to destinationList
    $.fn.moveToList = function (sourceList, destinationList) {
        var opts = $(sourceList + ' option:selected');
        if (opts.length == 0) {
            alert("Nothing to move");
        }

        $(destinationList).append($(opts).clone());
    };

    //Moves all items from sourceList to destinationList
    $.fn.moveAllToList = function (sourceList, destinationList) {
        var opts = $(sourceList + ' option');
        if (opts.length == 0) {
            alert("Nothing to move");
        }

        $(destinationList).append($(opts).clone());
    };

    //Moves selected item(s) from sourceList to destinationList and deleting the
    // selected item(s) from the source list
    $.fn.moveToListAndDelete = function (sourceList, destinationList) {
        var opts = $(sourceList + ' option:selected');
        if (opts.length == 0) {
            alert("Nothing to move");
        }

        $(opts).remove();
        $(destinationList).append($(opts).clone());
    };

    //Moves all items from sourceList to destinationList and deleting
    // all items from the source list
    $.fn.moveAllToListAndDelete = function (sourceList, destinationList) {
        var opts = $(sourceList + ' option');
        if (opts.length == 0) {
            alert("Nothing to move");
        }

        $(opts).remove();
        $(destinationList).append($(opts).clone());
    };

    //Removes selected item(s) from list
    $.fn.removeSelected = function (list) {
        var opts = $(list + ' option:selected');
        if (opts.length == 0) {
            alert("Nothing to remove");
        }

        $(opts).remove();
    };

    //Moves selected item(s) up or down in a list
    $.fn.moveUpDown = function (list, btnUp, btnDown) {
        var opts = $(list + ' option:selected');
        if (opts.length == 0) {
            alert("Nothing to move");
        }

        if (btnUp) {
            opts.first().prev().before(opts);
        } else if (btnDown) {
            opts.last().next().after(opts);
        }
    };
})(jQuery);
```
* Như vậy giao diện hiển thị nó sẽ như sau: 
* ![](https://images.viblo.asia/5bbe6d81-6cfc-43eb-87a7-809bd8c90922.PNG)
* Tiếp theo: đoạn <script> bên dưới file demo.html để bắt những sự kiện khi ta click vào đó :D
* ví du như:
    ![](https://images.viblo.asia/4a1f3c5f-2f96-488c-b8ed-ed01ec770b0a.PNG)
        Khi click vào nút có id="btnAvenger" thì function moveToList() sẽ được gọi tới với các tham số là #StaffList, #PresenterList tương ứng với các id ở trong file demo.html. Ta cùng tìm hiểu xem function moveToList nó sẽ xử lý như nào ở trong file jquery.selectlistactions.js nhé :D
 * ![](https://images.viblo.asia/ebbf107a-cee8-4591-9514-525f2b678202.PNG)
* function này nó sẽ kiểm tra xem những option(hay hero) nào đã được chọn(selected) ở bên box superheroes và nếu không chọn hero nào thì tương ứng với `opts.length == 0` nó sẽ trả về `alert("Nothing to move");` còn nếu đã chọn thì nó sẽ append sang box tương ứng
* Cách làm hoàn toàn tương tự với nhưng function khác nhé, các bạn có thể sử dụng và cảm nhận chúng :D
* Và cuối cùng là màn demo của mình. Chúc các bạn đọc bài vui vẻ :D
    ![](https://images.viblo.asia/d63b3566-ce86-48e0-9430-15e52f6060c2.gif)