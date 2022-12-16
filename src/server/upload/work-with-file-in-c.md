## 1.  Write Log To File 

```
 public static void WriteLogToFile(string namefile,string noidung = "")
        {
            try
            {
                string Base_Path = "/Log";
                String pathCheck = HttpContext.Current.Server.MapPath(Base_Path);
                if (!Directory.Exists(pathCheck)) //tạo thư mục nếu chưa có
                    Directory.CreateDirectory(pathCheck);
                Base_Path = "/Log/" + namefile;
                String path = HttpContext.Current.Server.MapPath(Base_Path);
                if (!File.Exists(path))
                {
                    File.CreateText(path);
                }
                
                Stream stream = File.Open(path, FileMode.Append, FileAccess.Write, FileShare.Write);
                
                using (StreamWriter outputFile = new StreamWriter(stream))
                {
                   
                    DateTime now = DateTime.Now;
                    string code ="#REGION"+ now.Ticks.ToString();
                    outputFile.WriteLine($"=============BEGIN {code} ===========");
                    outputFile.WriteLine(noidung);
                    outputFile.WriteLine($"=============END {code} ===========");
                    
                }
                stream.Close();
            }
            catch(Exception ex)
            {
                string mex = ex.Message;
            }
        }
```
## 2. Check extention of file
```

        public static string[] ExtensionVideo { get { return new string[] {"mp4","mov","avi","gif", "mpeg","flv","wmv","divx","mkv","rmvb","dvd", "3gp", "webm" }; } }
        public static string[] ExtensionImg { get { return new string[] { "png", "jpg" ,"jpeg"}; } }
        public static string[] Extensionfile { get { return new string[] { "xls", "xlsx", "doc", "docx", "pdf" }; } }
public static TypeModel KiemTraEx(string Ex_)//Kiểm tra quyền
        {
            TypeModel role = new TypeModel();
            Ex_ = Ex_.ToLower();
            if (!string.IsNullOrEmpty(Ex_))
            {
                for (int i = 0; i < Assets.Constant.ExtensionVideo.Length; i++)
                {
                    if (Assets.Constant.ExtensionVideo[i] == Ex_.Trim())
                    {
                        role.ex = "." + Assets.Constant.ExtensionVideo[i];
                        role.type =0;
                        return role;
                    }
                }
                for (int i = 0; i < Assets.Constant.ExtensionImg.Length; i++)
                {
                    if (Assets.Constant.ExtensionImg[i] == Ex_.Trim())
                    {
                        role.ex = "." + Assets.Constant.ExtensionImg[i];
                        role.type = 1;
                        return role;
                    }
                }
                for (int i = 0; i < Assets.Constant.Extensionfile.Length; i++)
                {
                    if (Assets.Constant.Extensionfile[i] == Ex_.Trim())
                    {
                        role.ex = "." + Assets.Constant.Extensionfile[i];
                        role.type = 2;
                        return role;
                    }
                }
            }
            return role;
        }
```
## 3. Convert Base64 To Image

```
public static Image Base64ToImage(string base64String)
        {
            //string base64String = FrontEnd.Classes.Commons.RemoveSpecialCharacters(base64String1);
            // Convert Base64 String to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);
            Bitmap tempBmp;
            using (MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                // Convert byte[] to Image
                ms.Write(imageBytes, 0, imageBytes.Length);
                using (Image image = Image.FromStream(ms, true))
                {
                    //Create another object image for dispose old image handler
                    tempBmp = new Bitmap(image.Width, image.Height);
                    Graphics g = Graphics.FromImage(tempBmp);
                    g.DrawImage(image, 0, 0, image.Width, image.Height);
                }
            }
            return tempBmp;
        }
```

## 4. Convert Image To Base64
```
 public static string ImageToBase64(Image image, ImageFormat format)
        {
            string base64String;
            using (MemoryStream ms = new MemoryStream())
            {
                // Convert Image to byte[]
                image.Save(ms, format);
                ms.Position = 0;
                byte[] imageBytes = ms.ToArray();

                // Convert byte[] to Base64 String
                base64String = Convert.ToBase64String(imageBytes);
            }
            return base64String;
        }

```
## 5 Rename File And Folder In Folder
```

        public void RenameFileAndFolderInFolder(string path,string key,string ne)
        {
            string pa = @"D:\PROJECT\PRO\Halo\Code\halo-main\FrontEnd\AppAngular\AngularSrc\src\app\views\pages\Halo"+ path;
            DirectoryInfo d = new DirectoryInfo(pa);
            DirectoryInfo[] dinfos= d.GetDirectories();
            foreach (DirectoryInfo di in dinfos)
            {
                System.IO.Directory.Move(di.FullName, di.FullName.Replace(key, ne));
            }

            FileInfo[] infos = d.GetFiles(".", SearchOption.AllDirectories);
            foreach (FileInfo f in infos)
            {
                if (f.Name.Contains(key))
                {
                    System.IO.File.Move(f.FullName, f.FullName.Replace(key, ne));
                }

            }
            
        }
```
-----CONTINUTE----