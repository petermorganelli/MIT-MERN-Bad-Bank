
import { Card } from "react-bootstrap";
import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./data.css";
import { useBankContext } from "../utils/BankContext"

const Data = () => {

  const { loading, bankUser } = useBankContext();

  if (!loading)
    return (
      <>
        <Card
          bg="light"
          text="dark"
          border="primary"
          style={{ width: "18rem", position: "relative", left: "100px" }}
        >
          <Card.Body>
            <Card.Title>User Info</Card.Title>
            <Card.Text>Name : {bankUser.name}</Card.Text>
            <Card.Text>Email : {bankUser.email}</Card.Text>
            <Card.Text>Balance : ${bankUser.balance}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
};

export default Data;
