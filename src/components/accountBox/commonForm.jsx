import styled from "styled-components";

const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px  2.5px rgba(15, 15, 15, 0.19);
`;

const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

const BoldLink = styled.a`
  font-size: 12px;
  color: rgb(73,140,200);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(165, 161, 161, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder { 
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(205, 235, 255);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 30%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: rgb(84,148,196);
  background: linear-gradient(
    90deg, 
    rgba(84,148,196,1) 20%, 
    rgba(179,233,255,1) 100%
  );
  
  &:hover {
      filter: brightness(1.03);
  }
`;

export { BoxContainer, FormContainer, MutedLink, BoldLink, Input, SubmitButton };
