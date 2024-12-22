const bootMessages = [
    "Initializing bootloader...",
    "Verifying hardware integrity...",
    "Loading system components...",
    "Mounting root filesystem...",
    "Starting kernel modules...",
    "Configuring network services...",
    "Checking for system updates...",
    "Applying security patches...",
    "Loading device drivers...",
    "Initializing user environment...",
    "Starting graphical interface...",
    "Finalizing system initialization...",
    "Boot sequence completed. Welcome to JakkOS!"
];

const bootLoader = document.querySelector(".loader-fill");
const statusMessage = document.getElementById("status-message");
const progressPercent = document.getElementById("progress-percent");

let step = 0;

const updateBootProcess = () => {
    if (step < bootMessages.length) {
        statusMessage.textContent = bootMessages[step];
        const progress = Math.min(((step + 1) / bootMessages.length) * 100, 100).toFixed(0);
        progressPercent.textContent = `${progress}%`;
        bootLoader.style.width = `${progress}%`;
        step++;
        setTimeout(updateBootProcess, 700); // Adjust time per step
    } else {
        // Redirect to GUI after boot completes
        setTimeout(() => {
            window.location.href = "gui.html";
        }, 1000);
    }
};

// Start boot process
updateBootProcess();