# 1. Overview

Kubernetes is an open source project (available on kubernetes.io) which can run on many different environments, from laptops to high-availability multi-node clusters; from public clouds to on-premise deployments; from virtual machines to bare metal.

# 2. Objectives

  To package and deploy your application on Kubernetes Engine, you must:

* Package your app into a Docker image
* Run the container locally on your machine (optional)
* Upload the image to a registry
* Create a container cluster
* Deploy your app to the cluster
* Expose your app to the Internet
* Scale up your deployment
* Deploy a new version of your app

# 3. Practice demo

3.1.  Package your app into a Docker image

To use Google Cloud Shell:

Go to the [Google Cloud Platform Console](https://console.cloud.google.com/).

Click the **Activate Google Cloud Shell** button at the top of the console window.

![](https://images.viblo.asia/72f30875-5bd1-4535-85e0-fdb2ff211e04.png)

A Cloud Shell session opens inside a new frame at the bottom of the console and displays a command-line prompt.

![](https://images.viblo.asia/8b574724-85b9-4d45-9c87-099c973c2ecc.png)

* Create your Node.js application

![](https://images.viblo.asia/69a24f0b-08a0-4b11-877c-be5e2058e193.png)

![](https://images.viblo.asia/1d6e2113-3f20-4ea1-9388-df346c9e976c.png)

* Create a Docker container image

Next, create a **Dockerfile** which describes the image that you want to build. Docker container images can extend from other existing images, so for this image, we'll extend from an existing Node image.

![](https://images.viblo.asia/27ab0a31-e31b-4609-bfd8-9141aaaa30af.png)

Start the editor.

![](https://images.viblo.asia/dfb4a8f2-2b7e-49d4-9b9c-b8d714ff518b.png)

Add this content :

![](https://images.viblo.asia/d7f088ce-7cdb-4610-bf88-c6ce3d13d8ca.png)

Save this **Dockerfile**:

![](https://images.viblo.asia/0e084902-28c9-47f3-9836-b80dfb3c9b44.png)

Build the image with the following, replace **PROJECT_ID** with your lab project ID, found in the console:

**docker build -t gcr.io/PROJECT_ID/hello-node:v1 .**

![](https://images.viblo.asia/6284626a-a471-4ef4-8f99-ae096c6d2738.png)

3.2. Run the container locally on your machine (optional)

Run a Docker container as a daemon on port 8080 from our newly-created container image:

**docker run -d -p 8080:8080 gcr.io/PROJECT_ID/hello-node:v1**

Output look something like this:

![](https://images.viblo.asia/412070a1-89e9-4774-b23d-b2b5dd2999e3.png)

Take advantage of the Web preview feature of cloud shell to see your results:

![](https://images.viblo.asia/32ec4f22-574e-43d9-a61e-a9489221e076.png)

Or use **curl** or **wget** from your Cloud Shell prompt:

**curl http://localhost:8080**

This is the output you should see :

Hello World!

3.3. Upload the image to a registry

Make sure to replace PROJECT_ID with your lab project ID, found in the console

**gcloud docker -- push gcr.io/PROJECT_ID/hello-node:v1**

The initial push may take a few minutes to complete. You'll see the progress bars as it builds.

![](https://images.viblo.asia/5518697f-b52b-4729-93ad-9a644b260c8b.png)

The container image will be listed in your Console: **Tools > Container Registry**. Now you have a project-wide Docker image available, which Kubernetes can access and orchestrate.

![](https://images.viblo.asia/005d001a-929c-45c7-8182-f00b95c9aa01.png)

3.4. Create a container cluster

Now you're ready to create your Container Engine cluster. A cluster consists of a Kubernetes master API server hosted by Google and a set of worker nodes. The worker nodes are Compute Engine virtual machines.

Navigate to the **Kubernetes clusters** section of the console and wait for the system to initialize (it should only take a few seconds).

![](https://images.viblo.asia/f5c8ced3-3eb2-4242-9e53-d483a8dbbfc7.png)

![](https://images.viblo.asia/764cbfff-8542-484a-868a-453277649116.png)

Create a cluster with two **n1-standard-1** nodes (this will take a few minutes to complete):

**gcloud container clusters create hello-world \
          --num-nodes 2 \
         --machine-type n1-standard-1 \
         --zone us-central1-f**

![](https://images.viblo.asia/12502633-2206-4630-9e5c-2e81eb829ba1.png)

The console output should look like this:

![](https://images.viblo.asia/7c4f57e2-a084-41be-928c-a0decfdcb1f8.png)


You can also create this cluster through the Console, image shown above: **Kubernetes Engine > Kubernetes clusters > Create cluster**.

Now you have a fully-functioning Kubernetes cluster powered by **Kubernetes Engine**:

![](https://images.viblo.asia/5e35df72-a0c5-4d12-9ce5-1a1ee1287e69.png)

3.5. Deploy your app to the cluster

To deploy and manage applications on a Kubernetes Engine cluster, you must communicate with the Kubernetes cluster management system. You typically do this by using the kubectl command-line tool.

A Kubernetes pod is a group of containers tied together for administration and networking purposes. It can contain single or multiple containers. Here we'll use one container built with your Node.js image stored in our private container registry. It will serve content on port 8080:

**kubectl run hello-node \
    --image=gcr.io/PROJECT_ID/hello-node:v1 \
    --port=8080**

![](https://images.viblo.asia/5072d792-70a2-47b5-9dfd-caf160be85fb.png)

3.6. Expose your app to the Internet

By default, the pod is only accessible by its internal IP within the cluster. In order to make the **hello-node** container accessible from outside the Kubernetes virtual network, you have to expose the pod as a **Kubernetes service**.

From Cloud Shell we can expose the pod to the public internet with the **kubectl expose** command combined with the **--type="LoadBalancer"** flag. This flag is required for the creation of an externally accessible IP:

![](https://images.viblo.asia/be9ce05b-8a1d-47e0-98e8-2ad11572beab.png)

To find the publicly-accessible IP address of the service, request **kubectl** to list all the cluster services:

![](https://images.viblo.asia/b1254c68-7ab0-497f-a386-76bd9dd7b5b7.png)

The EXTERNAL-IP may take several minutes to become available and visible. If the EXTERNAL-IP is missing, wait a few minutes and try again.

You should now be able to reach the service by pointing your browser to this address: http://<EXTERNAL_IP>:8080

![](https://images.viblo.asia/8a83f09f-aafb-4f90-aaa3-41de478f01f0.png)

3.7. Scale up your deployment

One of the powerful features offered by Kubernetes is how easy it is to scale your application. Suppose you suddenly need more capacity for your application. You can tell the replication controller to manage a new number of replicas for your pod:

![](https://images.viblo.asia/b3df420b-d1d9-4feb-b41b-d8191918dc59.png)

You can request a description of the updated deployment :

![](https://images.viblo.asia/ba2401fb-2803-4e29-9cf8-426fdd4e1107.png)

You can also list the all pods :

![](https://images.viblo.asia/3e751887-b659-4887-89ec-00865957cca7.png)

3.8. Deploy a new version of your app

At some point the application that you've deployed to production will require bug fixes or additional features. Kubernetes helps you deploy a new version to production without impacting your users.

First, let's modify the application. Edit the server.js by starting the editor:

![](https://images.viblo.asia/7dcc1152-3ef4-4a15-b47a-00413fb3f526.png)
![](https://images.viblo.asia/6a0fc6fe-47e0-4f70-92fe-1a4e7da9b0c7.png)

Now we can build and publish a new container image to the registry with an incremented tag (v2 in this case):

Make sure to replace **PROJECT_ID** with your lab project ID, found in the Console and done sequence 2 steps:

![](https://images.viblo.asia/2b3523df-82ce-4e82-8fb5-3fbde678f6c8.png)
![](https://images.viblo.asia/81856127-4a2e-4b70-8698-fb17e9ce83b0.png)

Building and pushing this updated image should be quicker as we take full advantage of caching.

Kubernetes will smoothly update our replication controller to the new version of the application. In order to change the image label for our running container, we will need to edit the existing **hello-node deployment** and change the image from **gcr.io/PROJECT_ID/hello-node:v1** to **gcr.io/PROJECT_ID/hello-node:v2**

To do this, use the **kubectl edit** command. It opens a text editor displaying the full deployment yaml configuration. It isn't necessary to understand the full yaml config right now, just understand that by updating the **spec.template.spec.containers.image** field in the config we are telling the deployment to update the pods with the new image:

**kubectl edit deployment hello-node**

Edit **/tmp/kubectl-edit-fplln.yaml** file

![](https://images.viblo.asia/f4b70191-bcab-44ef-a03b-0be7f17dcb19.png)

Change old line: **image: get.io/demovmvn1/hello-node:v1** to  **image: get.io/demovmvn1/hello-node:v2**

After making the change, save and close this file:

:wq

This is the output you should see:

![](https://images.viblo.asia/0cd159ad-a0e2-464c-b04e-e94202ec16da.png)

Open browser to watch result:

![](https://images.viblo.asia/2dc87805-6efc-43e1-adc5-ac319363504f.png)

# 4. Reference document:

[1] Deploying a containerized web application: https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app