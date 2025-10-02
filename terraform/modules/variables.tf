variable "name" {
  description = "Namespace name"
  type        = string
}

variable "registry_url" {
  type = string
}
variable "registry_username" {
  type = string
}
variable "registry_password" {
  type      = string
  sensitive = true
}
variable "registry_email" {
  type = string
}
