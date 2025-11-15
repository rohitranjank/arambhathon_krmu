document.addEventListener("DOMContentLoaded", () => {
    
    const dietPlans = {
        "50-55": `
            <h3>Diet Plan for 50-55 KG</h3>
            <ul>
                <li>Breakfast: Oats + 2 eggs + 1 banana</li>
                <li>Lunch: 1 plate rice + 1 bowl dal + veggies</li>
                <li>Evening: Peanut butter sandwich</li>
                <li>Dinner: Roti(2) + Paneer/Chicken + Salad</li>
            </ul>
        `,
        "55-60": `
            <h3>Diet Plan for 55-60 KG</h3>
            <ul>
                <li>Breakfast: 3 eggs + brown bread + fruit</li>
                <li>Lunch: Rice + dal + chicken/paneer + salad</li>
                <li>Snack: Protein shake</li>
                <li>Dinner: Roti(3) + veggies + chicken</li>
            </ul>
        `,
        "60-65": `
            <h3>Diet Plan for 60-65 KG</h3>
            <ul>
                <li>Breakfast: 4 eggs + oats + almonds</li>
                <li>Lunch: Rice + dal + 150g chicken + sprouts</li>
                <li>Evening Snack: Fruit + nuts</li>
                <li>Dinner: Roti(3) + veggies + paneer/chicken</li>
            </ul>
        `,
        "65-70": `
            <h3>Diet Plan for 65-70 KG</h3>
            <ul>
                <li>Breakfast: Oats + 4 eggs + Fruit bowl</li>
                <li>Lunch: Rice + dal + chicken/paneer + salad</li>
                <li>Evening: Protein shake + nuts</li>
                <li>Dinner: Roti(4) + veggies</li>
            </ul>
        `,
        "70-75": `
            <h3>Diet Plan for 70-75 KG</h3>
            <ul>
                <li>Breakfast: 5 eggs + oats + milk</li>
                <li>Lunch: Chicken + rice + veggies</li>
                <li>Snack: Banana + peanut butter</li>
                <li>Dinner: Roti(4) + dal + paneer</li>
            </ul>
        `,
        "75-80": `
            <h3>Diet Plan for 75-80 KG</h3>
            <ul>
                <li>Breakfast: Oats + 6 eggs + Fruit smoothie</li>
                <li>Lunch: High protein (chicken/paneer) + brown rice</li>
                <li>Snack: Protein shake + nuts</li>
                <li>Dinner: Roti(5) + veggies + dal</li>
            </ul>
        `,
        "80-85": `
            <h3>Diet Plan for 80-85 KG</h3>
            <ul>
                <li><b>Breakfast:</b> Oats + 6 eggs (3 whole, 3 whites) + 1 apple</li>
                <li><b>Mid-Morning Snack:</b> Peanut butter toast + whey shake</li>
                <li><b>Lunch:</b> 1.5 cups rice + dal + 200g chicken/paneer + salad</li>
                <li><b>Evening Snack:</b> Banana + almonds</li>
                <li><b>Dinner:</b> 4 rotis + veggies + dal + 100g paneer/chicken</li>
            </ul>
        `,
        "85-90": `
            <h3>Diet Plan for 85-90 KG</h3>
            <ul>
                <li><b>Breakfast:</b> Oats with milk + 7 eggs (3 whole, 4 whites) + 1 banana</li>
                <li><b>Mid-Morning Snack:</b> Fruit bowl + whey protein shake</li>
                <li><b>Lunch:</b> 2 cups rice + dal + 250g chicken/paneer + salad</li>
                <li><b>Evening Snack:</b> Nuts + peanut butter sandwich</li>
                <li><b>Dinner:</b> 5 rotis + mixed veggies + dal + chicken/paneer</li>
            </ul>
        `,

    };

    const weightSelector = document.getElementById("weightRange");
    const dietResult = document.getElementById("dietResult");

    weightSelector.addEventListener("change", () => {
        const selected = weightSelector.value;

        if (dietPlans[selected]) {
            dietResult.innerHTML = dietPlans[selected];
            dietResult.classList.remove("hidden");
        } else {
            dietResult.classList.add("hidden");
        }
    });
});
