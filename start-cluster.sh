set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting Kubernetes cluster (if not running)..."

minikube start

echo "Waiting for Kubernetes API server to be ready..."
while ! kubectl get nodes &> /dev/null; do
  sleep 1
done

echo "Kubernetes cluster is ready!"

echo "Applying secrets first..."

kubectl apply -f "$SCRIPT_DIR/k8s/backend-secret.yml"
kubectl apply -f "$SCRIPT_DIR/k8s/migration-secret.yml"
kubectl apply -f "$SCRIPT_DIR/k8s/postgres-secret.yml"

echo "Secrets applied."

echo "Applying other Kubernetes resources..."

kubectl apply -f "$SCRIPT_DIR/k8s/backend-deployment.yml"
kubectl apply -f "$SCRIPT_DIR/k8s/backend-service.yml"
kubectl apply -f "$SCRIPT_DIR/k8s/postgres-deployment.yml"
kubectl apply -f "$SCRIPT_DIR/k8s/postgres-service.yml"
kubectl apply -f "$SCRIPT_DIR/k8s/prisma-migrations.yml"

echo "All Kubernetes resources applied successfully!"

echo "Setting up port-forward to backend service on port 3000..."
kubectl port-forward svc/backend-service 3000:3000
