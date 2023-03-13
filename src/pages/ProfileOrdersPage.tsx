import { FC } from "react";
import { ProfileOrders } from "../components/profile-orders/ProfileOrders";

type TProfileOrdersPageProps = {
  openModalOrderInfo: () => void;
};

export const ProfileOrdersPage: FC<TProfileOrdersPageProps> = ({
  openModalOrderInfo,
}) => {
  return <ProfileOrders openModalOrderInfo={openModalOrderInfo} />;
};
