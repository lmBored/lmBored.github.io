import React from 'react';
import { Card } from '../components/Card';
import {
  RESEARCH_EXPERIENCE,
  WORK_EXPERIENCE,
  PROJECTS_DATA,
  NON_RESEARCH_EXPERIENCE,
  COOL_PROJECTS,
  AWARDS_DATA
} from '../constants';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { ExperienceItem } from '../types';

export const Home: React.FC = () => {
  const renderExperienceList = (items: ExperienceItem[]) => (
    items.map((exp, index) => (
      <div key={index} className="experience-item">
        <div className="experience-header">
          {exp.title} - {exp.company}{' '}
          <span className="experience-period">({exp.period})</span>
        </div>
        <ul className="experience-list">
          {exp.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      </div>
    ))
  );

  return (
    <>
      <div className="blog-header">
        <h1>About me</h1>
      </div>

      <Card className="intro">
        <h1>Khoi Nguyen</h1>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/nhbaokhoi"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <span>·</span>
          <a
            href="https://github.com/lmBored"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Github size={18} /> GitHub
          </a>
        </div>
      </Card>


      <Card title="Cool Stuff">
        <div className="project-grid">
          {COOL_PROJECTS.map((project, index) => (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="project-card"
            >
              <div className="project-header">
                <span className="project-title">{project.title}</span>
                <ExternalLink size={16} />
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </Card>

      {/* <Card title="Research Experience">
        {renderExperienceList(RESEARCH_EXPERIENCE)}
      </Card>

      <Card title="Work Experience">
        {renderExperienceList(WORK_EXPERIENCE)}
      </Card>

      <Card title="Projects">
        {renderExperienceList(PROJECTS_DATA)}
      </Card>

      <Card title="Non-Research Experience">
        {renderExperienceList(NON_RESEARCH_EXPERIENCE)}
      </Card> */}

      <Card title="Awards">
        <ul className="awards-list">
          {AWARDS_DATA.map((award, index) => (
            <li key={index}>
              <span className="award-year">{award.year}</span> - {award.rank && `${award.rank} `}
              <span className="award-title">({award.title})</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

