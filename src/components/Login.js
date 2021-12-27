import React, { useEffect } from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { setUserLogin } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

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
    return (
        <Container>
            <CTA>
                <CTALogoOne src = "/images/cta-logo-one.svg" />
                <SignUP onClick={signIn}>Get All There</SignUP>
                <Description>
                Get Premier Access to Raya and the Last Dragon for an additional fee with a Disney+ subscription. As of 03/26/21, the price of Disney+ and The Disney Bundle will increase by $1.
                </Description>
                <CTALogoTwo src = "/images/cta-logo-two.png" />
            </CTA>
        </Container>
    )
}

export default Login


const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
    display: flex;
    align-items: top;
    justify-content: center;
    &:before{
        background-position: top;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url("/images/login-background.jpg");
        position: absolute;
        content: "";
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0.7;
        z-index: -1;
    }
`

const CTA = styled.div`
    margin-bottom: 2vw;
    max-width: 650px;
    flex-wrap: wrap;
    padding: 80px 40px;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin-top: 0px;
    align-items: center;
`

const CTALogoOne = styled.img``

const SignUP = styled.a`
    width: 100%;
    background-color: #0063e5;
    font-weight: bold;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 250ms;
    letter-spacing: 1.5px;
    margin-top: 8px;
    margin-bottom: 12px;

    &:hover {
        background: #0483ee;
    }
`

const Description = styled.p`
    font-size: 11px;
    letter-spacing: 1.5px;
    text-align: center;
    line-height: 1.5;
`

const CTALogoTwo = styled.img`
    width: 90%;

`