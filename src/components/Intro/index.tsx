import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import A11yTitle from '../Common/A11yTitle';
import Typing from '../Common/Typing';
import media from '../../libs/MediaQuery';

const IntroLayout = styled.section<{
  introOffset: number;
  introHeight: number;
  isIntro: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: #1b1817;
  padding: 200px;

  ${media.tablet`
    padding: 100px;
  `}

  ${media.mobile`
    padding: 60px;
  `}

  ${({ isIntro, introOffset, introHeight }) =>
    isIntro &&
    css`
      &:after {
        position: absolute;
        top: 100%;
        content: '';
        width: 100%;
        height: 100%;
        background: #000;
        opacity: ${(introHeight - introOffset) / introHeight};
      }
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

const arrowShow = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ScrollPointer = styled.i`
  display: inline-block;
  position: absolute;
  bottom: 50px;
  left: 50%;
  width: 45px;
  padding: 10px;
  opacity: 0;
  transform: translateX(-50%);
  animation: 1s ${arrow} infinite linear alternate,
    0.3s ${arrowShow} 6s 1 linear forwards;
  img {
    width: 100%;
  }
`;

const Logo = styled.span`
  display: inline-block;
  overflow: hidden;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 100px 0 0;
  img {
    width: 100%;
  }
`;

type IntroProps = {
  ref: React.RefObject<HTMLElement>;
  introOffset: number;
  introHeight: number;
  isIntro: boolean;
};

export default React.forwardRef<HTMLElement, IntroProps>(function Intro(
  { introOffset, introHeight, isIntro },
  ref,
) {
  return (
    <IntroLayout
      introOffset={introOffset}
      introHeight={introHeight}
      isIntro={isIntro}
      ref={ref}
      style={{ transform: `translateY(-${introOffset}px)` }}
    >
      <A11yTitle>인사말</A11yTitle>
      <Logo>
        <img src="./images/publee.png" alt="publee logo" />
      </Logo>
      <Greeting>
        <Typing subject="greeting" text="안녕하세요!" />
        <Typing subject="job" text="프론트엔드 개발자" />
        <Typing subject="information" text="이철환입니다." />
      </Greeting>
      <ScrollPointer>
        <img src="./images/mouse-ico-40x56.png" alt="포트폴리오 보기" />
      </ScrollPointer>
    </IntroLayout>
  );
});
