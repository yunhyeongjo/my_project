<template>
    <div class="flex">
    <h1>Will you marry me?</h1>
    </div>

    <button id="yesbtn" onclick="alert('Thank you!!! 😊')">Yes&#128149;</button>
    <button onmousemove="random(this)" onclick="alert('You're quick and cruel, did you cheat? 😢')">No&#128148;</button>
</template>

<script setup>
    const WIDTH = document.body.clientWidth;
    const HEIGHT = document.body.clientHeight;
    const BTN_H_MAR = 90;
    const BTN_W_MAR = 120;
    let count = 0;

    function random(nobtn) {
        nobtn.style.position = "absolute";
        let randomH = Math.random() * HEIGHT + BTN_H_MAR;
        let randomW = Math.random() * WIDTH + BTN_W_MAR;
        //Adjusting sizes for preventing offscreens
        randomW = adjustW(randomW);
        randomH = adjustH(randomH);
        nobtn.style.top = `${randomH}px`;
        nobtn.style.right = `${randomW}px`;
        count++;
        if (count >= 10) {
            document.getElementById("yesbtn").classList.add("ics");
            let interval = setInterval(() => {
            nobtn.style.opacity = count / 10;
            count--;
            if (count <= 0) {
                nobtn.style.display = "none";
                clearInterval(interval);
            }
            }, 10);
        }
    }

    function adjustW(rW) {
    if (rW <= BTN_W_MAR) rW = BTN_W_MAR;
    else if (rW >= WIDTH - BTN_W_MAR) rW = WIDTH - BTN_W_MAR;
    return rW;
    }

    function adjustH(rH) {
    if (rH <= BTN_H_MAR) rH = BTN_H_MAR;
    else if (rH >= WIDTH - BTN_H_MAR) rH = WIDTH - BTN_H_MAR;
    return rH;
    }
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lora&display=swap");
body {
    background: #000;
    color: #eee;
    text-align: center;
    font-family: "Lora", serif;
}
.flex {
    display: flex;
    justify-content: space-around;
}
.relative {
    position: relative;
}
button {
    font-family: "Lora", serif;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px 20px;
    background: #eee;
    color: #777;
    width: 90px;
    height: 60px;
    transition: 400ms background, color;
}
button:hover {
    cursor: pointer;
    background-color: #888;
    color: #fff;
}
.ics {
    border: 3px solid #ddd;
    animation: 2s increase-size infinite;
}
@keyframes increase-size {
    0% {
        background-color: #888;
        color: #fff;
    }
    50% {
        background-color: #eee;
        color: #000;
    }
    100% {
        background-color: #888;
        color: #fff;
    }
}
</style>