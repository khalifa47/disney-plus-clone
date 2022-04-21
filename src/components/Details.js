// import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from '../requests/axios';
import requests from "../requests/requests";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import YouTube from "react-youtube";
// import db from "../firebase";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Details = () => {
    // const history = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const [trailers, setTrailers] = useState([]);
    const imageBasePath = "https://image.tmdb.org/t/p/original";

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
    };

    const opts = {
        width: '100%',

        playerVars: {
            autoplay: 0,
            playsinline: 1
        }
    };

    // useEffect(() => {
    //     getDoc(doc(db, 'movies', id))
    //         .then(doc => {
    //             if (doc.exists) {
    //                 setMovie(doc.data());
    //             } else {
    //                 history('/');
    //             }
    //         });
    // }, []);



    useEffect(() => {
        const fetchData = async () => {
            let temp = [];

            const request = await axios.get(requests.fetchById(id));
            const trailerRequest = await axios.get(requests.fetchTrailers(id));

            trailerRequest.data.results.forEach(result => {
                if (result.type === "Trailer") {
                    temp.push(result);
                }
            });

            setMovie(request.data);
            setTrailers(temp)
            return request;
        }
        fetchData();
    }, [id]);

    return (
        <Container>
            {movie && (
                <>
                    <Background>
                        <img src={imageBasePath + movie.backdrop_path} alt="" />
                    </Background>
                    <Title>
                        <h1>{movie.title}</h1>
                    </Title>
                    <Controls>
                        <PlayButton>
                            <img src="/images/play-icon-black.png" alt="" />
                            <span>PLAY</span>
                        </PlayButton>

                        {trailers.length !== 0 && (
                            <>
                                <CustomPopup
                                    trigger={
                                        <TrailerButton>
                                            <img src="/images/play-icon-white.png" alt="" />
                                            <span>Trailer</span>
                                        </TrailerButton>
                                    }
                                    position="top center"
                                    modal
                                >
                                    <Carousel {...settings}>
                                        {trailers?.map(trailer => (
                                            <YouTube
                                                key={trailer.id}
                                                videoId={trailer.key}
                                                opts={opts}
                                            />
                                        ))}
                                    </Carousel>
                                </CustomPopup>
                            </>
                        )}
                        <AddButton>
                            <span>+</span>
                        </AddButton>
                        <GroupWatchButton>
                            <img src="/images/group-icon.png" alt="" />
                        </GroupWatchButton>

                    </Controls>

                    <Subtitle>
                        {movie.release_date + " | " + movie.runtime + "m | " + movie.vote_average}
                    </Subtitle>
                    <Tagline>
                        {movie.tagline}
                    </Tagline>
                    <Description>
                        {movie.overview}
                    </Description>
                </>
            )}
        </Container>
    );
}

export default Details;

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
`;

const Carousel = styled(Slider)`
    margin-top: 20px;

    ul li button{
        &:before{
            font-size: 10px;
            color: rgb(150, 158, 171);
        }
    }

    li.slick-active button:before{
        color: white;
    }

    button {
        z-index: 1;
    }
`;

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.8;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Title = styled.div`
    height: 30vh;
    min-height: 170px;
    width: 35vw;
    min-width: 200px;
    margin-top: 60px;
    display: flex;

    h1{
        font-size: 50px;
        letter-spacing: 2px;
        align-self: flex-end;
    }
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
`;

const PlayButton = styled.button`
    border-radius: 4px;
    font-size: 15px;
    display: flex;
    align-items: center;
    height: 56px;
    background: rgb(249, 249, 249);
    border: none;
    padding: 0 24px;
    margin-right: 22px;
    letter-spacing: 1.8px;
    cursor: pointer;
    text-transform: uppercase;

    &:hover{
        background: rgb(198, 198, 198);
    }
`;

const TrailerButton = styled(PlayButton)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
`;

const AddButton = styled.button`
    margin-right: 16px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid white;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;

    span{
        font-size: 30px;
        color: white;
    }
`;
const GroupWatchButton = styled(AddButton)`
    background: rgb(0, 0, 0);
`;

const Subtitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`;

const Tagline = styled(Subtitle)`
    font-size: 20px;
    font-weight: bold;
`;

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249);
    max-width: 700px;
`;

const CustomPopup = styled(Popup)`
    &-content{
        background: transparent;
        border: none;
    }
`;