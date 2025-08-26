// Efeito de Teia de Aranha Futurista
class SpiderWeb {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.dots = [];
        this.lines = [];
        this.maxDistance = 150;
        this.dotCount = 50;
        this.init();
    }

    init() {
        this.createCanvas();
        this.createDots();
        this.animate();
        this.handleResize();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'spider-web-canvas';
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        this.resizeCanvas();
    }

    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    createDots() {
        this.dots = [];
        for (let i = 0; i < this.dotCount; i++) {
            this.dots.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    updateDots() {
        this.dots.forEach(dot => {
            dot.x += dot.vx;
            dot.y += dot.vy;

            // Bounce off edges
            if (dot.x <= 0 || dot.x >= this.canvas.width) {
                dot.vx *= -1;
            }
            if (dot.y <= 0 || dot.y >= this.canvas.height) {
                dot.vy *= -1;
            }

            // Keep dots within bounds
            dot.x = Math.max(0, Math.min(this.canvas.width, dot.x));
            dot.y = Math.max(0, Math.min(this.canvas.height, dot.y));
        });
    }

    drawDots() {
        this.dots.forEach(dot => {
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            
            // Glow effect
            const gradient = this.ctx.createRadialGradient(
                dot.x, dot.y, 0,
                dot.x, dot.y, dot.radius * 3
            );
            gradient.addColorStop(0, `rgba(0, 212, 255, ${dot.opacity})`);
            gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Core dot
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.radius * 0.3, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${dot.opacity + 0.3})`;
            this.ctx.fill();
        });
    }

    drawLines() {
        for (let i = 0; i < this.dots.length; i++) {
            for (let j = i + 1; j < this.dots.length; j++) {
                const dot1 = this.dots[i];
                const dot2 = this.dots[j];
                const distance = Math.sqrt(
                    Math.pow(dot2.x - dot1.x, 2) + Math.pow(dot2.y - dot1.y, 2)
                );

                if (distance < this.maxDistance) {
                    const opacity = (1 - distance / this.maxDistance) * 0.3;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(dot1.x, dot1.y);
                    this.ctx.lineTo(dot2.x, dot2.y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateDots();
        this.drawLines();
        this.drawDots();
        
        requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createDots();
        });
    }
}

// Initialize spider web when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // Create container for spider web
        const webContainer = document.createElement('div');
        webContainer.className = 'futuristic-lines';
        heroSection.appendChild(webContainer);
        
        // Initialize spider web
        new SpiderWeb(webContainer);
    }
});

