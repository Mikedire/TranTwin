terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.29"
    }
  }

  backend "s3" {
    bucket                      = "dto4t-tfstate"
    key                         = "dev/terraform.tfstate"   # change per env: staging/prod
    region                      = "uk"
    endpoint                    = "https://s3.uk.io.cloud.ovh.net"
    skip_credentials_validation = true
    skip_region_validation      = true
    force_path_style            = true
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

module "dev_namespace" {
  source            = "../../modules/namespace"
  name              = var.namespace
  registry_url      = var.registry_url
  registry_username = var.registry_username
  registry_password = var.registry_password
  registry_email    = var.registry_email
}
