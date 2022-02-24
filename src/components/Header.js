import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectUserName, selectUserPhoto, setSignOut, setUserLogin } from "../features/user/userSlice";
import { auth, provider } from "../firebase";

const Header = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                dispatch(setUserLogin({
                    name: authUser.displayName,
                    email: authUser.email,
                    photo: authUser.photoURL
                }));
                history('/', true);
            }
        });
    }, []);

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                dispatch(setUserLogin({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }));
                history('/', true);
            });
    };

    const logOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(setSignOut());
                history('/login', true);
            });
    }

    return (
        <Nav>
            <Logo src="/assets/images/logo.svg" />
            {!userName ? <LoginContainer><Login onClick={signIn}>Login</Login></LoginContainer> :
                <>
                    <NavMenu>
                        <a>
                            <img src="/assets/images/home-icon.svg" alt="home" />
                            <span>HOME</span>
                        </a>
                        <a>
                            <img src="/assets/images/search-icon.svg" alt="home" />
                            <span>SEARCH</span>
                        </a>
                        <a>
                            <img src="/assets/images/watchlist-icon.svg" alt="home" />
                            <span>WATCHLIST</span>
                        </a>
                        <a>
                            <img src="/assets/images/original-icon.svg" alt="home" />
                            <span>ORIGINALS</span>
                        </a>
                        <a>
                            <img src="/assets/images/movie-icon.svg" alt="home" />
                            <span>MOVIES</span>
                        </a>
                        <a>
                            <img src="/assets/images/series-icon.svg" alt="home" />
                            <span>SERIES</span>
                        </a>
                    </NavMenu>
                    <UserImg onClick={logOut} src={userPhoto} alt={userName} />
                </>
            }
        </Nav>
    );
}

export default Header;

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`;

const Logo = styled.img`
    width: 80px;
`;

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 20px;
    align-items: center;

    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img{
            height: 20px;
        }

        span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after{
                content: "";
                height: 2px;
                background: white;
                position:absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }
        &:hover{
            span:after{
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`;

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`;

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

const LoginContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`;