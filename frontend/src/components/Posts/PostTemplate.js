import Image from 'react-bootstrap/Image';
import './Posts.scss';
import Card from 'react-bootstrap/Card';

function PostCard({image, textdata}) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>
            {textdata}
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src={image} />
      </Card>
    </>
  );
}

export default PostCard;

