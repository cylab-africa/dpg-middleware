# CMU Event Authenticator Frontend
This project is the application that plays as  

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

The application is hosted on AWS, and Elastic Kubernetes service is used to orchestrate the deployment. All deployment files are as on in [kubernetes-deployment.yaml](https://github.com/cylab-africa/dhis2-mosip-middleware/blob/main/kubernetes-deployment.yaml)
```bash
docker build -t ceb-frontend:lastest .
docker run -p 3005:3000 ceb-frontend:lastest 
```
[More Docker Help](https://docs.docker.com/build/)

## Wireframes
Before coding the pages, we first created the wireframes of our pages using [figma](https://www.figma.com/best-practices/guide-to-developer-handoff/components-styles-and-documentation/)
- You can find [wireframes here](https://www.figma.com/proto/B6A9J7UMatyxLzAWvwTnuU/MOSIP-Use-case-at-CMU?node-id=2%3A9&starting-point-node-id=2%3A9) 
