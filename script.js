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
let upgradeCountArr = [0,0,0,0,0];
const upgradeTab = document.getElementById("upgradeTab");
const levelP = document.getElementById("lvl");
const expBar = document.getElementById("exp");
const creditsNav = document.getElementById("credits");
const creditsDiv = document.getElementById("creditsDiv");
const closeCredBtn = document.getElementById("closeBtn");
const skillpointsP = document.getElementById("skillpoints");
const comboGif = document.getElementById("comboGif");
const saveNav = document.getElementById("save");
const skilltree = document.getElementById("skilltree");
const expLabel = document.getElementById("expLabel");
const PPCP = document.getElementById("ppc");
const PPSP = document.getElementById("pps");
const levelsbtn = document.getElementById("levelsbtn");
const skills = document.querySelectorAll(".skill");
const goldRushBtn = document.getElementById("goldRush")
let skillsArr = [
    {name:"Skill 1",desc:"Gives 10% PPS & PPC per level",count:0, maxCount:5},
    {name:"Skill 2",desc:"10% chance to crit(200% points) on click/level",count:0,maxCount:5},
    {name:"Skill 3",desc:"Crits give more (33.3%/level)",count:0,maxCount:3},
    {name:"Skill 4",desc:"Combo now gives 3x PPC",bought:false},
    {name:"Skill 5",desc:"PPC += 10% of PPS per level",count:0,maxCount:5},
    {name:"Skill 6",desc:"PPS x2",bought:false},
    {name:"Skill 7",desc:"Unlocks gold rush ability",bought:false},
    {name:"Skill 8",desc:"Makes combo also work on PPS",bought:false},
    {name:"Skill 9",desc:"Gain 5x points",bought:false}
    ]
let upgradeFirstLaunch = false;
let skillTreeFirstLaunch = false;
let showHideUpg = 0;
let showHideLvl = 0;
settingsTab.id = "settingsTab";
let clickVal = 1;
let secVal = 0;
let points = 1000;
let upgradePoints = 30;
let currXp = 0;
let currLvl = 0;
let xpToLvl = 100;
let comboTimeout;       
let comboVal = skillsArr[3].bought ? 3 : 2;
let clickCounter = 0;
let clickMultiplier = 1;
let secMultiplier = 1;
let ppsFromPpc = 0;
let critChance = 0;
let critVal = 2;
const critRollFunc = () => {
   return Math.ceil(Math.random()*100)
}
  let critRoll = critRollFunc()
