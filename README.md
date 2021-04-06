[![Board Status](https://dev.azure.com/nawinperera/cf0f20a3-471e-4056-bed2-06998e6ebe55/517070ce-399d-42c7-af33-a11bb4c03e9a/_apis/work/boardbadge/6e051ca8-e109-4fd4-9cba-0d91c6fa3bfc)](https://dev.azure.com/nawinperera/cf0f20a3-471e-4056-bed2-06998e6ebe55/_boards/board/t/517070ce-399d-42c7-af33-a11bb4c03e9a/Microsoft.RequirementCategory)
## How to
Assumes you have a minikube running on your local machine.
1. Follow this guide until Deploy the Sample application section https://istio.io/latest/docs/setup/getting-started/
2. Create dev namespace `kubectl apply -f dev-ns.json`
3. Deploy the apps `kubectl apply -f kubernetes-manifest.yaml`
4. Create the gateway `kubectl apply -f gateways.yaml`
5. Create the virtual service `kubectl apply -f backend-virtual-service.yaml`
6. Create the envoy filter `kubectl apply -f envoy.yaml`
7. Make sure there are no issues with the configuration by running `istioctl analyze` <br> Should show result as below <br>
   ✔ No validation issues found when analyzing namespace: dev.
8. Follow the guide `Determine the ingress IP and ports` until `Next Steps` https://istio.io/latest/docs/setup/getting-started/#determining-the-ingress-ip-and-ports

So it seems we don't need to define a virtual service for the auth-verify application
as long as we don't have to expose it to outside traffic

How is it supposed to work? <br>
backend app has 2 routes.
<ul>
    <li> / </li>
    <li> /api </li>
</ul>

`/` is not a protected route. 
`/api` is a protected route and needs the header `authenticated` to be passed for a 200 response.

However, if you pass the header `auth` equals `foo`, the auth-app will automatically add the `authenticated` header to your
original request. It will also add some additional headers, which are mentioned in `authorization_response.allowed_upstream_headers`

