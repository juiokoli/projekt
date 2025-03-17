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
let points = 0;
let upgradePoints = 0;
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
    let displayPoints = Math.floor(points); 

    pointsP.textContent = `Points: ${
        displayPoints >= 1e10 
            ? displayPoints.toExponential(2) 
            : displayPoints.toLocaleString()  
    }`;

    PPCP.textContent = `PPC: ${
        Math.floor(clickVal * clickMultiplier) >= 1e10 
            ? Math.floor(clickVal * clickMultiplier).toExponential(2) 
            : Math.floor(clickVal * clickMultiplier).toLocaleString()
    }`;

    PPSP.textContent = `PPS: ${
        Math.floor(secVal * secMultiplier) >= 1e10 
            ? Math.floor(secVal * secMultiplier).toExponential(2) 
            : Math.floor(secVal * secMultiplier).toLocaleString()
    }`;

    skillpointsP.textContent = `Skillpoints: ${Math.floor(upgradePoints).toLocaleString()}`;
};
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
let UpgradePointsSpent = 0;
goldRushBtn.addEventListener("click",goldRush)
const buySkills = () => {
    for (let i = 0; i < skillsArr.length; i++) {
        skills[i].addEventListener("click", () => {
            // Check if skill has not reached max level or is not bought yet
            if (skillsArr[i].count < skillsArr[i].maxCount || skillsArr[i].bought === false) {

                // Skill 1
                if (i === 0) {
                    if (upgradePoints >= 1) {
                        skillsArr[i].count += 1;
                        clickMultiplier += 0.1;
                        secMultiplier += 0.1;
                        UpgradePointsSpent += 1;
                        upgradePoints -= 1;
                        updateVals();
                    } else {
                        alert("Not enough points!");
                    }
                }
                // Skill 2 (requires 1 Upgrade Point spent)
                else if (i === 1) {
                    if (upgradePoints >= 1) {
                        if (UpgradePointsSpent >= 1) {
                            skillsArr[i].count += 1;
                            critChance += 10;
                            UpgradePointsSpent += 1;
                            upgradePoints -= 1;
                            updateVals();
                        } else {
                            alert(`You need at least 1 Upgrade Point spent to buy this skill.\nYou have spent ${UpgradePointsSpent} Upgrade Points.`);
                        }
                    } else {
                        alert("Not enough points!");
                    }
                }
                // Skill 3 (requires 1 Upgrade Point spent)
                else if (i === 2) {
                    if (upgradePoints >= 1) {
                        if (UpgradePointsSpent >= 1) {
                            skillsArr[i].count += 1;
                            critVal += 0.33;
                            UpgradePointsSpent += 1;
                            upgradePoints -= 1;
                            updateVals();
                        } else {
                            alert(`You need at least 1 Upgrade Point spent to buy this skill.\nYou have spent ${UpgradePointsSpent} Upgrade Points.`);
                        }
                    } else {
                        alert("Not enough points!");
                    }
                }
                // Skill 4 (requires 3 Upgrade Points spent)
                else if (i === 3) {
                    if (upgradePoints >= 1) {
                        if (UpgradePointsSpent >= 3) {
                            skillsArr[i].bought = true;
                            comboVal = 3;
                            UpgradePointsSpent += 1;
                            upgradePoints -= 1;
                            updateVals();
                        } else {
                            alert(`You need at least 3 Upgrade Points spent to buy this skill.\nYou have spent ${UpgradePointsSpent} Upgrade Points.`);
                        }
                    } else {
                        alert("Not enough points!");
                    }
                }
                // Skill 5 (requires 3 Upgrade Points spent)
                else if (i === 4) {
                    if (upgradePoints >= 1) {
                        if (UpgradePointsSpent >= 3) {
                            skillsArr[i].count += 1;
                            ppsFromPpc += Math.ceil(secVal * (0.1 * skillsArr[4].count));
                            UpgradePointsSpent += 1;
                            upgradePoints -= 1;
                            updateVals();
                        } else {
                            alert(`You need at least 3 Upgrade Points spent to buy this skill.\nYou have spent ${UpgradePointsSpent} Upgrade Points.`);
                        }
                    } else {
                        alert("Not enough points!");
                    }
                }
                // Skill 6 (requires 5 Upgrade Points spent)
                else if (i === 5) {
                    if (upgradePoints >= 1) {
                        if (UpgradePointsSpent >= 5) {
                            skillsArr[i].bought = true;
                            secMultiplier *= 2;
                            UpgradePointsSpent += 1;
                            upgradePoints -= 1;
                            updateVals();
                        } else {
                            alert(`You need at least 5 Upgrade Points spent to buy this skill.\nYou have spent ${UpgradePointsSpent} Upgrade Points.`);
                        }
                    } else {
                        alert("Not enough points!");
                    }
                }
                // Skill 7 (requires 7 Upgrade Points spent)
                else if (i === 6) {
                    if (upgradePoints >= 1) {
                        if (UpgradePointsSpent >= 7) {
                            skillsArr[i].bought = true;
                            UpgradePointsSpent += 1;
                            upgradePoints -= 1;
                            updateVals();
                        } else {
                            alert(`You need at least 7 Upgrade Points spent to buy this skill.\nYou have spent ${UpgradePointsSpent} Upgrade Points.`);
                        }
                    } else {
                        alert("Not enough points!");
                    }
                }
                // Skill 8 (requires 7 Upgrade Points spent)
                else if (i === 7) {
                    if (upgradePoints >= 1) {
                        if (UpgradePointsSpent >= 7) {
                            skillsArr[i].bought = true;
                            UpgradePointsSpent += 1;
                            upgradePoints -= 1;
                            updateVals();
                        } else {
                            alert(`You need at least 7 Upgrade Points spent to buy this skill.\nYou have spent ${UpgradePointsSpent} Upgrade Points.`);
                        }
                    } else {
                        alert("Not enough points!");
                    }
                }
                // Skill 9 (requires 10 Upgrade Points spent)
                else if (i === 8) {
                    if (upgradePoints >= 1) {
                        if (UpgradePointsSpent >= 10) {
                            clickMultiplier *= 5;
                            secMultiplier *= 5;
                            UpgradePointsSpent += 1;
                            upgradePoints -= 1;
                            updateVals();
                        } else {
                            alert(`You need at least 10 Upgrade Points spent to buy this skill.\nYou have spent ${UpgradePointsSpent} Upgrade Points.`);
                        }
                    } else {
                        alert("Not enough points!");
                    }
                }
            } else {
                alert("Max level reached for this skill!");
            }
        });
    }
};
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
    critRoll = critRollFunc();
    currXp += 1;
    expBar.value = currXp;
    expBar.max = xpToLvl;
    expLabel.textContent = `Exp: ${currXp}/${xpToLvl}`;
    level();
    clickCounter++;

    let pointGain = clickVal * clickMultiplier;
    if (clickCounter >= 20) {
        combo();
        pointGain *= comboVal;
    }
    if (critRoll < Math.ceil(critChance)) {
        pointGain *= Math.floor(critVal);  // Ensuring integer values
    }

    points += Math.floor(pointGain);  // Ensuring no decimal points
    updateVals();
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
    document.getElementById("reset").addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}
    contactNav.addEventListener("click", contact);
    settingsNav.addEventListener("click", settings);
    infoNav.addEventListener("click", info);
    
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
    
    setInterval(secFunction, 1000);
    
    creditsNav.addEventListener("click", () => {
        creditsDiv.style.display = "flex";
    });
    
    closeCredBtn.addEventListener("click", () => {
        creditsDiv.style.display = "none";
    });
    
    const saveFunction = () => {
        localStorage.setItem("points", points.toFixed(2));  // Save with 2 decimal places
        localStorage.setItem("currXp", currXp);
        localStorage.setItem("currLvl", currLvl);
        localStorage.setItem("xpToLvl", xpToLvl);
        localStorage.setItem("clickVal", clickVal.toFixed(2)); // Store with 2 decimal places
        localStorage.setItem("secVal", secVal.toFixed(2));  // Store with 2 decimal places
        localStorage.setItem("upgradePoints", upgradePoints);
        localStorage.setItem("upgradeCountArr", JSON.stringify(upgradeCountArr));
        localStorage.setItem("flip", click.classList.contains("flip").toString());
        localStorage.setItem("smol", click.classList.contains("smol").toString());
        localStorage.setItem("upgradeArr", JSON.stringify(upgradeArr));
        localStorage.setItem("skillsArr", JSON.stringify(skillsArr));
        localStorage.setItem("clickMultiplier", clickMultiplier.toFixed(2));  // Store with 2 decimal places
        localStorage.setItem("secMultiplier", secMultiplier.toFixed(2));  // Store with 2 decimal places
        localStorage.setItem("critChance", critChance);
        localStorage.setItem("critVal", critVal.toFixed(2));  // Store with 2 decimal places
        localStorage.setItem("comboVal", comboVal.toFixed(2));  // Store with 2 decimal places
        localStorage.setItem("ppsFromPpc", ppsFromPpc);
        localStorage.setItem("upgradePointsSpent", upgradePointsSpent);
    };
    
    saveNav.addEventListener("click", saveFunction);
    
    document.addEventListener("DOMContentLoaded", () => {
        let storedPoints = localStorage.getItem("points");
        let storedCurrXp = localStorage.getItem("currXp");
        let storedCurrLvl = localStorage.getItem("currLvl");
        let storedXpToLvl = localStorage.getItem("xpToLvl");
        let storedClickVal = localStorage.getItem("clickVal");
        let storedSecVal = localStorage.getItem("secVal");
        let storedUpgradePoints = localStorage.getItem("upgradePoints");
        let storedUpgradeCountArr = localStorage.getItem("upgradeCountArr");
        let storedUpgradeArr = localStorage.getItem("upgradeArr");
        let storedFlip = localStorage.getItem("flip");
        let storedSmol = localStorage.getItem("smol");
        let storedSkillsArr = localStorage.getItem("skillsArr");
        let storedClickMultiplier = localStorage.getItem("clickMultiplier");
        let storedSecMultiplier = localStorage.getItem("secMultiplier");
        let storedCritChance = localStorage.getItem("critChance");
        let storedCritVal = localStorage.getItem("critVal");
        let storedComboVal = localStorage.getItem("comboVal");
        let storedPpsFromPpc = localStorage.getItem("ppsFromPpc");
        let storedUpgradePointsSpent = localStorage.getItem("upgradePointsSpent");
    

        if (storedUpgradePointsSpent) {
        upgradePointsSpent = parseInt(storedUpgradePointsSpent);
        }
        if (storedPoints) {
            points = Number(storedPoints);
            pointsP.textContent = `Points: ${points.toString().length > 10 ? points.toExponential(2) : points.toFixed(2)}`;  // Format with 2 decimals
        }
    
        if (storedCurrXp) {
            currXp = Number(storedCurrXp);
            expLabel.textContent = `Exp: ${currXp}/${xpToLvl}`;
        }
    
        if (storedCurrLvl) {
            currLvl = Number(storedCurrLvl);
            levelP.textContent = `Level: ${currLvl}`;
        }
    
        if (storedXpToLvl) {
            xpToLvl = Number(storedXpToLvl);
        }
    
        if (storedClickVal) {
            clickVal = Number(storedClickVal);
        }
    
        if (storedSecVal) {
            secVal = Number(storedSecVal);
        }
    
        if (storedUpgradePoints) {
            upgradePoints = Number(storedUpgradePoints);
            skillpointsP.textContent += ` ${storedUpgradePoints}`;
        }
    
        if (storedUpgradeCountArr) {
            upgradeCountArr = JSON.parse(storedUpgradeCountArr);
        }
    
        if (storedUpgradeArr) {
            upgradeArr = JSON.parse(storedUpgradeArr);
        }
    
        if (points >= 10) {
            showUpgradesBtn.style.display = "block";
        }
    
        if (storedFlip === "true") {
            click.classList.add("flip");
        }
    
        if (storedSmol === "true") {
            click.classList.add("smol");
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
    
