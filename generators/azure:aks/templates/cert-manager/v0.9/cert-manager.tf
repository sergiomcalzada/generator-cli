resource "local_file" "kubeconfig" {
  sensitive_content = module.kubernetes.kube_config_raw
  filename = "cert-manager/v0.9.1/.kube/config"
}

resource "null_resource" "cert_manager" {
  provisioner "local-exec" {
    working_dir = "cert-manager/v0.9.1"
    command     = "kubectl apply -f crds.yml --kubeconfig ./.kube/config && kubectl apply -f cluster-issuer.yml --kubeconfig ./.kube/config"
    environment = {
      name           = local.name
      resource_group = local.resource_group
    }
  }
  depends_on = [module.kubernetes, local_file.kubeconfig]
}

resource "helm_release" "cert-manager" {
  name       = "cert-manager"
  repository = data.helm_repository.jetstack.metadata[0].name
  chart      = "jetstack/cert-manager"
  version    = "v0.9.1"
  namespace  = "cert-manager"
  depends_on = [module.kubernetes, null_resource.cert_manager]
}
