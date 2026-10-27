$ErrorActionPreference = "Stop"

Write-Host "Building backend image..."
docker build -t ecommerce-backend:latest ./backend

Write-Host "Building frontend image..."
docker build -t ecommerce-frontend:latest ./frontend

Write-Host "Loading images into kind..."
kind load docker-image ecommerce-backend:latest --name ecommerce
kind load docker-image ecommerce-frontend:latest --name ecommerce

Write-Host "Applying Kubernetes configurations..."
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

Write-Host "Checking deployments..."
kubectl rollout status deployment/ecommerce-backend
kubectl rollout status deployment/ecommerce-frontend

Write-Host "Deployment complete!"
kubectl get pods
kubectl get services