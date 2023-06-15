import React from "react";
import styled from "styled-components";
import BrandLogo from "../brandLogo";
import { Marginer } from "../marginer";
// import FramingImg from "../../images/landing_page/Work only with the best.png";
import Button from "../button";

const SpecialistAdContainer = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  background: rgb(39,107,166);
  background: linear-gradient(
    90deg, 
    rgba(39,107,166,1) 20%, 
    rgba(179,233,255,1) 100%
  );
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SloganContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: 5em;
`;

const Slogan = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #fff;
  font-weight: 700;
  line-height: 1.3 ;
  text-align: start;
`;

const StandoutImage = styled.div`
  width: 35em;
  height: 29em;

  img {
    width: 100%;
    height: 100%;
  }
`;

const SpecialistAd = () => {
  return (
    <SpecialistAdContainer>
      <ContentContainer>
        <SloganContainer>
          <BrandLogo logoSize={ 50 }  textSize={ 25 } color="#fff"/>
          <Marginer direction="vertical" margin="1em" />
          <SloganContainer>
            <Slogan>You're a Specialist, and you </Slogan>
            <Slogan>have an outstanding</Slogan>
            <Slogan>Service to offer?</Slogan>
          </SloganContainer>
          <Marginer direction="vertical" margin="0.8em" />
          <Button size={ 14 } >Join as Specialist</Button>
        </SloganContainer>
        <StandoutImage>
          {/* <img src={FramingImg} alt="join-as-specialist" /> */}
        </StandoutImage>
      </ContentContainer>
    </SpecialistAdContainer>
  );
};

export default SpecialistAd;
