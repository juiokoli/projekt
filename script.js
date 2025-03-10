const click = document.getElementById("clickimg");
const pointsP = document.getElementById("points");
const upgrade1 = document.getElementById("upgrade1");
const infoNav = document.getElementById("info")
const contactNav = document.getElementById("contact")
const settingsNav = document.getElementById("settings")
const settingsTab = document.createElement("div")
const closeBtn = document.getElementById("close");
const flipBtn = document.getElementById("flip");
const smolgortBtn = document.getElementById("smolgort");
settingsTab.id = "settingsTab"
let clickVal = 1;
let points = 0;
let upgrades = {
    upgrade1: {cost:10, clickBonus:1},
};
const buyUpgrade = () => {
    if (points >= upgrades.upgrade1.cost) {
    points -= upgrades.upgrade1.cost
    clickVal += upgrades.upgrade1.clickBonus
    pointsP.textContent = `Points: ${points}`
    } else {
        alert("Not enough points to buy upgrade")
    }
};
const clickFunction = () => {
    points += clickVal
    pointsP.textContent = `Points: ${points}`
};
click.addEventListener("click",clickFunction);
upgrade1.addEventListener("click",buyUpgrade);
const info = () => {
    alert("This is a simple clicker game I've made as my first project, using only html, css and js")
}
infoNav.addEventListener("click",info)
const contact = () => {
    alert("lorem ipsum..... just a test project")
}
const settings = () => {
    settingsTab.innerHTML = `
    <h1 id="settingsText">Settings</h1>
    <button id="flip">Upside-down gort</button>
    <button id="smolgort">smol gort</button>
    <button id="close">Close</button>
    `;
    document.body.appendChild(settingsTab);
    document.getElementById("close").addEventListener("click",()=>{settingsTab.remove()});
    document.getElementById("flip").addEventListener("click",()=>{click.classList.toggle("flip")});
    document.getElementById("smolgort").addEventListener("click",()=>{click.classList.toggle("smol")})
}
contactNav.addEventListener("click",contact)
settingsNav.addEventListener("click",settings)