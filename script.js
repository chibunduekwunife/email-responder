async function generateReply(){
    const emailInput = document.getElementById("emailInput").value;
    const toneSelect = document.getElementById("toneSelect").value;

    const response  = await fetch(
        "https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1000,
                messages: [{
                    role: "user",
                    content: `Write a reply to this email in a ${toneSelect} tone: ${emailInput}`
                }]

            })
        }
    )

    const data = await response.json()
    console.log(data)
}