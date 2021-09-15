window.addEventListener("load", () => {
    const playername = document.querySelector(".playername");
    const generateButton = document.querySelector(".generate");
    const prompt = document.querySelector(".prompt");
    const bumper = document.querySelector(".prompt-bumper");
    const BLANK = "_".repeat(7);

    let currentPrompt = null;
    const update = () => {
        if (currentPrompt) {
            prompt.innerHTML = currentPrompt.fields.find(f => f.n == "QuestionText").v.replace(/<BLANK>/gi, BLANK).replace(/<PLAYER>/gi, playername.value.trim().toUpperCase() || BLANK);
            bumper.innerHTML = currentPrompt.personal.replace(/<BLANK>/gi, BLANK);
        } else {
            prompt.innerHTML = "--";
            bumper.innerHTML = "--";
        }
    };
    update();
    playername.addEventListener("input", update);
    generateButton.addEventListener("click", () => {
        currentPrompt = TMIData.content[Math.floor(Math.random() * TMIData.content.length)];
        update();
    });
});