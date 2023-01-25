import PropTypes from "prop-types";
import { ProfileOrders } from "../components/profile-orders/ProfileOrders";
export function ProfileOrdersPage({ openModalOrderInfo }) {
  return <ProfileOrders openModalOrderInfo={openModalOrderInfo} />;
}

ProfileOrdersPage.propTypes = {
  openModalOrderInfo: PropTypes.func.isRequired,
};