const updateVals = () => {
    PPCP.textContent = `PPC: ${(clickVal * clickMultiplier >= 1e10) ? (clickVal * clickMultiplier).toExponential(0) : (clickVal * clickMultiplier).toFixed(0)}`;
    PPSP.textContent = `PPS: ${(secVal*secMultiplier >= 1e10) ?(secVal * secMultiplier).toExponential(0) : (secVal*secMultiplier).toFixed(0)}`;
    skillpointsP.textContent = `Skillpoints: ${upgradePoints}`
    pointsP.textContent = `Points: ${points.toString().length > 10? points.toExponential(2) : points}`
}
const goldRush = () => {
    if (skillsArr[6].bought) {
        const originalText = goldRushBtn.innerHTML;
        clickMultiplier *= 3;
        secMultiplier *= 3;
        updateVals();
        goldRushBtn.disabled = true;
        let countdownTime = 10;

        const countdownInterval = setInterval(() => {
            goldRushBtn.innerHTML = `Gold Rush - ${countdownTime}s`;
            countdownTime--;
            if (countdownTime < 0) {
                clearInterval(countdownInterval);
                goldRushBtn.innerHTML = originalText;
                goldRushBtn.disabled = false;
                clickMultiplier /= 3;
                secMultiplier /= 3;
                updateVals();

                let cooldownTime = 300;
                const cooldownInterval = setInterval(() => {
                    goldRushBtn.innerHTML = `Cooldown - ${cooldownTime}s`;
                    cooldownTime--;
                    if (cooldownTime < 0) {
                        clearInterval(cooldownInterval);
                        goldRushBtn.innerHTML = "Gold Rush Ready!";
                    }
                },300000);
            }
        }, 1000);
    } else {
        alert("Gold rush not unlocked yet");
    }
};
goldRushBtn.addEventListener("click",goldRush)
const buySkills = () => {
    for (let i = 0; i<skillsArr.length;i++){
        skills[i].addEventListener("click",()=>{
            if (skillsArr[i].count < skillsArr[i].maxCount || skillsArr[i].bought === false) {
                if (upgradePoints >= 1) {
                    if (i === 0) {
                        skillsArr[i].count += 1
                        clickMultiplier += 0.1
                        secMultiplier += 0.1
                    } else if (i === 1) {
                        skillsArr[i].count += 1
                        critChance += 10
                    } else if (i === 2) {
                        skillsArr[i].count += 1
                        critVal += 0.33
                    } else if (i === 3) {
                        skillsArr[i].bought = true
                        comboVal = 3
                    } else if (i === 4) {
                        skillsArr[i].count += 1
                        ppsFromPpc += Math.ceil(secVal*(0.1*skillsArr[4].count))
                    } else if (i === 5) {
                        skillsArr[i].bought = true
                        secMultiplier *= 2
                    } else if (i === 6) {
                        skillsArr[i].bought = true
                    } else if (i === 7) {
                        skillsArr[i].bought = true
                    } else if (i === 8) {
                        clickMultiplier *= 5
                        secMultiplier *= 5
                    }
                    upgradePoints -= 1
                    ppsFromPpc += Math.ceil(secVal*(0.1*skillsArr[4].count))
                    updateVals()
                } else {
                    alert("Not enough points")
                }
            } else {
                alert("Max level reached")
            }
        })
    }
}
buySkills()
const price = ["price1","price2","price3","price4","price5"]
levelP.textContent = `Level: ${currLvl}`
const skillDescs = document.querySelectorAll("#skillDesc")
const skillDesc = () => {
    for (let i = 0; i<skillsArr.length;i++) {
        skills[i].addEventListener("mouseover",()=>{
            skillDescs[i].textContent = skillsArr[i].desc
            skillDescs[i].style.display = "block"
        })
        skills[i].addEventListener("mouseout", () => {
            skillDescs[i].textContent = "";
            skillDescs[i].style.display = "none"
        });
    }
}
skillDesc()
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
        skillpointsP.textContent = `Skillpoints: ${upgradePoints}`
    }
    levelP.textContent = `Level: ${currLvl}`
}
const showUpgrades = () => {
   if (!upgradeFirstLaunch) {
            skilltree.style.display = "none"
        levelsbtn.textContent = "Show skill tree"
        showUpgradesBtn.textContent = "Hide upgrades" 
    for (let i = 0; i<5;i++) {
        upgradeCount[i].textContent = `Count: ${Number(upgradeCountArr[i])}`
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
    upgradeFirstLaunch = true;
    showHideLvl = 0;
}
 if (showHideUpg === 0)  {
        skilltree.style.display = "none"
        levelsbtn.textContent = "Show skill tree"
    for (let i = 0; i<5;i++) {
        upgrade[i].style.display = "flex";
        upgradeTab.style.display = "flex";
        showUpgradesBtn.textContent = "Hide upgrades" 
    }
    showHideUpg = 1
    showHideLvl = 0
    } else if (showHideUpg === 1) {
        for (let i = 0; i<5;i++) {
            upgrade[i].style.display = "none"}
    upgradeTab.style.display = "none"
    showUpgradesBtn.textContent = "Show upgrades"
    showHideUpg = 0
    }
};
const showLevels = () => {
    if (skillTreeFirstLaunch === false) {
        skilltree.style.display = "grid"
        levelsbtn.textContent = "Hide skill tree"
        skillTreeFirstLaunch = true
        upgradeTab.style.display = "none"
        showUpgradesBtn.textContent = "Show upgrades"
        showHideUpg = 0
    }
    if (showHideLvl === 0) {
        skilltree.style.display = "grid"
        levelsbtn.textContent = "Hide skill tree"
        showHideLvl = 1
        upgradeTab.style.display = "none"
        showUpgradesBtn.textContent = "Show upgrades"
        showHideUpg = 0
    } else if (showHideLvl === 1) {
        skilltree.style.display = "none"
        levelsbtn.textContent = "Show skill tree"
        showHideLvl = 0
    }
}
levelsbtn.addEventListener("click",showLevels)
const buyUpgrade = () => {
const index = event.target.getAttribute("data-index");
const upgradeChoice = upgradeArr[index];
    if (points < upgradeArr[index].price) {
        alert("Not enough points")
        return
    } else {
    clickVal += upgradeChoice.clickVal
    secVal += upgradeChoice.secVal
    points -= Math.ceil(upgradeChoice.price)
    pointsP.textContent = `Points: ${points.toString().length > 10? points.toExponential(2) : points}`  
    upgradeArr[index].price *= 1.5
    price[index].textContent = Math.ceil(upgradeArr[index].price.toString().length>10 ? upgradeArr[index].price.toExponential(2) : upgradeArr[index].price)
    upgradeCountArr[index]++
    upgradeCount[index].textContent = `Count: ${Number(upgradeCountArr[index])}`
    ppsFromPpc += Math.ceil(secVal*(0.1*skillsArr[4].count))
    }
    updateVals()
}
const combo = () => {
    click.classList.add("combo")
    comboGif.style.display = "block"
    if (comboTimeout) {
        clearTimeout(comboTimeout)
        updateVals()
    }
    comboTimeout = setTimeout(() => {  
        click.classList.remove("combo")
        comboGif.style.display = "none"
        clickCounter = 0
        updateVals()
    },1000)
    updateVals()
}
showUpgradesBtn.addEventListener("click",showUpgrades)
const clickFunction = () => {
    console.log(ppsFromPpc)
    critRoll = critRollFunc()
    currXp += 1;
    expBar.value = currXp;
    expBar.max = xpToLvl;
    expBar.textContent = "currXp/xpToLvl"
    expLabel.textContent = `Exp: ${currXp}/${xpToLvl}`
    level()
    clickCounter++
    if (clickCounter >= 20) {
    combo()
    }
    if (clickCounter >= 20) {
        if (critRoll < Math.ceil(critChance)) {
        points += clickVal*clickMultiplier*comboVal*Math.ceil(critVal);
        } else {
            points += clickVal*clickMultiplier*comboVal
        }
        pointsP.textContent = `Points: ${points.toString().length > 10? points.toExponential(2) : points}`
    } else {
        if (critRoll < Math.ceil(critChance)) {
            points += clickVal*clickMultiplier*Math.ceil(critVal)
     } else {
    points += clickVal*clickMultiplier
        }
    pointsP.textContent = `Points: ${points.toString().length > 10? points.toExponential(2) : points}`
    }
    updateVals()
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
    <button id="reset">Reset</button>
    `;
    document.body.appendChild(settingsTab);
    document.getElementById("close").addEventListener("click",()=>{settingsTab.remove()});
    document.getElementById("flip").addEventListener("click",()=>{click.classList.toggle("flip")});
    document.getElementById("smolgort").addEventListener("click",()=>{click.classList.toggle("smol")})
    document.getElementById("reset").addEventListener("click",()=>{
        localStorage.clear()
        location.reload()
    })
}
contactNav.addEventListener("click",contact)
settingsNav.addEventListener("click",settings)
infoNav.addEventListener("click",info)
let comboActive = false; 


const secFunction = () => {
    if (skillsArr[7].bought && clickCounter >= 20) {
        if (!comboActive) { 
            combo();
            comboActive = true;
            secVal *= comboVal; 
        }
        points += secVal * secMultiplier;        
        updateVals();
    } else {
        points += secVal * secMultiplier;
        updateVals();
    }

    if (comboActive && clickCounter < 20) {
        secVal /= comboVal; 
        comboActive = false; 
    }
    updateVals();
};
setInterval(secFunction,1000)
creditsNav.addEventListener("click",()=>{
    creditsDiv.style.display = "flex"
})
closeCredBtn.addEventListener("click",()=>{
    creditsDiv.style.display = "none"
})
const saveFunction = () => {
    localStorage.setItem("points",points)
    localStorage.setItem("currXp",currXp)
    localStorage.setItem("currLvl",currLvl)
    localStorage.setItem("xpToLvl",xpToLvl)
    localStorage.setItem("clickVal",clickVal)
    localStorage.setItem("secVal",secVal)
    localStorage.setItem("upgradePoints",upgradePoints)
    localStorage.setItem("upgradeCountArr",JSON.stringify(upgradeCountArr))
    localStorage.setItem("flip",click.classList.contains("flip").toString());
    localStorage.setItem("smol",click.classList.contains("smol").toString());
    localStorage.setItem("upgradeArr",JSON.stringify(upgradeArr));
    localStorage.setItem("skillsArr", JSON.stringify(skillsArr));
    localStorage.setItem("skillsArr", JSON.stringify(skillsArr));
    localStorage.setItem("upgradePoints", upgradePoints.toString());
    localStorage.setItem("clickMultiplier", clickMultiplier.toString());
    localStorage.setItem("secMultiplier", secMultiplier.toString());
    localStorage.setItem("critChance", critChance.toString());
    localStorage.setItem("critVal", critVal.toString());
    localStorage.setItem("comboVal", comboVal.toString());
    localStorage.setItem("ppsFromPpc", ppsFromPpc.toString());
}
saveNav.addEventListener("click",saveFunction)
document.addEventListener("DOMContentLoaded",()=>{
    let storedPoints = localStorage.getItem("points")
    let storedCurrXp = localStorage.getItem("currXp")
    let storedCurrLvl = localStorage.getItem("currLvl")
    let storedXpToLvl = localStorage.getItem("xpToLvl")
    let storedClickVal = localStorage.getItem("clickVal")
    let storedSecVal = localStorage.getItem("secVal")
    let storedUpgradePoints = localStorage.getItem("upgradePoints")
    let storedUpgradeCountArr = localStorage.getItem("upgradeCountArr")
    let storedUpgradeArr = localStorage.getItem("upgradeArr")
    let storedFlip = localStorage.getItem("flip")
    let storedSmol = localStorage.getItem("smol")
    let storedSkillsArr = localStorage.getItem("skillsArr");
    let storedClickMultiplier = localStorage.getItem("clickMultiplier");
    let storedSecMultiplier = localStorage.getItem("secMultiplier");
    let storedCritChance = localStorage.getItem("critChance");
    let storedCritVal = localStorage.getItem("critVal");
    let storedComboVal = localStorage.getItem("comboVal");
    let storedPpsFromPpc = localStorage.getItem("ppsFromPpc");
    if (storedPoints) {
        points = Number(storedPoints)
        pointsP.textContent = `Points: ${points.toString().length > 10? points.toExponential(2) : points}`
    }
    if (storedCurrXp) {
        currXp = Number(storedCurrXp)
        expLabel.textContent = `Exp: ${currXp}/${xpToLvl}`
    }
    if (storedCurrLvl) {
        currLvl = Number(storedCurrLvl)
        levelP.textContent = `Level: ${currLvl}`
    }
    if (storedXpToLvl) {
        xpToLvl = Number(storedXpToLvl)
    }
    if (storedClickVal) {
        clickVal = Number(storedClickVal)
    }
    if (storedSecVal) {
        secVal = Number(storedSecVal)
    }
    if (storedUpgradePoints) {
        upgradePoints = Number(storedUpgradePoints)
        skillpointsP.textContent += ` ${storedUpgradePoints}`
    }
    if (storedUpgradeCountArr) {
        upgradeCountArr = JSON.parse(storedUpgradeCountArr)
    }
    if (storedUpgradeArr) {
        upgradeArr = JSON.parse(storedUpgradeArr)
    }
    if (points >= 10) {
        showUpgradesBtn.style.display = "block"
    }
    if (storedFlip === "true") {
        click.classList.add("flip")
    }
    if (storedSmol === "true") {
        click.classList.add("smol")
    }
    if (storedSkillsArr) {
        skillsArr = JSON.parse(storedSkillsArr);
        for (let i = 0; i < skillsArr.length; i++) {
            if (skillsArr[i].count > 0) {
                skills[i].textContent = `${skillsArr[i].name} - Level: ${skillsArr[i].count}`;
            }
            
            if (skillsArr[i].bought) {
                skills[i].classList.add("bought");
            }
        }
        
        updateVals();
    }
    if (storedSkillsArr) {
        skillsArr = JSON.parse(storedSkillsArr);

        for (let i = 0; i < skillsArr.length; i++) {
            if (skillsArr[i].count > 0) {
                skills[i].textContent = `${skillsArr[i].name} - Level: ${skillsArr[i].count}`;
            }

            if (skillsArr[i].bought) {
                skills[i].classList.add("bought");
            }
        }
    }

    if (storedUpgradePoints) {
        upgradePoints = parseInt(storedUpgradePoints);
        skillpointsP.textContent = upgradePoints
    }

    if (storedClickMultiplier) {
        clickMultiplier = parseFloat(storedClickMultiplier);
    }
    if (storedSecMultiplier) {
        secMultiplier = parseFloat(storedSecMultiplier);
    }

    if (storedCritChance) {
        critChance = parseInt(storedCritChance);
    }
    if (storedCritVal) {
        critVal = parseFloat(storedCritVal);
    }

    if (storedComboVal) {
        comboVal = parseFloat(storedComboVal);
    }

    if (storedPpsFromPpc) {
        ppsFromPpc = parseInt(storedPpsFromPpc);
    }

    updateVals();
});

