import React, { useState, createRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Intro from './components/Intro';
import Main from './components/Main';
import About from './components/About';
import Project from './components/Project';
import Skill from './components/Skill';
import Menu from './components/Menu';
import A11yTitle from './components/Common/A11yTitle';
import Loading from './components/Loading';

const Container = styled.div<{ contentsHeight: number | undefined }>`
  position: relative;
  width: 100%;
  height: ${({ contentsHeight }) => contentsHeight && contentsHeight + 'px'};
  background: #eaeaea;
`;

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [isIntro, setIsintro] = useState<boolean>(true);
  const [mainScroll, setMainScroll] = useState<number>(0);
  const [contentScroll, setContentScroll] = useState<number>(0);
  const [introHeight, setIntroHeight] = useState<number>(0);
  const [contentsHeight, setContentsHeight] = useState<number>();
  const [aboutHeight, setAboutHeight] = useState<number>(0);
  const [skillHeight, setSkillHeight] = useState<number>(0);
  const introRef = createRef<HTMLElement>();
  const contentRef = createRef<HTMLElement>();
  const aboutRef = createRef<HTMLElement>();
  const skillRef = createRef<HTMLElement>();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1700);
  }, []);

  useEffect(() => {
    if (contentRef && contentRef.current && introRef && introRef.current) {
      setContentsHeight(
        contentRef.current.clientHeight + introRef.current.clientHeight,
      );
    }
    if (introRef && introRef.current)
      setIntroHeight(introRef.current.clientHeight);
    if (aboutRef && aboutRef.current)
      setAboutHeight(aboutRef.current.clientHeight);
    if (skillRef && skillRef.current)
      setSkillHeight(skillRef.current.clientHeight);
  }, [contentsHeight, introRef, contentRef, aboutRef, skillRef]);

  const onScroll = useCallback((e: Event): void => {
    setMainScroll(Math.floor(window.scrollY));
  }, []);

  useEffect(() => {
    if (mainScroll >= introHeight) {
      setIsintro(false);
      setContentScroll(mainScroll - introHeight);
    } else {
      setIsintro(true);
      setContentScroll(0);
    }
  }, [mainScroll, introHeight]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const menuToggle = () => {
    setMenuActive(!menuActive);
  };

  const move = (scrolling: number) => {
    setContentScroll(scrolling);
    window.scrollTo(0, scrolling);
    setMenuActive(!menuActive);
  };

  const moveToSection = (category: string) => {
    setIsintro(false);

    if (category === 'HOME') {
      move(0);
      setIsintro(true);
    } else if (category === 'ABOUT') {
      move(introHeight);
    } else if (category === 'SKILL') {
      move(introHeight + aboutHeight);
    } else if (category === 'PROJECT') {
      move(introHeight + aboutHeight + skillHeight);
    }
  };

  return (
    <>
      <Loading loading={loading} />
      <Container contentsHeight={contentsHeight}>
        <A11yTitle as="h1">이철환의 포트폴리오</A11yTitle>
        <Menu
          moveToSection={moveToSection}
          menuActive={menuActive}
          menuToggle={menuToggle}
          isIntro={isIntro}
        />
        <Intro
          mainScroll={mainScroll}
          introHeight={introHeight}
          ref={introRef}
          isIntro={isIntro}
        />
        <Main ref={contentRef} contentScroll={contentScroll}>
          <About ref={aboutRef} />
          <Skill ref={skillRef} />
          <Project />
        </Main>
      </Container>
    </>
  );
}

export default App;
