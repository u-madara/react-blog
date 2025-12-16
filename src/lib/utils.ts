// 处理Markdown内容中的环境变量引用
export const processMarkdownContent = (content: string): string => {
  // 替换 process.env.NODE_ENV 为字符串字面量
  let processedContent = content.replace(
    /process\.env\.NODE_ENV/g,
    "'development'"
  );
  
  // 处理其他可能的环境变量引用
  processedContent = processedContent.replace(
    /process\.env\.\w+/g,
    "undefined"
  );
  
  // 处理 Node.js Buffer 对象，替换为浏览器兼容的版本
  processedContent = processedContent.replace(
    /Buffer\.alloc\((\d+)\)/g,
    "new Uint8Array($1)"
  );
  
  processedContent = processedContent.replace(
    /Buffer\.from\(([^)]+)\)/g,
    "new TextEncoder().encode($1)"
  );
  
  // 处理 require 语句
  processedContent = processedContent.replace(
    /const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\);?/g,
    "// const $1 = require('$2'); // 浏览器环境中不可用"
  );
  
  // 处理 fs 模块引用
  processedContent = processedContent.replace(
    /const\s+fs\s*=\s*require\(['"]fs['"]\)/g,
    "// const fs = require('fs'); // 浏览器环境中不可用"
  );
  
  // 处理 fs.promises 引用
  processedContent = processedContent.replace(
    /const\s+fs\s*=\s*require\(['"]fs['"]\)\.promises/g,
    "// const fs = require('fs').promises; // 浏览器环境中不可用"
  );
  
  // 处理 require('fs').promises
  processedContent = processedContent.replace(
    /require\(['"]fs['"]\)\.promises/g,
    "// require('fs').promises // 浏览器环境中不可用"
  );
  
  return processedContent;
};