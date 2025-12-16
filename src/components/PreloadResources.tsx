import { useEffect } from 'react';

interface PreloadResourcesProps {
  resources: string[];
}

const PreloadResources: React.FC<PreloadResourcesProps> = ({ resources }) => {
  useEffect(() => {
    // 预加载关键资源
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      // 根据资源类型设置as属性
      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) {
        link.as = 'image';
      } else if (resource.match(/\.(woff|woff2|ttf|eot)$/i)) {
        link.as = 'font';
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
      
      // 清理函数
      return () => {
        document.head.removeChild(link);
      };
    });
  }, [resources]);

  return null;
};

export default PreloadResources;