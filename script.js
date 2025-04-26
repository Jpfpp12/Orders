const menuDiv = document.getElementById('menu');
        const orderDiv = document.getElementById('order');
        const orderSection = document.getElementById('order-section');
        let foodItems = [];

        async function getMenu() {
            try {
                const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
                foodItems = await response.json();
                foodItems = foodItems.map(item => ({
                    ...item,
                    imgSrc: `https://source.unsplash.com/300x200/?${item.name},food`
                }));
                showMenu(foodItems);
            } catch (error) {
                alert('Failed to load menu. Please refresh the page.');
            }
        }

        function showMenu(items) {
            menuDiv.innerHTML = '';
            items.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                `;
                menuDiv.appendChild(card);
            });
        }

        function TakeOrder() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const burgers = foodItems.filter(item => item.name.toLowerCase().includes('burger'));
                    const selected = [];
                    for (let i = 0; i < 3; i++) {
                        const randomIndex = Math.floor(Math.random() * burgers.length);
                        selected.push(burgers[randomIndex]);
                    }
                    resolve(selected);
                }, 2500);
            });
        }

        function orderPrep() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ order_status: true, paid: false });
                }, 1500);
            });
        }

        function payOrder() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ order_status: true, paid: true });
                }, 1000);
            });
        }

        function thankyouFnc() {
            alert('Thank you for eating with us today!');
        }

        async function startOrder() {
            try {
                menuDiv.style.display = 'none';
                document.querySelector('.order-btn').style.display = 'none';
                orderSection.style.display = 'block';

                const order = await TakeOrder();
                showOrder(order);

                await orderPrep();
                const payment = await payOrder();

                if (payment.paid) {
                    thankyouFnc();
                }
            } catch (error) {
                alert('Something went wrong. Please try again.');
            }
        }

        function showOrder(orderItems) {
            orderDiv.innerHTML = '';
            orderItems.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                `;
                orderDiv.appendChild(card);
            });
        }

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const currentLeft = sidebar.style.left;
            sidebar.style.left = (currentLeft === '0px') ? '-250px' : '0px';
        }

        window.onload = getMenu;