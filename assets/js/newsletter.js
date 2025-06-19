document.getElementById('newsletterForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = document.getElementById('subscribeBtn');
    const message = document.getElementById('subscribeMessage');
    const email = document.getElementById('newsletterEmail').value.trim();

    btn.innerHTML = "Subscribing...";
    btn.disabled = true;

    try {
        const res = await fetch("https://sainath-estate-backend-production.up.railway.app/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (res.ok) {
            btn.innerHTML = "Subscribed ✔";
            document.getElementById('newsletterForm').reset();
        } else {
            throw new Error();
        }
    } catch (err) {
        btn.innerHTML = "Subscribe Now";
        message.textContent = "Subscription failed. Try again.";
    } finally {
        setTimeout(() => {
            btn.innerHTML = "Subscribe Now <i class='far fa-paper-plane text-title'></i>";
            btn.disabled = false;
        }, 2000);
    }
});