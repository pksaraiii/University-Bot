import OpenAI from "openai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// terminal input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🎓 University Admissions AI Bot");
console.log("Type 'exit' to quit\n");

async function chat() {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("👋 Goodbye!");
      rl.close();
      return;
    }

    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a University Admissions Assistant Bot. Answer questions about eligibility, documents, entrance exams, fees, and application process.",
          },
          { role: "user", content: input },
        ],
      });

      console.log(
        "\nBot:",
        response.choices[0].message.content,
        "\n"
      );
    } catch (error) {
      console.error("Error:", error.message);
    }

    chat();
  });
}

chat();
