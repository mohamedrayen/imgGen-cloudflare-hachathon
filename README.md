# LearnWhy: Image Generation Cloudflare Worker

### Cloudflare Hackathon:
This Cloudflare Worker is part of the LearnWhy project developed for the Cloudflare AI Challenge.

### Description:
This Cloudflare Worker is responsible for generating images to accompany the stories generated by the LearnWhy application. It utilizes the stable-diffusion-xl-lightning model to create vivid illustrations that enhance comprehension and engagement for users.

### Workflow:
1. **Receive Request**: The worker receives a request from the LearnWhy frontend, providing the necessary parameters for image generation.
2. **Generate Image**: Using the stable-diffusion-xl-lightning model, the worker generates an image based on the provided parameters.
3. **Return Image**: The generated image is returned as a response to the frontend, ready to be displayed alongside the corresponding story.

### Installation:
1. Clone this repository.
2. Install dependencies using npm: `npm install`.
3. Deploy the worker to your Cloudflare account using Wrangler: `wrangler publish`.
