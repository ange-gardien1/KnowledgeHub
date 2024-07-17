// import langchain from "@/lib/langchain";
// import { z } from "zod";


// // Define the input schema for the prompt
// const askOpenAIInput = z.object({
//   prompt: z.string(),
// });

// const langChainRouter = createRouter()
//   .mutation("askOpenAI", {
//     input: askOpenAIInput,
//     async resolve({ input }) {
//       try {
//         const response = await langchain.ask(input.prompt); // Assuming `ask` is the method in your ChatOpenAI class
//         return { response };
//       } catch (error) {
//         throw new Error(`OpenAI request failed: ${error.message}`);
//       }
//     },
//   });

// export default langChainRouter;
