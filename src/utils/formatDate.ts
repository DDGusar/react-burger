export const formatDate = (orderData: string): string => {
  const orderDate = new Date(orderData);
  const isToday = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (orderDate.valueOf() < today.getTime() - 86400000) {
      const delta = now.getTime() - orderDate.getTime();
      return Math.floor(delta / 1000 / 60 / 60 / 24) + " дней назад";
    } else if (orderDate < today) {
      return "Вчера";
    } else {
      return "Сегодня";
    }
  };
  return `${isToday()}, 
              ${orderDate.getHours()}:${
    orderDate.getMinutes() >= 10
      ? orderDate.getMinutes()
      : `0${orderDate.getMinutes()}`
  } i-GMT+3`;
};
