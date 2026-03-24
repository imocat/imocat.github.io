const revealItems = document.querySelectorAll('.reveal');
const nodes = [...document.querySelectorAll('.map-node')];
const heroVisual = document.querySelector('.hero__visual');
const zoomValue = document.querySelector('.zoom-dock__value');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.18,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

let activeIndex = 0;

function setActiveNode(index) {
  nodes.forEach((node, nodeIndex) => {
    node.classList.toggle('active', nodeIndex === index);
  });
}

function cycleNodes() {
  activeIndex = (activeIndex + 1) % nodes.length;
  setActiveNode(activeIndex);
}

setActiveNode(activeIndex);
window.setInterval(cycleNodes, 1800);

nodes.forEach((node, index) => {
  node.addEventListener('mouseenter', () => {
    activeIndex = index;
    setActiveNode(index);
  });
});

if (heroVisual && zoomValue) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    heroVisual.style.setProperty('--tilt-x', `${offsetY * -1}deg`);
    heroVisual.style.setProperty('--tilt-y', `${offsetX}deg`);
    const nextZoom = 108 + Math.round(((event.clientX - rect.left) / rect.width) * 8);
    zoomValue.textContent = `${nextZoom}%`;
  });

  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.removeProperty('--tilt-x');
    heroVisual.style.removeProperty('--tilt-y');
    zoomValue.textContent = '112%';
  });
}
