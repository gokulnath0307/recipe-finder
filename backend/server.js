const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  weight: Number,
  height: Number,
  isDiabetes: Boolean,
  dietType: String,
  bmi: Number,
  category: String,
});

const User = mongoose.model("User", userSchema);

// Function to generate AI-based recipe using OpenAI API
// const generateRecipe = async (bmi, dietType, isDiabetes, userInput) => {
//   const prompt = `Create a healthy recipe for a person with BMI ${bmi}. They follow a ${dietType} diet.${
//     isDiabetes ? " The person has diabetes, so use low-sugar ingredients." : ""
//   } They want to prepare: ${userInput}.`;

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: prompt }],
//         max_tokens: 100,
//       },
//       {
//         headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
//       }
//     );

//     return response.data.choices[0].message.content || "No recipe generated.";
//   } catch (error) {
//     console.log(error.stack);

//     return "Error generating recipe. Try again later.";
//   }
// };

//
// Function to generate AI-based recipe using Google Gemini API
const generateRecipe = async (bmi, dietType, isDiabetes, userInput) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create a healthy recipe for a person with BMI ${bmi}. 
      They follow a ${dietType} diet.${isDiabetes ? " The person has diabetes, so use low-sugar ingredients." : ""} 
      They want to prepare: ${userInput}.
      
      Return the response in JSON format:
      {
          "title": "Recipe Name",
          "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
          "steps": ["Step 1", "Step 2", "Step 3"]
      }
      `;

    const result = await model.generateContent(prompt);
    const response = result.response.candidates[0].content.parts[0].text;
    const senddata = JSON.parse(response);
    return senddata || "No recipe generated.";
  } catch (error) {
    console.error("Error generating recipe:", error);
    return "Error generating recipe. Try again later.";
  }
};

// Register User & Generate Recipe
app.post("/register", async (req, res) => {
  try {
    const { name, age, weight, height, isDiabetes, dietType, userInput } = req.body;
    const bmi = (weight / (height / 100) ** 2).toFixed(2);
    let category;

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";
    let recipe;
    try {
      recipe = await generateRecipe(bmi, dietType, isDiabetes, userInput);
    } catch (error) {
      console.log(error.stack);

      return "error ";
    }

    const newUser = new User({ name, age, weight, height, isDiabetes, dietType, bmi, category });
    await newUser.save();
    res.json({ bmi, category,recipe });
  } catch (error) {
    console.log(error.stack);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
