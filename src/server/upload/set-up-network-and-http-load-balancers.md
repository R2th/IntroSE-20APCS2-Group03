# 1. Overview
There are two types of [load balancers in Google Cloud Platform](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling#network_load_balancing):
* [Network Load Balancer](https://cloud.google.com/compute/docs/load-balancing/network/)
* [HTTP(s) Load Balancer](https://cloud.google.com/compute/docs/load-balancing/http/)
# 2. Create multiple web server instances
To simulate serving from a cluster of machines, we'll create a simple cluster of Nginx web servers that will serve static content using [Instance Templates](https://cloud.google.com/compute/docs/instance-templates) and [Managed Instance Groups](https://cloud.google.com/compute/docs/instance-groups/). Instance Templates lets you to define what every virtual machine in the cluster will look like (disk, CPUs, memory, etc), and a Managed Instance Group instantiates a number of virtual machine instances for you using the Instance Template.

To use Google Cloud Shell:

Go to the [Google Cloud Platform Console](https://console.cloud.google.com/).

Click the **Activate Google Cloud Shell** button at the top of the console window.

![](https://images.viblo.asia/a70ace96-1d52-47f3-94f3-2b8f6706a6e7.png)

A Cloud Shell session opens inside a new frame at the bottom of the console and displays a command-line prompt.

![](https://images.viblo.asia/991bdef6-18bb-4b9c-9d6e-a3c204ee00da.png)

First, create a startup script that will be used by every virtual machine instance to setup Nginx server upon startup:

![](https://images.viblo.asia/df243bff-60d0-456e-a99d-989b0fd05b4c.png)

Second, create an instance template that will use the startup script:

![](https://images.viblo.asia/52a98005-4179-4162-bbf7-74585d95a13b.png)

Third, let's create a target pool. A target pool allows us to have a single access point to all the instances in a group and is necessary for load balancing in the future steps.

![](https://images.viblo.asia/a2a7fdd9-bd4f-4a62-bb09-363af3e86304.png)

Finally, create a managed instance group using the instance template:

![](https://images.viblo.asia/20eaf682-9264-41eb-87ff-1fba404b8793.png)

Output:

![](https://images.viblo.asia/bfd26fa5-b6ee-493d-b779-02a7809ea8f4.png)

You can **delete** instance-groups if want change something by statement:

`gcloud compute instance-groups managed delete NAMES [NAMES …] [--region=REGION| --zone=ZONE] [GCLOUD_WIDE_FLAG …]`

**NAME**: The name of the managed instance group to operate on.

**Example**: Above, I have instances-group with name is **nginx-group**, region is **asia-east1** then my syntax is used to delete instance groups :

![](https://images.viblo.asia/562e59d2-187b-4b6e-96e7-e384be7d3cd2.png)

**Output**:

![](https://images.viblo.asia/7bed37c9-a8bd-4d8c-bffa-1fa6de43d346.png)

This will create 2 virtual machine instances with names that are prefixed with nginx-. This may take a couple of minutes. And to get list the compute engine instances and you should see all of the instances created:

![](https://images.viblo.asia/b380f835-9b34-4825-a9c1-f3920250c976.png)

The number VM created are 2 machine nginx server because parameter rule **--size 2**

![](https://images.viblo.asia/afbc83e6-7e96-462e-b12b-16546c758ff2.png)

If i create VM with **--size 3**, it will have result 3 VM Nginx server the following below:

![](https://images.viblo.asia/46db4e15-a685-4e54-b546-8419a88522ac.png)

List the compute engine instances and you should see all of the instances created!

`gcloud compute instances list`

![](https://images.viblo.asia/3360859f-d047-4032-89bb-4540950e2040.png)

Now configure a firewall so that you can connect to the machines on port 80 via the **EXTERNAL_IP** addresses:

`gcloud compute firewall-rules create www-firewall --allow tcp:80`

![](https://images.viblo.asia/152e00c2-b352-4223-b5ca-0d3224a3b1a3.png)

Output :

![](https://images.viblo.asia/48b34b5b-a01a-4e3c-aa50-59de212977c6.png)

You should be able to connect to each of the instances via their external IP addresses via **http://EXTERNAL_IP/** shown as the result of running the previous command.

if you want to **delete** Google Compute Engine **firewall** rules, you can use the following below:

`gcloud compute firewall-rules delete   NAME [NAME …] [GCLOUD_WIDE_FLAG …]`

![](https://images.viblo.asia/6fcc29c6-f6a2-48b9-8155-ee610d7cc5f9.png)
# 3. Create a Network Load Balancer
Network load balancing allows you to balance load of your systems based on incoming IP protocol data, such as address, port, and protocol type.

For example, you can load balance additional TCP/UDP-based protocols such as SMTP traffic. And if your application is interested in TCP-connection-related characteristics, network load balancing allows your app to inspect the packets, where HTTP(S) load balancing does not.

Let's create a layer 3 network load balancer targeting our instance group:

![](https://images.viblo.asia/9b5762f9-cfd1-43f6-9e7b-e909faa6a876.png)

List all Google Compute Engine forwarding rule in your project:

![](https://images.viblo.asia/1217fe12-f5e8-42d6-8c92-89a6806ecfeb.png)

You can then visit the load balancer from the browser **http://IP_ADDRESS/** where **IP_ADDRESS** is the address shown as the result of running the previous command.

![](https://images.viblo.asia/d26e28fc-6fff-45b5-be0c-f7b9cf07567d.png)

You can delete layer 3 network load balancer if you want to change something by statement:

`gcloud compute forwarding-rules delete NAME [NAME ...] [--global     | --region=REGION]  [GCLOUD_WIDE_FLAG …]`

![](https://images.viblo.asia/94787681-926e-4667-aaba-ca0f12c6b772.png)

Output: 

![](https://images.viblo.asia/60b18ec8-11d8-4894-a477-cd80b605d7d8.png)
# 4. Create a HTTP(s) Load Balancer
HTTP(S) load balancing provides global load balancing for HTTP(S) requests destined for your instances. You can configure URL rules that route some URLs to one set of instances and route other URLs to other instances. Requests are always routed to the instance group that is closest to the user, provided that group has enough capacity and is appropriate for the request. If the closest group does not have enough capacity, the request is sent to the closest group that does have capacity.

First, create a [health check](https://cloud.google.com/compute/docs/load-balancing/health-checks). Health checks verify that the instance is responding to HTTP or HTTPS traffic:

`gcloud compute http-health-checks create http-basic-check`

![](https://images.viblo.asia/9210789d-9985-4650-8197-b45b95da86e5.png)

Define an HTTP service and map a port name to the relevant port for the instance group. Now the load balancing service can forward traffic to the named port:

```
gcloud compute instance-groups managed \ 
         set-named-ports nginx-group \ 
         --named-ports http:80
```

![](https://images.viblo.asia/c08874c7-8df5-427f-8c11-2a05ad6a874e.png)

Create a [backend service](https://cloud.google.com/compute/docs/reference/latest/backendServices):

```
gcloud compute backend-services create nginx-backend \ 
           --protocol HTTP --http-health-checks http-basic-check --global
```

![](https://images.viblo.asia/e542ce93-e9a6-4fd6-bdfe-a4520ebac528.png)

Add the instance group into the backend service:

Make sure to replace zone (If you are using different zone)

```
gcloud compute backend-services add-backend nginx-backend \
    --instance-group nginx-group \
    --instance-group-zone us-central1-a \
    --global  
```

Illustrator image:

![](https://images.viblo.asia/76fae041-2422-41d7-990a-c4f4ed291780.png)

The application in a group must same zone:

![](https://images.viblo.asia/7835e97c-1159-4b4b-9795-a8b6d2389ebb.png)

Unless application same zone, it won't add the instance group into the backend service:

![](https://images.viblo.asia/f0677917-25d1-4b3a-a737-d2e791ff5f1d.png)

We continue creating a default URL map that directs all incoming requests to all your instances:

```
gcloud compute url-maps create web-map \ 
       --default-service nginx-backend
```

![](https://images.viblo.asia/ab302ad9-c44d-412a-80ed-01bf60357cb9.png)

To direct traffic to different instances based on the URL being requested, see [content-based routing](https://cloud.google.com/compute/docs/load-balancing/http/content-based-example).

Create a target HTTP proxy to route requests to your URL map:

```
gcloud compute target-http-proxies create http-lb-proxy \
    --url-map web-map
```

Output:

![](https://images.viblo.asia/d0b60cb3-8c91-4cb2-846c-e3513dd60704.png)

Create a global forwarding rule to handle and route incoming requests. A forwarding rule sends traffic to a specific target HTTP or HTTPS proxy depending on the IP address, IP protocol, and port specified. The global forwarding rule does not support multiple ports.

```
gcloud compute forwarding-rules create http-content-rule \ 
                --global \ 
                --target-http-proxy http-lb-proxy \ 
                --ports 80
```

Output:

![](https://images.viblo.asia/9be6418e-91ca-4b98-a129-a45f35d10c09.png)

After creating the global forwarding rule, it can take several minutes for your configuration to propagate.

`gcloud compute forwarding-rules list`

![](https://images.viblo.asia/96b60b5b-9377-408a-8ef9-17015b325fab.png)

Take note of the http-content-rule **IP_ADDRESS** for the forwarding rule.

From the browser, you should be able to connect to **http://IP_ADDRESS/**.

![](https://images.viblo.asia/13754964-1b02-4851-83e4-bc21bdff664f.png)
# 5. References document:

[1] Set Up Network and HTTP Load Balancers:  https://qwiklabs.com

[2] Load Balancing: https://cloud.google.com/compute/docs/load-balancing/