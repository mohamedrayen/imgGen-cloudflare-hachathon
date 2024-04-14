

  export interface Env {
	AI: any;
}

export default {
	async fetch(request: Request, env: Env) {

		const url = new URL(request.url);



		if (request.method === "OPTIONS") {
			// Handle CORS preflight requests
			return this.handleOptions(request);
		} else if (
			request.method === "GET" ||
			request.method === "HEAD" ||
			request.method === "POST"
		) {
			// Handle requests to the API server
			return this.handleRequest(request, env);
		} else {
			return new Response(null, {
				status: 405,
				statusText: "Method Not Allowed",
			});
		}

	},
	 async handleOptions (request: Request) {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
			"Access-Control-Max-Age": "86400",
		};
		if (
			request.headers.get("Origin") !== null &&
			request.headers.get("Access-Control-Request-Method") !== null &&
			request.headers.get("Access-Control-Request-Headers") !== null
		) {
			// Handle CORS preflight requests.
			return new Response(null, {
				headers: {
					...corsHeaders,
					"Access-Control-Allow-Headers": request.headers.get(
						"Access-Control-Request-Headers"
					),
				},
			});
		} else {
			// Handle standard OPTIONS request.
			return new Response(null, {
				headers: {
					Allow: "GET, HEAD, POST, OPTIONS",
				},
			});
		}
	},
	async handleRequest(request: Request, env: Env) {
	let { story } = await request.json();
		const prompt_messages = [
			{ role: "system", content: 
			`you are prompt generator`
		 },
			{
			  role: "user",
			  content: 
			  `follow this instructions :
			  generate a prompt for an executer to generate a 3D colorful illustration image describing this scene. less than 30 words. 
			  the output:the prompt
			  let scene is "${story}"`,
			},
		  ];
		  const prompt = await env.AI.run("@hf/mistralai/mistral-7b-instruct-v0.2", { messages:prompt_messages });

	  const inputs = {
		prompt:prompt.response,
	  };
	//   return Response.json({rayen: prompt});
	  const response = await env.AI.run(
		"@cf/bytedance/stable-diffusion-xl-lightning",
		inputs
	  );
	  console.log(response)
  
		let headers = {
			"Access-Control-Allow-Origin": "*",

		};
		return new Response(response, {
			headers: {
			  "content-type": "image/png",
			  "Access-Control-Allow-Origin": "*",
			},
		  });
		return Response.json(response, {
			headers: {
				...headers
			}
		});
	}
};