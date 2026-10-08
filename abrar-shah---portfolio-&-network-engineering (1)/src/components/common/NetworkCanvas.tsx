import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isRouter: boolean;
  label?: string;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export const NetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    // Create network nodes
    const nodeCount = Math.min(Math.floor(width / 35), 36);
    const nodes: Node[] = [];

    const routerLabels = ['Core-01', 'Dist-01', 'Border-GW', 'Sw-VLAN10', 'Sw-VLAN20', 'OSPF-Area0', 'NAT-GW'];

    for (let i = 0; i < nodeCount; i++) {
      const isRouter = i < routerLabels.length;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isRouter ? 4.5 : 2.5,
        isRouter,
        label: isRouter ? routerLabels[i] : undefined
      });
    }

    const packets: Packet[] = [];
    const maxPackets = 12;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const lineColor = isDark ? 'rgba(59, 130, 246, 0.12)' : 'rgba(37, 99, 235, 0.1)';
      const nodeColor = isDark ? '#60a5fa' : '#2563eb';
      const routerColor = isDark ? '#38bdf8' : '#1d4ed8';
      const packetColor = isDark ? '#38bdf8' : '#0284c7';

      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      // Draw connections
      const maxDistance = 140;
      const connections: [number, number][] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            connections.push([i, j]);
            const alpha = 1 - dist / maxDistance;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = alpha * 1.2;
            ctx.stroke();
          }
        }
      }

      // Spawn packets along random active connections
      if (connections.length > 0 && packets.length < maxPackets && Math.random() < 0.08) {
        const randomConn = connections[Math.floor(Math.random() * connections.length)];
        packets.push({
          fromNode: randomConn[0],
          toNode: randomConn[1],
          progress: 0,
          speed: 0.012 + Math.random() * 0.018
        });
      }

      // Draw and update packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const from = nodes[packet.fromNode];
        const to = nodes[packet.toNode];
        if (!from || !to) {
          packets.splice(p, 1);
          continue;
        }

        const px = from.x + (to.x - from.x) * packet.progress;
        const py = from.y + (to.y - from.y) * packet.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = packetColor;
        ctx.shadowColor = packetColor;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isRouter ? routerColor : nodeColor;
        ctx.fill();

        if (node.isRouter && node.label && width > 768) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.7)' : 'rgba(71, 85, 105, 0.75)';
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
