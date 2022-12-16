### Giới thiệu
Ở ví dụ này mình sẽ hướng dẫn các bạn tạo một dạng cascading dropdownlist.
Cụ thể người dùng sẽ được hiển thị một list các nước trên thế giới, sau đó từ một nước sẽ lấy ra các thành phố của nước đó, và từ thành phố đó lấy ra các huyện thuộc thành phố đó.

Link source code: [Cascading Dropdownlist](https://github.com/xxxcodexxx/Cascading-DropdownList).
### Tạo Models
1. Tạo model Countries
    * Bạn theo dõi đoạn code dưới đây:
    ```CSharp
    namespace CascadingDropdownList.Models
    {
        public class Countries
        {
            public int CountryID { get; set; }
            public string NameOfCountry { get; set; }
            public int OrderNumber { get; set; }
        }
    }
2. Tạo model Cities
    * Bạn theo dõi đoạn code dưới đây:
    ```CSharp
    namespace CascadingDropdownList.Models
    {
        public class Cities
        {
            public int CityID { get; set; }
            public string NameOfCity { get; set; }
            public int OrderNumber { get; set; }
            public int CountryID { get; set; }
        }
    }
3. Tạo model Districts
    * Bạn theo dõi đoạn code dưới đây:
    ``` CSharp
    namespace CascadingDropdownList.Models
    {
        public class Districts
        {
            public int DistrictID { get; set; }
            public string NameOfDistrict { get; set; }
            public int OrderNumber { get; set; }
            public int CityID { get; set; }
    }
### Tạo ViewModel
   * Tạo CascadingViewmodel để hiển thị:
        ``` CSharp
        using System.Collections.Generic;
        using System.ComponentModel;
        namespace CascadingDropdownList.Models
        {
            public class CascadingViewmodel
            {
                [DisplayName("Country")]
                public int CountryID { get; set; }
                [DisplayName("City")]
                public int CityID { get; set; }
                [DisplayName("District")]
                public int DistrictID { get; set; }
                public List<Countries> Countries { get; set; }
                public List<Cities> Cities { get; set; }
                public List<Districts> Districts { get; set; }
            }
        }
    
### Tạo Controller
* Tạo CascadingController:
* Ở bài này mình dùng dữ liệu tự khởi tạo, chứ không lấy từ db ra, nếu các bạn sử dụng db thì làm tương tự.

    ``` CSharp
    using CascadingDropdownList.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;

    namespace CascadingDropdownList.Controllers
    {
        public class CascadingController : Controller
        {
            //khoi tao cac danh sach dang static de luu du lieu 
            private static List<Countries> _countries { get; set; }
            private static List<Cities> _cities { get; set; }
            private static List<Districts> _districts { get; set; }

            public CascadingController()
            {
                //goi den cac ham khoi tao du lieu
                InitialDataCities();
                InitialDataDistricts();
                InitialDataCountries();
            }

            public ActionResult Index()
            {
            //xu ly lay du lieu de hien thi cho lan truy cap dau tien den trang
                var model = new CascadingViewmodel
                {
                    CountryID = _countries.FirstOrDefault() != null ?
                        _countries.OrderBy(c => c.OrderNumber).FirstOrDefault().CountryID : 0,
                    Countries = _countries.OrderBy(c => c.OrderNumber).ToList()
                };

                model.Cities = _cities.Where(c => c.CountryID.Equals(model.CountryID)).OrderBy(c => c.OrderNumber).ToList();
                model.CityID = model.Cities.FirstOrDefault() != null ? model.Cities.FirstOrDefault().CityID : 0;

                model.Districts = _districts.Where(c => c.CityID.Equals(model.CityID)).OrderBy(c => c.OrderNumber).ToList();
                model.DistrictID = model.Districts.FirstOrDefault() != null ? model.Districts.FirstOrDefault().DistrictID : 0;

                return View(model);
            }

            //lay danh sach cach thanh pho cua mot nuoc theo ID
            [HttpGet]
            public JsonResult GetCities(int countryID)
            {
                var cities = _cities.Where(c=>c.CountryID.Equals(countryID)).OrderBy(c=>c.OrderNumber).ToList();
                return Json(cities, JsonRequestBehavior.AllowGet);
            }

            //lay danh sach cach quan huyen cua mot thanh pho theo ID
            [HttpGet]
            public JsonResult GetDistricts(int cityID)
            {
                var districts = _districts.Where(d=>d.CityID.Equals(cityID)).OrderBy(d => d.OrderNumber).ToList();
                return Json(districts, JsonRequestBehavior.AllowGet);
            }

            // Ham khoi tao du lieu Countries
            public void InitialDataCountries()
            {
                _countries = new List<Countries> {
                    new Countries{CountryID = 1, NameOfCountry="Việt Nam", OrderNumber = 1},
                    new Countries{CountryID = 2, NameOfCountry="Mỹ", OrderNumber = 2},
                    new Countries{CountryID = 3, NameOfCountry="Ấn Độ", OrderNumber = 3},
                    new Countries{CountryID = 4, NameOfCountry="Trung Quốc", OrderNumber = 4},
                    new Countries{CountryID = 5, NameOfCountry="Canada", OrderNumber = 6},
                    new Countries{CountryID = 6, NameOfCountry="Nhật Bản", OrderNumber = 7},
                    new Countries{CountryID = 7, NameOfCountry="Hàn Quốc", OrderNumber = 5},
                    new Countries{CountryID = 8, NameOfCountry="Đức", OrderNumber = 8},
                };
            }

            //Ham khoi tao du lieu Cities
            public void InitialDataCities()
            {
                _cities = new List<Cities>
                {
                    //vietnam
                    new Cities{CityID = 1, NameOfCity="Hà Nội", CountryID = 1, OrderNumber = 1},
                    new Cities{CityID = 2, NameOfCity="TP Hồ Chí Minh", CountryID = 1, OrderNumber = 2},
                    new Cities{CityID = 3, NameOfCity="Nghệ An", CountryID = 1, OrderNumber = 3},
                    //my
                    new Cities{CityID = 4, NameOfCity="Los Angeles", CountryID = 2, OrderNumber = 3},
                    new Cities{CityID = 5, NameOfCity="Las Vegas", CountryID = 2, OrderNumber = 4},
                    new Cities{CityID = 6, NameOfCity="Chicago", CountryID = 2, OrderNumber = 2},
                    new Cities{CityID = 7, NameOfCity="New York", CountryID = 2, OrderNumber = 1},
                    //ando
                    new Cities{CityID = 8, NameOfCity="Mumbai", CountryID = 3, OrderNumber = 2},
                    new Cities{CityID = 9, NameOfCity="Delhi", CountryID = 3, OrderNumber = 3},
                    new Cities{CityID = 10, NameOfCity="Bengaluru", CountryID = 3, OrderNumber = 4},
                    //trungquoc
                    new Cities{CityID = 11, NameOfCity="Thượng Hải", CountryID = 4, OrderNumber = 1},
                    new Cities{CityID = 12, NameOfCity="Bắc Kinh", CountryID = 4, OrderNumber = 1},
                    new Cities{CityID = 13, NameOfCity="Vũ Hán", CountryID = 4, OrderNumber = 1},
                    //canada
                    new Cities{CityID = 14, NameOfCity="Toronto", CountryID = 5, OrderNumber = 1},
                    new Cities{CityID = 15, NameOfCity="Ottawa", CountryID = 5, OrderNumber = 1},
                    //nhatban
                    new Cities{CityID = 16, NameOfCity="Nagasaki", CountryID = 6, OrderNumber = 1},
                    new Cities{CityID = 17, NameOfCity="Osaka", CountryID = 6, OrderNumber = 1},
                    new Cities{CityID = 18, NameOfCity="Tokyo", CountryID = 6, OrderNumber = 1},
                    //hanquoc
                    new Cities{CityID = 19, NameOfCity="Busan", CountryID = 7, OrderNumber = 1},
                    new Cities{CityID = 20, NameOfCity="Icheon", CountryID = 7, OrderNumber = 1},
                    new Cities{CityID = 21, NameOfCity="Seoul", CountryID = 7, OrderNumber = 1},
                    //duc
                    new Cities{CityID = 22, NameOfCity="Berlin", CountryID = 8, OrderNumber = 1},
                    new Cities{CityID = 23, NameOfCity="München", CountryID = 8, OrderNumber = 1},
                    new Cities{CityID = 24, NameOfCity="Dortmund", CountryID = 8, OrderNumber = 1},
                };
            }

            //Ham khoi tao du lieu Districts
            public void InitialDataDistricts()
            {
                _districts = new List<Districts>
                {
                    //hanoi
                    new Districts{DistrictID = 1, NameOfDistrict = "Hai Bà Trưng", CityID = 1, OrderNumber = 2},
                    new Districts{DistrictID = 2, NameOfDistrict = "Hoàn Kiếm", CityID = 1, OrderNumber = 1},
                    //hcm
                    new Districts{DistrictID = 3, NameOfDistrict = "Quận 1", CityID = 2, OrderNumber = 1},
                    new Districts{DistrictID = 4, NameOfDistrict = "Quận 2", CityID = 2, OrderNumber = 1},
                    //nghean
                    new Districts{DistrictID = 5, NameOfDistrict = "Vinh", CityID = 3, OrderNumber = 1},
                    //losangeles
                    new Districts{DistrictID = 6, NameOfDistrict = "Hollywood", CityID = 4, OrderNumber = 1},
                    new Districts{DistrictID = 7, NameOfDistrict = "Los Angeles Times", CityID = 4, OrderNumber = 1}
                };
            }
        }
    }
### Tạo view

* Bạn cần import thư viện JQuery để sử dụng Ajax.

*   Giờ vào **BundleConfig.cs** thêm dòng code này
    ``` CSharp

        bundles.Add(new ScriptBundle("~/bundles/jQuery").Include(
                                                  "~/Scripts/jquery-3.3.1.min.js",
                                                  "~/Scripts/jquery-3.3.1.js"
                                            ));
                            
*  Sau đó ở **_layout.cshtml** bạn import thêm Jquery bằng cách thêm `
    @Scripts.Render("~/bundles/jQuery") vào thẻ head

* Trong thư mục **Views** => **Cascading** tạo view đặt tên Index.cshtml tương ứng với action Index trong Controller Cascading.
* Bạn theo dõi đoạn code dưới đây:
``` CSharp

@model CascadingDropdownList.Models.CascadingViewmodel

@{
    ViewBag.Title = "Index";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<div class="form-horizontal">
    <h2>Cascading DropdownList</h2>
    <hr />
    <div class="form-group">
        @Html.LabelFor(model => model.CountryID, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.DropDownListFor(model => model.CountryID, new SelectList(Model.Countries,
    "CountryID", "NameOfCountry"), new { @class = "form-control" })
        </div>
    </div>

    <div class="form-group">
        @Html.LabelFor(model => model.CityID, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.DropDownListFor(model => model.CityID, new SelectList(Model.Cities,
    "CityID", "NameOfCity"), "Select your country", new { @class = "form-control"})
        </div>
    </div>
    <div class="form-group">
        @Html.LabelFor(model => model.DistrictID, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.DropDownListFor(model => model.DistrictID, new SelectList(Model.Districts,
    "DistrictID", "NameOfDistrict"), "Select your city", new { @class = "form-control" })
        </div>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function () {
        //Country select change
        $("#CountryID").change(() => {
            $("#CityID").empty();
            $.ajax({
                type: 'GET',
                url: '@Url.Action("GetCities")',
                dataType: 'json',
                data: { CountryID: $("#CountryID").val() },
                success: function (cities) {
                    $("#DistrictID").empty();
                    var CityID = cities.length > 0 ? cities[0].CityID : 0;
                    $.each(cities, function (i, city) {
                        $("#CityID").append('<option value="' + city.CityID + '">' +
                            city.NameOfCity + '</option>');
                    });
                    $.ajax({
                        type: 'GET',
                        url: '@Url.Action("GetDistricts")',
                        dataType: 'json',
                        data: { CityID: CityID },
                        success: function (districts) {
                            $.each(districts, (i, district) => {
                                $("#DistrictID").append('<option value="' + district.DistrictID + '">' +
                                    district.NameOfDistrict + '</option>');
                            });
                        },
                        error: function (ex) {
                            alert('Failed to retrueve states.' + ex);
                        }
                    });
                },
                error: function (ex) {
                    alert('Failed to retrieve states.' + ex);
                }
            });
        });

        //City select change
        $("#CityID").change(() => {
            $("#DistrictID").empty();
            $.ajax({
                type: 'GET',
                url: '@Url.Action("GetDistricts")',
                dataType: 'json',
                data: { CityID: $("#CityID").val() },
                success: function (districts) {
                    $.each(districts, (i, district) => {
                        $("#DistrictID").append('<option value="' + district.DistrictID + '">' +
                            district.NameOfDistrict + '</option>');
                    });
                },
                error: function (ex) {
                    alert('Failed to retrueve states.' + ex);
                }
            });
        });
    })
</script>

```
### Kết quả

![](https://images.viblo.asia/c129a36b-19cc-425b-bd27-4ad84e27366c.PNG)
Bạn có thể tham khảo bài viết này: [Creating Cascading DropDownList In MVC Using Entity Framework And ADO.NET](https://www.c-sharpcorner.com/article/creating-simple-cascading-dropdownlist-in-mvc/)

Chúc các bạn thành công!