import { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - navbarHeight*0.25;
      init();
    };

    let particlesArray = [];
    const numberOfParticles = 100;
    
    const mouse = { x: null, y: null, radius: 100 };

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y - navbarHeight;
    });

    class Particle {
      constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = x;
        this.baseY = y;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let force = (mouse.radius - distance) / mouse.radius;
        let directionX = (dx / distance) * force * 5;
        let directionY = (dy / distance) * force * 5;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
          if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
        }
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y, Math.random() * 3 + 1, "white"));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => {
        particle.draw();
        particle.update();
      });
      requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-[var(--navbar-height)] left-0 w-full pointer-events-none z-0"
      style={{ top: "var(--navbar-height)" }}
    ></canvas>
  );
};

export default BackgroundAnimation;
