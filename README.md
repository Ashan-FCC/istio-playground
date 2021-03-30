## How to

1. Follow this guide until Deploy the Sample application section https://istio.io/latest/docs/setup/getting-started/
2. Create dev namespace `kubectl apply -f dev-ns.json`
3. Deploy the apps `kubectl apply -f kubernetes-manifest.yaml`
4. Create the gateway `kubectl apply -f gateways.yaml`
5. Create the virtual service `kubectl apply -f backend-virtual-service.yaml`
6. Create the envoy filter `kubectl apply -f envoy.yaml`
7. Follow the guide until `Next Steps` https://istio.io/latest/docs/setup/getting-started/#determining-the-ingress-ip-and-ports

So it seems we don't need to define a virtual service for the auth-verify application
as long as we don't have to expose it to outside traffic

