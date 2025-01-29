const startCountdown = (dateString, timeString, elementId) => {
    const targetDate = new Date(`${dateString} ${timeString}`).getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            document.getElementById(elementId).innerHTML = "Appointment Time Reached!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById(elementId).innerHTML = `${days} : ${hours} : ${minutes} : ${seconds}`;
    };

    setInterval(updateTimer, 1000);
};
