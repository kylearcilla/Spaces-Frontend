export const shortenNumber = (num: number) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K"; 
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; 
  } else if (num < 900) {
    return num; 
  }
};

export const addCommasToNum = (num: string) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const convertToTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);

  return +seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
};

export const uiState = (
  a: any,
  aName: string,
  b?: any,
  bName?: string,
  c?: any,
  cName?: string,
  d?: any,
  dName?: string
): string => {
  
  return `${a ? aName : ""} ${b ? bName : ""} ${c ? cName : ""} ${d ? dName : ""}`.trim();
};
