In the previous part we've put together on how to create, update & delete database record as well as handled request validation and form binding. In this part we'll take a look on another important feature; file upload. What we want to achieve is to be able to support local file upload in development and upload to S3 in production. Let's take a look on how to do that.

### Uploader Interface
To be able to switch implementation in different environment we need to define a contract and we can do that using **interface** in golang. Our **Uploader** interface will has two methods, one is to upload file and the other is to retrieve the url to that file. **Upload** takes a file upload and expect to return a **key** identifier to the file on success and an error when something goes wrong. **Url** on the other hand takes a **key** and expect to return accessible url to the file if file exist or otherwise return an error.

```Go
type Uploader interface {
	Url(key string) (string, error)
	Upload(file *multipart.FileHeader) (string, error)
}
```

### Local Adapter
For the local file the implementation is straight forward. We construct a file path using a pre-configure directory base path and replace a filename with a random string and simply copy the uploaded file to that location. The identifier for this adapter is the local filepath so **Url** method simple give back that to the caller.

```Go
type LocalUploader struct{}

func (u *LocalUploader) Upload(file *multipart.FileHeader) (string, error) {
	ext := filepath.Ext(file.Filename)
	path := filepath.Join(
		config.Get().Upload.Dir,
		fmt.Sprintf("%s%s", rand.RandString(16), ext),
	)
	src, err := file.Open()
	if err != nil {
		return "", nil
	}
	defer src.Close()

	dest, _ := os.Create(path)
	if err != nil {
		return "", nil
	}
	defer dest.Close()
	io.Copy(dest, src)

	return path, nil
}

func (u *LocalUploader) Url(key string) (string, error) {
	return key, nil
}
```

### S3 Adapter
For S3 adapter there is a bit more involve. First we need to do some setup to get AWS service up and running. To do that we need to pull in [aws-sdk-go](https://github.com/aws/aws-sdk-go) package and configure it with our s3 credentials.

#### Configure S3
To instantiate **s3** service first we need to create an authorize **session** that configure with our aws credentials. We do that with the line `session.Must(session.NewSession())`. The initial credentials will be loaded from SDK's default credential chain with the following order:

1. Environment variable: `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY`
2. Shared credentials file located in `~/.aws/credentials`
3. If your application is running on an Amazon EC2 instance, IAM role for Amazon EC2.

In my case I used shared credentials files. Next we create an s3 service with the aforementioned session and set our s3 region, which was set in environment variable. Then we create an **AwsUploader** passing in that service along with s3 bucket which ofcourse was set in environment variable as well.
Note that the return type of the function is the **Uploader** interface NOT **AwsUploader**.

```Go
import (
    "github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

type AwsUploader struct {
	svc    *s3.S3
	bucket *string
}

func NewAwsUploader() Uploader {
    sess := session.Must(session.NewSession())
    svc := s3.New(sess, &aws.Config{
        Region: aws.String(os.Getenv("AWS_REGION")),
    })
    
    return &AwsUploader{svc, aws.String(os.Getenv("AWS_BUCKET"))}
}
```

#### Adapter Implementation
Again first we generate a unique key using random string generator (which we will take a look shortly) then we populate a request body from file content and use s3 service, which is a field, to upload the file to our cloud sotrage. If everything success then we return our generated key otherwise return an error. Since by default our uploaded will have **private** permission we need to create a signed url to be able to access that file in public. To create a signed url we create a **GetObjectRequest** passed in **bucket** and the file **key** then we call **Presign** method passed in expiration duration.

```Go
func (u *AwsUploader) Upload(file *multipart.FileHeader) (string, error) {
	ext := filepath.Ext(file.Filename)
	key := fmt.Sprintf("%s%s", rand.RandString(16), ext)
	src, err := file.Open()
	if err != nil {
		return "", nil
	}
	defer src.Close()

	buffer := make([]byte, file.Size)
	src.Read(buffer)

	fileBytes := bytes.NewReader(buffer)
	fileType := http.DetectContentType(buffer)
	params := &s3.PutObjectInput{
		Key:           aws.String(key),
		Body:          fileBytes,
		ContentLength: aws.Int64(file.Size),
		ContentType:   aws.String(fileType),
		Bucket:        u.bucket,
	}

	_, err = u.svc.PutObject(params)
	if err != nil {
		return "", err
	}

	return key, nil
}

func (u *AwsUploader) Url(key string) (string, error) {
	req, _ := u.svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: u.bucket,
		Key:    aws.String(key),
	})

	url, err := req.Presign(30 * time.Minute)
	if err != nil {
		return "", err
	}

	return url, nil
}
```

### Uploader Factory
To instantiate correct uploader base on each environment we create a factory function for this purpose. Then some where in our code we can call this factory function and get the correct uploader.

```Go
func NewUploader() Uploader {
	if config.Get().Env == "production" {
		return NewAwsUploader()
	} else {
		return NewLocalUploader()
	}
}
```

### Custom Model Marshalling
Currently if we make a request our api endpoint the resulting json for file upload will output only identifier key to fix that we need a custom marshaling function. Go has a **json.Marshaler** interface that we can implement to get the job done lets take a look.

```Go
type MangaJSON struct {
	Model

	Themes []Theme `json:"themes" gorm:"many2many:manga_themes"`

	Title       string     `json:"title" gorm:"not null"`
	Desc        string     `json:"desc"`
	Cover       string     `json:"cover"`
	Wallpaper   string     `json:"wallpaper"`
	Status      string     `json:"status"`
	PublishedAt *time.Time `json:"publishedAt"`
}

func (m *Manga) MarshalJSON() ([]byte, error) {
	mangaJson := &MangaJSON{
		Model: Model{
			ID:        m.ID,
			CreatedAt: m.CreatedAt,
			UpdatedAt: m.UpdatedAt,
		},
		Title:       m.Title,
		Desc:        m.Desc,
		Status:      m.Status,
		PublishedAt: m.PublishedAt,
		Themes:      m.Themes,
	}

	svc := uploader.NewUploader()
	if m.Cover != "" {
		url, err := svc.Url(m.Cover)
		if err != nil {
			return nil, err
		}
		mangaJson.Cover = url
	}

	if m.Wallpaper != "" {
		url, err := svc.Url(m.Wallpaper)
		if err != nil {
			return nil, err
		}
		mangaJson.Wallpaper = url
	}

	return json.Marshal(mangaJson)
}
```

You may notice that we introduced a new type called **MangaJSON**. The reason is because if we were to call **json.Marshal** on **Manga** model it will cause infinite loop so a new type is there to prevent that.<br /><br />

With all these setup our api now support file upload. I hope you guys fine this helpful!