import React, { useEffect } from 'react'
import { auth, provider } from '../firebase'
import styled from 'styled-components'
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() =>{
        auth.onAuthStateChanged(async(user) =>{
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                }))
                history.push("/");
            }
        })
    },[])

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) =>{
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            }))
            history.push("/");
        })
    }

    const signOut = () => {
        auth.signOut().then(() =>{
            dispatch(setSignOut());
            history.push("/login");
        })
    }
    return (
        <Nav>
            <a href = "/">
                <Logo src = "./images/logo.svg" />
            </a>
            {!userName ? (
                <LoginContainer>
                    <Login onClick={signIn}>Login</Login>
                </LoginContainer>
                ) :
                <>
                    <NavMenu>
                        <a href="/">
                            <img src = "/images/home-icon.svg" />
                            <span>Home</span>
                        </a>
                        <a>
                            <img src = "/images/search-icon.svg" />
                            <span>Search</span>
                        </a>
                        <a>
                            <img src = "/images/watchlist-icon.svg" />
                            <span>WatchList</span>
                        </a>
                        <a>
                            <img src = "/images/original-icon.svg" />
                            <span>Originals</span>
                        </a>
                        <a>
                            <img src = "/images/movie-icon.svg" />
                            <span>Movies</span>
                        </a>
                        <a>
                            <img src = "/images/series-icon.svg" />
                            <span>Series</span>
                        </a>
                    </NavMenu>
                    <UserImg 
                        onClick={signOut}
                        src = {userPhoto} />
                </>  
            }
            
        </Nav>
    ) 
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`

const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
    flex-flow: row norap;
    @media (max-width: 768px){
        display: none;
    }
    a{
        display:flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        img{
            height: 20px;
        }
        &:link{
            text-decoration: none;
        }
        span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            color: white;

            &:after{
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
                transform: scaleX(0);
            }
        }
        &:hover{
            span:after{
                transform: scaleX(1);
                opacity:1;
            }
        }
    }
`

const UserImg = styled.img`
    height: 48px;
    width: 48px;
    border-radius: 50%;
    padding: 10;
    cursor: pointer;
    object-fit: cover;
    margin-left: auto;

`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0,0,0,0.6);
    cursor: pointer;
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const LoginContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`