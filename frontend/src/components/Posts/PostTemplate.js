import  React , {useState ,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
//import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
//import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import userIcon from './images/user.svg';
import "./postComments.css";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard(props) {

  const post = props.post;

  //console.log(post);

  const [expanded, setExpanded] = useState(false);

  const [comments,setComments]=useState([]);

  const [commentsIndex,setCommentsIndex]=useState(0);

  const [likes,setLikes]=useState(post.likes);

  const [isLiked,setIsLiked]=useState(false);

  const [comment,setComment]=useState('');

  useEffect(()=>{
    axios.post('http://localhost:5000/api/posts/likeCheck',{
      user:localStorage.getItem('userid'),
      post:post._id,
    }).then((res)=>{
      if(res.data==true)
      setIsLiked(true);
      else
      setIsLiked(false);
    })
  },[]);

  const handleExpandClick = () => {
    setExpanded(!expanded);


    if(expanded===false)
    {
    axios.post('http://localhost:5000/api/posts/getComments',{
      id:post._id,
      index:commentsIndex,
    }).then((res)=>{
      if(res.data.comments.length)
      {
        if(commentsIndex==0)
      setCommentsIndex(commentsIndex+1);
      setComments((prev)=>{
        return [...prev,...res.data.comments];
      });
      }
    })
  }

  };

  return (
    <Card sx={{ width:'60%' ,minWidth:'30rem' , margin:'1rem' }}>
      <CardHeader
        avatar={
          <>
          <Avatar sx={{ bgcolor: red[500] ,marginRight :'1rem' }} src={post.owner.profilepic}/>
          <h3>{post.owner.name}</h3>
          </>
        }

        action={
          <h4>{post.time}</h4>
        }
        
        title={<h1>{post.title}</h1>}
      />
      <img src={post.image} style={{width:'auto',height:'35vh'}}/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" sx={{color : `${isLiked ? 'red' :'lightgrey' }`}} onClick={()=>{
          setIsLiked(!isLiked);
          if(isLiked)
          {
            setLikes(likes-1);
            axios.post('http://localhost:5000/api/posts/unlikePost',{
              user:localStorage.getItem('userid'),
              post:post._id,
            }).catch((err)=>{
              if(err)
              {
              alert(err);
              window.location.reload();
              }
            }
            )
          }
          else
          {
            setLikes(likes+1);
            axios.post('http://localhost:5000/api/posts/likePost',{
              user:localStorage.getItem('userid'),
              post:post._id,
            }).catch((err)=>{
              if(err)
              {
              alert(err);
              window.location.reload();
              }
            })
          }
        }}>
          <FavoriteIcon />
        </IconButton>
        <h5 style={{marginTop:'1%'}}>{likes}</h5>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <hr/>
        <div className='post-prompt-text' style={{paddingRight:'3%'}}>


          <img src={userIcon} alt="user-image" className="user-icon" style={{height:'7%',width:'7%'}}/>


          <input className='post-button' placeholder="write comment" style={{marginRight:'2%'}} onChange={(e)=>{
            setComment(e.target.value);
          }}/>


          <button style={{backgroundColor:'blue'}}  onClick={()=>{

            axios.post('http://localhost:5000/api/posts/createComment',{
              post:post._id,
              user:localStorage.getItem('userid'),
              content:comment,
            }).then((res)=>{
              if(res.data==="yes")
              alert("comment added succesfully");
              else
              alert("oops some error occured");
            })

          }}>ok</button>
        </div>
        <hr/>

          {
            comments.map((comment,i)=>{
              return(
                <div key={comment._id} className='comment'>
                  <img className='profile-pic' src={comment.owner.profilepic}/>
                  <div className='comment-content'>
                    <h4>{comment.owner.name}</h4>
                    <div className='comment-bio'>
                    <p>{comment.owner.bio}</p>
                    </div>
                    <p>{comment.content}</p>
                    <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                    <p>{comment.time}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }

          <button style={{width:'100%'}} onClick={()=>{
            axios.post('http://localhost:5000/api/posts/getComments',{
              id:post._id,
              index:commentsIndex,
            }).then((res)=>{
              if(res.data.commeents.length)
              {
                setComments((prev)=>{
                  return [...prev,...res.data.comments];
                })
                setCommentsIndex(commentsIndex+1);
              }
            })
          }}>
            load more comments
          </button>

        </CardContent>
      </Collapse>
    </Card>
  );
}