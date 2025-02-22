// Set a random background image from Picsum with fallback
const setBackgroundImage = () => {
    const img = new Image();
    img.src = 'https://picsum.photos/1920/1080';
    img.onload = () => {
        document.body.style.backgroundImage = `url('${img.src}')`;
    };
    img.onerror = () => {
        document.body.style.backgroundColor = '#000'; // Fallback color
        console.error('Failed to load background image. Using fallback.');
    };
};
setBackgroundImage();

function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.toggle('visible');
}

// Drag and Drop for desktop icons
function startDrag(event) {
    const icon = event.target.closest('.icon');
    let offsetX = event.clientX - icon.offsetLeft;
    let offsetY = event.clientY - icon.offsetTop;

    function moveAt(e) {
        icon.style.left = e.clientX - offsetX + 'px';
        icon.style.top = e.clientY - offsetY + 'px';
    }

    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveAt);
    }, { once: true });
}

function startMove(event, element) {
    const offsetX = event.clientX - element.offsetLeft;
    const offsetY = event.clientY - element.offsetTop;

    function moveAt(e) {
        element.style.left = e.clientX - offsetX + 'px';
        element.style.top = e.clientY - offsetY + 'px';
    }

    document.addEventListener('mousemove', moveAt);

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveAt);
    }, { once: true });
}

// Open Browser function
function openBrowser() {
    const browser = document.getElementById('browser');
    browser.style.display = 'flex';
}

// Browser window controls
function minimizeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

function maximizeWindow(id) {
    const win = document.getElementById(id);
    win.style.top = '0';
    win.style.left = '0';
    win.style.width = '100%';
    win.style.height = '100%';
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Load URL in browser
function loadURL() {
    const url = document.getElementById('browser-url').value.trim();
    const formattedURL = url.startsWith('http') ? url : `https://${url}`;
    const iframe = document.getElementById('browser-iframe');

    // Attempt to load URL in iframe
    try {
        iframe.src = formattedURL;

        iframe.onload = () => {
            console.log(`Successfully loaded ${formattedURL} in iframe.`);
        };

        iframe.onerror = () => {
            console.warn(`Unable to load ${formattedURL} in iframe. Opening in a new tab.`);
            openInNewTab(formattedURL);
        };
    } catch (error) {
        console.error(`Error loading ${formattedURL}: ${error.message}`);
        openInNewTab(formattedURL);
    }
}

// Open URL in a new browser tab or window
function openInNewTab(url) {
    const newWindow = window.open(url, '_blank');
    if (!newWindow) {
        alert('Pop-up blocked! Please allow pop-ups to open this site.');
    }
}

// Open browser window
function openBrowser() {
    const browser = document.getElementById('browser');
    browser.style.display = 'flex';
    document.getElementById('browser-url').value = ''; // Clear input
    document.getElementById('browser-iframe').src = ''; // Clear iframe
}

// Close browser window
function closeBrowser() {
    const browser = document.getElementById('browser');
    browser.style.display = 'none';
    document.getElementById('browser-iframe').src = ''; // Reset iframe
}

// Context Menu functionality
const desktop = document.getElementById('desktop');
const contextMenu = document.getElementById('context-menu');

desktop.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenu.style.top = `${e.clientY}px`;
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.display = 'block';
});

document.addEventListener('click', () => {
    contextMenu.style.display = 'none';
});

// Ensure icons do not overlap
function preventIconOverlap(icon) {
    const icons = document.querySelectorAll('.icon');
    icons.forEach((otherIcon) => {
        if (otherIcon !== icon) {
            const rect1 = icon.getBoundingClientRect();
            const rect2 = otherIcon.getBoundingClientRect();
            if (
                rect1.left < rect2.right &&
                rect1.right > rect2.left &&
                rect1.top < rect2.bottom &&
                rect1.bottom > rect2.top
            ) {
                icon.style.left = rect2.right + 'px';
                icon.style.top = rect2.bottom + 'px';
            }
        }
    });
}

// Handle URL or search input in the browser
function handleBrowserInput(event) {
    if (event.key === 'Enter') {
        const urlInput = event.target.value.trim();
        const iframe = document.getElementById('browser-iframe');
        
        // Check if it's a valid URL, otherwise perform a search
        if (urlInput.startsWith('http') || urlInput.includes('.')) {
            const formattedURL = urlInput.startsWith('http') ? urlInput : `https://${urlInput}`;
            iframe.src = formattedURL;
        } else {
            const searchURL = `https://www.google.com/search?q=${encodeURIComponent(urlInput)}`;
            iframe.src = searchURL;
        }
    }
}

// Add event listeners to ensure icons do not overlap after dragging
const icons = document.querySelectorAll('.icon');
icons.forEach((icon) => {
    icon.addEventListener('mouseup', () => preventIconOverlap(icon));
});

// Open Recycle Bin
function openRecycleBin() {
    const recycleBin = document.getElementById('recycle-bin');
    recycleBin.style.display = 'flex';
}

// Open File Explorer
function openFileExplorer() {
    const fileExplorer = document.getElementById('file-explorer');
    fileExplorer.style.display = 'flex';

    // Populate with example files
    const files = [
        { name: 'Document.txt', icon: 'https://cdn-icons-png.flaticon.com/512/3022/3022293.png' },
        { name: 'Image.png', icon: 'https://cdn-icons-png.flaticon.com/512/337/337946.png' },
        { name: 'Music.mp3', icon: 'https://cdn-icons-png.flaticon.com/512/727/727245.png' },
        { name: 'Video.mp4', icon: 'https://cdn-icons-png.flaticon.com/512/727/727234.png' },
        { name: 'Presentation.pptx', icon: 'https://cdn-icons-png.flaticon.com/512/337/337946.png' },
        { name: 'Spreadsheet.xlsx', icon: 'https://cdn-icons-png.flaticon.com/512/3022/3022250.png' },
        { name: 'Code.js', icon: 'https://cdn-icons-png.flaticon.com/512/2306/2306114.png' }
    ];

    const fileContainer = document.getElementById('file-container');
    fileContainer.innerHTML = '';

    files.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.classList.add('file');
        fileElement.innerHTML = `
            <img src="${file.icon}" alt="${file.name}">
            <span>${file.name}</span>
        `;
        fileContainer.appendChild(fileElement);
    });

    makeFilesDraggable();
}

// Enable dragging for files in File Explorer
function makeFilesDraggable() {
    const fileElements = document.querySelectorAll('.file');
    fileElements.forEach(file => {
        file.setAttribute('draggable', 'true');
        file.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', file.querySelector('span').textContent);
        });
    });
}

// Close generic windows
function closeWindowById(id) {
    const windowElement = document.getElementById(id);
    windowElement.style.display = 'none';
}

// Terminal functionality
function handleTerminalInput(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('terminal-input').value;
        const output = document.getElementById('terminal-output');
        let response = '';

        switch (input.toLowerCase()) {
            case 'ls':
            case 'dir':
                response = 'Desktop Documents Downloads Music Pictures Videos';
                break;
            case 'pwd':
                response = '/home/user';
                break;
            case 'whoami':
                response = 'user';
                break;
            default:
                response = `Command not found: ${input}`;
        }

        output.innerHTML += `<div>${input}</div><div>${response}</div>`;
        document.getElementById('terminal-input').value = '';
    }
}

// Update time and date
function updateTimeAndDate() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString();
    document.getElementById('current-date').textContent = now.toLocaleDateString();
}

setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();