const click = document.getElementById("clickimg");
const pointsP = document.getElementById("points");
const infoNav = document.getElementById("info")
const contactNav = document.getElementById("contact")
const settingsNav = document.getElementById("settings")
const settingsTab = document.createElement("div")
const closeBtn = document.getElementById("close");
const flipBtn = document.getElementById("flip");
const smolgortBtn = document.getElementById("smolgort");
const showUpgradesBtn = document.getElementById("showUpgrades");
const upgrade = document.querySelectorAll('.upgrade');
let showHide = 0;
settingsTab.id = "settingsTab";
let clickVal = 1;
let secVal = 0;
let points = 0;
let upgradeObj = {
    upgrade1:{},
    upgrade2:{},
    upgrade3:{},
    upgrade4:{},
    upgrade5:{}
};
const showUpgrades = () => {
  //  if (showHide === 0) {
    upgrade.forEach((elo)=>{upgrade[elo].style.display="none"})
    console.log(upgrade)
    showUpgradesBtn.textContent = "Hide upgrades";
   // showHide += 1
   // } else {
     //   upgrade.style.visibility = "hidden"
    //   showUpgradesBtn.textContent = "Show upgrades"
     //   showHide -= 1
   // }
};
showUpgradesBtn.addEventListener("click",showUpgrades)
clickFunction = () => {
    points += clickVal
    pointsP.textContent = `Points: ${points}`
};
click.addEventListener("click",clickFunction);
const info = () => {
    alert("This is a simple clicker game I've made as my first project, using only html, css and js")
};
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
infoNav.addEventListener("click",info)