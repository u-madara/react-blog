import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取所有markdown文件并按文件名排序
const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir)
  .filter(file => file.endsWith('.md'))
  .sort();

// 定义三张要循环使用的图片
const coverImages = [
  "/assets/blog/hello-world/cover.jpg",
  "/assets/blog/dynamic-routing/cover.jpg",
  "/assets/blog/preview/cover.jpg"
];

// 更新文件内容
let updateCount = 0;
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 计算当前文件应该使用的图片索引（循环使用）
  const imageIndex = i % coverImages.length;
  const newImage = coverImages[imageIndex];
  
  // 检查当前图片
  const imageMatch = content.match(/coverImage:\s*"([^"]+)"/);
  const currentImage = imageMatch ? imageMatch[1] : null;
  
  // 如果当前图片不是我们想要的三张之一，或者需要更新为循环图片
  if (currentImage !== newImage) {
    // 替换图片
    const updatedContent = content.replace(
      /coverImage:\s*"([^"]+)"/,
      `coverImage: "${newImage}"`
    );
    
    fs.writeFileSync(filePath, updatedContent);
    updateCount++;
    console.log(`更新 ${file}: ${currentImage} → ${newImage}`);
  }
}

console.log(`\n总共更新了 ${updateCount} 个文件的封面图片`);

// 统计每张图片的使用次数
const imageStats = {};
for (let i = 0; i < files.length; i++) {
  const imageIndex = i % coverImages.length;
  const image = coverImages[imageIndex];
  imageStats[image] = (imageStats[image] || 0) + 1;
}

console.log('\n图片使用统计:');
Object.entries(imageStats).forEach(([image, count]) => {
  console.log(`${image}: ${count} 次`);
});

// 显示前几个文件的图片分配
console.log('\n前10个文件的封面图片:');
for (let i = 0; i < Math.min(10, files.length); i++) {
  const imageIndex = i % coverImages.length;
  const image = coverImages[imageIndex];
  console.log(`${i + 1}. ${files[i]}: ${image}`);
}