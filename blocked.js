let div = document.createElement('div');
div.style.position = 'fixed';
div.style.top = '0';
div.style.left = '0';
div.style.width = '100%';
div.style.height = '104%';
div.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
div.style.color = 'white';
div.style.display = 'flex';
div.style.justifyContent = 'center';
div.style.alignItems = 'center';
div.style.zIndex = '10000';

let blockedUrl = localStorage.getItem('blockedUrl');

let p = document.createElement('p');
p.textContent = blockedUrl + ' ' + 'Blocked due to a Blacklist!';

div.appendChild(p);

document.body.appendChild(div);

div.style.transition = 'opacity 1s';
div.style.opacity = '0';
setTimeout(function() {
    div.style.opacity = '1';
}, 0);
