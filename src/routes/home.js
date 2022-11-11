import { Card } from "react-bootstrap";
import logo from "./bank.png";


function Home() {
 
    return (
      <>
        <Card
          bg="light"
          text="dark"
          border="primary"
          style={{ width: "18rem", position: "relative", left: "100px" }}
        >
          <Card.Body>
            <Card.Title>Home</Card.Title>
            <Card.Text>A fake bank for you to play with fake money.</Card.Text>
            <Card.Img variant="top" src={logo} className="img-fluid" />
          </Card.Body>
        </Card>
      </>
    );
}

export default Home;
