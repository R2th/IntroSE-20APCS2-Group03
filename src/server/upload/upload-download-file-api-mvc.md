# 1. ##  Upload File
 ```csharp

        ////Upload
        [HttpPost]
        public JsonResult UpFile()
        {

            if (Request.Files.Count == 0 || Request.Files[0] == null)
            {
                return Json(new { status = 0, message = "Not fle to upload" });
            }
            HttpPostedFileBase file = Request.Files[0];

            string filename = "mynamefile";///name file save

            try
            {
                if (Request == null)
                {
                    return null;
                }

                //Path to save file
                var dpath = Server.MapPath("~/Upload");
                var postedFile = file;
                if (postedFile != null)
                {
                    if (!Directory.Exists(dpath))
                    {
                        Directory.CreateDirectory(dpath);
                    }
                    string ext = Path.GetExtension(postedFile.FileName);
                    if (!String.IsNullOrEmpty(ext))
                    {
                        filename += ext; ///EX: "namefile.pdf"
                        postedFile.SaveAs(dpath + "/" + filename);
                    }
                }
            }
            catch (Exception)
            {
                filename = "";
                return Json(new { data = filename, status = 0, message = "Err" });
            }

            return Json(new { data = filename, status = 1, message = "OK" });
        }
```

 # 2. ##  Download File

<!--HTML-->.
 <a href="/MyController/DownloadFile/{{Item.NameFile}}" target="_blank" class="bold form-control-static font-blue-hoki">
                                {{Item.NameFile}}
                            </a>
 <!--HTML-->.

```         
         ///code C# Downloadfile
        [HttpGet]
        public ActionResult DownloadFile(string namefile)
        {
            string nameDisplay = "";//name replace
            HttpRequestMessage request = new HttpRequestMessage();
            try
            {

                string baseFolder = "~/Upload";///path 
                string[] sElement = namefile.Split('.');
                int vt = sElement.Length - 1;

                nameDisplay +=   "." + sElement[vt];
                if (!string.IsNullOrEmpty(fileName))
                {

                    string path = Server.MapPath(baseFolder + fileName);
                    var bytes = System.IO.File.ReadAllBytes(path);

                    return File(bytes, "application/octet-stream", nameDisplay);
                }

                return Content("File not found");
            }
            catch (Exception)
            {
                return Content("Download Err");
            }
        }
```