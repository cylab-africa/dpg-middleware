# CMU Event Authenticator Frontend
This project is the application that plays as the middleware between DHIS2  and MOSIP DPGs application to allow their interoperability. This application has frontend tier and backend tier and are all built in JS using [NextJs framework](https://nextjs.org/learn/basics/create-nextjs-app).

The backend of the application provides av endpoint to be consumed by DHIS2 system while generating URL to open the middleware. You will see the endpoint in API Documentation

## Getting Started

First, run the development server:

```bash
npm run dev
# or 
yarn dev
```

## How to run the application
- Open [http://localhost:3005](http://localhost:3005) with your browser to run the middleware application locally.
- Open [https://middleware.mosipcmuafrica.me](https://middleware.mosipcmuafrica.me/) 
with your browser to run the deployed version online

## Deployment
To deploy this project you can use the [Dockerfile](https://github.com/cylab-africa/dhis2-mosip-middleware/blob/main/Dockerfile) in the repository to create a new docker image.

The application is hosted on AWS, and Elastic Kubernetes service(EKS) is used to orchestrate the deployment. All deployment files are as on in [kubernetes-deployment.yaml](https://github.com/cylab-africa/dhis2-mosip-middleware/blob/main/kubernetes-deployment.yaml).

[More EKS Help](https://aws.amazon.com/eks/)

```bash
docker build -t dhis2-mosip-middleware:lastest .
docker run -p 3005:3000 dhis2-mosip-middleware:lastest 
```
[More Docker Help](https://docs.docker.com/build/)

## Wireframes
Before coding the pages, we first created the wireframes of our pages using [figma](https://www.figma.com/best-practices/guide-to-developer-handoff/components-styles-and-documentation/)
- You can find [wireframes here](https://www.figma.com/proto/B6A9J7UMatyxLzAWvwTnuU/MOSIP-Use-case-at-CMU?node-id=2%3A9&starting-point-node-id=2%3A9) 
