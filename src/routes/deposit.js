import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBankContext } from "../utils/BankContext";


const Deposit = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [amount, setAmount] = useState("");

  const { loading, authUser, bankUser, setLoading } = useBankContext();
  
  function updateUser() {
    fetch(`/account/update/${authUser}/${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setSuccessMessage(
            `$${amount} has been added to ${authUser}'s account.`
          );
          setLoading(true);
        } catch (err) {
          setErrorMessage("Deposit failed");
          console.log("err:", text);
        }
      });
  }
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSuccessMessage("");
    setErrorMessage("");
    setAmount(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser();

    setAmount("");
  };

  if (!loading)
    return (
      <>
        <Card
          bg="light"
          text="dark"
          border="primary"
          style={{ width: "18rem", position: "relative", left: "100px" }}
        >
          <Card.Header>Deposit</Card.Header>
          <Card.Body>
            <Card.Text>Balance : {bankUser.balance} </Card.Text>
            <form id="depo" onSubmit={handleSubmit}>
              <div>
                <label>User : {bankUser.email}</label>{" "}
              </div>
              
              <div className="mb-3">
                <label
                  htmlFor="exampleInputDepositAmount"
                  className="form-label"
                >
                  Amount : $ {amount}
                </label>
                
                <input
                  type="text"
                  className="form-control"
                  name="depositAmount"
                  value={amount}
                  onChange={handleChange}
                />
              </div>
              
              <button
                disabled={!amount ? true : false}
                type="submit"
                className="btn btn-primary"
              >
                Deposit
              </button>
              {errorMessage && (
                <div className="mt-2 alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="mt-2 alert alert-success" role="alert">
                  {successMessage}
                  <br />
                </div>
              )}
            </form>
          </Card.Body>
        </Card>
      </>
    );
  else
    return (
      <Card>
        <Card.Body>
          <Card.Title>Please Login</Card.Title>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </Card.Body>
      </Card>
    );
};

export default Deposit;
