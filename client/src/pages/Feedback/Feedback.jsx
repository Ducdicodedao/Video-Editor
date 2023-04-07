import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    styled,
    TextField,
    Typography,
    TextareaAutosize,
    Rating,
    Card,
    CardHeader,
    CardContent,
    Avatar,
} from '@mui/material';
import { display } from '@mui/system';
import { useState } from 'react';
const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    margin: 10,
    marginTop: 30,
    backgroundColor: '#000000',
    borderRadius: 5,
    '&:hover': {
        backgroundColor: '#2C2C2C',
    },
}));

function Feedback() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [feedbackList, setFeedbackList] = useState([]);

    const handleRatingChange = (event, value) => {
        setRating(value);
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
        const newFeedback = {
            name: 'John Doe',
            avatar: 'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/306797196_1703968536641651_4379183408914630272_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=z0bKMR2qiuYAX9ZpUZJ&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfAeaClgN5NzzxiST187PF-q5ZHTRQOapqqSB5GbDEUp0g&oe=64344044',
            rating: rating,
            message: feedback,
        };
        setFeedbackList([...feedbackList, newFeedback]);
        setRating(0);
        setFeedback('');
    };

    const getStar = (rating) => {
        var s;
        switch (rating) {
            case 1:
                s = '⭐';
                break;
            case 2:
                s = '⭐⭐';
                break;
            case 3:
                s = '⭐⭐⭐';
                break;
            case 4:
                s = '⭐⭐⭐⭐';
                break;
            case 5:
                s = '⭐⭐⭐⭐⭐';
                break;
            default:
                break;
        }
        return s;
    };

    return (
        <Grid container>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '20px',
                        width: '800px',
                        minHeight: '200px',
                        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
                        marginLeft: '150px',
                        marginRight: '150px',
                        marginTop: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Feedback To Us
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        How about your experience?
                    </Typography>
                    <Rating name="feedback-rating" value={rating} onChange={handleRatingChange} size="large" />
                    <TextareaAutosize
                        name="feedback-text"
                        style={{
                            minHeight: '50px',
                            marginTop: '20px',
                        }}
                        placeholder="Tell us more about your experience"
                        minRows={3}
                        value={feedback}
                        onChange={handleFeedbackChange}
                    />
                    <ColorButton type="submit" variant="contained">
                        Send
                    </ColorButton>
                </form>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'center', paddingTop: '50px', background: '#F9FAFC', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                    Order Feedbacks
                </Typography>
                <div style={{ maxHeight: '600px', overflow: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {feedbackList.map((feedback, index) => (
                            <Card key={index} sx={{ maxWidth: 345, margin: 2 }}>
                                <CardHeader
                                    title={feedback.name}
                                    subheader={`Rating: ${getStar(feedback.rating)}`}
                                    avatar={
                                        <Avatar aria-label="avatar" src={feedback.avatar}>
                                            {feedback.name.charAt(0)}
                                        </Avatar>
                                    }
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {feedback.message}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}
export default Feedback;
