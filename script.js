
async function generateReply(){
    const email = document.getElementById("emailInput").value;
    const tone = document.getElementById("toneSelect").value;
    const button = document.getElementById("button");

    if (email == ""){
        document.getElementById("output").textContent = "Make sure to type in the email before clicking generate"
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

        document.getElementById("output").textContent = subject

    } catch (error) {
        document.getElementById("output").textContent = "server error"
    }

    button.disabled = false;
    button.textContent = "Generate reply";
    

}