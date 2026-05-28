
async function generateReply(){
    const email = document.getElementById("emailInput").value;
    const tone = document.getElementById("toneSelect").value;
    const button = document.getElementById("button");
    const output = document.getElementById("output");

    if (email == ""){
        output.textContent = "Make sure to type in the email before clicking generate"
        return
    }

    button.disabled = true;
    button.textContent = "Generating...";

    try{
        const response  = await fetch(
        "http://localhost:3000/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                tone
            })
        })

        const data = await response.json()
        const subject = data.content[0].text

        output.textContent = subject

    } catch (error) {
        output.textContent = "server error"
    }

    button.disabled = false;
    button.textContent = "Generate reply";
    

}