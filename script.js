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
const buybtn = document.querySelectorAll(".buybtn");
const upgradeCount = document.querySelectorAll("#upgradeCount");
const upgradeCountArr = [0,0,0,0,0];
const upgradeTab = document.getElementById("upgradeTab");
const levelP = document.getElementById("lvl");
const expP = document.getElementById("exp");
const creditsNav = document.getElementById("credits");
const creditsDiv = document.getElementById("creditsDiv");
const closeCredBtn = document.getElementById("closeBtn");
const comboGif = document.getElementById("comboGif");
let showHide = 0;
settingsTab.id = "settingsTab";
let clickVal = 1;
let secVal = 0;
let points = 0;
let upgradePoints = 0;
let currXp = 0;
let currLvl = 0;
let xpToLvl = 100;
let comboTimeout;
let clickCounter = 0;
const price = ["price1","price2","price3","price4","price5"]
expP.textContent = `Exp: ${currXp}/${xpToLvl}`
levelP.textContent = `Level: ${currLvl}`
let upgradeArr = [
    {clickVal:1,secVal:0,price:10},
    {clickVal:0,secVal:5,price:250},
    {clickVal:10,secVal:10,price:3000},
    {clickVal:100,secVal:0,price:150000},
    {clickVal:0,secVal:100,price:200000}
];
const level = () => {
    if (currXp >= xpToLvl) {
        currLvl++
        upgradePoints += 1
        currXp = 0
        xpToLvl *= 2.5
    }
    levelP.textContent = `Level: ${currLvl}`
}
const showUpgrades = () => {
   if (showHide === 0) {
    for (let i = 0; i<5;i++) {
        price[i] = document.createElement("p")
        price[i].textContent = upgradeArr[i].price.toString().length > 10 ? upgradeArr[i].price.toExponential(2) : upgradeArr[i].price ;
        price[i].classList.add("price")
        upgrade[i].appendChild(price[i])
        upgradeTab.style.display = "flex";
        const buyButton = document.createElement("button");
            buyButton.textContent = "Buy";
            buyButton.classList.add("buybtn");
            buyButton.setAttribute("data-index", i); 
            buyButton.addEventListener("click", buyUpgrade);
            upgrade[i].appendChild(buyButton);
    upgrade[i].style.display = "flex";
};
    showUpgradesBtn.textContent = "Hide upgrades" 
    showHide = 2
   } else if (showHide === 1)  {
    for (let i = 0; i<5;i++) {
        upgrade[i].style.display = "flex";
        upgradeTab.style.display = "flex";
    }
    showHide = 2
    } else if (showHide === 2) {
        for (let i = 0; i<5;i++) {
            upgrade[i].style.display = "none"}
    upgradeTab.style.display = "none"
    showUpgradesBtn.textContent = "Show upgrades"
    showHide = 1 
    }
};
const buyUpgrade = () => {
const index = event.target.getAttribute("data-index");
const upgradeChoice = upgradeArr[index];
    if (points < upgradeArr[0].price) {
        alert("Not enough points")
        return
    }
    
    clickVal += upgradeChoice.clickVal
    secVal += upgradeChoice.secVal
    points -= Math.ceil(upgradeChoice.price)
    pointsP.textContent = `Points: ${points.toString().length > 10? points.toExponential(2) : points}`  
    upgradeArr[index].price *= 1.5
    price[index].textContent = Math.ceil(upgradeArr[index].price.toString().length>10 ? upgradeArr[index].price.toExponential(2) : upgradeArr[index].price)
    upgradeCountArr[index]++
    upgradeCount[index].textContent = `Count: ${Number(upgradeCountArr[index])}`
}
const combo = () => {
    click.classList.add("combo")
    comboGif.style.display = "block"
    if (comboTimeout) {
        clearTimeout(comboTimeout)
    }
    comboTimeout = setTimeout(() => {  
        click.classList.remove("combo")
        comboGif.style.display = "none"
        clickCounter = 0
    },1000)
}
showUpgradesBtn.addEventListener("click",showUpgrades)
const clickFunction = () => {
    currXp += 1;
    expP.textContent = `Exp: ${currXp}/${xpToLvl}`
    level()
    clickCounter++
    if (clickCounter >= 20) {
    combo()
    }
    if (clickCounter >= 20) {
        points += clickVal*2;
        pointsP.textContent = `Points: ${points.toString().length > 10? points.toExponential(2) : points}`
    } else {
    points += clickVal
    pointsP.textContent = `Points: ${points.toString().length > 10? points.toExponential(2) : points}`
    }
};
click.addEventListener("click",clickFunction);
const info = () => {
    alert("This is a simple clicker game I've made as my first project, using only html, css and js. Clicking gort gives points, to buy upgrades. PPC stands for Points Per Click, PPs stands for Points Per Second. Enjoy! :)")
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
const secFunction = () => {
    points += secVal;
    pointsP.textContent = `Points: ${points.toString().length > 10? points.toExponential(2) : points}`
};
setInterval(secFunction,1000)
creditsNav.addEventListener("click",()=>{
    creditsDiv.style.display = "flex"
})
closeCredBtn.addEventListener("click",()=>{
    creditsDiv.style.display = "none"
})