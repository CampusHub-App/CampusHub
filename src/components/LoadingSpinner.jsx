const LoadingSpinner = ({ 
  size = 'md', 
  color = '#027FFF', 
  text = 'Loading...' 
}) => {

  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeMap[size]} border-4 rounded-full animate-spin`}
        style={{ 
          borderColor: color,
          borderTopColor: 'transparent'
        }}
      ></div>
      {text && (
        <p className={`ml-4 font-medium ${textSizeMap[size]}`}>{text}</p>
      )}
    </div>
  );
};

export const FullPageSpinner = ({ 
  size = 'lg', 
  color = '#027FFF', 
  text = 'Loading...' 
}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner size={size} color={color} text={text} />
    </div>
  );
};

export default LoadingSpinner;