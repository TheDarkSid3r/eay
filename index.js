window.addEventListener("load", () => {
    const playername = document.querySelector(".playername");
    const generateButton = document.querySelector(".generate");
    const prompt = document.querySelector(".prompt");
    const bumper = document.querySelector(".prompt-bumper");
    const historyContent = document.querySelector(".history>.content");
    const BLANK = "_".repeat(7);

    const formatPrompt = p => {
        return {
            prompt: p && p.prompt ? p.prompt.fields.find(f => f.n == "QuestionText").v.replace(/<BLANK>/gi, BLANK).replace(/<PLAYER>/gi, p.playername.trim().toUpperCase() || BLANK) : "--",
            personal: p && p.prompt ? p.prompt.personal.replace(/<BLANK>/gi, BLANK) : "--"
        };
    };

    const history = [];
    const update = () => {
        const last = history[history.length - 1];
        last.playername = playername.value;
        const p = formatPrompt(last);
        prompt.innerHTML = p.prompt;
        bumper.innerHTML = p.personal;
        last.entry.innerHTML = p.prompt;
    };
    const generateRandom = () => {
        const entry = document.createElement("div");
        entry.className = "entry";
        historyContent.appendChild(entry);
        let prompt = null;
        while (!prompt || (history.length && prompt.id == history[history.length - 1].id)) prompt = TMIData.content[Math.floor(Math.random() * TMIData.content.length)];
        history.push({ prompt, entry });
        update();
    };
    generateRandom();
    playername.addEventListener("input", update);
    generateButton.addEventListener("click", generateRandom);
});