document.addEventListener('DOMContentLoaded', () => {

    const userContainer = document.getElementById('user-container');
    const statusMessage = document.getElementById('status-message');
    const reloadBtn = document.getElementById('reload-btn');

    const API_URL = 'https://jsonplaceholder.typicode.com/users';

    const fetchUsers = async () => {
        userContainer.innerHTML = '';
        statusMessage.textContent = 'Loading users...';
        statusMessage.classList.remove('error');

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const users = await response.json();
            statusMessage.textContent = '';
            displayUsers(users);

        } catch (error) {
            console.error('Failed to fetch users:', error);
            statusMessage.textContent = `Error: ${error.message}. Please check your connection and try again.`;
            statusMessage.classList.add('error');
        }
    };

    const displayUsers = (users) => {
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            const address = `
                ${user.address.street}, ${user.address.suite}<br>
                ${user.address.city}, ${user.address.zipcode}
            `;

            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <div class="address">
                    <strong>Address:</strong><br>${address}
                </div>
            `;

            userContainer.appendChild(userCard);
        });
    };

    fetchUsers();
    reloadBtn.addEventListener('click', fetchUsers);
});
