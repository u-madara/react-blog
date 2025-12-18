const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 读取原始文件
const filePath = path.join(__dirname, '_posts', '07.md');
const content = fs.readFileSync(filePath, 'utf8');

// 分割文件内容
function splitMarkdownContent(content) {
  const sections = [];
  
  // 移除前置元数据
  const frontMatterEnd = content.indexOf('---', 3) + 3;
  const mainContent = content.substring(frontMatterEnd).trim();
  
  // 定义分割点
  const sectionTitles = [
    '## 1. 异步编程的演进历程',
    '## 2. 事件循环与任务队列',
    '## 3. 高级异步模式',
    '## 4. 错误处理与调试',
    '## 5. 实际应用场景与最佳实践',
    '## 6. 性能优化与最佳实践',
    '## 7. 未来发展与趋势',
    '## 结论'
  ];
  
  // 添加引言部分
  const introEnd = mainContent.indexOf(sectionTitles[0]);
  sections.push({
    title: '引言',
    content: mainContent.substring(0, introEnd).trim()
  });
  
  // 分割各个章节
  for (let i = 0; i < sectionTitles.length - 1; i++) {
    const start = mainContent.indexOf(sectionTitles[i]);
    const end = mainContent.indexOf(sectionTitles[i + 1]);
    
    if (start !== -1 && end !== -1) {
      const sectionContent = mainContent.substring(start, end).trim();
      sections.push({
        title: sectionTitles[i].replace('## ', ''),
        content: sectionContent
      });
    }
  }
  
  // 添加最后一部分（结论）
  const lastSectionStart = mainContent.indexOf(sectionTitles[sectionTitles.length - 1]);
  if (lastSectionStart !== -1) {
    sections.push({
      title: sectionTitles[sectionTitles.length - 1].replace('## ', ''),
      content: mainContent.substring(lastSectionStart).trim()
    });
  }
  
  return sections;
}

// 创建分割后的markdown文件
function createMarkdownFiles(sections) {
  const outputDir = path.join(__dirname, 'docx-files');
  
  sections.forEach((section, index) => {
    // 创建markdown文件
    const mdPath = path.join(outputDir, `${index + 1}. ${section.title}.md`);
    
    // 写入markdown文件
    fs.writeFileSync(mdPath, section.content, 'utf8');
    console.log(`已创建: ${mdPath}`);
  });
}

// 执行转换
const sections = splitMarkdownContent(content);
console.log(`分割为 ${sections.length} 个部分`);
createMarkdownFiles(sections);

console.log('Markdown文件创建完成!');