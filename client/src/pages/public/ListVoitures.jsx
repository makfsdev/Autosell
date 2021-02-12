import React, { useEffect, useState } from "react";
import { getVoituresByValidationCount } from "../../JS/actions/voiture";
import VoitureCard from "../../components/form/VoitureCard";
import { Skeleton, Card } from "antd";
const ListVoitures = () => {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllVoitures();
  }, []);

  const loadAllVoitures = () => {
    setLoading(true);
    getVoituresByValidationCount(true)
      .then((res) => {
        setVoitures(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const cards = () => {
    let totalcards = [];
    for (let i = 0; i < 3; i++) {
      totalcards.push(
        <Card className="col m-3">
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return totalcards;
  };

  return (
    <div className="fluid  ">
      {/* <hr />
      <div
        className="col text-center p-3"
        style={{ backgroundColor: "#2596be" }}
      >
        <h4 style={{ color: "white" }}>LISTE DES VOITURES</h4>
      </div> */}
      <hr />
      <div className="row card-container">
        {!loading ? voitures.map((v) => <VoitureCard voiture={v} />) : cards()}
      </div>
      <hr />
    </div>
  );
};

export default ListVoitures;
