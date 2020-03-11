export const convertBytes =(bytes)=> {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  
    if (bytes) {
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  
      if (i === 0) {
        return bytes + " " + sizes[i];
      }
      
      return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
    
    }
  };