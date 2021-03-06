import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectCategory from './ProjectCategory';
import projectDatas from '../../datas/project.json';
import CategoryTitle from '../Common/CategoryTitle';
import ProjectPopup from './ProjectPopup';
import media from '../../libs/MediaQuery';

const ProjectLayout = styled.section`
  margin: 0 -80px;
  padding: 100px 80px;
  background: #1d2231;

  ${media.tablet`
    margin: 0 -60px;
    padding: 100px 60px;
  `}

  ${media.mobile`
    margin: 0 -30px;
    padding: 50px 30px;
  `}
`;

const teamProjectDatas = projectDatas.filter((data) => data.type === 'team');
const personalProjectDatas = projectDatas.filter(
  (data) => data.type === 'personal',
);

type RoleType = {
  img: string | null;
  text: string;
};

type ProjectData = {
  id: number;
  type: string;
  title: string;
  subject: string;
  period: string;
  thumb: string;
  skills: string[];
  mock: string;
  video: string | null;
  site: string | null;
  github: string | null;
  reviews: string[];
  notice?: string;
  people?: string;
  reviewDetail?: string;
  role: RoleType[];
};

export default React.memo(function Project() {
  const [selectProject, setSelectProject] = useState<ProjectData | null>(null);
  const [detailVisible, setDetailVisible] = useState<boolean>(false);

  const onViewDetail = (id: number) => {
    const selectData = projectDatas.find((data) => data.id === id);
    if (selectData) setSelectProject(selectData);
    setDetailVisible(true);
  };

  const onHidePopup = () => {
    setDetailVisible(false);
    setSelectProject(null);
  };

  return (
    <ProjectLayout>
      <CategoryTitle color="#fff" title="PROJECT" />
      <ProjectCategory
        category="Team"
        onViewDetail={onViewDetail}
        datas={teamProjectDatas}
      />
      <ProjectCategory
        category="Personal"
        onViewDetail={onViewDetail}
        datas={personalProjectDatas}
      />
      {detailVisible && selectProject && (
        <ProjectPopup selectProject={selectProject} onHidePopup={onHidePopup} />
      )}
    </ProjectLayout>
  );
});
