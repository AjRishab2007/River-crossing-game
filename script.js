<script>
        let leftShore = ["farmer", "fox", "chicken", "grain"];
        let rightShore = [];
        let boat = [];
        let isBoatLeft = true;

        function moveToBoat(item) {
            const statusEl = document.getElementById("status");
            statusEl.className = "status";

            if (!isBoatLeft && !rightShore.includes(item)) return;
            if (isBoatLeft && !leftShore.includes(item)) return;

            const currentShore = isBoatLeft ? leftShore : rightShore;

            if (currentShore.includes(item) && boat.length < 2) {
                if (boat.length === 1 && !boat.includes("farmer") && item !== "farmer") {
                    statusEl.innerText = "The farmer must be in the boat first!";
                    statusEl.classList.add("animate__animated", "animate__shakeX");
                    return;
                }
                
                boat.push(item);
                currentShore.splice(currentShore.indexOf(item), 1);
            } else if (boat.includes(item)) {
                currentShore.push(item);
                boat.splice(boat.indexOf(item), 1);
            }
            updateUI();
        }

        function crossRiver() {
            const statusEl = document.getElementById("status");
            statusEl.className = "status";

            if (!boat.includes("farmer")) {
                statusEl.innerText = "The farmer must be in the boat!";
                statusEl.classList.add("animate__animated", "animate__shakeX");
                return;
            }

            const boatEl = document.getElementById("boat");
            isBoatLeft = !isBoatLeft;
            
            if (isBoatLeft) {
                leftShore.push(...boat);
                boatEl.classList.remove("boat-right");
                boatEl.classList.add("boat-left");
            } else {
                rightShore.push(...boat);
                boatEl.classList.remove("boat-left");
                boatEl.classList.add("boat-right");
            }

            boat = [];
            setTimeout(checkGameState, 500);
            updateUI();
        }

        function checkGameState() {
            const statusEl = document.getElementById("status");
            statusEl.className = "status";

            if (rightShore.length === 4) {
                statusEl.innerText = "ðŸŽ‰ Congratulations! You've solved the puzzle!";
                statusEl.classList.add("animate__animated", "animate__bounceIn");
                return;
            }

            const checkDanger = (shore) => {
                return (
                    (shore.includes("fox") && shore.includes("chicken") && !shore.includes("farmer")) ||
                    (shore.includes("chicken") && shore.includes("grain") && !shore.includes("farmer"))
                );
            };

            if (checkDanger(leftShore) || checkDanger(rightShore)) {
                statusEl.innerText = "âŒ Game Over! You left unsafe items alone!";
                statusEl.classList.add("animate__animated", "animate__shakeX");
                setTimeout(resetGame, 2000);
            }
        }

        function resetGame() {
            leftShore = ["farmer", "fox", "chicken", "grain"];
            rightShore = [];
            boat = [];
            isBoatLeft = true;
            const statusEl = document.getElementById("status");
            statusEl.className = "status";
            statusEl.innerText = "Start the game! Click on items to move them to the boat.";
            const boatEl = document.getElementById("boat");
            boatEl.classList.remove("boat-right");
            boatEl.classList.add("boat-left");
            updateUI();
        }

        function updateUI() {
            const renderShore = (items) => items
                .map(item => `
                    <div class="item" onclick="moveToBoat('${item}')">
                        ${getEmoji(item)}
                    </div>
                `)
                .join("");

            document.getElementById("left-shore").innerHTML = renderShore(leftShore);
            document.getElementById("right-shore").innerHTML = renderShore(rightShore);
            document.getElementById("boat").innerHTML = boat
                .map(item => `<div class="item in-boat">${getEmoji(item)}</div>`)
                .join("") || "ðŸ›¶";
        }

        function getEmoji(item) {
            const emojis = {
                farmer: "ðŸ‘¨â€ðŸŒ¾",
                fox: "ðŸ¦Š",
                chicken: "ðŸ”",
                grain: "ðŸŒ¾"
            };
            return emojis[item] || "";
        }

        resetGame();
    </script>
