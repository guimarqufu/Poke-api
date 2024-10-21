import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
	"lambdal/text-to-pokemon:ff6cc781634191dd3c49097a615d2fc01b0a8aae31c448e55039a04dcbf36bba",
	{
	  input: {
		prompt: "Car",
		num_outputs: 1,
		guidance_scale: 7.5,
		num_inference_steps: "50"
	  }
	}
  );
  console.log(output);