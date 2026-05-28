import express from "express"
import cors from "cors"
import dotenv from "dotenv"

const port = 3000
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.post("/generate", async (req, res) => {
    const {email, tone} = req.body
    const data = await fetch(
        "https://api.anthropic.com/v1/messages",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1000,
                messages: [{
                    role: "user",
                    content: `Write a reply to this email in a ${tone} tone: ${email}`
                }]
            })
        }
    )
    const response = await data.json()
    res.json(response)
})

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`)
})

