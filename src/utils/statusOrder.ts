export const statusName = (status: string): string | undefined => {
  switch (status) {
    case "done":
      return "Выполнен";
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    default:
      return "statusName error";
  }
};
