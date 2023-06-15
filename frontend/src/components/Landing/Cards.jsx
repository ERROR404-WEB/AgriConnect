import React from "react";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import Conversation from "./icons/conversation.gif";
import Carousel from "react-bootstrap/Carousel";
import Avatar from "./icons/avatar.gif";
import Mail from "./icons/mail.gif";
import Camera from "./icons/camera.gif"
import Secure from "./icons/secure.gif"
import Stocks from "./icons/stock.gif"

function Cards() {
  return (
    <>

      <div className="text-center justify-content-center heading ">
        <h3 className="services" >Our Services</h3>
      </div>
      <div className="servicestextt text-center">
        <h6> Having Trouble to get funds, loans ?</h6>
        <h6> Searching for a platform to invest on farmers?</h6>

      </div>
      <Carousel variant="dark" interval={2000}>
        <Carousel.Item >
          <div className="slide1" >
            <Card className="cardd hh">
              <Card.Img variant="top" className="cardimg" src={Conversation} />
              <Card.Body>
                <Card.Title>Collaborate</Card.Title>
                <Card.Text>
                  Our web page provides a platform where farmers can collaborate
                  with investors
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="cardd hh">
              <Card.Img variant="top" className="cardimg" src={Avatar} />
              <Card.Body>
                <Card.Title>Profiles</Card.Title>
                <Card.Text>
                  Create your profile and showcase your skills.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="cardd hh">
              <Card.Img variant="top" className="cardimg" src={Mail} />
              <Card.Body>
                <Card.Title>Connect</Card.Title>
                <Card.Text>
                  Our web page provides an one to one interaction between farmers
                  and investors.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>

        <Carousel.Item >
          <div className="slide1" >
            <Card className="cardd hh">
              <Card.Img variant="top" className="cardimg" src={Camera} />
              <Card.Body>
                <Card.Title>Share</Card.Title>
                <Card.Text>
                  Share your experiences and day to day activities in feed.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="cardd hh">
              <Card.Img variant="top" className="cardimg" src={Secure} />
              <Card.Body>
                <Card.Title>Secure</Card.Title>
                <Card.Text>
                  Our web page is user friendly and secure
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="cardd hh">
              <Card.Img variant="top" className="cardimg" src={Stocks} />
              <Card.Body>
                <Card.Title>Invest and earn</Card.Title>
                <Card.Text>
                  Investors can invest on farmers and work together
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>
      </Carousel>

    </>
  );
}

export default Cards;
