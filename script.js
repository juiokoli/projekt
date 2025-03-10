const click = document.getElementById("clickimg");
const pointsP = document.getElementById("points");
const upgrade1 = document.getElementById("upgrade1");
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
upgrade1.addEventListener("click",buyUpgrade)
