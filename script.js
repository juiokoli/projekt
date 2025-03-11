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
const buybtn = document.querySelectorAll(".buybtn")
let showHide = 0;
settingsTab.id = "settingsTab";
let clickVal = 1;
let secVal = 0;
let points = 0;
const price = ["price1","price2","price3","price4","price5"]
let upgradeArr = [
    {clickVal:1,secVal:0,price:10},
    {clickVal:0,secVal:5,price:250},
    {clickVal:10,secVal:10,price:3000},
    {clickVal:100,secVal:0,price:150000},
    {clickVal:0,secVal:100,price:200000}
];
const showUpgrades = () => {
   if (showHide === 0) {
    for (let i = 0; i<5;i++) {
        price[i] = document.createElement("p")
        price[i].textContent = upgradeArr[i].price
        price[i].classList.add("price")
        upgrade[i].appendChild(price[i])
    upgrade[i].style.display = "flex";
};
    showUpgradesBtn.textContent = "Hide upgrades" 
    showHide += 1
   } else {
    for (let i = 0; i<5;i++) {
        upgrade[i].style.display = "none"};
       showUpgradesBtn.textContent = "Show upgrades"
        showHide -= 1 
    }
};
const buyUpgrade1 = () => {
    clickVal += upgradeArr[0].clickVal
    points -= upgradeArr[0].clickVal.price
    pointsP.textContent = `Points: ${points}`
}
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
    console.log(buybtn)
}
contactNav.addEventListener("click",contact)
settingsNav.addEventListener("click",settings)
infoNav.addEventListener("click",info)
buybtn[0].addEventListener("click",buyUpgrade1)