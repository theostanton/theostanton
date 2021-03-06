.PHONY: deploy

apply:
	terraform apply

invalidate:
	#distribution_id=$(echo terraform output distribution_id)
	aws cloudfront create-invalidation --distribution-id EHBVTTS787MW4 --paths /index.html
