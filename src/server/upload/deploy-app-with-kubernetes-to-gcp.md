## Getting Start
In this article I will show you how to deploy a simple Go application that will consume a public Anime api called **Jikan**. The goal is to guide you through how to setup a kubernetes cluster on Google Cloud Platform and deploy an application there, so I won't go into details on how Go code work.

What you need to work along the way in this article is as follow:
- [Docker](https://docs.docker.com/engine/install/)
- [Kubernete](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Google Cloud CLI](https://cloud.google.com/sdk/install)
- [Go](https://golang.org/dl/)

## Prepare a Demo Project
As always the source code is available on my [github](https://github.com/PrinceNorin?tab=repositories) account and you can get it [here](https://github.com/PrinceNorin/jikan). Before we dive into the actual deployment, lets take a quick look at what our demo project does shall we?

Our demo project is called **Jikan**, it's an anime searching service which consume MyAnimeList public API named (you guess it) [Jikan](https://jikan.moe/). To consume service issue a GET request to the following endpoint

```SH
$ curl http://{server}/search?q={title}
```

Here is our main logic. Basically all it does is consume Jikan api, map response to our own type and return.

```Go
type service struct {
	http *http.Client
}

func (s *service) SearchAnime(query string) ([]*jikan.Anime, error) {
	res, err := s.http.Get(fmt.Sprintf(apiURL, query))
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	buf, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	var r jikanResult
	if err := json.Unmarshal(buf, &r); err != nil {
		return nil, err
	}

	animes := make([]*jikan.Anime, 1)
	for _, ja := range r.Results {
		status := "Finished"
		if ja.Airing {
			status = "Ongoing"
		}

		animes = append(animes, &jikan.Anime{
			MalURL:   ja.URL,
			ImageURL: ja.ImageURL,
			Title:    ja.Title,
			ShowType: ja.Type,
			Status:   status,
		})
	}

	return animes, nil
}
```

To run a project locally
```SH
$ go run github.com/PrinceNorin/jikan/cmd/http
```

## Packing Our App
The first step to deployment is to pack our application into a container. I want the image to be as small as possible so I picked **scratch** as base image. To summary what's going is we use multi-stage build. The first stage is to build our Go application into a binary file and then in the final stage copy that binary and execute it in an entrypoint.

```Dockerfile
FROM golang:1.13.5-alpine3.10 AS builder
LABEL builder=true

RUN mkdir /user && \
  echo 'nobody:x:65534:65534:nobody:/:' > /user/passwd && \
  echo 'nobody:x:65534:' > /user/group

WORKDIR /go/src/jikan

ADD go.mod go.sum ./
RUN go mod download

ADD . .
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -a -v -i -o /go/bin/jikan \
  -ldflags="-s -w -extldflags '-f no-PIC -static'" \
  -tags 'osusergo netgo static_build' \
  github.com/PrinceNorin/jikan/cmd/http

FROM scratch
LABEL builder=false

WORKDIR /app
COPY --from=builder /user/group /user/passwd /etc/
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /go/bin/jikan .

USER nobody:nobody
ENTRYPOINT ["/app/jikan"]
```

The resulting image is ~ 6MB
```SH
$ docker build -t norin/jikan:1.0.0 .
$ docker images | grep jikan
norin/jikan                1.0.0                     8cdcc06ede56        About an hour ago   6.04MB
```

Now push image to docker registry
```SH
$ docker login # enter credentials
$ docker push norin/jikan:1.0.0
```

## Define Kubernetes Deployment
The following will create a deployment name **jikan** that manage 4 replication of our apps which expose on container port `8080`. The image will be pull from my docker hub repository `norin/jikan:1.0.0`.

```YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jikan
  labels:
    app: jikan
spec:
  replicas: 4
  selector:
    matchLabels:
      app: jikan
  template:
    metadata:
      labels:
        app: jikan
    spec:
      containers:
      - name: jikan
        image: norin/jikan:1.0.0
        ports:
        - containerPort: 8080
```

Next we need a way to access our application from the web. There are many way to archive this but here I chose to create a **LoadBalancer**. It will distribute traffic it receive to service labeled with `app: jikan` and map to it port 8080.

```YAML
apiVersion: v1
kind: Service
metadata:
  name: jikan
  annotations:
    service.beta.kubernetes.io/linode-loadbalancer-throttle: "100"
    service.beta.kubernetes.io/linode-loadbalancer-default-protocol: "http"
  labels:
    app: jikan
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
    name: http
  selector:
    app: jikan
```

## Setup GCP Project & Cluster
The next task is to setup GCP project & cluster by run the following commands. The first command will authenticate and get access token needed to subsequence commands. Next will create a project name `Jikan Anime` with id `jikan-anime`. And finally we create a cluster name `jikan-anime` in Singapor. The last command switch kubernetes current context to our previous created cluster.

```SH
$ gcloud auth login # provide login credentials
$ gcloud gcloud projects create jikan-anime --name="Jikan Anime" --labels=type=jikan
$ gcloud config set project jikan-anime
$ gcloud container clusters create jikan-anime --zone=asia-southeast1-a
$ gcloud container clusters get-credentials jikan-anime --zone=asia-southeast1-a
```

## Deploy App to GCP
Last but not least it's time to deploy our application

```SH
$ kubectl apply -f k8s/deployment.yaml
$ kubectl get svc
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)        AGE
jikan        LoadBalancer   10.19.240.141   34.87.106.218   80:30523/TCP   97m
kubernetes   ClusterIP      10.19.240.1     <none>          443/TCP        115m
```
```SH
$ kubectl get pods
jikan-978fdb895-4jd47   1/1     Running   0          86m
jikan-978fdb895-5bnct   1/1     Running   0          86m
jikan-978fdb895-7mztx   1/1     Running   0          86m
jikan-978fdb895-znh7s   1/1     Running   0          86m
```

As you can see from the output 4 pods and 1 loadbalancer are created as defined in the spec.

### Testing
Try to search for anime title by issue a **GET** request to the following endpoint. Note the external ip from loadbalancer.

```SH
$ curl http://34.87.106.218/search?q=seishun
```

### Fix Bug
There is a bug in version 1.0.0 of our code, which didn't property escape the query string. Lets fix this and deploy the patch to production.

```Go
func (s *service) SearchAnime(query string) ([]*jikan.Anime, error) {
	res, err := s.http.Get(fmt.Sprintf(apiURL, url.QueryEscape(query)))
    // rest of the code
}
```

Rebuild image
```SH
$ docker build -t norin/jikan:1.0.1 .
$ docker push norin/jikan:1.0.1
```

Release patch to production and notice the finall pod image version
```SH
$ kubectl set image deployment/jikan jikan=norin/jikan:1.0.1 --record
$ kubectl rollout status deployment/jikan
$ kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
jikan-978fdb895-4jd47   1/1     Running   0          97m
jikan-978fdb895-5bnct   1/1     Running   0          97m
jikan-978fdb895-7mztx   1/1     Running   0          97m
jikan-978fdb895-znh7s   1/1     Running   0          97m
$ kubectl describe pod jikan-978fdb895-4jd47 | grep Image
Image:          norin/jikan:1.0.1
Image ID:       docker-pullable://norin/jikan@sha256:a1b48661e08183a0f8bc7a13c88369ff81c49a50d1ee74908c8a13a25c7f1354
```