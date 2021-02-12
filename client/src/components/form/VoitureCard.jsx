import React from "react";
import { Card } from "antd";
import pic from "../../image marque voiture/car-expert.png";
import { EyeOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const VoitureCard = ({ voiture }) => {
  const { _id, marque, modèle, année, version, kilométrage, images } = voiture;
  return (
    <Card
      hoverable
      className=" mt-3 mb-3"
      cover={
        <img
          className="p-1"
          alt={marque}
          src={images && images.length ? images[0].url : pic}
        />
      }
      actions={[
        <Link to={`/voiture/${_id}`}>
          <EyeOutlined className="text-info" />
        </Link>,
        <Link to="/voiture/contact">
          <PhoneOutlined style={{ color: "green" }} />
        </Link>,
      ]}
    >
      <Meta description={" Modèle " + année} title={marque + "~~" + modèle} />
      <Meta description={kilométrage + " KM"} />
      <Meta description={version} />
    </Card>
  );
};

export default VoitureCard;
