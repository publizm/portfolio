import React from 'react';
import styled, { keyframes } from 'styled-components';
import A11yTitle from '../Common/A11yTitle';
import Typing from '../Common/Typing';
import media from '../../libs/MediaQuery';

const IntroLayout = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background: #000;
  padding: 200px;

  ${media.tablet`
    padding: 100px;
  `}

  ${media.mobile`
    padding: 60px;
  `}
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  color: #fff;

  ${media.desktop`
    min-width: 500px;
  `}

  ${media.tablet`
    min-width: 350px;
  `}
`;

const arrow = keyframes`
  from {
    bottom: 50px;
  }
  to {
    bottom: 60px;
  }
`;

const ViewButton = styled.button<{ type: string }>`
  display: inline-block;
  position: absolute;
  bottom: 50px;
  left: 50%;
  padding: 10px;
  transform: translateX(-50%);
  animation: 1s ${arrow} infinite linear alternate;
`;

type IntroProps = {
  onViewPortfolio: () => void;
};

export default function Intro({ onViewPortfolio }: IntroProps) {
  return (
    <IntroLayout>
      <A11yTitle>인사말 영역</A11yTitle>
      <Greeting>
        <Typing subject="greeting" text="안녕하세요!" />
        <Typing subject="job" text="프론트엔드 개발자" />
        <Typing subject="information" text="이철환입니다." />
      </Greeting>
      <ViewButton type="button" onClick={onViewPortfolio}>
        <img src="./images/arr-white-bottom-24x14.png" alt="포트폴리오 보기" />
      </ViewButton>
    </IntroLayout>
  );
}
