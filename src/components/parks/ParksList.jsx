import React from "react";
import { connect } from "react-redux";
import Park from "./Park";

const ParksList = ({ parks }) => {
  const renderParks = () => {
    return parks.map((park) => <Park key={park.id} park={park} />);
  };

  return (
    <div>
      <h1>Parks List Here</h1>
      {renderParks()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { parks: state.parks };
};

export default connect(mapStateToProps)(ParksList);
