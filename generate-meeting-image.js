const { createCanvas } = require('canvas');
const fs = require('fs');

const width = 800;
const height = 600;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// 背景
ctx.fillStyle = 'lightgray';
ctx.fillRect(0, 0, width, height);

// 会议桌
ctx.fillStyle = 'darkgray';
ctx.fillRect(50, 50, 700, 500);

// 白色圆形区域
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.arc(400, 300, 250, 0, Math.PI * 2);
ctx.fill();

// 保存图像
const buffer = canvas.toBuffer('image/jpeg');
fs.writeFileSync('meeting-top-view.jpg', buffer);

console.log('Image generated successfully!'); 