terraform {
  required_version = ">= 1.6.0"
}

variable "image_tag" {
  type        = string
  description = "Container image tag to deploy."
}

variable "active_color" {
  type        = string
  description = "Blue-green slot receiving traffic."
  default     = "blue"
}

variable "live_url" {
  type        = string
  description = "Cloud load balancer or API gateway URL."
  default     = "set-by-cloud-provider"
}

output "deployment_strategy" {
  value = "blue-green"
}

output "active_color" {
  value = var.active_color
}

output "image_tag" {
  value = var.image_tag
}

output "live_url" {
  value = var.live_url
}
