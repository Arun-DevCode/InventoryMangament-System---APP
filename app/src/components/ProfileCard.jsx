import React from "react";

function ProfileCard(props) {
  console.log(props.user);
  return (
    <div>
      <h1>Profile Card</h1>
      <h3>{props.user.name}</h3>
      <p>{props.user.email}</p>
    </div>
  );
}

export default ProfileCard;
