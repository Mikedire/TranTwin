
variable "registry_url" {}
variable "registry_username" {}
variable "registry_password" { sensitive = true }
variable "registry_email" {}
variable "namespace" { default = "dev" }
